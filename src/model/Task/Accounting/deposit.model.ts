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
   a.Check_Date,
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
      a.Account_Type,
      a.Account_No,
      a.IDNo,
      a.Account_Name,
      a.Desc,
      a.Account_ID,
      b.Short,
      c.Shortname as ShortName,
      d.ShortName as Sub_ShortName,
      d.Acronym as Sub_Acct
    FROM
      upward_insurance.bankaccounts a
          LEFT JOIN
      upward_insurance.chart_account b ON a.Account_ID = b.Acct_Code
          LEFT JOIN
      (
        SELECT 
            aa.entry_client_id AS IDNo,
        aa.sub_account,
        CONCAT(aa.lastname, ', ', aa.firstname) AS Shortname
        FROM
            upward_insurance.entry_client aa
            union all
      SELECT 
            aa.entry_agent_id AS IDNo,
        Null as sub_account,
        CONCAT(aa.lastname, ', ', aa.firstname) AS Shortname
        FROM
            upward_insurance.entry_agent aa
            union all
      SELECT 
            aa.entry_employee_id AS IDNo,
        aa.sub_account,
        CONCAT(aa.lastname, ', ', aa.firstname) AS Shortname
        FROM
            upward_insurance.entry_employee aa
      union all
      SELECT 
            aa.entry_supplier_id AS IDNo,
        null as sub_account,
        CONCAT(aa.lastname, ', ', aa.firstname) AS Shortname
        FROM
            upward_insurance.entry_supplier aa
            union all
      SELECT 
            aa.entry_fixed_assets_id AS IDNo,
        null as sub_account,
        aa.fullname AS Shortname
        FROM
            upward_insurance.entry_fixed_assets aa
            union all
      SELECT 
            aa.entry_others_id AS IDNo,
        null as sub_account,
        aa.description AS Shortname
        FROM
            upward_insurance.entry_others aa
            ) c ON c.IDNo = a.IDNo
            LEFT JOIN
        upward_insurance.sub_account d ON c.sub_account = d.Sub_Acct
        WHERE
            a.Inactive = 0
            AND (a.Account_Type LIKE '%${search}%'
            OR a.Account_No LIKE '%${search}%'
            OR a.Account_Name LIKE '%${search}%')
      ORDER BY a.Account_Name
      LIMIT 100;
      `;

  return await prisma.$queryRawUnsafe(sql);
}
export async function depositIDSlipCodeGenerator() {
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
export async function addCashCheckInDeposit(data: any) {
  return await prisma.deposit.create({
    data: data,
  });
}
export async function addCashBreakDown(data: any) {
  return await prisma.cash_breakdown.create({ data });
}
export async function addJournal(data: any) {
  return await prisma.journal.create({ data });
}
export async function updateCollectioSlipCode(
  SlipCode: string,
  Temp_OR: string
) {
  return await prisma.collection.update({
    data: {
      SlipCode,
    },
    where: {
      Temp_OR,
    },
  });
}

export async function updatePDCSlipCode(
  SlipCode: string,
  DateDepo: string,
  PNo: string,
  Check_No: string
) {
  return await prisma.pdc.updateMany({
    data: {
      SlipCode,
      DateDepo,
    },
    where: {
      Check_No,
      AND: {
        PNo,
      },
    },
  });
}
