import express, { response } from "express";
import {
  getTransactionAccount,
  getPolicyIdClientIdRefId,
  getChartOfAccount,
  GenerateGeneralJournalID,
  addJournalVoucher,
  addJournalFromJournalVoucher,
  updateGeneralJournalID,
  searchGeneralJournal,
  getSelectedSearchGeneralJournal,
  deleteGeneralJournal,
  deleteJournalFromGeneralJournal,
  voidGeneralJournal,
  insertVoidGeneralJournal,
  voidJournalFromGeneralJournal,
  insertVoidJournalFromGeneralJournal,
  doRPTTransaction,
  doRPTTransactionLastRow,
  doMonthlyProduction,
  findeGeneralJournal,
} from "../../../model/Task/Accounting/general-journal.model";
import { getMonth, getYear, endOfMonth, format } from "date-fns";
import saveUserLogs from "../../../lib/save_user_logs";
import { saveUserLogsCode } from "../../../lib/saveUserlogsCode";
const GeneralJournal = express.Router();

GeneralJournal.post(
  "/general-journal/add-general-journal",
  async (req, res) => {
    try {
      if (
        req.body.hasSelected &&
        !(await saveUserLogsCode(
          req,
          "edit",
          req.body.refNo,
          "General-Journal"
        ))
      ) {
        return res.send({ message: "Invalid User Code", success: false });
      }

      const generalJournal = (await findeGeneralJournal(
        req.body.refNo
      )) as Array<any>;
      if (generalJournal.length > 0 && !req.body.hasSelected) {
        return res.send({
          message: `${req.body.refNo} already exist!`,
          success: false,
        });
      }
      await deleteGeneralJournal(req.body.refNo);
      await deleteJournalFromGeneralJournal(req.body.refNo);

      req.body.generalJournal.forEach(async (item: any) => {
        await addJournalVoucher({
          Branch_Code: item.BranchCode,
          Date_Entry: req.body.dateEntry, // Assuming dtpDate is a valid date
          Source_Type: "GL",
          Source_No: req.body.refNo,
          Explanation: req.body.explanation,
          GL_Acct: item.code,
          cGL_Acct: item.acctName,
          cSub_Acct: item.subAcctName,
          cID_No: item.ClientName,
          Debit: parseFloat(item.debit.replace(/,/g, "")),
          Credit: parseFloat(item.credit.replace(/,/g, "")),
          TC: item.TC_Code,
          Remarks: item.remarks,
          Sub_Acct: item.subAcct,
          ID_No: item.IDNo,
          VAT_Type: item.vatType,
          OR_Invoice_No: item.invoice,
          VATItemNo: parseInt(item.TempID),
        });
        await addJournalFromJournalVoucher({
          Branch_Code: item.BranchCode,
          Date_Entry: req.body.dateEntry, // Assuming dtpDate is a valid date
          Source_Type: "GL",
          Source_No: req.body.refNo,
          Explanation: req.body.explanation,
          GL_Acct: item.code,
          cGL_Acct: item.acctName,
          cSub_Acct: item.subAcctName,
          cID_No: item.ClientName,
          Debit: parseFloat(item.debit.replace(/,/g, "")),
          Credit: parseFloat(item.credit.replace(/,/g, "")),
          TC: item.TC_Code,
          Remarks: item.remarks,
          Sub_Acct: item.subAcct,
          ID_No: item.IDNo,
          VAT_Type: item.vatType,
          OR_Invoice_No: item.invoice,
          VATItemNo: parseInt(item.TempID),
          Source_No_Ref_ID: "",
        });
      });

      if (!req.body.hasSelected) {
        await updateGeneralJournalID(req.body.refNo.split("-")[1]);
        await saveUserLogs(req, req.body.refNo, "add", "General-Journal");
      }

      res.send({
        message: req.body.hasSelected
          ? `Successfully update ${req.body.refNo}  in general journal`
          : `Successfully add new ${req.body.refNo} in general journal`,
        success: true,
      });
    } catch (error: any) {
      res.send({
        message: error.message,
        success: false,
      });
    }
  }
);
GeneralJournal.post(
  "/general-journal/void-general-journal",
  async (req, res) => {
    try {
      if (
        !(await saveUserLogsCode(
          req,
          "void",
          req.body.refNo,
          "General-Journal"
        ))
      ) {
        return res.send({ message: "Invalid User Code", success: false });
      }

      await voidGeneralJournal(req.body.refNo);
      await insertVoidGeneralJournal(req.body.refNo, req.body.dateEntry);
      await voidJournalFromGeneralJournal(req.body.refNo);
      await insertVoidJournalFromGeneralJournal(
        req.body.refNo,
        req.body.dateEntry
      );
      await saveUserLogs(req, req.body.refNo, "void", "General-Journal");
      res.send({
        message: `Successfully void ${req.body.refNo} in general journal`,
        success: true,
      });
    } catch (error: any) {
      console.log(error.message);
      res.send({
        message: error.message,
        success: false,
      });
    }
  }
);
GeneralJournal.get(
  "/general-journal/get-general-journal-id",
  async (req, res) => {
    try {
      res.send({
        message: "Successfully get get general journal id",
        success: true,
        generateGeneralJournalID: await GenerateGeneralJournalID(),
      });
    } catch (error: any) {
      res.send({
        message: error.message,
        success: false,
        generateGeneralJournalID: [],
      });
    }
  }
);

