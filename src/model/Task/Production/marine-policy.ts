import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getMarineRate(account: string, line: string) {
  const query = `
    select Rate from Rates 
    where 
    Account = '${account}' 
    and Line = '${line}' 
    `;
  return await prisma.$queryRawUnsafe(query);
}
export async function createMarinePolicy(data: any) {
  return await prisma.mpolicy.create({
    data,
  });
}
export async function searchMarinePolicy(search: string) {
  const query = `
    select a.*,b.*, 
    concat(c.firstname,', ',c.middlename,', ',c.lastname) as client_fullname,
    concat(d.firstname,', ',d.middlename,', ',d.lastname) as agent_fullname,
    c.address
     FROM upward_insurance.mpolicy a
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
export async function createWords(data: any) {
  return await prisma.words.create({
    data,
  });
}
export async function deleteWords() {
  return await prisma.$queryRawUnsafe(`
    delete from upward_insurance.words where Wordings = 'Mpolicy' and (SType = 1 OR SType = 0)
`);
}
export async function getWords() {
  return await prisma.$queryRawUnsafe(`
    select * from upward_insurance.words where Wordings = 'Mpolicy' and (SType = 1 OR SType = 0)
`);
}
export async function deleteMarinePolicy(Account: string, PolicyNo: string) {
  return await prisma.mpolicy.delete({
    where: {
      PolicyNo,
      AND: {
        Account,
      },
    },
  });
}
