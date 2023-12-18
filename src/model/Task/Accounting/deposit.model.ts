import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getCashCollection(SlipCode: string) {
  const sql = `
    SELECT 
        a.Official_Receipt AS OR_No,
        DATE_FORMAT(a.Date_OR, '%m/%d/%Y') AS OR_Date,
        FORMAT(a.Debit, '#,##0.00') AS Amount,
        a.Short AS Client_Name,
        a.DRCode,
        a.ID_No,
        a.Temp_OR,
        a.SlipCode,
        b.Short
    FROM
        upward_insurance.collection a
            LEFT JOIN
        upward_insurance.chart_account b ON a.DRCode = b.Acct_Code
    WHERE
        Payment = 'Cash'
            AND (a.SlipCode = '' OR a.SlipCode = '${SlipCode}')
    ORDER BY a.Date_OR DESC , a.Check_Date 
    `;

  return await prisma.$queryRawUnsafe(sql);
}
export async function getCheckCollection(SlipCode: string) {
  const sql = `
  SELECT 
  a.Official_Receipt AS OR_No,
   DATE_FORMAT(a.Date_OR, '%m/%d/%Y') AS OR_Date,
   a.Check_No AS Check_No, 
   FORMAT(a.Check_Date,'MM/dd/yyyy') AS Check_Date,
   FORMAT(a.Debit, '#,##0.00') AS Amount,
   a.Bank AS Bank_Branch,
   a.Short AS Client_Name,
  a.DRCode,
   a.DRRemarks,
   a.ID_No,
   a.Temp_OR,
    SlipCode,
   b.Short
   FROM upward_insurance.collection a
   LEFT JOIN upward_insurance.chart_account b
   ON a.DRCode = b.Acct_Code 
   WHERE a.Payment = 'Check' 
   AND (a.SlipCode IS NULL OR a.SlipCode = '${SlipCode}') ORDER BY a.Date_OR DESC, a.Check_Date

    `;

  return await prisma.$queryRawUnsafe(sql);
}

export async function getBanksFromDeposit(search: string) {
  const sql = `
  SELECT 
    a.Account_Type, a.Account_No, a.Account_Name
  FROM
    upward_insurance.bankaccounts a
    left join cli
  WHERE
    Inactive = 0
        AND (a.Account_Type LIKE '%${search}%'
        OR a.Account_No LIKE '%${search}%'
        OR a.Account_Name LIKE '%${search}%')
  ORDER BY a.Account_Name
  LIMIT 100;
  `;
  return await prisma.$queryRawUnsafe(sql);
}

export async function depositIDGenerator() {
  return await prisma.$queryRawUnsafe(`
    SELECT 
      concat(a.year,a.month,'.', LEFT(a.last_count ,length(a.last_count) -length(a.last_count + 1)),a.last_count + 1) as collectionID
    FROM
      upward_insurance.id_sequence a
    WHERE
      type = 'deposit';`);
}

export async function findDepositBySlipCode(Slip_Code: string) {
  return await prisma.deposit.findMany({
    where: {
      Slip_Code,
    },
  });
}

export async function addDepositSlip(data: any) {
  return await prisma.deposit_slip.create({ data });
}
