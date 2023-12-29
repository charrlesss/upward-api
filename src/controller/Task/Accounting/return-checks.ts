import express from "express";
import {
  GenerateReturnCheckID,
  getBranchName,
  getCheckList,
  getCreditOnSelectedCheck,
  getDebitOnSelectedCheck,
} from "../../../model/Task/Accounting/return-checks.model";
const ReturnCheck = express.Router();

ReturnCheck.get("/get-new-return-check-id", async (req, res) => {
  try {
    res.send({
      message: "Successfully Get New Return Check ID.",
      success: false,
      returnCheckID: await GenerateReturnCheckID(),
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, returnCheckID: [] });
  }
});
ReturnCheck.get("/get-check-list", async (req, res) => {
  try {
    res.send({
      message: "Successfully Get Check List",
      success: false,
      checkList: await getCheckList(req.query.checkListSearch as string),
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, checkList: [] });
  }
});
ReturnCheck.post("/get-modal-return-check-data", async (req, res) => {
  try {
    res.send({
      message: "Successfully Get Modal Data",
      success: false,
      branchName: await getBranchName(),
      credit: await getCreditOnSelectedCheck(req.body.BankAccount),
      debit: await getDebitOnSelectedCheck(req.body.Official_Receipt),
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, credit: [], debit: [] });
  }
});
export default ReturnCheck;
