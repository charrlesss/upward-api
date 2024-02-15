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
} from "../../../model/Task/Accounting/pullout.model";
import { getUserById } from "../../../model/StoredProcedure";
import generateUniqueUUID from "../../../lib/generateUniqueUUID";
import sendEmail from "../../../lib/sendEmail";
import { format } from "date-fns";
import generateRandomNumber from "../../../lib/generateRandomNumber";

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
    const subtitle = `
    <h3>Check storage pullout</h3>
    <h3>Cancel Request</h3>
    `;
    const approvalCode = generateRandomNumber(6);
    const { RCPNo, PNNo, reason, selected } = req.body;
    const user = await getUserById((req.user as any).UserId);
    const request = await checkPNNo(PNNo);
    let text = "";
    const Requested_By = user?.Username;
    const Requested_Date = new Date();
    if (request.length > 0) {
      await updatePulloutRequest(
        {
          Reason: reason,
          Status: "PENDING",
          Requested_By,
          Requested_Date,
        },
        request[0].RCPNo
      );
      await createPulloutRequestDetailsFunc(selected, request[0].RCPNo);
      text = getSelectedCheck(selected);
      await sendRequestEmail({
        ...req.body,
        text,
        Requested_By,
        Requested_Date,
        approvalCode,
        subtitle,
      });

      return res.send({
        message: "Save Successfully",
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
    await createPulloutRequestDetailsFunc(selected, RCPNo);
    text = getSelectedCheck(selected);
    await updateAnyId("pullout");
    await sendRequestEmail({
      ...req.body,
      text,
      Requested_By,
      Requested_Date,
      approvalCode,
      subtitle,
    });
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

async function createPulloutRequestDetailsFunc(
  selected: string,
  RCPNo: string
) {
  JSON.parse(selected).forEach(async (item: any) => {
    const PRD_ID = await generateUniqueUUID(
      "pullout_request_details",
      "PRD_ID"
    );
    if (!["APPROVED", "PENDING", "CANCEL"].includes(item.Status)) {
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

Pullout.use(PulloutRequest);
Pullout.use(PulloutApporved);
export default Pullout;
