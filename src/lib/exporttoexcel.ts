import { Response } from "express";
import excel from "exceljs";
import fs from "fs";
import { v4 as uuidV4 } from "uuid";

export function ExportToExcel(data: Array<any>, res: Response) {
  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet("Sheet 1");

  data.forEach((items: any) => {
    worksheet.addRow(items);
  });
  const name = uuidV4();
  const excelFilePath = `${name}.xlsx`;

  worksheet.eachRow(function (row, rowNumber) {
    row.eachCell(function (cell, colNumber) {
      if (cell.value)
        row.getCell(colNumber).font = { color: { argb: "004e47cc" } };

    });
  });
  worksheet.columns.forEach((col:any) => {
    //next we find the value with the largest length
    //we can access the values through col.value
    //we can use the reduce function to find the largest value
            const largestValueLength = col.values.reduce((maxWidth:any, value:any) => {
    //the maxWidth starts at 0
    //we compare the length of the value to the maxWidth and if it's larger, the maxWidth will update to the larger value.
    //It will do this for each value in every cell, and only the largest value will remain
                    if (value && value.length > maxWidth) {
                        return value.length;
                    }
                    return maxWidth;
                }, 0);
    //finally we can set the width of the column to the new number
    //we can access the width through the col.width
          col.width = largestValueLength + 8;
        });

  workbook.xlsx
    .writeFile(excelFilePath)
    .then(() => {
      res.download(excelFilePath, `${name}.xlsx`, (err) => {
        if (err) {
          console.error("Error while downloading:", err);
        } else {
          fs.unlinkSync(excelFilePath);
        }
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    });
}
