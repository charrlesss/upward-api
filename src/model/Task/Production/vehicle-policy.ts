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
      MIN(CAST(Credit AS DECIMAL (18 , 2 ))) as Cost
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
