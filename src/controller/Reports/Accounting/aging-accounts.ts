import { PrismaClient } from "@prisma/client";
import express from "express";
import { AgingAccountsReport } from "../../../model/db/stored-procedured";

const AgingAccounts = express.Router();
const prisma = new PrismaClient();

AgingAccounts.post("/aging-accounts", async (req, res) => {
  try {
    const qry = AgingAccountsReport(new Date(), "Regular");
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

export default AgingAccounts;
