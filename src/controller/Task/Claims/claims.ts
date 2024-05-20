import express from "express";
import {
  GenerateClaimsID,
  claimReport,
  claimsPolicy,
  createClaimDetails,
  createClaims,
  deleteClaims,
  getInsuranceList,
  searchClaims,
  selectedData,
  updateClaim,
  updateClaimIDSequence,
} from "../../../model/Task/Claims/claims";
import multer from "multer";
import path from "path";
import fs from "fs";
import { saveUserLogsCode } from "../../../lib/saveUserlogsCode";
import saveUserLogs from "../../../lib/save_user_logs";
import { v4 as uuidV4 } from "uuid";
import {
  addYears,
  endOfMonth,
  endOfYear,
  format,
  startOfMonth,
  startOfYear,
} from "date-fns";
const Claim = express.Router();
const uploadFile = multer();

Claim.post("/claims/save", async (req, res) => {
  const data = req.body;
  const isUpdateMode = req.body.mode === "update";

  if (isUpdateMode) {
    if (
      !(await saveUserLogsCode(req, "update", req.body.claims_id, "Claims"))
    ) {
      return res.send({ message: "Invalid User Code", success: false });
    }

    await deleteClaims(req.body.claims_id);
  }

  const files = req.body.claimsSubmited;
  const basicDocumentFolder = [
    "policyFile",
    "endorsement",
    "OPP",
    "ORCR",
    "DLOR",
    "PR",
    "DA",
    "SMCN",
  ];
  files.forEach(
    async (
      { basicFileCustom, otherFileCustom, policyState }: any,
      index: number
    ) => {
      const claims_no = padNumber(index + 1, 3);
      const uploadDir = path.join(
        "./static/claim-files",
        `${data.claims_id}`,
        claims_no
      );
      if (fs.existsSync(uploadDir)) {
        fs.rmSync(uploadDir, { recursive: true });
      }
      const basic = UploadFile(basicFileCustom, uploadDir);
      const others = UploadFile(otherFileCustom, uploadDir);
      policyState.claim_type = policyState.claim_type?.toString();
      policyState.status = policyState.status?.toString();
      policyState.totaDue = parseFloat(
        policyState.totaDue.toString().replace(/,/g, "")
      ).toFixed(2);
      policyState.totalpaid = parseFloat(
        policyState.totalpaid.toString().replace(/,/g, "")
      ).toFixed(2);
      policyState.balance = parseFloat(
        policyState.balance.toString().replace(/,/g, "")
      ).toFixed(2);
      policyState.remitted = parseFloat(
        policyState.remitted.toString().replace(/,/g, "")
      ).toFixed(2);
      if (policyState.AmountClaim === "") {
        policyState.AmountClaim = "0";
      }
      if (policyState.AmountApproved === "") {
        policyState.AmountApproved = "0";
      }
      policyState.AmountClaim = parseFloat(
        policyState.AmountClaim.toString().replace(/,/g, "")
      ).toFixed(2);
      policyState.AmountApproved = parseFloat(
        policyState.AmountApproved.toString().replace(/,/g, "")
      ).toFixed(2);

      delete policyState.DateFrom;
      delete policyState.DateTo;

      await createClaimDetails({
        claim_details_id: uuidV4(),
        claims_id: data.claims_id,
        claims_no,
        basic: JSON.stringify(basic),
        others: JSON.stringify(others),
        ...policyState,
      });
    }
  );
  await createClaims({
    claims_id: data.claims_id,
    dateReported: data.dateReported,
    dateAccident: data.dateAccident,
    dateInspected: data.dateInspected,
    department: data.department?.toString(),
    remarks: data.remarks,
    createdAt: new Date().toISOString(),
  });
  function UploadFile(filesArr: Array<any>, uploadDir: string) {
    const obj: any = [];
    filesArr.forEach((file: any) => {
      let specFolder = "";
      if (basicDocumentFolder.includes(file.datakey)) {
        specFolder = "Basic-Document";
      } else {
        specFolder = "Other-Document";
      }

      const uploadSpecFolder = path.join(uploadDir, specFolder);
      const uniqueFilename = generateUniqueFilename(file.fileName);
      if (!fs.existsSync(uploadSpecFolder)) {
        fs.mkdirSync(uploadSpecFolder, { recursive: true });
      }
      const filePath = path.join(uploadSpecFolder, uniqueFilename);
      const base64Data = file.fileContent.replace(/^data:.*;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      fs.writeFile(filePath, buffer, (err) => {
        if (err) {
          console.log("qweqw2");
          console.log(err);
          res.send({ message: err.message, success: false });
          return;
        }
      });
      obj.push({
        fileName: file.fileName,
        uniqueFilename,
        datakey: file.datakey,
        fileType: file.fileType,
      });
    });
    return obj;
  }
  function padNumber(number: number, length: number) {
    return String(number).padStart(length, "0");
  }
  if (!isUpdateMode) {
    const date = new Date();
    await saveUserLogs(req, req.body.claims_id, "add", "Claims");
    await updateClaimIDSequence({
      last_count: data.claims_id.split("-")[1].split("C")[1],
      year: date.getFullYear().toString().slice(-2),
      month: (date.getMonth() + 1).toString().padStart(2, "0"),
    });
  }
  res.send({
    message: isUpdateMode
      ? "Claim is update successfully"
      : "Claim is save successfully",
    success: true,
  });
});
Claim.post(
  "/claims/update",
  uploadFile.fields([
    { name: "policyFile" },
    { name: "endorsement" },
    { name: "OPP" },
    { name: "ORCR" },
    { name: "DLOR" },
    { name: "PR" },
    { name: "DA" },
    { name: "SMCN" },
    { name: "ct1_1" },
    { name: "ct1_2" },
    { name: "ct2_1" },
    { name: "ct2_2" },
    { name: "ct2_3" },
    { name: "ct2_4" },
    { name: "ct3_1" },
    { name: "ct3_2" },
    { name: "ct3_3" },
    { name: "ct3_4" },
    { name: "ct3_5" },
    { name: "ct4_1" },
    { name: "ct4_2" },
    { name: "ct4_3" },
    { name: "ct4_4" },
    { name: "ct4_5" },
    { name: "ct5_1" },
    { name: "ct5_2" },
    { name: "ct5_3" },
  ]),
  async (req, res) => {
    try {
      if (
        !(await saveUserLogsCode(req, "update", req.body.claims_id, "Claims"))
      ) {
        return res.send({ message: "Invalid User Code", success: false });
      }
      const claims_id = req.body.claims_id;
      const folderName = claims_id;
      const folderPath = path.join("./static/claim-files", folderName);
      fs.rm(folderPath, { recursive: true }, async (err) => {
        if (err) {
          console.error("Error removing folder:", err);
          res.status(500).send("Error removing folder");
          return;
        }
        let objToSave = Object.keys(req.files as any).reduce(
          (obj: any, value) => {
            obj[value] = "";
            return obj;
          },
          {}
        );
        Object.entries(req.files as any).forEach(([key, value]: any) => {
          let specFolder = "";
          const filesSave: any = [];
          const basicDocumentFolder = [
            "policyFile",
            "endorsement",
            "OPP",
            "ORCR",
            "DLOR",
            "PR",
            "DA",
            "SMCN",
          ];
          if (basicDocumentFolder.includes(key)) {
            specFolder = "Basic-Document";
          } else {
            specFolder = "Other-Document";
          }
          value.forEach((file: any) => {
            const uniqueFilename = generateUniqueFilename(file.originalname);
            const uploadDir = path.join(
              "./static/claim-files",
              claims_id,
              specFolder
            );
            if (!fs.existsSync(uploadDir)) {
              fs.mkdirSync(uploadDir, { recursive: true });
            }
            const filePath = path.join(uploadDir, uniqueFilename);
            const fileStream = fs.createWriteStream(filePath);
            filesSave.push({
              fileName: file.originalname,
              fileType: file.mimetype,
              uniqueFilename,
            });
            fileStream.write(file.buffer);
            fileStream.end();
          });
          objToSave[key] = JSON.stringify(filesSave);
        });
        req.body.totaDue = parseFloat(
          req.body.totaDue.toString().replace(/,/g, "")
        ).toFixed(2);
        req.body.totalpaid = parseFloat(
          req.body.totalpaid.toString().replace(/,/g, "")
        ).toFixed(2);
        req.body.balance = parseFloat(
          req.body.balance.toString().replace(/,/g, "")
        ).toFixed(2);
        req.body.remitted = parseFloat(
          req.body.remitted.toString().replace(/,/g, "")
        ).toFixed(2);
        req.body.dateReported = new Date(req.body.dateReported).toISOString();
        req.body.dateAccident = new Date(req.body.dateAccident).toISOString();
        delete req.body.search;
        delete req.body.mode;
        delete req.body.claims_id;
        delete req.body.userCodeConfirmation;
        delete req.body.DateFrom;
        delete req.body.DateTo;

        const date = new Date();
        await updateClaim({
          claims_id,
          claimData: {
            ...req.body,
            createdAt: date.toISOString(),
          },
          documentData: {
            claims_id,
            ...objToSave,
          },
        });
        res.send({
          message: "Claim is successfully update",
          success: true,
        });
      });
    } catch (error: any) {
      console.log(error.message);
      res.send({ message: error.message, success: false, insurance: [] });
    }
  }
);
function generateUniqueFilename(originalFilename: string) {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8); // Generates a random alphanumeric string
  const fileExtension = path.extname(originalFilename);
  return `${timestamp}-${randomString}${fileExtension}`;
}
Claim.get("/claims/get-insurance-list", async (req, res) => {
  try {
    res.send({
      message: "Successfully get insurance list",
      success: true,
      insurance: await getInsuranceList(),
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({ message: error.message, success: false, insurance: [] });
  }
});

Claim.get("/claims/get-policy", async (req, res) => {
  try {
    res.send({
      message: "Successfully get insurance list",
      success: true,
      claimPolicy: await claimsPolicy(req.query.searchPolicy as string),
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({ message: error.message, success: false, insurance: [] });
  }
});
Claim.get("/claims/get-claims-id", async (req, res) => {
  try {
    res.send({
      message: "Successfully get claims id",
      success: true,
      claim_id: await GenerateClaimsID(),
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({ message: error.message, success: false, insurance: [] });
  }
});
Claim.get("/claims/search-claims", async (req, res) => {
  try {
    res.send({
      message: "Successfully search claim",
      success: true,
      claims: await searchClaims(req.query.searchClaims as string),
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({ message: error.message, success: false, insurance: [] });
  }
});
Claim.post("/claims/selected-search-claims", async (req, res) => {
  try {
    setTimeout(async () => {
      const selectedRowData = req.body.selectedRowData;
      const claims_id = selectedRowData[0].claims_id;
      const data: any = await selectedData(claims_id);
      const formattedSelectedData: Array<any> = [];
      data.forEach((list: any) => {
        formattedSelectedData.push({
          id: list.claims_no,
          basicFileCustom: JSON.parse(list.basic),
          otherFileCustom: JSON.parse(list.others),
          policyState: {
            policy: list.policy,
            claim_type: parseInt(list.claim_type),
            insurance: list.insurance,
            PolicyNo: list.PolicyNo,
            PlateNo: list.PlateNo,
            Model: list.Model,
            BodyType: list.BodyType,
            Make: list.Make,
            ChassisNo: list.ChassisNo,
            MotorNo: list.MotorNo,
            ORNo: list.ORNo,
            CoverNo: list.CoverNo,
            BLTFileNo: list.BLTFileNo,
            AssuredName: list.AssuredName,
            IDNo: list.IDNo,
            totaDue: list.totaDue,
            totalpaid: list.totalpaid,
            balance: list.balance,
            remitted: list.remitted,
            Account: list.Account,
            status: parseInt(list.status),
            DateFrom: list.DateFrom,
            DateTo: list.DateTo,
            DateReceived: list.DateReceived,
            DateClaim: list.DateClaim,
            AmountClaim: list.AmountClaim,
            AmountApproved: list.AmountApproved,
            NameTPPD: list.NameTPPD,
          },
        });
      });
      res.send({
        message: "Successfully search claim",
        success: true,
        formattedSelectedData,
        claims_id,
      });
    }, 1000);
  } catch (error: any) {
    console.log(error.message);
    res.send({ message: error.message, success: false, insurance: [] });
  }
});
Claim.post("/claims/report-claim", async (req, res) => {
  try {
    const claimType = [
      "OWN DAMAGE",
      "LOST/CARNAP",
      "VTPL-PROPERTY DAMAGE",
      "VTPL-BODILY INJURY",
      "THIRD PARTY-DEATH",
    ];
    console.log(req.body);
    let whereStatement = "";
    if (req.body.format === 5) {
      whereStatement = ` AND claim_type = '${claimType[req.body.claim_type]}'`;
    } else if (req.body.format === 6) {
      whereStatement = ` AND PolicyNo = '${claimType[req.body.PolicyNo]}'`;
    } else {
      if (req.body.dateFormat === "Monthly") {
        const date = new Date(req.body.dateFrom);
        const firstDayOfMonth = startOfMonth(date);
        const lastDayOfMonth = endOfMonth(date);
        const formattedFirstDay = format(firstDayOfMonth, "yyyy-MM-dd");
        const formattedLastDay = format(lastDayOfMonth, "yyyy-MM-dd");
        whereStatement = selectByDate(formattedFirstDay, formattedLastDay);
      } else if (req.body.dateFormat === "Yearly") {
        req.body.dateFrom = new Date(req.body.dateFrom);
        const firstDayOfFirstMonth = startOfYear(req.body.dateFrom);
        const formattedFirstDay = format(firstDayOfFirstMonth, "yyyy-MM-dd");
        const  formattedLastDay = format(
          endOfMonth(
            endOfYear(addYears(req.body.dateFrom, parseInt(req.body.yearCount)))
          ),
          "yyyy-MM-dd"
        );
        whereStatement = selectByDate(formattedFirstDay, formattedLastDay);

      } else {
        whereStatement = selectByDate(
          format(new Date(req.body.dateFrom), "yyyy-MM-dd"),
          format(new Date(req.body.dateTo), "yyyy-MM-dd")
        );
      }

      function selectByDate(dateFrom: string, dateTo: string) {
        let qry = "";
        if (req.body.format == 0) {
          qry = ` AND DATE_FORMAT(a.createdAt, '%Y-%m-%d') >= '${dateFrom}' AND  DATE_FORMAT(a.createdAt, '%Y-%m-%d') <= '${dateTo}' `;
        } else if (req.body.format == 1) {
          qry = ` AND DATE_FORMAT(b.DateClaim, '%Y-%m-%d') >= '${dateFrom}' AND  DATE_FORMAT(b.DateClaim, '%Y-%m-%d') <= '${dateTo}' `;
        } else if (req.body.format == 2) {
          qry = ` AND DATE_FORMAT(b.dateInspected, '%Y-%m-%d') >= '${dateFrom}' AND  DATE_FORMAT(b.dateInspected, '%Y-%m-%d') <= '${dateTo}' `;
        } else {
          qry = ` AND DATE_FORMAT(a.DateReceived, '%Y-%m-%d') >= '${dateFrom}' AND  DATE_FORMAT(a.DateReceived, '%Y-%m-%d') <= '${dateTo}' `;
        }
        return qry;
      }
    }
    const report = await claimReport(whereStatement);
    res.send({
      message: "Successfully generate report",
      success: true,
      report,
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});
export default Claim;
