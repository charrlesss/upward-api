import express, { Request, Response } from "express";
import { mapDataBasedOnHeaders } from "../../lib/mapbaseonheader";
import { ExportToExcel } from "../../lib/exporttoexcel";
import {
  getPrefix,
  searchCTPL,
  addCTPL,
  updateCTPL,
  deleteCTPL,
  getType,
} from "../../model/Reference/ctpl.model";
import { getUserById } from "../../model/StoredProcedure";

const CTPL = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

CTPL.get("/get-ctpl", async (req: Request, res: Response) => {
  const { ctplSearch } = req.query;
  try {
    const ctpl = await searchCTPL(ctplSearch as string);
    const prefix = await getPrefix();
    const type = await getType();

    res.send({
      message: "Get CTPL Successfully!",
      success: true,
      ctpl: {
        ctpl,
        prefix,
        type,
      },
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

CTPL.post("/add-ctpl", async (req: Request, res: Response) => {
  try {
    const user = await getUserById((req.user as any).UserId);

    const { Prefix, NumSeriesFrom, NumSeriesTo, Cost, CreatedBy } = req.body;
    console.log(NumSeriesFrom);
    console.log(NumSeriesTo);
    const N0_ = "0".repeat(NumSeriesFrom.length); // Initialize N0_ with '0's based on the length of txtFrom
    console.log(req.body);

    for (let i = parseInt(NumSeriesFrom); i <= parseInt(NumSeriesTo); i++) {
      // DEBIT'
      const res1 = await prisma.journal.create({
        data: {
          Source_No: `${5000 + i}`,
          AutoNo: `${940000 + i}`,
          Branch_Code: "HO",
          Date_Entry: new Date(),
          Source_Type: "GL",
          Explanation: "CTPL Registration",
          GL_Acct: "1.04.01",
          cGL_Acct: "CTPL Inventory",
          Debit: parseFloat(Cost),
          Credit: 0,
          TC: "CTI",
        },
      });
      //   // Credit
      const res2 = await prisma.journal.create({
        data: {
          Source_No: `${5000 + i}`,
          AutoNo: `${4000 + i}`,
          Branch_Code: "HO",
          Date_Entry: new Date(),
          Source_Type: "GL",
          Explanation: "CTPL Registration",
          GL_Acct: "1.04.01",
          cGL_Acct: "Advance Remittance",
          Debit: 0,
          Credit: parseFloat(Cost),
          TC: "ADR",
        },
      });
      console.log(res1);
      console.log(res2);
    }

    req.body.NumSeriesFrom = parseInt(req.body.NumSeriesFrom);
    req.body.NumSeriesTo = parseInt(req.body.NumSeriesTo);
    await addCTPL({ ...req.body, CreatedBy: (user as any)?.Username ?? "charles" });
    return res.send({
      message: "Create CTPL Successfully!",
      success: true,
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

CTPL.post("/delete-ctpl", async (req: Request, res: Response) => {
  try {
    await deleteCTPL(parseInt(req.body.ctplId));
    res.send({
      message: "Delete CTPL Successfully!",
      success: true,
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

CTPL.post("/update-ctpl", async (req: Request, res: Response) => {
  try {
    const user = await getUserById((req.user as any).UserId);
    const { ctplId, ...rest } = req.body;
    delete rest.createdAt;
    delete rest.CreatedBy;
    rest.NumSeriesFrom = parseInt(rest.NumSeriesFrom);
    rest.NumSeriesTo = parseInt(rest.NumSeriesTo);
    await updateCTPL(
      { ...rest, CreatedBy: (user as any).Username },
      parseInt(ctplId)
    );
    res.send({
      message: "Update Mortgagee Successfully!",
      success: true,
    });
  } catch (err: any) {
    console.log(err.message);
    res.send({ message: err.message, success: false });
  }
});

CTPL.get("/search-ctpl", async (req: Request, res: Response) => {
  const { ctplSearch } = req.query;
  try {
    const ctpl: any = await searchCTPL(ctplSearch as string);
    res.send({
      message: "Search Policy Account Successfuly",
      success: true,
      ctpl,
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

CTPL.get("/export-ctpl", async (req, res) => {
  const subAccountHeaders: any = {
    CTPL: {
      header: [
        "Prefix",
        "Number SeriesFrom",
        "Number SeriesTo",
        "Cost",
        "Created By",
        "Created At",
      ],
      row: [
        "Prefix",
        "NumSeriesFrom",
        "NumSeriesTo",
        "Cost",
        "CreatedBy",
        "createdAt",
      ],
    },
  };
  const { ctplSearch, isAll } = req.query;

  let data = [];
  if (JSON.parse(isAll as string)) {
    data = mapDataBasedOnHeaders(
      (await searchCTPL("", true)) as Array<any>,
      subAccountHeaders,
      "CTPL"
    );
  } else {
    data = mapDataBasedOnHeaders(
      (await searchCTPL(ctplSearch as string)) as Array<any>,
      subAccountHeaders,
      "CTPL"
    );
  }

  ExportToExcel(data, res);
});

export default CTPL;
