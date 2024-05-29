import { PrismaClient } from "@prisma/client";
import { __DB_URL } from "../../../controller";


export async function getTPL_IDS(search: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.$queryRawUnsafe(`
  SELECT 
      MIN(Source_No) AS Source_No,
      MIN(CAST(Credit AS DECIMAL (18 , 2 ))) as Cost ,
      Source_No_Ref_ID
  FROM
      journal
  WHERE
          Explanation = 'CTPL Registration'
          AND Credit > 0
          AND Remarks IS NULL 
          AND Source_No like '%${search}%'
  GROUP BY Source_No_Ref_ID
  ORDER BY Source_No ASC
  `);
}

export async function createJournal(data: any) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.journal.create({ data });
}

export async function deleteJournal(Source_No_Ref_ID: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.journal.deleteMany({
    where: {
      Source_No_Ref_ID,
    },
  });
}

export async function findManyJournal(Source_No_Ref_ID: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

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
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

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
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.policy.findUnique({ where: { PolicyNo } });
}
export async function getPolicy(
  account: string,
  form_type: string,
  policy_no: string
) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
  SELECT * FROM policy 
  WHERE 
  Account = '${account}'
  AND PolicyType = '${form_type}' 
  AND PolicyNo = '${policy_no}'
  `;
  return await prisma.$queryRawUnsafe(query);
}
export async function getRate(account: string, line: string, type: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
  select Rate from Rates 
  where 
  trim(Account) = '${account.trim()}' 
  and trim(Line) = '${line}' 
  and trim(Type) = '${type}'
  `;
  console.log(query);
  return await prisma.$queryRawUnsafe(query);
}

export async function getClientById(entry_client_id: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
  SELECT 
    b.*
  FROM 
  entry_client a
    LEFT JOIN
  sub_account b ON a.sub_account = b.Sub_Acct
  where a.entry_client_id ='${entry_client_id}'
  `;
  return await prisma.$queryRawUnsafe(query);
}

export async function deletePolicyByVehicle(
  form_type: string,
  policyNo: string
) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
  delete from policy 
  where 
  PolicyType = '${form_type}' 
  and PolicyNo = '${policyNo}'
  `;
  console.log(query);
  return await prisma.$queryRawUnsafe(query);
}

export async function deletePolicy(
  subAccount: string,
  form_type: string,
  policyNo: string
) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
  delete from policy 
  where 
  Account = '${subAccount}' 
  and PolicyType = '${form_type}' 
  and PolicyNo = '${policyNo}'
  `;
  console.log(query);
  return await prisma.$queryRawUnsafe(query);
}

export async function deleteVehiclePolicy(form_type: string, policyNo: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
  delete from vpolicy 
  where 
   PolicyNo = '${policyNo}'
  `;
  return await prisma.$queryRawUnsafe(query);
}

export async function deleteJournalBySource(
  source_no: string,
  source_type: string
) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
  delete from journal 
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
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

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
  Remarks: string;
}) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

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
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.journal.create({
    data,
  });
}

export async function updateJournalByPolicy(
  Source_No: string,
  Explanation: string
) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

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
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

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
    SELECT  MAX(PolicyNo) as PolicyNo FROM vpolicy a where left(a.PolicyNo ,2) = 'TP' and a.PolicyType = 'COM' ORDER BY a.PolicyNo ASC
  ) a`);
}

export async function searchDataVPolicy(
  search: string,
  policyType: string,
  isTemp: boolean
) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.$queryRawUnsafe(`
      SELECT 
      a.*,
      b.*,
      if(c.company = '', concat(c.firstname,', ',c.middlename,', ',c.lastname) , c.company) as client_fullname,
      c.address as address,
      concat(d.firstname,', ',d.middlename,', ',d.lastname) as agent_fullname,
      c.sale_officer
    FROM
      policy a
          LEFT JOIN
        vpolicy b ON a.PolicyNo = b.PolicyNo
        left join entry_client c on a.IDNo = c.entry_client_id 
        left join entry_agent d on a.AgentID = d.entry_agent_id 
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
