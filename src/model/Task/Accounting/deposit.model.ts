import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getCashCollection(SlipCode: string) {
  const sql = `
    SELECT 
        a.Official_Receipt AS OR_No,
        a.Date_OR AS OR_Date,
        a.Debit AS Amount,
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
  a.Date_OR AS OR_Date,
   a.Check_No AS Check_No, 
   a.Check_Date,
   a.Debit AS Amount,
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
  return await prisma.collection.updateMany({
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
export async function updateDepositIDSequence(data: any) {
  return await prisma.$queryRawUnsafe(`
      update upward_insurance.id_sequence a
      set a.last_count = '${data.last_count}', a.year= '${data.year}', a.month= '${data.month}'
      where a.type ='deposit'
    `);
}
export async function searchDeposit(searchDeposit: string) {
  return await prisma.$queryRawUnsafe(`
    SELECT 
    DATE_FORMAT(a.Date, '%m/%d/%Y') as Date, 
      a.SlipCode,
      a.BankAccount,
      a.AccountName,
      a.BankAccount
    FROM
      upward_insurance.deposit_slip a 
    LEFT JOIN 
      upward_insurance.deposit b 
        on a.SlipCode =  b.Slip_Code
    WHERE
    LEFT(AccountName, 7) <> '-- Void'
        AND (a.SlipCode LIKE '%${searchDeposit}%'
        OR a.BankAccount LIKE '%${searchDeposit}%'
        OR a.AccountName LIKE '%${searchDeposit}%')
    ORDER BY Date DESC
`);
}
export async function getCashDeposit(SlipCode: string) {
  return await prisma.$queryRawUnsafe(`
  SELECT 
    a.Payment as  Deposit,
    a.Check_No,
    a.Check_Date,
    a.Bank ,
    a.Short as Name,
    a.Temp_OR as  RowIndex,
    a.DRCode,
    a.Official_Receipt as ORNo,
    a.DRRemarks, 
    a.Temp_OR as  TempOR,
    a.Official_Receipt AS OR_No,
    a.Date_OR AS OR_Date,
    a.Debit as Amount,
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
    a.Payment = 'Cash'
        AND a.SlipCode = '${SlipCode}'

  union all 
  SELECT 
    aa.Payment as  Deposit,
    aa.Check_No,
    aa.Check_Date,
    aa.Bank ,
    aa.Short as Name,
    aa.Temp_OR as  RowIndex,
    aa.DRCode,
    aa.Official_Receipt as ORNo,
    aa.DRRemarks, 
    aa.Temp_OR as  TempOR,
    aa.Official_Receipt AS OR_No,
    DATE_FORMAT(aa.Date_OR, '%m/%d/%Y') AS OR_Date,
    aa.Debit as Amount,
    aa.Short AS Client_Name,
    aa.DRCode,
    aa.ID_No,
    aa.Temp_OR,
    aa.SlipCode,
    bb.Short
  FROM
    upward_insurance.collection aa
        LEFT JOIN
    upward_insurance.chart_account bb ON aa.DRCode = bb.Acct_Code
  WHERE
    aa.Payment = 'Cash'
        AND aa.SlipCode = ''
  ORDER BY OR_Date DESC , Check_Date
  `);
}
export async function getCheckDeposit(SlipCode: string) {
  return await prisma.$queryRawUnsafe(`
  SELECT 
      a.Payment as  Deposit,
      a.Bank ,
      a.Short as Name,
      a.Official_Receipt as  RowIndex,
      a.ORNo as ORNo,
      a.Temp_OR as  TempOR,
      a.ORNo AS OR_No,
      a.Official_Receipt AS Temp_OR,
      a.Date_OR AS OR_Date,
      a.Check_No,
      a.Check_Date,
      a.Debit AS Amount,
      a.Bank AS Bank_Branch,
      a.Short AS Client_Name, 
      a.DRCode,
      a.DRRemarks,
      a.ID_No,
      a.Temp_OR,
      a.SlipCode,
      b.Short 
    FROM upward_insurance.collection a
    LEFT JOIN upward_insurance.chart_account b ON a.DRCode = b.Acct_Code
    WHERE a.Payment = 'Check' AND  a.SlipCode = '${SlipCode}'
    union all
    SELECT 
    aa.Payment as  Deposit,
    aa.Bank ,
    aa.Short as Name,
    aa.Official_Receipt as  RowIndex,
    aa.ORNo as ORNo,
    aa.Temp_OR as  TempOR,
    aa.ORNo AS OR_No,
    aa.Official_Receipt AS Temp_OR,
    DATE_FORMAT( aa.Date_OR,'%m/%d/%Y') AS OR_Date,
    aa.Check_No,
    aa.Check_Date,
    aa.Debit AS Amount,
    aa.Bank AS Bank_Branch,
    aa.Short AS Client_Name, 
    aa.DRCode,
    aa.DRRemarks,
    aa.ID_No,
    aa.Temp_OR,
    aa.SlipCode,
    bb.Short 
    FROM upward_insurance.collection aa
    LEFT JOIN upward_insurance.chart_account bb ON aa.DRCode = bb.Acct_Code
    WHERE aa.Payment = 'Check' AND  aa.SlipCode = ''
    ORDER BY OR_Date DESC, Check_Date
  `);
}
export async function getCashBreakDown(SlipCode: string) {
  return await prisma.$queryRawUnsafe(`
    select 
    Pap_1000,
    Pap_500,
    Pap_200,
    Pap_100,
    Pap_50,
    Pap_20,
    Pap_10,
    Coin_5,
    Coin_2,
    Coin_1,
    Cnt_50,
    Cnt_25,
    Cnt_10,
    Cnt_05,
    Cnt_01
    FROM upward_insurance.cash_breakdown  where Slip_Code = '${SlipCode}'
  `);
}
export async function getBanksFromDepositByAccountNo(AccountNo: string) {
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
            a.Inactive = 0 AND a.Account_No = '${AccountNo}'
      ORDER BY a.Account_Name
      LIMIT 100;
      `;
  return await prisma.$queryRawUnsafe(sql);
}
export async function deleteSlipCode(Slipcode: string) {
  return await prisma.$queryRawUnsafe(`
  DELETE FROM upward_insurance.deposit_slip WHERE Slipcode = '${Slipcode}'
  `);
}
export async function deleteDeposit(Slipcode: string) {
  return await prisma.$queryRawUnsafe(`
    DELETE FROM upward_insurance.deposit WHERE Temp_SlipCode = '${Slipcode}'
  `);
}
export async function deleteCashBreakDown(Slipcode: string) {
  return await prisma.$queryRawUnsafe(`
    DELETE FROM upward_insurance.cash_breakdown WHERE Slip_code = '${Slipcode}'
  `);
}
export async function deleteJournalFromDeposit(Slipcode: string) {
  return await prisma.$queryRawUnsafe(`
    DELETE FROM upward_insurance.journal WHERE Source_Type='DC' and Source_No = '${Slipcode}'
  `);
}
export async function removeDepositFromCollection(Slipcode: string) {
  return await prisma.$queryRawUnsafe(`
    UPDATE upward_insurance.collection set SlipCode='' WHERE SlipCode='${Slipcode}'
  `);
}