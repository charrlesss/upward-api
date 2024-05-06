  import express, { Request, Response } from "express";
import {
  getTPL_IDS,
  findPolicy,
  getRate,
  getClientById,
  deleteJournalBySource,
  deleteVehiclePolicy,
  deletePolicy,
  createPolicy,
  createVehiclePolicy,
  createJournal,
  createJournalInVP,
  updateJournalByPolicy,
  getTempPolicyID,
  searchDataVPolicy,
} from "../../../model/Task/Production/vehicle-policy";
import promiseAll from "../../../lib/promise-all";

import { getAgents, getClients } from "../../../model/Task/Production/policy";
import saveUserLogs from "../../../lib/save_user_logs";
import { saveUserLogsCode } from "../../../lib/saveUserlogsCode";

const VehiclePolicy = express.Router();

VehiclePolicy.get(
  "/get-vehicle-policy-temp-id",
  async (req: Request, res: Response) => {
    try {
      res.send({
        message: "Successfully get data",
        success: true,
        tempId: await getTempPolicyID(),
      });
    } catch (error: any) {
      res.send({ message: error.message, success: false, tempId: [] });
    }
  }
);

VehiclePolicy.get(
  "/search-client-vehicle-policy",
  async (req: Request, res: Response) => {
    try {
      res.send({
        message: "Successfully search data",
        success: true,
        vehiclePolicy: {
          clients: await getClients(req.query.clientSearch as string, true),
        },
      });
    } catch (error: any) {
      res.send({ message: error.message, success: false, vehiclePolicy: null });
    }
  }
);

VehiclePolicy.get(
  "/search-agent-vehicle-policy",
  async (req: Request, res: Response) => {
    try {
      res.send({
        message: "Successfully search data",
        success: true,
        vehiclePolicy: {
          agents: await getAgents(req.query.agentSearch as string, true),
        },
      });
    } catch (error: any) {
      res.send({ message: error.message, success: false, vehiclePolicy: null });
    }
  }
);

VehiclePolicy.get(
  "/tpl-ids-vehicle-policy",
  async (req: Request, res: Response) => {
    try {
      res.send({
        message: "Successfully search data",
        success: true,
        tpl_ids: await getTPL_IDS(req.query.tplIDSearch as string),
      });
    } catch (error: any) {
      res.send({ message: error.message, success: false, tpl_ids: [] });
    }
  }
);

