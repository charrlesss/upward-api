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
import {
  createMSPRPolicy,
  deleteMsprPolicy,
  deletePolicyFromMspr,
  getMSPRRate,
  searchMsprPolicy,
} from "../../../model/Task/Production/mspr-policy";

import {
  getSubAccount,
  getPolicyAccount,
} from "../../../model/Task/Production/policy";
import saveUserLogs from "../../../lib/save_user_logs";
import { saveUserLogsCode } from "../../../lib/saveUserlogsCode";

const MSPRPolicy = express.Router();

MSPRPolicy.get("/get-mspr-policy", (req, res) => {
  try {
    promiseAll([getSubAccount(), getPolicyAccount("MSPR")]).then(
      ([sub_account, policy_account]: any) => {
        res.send({
          message: "Successfully get data",
          success: true,
          msprPolicy: {
            sub_account,
            policy_account,
          },
        });
      }
    );
  } catch (error: any) {
    res.send({ message: error.message, success: false, bondsPolicy: null });
  }
});

MSPRPolicy.post("/add-mspr-policy", async (req, res) => {
  const { sub_account, client_id, PolicyAccount, PolicyNo } = req.body;
  try {
    if (await findPolicy(PolicyNo)) {
      return res.send({
        message: "Unable to save! Policy No. already exists!",
        success: false,
      });
    }
    // get Commision rate
    const rate = ((await getMSPRRate(PolicyAccount, "MSPR")) as Array<any>)[0];

    if (rate == null || rate == undefined) {
      return res.send({
        message: "Please setup commission rate for this account and Line",
        success: false,
      });
    }

    const subAccount = ((await getClientById(client_id)) as Array<any>)[0];
    const strArea =
      subAccount.Acronym === "" ? sub_account : subAccount.Acronym;
    const cStrArea = subAccount.ShortName;
    await insertMSPRPolicy({ ...req.body, cStrArea, strArea });
    await saveUserLogs(req, PolicyNo, "add", "MSPR Policy");
    res.send({ message: "Create MSPR Policy Successfully", success: true });
  } catch (err: any) {
    console.log(err);
    res.send({ message: err.message, success: false });
  }
});

MSPRPolicy.get("/search-mspr-policy", async (req, res) => {
  try {
    res.send({
      message: "Successfully search data",
      success: true,
      msprPolicy: await searchMsprPolicy(req.query.searchMsprPolicy as string),
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, msprPolicy: null });
  }
});

MSPRPolicy.post("/update-mspr-policy", async (req, res) => {
  const { sub_account, client_id, PolicyAccount, PolicyNo, policyType } =
    req.body;
  try {
    if (!(await saveUserLogsCode(req, "update", PolicyNo, "MSPR Policy"))) {
      return res.send({ message: "Invalid User Code", success: false });
    }

    //get Commision rate
    const rate = ((await getMSPRRate(PolicyAccount, "MSPR")) as Array<any>)[0];

    if (rate == null || rate == undefined) {
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
    await deletePolicyFromMspr(PolicyNo);
    // //delete v policy
    await deleteMsprPolicy(PolicyNo);
    // //delete journal
    await deleteJournalBySource(PolicyNo, "PL");
    
    req.body.DateIssued = new Date(req.body.DateIssued).toISOString()

    // insert fire policy
    await insertMSPRPolicy({ ...req.body, cStrArea, strArea });

    res.send({ message: "Update MSPR Policy Successfully", success: true });
  } catch (err: any) {
    console.log(err.message);
    res.send({ message: err.message, success: false });
  }
});

MSPRPolicy.post("/delete-mspr-policy", async (req, res) => {
  const { PolicyNo } = req.body;
  try {
    if (!(await saveUserLogsCode(req, "delete", PolicyNo, "MSPR Policy"))) {
      return res.send({ message: "Invalid User Code", success: false });
    }

    //delete policy
    await deletePolicyFromMspr(PolicyNo);
    // //delete v policy
    await deleteMsprPolicy(PolicyNo);

    await saveUserLogs(req, PolicyNo, "delete", "MSPR Policy");
    res.send({ message: "Delete MSPR Policy Successfully", success: true });
  } catch (err: any) {
    console.log(err.message);
    res.send({ message: err.message, success: false });
  }
});

async function insertMSPRPolicy({
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
  pAddress,
  moneyRoutesFrom,
  moneyRoutesTo,
  safeDesc,
  methodTrans,
  guardsMinNum,
  messengerMaxNum,
  sec1,
  sec2,
  sec3,
  prem1,
  prem2,
  prem3,
  netPremium,
  vat,
  docStamp,
  localGovTax,
  totalDue,
  strArea,
  cStrArea,
}: any) {
  //create  Policy
  await createPolicy({
    IDNo: client_id,
    Account: PolicyAccount,
    SubAcct: sub_account,
    PolicyType: "MSPR",
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

  await createMSPRPolicy({
    PolicyNo,
    Account: PolicyAccount,
    Location: pAddress,
    PeriodFrom: DateFrom,
    PeriodTo: DateTo,
    OriginPoint: moneyRoutesFrom,
    DestinationPoint: moneyRoutesTo,
    Saferoom: safeDesc,
    Method: methodTrans,
    Guard: parseFloat(parseFloat(validateNumber(guardsMinNum)).toFixed(2)),
    Messenger: parseFloat(
      parseFloat(validateNumber(messengerMaxNum)).toFixed(2)
    ),
    SecI: validateNumber(sec1),
    SecIPremium: validateNumber(prem1),
    SecIB: validateNumber(sec2),
    SecIPremiumB: prem2,
    SecII: validateNumber(sec3),
    SecIIPremium: validateNumber(prem3),
  });

  //debit
  await createJournal({
    Branch_Code: sub_account,
    Date_Entry: DateIssued,
    Source_Type: "PL",
    Source_No: PolicyNo,
    Explanation: "MSPR Production",
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
    Source_No_Ref_ID: "MSPR",
  });

  //credit
  await createJournal({
    Branch_Code: sub_account,
    Date_Entry: DateIssued,
    Source_Type: "PL",
    Source_No: PolicyNo,
    Explanation: "MSPR Production",
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
    Source_No_Ref_ID: "MSPR",
  });
}

function validateNumber(input: string) {
  const sanitizedInput = input.replace(/,/g, "");

  if (isNaN(Number(sanitizedInput))) {
    return "0";
  } else {
    return input;
  }
}

export default MSPRPolicy;
