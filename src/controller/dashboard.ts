import express from "express";
const Dashboard = express.Router();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

Dashboard.get("/get-renewal-this-month", async (req, res) => {
  try {
    let qry = "";
    function table(policy: string) {
      if (policy === "TPL") {
        return "vpolicy";
      } else if (policy === "COM") {
        return "vpolicy";
      } else if (policy === "FIRE") {
        return "fpolicy";
      } else if (policy === "MAR") {
        return "mpolicy";
      } else if (policy === "PA") {
        return "papolicy";
      } else if (policy === "CGL") {
        return "cglpolicy";
      } else {
        return "vpolicy";
      }
    }
    const renewalData = ["TPL", "COM", "FIRE", "MAR", "PA", "CGL"].map(
      async (el) => {
        qry = `
        SELECT 
            if('${el}' = 'COM' OR '${el}' = 'TPL','1' ,'0') as isVPolicy,
            '${el}' as  header,
            concat(c.lastname,' ', c.firstname,' ',c.middlename) as AssuredName,
            a.PolicyNo,
            ${
              el === "TPL" || el === "COM"
                ? "format(b.EstimatedValue,2) as InsuredValue"
                : el === "PA" || el === "CGL"
                ? "format(b.sumInsured,2) as InsuredValue"
                : "format(b.InsuredValue,2) as InsuredValue"
            },
            ${
              el === "COM" || el === "TPL"
                ? " ifnull(concat(b.Model,' ',b.Make,' ',b.BodyType),'') as unit "
                : "'' as unit "
            },
            ${
              el === "COM" || el === "TPL"
                ? "ifnull(b.ChassisNo,'') as ChassisNo"
                : "'' as ChassisNo"
            },
            date_format(${
              el === "PA" || el === "CGL" ? "b.PeriodTo " : "b.DateTo"
            },'%m/%d/%Y') as DateExpired
        FROM
            upward_insurance.policy a
            LEFT JOIN
            upward_insurance.${table(el)} b ON a.PolicyNo = b.PolicyNo
            LEFT JOIN
            upward_insurance.entry_client c ON a.IDNo = c.entry_client_id
            where
            a.PolicyType = '${el}' and 
            date_format(${
              el === "PA" || el === "CGL" ? "b.PeriodTo " : "b.DateTo"
            },'%Y-%m-%d') between DATE_SUB(LAST_DAY(now()), INTERVAL DAY(LAST_DAY(now())) - 1 DAY) and LAST_DAY(DATE_ADD(now(), INTERVAL 1 MONTH)) 
            ${el === "TPL" ? " and  b.Mortgagee = 'N I L' " : ""}
        `;
        const data = (await prisma.$queryRawUnsafe(qry)) as Array<any>;
        if (data.length > 0) {
          data.unshift({
            header: el === "COM" ? "COMPREHENSIVE" : el,
            AssuredName: "",
            PolicyNo: "",
            unit: "",
            ChassisNo: "",
            DateExpired: "",
            isHeader: true,
            isVPolicy: el === "COM" || el === "TPL" ? "1" : "0",
          });
        }

        return data;
      }
    );
    Promise.all(renewalData).then((results) => {
      res.send({
        message: `Successfully Get Renewal This Month`,
        success: true,
        renewal: results.flat(),
      });
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

export default Dashboard;
