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
  a.Temp_SlipCodE AS DepoSlip, 
  date_format(a.Temp_SlipDate, '%m/%d/%Y') AS DepoDate,
  a.Check_No,
  a.Check_Date,
  a.Credit  as Amount,
  a.Bank,
  a.BankAccount,
  a.Ref_No,
  b.Official_Receipt, b.Date_OR,
  LPAD(ROW_NUMBER() OVER (), 3, '0') AS TempID
FROM
  (SELECT 
      Temp_SlipCode,
          Temp_SlipDate,
          Check_No,
          Check_Date,
          Credit,
          Bank,
          BankAccount,
          Ref_No
  FROM
      upward_insurance.deposit a
  LEFT JOIN upward_insurance.deposit_slip b ON a.Temp_SlipCode = b.SlipCode) a
      LEFT JOIN
  (SELECT 
      Official_Receipt, Date_OR
  FROM
      upward_insurance.collection
  GROUP BY Official_Receipt , Date_OR) b ON a.Ref_No = b.Official_Receipt
GROUP BY a.Temp_SlipCode , a.Temp_SlipDate , a.Ref_No , a.BankAccount , a.Credit , a.Check_Date , a.Check_No , a.Bank , a.BankAccount , b.Date_OR , b.Official_Receipt
HAVING (((b.Date_OR) IS NOT NULL)
  AND ((a.Check_No) <> ''))
  AND (a.Check_No LIKE '%${search}%' OR a.Bank LIKE '%${search}%')
  AND a.Temp_SlipCode not in (select SlipCode from upward_insurance.return_checks)
ORDER BY a.Check_Date
limit 100
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
export async function searchReturnChecks(search: string) {
  return await prisma.$queryRawUnsafe(`
    SELECT 
      DATE_FORMAT(RC_Date, '%m/%d/%Y') AS RC_Date,
      RC_No,
      Explanation
    FROM
      upward_insurance.return_checks
    WHERE
      LEFT(Explanation, 7) <> '-- Void'
          AND (RC_No LIKE '%${search}%'
          OR Explanation LIKE '%${search}%')
    GROUP BY RC_Date , RC_No , Explanation
    ORDER BY RC_Date
    LIMIT 500;
  `);
}

export async function getReturnCheckSearchFromJournal(RC_No: string) {
  return await prisma.$queryRawUnsafe(`
  SELECT 
    a.Branch_Code  as BranchCode,
    date_format(a.Date_Entry ,'%m/%d/%y') as DateReturn,
    a.Source_Type, 
    a.Source_No, 
    a.Explanation,
    a.GL_Acct as Code,
    a.cGL_Acct as AccountName,
    a.Sub_Acct as SubAcct,
    a.cSub_Acct as SubAcctName,
    a.ID_No as IDNo,
    a.cID_No as IDNo,
    format(a.Debit,2) as Debit,
    format(a.Credit,2) as Credit,
    date_format(date(str_to_date(a.Check_Date,'%m/%d/%Y')), '%m/%d/%y') as Check_Date,
    a.Check_No Check_No,
    a.Check_Bank as Bank,
    date_format(date(str_to_date(a.Check_Return,'%m/%d/%Y')), '%m/%d/%y')  as Check_Return,
    a.Check_Deposit as DepoDate,
    a.Check_Collect  as Date_Collection,
    a.Check_Reason,
    a.TC,
    LPAD(ROW_NUMBER() OVER (), 3, '0') as TempID
  FROM
    upward_insurance.journal a
  WHERE
    a.Source_Type = 'RC' AND
    a.Source_No = '${RC_No}'
    order by a.Check_No, Code desc
      `);
}

export async function getReturnCheckSearch(RC_No: string) {
  return await prisma.$queryRawUnsafe(`
  SELECT 
    a.Area as BranchCode, 
    a.RC_Date,
    a.RC_No,
    a.Explanation, 
    a.Check_No, 
    DATE_FORMAT(a.Date_Deposit ,'%m/%d/%y')  AS DepoDate,
    a.Amount,
    a.Reason, 
    a.Bank, 
    date_format(date(str_to_date(a.Check_Date,'%m/%d/%Y')), '%m/%d/%y') as Check_Date, 
    a.Date_Return  AS Return_Date,
    a.SlipCode AS DepoSlip, 
    a.ORNum AS OR_NO, 
    a.BankAccnt AS Bank_Account,
    a.nSort,
    DATE_FORMAT(a.Date_Collect ,'%m/%d/%y')  AS OR_Date,
    a.Temp_RCNo,
    a.Temp_RCNo as TempID
  FROM
    upward_insurance.return_checks a
  WHERE
    a.RC_No = '${RC_No}'
      `);
}

export async function findReturnCheck(RC_No: string) {
  return await prisma.$queryRawUnsafe(`
    select * from upward_insurance.return_checks where RC_NO='${RC_No}'
  `);
}