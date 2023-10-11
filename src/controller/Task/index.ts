import express from "express";
import Production from "./Production";

const Task = express.Router();

Task.use("/task/", Production);

export default Task;
