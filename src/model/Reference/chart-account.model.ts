import { PrismaClient } from "@prisma/client";
import { __DB_URL } from "../../controller";
// const prisma = new PrismaClient();

export async function findChartAccount(Acct_Code: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.chart_account.findUnique({ where: { Acct_Code } });
}

export async function addChartAccount(data: any) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.chart_account.create({ data });
}

export async function updateChartAccount(data: any) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.chart_account.update({
    data,
    where: { Acct_Code: data.Acct_Code },
  });
}
export async function deleteChartAccount(data: any) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.chart_account.delete({
    where: { Acct_Code: data.Acct_Code },
  });
}

export async function getChartAccount(chartAccountSearch: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.$queryRawUnsafe(`
    SELECT 
    IF(a.IDNo = 0, 'NO', 'YES') AS IDNo,
    IF(a.SubAccnt = 0, 'NO', 'YES') AS SubAccnt,
    IF(a.Inactive = 0, 'NO', 'YES') AS Inactive,
    a.Acct_Code,
    a.Acct_Title,
    a.Short,
    a.Acct_Type
    FROM
      chart_account a
    WHERE
    a.Acct_Code LIKE '%${chartAccountSearch}%'
        OR a.Acct_Title LIKE '%${chartAccountSearch}%'
        OR a.Short LIKE '%${chartAccountSearch}%'
    `);
}
