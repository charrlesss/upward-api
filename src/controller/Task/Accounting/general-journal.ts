import express, { response } from "express";
import {
  getTransactionAccount,
  getPolicyIdClientIdRefId,
  getChartOfAccount,
  GenerateGeneralJournalID,
  addJournalVoucher,
  addJournalFromJournalVoucher,
  updatePettyCashID,
  searchGeneralJournal,
  getSelectedSearchGeneralJournal,
  deleteGeneralJournal,
  deleteJournalFromGeneralJournal,
  voidGeneralJournal,
  insertVoidGeneralJournal,
  voidJournalFromGeneralJournal,
  insertVoidJournalFromGeneralJournal,
  doRPTTransaction,
} from "../../../model/Task/Accounting/general-journal.model";
import { getMonth, getYear, endOfMonth, format } from "date-fns";

const GeneralJournal = express.Router();

GeneralJournal.post(
  "/general-journal/add-general-journal",
  async (req, res) => {
    try {
      await deleteGeneralJournal(req.body.refNo);
      await deleteJournalFromGeneralJournal(req.body.refNo);

      req.body.generalJournal.forEach(async (item: any) => {
        await addJournalVoucher({
          Branch_Code: item.BranchCode,
          Date_Entry: req.body.dateEntry, // Assuming dtpDate is a valid date
          Source_Type: "GL",
          Source_No: req.body.refNo,
          Explanation: req.body.explanation,
          GL_Acct: item.code,
          cGL_Acct: item.acctName,
          cSub_Acct: item.subAcctName,
          cID_No: item.ClientName,
          Debit: parseFloat(item.debit.replace(/,/g, "")),
          Credit: parseFloat(item.credit.replace(/,/g, "")),
          TC: item.TC_Code,
          Remarks: item.remarks,
          Sub_Acct: item.subAcct,
          ID_No: item.IDNo,
          VAT_Type: item.vatType,
          OR_Invoice_No: item.invoice,
          VATItemNo: parseInt(item.TempID),
        });
        await addJournalFromJournalVoucher({
          Branch_Code: item.BranchCode,
          Date_Entry: req.body.dateEntry, // Assuming dtpDate is a valid date
          Source_Type: "GL",
          Source_No: req.body.refNo,
          Explanation: req.body.explanation,
          GL_Acct: item.code,
          cGL_Acct: item.acctName,
          cSub_Acct: item.subAcctName,
          cID_No: item.ClientName,
          Debit: parseFloat(item.debit.replace(/,/g, "")),
          Credit: parseFloat(item.credit.replace(/,/g, "")),
          TC: item.TC_Code,
          Remarks: item.remarks,
          Sub_Acct: item.subAcct,
          ID_No: item.IDNo,
          VAT_Type: item.vatType,
          OR_Invoice_No: item.invoice,
          VATItemNo: parseInt(item.TempID),
          Source_No_Ref_ID: "",
        });
      });
      await updatePettyCashID(req.body.refNo.split("-")[1]);
      res.send({
        message: req.body.hasSelected
          ? `Successfully update ${req.body.refNo}  in general journal`
          : `Successfully add new ${req.body.refNo} in general journal`,
        success: true,
      });
    } catch (error: any) {
      res.send({
        message: error.message,
        success: false,
      });
    }
  }
);
GeneralJournal.post(
  "/general-journal/void-general-journal",
  async (req, res) => {
    try {
      await voidGeneralJournal(req.body.refNo);
      await insertVoidGeneralJournal(req.body.refNo, req.body.dateEntry);
      await voidJournalFromGeneralJournal(req.body.refNo);
      await insertVoidJournalFromGeneralJournal(
        req.body.refNo,
        req.body.dateEntry
      );
      res.send({
        message: `Successfully void ${req.body.refNo} in general journal`,
        success: true,
      });
    } catch (error: any) {
      console.log(error.message);
      res.send({
        message: error.message,
        success: false,
      });
    }
  }
);
GeneralJournal.get(
  "/general-journal/get-general-journal-id",
  async (req, res) => {
    try {
      res.send({
        message: "Successfully get get general journal id",
        success: true,
        generateGeneralJournalID: await GenerateGeneralJournalID(),
      });
    } catch (error: any) {
      res.send({
        message: error.message,
        success: false,
        generateGeneralJournalID: [],
      });
    }
  }
);

GeneralJournal.get("/general-journal/get-chart-account", async (req, res) => {
  const { chartAccountSearch: search } = req.query;
  try {
    res.send({
      message: "Successfully get chart account",
      success: true,
      getChartOfAccount: await getChartOfAccount(search as string),
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false });
  }
});

