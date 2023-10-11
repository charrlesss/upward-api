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

export async function getPolicyAccount() {
  const query = `
  SELECT '' as Account 
  UNION
  SELECT 
      a.Account
  FROM
      upward.policy_account a
  WHERE
      a.Account IS NOT NULL
  ORDER BY Account`;
  return await prisma.$queryRawUnsafe(query);
}

export async function getSubAccount() {
  const query = `
  SELECT a.Acronym FROM upward.sub_account a order by Acronym;`;
  return await prisma.$queryRawUnsafe(query);
}
