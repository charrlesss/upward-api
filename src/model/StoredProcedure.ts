import { PrismaClient } from '@prisma/client'
import {hashSync}  from "bcrypt"

const prisma = new PrismaClient()

export function getYear(){
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (currentYear % 100).toString();
}

export function getMonth(){
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  return currentMonth.toString().padStart(2, '0');
}

export async function createIdSequence (){
    const user = await prisma.id_Sequence.createMany({
        data:[ 
            {
                last_count:"000",
                month:getMonth(),
                type:"entry client",
                year:getYear()
              },
                {
                  last_count:"000",
                  month:getMonth(),
                  type:"entry employee",
                  year:getYear()
                },
                {
                  last_count:"000",
                  month:getMonth(),
                  type:"entry agent",
                  year:getYear()
                },
                {
                  last_count:"000",
                  month:getMonth(),
                  type:"entry fixed assets",
                  year:getYear()
                },
                {
                  last_count:"000",
                  month:getMonth(),
                  type:"entry supplier", 
                  year:getYear()
                },
                {
                  last_count:"000",
                  month:getMonth(),
                  type:"entry others",
                  year:getYear()
                },

        ]
      })
      console.log("new user : " ,user)
}

export async function IDGenerator(sign:string,type:string) {
    const lastSeq = await prisma.id_Sequence.findFirst({where:{type}})
    const newCount = incrementLastCount(lastSeq?.last_count as string)
    const newMonth = getMonth()
    const newYear = getYear()
    await prisma.id_Sequence.update({
      where:{
         type
      },
      data:{
        last_count:{
          set:newCount,
        },
        month:{
          set:newMonth
        },
        year:{
          set:newYear
        }
      }
    })
   return `${sign}-${newMonth}${newYear}-${newCount}`
}

export function incrementLastCount(str:string){
    let num = parseInt(str, 10);
    num++;
    return num.toString().padStart(str.length, '0');
}
  
export async function testJoin() {
  return await prisma.entry_Client.findMany({
    include:{
      contact_details:true
    },
    where:{
      entry_client_id:"b4f346b7-c007-434e-9180-a24a0ca7ed15"
    }
  })

}

export async function creatSampleUser (){
    const password =  hashSync("charles",12)
      const user = await prisma.users.createMany({
          data:[ 
                  {
                      AccountType:"ACCOUNTING",
                      Password:password,
                      Username:"charles"
                  },
          ]
        })
        console.log("new user : " ,user)
}
  