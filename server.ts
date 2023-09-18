import { PrismaClient } from '@prisma/client'
import express from "express"
import cors from "cors"
import router from './src/controller'
import path from 'path'

const prisma = new PrismaClient()
const PORT = process.env.PORT

async function main() {
    const app = express()
    app.use(express.urlencoded({extended:true}))
    app.use(express.json())
    app.use(cors())
    app.use(router)
    app.use(express.static(path.join(__dirname,"/view")))
    app.use(express.static(path.join(__dirname,"/static/image/")))

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