import { PrismaClient } from "@prisma/client";
import { __DB_URL } from "../../../controller";

export async function createCGLPolicy(data: any) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.cglpolicy.create({ data });
}

export async function searchCGLPolicy(search: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
      select a.*,b.*, 
        if(c.company = '', concat(c.firstname,', ',c.middlename,', ',c.lastname) , c.company) as client_fullname,
        concat(d.firstname,', ',d.middlename,', ',d.lastname) as agent_fullname,
        c.address,
        format(a.sumInsured,2) as sumInsured,
        a.address  as cgl_address,
        c.sale_officer,
        date_format(b.DateIssued , '%m/%d/%Y') as DateIssued
        FROM cglpolicy a
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

export async function deleteCGLPolicy(PolicyNo: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
    delete from cglpolicy 
    where 
     PolicyNo = '${PolicyNo}' 
    `;
  return await prisma.$queryRawUnsafe(query);
}

export async function deletePolicyByCGL(PolicyNo: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
    delete from policy 
    where 
    PolicyNo = '${PolicyNo}' and TRIM(PolicyType) = 'CGL'
    `;
  return await prisma.$queryRawUnsafe(query);
}