GeneralJournal.get(
  "/general-journal/get-policyId-ClientId-RefId",
  async (req, res) => {
    const { policyClientRefIDSearch: search } = req.query;
    try {
      res.send({
        message: "Successfully get policy, client, ref, ID",
        success: true,
        getPolicyIdClientIdRefId: await getPolicyIdClientIdRefId(
          search as string
        ),
      });
    } catch (error: any) {
      res.send({ message: error.message, success: false });
    }
  }
);

GeneralJournal.get(
  "/general-journal/get-transaction-account",
  async (req, res) => {
    const { transactionCodeSearch: search } = req.query;
    try {
      res.send({
        message: "Successfully get transaction account",
        success: true,
        getTransactionAccount: await getTransactionAccount(search as string),
      });
    } catch (error: any) {
      res.send({
        message: error.message,
        success: false,
        getTransactionAccount: [],
      });
    }
  }
);

GeneralJournal.get(
  "/general-journal/search-general-journal",
  async (req, res) => {
    const { searchGeneralJournal: search } = req.query;
    try {
      res.send({
        message: "Successfully get get general journal id",
        success: true,
        searchGeneralJournal: await searchGeneralJournal(search as string),
      });
    } catch (error: any) {
      res.send({
        message: error.message,
        success: false,
        searchGeneralJournal: [],
      });
    }
  }
);

GeneralJournal.post(
  "/general-journal/get-selected-search-general-journal",
  async (req, res) => {
    try {
      res.send({
        message: "Successfully get selected  general journal ",
        success: true,
        getSelectedSearchGeneralJournal: await getSelectedSearchGeneralJournal(
          req.body.Source_No
        ),
      });
    } catch (error: any) {
      res.send({
        message: error.message,
        success: false,
        getSelectedSearchGeneralJournal: [],
      });
    }
  }
);
GeneralJournal.post("/general-journal/jobs", async (req, res) => {
  console.log(req.body);
  let response = [];
  const month = getMonth(new Date(req.body.jobTransactionDate)) + 1;
  const from = `${
    month.toString().length > 1 ? month : "0" + month
  }-01-${getYear(new Date(req.body.jobTransactionDate))}`;
  const to = format(
    endOfMonth(new Date(req.body.jobTransactionDate)),
    "MM-dd-yyyy"
  );

  switch (req.body.jobType) {
    case "":
      response = [];
      break;
    case "0":
      response = [];
      break;
    case "1":
      response = [];
      break;
    case "2":
      response = [];
      break;
    case "3":
      response = [];
      break;
    case "4":
      response = (await doRPTTransaction(
        `
      '1.03.01' as code,
      'Premium Receivables' as acctName, 
      d.ShortName as subAcctName,
      d.Acronym as BranchCode,
      d.ClientName,
      "0.0" as debit,
      FORMAT(REPLACE((TotalDue - ifnull(b.TotalPaid, 0)), ',', ''), 2)  AS credit,
      'RPT' as TC_Code,
      '' as remarks,
      '' as vatType,
      '' as invoice,
      a.PolicyNo,
      a.IDNo, 
      b.TotalPaid,
      c.Mortgagee,
      LPAD(ROW_NUMBER() OVER (), 3, '0') AS TempID
      `,
        from,
        to,
        "N I L - HN"
      )) as Array<any>;
      break;
    case "5":
      console.log(from, "-", to, "AMIFIN");
      response = (await doRPTTransaction(
        `
      '1.03.01' as code,
      'Premium Receivables' as acctName, 
      d.ShortName as subAcctName,
      d.Acronym as BranchCode,
      d.ClientName,
      "0.0" as debit,
      (TotalDue - ifnull(b.TotalPaid, 0)) AS credit,
      'RPT' as TC_Code,
      '' as remarks,
      '' as vatType,
      'NA' as invoice,
      a.PolicyNo,
      a.IDNo, 
      b.TotalPaid,
      c.Mortgagee,
      LPAD(ROW_NUMBER() OVER (), 3, '0') AS TempID
      `,
        from,
        to,
        "AMIFIN"
      )) as Array<any>;
      break;
    case "6":
      response = [];
      break;
    case "7":
      response = [];
      break;
    case "8":
      response = [];
      break;
    case "9":
      "Milestone Guarantee";
      response = [];
      break;
    case "10":
      "Liberty Insurance Co.";
      response = [];
      break;
    case "11":
      "Federal Phoenix";
      response = [];
      break;
    default:
      response = [];
  }

  try {
    res.send({
      message: "Successfully get jobs ",
      success: true,
      jobs:response,
    });
  } catch (error: any) {
    res.send({
      message: error.message,
      success: false,
      jobs: [],
    });
  }
});

export default GeneralJournal;
