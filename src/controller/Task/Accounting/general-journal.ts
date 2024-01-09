import express from "express";
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
} from "../../../model/Task/Accounting/general-journal.model";
const GeneralJournal = express.Router();

GeneralJournal.post(
  "/general-journal/add-general-journal",
  async (req, res) => {
    try {
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
        message: "Successfully add new general journal",
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
        getSelectedSearchGeneralJournal: await   getSelectedSearchGeneralJournal(
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

export default GeneralJournal;
