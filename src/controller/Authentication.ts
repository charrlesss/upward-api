import { PrismaClient } from "@prisma/client"
import express ,{ NextFunction, Request ,Response} from "express"
import {compareSync} from "bcrypt"
import jwt from "jsonwebtoken"
const Authentication = express.Router()
const prisma = new PrismaClient()


type findUser = {
    UserId: number;
    Username: string;
    Password: string;
    AccountType: string;
    REFRESH_TOKEN: string | null;
    CreatedAt: Date;
}


function createTokenForUser(user:findUser){
    return jwt.sign(user, process.env.ACCESS_TOKEN as string )
}

function authenticateToken(req:Request,res:Response,next:NextFunction){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    
    if(token === '' || token == null){
        return  res.sendStatus(401)
    }

    jwt.verify(token as string,process.env.ACCESS_TOKEN as string,(err,user)=>{
        if(err){
            return res.sendStatus(403)
        }
        req.user = user 
    })
    
    next()
}


Authentication.post("/users",async (req:Request,res:Response)=>{
    const findUser = await prisma.users.findUnique({
        where:{
            Username:req.body.username
        }
    })

    if(!findUser || findUser ==  null){
        return res.send({message:"No Username Found!",success:false})
    }

    if(compareSync(req.body.password,findUser.Password)){
        const accessToken =  createTokenForUser(findUser)
        return res.send({message:"Successfully Login",success:true ,accessToken})
    }else{
        return res.send({message:"Password Incorect" ,success:false})
    }
})

Authentication.use(authenticateToken)
Authentication.get("/user",(req:Request,res:Response)=>{
console.log(req.user)

    res.send({data:[
        {username:"charles",title:"charles"},
        {username:"charles",title:"charles"},
        {username:"charles",title:"charles"},
    ]})
})


export default Authentication