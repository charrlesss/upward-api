import { PrismaClient } from "@prisma/client";
import { __DB_URL } from "../../controller";

interface SubAccountType {
  Acronym: string;
  ShortName: string;
  Description: string;
}
export async function createSubAccount(data: SubAccountType) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.sub_account.create({ data });
}
export async function updateSubAccount(data: SubAccountType, Sub_Acct: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.sub_account.update({ data, where: { Sub_Acct } });
}
export async function deleteSubAccount(Sub_Acct: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.sub_account.delete({ where: { Sub_Acct } });
}

export async function searchSubAccount(
  subaccountSearch: string,
  hasLimit: boolean = false
) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = ` 
  SELECT 
    a.Sub_Acct,
    a.Acronym,
    a.ShortName,
    a.Description,
    (DATE_FORMAT(a.createdAt, '%Y-%m-%d')) as createdAt
  FROM
    sub_account a
  where 
  a.Acronym like '%${subaccountSearch}%'
  OR a.ShortName like '%${subaccountSearch}%'
  OR a.Description like '%${subaccountSearch}%'
  ORDER BY a.createdAt desc 
  ${hasLimit ? "" : "limit 500"}`;

  return await prisma.$queryRawUnsafe(query);
}
