import express from "express";
import {
  getCashCollection,
  getCheckCollection,
} from "../../../model/Task/Accounting/deposit.model";
const Deposit = express.Router();

Deposit.get("/getCashCollection", async (req, res) => {
  try {
    res.send({
      message: "Successfully Get Cash Collection.",
      success: true,
      cash: await getCashCollection(""),
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, cash: [] });
  }
});

Deposit.get("/getCheckCollection", async (req, res) => {
  try {
    res.send({
      message: "Successfully Get Check Collection.",
      success: true,
      check: await getCheckCollection(""),
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, check: [] });
  }
});

export default Deposit
