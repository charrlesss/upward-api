import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getClientCheckedList(search: string, PNo: string) {
  const query = `
   SELECT 
        CAST(ROW_NUMBER() OVER () AS CHAR) AS temp_id,
        a.Check_No,
        DATE_FORMAT(a.Check_Date, '%M %d %Y') as Check_Date,
        FORMAT(a.Check_Amnt, '#,##0.00') AS Amount,
        CONCAT(a.Bank, ' / ', a.Branch) as Bank_Branch,
        a.Remarks,
        a.Bank,
        a.Branch,
        a.Check_Remarks,
        b.Bank as BankName
    FROM
        upward_insurance.pdc a
    LEFT JOIN  upward_insurance.bank b ON a.Bank = b.Bank_Code
    WHERE
        (a.Check_No LIKE '%${search}%' OR a.Bank LIKE '%${search}%'
            OR a.Branch LIKE '%${search}%')
            AND (a.PNo = '${PNo}')
            AND (a.ORNum IS NULL OR a.ORNum = '')
    ORDER BY a.Check_Date
    LIMIT 500
    `;
  return await prisma.$queryRawUnsafe(query);
}

export async function getTransactionBanksDetails() {
  const query = `SELECT 
            *
        FROM
            upward_insurance.transaction_code a
                LEFT JOIN
            upward_insurance.chart_account b ON a.Acct_Code = b.Acct_Code
        WHERE
        a.code = 'CHK' OR a.code = 'CSH'`;
  return await prisma.$queryRawUnsafe(query);
}

export async function getTransactionDescription() {
  const query = `
        SELECT 
            a.Description as label,
            b.Acct_Code,
            b.Acct_Title,
            a.Code
        FROM
            upward_insurance.transaction_code a
                LEFT JOIN
            upward_insurance.chart_account b ON a.Acct_Code = b.Acct_Code
        WHERE
            b.Acct_Code IS NOT NULL
        ORDER BY Description`;
  return await prisma.$queryRawUnsafe(query);
}

export async function createCollection(data: any) {
  return await prisma.collection.create({ data });
}

export async function updatePDCCheck(data: any) {
  return await prisma.$queryRawUnsafe(`
    UPDATE upward_insurance.pdc a
        SET a.ORNum ='${data.ORNum}'
    WHERE a.PNo = '${data.PNo}' AND a.Check_No = '${data.CheckNo}'
`);
}

export async function deleteFromJournalToCollection(ORNo: string) {
  return await prisma.$queryRawUnsafe(`
      DELETE from upward_insurance.journal a
      WHERE a.Source_Type = 'OR' AND a.Source_No = '${ORNo}'
  `);
}

export async function createJournal(data: any) {
  return await prisma.journal.create({ data });
}

export async function collectionIDGenerator() {
  return await prisma.$queryRawUnsafe(`
    SELECT 
      concat(a.year,a.month,'.', LEFT(a.last_count ,length(a.last_count) -length(a.last_count + 1)),a.last_count + 1) as collectionID
    FROM
      upward_insurance.id_sequence a
    WHERE
      type = 'collection';`);
}

export async function updateCollectionIDSequence(data: any) {
  return await prisma.$queryRawUnsafe(`
      update upward_insurance.id_sequence a
      set a.last_count = '${data.last_count}', a.year= '${data.year}', a.month= '${data.month}'
      where a.type ='collection'
    `);
}
export async function findORnumber(ORNo: string) {
  return await prisma.collection.findMany({
    where: { Official_Receipt: ORNo },
  });
}

export async function getCollections(){
  return await prisma.$queryRawUnsafe('select * from upward_insurance.collection')
}