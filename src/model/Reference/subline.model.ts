import { PrismaClient } from "@prisma/client";
import { __DB_URL } from "../../controller";


interface SublineType {
  Line: string;
  SublineName: string;
}

export async function searchSubline(
  sublineSearch: string,
  hasLimit: boolean = false
) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query2 = `
    SELECT 
        a.ID,
        a.Line,
        a.SublineName,
        (DATE_FORMAT(a.createdAt, '%Y-%m-%d')) as createdAt
    FROM 
          subline a
    where 
        a.Line like '%${sublineSearch}%'
        OR a.SublineName like '%${sublineSearch}%'
    ORDER BY a.SublineName asc
    ${hasLimit ? "" : "limit 500"}
    `;
  return await prisma.$queryRawUnsafe(query2);
}

export async function findSubline(Line: string, SublineName: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.subline.findMany({ where: { Line, SublineName } });
}
export async function getline() {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query1 = `
      SELECT
          a.Line
      FROM
            subline a
      GROUP BY a.Line;
      `;
  return await prisma.$queryRawUnsafe(query1);
}

export async function addSubline(data: SublineType) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.subline.create({
    data,
  });
}

export async function updateSubline({
  ID,
  SublineName,
}: {
  ID: string;
  SublineName: string;
}) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.subline.update({
    data: {
      SublineName,
    },
    where: {
      ID,
    },
  });
}

export async function deletesubline(ID: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.subline.delete({ where: { ID } });
}


export async function getNextId(tablename:string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const result:any = await prisma.$queryRawUnsafe(`
    SELECT AUTO_INCREMENT
    FROM information_schema.TABLES
    WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = '${tablename}'`);

  return result
}