import express from "express";
import {
  pulloutRequestAutoID,
  pulloutRequestPNoWithName,
  getSelectedRequestCheck,
  createPulloutRequest,
  createPulloutRequestDetails,
  updateAnyId,
} from "../../../model/Task/Accounting/pullout.model";
import { getUserById } from "../../../model/StoredProcedure";
import generateUniqueUUID from "../../../lib/generateUniqueUUID";

const Pullout = express.Router();
const PulloutRequest = express.Router();
const PulloutApporved = express.Router();

PulloutRequest.get("/pullout/reqeust/get-id", async (req, res) => {
  try {
    res.send({
      message: "Successfully",
      success: true,
      id: await pulloutRequestAutoID(),
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({ message: "SERVER ERROR", success: false, id: [] });
  }
});

PulloutRequest.get("/pullout/reqeust/get-pno-name", async (req, res) => {
  const { pnclientSearch: serach } = req.query;
  try {
    res.send({
      message: "Successfully",
      success: true,
      clientCheckName: await pulloutRequestPNoWithName(serach as string),
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({ message: "SERVER ERROR", success: false, id: [] });
  }
});
PulloutRequest.post("/pullout/reqeust/selected-pnno", async (req, res) => {
  const { PNNo } = req.body;
  try {
    res.send({
      message: "Successfully",
      success: true,
      selected: await getSelectedRequestCheck(PNNo),
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({ message: "SERVER ERROR", success: false, id: [] });
  }
});
PulloutRequest.post("/pullout/reqeust/save", async (req, res) => {
  try {
    const { RCPNo, PNNo, reason, selected } = req.body;
    const user = await getUserById((req.user as any).UserId);
    console.log(selected)
    await createPulloutRequest({
      RCPNo: RCPNo,
      PNNo: PNNo,
      Reason: reason,
      Status: "PENDING",
      Requested_By: user?.Username,
      Branch: "HO",
      Requested_Date: new Date(),
    });

    JSON.parse(selected).forEach(async (item: any) => {
      const PRD_ID = await generateUniqueUUID(
        "pullout_request_details",
        "PRD_ID"
      );
      await createPulloutRequestDetails({
        RCPNo: RCPNo,
        CheckNo: item.PDC_ID,
        PRD_ID,
      });
    });
    await updateAnyId("pullout");
    res.send({
      message: "Save Successfully",
      success: true,
      selected: await getSelectedRequestCheck(PNNo),
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({ message: "SERVER ERROR", success: false });
  }
});

Pullout.use(PulloutRequest);
Pullout.use(PulloutApporved);
export default Pullout;
