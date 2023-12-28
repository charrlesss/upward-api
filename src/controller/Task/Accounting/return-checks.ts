import express from "express";
import { GenerateReturnCheckID } from "../../../model/Task/Accounting/return-checks.model";
const ReturnCheck = express.Router();

ReturnCheck.get("/get-new-return-check-id",  async (req, res) => {
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
export default ReturnCheck;
