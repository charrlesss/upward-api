import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GenerateGeneralJournalID() {
  return await prisma.$queryRawUnsafe(`
      SELECT 
        concat(DATE_FORMAT(NOW(), '%y%m'),'-', LEFT(a.last_count ,length(a.last_count) -length(a.last_count + 1)),a.last_count + 1) as general_journal_id   
      FROM
        upward_insurance.id_sequence a
      WHERE
        a.type = 'general-journal'`);
}

export async function getChartOfAccount(search: string) {
  return await prisma.$queryRawUnsafe(`
    SELECT 
        a.Acct_Code, a.Acct_Title, a.Short
    FROM
        upward_insurance.chart_account a
    WHERE
        (a.Acct_Code LIKE '%${search}%'
            OR a.Acct_Title LIKE '%${search}%'
            OR a.Short LIKE '%${search}%')
            AND a.Inactive = 0
            AND a.Acct_Type = 'Detail'
    LIMIT 500;
    `);
}

export async function getPolicyIdClientIdRefId(search: string) {
  return await prisma.$queryRawUnsafe(`
  SELECT 
    a.*,
    b.ShortName  as Sub_ShortName,
    b.Acronym,
    LPAD(ROW_NUMBER() OVER (), 3, '0') AS TempID
  FROM
    (SELECT 
        'Client' AS Type,
            aa.entry_client_id AS IDNo,
            aa.sub_account,
            CONCAT(aa.lastname, ', ', aa.firstname) AS Shortname
    FROM
        upward_insurance.entry_client aa UNION ALL SELECT 
        'Agent' AS Type,
            aa.entry_agent_id AS IDNo,
            aa.sub_account,
            CONCAT(aa.lastname, ', ', aa.firstname) AS Shortname
    FROM
        upward_insurance.entry_agent aa UNION ALL SELECT 
        'Employee' AS Type,
            aa.entry_employee_id AS IDNo,
            aa.sub_account,
            CONCAT(aa.lastname, ', ', aa.firstname) AS Shortname
    FROM
        upward_insurance.entry_employee aa UNION ALL SELECT 
        'Supplier' AS Type,
            aa.entry_supplier_id AS IDNo,
            aa.sub_account,
            CONCAT(aa.lastname, ', ', aa.firstname) AS Shortname
    FROM
        upward_insurance.entry_supplier aa UNION ALL SELECT 
        'Fixed Assets' AS Type,
            aa.entry_fixed_assets_id AS IDNo,
            aa.sub_account,
            aa.fullname AS Shortname
    FROM
        upward_insurance.entry_fixed_assets aa UNION ALL SELECT 
        'Others' AS Type,
            aa.entry_others_id AS IDNo,
            aa.sub_account,
            aa.description AS Shortname
    FROM
        upward_insurance.entry_others aa UNION ALL SELECT 
        'Policy Type' AS Type, a.IDNo, b.sub_account, b.Shortname
    FROM
        upward_insurance.policy a
    LEFT JOIN (SELECT 
        aa.entry_client_id AS IDNo,
            CONCAT(aa.lastname, ', ', aa.firstname) AS Shortname,
            aa.sub_account
    FROM
        upward_insurance.entry_client aa UNION ALL SELECT 
        aa.entry_agent_id AS IDNo,
            CONCAT(aa.lastname, ', ', aa.firstname) AS Shortname,
            aa.sub_account
    FROM
        upward_insurance.entry_agent aa UNION ALL SELECT 
        aa.entry_employee_id AS IDNo,
            CONCAT(aa.lastname, ', ', aa.firstname) AS Shortname,
            aa.sub_account
    FROM
        upward_insurance.entry_employee aa UNION ALL SELECT 
        aa.entry_supplier_id AS IDNo,
            CONCAT(aa.lastname, ', ', aa.firstname) AS Shortname,
            aa.sub_account
    FROM
        upward_insurance.entry_supplier aa UNION ALL SELECT 
        aa.entry_fixed_assets_id AS IDNo,
            aa.fullname AS Shortname,
            aa.sub_account
    FROM
        upward_insurance.entry_fixed_assets aa UNION ALL SELECT 
        aa.entry_others_id AS IDNo,
            aa.description AS Shortname,
            aa.sub_account
    FROM
        upward_insurance.entry_others aa) b ON a.IDNo = b.IDNo) a
        LEFT JOIN
    upward_insurance.sub_account b ON a.sub_account = b.Sub_Acct
    WHERE
    a.IDNo LIKE '%${search}%'
        OR a.Shortname LIKE '%${search}%'
    ORDER BY a.Shortname
    LIMIT 500;
      `);
}

export async function getTransactionAccount(search: string) {
  return await prisma.$queryRawUnsafe(`
    SELECT 
        a.Code, a.Description
    FROM
        upward_insurance.transaction_code a
    WHERE
        (a.Code LIKE '%${search}%'
            OR a.Description LIKE '%${search}%')
    ORDER BY a.Description
    LIMIT 500;
    `);
}

export async function addJournalVoucher(data: any) {
  return prisma.journal_voucher.create({ data });
}
export async function addJournalFromJournalVoucher(data: any) {
  return prisma.journal.create({ data });
}

export async function updatePettyCashID(last_count: string) {
  return await prisma.$queryRawUnsafe(`
      UPDATE upward_insurance.id_sequence a 
        SET 
            a.last_count = '${last_count}',
            a.year = DATE_FORMAT(NOW(), '%y'),
            month = DATE_FORMAT(NOW(), '%m')
        WHERE
            a.type = 'general-journal'
      `);
}

export async function searchGeneralJournal(search: string) {
  return await prisma.$queryRawUnsafe(`
    SELECT 
        date_format(Date_Entry , '%m/%d/%Y') as Date_Entry, Source_No, Explanation
    FROM
        upward_insurance.journal_voucher
    WHERE
        LEFT(Explanation, 7) <> '-- Void'
            AND (Source_No LIKE '%${search}%'
            OR Explanation LIKE '%${search}%')
    GROUP BY Date_Entry , Source_No , Explanation
    ORDER BY Date_Entry DESC , Source_No , Explanation

      `);
}
export async function getSelectedSearchGeneralJournal(Source_No: string) {
  return await prisma.$queryRawUnsafe(`
  SELECT 
        a.Branch_Code as BranchCode,
        a.Date_Entry as dateEntry,
        a.Source_No as refNo,
        a.Explanation as explanation,
        a.GL_Acct as code,
        a.cGL_Acct as acctName,
        a.cSub_Acct as subAcctName,
        a.cID_No as ClientName,
        FORMAT(a.Debit,2) as debit,
        FORMAT(a.Credit,2) as credit,
        a.TC as TC_Code,
        a.Remarks as remarks,
        a.Sub_Acct as subAcct,
        a.ID_No as IDNo, 
        a.VAT_Type as vatType,
        OR_Invoice_No as invoice,
        a.VATItemNo AS TempID
    FROM
    upward_insurance.journal_voucher a where a.Source_No ='${Source_No}' order by a.VATItemNo
      `);
}
