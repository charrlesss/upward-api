import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GenerateReturnCheckID() {
  return await prisma.$queryRawUnsafe(`
    SELECT 
      concat(DATE_FORMAT(NOW(), '%y%m'),'-', LEFT(a.last_count ,length(a.last_count) -length(a.last_count + 1)),a.last_count + 1) as return_check_id   
    FROM
      upward_insurance.id_sequence a
    WHERE
      a.type = 'return-check'`);
}
export async function getCheckList(search: string) {
  return await prisma.$queryRawUnsafe(`
  SELECT 
      a.Temp_SlipCode AS DepoSlip, 
      DATE_FORMAT(a.Temp_SlipDate, '%m/%d/%Y') AS DepoDate,  
      a.Check_No , 
      a.Check_Date , 
      a.Credit as Amount,
      a.Bank, 
      c.Official_Receipt, 
      DATE_FORMAT(c.Date_OR, '%m/%d/%Y') AS Date_OR, 
      b.BankAccount,
      LPAD(ROW_NUMBER() OVER (), 3, '0') AS TempID
  FROM 
      upward_insurance.deposit a 
      LEFT JOIN upward_insurance.deposit_slip b ON a.Temp_SlipCode = b.SlipCode
      LEFT JOIN (
          SELECT Official_Receipt, Date_OR 
          FROM upward_insurance.collection 
          GROUP BY Official_Receipt, Date_OR
      ) c ON a.Ref_No = c.Official_Receipt
  WHERE 
      c.Date_OR IS NOT NULL 
      AND a.Check_No <> '' 
      AND (a.Check_No LIKE '%${search}%' OR a.Bank LIKE '%${search}%')
  ORDER BY 
      a.Check_Date
  LIMIT 500;
  `);
}
export async function getCreditOnSelectedCheck(BankAccount: string) {
  return await prisma.$queryRawUnsafe(`
  SELECT 
    a.Account_ID, b.Acct_Title,  b.Short, a.IDNo
FROM
    upward_insurance.bankaccounts a
        LEFT JOIN
    upward_insurance.chart_account b ON a.Account_ID = b.Acct_Code
WHERE
    a.Account_No = '${BankAccount}';
  `);
}
export async function getDebitOnSelectedCheck(Official_Receipt: string) {
  return await prisma.$queryRawUnsafe(`
  SELECT 
      a.CRCode,
      a.CRTitle,
      a.Credit,
      a.CRLoanID,
      a.ID_No,
      a.CRLoanName,
      a.Short,
      'HO' AS SubAcctCode,
      'Head Office' AS SubAcctName,
      LPAD(ROW_NUMBER() OVER (), 3, '0') AS TempID
  FROM
      upward_insurance.collection a
  WHERE
      a.Official_Receipt = '${Official_Receipt}'
      AND a.CRCode <> ''
      AND a.Payment = 'Check'
  `);
}
export async function getBranchName() {
  return await prisma.$queryRawUnsafe(
    `SELECT a.ShortName FROM upward_insurance.sub_account a where a.Acronym = 'HO'`
  );
}

export async function deleteReturnCheck(RC_No: string) {
  return await prisma.$queryRawUnsafe(`
    delete from upward_insurance.return_checks where RC_NO='${RC_No}'
  `);
}

export async function addNewReturnCheck(data: any) {
  return await prisma.return_checks.create({ data });
}

export async function updatePDCFromReturnCheck(Check_No: string) {
  return await prisma.$queryRawUnsafe(`
    UPDATE upward_insurance.pdc a SET a.SlipCode ='', a.ORNum='' WHERE  a.Check_No ='${Check_No}' 
  `);
}

export async function updateJournalFromReturnCheck(
  Check_No: string,
  SlipCode: string
) {
  return await prisma.$queryRawUnsafe(`
    UPDATE upward_insurance.journal a 
    SET a.TC ='RTC'  
    WHERE  a.Check_No ='${Check_No}' AND a.Source_No = '${SlipCode}' AND a.Source_Type ='OR'
  `);
}

export async function deleteJournalFromReturnCheck(SlipCode: string) {
  return await prisma.$queryRawUnsafe(`
  DELETE FROM upward_insurance.journal a WHERE a.Source_No = '${SlipCode}' AND a.Source_Type = 'RC'`);
}
export async function addJournalFromReturnCheck(data: any) {
  return await prisma.journal.create({ data });
}

export async function updateRCID(last_count: string) {
  return await prisma.$queryRawUnsafe(`
  UPDATE upward_insurance.id_sequence a 
    SET 
        a.last_count = '${last_count}',
        a.year = DATE_FORMAT(NOW(), '%y'),
        month = DATE_FORMAT(NOW(), '%m')
    WHERE
        a.type = 'return-check'
  
  `);
}
