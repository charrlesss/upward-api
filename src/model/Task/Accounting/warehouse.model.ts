import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
