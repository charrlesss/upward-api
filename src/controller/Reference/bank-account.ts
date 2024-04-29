import express, { Request, Response } from "express";
import {
  addBankAccount,
  getBankAccount,
  removeBankAccount,
  updateBankAccount,
  searchClient,
} from "../../model/Reference/bank-account";
import saveUserLogs from "../../lib/save_user_logs";
import { saveUserLogsCode } from "../../lib/saveUserlogsCode";

const BankAccount = express.Router();

BankAccount.get("/get-bank-account", async (req: Request, res: Response) => {
  const { bankAccountSearch } = req.query;
  try {
    res.send({
      message: "Get Bank Account Successfully!",
      success: true,
      bankAccount: await getBankAccount(bankAccountSearch as string),
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

BankAccount.get("/search-client", async (req: Request, res: Response) => {
  const { searchClientInput } = req.query;
  try {
    res.send({
      message: "Search Client Account Successfully!",
      success: true,
      client: await searchClient(searchClientInput as string),
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

BankAccount.post("/add-bank-account", async (req: Request, res: Response) => {
  try {
    delete req.body.search;
    delete req.body.mode;
    delete req.body.Account_ID_Name;
    delete req.body.BankName;
    await saveUserLogs(req, `${req.body.Auto}`, "add", "Bank-Account");
    delete req.body.Auto;
    await addBankAccount(req.body);
    res.send({
      message: "Create Bank Account Successfully!",
      success: true,
    });
  } catch (err: any) {
    console.log(err.message);
    res.send({ message: err.message, success: false });
  }
});

BankAccount.post(
  "/update-bank-account",
  async (req: Request, res: Response) => {
    try {
      if (
        !(await saveUserLogsCode(req, "edit", req.body.Auto, "Bank-Account"))
      ) {
        return res.send({ message: "Invalid User Code", success: false });
      }
      delete req.body.search;
      delete req.body.mode;
      delete req.body.userCodeConfirmation;
      delete req.body.Account_ID_Name;
      delete req.body.BankName;
      req.body.Inactive = Boolean(req.body.Inactive);
      const { Auto, ...rest } = req.body;
      await updateBankAccount(rest, Auto);
      res.send({
        message: "Update Bank Account Successfully!",
        success: true,
      });
    } catch (err: any) {
      console.log(err.message);
      res.send({ message: err.message, success: false });
    }
  }
);

BankAccount.post(
  "/delete-bank-account",
  async (req: Request, res: Response) => {
    try {
      if (
        !(await saveUserLogsCode(req, "delete", req.body.Auto, "Bank-Account"))
      ) {
        return res.send({ message: "Invalid User Code", success: false });
      }

      await removeBankAccount(req.body.Auto);
      res.send({
        message: "Delete Bank Account Successfully!",
        success: true,
      });
    } catch (err: any) {
      console.log(err.message);
      res.send({ message: err.message, success: false });
    }
  }
);

BankAccount.get("/search-bank-account", async (req: Request, res: Response) => {
  const { bankAccountSearch } = req.query;
  try {
    res.send({
      message: "Search Bank Account Successfuly",
      success: true,
      bankAccount: await getBankAccount(bankAccountSearch as string),
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

export default BankAccount;
