import express, { Request, Response } from "express";
import {
  addChartAccount,
  deleteChartAccount,
  findChartAccount,
  getChartAccount,
  updateChartAccount,
} from "../../model/Reference/chart-account.model";
import saveUserLogs from "../../lib/save_user_logs";
import { saveUserLogsCode } from "../../lib/saveUserlogsCode";

const ChartAccount = express.Router();

ChartAccount.get("/get-chart-accounts", async (req: Request, res: Response) => {
  const { chartAccountSearch } = req.query;
  try {
    res.send({
      message: "Get Chart Account Successfully!",
      success: true,
      chartAccount: await getChartAccount(chartAccountSearch as string),
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

ChartAccount.post("/add-chart-account", async (req: Request, res: Response) => {
  try {
    delete req.body.mode;
    delete req.body.search;

    if (await findChartAccount(req.body.Acct_Code)) {
      return res.send({
        message: "Chart Account is Already Exist!",
        success: false,
      });
    }
    await addChartAccount(req.body);
    await saveUserLogs(req, req.body.Acct_Code, "add", "Chart Account");
    res.send({
      message: "Create Chart Account Successfully!",
      success: true,
    });
  } catch (err: any) {
    console.log(err.message);
    res.send({ message: err.message, success: false });
  }
});

ChartAccount.post(
  "/update-chart-account",
  async (req: Request, res: Response) => {
    try {
      if (!(await saveUserLogsCode(req, "edit", req.body.Acct_Code, "Chart Account"))) {
        return res.send({ message: "Invalid User Code", success: false });
      }
      delete req.body.mode;
      delete req.body.search;
      delete req.body.userCodeConfirmation;
      
      req.body.Inactive = Boolean(req.body.Inactive);
      req.body.IDNo = Boolean(req.body.IDNo);
      req.body.SubAccnt = Boolean(req.body.SubAccnt);
      await updateChartAccount(req.body);
      res.send({
        message: "Update Chart Account Successfully!",
        success: true,
      });
    } catch (err: any) {
      console.log(err.message);
      res.send({ message: err.message, success: false });
    }
  }
);

ChartAccount.post(
  "/delete-chart-account",
  async (req: Request, res: Response) => {
    try {
      if (!(await saveUserLogsCode(req, "delete", req.body.Acct_Code, "Chart Account"))) {
        return res.send({ message: "Invalid User Code", success: false });
      }
      await deleteChartAccount(req.body);
      res.send({
        message: "Delete Chart Account Successfully!",
        success: true,
      });
    } catch (err: any) {
      console.log(err.message);
      res.send({ message: err.message, success: false });
    }
  }
);

ChartAccount.get(
  "/search-chart-account",
  async (req: Request, res: Response) => {
    const { chartAccountSearch } = req.query;
    try {
      res.send({
        message: "Get Chart Account Successfully!",
        success: true,
        chartAccount: await getChartAccount(chartAccountSearch as string),
      });
    } catch (err: any) {
      res.send({ message: err.message, success: false });
    }
  }
);

export default ChartAccount;
