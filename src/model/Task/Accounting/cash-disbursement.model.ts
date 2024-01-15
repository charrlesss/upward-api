import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function GenerateCashDisbursementID() {
    return await prisma.$queryRawUnsafe(`
      SELECT 
        concat(DATE_FORMAT(NOW(), '%y%m'),'-', LEFT(a.last_count ,length(a.last_count) -length(a.last_count + 1)),a.last_count + 1) as id   
      FROM
        upward_insurance.id_sequence a
      WHERE
        a.type = 'cash-disbursement'`);
  }