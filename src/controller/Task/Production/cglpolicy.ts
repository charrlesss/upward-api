import express from "express";
import promiseAll from "../../../lib/promise-all";
import {
  createJournal,
  createPolicy,
  deleteJournalBySource,
  deletePolicy,
  findPolicy,
  getClientById,
} from "../../../model/Task/Production/vehicle-policy";
import { getMSPRRate } from "../../../model/Task/Production/mspr-policy";
import {
  createCGLPolicy,
  deleteCGLPolicy,
  searchCGLPolicy,
} from "../../../model/Task/Production/cgl-policy";
import {
  getSubAccount,
  getPolicyAccount,
} from "../../../model/Task/Production/policy";
import saveUserLogs from "../../../lib/save_user_logs";

const CGLPolicy = express.Router();

CGLPolicy.get("/get-cgl-policy", (req, res) => {
  try {
    promiseAll([getSubAccount(), getPolicyAccount("CGL")]).then(
      ([sub_account, policy_account]: any) => {
        res.send({
          message: "Successfully get data",
          success: true,
          cglPolicy: {
            sub_account,
            policy_account,
          },
        });
      }
    );
  } catch (error: any) {
    res.send({ message: error.message, success: false, cglPolicy: null });
  }
});

CGLPolicy.post("/add-cgl-policy", async (req, res) => {
  const { sub_account, client_id, PolicyAccount, PolicyNo } = req.body;
  try {
    if (await findPolicy(PolicyNo)) {
      return res.send({
        message: "Unable to save! Policy No. already exists!",
        success: false,
      });
    }

    // get Commision rate
    const rate = ((await getMSPRRate(PolicyAccount, "CGL")) as Array<any>)[0];

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
    await insertCGLPolicy({ ...req.body, cStrArea, strArea });
    await saveUserLogs(req, PolicyNo, "add", "CGL Policy");
    res.send({ message: "Create CGL Policy Successfully", success: true });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

CGLPolicy.get("/search-cgl-policy", async (req, res) => {
  try {
    res.send({
      message: "Successfully search data",
      success: true,
      cglPolicy: await searchCGLPolicy(req.query.searchCglPolicy as string),
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, cglPolicy: null });
  }
});

CGLPolicy.post("/update-cgl-policy", async (req, res) => {
  const { sub_account, client_id, PolicyAccount, PolicyNo } = req.body;
  try {
    //get Commision rate
    const rate = ((await getMSPRRate(PolicyAccount, "CGL")) as Array<any>)[0];

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
    await deletePolicy(PolicyAccount, "CGL", PolicyNo);
    // //delete CGL policy
    await deleteCGLPolicy(PolicyAccount, PolicyNo);
    // //delete journal
    await deleteJournalBySource(PolicyNo, "PL");

    // insert CGL policy
    await insertCGLPolicy({ ...req.body, cStrArea, strArea });

    await saveUserLogs(req, PolicyNo, "update", "CGL Policy");
    res.send({ message: "Update CGL Policy Successfully", success: true });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

CGLPolicy.post("/delete-cgl-policy", async (req, res) => {
  const { PolicyAccount, PolicyNo } = req.body;
  try {
    //delete policy
    await deletePolicy(PolicyAccount, "CGL", PolicyNo);
    //delete CGL policy
    await deleteCGLPolicy(PolicyAccount, PolicyNo);
    await saveUserLogs(req, PolicyNo, "delete", "CGL Policy");
    res.send({ message: "Delete CGL Policy Successfully", success: true });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

async function insertCGLPolicy({
  sub_account,
  client_id,
  client_name,
  agent_id,
  agent_com,
  PolicyAccount,
  PolicyNo,
  DateFrom,
  DateTo,
  DateIssued,
  blPremium,
  pdPremium,
  netPremium,
  vat,
  docStamp,
  localGovTax,
  totalDue,
  premisisOperation,
  strArea,
  cStrArea,
}: any) {
  //   create  Policy
  await createPolicy({
    IDNo: client_id,
    Account: PolicyAccount,
    SubAcct: sub_account,
    PolicyType: "CGL",
    PolicyNo: PolicyNo,
    DateIssued,
    TotalPremium: parseFloat(parseFloat(netPremium).toFixed(2)),
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

  // create CGL Policy
  await createCGLPolicy({
    PolicyNo,
    Account: PolicyAccount,
    Location: premisisOperation,
    PeriodFrom: DateFrom,
    PeriodTo: DateTo,
    LimitA: blPremium,
    LimitB: pdPremium,
  });

  //debit
  await createJournal({
    Branch_Code: sub_account,
    Date_Entry: DateIssued,
    Source_Type: "PL",
    Source_No: PolicyNo,
    Explanation: "CGL Production",
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
    Source_No_Ref_ID: "CGL",
  });

  //credit
  await createJournal({
    Branch_Code: sub_account,
    Date_Entry: DateIssued,
    Source_Type: "PL",
    Source_No: PolicyNo,
    Explanation: "CGL Production",
    GL_Acct: "4.02.01",
    Sub_Acct: strArea,
    ID_No: PolicyNo,
    cGL_Acct: "A/P",
    cSub_Acct: cStrArea,
    cID_No: client_name,
    Debit: "0",
    Credit: parseFloat(totalDue).toFixed(2),
    TC: "A/P",
    Remarks: "",
    Source_No_Ref_ID: "CGL",
  });
}

export default CGLPolicy;
