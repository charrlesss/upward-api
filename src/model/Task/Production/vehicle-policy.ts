import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getClients(search: string, hasLimit: boolean = false) {
  const query = `
      SELECT
      a.entry_client_id,
      a.address,
      IF(a.company = '', concat(a.firstname,' ',a.middlename,' ',a.lastname), a.company) AS fullname,
      'Client' AS entry_type
      FROM
      upward_insurance.entry_client a
      where
      a.entry_client_id like '%${search}%'
      OR a.firstname like '%${search}%'
      OR a.lastname like '%${search}%'
      OR a.company like '%${search}%'
      ORDER BY a.createdAt desc
      limit 250
      `;
  return await prisma.$queryRawUnsafe(query);
}
export async function getAgents(search: string, hasLimit: boolean = false) {
  const query = `
      SELECT
      a.entry_agent_id,
      concat(a.firstname,' ',a.middlename,' ',a.lastname) as fullname,
      'Agent' AS entry_type
      FROM
      upward_insurance.entry_agent a
      where
      a.entry_agent_id like '%${search}%'
      OR a.firstname like '%${search}%'
      OR a.lastname like '%${search}%'
      ORDER BY a.createdAt desc
      limit 250
      `;
  return await prisma.$queryRawUnsafe(query);
}
export async function getPolicyAccount(type: string) {
  return await prisma.policy_account.findMany({
    select: {
      Account: true,
    },
    where: {
      [type]: {
        equals: true,
      },
    },
  });
}
export async function getPolicyType(Line: string) {
  return await prisma.subline.findMany({
    select: {
      SublineName:true
    },
    where: {
      Line
    },
  });
}
export async function getMortgagee(type: string) {
  const equals: any = {
    COM: "Comprehensive",
    TPL: "TPL",
    FIRE: "FIRE",
  };

  return await prisma.mortgagee.findMany({
    select: {
      Mortgagee: true,
    },
    where: {
      Policy: {
        equals: equals[type],
      },
    },
  });
}
export async function getRates(type: string) {
  if (type === "COM") {
    const query = `
       select distinct type from upward_insurance.rates where Line = 'Vehicle' and SUBSTRING(type,1,3) = '${type}'
    `;
    return await prisma.$queryRawUnsafe(query);
  }
  const query = `
  select distinct type from upward_insurance.rates where Line = 'Vehicle' and SUBSTRING(type,1,3) = '${type}'
`;
  return await prisma.$queryRawUnsafe(query);
}
export async function getTPL_IDS(search: string) {
  return await prisma.$queryRawUnsafe(`
  SELECT 
      MIN(Source_No) AS Source_No,
      MIN(CAST(Credit AS DECIMAL (18 , 2 ))) as Cost ,
      Source_No_Ref_ID
  FROM
      upward_insurance.journal
  WHERE
          Explanation = 'CTPL Registration'
          AND Credit > 0
          AND Remarks IS NULL 
          AND Source_No like '%${search}%'
  GROUP BY Source_No_Ref_ID
  ORDER BY Source_No ASC
  `);
}
export async function getSubAccount() {
  const query = `
  SELECT a.Acronym FROM upward_insurance.sub_account a order by Acronym;`;
  return await prisma.$queryRawUnsafe(query);
}

export async function createJournal(data: any) {
  return await prisma.journal.create({ data });
}

export async function deleteJournal(Source_No_Ref_ID: string) {
  return await prisma.journal.deleteMany({
    where: {
      Source_No_Ref_ID,
    },
  });
}

export async function findManyJournal(Source_No_Ref_ID: string) {
  return await prisma.journal.findMany({
    where: {
      Source_No_Ref_ID,
    },
  });
}

export async function updateJournal(
  Source_No: string,
  Cost: string,
  AutoNo: bigint
) {
  return await prisma.journal.update({
    data: {
      Credit: Cost,
      Source_No,
    },
    where: {
      AutoNo,
    },
  });
}

export async function findPolicy(PolicyNo: string) {
  return await prisma.policy.findUnique({ where: { PolicyNo } });
}
export async function getPolicy(
  account: string,
  form_type: string,
  policy_no: string
) {
  const query = `
  SELECT * FROM upward_insurance.policy 
  WHERE 
  Account = '${account}'
  AND PolicyType = '${form_type}' 
  AND PolicyNo = '${policy_no}'
  `;
  return await prisma.$queryRawUnsafe(query);
}
export async function getRate(account: string, line: string, type: string) {
  const query = `
  select Rate from Rates 
  where 
  Account = '${account}' 
  and Line = '${line}' 
  and Type = '${type}'
  `;
  return await prisma.$queryRawUnsafe(query);
}

export async function getClientById(entry_client_id: string) {
  const query = `
  SELECT 
    b.*
  FROM 
  upward_insurance.entry_client a
    LEFT JOIN
  upward_insurance.sub_account b ON a.sub_account = b.Sub_Acct
  where a.entry_client_id ='${entry_client_id}'
  `;
  return await prisma.$queryRawUnsafe(query);
}

export async function deletePolicy(
  subAccount: string,
  form_type: string,
  policyNo: string
) {
  const query = `
  delete from upward_insurance.policy 
  where 
  Account = '${subAccount}' 
  and PolicyType = '${form_type}' 
  and PolicyNo = '${policyNo}'
  `;
  return await prisma.$queryRawUnsafe(query);
}

