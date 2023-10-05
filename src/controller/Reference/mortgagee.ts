import express, { Request, Response } from "express";
import { mapDataBasedOnHeaders } from "../../lib/mapbaseonheader";
import { ExportToExcel } from "../../lib/exporttoexcel";
import {
  addMortgagee,
  deleteMortgagee,
  findMortgagee,
  getMortgagee,
  getMortgageePolicy,
  updateMortgagee
} from "../../model/Reference/mortgagee.model";

const Mortgagee = express.Router();

Mortgagee.post("/add-mortgagee", async (req: Request, res: Response) => {
  try {
    if (await findMortgagee(req.body.Mortgagee)) {
      return res.send({
        message: "Mortgagee is Already Exist Successfully!",
        success: false,
      });
    }

    await addMortgagee(req.body);
    return res.send({
      message: "Create Mortgagee Successfully!",
      success: true,
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

Mortgagee.get("/get-mortgagee", async (req: Request, res: Response) => {
  const { mortgageeSearch } = req.query;
  try {
    const mortgagee = await getMortgagee((mortgageeSearch ?? "") as string);
    const policy = await getMortgageePolicy();
    res.send({
      message: "Get Mortgagee Successfully!",
      success: true,
      mortgagee: {
        mortgagee,
        policy,
      },
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

Mortgagee.post("/delete-mortgagee", async (req: Request, res: Response) => {
  const { Mortgagee } = req.body;

  try {
    await deleteMortgagee(Mortgagee);
    res.send({
      message: "Delete Mortgagee Successfully!",
      success: true,
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

Mortgagee.post("/update-mortgagee", async (req: Request, res: Response) => {

  try {
    await updateMortgagee(req.body);
    res.send({
      message: "Update Mortgagee Successfully!",
      success: true,
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});


// Mortgagee.get("/export-sub-account", async (req, res) => {
//   const subAccountHeaders: any = {
//     SubAccount: {
//       header: ["Sub Account ID", "Acronym","Short Name", "Description", "Created At"],
//       row: ["Sub_Acct", "Acronym", "ShortName","Description", "createdAt"],
//     },
//   };
//   const { policySearch, isAll } = req.query;

//   let data = [];
//   if (JSON.parse(isAll as string)) {
//     data = mapDataBasedOnHeaders(
//       (await searchSubAccount("", true)) as Array<any>,
//       subAccountHeaders,
//       "SubAccount"
//     );
//   } else {
//     data = mapDataBasedOnHeaders(
//       (await searchSubAccount(policySearch as string)) as Array<any>,
//       subAccountHeaders,
//       "SubAccount"
//     );
//   }

//   ExportToExcel(data, res);
// });

// Policy	        Mortgagee
// TPL	            N I L - HN
// TPL	            AMIFIN
// TPL         	    N I L
// Comprehensive	CASH MANAGEMENT FINANCE INC.
// Comprehensive	CREDIT MASTERS & LENDING INVESTORS CORP.
// Comprehensive	CAMFIN LENDING, INC.
// Comprehensive	ASIAN CONSUMERS BANK
// Comprehensive	ORIX METRO LEASING AND FINANCE CORPORATION
// Comprehensive	METROPOLITAN BANK & TRUST COMPANY
// Comprehensive	UNION BANK OF THE PHILIPPINES
// Comprehensive	BANCO DE ORO UNIBANK, INC.
// Comprehensive	RADIOWEALTH FINANCE COMPANY, INC.
// Comprehensive	UCPB LEASING AND FINANCE, CORP.
// Comprehensive	RURAL BANK
// Comprehensive	PS BANK
// Comprehensive	EASTWEST BANK
// Comprehensive	FILIPINO FINANCIAL CORPORATION
// Comprehensive	SOUTH ASIALINK CREDIT CORP.
// Comprehensive	TOYOTA FINANCIAL SERVICES PHILIPPINES CORPORATION
// Comprehensive	ASIA LINK FINANCE CORP.
// FIRE	          WATER AND SEWERAGE SECTOR SAVINGS AND LOAN ASSOCIATION, INC. (WASSLAI)
// Comprehensive	PHILIPPINE SAVINGS BANK
// Comprehensive	RIZAL COMMERCIAL BANKING CORPORATION
// Comprehensive	LAND BANK OF THE PHILIPPINES
// Comprehensive	PRIME AMA LENDING CORP.
// Comprehensive	INTER-ASIA DEVELOPMENT BANK
// Comprehensive	SECURITY BANK CORP.
// TPL	            N I L - ASTRA
export default Mortgagee;
