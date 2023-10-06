import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface SubAccountType {
  Acronym: string;
  ShortName: string;
  Description: string;
}
export async function createSubAccount(data: SubAccountType) {
  return await prisma.sub_Account.create({ data });
}
export async function updateSubAccount(data: SubAccountType, Sub_Acct: string) {
  return await prisma.sub_Account.update({ data, where: { Sub_Acct } });
}
export async function deleteSubAccount(Sub_Acct: string) {
  return await prisma.sub_Account.delete({ where: { Sub_Acct } });
}

export async function searchSubAccount(
  subaccountSearch: string,
  hasLimit: boolean = false
) {
  const query = ` 
  SELECT 
    a.Sub_Acct,
    a.Acronym,
    a.ShortName,
    a.Description,
    (DATE_FORMAT(a.createdAt, '%Y-%m-%d')) as createdAt
  FROM
  upward.sub_account a
  where 
  a.Acronym like '%${subaccountSearch}%'
  OR a.ShortName like '%${subaccountSearch}%'
  OR a.Description like '%${subaccountSearch}%'
  ORDER BY a.createdAt desc 
  ${hasLimit ? "" : "limit 500"}`;

  return await prisma.$queryRawUnsafe(query);
}
