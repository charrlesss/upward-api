import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getClientCheckedList(search: string, PNo: string) {
  const query = `
   SELECT 
        CAST(ROW_NUMBER() OVER () AS CHAR) AS temp_id,
        a.Check_No,
        DATE_FORMAT(a.Check_Date, '%M %d %Y') as Check_Date,
        a.Check_Amnt as  Amount,
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

export async function getCollections(searchCollectionInput: string) {
  return await prisma.$queryRawUnsafe(`
    SELECT 
        FORMAT(MAX(a.Date), 'MMM. dd, yyyy') AS 'Date',
        a.Official_Receipt AS 'ORNo',
        MAX(a.Name) AS Name
    FROM
        upward_insurance.collection a
    WHERE
        LEFT(a.Name, 7) <> '-- Void'
            AND (a.Official_Receipt LIKE '%${searchCollectionInput}%'
            OR Name LIKE '%${searchCollectionInput}%')
    GROUP BY a.Official_Receipt
    ORDER BY MAX(a.Date) DESC , Name
    LIMIT 100
  `);
}
export async function getSearchCollection(ORNo: string) {
  return await prisma.$queryRawUnsafe(`
  SELECT 
    a.*, 
    b.Bank_Code, 
    b.Bank AS BankName,
    TRIM(BOTH ' ' FROM SUBSTRING_INDEX(a.Bank, '/', -1)) as Branch
  FROM
    upward_insurance.collection a
        LEFT JOIN
    upward_insurance.bank b ON b.Bank_Code = TRIM(BOTH ' ' FROM SUBSTRING_INDEX(a.Bank, '/', 1))
  WHERE
    a.Official_Receipt = '${ORNo}'
  ORDER BY a.Temp_OR
  `);
}

export async function deleteCollection(Official_Receipt: string) {
  return await prisma.$queryRawUnsafe(`
    DELETE FROM upward_insurance.collection a WHERE a.Official_Receipt ='${Official_Receipt}'
  `);
}

export async function updateCollection(data: any, Temp_OR: any) {
  return await prisma.collection.update({ data: data, where: { Temp_OR } });
}

export async function TransactionAndChartAccount(search: string) {
  const query = `
  SELECT 
  b.Acct_Code, b.Acct_Title
FROM
  upward_insurance.transaction_code a
      LEFT JOIN
  upward_insurance.chart_account b ON a.Acct_Code = b.Acct_Code
WHERE
  a.Description = '${search}'    `;
  return await prisma.$queryRawUnsafe(query);
}
