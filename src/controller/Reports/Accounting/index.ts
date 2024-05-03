import express from "express";
import ScheduleAccounts from "./schedule_account";
import SubsidiaryLedger from "./subsidiary_ledger";
import TrialBalance from "./trial_balance";
import IncomeStatement from "./income_statement";
import BalanceSheetLong from "./balance-sheet-long";

const AccountingReport = express.Router();

AccountingReport.use("/accounting/", ScheduleAccounts);
AccountingReport.use("/accounting/", SubsidiaryLedger);
AccountingReport.use("/accounting/", TrialBalance);
AccountingReport.use("/accounting/", IncomeStatement);
AccountingReport.use("/accounting/", BalanceSheetLong);

export default AccountingReport;
