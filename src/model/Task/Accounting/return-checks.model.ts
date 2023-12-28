import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GenerateReturnCheckID() {
  return await prisma.$queryRawUnsafe(`
    SELECT 
      concat(a.year,'.', LEFT(a.last_count ,length(a.last_count) -length(a.last_count + 1)),a.last_count + 1) as return_check_id
    FROM
      upward_insurance.id_sequence a
    WHERE
      type = 'return-check';
  ;`);
}
