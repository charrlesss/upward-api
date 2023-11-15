import express, { Request, Response } from "express";
import { addPettyCashTransaction, deletePettyCashTransaction, getPettyCashTransaction, updatePettyCashTransaction } from "../../model/Reference/petty-cash-transaction..model";

const PettyCashTransaction = express.Router();

PettyCashTransaction.get(
  "/get-petty-cash-transaction",
  async (req: Request, res: Response) => {
    const { pettyCashtTransactionSearch } = req.query;
    try {
      res.send({
        message: "Get Petty Cash Transaction Successfully!",
        success: true,
        pettyCashTransaction: await getPettyCashTransaction(
          pettyCashtTransactionSearch as string
        ),
      });
    } catch (err: any) {
      res.send({ message: err.message, success: false });
    }
  }
);

PettyCashTransaction.post(
  "/add-petty-cash-transaction",
  async (req: Request, res: Response) => {
    try {
      await addPettyCashTransaction(req.body);
      res.send({
        message: "Create Petty Cash Transaction Successfully!",
        success: true,
      });
    } catch (err: any) {
      console.log(err.message);
      res.send({ message: err.message, success: false });
    }
  }
);

PettyCashTransaction.post(
  "/update-petty-cash-transaction",
  async (req: Request, res: Response) => {
    try {
      req.body.Inactive = Boolean(req.body.Inactive);
      await updatePettyCashTransaction(req.body);
      res.send({
        message: "Update Petty Cash Transaction Successfully!",
        success: true,
      });
    } catch (err: any) {
      console.log(err.message);
      res.send({ message: err.message, success: false });
    }
  }
);

PettyCashTransaction.post(
  "/delete-petty-cash-transaction",
  async (req: Request, res: Response) => {
    try {
      await deletePettyCashTransaction(req.body);
      res.send({
        message: "Delete Petty Cash Transaction Successfully!",
        success: true,
      });
    } catch (err: any) {
      console.log(err.message);
      res.send({ message: err.message, success: false });
    }
  }
);

PettyCashTransaction.get(
  "/search-petty-cash-transaction",
  async (req: Request, res: Response) => {
    const { pettyCashtTransactionSearch } = req.query;
    try {
      res.send({
        message: "Get Petty Cash Transaction Successfully!",
        success: true,
        pettyCashTransaction: await getPettyCashTransaction(
          pettyCashtTransactionSearch as string
        ),
      });
    } catch (err: any) {
      res.send({ message: err.message, success: false });
    }
  }
);

export default PettyCashTransaction;
