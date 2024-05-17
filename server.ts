import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import cors from "cors";
import router from "./src/controller";
import path from "path";
import cookieParser from "cookie-parser";
import { sampleVPolicy } from "./src/controller/Task/Production/vehiclepolicy";

// import { createsampleData ,creatSampleUser } from "./src/model/StoredProcedure";

const prisma = new PrismaClient();
const PORT = process.env.PORT;

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:4000", "/"],
  // origin:"*",
  credentials: true,
  optionSuccessStatus: 200,
};

async function main() {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({limit: '1000mb'}));
  app.use(cookieParser());
  app.use(cors(corsOptions));
  app.use(express.static(path.join(__dirname, "static")));
  app.use(express.static(path.join(__dirname, "/static/image/")));
  app.use(express.static(path.join(__dirname, "/src/view")));
  app.get("/testing-query", (req: Request, res: Response) => {
    sampleVPolicy();
    res.send({
      test: "success",
    });
  });
  app.use("/api", router);
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/src/view/", "index.html"));
  });
  // createsampleData()
  // creatSampleUser()

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
