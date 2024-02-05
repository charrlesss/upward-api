import express from "express";
import {
  getClients,
  getSelectedClient,
} from "../../model/Template/renewal-notice";
import { mapColumnsToKeys } from "../Reports/Production/report-fields";
const RenewlNotice = express.Router();

RenewlNotice.get("/renewal-notice", async (req, res) => {
  try {
    const { search } = req.query;
    res.send({
      message: "Successfully get clients",
      succes: true,
      getClients: await getClients(search as string),
    });
  } catch (err: any) {
    console.log(err);
    res.send({ message: "SERVER ERROR", succes: false, getClients: [] });
  }
});

RenewlNotice.post("/renewal-notice-selected-search", async (req, res) => {
  try {
    const getSelected = await getSelectedClient(
      req.body.PolicyType,
      req.body.PolicyNo
    );
    const COM = [
      "Shortname",
      "address",
      "PolicyNo",
      "PlateNo",
      "ChassisNo",
      "MotorNo",
      "DateTo",
      "unitInsured",
      "Mortgagee",
      "tl_prev_insured",
      "acn_prev_insured",
      "injury_prev_insured",
      "damage_prev_insured",
      "accident_prev_insured",
      "tl_prev_premium",
      "acn_prev_premium",
      "injury_prev_premium",
      "damage_prev_premium",
      "accident_prev_premium",
      "prev_sub_total",
      "prev_doc_stamp",
      "prev_evat",
      "prev_lgt",
      "prev_gross",
      "SecIIPercent",
      "Remarks"
    ];
    const report = mapColumnsToKeys(COM, getSelected);

    res.send({
      message: "Successfully get clients",
      succes: true,
      report,
    });
  } catch (err: any) {
    console.log(err);
    res.send({ message: "SERVER ERROR", succes: false, report: [] });
  }
});

export default RenewlNotice;
