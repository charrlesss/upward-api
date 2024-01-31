import { PrismaClient } from "@prisma/client";
import express from "express";
import {
  format,
  startOfMonth,
  endOfMonth,
  addYears,
  endOfYear,
  startOfYear,
} from "date-fns";
import { mapColumnsToKeys } from "./report-fields";

const ProductionReports = express.Router();
const prisma = new PrismaClient();

ProductionReports.post("/production-report", async (req, res) => {
  try {
    let dateFrom = "",
      dateTo = "";
    if (req.body.report === "Daily") {
      dateFrom = format(new Date(req.body.dateFrom), "yyyy-MM-dd");
      dateTo = format(new Date(req.body.dateFrom), "yyyy-MM-dd");
    }
    if (req.body.report === "Monthly") {
      const currentDate = new Date(req.body.dateFrom);
      dateFrom = format(startOfMonth(currentDate), "yyyy-MM-dd");
      dateTo = format(endOfMonth(currentDate), "yyyy-MM-dd");
    }
    if (req.body.report === "Yearly") {
      const currentDate = new Date(req.body.dateFrom);

      dateFrom = format(startOfYear(startOfMonth(currentDate)), "yyyy-MM-dd");
      dateTo = format(
        endOfMonth(
          endOfYear(addYears(currentDate, parseInt(req.body.yearCount)))
        ),
        "yyyy-MM-dd"
      );
    }
    if (req.body.report === "Custom") {
      dateFrom = format(new Date(req.body.dateFrom), "yyyy-MM-dd");
      dateTo = format(new Date(req.body.dateTo), "yyyy-MM-dd");
    }

    const reportString = `CALL ProductionReport('${dateFrom}','${dateTo}','${
      req.body.account
    }','${req.body.policy}', ${req.body.format2 === "All" ? 0 : 1}, '${
      req.body.mortgagee
    }', '${req.body.policyType}', '${req.body.sort}')`;
    console.log(reportString);
    const data = await prisma.$queryRawUnsafe(reportString);
    const dataCol = [
      "Mortgagee",
      "IDNo",
      "AssuredName",
      "Account",
      "PolicyType",
      "PolicyNo",
      "DateIssued",
      "TotalPremium",
      "Vat",
      "DocStamp",
      "FireTax",
      "LGovTax",
      "Notarial",
      "Misc",
      "TotalDue",
      "TotalPaid",
      "Discount",
      "Sec4A",
      "Sec4B",
      "Sec4C",
      "EffictiveDate",
      "PLimit",
      "InsuredValue",
      "CoverNo",
      "Remarks",
      "EstimatedValue",
      "Make",
      "BodyType",
      "PlateNo",
      "ChassisNo",
      "MotorNo",
      "Mortgagee",
      "Obligee",
    ];
    const report = mapColumnsToKeys(dataCol, data);

    res.send({
      message: "get report successfully",
      success: false,
      report,
    });
  } catch (err: any) {
    res.send({ message: "SERVER ERROR", success: false, report: [] });
  }
});

export default ProductionReports;
