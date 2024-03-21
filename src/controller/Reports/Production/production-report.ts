import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import {
  format,
  startOfMonth,
  endOfMonth,
  addYears,
  endOfYear,
  startOfYear,
} from "date-fns";
import { mapColumnsToKeys } from "./report-fields";
import { exportToExcel } from "./report-to-excel";

const ProductionReports = express.Router();
const prisma = new PrismaClient();

ProductionReports.post("/get-production-report", async (req, res) => {
  try {
    let dateFrom = "";
    let dateTo = "";
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
      success: true,
      message: "successfully get production report ",
      report,
    });
  } catch (err: any) {
    res.send({ message: "SERVER ERROR", success: false, report: [] });
  }
});

ProductionReports.post("/export-excel-production-report", async (req, res) => {
  exportToExcel({
    req,
    res,
    callback({
      state,
      header,
      rowLengthTextDisplayIndex,
      sheet,
      sendFile,
      letterList,
    }) {
      const signaturesTextDispkayIndex = rowLengthTextDisplayIndex + 3;

      sheet.mergeCells(
        `A${signaturesTextDispkayIndex}:${
          letterList[header.length - 1]
        }${signaturesTextDispkayIndex}`
      );
      sheet.getCell(`A${signaturesTextDispkayIndex}`).value =
        state.format1 === "Summary"
          ? "                                                Prepared By:"
          : "Prepared By:                                                                                                     Checked By:                                                                                                                     Noted By:";
      sheet.getCell(`A${signaturesTextDispkayIndex}`).style = {
        alignment: {
          horizontal: state.format1 === "Summary" ? "left" : "center",
        },
        font: { bold: true, size: 10.5 },
      };

      sendFile();
    },
    onEachCell({
      rowLengthTextDisplayIndex,
      rowIndex,
      header,
      colIndex,
      cell,
      rowStartedIndex,
    }) {
      const signaturesTextDispkayIndex = rowLengthTextDisplayIndex + 3;
      if (
        rowIndex < signaturesTextDispkayIndex &&
        rowIndex !== rowStartedIndex
      ) {
        if (header[colIndex - 1]?.type === "number") {
          cell.alignment = { horizontal: "right", vertical: "middle" };
        } else {
          cell.alignment = { horizontal: "left", vertical: "middle" };
        }
      }
    },
  });
});
export default ProductionReports;
