import express from "express";
import {
  getPdcBanks,
  getPdcPolicyIdAndCLientId,
} from "../../../model/Task/Accounting/pdc.model";
const PDC = express.Router();

PDC.post("/add-pdc", (req, res) => {
  res.send({ message: "qweqwe" });
});

PDC.get("/search-pdc-policy-id", async (req, res) => {
  try {
    const { searchPdcPolicyIds } = req.query;
    res.send({
      pdcIdsSearch: await getPdcPolicyIdAndCLientId(
        searchPdcPolicyIds as string
      ),
      success: true,
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, bondsPolicy: null });
  }
});

PDC.get("/search-pdc-banks", async (req, res) => {
  try {
    const { searchPdcBanks } = req.query;
    res.send({
      pdcBanks: await getPdcBanks(searchPdcBanks as string),
      success: true,
    });
  } catch (error: any) {
    res.send({ message: error.message, success: false, bondsPolicy: null });
  }
});

export default PDC;

//      const Ref_No ='23.0125'
//      const PNo ='CV-GA009A080-0003360'
//      const IDNo ='UIA-1201-010'
//      const Date = '11/20/2023'
//      const Name = 'FB LADAO SALES=INC.'
//      const Remarks =  'main remarks'

//      const Bank = 'CBC'
//      const Branch = 'munoz'
//      const Check_Date = '11/30/2023'
//      const Check_No = 'ref-123'
//      const Check_Amnt = 123
//      const Check_Remarks = 'not main remarks'
//      const ORNum = '',
//      const PDC Status  = 'Received'
