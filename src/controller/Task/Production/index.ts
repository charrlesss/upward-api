import express from "express";
import VehiclePolicy from "./vehiclepolicy";

const Production = express.Router();

Production.use("/production", VehiclePolicy);

export default Production;
