import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getMSPRRate(Account: string, Line: string) {
  const query = `select * from upward_insurance.rates where trim(Account)='${Account.trim()}' AND  Line = '${Line}'`;
  console.log(query);
  return await prisma.$queryRawUnsafe(query);
}
export async function createMSPRPolicy(data: any) {
  return await prisma.msprpolicy.create({ data });
}

export async function searchMsprPolicy(search: string) {
  const query = `
    select 
    a.*,
    b.*, 
    if(c.company = '', concat(c.firstname,', ',c.middlename,', ',c.lastname) , c.company) as client_fullname,
    concat(d.firstname,', ',d.middlename,', ',d.lastname) as agent_fullname,
    c.address,
    c.sale_officer,
    date_format(b.DateIssued , '%m/%d/%Y') as DateIssued
     FROM upward_insurance.msprpolicy a
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

export async function deleteMsprPolicy( PolicyNo: string) {
  const query = `
  delete from upward_insurance.msprpolicy 
  where 
  PolicyNo = '${PolicyNo}'
  `;
  return await prisma.$queryRawUnsafe(query);
}


export async function deletePolicyFromMspr(policyNo: string) {
  const query = `
  delete from upward_insurance.policy 
  where 
  PolicyType = 'MSPR' and PolicyNo = '${policyNo}'
  `;
  return await prisma.$queryRawUnsafe(query);
}
