import express, { Request, Response } from "express";
import { mapDataBasedOnHeaders } from "../../lib/mapbaseonheader";
import { ExportToExcel } from "../../lib/exporttoexcel";
import {
  addSubline,
  findSubline,
  getline,
  searchSubline,
  updateSubline,
  deletesubline
} from "../../model/Reference/subline.model";

const Subline = express.Router();

Subline.get("/get-subline", async (req: Request, res: Response) => {
  const { sublineSearch } = req.query;
  try {
    const subline = await searchSubline(sublineSearch as string);
    const line = await getline();
    res.send({
      message: "Get Subline Successfully!",
      success: true,
      subline: {
        subline,
        line,
      },
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

Subline.post("/add-subline", async (req: Request, res: Response) => {
  try {
    req.body.createdAt = new Date()
    if ((await findSubline(req.body.Line, req.body.SublineName)).length > 0) {
      return res.send({
        message: "Already Exist!",
        success: false,
      });
    }

    await addSubline(req.body);
    return res.send({
      message: "Create Mortgagee Successfully!",
      success: true,
    });
  } catch (err: any) {
    console.log(err.message)
    res.send({ message: err.message, success: false });
  }
});

Subline.post("/delete-subline", async (req: Request, res: Response) => {
  const { ID } = req.body;

  try {
    await deletesubline(parseInt(req.body.ID));
    res.send({
      message: "Delete Subline Successfully!",
      success: true,
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

Subline.post("/update-subline", async (req: Request, res: Response) => {
  try {
    await updateSubline({SublineName:req.body.SublineName,ID:parseInt(req.body.ID)});
    res.send({
      message: "Update Subline Successfully!",
      success: true,
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

Subline.get("/search-subline", async (req: Request, res: Response) => {
  const { sublineSearch } = req.query;
  try {
    const subline: any = await searchSubline(sublineSearch as string);
    res.send({
      message: "Search Subline Successfuly",
      success: true,
      subline,
    });
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

Subline.get("/export-subline", async (req, res) => {
  const subAccountHeaders: any = {
    Subline: {
      header: ["ID", "Line","Subline Name", "Created At"],
      row: ["ID", "Line","SublineName", "createdAt"],
    },
  };
  const { sublineSearch, isAll } = req.query;

  let data = [];
  if (JSON.parse(isAll as string)) {
    data = mapDataBasedOnHeaders(
      (await searchSubline("", true)) as Array<any>,
      subAccountHeaders,
      "Subline"
    );
  } else {
    data = mapDataBasedOnHeaders(
      (await searchSubline(sublineSearch as string)) as Array<any>,
      subAccountHeaders,
      "Subline"
    );
  }

  ExportToExcel(data, res);
});

export default Subline;
