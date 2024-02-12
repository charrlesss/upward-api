import express from "express";
import {
  getWarehouseSearch,
  pullout,
  warehouseSelectedSearch,
  updatePDCChecks,
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
      selected.forEach(async (check: any) => {
        const pulloutRequest = await pullout(check.PNo, check.Check_No);
        if (pulloutRequest.length <= 0) {
          return res.send({
            message: `PN No. : ${check.PNo}\nCheck No : ${check.Check_No} dont have pullout approval!`,
            success: false,
          });
        }
      });
    }

    selected.forEach(async (check: any) => {
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
