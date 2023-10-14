import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import router from "./src/controller";
import path from "path";
import cookieParser from "cookie-parser";

import {
  creatSampleUser,
  createIdSequence,
  creatSampleSubAccount,
  getAcronym,
  createSublineLine,
  createPrefix,
  createCTPLType,
  createPolicyAccount,
  creatCTPLRegistration,
  creatRates,
  createMortgagee
} from "./src/model/StoredProcedure";
import { searchEntry } from "./src/model/Reference/id-entry.model";

const prisma = new PrismaClient();
const PORT = process.env.PORT;

const corsOptions = {
  origin:[ "http://localhost:3000", "http://localhost:4000","/"],
  credentials: true,
  optionSuccessStatus: 200,
};

function executeQuery() {
  // creatSampleUser()
  // createIdSequence()
  // creatSampleSubAccount()
  // createSublineLine()
  // createPrefix()
  // createCTPLType()
  // createPolicyAccount()
  // creatCTPLRegistration()
  // creatRates()
  // createMortgagee()
}

async function main() {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors(corsOptions));
  app.use(express.static(path.join(__dirname, "/static/image/")));
  app.use(express.static(path.join(__dirname, "/src/view")));

  app.get("/test", async (req, res) => {
      res.send({data:await prisma.ctplregistration.findMany()})
  });
  executeQuery();
  app.use("/api", router);
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/src/view/", "index.html"));
  });
  app.listen(PORT, () => console.log(`Listen in port ${PORT}`));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });


