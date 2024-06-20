import { PrismaClient } from "@prisma/client";
import express from "express";
import { CashDisbursementBook_GJB } from "../../../model/db/stored-procedured";

const GeneralJournalBookGJB = express.Router();
const prisma = new PrismaClient();

GeneralJournalBookGJB.post("/general-journal-book-gjb", async (req, res) => {
  try {
    const qry = CashDisbursementBook_GJB(
      "General Journal Book - GJB",
      "ALL",
      new Date(),
      "Monthly",
      "ASC"
    );
    function customReplacer(key: string, value: any) {
      return typeof value === "bigint" ? value.toString() : value;
    }
    const data: any = await prisma.$queryRawUnsafe(qry.strSQL);
      const dataSumm: any = await prisma.$queryRawUnsafe(qry.strSubSQL);

      const jsonString = JSON.stringify(data, customReplacer);
      const report = JSON.parse(jsonString);

      const Debit = report
        .reduce((a: number, item: any) => {
          let num = 0;
          if (!isNaN(parseFloat(item.Debit?.replace(/,/g, "")))) {
            num = parseFloat(item.Debit?.replace(/,/g, ""));
          }
          return a + num;
        }, 0)
        .toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

      const Credit = report
        .reduce((a: number, item: any) => {
          let num = 0;
          if (!isNaN(parseFloat(item.Credit?.replace(/,/g, "")))) {
            num = parseFloat(item.Credit?.replace(/,/g, ""));
          }
          return a + num;
        }, 0)
        .toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

      report.push({
        Date_Entry: "",
        nST: "",
        Source_Type: "",
        Source_No: "",
        Explanation: "",
        Acct_Code: "",
        Acct_Title: "",
        subAcct: "",
        IDNo: "",
        Name: "TOTAL :",
        Debit,
        Credit,
        TC: "",
        nSource_No: "",
        nSource_Type: "",
        nDate_Entry: "",
        nExplanation: "",
        nHeader: "",
        prev_source_no: "",
        mainTotal: true,
      });

      report.push({
        Date_Entry: "",
        nST: "",
        Source_Type: "",
        Source_No: "",
        Explanation: "",
        Acct_Code: "",
        Acct_Title: "SUMMARY:",
        subAcct: "",
        IDNo: "",
        Name: "",
        Debit: "",
        Credit: "",
        TC: "",
        nSource_No: "",
        nSource_Type: "",
        nDate_Entry: "",
        nExplanation: "",
        nHeader: "",
        prev_source_no: "",
        summary: true,
      });

      report.push({
        Date_Entry: "",
        nST: "",
        Source_Type: "",
        Source_No: "",
        Explanation: "",
        Acct_Code: "",
        Acct_Title: "",
        subAcct: "",
        IDNo: "",
        Name: "",
        Debit: "",
        Credit: "",
        TC: "",
        nSource_No: "",
        nSource_Type: "",
        nDate_Entry: "",
        nExplanation: "",
        nHeader: "",
        prev_source_no: "",
        summaryHeader: true,
      });

      dataSumm.forEach((item: any) => {
        report.push({
          Date_Entry: "",
          nST: "",
          Source_Type: "",
          Source_No: "",
          Explanation: "",
          Acct_Code: item.GL_Acct,
          Acct_Title: item.Title,
          subAcct: "",
          IDNo: "",
          Name: "",
          Debit: item.mDebit,
          Credit: item.mCredit,
          TC: "",
          nSource_No: "",
          nSource_Type: "",
          nDate_Entry: "",
          nExplanation: "",
          nHeader: "",
          prev_source_no: "",
          summaryData: true,
        });
      });
      const mDebit = dataSumm
        .reduce((a: number, item: any) => {
          let num = 0;
          if (!isNaN(parseFloat(item.mDebit.toString().replace(/,/g, "")))) {
            num = parseFloat(item.mDebit.toString().replace(/,/g, ""));
          }
          return a + num;
        }, 0)
        .toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

      const mCredit = dataSumm
        .reduce((a: number, item: any) => {
          let num = 0;
          if (!isNaN(parseFloat(item.mCredit.toString().replace(/,/g, "")))) {
            num = parseFloat(item.mCredit.toString().replace(/,/g, ""));
          }
          return a + num;
        }, 0)
        .toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

      report.push({
        Date_Entry: "",
        nST: "",
        Source_Type: "",
        Source_No: "",
        Explanation: "",
        Acct_Code: "",
        Acct_Title: "TOTAL: ",
        subAcct: "",
        IDNo: "",
        Name: "",
        Debit: mDebit,
        Credit: mCredit,
        TC: "",
        nSource_No: "",
        nSource_Type: "",
        nDate_Entry: "",
        nExplanation: "",
        nHeader: "",
        prev_source_no: "",
        summaryFooter: true,
      });

      res.send({
        message: "Successfully Get Report",
        success: true,
        qry,
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

export default GeneralJournalBookGJB;
