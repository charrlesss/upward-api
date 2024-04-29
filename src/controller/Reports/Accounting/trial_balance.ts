import { PrismaClient } from "@prisma/client";
import express from "express";
import { FinancialStatement } from "../../../model/db/stored-procedured";

const TrialBalance = express.Router();
const prisma = new PrismaClient();

TrialBalance.post("/trial-balance-report", async (req, res) => {
  try {
    const qry = FinancialStatement(
      req.body.date,
      req.body.sub_acct,
      req.body.dateFormat
    );
    const report = await prisma.$queryRawUnsafe(qry);
    res.send({
      message: "Successfully get Report",
      success: false,
      report,
    });
  } catch (err: any) {
    res.send({
      message: err.message,
      success: false,
      report: [],
    });
  }
});

export default TrialBalance;
