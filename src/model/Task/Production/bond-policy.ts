import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getBondRate(account: string, type: string) {
  const query = `
    SELECT * FROM rates WHERE
     Account = '${account}' 
     AND Line = 'Bonds'
     AND Type = '${type}'
      `;
  return await prisma.$queryRawUnsafe(query);
}

export async function createMarinePolicy(data: any) {
  return await prisma.mpolicy.create({
    data,
  });
}

export async function createBondsPolicy(data: any) {
  return await prisma.bpolicy.create({
    data: data,
  });
}

export async function searchBondsPolicy(search: string) {
  const query = `
  select a.*,b.*, 
  concat(c.firstname,', ',c.middlename,', ',c.lastname) as client_fullname,
  concat(d.firstname,', ',d.middlename,', ',d.lastname) as agent_fullname,
  c.address
   FROM upward_insurance.Bpolicy a
  left join upward_insurance.policy b
  on a.PolicyNo = b.PolicyNo 
  left join upward_insurance.entry_client c on b.IDNo = c.entry_client_id
  left join upward_insurance.entry_agent d on b.AgentID = d.entry_agent_id
  where 
  a.PolicyNo like '%${search}%' or
  c.firstname like '%${search}%' or
  c.lastname like '%${search}%' or
  c.middlename like '%${search}%' 
  limit 100
  `;
  return prisma.$queryRawUnsafe(query);
}

export async function deleteBondsPolicy(
  Acount: string,
  PolicyType: string,
  PolicyNo: string
) {
  const query = `
  delete from upward_insurance.bpolicy 
  where 
  Account = '${Acount}' 
  and PolicyType = '${PolicyType}'
  and PolicyNo = '${PolicyNo}'
  `;
  return await prisma.$queryRawUnsafe(query);
}
