import express  from "express"
import ID_Entry from "./Id-Entry"
import PolicyAccount from "./policy-account"
const Reference = express.Router()

Reference.use("/reference",ID_Entry)
Reference.use("/reference",PolicyAccount)

export default Reference