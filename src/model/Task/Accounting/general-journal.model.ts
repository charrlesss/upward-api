import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
    select * from (
        SELECT 
          'Client' AS Type,
          aa.entry_client_id AS IDNo,
          CONCAT(aa.lastname, ', ', aa.firstname) AS Shortname
      FROM
          upward_insurance.entry_client aa 
      UNION ALL SELECT 
          'Agent' AS Type,
          aa.entry_agent_id AS IDNo,
          CONCAT(aa.lastname, ', ', aa.firstname) AS Shortname
      FROM
          upward_insurance.entry_agent aa 
      UNION ALL SELECT 
          'Employee' AS Type,
          aa.entry_employee_id AS IDNo,
          CONCAT(aa.lastname, ', ', aa.firstname) AS Shortname
      FROM
          upward_insurance.entry_employee aa 
      UNION ALL SELECT 
          'Supplier' AS Type,
          aa.entry_supplier_id AS IDNo,
          CONCAT(aa.lastname, ', ', aa.firstname) AS Shortname
      FROM
          upward_insurance.entry_supplier aa 
      UNION ALL SELECT 
          'Fixed Assets' AS Type,
          aa.entry_fixed_assets_id AS IDNo,
          aa.fullname AS Shortname
      FROM
          upward_insurance.entry_fixed_assets aa 
      UNION ALL SELECT 
          'Others' AS Type,
          aa.entry_others_id AS IDNo,
          aa.description AS Shortname
      FROM
          upward_insurance.entry_others aa 
      UNION ALL SELECT 
          'Plocy Type' AS Type, a.IDNo, b.Shortname
      FROM
          upward_insurance.policy a
              LEFT JOIN
          (SELECT 
              aa.entry_client_id AS IDNo,
                  CONCAT(aa.lastname, ', ', aa.firstname) AS Shortname
          FROM
              upward_insurance.entry_client aa UNION ALL SELECT 
              aa.entry_agent_id AS IDNo,
                  CONCAT(aa.lastname, ', ', aa.firstname) AS Shortname
          FROM
              upward_insurance.entry_agent aa UNION ALL SELECT 
              aa.entry_employee_id AS IDNo,
                  CONCAT(aa.lastname, ', ', aa.firstname) AS Shortname
          FROM
              upward_insurance.entry_employee aa UNION ALL SELECT 
              aa.entry_supplier_id AS IDNo,
                  CONCAT(aa.lastname, ', ', aa.firstname) AS Shortname
          FROM
              upward_insurance.entry_supplier aa UNION ALL SELECT 
              aa.entry_fixed_assets_id AS IDNo, aa.fullname AS Shortname
          FROM
              upward_insurance.entry_fixed_assets aa UNION ALL SELECT 
              aa.entry_others_id AS IDNo, aa.description AS Shortname
          FROM
              upward_insurance.entry_others aa) b ON a.IDNo = b.IDNo
      ) a
      where a.IDNo LIKE '%${search}%' OR a.Shortname LIKE '%${search}%'
      ORDER BY a.Shortname
      LIMIT 500;
      `);
}
