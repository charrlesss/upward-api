import express ,{ Request ,Response} from "express"
const Authentication = express.Router()


Authentication.get("/users",(req:Request,res:Response)=>{
    res.send({message:"Charles Palencia"})
})

export default Authentication