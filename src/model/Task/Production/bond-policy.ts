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
  if(c.company = '', concat(c.firstname,', ',c.middlename,', ',c.lastname) , c.company) as client_fullname,
  concat(d.firstname,', ',d.middlename,', ',d.lastname) as agent_fullname,
  c.address,
  c.sale_officer,
  date_format(b.DateIssued , '%m/%d/%Y') as DateIssued
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
  return await prisma.$queryRawUnsafe(query);
}

export async function deleteBondsPolicy(PolicyType: string, PolicyNo: string) {
  const query = `
  delete from upward_insurance.bpolicy 
  where 
   PolicyType = '${PolicyType}'
  and PolicyNo = '${PolicyNo}'
  `;
  return await prisma.$queryRawUnsafe(query);
}

export async function deletePolicyFromBond(
  policyType: string,
  PolicyNo: string
) {
  const query = `
  delete from upward_insurance.policy 
  where 
  PolicyType = '${policyType}' and PolicyNo = '${PolicyNo}'
  `;
  return await prisma.$queryRawUnsafe(query);
}

// SELECT SublineName FROM upward_insurance.subline where Line = 'Bonds';
export async function deletePolicyFromBonds(policyNo: string) {
  const query = `
  delete from upward_insurance.policy 
  where 
  PolicyType = 'FIRE' and PolicyNo = '${policyNo}'
  `;
  return await prisma.$queryRawUnsafe(query);
}

export async function getAllBondsType() {
  return await prisma.$queryRawUnsafe(`
  SELECT SublineName FROM upward_insurance.subline where Line = 'Bonds'
  `);
}

// export async function getAllAccount() {
//   let qry = "";
//   const d: any = await getAllBondsType();

//   return await prisma.$queryRawUnsafe(`
//   SELECT SublineName FROM upward_insurance.subline where Line = 'Bonds'
//   `);
// }
