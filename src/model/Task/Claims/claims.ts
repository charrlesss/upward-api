import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getInsuranceList() {
  const qry = `SELECT distinct Account FROM upward_insurance.policy_account;`;
  return await prisma.$queryRawUnsafe(qry);
}

export async function claimsPolicy(search: string) {
  const qry = `
  SELECT 
  a.Account,
  a.PolicyNo,
  a.PlateNo,
  a.Model,
  a.BodyType,
  a.Make,
  a.ChassisNo,
  a.MotorNo,
  a.ORNo,
  a.CoverNo,
  a.BLTFileNo,
  c.Shortname AS AssuredName,
  c.IDNo
FROM
  upward_insurance.vpolicy a
      LEFT JOIN
  upward_insurance.policy b ON a.PolicyNo = b.PolicyNo
      LEFT JOIN
  (SELECT 
      'Client' AS IDType,
          aa.entry_client_id AS IDNo,
          aa.sub_account,
          IF(aa.company = '', CONCAT(aa.lastname, ',', aa.firstname), aa.company) AS Shortname,
          aa.entry_client_id AS client_id
  FROM
      upward_insurance.entry_client aa UNION ALL SELECT 
      'Agent' AS IDType,
          aa.entry_agent_id AS IDNo,
          aa.sub_account,
          CONCAT(aa.lastname, ',', aa.firstname) AS Shortname,
          aa.entry_agent_id AS client_id
  FROM
      upward_insurance.entry_agent aa UNION ALL SELECT 
      'Employee' AS IDType,
          aa.entry_employee_id AS IDNo,
          aa.sub_account,
          CONCAT(aa.lastname, ',', aa.firstname) AS Shortname,
          aa.entry_employee_id AS client_id
  FROM
      upward_insurance.entry_employee aa UNION ALL SELECT 
      'Supplier' AS IDType,
          aa.entry_supplier_id AS IDNo,
          aa.sub_account,
          IF(aa.company = '', CONCAT(aa.lastname, ',', aa.firstname), aa.company) AS Shortname,
          aa.entry_supplier_id AS client_id
  FROM
      upward_insurance.entry_supplier aa UNION ALL SELECT 
      'Fixed Assets' AS IDType,
          aa.entry_fixed_assets_id AS IDNo,
          aa.sub_account,
          aa.fullname AS Shortname,
          aa.entry_fixed_assets_id AS client_id
  FROM
      upward_insurance.entry_fixed_assets aa UNION ALL SELECT 
      'Others' AS IDType,
          aa.entry_others_id AS IDNo,
          aa.sub_account,
          aa.description AS Shortname,
          aa.entry_others_id AS client_id
  FROM
      upward_insurance.entry_others aa) c ON b.IDNo = c.IDNo
WHERE
      a.PolicyNo LIKE '%${search}%' 
      OR a.ORNo LIKE '%${search}%'
      OR a.CoverNo LIKE '%${search}%'
      OR a.Model LIKE '%${search}%'
      OR a.Make LIKE '%${search}%'
      OR a.BodyType LIKE '%${search}%'
      OR a.BLTFileNo LIKE '%${search}%'
      OR a.PlateNo LIKE '%${search}%'
      OR a.ChassisNo LIKE '%${search}%'
      OR a.MotorNo LIKE '%${search}%'
      limit 50
  `;

  return await prisma.$queryRawUnsafe(qry);
}

export async function claimnsPolicyComputationRemittance(id: string) {
  const qry = `
    SELECT 
        IF(SUM(a.Debit) > SUM(a.Credit),
        format(SUM(a.Debit),2),
        format(SUM(a.Credit),2)) AS remitted
  FROM
      upward_insurance.journal a
          LEFT JOIN
      upward_insurance.policy b ON a.ID_No = b.IDNo
  WHERE
      a.Explanation LIKE '%remit%'
          AND a.Source_Type = 'GL'
          AND a.GL_Acct = '4.02.01'
          AND b.PolicyNo = '${id}'
  GROUP BY Source_No

  `;
  return await prisma.$queryRawUnsafe(qry);
}
export async function claimnsPolicyComputation(id: string) {
  const qry = `
  SELECT 
    format(MIN(b.TotalDue),2) as totaDue,
    format(SUM(a.Credit) - MIN(b.TotalDue),2) AS  totalpaid,
    format(MIN(b.TotalDue) - (MIN(c.accountTotal) - MIN(b.TotalDue)),2) balance
  FROM
    journal a
        LEFT JOIN
    policy b ON a.ID_No = b.PolicyNo OR  a.ID_No = b.IDNo 
        LEFT JOIN
    (SELECT 
        ID_No,
            IF(SUM(Credit) = SUM(Debit), SUM(Credit), IF(SUM(a.credit) > SUM(a.debit), SUM(a.credit), SUM(a.debit))) AS accountTotal
    FROM
        journal a
    GROUP BY ID_No) AS c ON a.ID_No = c.ID_No
  WHERE
    a.ID_No = '${id}' and b.PolicyNo  = '${id}'
  GROUP BY a.ID_No;

  `;
  return await prisma.$queryRawUnsafe(qry);
}

export async function GenerateClaimsID() {
  return await prisma.$queryRawUnsafe(`
  SELECT 
    concat(
      DATE_FORMAT(NOW(), '%y%m'),
      '-',
      'C',
      IF(a.year <> date_format(NOW(),'%y'),
      '001', 
        concat(
          LEFT(a.last_count ,length(a.last_count) -length(a.last_count + 1)),
          a.last_count + 1)
        ) 
      ) as id   
  FROM
    upward_insurance.id_sequence a
  WHERE
    a.type = 'claims'`);
}

export async function createClaim({ claimData, documentData }: any) {
  await prisma.claims.create({ data: claimData });
  await prisma.claims_documents.create({ data: documentData });
}
export async function updateClaim({ claimData, documentData, claims_id }: any) {
  await prisma.claims.update({
    data: claimData,
    where: {
      claims_id,
    },
  });
  await prisma.claims_documents.update({
    data: documentData,
    where: {
      claims_id,
    },
  });
}

export async function updateClaimIDSequence(data: any) {
  console.log(data);
  return await prisma.$queryRawUnsafe(`
      update upward_insurance.id_sequence a
      set a.last_count = '${data.last_count}', a.year= '${data.year}', a.month= '${data.month}'
      where a.type ='claims'
    `);
}

export async function searchClaims(search: string) {
  return await prisma.$queryRawUnsafe(`
  SELECT 
    *
   FROM upward_insurance.claims a 
   left join upward_insurance.claims_documents b on a.claims_id = b.claims_id
   where 
    a.claims_id like '%${search}%'
    OR a.AssuredName like '%${search}%'
    OR a.PolicyNo like '%${search}%'
    OR a.ChassisNo like '%${search}%'
    OR a.MotorNo like '%${search}%'
    OR a.Make like '%${search}%'
    OR a.PlateNo like '%${search}%'
    OR a.IDNo like '%${search}%'
    OR a.BLTFileNo like '%${search}%'
    OR a.BodyType like '%${search}%'
    OR a.CoverNo like '%${search}%'
    OR a.ORNo like '%${search}%'
    OR a.Account like '%${search}%'
    OR a.Model like '%${search}%'
  ORDER BY a.AssuredName asc
  LIMIT 50
  ;
  `);
}
