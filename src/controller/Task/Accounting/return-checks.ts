import express from "express";
import {
  GenerateReturnCheckID,
  addNewReturnCheck,
  deleteReturnCheck,
  getBranchName,
  getCheckList,
  getCreditOnSelectedCheck,
  getDebitOnSelectedCheck,
  updateRCID,
  updatePDCFromReturnCheck,
  updateJournalFromReturnCheck,
  deleteJournalFromReturnCheck,
  addJournalFromReturnCheck,
  searchReturnChecks,
  getReturnCheckSearchFromJournal,
  getReturnCheckSearch,
  findReturnCheck,
} from "../../../model/Task/Accounting/return-checks.model";
const ReturnCheck = express.Router();

ReturnCheck.get("/get-new-return-check-id", async (req, res) => {
  try {
    res.send({
      message: "Successfully Get New Return Check ID.",
      success: true,
      returnCheckID: await GenerateReturnCheckID(),
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, returnCheckID: [] });
  }
});
ReturnCheck.get("/get-check-list", async (req, res) => {
  try {
    const checkList = await getCheckList(req.query.checkListSearch as string);
    res.send({
      message: "Successfully Get Check List",
      success: true,
      checkList,
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, checkList: [] });
  }
});
ReturnCheck.post("/get-modal-return-check-data", async (req, res) => {
  try {
    res.send({
      message: "Successfully Get Modal Data",
      success: true,
      branchName: await getBranchName(),
      credit: await getCreditOnSelectedCheck(req.body.BankAccount),
      debit: await getDebitOnSelectedCheck(req.body.Official_Receipt),
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, credit: [], debit: [] });
  }
});
ReturnCheck.post("/add-return-check", async (req, res) => {
  try {
    if (
      !req.body.isUpdated &&
      ((await findReturnCheck(req.body.RefNo)) as Array<any>).length > 0
    ) {
      return res.send({
        message: `${req.body.RefNo} already exists!`,
        success: false,
        isClearableError :false,
        credit: [],
        debit: [],
      });
    }
    await deleteReturnCheck(req.body.RefNo);
    req.body.selected.forEach(async (items: any, index: number) => {
      await addNewReturnCheck({
        Area: req.body.BranchCode,
        RC_Date: req.body.DateReturn,
        RC_No: req.body.RefNo,
        Explanation: req.body.Explanation,
        Check_No: items.Check_No,
        Date_Deposit: new Date(items.DepoDate).toISOString(),
        Amount: parseFloat(items.Amount.replace(/,/g, "")).toFixed(2),
        Reason: items.Reason,
        Bank: items.Bank,
        Check_Date: items.Check_Date,
        Date_Return: items.Return_Date,
        SlipCode: items.DepoSlip,
        ORNum: items.OR_NO,
        BankAccnt: items.Bank_Account,
        nSort: (index + 1).toString().padStart(2, "00"),
        Date_Collect: new Date(items.OR_Date),
        Temp_RCNo: `${req.body.RefNo}${(
          parseInt(req.body.RefNo.split("-")[1]) + index
        )
          .toString()
          .padStart(2, "0")}`,
      });
      await updatePDCFromReturnCheck(items.Check_No);
      await updateJournalFromReturnCheck(items.Check_No, items.DepoSlip);
    });

    await deleteJournalFromReturnCheck(req.body.RefNo);


    req.body.accountingEntry.forEach(async (items: any) => {
      await addJournalFromReturnCheck({
        Branch_Code: req.body.BranchCode,
        Date_Entry: req.body.DateReturn,
        Source_Type: "RC",
        Source_No: req.body.RefNo,
        Explanation: req.body.Explanation,
        GL_Acct: items.Code,
        cGL_Acct: items.AccountName,
        Sub_Acct: items.SubAcct,
        cSub_Acct: items.SubAcctName,
        ID_No: items.IDNo,
        cID_No: items.Identity,
        Debit: parseFloat(items.Debit.replace(/,/g, "")).toFixed(2),
        Credit: parseFloat(items.Credit.replace(/,/g, "")).toFixed(2),
        Check_Date: items.Check_Date,
        Check_No: items.Check_No,
        Check_Bank: items.Bank,
        Check_Return: items.Check_Return,
        Check_Deposit: items.DepoDate,
        Check_Collect: items.Date_Collection,
        Check_Reason: items.Check_Reason,
        TC: "RTC",
        Source_No_Ref_ID: "",
      });
    });
    await updateRCID(req.body.RefNo.split("-")[1]);

    res.send({
      message: req.body.isUpdated
        ? "Successfully update return check"
        : "Successfully add return check",
      success: true,
      isClearableError:true
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({ message: error.message, success: false, credit: [], debit: [] ,isClearableError:false});
  }
});
ReturnCheck.get("/search-return-checks", async (req, res) => {
  const { searchReturnChecks: search } = req.query;
  try {
    res.send({
      message: "Successfully search return check",
      success: true,
      returnCheckSearch: await searchReturnChecks(search as string),
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({ message: error.message, success: false, returnCheckSearch: [] });
  }
});

ReturnCheck.post(
  "/get-search-selected-checks-information",
  async (req, res) => {
    try {
      res.send({
        message: "Successfully search return check",
        success: true,
        accountingEntry: await getReturnCheckSearchFromJournal(req.body.RC_No),
        selected: await getReturnCheckSearch(req.body.RC_No),
      });
    } catch (error: any) {
      console.log(error.message);
      res.send({ message: error.message, success: false });
    }
  }
);

export default ReturnCheck;
