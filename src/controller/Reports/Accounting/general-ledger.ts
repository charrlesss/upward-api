import { PrismaClient } from "@prisma/client";
import express from "express";
import {
  GeneralLedgerReport,
  GeneralLedgerSumm,
} from "../../../model/db/stored-procedured";
import { report } from "process";

const GeneralLedger = express.Router();
const prisma = new PrismaClient();

GeneralLedger.post("/general-ledger-report", async (req, res) => {
  try {
    const qry = GeneralLedgerReport(
      req.body.dateFormat,
      new Date(req.body.date),
      req.body.sub_acct,
      req.body.format,
      req.body.closing
    );
    const qrySum = GeneralLedgerSumm(new Date(), "Monthly", 0, 1);
    function groupByGLAcct(data: Array<any>) {
      let grouped: any = {};
      data.forEach((entry) => {
        if (!grouped[entry.GL_Acct]) {
          grouped[entry.GL_Acct] = [];
        }
        grouped[entry.GL_Acct].push(entry);
      });

      return Object.values(grouped);
    }
    const report = groupByGLAcct(await prisma.$queryRawUnsafe(qry));
    report.map((itm: any) => {
      const firstItem = itm[0];
      const Debit = itm.reduce((a: number, item: any) => {
        let num = 0;
        if (!isNaN(parseFloat(item.Debit.replace(/,/g, "")))) {
          num = parseFloat(item.Debit.replace(/,/g, ""));
        }
        return a + num;
      }, 0);
      const Credit = itm.reduce((a: number, item: any) => {
        let num = 0;
        if (!isNaN(parseFloat(item.Credit.replace(/,/g, "")))) {
          num = parseFloat(item.Credit.replace(/,/g, ""));
        }
        return a + num;
      }, 0);
      const SubTotal = itm.reduce((a: number, item: any) => {
        let num = 0;
        if (!isNaN(parseFloat(item.SubTotal.replace(/,/g, "")))) {
          num = parseFloat(item.SubTotal.replace(/,/g, ""));
        }
        return a + num;
      }, 0);

      itm.unshift({
        header: true,
        GL_Acct: firstItem.GL_Acct,
        Book: firstItem.Title,
        BookCode: "",
        Title: "",
        Debit: "",
        Credit: "",
        SubTotal: "",
      });

      itm.push({
        division: true,
        GL_Acct: "",
        Title: "",
        BookCode: "",
        Book: "Account Total :",
        Debit: Debit.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        Credit: Credit.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        SubTotal: SubTotal.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      });
      return itm;
    });
    report.map((itm: any) => {
      itm.map((item: any, idx: number) => {
        if (idx !== 0) {
          item.GL_Acct = "";
        }
        return item;
      });
      return itm;
    });
    res.send({
      message: "Successfully Get Report",
      success: true,
      report: report.flat(),
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

export default GeneralLedger;
