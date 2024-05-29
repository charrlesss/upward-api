import { PrismaClient } from "@prisma/client";
import { __DB_URL } from "../../controller";


export async function addBank(data: any) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.bank.create({
    data,
  });
}
export async function findBank(Bank_Code: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.bank.findUnique({ where: { Bank_Code } });
}
export async function updateBank(data: any) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.bank.update({
    data,
    where: {
      Bank_Code: data.Bank_Code,
    },
  });
}

export async function removeBank(Bank_Code: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.bank.delete({
    where: {
      Bank_Code,
    },
  });
}

export async function getBanks(bankSearch: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.$queryRawUnsafe(
    `select IF(a.Inactive = 0 , 'YES','NO') as Inactive,a.Bank_Code,a.Bank from bank a where a.Bank_Code LIKE '%${bankSearch}%' OR   a.Bank LIKE '%${bankSearch}%'`
  );
}
