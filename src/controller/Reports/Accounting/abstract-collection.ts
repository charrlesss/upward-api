import { PrismaClient } from "@prisma/client";
import express from "express";
import { AbstractCollections } from "../../../model/db/stored-procedured";

const AbstractCollection = express.Router();
const prisma = new PrismaClient();

AbstractCollection.post("/abstract-collection-report", async (req, res) => {
  try {
    const { queryCollection, queryJournal } = AbstractCollections(
      "Monthly",
      "ALL",
      new Date(),
      "Ascending"
    );

    const dataCollection: any = await prisma.$queryRawUnsafe(queryCollection);
    const dataJournal: any = await prisma.$queryRawUnsafe(queryJournal);
    dataCollection.push({
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

    const Debit = dataCollection
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

    const Credit = dataCollection
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

    dataCollection.push({
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

    dataCollection.push({
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

    dataCollection.push({
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
      dataCollection.push({
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

    dataCollection.push({
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
    dataCollection.push({
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

    const report = dataCollection;
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

export default AbstractCollection;
