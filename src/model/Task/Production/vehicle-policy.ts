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
      upward.entry_client a
      where
      a.entry_client_id like '%${search}%'
      OR a.firstname like '%${search}%'
      OR a.lastname like '%${search}%'
      OR a.company like '%${search}%'
      ORDER BY a.createdAt desc
      ${hasLimit ? "" : "limit 250"}
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
      upward.entry_agent a
      where
      a.entry_agent_id like '%${search}%'
      OR a.firstname like '%${search}%'
      OR a.lastname like '%${search}%'
      ORDER BY a.createdAt desc
      ${hasLimit ? "" : "limit 250"}
      `;
  return await prisma.$queryRawUnsafe(query);
}
export async function getPolicyAccount(type: string) {
  if (type === "COM")
    return await prisma.policy_account.findMany({
      select: {
        Account: true,
      },
      where: {
        COM: {
          equals: true,
        },
      },
    });

  return await prisma.policy_account.findMany({
    select: {
      Account: true,
    },
    where: {
      TPL: {
        equals: true,
      },
    },
  });
}
export async function getMortgagee(type: string) {
  if (type === "COM")
    return await prisma.mortgagee.findMany({
      select: {
        Mortgagee: true,
      },
      where: {
        Policy: {
          equals: "Comprehensive",
        },
      },
    });

  return await prisma.mortgagee.findMany({
    select: {
      Mortgagee: true,
    },
    where: {
      Policy: {
        equals: type,
      },
    },
  });
}
export async function getRates(type: string) {
  if (type === "COM") {
    const query = `
       select distinct type from upward.rates where Line = 'Vehicle' and SUBSTRING(type,1,3) = '${type}'
    `;
    return await prisma.$queryRawUnsafe(query);
  }
  const query = `
  select distinct type from upward.rates where Line = 'Vehicle' and SUBSTRING(type,1,3) = '${type}'
`;
  return await prisma.$queryRawUnsafe(query);
}
export async function getTPL_IDS() {
  return await prisma.$queryRawUnsafe(`
  SELECT 
      MIN(Source_No) AS Source_No,
      MIN(CAST(Credit AS DECIMAL (18 , 2 ))) as Cost ,
      Source_No_Ref_ID
  FROM
      upward.journal
  WHERE
      Explanation = 'CTPL Registration'
          AND Credit > 0
          AND Remarks IS NULL
  GROUP BY Source_No_Ref_ID
  ORDER BY Source_No ASC
  `);
}
export async function getSubAccount() {
  const query = `
  SELECT a.Acronym FROM upward.sub_account a order by Acronym;`;
  return await prisma.$queryRawUnsafe(query);
}
interface journalType {
  Source_No: string;
  Branch_Code: string;
  Date_Entry: Date;
  Source_Type: string;
  Explanation: string;
  GL_Acct: string;
  cGL_Acct: string;
  Debit: number;
  Credit: number;
  TC: string;
  Source_No_Ref_ID: string;
}
export async function createJournal(data: journalType) {
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
  SELECT * FROM upward.policy 
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
  upward.entry_client a
    LEFT JOIN
  upward.sub_account b ON a.sub_account = b.Sub_Acct
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
  delete from upward.policy 
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
  delete from upward.vpolicy 
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
  delete from upward.journal 
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
  right('000000',6 - LENGTH(CAST(CAST(substring(a.PolicyNo,4) as SIGNED) + 1 As SIGNED))),
  IF(
      COALESCE(a.PolicyNo, '') = '' OR policyNo IS NULL,
      '000001',
    CAST(substring(a.PolicyNo,4) as SIGNED) + 1
    )
  ) AS tempPolicy_No
   from (
    SELECT  MAX(PolicyNo) as PolicyNo FROM upward.vpolicy a where left(a.PolicyNo ,2) = 'TP' and a.PolicyType = 'COM' ORDER BY a.PolicyNo ASC
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
      upward.policy a
          LEFT JOIN
        upward.vpolicy b ON a.PolicyNo = b.PolicyNo
        left join upward.entry_client c on a.IDNo = c.entry_client_id 
        left join upward.entry_agent d on a.AgentID = d.entry_agent_id 
            WHERE 
        a.PolicyType = '${policyType}' and
       ${isTemp ? "left(a.PolicyNo,3) = 'TP-'and" : "left(a.PolicyNo,3) != 'TP-' and"}
        a.PolicyNo like '%${search}%' and
        c.firstname like '%${search}%' and 
        c.lastname like '%${search}%'
    ORDER BY a.DateIssued desc
    LIMIT 100 
  `);
}


        // //Vehicle policy
        // PolicyAccount: "",
        // PolicyNo: "",
        // CCN: "",
        // ORN: "",
        // rateCost: "",
        // //Period Insurance
        // DateFrom: new Date(),
        // DateTo: new Date(),
        // DateIssued: new Date(),
        // //Insured Unit
        // Model: "charles1",
        // Make: "",
        // TB: "",
        // Color: "",
        // BLTFileNo: "",
        // PlateNo: "",
        // ChassisNo: "",
        // MotorNo: "",
        // AuthorizedCapacity: "",
        // UnladenWeigth: "",
      
        // //==========================
        // //tpl
        // TplType: JSON.stringify({ Account: "", PremuimPaid: "0.00" }),
        // PremiumPaid: "0.00",
        // //compre
        // EVSV: "0.00",
        // Aircon: "0.00",
        // Stereo: "0.00",
        // Magwheels: "0.00",
        // OthersRate: "0.00",
        // OthersDesc: "",
        // CompreType: "",
      
        // Deductible: "0.00",
        // Towing: "0.00",
        // ARL: "0.00",
        // BodyInjury: "0.00",
        // PropertyDamage: "0.00",
        // PersinalAccident: "0.00",
        // Denomination: "",
      
        // //==========================
        // //mortgage
        // Mortgagee: "false",
        // MortgageeForm: "",
        // //Premiums
        // SectionI_II: "0.00",
        // SectionIII: "0.00",
        // OwnDamage: "0.00",
        // Theft: "0.00",
        // SectionIVA: "0.00",
        // SectionIVB: "0.00",
        // PremiumOther: "0.00",
        // AOG: "0.00",
        // AOGPercent: "0.00",
        // TotalPremium: "0.00",
        // Vat: "0.00",
        // DocStamp: "0.00",
        // LocalGovTaxPercent: "0.75",
        // LocalGovTax: "0.00",
        // StradCom: "0.00",
        // TotalDue: "0.00",
        // Type: "charles1",
        // Source_No_Ref_ID: "",