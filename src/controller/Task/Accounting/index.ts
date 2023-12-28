import express from "express";
import PDC from "./pdc";
import Collection from "./collection";
import Deposit from "./deposit";
import ReturnCheck from "./return-checks";

const Accounting = express.Router();

Accounting.use("/accounting", PDC);
Accounting.use("/accounting", Collection);
Accounting.use("/accounting", Deposit);
Accounting.use("/accounting", ReturnCheck);

export default Accounting;
