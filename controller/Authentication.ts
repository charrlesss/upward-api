import express ,{ Request ,Response} from "express"
const Authentication = express.Router()


Authentication.post("/users",(req:Request,res:Response)=>{
    console.log(req.body)
    res.send({fullname:"Charles Palencia" , age:22})
})

export default Authentication