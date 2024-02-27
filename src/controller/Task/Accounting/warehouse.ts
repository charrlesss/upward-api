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

const Warehouse = express.Router();

Warehouse.get(
  "/warehouse/search-pdc-checks-client-policy",
  async (req, res) => {
    try {
      const { searchCheck: search } = req.query;

      res.send({
        message: "successfully",
        success: true,
        data: await getWarehouseSearch(search as string),
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
          req.body.pdcStatus
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
          searchApprovedPullout as string
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
    console.log(searchApprovedPulloutCheckList)

    try {
      const data = await getApprovedPulloutWarehouseCheckList(
        searchApprovedPulloutCheckList as string
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
      const data = await getApprovedPulloutWarehouseCheckListSelected(RCPNo);
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
    const successMessage = [
      "Stored In Warehouse",
      "Endorsed for Deposit",
      "Pulled Out As " + req.body.remarks,
    ];
    const selected = JSON.parse(req.body.selected);
    if (req.body.pdcStatus === "2") {
      selected.forEach(async (item: any) => {
        const pulloutRequest = await pullout(item.PNo, item.Check_No);
        if (pulloutRequest.length <= 0) {
          return res.send({
            message: `PN No. : ${item.PNo}\nCheck No : ${item.Check_No} dont have pullout approval!`,
            success: false,
          });
        }
      });
    }
    selected.forEach(async (check: any) => {
      console.log(check)
      await updatePDCChecks(req.body.pdcStatus, req.body.remarks, check.PDC_ID);
    });
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
