import { PrismaClient } from "@prisma/client";
import express from "express";
import { PettyCashFundDisbursement } from "../../../model/db/stored-procedured";

const PettyCashFundDisbursements = express.Router();
const prisma = new PrismaClient();

PettyCashFundDisbursements.post(
  "/petty-cash-fund-disbursement",
  async (req, res) => {
    try {
      const qry = PettyCashFundDisbursement(
        "ALL",
        '2406-001',
        '2406-009'
      );

      const dataCash = await prisma.$queryRawUnsafe(qry.dtPettyCashQuery)
      const dataSumm = await prisma.$queryRawUnsafe(qry.dtSummaryQuery)



      res.send({
        message: "Successfully Get Report",
        success: true,
        report:dataCash,
      });
    } catch (err: any) {
      console.log(err.message);
      res.send({
        message: err.message,
        success: false,
        report: [],
      });
    }
  }
);

export default PettyCashFundDisbursements;
