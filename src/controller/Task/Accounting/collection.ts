import express from "express";
import {
  TransactionAndChartAccount,
  collectionIDGenerator,
  createCollection,
  createJournal,
  deleteCollection,
  deleteFromJournalToCollection,
  findORnumber,
  getClientCheckedList,
  getCollections,
  getSearchCollection,
  getTransactionBanksDetails,
  getTransactionDescription,
  updateCollectionIDSequence,
  updatePDCCheck,
} from "../../../model/Task/Accounting/collection.model";

import { format } from "date-fns";

const Collection = express.Router();

Collection.get("/get-client-checked-by-id", async (req, res) => {
  const { PNo, searchCheckedList } = req.query;

  try {
    const data1 = await getClientCheckedList(
      searchCheckedList as string,
      PNo as string
    );
    res.send({
      message: "get Data Successfully",
      success: true,
      clientCheckedList: JSON.parse(
        JSON.stringify(data1, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      ),
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, clientCheckedList: [] });
  }
});

Collection.get("/get-transaction-code-title", async (req, res) => {
  try {
    res.send({
      message: "Get Data Successfully",
      success: true,
      banktransaction: await getTransactionBanksDetails(),
      transactionDesc: await getTransactionDescription(),
    });
  } catch (error: any) {
    res.send({
      message: error.message,
      success: false,
      banktransaction: [],
      transactionDesc: [],
    });
  }
});

Collection.get("/get-new-or-number", async (req, res) => {
  try {
    res.send({
      message: "Get New OR Number Successfully",
      success: true,
      ORNo: await collectionIDGenerator(),
    });
  } catch (error: any) {
    res.send({
      message: error.message,
      success: false,
      ORNo: [],
    });
  }
});

Collection.post("/add-collection", async (req, res) => {
  try {
    const isFind = await findORnumber(req.body.ORNo);
    if (isFind.length > 0) {
      return res.send({
        message: `${req.body.ORNo} Already Exists!`,
        success: false,
        collectionID: null,
      });
    }
    AddCollection(req);
    await updateCollectionIDSequence({
      last_count: req.body.ORNo.split(".")[1],
      year: req.body.ORNo.split(".")[0].slice(0, 2),
      month: req.body.ORNo.split(".")[0].slice(-2),
    });
    const newID = await collectionIDGenerator();
    res.send({
      message: "Create Collection Successfully!",
      success: true,
      collectionID: newID,
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({
      message: error.message,
      success: false,
      collectionID: null,
    });
  }
});

Collection.get("/get-collection-data-search", async (req, res) => {
  const { ORNo } = req.query;
  try {
    res.send({
      message: "Search Collection Successfully",
      success: true,
      collection: await getSearchCollection(ORNo as string),
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, collection: [] });
  }
});
Collection.get("/search-collection", async (req, res) => {
  const { searchCollectionInput } = req.query;
  try {
    console.log(searchCollectionInput);
    res.send({
      message: "Search Collection Successfully",
      success: true,
      collection: await getCollections(searchCollectionInput as string),
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, collection: [] });
  }
});

Collection.post("/update-collection", async (req, res) => {
  try {
    await deleteCollection(req.body.ORNo);
    AddCollection(req);

    res.send({
      message: "Update Collection Successfully!",
      success: true,
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({
      message: error.message,
      success: false,
    });
  }
});

async function AddCollection(req: any) {
  const debit = JSON.parse(req.body.debit);
  const credit = JSON.parse(req.body.credit);

  let Payment = "";
  let Debit = "0";
  let CheckNo = "";
  let CheckDate = "";
  let Bank = "";
  let DRCode = "";
  let DRTitle = "";
  let SlipCode = "";
  let DRCtr = "";
  let DRRemarks = "";
  let Purpose = "";
  let Credit = "0";
  let CRRemarks = "";
  let CRCode = "";
  let CRTitle = "";
  let CRLoanID = "";
  let CRLoanName = "";
  let CRVatType = "";
  let CRInvoiceNo = "";

  const TotalRows =
    debit.length >= credit.length ? debit.length : credit.length;

  for (let i = 0; i <= TotalRows - 1; i++) {
    if (i <= debit.length - 1) {
      Payment = debit[i].Payment;
      Debit = debit[i].Amount;
      CheckNo = debit[i].Check_No;
      CheckDate = debit[i].Check_Date;
      Bank = debit[i].Bank_Branch;
      DRCode = debit[i].Acct_Code;
      DRTitle = debit[i].Acct_Title;
      SlipCode = debit[i].Deposit_Slip;
      DRCtr = debit[i].Cntr;
      DRRemarks = debit[i].Remarks;
    }
    if (i <= credit.length - 1) {
      const { Acct_Code, Acct_Title } = (
        (await TransactionAndChartAccount(credit[i].transaction)) as Array<any>
      )[0];

      Purpose = credit[i].transaction;
      Credit = credit[i].amount;
      CRRemarks = credit[i].Remarks;
      CRCode = Acct_Code;
      CRTitle = Acct_Title;
      CRLoanID = credit[i].Account_No;
      CRLoanName = credit[i].Name;
      CRVatType = credit[i].VATType;
      CRInvoiceNo = credit[i].invoiceNo;
    }

    const ColDate =
      i === 0 ? format(new Date(req.body.Date), "MM/dd/yyyy") : null;
    const OR = i === 0 ? req.body.ORNo : "";
    const PNo = i === 0 ? req.body.PNo : "";
    const Name = i === 0 ? req.body.Name : "";

    const newCollection = {
      Date: ColDate,
      ORNo: OR,
      IDNo: PNo,
      Name: Name,
      Payment: Payment,
      Debit: Debit,
      Check_No: CheckNo,
      Check_Date: CheckDate,
      Bank: Bank,
      DRCode: DRCode,
      DRTitle: DRTitle,
      SlipCode: SlipCode,
      DRRemarks: DRRemarks,
      Purpose: Purpose,
      Credit: Credit,
      CRRemarks: CRRemarks,
      CRCode: CRCode,
      CRTitle: CRTitle,
      CRLoanID: CRLoanID,
      CRLoanName: CRLoanName,
      ID_No: req.body.PNo,
      Official_Receipt: req.body.ORNo,
      Temp_OR: `${req.body.ORNo}${(i + 1).toString().padStart(2, "0")}`,
      Status: "HO",
      Date_OR: format(new Date(req.body.Date), "MM/dd/yyyy"),
      Short: req.body.Name,
      CRVATType: CRVatType,
      CRInvoiceNo: CRInvoiceNo,
    };

    await createCollection(newCollection);

    if (i <= debit.length - 1) {
      if (debit[i].Payment.trim().toLowerCase() === "check") {
        await updatePDCCheck({
          ORNum: OR.toUpperCase(),
          PNo: req.body.PNo,
          CheckNo: CheckNo,
        });
      }
    }
  }
  await deleteFromJournalToCollection(req.body.ORNo);
  for (let i = 0; i <= debit.length - 1; i++) {
    Payment = debit[i].Payment;
    Debit = debit[i].Amount;
    CheckNo = debit[i].Check_No ?? "";
    CheckDate = debit[i].Check_Date ?? "";
    Bank = debit[i].Bank_Branch ?? "";
    DRCode = debit[i].Acct_Code;
    DRTitle = debit[i].Acct_Title;
    SlipCode = debit[i].Deposit_Slip;
    DRCtr = debit[i].Cntr;
    DRRemarks = debit[i].TC;
    await createJournal({
      Branch_Code: "HO",
      Date_Entry: format(new Date(req.body.Date), "MM/dd/yyyy"),
      Source_Type: "OR",
      Source_No: req.body.ORNo.toUpperCase(),
      Explanation: `${Payment} Collection at Head Office`,
      Check_No: CheckNo,
      Check_Date: CheckDate,
      Check_Bank: Bank,
      Payto: req.body.Name,
      GL_Acct: DRCode,
      cGL_Acct: DRTitle,
      Sub_Acct: "HO",
      cSub_Acct: "Upward Insurance Agency",
      ID_No: req.body.PNo,
      cID_No: req.body.Name,
      Debit: Debit.replaceAll(",", ""),
      TC: DRRemarks,
      Source_No_Ref_ID: "",
    });
  }

  for (let i = 0; i <= credit.length - 1; i++) {
    Purpose = credit[i].transaction;
    Credit = credit[i].amount;
    CRRemarks = credit[i].Remarks;
    CRCode = credit[i].Title;
    CRTitle = credit[i].TC;
    CRLoanID = credit[i].Account_No;
    CRLoanName = credit[i].Name;
    CRVatType = credit[i].VATType;
    CRInvoiceNo = credit[i].invoiceNo;

    await createJournal({
      Branch_Code: "HO",
      Date_Entry: format(new Date(req.body.Date), "MM/dd/yyyy"),
      Source_Type: "OR",
      Source_No: req.body.ORNo.toUpperCase(),
      GL_Acct: CRCode,
      cGL_Acct: CRTitle,
      ID_No: req.body.PNo,
      cID_No: req.body.Name,
      Explanation: Purpose,
      Sub_Acct: "HO",
      cSub_Acct: "Upward Insurance Agency",
      Credit: Credit.replaceAll(",", ""),
      Remarks: CRRemarks,
      TC: CRTitle,
      VAT_Type: CRVatType,
      OR_Invoice_No: CRInvoiceNo,
      Source_No_Ref_ID: "",
    });
  }
}
export default Collection;
