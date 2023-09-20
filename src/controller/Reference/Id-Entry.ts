import express ,{ Request ,Response} from "express"
import { CreateAgentEntry, CreateClientEntry, CreateEmployeeEntry, CreateFixedAssetstEntry, CreateOtherEntry, CreateSupplierEntry } from "../../model/Reference/IDEntry"

const ID_Entry = express.Router()

ID_Entry.post('/id-entry-client',async (req:Request,res:Response)=>{
    await CreateClientEntry('C','entry client',req.body)
    res.send({message:"Successfully Create New Client ID Entry",success:true})
})

ID_Entry.post('/id-entry-employee',async (req:Request,res:Response)=>{
    await CreateEmployeeEntry("E","entry employee",req.body)
    res.send({message:"Successfully Create New Employee ID Entry",success:true})
})

ID_Entry.post('/id-entry-agent',async (req:Request,res:Response)=>{
     await CreateAgentEntry("A","entry agent",req.body)
    res.send({message:"Successfully Create New Agent ID Entry",success:true})
})

ID_Entry.post('/id-entry-fixed-assets',async (req:Request,res:Response)=>{
    await CreateFixedAssetstEntry("FS","entry fixed assets",req.body)
    res.send({message:"Successfully Create New Fixed Assets ID Entry",success:true})
})

ID_Entry.post('/id-entry-supplier',async (req:Request,res:Response)=>{
    await CreateSupplierEntry("S" ,"entry supplier" ,req.body)
    res.send({message:"Successfully Create New Supplier ID Entry",success:true})
})

ID_Entry.post('/id-entry-others',async (req:Request,res:Response)=>{
    await CreateOtherEntry("O","entry others",req.body)
    res.send({message:"Successfully Create New Other ID Entry",success:true})
})

export default ID_Entry