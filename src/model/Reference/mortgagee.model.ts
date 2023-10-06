import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface MortgageeType {
  Mortgagee: string;
  Policy: string;
}

export async function findMortgagee(Mortgagee: string) {
  return await prisma.mortgagee.findUnique({ where: { Mortgagee } });
}
export async function deleteMortgagee(Mortgagee: string) {
  return await prisma.mortgagee.delete({ where: { Mortgagee } });
}
export async function addMortgagee(data: MortgageeType) {
  return await prisma.mortgagee.create({ data });
}
export async function updateMortgagee({ Policy, Mortgagee }: MortgageeType) {
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
  const query1 = `
    SELECT 
        a.Policy
    FROM
        upward.mortgagee a
    GROUP BY a.Policy;
    `;
  return await prisma.$queryRawUnsafe(query1);
}
export async function searchMortgagee(
  mortgageeSearch: string,
  hasLimit: boolean = false
) {
  const query2 = `
    SELECT 
        a.Mortgagee,
        a.Policy,
        (DATE_FORMAT(a.createdAt, '%Y-%m-%d')) as createdAt
    FROM
        upward.mortgagee a
        where 
            a.Mortgagee like '%${mortgageeSearch}%'
            OR a.Policy like '%${mortgageeSearch}%'
        ORDER BY a.Policy asc
        ${hasLimit ? "" : "limit 500"}
    `;
  return await prisma.$queryRawUnsafe(query2);
}


