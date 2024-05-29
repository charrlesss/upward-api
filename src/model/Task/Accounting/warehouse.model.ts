import { PrismaClient } from "@prisma/client";
import { format } from "date-fns";
import { __DB_URL } from "../../../controller";

export async function getWarehouseSearch(search: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
    SELECT 
        CAST(ROW_NUMBER() OVER () AS CHAR) AS temp_id,
        a.PNo AS Policy,
        MIN(a.IDNo) AS IDNo,
        MIN(a.Name) AS fullname
    FROM
      pdc a
    WHERE
        a.PNo LIKE '%${search}%'
            OR a.IDNo LIKE '%${search}%'
            OR a.Name LIKE '%${search}%'
    GROUP BY a.PNo
    LIMIT 100`;
  console.log(query);

  return await prisma.$queryRawUnsafe(query);
}

export async function warehouseSelectedSearch(
  policy: string,
  pdcStatus: string
) {
  let strWhere = "";
  const pdcStatusList = ["Received", "Stored", "Stored"];
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  if (parseInt(pdcStatus) !== 2) {
    strWhere = ")";
  } else {
    strWhere = ` OR (a.PDC_Status = 'Pulled Out' AND (a.PDC_Remarks = 'Fully Paid' OR a.PDC_Remarks = 'Replaced' )))`;
  }

  const query = `
      SELECT 
        PDC_ID,
        PNo,
        IDNo,
        date_format(Date,'%m-%d-%Y') as dateRecieved,
        Name,
        date_format(Check_Date,'%m-%d-%Y') as Check_Date,
        Check_No,
        Check_Amnt,
        Bank,
        PDC_Status,
        CAST(ROW_NUMBER() OVER () AS CHAR) AS temp_id
      FROM
          pdc a
      WHERE
          a.PNo = '${policy}' AND
          (a.PDC_Status = '${pdcStatusList[parseInt(pdcStatus)]}'${strWhere}
          ORDER BY a.Check_Date
          `;
  console.log(query);
  return await prisma.$queryRawUnsafe(query);
}

export async function pullout(
  PNNo: string,
  CheckNo: string
): Promise<Array<any>> {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
  SELECT 
    *
  FROM
      pullout_request POR
        LEFT JOIN
      pullout_request_details PORD ON POR.RCPNo = PORD.RCPNo
  WHERE
    PNNo = '${PNNo}' AND CheckNo = '${CheckNo}'
        AND Status = 'APPROVED'
  `;
  console.log(query)
  return await prisma.$queryRawUnsafe(query);
}

export async function getApprovedPulloutWarehouse(RCPNo: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
  SELECT DISTINCT
      B.RCPNo as label
  FROM
        PDC A
          INNER JOIN
      (SELECT 
          A.RCPNo, A.PNNo, b.CheckNo, a.Status
      FROM
            PullOut_Request A
      left JOIN   PullOut_Request_Details B ON A.RCPNo = B.RCPNo) B ON A.PNo = B.PNNo
          AND A.Check_No = B.CheckNo
  WHERE
      PDC_Status = 'Stored'
      AND b.Status = 'APPROVED'
      OR b.RCPNo LIKE '%${RCPNo}%'
  ORDER BY B.RCPNo
  `;
  return await prisma.$queryRawUnsafe(query);
}
export async function getApprovedPulloutWarehouseCheckList(RCPNo: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
  SELECT 
  B.RCPNo,
  b.PNNo,
  a.Name,
  convert(COUNT(b.CheckNo),CHAR) NoOfChecks,
  b.Reason
FROM
  PDC A
    INNER JOIN
(SELECT 
    A.RCPNo, A.PNNo, b.CheckNo, a.Status, a.Reason
FROM
      PullOut_Request A
INNER JOIN  PullOut_Request_Details B ON A.RCPNo = B.RCPNo) B ON A.PNo = B.PNNo
    AND A.Check_No = B.CheckNo
WHERE
    PDC_Status = 'Stored'
    AND b.Status = 'APPROVED' 
    AND b.RCPNo like '%${RCPNo}%'
GROUP BY B.RCPNo , b.PNNo , a.Name , b.Reason
ORDER BY B.RCPNo
  `;
  return await prisma.$queryRawUnsafe(query);
}
export async function getApprovedPulloutWarehouseCheckListSelected(
  RCPNo: string
) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
    select 
      a.PNNo as PNo,
      c.IDNo,
      date_format(c.Date,'%m/%d/%Y')  as dateRecieved,
      c.Name,
      date_format(c.Check_Date,'%m/%d/%Y') as Check_Date,
      c.Check_No,
      c.Check_Amnt,
      d.Bank,
      a.Status as PDC_Status,
      c.PDC_ID 
    From  pullout_request a 
    inner join  pullout_request_details b on a.RCPNo = b.RCPNo
    inner join pdc c on b.CheckNo = c.Check_No 
    left join   bank d on c.Bank = d.Bank_Code
    where a.Status = 'APPROVED' and 
    a.RCPNo = '${RCPNo}'
  `;
  return await prisma.$queryRawUnsafe(query);
}

export async function updatePDCChecks(
  pdcStatus: string,
  remarks: string,
  PDC_ID: string
) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  function convertDate(date: any) {
    return format(date, "yyyy-MM-dd");
  }

  const status = ["Stored", "Endorsed", "Pulled Out"];
  const field = ["Date_Stored", "Date_Endorsed", "Date_Pulled_Out"];
  const query = `UPDATE   pdc SET PDC_Status = '${
    status[parseInt(pdcStatus)]
  }', ${field[parseInt(pdcStatus)]} = str_to_date('${convertDate(
    new Date()
  )}','%Y-%m-%d %H:%i:%s.%f')${
    pdcStatus === "2"
      ? `, PDC_Remarks = '${remarks}' WHERE PDC_ID='${PDC_ID}'`
      : ` WHERE PDC_ID='${PDC_ID}'`
  }
`;
console.log(query)

  return await prisma.$queryRawUnsafe(query);
}
