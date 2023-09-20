import express ,{ NextFunction, Request ,Response} from "express"
import ID_Entry from "./Id-Entry"

const Reference = express.Router()

Reference.use("/reference",ID_Entry)

export default Reference