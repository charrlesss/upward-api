import express from "express";
import {
  addDepositSlip,
  findDepositBySlipCode,
  getBanksFromDeposit,
  getCashCollection,
  getCheckCollection,
  addCashCheckInDeposit,
  depositIDSlipCodeGenerator,
  addCashBreakDown,
  addJournal,
  updateCollectioSlipCode,
  updatePDCSlipCode,
} from "../../../model/Task/Accounting/deposit.model";
const Deposit = express.Router();

Deposit.get("/getCashCollection", async (req, res) => {
  try {
    res.send({
      message: "Successfully Get Cash Collection.",
      success: true,
      cash: await getCashCollection(""),
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, cash: [] });
  }
});
Deposit.get("/getCheckCollection", async (req, res) => {
  try {
    res.send({
      message: "Successfully Get Check Collection.",
      success: true,
      check: await getCheckCollection(""),
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, check: [] });
  }
});
Deposit.get("/getBanks", async (req, res) => {
  const { bankDepositSearch } = req.query;
  try {
    res.send({
      message: "Successfully Get Deposit Banks.",
      success: true,
      banks: await getBanksFromDeposit(bankDepositSearch as string),
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, banks: [] });
  }
});
Deposit.get("/get-deposit-slipcode", async (req, res) => {
  try {
    res.send({
      message: "Successfully Get Deposit Slipcode Successfully.",
      success: true,
      slipcode: await depositIDSlipCodeGenerator(),
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, slipcode: [] });
  }
});
Deposit.post("/add-deposit", async (req, res) => {
  console.log(req.body);
  try {
    if ((await findDepositBySlipCode(req.body.depositSlip)).length > 0) {
      return res.send({
        message: `${req.body.depositSlip} already exists`,
        success: false,
      });
    }

    const selectedCollection = JSON.parse(req.body.selectedCollection);
    const tableRowsInputValue = JSON.parse(req.body.tableRowsInputValue);
    const cashTotal = selectedCollection.reduce(
      (accumulator: number, currentValue: any) => {
        const dd =
          currentValue.Check_No || currentValue.Check_No !== ""
            ? 0
            : parseFloat(currentValue.Amount.replace(/,/g, ""));
        return accumulator + dd;
      },
      0.0
    );
    const checkTotal = selectedCollection.reduce(
      (accumulator: number, currentValue: any) => {
        const dd =
          currentValue.Check_No || currentValue.Check_No !== ""
            ? parseFloat(currentValue.Amount.replace(/,/g, ""))
            : 0;
        return accumulator + dd;
      },
      0.0
    );

    await addDepositSlip({
      Date: req.body.depositdate,
      SlipCode: req.body.depositSlip,
      Slip: req.body.Desc,
      BankAccount: req.body.Account_No,
      AccountName: req.body.Account_Name,
      CheckDeposit: checkTotal.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      CashDeposit: cashTotal.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      IDNo: req.body.IDNo,
    });

    let Cnt = 0;
    const Amount = [checkTotal, cashTotal];
    for (let i = 0; i < 2; i++) {
      if (Amount[i] !== 0) {
        Cnt++;
        await addCashCheckInDeposit({
          Date_Deposit: Cnt > 1 ? null : req.body.depositdate,
          Slip_Code: Cnt > 1 ? null : req.body.depositSlip,
          Account_ID: req.body.Account_No,
          Account_Name: req.body.Account_Name,
          Debit: Amount[i].toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
          Temp_SlipCode: req.body.depositSlip,
          Temp_SlipCntr: `${req.body.depositSlip}-${("000" + Cnt).slice(-3)}`,
          Temp_SlipDate: req.body.depositdate,
          Type: "HO",
          IDNo: req.body.ShortName,
        });
      }
    }
    for (let i = 0; i < selectedCollection.length; i++) {
      const selectedCollectionValue = selectedCollection[i];
      await addCashCheckInDeposit({
        Account_ID: selectedCollectionValue.DRCode,
        Account_Name: selectedCollectionValue.Short,
        Credit: selectedCollectionValue.Amount,
        Check_Date: selectedCollectionValue.Check_Date,
        Check_No: selectedCollectionValue.Check_No,
        Bank: selectedCollectionValue.Bank,
        Temp_SlipCode: req.body.depositSlip,
        Temp_SlipCntr: `${req.body.depositSlip}-${("000" + Cnt).slice(-3)}`,
        Temp_SlipDate: req.body.depositdate,
        IDNo: selectedCollectionValue.Name,
        Type: "HO",
        Ref_No: selectedCollectionValue.ORNo,
      });
    }
    await addCashBreakDown({
      Slip_Code: req.body.depositSlip,
      Pap_1000: tableRowsInputValue[0].value2,
      Pap_500: tableRowsInputValue[1].value2,
      Pap_200: tableRowsInputValue[2].value2,
      Pap_100: tableRowsInputValue[3].value2,
      Pap_50: tableRowsInputValue[4].value2,
      Pap_20: tableRowsInputValue[5].value2,
      Pap_10: tableRowsInputValue[6].value2,
      Pap_5: tableRowsInputValue[7].value2,
      Coin_5: tableRowsInputValue[7].value2,
      Coin_2: tableRowsInputValue[8].value2,
      Coin_1: tableRowsInputValue[9].value2,
      Cnt_50: tableRowsInputValue[10].value2,
      Cnt_25: tableRowsInputValue[11].value2,
      Cnt_10: tableRowsInputValue[12].value2,
      Cnt_05: tableRowsInputValue[13].value2,
      Cnt_01: tableRowsInputValue[14].value2,
    });

    for (let i = 0; i < 2; i++) {
      if (Amount[i] !== 0) {
        addJournal({
          Branch_Code: req.body.Sub_Acct,
          Date_Entry: req.body.depositdate,
          Source_Type: "DC",
          Source_No: req.body.depositSlip,
          Particulars: i === 0 ? req.body.ShortName : "",

          Payto: i === 1 ? req.body.ShortName : "",
          GL_Acct: req.body.Account_ID,
          cGL_Acct: req.body.Short,
          Sub_Acct: req.body.Sub_Acct,
          cSub_Acct: req.body.Sub_ShortName,
          ID_No: req.body.IDNo,
          cID_No: req.body.ShortName,
          Debit:
            i == 0
              ? checkTotal.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : cashTotal.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }),
          Source_No_Ref_ID: "",
        });
      }
    }
    for (let i = 0; i < selectedCollection.length; i++) {
      const selectedCollectionValue = selectedCollection[i];
      const IsCheck = selectedCollectionValue.Check_No !== "";

      addJournal({
        Branch_Code: req.body.Sub_Acct,
        Date_Entry: req.body.depositdate,
        Source_Type: "DC",
        Source_No: req.body.depositSlip,
        Explanation: "",
        Check_Date: IsCheck ? selectedCollectionValue.Check_Date : "",
        Check_No: IsCheck ? selectedCollectionValue.Check_No : "",
        Check_Bank: IsCheck ? selectedCollectionValue.Bank : "",
        Remarks: IsCheck ? selectedCollectionValue.DRRemarks : "",
        Payto: selectedCollectionValue.Name,
        GL_Acct: selectedCollectionValue.DRCode,
        cGL_Acct: selectedCollectionValue.Short,
        Sub_Acct: "HO",
        cSub_Acct: req.body.Sub_ShortName,
        ID_No: selectedCollectionValue.IDNo,
        cID_No: selectedCollectionValue.Name,
        Credit: selectedCollectionValue.Amount,
        Source_No_Ref_ID: "",
      });
      await updateCollectioSlipCode(
        req.body.depositSlip,
        selectedCollectionValue.TempOR
      );
      if (IsCheck)
        await updatePDCSlipCode(
          req.body.depositSlip,
          req.body.depositdate,
          selectedCollectionValue.IDNo,
          selectedCollectionValue.Check_No
        );
    }

    res.send({
      message: "Successfully Create New Deposit.",
      success: true,
    });
  } catch (error: any) {
    console.log(error);
    res.send({ message: error.message, success: false });
  }
});

export default Deposit;
