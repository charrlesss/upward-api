import express, { Request, Response } from "express";
import { mapDataBasedOnHeaders } from "../../lib/mapbaseonheader";
import { ExportToExcel } from "../../lib/exporttoexcel";
import {
  createSubAccount,
  searchSubAccount,
  updateSubAccount,
  deleteSubAccount,
} from "../../model/Reference/sub-account.model";

const SubAccount = express.Router();

SubAccount.post("/add-sub-account", async (req: Request, res: Response) => {
  try {
    req.body.createdAt = new Date();
    await createSubAccount(req.body);
    res.send({ message: "Create Sub Account Successfully!", success: true });
  } catch (err: any) {
    console.log(err.message);
    res.send({ message: err.message, success: false });
  }
});

SubAccount.get("/get-sub-account", async (req: Request, res: Response) => {
  const { subaccountSearch } = req.query;

  try {
    const subaccount = await searchSubAccount(subaccountSearch as string);
    res.send({
      message: "Get Sub Account Successfully!",
      success: true,
      subaccount,
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

SubAccount.get("/search-sub-account", async (req: Request, res: Response) => {
  const { subaccountSearch } = req.query;
  try {
    const subaccount = await searchSubAccount(subaccountSearch as string);
    res.send({
      message: "Search Sub Account Successfully!",
      success: true,
      subaccount,
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

SubAccount.post("/update-sub-account", async (req: Request, res: Response) => {
  const { Sub_Acct, ...rest } = req.body;
  try {
    delete rest.createdAt;
    await updateSubAccount({...rest,update:new Date()}, Sub_Acct);
    res.send({
      message: "Update Sub Account Successfully!",
      success: true,
    });
  } catch (err: any) {
    console.log(err.message)
    res.send({ message: err.message, success: false });
  }
});
SubAccount.post("/delete-sub-account", async (req: Request, res: Response) => {
  try {
    await deleteSubAccount(req.body.Sub_Acct);
    res.send({
      message: "Delete Sub Account Successfully!",
      success: true,
    });
  } catch (err: any) {
    console.log(err.message)

    res.send({ message: err.message, success: false });
  }
});

SubAccount.get("/export-sub-account", async (req, res) => {
  const subAccountHeaders: any = {
    SubAccount: {
      header: [
        "Sub Account ID",
        "Acronym",
        "Short Name",
        "Description",
        "Created At",
      ],
      row: ["Sub_Acct", "Acronym", "ShortName", "Description", "createdAt"],
    },
  };
  const { policySearch, isAll } = req.query;

  let data = [];
  if (JSON.parse(isAll as string)) {
    data = mapDataBasedOnHeaders(
      (await searchSubAccount("", true)) as Array<any>,
      subAccountHeaders,
      "SubAccount"
    );
  } else {
    data = mapDataBasedOnHeaders(
      (await searchSubAccount(policySearch as string)) as Array<any>,
      subAccountHeaders,
      "SubAccount"
    );
  }

  ExportToExcel(data, res);
});
export default SubAccount;
