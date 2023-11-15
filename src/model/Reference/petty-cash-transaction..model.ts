import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export async function getPettyCashTransaction(transactionCodeSearch: any) {
    return await prisma.$queryRawUnsafe(`
      SELECT 
        IF(a.Inactive = 0, 'NO', 'YES') AS Inactive,
        a.Petty_Log,
        a.Purpose,
        a.Acct_Code,
        a.Short
        FROM
        upward_insurance.petty_log a
      WHERE
        a.Acct_Code LIKE '%${transactionCodeSearch}%'
        OR a.Short LIKE '%${transactionCodeSearch}%'
         OR a.Purpose LIKE '%${transactionCodeSearch}%'
      `);
  }
  
export async function addPettyCashTransaction(data:any) {
    return await prisma.petty_log.create({data})
}

export async function updatePettyCashTransaction(data:any) {
    return await prisma.petty_log.update({data,where:{Petty_Log:data.Petty_Log}})
}
export async function deletePettyCashTransaction(data:any) {
    return await prisma.petty_log.delete({where:{Petty_Log:data.Petty_Log}})
}


