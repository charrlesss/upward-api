import { PrismaClient } from "@prisma/client";
import express from "express";
import { FinancialStatement } from "./trial_balance";
import { addMonths, format } from "date-fns";

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

export function FinancialStatementSumm(date: any, dateFormat: string) {
  const dateFrom = new Date(date);
  let DateFrom = "";
  let DateTo = "";

  if (dateFormat === "Daily") {
    DateFrom = format(dateFrom, "yyyy-MM-dd");
    DateTo = format(dateFrom, "yyyy-MM-dd");
  } else {
    DateFrom = format(dateFrom, "yyyy-MM-dd");
    DateTo = format(addMonths(dateFrom, 1), "yyyy-MM-dd");
  }

  const prev = `
  SELECT  
      MAX(Sub_Acct) as Sub_Acct,  
      GL_Acct, 
      SUM(IFNULL(Debit, 0)) as Debit, 
      SUM(IFNULL(Credit, 0)) as Credit, 
      SUM(IFNULL(Debit, 0)) - SUM(IFNULL(Credit, 0)) as Balance
  FROM Journal
  WHERE Source_Type NOT IN ('AB', 'BF', 'BFS', 'BFD')
  AND str_to_date(Date_Entry,'%Y-%m-%d') < '${DateFrom}'
  GROUP BY GL_Acct
`;
  const curr = `
  SELECT 
      MAX(Sub_Acct) as Sub_Acct,  
      GL_Acct, 
      SUM(IFNULL(Debit, 0)) as Debit, 
      SUM(IFNULL(Credit, 0)) as Credit, 
      SUM(IFNULL(Debit, 0)) - SUM(IFNULL(Credit, 0)) as Balance
  FROM Journal
  WHERE Source_Type NOT IN ('AB', 'BF', 'BFS', 'BFD')
  AND str_to_date(Date_Entry,'%Y-%m-%d') >= '${DateFrom}' AND str_to_date(Date_Entry,'%Y-%m-%d') <= '${DateTo}'
  GROUP BY GL_Acct
`;
  const union_temp = `
  SELECT * FROM (${prev}) Prev
  UNION ALL
  SELECT * FROM (${curr}) Curr
`;
  const total = `
  SELECT GL_Acct, SUM(Debit) - SUM(Credit) AS Balance
  FROM (${union_temp}) union_temp
  GROUP BY GL_Acct
`;
  return `
  SELECT SubAccount.Acronym AS SACode,
         SubAccount.ShortName AS SubAccount,
         Chart_Account.Acct_Code AS Code,
         CONCAT(Chart_Account.Acct_Code, ' ', Acct_Title) AS Title,
         SUM(Debit) - SUM(Credit) AS Balance,
         total.Balance AS TotalBalance
  FROM Chart_Account
  LEFT JOIN (${union_temp}) union_temp ON Chart_Account.Acct_Code = union_temp.GL_Acct
  LEFT JOIN Sub_Account SubAccount ON union_temp.Sub_Acct = SubAccount.Acronym
  LEFT JOIN (${total}) total ON union_temp.GL_Acct = total.GL_Acct
  GROUP BY union_temp.GL_Acct, SubAccount.Sub_Acct, SubAccount.ShortName, Chart_Account.Acct_Code, Acct_Title, total.Balance
  HAVING SUM(Debit) - SUM(Credit) IS NOT NULL
  ORDER BY Chart_Account.Acct_Code`;
}

export default IncomeStatement;
