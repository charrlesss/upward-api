import express from "express";
import { GenerateCashDisbursementID } from "../../../model/Task/Accounting/cash-disbursement.model";
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

export default CashDisbursement;
