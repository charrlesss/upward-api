import { PrismaClient } from "@prisma/client";
import { __DB_URL } from "../../controller";
// const prisma = new PrismaClient();

interface CTPLType {
  Prefix: string;
  Type: string;
  NumSeriesFrom: string;
  NumSeriesTo: string;
  Cost: string;
  CreatedBy: string;
  ctplId: any;
}

export async function searchCTPL(
  ctplSearch: string,
  hasLimit: boolean = false
) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
      SELECT 
          a.ctplId,
          a.Prefix,
          a.ctplType,
          a.NumSeriesFrom,
          a.CreatedBy,
          CAST( a.Cost AS DECIMAL(10, 2)) as Cost,
          a.NumSeriesTo,
          (DATE_FORMAT(a.createdAt, '%Y-%m-%d')) as createdAt
      FROM
            ctplregistration a
          where 
          a.Prefix like '%${ctplSearch}%'
          OR  a.Cost like '%${ctplSearch}%'
          OR  a.NumSeriesFrom like '%${ctplSearch}%'
          OR  a.NumSeriesTo like '%${ctplSearch}%'
          ORDER BY a.Prefix asc
          ${hasLimit ? "" : "limit 500"}
      `;
  const data = await prisma.$queryRawUnsafe(query);

  const convertCostToFixed = (data: any) => {
    return data.map((item: any) => ({
      ...item,
      Cost: parseFloat(item.Cost).toFixed(2),
    }));
  };

  return convertCostToFixed(data);
}
export async function getPrefix() {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.ctplprefix.findMany({ select: { prefixName: true } });
}
export async function getType() {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.ctpltype.findMany({ select: { typeName: true } });
}
export async function addCTPL(data: CTPLType) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.ctplregistration.create({ data });
}
export async function updateCTPL(data: CTPLType, ctplId: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.ctplregistration.update({
    data: {
      Prefix: data.Prefix,
      Cost: data.Cost,
    },
    where: { ctplId },
  });
}
export async function deleteCTPL(ctplId: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.ctplregistration.delete({ where: { ctplId } });
}

export async function findCtplById(ctplId: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.ctplregistration.findUnique({ where: { ctplId } });
}
export async function findCtplfExist(where: {
  Prefix: string;
  NumSeriesFrom: string;
  NumSeriesTo: string;
}) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.$queryRawUnsafe(`
      SELECT 
        *
    FROM
          ctplregistration a
    WHERE
    a.Prefix = '${where.Prefix}'
        AND a.NumSeriesFrom = '${where.NumSeriesFrom}'
        AND a.NumSeriesTo = '${where.NumSeriesTo}'`);
}
