import express  from "express"
import ID_Entry from "./id-entry"
import PolicyAccount from "./policy-account"
import SubAccount from "./sub-account"
import Mortgagee from "./mortgagee"
const Reference = express.Router()

Reference.use("/reference",ID_Entry)
Reference.use("/reference",PolicyAccount)
Reference.use("/reference",SubAccount)
Reference.use("/reference",Mortgagee)

export default Reference