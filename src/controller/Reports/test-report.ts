import { PrismaClient } from "@prisma/client";
import express from "express";
import { createJournal } from "../../model/Task/Production/vehicle-policy";
import { addCTPL } from "../../model/Reference/ctpl.model";
import generateUniqueUUID from "../../lib/generateUniqueUUID";

const testReport = express.Router();
const prisma = new PrismaClient();

testReport.post("/add-journal", async (req, res) => {
  const data = JSON.parse(req.body.dataString)[0];
  console.log(`data :${req.body.count} :`, req.body.dataString);
  await prisma.journal.create({
    data: {
      ...data,
      Source_No_Ref_ID: "",
    },
  });

  res.send({
    message: "test Report",
    vehiclePolicy: [],
  });
});

function getZeroFirstInput(data: string) {
  let addZeroFromSeries = "";
  for (let i = 0; i < data.length; i++) {
    if (data.charAt(i) === "0") {
      addZeroFromSeries += "0";
    } else {
      break;
    }
  }
  return addZeroFromSeries;
}
testReport.post("/ctpl-registration", async (req, res) => {
  const data = JSON.parse(req.body.dataString)[0];
  delete data.CreatedDate;
  const ctplID = await generateUniqueUUID("ctplregistration", "ctplId");
  console.log(data);

  await addCTPL({
    ...data,
    ctplId: ctplID,
  });

  res.send({ message: "qweqwe" });
});
testReport.post("/add-policy", async (req, res) => {
  const data = JSON.parse(req.body.dataString);
  console.log(`data :${req.body.count} :`, req.body.dataString);
  await prisma.policy.create({
    data: {
      ...data[0],
    },
  });

  res.send({
    message: "test Report",
    vehiclePolicy: [],
  });
});
testReport.post("/add-vpolicy", async (req, res) => {
  const data = JSON.parse(req.body.dataString);
  console.log(`data :${req.body.count} :`, req.body.dataString);
  await prisma.vpolicy.create({
    data: {
      ...data[0],
    },
  });

  res.send({
    message: "test Report",
    vehiclePolicy: [],
  });
});
testReport.post("/add-fpolicy", async (req, res) => {
  const data = JSON.parse(req.body.dataString);
  console.log(`data :${req.body.count} :`, req.body.dataString);
  await prisma.fpolicy.create({
    data: {
      ...data[0],
    },
  });

  res.send({
    message: "test Report",
    vehiclePolicy: [],
  });
});
testReport.post("/add-papolicy", async (req, res) => {
  const data = JSON.parse(req.body.dataString);
  console.log(`data :${req.body.count} :`, req.body.dataString);
  await prisma.papolicy.create({
    data: {
      ...data[0],
    },
  });

  res.send({
    message: "test Report",
    vehiclePolicy: [],
  });
});
testReport.post("/add-msprpolicy", async (req, res) => {
  const data = JSON.parse(req.body.dataString);
  console.log(`data :${req.body.count} :`, req.body.dataString);
  await prisma.msprpolicy.create({
    data: {
      ...data[0],
    },
  });

  res.send({
    message: "test Report",
    vehiclePolicy: [],
  });
});
testReport.post("/add-bpolicy", async (req, res) => {
  const data = JSON.parse(req.body.dataString);
  console.log(`data :${req.body.count} :`, req.body.dataString);
  await prisma.bpolicy.create({
    data: {
      ...data[0],
    },
  });

  res.send({
    message: "test Report",
    vehiclePolicy: [],
  });
});
testReport.post("/add-mpolicy", async (req, res) => {
  const data = JSON.parse(req.body.dataString);
  console.log(`data :${req.body.count} :`, req.body.dataString);
  await prisma.mpolicy.create({
    data: {
      ...data[0],
    },
  });

  res.send({
    message: "test Report",
    vehiclePolicy: [],
  });
});
testReport.post("/add-cglpolicy", async (req, res) => {
  const data = JSON.parse(req.body.dataString);
  console.log(`data :${req.body.count} :`, req.body.dataString);
  await prisma.cglpolicy.create({
    data: {
      ...data[0],
    },
  });

  res.send({
    message: "test Report",
    vehiclePolicy: [],
  });
});
testReport.post("/add-chart-account", async (req, res) => {
  const data = JSON.parse(req.body.dataString);
  await prisma.chart_account.create({
    data: {
      ...data[0],
    },
  });

  res.send({
    message: "test Report",
    vehiclePolicy: [],
  });
});
testReport.post("/add-transaction-code", async (req, res) => {
  const data = JSON.parse(req.body.dataString);
  await prisma.transaction_code.create({
    data: {
      ...data[0],
    },
  });

  res.send({
    message: "test Report",
    vehiclePolicy: [],
  });
});
testReport.post("/add-bankaccounts", async (req, res) => {
  const data = JSON.parse(req.body.dataString);
  await prisma.bankaccounts.create({
    data: {
      ...data[0],
    },
  });

  res.send({
    message: "test Report",
    vehiclePolicy: [],
  });
});

testReport.post("/add-pettycash", async (req, res) => {
  const data = JSON.parse(req.body.dataString);
  await prisma.petty_log.create({
    data: {
      ...data[0],
    },
  });

  res.send({
    message: "test Report",
    vehiclePolicy: [],
  });
});

export default testReport;
