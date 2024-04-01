import { PrismaClient } from "@prisma/client";
import express from "express";
import {
  format,
  startOfMonth,
  endOfMonth,
  addYears,
  endOfYear,
  startOfYear,
} from "date-fns";

const ScheduleAccounts = express.Router();
const prisma = new PrismaClient();

ScheduleAccounts.get("/chart-schedule-account", async (req, res) => {
  try {
    const { account_search } = req.query;

    const chartAccount = await prisma.$queryRawUnsafe(`
        select 
            * 
        from 
            upward_insurance.chart_account a
        where 
            a.Acct_Code LIKE '%${account_search}%' OR
            a.Acct_Title  LIKE '%${account_search}%' OR
            a.Short LIKE '%${account_search}%' 
        limit 100
    `);
    res.send({
      message: "Successfully Get Chart of Account!",
      success: true,
      chartAccount,
    });
  } catch (err: any) {
    res.send({
      message: err.message,
      success: false,
      chartAccount: [],
    });
  }
});

ScheduleAccounts.get("/schedule-accounts", async (req, res) => {
  try {
    const accounts = await prisma.$queryRawUnsafe(`
      SELECT AccountCode FROM upward_insurance.policy_account;
    `);
    res.send({
      message: "Successfully Get Accounts!",
      success: true,
      accounts,
    });
  } catch (err: any) {
    res.send({
      message: err.message,
      success: false,
      accounts: [],
    });
  }
});

ScheduleAccounts.get("/get-sub-account-acronym", async (req, res) => {
  try {
    const sub_account = await prisma.$queryRawUnsafe(`
    SELECT Acronym FROM upward_insurance.sub_account;
    `);
    res.send({
      message: "Successfully Get Sub Accounts!",
      success: true,
      sub_account,
    });
  } catch (err: any) {
    res.send({
      message: err.message,
      success: false,
      sub_account: [],
    });
  }
});

