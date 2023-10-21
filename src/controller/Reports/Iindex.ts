import express from "express";
import ReportsVehiclePolicy from "./vehicle-policy.report";


const Reports = express.Router();

Reports.use('/reports',ReportsVehiclePolicy)


export default Reports