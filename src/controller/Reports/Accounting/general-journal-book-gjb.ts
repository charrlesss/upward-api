import { PrismaClient } from "@prisma/client";
import express from "express";
import { CashDisbursementBook_CDB_GJB } from "../../../model/db/stored-procedured";

const GeneralJournalBookGJB = express.Router();
const prisma = new PrismaClient();

GeneralJournalBookGJB.post(
  "/general-journal-book-gjb",
  async (req, res) => {
    try {
      const qry = CashDisbursementBook_CDB_GJB(
        "General Journal Book - GJB",
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

export default GeneralJournalBookGJB;
