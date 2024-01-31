import express, { Request, Response } from "express";
import {
  findPolicy,
  getClientById,
  createPolicy,
  createJournal,
  deletePolicy,
  deleteJournalBySource,
} from "../../../model/Task/Production/vehicle-policy";
import promiseAll from "../../../lib/promise-all";
import {
  createMarinePolicy,
  createWords,
  deleteWords,
  getMarineRate,
  searchMarinePolicy,
  getWords,
  deleteMarinePolicy,
} from "../../../model/Task/Production/marine-policy";

import {
  getSubAccount,
  getPolicyAccount,
} from "../../../model/Task/Production/policy";

const MarinePolicy = express.Router();

MarinePolicy.get("/get-marine-policy", (req, res) => {
  try {
    promiseAll([getSubAccount(), getPolicyAccount("MAR"), getWords()]).then(
      ([sub_account, policy_account, words]: any) => {
        res.send({
          message: "Successfully get data",
          success: true,
          marinePolicy: {
            sub_account,
            policy_account,
            words,
          },
        });
      }
    );
  } catch (error: any) {
    res.send({ message: error.message, success: false, marinePolicy: null });
  }
});

MarinePolicy.post("/add-marine-policy", async (req, res) => {
  const { sub_account, client_id, PolicyAccount, PolicyNo } = req.body;
  try {
    if (await findPolicy(PolicyNo)) {
      return res.send({
        message: "Unable to save! Policy No. already exists!",
        success: false,
      });
    }
    //get Commision rate
    const rate = (
      (await getMarineRate(PolicyAccount, "Marine")) as Array<any>
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
    await insertMarinePolicy({ ...req.body, cStrArea, strArea });
    res.send({ message: "Create Marine Policy Successfully", success: true });
  } catch (err: any) {
    console.log(err);
    res.send({ message: err.message, success: false });
  }
});

MarinePolicy.get(
  "/search-marine-policy",
  async (req: Request, res: Response) => {
    try {
      res.send({
        message: "Successfully search data",
        success: true,
        marinePolicy: await searchMarinePolicy(
          req.query.searchMarinePolicy as string
        ),
      });
    } catch (error: any) {
      res.send({ message: error.message, success: false, vehiclePolicy: null });
    }
  }
);

MarinePolicy.post("/update-marine-policy", async (req, res) => {
  const { sub_account, client_id, PolicyAccount, PolicyNo } = req.body;
  try {
    //get Commision rate
    const rate = (
      (await getMarineRate(PolicyAccount, "Marine")) as Array<any>
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
    await deletePolicy(PolicyAccount, "MAR", PolicyNo);
    //delete m policy
    await deleteMarinePolicy(PolicyAccount, PolicyNo);
    //delete journal
    await deleteJournalBySource(PolicyNo, "PL");

    // insert fire policy
    await insertMarinePolicy({ ...req.body, cStrArea, strArea });
    res.send({ message: "Update Marine Policy Successfully", success: true });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

MarinePolicy.post("/delete-marine-policy", async (req, res) => {
  const { PolicyAccount, PolicyNo } = req.body;
  try {
    //delete policy
    await deletePolicy(PolicyAccount, "MAR", PolicyNo);
    // //delete m policy
    await deleteMarinePolicy(PolicyAccount, PolicyNo);
    res.send({
      message: "Delete Marine Policy Successfully",
      success: true,
    });
  } catch (err: any) {
    res.send({
      message: err.message,
      success: false,
    });
  }
});

async function insertMarinePolicy({
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
  insuredValue,
  percentagePremium,
  totalPremium,
  vat,
  docStamp,
  localGovTax,
  totalDue,
  location,
  consignee,
  smi,
  vessel,
  add_info,
  point_orig,
  point_dis,
  prem_text_one,
  prem_text_two,
  strArea,
  cStrArea,
}: any) {
  await createPolicy({
    IDNo: client_id,
    Account: PolicyAccount,
    SubAcct: sub_account,
    PolicyType: "MAR",
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

  await createMarinePolicy({
    PolicyNo,
    Account: PolicyAccount,
    Location: location,
    DateFrom: DateFrom,
    DateTo: DateTo,
    PointOfOrigin: point_orig,
    PointofDestination: point_dis,
    Vessel: vessel,
    AdditionalInfo: add_info,
    SubjectInsured: smi,
    Consignee: consignee,
    InsuredValue: insuredValue,
    Percentage: percentagePremium,
  });
  await deleteWords();
  for (let i = 0; i <= 1; i++) {
    const wording = "MPolicy";
    const sType = i === 0 ? false : true;
    const phrase = i === 0 ? prem_text_one : prem_text_two;
    await createWords({
      Wordings: wording,
      SType: sType,
      Phrase: phrase,
    });
  }
  //debit
  await createJournal({
    Branch_Code: sub_account,
    Date_Entry: DateIssued,
    Source_Type: "PL",
    Source_No: PolicyNo,
    Explanation: "Marine Production",
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
    Source_No_Ref_ID: "MAR",
  });
  //credit
  await createJournal({
    Branch_Code: sub_account,
    Date_Entry: DateIssued,
    Source_Type: "PL",
    Source_No: PolicyNo,
    Explanation: "Marine Production",
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
    Source_No_Ref_ID: "MAR",
  });
}
export default MarinePolicy;
