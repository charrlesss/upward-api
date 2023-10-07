import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface RateType {
  Account: string;
  Line: string;
  Type: string;
  Rate: string;
}

export async function addRate(data: RateType) {
  return await prisma.rates.create({ data });
}
export async function searchRate(
  mortgageeSearch: string,
  hasLimit: boolean = false
) {
  const query = `
  SELECT 
    a.ID,
    a.Account,
    a.Line,
    a.Type,
    a.Rate,
    (DATE_FORMAT(a.createdAt, '%Y-%m-%d')) as createdAt
  FROM
  upward.rates a
    where
        a.ID like '%${mortgageeSearch}%'
        OR a.Account like '%${mortgageeSearch}%'
        OR a.Line like '%${mortgageeSearch}%'
        OR a.Type like '%${mortgageeSearch}%'
        OR a.Rate like '%${mortgageeSearch}%'
    ORDER BY a.Account asc
    ${hasLimit ? "" : "limit 500"}
    `;
  return await prisma.$queryRawUnsafe(query);
}
export async function getPolicyAccounts() {
  const query = ` 
    SELECT 
        a.Account
    FROM
    upward.policy_account a
    `;
  return await prisma.$queryRawUnsafe(query);
}
export async function getBonds() {
  const query = ` 
    SELECT 
        a.SublineName
    FROM
    upward.subline a
    WHERE
    a.Line = 'Bonds';
    `;
  return await prisma.$queryRawUnsafe(query);
}
export async function getFire() {
  const query = ` 
      SELECT 
          a.SublineName
      FROM
      upward.subline a
      WHERE
      a.Line = 'Fire';
      `;
  return await prisma.$queryRawUnsafe(query);
}
export async function updateRate(ID: number, Type: string, Rate: string) {
  return await prisma.rates.update({ where: { ID }, data: { Type, Rate } });
}
export async function addRates(data: RateType) {
  await prisma.rates.create({ data });
}
export async function deleteRate(ID: number) {
  await prisma.rates.delete({ where:{ID} });
}
