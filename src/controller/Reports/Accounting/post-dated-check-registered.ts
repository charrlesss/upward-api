import { PrismaClient } from "@prisma/client";
import express from "express";
import { PostDatedCheckRegistered } from "../../../model/db/stored-procedured";

const PostDatedCheckRegister = express.Router();
const prisma = new PrismaClient();

PostDatedCheckRegister.post(
  "/post-dated-check-registered",
  async (req, res) => {
    try {
      const qry = PostDatedCheckRegistered(
        "Name",
        "Ascending",
        "All",
        "Check Date",
        "ALL",
        new Date(),
        new Date()
      );
      res.send({
        message: "Successfully Get Report",
        success: true,
        qry,
      });
    } catch (err: any) {
      console.log(err.message);
      res.send({
        message: err.message,
        success: false,
        report: [],
      });
    }
  }
);

export default PostDatedCheckRegister;
