import { PrismaClient } from "@prisma/client";
import express from "express";

const testReport = express.Router();
const prisma = new PrismaClient({datasources:{db:{url:"mysql://root:Upward%232023@localhost:3306/upward"}}});

testReport.get("/test-report", async (req, res) => {
    
    res.send({
      message: "test Report",
      vehiclePolicy:[]
    });
  });

  export default testReport