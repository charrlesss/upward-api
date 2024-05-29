import express, { Request, Response } from "express";
import { mapDataBasedOnHeaders } from "../../lib/mapbaseonheader";
import { ExportToExcel } from "../../lib/exporttoexcel";
import {
  createSubAccount,
  searchSubAccount,
  updateSubAccount,
  deleteSubAccount,
} from "../../model/Reference/sub-account.model";
import { saveUserLogsCode } from "../../lib/saveUserlogsCode";
import saveUserLogs from "../../lib/save_user_logs";
import generateUniqueUUID from "../../lib/generateUniqueUUID";
import { VerifyToken } from "../Authentication";

const SubAccount = express.Router();

SubAccount.post("/add-sub-account", async (req: Request, res: Response) => {
  const { userAccess }: any = await VerifyToken(
    req.cookies["up-ac-login"] as string,
    process.env.USER_ACCESS as string
  );
  if (userAccess.includes("ADMIN")) {
    return res.send({
      message: `CAN'T SAVE, ADMIN IS FOR VIEWING ONLY!`,
      success: false,
    });
  }
  
  try {
    delete req.body.Sub_Acct;
    delete req.body.mode;
    delete req.body.search;
    delete req.body.userCodeConfirmation;
    req.body.createdAt = new Date();
    const Sub_Acct = await generateUniqueUUID("sub_account", "Sub_Acct");
    await createSubAccount({ Sub_Acct, ...req.body });
    await saveUserLogs(req, Sub_Acct, "add", "Sub Account");
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
  const { userAccess }: any = await VerifyToken(
    req.cookies["up-ac-login"] as string,
    process.env.USER_ACCESS as string
  );
  if (userAccess.includes("ADMIN")) {
    return res.send({
      message: `CAN'T UPDATE, ADMIN IS FOR VIEWING ONLY!`,
      success: false,
    });
  }
  try {
    if (
      !(await saveUserLogsCode(req, "edit", req.body.Sub_Acct, "Sub Account"))
    ) {
      return res.send({ message: "Invalid User Code", success: false });
    }

    delete req.body.mode;
    delete req.body.search;
    delete req.body.userCodeConfirmation;
    const { Sub_Acct, ...rest } = req.body;

    delete rest.createdAt;
    await updateSubAccount({ ...rest, update: new Date() }, Sub_Acct);
    res.send({
      message: "Update Sub Account Successfully!",
      success: true,
    });
  } catch (err: any) {
    console.log(err.message);
    res.send({ message: err.message, success: false });
  }
});
SubAccount.post("/delete-sub-account", async (req: Request, res: Response) => {
  const { userAccess }: any = await VerifyToken(
    req.cookies["up-ac-login"] as string,
    process.env.USER_ACCESS as string
  );
  if (userAccess.includes("ADMIN")) {
    return res.send({
      message: `CAN'T DELETE, ADMIN IS FOR VIEWING ONLY!`,
      success: false,
    });
  }
  try {
    if (
      !(await saveUserLogsCode(req, "delete", req.body.Sub_Acct, "Sub Account"))
    ) {
      return res.send({ message: "Invalid User Code", success: false });
    }

    await deleteSubAccount(req.body.Sub_Acct);
    res.send({
      message: "Delete Sub Account Successfully!",
      success: true,
    });
  } catch (err: any) {
    console.log(err.message);

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
