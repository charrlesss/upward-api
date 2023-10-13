import express, { Request, Response } from "express";
import {
  getAgents,
  getClients,
  getPolicyAccount,
  getSubAccount,
  getRates,
  getMortgagee,
  getTPL_IDS,
} from "../../../model/Task/Production/vehicle-policy";
import promiseAll from "../../../lib/promise-all";
const VehiclePolicy = express.Router();

VehiclePolicy.get(
  "/get-vehicle-policy",
  async (req: Request, res: Response) => {
    try {
      promiseAll([
        getClients(""),
        getAgents(""),
        getSubAccount(),
        getPolicyAccount("COM"),
        getPolicyAccount("TPL"),
        getRates("COM"),
        getRates("TPL"),
        getMortgagee("COM"),
        getMortgagee("TPL"),
      ]).then(
        ([
          clients,
          agents,
          sub_account,
          com,
          tpl,
          rateCom,
          rateTpl,
          mortCom,
          mortTpl,
        ]: any) => {
          res.send({
            message: "Successfully get data",
            success: true,
            vehiclePolicy: {
              clients,
              agents,
              sub_account,
              policy_account: {
                com,
                tpl,
              },
              rate: {
                com: rateCom,
                tpl: rateTpl,
              },
              mortgagee: {
                com: mortCom,
                tpl: mortTpl,
              },
            },
          });
        }
      );
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
          clients: await getClients(req.query.clientSearch as string, true),
        },
      });
    } catch (error: any) {
      res.send({ message: error.message, success: false, vehiclePolicy: null });
    }
  }
);

VehiclePolicy.get(
  "/tpl-ids-vehicle-policy",
  async (req: Request, res: Response) => {
    try {
      res.send({
        message: "Successfully search data",
        success: true,
        vehiclePolicy: {
          tpl: await getTPL_IDS(),
        },
      });
    } catch (error: any) {
      res.send({ message: error.message, success: false, vehiclePolicy: null });
    }
  }
);

export default VehiclePolicy;
