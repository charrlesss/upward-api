import { PrismaClient } from "@prisma/client";
import express from "express";
import { ReturnedChecksCollection } from "../../../model/db/stored-procedured";

const ReturnChecksCollection = express.Router();
const prisma = new PrismaClient();

ReturnChecksCollection.post("/return-checks-collection", async (req, res) => {
  try {
    const qry = ReturnedChecksCollection(
      "Monthly",
      "ALL",
      new Date(),
      "Ascending"
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

export default ReturnChecksCollection;
