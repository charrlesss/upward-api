import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createPAPolicy(data: any) {
  return await prisma.papolicy.create({ data });
}

export async function searchPAPolicy(search:string) {
  const query = `
  select a.*,b.*, 
  concat(c.firstname,', ',c.middlename,', ',c.lastname) as client_fullname,
  concat(d.firstname,', ',d.middlename,', ',d.lastname) as agent_fullname,
  c.address
   FROM upward_insurance.papolicy a
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


export async function deletePAPolicy(
  Acount: string,
  PolicyNo: string
) {
  const query = `
  delete from upward_insurance.papolicy 
  where 
  Account = '${Acount}' 
  and PolicyNo = '${PolicyNo}'
  `;
  return await prisma.$queryRawUnsafe(query);
}
