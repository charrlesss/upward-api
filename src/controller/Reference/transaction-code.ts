import express, { Request, Response } from "express";
import { addTransactionCode, deleteTransactionCode, findTransactionCode, getTransactionCode, updateTransactionCode } from "../../model/Reference/transaction-account.model";

const TransactionCode = express.Router();

TransactionCode.get("/get-transaction-code", async (req: Request, res: Response) => {
  const { transactionCodeSearch } = req.query;
  try {
    res.send({
      message: "Get Transaction Code Successfully!",
      success: true,
      transactionCode: await getTransactionCode(transactionCodeSearch as string),
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

TransactionCode.post("/add-transaction-code", async (req: Request, res: Response) => {
  try {
    if (await findTransactionCode(req.body.Acct_Code)) {
      return res.send({
        message: "Transaction Code is Already Exist!",
        success: false,
      });
    }
    await addTransactionCode(req.body);
    res.send({
      message: "Create Transaction Code Successfully!",
      success: true,
    });
  } catch (err: any) {
    console.log(err.message);
    res.send({ message: err.message, success: false });
  }
});

TransactionCode.post(
  "/update-transaction-code",
  async (req: Request, res: Response) => {
    try {
      req.body.Inactive = Boolean(req.body.Inactive);
      await updateTransactionCode(req.body);
      res.send({
        message: "Update Transaction Code Successfully!",
        success: true,
      });
    } catch (err: any) {
      console.log(err.message);
      res.send({ message: err.message, success: false });
    }
  }
);

TransactionCode.post(
  "/delete-transaction-code",
  async (req: Request, res: Response) => {
    try {
      await deleteTransactionCode(req.body);
      res.send({
        message: "Delete Transaction Code Successfully!",
        success: true,
      });
    } catch (err: any) {
      console.log(err.message);
      res.send({ message: err.message, success: false });
    }
  }
);

TransactionCode.get(
  "/search-transaction-code",
  async (req: Request, res: Response) => {
    const { transactionCodeSearch } = req.query;
    try {
      res.send({
        message: "Get Transacation Code Successfully!",
        success: true,
        transactionCode: await getTransactionCode(transactionCodeSearch as string),
      });
    } catch (err: any) {
      res.send({ message: err.message, success: false });
    }
  }
);

export default TransactionCode;
