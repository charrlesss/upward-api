import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getClientCheckedList(search:string,PNo:string){
   const query =  `
   SELECT 
        CAST(ROW_NUMBER() OVER () AS CHAR) AS temp_id,
        a.Check_No,
        DATE_FORMAT(a.Check_Date, '%M %d %Y') as Check_Date,
        FORMAT(a.Check_Amnt, '#,##0.00') AS Amount,
        CONCAT(a.Bank, ' / ', a.Branch) as Bank_Branch,
        a.Remarks,
        a.Bank,
        a.Branch,
        a.Check_Remarks,
        b.Bank as BankName
    FROM
        upward_insurance.pdc a
    LEFT JOIN  upward_insurance.bank b ON a.Bank = b.Bank_Code
    WHERE
        (a.Check_No LIKE '%${search}%' OR a.Bank LIKE '%${search}%'
            OR a.Branch LIKE '%${search}%')
            AND (a.PNo = '${PNo}')
            AND (a.ORNum IS NULL OR a.ORNum = '')
    ORDER BY a.Check_Date
    LIMIT 500
    `
    return  await prisma.$queryRawUnsafe(query)
}

export async function getTransactionBanksDetails() {
    const query =`SELECT 
            *
        FROM
            upward_insurance.transaction_code a
                LEFT JOIN
            upward_insurance.chart_account b ON a.Acct_Code = b.Acct_Code
        WHERE
        a.code = 'CHK' OR a.code = 'CSH'`
    return await prisma.$queryRawUnsafe(query)
}

export async function getTransactionDescription() {
    const query =`
        SELECT 
            a.Description as label,
            b.Acct_Code,
            b.Acct_Title,
            a.Code
        FROM
            upward_insurance.transaction_code a
                LEFT JOIN
            upward_insurance.chart_account b ON a.Acct_Code = b.Acct_Code
        WHERE
            b.Acct_Code IS NOT NULL
        ORDER BY Description`
    return await prisma.$queryRawUnsafe(query)
}