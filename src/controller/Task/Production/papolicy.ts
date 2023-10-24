import express from "express";
import promiseAll from "../../../lib/promise-all";
import {
  createJournal,
  createPolicy,
  deleteJournalBySource,
  deletePolicy,
  findPolicy,
  getClientById,
  getPolicyAccount,
  getSubAccount,
} from "../../../model/Task/Production/vehicle-policy";
import { getMSPRRate } from "../../../model/Task/Production/mspr-policy";
import {
  createPAPolicy,
  searchPAPolicy,
  deletePAPolicy,
} from "../../../model/Task/Production/pa-ppolicy";

const PAPolicy = express.Router();

PAPolicy.get("/get-pa-policy", (req, res) => {
  try {
    promiseAll([getSubAccount(), getPolicyAccount("PA")]).then(
      ([sub_account, policy_account]: any) => {
        res.send({
          message: "Successfully get data",
          success: true,
          paPolicy: {
            sub_account,
            policy_account,
          },
        });
      }
    );
  } catch (error: any) {
    res.send({ message: error.message, success: false, paPolicy: null });
  }
});

PAPolicy.post("/add-pa-policy", async (req, res) => {
  const { sub_account, client_id, PolicyAccount, PolicyNo } = req.body;
  console.log(req.body);
  try {
    if (await findPolicy(PolicyNo)) {
      return res.send({
        message: "Unable to save! Policy No. already exists!",
        success: false,
      });
    }
    // get Commision rate
    const rate = ((await getMSPRRate(PolicyAccount, "PA")) as Array<any>)[0];

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
    await insertPaPolicy({ ...req.body, cStrArea, strArea });
    res.send({ message: "Create PA Policy Successfully", success: true });
  } catch (err: any) {
    console.log(err);
    res.send({ message: err.message, success: false });
  }
});

PAPolicy.get("/search-pa-policy", async (req, res) => {
  try {
    res.send({
      message: "Successfully search data",
      success: true,
      paPolicy: await searchPAPolicy(req.query.searchPaPolicy as string),
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, paPolicy: null });
  }
});

PAPolicy.post("/update-pa-policy", async (req, res) => {
  const { sub_account, client_id, PolicyAccount, PolicyNo } =
    req.body;
  try {
    //get Commision rate
    const rate = ((await getMSPRRate(PolicyAccount, "MSPR")) as Array<any>)[0];

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
    await deletePolicy(PolicyAccount, "PA", PolicyNo);
    // //delete PA policy
    await deletePAPolicy(PolicyAccount, PolicyNo);
    // //delete journal
    await deleteJournalBySource(PolicyNo, "PL");

    // insert fire policy
    await insertPaPolicy({ ...req.body, cStrArea, strArea });
    res.send({ message: "Update PA Policy Successfully", success: true });
  } catch (err: any) {
    console.log(err.message);
    res.send({ message: err.message, success: false });
  }
});

PAPolicy.post("/delete-pa-policy", async (req, res) => {
  const { PolicyAccount, PolicyNo } = req.body;
  try {
    //delete policy
    await deletePolicy(PolicyAccount, "PA", PolicyNo);
    //delete pa policy
    await deletePAPolicy(PolicyAccount, PolicyNo);

    res.send({ message: "Delete PA Policy Successfully", success: true });
  } catch (err: any) {
    console.log(err.message);
    res.send({ message: err.message, success: false });
  }
});

async function insertPaPolicy({
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
  propertyInsured,
  netPremium,
  vat,
  docStamp,
  localGovTax,
  totalDue,
  strArea,
  cStrArea,
}: any) {
  //   create  Policy
  await createPolicy({
    IDNo: client_id,
    Account: PolicyAccount,
    SubAcct: sub_account,
    PolicyType: "PA",
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




  // create PA Policy
  await createPAPolicy({
    PolicyNo,
    Account: PolicyAccount,
    Location: propertyInsured,
    PeriodFrom: DateFrom,
    PeriodTo: DateTo,
  });

  //debit
  await createJournal({
    Branch_Code: sub_account,
    Date_Entry: DateIssued,
    Source_Type: "PL",
    Source_No: PolicyNo,
    Explanation: "PA Production",
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
    Source_No_Ref_ID: "PA",
  });

  //credit
  await createJournal({
    Branch_Code: sub_account,
    Date_Entry: DateIssued,
    Source_Type: "PL",
    Source_No: PolicyNo,
    Explanation: "PA Production",
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
    Source_No_Ref_ID: "PA",
  });
}

export default PAPolicy;
