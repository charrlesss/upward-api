import { PrismaClient } from "@prisma/client";
import express from "express";
import { VATBook } from "../../../model/db/stored-procedured";

const VatBookVB = express.Router();
const prisma = new PrismaClient();

VatBookVB.post("/vat-book-vb", async (req, res) => {
  try {
    const qry = VATBook("Date", "ASC", "Monthly", new Date(), "ALL");
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
});

export default VatBookVB;
