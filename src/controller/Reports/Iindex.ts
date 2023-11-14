import express from "express";
import ProductionReports from "./production-reports";
import testReport from "./test-report";


const Reports = express.Router();

Reports.use('/reports',ProductionReports)



export default Reports