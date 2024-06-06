import { PrismaClient } from "@prisma/client";
import express from "express";
import { ProductionBook } from "../../../model/db/stored-procedured";

const ProductionBookPB = express.Router();
const prisma = new PrismaClient();

ProductionBookPB.post("/production-book-pb", async (req, res) => {
  try {
    const qry = ProductionBook(
      "Date Issued",
      "ASC",
      "Monthly",
      new Date(),
      "ALL"
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
});

export default ProductionBookPB;
