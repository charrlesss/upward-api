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
import { exportToExcel } from "./report-to-excel";
import { ProductionReport } from "../../../model/db/stored-procedured";

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
    const reportString = ProductionReport(
      dateFrom,
      dateTo,
      req.body.account.toUpperCase(),
      req.body.policy,
      req.body.format2 === "All" ? 0 : 1,
      req.body.mortgagee,
      req.body.policyType,
      req.body.sort
    );
    const report = await prisma.$queryRawUnsafe(reportString);
    res.send({
      success: true,
      message: "Successfully get production report ",
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
