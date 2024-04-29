import express from "express";
import {
  approvalCodePostponement,
  checkPostponementRequestAutoID,
  createPostponement,
  createPostponementDetails,
  getCheckPostponementPNNo,
  getSelectedCheckPostponementPNNo,
  searchEditPostponentRequest,
  searchSelectedEditPostponentRequest,
  updateOnCancelPostponentRequest,
  updateOnCancelPostponentRequestDetails,
  updatePostponementStatus,
  updateApprovalPostponementCode,
  findApprovalPostponementCode,
} from "../../../model/Task/Accounting/chek-postponement.model";
import { getUserById } from "../../../model/StoredProcedure";
import { updateAnyId } from "../../../model/Task/Accounting/pullout.model";
import { format } from "date-fns";
import sendEmail from "../../../lib/sendEmail";
import generateRandomNumber from "../../../lib/generateRandomNumber";
import saveUserLogs from "../../../lib/save_user_logs";

const CheckPostponement = express.Router();

CheckPostponement.get(
  "/check-postponement/reqeust/get-id",
  async (req, res) => {
    try {
      res.send({
        message: "Successfully Get ID",
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
    res.send({
      message: "Successfully Search",
      success: true,
      clientCheckName,
    });
  } catch (error: any) {
    console.log(`${CheckPostponement} : ${error.message}`);
    res.send({ message: "SERVER ERROR!", success: false, clientCheckName: [] });
  }
});
CheckPostponement.get(
  "/check-postponement/selected-pn-no",
  async (req, res) => {
    const { check, pnno } = req.query;
    try {
      const selectedChecks = await getSelectedCheckPostponementPNNo(
        pnno as string,
        check as string
      );
      res.send({
        message: "Successfully Get Search Selected",
        success: true,
        selectedChecks,
      });
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
CheckPostponement.post("/check-postponement/save", async (req, res) => {
  try {
    const user = await getUserById((req.user as any).UserId);
    const data = {
      RPCDNo: req.body.RPCD,
      PNNo: req.body.PNNo,
      HoldingFees: req.body.holdingFee,
      PenaltyCharge: req.body.penaltyCharge,
      PaidVia: req.body.paidVia,
      PaidInfo: req.body.paidInfo,
      PaidDate: req.body.paidDate,
      Date: new Date(),
      Status: "PENDING",
      Branch: "HO",
      ClientBranch: req.body.branch,
      Prepared_by: user?.Username,
      Surplus: req.body.surplus,
      Deducted_to: req.body.deductedTo,
      Requested_By: user?.Username,
      Requested_Date: new Date(),
    };
    await createPostponement(data);
    JSON.parse(req.body.checkSelected).forEach(async (item: any) => {
      const details = {
        RPCD: req.body.RPCD,
        RPCDNo: `${req.body.RPCD}-${item.temp_id}`,
        CheckNo: item.Check_No,
        OldCheckDate: new Date(item.Check_Date),
        NewCheckDate: new Date(item.New_Check_Date),
        Reason: item.Reason,
      };
      await createPostponementDetails(details);
    });
    const subtitle = `
      <h3>Check Deposit Postponement Request</h3>
    `;
    const text = getSelectedCheck(req.body.checkSelected);
    const Requested_By = user?.Username;
    const Requested_Date = new Date();
    const approvalCode = generateRandomNumber(6);

    await sendRequestEmail({
      ...req.body,
      text,
      Requested_By,
      Requested_Date,
      approvalCode,
      subtitle,
    });
    await approvalCodePostponement({
      RPCD: req.body.RPCD,
      For_User: Requested_By,
      Approved_Code: approvalCode.toString(),
      Disapproved_Code: "",
    });
    await updateAnyId("check-postponement");
    await saveUserLogs(req, req.body.RPCD, `add request`, "Check-Postponement");
    res.send({ message: "Save Successfully.", success: true });
  } catch (error: any) {
    console.log(`${CheckPostponement} : ${error.message}`);
    res.send({ message: "SERVER ERROR!", success: false });
  }
});
CheckPostponement.get("/check-postponement/search-edit", async (req, res) => {
  const { searchEdit } = req.query;
  try {
    const selectedRequest = await searchEditPostponentRequest(
      searchEdit as string
    );
    res.send({
      message: "Successfully Get Search Selected",
      success: true,
      selectedRequest,
    });
  } catch (error: any) {
    console.log(`${CheckPostponement} : ${error.message}`);
    res.send({
      message: "SERVER ERROR!",
      success: false,
      selectedRequest: [],
    });
  }
});
CheckPostponement.post(
  "/check-postponement/search-selected-edit",
  async (req, res) => {
    try {
      const selectedSearchEdit = await searchSelectedEditPostponentRequest(
        req.body.RPCD
      );
      res.send({
        message: "Successfully Get Search Selected",
        success: true,
        selectedSearchEdit,
      });
    } catch (error: any) {
      console.log(`${CheckPostponement} : ${error.message}`);
      res.send({
        message: "SERVER ERROR!",
        success: false,
        selectedSearchEdit: [],
      });
    }
  }
);
CheckPostponement.post(
  "/check-postponement/cancel-request",
  async (req, res) => {
    try {
      await updateOnCancelPostponentRequest(req.body.RPCD);
      await updateOnCancelPostponentRequestDetails(req.body.RPCD);
      await saveUserLogs(
        req,
        req.body.RPCD,
        `cancel request`,
        "Check-Postponement"
      );
      res.send({
        message: `Cancel Request ${req.body.RPCD} Successfully`,
        success: true,
      });
    } catch (error: any) {
      console.log(`${CheckPostponement} : ${error.message}`);
      res.send({
        message: "SERVER ERROR!",
        success: false,
      });
    }
  }
);
CheckPostponement.post(
  "/check-postponement/approved-request",
  async (req, res) => {
    try {
      if (
        req.body.code === "" ||
        req.body.code === null ||
        req.body.code === undefined
      ) {
        return res.send({
          message: "Invalid Approval Code",
          success: false,
        });
      }
      const isAuthorized: any = await findApprovalPostponementCode(
        req.body.code,
        req.body.RPCD
      );

      if (isAuthorized.length <= 0) {
        return res.send({
          message: "Invalid Approval Code",
          success: false,
        });
      }

      const user = await getUserById((req.user as any).UserId);
      await updatePostponementStatus(
        req.body.isApproved,
        req.body.RPCD,
        user?.Username as string
      );
      await updateApprovalPostponementCode(
        user?.Username as string,
        req.body.RPCD
      );
      const subtitle = `
        <h3>Check Deposit Postponement Request</h3>
      `;
      const text = getSelectedCheck(req.body.checkSelected);
      const Approved_By = user?.Username;

      await sendApprovedEmail({
        ...req.body,
        text,
        Requested_By: req.body.Requested_By,
        Requested_Date: req.body.Requested_Date,
        approvalCode: req.body.code,
        subtitle,
        Approved_By,
      });
      await saveUserLogs(
        req,
        req.body.RPCD,
        `${req.body.isApproved ? "approved" : "disapproved"} request`,
        "Check-Postponement"
      );

      res.send({
        message: `${req.body.isApproved ? "APPROVED" : "DISAPPROVED"} Request ${
          req.body.RPCD
        } Successfully`,
        success: true,
      });
    } catch (error: any) {
      console.log(`${CheckPostponement} : ${error.message}`);
      res.send({
        message: "SERVER ERROR!",
        success: false,
      });
    }
  }
);

function getSelectedCheck(selected: string) {
  let tbodyText = "";
  JSON.parse(selected).forEach((item: any) => {
    tbodyText += generateTextTable(item);
  });
  return tbodyText;
}
function generateTextTable(item: any) {
  return `
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px">${item.Check_No}</td>
    <td style="border: 1px solid #ddd; padding: 8px">${item.Bank}</td>
    <td style="border: 1px solid #ddd; padding: 8px">₱${item.Check_Amnt}</td>
    <td style="border: 1px solid #ddd; padding: 8px">${item.Check_Date}</td>
    <td style="border: 1px solid #ddd; padding: 8px">${item.New_Check_Date}</td>
    <td style="border: 1px solid #ddd; padding: 8px">${item.DateDiff}</td>
    <td style="border: 1px solid #ddd; padding: 8px">${item.Reason}</td>
  </tr>`;
}
async function sendRequestEmail(props: any) {
  const {
    RPCD,
    PNNo,
    client,
    text,
    Requested_Date,
    Requested_By,
    approvalCode,
    subtitle,
    holdingFee,
    penaltyCharge,
    surplus,
    paidVia,
  } = props;
  const totalFee =
    parseFloat(holdingFee.replace(/,/g, "")) +
    parseFloat(penaltyCharge.replace(/,/g, "")) +
    parseFloat(surplus.replace(/,/g, ""));
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
        >RCPD No. : </strong
      ><strong
        style="${strong2}"
        >${RPCD}</strong
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
        >Branch : </strong
      ><strong
        style="${strong2}"
        >HO</strong
      >
    </p>
    <p>
    <strong
      style="${strong1}"
      >Account Name : </strong
    ><strong
      style="${strong2}"
      >${client}</strong
    >
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
          Check No.
        </th>
        <th
          style="${th}"
        >
          Bank
        </th>
        <th
          style="${th}"
        >
          Amount
        </th>
        <th
          style="${th}"
        >
          Old Deposite Date
        </th>
        <th
          style="${th}"
        >
          New Deposite Date
        </th>
        <th
          style="${th}"
        >
          Date Difference
        </th>
        <th
          style="${th}"
        >
          Reason
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
    <p>Total Fees:<span style="font-weight: 600; color: #334155;">${totalFee}</span></p>
    <p style="font-weight: 200">
    How to be paid:<span style="font-weight: 600;color: #334155;">
      ${paidVia}
    </span>
    </p>
    <p>Other Informations</p>
  </div>
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
  const {
    RPCD,
    PNNo,
    client,
    text,
    Requested_Date,
    Requested_By,
    subtitle,
    holdingFee,
    penaltyCharge,
    surplus,
    paidVia,
    isApproved,
    username,
    code,
    Approved_By,
  } = props;
  const totalFee =
    parseFloat(holdingFee.replace(/,/g, "")) +
    parseFloat(penaltyCharge.replace(/,/g, "")) +
    parseFloat(surplus.replace(/,/g, ""));
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
    background-color:${isApproved ? "green" : "#b91c1c"};
    color: white;`;
  await sendEmail(
    { user: "upwardinsurance.gelo@gmail.com", pass: "onss clqu vwnp tbea" },
    "upwardinsurance.gelo@gmail.com",
    "charlespalencia21@gmail.com",
    `
  <div
    style="
      background-color: ${isApproved ? "green" : "#b91c1c"};
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
        >Status : </strong
      ><strong
        style="${strong2}"
        >${
          isApproved
            ? "<span style='color:green'>APPROVED</span>"
            : "<span style='color:#b91c1c'>DISAPPROVED</span>"
        }</strong
      >
    </p>
    <p>
      <strong
        style="${strong1}"
        >RCPD No. : </strong
      ><strong
        style="${strong2}"
        >${RPCD}</strong
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
        >Branch : </strong
      ><strong
        style="${strong2}"
        >Head Office</strong
      >
    </p>
    <p>
    <strong
      style="${strong1}"
      >Account Name : </strong
    ><strong
      style="${strong2}"
      >${client}</strong
    >
    </p>

    <p>
    <strong
      style="${strong1}"
      >Approved By: </strong
    ><strong
      style="${strong2}"
      >${Approved_By}</strong
    >
    </p>
   <p>
    <strong
      style="${strong1}"
      >Approved Code: </strong
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
          Check No.
        </th>
        <th
          style="${th}"
        >
          Bank
        </th>
        <th
          style="${th}"
        >
          Amount
        </th>
        <th
          style="${th}"
        >
          Old Deposite Date
        </th>
        <th
          style="${th}"
        >
          New Deposite Date
        </th>
        <th
          style="${th}"
        >
          Date Difference
        </th>
        <th
          style="${th}"
        >
          Reason
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
    <p>Total Fees:<span style="font-weight: 600; color: #334155;">${totalFee}</span></p>
    <p style="font-weight: 200">
    How to be paid:<span style="font-weight: 600;color: #334155;">
      ${paidVia}
    </span>
    </p>
    <p>Other Informations</p>
  </div>
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
        new Date(Requested_Date),
        "MM/dd/yyyy"
      )}</span>
    </p>
    <p>This is a computer generated E-mail</p>
  </div>
    `
  );
}
export default CheckPostponement;
