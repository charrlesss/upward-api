import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getBondRate(account: string, type: string) {
  const query = `
    SELECT * FROM rates WHERE
     Account = '${account}' 
     AND Line = 'Bonds'
     AND Type = '${type}'
      `;
  return await prisma.$queryRawUnsafe(query);
}
export async function createMarinePolicy(data: any) {
  return await prisma.mpolicy.create({
    data,
  });
}

export async function createBondsPolicy(data: any) {
  return await prisma.bpolicy.create({
    data:data
  })
}
