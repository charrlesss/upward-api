import { PrismaClient } from "@prisma/client";
import express from "express";
import { format } from "date-fns";
import { mapColumnsToKeys } from "./report-fields";

const RenewalReport = express.Router();
const prisma = new PrismaClient();

RenewalReport.post("/renewal-notice", async (req, res) => {
    let { dateFrom, policy, type, account } = req.body;
    let tableCol: any = [];
    policy = policy.toUpperCase();
  
    if (policy === "COM") {
      tableCol = [
        "AssuredName",
        "PolicyNo",
        "Expiration",
        "InsuredValue",
        "Make",
        "BodyType",
        "PlateNo",
        "ChassisNo",
        "MotorNo",
        "TotalPremium",
        "Mortgagee",
      ];
    } else if (policy === "FIRE") {
      tableCol = [
        "AssuredName",
        "PolicyNo",
        "Expiration",
        "InsuredValue",
        "TotalPremium",
        "Mortgage",
      ];
    } else if (policy === "MAR") {
      tableCol = [
        "AssuredName",
        "PolicyNo",
        "Expiration",
        "InsuredValue",
        "TotalPremium",
      ];
    } else if (policy === "PA") {
      tableCol = ["AssuredName", "PolicyNo", "Expiration", "TotalPremium"];
    }
  
    const query = `call renewal_report('${format(
      new Date(dateFrom),
      "yyyy-MM-dd"
    )}','${policy}','${type}','${account}');`;
    console.log(query);
    const report: any = await prisma.$queryRawUnsafe(query);
    const data = mapColumnsToKeys(tableCol, report);
    res.send({
      report: data,
    });
  });
export default RenewalReport