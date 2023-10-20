import express from "express";
import VehiclePolicy from "./vehiclepolicy";
import FirePolicy from "./firepolicy";

const Production = express.Router();

Production.use("/production", VehiclePolicy);
Production.use("/production", FirePolicy);

export default Production;
