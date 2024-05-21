import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getInsuranceList() {
  const qry = `SELECT distinct Account FROM upward_insurance.policy_account;`;
  return await prisma.$queryRawUnsafe(qry);
}

export async function claimsPolicy(search: string) {
  const qry = `
  select * from (
    SELECT 
    a.PolicyType as policy,
    ifnull(b.Account,'') as Account ,
    ifnull(b.PlateNo,'') as PlateNo ,
    ifnull(b.Model,'') as Model ,
    ifnull(b.BodyType,'') as BodyType ,
    ifnull(b.Make,'') as Make ,
    ifnull(b.ChassisNo,'') as ChassisNo ,
    ifnull(b.MotorNo,'') as MotorNo ,
    ifnull(b.ORNo,'') as ORNo ,
    ifnull(b.CoverNo,'') as CoverNo ,
    ifnull(b.BLTFileNo,'') as BLTFileNo ,
    a.PolicyNo ,
    h.Shortname    AS AssuredName,
    h.IDNo,
    ifnull(b.DateFrom ,
          ifnull(c.DateFrom ,
          ifnull(d.DateFrom ,ifnull(e.PeriodFrom,ifnull(f.PeriodFrom,g.PeriodFrom))))) as DateFrom,
    ifnull(b.DateTo ,
    ifnull(c.DateTo ,
    ifnull(d.DateTo ,ifnull(e.PeriodTo,ifnull(f.PeriodTo,g.PeriodTo))))) as DateTo,
    i.totaDue,
    i.totalpaid,
    i.balance,
    i.remitted
    FROM upward_insurance.policy a
    LEFT JOIN upward_insurance.vpolicy b on a.PolicyNo = b.PolicyNo
    LEFT JOIN upward_insurance.fpolicy c on a.PolicyNo = c.PolicyNo
    LEFT JOIN upward_insurance.mpolicy d on a.PolicyNo = d.PolicyNo
    LEFT JOIN upward_insurance.msprpolicy e on a.PolicyNo = e.PolicyNo
    LEFT JOIN upward_insurance.cglpolicy f on a.PolicyNo = f.PolicyNo
    LEFT JOIN upward_insurance.papolicy g on a.PolicyNo = g.PolicyNo
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
          upward_insurance.entry_others aa) h ON a.IDNo = h.IDNo
    LEFT JOIN (
   ${comnputationQry()}
    ) i on  a.PolicyNo = i.PolicyNo
          where 
          ifnull(b.DateFrom ,
          ifnull(c.DateFrom ,
          ifnull(d.DateFrom ,ifnull(e.PeriodFrom,ifnull(f.PeriodFrom,g.PeriodFrom)))))  is not null
           AND TRIM(a.PolicyType) in ('TPL','COM','MAR','FIRE','PA','CGL') 
    ) a
        where  
       a.PolicyNo LIKE '%${search}%' 
          OR ifnull(a.ORNo ,'') LIKE '%${search}%'
          OR ifnull(a.CoverNo,'')  LIKE '%${search}%'
          OR ifnull(a.Model,'')  LIKE '%${search}%'
          OR ifnull(a.Make,'')  LIKE '%${search}%'
          OR ifnull(a.BodyType,'')  LIKE '%${search}%'
          OR ifnull(a.BLTFileNo,'')  LIKE '%${search}%'
          OR ifnull(a.PlateNo,'')  LIKE '%${search}%'
          OR ifnull(a.ChassisNo,'')  LIKE '%${search}%'
          OR ifnull(a.MotorNo,'')  LIKE '%${search}%' 
          order by  a.PolicyNo asc
          limit 20
  `;
  return await prisma.$queryRawUnsafe(qry);
}
function comnputationQry() {
  // return `
  // SELECT 
  //     format(MIN(b.TotalDue),2) as totaDue,
  //     if( MAX(ifnull(d.remitted,0)) > 0,
  //     if(SUM(a.Credit) - MIN(b.TotalDue) = 0, 0.00, format((SUM(a.Credit) - MIN(b.TotalDue) - MIN(ifnull(d.remitted,0))),2)),
  //      format(SUM(a.Credit) - MIN(b.TotalDue),2)) AS  totalpaid,
  //     if(MAX(ifnull(d.remitted,0)) > 0 , format(MIN(b.TotalDue) - (SUM(a.Credit) - MIN(b.TotalDue) - MAX(ifnull(d.remitted,0))),2) , format(MIN(b.TotalDue) - (MIN(c.accountTotal) - MIN(b.TotalDue)),2))  as balance,
  //     format(MAX(ifnull(d.remitted,0)),2) as remitted ,
  //     MAX(b.PolicyNo) as PolicyNo
  //   FROM
  //     journal a
  //         LEFT JOIN
  //     policy b ON a.ID_No = b.PolicyNo OR  a.ID_No = b.IDNo 
  //         LEFT JOIN
  //     (
  //     SELECT 
  //         ID_No,
  //             IF(SUM(Credit) = SUM(Debit), SUM(Credit), IF(SUM(a.credit) > SUM(a.debit), SUM(a.credit), SUM(a.debit))) AS accountTotal
  //       FROM
  //         journal a
  //   GROUP BY ID_No) AS c ON a.ID_No = c.ID_No 
  //       left join (
  //       SELECT 
  //         IF(SUM(a.Debit) > SUM(a.Credit),
  //         SUM(a.Debit),
  //         SUM(a.Credit)) AS remitted,
  //               MIN(b.PolicyNo) as PolicyNo,
  //                  MIN(a.ID_No) as ID_No
  //       FROM
  //         upward_insurance.journal a
  //           LEFT JOIN
  //         upward_insurance.policy b ON a.ID_No = b.IDNo
  //       WHERE
  //         a.Explanation LIKE '%remit%'
  //           AND a.Source_Type = 'GL'
  //           AND a.GL_Acct = '4.02.01'
            
  //       GROUP BY Source_No
  //     ) d on a.ID_No = d.ID_No OR a.ID_No = d.PolicyNo
  //   WHERE
    
  //      (a.Source_Type = 'PL' OR  a.Source_Type = 'OR' OR a.Source_Type = 'GL')
  //   GROUP BY a.ID_No
  // `;

  return `
  select 
  format(a.TotalDue,2) as totaDue,
    ifnull(format(b.balance,2) , format(a.TotalDue,2)) as balance , 
    format(ifnull(a.TotalDue - b.balance , 0),2) as  totalpaid,
    a.PolicyNo,
    format(ifnull(c.remitted,0),2) as remitted
    from upward_insurance.policy a
    left join
    (
      SELECT  
        SUM(a.Debit) as Debit, 
        SUM(a.Credit) as Credit,
        b.PolicyNo,
        MAX(b.TotalDue) as TotalDue,
        if(SUM(a.Debit) > SUM(a.Credit), MAX(b.TotalDue) - SUM(a.Debit) , MAX(b.TotalDue) - SUM(a.Credit) ) as balance
      FROM upward_insurance.journal a
      left join upward_insurance.policy b on a.ID_No = b.PolicyNo
      where a.Source_Type = 'OR' and  a.GL_Acct = '1.03.01'
      group by b.PolicyNo 
    ) b on a.PolicyNo = b.PolicyNo
    left join (
    SELECT 
            IF(SUM(a.Debit) > SUM(a.Credit),
              SUM(a.Debit),
              SUM(a.Credit)) AS remitted,
          b.PolicyNo
            FROM
              upward_insurance.journal a
                LEFT JOIN
              upward_insurance.policy b ON a.ID_No = b.PolicyNo
            WHERE
              a.Explanation LIKE '%remit%'
                AND a.Source_Type = 'GL'
                AND a.GL_Acct = '4.02.01'
                group by PolicyNo
    ) c on a.PolicyNo = c.PolicyNo
  `
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
export async function createClaim({ claims, claims_details }: any) {
  await prisma.claims.create({ data: claims });
  await prisma.claims_details.create({ data: claims_details });
}
export async function createClaimDetails(data: any) {
  await prisma.claims_details.create({ data });
}
export async function createClaims(data: any) {
  await prisma.claims.create({ data });
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
      a.claims_id,
      MAX(b.AssuredName) AS AssuredName,
      MAX(b.PolicyNo) AS PolicyNo,
      MAX(b.ChassisNo) AS ChassisNo,
      MAX(b.PlateNo) AS PlateNo,
      MAX(b.claim_type) AS claim_type,
      MAX(a.dateAccident) AS dateAccident,
      MAX(a.dateReported) AS dateReported,
      MAX(a.dateInspected) AS dateInspected,
      MAX(a.remarks) AS remarks,
      MAX(a.department) AS department
  FROM
      upward_insurance.claims a
          LEFT JOIN
      upward_insurance.claims_details b ON a.claims_id = b.claims_id
  WHERE
      a.claims_id LIKE '%${search}%'
          OR b.AssuredName LIKE '%${search}%'
          OR b.PolicyNo LIKE '%${search}%'
          OR b.ChassisNo LIKE '%${search}%'
          OR b.MotorNo LIKE '%${search}%'
          OR b.Make LIKE '%${search}%'
          OR b.PlateNo LIKE '%${search}%'
          OR b.IDNo LIKE '%${search}%'
          OR b.BLTFileNo LIKE '%${search}%'
          OR b.BodyType LIKE '%${search}%'
          OR b.CoverNo LIKE '%${search}%'
          OR b.ORNo LIKE '%${search}%'
          OR b.Account LIKE '%${search}%'
          OR b.Model LIKE '%${search}%'
  GROUP BY a.claims_id 
  LIMIT 30
`;

  return await prisma.$queryRawUnsafe(qry);
}
export async function selectedData(claims_id: string) {
  return await prisma.$queryRawUnsafe(`
  SELECT
      a.claims_id,
      a.policy,
      a.claim_type,
      a.insurance,
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
      a.AssuredName,
      a.IDNo,
      a.Account,
      a.status,
      a.others,
      a.basic,
      a.claim_details_id,
      a.claims_no,
      a.DateReceived,
      a.DateClaim,
      ifnull(format(a.AmountClaim ,2),'0.00') as AmountClaim,
      ifnull(format(a.AmountApproved ,2),'0.00') as AmountApproved,
      NameTPPD,
      i.totaDue,
      i.totalpaid,
      i.balance,
      i.remitted,
      ifnull(c.DateFrom ,
      ifnull(d.DateFrom ,
      ifnull(e.DateFrom ,ifnull(f.PeriodFrom,ifnull(g.PeriodFrom,h.PeriodFrom))))) as DateFrom,
      ifnull(c.DateTo ,
      ifnull(d.DateTo ,
      ifnull(e.DateTo ,ifnull(f.PeriodTo,ifnull(g.PeriodTo,h.PeriodTo))))) as DateTo
  FROM upward_insurance.claims_details a
  LEFT JOIN  upward_insurance.policy b on a.PolicyNo = b.PolicyNo
  LEFT JOIN upward_insurance.vpolicy c on a.PolicyNo = c.PolicyNo
  LEFT JOIN upward_insurance.fpolicy d on a.PolicyNo = d.PolicyNo
  LEFT JOIN upward_insurance.mpolicy e on a.PolicyNo = e.PolicyNo
  LEFT JOIN upward_insurance.msprpolicy f on a.PolicyNo = f.PolicyNo
  LEFT JOIN upward_insurance.cglpolicy g on a.PolicyNo = g.PolicyNo
  LEFT JOIN upward_insurance.papolicy h on a.PolicyNo = h.PolicyNo
  LEFT JOIN (${comnputationQry()}) i on a.PolicyNo = i.PolicyNo
  where a.claims_id = '${claims_id}';
  `);
}
export async function deleteClaims(claims_id: string) {
  await prisma.$transaction([
    prisma.claims.delete({ where: { claims_id } }),
    prisma.claims_details.deleteMany({
      where: {
        claims_id,
      },
    }),
  ]);
}
function reportQry(header: string, where: string) {
  return `
SELECT * FROM (
  SELECT 
  '${header}' AS UnitInsured,
  '' AS PolicyNo,
  '' AS ChassisNo,
  '' AS PlateNo,
  '' AS DateReceived,
  '' AS DateClaim,
  '' AS claim_type,
  '' AS AmountClaim,
  '' AS AmountApproved,
  '' AS dateInspected,
  '' AS NameTPPD,
  '' AS status,
  '1' AS header
UNION ALL 
  SELECT 
  IF(b.Model = '' AND b.Make = ''
          AND b.BodyType = '',
      '---',
      CONCAT(b.Model, ' ', b.Make, ' ', b.BodyType)) AS UnitInsured,
  b.PolicyNo,
  IF(b.ChassisNo = '', '---', b.ChassisNo) AS ChassisNo,
  IF(b.PlateNo = '', '---', b.PlateNo) AS PlateNo,
  IF(b.DateReceived IS NULL,
      '---',
      DATE_FORMAT(b.DateReceived, '%m/%d/%Y')) AS DateReceived,
  IF(b.DateClaim IS NULL,
      '---',
      DATE_FORMAT(b.DateClaim, '%m/%d/%Y')) AS DateClaim,
  b.claim_type,
  b.AmountClaim,
  b.AmountApproved,
  IF(a.dateInspected IS NULL,
      '---',
      DATE_FORMAT(a.dateInspected, '%m/%d/%Y')) AS dateInspected,
  IF(b.NameTPPD = '', '---', b.NameTPPD) AS NameTPPD,
  b.status,
  '0' AS header
FROM
  upward_insurance.claims a
      LEFT JOIN
  upward_insurance.claims_details b ON a.claims_id = b.claims_id
  ${where}
  order by PolicyNo asc
) a 
  `;
}

export async function claimReport(addWhere: string, status: number) {
  let qry = "";
  console.log(status);
  if (status === 0) {
    qry = `
    ${reportQry(
      "ONGOING CLAIMS",
      ` where b.status <> 1 AND b.status <> 2 ${addWhere}`
    )}
    union all
    ${reportQry("DENIED CLAIMS", ` where b.status = 1 ${addWhere}`)}
    union all
    ${reportQry("SETTLED CLAIMS", ` where b.status = 2 ${addWhere}`)}
  `;
  } else if (status === 1) {
    qry = `
    ${reportQry(
      "ONGOING CLAIMS",
      ` where b.status <> 1 AND b.status <> 2 ${addWhere}`
    )}
  `;
  } else if (status === 2) {
    qry = `
    ${reportQry("DENIED CLAIMS", ` where b.status = 1 ${addWhere}`)}
  `;
  } else {
    qry = `
    ${reportQry("SETTLED CLAIMS", ` where b.status = 2 ${addWhere}`)}
  `;
  }

  console.log(qry);
  return await prisma.$queryRawUnsafe(qry);
}


// select 
// a.TotalDue,
// a.balance,
// a.TotalDue - balance as  totalPaid,
// a.PolicyNo
//  from (
// SELECT  
// 	SUM(a.Debit) as Debit, 
// 	SUM(a.Credit) as Credit,
// 	b.PolicyNo,
//     MAX(b.TotalDue) as TotalDue,
//     if(SUM(a.Debit) > SUM(a.Credit), MAX(b.TotalDue) - SUM(a.Debit) , MAX(b.TotalDue) - SUM(a.Credit) ) as balance
   
// FROM upward_insurance.journal a
// left join upward_insurance.policy b on a.ID_No = b.PolicyNo
// where a.Source_Type = 'OR' and  a.GL_Acct = '1.03.01' and b.PolicyNo = 'CV-C-510571/23'
// group by b.PolicyNo 
// ) a
