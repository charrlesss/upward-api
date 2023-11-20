import express from "express";
import PDC from "./pdc";

const Accounting = express.Router();

Accounting.use("/accounting", PDC);


export default Accounting;