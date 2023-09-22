import express ,{ Request ,Response} from "express"
import { CreateAgentEntry, CreateClientEntry, CreateEmployeeEntry, CreateFixedAssetstEntry, CreateOtherEntry, CreateSupplierEntry, getAllSubAccount ,getAllClientEntry, getAllEmployeeEntry, getAllAgentEntry, getAllFixedAssetsEntry, getAllSupplierEntry, getAllOtherEntry } from "../../model/Reference/IDEntry"
import { IDGenerator, UpdateId } from "../../model/StoredProcedure"

const ID_Entry = express.Router()

ID_Entry.post('/id-entry-client',async (req:Request,res:Response)=>{
    const [s,ym,newCount] = req.body.entry_client_id.split('-')
    const newMonth = ym.substring(0, 2); 
    const newYear = ym.substring(2)
    try{
        await CreateClientEntry(req.body)
        await UpdateId("entry client" ,newCount,newMonth,newYear)
        res.send({message:"Successfully Create New Client ID Entry",success:true})
    }catch(err:any){
        res.send({success:false,message:err.message})
    }
})

ID_Entry.post('/id-entry-employee',async (req:Request,res:Response)=>{
    const [s,ym,newCount] = req.body.entry_employee_id.split('-')
    const newMonth = ym.substring(0, 2); 
    const newYear = ym.substring(2)
    try{
        await CreateEmployeeEntry(req.body)
        await UpdateId("entry employee" ,newCount,newMonth,newYear)
        res.send({message:"Successfully Create New Employee ID Entry",success:true})
    }catch(err:any){
        res.send({success:false,message:err.message})
    }
})

ID_Entry.post('/id-entry-agent',async (req:Request,res:Response)=>{
    const [s,ym,newCount] = req.body.entry_agent_id.split('-')
    const newMonth = ym.substring(0, 2); 
    const newYear = ym.substring(2)
    try{
        await CreateAgentEntry(req.body)
        await UpdateId("entry agent" ,newCount,newMonth,newYear)
        res.send({message:"Successfully Create New Agent ID Entry",success:true})
    }catch(err:any){
        res.send({success:false,message:err.message})
    }

    
})

ID_Entry.post('/id-entry-fixed-assets',async (req:Request,res:Response)=>{
    const [s,ym,newCount] = req.body.entry_fixed_assets_id.split('-')
    const newMonth = ym.substring(0, 2); 
    const newYear = ym.substring(2)
    try{
        await CreateFixedAssetstEntry(req.body)
        await UpdateId("entry fixed assets" ,newCount,newMonth,newYear)
        res.send({message:"Successfully Create New Fixed Assets ID Entry",success:true})
    }catch(err:any){
        res.send({success:false,message:err.message})
    }
})

ID_Entry.post('/id-entry-supplier',async (req:Request,res:Response)=>{
    const [s,ym,newCount] = req.body.entry_supplier_id.split('-')
    const newMonth = ym.substring(0, 2); 
    const newYear = ym.substring(2)
    try{
        await CreateSupplierEntry(req.body)
        await UpdateId("entry supplier" ,newCount,newMonth,newYear)
        res.send({message:"Successfully Create New Supplier ID Entry",success:true})
    }catch(err:any){
        res.send({success:false,message:err.message})
    }
})

ID_Entry.post('/id-entry-others',async (req:Request,res:Response)=>{
    const [s,ym,newCount] = req.body.entry_others_id.split('-')
    const newMonth = ym.substring(0, 2); 
    const newYear = ym.substring(2)
    try{
        await CreateOtherEntry(req.body)
        await UpdateId("entry others" ,newCount,newMonth,newYear)
        res.send({message:"Successfully Create New Other ID Entry",success:true})
    }catch(err:any){
        res.send({success:false,message:err.message})
    }
    
})

ID_Entry.get('/id-entry-subaccounts',async (req:Request,res:Response)=>{
    try{
        res.send({success:true,message:"Successfully Get All Sub Account",subaccount:await getAllSubAccount()})
    }catch(err:any){
        res.send({success:false,message:err.message})
    }
})

ID_Entry.get('/id-entry-get-clients',async (req:Request,res:Response)=>{
    try{
        res.send({success:true,message:"Successfully Get All Client Entry ",entry:await getAllClientEntry()})
    }catch(err:any){
        res.send({success:false,message:err.message})
    }
})

ID_Entry.get('/id-entry-get-employee',async (req:Request,res:Response)=>{
    try{
        res.send({success:true,message:"Successfully Get All Employee Entry ",entry:await getAllEmployeeEntry()})
    }catch(err:any){
        res.send({success:false,message:err.message})
    }
})


ID_Entry.get('/id-entry-get-agent',async (req:Request,res:Response)=>{
    try{
        res.send({success:true,message:"Successfully Get All Agent Entry ",entry:await getAllAgentEntry()})
    }catch(err:any){
        res.send({success:false,message:err.message})
    }
})

ID_Entry.get('/id-entry-get-fixed-assets',async (req:Request,res:Response)=>{
    try{
        res.send({success:true,message:"Successfully Get All Fixed Assests Entry ",entry:await getAllFixedAssetsEntry()})
    }catch(err:any){
        res.send({success:false,message:err.message})
    }
})


ID_Entry.get('/id-entry-get-supplier',async (req:Request,res:Response)=>{
    try{
        res.send({success:true,message:"Successfully Get All Supplier Entry ",entry:await getAllSupplierEntry()})
    }catch(err:any){
        res.send({success:false,message:err.message})
    }
})

ID_Entry.get('/id-entry-get-others',async (req:Request,res:Response)=>{
    try{
        res.send({success:true,message:"Successfully Get All Supplier Entry ",entry:await getAllOtherEntry()})
    }catch(err:any){
        res.send({success:false,message:err.message})
    }
})



ID_Entry.post('/id-entry-generate-id',async (req:Request,res:Response)=>{
    res.send({success:false,message:"Generate ID Successfully", generateID:await IDGenerator(req.body.sign,req.body.type),})
})



export default ID_Entry