import express, { Request, Response } from "express";
import {
  findPolicy,
  getClientById,
  deleteJournalBySource,
  deletePolicy,
  createPolicy,
  createJournal,
  getRate,
} from "../../../model/Task/Production/vehicle-policy";
import promiseAll from "../../../lib/promise-all";
import {
  createFirePolicy,
  deleteFirePolicy,
  getRateType,
  searchFirePolicy,
} from "../../../model/Task/Production/fire-policy";

import {
  getAgents,
  getClients,
  getPolicyAccount,
  getSubAccount,
  getMortgagee,
} from "../../../model/Task/Production/policy";
import saveUserLogs from "../../../lib/save_user_logs";
import { saveUserLogsCode } from "../../../lib/saveUserlogsCode";

const FirePolicy = express.Router();

FirePolicy.get("/get-fire-policy", async (req: Request, res: Response) => {
  try {
    promiseAll([
      getSubAccount(),
      getPolicyAccount("FIRE"),
      getMortgagee("FIRE"),
      getRateType("Fire"),
    ]).then(([sub_account, policy_account, mortgagee, subline]: any) => {
      res.send({
        message: "Successfully get data",
        success: true,
        firePolicy: {
          sub_account,
          policy_account,
          mortgagee,
          subline,
        },
      });
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, firePolicy: null });
  }
});
FirePolicy.get(
  "/search-agent-fire-policy",
  async (req: Request, res: Response) => {
    try {
      res.send({
        message: "Successfully get data",
        success: true,
        agents: await getAgents(req.query.searchAgent as string),
      });
    } catch (error: any) {
      res.send({ message: error.message, success: false, agents: null });
    }
  }
);
FirePolicy.get(
  "/search-client-fire-policy",
  async (req: Request, res: Response) => {
    try {
      res.send({
        message: "Successfully get data",
        success: true,
        clients: await getClients(req.query.searchClient as string),
      });
    } catch (error: any) {
      res.send({ message: error.message, success: false, clients: null });
    }
  }
);
FirePolicy.get("/search-fire-policy", async (req: Request, res: Response) => {
  try {
    console.log("wqeqw", req.query.searchFirePolicy);
    res.send({
      message: "Successfully search data",
      success: true,
      firePolicy: await searchFirePolicy(req.query.searchFirePolicy as string),
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, vehiclePolicy: null });
  }
});
async function insertFirePolicy({
  sub_account,
  client_id,
  client_name,
  agent_id,
  agent_com,
  PolicyAccount,
  PolicyNo,
  bill_no,
  DateFrom,
  DateTo,
  DateIssued,
  locRisk,
  propertyInsured,
  construction,
  occupancy,
  boundaries,
  mortgage,
  warranties,
  insuredValue,
  percentagePremium,
  totalPremium,
  vat,
  docStamp,
  localGovTax,
  totalDue,
  strArea,
  cStrArea,
}: any) {
  await createPolicy({
    IDNo: client_id,
    Account: PolicyAccount,
    SubAcct: sub_account,
    PolicyType: "FIRE",
    PolicyNo: PolicyNo,
    DateIssued,
    TotalPremium: parseFloat(parseFloat(totalPremium).toFixed(2)),
    Vat: vat,
    DocStamp: docStamp,
    FireTax: "0",
    LGovTax: localGovTax,
    Notarial: "0",
    Misc: "0",
    TotalDue: totalDue,
    TotalPaid: "0",
    Journal: false,
    AgentID: agent_id,
    AgentCom: agent_com,
  });

  await createFirePolicy({
    PolicyNo,
    Account: PolicyAccount,
    BillNo: bill_no,
    DateFrom: DateFrom,
    DateTo: DateTo,
    Location: locRisk,
    PropertyInsured: propertyInsured,
    Constraction: construction,
    Occupancy: occupancy,
    Boundaries: boundaries,
    Mortgage: mortgage,
    Warranties: warranties,
    InsuredValue: insuredValue,
    Percentage: percentagePremium,
  });

  await createJournal({
    Branch_Code: sub_account,
    Date_Entry: DateIssued,
    Source_No: PolicyNo,
    Source_Type: "PL",
    Explanation: "Fire Production",
    GL_Acct: "1.03.01",
    Sub_Acct: strArea,
    ID_No: PolicyNo,
    cGL_Acct: "Premium Receivable",
    cSub_Acct: cStrArea,
    cID_No: client_name,
    Debit: parseFloat(totalDue).toFixed(2),
    Credit: "0",
    TC: "P/R",
    Remarks: "",
    Source_No_Ref_ID: "FIRE",
  });

  await createJournal({
    Branch_Code: sub_account,
    Date_Entry: DateIssued,
    Source_No: PolicyNo,
    Source_Type: "PL",
    Explanation: "Fire Production",
    GL_Acct: "4.02.01",
    Sub_Acct: strArea,
    ID_No: PolicyNo,
    cGL_Acct: "A/P",
    cSub_Acct: cStrArea,
    cID_No: client_name,
    Debit: 0,
    Credit: parseFloat(totalDue).toFixed(2),
    TC: "A/P",
    Remarks: "",
    Source_No_Ref_ID: "FIRE",
  });
}
FirePolicy.post("/add-fire-policy", async (req, res) => {
  const { sub_account, client_id, PolicyAccount, PolicyNo, occupancy } =
    req.body;
  try {
    if (await findPolicy(PolicyNo)) {
      return res.send({
        message: "Unable to save! Policy No. already exists!",
        success: false,
      });
    }
    //get Commision rate
    const rate = (
      (await getRate(PolicyAccount, "Fire", occupancy)) as Array<any>
    )[0];

    if (rate == null) {
      return res.send({
        message: "Please setup commission rate for this account and Line",
        success: false,
      });
    }

    const subAccount = ((await getClientById(client_id)) as Array<any>)[0];
    const strArea =
      subAccount.Acronym === "" ? sub_account : subAccount.Acronym;
    const cStrArea = subAccount.ShortName;
    await insertFirePolicy({ ...req.body, cStrArea, strArea });
    await saveUserLogs(req, PolicyNo, "add", "Fire Policy");
    res.send({ message: "Create Fire Policy Successfully", success: true });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});
FirePolicy.post("/update-fire-policy", async (req, res) => {
  const { sub_account, client_id, PolicyAccount, PolicyNo, occupancy } =
    req.body;
  try {
    if (!(await saveUserLogsCode(req, "edit", PolicyNo, "Fire Policy"))) {
      return res.send({ message: "Invalid User Code", success: false });
    }

    //get Commision rate
    const rate = (
      (await getRate(PolicyAccount, "Fire", occupancy)) as Array<any>
    )[0];

    if (rate == null) {
      return res.send({
        message: "Please setup commission rate for this account and Line",
        success: false,
      });
    }

    const subAccount = ((await getClientById(client_id)) as Array<any>)[0];
    const strArea =
      subAccount.Acronym === "" ? sub_account : subAccount.Acronym;
    const cStrArea = subAccount.ShortName;

    //delete policy
    await deletePolicy(PolicyAccount, "FIRE", PolicyNo);
    //delete v policy
    await deleteFirePolicy(PolicyAccount, PolicyNo);
    //delete journal
    await deleteJournalBySource(PolicyNo, "PL");

    // insert fire policy
    await insertFirePolicy({ ...req.body, cStrArea, strArea });
    res.send({ message: "Update Fire Policy Successfully", success: true });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

FirePolicy.post("/delete-fire-policy", async (req, res) => {
  const { PolicyAccount, form_type, PolicyNo } = req.body;
  try {
    if (!(await saveUserLogsCode(req, "delete", PolicyNo, "Fire Policy"))) {
      return res.send({ message: "Invalid User Code", success: false });
    }

    //delete policy
    await deletePolicy(PolicyAccount, "FIRE", PolicyNo);
    // //delete v policy
    await deleteFirePolicy(PolicyAccount, PolicyNo);
    res.send({
      message: "Delete Fire Policy Successfully",
      success: true,
    });
  } catch (err: any) {
    res.send({
      message: err.message,
      success: false,
    });
  }
});

export default FirePolicy;
