import { PrismaClient } from "@prisma/client";
import express from "express";

const ReportFields = express.Router();
const prisma = new PrismaClient();
ReportFields.get("/report-fields/accounts", async (req, res) => {
  res.send({
    accounts: await prisma.$queryRawUnsafe(
      `SELECT Account FROM upward.account `
    ),
  });
});
ReportFields.get("/report-fields/policy", async (req, res) => {
  res.send({
    policy: await prisma.$queryRawUnsafe(
      `SELECT 'Bonds' 
          UNION ALL SELECT DISTINCT
              PolicyType
          FROM
              upward.policy
          WHERE
              PolicyType NOT IN (SELECT 
                      SublineName
                  FROM
                      upward.subline
                  WHERE
                      Line = 'Bonds')
          GROUP BY PolicyType
          HAVING PolicyType <> ''`
    ),
  });
});
export default ReportFields;
export const mapColumnsToKeys = (columns: string[], result: any) => {
  const newResult = result.map((item: any) => {
    const newItem: any = {};
    for (let i = 0; i < columns.length; i++) {
      newItem[columns[i]] = item[`f${i}`];
    }
    return newItem;
  });
  return newResult;
};