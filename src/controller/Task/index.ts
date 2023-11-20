import express from "express";
import Production from "./Production";
import Accounting from "./Accounting";

const Task = express.Router();

Task.use("/task/", Production);
Task.use("/task/", Accounting);

export default Task;
