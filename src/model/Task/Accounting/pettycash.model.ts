import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function generatePettyCashID() {
  return await prisma.$queryRawUnsafe(`
      SELECT 
        concat(DATE_FORMAT(NOW(), '%y%m'),'-', LEFT(a.last_count ,length(a.last_count) -length(a.last_count + 1)),a.last_count + 1) as petty_cash_id   
      FROM
        upward_insurance.id_sequence a
      WHERE
        a.type = 'petty-cash'`);
}

export async function getPettyLog() {
  const query = `SELECT 
  a.Purpose, b.Acct_Code, b.Acct_Title, b.Short
FROM
    upward_insurance.petty_log a
        LEFT JOIN
    upward_insurance.chart_account b ON a.Acct_Code = b.Acct_Code`;
  return await prisma.$queryRawUnsafe(query);
}

export async function deletePettyCash(PC_No: string) {
  const query = `
        DELETE FROM
      upward_insurance.petty_cash a where a.PC_No = '${PC_No}'`;
  return await prisma.$queryRawUnsafe(query);
}

export async function deleteJournalFromPettyCash(PC_No: string) {
  const query = `DELETE FROM upward_insurance.journal a where a.Source_no = '${PC_No}' AND a.Source_Type = 'PC'`;
  return await prisma.$queryRawUnsafe(query);
}

export async function addJournalFromPettyCash(data: any) {
  return await prisma.journal.create({ data });
}

export async function addPettyCash(data: any) {
  return await prisma.petty_cash.create({ data });
}

export async function findPettyCash(PC_No: string) {
  return await prisma.$queryRawUnsafe(
    `Select * from upward_insurance.petty_cash where PC_No = '${PC_No}'`
  );
}

export async function updatePettyCashID(last_count: string) {
  return await prisma.$queryRawUnsafe(`
    UPDATE upward_insurance.id_sequence a 
      SET 
          a.last_count = '${last_count}',
          a.year = DATE_FORMAT(NOW(), '%y'),
          month = DATE_FORMAT(NOW(), '%m')
      WHERE
          a.type = 'petty-cash'
    `);
}
export async function searchPettyCash(search: string) {
  return await prisma.$queryRawUnsafe(`
    SELECT 
        date_format(a.PC_Date, '%m/%d/%y') AS PC_Date,
        a.PC_No,
        a.Payee,
        a.Explanation
    FROM
        upward_insurance.petty_cash a
    WHERE
        (LEFT(a.Payee, 7) <> '-- Void')
            AND (a.PC_No LIKE '%${search}%' 
            OR a.Payee LIKE '%${search}%'
            OR a.Explanation LIKE '%${search}%')
    GROUP BY a.PC_Date , PC_No , a.Payee , a.Explanation
    ORDER BY a.PC_Date DESC
    LIMIT 500
    `);
}

export async function loadSelectedPettyCash(PC_No: string) {
  return await prisma.$queryRawUnsafe(`
    SELECT 
      concat(a.ShortName,' > ',a.IDNo,' > ',a.Sub_Acct) as \`usage\`,
      concat(a.DRShort,' > ',a.DRAcct_Code) as accountID,
      a.Branch_Code,
      a.PC_Date,
      a.PC_No,
      a.Payee,
      a.Explanation,
      a.DRPurpose as purpose,
      format(a.Debit ,2) as amount,
      a.DRAcct_Code as accountCode,
      a.DRShort as accountShort,
      a.Sub_Acct as sub_account,
      a.IDNo as clientID,
      a.ShortName as clientName,
      a.CRAcct_Code ,
      a.CRShort ,
      a.Credit,
      a.DRVATType as vatType,
      a.DRInvoiceNo as invoice,
      LPAD(ROW_NUMBER() OVER (), 3, '0') as TempID
    FROM upward_insurance.petty_cash a  where a.PC_No='${PC_No}'
      `);
}
