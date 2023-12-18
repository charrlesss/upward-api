import express from "express";
import {
  addDepositSlip,
  depositIDGenerator,
  findDepositBySlipCode,
  getBanksFromDeposit,
  getCashCollection,
  getCheckCollection,
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
      slipcode: await depositIDGenerator(),
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, slipcode: [] });
  }
});

Deposit.post("/add-deposit", async (req, res) => {
  try {
    if ((await findDepositBySlipCode(req.body.depositSlip)).length > 0) {
      return res.send({
        message: `${req.body.depositSlip} already exists`,
        success: false,
      });
    }
    console.log(req.body)
    const selectedCollection = JSON.parse(req.body.selectedCollection);
    await addDepositSlip({
      Date: req.body.depositdate,
      SlipCode: req.body.depositSlip,
      Slip: req.body.bankAccountNo,
      BankAccount: req.body.bankName,
      AccountName: req.body.bankName,
      CheckDeposit: selectedCollection
        .reduce((accumulator: number, currentValue: any) => {
          const dd =
            currentValue.Check_No || currentValue.Check_No !== ""
              ? parseFloat(currentValue.Amount.replace(/,/g, ""))
              : 0;
          return accumulator + dd;
        }, 0.0)
        .toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      CashDeposit: selectedCollection
        .reduce((accumulator: number, currentValue: any) => {
          const dd =
            currentValue.Check_No || currentValue.Check_No !== ""
              ? 0
              : parseFloat(currentValue.Amount.replace(/,/g, ""));
          return accumulator + dd;
        }, 0.0)
        .toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      IDNo: req.body.bankAccountNo,
    });

    res.send({
      message: "Successfully Create New Deposit.",
      success: true,
    });
  } catch (error: any) {
    console.log(error)
    res.send({ message: error.message, success: false });
  }
});

export default Deposit;
