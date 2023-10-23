import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getRateType(Line: string) {
  return await prisma.$queryRawUnsafe(`
    select Type from rates a where  a.Line ='${Line}' group by TYPE
  `);
}

export async function createFirePolicy({
  PolicyNo,
  Account,
  BillNo,
  DateFrom,
  DateTo,
  Location,
  PropertyInsured,
  Constraction,
  Occupancy,
  Boundaries,
  Mortgage,
  Warranties,
  InsuredValue,
  Percentage,
}: any) {
  return await prisma.fpolicy.create({
    data: {
      PolicyNo,
      Account,
      BillNo,
      DateFrom,
      DateTo,
      Location,
      PropertyInsured,
      Constraction,
      Occupancy,
      Boundaries,
      Mortgage,
      Warranties,
      InsuredValue,
      Percentage,
    },
  });
}

export async function searchFirePolicy(search: string) {
  const query = `
  select a.*,b.*, 
  concat(c.firstname,', ',c.middlename,', ',c.lastname) as client_fullname,
  concat(d.firstname,', ',d.middlename,', ',d.lastname) as agent_fullname,
  c.address
   FROM upward.fpolicy a
  left join upward.policy b
  on a.PolicyNo = b.PolicyNo 
  left join upward.entry_client c on b.IDNo = c.entry_client_id
  left join upward.entry_agent d on b.AgentID = d.entry_agent_id
  where 
  a.PolicyNo like '%${search}%' or
  c.firstname like '%${search}%' or
  c.lastname like '%${search}%' or
  c.middlename like '%${search}%' 
  limit 100
  `;
  return await prisma.$queryRawUnsafe(query);
}

export async function deleteFirePolicy(
  subAccount: string,
  policyNo: string
) {
  const query = `
  delete from upward.fpolicy 
  where 
  Account = '${subAccount}' 
  and PolicyNo = '${policyNo}'
  `;
  return await prisma.$queryRawUnsafe(query);
}
       