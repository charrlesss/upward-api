import { PrismaClient } from '@prisma/client'
import { IDGenerator } from '../StoredProcedure';
const prisma = new PrismaClient()

interface DataEntryClient {
    sub_account: string;
    email: string;
    mobile: string;
    telephone:string
    address: string;
    option: "Company" | "Individual";
  }
  
  interface CompanyData extends DataEntryClient {
    option: "Company";
    company: string;
  }
  
  interface IndividualData extends DataEntryClient {
    option: "Individual";
    firstname: string;
    middlename: string;
    lastname: string;
  }

  interface EntryEmployeeType {
    firstname: string;
    lastname: string;
    middlename: string;
    sub_account: string;
    description: string;
  }
  
  interface EntryAgentType {
    firstname: string;
    lastname: string;
    middlename: string;
    email: string,
    mobile: string,
    telephone: string,
    address: string 
  }

  interface EntryFixedAssetsType {
    description: string;
    remarks: string;
  }

  interface EntrySupplierType {
    firstname: string;
    lastname: string;
    middlename: string;
    company: string;
    address: string;
    tin_no: string;
    VAT_Type: string;
    option: string;
    email:string
    telephone:string
    mobile:string
  }
  type DataEntryClientTypes = CompanyData | IndividualData;
  

export async function CreateClientEntry(sign:string,type:string,data:DataEntryClientTypes){
    const {email,telephone,mobile,...rest} = data
    await prisma.entry_Client.create({
        data:{
            entry_client_id:await IDGenerator(sign,type),
            ...rest,
            contact_details:{
                create:{
                    email,
                    telephone,
                    mobile,
                }
            }
        }
    })

}

export async function CreateEmployeeEntry(sign:string,type:string,data:EntryEmployeeType){
    await prisma.entry_Employee.create({
        data:{
            entry_employee_id:await IDGenerator(sign,type),
            ...data
        }
    })
}

export async function CreateAgentEntry(sign:string,type:string,data:EntryAgentType){
    const {email,telephone,mobile,...rest} = data

    await prisma.entry_Agent.create({
        data:{
            entry_agent_id:await IDGenerator(sign,type),
            ...rest,
            contact_details:{
                create:{
                    email,
                    telephone,
                    mobile,
                }
            }
        }
    })
}

export async function CreateFixedAssetstEntry(sign:string,type:string,data:EntryFixedAssetsType){
    await prisma.entry_Fixed_Assets.create({
        data
    })
}


export async function CreateSupplierEntry(sign:string,type:string,data:EntrySupplierType){
    const {email,telephone,mobile,...rest} = data

    await prisma.entry_Supplier.create({
        data:{
            entry_supplier_id:await IDGenerator(sign,type),
            ...rest,
            contact_details:{
                create:{
                    email,
                    telephone,
                    mobile
                }
            }
        }
    })
}

export async function CreateOtherEntry(sign:string,type:string,data:{description:string}){
    await prisma.entry_Others.create({
        data
    })
}
