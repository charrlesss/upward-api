import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getPdcPolicyIdAndCLientId(search: String) {
  const query = ` 
    SELECT 
        'Client ID' AS Type,
        a.entry_client_id AS IDNo,
        concat(a.firstname,', ', a.lastname) AS Name,
        a.entry_client_id as ID 
    FROM upward_insurance.entry_client a  WHERE a.entry_client_id NOT IN (SELECT IDNo FROM upward_insurance.policy)
    union all
    SELECT 
        'Policy ID' AS Type,
        a.PolicyNo AS IDNo,
        concat(b.firstname,', ', b.lastname) AS Name,
        a.IDNo  as ID 
    FROM upward_insurance.policy a
    left join upward_insurance.entry_client b on b.entry_client_id = a.IDNo 
    where 
    a.policyNo like '%${search}%' OR  
    b.firstname like '%${search}%' OR 
    b.lastname like '%${search}%' OR
    a.IDNo  like '%${search}%' 
    limit 100
    `;
  return await prisma.$queryRawUnsafe(query);
}

export async function getPdcBanks(search: string) {
  const query = `
    SELECT a.Bank_Code, a.Bank FROM upward_insurance.bank a where  a.Bank_Code like '%${search}%' OR a.Bank like '%${search}%' limit 100; 
    `;
  return await prisma.$queryRawUnsafe(query);
}
