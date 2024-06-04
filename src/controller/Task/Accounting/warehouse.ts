import express from "express";
import {
  getWarehouseSearch,
  pullout,
  warehouseSelectedSearch,
  updatePDCChecks,
  getApprovedPulloutWarehouse,
  getApprovedPulloutWarehouseCheckList,
  getApprovedPulloutWarehouseCheckListSelected,
} from "../../../model/Task/Accounting/warehouse.model";
import saveUserLogs from "../../../lib/save_user_logs";
import { VerifyToken } from "../../Authentication";

const Warehouse = express.Router();

Warehouse.get(
  "/warehouse/search-pdc-checks-client-policy",
  async (req, res) => {
    try {
      const { searchCheck: search } = req.query;

      res.send({
        message: "successfully",
        success: true,
        data: await getWarehouseSearch(search as string, req),
      });
    } catch (err: any) {
      console.log(err.message);
      res.send({ message: err.message, success: false, data: [] });
    }
  }
);
Warehouse.post(
  "/warehouse/get-search-selected-pdc-checks-client-policy",
  async (req, res) => {
    try {
      res.send({
        message: "successfully",
        success: true,
        data: await warehouseSelectedSearch(
          req.body.Policy,
          req.body.pdcStatus,
          req
        ),
      });
    } catch (err: any) {
      console.log(err.message);
      res.send({ message: err.message, success: false, data: [] });
    }
  }
);
Warehouse.get(
  "/warehouse/search-approved-pullout-warehouse",
  async (req, res) => {
    const { searchApprovedPullout } = req.query;
    try {
      res.send({
        message: "successfully",
        success: true,
        data: await getApprovedPulloutWarehouse(
          searchApprovedPullout as string,
          req
        ),
      });
    } catch (err: any) {
      console.log(err.message);
      res.send({ message: err.message, success: false, data: [] });
    }
  }
);
Warehouse.get(
  "/warehouse/search-checklist-approved-pullout-warehouse",
  async (req, res) => {
    const { searchApprovedPulloutCheckList } = req.query;
    console.log(searchApprovedPulloutCheckList);

    try {
      const data = await getApprovedPulloutWarehouseCheckList(
        searchApprovedPulloutCheckList as string,
        req
      );
      res.send({
        message: "successfully",
        success: true,
        data,
      });
    } catch (err: any) {
      console.log(err.message);
      res.send({ message: err.message, success: false, data: [] });
    }
  }
);
Warehouse.post(
  "/warehouse/search-checklist-approved-pullout-warehouse-selected",
  async (req, res) => {
    const { RCPNo } = req.body;
    try {
      const data = await getApprovedPulloutWarehouseCheckListSelected(
        RCPNo,
        req
      );
      res.send({
        message: "successfully",
        success: true,
        data,
      });
    } catch (err: any) {
      console.log(err.message);
      res.send({ message: err.message, success: false, data: [] });
    }
  }
);
Warehouse.post("/warehouse/save", async (req, res) => {
  try {
    const { userAccess }: any = await VerifyToken(
      req.cookies["up-ac-login"] as string,
      process.env.USER_ACCESS as string
    );
    if (userAccess.includes("ADMIN")) {
      return res.send({
        message: `CAN'T SAVE, ADMIN IS FOR VIEWING ONLY!`,
        success: false,
      });
    }

    const successMessage = [
      "Stored In Warehouse",
      "Endorsed for Deposit",
      "Pulled Out As " + req.body.remarks,
    ];
    const selected = JSON.parse(req.body.selected);
    if (req.body.pdcStatus === "2") {
      selected.forEach(async (item: any) => {
        const pulloutRequest = await pullout(item.PNo, item.Check_No, req);
        if (pulloutRequest.length <= 0) {
          return res.send({
            message: `PN No. : ${item.PNo}\nCheck No : ${item.Check_No} dont have pullout approval!`,
            success: false,
          });
        }
      });
    }
    selected.forEach(async (check: any) => {
      await updatePDCChecks(
        req.body.pdcStatus,
        req.body.remarks,
        check.PDC_ID,
        req
      );
    });

    await saveUserLogs(req, "", "add", "Warehouse");
    res.send({
      message: `Successfully ${successMessage[parseInt(req.body.pdcStatus)]}`,
      success: true,
    });
  } catch (err: any) {
    console.log(err.message);
    res.send({ message: err.message, success: false });
  }
});
export default Warehouse;
