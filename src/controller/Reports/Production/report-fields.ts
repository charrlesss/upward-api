import { PrismaClient } from "@prisma/client";
import { Console } from "console";
import express from "express";

const ReportFields = express.Router();
const prisma = new PrismaClient();

ReportFields.get("/report-fields/accounts", async (req, res) => {
  try {
    res.send({
      accounts: await prisma.$queryRawUnsafe(
        `SELECT Account FROM upward_insurance.policy_account `
      ),
    });
  } catch (error:any) {
    console.log(error.message);
    res.send({
      accounts: [],
    });
  }
});

ReportFields.get("/report-fields/policy", async (req, res) => {
  try {
    res.send({
      policy: await prisma.$queryRawUnsafe(
        `SELECT 'Bonds' 
            UNION ALL SELECT DISTINCT
                PolicyType
            FROM
            upward_insurance.policy
            WHERE
                PolicyType NOT IN (SELECT 
                        SublineName
                    FROM
                    upward_insurance.subline
                    WHERE
                        Line = 'Bonds')
            GROUP BY PolicyType
            HAVING PolicyType <> ''`
      ),
    });
  } catch (error:any) {
    console.log(error.message);
    res.send({
      policy: [],
    });
  }
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