GeneralJournal.get("/general-journal/get-chart-account", async (req, res) => {
  const { chartAccountSearch: search } = req.query;
  try {
    res.send({
      message: "Successfully get chart account",
      success: true,
      getChartOfAccount: await getChartOfAccount(search as string),
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false });
  }
});

GeneralJournal.get(
  "/general-journal/get-policyId-ClientId-RefId",
  async (req, res) => {
    const { policyClientRefIDSearch: search } = req.query;
    try {
      res.send({
        message: "Successfully get policy, client, ref, ID",
        success: true,
        getPolicyIdClientIdRefId: await getPolicyIdClientIdRefId(
          search as string
        ),
      });
    } catch (error: any) {
      res.send({ message: error.message, success: false });
    }
  }
);

GeneralJournal.get(
  "/general-journal/get-transaction-account",
  async (req, res) => {
    const { transactionCodeSearch: search } = req.query;
    try {
      res.send({
        message: "Successfully get transaction account",
        success: true,
        getTransactionAccount: await getTransactionAccount(search as string),
      });
    } catch (error: any) {
      res.send({
        message: error.message,
        success: false,
        getTransactionAccount: [],
      });
    }
  }
);

GeneralJournal.get(
  "/general-journal/search-general-journal",
  async (req, res) => {
    const { searchGeneralJournal: search } = req.query;
    try {
      res.send({
        message: "Successfully get get general journal id",
        success: true,
        searchGeneralJournal: await searchGeneralJournal(search as string),
      });
    } catch (error: any) {
      res.send({
        message: error.message,
        success: false,
        searchGeneralJournal: [],
      });
    }
  }
);

GeneralJournal.post(
  "/general-journal/get-selected-search-general-journal",
  async (req, res) => {
    try {
      res.send({
        message: "Successfully get selected  general journal ",
        success: true,
        getSelectedSearchGeneralJournal: await getSelectedSearchGeneralJournal(
          req.body.Source_No
        ),
      });
    } catch (error: any) {
      res.send({
        message: error.message,
        success: false,
        getSelectedSearchGeneralJournal: [],
      });
    }
  }
);

