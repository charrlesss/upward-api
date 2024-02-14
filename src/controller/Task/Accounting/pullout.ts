import express from "express";
import {
  pulloutRequestAutoID,
  pulloutRequestPNoWithName,
  getSelectedRequestCheck,
  createPulloutRequest,
  createPulloutRequestDetails,
  updateAnyId,
  checkPulloutRequest,
  checkPulloutRequestDetails,
  updatePulloutRequest,
  searchPulloutRequestOnEdit,
  deletePulloutRequestDetail,
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
PulloutRequest.post("/pullout/request/save", async (req, res) => {
  try {
    const { RCPNo, PNNo, reason, selected, requestMode } = req.body;
    const user = await getUserById((req.user as any).UserId);
    if (requestMode === "edit") {
      JSON.parse(selected).forEach(async (item: any) => {
        await updatePulloutRequest(PNNo, RCPNo, item.Check_No, "CANCEL");
      });
      return res.send({
        message: "Update Successfully",
        success: true,
      });
    }
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
      const checks = (await checkPulloutRequest(item.Check_No)) as Array<any>;
      if (checks.length > 0 && checks[0].Status === "CANCEL") {
        return await updatePulloutRequest(
          PNNo,
          RCPNo,
          item.Check_No,
          "PENDING"
        );
      } else {
        if ((await checkPulloutRequestDetails(item.Check_No)).length > 0) {
          await deletePulloutRequestDetail(item.Check_No);
        }
        await createPulloutRequestDetails({
          RCPNo: RCPNo,
          CheckNo: item.Check_No,
          PRD_ID,
        });
      }
    });
    await updateAnyId("pullout");
    res.send({
      message: "Save Successfully",
      success: true,
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({ message: "SERVER ERROR", success: false, selected: [] });
  }
});
PulloutRequest.get("/pullout/reqeust/edit-search", async (req, res) => {
  try {
    const { onEditSearch: search } = req.query;
    res.send({
      message: "Save Successfully",
      success: true,
      requestList: await searchPulloutRequestOnEdit(search as string),
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({ message: "SERVER ERROR", success: false, requestList: [] });
  }
});

Pullout.use(PulloutRequest);
Pullout.use(PulloutApporved);
export default Pullout;
