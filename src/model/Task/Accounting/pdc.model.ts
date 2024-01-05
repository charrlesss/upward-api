import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getPdcPolicyIdAndCLientId(search: String) {
  const query = ` 
  SELECT 
  'Client ID' AS Type,
    a.entry_client_id AS IDNo,
    concat(a.firstname,', ', a.lastname) AS Name,
    a.entry_client_id as ID
  FROM upward_insurance.entry_client a  WHERE 
  a.entry_client_id NOT IN (SELECT IDNo FROM upward_insurance.policy) AND 
  (
  a.entry_client_id like '%${search}%' OR  
  a.firstname like '%${search}%' OR 
  a.lastname like '%${search}%' 
  )
  union all
  SELECT 
    'Policy ID' AS Type,
    a.PolicyNo AS IDNo,
    concat(b.firstname,', ', b.lastname) AS Name,
    a.IDNo  as ID 
  FROM upward_insurance.policy a
  left join upward_insurance.entry_client b on b.entry_client_id = a.IDNo 
  where 
  a.policyNo like '%${search}%' OR  
  b.firstname like '%${search}%' OR 
  b.lastname like '%${search}%' OR
  a.IDNo  like '%${search}%' 
  limit 100
      `;
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
      a.Branch,
      a.Check_Remarks,
      a.SlipCode AS Deposit_Slip,
      a.DateDepo AS DateDeposit,
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
