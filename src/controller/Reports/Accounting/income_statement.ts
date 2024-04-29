import { PrismaClient } from "@prisma/client";
import express from "express";
import { addMonths, format } from "date-fns";
import {
  FinancialStatement,
  FinancialStatementSumm,
} from "../../../model/db/stored-procedured";

const IncomeStatement = express.Router();
const prisma = new PrismaClient();

IncomeStatement.post("/income-statement-report", async (req, res) => {
  try {
    let sql = "";

    if (req.body.format === 0) {
      const fs = FinancialStatement(req.body.date, "ALL", "Monthly");
      const tmp1 = `
      SELECT
        *,
        LEFT(Code, 1) AS H1,
        LEFT(Code, 4) AS H2
      FROM
          (${fs}) tmp
      WHERE
          LEFT(Code, 1) >= '6'
      `;
      sql = `
      SELECT
          Chart_Account.Acct_Title AS Footer,
          tmp1.H1,
          tmp1.H2,
          tmp1.Code,
          tmp1.Title,
          CASE
              WHEN LEFT(tmp1.Code, 1) = '6' THEN (PrevCredit - PrevDebit)
              ELSE tmp1.PrevBalance
          END AS PrevBalance,
          CASE
              WHEN LEFT(tmp1.Code, 1) = '6' THEN (CurrCredit - CurrDebit)
              ELSE tmp1.CurrBalance
          END AS CurrBalance,
          CASE
              WHEN LEFT(tmp1.Code, 1) = '6' THEN (PrevCredit - PrevDebit) + (CurrCredit - CurrDebit)
              ELSE tmp1.TotalBalance
          END AS TotalBalance
      FROM
          (${tmp1}) tmp1
      LEFT JOIN
          Chart_Account ON tmp1.H2 = Chart_Account.Acct_Code
      ORDER BY
          tmp1.Code;
      `;
    } else {
      const tmp = FinancialStatementSumm(req.body.date, "Monthly");
      const tmp1 = `
      SELECT
          *,
          LEFT(Code, 1) AS H1,
          LEFT(Code, 4) AS H2
      FROM
          (${tmp}) tmp
      WHERE
          LEFT(Code, 1) >= '6'`;
      const tmp2 = `
    SELECT
        SubAccount,
        H1,
        0 - SUM(Balance) AS Balance
    FROM
      (${tmp1}) tmp1 
    GROUP BY
        SubAccount,
        H1`;
      const tmp3 = `
      SELECT
          SubAccount,
          SUM(Balance) AS Balance
      FROM
        (${tmp2}) tmp2
      GROUP BY
          SubAccount`;
      sql = `
      SELECT
          tmp1.H1,
          CASE tmp1.H1
              WHEN '6' THEN 'INCOME'
              ELSE 'EXPENSES'
          END AS MyHeader,
          tmp1.H2,
          Chart_Account.Acct_Title AS MyFooter,
          tmp1.Code,
          SUBSTRING(tmp1.Title, LENGTH(tmp1.Code) + 1 , (LENGTH(tmp1.Title) + 1) - LENGTH(tmp1.Code)) AS Title,
          tmp1.SubAccount,
          CASE
              WHEN LEFT(tmp1.Code, 1) = '6' THEN 0 - tmp1.Balance
              ELSE tmp1.Balance
          END AS Balance,
          CASE
              WHEN LEFT(tmp1.Code, 1) = '6' THEN 0 - tmp1.TotalBalance
              ELSE tmp1.TotalBalance
          END AS TotalBalance,
          tmp3.Balance AS SBalance
      FROM
         (${tmp1}) tmp1
      LEFT JOIN
          Chart_Account ON tmp1.H2 = Chart_Account.Acct_Code
      LEFT JOIN
         (${tmp3}) tmp3 ON tmp1.SubAccount = tmp3.SubAccount
      ORDER BY
          tmp1.Code
      `;
    }
    console.log(sql);
    const report = await prisma.$queryRawUnsafe(sql);
    res.send({
      message: "Successfully Get Report",
      success: true,
      report,
    });
  } catch (err: any) {
    console.log(err.message);
    res.send({
      message: err.message,
      success: false,
      report: [],
    });
  }
});

export default IncomeStatement;
