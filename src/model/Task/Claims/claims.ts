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
  c.IDNo,
  d.*
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
  LEFT JOIN (
    ${comnputationQry()}
  ) d on a.PolicyNo = d.PolicyNo
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

function comnputationQry() {
  return `
  SELECT 
      format(MIN(b.TotalDue),2) as totaDue,
      if( MAX(ifnull(d.remitted,0)) > 0, format((SUM(a.Credit) - MIN(b.TotalDue) - MIN(ifnull(d.remitted,0))),2) ,format(SUM(a.Credit) - MIN(b.TotalDue),2)) AS  totalpaid,
      if(MAX(ifnull(d.remitted,0)) > 0 , format(MIN(b.TotalDue) - (SUM(a.Credit) - MIN(b.TotalDue) - MAX(ifnull(d.remitted,0))),2) , format(MIN(b.TotalDue) - (MIN(c.accountTotal) - MIN(b.TotalDue)),2))  as balance,
      format(MAX(ifnull(d.remitted,0)),2) as remitted ,
      MAX(b.PolicyNo) as PolicyNo
    FROM
      journal a
          LEFT JOIN
      policy b ON a.ID_No = b.PolicyNo OR  a.ID_No = b.IDNo 
          LEFT JOIN
      (
      SELECT 
          ID_No,
              IF(SUM(Credit) = SUM(Debit), SUM(Credit), IF(SUM(a.credit) > SUM(a.debit), SUM(a.credit), SUM(a.debit))) AS accountTotal
        FROM
          journal a
    GROUP BY ID_No) AS c ON a.ID_No = c.ID_No 
        left join (
        SELECT 
          IF(SUM(a.Debit) > SUM(a.Credit),
          SUM(a.Debit),
          SUM(a.Credit)) AS remitted,
                MIN(b.PolicyNo) as PolicyNo,
                   MIN(a.ID_No) as ID_No
        FROM
          upward_insurance.journal a
            LEFT JOIN
          upward_insurance.policy b ON a.ID_No = b.IDNo
        WHERE
          a.Explanation LIKE '%remit%'
            AND a.Source_Type = 'GL'
            AND a.GL_Acct = '4.02.01'
            
        GROUP BY Source_No
      ) d on a.ID_No = d.ID_No OR a.ID_No = d.PolicyNo
    WHERE
    
       (a.Source_Type = 'PL' OR  a.Source_Type = 'OR' OR a.Source_Type = 'GL')
    GROUP BY a.ID_No
  `;
}
export async function claimnsPolicyComputation(id: string) {
  const qry = `
  select  * from (
    ${comnputationQry()}
  ) d
  where d.PolicyNo = '${id}'
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
  const qry = `
  SELECT 
  *
  FROM
  upward_insurance.claims a
  LEFT JOIN
  upward_insurance.claims_documents b ON a.claims_id = b.claims_id 
  left join
  (
    select * from (
    SELECT 
    PolicyNo, DateFrom, DateTo
    FROM
    upward_insurance.vpolicy
    UNION all
    SELECT 
    PolicyNo, DateFrom, DateTo
    FROM
    upward_insurance.fpolicy
    UNION all
    SELECT 
    PolicyNo, PeriodFrom as DateFrom, PeriodTo as DateTo
    FROM 
    upward_insurance.papolicy
    UNION all
    SELECT 
    PolicyNo, DateFrom, DateTo
    FROM
    upward_insurance.mpolicy
    UNION all
    SELECT 
    PolicyNo, PeriodFrom as DateFrom, PeriodTo as DateTo
    FROM
    upward_insurance.msprpolicy
    ) c
  ) d on a.PolicyNo = d.PolicyNo
  left join (${comnputationQry()}) e on a.PolicyNo = e.PolicyNo
  WHERE
  a.claims_id LIKE '%${search}%'
  OR a.AssuredName LIKE '%${search}%'
  OR a.PolicyNo LIKE '%${search}%'
  OR a.ChassisNo LIKE '%${search}%'
  OR a.MotorNo LIKE '%${search}%'
  OR a.Make LIKE '%${search}%'
  OR a.PlateNo LIKE '%${search}%'
  OR a.IDNo LIKE '%${search}%'
  OR a.BLTFileNo LIKE '%${search}%'
  OR a.BodyType LIKE '%${search}%'
  OR a.CoverNo LIKE '%${search}%'
  OR a.ORNo LIKE '%${search}%'
  OR a.Account LIKE '%${search}%'
  OR a.Model LIKE '%${search}%'
  ORDER BY a.AssuredName ASC
  LIMIT 50
`;

console.log(qry)
  return await prisma.$queryRawUnsafe(qry);
}
