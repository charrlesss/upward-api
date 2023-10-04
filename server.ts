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
} from "./src/model/StoredProcedure";
import { searchEntry } from "./src/model/Reference/id-entry.model";

const prisma = new PrismaClient();
const PORT = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

function executeQuery() {
  // creatSampleUser()
  // createIdSequence()
  // creatSampleSubAccount()
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
    // const workbook = new excel.Workbook();
    // const worksheet = workbook.addWorksheet('Sheet 1');
    // worksheet.addRow(['Name', 'Age']);
    // worksheet.addRow(['John Doe', 30]);
    // worksheet.addRow(['Jane Smith', 25]);
  
    // res.setHeader(
    //   'Content-Type',
    //   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    // );
    // res.setHeader(
    //   'Content-Disposition',
    //   'attachment; filename=exported-data.xlsx'
    // );
  
    // workbook.xlsx.write(res).then(function () {
    //   res.end();
    // });
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
