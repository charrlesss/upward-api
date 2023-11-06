import express from "express";
import ProductionReports from "./production-reports";


const Reports = express.Router();

Reports.use('/reports',ProductionReports)


export default Reports