import { PrismaClient } from "@prisma/client";
import express from "express";
import { AgingAccountsReport } from "../../../model/db/stored-procedured";

const AgingAccounts = express.Router();
const prisma = new PrismaClient();

AgingAccounts.post("/aging-accounts", async (req, res) => {
  try {
    const qry = AgingAccountsReport(new Date(), "Regular");
    const summary: Array<any> = [];

    const report: Array<any> = await prisma.$queryRawUnsafe(qry);
    const totalCountDayDue = report.reduce((count, item) => {
      return item.due_days > 0 ? count + 1 : count;
    }, 0);

    const totalSumDayDue = report.reduce(
      (sum: any, item: any) => sum + (item.due_days > 0 ? item.due_days : 0),
      0
    );

    const totalCountUnpaid = report.reduce((count, item) => {
      return item.Balance > 0 ? count + 1 : count;
    }, 0);

    const totalSumUnpaid = report.reduce(
      (sum: any, item: any) => sum + (item.Balance > 0 ? item.Balance : 0),
      0
    );

    summary.push({
      f1: "",
      f2: "NO. OF ACCOUNTS",
      f3: "TOTAL BALANCE",
    });

    summary.push({
      f1: "Current Unpaid:",
      f2: totalCountUnpaid.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      f3: totalSumUnpaid.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    });

    summary.push({
      f1: "Past Due:",
      f2: totalCountDayDue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      f3: totalSumDayDue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    });
    const totalDayDue = totalCountDayDue + totalSumDayDue;
    const totalUnpdaid = totalCountUnpaid + totalSumUnpaid;
    summary.push({
      f1: "TOTAL:",
      f2: totalUnpdaid.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      f3: totalDayDue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    });

    function customReplacer(key: string, value: any) {
      return typeof value === "bigint" ? value.toString() : value;
    }

    const data = JSON.stringify(report, customReplacer);

    res.send({
      message: "Successfully Get Report",
      success: true,
      report: data,
      summary,
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

export default AgingAccounts;
