import express from "express";
import PDC from "./pdc";
import Collection from "./collection";
import Deposit from "./deposit";
import ReturnCheck from "./return-checks";
import PettyCash from "./pettycash";
import GeneralJournal from "./general-journal";
import CashDisbursement from "./cash-disbursement";
import Warehouse from "./warehouse";

const Accounting = express.Router();

Accounting.use("/accounting", PDC);
Accounting.use("/accounting", Collection);
Accounting.use("/accounting", Deposit);
Accounting.use("/accounting", ReturnCheck);
Accounting.use("/accounting", PettyCash);
Accounting.use("/accounting", GeneralJournal);
Accounting.use("/accounting", CashDisbursement);
Accounting.use("/accounting", Warehouse);

export default Accounting;
