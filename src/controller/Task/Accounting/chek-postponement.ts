import express from "express";
import {
  checkPostponementRequestAutoID,
  getCheckPostponementPNNo,
  getSelectedCheckPostponementPNNo,
} from "../../../model/Task/Accounting/chek-postponement.model";
const CheckPostponement = express.Router();

CheckPostponement.get(
  "/check-postponement/reqeust/get-id",
  async (req, res) => {
    try {
      res.send({
        message: "Successfully",
        success: true,
        id: await checkPostponementRequestAutoID(),
      });
    } catch (error: any) {
      console.log(`${CheckPostponement} : ${error.message}`);
      res.send({ message: "SERVER ERROR", success: false, id: [] });
    }
  }
);
CheckPostponement.get("/check-postponement/pn-no", async (req, res) => {
  const { pnclientSearch } = req.query;
  try {
    const clientCheckName = await getCheckPostponementPNNo(
      pnclientSearch as string
    );
    res.send({ message: "SERVER ERROR!", success: true, clientCheckName });
  } catch (error: any) {
    console.log(`${CheckPostponement} : ${error.message}`);
    res.send({ message: "SERVER ERROR!", success: false, clientCheckName: [] });
  }
});
CheckPostponement.get(
  "/check-postponement/selected-pn-no",
  async (req, res) => {
    const { check ,pnno } = req.query;
    try {
        const selectedChecks = await getSelectedCheckPostponementPNNo(
            pnno as string,
            check as string,
        );
      res.send({ message: "SERVER ERROR!", success: true, selectedChecks });
    } catch (error: any) {
      console.log(`${CheckPostponement} : ${error.message}`);
      res.send({
        message: "SERVER ERROR!",
        success: false,
        selectedChecks: [],
      });
    }
  }
);

export default CheckPostponement;
