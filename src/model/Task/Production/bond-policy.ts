import { PrismaClient } from "@prisma/client";
import { __DB_URL } from "../../../controller";


export async function getBondRate(account: string, type: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
    SELECT * FROM rates WHERE
     Account = '${account}' 
     AND Line = 'Bonds'
     AND Type = '${type}'
      `;
  return await prisma.$queryRawUnsafe(query);
}

export async function createMarinePolicy(data: any) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.mpolicy.create({
    data,
  });
}

export async function createBondsPolicy(data: any) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.bpolicy.create({
    data: data,
  });
}

export async function searchBondsPolicy(search: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
  select a.*,b.*, 
  if(c.company = '', concat(c.firstname,', ',c.middlename,', ',c.lastname) , c.company) as client_fullname,
  concat(d.firstname,', ',d.middlename,', ',d.lastname) as agent_fullname,
  c.address,
  c.sale_officer,
  date_format(b.DateIssued , '%m/%d/%Y') as DateIssued
   FROM Bpolicy a
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

export async function deleteBondsPolicy(PolicyType: string, PolicyNo: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
  delete from bpolicy 
  where 
   PolicyNo = '${PolicyNo}'
  `;
  return await prisma.$queryRawUnsafe(query);
}

export async function deletePolicyFromBond(
  policyType: string,
  PolicyNo: string
) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
  delete from policy 
  where 
  PolicyType in (SELECT SublineName FROM subline where Line = 'Bonds') and PolicyNo = '${PolicyNo}'
  `;
  return await prisma.$queryRawUnsafe(query);
}

// SELECT SublineName FROM subline where Line = 'Bonds';
export async function deletePolicyFromBonds(policyNo: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
  delete from policy 
  where 
  PolicyType = 'FIRE' and PolicyNo = '${policyNo}'
  `;
  return await prisma.$queryRawUnsafe(query);
}

export async function getAllBondsType() {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.$queryRawUnsafe(`
  SELECT SublineName FROM subline where Line = 'Bonds'
  `);
}

// export async function getAllAccount() {
//   let qry = "";
//   const d: any = await getAllBondsType();

//   return await prisma.$queryRawUnsafe(`
//   SELECT SublineName FROM subline where Line = 'Bonds'
//   `);
// }
