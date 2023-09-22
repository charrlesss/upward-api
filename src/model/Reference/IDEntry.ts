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
    entry_agent_id:string
    firstname: string;
    lastname: string;
    middlename: string;
    email: string,
    mobile: string,
    telephone: string,
    address: string 
  }

  interface EntryFixedAssetsType {
    entry_fixed_assets_id:string
    description: string;
    remarks: string;
  }

  interface EntrySupplierType {
    entry_supplier_id:string
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

export async function CreateAgentEntry(data:EntryAgentType){
    const {email,telephone,mobile,...rest} = data

    await prisma.entry_Agent.create({
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

export async function CreateFixedAssetstEntry(data:EntryFixedAssetsType){
    await prisma.entry_Fixed_Assets.create({
        data
    })
}

export async function CreateSupplierEntry(data:EntrySupplierType){
    const {email,telephone,mobile,...rest} = data

    await prisma.entry_Supplier.create({
        data:{
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

export async function CreateOtherEntry(data:{entry_others_id:string,description:string}){
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

export async function getAllAgentEntry() {
    const query = `
    SELECT 
        a.entry_agent_id,
        a.firstname,
        a.lastname,
        a.middlename,
        a.address,
        (DATE_FORMAT(a.createdAt, '%Y-%m-%d')) as createdAt,
        b.email,
        b.mobile,
        b.telephone
    FROM
    upward.entry_agent a
        LEFT JOIN
    upward.contact_details b ON a.agent_contact_details_id = b.contact_details_id;`
    return await  prisma.$queryRawUnsafe(query)
}

export async function getAllFixedAssetsEntry() {
    const query = `
    SELECT 
        a.entry_fixed_assets_id,
        a.description,
        a.remarks,
        (DATE_FORMAT(a.createdAt, '%Y-%m-%d')) as createdAt
    FROM
    upward.entry_fixed_assets a`
    return await  prisma.$queryRawUnsafe(query)
}
export async function getAllSupplierEntry() {
    const query = `
    SELECT  
        a.entry_supplier_id,
        a.firstname,
        a.lastname,
        a.middlename,
        a.company,
        a.address,
        a.tin_no,
        a.VAT_Type,
        a.option,
        (DATE_FORMAT(a.createdAt, '%Y-%m-%d')) AS createdAt,
        b.email,
        b.mobile,
        b.telephone
    FROM
    upward.entry_supplier a
        LEFT JOIN
    upward.contact_details b ON a.supplier_contact_details_id = b.contact_details_id;`
    return await  prisma.$queryRawUnsafe(query)
}
export async function getAllOtherEntry() {
    const query = `
    SELECT 
        a.entry_others_id,
        a.description,
        (DATE_FORMAT(a.createdAt, '%Y-%m-%d')) AS createdAt
    FROM
    upward.entry_others a;  `
    return await  prisma.$queryRawUnsafe(query)
}
