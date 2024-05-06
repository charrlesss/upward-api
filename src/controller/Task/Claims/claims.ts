import express from "express";
import {
  claimnsPolicyComputation,
  claimsPolicy,
  getInsuranceList,
} from "../../../model/Task/Claims/claims";

const Claim = express.Router();

Claim.get("/claims/get-insurance-list", async (req, res) => {
  try {
    res.send({
      message: "Successfully get insurance list",
      success: true,
      insurance: await getInsuranceList(),
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({ message: error.message, success: false, insurance: [] });
  }
});

Claim.get("/claims/get-policy", async (req, res) => {
  try {
    res.send({
      message: "Successfully get insurance list",
      success: true,
      claimPolicy: await claimsPolicy(req.query.searchPolicy as string),
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({ message: error.message, success: false, insurance: [] });
  }
});
Claim.post("/claims/get-policy-computation", async (req, res) => {
  try {
    res.send({
      message: "Successfully get insurance list",
      success: true,
      getComputation: await claimnsPolicyComputation(req.body.PolicyNo),
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({ message: error.message, success: false, insurance: [] });
  }
});

export default Claim;
