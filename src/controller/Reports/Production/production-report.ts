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
import { ExportToExcel } from "../../../lib/exporttoexcel";

const summary = ["TotalDue"];
const summaryHeader = [
  {
    dataKey: "DateIssued",
    header: "Date Issued",
  },
  {
    header: "Assured Name",
    dataKey: "AssuredName",
  },
  {
    dataKey: "PolicyNo",
    header: "Policy No",
  },
  {
    dataKey: "EffictiveDate",
    header: "Effictive Date",
  },
  {
    dataKey: "InsuredValue",
    header: "Sum Insured",
  },
  {
    dataKey: "Make",
    header: "Make",
  },
  {
    dataKey: "BodyType",
    header: "Body Type",
  },
  {
    dataKey: "PlateNo",
    header: "Plate No",
  },
  {
    dataKey: "ChassisNo",
    header: "Chassis No",
  },
  {
    dataKey: "MotorNo",
    header: "Engine No",
  },
  {
    dataKey: "TotalDue",
    header: "Total Premium",
  },
  {
    dataKey: "Mortgagee",
    header: "Mortgagee",
  },
];
const fullDefaultHeader = [
  {
    dataKey: "DateIssued",
    header: "Date Issued",
  },
  {
    dataKey: "AssuredName",
    header: "Assured Name",
  },
  {
    dataKey: "PolicyNo",
    header: "Policy No",
  },
  {
    dataKey: "EffictiveDate",
    header: "Effictive Date",
  },
  {
    dataKey: "PlateNo",
    header: "Plate No",
  },
  {
    dataKey: "ChassisNo",
    header: "Chassis No",
  },
  {
    dataKey: "MotorNo",
    header: "Engine No",
  },
];
const rptHeaderFull = [
  ...fullDefaultHeader,
  {
    dataKey: "TotalPremium",
    header: "Sub Total",
  },
  {
    dataKey: "DocStamp",
    header: "Doc Stamp",
  },
  {
    dataKey: "Vat",
    header: "Evat",
  },
  {
    dataKey: "LGovTax",
    header: "LGT",
  },
  {
    dataKey: "Misc",
    header: "Other",
  },
  {
    dataKey: "TotalDue",
    header: "Total",
  },
];
const rptHeaderSummary = [
  ...summaryHeader.filter((item) => item.dataKey !== "InsuredValue"),
];
const rptTotalListFull = [
  "TotalPremium",
  "DocStamp",
  "Vat",
  "LGovTax",
  "Misc",
  "TotalDue",
];

