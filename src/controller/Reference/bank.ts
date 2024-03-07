import express, { Request, Response } from "express";
import {
  addBank,
  findBank,
  getBanks,
  removeBank,
  updateBank,
} from "../../model/Reference/banl.mode.";
import saveUserLogs from "../../lib/save_user_logs";
import { saveUserLogsCode } from "../../lib/saveUserlogsCode";

const Bank = express.Router();

Bank.get("/get-banks", async (req: Request, res: Response) => {
  const { bankSearch } = req.query;
  try {
    res.send({
      message: "Get Rates Successfully!",
      success: true,
      bank: await getBanks(bankSearch as string),
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

Bank.post("/add-bank", async (req: Request, res: Response) => {
  try {
    delete req.body.mode;
    delete req.body.search;

    if (await findBank(req.body.Bank_Code)) {
      return res.send({ message: "Bank is Already Exist!", success: false });
    }
    await addBank(req.body);
    await saveUserLogs(req, req.body.Bank_Code, "add", "Bank");

    res.send({
      message: "Create Bank Successfully!",
      success: true,
    });
  } catch (err: any) {
    console.log(err.message);
    res.send({ message: err.message, success: false });
  }
});

Bank.post("/update-bank", async (req: Request, res: Response) => {
  try {
    if (!(await saveUserLogsCode(req, "edit", req.body.Bank_Code, "Bank"))) {
      return res.send({ message: "Invalid User Code", success: false });
    }
    delete req.body.mode;
    delete req.body.search;
    delete req.body.userCodeConfirmation;
    req.body.Inactive = Boolean(req.body.Inactive);
    await updateBank(req.body);
    res.send({
      message: "Update Bank Successfully!",
      success: true,
    });
  } catch (err: any) {
    console.log(err.message);
    res.send({ message: err.message, success: false });
  }
});

Bank.post("/delete-bank", async (req: Request, res: Response) => {
  try {
    if (!(await saveUserLogsCode(req, "delete", req.body.Bank_Code, "Bank"))) {
      return res.send({ message: "Invalid User Code", success: false });
    }

    await removeBank(req.body.Bank_Code);
    res.send({
      message: "Delete Bank Successfully!",
      success: true,
    });
  } catch (err: any) {
    console.log(err.message);
    res.send({ message: err.message, success: false });
  }
});

Bank.get("/search-bank", async (req: Request, res: Response) => {
  const { bankSearch } = req.query;
  try {
    res.send({
      message: "Search Bank Successfuly",
      success: true,
      bank: await getBanks(bankSearch as string),
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

export default Bank;
