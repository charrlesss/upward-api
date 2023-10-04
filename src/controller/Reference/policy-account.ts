import express, { Request, Response } from "express";
import {
  checkedAccountIsExisting,
  createPolicyAccount,
  deletePolicyAccount,
  searchPolicy,
  updatePolicyAccount,
} from "../../model/Reference/policy-account.model";

const PolicyAccount = express.Router();

PolicyAccount.post(
  "/add-policy-account",
  async (req: Request, res: Response) => {
    if (await checkedAccountIsExisting(req.body.Account as string)) {
      return res.send({
        message: "This account is already exist",
        success: false,
      });
    }
    await createPolicyAccount(req.body);
    res.send({ message: "Create Policy Account Successfuly", success: true });
  }
);
PolicyAccount.post(
  "/update-policy-account",
  async (req: Request, res: Response) => {
    const findAccount = await checkedAccountIsExisting(
      req.body.Account as string
    );
    if (findAccount == null) {
      return res.send({
        message: "Update Failed Account not Found!",
        success: false,
      });
    }

    updateValues(req.body);
    await updatePolicyAccount(req.body, findAccount.Account);
    res.send({ message: "Update Policy Account Successfuly", success: true });
  }
);
PolicyAccount.post(
  "/delete-policy-account",
  async (req: Request, res: Response) => {
    await deletePolicyAccount(req.body.Account as string);
    res.send({ message: "Delete Policy Account Successfuly", success: true });
  }
);
PolicyAccount.get(
  "/get-policy-account",
  async (req: Request, res: Response) => {
    const { policySearch } = req.query;
    const policy = await searchPolicy(policySearch as string);
    res.send({
      message: "Get Policy Account Successfuly",
      success: true,
      policy,
    });
  }
);

PolicyAccount.get(
  "/search-policy-account",
  async (req: Request, res: Response) => {
    const { policySearch } = req.query;
    const policy = await searchPolicy(policySearch as string);
    res.send({
      message: "Search Policy Account Successfuly",
      success: true,
      policy,
    });
  }
);
function updateValues(obj: any) {
  const valueMappings: any = {
    1: true,
    0: false,
  };
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      updateValues(obj[key]);
    } else if (valueMappings.hasOwnProperty(obj[key])) {
      obj[key] = valueMappings[obj[key]];
    }
  }
}
export default PolicyAccount;
