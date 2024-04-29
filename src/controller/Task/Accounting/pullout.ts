import express from "express";
import {
  pulloutRequestAutoID,
  pulloutRequestPNoWithName,
  getSelectedRequestCheck,
  createPulloutRequest,
  createPulloutRequestDetails,
  updateAnyId,
  searchPulloutRequestOnEdit,
  checkPNNo,
  updatePulloutRequest,
  updatePulloutRequestDetails,
  approvedPullout,
  getSelectedEditRequestCheck,
  insertApprovalCode,
  existApprovalCode,
  updateApprovalCode,
} from "../../../model/Task/Accounting/pullout.model";
import { getUserById } from "../../../model/StoredProcedure";
import generateUniqueUUID from "../../../lib/generateUniqueUUID";
import sendEmail from "../../../lib/sendEmail";
import { format } from "date-fns";
import generateRandomNumber from "../../../lib/generateRandomNumber";
import saveUserLogs from "../../../lib/save_user_logs";

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
  const { PNo, requestMode, RCPNo } = req.body;
  console.log(req.body);
  try {
    if (requestMode === "edit") {
      return res.send({
        message: "Successfully",
        success: true,
        selected: await getSelectedEditRequestCheck(RCPNo),
      });
    }
    res.send({
      message: "Successfully",
      success: true,
      selected: await getSelectedRequestCheck(PNo),
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({ message: "SERVER ERROR", success: false, id: [] });
  }
});
PulloutRequest.post("/pullout/request/save", async (req, res) => {
  try {
    const subtitle = `
    <h3>Check storage pullout</h3>
    <h3>Cancel Request</h3>
    `;
    const approvalCode = generateRandomNumber(6);
    const { RCPNo, PNNo, reason, selected } = req.body;
    const user = await getUserById((req.user as any).UserId);
    let text = "";
    const Requested_By = user?.Username;
    const Requested_Date = new Date();
    text = getSelectedCheck(selected);
    await createPulloutRequest({
      RCPNo: RCPNo,
      PNNo: PNNo,
      Reason: reason,
      Status: "PENDING",
      Requested_By: user?.Username,
      Branch: "HO",
      Requested_Date: new Date(),
    });
    await createPulloutRequestDetailsFunc(selected, RCPNo);
    await updateAnyId("pullout");
    await sendRequestEmail({
      ...req.body,
      text,
      Requested_By,
      Requested_Date,
      approvalCode,
      subtitle,
    });
    const pullout_auth_codes_id = await generateUniqueUUID(
      "pullout_auth_codes",
      "pullout_auth_codes_id"
    );
    await insertApprovalCode({
      pullout_auth_codes_id,
      RCPN: RCPNo,
      For_User: "['LVA_ancar@yahoo.com','upwardclaims@yahoo.com']",
      Approved_Code: approvalCode.toString(),
      Disapproved_Code: "",
    });
    await saveUserLogs(req, RCPNo, "add","Pullout");
    res.send({
      message: "Save Successfully",
      success: true,
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({ message: "SERVER ERROR", success: false, selected: [] });
  }
});
PulloutRequest.post("/pullout/request/cancel-request", async (req, res) => {
  try {
    const { RCPNo, selected } = req.body;
    const user = await getUserById((req.user as any).UserId);
    const approvalCode = null;
    const text = getSelectedCheck(selected);
    const subtitle = `
    <h3>Check storage pullout</h3>
    <h3>Cancel Request</h3>
    `;
    const Requested_By = user?.Username;
    const Requested_Date = new Date();
    await sendRequestEmail({
      ...req.body,
      text,
      Requested_By,
      Requested_Date,
      approvalCode,
      subtitle,
    });

    await updatePulloutRequest({ Status: "CANCEL" }, RCPNo);
    await updatePulloutRequestDetails(RCPNo);
    await saveUserLogs(req, RCPNo, "cancel request","Pullout");
    res.send({
      message: `Cancel Request ${RCPNo} Successfully`,
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
PulloutApporved.post("/pullout/approved/approved", async (req, res) => {
  try {
    const { RCPNo, PNNo, client, reason, code, selected, approvedMode } =
      req.body;
    const isApproved = approvedMode === "approved";
    if (code === "" || code === null || code === undefined) {
      return res.send({
        message: "Invalid Approval Code",
        success: false,
      });
    }
    const check_request = (await existApprovalCode(RCPNo, code)) as Array<any>;

    if (check_request.length <= 0)
      return res.send({
        message: "Invalid Approval Code",
        success: false,
      });

    const user = await getUserById((req.user as any).UserId);
    await sendApprovedEmail({
      RCPNo,
      PNNo,
      client,
      reason,
      code,
      selected,
      approvedBy: user?.Username,
      isApproved,
    });
    await approvedPullout(RCPNo, user?.Username as string, isApproved);
    await updateApprovalCode(RCPNo, code, user?.Username as string);
    await saveUserLogs(req, RCPNo, `${isApproved ? "approved" :"disapproved"} request`,"Pullout");
    res.send({
      message: `RCP No. ${RCPNo} Approved Successfuly`,
      success: true,
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({ message: "SERVER ERROR", success: false });
  }
});
PulloutApporved.post("/pullout/approved/selected-pnno", async (req, res) => {
  try {
    return res.send({
      message: "Successfully",
      success: true,
      selected: await getSelectedEditRequestCheck(req.body.RCPNo),
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({ message: "SERVER ERROR", success: false, id: [] });
  }
});
async function createPulloutRequestDetailsFunc(
  selected: string,
  RCPNo: string
) {
  JSON.parse(selected).forEach(async (item: any) => {
    const PRD_ID = await generateUniqueUUID(
      "pullout_request_details",
      "PRD_ID"
    );
    if (
      !["APPROVED", "PENDING", "CANCEL", "DISAPPROVED"].includes(item.Status)
    ) {
      await createPulloutRequestDetails({
        RCPNo: RCPNo,
        CheckNo: item.Check_No,
        PRD_ID,
      });
    }
  });
}
function getSelectedCheck(selected: string) {
  let tbodyText = "";
  JSON.parse(selected).forEach((item: any) => {
    tbodyText += generateTextTable(item);
  });
  return tbodyText;
}
function generateTextTable(item: any) {
  return `<tr>
 <td style="border: 1px solid #ddd; padding: 8px">${item.Check_Date}</td>
 <td style="border: 1px solid #ddd; padding: 8px">${item.Bank}</td>
 <td style="border: 1px solid #ddd; padding: 8px">${item.Check_No}</td>
 <td style="border: 1px solid #ddd; padding: 8px">₱${item.Check_Amnt}</td>
</tr>`;
}
async function sendRequestEmail(props: any) {
  const {
    RCPNo,
    PNNo,
    reason,
    client,
    text,
    Requested_Date,
    Requested_By,
    approvalCode,
    subtitle,
  } = props;
  const strong1 = `
    font-family: Arial, Helvetica, sans-serif;
            font-size: 14px;
            color: #334155;
          
    `;
  const strong2 = `font-family: 'Courier New', Courier, monospace;
    font-size: 16px;`;
  const th = ` border: 1px solid #ddd;
    padding: 8px;
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #64748b;
    color: white;`;
  await sendEmail(
    { user: "upwardinsurance.gelo@gmail.com", pass: "onss clqu vwnp tbea" },
    "upwardinsurance.gelo@gmail.com",
    "charlespalencia21@gmail.com",
    `
  <div
    style="
      background-color: #64748b;
      color: white;
      padding: 7px;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      text-align: center;
    "
  >
    <h2>UPWARD</h2>
    ${subtitle}
    
  </div>
  <div style="text-align: center">
    <p>
      <strong
        style="${strong1}"
        >RCP No. : </strong
      ><strong
        style="${strong2}"
        >${RCPNo}</strong
      >
    </p>
    <p>
      <strong
        style="${strong1}"
        >PN No. : </strong
      ><strong
        style="${strong2}"
        >${PNNo}</strong
      >
    </p>
    <p>
      <strong
        style="${strong1}"
        >Client : </strong
      ><strong
        style="${strong2}"
        >${client}</strong
      >
    </p>
    <p>
      <strong
        style="${strong1}"
        >Reason : </strong
      ><strong
        style="${strong2}"
        >${reason}</strong
      >
    </p>
    ${
      approvalCode
        ? `<p>
      <strong
        style="${strong1}"
        >Approval Code : </strong
      ><strong
        style="${strong2}"
        >${approvalCode}</strong
      >
    </p>`
        : ""
    }
  </div>
  <table
    style="
      font-family: Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
    "
  >
    <thead>
      <tr>
        <th
          style="${th}"
        >
          Date
        </th>
        <th
          style="${th}"
        >
          Bank
        </th>
        <th
          style="${th}"
        >
          Check No.
        </th>
        <th
          style="${th}"
        >
          Amount
        </th>
      </tr>
    </thead>
    <tbody>
      ${text}
    </tbody>
  </table>
  <br />
  <br />
  <div
    style="
      text-align: center;
      font-size: 14px;
      font-family: 'Courier New', Courier, monospace;
    "
  >
    <p>Request By:<span style="font-weight: 600; color: #334155;">${Requested_By}</span></p>
    <p style="font-weight: 200">
      Request Date:<span style="font-weight: 600;color: #334155;">${format(
        Requested_Date,
        "MM/dd/yyyy"
      )}</span>
    </p>
    <p>This is a computer generated E-mail</p>
  </div>
    `
  );
}
async function sendApprovedEmail(props: any) {
  const { PNNo, client, reason, code, selected, approvedBy, isApproved } =
    props;
  const strong1 = `
    font-family: Arial, Helvetica, sans-serif;
            font-size: 14px;
            color: #334155;
          
    `;
  const strong2 = `font-family: 'Courier New', Courier, monospace;
    font-size: 16px;`;
  const th = ` border: 1px solid #ddd;
    padding: 8px;
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color:  ${isApproved ? "green" : "red"};
    color: white;`;
  await sendEmail(
    { user: "upwardinsurance.gelo@gmail.com", pass: "onss clqu vwnp tbea" },
    "upwardinsurance.gelo@gmail.com",
    "charlespalencia21@gmail.com",
    `
  <div
    style="
      background-color: ${isApproved ? "green" : "red"};
      color: white;
      padding: 7px;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      text-align: center;
    "
  >
    <h2>UPWARD</h2>
    <p>Check storage pullout</p>
  </div>
  <div style="text-align: center">
    <p>
      <strong
        style="${strong1}"
        >Status : </strong
      ><strong
        style="${strong2} ${isApproved ? "color:green" : "color:red"}"
        >${isApproved ? "APPROVED" : "DISAPPROVED"}</strong
      >
    </p>
    <p>
      <strong
        style="${strong1}"
        >Policy No. : </strong
      ><strong
        style="${strong2}"
        >${PNNo}</strong
      >
    </p>
    <p>
      <strong
        style="${strong1}"
        >Client : </strong
      ><strong
        style="${strong2}"
        >${client}</strong
      >
    </p>
    <p>
      <strong
        style="${strong1}"
        >Reason : </strong
      ><strong
        style="${strong2}"
        >${reason}</strong
      >
    </p>
    <p>
    <strong
      style="${strong1}"
      >${isApproved ? "Approved by" : "Disapproved by"} : </strong
    ><strong
      style="${strong2}"
      >${approvedBy}</strong
    >
  </p>
  <p>
  <strong
    style="${strong1}"
    >${isApproved ? "Approved by" : "Disapproved by"} : </strong
  ><strong
    style="${strong2}"
    >${code}</strong
  >
</p>
   
  </div>
  <table
    style="
      font-family: Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
    "
  >
    <thead>
      <tr>
        <th
          style="${th}"
        >
          Date
        </th>
        <th
          style="${th}"
        >
          Bank
        </th>
        <th
          style="${th}"
        >
          Check No.
        </th>
        <th
          style="${th}"
        >
          Amount
        </th>
      </tr>
    </thead>
    <tbody>
      ${getSelectedCheck(selected)}
    </tbody>
  </table>`
  );
}
Pullout.use(PulloutRequest);
Pullout.use(PulloutApporved);
export default Pullout;
