import express from "express";
import {
  getWarehouseSearch,
  warehouseSelectedSearch,
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

export default Warehouse;
