import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function addBankAccount(data: any) {
  return await prisma.bankaccounts.create({ data });
}

export async function updateBankAccount(data: any, Auto: string) {
  return await prisma.bankaccounts.update({ data, where: { Auto } });
}
export async function removeBankAccount(Auto: string) {
  return await prisma.bankaccounts.delete({ where: { Auto } });
}

export async function getBankAccount(bankAccountSearch: string) {
  return await prisma.$queryRawUnsafe(`
    SELECT 
    IF(a.Inactive = 0 ,'NO' , 'YES') as Inactive,
    a.Account_No,
    a.Account_Name,
    a.Account_Type,
    a.Account_ID,
    a.IDNo,
    a.Identity,
    a.Desc,
    a.Auto
    FROM
        upward_insurance.bankaccounts a
    WHERE
    a.Account_No LIKE '%${bankAccountSearch}%'
        OR a.Account_Name LIKE '%${bankAccountSearch}%'
        OR a.Account_Type LIKE '%${bankAccountSearch}%'
        OR a.Identity LIKE '%${bankAccountSearch}%'
        OR a.IDNo LIKE '%${bankAccountSearch}%'
		OR a.Account_ID LIKE '%${bankAccountSearch}%'
        limit 100;
    `);
}