GeneralJournal.post("/general-journal/jobs", async (req, res) => {
  let response = [];

  switch (req.body.jobType) {
    case "":
      response = [];
      break;
    case "0":
      response = [];
      break;
    case "1":
      response = [];
      break;
    case "2":
      response = [];
      break;
    case "3":
      response = [];
      break;
    case "4":
      const { from: fromNilData, to: toNilDate } = RPTComputationDate(
        req.body.jobTransactionDate
      );
      response = await RPTComputation(
        (await doRPTTransaction(
          fromNilData,
          toNilDate,
          "N I L - HN"
        )) as Array<any>
      );
      break;
    case "5":
      const { from: fromAMIFIN, to: toAMIFIN } = RPTComputationDate(
        req.body.jobTransactionDate
      );
      response = await RPTComputation(
        (await doRPTTransaction(fromAMIFIN, toAMIFIN, "AMIFIN")) as Array<any>
      );
      break;
    case "6":
      response = [];
      break;
    case "7":
      response = [];
      break;
    case "8":
      response = [];
      break;
    case "9":
      response = await MonthlyProductionComputation(
        req.body.jobTransactionDate,
        "MILESTONE GUARANTEE"
      );
      break;
    case "10":
      response = await MonthlyProductionComputation(
        req.body.jobTransactionDate,
        "LIBERTY INSURANCE CO"
      );
      break;
    case "11":
      response = await MonthlyProductionComputation(
        req.body.jobTransactionDate,
        "FEDERAL PHOENIX"
      );
      break;
    default:
      response = [];
  }

  try {
    res.send({
      message: "Successfully get jobs ",
      success: true,
      jobs: response,
    });
  } catch (error: any) {
    res.send({
      message: error.message,
      success: false,
      jobs: [],
    });
  }
});

async function RPTComputation(jobs: Array<any>) {
  let response = [];
  const debit = jobs.reduce((a: number, b: any) => {
    return a + parseFloat(b.credit.replace(/,/g, ""));
  }, 0);

  // insert credit
  const overrideItems = {
    code: "4.02.01",
    acctName: "Accounts Payable",
    debit: "0.0",
    TC_Code: "RPT",
    remarks: "",
    vatType: "",
    invoice: "",
  };
  // insert debit
  const addItem = {
    code: "1.05.01",
    acctName: "Related Party Transaction",
    subAcctName: "",
    ClientName: "",
    debit: debit.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    credit: "0.00",
    TC_Code: "RPT",
    remarks: "",
    vatType: "",
    invoice: "",
    IDNo: "",
    BranchCode: "",
    TempID: (jobs.length + 1).toString().padStart(3, "0"),
    ...((await doRPTTransactionLastRow()) as Array<any>)[0],
  };

  response = jobs.map((d: any) => {
    d = {
      ...d,
      ...overrideItems,
    };
    return d;
  });

  if (jobs.length > 0) {
    response.push(addItem);
  }

  return response;
}

function RPTComputationDate(jobTransactionDate: any) {
  const month = getMonth(new Date(jobTransactionDate)) + 1;
  const from = `${
    month.toString().length > 1 ? month : "0" + month
  }-01-${getYear(new Date(jobTransactionDate))}`;
  const to = format(endOfMonth(new Date(jobTransactionDate)), "MM-dd-yyyy");

  return { from, to };
}

async function MonthlyProductionComputation(
  jobTransactionDate: any,
  account: string
) {
  const id = {
    "MILESTONE GUARANTEE": "UIA-1207-018",
    "LIBERTY INSURANCE CO": "SUP025",
    "FEDERAL PHOENIX": "UIO-1312-002",
  }[account];
  const date = new Date(jobTransactionDate);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const milestone = (await doMonthlyProduction(
    account,
    month,
    year
  )) as Array<any>;
  const addItem = {
    code: "4.02.01",
    acctName: "Accounts Payable",
    credit: "0.00",
    TC_Code: "",
    remarks: "",
    vatType: "",
    invoice: "",
  };

  if (milestone.length <= 0) return [];

  const milestoneCredit = milestone.reduce((a: number, b: any) => {
    return a + parseFloat(b.debit.toString().replace(/,/g, ""));
  }, 0);

  const milestoneData = milestone.map((item) => {
    item = {
      ...item,
      ...addItem,
    };
    return item;
  });

  milestoneData.push({
    code: "4.02.01",
    acctName: "Accounts Payable",
    subAcctName: "HO",
    ClientName: id,
    debit: "0.00",
    credit: milestoneCredit.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    TC_Code: "",
    remarks: "",
    vatType: "",
    invoice: "",
    TempID: (milestone.length + 1).toString().padStart(3, "0"),
    IDNo: id,
    BranchCode: "",
  });

  return milestoneData;
}

export default GeneralJournal;