ScheduleAccounts.post("/schedule-account-report", async (req, res) => {
  try {
    let dateFrom = "";
    let dateTo = "";
    let qry = "";
    //{
    //  format: 0,
    //  account: '',
    //  account_title: '',
    //  dateFormat: 'Yearly',
    //  dateFrom: '2024-03-27T06:40:54.964Z',
    //  dateTo: '2024-03-27T06:40:54.964Z',
    //  yearCount: '1',
    //  subsi: 0,
    //  subsi_options: 'All',
    //  sort: 'Name',
    //  order: 'asc'
    //}
    if (req.body.dateFormat === "Daily") {
      dateFrom = format(new Date(req.body.dateFrom), "yyyy-MM-dd");
      dateTo = format(new Date(req.body.dateFrom), "yyyy-MM-dd");
    }
    if (req.body.dateFormat === "Monthly") {
      const currentDate = new Date(req.body.dateFrom);
      dateFrom = format(startOfMonth(currentDate), "yyyy-MM-dd");
      dateTo = format(endOfMonth(currentDate), "yyyy-MM-dd");
    }
    if (req.body.dateFormat === "Yearly") {
      const currentDate = new Date(req.body.dateFrom);

      dateFrom = format(startOfYear(startOfMonth(currentDate)), "yyyy-MM-dd");
      dateTo = format(
        endOfMonth(
          endOfYear(addYears(currentDate, parseInt(req.body.yearCount)))
        ),
        "yyyy-MM-dd"
      );
    }
    if (req.body.dateFormat === "Custom") {
      dateFrom = format(new Date(req.body.dateFrom), "yyyy-MM-dd");
      dateTo = format(new Date(req.body.dateTo), "yyyy-MM-dd");
    }
    if (req.body.subsi === 0) {
      qry = `
        SELECT
          a.GL_Acct,
          a.Sub_Acct,
          a.mShort,
          MAX(b.ShortName) as mSub_Acct,
          FORMAT(Sum(a.mDebit), 2)   AS Debit,
          FORMAT(Sum(a.mCredit), 2)  AS Credit,
          IF(CAST(Left(a.GL_Acct,1) AS UNSIGNED)<=3 Or CAST(Left(a.GL_Acct,1) AS UNSIGNED)=7,
              Sum(a.mDebit)-Sum(a.mCredit),
              Sum(a.mCredit)-Sum(a.mDebit)
          ) AS Balance
      FROM
          upward_insurance.qryJournal  a
          LEFT JOIN upward_insurance.sub_account b on a.Sub_Acct =  b.Acronym
      WHERE
          (a.Source_Type <> 'BF' AND a.Source_Type <>'BFD' AND a.Source_Type <>'BFS') AND
          a.Date_Entry >= '${dateFrom}' AND 
          a.Date_Entry <= '${dateTo}'
          AND ${
            req.body.format === 1
              ? req.body.account !== ""
                ? ` a.GL_Acct = '${req.body.account}'  AND `
                : ""
              : ""
          }
          (a.Sub_Acct IS NOT NULL AND trim(a.Sub_Acct) <> '') AND
          (a.GL_Acct IS NOT NULL AND trim(a.GL_Acct) <> '') AND
          a.Sub_Acct IN (
              SELECT
                  Acronym
              FROM
                  upward_insurance.Sub_Account ${
                    req.body.subsi_options.toLowerCase() === "all"
                      ? ""
                      : ` where Acronym = '${req.body.subsi_options}'`
                  }
          ) 
      GROUP BY
          a.GL_Acct, a.Sub_Acct
      ORDER BY
          a.GL_Acct ${req.body.order}, ${
        req.body.sort === "Name" ? ` mSub_Acct ` : " a.Sub_Acct "
      } ${req.body.order}`;
    }
    if (req.body.subsi === 1) {
      qry = `
      SELECT
          LEFT(a.GL_Acct,1) AS Group_Header,
          LEFT(a.GL_Acct,4) AS Header,
          a.GL_Acct,
          b.Acct_Title  AS 'mShort',
          MAX(a.Branch_Code) AS Sub_Acct,
          d.Shortname AS 'mID',
          a.ID_No AS ID_No,
          FORMAT(Sum(Debit), 2) AS Debit,
          FORMAT(Sum(Credit), 2) AS Credit,
          IF(CAST(LEFT(a.GL_Acct,1) AS UNSIGNED) <= 3 OR CAST(LEFT(a.GL_Acct,1) AS UNSIGNED) = 7, SUM(Debit)-SUM(Credit), SUM(Credit)-SUM(Debit)) AS Balance
      FROM upward_insurance.journal a
      INNER JOIN upward_insurance.chart_account b ON b.Acct_Code = a.GL_Acct
      LEFT JOIN upward_insurance.sub_account c ON c.Sub_Acct = a.Sub_Acct
      LEFT JOIN (
        SELECT
            PolicyNo,
            Shortname
        FROM
            upward_insurance.policy a
        INNER JOIN upward_insurance.client_ids b ON b.IDNo = a.IDNo
        UNION ALL
        SELECT
            aa.IDNo,
            aa.Shortname
        FROM
          upward_insurance.client_ids aa
        ) d ON d.PolicyNo = a.ID_No
        WHERE
          a.Source_Type NOT IN ('BF','BFD','BFS') 
          AND d.Shortname IS NOT NULL 
          AND a.Date_Entry >= '${dateFrom}'  
          AND a.Date_Entry <= '${dateTo}'
          ${
            req.body.format === 1
              ? req.body.account !== ""
                ? ` AND a.GL_Acct = '${req.body.account}'   `
                : ""
              : ""
          }
          ${
            req.body.subsi_options.toLowerCase() === "all"
              ? ""
              : ` AND a.ID_No = '${req.body.subsi_options}'`
          }
        GROUP BY
          GL_Acct, b.Short, a.ID_No, d.Shortname
        HAVING
          IF(CAST(LEFT(a.GL_Acct,1) AS UNSIGNED) <= 3 OR CAST(LEFT(a.GL_Acct,1) AS UNSIGNED) = 7, SUM(Debit)-SUM(Credit), SUM(Credit)-SUM(Debit)) <> 0
        ORDER BY
        Group_Header ${req.body.order}, Header ${req.body.order}, GL_Acct ${
        req.body.order
      }, ${req.body.sort === "Name" ? " mID " : " a.ID_No "} ${req.body.order};
`;
    }
    if (req.body.subsi === 2) {
      qry = `
      SELECT
         MAX(d.Acct_Title) as mShort,
          a.GL_Acct,
          a.Sub_Acct,
          a.ID_No,
          c.AccountCode AS mID,
          FORMAT(SUM(a.mDebit),2) AS Debit,
          FORMAT(SUM(a.mCredit),2) AS Credit,
          IF(CAST(LEFT(GL_Acct,1) AS UNSIGNED) <= 3 OR CAST(LEFT(GL_Acct,1) AS UNSIGNED) = 7, SUM(a.mDebit)-SUM(a.mCredit), SUM(a.mCredit)-SUM(a.mDebit)) AS Balance
      FROM upward_insurance.qryjournal  a
      LEFT JOIN upward_insurance.policy b ON a.ID_No = b.PolicyNo
      INNER JOIN upward_insurance.policy_account c ON b.Account = c.Account
      LEFT JOIN upward_insurance.chart_account d on a.GL_Acct = d.Acct_Code
      WHERE 
      a.Date_Entry >= '${dateFrom}'  
      AND a.Date_Entry <= '${dateTo}'
      ${
        req.body.format === 1
          ? req.body.account !== ""
            ? ` AND a.GL_Acct = '${req.body.account}'   `
            : ""
          : ""
      }
      ${
        req.body.subsi_options.toLowerCase() === "all"
          ? ""
          : ` AND c.AccountCode = '${req.body.subsi_options}'`
      }

      GROUP BY
          c.AccountCode,
          a.Sub_Acct,
          a.GL_Acct,
          a.ID_No
      HAVING
          IF(CAST(LEFT(GL_Acct,1) AS UNSIGNED) <= 3 OR CAST(LEFT(GL_Acct,1) AS UNSIGNED) = 7, SUM(a.mDebit)-SUM(a.mCredit), SUM(a.mCredit)-SUM(a.mDebit)) <> 0
      ORDER BY a.GL_Acct ${req.body.order}, ${
        req.body.sort === "Name" ? " mID " : " a.ID_No "
      } ${req.body.order} ;
      `;
    }

    const report = await prisma.$queryRawUnsafe(qry);
    res.send({
      message: "Successfully Get Chart of Account!",
      success: true,
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

export default ScheduleAccounts;

// =====================================================================================
// SUB ACCOUNT
// =====================================================================================
// SELECT
//     a.GL_Acct,
//     a.Sub_Acct,
//     MAX(b.ShortName) as mSub_Acct,
//     Sum(a.mDebit) AS Debit,
//     Sum(a.mCredit) AS Credit,
//     IF(CAST(Left(a.GL_Acct,1) AS UNSIGNED)<=3 Or CAST(Left(a.GL_Acct,1) AS UNSIGNED)=7,
//         Sum(a.mDebit)-Sum(a.mCredit),
//         Sum(a.mCredit)-Sum(a.mDebit)
//     ) AS Balance
// FROM
//     upward_insurance.qryJournal  a
//     LEFT JOIN upward_insurance.sub_account b on a.Sub_Acct =  b.Acronym
// WHERE
//     (a.Source_Type <> 'BF' AND a.Source_Type <>'BFD' AND a.Source_Type <>'BFS') AND
//     a.Date_Entry <= '2024-01-01' AND
//     (a.Sub_Acct IS NOT NULL AND trim(a.Sub_Acct) <> '') AND
//     (a.GL_Acct IS NOT NULL AND trim(a.GL_Acct) <> '') AND
//     a.Sub_Acct IN (
//         SELECT
//             Acronym
//         FROM
//             upward_insurance.Sub_Account
//     )
// GROUP BY
//     a.GL_Acct, a.Sub_Acct
// ORDER BY
//     a.GL_Acct ASC;

// =====================================================================================
// ID_No
// =====================================================================================
// SELECT
// 	LEFT(a.GL_Acct,1) AS `Group Header`,
// 	LEFT(a.GL_Acct,4) AS Header,
// 	a.GL_Acct,
// 	b.Short AS 'mShort',
// 	MAX(a.Branch_Code) AS Sub_Acct,
// 	d.Shortname AS 'mID',
// 	a.ID_No AS ID_No,
// 	SUM(Debit) AS Debit,
// 	SUM(Credit) AS Credit,
// 	IF(CAST(LEFT(a.GL_Acct,1) AS UNSIGNED) <= 3 OR CAST(LEFT(a.GL_Acct,1) AS UNSIGNED) = 7, SUM(Debit)-SUM(Credit), SUM(Credit)-SUM(Debit)) AS Balance
// FROM upward_insurance.journal a
// INNER JOIN upward_insurance.chart_account b ON b.Acct_Code = a.GL_Acct
// LEFT JOIN upward_insurance.sub_account c ON c.Sub_Acct = a.Sub_Acct
// LEFT JOIN (
// SELECT
//     PolicyNo,
//     Shortname
// FROM
//     upward_insurance.policy a
// INNER JOIN upward_insurance.client_ids b ON b.IDNo = a.IDNo
// UNION ALL
// SELECT
//     aa.IDNo,
//     aa.Shortname
// FROM
//    upward_insurance.client_ids aa
// ) d ON d.PolicyNo = a.ID_No
// WHERE
// a.Source_Type NOT IN ('BF','BFD','BFS') AND d.Shortname IS NOT NULL
// GROUP BY
// GL_Acct, b.Short, a.ID_No, d.Shortname
// HAVING
// IF(CAST(LEFT(a.GL_Acct,1) AS UNSIGNED) <= 3 OR CAST(LEFT(a.GL_Acct,1) AS UNSIGNED) = 7, SUM(Debit)-SUM(Credit), SUM(Credit)-SUM(Debit)) <> 0
// ORDER BY
// `Group Header`, Header, GL_Acct;
// --add to where and gl.GL_Acct = '1.01.02' and gl.ID_No = 'UIA-1501-030'

// =====================================================================================
// INSURANCE
// =====================================================================================
// SELECT
//     a.GL_Acct,
//     a.Sub_Acct,
//     a.ID_No,
//     c.AccountCode AS mID,
//     SUM(a.mDebit) AS Debit,
//     SUM(a.mCredit) AS Credit,
//     IF(CAST(LEFT(GL_Acct,1) AS UNSIGNED) <= 3 OR CAST(LEFT(GL_Acct,1) AS UNSIGNED) = 7, SUM(a.mDebit)-SUM(a.mCredit), SUM(a.mCredit)-SUM(a.mDebit)) AS Balance
// FROM upward_insurance.qryjournal  a
// LEFT JOIN upward_insurance.policy b ON a.ID_No = b.PolicyNo
// INNER JOIN upward_insurance.policy_account c ON b.Account = c.Account
// WHERE a.Date_Entry <= '2024-01-01'
// GROUP BY
//     c.AccountCode,
//     a.Sub_Acct,
//     a.GL_Acct,
//     a.ID_No
// HAVING
//     IF(CAST(LEFT(GL_Acct,1) AS UNSIGNED) <= 3 OR CAST(LEFT(GL_Acct,1) AS UNSIGNED) = 7, SUM(a.mDebit)-SUM(a.mCredit), SUM(a.mCredit)-SUM(a.mDebit)) <> 0;
