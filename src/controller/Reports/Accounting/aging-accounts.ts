import { PrismaClient } from "@prisma/client";
import express from "express";
import { AgingAccountsReport } from "../../../model/db/stored-procedured";
import { format } from "date-fns";
import { PrismaList } from "../../../model/connection";
const { CustomPrismaClient } = PrismaList();

const AgingAccounts = express.Router();

AgingAccounts.post("/aging-accounts", async (req, res) => {
  try {
    const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);

    const qry = AgingAccountsReport(
      new Date(req.body.date),
      req.body.policyType
    );

    const data: Array<any> = await prisma.$queryRawUnsafe(qry);
    const report = JSON.parse(JSON.stringify(data, customReplacer));
    const _TotalDue = formatNumber(getTotal(report, "_TotalDue"));
    const _TotalPaid = formatNumber(getTotal(report, "_TotalPaid"));
    const _Balance = formatNumber(getTotal(report, "_Balance"));
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
      _TotalDue,
      _TotalPaid,
      _Balance,
      _Discount: "",
      _AgentCom: "",
      due_days: "",
      isTotal: true,
    });

    function customReplacer(key: string, value: any) {
      return typeof value === "bigint" ? value.toString() : value;
    }

    function getTotal(array: Array<any>, datakey: string) {
      return array.reduce((d: any, itms: any) => {
        let num = parseFloat(itms[datakey].toString()?.replace(/,/g, ""));
        if (isNaN(num)) {
          num = 0;
        }
        return d + Math.abs(num);
      }, 0);
    }
    function formatNumber(number: number) {
      return number.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    res.send({
      message: "Successfully Get Report",
      success: true,
      report,
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
