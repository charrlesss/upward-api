import { PrismaClient } from "@prisma/client";
import express from "express";
import { mapColumnsToKeys } from "../Production/report-fields";
import { format, addMonths } from "date-fns";

const TrialBalance = express.Router();
const prisma = new PrismaClient();

TrialBalance.post("/trial-balance-report", async (req, res) => {
  try {
    const dateFrom = new Date(req.body.date);

    let currText = "";
    let prevText = "";
    const DateFrom = format(dateFrom, "yyyy-MM-dd");
    const DateTo = format(addMonths(dateFrom, 1), "yyyy-MM-dd");
    const SubAcctParam = req.body.sub_acct.toUpperCase();

    if (SubAcctParam === "ALL") {
      prevText = `
        SELECT
          GL_Acct as GL_Acct,
          SUM(IFNULL(Debit, 0)) as Debit,
          SUM(IFNULL(Credit, 0)) as Credit,
          SUM(IFNULL(Debit, 0)) - SUM(IFNULL(Credit, 0)) as Balance
        FROM Journal
        WHERE Source_Type NOT IN ('AB', 'BF', 'BFS', 'BFD')
        AND Date_Entry < '${DateFrom}'
        GROUP BY GL_Acct`;
    } else {
      prevText = `
        SELECT
          GL_Acct as GL_Acct,
          SUM(IFNULL(Debit, 0)) as Debit,
          SUM(IFNULL(Credit, 0)) as Credit,
          SUM(IFNULL(Debit, 0)) - SUM(IFNULL(Credit, 0)) as Balance
        FROM Journal
        WHERE Source_Type NOT IN ('AB', 'BF', 'BFS', 'BFD')
        AND Sub_Acct = SubAcctParam
        AND Date_Entry < '${DateFrom}'
        GROUP BY GL_Acct`;
    }
    if (SubAcctParam === "ALL") {
      currText = `
          SELECT
            GL_Acct as GL_Acct,
            SUM(IFNULL(Debit, 0)) as Debit,
            SUM(IFNULL(Credit, 0)) as Credit,
            SUM(IFNULL(Debit, 0)) - SUM(IFNULL(Credit, 0)) as Balance
          FROM Journal
          WHERE Source_Type NOT IN ('AB', 'BF', 'BFS', 'BFD')
          AND Date_Entry >= '${DateFrom}' AND Date_Entry <= '${DateTo}'
          GROUP BY GL_Acct`;
    } else {
      currText = `
            SELECT
      		GL_Acct,
      		SUM(IFNULL(Debit, 0)) as Debit,
      		SUM(IFNULL(Credit, 0)) as Credit,
      		SUM(IFNULL(Debit, 0)) - SUM(IFNULL(Credit, 0)) as Balance
            FROM Journal
            WHERE Source_Type NOT IN ('AB', 'BF', 'BFS', 'BFD')
            AND Sub_Acct = SubAcctParam
            AND Date_Entry >= '${DateFrom}' AND Date_Entry <= '${DateTo}'
            GROUP BY GL_Acct`;
    }
    const qry = `
       SELECT
          Acct_Code AS Code,
          Acct_Title AS Title,
          IFNULL(Prev.Debit, 0) AS PrevDebit,
          IFNULL(Prev.Credit, 0)  AS PrevCredit,
          IFNULL(Prev.Balance, 0)  AS PrevBalance,
          IFNULL(Curr.Debit, 0)    AS CurrDebit,
          IFNULL(Curr.Credit, 0)  AS CurrCredit,
          IFNULL(Curr.Balance, 0)  AS CurrBalance,
          IFNULL(Prev.Debit, 0) + IFNULL(Curr.Debit, 0)  AS BalDebit,
          IFNULL(Prev.Credit, 0) + IFNULL(Curr.Credit, 0)  AS BalCredit,
          IFNULL(Prev.Balance, 0) + IFNULL(Curr.Balance, 0)  AS TotalBalance
      FROM
          chart_account
          LEFT JOIN (${currText}) Curr ON chart_account.Acct_Code = Curr.GL_Acct
          LEFT JOIN (${prevText}) Prev ON chart_account.Acct_Code = Prev.GL_Acct
    	WHERE IFNULL(Prev.Balance, 0) <> 0 OR IFNULL(Curr.Balance, 0) <> 0
    	ORDER BY chart_account.Acct_Code;
    `;

    console.log(qry)
    const report = await prisma.$queryRawUnsafe(qry);
    res.send({
      message: "Successfully get Report",
      success: false,
      report,
    });
  } catch (err: any) {
    res.send({
      message: err.message,
      success: false,
      report: [],
    });
  }
});

export default TrialBalance;
