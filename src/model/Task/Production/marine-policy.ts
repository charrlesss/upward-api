import { PrismaClient } from "@prisma/client";
import { __DB_URL } from "../../../controller";


export async function getMarineRate(account: string, line: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
    select Rate from Rates 
    where 
    Account = '${account}' 
    and Line = '${line}' 
    `;
  return await prisma.$queryRawUnsafe(query);
}
export async function createMarinePolicy(data: any) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.mpolicy.create({
    data,
  });
}
export async function searchMarinePolicy(search: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
    select a.*,b.*, 
    if(c.company = '', concat(c.firstname,', ',c.middlename,', ',c.lastname) , c.company) as client_fullname,
    concat(d.firstname,', ',d.middlename,', ',d.lastname) as agent_fullname,
    c.address,
    c.sale_officer
     FROM mpolicy a
    left join policy b
    on a.PolicyNo = b.PolicyNo 
    left join entry_client c on b.IDNo = c.entry_client_id
    left join entry_agent d on b.AgentID = d.entry_agent_id
    where 
    a.PolicyNo like '%${search}%' or
    c.firstname like '%${search}%' or
    c.lastname like '%${search}%' or
    c.middlename like '%${search}%' 
    limit 100
    `;
  return await prisma.$queryRawUnsafe(query);
}
export async function createWords(data: any) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.words.create({
    data,
  });
}
export async function deleteWords() {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.$queryRawUnsafe(`
    delete from words where Wordings = 'Mpolicy' and (SType = 1 OR SType = 0)
`);
}
export async function getWords() {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.$queryRawUnsafe(`
    select * from words where Wordings = 'Mpolicy' and (SType = 1 OR SType = 0)
`);
}
export async function deleteMarinePolicy(PolicyNo: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.mpolicy.delete({
    where: {
      PolicyNo,
    },
  });
}

export async function deletePolicyFromMarine(policyNo: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
  delete from policy 
  where 
  PolicyType = 'MAR' and PolicyNo = '${policyNo}'
  `;
  return await prisma.$queryRawUnsafe(query);
}
