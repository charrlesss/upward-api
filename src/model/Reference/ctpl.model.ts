import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface CTPLType {
  Prefix: string;
  Type: string;
  NumSeriesFrom: number;
  NumSeriesTo: number;
  Cost: string;
  CreatedBy: string;
}

export async function searchCTPL(
  ctplSearch: string,
  hasLimit: boolean = false
) {
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
          upward.ctplregistration a
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
  return await prisma.ctplprefix.findMany({ select: { prefixName: true } });
}
export async function getType() {
  return await prisma.ctpltype.findMany({ select: { typeName: true } });
}
export async function addCTPL(data: CTPLType) {
  return await prisma.ctplregistration.create({ data });
}
export async function updateCTPL(data: CTPLType, ctplId: number) {
  return await prisma.ctplregistration.update({ data, where: { ctplId } });
}
export async function deleteCTPL(ctplId: number) {
  return await prisma.ctplregistration.delete({ where: { ctplId } });
}
