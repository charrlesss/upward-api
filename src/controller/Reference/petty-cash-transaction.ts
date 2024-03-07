import express, { Request, Response } from "express";
import {
  addPettyCashTransaction,
  deletePettyCashTransaction,
  getPettyCashTransaction,
  updatePettyCashTransaction,
} from "../../model/Reference/petty-cash-transaction..model";
import generateUniqueUUID from "../../lib/generateUniqueUUID";
import saveUserLogs from "../../lib/save_user_logs";
import { saveUserLogsCode } from "../../lib/saveUserlogsCode";

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
      delete req.body.mode;
      delete req.body.search;
      delete req.body.createdAt;
      const Petty_Log = await generateUniqueUUID("petty_log", "Petty_Log");
      await addPettyCashTransaction({ Petty_Log, ...req.body });
      await saveUserLogs(req, Petty_Log, "add", "Petty Cash");
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
      if (
        !(await saveUserLogsCode(req, "edit", req.body.Petty_Log, "Petty Cash"))
      ) {
        return res.send({ message: "Invalid User Code", success: false });
      }
      delete req.body.mode;
      delete req.body.search;
      delete req.body.userCodeConfirmation;
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
      if (
        !(await saveUserLogsCode(
          req,
          "delete",
          req.body.Petty_Log,
          "Petty Cash"
        ))
      ) {
        return res.send({ message: "Invalid User Code", success: false });
      }
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
