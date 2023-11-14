import express  from "express"
import ID_Entry from "./id-entry"
import PolicyAccount from "./policy-account"
import SubAccount from "./sub-account"
import Mortgagee from "./mortgagee"
import Subline from "./subline"
import Rates from "./rates"
import CTPL from "./ctpl"
import Bank from "./bank"
const Reference = express.Router()

//production
Reference.use("/reference",ID_Entry)
Reference.use("/reference",PolicyAccount)
Reference.use("/reference",SubAccount)
Reference.use("/reference",Mortgagee)
Reference.use("/reference",Subline)
Reference.use("/reference",Rates)
Reference.use("/reference",CTPL)
//accounting
Reference.use("/reference",Bank)

export default Reference