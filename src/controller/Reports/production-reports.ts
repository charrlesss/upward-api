import { PrismaClient } from "@prisma/client";
import express from "express";

const ProductionReports = express.Router();
const prisma = new PrismaClient();

ProductionReports.post("/production-report", async (req, res) => {
  if (req.body.format1 === "summary") {
    return res.send({
      message: "Production Report",
      vehiclePolicy: [],
    });
  }
  res.send({
    message: "Production Report",
    vehiclePolicy: await prisma.$queryRawUnsafe(`
    SELECT 
    DATE_FORMAT(a.DateIssued,'%m/%d/%Y') as DateIssued,
    
    concat(c.lastname,c.firstname,c.middlename) as fullname,
    a.PolicyNo,
    b.CoverNo,
     DATE_FORMAT(b.DateTo,'%m/%d/%Y') as DateTo,
     b.PremiumPaid,
    a.TotalPremium,
    a.DocStamp,
    a.Vat,
    a.LGovTax,
    a.Misc,
    a.TotalDue
FROM
    upward.policy a
        LEFT JOIN
    upward.vpolicy b ON a.PolicyNo = b.PolicyNo
        LEFT JOIN
    upward.entry_client c ON a.IDNo = c.entry_client_id
    group by a.PolicyNo
    `),
  });
});

ProductionReports.post("/rpt-report", async (req, res) => {
  if (req.body.format === "summary") {
    return res.send({
      message: "Production Report",
      vehiclePolicy: [],
    });
  }
  res.send({
    message: "Production Report",
    vehiclePolicy: await prisma.$queryRawUnsafe(`
    SELECT 
    DATE_FORMAT(a.DateIssued,'%m/%d/%Y') as DateIssued,
    
    concat(c.lastname,c.firstname,c.middlename) as fullname,
    a.PolicyNo,
    b.CoverNo,
     DATE_FORMAT(b.DateTo,'%m/%d/%Y') as DateTo,
     b.PremiumPaid,
    a.TotalPremium,
    a.DocStamp,
    a.Vat,
    a.LGovTax,
    a.Misc,
    a.TotalDue
FROM
    upward.policy a
        LEFT JOIN
    upward.vpolicy b ON a.PolicyNo = b.PolicyNo
        LEFT JOIN
    upward.entry_client c ON a.IDNo = c.entry_client_id
    group by a.PolicyNo
    `),
  });
});
ProductionReports.post("/renewal-notice", async (req, res) => {
  if (req.body.format === "summary") {
    return res.send({
      message: "Production Report",
      vehiclePolicy: [],
    });
  }
  res.send({
    message: "Production Report",
    vehiclePolicy: await prisma.$queryRawUnsafe(`
    SELECT 
    DATE_FORMAT(a.DateIssued,'%m/%d/%Y') as DateIssued,
    
    concat(c.lastname,c.firstname,c.middlename) as fullname,
    a.PolicyNo,
    b.CoverNo,
     DATE_FORMAT(b.DateTo,'%m/%d/%Y') as DateTo,
     b.PremiumPaid,
    a.TotalPremium,
    a.DocStamp,
    a.Vat,
    a.LGovTax,
    a.Misc,
    a.TotalDue
FROM
    upward.policy a
        LEFT JOIN
    upward.vpolicy b ON a.PolicyNo = b.PolicyNo
        LEFT JOIN
    upward.entry_client c ON a.IDNo = c.entry_client_id
    group by a.PolicyNo
    `),
  });
});


export default ProductionReports;
