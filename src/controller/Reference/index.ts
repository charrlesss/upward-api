import express  from "express"
import ID_Entry from "./id-entry"
import PolicyAccount from "./policy-account"
import SubAccount from "./sub-account"
import Mortgagee from "./mortgagee"
import Subline from "./subline"
const Reference = express.Router()

Reference.use("/reference",ID_Entry)
Reference.use("/reference",PolicyAccount)
Reference.use("/reference",SubAccount)
Reference.use("/reference",Mortgagee)
Reference.use("/reference",Subline)

export default Reference