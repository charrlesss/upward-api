import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { format } from "date-fns";

export async function getWarehouseSearch(search: string) {
  const query = `
    SELECT 
        CAST(ROW_NUMBER() OVER () AS CHAR) AS temp_id,
        a.PNo AS Policy,
        MIN(a.IDNo) AS IDNo,
        MIN(a.Name) AS fullname
    FROM
    upward_insurance.pdc a
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
        upward_insurance.pdc a
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
  const query = `
  SELECT 
    *
  FROM
    upward_insurance.pullout_request POR
        LEFT JOIN
    upward_insurance.pullout_request_details PORD ON POR.RCPNo = PORD.RCPNo
  WHERE
    PNNo = '${PNNo}' AND CheckNo = '${CheckNo}'
        AND Status = 'APPROVED'
  `;

  return await prisma.$queryRawUnsafe(query);
}

export async function getApprovedPulloutWarehouse(RCPNo: string) {
  const query = `
  SELECT DISTINCT
      B.RCPNo as label
  FROM
      upward_insurance.PDC A
          INNER JOIN
      (SELECT 
          A.RCPNo, A.PNNo, b.CheckNo, a.Status
      FROM
          upward_insurance.PullOut_Request A
      left JOIN upward_insurance.PullOut_Request_Details B ON A.RCPNo = B.RCPNo) B ON A.PNo = B.PNNo
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
  const query = `
  SELECT 
  B.RCPNo,
  b.PNNo,
  a.Name,
  convert(COUNT(b.CheckNo),CHAR) NoOfChecks,
  b.Reason
FROM
upward_insurance.PDC A
    INNER JOIN
(SELECT 
    A.RCPNo, A.PNNo, b.CheckNo, a.Status, a.Reason
FROM
    upward_insurance.PullOut_Request A
INNER JOIN upward_insurance.PullOut_Request_Details B ON A.RCPNo = B.RCPNo) B ON A.PNo = B.PNNo
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
      CAST(ROW_NUMBER() OVER () AS CHAR) AS PDC_ID
    From upward_insurance.pullout_request a 
    inner join upward_insurance.pullout_request_details b on a.RCPNo = b.RCPNo
    inner join pdc c on b.CheckNo = c.Check_No 
    left join upward_insurance.bank d on c.Bank = d.Bank_Code
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
  function convertDate(date: any) {
    return format(date, "yyyy-MM-dd");
  }

  const status = ["Stored", "Endorsed", "Pulled Out"];
  const field = ["Date_Stored", "Date_Endorsed", "Date_Pulled_Out"];
  const query = `UPDATE upward_insurance.pdc SET PDC_Status = '${
    status[parseInt(pdcStatus)]
  }', ${field[parseInt(pdcStatus)]} = str_to_date('${convertDate(
    new Date()
  )}','%Y-%m-%d %H:%i:%s.%f')${
    pdcStatus === "2"
      ? `, PDC_Remarks = '${remarks}' WHERE PDC_ID='${PDC_ID}'`
      : ` WHERE PDC_ID='${PDC_ID}'`
  }
`;

  return await prisma.$queryRawUnsafe(query);
}
