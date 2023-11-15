import express, { Request, Response } from "express";
import {
  addChartAccount,
  deleteChartAccount,
  findChartAccount,
  getChartAccount,
  updateChartAccount,
} from "../../model/Reference/chart-account.model";

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
    if (await findChartAccount(req.body.Acct_Code)) {
      return res.send({
        message: "Chart Account is Already Exist!",
        success: false,
      });
    }
    await addChartAccount(req.body);
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
