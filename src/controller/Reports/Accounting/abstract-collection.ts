import { PrismaClient } from "@prisma/client";
import express from "express";
import { AbstractCollections } from "../../../model/db/stored-procedured";

const AbstractCollection = express.Router();
const prisma = new PrismaClient();

AbstractCollection.post("/abstract-collection-report", async (req, res) => {
  try {
    const qry = AbstractCollections("Monthly", "ALL", new Date(), "Ascending");
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

export default AbstractCollection;
