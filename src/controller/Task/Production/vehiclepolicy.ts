import express, { Request, Response } from "express";
import { searchEntry } from "../../../model/Reference/id-entry.model";
import { getAgents, getClients, getPolicyAccount, getSubAccount } from "../../../model/Task/Production/vehicle-policy";
const VehiclePolicy = express.Router();

VehiclePolicy.get(
  "/get-vehicle-policy",
  async (req: Request, res: Response) => {
    try {
      res.send({
        message: "Successfully get data",
        success: true,
        vehiclePolicy: {
          clients: await getClients(""),
          agents: await getAgents(""),
          policy_account:await getPolicyAccount(),
          sub_account:await getSubAccount(),
        },
      });
    } catch (error: any) {
      res.send({ message: error.message, success: false, vehiclePolicy: null });
    }
  }
);

VehiclePolicy.get(
  "/search-client-vehicle-policy",
  async (req: Request, res: Response) => {
    try {
      res.send({
        message: "Successfully search data",
        success: true,
        vehiclePolicy: {
          clients: await getClients(req.query.clientSearch as string,true),
        },
      });
    } catch (error: any) {
      res.send({ message: error.message, success: false, vehiclePolicy: null });
    }
  }
);

export default VehiclePolicy;
