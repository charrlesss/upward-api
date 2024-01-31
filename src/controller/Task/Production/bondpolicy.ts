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
  createBondsPolicy,
  deleteBondsPolicy,
  getBondRate,
  searchBondsPolicy,
} from "../../../model/Task/Production/bond-policy";
import {
  getSubAccount,
  getPolicyAccount,
  getPolicyType,
} from "../../../model/Task/Production/policy";

const BondPolicy = express.Router();

BondPolicy.get("/get-bonds-policy", (req, res) => {
  try {
    promiseAll([
      getSubAccount(),
      getPolicyAccount("G02"),
      getPolicyAccount("G13"),
      getPolicyAccount("G16"),
      getPolicyType("Bonds"),
    ]).then(([sub_account, g1, g13, g16, policy_type]: any) => {
      res.send({
        message: "Successfully get data",
        success: true,
        bondsPolicy: {
          sub_account,
          policy_account: {
            G02: g1,
            G13: g13,
            G16: g16,
          },
          policy_type,
        },
      });
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, bondsPolicy: null });
  }
});

BondPolicy.post("/add-bonds-policy", async (req, res) => {
  const { sub_account, client_id, PolicyAccount, PolicyNo, policyType } =
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
      (await getBondRate(PolicyAccount, policyType)) as Array<any>
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
    await insertBondsPolicy({ ...req.body, cStrArea, strArea });
    res.send({ message: "Create Bonds Policy Successfully", success: true });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

BondPolicy.get("/search-bonds-policy", async (req, res) => {
  try {
    res.send({
      message: "Successfully search data",
      success: true,
      bondsPolicy: await searchBondsPolicy(
        req.query.searchBondsPolicy as string
      ),
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, bondsPolicy: null });
  }
});

BondPolicy.post("/update-bonds-policy", async (req, res) => {
  const { sub_account, client_id, PolicyAccount, PolicyNo, policyType } =
    req.body;
  try {
    //get Commision rate
    const rate = (
      (await getBondRate(PolicyAccount, policyType)) as Array<any>
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
    await deletePolicy(PolicyAccount, policyType, PolicyNo);
    // //delete v policy
    await deleteBondsPolicy(PolicyAccount, policyType, PolicyNo);
    // //delete journal
    await deleteJournalBySource(PolicyNo, "PL");

    // insert fire policy
    await insertBondsPolicy({ ...req.body, cStrArea, strArea });
    res.send({ message: "Update Bonds Policy Successfully", success: true });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

BondPolicy.post("/delete-bonds-policy", async (req, res) => {
  const { PolicyAccount, PolicyNo, policyType } = req.body;
  try {
    //delete policy
    await deletePolicy(PolicyAccount, policyType, PolicyNo);
    //delete v policy
    await deleteBondsPolicy(PolicyAccount, policyType, PolicyNo);

    res.send({ message: "Delete Bonds Policy Successfully", success: true });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

async function insertBondsPolicy({
  sub_account,
  client_id,
  client_name,
  agent_id,
  agent_com,
  PolicyAccount,
  PolicyNo,
  policyType,
  biddingDate,
  time,
  DateIssued,
  validity,
  officer,
  position,
  unit,
  obligee,
  officerName,
  officerTaxCertNo,
  officerIssuedLoc,
  officerDateIssued,
  insuranceCapacity,
  insuranceOfficerTaxCert,
  insuranceIssuedLoc,
  insuranceDateIssued,
  insuredValue,
  percentagePremium,
  totalPremium,
  vat,
  docStamp,
  localGovTax,
  umis,
  principal,
  totalDue,
  strArea,
  cStrArea,
}: any) {
  //create  Policy

  await createPolicy({
    IDNo: client_id,
    Account: PolicyAccount,
    SubAcct: sub_account,
    PolicyType: policyType,
    PolicyNo: PolicyNo,
    DateIssued,
    TotalPremium: parseFloat(parseFloat(totalPremium).toFixed(2)),
    Vat: vat,
    DocStamp: docStamp,
    FireTax: "0",
    LGovTax: localGovTax,
    Notarial: umis,
    Misc: principal,
    TotalDue: totalDue,
    TotalPaid: "0",
    Journal: false,
    AgentID: agent_id,
    AgentCom: agent_com,
  });
  //create bond Policy
  await createBondsPolicy({
    PolicyNo: PolicyNo,
    Account: PolicyAccount,
    PolicyType: policyType,
    UnitDetail: unit,
    Obligee: obligee,
    BidDate: biddingDate,
    BidTime: time,
    NotaryName: officerName,
    TaxCerNo: officerTaxCertNo,
    IssuedLocation: officerIssuedLoc,
    NIssued: officerDateIssued,
    CapacityAs: insuranceCapacity,
    TaxCerNoCorp: insuranceOfficerTaxCert,
    IssuedLoctCorp: insuranceIssuedLoc,
    CIssued: insuranceDateIssued,
    BondValue: insuredValue,
    Percentage: percentagePremium,
    Officer: officer,
    OPosition: position,
    Validity: validity,
  });
  //debit
  await createJournal({
    Branch_Code: sub_account,
    Date_Entry: DateIssued,
    Source_Type: "PL",
    Source_No: PolicyNo,
    Explanation: "Bonds Production",
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
    Source_No_Ref_ID: "Bonds",
  });
  //credit
  await createJournal({
    Branch_Code: sub_account,
    Date_Entry: DateIssued,
    Source_Type: "PL",
    Source_No: PolicyNo,
    Explanation: "Bonds Production",
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
    Source_No_Ref_ID: "Bonds",
  });
}

export default BondPolicy;
