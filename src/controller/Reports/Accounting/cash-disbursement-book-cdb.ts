import { PrismaClient } from "@prisma/client";
import express from "express";
import { CashDisbursementBook_CDB_GJB } from "../../../model/db/stored-procedured";

const CashDisbursementBookCDB = express.Router();
const prisma = new PrismaClient();

CashDisbursementBookCDB.post(
  "/cash-disbursement-book-cdb",
  async (req, res) => {
    try {
      const qry = CashDisbursementBook_CDB_GJB(
        "Cash Disbursement Book - CDB",
        "ALL",
        new Date(),
        "Monthly",
        "ASC"
      );
      res.send({
        message: "Successfully Get Report",
        success: true,
        qry,
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

export default CashDisbursementBookCDB;