async function insertNewVPolicy({
  form_action,
  form_type,
  sub_account,
  client_id,
  client_name,
  client_address,
  agent_id,
  agent_name,
  agent_com,
  PolicyAccount,
  PolicyNo,
  CCN,
  ORN,
  DateFrom,
  DateTo,
  DateIssued,
  Model,
  Make,
  TB,
  Color,
  BLTFileNo,
  PlateNo,
  ChassisNo,
  MotorNo,
  AuthorizedCapacity,
  UnladenWeigth,
  TplType,
  PremiumPaid,
  EVSV,
  Aircon,
  Stereo,
  Magwheels,
  OthersRate,
  OthersDesc,
  CompreType,
  Deductible,
  Towing,
  ARL,
  BodyInjury,
  PropertyDamage,
  PersinalAccident,
  Denomination,
  Mortgagee,
  MortgageeForm,
  SectionI_II,
  SectionIII,
  OwnDamage,
  Theft,
  SectionIVA,
  SectionIVB,
  PremiumOther,
  AOG,
  AOGPercent,
  TotalPremium,
  Vat,
  DocStamp,
  LocalGovTax,
  StradCom,
  TotalDue,
  Type,
  LocalGovTaxPercent,
  rateCost,
  Source_No_Ref_ID,
  strArea,
  cStrArea,
  remarks,
}: any) {
  await createPolicy({
    IDNo: client_id,
    Account: PolicyAccount,
    SubAcct: sub_account,
    PolicyType: form_type,
    PolicyNo: PolicyNo,
    DateIssued,
    TotalPremium: parseFloat(parseFloat(TotalPremium).toFixed(2)),
    Vat,
    DocStamp,
    FireTax: "0",
    LGovTax: LocalGovTax,
    Notarial: "0",
    Misc: StradCom,
    TotalDue,
    TotalPaid: "0",
    Journal: false,
    AgentID: agent_id,
    AgentCom: agent_com,
  });
  // insert vehicle policy
  await createVehiclePolicy({
    PolicyNo,
    Account: PolicyAccount,
    PolicyType: form_type,
    CoverNo: CCN,
    ORNo: ORN,
    DateFrom,
    DateTo,
    Model,
    Make,
    BodyType: TB,
    Color,
    BLTFileNo,
    PlateNo,
    ChassisNo,
    MotorNo,
    AuthorizedCap: AuthorizedCapacity,
    UnladenWeight: UnladenWeigth,
    TPL: "",
    TPLLimit: "0.00",
    PremiumPaid: parseFloat(PremiumPaid).toFixed(2),
    EstimatedValue: parseFloat(EVSV).toFixed(2),
    Aircon: parseFloat(Aircon).toFixed(2),
    Stereo: parseFloat(Stereo).toFixed(2),
    Magwheels: parseFloat(Magwheels).toFixed(2),
    Others: OthersDesc,
    OthersAmount: parseFloat(OthersRate).toFixed(2),
    Deductible: parseFloat(Deductible).toFixed(2),
    Towing: parseFloat(Towing).toFixed(2),
    RepairLimit: parseFloat(ARL).toFixed(2),
    BodilyInjury: parseFloat(BodyInjury.replace(/,/g, "")).toFixed(2),
    PropertyDamage: parseFloat(PropertyDamage.replace(/,/g, "")).toFixed(2),
    PersonalAccident: parseFloat(PersinalAccident.replace(/,/g, "")).toFixed(2),
    SecI: parseFloat(SectionI_II).toFixed(2),
    SecIIPercent: parseFloat(SectionIII).toFixed(2),
    ODamage: parseFloat(OwnDamage).toFixed(2),
    Theft: parseFloat(Theft).toFixed(2),
    Sec4A: parseFloat(SectionIVA).toFixed(2),
    Sec4B: parseFloat(SectionIVB).toFixed(2),
    Sec4C: parseFloat(PremiumOther).toFixed(2),
    AOG: parseFloat(AOG).toFixed(2),
    MortgageeForm: JSON.parse(MortgageeForm),
    Mortgagee: Mortgagee,
    Denomination,
    AOGPercent: parseFloat(AOGPercent).toFixed(2),
    LocalGovTaxPercent: parseFloat(LocalGovTaxPercent).toFixed(2),
    TPLTypeSection_I_II: TplType,
    Remarks: remarks,
  });

  if (PolicyNo.includes("TP-")) {
    await createJournalInVP({
      Branch_Code: sub_account,
      Date_Entry: DateIssued,
      Source_Type: "PL",
      Source_No: PolicyNo,
      Explanation: `${form_type} Production`,
      GL_Acct: "1.03.03",
      Sub_Acct: strArea,
      ID_No: PolicyNo,
      cGL_Acct: "Premium Receivable",
      cSub_Acct: cStrArea,
      cID_No: client_name,
      Debit: parseFloat(TotalDue),
      Credit: 0,
      TC: "P/R",
      Remarks: "",
      Source_No_Ref_ID,
    });
  } else {
    await createJournalInVP({
      Branch_Code: sub_account,
      Date_Entry: DateIssued,
      Source_Type: "PL",
      Source_No: PolicyNo,
      Explanation: `${form_type} Production`,
      GL_Acct: "1.03.01",
      Sub_Acct: strArea,
      ID_No: PolicyNo,
      cGL_Acct: "Premium Receivable",
      cSub_Acct: cStrArea,
      cID_No: client_name,
      Debit: parseFloat(TotalDue),
      Credit: 0,
      TC: "P/R",
      Remarks: "",
      Source_No_Ref_ID,
    });
  }

  if (PolicyNo.includes("TP-")) {
    await createJournalInVP({
      Branch_Code: sub_account,
      Date_Entry: DateIssued,
      Source_Type: "PL",
      Source_No: PolicyNo,
      Explanation: `${form_type} Production`,
      GL_Acct: "4.02.07",
      Sub_Acct: strArea,
      ID_No: PolicyNo,
      cGL_Acct: "A/P",
      cSub_Acct: cStrArea,
      cID_No: client_name,
      Debit: 0,
      Credit: parseFloat(TotalDue),
      TC: "A/P",
      Remarks: "",
      Source_No_Ref_ID,
    });
  } else {
    await createJournalInVP({
      Branch_Code: sub_account,
      Date_Entry: DateIssued,
      Source_Type: "PL",
      Source_No: PolicyNo,
      Explanation: `${form_type} Production`,
      GL_Acct: "4.02.01",
      Sub_Acct: strArea,
      ID_No: PolicyNo,
      cGL_Acct: "A/P",
      cSub_Acct: cStrArea,
      cID_No: client_name,
      Debit: 0,
      Credit: parseFloat(TotalDue),
      TC: "A/P",
      Remarks: "",
      Source_No_Ref_ID,
    });
  }

  if (form_action === "REG" && form_type === "TPL") {
    await updateJournalByPolicy(PolicyNo, "CTPL Registration");
    await createJournalInVP({
      Branch_Code: sub_account,
      Date_Entry: DateIssued,
      Source_Type: "GL",
      Source_No: PolicyNo,
      Explanation: `${form_type} Production`,
      GL_Acct: "4.02.01",
      Sub_Acct: strArea,
      ID_No: PolicyNo,
      cGL_Acct: "A/P",
      cSub_Acct: cStrArea,
      cID_No: client_name,
      Debit: parseFloat(TotalDue),
      Credit: 0,
      TC: "P/R",
      Remarks: "",
      Source_No_Ref_ID,
    });
    await createJournalInVP({
      Branch_Code: sub_account,
      Date_Entry: DateIssued,
      Source_Type: "GL",
      Source_No: PolicyNo,
      Explanation: `${form_type} Production`,
      GL_Acct: "4.02.01",
      Sub_Acct: strArea,
      ID_No: PolicyNo,
      cGL_Acct: "CTPL Inventory",
      cSub_Acct: cStrArea,
      cID_No: client_name,
      Debit: 0,
      Credit: parseFloat(TotalDue),
      TC: "CTI",
      Remarks: "",
      Source_No_Ref_ID,
    });
    await createJournalInVP({
      Branch_Code: sub_account,
      Date_Entry: DateIssued,
      Source_Type: "GL",
      Source_No: PolicyNo,
      Explanation: `${form_type} Production`,
      GL_Acct: "4.02.01",
      Sub_Acct: strArea,
      ID_No: PolicyNo,
      cGL_Acct: "CTPL Income",
      cSub_Acct: cStrArea,
      cID_No: client_name,
      Debit: 0,
      Credit: parseFloat(TotalDue) - parseFloat(rateCost),
      TC: "CIN",
      Remarks: "",
      Source_No_Ref_ID,
    });
  }
}
VehiclePolicy.post("/tpl-add-vehicle-policy", async (req, res) => {
  const { sub_account, client_id, PolicyAccount, PolicyNo, Denomination } =
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
      (await getRate(PolicyAccount, "Vehicle", Denomination)) as Array<any>
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

    await insertNewVPolicy({ ...req.body, cStrArea, strArea });

    await saveUserLogs(req, PolicyNo, "add", "Vehicle Policy");
    res.send({ message: "Create Journal Successfully", success: true });
  } catch (err: any) {
    console.log(err.message);
    res.send({ message: err.message, success: false });
  }
});

