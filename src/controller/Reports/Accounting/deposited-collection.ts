import { PrismaClient } from "@prisma/client";
import express from "express";
import { DepositedCollections } from "../../../model/db/stored-procedured";

const DepositedCollection = express.Router();
const prisma = new PrismaClient();

DepositedCollection.post("/deposited-collection-report", async (req, res) => {
  try {
    const { queryDeposit, queryJournal } = DepositedCollections(
      "Monthly",
      "ALL",
      new Date(),
      "Ascending"
    );

    const dataDeposit: any = await prisma.$queryRawUnsafe(queryDeposit);
    const dataJournal: any = await prisma.$queryRawUnsafe(queryJournal);
    dataDeposit.push({
      Date: "",
      ORNo: "",
      IDNo: "",
      cName: "",
      Bank: "",
      cCheck_No: "----- Nothing Follows -----",
      DRCode: "",
      Debit: "",
      DRTitle: "",
      CRCode: "",
      Credit: "",
      CRTitle: "",
      Purpose: "",
      CRRemarks: "",
      Official_Receipt: "",
      Temp_OR: "",
      Date_OR: "",
      Rpt: "",
      Status: "",
      follows: true,
    });

    const Debit = dataDeposit
      .reduce((a: number, item: any) => {
        let num = 0;
        if (!isNaN(parseFloat(item.Debit.replace(/,/g, "")))) {
          num = parseFloat(item.Debit.replace(/,/g, ""));
        }
        return a + num;
      }, 0)
      .toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    const Credit = dataDeposit
      .reduce((a: number, item: any) => {
        let num = 0;
        if (!isNaN(parseFloat(item.Credit.replace(/,/g, "")))) {
          num = parseFloat(item.Credit.replace(/,/g, ""));
        }
        return a + num;
      }, 0)
      .toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    dataDeposit.push({
      Date: "",
      ORNo: "",
      IDNo: "",
      cName: "",
      Bank: "TOTAL :",
      cCheck_No: "",
      DRCode: "",
      Debit,
      DRTitle: "",
      CRCode: "",
      Credit,
      CRTitle: "",
      Purpose: "",
      CRRemarks: "",
      Official_Receipt: "",
      Temp_OR: "",
      Date_OR: "",
      Rpt: "",
      Status: "",
      total: true,
    });

    dataDeposit.push({
      Date: "",
      ORNo: "",
      IDNo: "",
      cName: "SUMMARY:",
      Bank: "",
      cCheck_No: "",
      DRCode: "",
      Debit: "",
      DRTitle: "",
      CRCode: "",
      Credit: "",
      CRTitle: "",
      Purpose: "",
      CRRemarks: "",
      Official_Receipt: "",
      Temp_OR: "",
      Date_OR: "",
      Rpt: "",
      Status: "",
      summary: true,
    });

    dataDeposit.push({
      Date: "",
      ORNo: "ACCOUNT TITLE",
      IDNo: "",
      cName: "",
      Bank: "",
      cCheck_No: "",
      DRCode: "",
      Debit: "",
      DRTitle: "",
      CRCode: "",
      Credit: "",
      CRTitle: "",
      Purpose: "DEBIT",
      CRRemarks: "CREDIT",
      Official_Receipt: "",
      Temp_OR: "",
      Date_OR: "",
      Rpt: "",
      Status: "",
      summ: true,
      header: true,
    });

    dataJournal.forEach((itm: any) => {
      dataDeposit.push({
        Date: "",
        ORNo: "",
        IDNo: "",
        cName: "",
        Bank: "",
        cCheck_No: "",
        DRCode: "",
        Debit: itm.mDebit,
        DRTitle: "",
        CRCode: "",
        Credit: itm.mCredit,
        CRTitle: "",
        Purpose: "",
        CRRemarks: "",
        Official_Receipt: "",
        Temp_OR: "",
        Date_OR: "",
        Rpt: "",
        Status: "",
        GL_Acct: itm.GL_Acct,
        Title: itm.Title,
        summ: true,
      });
    });

    const mDebit = dataJournal
      .reduce((a: number, item: any) => {
        let num = 0;
        if (!isNaN(parseFloat(item.mDebit.replace(/,/g, "")))) {
          num = parseFloat(item.mDebit.replace(/,/g, ""));
        }
        return a + num;
      }, 0)
      .toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    const mCredit = dataJournal
      .reduce((a: number, item: any) => {
        let num = 0;
        if (!isNaN(parseFloat(item.mCredit.replace(/,/g, "")))) {
          num = parseFloat(item.mCredit.replace(/,/g, ""));
        }
        return a + num;
      }, 0)
      .toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    dataDeposit.push({
      Date: "",
      ORNo: "TOTAL:",
      IDNo: "",
      cName: "",
      Bank: "",
      cCheck_No: "",
      DRCode: "",
      Debit: mDebit,
      DRTitle: "",
      CRCode: "",
      Credit: mCredit,
      CRTitle: "",
      Purpose: "",
      CRRemarks: "",
      Official_Receipt: "",
      Temp_OR: "",
      Date_OR: "",
      Rpt: "",
      Status: "",
      summ: true,
      footer: true,
    });
    dataDeposit.push({
      Date: "Prepared:",
      ORNo: "Checked:",
      IDNo: "Approved:",
      cName: "",
      Bank: "",
      cCheck_No: "",
      DRCode: "",
      Debit: "",
      DRTitle: "",
      CRCode: "",
      Credit: "",
      CRTitle: "",
      Purpose: "",
      CRRemarks: "",
      Official_Receipt: "",
      Temp_OR: "",
      Date_OR: "",
      Rpt: "",
      Status: "",
      summ: true,
      signature: true,
    });

    const report = dataDeposit;

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

export default DepositedCollection;
