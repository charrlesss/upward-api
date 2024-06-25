import { PrismaClient } from "@prisma/client";
import express from "express";
import { AgingAccountsReport } from "../../../model/db/stored-procedured";
import { format } from "date-fns";

const AgingAccounts = express.Router();
const prisma = new PrismaClient();

AgingAccounts.post("/aging-accounts", async (req, res) => {
  try {
    const qry = AgingAccountsReport(
      new Date(req.body.date),
      req.body.policyType
    );
    const summary: Array<any> = [];

    const data: Array<any> = await prisma.$queryRawUnsafe(qry);
    const report = JSON.parse(JSON.stringify(data, customReplacer));

    const __TotalDue = report.reduce((sum: any, item: any) => {
      let totalDue = parseFloat(item._TotalDue.replace(/,/g, ""));
      return sum + (totalDue > 0 ? totalDue : 0);
    }, 0);
    const __TotalPaid = report.reduce((sum: any, item: any) => {
      let totalPaid = parseFloat(item._TotalPaid.replace(/,/g, ""));
      return sum + (totalPaid > 0 ? totalPaid : 0);
    }, 0);
    const __Balance = report.reduce((sum: any, item: any) => {
      let balance = parseFloat(item._Balance.replace(/,/g, ""));
      return sum + (balance > 0 ? balance : 0);
    }, 0);

    report.push({
      IDNo: "",
      Shortname: "",
      PolicyNo: "",
      UnitInssured: "",
      DateIssued: "",
      EstimatedValue: "",
      TotalDue: "",
      TotalPaid: "",
      Balance: "",
      Discount: "",
      AgentCom: "",
      Remarks: "",
      _DateIssued: "",
      Row_Num: "",
      _EstimatedValue: "",
      _TotalDue: __TotalDue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      _TotalPaid: __TotalPaid.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      _Balance: __Balance.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      _Discount: "",
      _AgentCom: "",
      due_days: "",
      total: true,
    });

    const totalCountDayDue = report.reduce((count: any, item: any) => {
      return item.due_days > 0 ? count + 1 : count;
    }, 0);

    const totalSumDayDue = report.reduce(
      (sum: any, item: any) => sum + (item.due_days > 0 ? item.due_days : 0),
      0
    );

    const totalCountUnpaid = report.reduce((count: any, item: any) => {
      return item.Balance > 0 ? count + 1 : count;
    }, 0);

    const totalSumUnpaid = report.reduce((sum: any, item: any) => {
      let balance = parseFloat(item.Balance.replace(/,/g, ""));
      return sum + (balance > 0 ? balance : 0);
    }, 0);
    const formattedDate = format(new Date(req.body.date), "MMMM dd, yyyy");

    summary.push({
      IDNo: ``,
      Shortname: "",
      PolicyNo: "",
      UnitInssured: "",
      DateIssued: "",
      EstimatedValue: "",
      TotalDue: "",
      TotalPaid: "",
      Balance: "",
      Discount: "",
      AgentCom: "",
      Remarks: "",
      _DateIssued: "",
      Row_Num: "",
      _EstimatedValue: "",
      _TotalDue: "",
      _TotalPaid: "",
      _Balance: "",
      _Discount: "",
      _AgentCom: "",
      due_days: "",
      summaryReport: true,
      summaryReportExtraHeight: 0,
    });

    summary.push({
      IDNo: `${formattedDate}`,
      Shortname: "NO. OF ACCOUNTS",
      PolicyNo: "TOTAL BALANCE",
      UnitInssured: "",
      DateIssued: "",
      EstimatedValue: "",
      TotalDue: "",
      TotalPaid: "",
      Balance: "",
      Discount: "",
      AgentCom: "",
      Remarks: "",
      _DateIssued: "",
      Row_Num: "",
      _EstimatedValue: "",
      _TotalDue: "",
      _TotalPaid: "",
      _Balance: "",
      _Discount: "",
      _AgentCom: "",
      due_days: "",
      summaryHeader: true,
    });

    summary.push({
      IDNo: `Current Unpaid:`,
      Shortname: totalCountUnpaid.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
      PolicyNo: totalSumUnpaid.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      UnitInssured: "",
      DateIssued: "",
      EstimatedValue: "",
      TotalDue: "",
      TotalPaid: "",
      Balance: "",
      Discount: "",
      AgentCom: "",
      Remarks: "",
      _DateIssued: "",
      Row_Num: "",
      _EstimatedValue: "",
      _TotalDue: "",
      _TotalPaid: "",
      _Balance: "",
      _Discount: "",
      _AgentCom: "",
      due_days: "",
      summaryData: true,
    });
    summary.push({
      IDNo: `Past Due:`,
      Shortname: totalCountDayDue.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
      PolicyNo: totalSumDayDue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      UnitInssured: "",
      DateIssued: "",
      EstimatedValue: "",
      TotalDue: "",
      TotalPaid: "",
      Balance: "",
      Discount: "",
      AgentCom: "",
      Remarks: "",
      _DateIssued: "",
      Row_Num: "",
      _EstimatedValue: "",
      _TotalDue: "",
      _TotalPaid: "",
      _Balance: "",
      _Discount: "",
      _AgentCom: "",
      due_days: "",
      summaryData: true,
    });

    const totaAccount = totalCountDayDue + totalCountUnpaid;
    const totalBalance = totalSumDayDue + totalSumUnpaid;
    summary.push({
      IDNo: `TOTAL:`,
      Shortname: totaAccount.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
      PolicyNo: totalBalance.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      UnitInssured: "",
      DateIssued: "",
      EstimatedValue: "",
      TotalDue: "",
      TotalPaid: "",
      Balance: "",
      Discount: "",
      AgentCom: "",
      Remarks: "",
      _DateIssued: "",
      Row_Num: "",
      _EstimatedValue: "",
      _TotalDue: "",
      _TotalPaid: "",
      _Balance: "",
      _Discount: "",
      _AgentCom: "",
      due_days: "",
      summaryData: true,
      totalSum: true,
    });

    function customReplacer(key: string, value: any) {
      return typeof value === "bigint" ? value.toString() : value;
    }

    res.send({
      message: "Successfully Get Report",
      success: true,
      report: report.concat(summary),
      summary,
      qry,
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
