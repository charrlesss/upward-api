import express from "express";
import ScheduleAccounts from "./schedule_account";


const AccountingReport = express.Router();

AccountingReport.use('/accounting/',ScheduleAccounts)


export default AccountingReport