const rptTotalListSummary = ["TotalDue"];
const reportHeaders: any = {
  Bonds: {
    full: {
      headers: [
        ...fullDefaultHeader.filter(
          (item) =>
            item.dataKey !== "PlateNo" &&
            item.dataKey !== "ChassisNo" &&
            item.dataKey !== "MotorNo"
        ),
        {
          dataKey: "InsuredValue",
          header: "Insured Value",
        },
        {
          dataKey: "TotalPremium",
          header: "Premium",
        },
        {
          dataKey: "Misc",
          header: "Misc",
        },
        {
          dataKey: "Notarial",
          header: "Notarial Fee",
        },
        {
          dataKey: "DocStamp",
          header: "Doc Stamp",
        },
        {
          dataKey: "Vat",
          header: "EVat",
        },
        {
          dataKey: "LGovTax",
          header: "LGT",
        },
        {
          dataKey: "TotalDue",
          header: "Total",
        },
      ],
      totalList: [
        "InsuredValue",
        "TotalPremium",
        "Misc",
        "Notarial",
        "DocStamp",
        "Vat",
        "LGovTax",
        "TotalDue",
      ],
    },
    summary: {
      headers: [
        {
          dataKey: "DateIssued",
          header: "Date Issued",
        },
        {
          header: "Assured Name",
          dataKey: "AssuredName",
        },
        {
          dataKey: "PolicyNo",
          header: "Policy No",
        },
        {
          dataKey: "EffictiveDate",
          header: "Effictive Date",
        },
        {
          dataKey: "InsuredValue",
          header: "Sum Insured",
        },
        {
          dataKey: "Obligee",
          header: "Obligee",
        },
        {
          dataKey: "TotalDue",
          header: "Total Premium",
        },
      ],
      totalList: ["TotalDue"],
    },
    columnStyles: {
      DateIssued: {
        minCellWidth: 0.7,
      },
      AssuredName: {
        minCellWidth: 1.5,
      },
      PolicyNo: {
        minCellWidth: 0.7,
      },
      EffictiveDate: {
        minCellWidth: 0.7,
      },
      InsuredValue: {
        cellWidth: 0.9,
        halign: "right",
      },
      TotalPremium: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Misc: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Notarial: {
        minCellWidth: 0.7,
        halign: "right",
      },
      DocStamp: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Vat: {
        minCellWidth: 0.7,
        halign: "right",
      },
      LGovTax: {
        minCellWidth: 0.7,
        halign: "right",
      },
      TotalDue: {
        cellWidth: 0.9,
        halign: "right",
      },
      Obligee: {
        minCellWidth: 1.5,
      },
    },
  },
  CGL: {
    full: {
      headers: [
        ...fullDefaultHeader.filter(
          (item) =>
            item.dataKey !== "PlateNo" &&
            item.dataKey !== "ChassisNo" &&
            item.dataKey !== "MotorNo"
        ),
        {
          dataKey: "InsuredValue",
          header: "Insured Value",
        },
        {
          dataKey: "TotalPremium",
          header: "Premium",
        },
        {
          dataKey: "DocStamp",
          header: "DocStamp",
        },
        {
          dataKey: "Vat",
          header: "EVat",
        },
        {
          dataKey: "LGovTax",
          header: "LGT",
        },
        {
          dataKey: "TotalDue",
          header: "TOTAL",
        },
      ],
      totalList: [
        "InsuredValue",
        "TotalPremium",
        "DocStamp",
        "Vat",
        "LGovTax",
        "TotalDue",
      ],
    },
    summary: {
      headers: [
        ...summaryHeader.filter(
          (item) =>
            item.dataKey !== "Make" &&
            item.dataKey !== "BodyType" &&
            item.dataKey !== "PlateNo" &&
            item.dataKey !== "ChassisNo" &&
            item.dataKey !== "MotorNo" &&
            item.dataKey !== "Mortgagee"
        ),
      ],
      totalList: ["TotalDue"],
    },
    columnStyles: {
      DateIssued: {
        minCellWidth: 0.7,
      },
      AssuredName: {
        minCellWidth: 1.5,
      },
      PolicyNo: {
        minCellWidth: 0.7,
      },
      EffictiveDate: {
        minCellWidth: 0.7,
      },
      InsuredValue: {
        cellWidth: 0.9,
        halign: "right",
      },
      TotalPremium: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Misc: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Notarial: {
        minCellWidth: 0.7,
        halign: "right",
      },
      DocStamp: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Vat: {
        minCellWidth: 0.7,
        halign: "right",
      },
      LGovTax: {
        minCellWidth: 0.7,
        halign: "right",
      },
      TotalDue: {
        cellWidth: 1,
        halign: "right",
      },
    },
  },
  COM: {
    full: {
      headers: [
        ...fullDefaultHeader,
        {
          dataKey: "InsuredValue",
          header: "Sum Insured",
        },
        {
          dataKey: "PLimit",
          header: "LD Premium",
        },
        {
          dataKey: "Sec4A",
          header: "ETPL BI Premium",
        },
        {
          dataKey: "Sec4B",
          header: "PD Premium",
        },
        {
          dataKey: "Sec4C",
          header: "PAR Premium",
        },
        {
          dataKey: "TotalPremium",
          header: "Sub Total",
        },
        {
          dataKey: "DocStamp",
          header: "Doc Stamp",
        },
        {
          dataKey: "Vat",
          header: "Evat",
        },
        {
          dataKey: "LGovTax",
          header: "LGT",
        },
        {
          dataKey: "TotalDue",
          header: "Total",
        },
      ],
      totalList: [
        "InsuredValue",
        "PLimit",
        "Sec4A",
        "Sec4B",
        "Sec4C",
        "TotalPremium",
        "DocStamp",
        "Vat",
        "LGovTax",
        "TotalDue",
      ],
    },
    summary: {
      headers: summaryHeader,
      totalList: ["TotalDue"],
    },
    columnStyles: {
      DateIssued: {
        minCellWidth: 0.7,
      },
      AssuredName: {
        minCellWidth: 1.2,
      },
      PolicyNo: {
        minCellWidth: 0.7,
      },
      EffictiveDate: {
        minCellWidth: 0.7,
      },
      PlateNo: {
        minCellWidth: 0.6,
      },
      ChassisNo: {
        minCellWidth: 0.6,
      },
      MotorNo: {
        minCellWidth: 0.6,
      },
      InsuredValue: {
        minCellWidth: 0.9,
        halign: "right",
      },
      PLimit: {
        minCellWidth: 0.9,
        halign: "right",
      },
      Sec4A: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Sec4B: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Sec4C: {
        minCellWidth: 0.7,
        halign: "right",
      },
      TotalPremium: {
        minCellWidth: 0.7,
        halign: "right",
      },
      DocStamp: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Misc: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Vat: {
        minCellWidth: 0.7,
        halign: "right",
      },
      LGovTax: {
        minCellWidth: 0.7,
        halign: "right",
      },
      TotalDue: {
        minCellWidth: 0.9,
        halign: "right",
      },
    },
  },
  FIRE: {
    full: {
      headers: [
        ...fullDefaultHeader.filter(
          (item) =>
            item.dataKey !== "PlateNo" &&
            item.dataKey !== "ChassisNo" &&
            item.dataKey !== "MotorNo"
        ),
        {
          dataKey: "InsuredValue",
          header: "Insured Value",
        },
        {
          dataKey: "TotalPremium",
          header: "Premium",
        },
        {
          dataKey: "DocStamp",
          header: "Doc Stamp",
        },
        {
          dataKey: "FireTax",
          header: "F.S. TAX",
        },
        {
          dataKey: "Vat",
          header: "EVAT",
        },
        {
          dataKey: "LGovTax",
          header: "LGT",
        },
        {
          dataKey: "TotalDue",
          header: "Total",
        },
      ],
      totalList: [
        "InsuredValue",
        "TotalPremium",
        "DocStamp",
        "FireTax",
        "Vat",
        "LGovTax",
        "TotalDue",
      ],
    },
    summary: {
      headers: [
        ...summaryHeader.filter(
          (item) =>
            item.dataKey !== "Make" &&
            item.dataKey !== "BodyType" &&
            item.dataKey !== "PlateNo" &&
            item.dataKey !== "ChassisNo" &&
            item.dataKey !== "MotorNo" &&
            item.dataKey !== "Mortgagee"
        ),
      ],
      totalList: summary,
    },
    columnStyles: {
      DateIssued: {
        minCellWidth: 0.7,
      },
      AssuredName: {
        minCellWidth: 1.5,
      },
      PolicyNo: {
        minCellWidth: 0.7,
      },
      EffictiveDate: {
        minCellWidth: 0.7,
      },
      InsuredValue: {
        cellWidth: 0.9,
        halign: "right",
      },
      TotalPremium: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Misc: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Notarial: {
        minCellWidth: 0.7,
        halign: "right",
      },
      FireTax: {
        minCellWidth: 0.7,
        halign: "right",
      },
      DocStamp: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Vat: {
        minCellWidth: 0.7,
        halign: "right",
      },
      LGovTax: {
        minCellWidth: 0.7,
        halign: "right",
      },
      TotalDue: {
        cellWidth: 1,
        halign: "right",
      },
    },
  },
  MAR: {
    full: {
      headers: [
        ...fullDefaultHeader.filter(
          (item) =>
            item.dataKey !== "PlateNo" &&
            item.dataKey !== "ChassisNo" &&
            item.dataKey !== "MotorNo"
        ),
        {
          dataKey: "InsuredValue",
          header: "Insured Value",
        },
        {
          dataKey: "TotalPremium",
          header: "Premium",
        },
        {
          dataKey: "DocStamp",
          header: "Doc Stamp",
        },
        {
          dataKey: "Vat",
          header: "EVat",
        },
        {
          dataKey: "LGovTax",
          header: "LGT",
        },
        {
          dataKey: "TotalDue",
          header: "Total",
        },
      ],
      totalList: [
        "InsuredValue",
        "TotalPremium",
        "DocStamp",
        "Vat",
        "LGovTax",
        "TotalDue",
      ],
    },
    summary: {
      headers: [
        ...summaryHeader.filter(
          (item) =>
            item.dataKey !== "PlateNo" &&
            item.dataKey !== "ChassisNo" &&
            item.dataKey !== "MotorNo" &&
            item.dataKey !== "Make" &&
            item.dataKey !== "BodyType" &&
            item.dataKey !== "Mortgagee"
        ),
      ],
      totalList: ["TotalDue"],
    },
    columnStyles: {
      DateIssued: {
        minCellWidth: 0.7,
      },
      AssuredName: {
        minCellWidth: 1.2,
      },
      PolicyNo: {
        minCellWidth: 0.7,
      },
      EffictiveDate: {
        minCellWidth: 0.7,
      },
      PlateNo: {
        minCellWidth: 0.6,
      },
      ChassisNo: {
        minCellWidth: 0.6,
      },
      MotorNo: {
        minCellWidth: 0.6,
      },
      InsuredValue: {
        cellWidth: 1,
        halign: "right",
      },
      PLimit: {
        minCellWidth: 0.9,
        halign: "right",
      },
      Sec4A: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Sec4B: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Sec4C: {
        minCellWidth: 0.7,
        halign: "right",
      },
      TotalPremium: {
        minCellWidth: 0.7,
        halign: "right",
      },
      DocStamp: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Vat: {
        minCellWidth: 0.7,
        halign: "right",
      },
      LGovTax: {
        minCellWidth: 0.7,
        halign: "right",
      },
      TotalDue: {
        cellWidth: 1,
        halign: "right",
      },
    },
  },
  MSPR: {
    full: {
      headers: [
        ...fullDefaultHeader.filter(
          (item) =>
            item.dataKey !== "PlateNo" &&
            item.dataKey !== "ChassisNo" &&
            item.dataKey !== "MotorNo"
        ),
        {
          dataKey: "InsuredValue",
          header: "Insured Value",
        },
        {
          dataKey: "TotalPremium",
          header: "Premium",
        },
        {
          dataKey: "DocStamp",
          header: "Doc Stamp",
        },
        {
          dataKey: "Vat",
          header: "EVat",
        },
        {
          dataKey: "LGovTax",
          header: "LGT",
        },
        {
          dataKey: "TotalDue",
          header: "Total",
        },
      ],
      totalList: [
        "InsuredValue",
        "TotalPremium",
        "DocStamp",
        "Vat",
        "LGovTax",
        "TotalDue",
      ],
    },
    summary: {
      headers: [
        ...summaryHeader.filter(
          (item) =>
            item.dataKey !== "PlateNo" &&
            item.dataKey !== "ChassisNo" &&
            item.dataKey !== "MotorNo" &&
            item.dataKey !== "Make" &&
            item.dataKey !== "BodyType" &&
            item.dataKey !== "Mortgagee"
        ),
      ],
      totalList: ["TotalDue"],
    },
    columnStyles: {
      DateIssued: {
        minCellWidth: 0.7,
      },
      AssuredName: {
        minCellWidth: 1.2,
      },
      PolicyNo: {
        minCellWidth: 0.7,
      },
      EffictiveDate: {
        minCellWidth: 0.7,
      },
      PlateNo: {
        minCellWidth: 0.6,
      },
      ChassisNo: {
        minCellWidth: 0.6,
      },
      MotorNo: {
        minCellWidth: 0.6,
      },
      InsuredValue: {
        cellWidth: 1,
        halign: "right",
      },
      PLimit: {
        minCellWidth: 0.9,
        halign: "right",
      },
      Sec4A: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Sec4B: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Sec4C: {
        minCellWidth: 0.7,
        halign: "right",
      },
      TotalPremium: {
        minCellWidth: 0.7,
        halign: "right",
      },
      DocStamp: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Vat: {
        minCellWidth: 0.7,
        halign: "right",
      },
      LGovTax: {
        minCellWidth: 0.7,
        halign: "right",
      },
      TotalDue: {
        cellWidth: 1,
        halign: "right",
      },
    },
  },
  PA: {
    full: {
      headers: [
        ...fullDefaultHeader.filter(
          (item) =>
            item.dataKey !== "PlateNo" &&
            item.dataKey !== "ChassisNo" &&
            item.dataKey !== "MotorNo"
        ),
        {
          dataKey: "InsuredValue",
          header: "Insured Value",
        },
        {
          dataKey: "TotalPremium",
          header: "Premium",
        },
        {
          dataKey: "DocStamp",
          header: "Doc Stamp",
        },
        {
          dataKey: "Vat",
          header: "EVat",
        },
        {
          dataKey: "LGovTax",
          header: "LGT",
        },
        {
          dataKey: "TotalDue",
          header: "Total",
        },
      ],
      totalList: [
        "InsuredValue",
        "TotalPremium",
        "DocStamp",
        "Vat",
        "LGovTax",
        "TotalDue",
      ],
    },
    summary: {
      headers: [
        ...summaryHeader.filter(
          (item) =>
            item.dataKey !== "PlateNo" &&
            item.dataKey !== "ChassisNo" &&
            item.dataKey !== "MotorNo" &&
            item.dataKey !== "Make" &&
            item.dataKey !== "BodyType" &&
            item.dataKey !== "Mortgagee"
        ),
      ],
      totalList: ["TotalDue"],
    },
    columnStyles: {
      DateIssued: {
        minCellWidth: 0.7,
      },
      AssuredName: {
        minCellWidth: 1.2,
      },
      PolicyNo: {
        minCellWidth: 0.7,
      },
      EffictiveDate: {
        minCellWidth: 0.7,
      },
      PlateNo: {
        minCellWidth: 0.6,
      },
      ChassisNo: {
        minCellWidth: 0.6,
      },
      MotorNo: {
        minCellWidth: 0.6,
      },
      InsuredValue: {
        cellWidth: 1,
        halign: "right",
      },
      PLimit: {
        minCellWidth: 0.9,
        halign: "right",
      },
      Sec4A: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Sec4B: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Sec4C: {
        minCellWidth: 0.7,
        halign: "right",
      },
      TotalPremium: {
        minCellWidth: 0.7,
        halign: "right",
      },
      DocStamp: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Vat: {
        minCellWidth: 0.7,
        halign: "right",
      },
      LGovTax: {
        minCellWidth: 0.7,
        halign: "right",
      },
      TotalDue: {
        cellWidth: 1,
        halign: "right",
      },
    },
  },
  TPL: {
    full: {
      headers: [
        {
          dataKey: "DateIssued",
          header: "Date Issued",
        },
        {
          dataKey: "AssuredName",
          header: "Assured Name",
        },
        {
          dataKey: "PolicyNo",
          header: "Policy No",
        },
        {
          dataKey: "CoverNo",
          header: "COC No",
        },
        {
          dataKey: "EffictiveDate",
          header: "Effictive Date",
        },
        {
          dataKey: "InsuredValue",
          header: "Tpl Coverage",
        },
        {
          dataKey: "TotalPremium",
          header: "Premium",
        },
        {
          dataKey: "DocStamp",
          header: "Doc Stamp",
        },
        {
          dataKey: "Vat",
          header: "EVat",
        },
        {
          dataKey: "LGovTax",
          header: "LGT",
        },
        {
          dataKey: "Misc",
          header: "Strad Com",
        },
        {
          dataKey: "TotalDue",
          header: "Total",
        },
      ],
      totalList: [
        "InsuredValue",
        "TotalPremium",
        "DocStamp",
        "Vat",
        "LGovTax",
        "Misc",
        "TotalDue",
      ],
    },
    summary: {
      headers: summaryHeader,
      totalList: summary,
    },
    columnStyles: {
      DateIssued: {
        minCellWidth: 0.7,
      },
      AssuredName: {
        minCellWidth: 1.2,
      },
      PolicyNo: {
        minCellWidth: 0.7,
      },
      COC: {
        minCellWidth: 0.7,
      },
      EffictiveDate: {
        minCellWidth: 0.7,
      },
      PlateNo: {
        minCellWidth: 0.6,
      },
      ChassisNo: {
        minCellWidth: 0.6,
      },
      MotorNo: {
        minCellWidth: 0.6,
      },
      InsuredValue: {
        minCellWidth: 0.9,
        halign: "right",
      },
      PLimit: {
        minCellWidth: 0.9,
        halign: "right",
      },
      Sec4A: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Sec4B: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Sec4C: {
        minCellWidth: 0.7,
        halign: "right",
      },
      TotalPremium: {
        minCellWidth: 0.7,
        halign: "right",
      },
      DocStamp: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Vat: {
        minCellWidth: 0.7,
        halign: "right",
      },
      LGovTax: {
        minCellWidth: 0.7,
        halign: "right",
      },
      Misc: {
        minCellWidth: 0.7,
        halign: "right",
      },
      TotalDue: {
        minCellWidth: 0.9,
        halign: "right",
      },
    },
  },
};

const ProductionReports = express.Router();
const prisma = new PrismaClient();

ProductionReports.post("/production-report", async (req, res) => {
  handleReportRequest(req, res, (report: any) => {
    res.send({
      message: "get report successfully",
      success: true,
      report,
    });
  });
});

ProductionReports.post("/production-report-to-excel", async (req, res) => {
  const { policy, format1 } = req.body;
  handleReportRequest(req, res, (report: any) => {
    ExportToExcel(
      mapDataBasedOnHeaders(
        reportHeaders[policy][format1.toLowerCase()].headers,
        report
      ),
      res
    );
  });
});

async function handleReportRequest(
  req: Request,
  res: Response,
  cb: CallableFunction
) {
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
    cb(report);
  } catch (err: any) {
    res.send({ message: "SERVER ERROR", success: false, report: [] });
  }
}

export function mapDataBasedOnHeaders(
  header: Array<any>,
  dataArray: Array<any>
) {
  const headerRow = header.map((item: any) => item.header);
  const rowKeys = header.map((item: any) => item.dataKey);
  const mappedData = dataArray.map((dataItem) => {
    return rowKeys.map((key: any) => dataItem[key]);
  });
  return [headerRow, ...mappedData];
}
export default ProductionReports;
