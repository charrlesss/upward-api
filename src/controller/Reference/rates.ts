import express, { Request, Response } from "express";
import { mapDataBasedOnHeaders } from "../../lib/mapbaseonheader";
import { ExportToExcel } from "../../lib/exporttoexcel";
import {
  addRate,
  getBonds,
  getFire,
  getPolicyAccounts,
  searchRate,
  updateRate,
  deleteRate,
} from "../../model/Reference/rates.model";
import { getline } from "../../model/Reference/subline.model";

const Rates = express.Router();

Rates.get("/get-rates", async (req: Request, res: Response) => {
  const { ratesSearch } = req.query;
  try {
    const rate = await searchRate(ratesSearch as string);
    const line = await getline();
    const policy = await getPolicyAccounts();
    res.send({
      message: "Get Rates Successfully!",
      success: true,
      rate: {
        rate,
        line,
        policy,
        type: {
          Bonds: await getBonds(),
          Fire: await getFire(),
        },
      },
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

Rates.post("/add-rates", async (req: Request, res: Response) => {
  try {
    req.body.createdAt = new Date()
    await addRate(req.body);
    res.send({
      message: "Create Rates Successfully!",
      success: true,
    });
  } catch (err: any) {
    console.log(err.message);
    res.send({ message: err.message, success: false });
  }
});

Rates.post("/update-rates", async (req: Request, res: Response) => {
  try {
    await updateRate(parseInt(req.body.ID), req.body.Type, req.body.Rate);
    res.send({
      message: "Update Rates Successfully!",
      success: true,
    });
  } catch (err: any) {
    console.log(err.message);
    res.send({ message: err.message, success: false });
  }
});

Rates.post("/delete-rates", async (req: Request, res: Response) => {
  try {
    await deleteRate(parseInt(req.body.ID));
    res.send({
      message: "Delete Rates Successfully!",
      success: true,
    });
  } catch (err: any) {
    console.log(err.message);
    res.send({ message: err.message, success: false });
  }
});

Rates.get("/search-rates", async (req: Request, res: Response) => {
  const { ratesSearch } = req.query;
  try {
    const rates: any = await searchRate(ratesSearch as string);
    res.send({
      message: "Search Policy Account Successfuly",
      success: true,
      rates,
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

Rates.get("/export-rates", async (req: Request, res: Response) => {
    const subAccountHeaders: any = {
        Rates: {
          header: ["ID", "Account","Type","Rate", "Created At"],
          row: ["ID", "Account","Type","Rate", "createdAt"],
        },
      };
      const { ratesSearch, isAll } = req.query;
    
      let data = [];
      if (JSON.parse(isAll as string)) {
        data = mapDataBasedOnHeaders(
          (await searchRate("", true)) as Array<any>,
          subAccountHeaders,
          "Rates"
        );
      } else {
        data = mapDataBasedOnHeaders(
          (await searchRate(ratesSearch as string)) as Array<any>,
          subAccountHeaders,
          "Rates"
        );
      }
    
      ExportToExcel(data, res);
  });

export default Rates;
