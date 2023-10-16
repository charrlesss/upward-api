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
  findCtplById,
  findCtplfExist,
} from "../../model/Reference/ctpl.model";
import { getUserById } from "../../model/StoredProcedure";
import generateUniqueUUID from "../../lib/generateUniqueUUID";
import {
  createJournal,
  deleteJournal,
  findManyJournal,
  updateJournal,
} from "../../model/Task/Production/vehicle-policy";

const CTPL = express.Router();
function getZeroFirstInput(data: string) {
  let addZeroFromSeries = "";
  for (let i = 0; i < data.length; i++) {
    if (data.charAt(i) === "0") {
      addZeroFromSeries += "0";
    } else {
      break;
    }
  }
  return addZeroFromSeries;
}
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
    delete req.body.createdAt;
    const user = await getUserById((req.user as any).UserId);
    const ctplID = await generateUniqueUUID("ctplregistration", "ctplId");
    const { Prefix, NumSeriesFrom, NumSeriesTo, Cost } = req.body;

    if (!(req.body.Prefix.match(/^[A-Za-z]+$/))) {
      return res.send({
        message: "Invalid Prefix contain number!",
        success: false,
      });
    }

    let addZeroFromSeries = getZeroFirstInput(NumSeriesFrom);
    let addZeroToSeries = getZeroFirstInput(NumSeriesTo);

    if (addZeroToSeries.length !== addZeroFromSeries.length) {
      return res.send({
        message: "Invalid Series!",
        success: false,
      });
    }
    if (parseInt(NumSeriesFrom) > parseInt(NumSeriesTo)) {
      return res.send({
        message: "Invalid Series!",
        success: false,
      });
    }
    if (((await findCtplfExist(req.body)) as any).length > 0) {
      return res.send({
        message: "This data is already exist",
        success: false,
      });
    }

    for (let i = parseInt(NumSeriesFrom); i <= parseInt(NumSeriesTo); i++) {
      const _sourceNo = `${Prefix}${addZeroFromSeries}${i}`;
      // DEBIT'
      const res1 = await createJournal({
        Source_No: _sourceNo,
        Branch_Code: "HO",
        Date_Entry: new Date(),
        Source_Type: "GL",
        Explanation: "CTPL Registration",
        GL_Acct: "1.04.01",
        cGL_Acct: "CTPL Inventory",
        Debit: parseFloat(Cost),
        Credit: 0,
        TC: "CTI",
        Source_No_Ref_ID: ctplID,
      });
      // Credit
      const res2 = await createJournal({
        Source_No: _sourceNo,
        Branch_Code: "HO",
        Date_Entry: new Date(),
        Source_Type: "GL",
        Explanation: "CTPL Registration",
        GL_Acct: "1.04.01",
        cGL_Acct: "Advance Remittance",
        Debit: 0,
        Credit: parseFloat(Cost),
        TC: "ADR",
        Source_No_Ref_ID: ctplID,
      });
    }
    req.body.NumSeriesFrom = req.body.NumSeriesFrom;
    req.body.NumSeriesTo = req.body.NumSeriesTo;

    await addCTPL({
      ...req.body,
      ctplId: ctplID,
      CreatedBy: (user as any)?.Username,
    });
    return res.send({
      message: "Create CTPL Successfully!",
      success: true,
    });
  } catch (err: any) {
    console.log(err);
    res.send({ message: err.message, success: false });
  }
});

CTPL.post("/delete-ctpl", async (req: Request, res: Response) => {
  try {
    const tpldID = req.body.ctplId;
    const ctpl = await findCtplById(tpldID);
    if (ctpl == null) {
      return res.send({
        message: "Cannot Find Ctpl ID!",
        success: false,
      });
    }
    await deleteJournal(tpldID);
    await deleteCTPL(tpldID);
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

    const journal = await findManyJournal(ctplId);
    journal.forEach(async (data) => {
      const sourceCount = (
        (data.Source_No as string).match(/\d+/) as Array<any>
      )[0];
      await updateJournal(
        `${rest.Prefix}${sourceCount}`,
        rest.Cost,
        data.AutoNo
      );
    });
    await updateCTPL({ ...rest, CreatedBy: (user as any).Username }, ctplId);

    res.send({
      message: "Update Ctpl Successfully!",
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
