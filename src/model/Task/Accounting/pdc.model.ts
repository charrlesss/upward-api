import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getPdcPolicyIdAndCLientId(search: String) {
  const query = ` CALL client_ids('${search}')`;
  return await prisma.$queryRawUnsafe(query);
}

export async function getPdcBanks(search: string) {
  const query = `
    SELECT a.Bank_Code, a.Bank FROM upward_insurance.bank a where  a.Bank_Code like '%${search}%' OR a.Bank like '%${search}%' limit 100; 
    `;
  return await prisma.$queryRawUnsafe(query);
}

export async function findPdc(Ref_No: string) {
  return await prisma.pdc.findMany({ where: { Ref_No } });
}

export async function deletePdcByRefNo(Ref_No: string) {
  return await prisma.pdc.deleteMany({ where: { Ref_No } });
}

export async function createPDC(data: any) {
  return await prisma.pdc.create({ data });
}

export async function searchPDC(search: any) {
  return await prisma.$queryRawUnsafe(`
    SELECT 
        a.Ref_No,
        DATE_FORMAT(a.Date, '%m/%d/%Y') AS Date,
        a.Name
    FROM
        upward_insurance.pdc a
    WHERE
        LEFT(a.Name, 7) <> '--Void'
            AND (a.Ref_No LIKE '%${search}%' OR a.Name LIKE '%${search}%')
    GROUP BY a.Ref_No , a.Date , a.Name
    ORDER BY a.Date DESC , a.Name
    LIMIT 100
  `);
}

export async function getSearchPDCheck(ref_no: any) {
  return await prisma.$queryRawUnsafe(`
    SELECT 
      a.Ref_No,
      a.Name,
      a.Date,
      a.Remarks,
      a.PNo,
      a.IDNo,
      a.Check_No,
      DATE_FORMAT(a.Check_Date, '%m/%d/%Y') AS Check_Date,
      a.Check_Amnt,
      b.Bank AS BankName,
      b.Bank_Code as BankCode,
      a.Branch,
      a.Check_Remarks,
      a.SlipCode AS Deposit_Slip,
      DATE_FORMAT(a.DateDepo, '%m/%d/%Y') AS DateDeposit,
      a.ORNum AS OR_No
    FROM
      upward_insurance.pdc a
          LEFT JOIN
      upward_insurance.bank b ON a.Bank = b.Bank_Code
    WHERE
    a.Ref_No = '${ref_no}'
  `);
}

export async function pdcIDGenerator() {
  return await prisma.$queryRawUnsafe(`
  SELECT 
    concat(a.year,'.', LEFT(a.last_count ,length(a.last_count) -length(a.last_count + 1)),a.last_count + 1) as pdcID
  FROM
    upward_insurance.id_sequence a
  WHERE
    type = 'pdc';
;`);
}

export async function updatePDCIDSequence(data: any) {
  return await prisma.$queryRawUnsafe(`
      update upward_insurance.id_sequence a
      set a.last_count = '${data.last_count}', a.year= '${data.year}', a.month= '${data.month}'
      where a.type ='pdc'
    `);
}
