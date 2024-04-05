import express from "express";
import ScheduleAccounts from "./schedule_account";
import SubsidiaryLedger from "./subsidiary_ledger";
import TrialBalance from "./trial_balance";

const AccountingReport = express.Router();

AccountingReport.use("/accounting/", ScheduleAccounts);
AccountingReport.use("/accounting/", SubsidiaryLedger);
AccountingReport.use("/accounting/", TrialBalance);

export default AccountingReport;
