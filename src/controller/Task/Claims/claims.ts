import express from "express";
import {
  GenerateClaimsID,
  claimnsPolicyComputation,
  claimnsPolicyComputationRemittance,
  claimsPolicy,
  getInsuranceList,
} from "../../../model/Task/Claims/claims";
import promiseAll from "../../../lib/promise-all";

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
    const data = req.body.data[0];
    promiseAll([
      claimnsPolicyComputation(data.PolicyNo),
      claimnsPolicyComputationRemittance(data.PolicyNo),
    ]).then(([getComputation, getRemittance]: any) => {
      let remitted = "0.00";
      if (getRemittance.length > 0) {
        remitted = getRemittance[0].remitted;
      }
      const policyComputation = getComputation[0];
      const selectedData = {
        ...data,
        ...policyComputation,
        remitted,
      };
      setTimeout(() => {
        res.send({
          message: "Successfully get insurance list",
          success: true,
          selectedData,
        });
      }, 5000);
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({ message: error.message, success: false, insurance: [] });
  }
});
// Claim.post("/claims/get-policy-remittance", async (req, res) => {
//   try {
//     res.send({
//       message: "Successfully get insurance list",
//       success: true,
//       getRemittance: await claimnsPolicyComputationRemittance(
//         req.body.PolicyNo
//       ),
//     });
//   } catch (error: any) {
//     console.log(error.message);
//     res.send({ message: error.message, success: false, insurance: [] });
//   }
// });

Claim.get("/claims/get-claims-id", async (req, res) => {
  try {
    res.send({
      message: "Successfully get claims id",
      success: true,
      claim_id: await GenerateClaimsID(),
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({ message: error.message, success: false, insurance: [] });
  }
});

export default Claim;
