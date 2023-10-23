import express from "express";
import VehiclePolicy from "./vehiclepolicy";
import FirePolicy from "./firepolicy";
import MarinePolicy from "./marinepolicy";
import BondPolicy from "./bondpolicy";

const Production = express.Router();

Production.use("/production", VehiclePolicy);
Production.use("/production", FirePolicy);
Production.use("/production", MarinePolicy);
Production.use("/production", BondPolicy);

export default Production;
