import { PrismaClient } from "@prisma/client";
import { __DB_URL } from "../../controller";


interface MortgageeType {
  Mortgagee: string;
  Policy: string;
}

export async function findMortgagee(Mortgagee: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.mortgagee.findUnique({ where: { Mortgagee } });
}
export async function deleteMortgagee(Mortgagee: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.mortgagee.delete({ where: { Mortgagee } });
}
export async function addMortgagee(data: MortgageeType) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.mortgagee.create({ data });
}
export async function updateMortgagee({ Policy, Mortgagee }: MortgageeType) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.mortgagee.update({
    data: {
      Policy,
    },
    where: {
      Mortgagee,
    },
  });
}
export async function getMortgageePolicy() {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query1 = `
    SELECT 
        a.Policy
    FROM
          mortgagee a
    GROUP BY a.Policy;
    `;
  return await prisma.$queryRawUnsafe(query1);
}
export async function searchMortgagee(
  mortgageeSearch: string,
  hasLimit: boolean = false
) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query2 = `
    SELECT 
        a.Mortgagee,
        a.Policy,
        (DATE_FORMAT(a.createdAt, '%Y-%m-%d')) as createdAt
    FROM
          mortgagee a
        where 
            a.Mortgagee like '%${mortgageeSearch}%'
            OR a.Policy like '%${mortgageeSearch}%'
        ORDER BY a.Policy asc
        ${hasLimit ? "" : "limit 500"}
    `;
  return await prisma.$queryRawUnsafe(query2);
}


