import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getClients(search: string) {
  const query = `
  SELECT 
    Policy.PolicyNo,
    client.Shortname AS Shortname,
    Policy.PolicyType AS PolicyType
FROM
    (SELECT 
        *
    FROM
        Policy
    WHERE
        Policy.PolicyType <> 'TPL' AND 
        Policy.PolicyType <> 'G02' AND
        Policy.PolicyType <> 'G13' AND
        Policy.PolicyType <> 'G16' AND
        Policy.PolicyType <> 'MSPR') AS Policy
        LEFT JOIN
    (SELECT 
        *
    FROM
        VPolicy
    WHERE
        VPolicy.PolicyType <> 'TPL') AS VPolicy ON Policy.PolicyNo = VPolicy.PolicyNo
        LEFT JOIN
    MPolicy ON Policy.PolicyNo = MPolicy.PolicyNo
        LEFT JOIN
    PAPolicy ON Policy.PolicyNo = PAPolicy.PolicyNo
        LEFT JOIN
    CGLPolicy ON Policy.PolicyNo = CGLPolicy.PolicyNo
        LEFT JOIN
    FPolicy ON Policy.PolicyNo = FPolicy.PolicyNo
        LEFT JOIN
    (SELECT 
        aa.entry_client_id AS IDNo,
            aa.sub_account,
            CONCAT(aa.lastname, ',', aa.firstname) AS Shortname
    FROM
        upward_insurance.entry_client aa UNION ALL SELECT 
        aa.entry_agent_id AS IDNo,
            NULL AS sub_account,
            CONCAT(aa.lastname, ',', aa.firstname) AS Shortname
    FROM
        upward_insurance.entry_agent aa UNION ALL SELECT 
        aa.entry_employee_id AS IDNo,
            aa.sub_account,
            CONCAT(aa.lastname, ',', aa.firstname) AS Shortname
    FROM
        upward_insurance.entry_employee aa UNION ALL SELECT 
        aa.entry_supplier_id AS IDNo,
            NULL AS sub_account,
            CONCAT(aa.lastname, ',', aa.firstname) AS Shortname
    FROM
        upward_insurance.entry_supplier aa UNION ALL SELECT 
        aa.entry_fixed_assets_id AS IDNo,
            NULL AS sub_account,
            aa.fullname AS Shortname
    FROM
        upward_insurance.entry_fixed_assets aa UNION ALL SELECT 
        aa.entry_others_id AS IDNo,
            NULL AS sub_account,
            aa.description AS Shortname
    FROM
        upward_insurance.entry_others aa) client ON Policy.IDNo = client.IDNo
WHERE
        Policy.PolicyNo LIKE '%${search}%'
        OR client.Shortname LIKE '%${search}%'
        OR Policy.PolicyType LIKE '%${search}%'
LIMIT 500
    `;

  return await prisma.$queryRawUnsafe(query);
}

export async function getSelectedClient(policyType: string, policyNo: string) {
  const query = ` call template_renewal_notice('${policyType}','${policyNo}');`;
  return await prisma.$queryRawUnsafe(query);
}
