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
  // getAllClientEntry,
  // getAllEmployeeEntry,
  // getAllAgentEntry,
  // getAllFixedAssetsEntry,
  // getAllSupplierEntry,
  // getAllOtherEntry,
} from "../../model/Reference/IDEntry";
import { IDGenerator, UpdateId } from "../../model/StoredProcedure";

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
    await updateEntry(req.query.entry as string,req.body)
    res.send({message:"Update Successfully",success:true})
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

ID_Entry.post('/entry-delete',async (req,res)=>{
  try {
    await deleteEntry(req.query.entry as string,req.body.id)
    res.send({
      success: true,
      message: "Successfully Delete",
    });
  } catch (err: any) {
    res.send({ success: false, message: err.message });
  }
})

export default ID_Entry;
