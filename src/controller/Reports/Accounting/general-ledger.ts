import { PrismaClient } from "@prisma/client";
import express from "express";
import {
  GeneralLedgerReport,
  GeneralLedgerSumm,
} from "../../../model/db/stored-procedured";

const GeneralLedger = express.Router();
const prisma = new PrismaClient();

GeneralLedger.post("/general-ledger-report", async (req, res) => {
  try {
    const qry = GeneralLedgerReport("Monthly", new Date(), "ALL", 0, 1);
    const qrySum = GeneralLedgerSumm(new Date(), "Monthly", 0, 1);
    res.send({
      message: "Successfully Get Report",
      success: true,
      qry,
      qrySum,
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

export default GeneralLedger;