export async function deleteVehiclePolicy(
  subAccount: string,
  form_type: string,
  policyNo: string
) {
  const query = `
  delete from upward_insurance.vpolicy 
  where 
  Account = '${subAccount}' 
  and PolicyType = '${form_type}' 
  and PolicyNo = '${policyNo}'
  `;
  return await prisma.$queryRawUnsafe(query);
}

export async function deleteJournalBySource(
  source_no: string,
  source_type: string
) {
  const query = `
  delete from upward_insurance.journal 
  where 
  Source_No = '${source_no}' 
  and Source_Type = '${source_type}'
  `;
  return await prisma.$queryRawUnsafe(query);
}

export async function createPolicy(data: {
  IDNo: string;
  Account: string;
  SubAcct: string;
  PolicyType: string;
  PolicyNo: string;
  DateIssued: Date;
  TotalPremium: number;
  Vat: string;
  DocStamp: string;
  FireTax: string;
  LGovTax: string;
  Notarial: string;
  Misc: string;
  TotalDue: string;
  TotalPaid: string;
  Journal: boolean;
  AgentID: string;
  AgentCom: string;
}) {
  return await prisma.policy.create({
    data,
  });
}

export async function createVehiclePolicy(data: {
  PolicyNo: string;
  Account: string;
  PolicyType: string;
  CoverNo: string;
  ORNo: string;
  DateFrom: string;
  DateTo: string;
  Model: string;
  Make: string;
  BodyType: string;
  Color: string;
  BLTFileNo: string;
  PlateNo: string;
  ChassisNo: string;
  MotorNo: string;
  AuthorizedCap: string;
  UnladenWeight: string;
  TPL: string;
  TPLLimit: string;
  PremiumPaid: string;
  EstimatedValue: string;
  Aircon: string;
  Stereo: string;
  Magwheels: string;
  Others: string;
  OthersAmount: string;
  Deductible: string;
  Towing: string;
  RepairLimit: string;
  BodilyInjury: string;
  PropertyDamage: string;
  PersonalAccident: string;
  SecI: string;
  SecIIPercent: string;
  ODamage: string;
  Theft: string;
  Sec4A: string;
  Sec4B: string;
  Sec4C: string;
  AOG: string;
  MortgageeForm: boolean;
  Mortgagee: string;
  Denomination: string;
  AOGPercent: string;
  LocalGovTaxPercent: string;
  TPLTypeSection_I_II: string;
}) {
  return await prisma.vpolicy.create({
    data,
  });
}

export async function createJournalInVP(data: {
  Branch_Code: string;
  Date_Entry: string;
  Source_Type: string;
  Source_No: string;
  Explanation: string;
  GL_Acct: string;
  Sub_Acct: string;
  ID_No: string;
  cGL_Acct: string;
  cSub_Acct: string;
  cID_No: string;
  Debit: number;
  Credit: number;
  TC: string;
  Remarks: string;
  Source_No_Ref_ID: string;
}) {
  return await prisma.journal.create({
    data,
  });
}

export async function updateJournalByPolicy(
  Source_No: string,
  Explanation: string
) {
  return await prisma.journal.updateMany({
    where: {
      Source_No,
      AND: {
        Explanation,
      },
    },
    data: {
      Remarks: "Used",
    },
  });
}

export async function getTempPolicyID() {
  return await prisma.$queryRawUnsafe(`
  select
  concat(
  'TP-',
  right('000000',6 - LENGTH(CAST(CAST(substring(IF(
      a.PolicyNo = '' OR a.PolicyNo IS NULL,'1',a.PolicyNo), 4) as SIGNED) + 1 As SIGNED))),
  IF(
     a.PolicyNo = '' OR a.PolicyNo IS NULL,
      '1',
    CAST(substring(a.PolicyNo,4) as SIGNED) +1
    )
  ) AS tempPolicy_No
   from (
    SELECT  MAX(PolicyNo) as PolicyNo FROM upward_insurance.vpolicy a where left(a.PolicyNo ,2) = 'TP' and a.PolicyType = 'COM' ORDER BY a.PolicyNo ASC
  ) a`);
}

export async function searchDataVPolicy(
  search: string,
  policyType: string,
  isTemp: boolean
) {
  return await prisma.$queryRawUnsafe(`
      SELECT 
      a.*,
      b.*,
      concat(c.firstname,', ',c.middlename,', ',c.lastname) as client_fullname,
      c.address as address,
      concat(d.firstname,', ',d.middlename,', ',d.lastname) as agent_fullname
    FROM
      upward_insurance.policy a
          LEFT JOIN
        upward_insurance.vpolicy b ON a.PolicyNo = b.PolicyNo
        left join upward_insurance.entry_client c on a.IDNo = c.entry_client_id 
        left join upward_insurance.entry_agent d on a.AgentID = d.entry_agent_id 
            WHERE 
        a.PolicyType = '${policyType}' and
       ${
         isTemp
           ? "left(a.PolicyNo,3) = 'TP-'and"
           : "left(a.PolicyNo,3) != 'TP-' and"
       }
       (a.PolicyNo like '%${search}%' or
       c.firstname like '%${search}%' or 
       c.lastname like '%${search}%')
    ORDER BY a.DateIssued desc
    LIMIT 100 
  `);
}
