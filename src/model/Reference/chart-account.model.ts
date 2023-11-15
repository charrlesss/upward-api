
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export async function findChartAccount(Acct_Code:string) {
    return await prisma.chart_account.findUnique({where:{Acct_Code}})
}

export async function addChartAccount(data:any) {
    return await prisma.chart_account.create({data})
}

export async function updateChartAccount(data:any) {
    return await prisma.chart_account.update({data, where:{Acct_Code:data.Acct_Code}})
}
export async function deleteChartAccount(data:any) {
    return await prisma.chart_account.delete({ where:{Acct_Code:data.Acct_Code}})
}

export async function getChartAccount(chartAccountSearch:string) {
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
    upward_insurance.chart_account a
    WHERE
    a.Acct_Code LIKE '%${chartAccountSearch}%'
        OR a.Acct_Title LIKE '%${chartAccountSearch}%'
        OR a.Short LIKE '%${chartAccountSearch}%'
    `)
  }