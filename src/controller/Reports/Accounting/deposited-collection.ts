import { PrismaClient } from "@prisma/client";
import express from "express";
import { DepositedCollections } from "../../../model/db/stored-procedured";

const DepositedCollection = express.Router();
const prisma = new PrismaClient();

DepositedCollection.post("/deposited-collection-report", async (req, res) => {
  try {
    const qry = DepositedCollections("Monthly", "ALL", new Date(), "Ascending");
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

export default DepositedCollection;
