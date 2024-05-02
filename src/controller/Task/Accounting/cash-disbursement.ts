import express from "express";
import {
  AddNewCashDisbursement,
  AddNewJournalFromCashDisbursement,
  GenerateCashDisbursementID,
  DeleteNewCashDisbursement,
  DeleteNewJournalFromCashDisbursement,
  updateCashDisbursementID,
  findCashDisbursement,
  searchCashDisbursement,
  findSearchSelectedCashDisbursement,
  insertVoidJournalFromCashDisbursement,
  insertVoidCashDisbursement,
} from "../../../model/Task/Accounting/cash-disbursement.model";
import saveUserLogs from "../../../lib/save_user_logs";
import { saveUserLogsCode } from "../../../lib/saveUserlogsCode";
const CashDisbursement = express.Router();

CashDisbursement.get("/cash-disbursement/generate-id", async (req, res) => {
  try {
    res.send({
      message: "Successfully get cash disbursement id",
      success: true,
      generatedId: await GenerateCashDisbursementID(),
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({ message: error.message, success: false, generatedId: [] });
  }
});

CashDisbursement.post(
  "/cash-disbursement/add-cash-disbursement",
  async (req, res) => {
    try {
      if (
        req.body.hasSelected &&
        !(await saveUserLogsCode(
          req,
          "edit",
          req.body.refNo,
          "Cash-Disbursement"
        ))
      ) {
        return res.send({ message: "Invalid User Code", success: false });
      }

      const cashDisbursement = (await findCashDisbursement(
        req.body.refNo
      )) as Array<any>;
      if (cashDisbursement.length > 0 && !req.body.hasSelected) {
        return res.send({
          message: `${req.body.refNo} already exist!`,
          success: true,
        });
      }
      await DeleteNewCashDisbursement(req.body.refNo);
      await DeleteNewJournalFromCashDisbursement(req.body.refNo);
      req.body.cashDisbursement.forEach(async (item: any, index: number) => {
        await AddNewCashDisbursement({
          Branch_Code: item.BranchCode,
          Date_Entry: req.body.dateEntry,
          Source_Type: "CV",
          Source_No: req.body.refNo,
          Explanation: req.body.explanation,
          Particulars: req.body.particulars,
          Payto: item.Payto,
          Address: item.address,
          GL_Acct: item.code,
          cGL_Acct: item.acctName,
          cSub_Acct: item.subAcctName,
          cID_No: item.ClientName,
          Debit: parseFloat(item.debit.replace(/,/g, "")),
          Credit: parseFloat(item.credit.replace(/,/g, "")),
          Check_No: item.code === "1.01.10" ? item.checkNo : "",
          Check_Date: item.code === "1.01.10" ? item.checkDate : "",
          Remarks: item.remarks,
          Sub_Acct: item.subAcct,
          ID_No: item.IDNo,
          TC: item.TC_Code,
          VAT_Type: item.vatType,
          OR_Invoice_No: item.invoice,
          VATItemNo: parseInt(item.TempID),
        });
        await AddNewJournalFromCashDisbursement({
          Branch_Code: "HO",
          Date_Entry: req.body.dateEntry,
          Source_Type: "CV",
          Source_No: req.body.refNo,
          Explanation: req.body.explanation,
          Particulars: req.body.particulars,
          Payto: item.Payto,
          Address: item.address,
          GL_Acct: item.code,
          cGL_Acct: item.acctName,
          cSub_Acct: item.subAcctName,
          cID_No: item.ClientName,
          Debit: parseFloat(item.debit.replace(/,/g, "")),
          Credit: parseFloat(item.credit.replace(/,/g, "")),
          Check_No: item.code === "1.01.10" ? item.checkNo : "",
          Check_Date: item.code === "1.01.10" ? item.checkDate : "",
          Remarks: item.remarks,
          Sub_Acct: "HO",
          ID_No: item.IDNo,
          TC: item.TC_Code,
          VAT_Type: item.vatType,
          OR_Invoice_No: item.invoice,
          VATItemNo: parseInt(item.TempID),
          Source_No_Ref_ID: "",
        });
      });
      if (!req.body.hasSelected) {
        await updateCashDisbursementID(req.body.refNo.split("-")[1]);
        await saveUserLogs(req, req.body.refNo, "add", "Cash-Disbursement");
      }

      res.send({
        message: req.body.hasSelected
          ? `Successfully update ${req.body.refNo}  in cash disbursement`
          : `Successfully add new ${req.body.refNo} in cash disbursement`,
        success: true,
      });
    } catch (error: any) {
      console.log(error.message);
      res.send({ message: error.message, success: false });
    }
  }
);

CashDisbursement.post(
  "/cash-disbursement/void-cash-disbursement",
  async (req, res) => {
    try {
      if (
        !(await saveUserLogsCode(
          req,
          "void",
          req.body.refNo,
          "Cash-Disbursement"
        ))
      ) {
        return res.send({ message: "Invalid User Code", success: false });
      }

      await DeleteNewCashDisbursement(req.body.refNo);
      await insertVoidJournalFromCashDisbursement(
        req.body.refNo,
        req.body.dateEntry
      );
      await DeleteNewJournalFromCashDisbursement(req.body.refNo);
      await insertVoidCashDisbursement(req.body.refNo, req.body.dateEntry);
      await saveUserLogs(req, req.body.refNo, "void", "Cash-Disbursement");
      res.send({
        message: `Successfully void ${req.body.refNo} in cash disbursement`,
        success: true,
      });
    } catch (error: any) {
      console.log(error.message);
      res.send({ message: error.message, success: false });
    }
  }
);

CashDisbursement.get(
  "/cash-disbursement/search-cash-disbursement",
  async (req, res) => {
    try {
      const { searchCashDisbursement: search } = req.query;
      res.send({
        message: "Successfully get search cash disbursement",
        success: true,
        search: await searchCashDisbursement(search as string),
      });
    } catch (error: any) {
      console.log(error.message);
      res.send({ message: error.message, success: false, search: [] });
    }
  }
);

CashDisbursement.post(
  "/cash-disbursement/get-selected-search-cash-disbursement",
  async (req, res) => {
    try {
      const selectedCashDisbursement = await findSearchSelectedCashDisbursement(
        req.body.Source_No
      );
      res.send({
        message: "Successfully get selected search in cash disbursement",
        success: true,
        selectedCashDisbursement,
      });
    } catch (error: any) {
      console.log(error.message);
      res.send({
        message: error.message,
        success: false,
        selectedCashDisbursement: [],
      });
    }
  }
);

export default CashDisbursement;
