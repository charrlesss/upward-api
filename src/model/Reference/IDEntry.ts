import { PrismaClient } from '@prisma/client'
import { IDGenerator, UpdateId } from '../StoredProcedure';
const prisma = new PrismaClient()

    interface DataEntryClient {
    entry_client_id:string
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
    address: string;
    entry_employee_id:string
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

export async function CreateClientEntry(data:DataEntryClientTypes){
    const {email,telephone,mobile,...rest} = data
    await prisma.entry_Client.create({
        data:{
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

export async function CreateEmployeeEntry(data:EntryEmployeeType){
    await prisma.entry_Employee.create({
        data
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

export async function getAllSubAccount(){
    const query = `
    SELECT 
        a.Sub_Acct,
        a.Acronym,
    CONCAT(a.Acronym, '-', a.ShortName) AS NewShortName
    FROM
    sub_account a
    `
    return  await prisma.$queryRawUnsafe(query)
}

export async function getAllClientEntry() {
    const query = `
    SELECT 
        a.entry_client_id,
        a.firstname,
        a.lastname,
        a.middlename,
        a.option,
        (DATE_FORMAT(a.createdAt, '%Y-%m-%d')) as createdAt,
        a.address,
        a.company,
        b.email,
        b.mobile,
        b.telephone,
        concat(c.Acronym,'-',c.ShortName) as NewShortName
    FROM
    upward.entry_client a
        LEFT JOIN
    upward.contact_details b ON a.client_contact_details_id = b.contact_details_id
        LEFT JOIN
    upward.sub_account c ON a.sub_account = c.Sub_Acct;`
    return await  prisma.$queryRawUnsafe(query)
}

export async function getAllEmployeeEntry() {
    const query = `
    SELECT 
        a.entry_employee_id,
        a.firstname,
        a.middlename,
        a.lastname,
        a.address,
        CONCAT(b.Acronym, '-', b.ShortName) AS NewShortName,
        (DATE_FORMAT(a.createdAt, '%Y-%m-%d')) as createdAt
    FROM
    upward.entry_employee a
        LEFT JOIN
    upward.sub_account b ON a.sub_account = b.Sub_Acct`
    return await  prisma.$queryRawUnsafe(query)
}
