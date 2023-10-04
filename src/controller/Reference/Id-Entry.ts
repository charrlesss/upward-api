import express, { Request, Response } from "express";
import {
  CreateAgentEntry,
  CreateClientEntry,
  CreateEmployeeEntry,
  CreateFixedAssetstEntry,
  CreateOtherEntry,
  CreateSupplierEntry,
  deleteEntry,
  getAllSubAccount,
  searchEntry,
  updateEntry,
} from "../../model/Reference/id-entry.model";
import { IDGenerator, UpdateId } from "../../model/StoredProcedure";
import excel from "exceljs";
import fs from "fs";
import { v4 as uuidV4 } from "uuid";

const ID_Entry = express.Router();

ID_Entry.post("/id-entry-client", async (req: Request, res: Response) => {
  const [s, ym, newCount] = req.body.entry_client_id.split("-");
  const newMonth = ym.substring(0, 2);
  const newYear = ym.substring(2);
  try {
    await CreateClientEntry(req.body);
    await UpdateId("entry client", newCount, newMonth, newYear);
    res.send({
      message: "Successfully Create New Client ID Entry",
      success: true,
    });
  } catch (err: any) {
    res.send({ success: false, message: err.message });
  }
});

ID_Entry.post("/id-entry-employee", async (req: Request, res: Response) => {
  const [s, ym, newCount] = req.body.entry_employee_id.split("-");
  const newMonth = ym.substring(0, 2);
  const newYear = ym.substring(2);
  try {
    await CreateEmployeeEntry(req.body);
    await UpdateId("entry employee", newCount, newMonth, newYear);
    res.send({
      message: "Successfully Create New Employee ID Entry",
      success: true,
    });
  } catch (err: any) {
    res.send({ success: false, message: err.message });
  }
});

ID_Entry.post("/id-entry-agent", async (req: Request, res: Response) => {
  const [s, ym, newCount] = req.body.entry_agent_id.split("-");
  const newMonth = ym.substring(0, 2);
  const newYear = ym.substring(2);
  try {
    await CreateAgentEntry(req.body);
    await UpdateId("entry agent", newCount, newMonth, newYear);
    res.send({
      message: "Successfully Create New Agent ID Entry",
      success: true,
    });
  } catch (err: any) {
    res.send({ success: false, message: err.message });
  }
});

ID_Entry.post("/id-entry-fixed-assets", async (req: Request, res: Response) => {
  const [s, ym, newCount] = req.body.entry_fixed_assets_id.split("-");
  const newMonth = ym.substring(0, 2);
  const newYear = ym.substring(2);
  try {
    await CreateFixedAssetstEntry(req.body);
    await UpdateId("entry fixed assets", newCount, newMonth, newYear);
    res.send({
      message: "Successfully Create New Fixed Assets ID Entry",
      success: true,
    });
  } catch (err: any) {
    res.send({ success: false, message: err.message });
  }
});

ID_Entry.post("/id-entry-supplier", async (req: Request, res: Response) => {
  const [s, ym, newCount] = req.body.entry_supplier_id.split("-");
  const newMonth = ym.substring(0, 2);
  const newYear = ym.substring(2);
  try {
    await CreateSupplierEntry(req.body);
    await UpdateId("entry supplier", newCount, newMonth, newYear);
    res.send({
      message: "Successfully Create New Supplier ID Entry",
      success: true,
    });
  } catch (err: any) {
    res.send({ success: false, message: err.message });
  }
});

ID_Entry.post("/id-entry-others", async (req: Request, res: Response) => {
  const [s, ym, newCount] = req.body.entry_others_id.split("-");
  const newMonth = ym.substring(0, 2);
  const newYear = ym.substring(2);
  try {
    await CreateOtherEntry(req.body);
    await UpdateId("entry others", newCount, newMonth, newYear);
    res.send({
      message: "Successfully Create New Other ID Entry",
      success: true,
    });
  } catch (err: any) {
    res.send({ success: false, message: err.message });
  }
});

ID_Entry.post("/entry-update", async (req, res) => {
  try {
    await updateEntry(req.query.entry as string, req.body);
    res.send({ message: "Update Successfully", success: true });
  } catch (err: any) {
    res.send({ success: false, message: err.message });
  }
});

ID_Entry.post("/id-entry-generate-id", async (req: Request, res: Response) => {
  res.send({
    success: false,
    message: "Generate ID Successfully",
    generateID: await IDGenerator(req.body.sign, req.body.type),
  });
});

ID_Entry.get("/id-entry-subaccounts", async (req: Request, res: Response) => {
  try {
    res.send({
      success: true,
      message: "Successfully Get All Sub Account",
      subaccount: await getAllSubAccount(),
    });
  } catch (err: any) {
    res.send({ success: false, message: err.message });
  }
});

ID_Entry.get("/search-entry", async (req, res) => {
  const { entry, entrySearch } = req.query;
  try {
    if (entry === "Client" || entry === "Employee") {
      return res.send({
        success: true,
        message: "Successfully Get All Client Entry ",
        entry: await searchEntry(entry as string, entrySearch as string),
        sub_accounts: await getAllSubAccount(),
      });
    }
    res.send({
      success: true,
      message: "Successfully Get All Client Entry ",
      entry: await searchEntry(entry as string, entrySearch as string),
    });
  } catch (err: any) {
    res.send({ success: false, message: err.message, entry: [] });
  }
});

ID_Entry.get("/export-entry", async (req, res) => {
  const entryHeaders: any = {
    Client: {
      header: [
        "Entry Client ID",
        "Company",
        "Firstname",
        "Middlename",
        "Lastname",
        "Email",
        "Mobile",
        "Telephone",
        "Address",
        "Sub Account",
        "Option",
        "Created At",
      ],
      row: [
        "entry_client_id",
        "company",
        "firstname",
        "middlename",
        "lastname",
        "email",
        "mobile",
        "telephone",
        "address",
        "NewShortName",
        "option",
        "createdAt",
      ],
    },
  };
  const { entry, entrySearch, isAll } = req.query;
  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet("Sheet 1");
  let data = [];
  if (JSON.parse(isAll as string)) {
    data = mapDataBasedOnHeaders(
      (await searchEntry(entry as string, "" , true)) as Array<any>,
      entryHeaders
    );
  } else {
    data = mapDataBasedOnHeaders(
      (await searchEntry(entry as string, entrySearch as string)) as Array<any>,
      entryHeaders
    );
  }
  data.forEach((items: any) => {
    worksheet.addRow(items);
  });
  const name = uuidV4();
  const excelFilePath = `${name}.xlsx`;

  workbook.xlsx
    .writeFile(excelFilePath)
    .then(() => {
      res.download(excelFilePath, `${name}.xlsx`, (err) => {
        if (err) {
          console.error("Error while downloading:", err);
        } else {
          fs.unlinkSync(excelFilePath);
        }
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    });
});

ID_Entry.post("/entry-delete", async (req, res) => {
  try {
    await deleteEntry(req.query.entry as string, req.body.id);
    res.send({
      success: true,
      message: "Successfully Delete",
    });
  } catch (err: any) {
    res.send({ success: false, message: err.message });
  }
});

function mapDataBasedOnHeaders(dataArray: Array<any>, entryHeaders: any) {
  const headerRow = entryHeaders.Client.header;
  const rowKeys = entryHeaders.Client.row;

  const mappedData = dataArray.map((dataItem) => {
    return rowKeys.map((key: any) => dataItem[key]);
  });
  return [headerRow, ...mappedData];
}

export default ID_Entry;
