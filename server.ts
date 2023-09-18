import { PrismaClient } from '@prisma/client'
import express from "express"
import cors from "cors"
import router from './src/controller'
import path from 'path'
import cookieParser from "cookie-parser"

const prisma = new PrismaClient()
const PORT = process.env.PORT

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            
  optionSuccessStatus:200
}
async function main() {
    const app = express()
    app.use(express.urlencoded({extended:true}))
    app.use(express.json())
    app.use(cookieParser());
    app.use(cors(corsOptions))
    app.use(express.static(path.join(__dirname,"/view")))
    app.use(express.static(path.join(__dirname,"/static/image/")))
    app.use(router)
    app.get("*", (req,res)=>{
      res.sendFile(path.join(__dirname,"/view/","index.html"))
    })
    app.listen(PORT,()=>console.log(`Listen in port ${PORT}`))
}

main()
  .then(async () => {
    await prisma.$disconnect()
})
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
})