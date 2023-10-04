import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface PolicyAccountType {
  Account: string;
  Description: string;
  AccountCode: string;
  COM: boolean;
  TPL: boolean;
  MAR: boolean;
  FIRE: boolean;
  G02: boolean;
  G13: boolean;
  G16: boolean;
  MSPR: boolean;
  PA: boolean;
  CGL: boolean;
  Inactive: boolean;
}

export async function checkedAccountIsExisting(Account: string) {
  return await prisma.policy_account.findUnique({ where: { Account } });
}

export async function createPolicyAccount(policyAccount: PolicyAccountType) {
  return await prisma.policy_account.create({ data: policyAccount });
}

export async function searchPolicy(
  policySearch: string,
  hasLimit: boolean = false
) {
  const query = ` SELECT 
  a.Account,
  a.Description,
  a.AccountCode,
  a.COM,
  a.TPL,
  a.MAR,
  a.FIRE,
  a.G02,
  a.G13,
  a.G16,
  a.MSPR,
  a.CGL,
  a.createdAt
FROM
upward.policy_account a
where 
a.Account like '%${policySearch}%'
OR a.Description like '%${policySearch}%'
OR a.AccountCode like '%${policySearch}%'
ORDER BY a.createdAt desc 
${hasLimit ? "" : "limit 500"}`;

  return await prisma.$queryRawUnsafe(query);
}

export async function updatePolicyAccount(
  policyAccount: PolicyAccountType,
  Account: string
) {
  return await prisma.policy_account.update({
    data: policyAccount,
    where: { Account },
  });
}
export async function deletePolicyAccount(
  Account: string
) {
  return await prisma.policy_account.delete({
    where: { Account },
  });
}