VehiclePolicy.post("/tpl-update-vehicle-policy", async (req, res) => {
  const {
    form_action,
    form_type,
    sub_account,
    client_id,
    client_name,
    client_address,
    agent_id,
    agent_name,
    agent_com,
    PolicyAccount,
    PolicyNo,
    CCN,
    ORN,
    DateFrom,
    DateTo,
    DateIssued,
    Model,
    Make,
    TB,
    Color,
    BLTFileNo,
    PlateNo,
    ChassisNo,
    MotorNo,
    AuthorizedCapacity,
    UnladenWeigth,
    TplType,
    PremiumPaid,
    EVSV,
    Aircon,
    Stereo,
    Magwheels,
    OthersRate,
    OthersDesc,
    CompreType,
    Deductible,
    Towing,
    ARL,
    BodyInjury,
    PropertyDamage,
    PersinalAccident,
    Denomination,
    Mortgagee,
    MortgageeForm,
    SectionI_II,
    SectionIII,
    OwnDamage,
    Theft,
    SectionIVA,
    SectionIVB,
    PremiumOther,
    AOG,
    AOGPercent,
    TotalPremium,
    Vat,
    DocStamp,
    LocalGovTax,
    StradCom,
    TotalDue,
    Type,
    LocalGovTaxPercent,
    rateCost,
    Source_No_Ref_ID,
  } = req.body;
  try {
    if (!(await saveUserLogsCode(req, "update", PolicyNo, "Vehicle Policy"))) {
      return res.send({ message: "Invalid User Code", success: false });
    }

    //get Commision rate
    const rate = (
      (await getRate(PolicyAccount, "Vehicle", Denomination)) as Array<any>
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
    await deletePolicy(PolicyAccount, form_type, PolicyNo);
    //delete v policy
    await deleteVehiclePolicy(PolicyAccount, form_type, PolicyNo);
    //delete journal
    await deleteJournalBySource(PolicyNo, "PL");

    // insert policy
    await insertNewVPolicy({ ...req.body, cStrArea, strArea });

    res.send({ message: "Update Journal Successfully", success: true });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

VehiclePolicy.get("/tpl-search-vehicle-policy", async (req, res) => {
  const { form_type, form_action, search } = req.query;
  const getSearch = await searchDataVPolicy(
    search as string,
    form_type as string,
    (form_action as string) === "TEMP"
  );
  res.send({
    message: "Search Successfully",
    success: true,
    searchVPolicy: getSearch,
  });
});
VehiclePolicy.post("/tpl-delete-vehicle-policy", async (req, res) => {
  const { PolicyAccount, form_type, PolicyNo } = req.body;
  try {
    if (!(await saveUserLogsCode(req, "delete", PolicyNo, "Vehicle Policy"))) {
      return res.send({ message: "Invalid User Code", success: false });
    }

    //delete policy
    await deletePolicy(PolicyAccount, form_type, PolicyNo);
    // //delete v policy
    await deleteVehiclePolicy(PolicyAccount, form_type, PolicyNo);

    await saveUserLogs(req, PolicyNo, "delete", "Vehicle Policy");
    res.send({
      message: "Delete Vehicle Policy Successfully",
      success: true,
    });
  } catch (err: any) {
    res.send({
      message: err.message,
      success: false,
    });
  }
});

export function sampleVPolicy() {
  const data = [];
  let generatedCodes = new Set();

function generateUniqueString() {
    while (true) {
        // Generate random numbers
        const randomNumber1 = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        const randomNumber2 = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        const randomNumber3 = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
        
        // Construct the unique string
        const uniqueString = `PC-GA${randomNumber1}A${randomNumber2}-${randomNumber3}`;
        
        // Check if the code is already generated
        if (!generatedCodes.has(uniqueString)) {
            generatedCodes.add(uniqueString);
            return uniqueString;
        }
    }
}


  for (let index = 0; index < 500; index++) {
    data.push({
      form_action: "REG",
      form_type: "COM",
      sub_account: "HO",
      client_id: "C-0424-002",
      client_name: "ALFRED ALMOETE ALMODIEL",
      client_address:
        "Ground Floor, Azure Business Center, 1197-A Epifanio de los Santos Ave, Quezon City, 1105 Metro Manila",
      agent_id: "A-0424-002",
      agent_name: "ARTEMIO JR. LIMOS JOSE",
      agent_com: "0.00",
      PolicyAccount: "MILESTONE GUARANTEE",
      PolicyNo: generateUniqueString(),
      CCN: "",
      ORN: "",
      rateCost: "",
      DateFrom: "2024-05-26T06:47:27.483Z",
      DateTo: "2025-05-26T06:47:27.483Z",
      DateIssued: "2024-05-26T06:47:27.483Z",
      Model: "2023",
      Make: "ISUZU",
      TB: "MUX P-VAN",
      Color: "",
      BLTFileNo: "",
      PlateNo: "NGB4197",
      ChassisNo: "NKR66E-7848797",
      MotorNo: "4HF1-7858445",
      AuthorizedCapacity: "",
      UnladenWeigth: "",
      TplType: "",
      PremiumPaid: "0.00",
      EVSV: "900000.00",
      Aircon: "0.00",
      Stereo: "0.00",
      Magwheels: "0.00",
      OthersRate: "0.00",
      OthersDesc: "",
      CompreType: "",
      Deductible: "4500.00",
      Towing: "500.00",
      ARL: "5000.00",
      BodyInjury: "200,000.00",
      PropertyDamage: "200,000.00",
      PersinalAccident: "100,000.00",
      Denomination: "COM-Private Car",
      Mortgagee: "EASTWEST BANK",
      MortgageeForm: "true",
      remarks: "C/O CHARLES",
      SectionI_II: "0.00",
      SectionIII: "2.50",
      OwnDamage: "22500.00",
      Theft: "0.00",
      SectionIVA: "270.00",
      SectionIVB: "1290.00",
      PremiumOther: "375.00",
      AOG: "4500.00",
      AOGPercent: "0.50",
      TotalPremium: "28935.00",
      Vat: "3472.20",
      DocStamp: "3616.88",
      LocalGovTaxPercent: "0.75",
      LocalGovTax: "217.01",
      StradCom: "0.00",
      TotalDue: "36241.09",
      Type: "charles1",
      Source_No_Ref_ID: "",
      vehicle: "private",
      mode: "add",
      cStrArea: "Head Office",
      strArea: "HO",
    });
  }

  data.forEach(async (itm: any) => {
    console.log(itm)
    await insertNewVPolicy(itm);
  });
}

export default VehiclePolicy;
