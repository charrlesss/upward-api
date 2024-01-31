import express from "express";
import ProductionReports from "./Production/production-report";
import RenewalReport from "./Production/renewal-report";
import ReportFields from "./Production/report-fields";


const Reports = express.Router();

Reports.use('/reports',ProductionReports)
Reports.use('/reports',RenewalReport)
Reports.use('/reports',ReportFields)



export default Reports