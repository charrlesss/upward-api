import express from "express";
import PDC from "./pdc";
import Collection from "./collection";

const Accounting = express.Router();

Accounting.use("/accounting", PDC);
Accounting.use("/accounting", Collection);


export default Accounting;