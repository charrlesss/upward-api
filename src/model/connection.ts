import { PrismaClient } from "@prisma/client";
export function PrismaList() {
  const DATABASE_URL_UCSMI =
    "mysql://root:charles@localhost:3306/upward_insurance_ucsmi";
  const DATABASE_URL_UMIS =
    "mysql://root:charles@localhost:3306/upward_insurance_umis";

  const prismaUMIS = new PrismaClient({
    datasources: { db: { url: DATABASE_URL_UMIS } },
  });
  const prismaUCSMI = new PrismaClient({
    datasources: { db: { url: DATABASE_URL_UCSMI } },
  });

  function CustomPrismaClient(department: string) {
    if (department === "UMIS") {
      return prismaUMIS;
    } else {
      return prismaUCSMI;
    }
  }

  return {
    CustomPrismaClient,
  };
}
