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
import { ExportToExcel } from "../../lib/exporttoexcel";
import { mapDataBasedOnHeaders } from "../../lib/mapbaseonheader";

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
    Employee: {
      header: [
        "Entry Employee ID",
        "Firstname",
        "Middlename",
        "Lastname",
        "Sub Account",
        "Created At",
        "Address",
      ],
      row: [
        "entry_employee_id",
        "firstname",
        "middlename",
        "lastname",
        "NewShortName",
        "createdAt",
        "address",
      ],
    },
    Agent: {
      header: [
        "Entry Agent ID",
        "Firstname",
        "Middlename",
        "Lastname",
        "Email",
        "Mobile",
        "Telephone",
        "Created At",
        "Address",
      ],
      row: [
        "entry_agent_id",
        "firstname",
        "middlename",
        "lastname",
        "email",
        "mobile",
        "telephone",
        "createdAt",
        "address",
      ],
    },
    'Fixed Assets': {
      header: [
        "Entry Fixed Assets ID",
        "Fullname",
        "Description",
        "Remarks",
        "Created At"
      ],
      row: [
        "entry_fixed_assets_id",
        "fullname",
        "description",
        "remarks",
        "createdAt"
      ],
    },
    Supplier:{
      header: [
        "Entry Supplier ID",
        "Company",
        "Firstname",
        "Middlename",
        "Lastname",
        "Email",
        "Mobile",
        "Telephone",
        "Address",
        "TIN NO",
        "VAT Type",
        "Option",
        "Created At",
      ],
      row: [
        "entry_supplier_id",
        "company",
        "firstname",
        "middlename",
        "lastname",
        "email",
        "mobile",
        "telephone",
        "address",
        "tin_no",
        "VAT_Type",
        "option",
        "createdAt",
      ],
    },
    Others: {
      header: [
        "Entry Others ID",
        "Description",
        "Created At",
      ],
      row: [
        "entry_others_id",
        "description",
        "createdAt",
      ],
    },
  };
  const { entry, entrySearch, isAll } = req.query;

  let data = [];
  if (JSON.parse(isAll as string)) {
    data = mapDataBasedOnHeaders(
      (await searchEntry(entry as string, "", true)) as Array<any>,
      entryHeaders,
      entry as string
    );
  } else {
    data = mapDataBasedOnHeaders(
      (await searchEntry(entry as string, entrySearch as string)) as Array<any>,
      entryHeaders,
      entry as string
    );
  }

  ExportToExcel(data, res);
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

export default ID_Entry;
