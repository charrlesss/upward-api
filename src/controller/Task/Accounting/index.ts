import express from "express";
import PDC from "./pdc";
import Collection from "./collection";
import Deposit from "./deposit";

const Accounting = express.Router();

Accounting.use("/accounting", PDC);
Accounting.use("/accounting", Collection);
Accounting.use("/accounting", Deposit);

export default Accounting;
