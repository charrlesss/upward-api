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

export async function getSubAccount() {
  const query = `
  SELECT a.Acronym FROM upward_insurance.sub_account a order by Acronym;`;
  return await prisma.$queryRawUnsafe(query);
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
