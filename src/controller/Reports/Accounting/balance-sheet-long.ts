import { PrismaClient } from "@prisma/client";
import express from "express";
import { FinancialStatement } from "../../../model/db/stored-procedured";

const BalanceSheetLong = express.Router();
const prisma = new PrismaClient();

BalanceSheetLong.post("/balance-sheet-long-report", async (req, res) => {
  console.log(req.body);

  //   {
  //     dateFormat: 'Daily',
  //     format: 0,
  //     date: '2024-05-03T05:09:35.550Z',
  //     sub_acct: 'All',
  //     title: 'UPWARD MANAGEMENT INSURANCE SERVICES\n' +
  //       'Daily Balance Sheet - Long\n' +
  //       'May 3, 2024',
  //     nominalAccount: 0
  //   }
  let qry = "";
  if (req.body.format === 0) {
    const tmp = `
    select 
        tmp.Code ,
        tmp.Title ,
        tmp.PrevDebit  ,
        tmp.PrevCredit  ,
        tmp.PrevBalance  ,
        tmp.CurrDebit  ,
        tmp.CurrCredit  ,
        tmp.CurrBalance  ,
        tmp.BalDebit  ,
        tmp.BalCredit  ,
        tmp.TotalBalance  
    from (${FinancialStatement(
      req.body.date,
      req.body.sub_acct,
      req.body.dateFormat
    )}) tmp
  `;
    const tmp1 = `
    SELECT
        Code,
        Title,
        LEFT(Code, 1) AS H1,
        LEFT(Code, 4) AS H2,
        CASE WHEN CAST(LEFT(Code, 1) AS UNSIGNED) >= 4 THEN PrevCredit - PrevDebit ELSE PrevBalance END AS PrevBalance,
        CurrDebit,
        CurrCredit,
        CASE WHEN CAST(LEFT(Code, 1) AS UNSIGNED) >= 4 THEN CurrCredit - CurrDebit ELSE CurrBalance END AS CurrBalance,
        CASE WHEN CAST(LEFT(Code, 1) AS UNSIGNED) >= 4 THEN (PrevCredit - PrevDebit) + (CurrCredit - CurrDebit) ELSE TotalBalance END AS TotalBalance
    FROM (${tmp}) tmp
    WHERE LEFT(Code, 1) <= 5
  `;
    const finalTemp = `
    SELECT
        LEFT(tmp1.Code, 1) AS H1,
        tmp1.H2,
        Chart_Account.Acct_Title AS HT2,
        tmp1.Code AS H3,
        tmp1.Title AS HT3,
        PrevBalance,
        CurrDebit,
        CurrCredit,
        CurrBalance,
        TotalBalance
    FROM (${tmp1}) tmp1
    LEFT JOIN Chart_Account ON tmp1.H2 = Chart_Account.Acct_Code
  `;
    let final = `
    SELECT
        H1,
        Chart_Account.Acct_Title AS HT1,
        H2,
        HT2,
        H3,
        HT3,
        PrevBalance,
        CurrDebit,
        CurrCredit,
        CurrBalance,
        TotalBalance
    FROM (${finalTemp}) FinalTemp
    LEFT JOIN Chart_Account ON FinalTemp.H1 = Chart_Account.Acct_Code
  `;
    const tmp2 = `
    SELECT
        PrevDebit,
        PrevCredit,
        CASE WHEN LEFT(Code, 1) = '6' THEN PrevCredit - PrevDebit ELSE PrevBalance END AS PrevBalance,
        CurrDebit,
        CurrCredit,
        CASE WHEN LEFT(Code, 1) = '6' THEN CurrCredit - CurrDebit ELSE CurrBalance END AS CurrBalance,
        CASE WHEN LEFT(Code, 1) = '6' THEN (PrevCredit - PrevDebit) + (CurrCredit - CurrDebit) ELSE TotalBalance END AS TotalBalance
        FROM (${tmp}) tmp
    WHERE LEFT(Code, 1) >= 6
  `;
    const finals = `
 ${final}
 union all
    SELECT
        '5' AS H1,
        'STOCKHOLDERS EQUITY' AS HT1,
        '5.50' AS H2,
        'RESULT OF OPERATION' AS HT2,
        '5.50.01' AS H3,
        'Net Income / (Loss)' AS HT3,
        SUM(PrevCredit) - SUM(PrevDebit),
        SUM(CurrDebit),
        SUM(CurrCredit),
        SUM(CurrCredit) - SUM(CurrDebit),
        (SUM(PrevCredit) - SUM(PrevDebit)) + (SUM(CurrCredit) - SUM(CurrDebit))
    FROM (${tmp2}) tmp2
   `;
    qry = `
    SELECT
      H1,
      HT1,
      H2,
      HT2,
      H3,
      HT3,
      format(PrevBalance,0) as PrevBalance,
      format(CurrDebit,0) as CurrDebit,
      format(CurrCredit,0) as CurrCredit,
      format(CurrBalance,0) as CurrBalance,
      format(TotalBalance,0) as TotalBalance,
      CASE WHEN CAST(H1 AS UNSIGNED) < 4 THEN 'ASSETS' ELSE 'LIABILITIES' END AS H 
    FROM (${finals}) Final`;
  } else {
    const tmp = `
    select
    Code , 
    Title , 
    PrevDebit , 
    PrevCredit , 
    PrevBalance , 
    CurrDebit , 
    CurrCredit , 
    CurrBalance , 
    BalDebit , 
    BalCredit , 
    TotalBalance
    from (${FinancialStatement(
      req.body.date,
      req.body.sub_acct,
      req.body.dateFormat
    )}) tmp
  `;
    const tmp1 = `
    SELECT 
      tmp.Code, 
      tmp.Title, 
      LEFT(tmp.Code, 1) AS H1, 
      LEFT(tmp.Code, 4) AS H2, 
      IF(CAST(LEFT(tmp.Code, 1) AS SIGNED) >= 4, PrevCredit-PrevDebit, PrevBalance) AS PrevBalance, 
      CurrDebit, 
      CurrCredit, 
      IF(CAST(LEFT(tmp.Code, 1) AS SIGNED) >= 4, CurrCredit-CurrDebit, CurrBalance) AS CurrBalance, 
      IF(CAST(LEFT(tmp.Code, 1) AS SIGNED) >= 4, (PrevCredit-PrevDebit)+(CurrCredit-CurrDebit), TotalBalance) AS TotalBalance
      FROM (${tmp}) tmp
    WHERE LEFT(tmp.Code, 1) <= '5'`;
    const FinalTemp = `
    SELECT 
    LEFT(tmp1.Code, 1) AS H1, 
    tmp1.H2, 
    ca.Acct_Title AS HT2, 
    tmp1.Code AS H3, 
    tmp1.Title AS HT3, 
    PrevBalance, 
    CurrDebit, 
    CurrCredit, 
    CurrBalance, 
    TotalBalance
    FROM (${tmp1}) tmp1 LEFT JOIN chart_account  ca ON tmp1.H2 = ca.Acct_Code
    `;
    const Final = `
      SELECT 
        H1, 
        ca.Acct_Title AS HT1, 
        H2, 
        HT2, 
        H3, 
        HT3, 
        format(ifnull(PrevBalance,0),2) as PrevBalance,
        format(ifnull(CurrDebit,0),2) as CurrDebit,
        format(ifnull(CurrCredit,0),2) as CurrCredit,
        format(ifnull(CurrBalance,0),2) as CurrBalance,
        format(ifnull(TotalBalance,0),2) as TotalBalance
      FROM (${FinalTemp}) FinalTemp LEFT JOIN chart_account ca ON FinalTemp.H1 = ca.Acct_Code
      `;
    const tmp2 = `
      SELECT 
        PrevDebit, 
        PrevCredit, 
        IF(LEFT(tmp.Code, 1) = '6', PrevCredit-PrevDebit, PrevBalance) AS PrevBalance, 
        CurrDebit, 
        CurrCredit, 
        IF(LEFT(tmp.Code, 1) = '6', CurrCredit-CurrDebit, CurrBalance) AS CurrBalance, 
        IF(LEFT(Code, 1) = '6', (PrevCredit-PrevDebit)+(CurrCredit-CurrDebit), TotalBalance) AS TotalBalance
      FROM (${tmp}) tmp
      WHERE LEFT(tmp.Code, 1) >= '6'`;
    const Finals = `
      (${Final})
      union all
      SELECT 
        '5',
        'STOCKHOLDERS EQUITY',
        '5.50',
        'RESULT OF OPERATION', 
        '5.50.01', 
        'Net Income / (Loss)', 
        format(ifnull(SUM(PrevCredit) - SUM(PrevDebit),0),2),
        format(ifnull(SUM(CurrDebit),0),2),
        format(ifnull(SUM(CurrCredit),0),2),
        format(ifnull(SUM(CurrCredit) - SUM(CurrDebit) ,0)),
        format(ifnull((SUM(PrevCredit) - SUM(PrevDebit)) + (SUM(CurrCredit) - SUM(CurrDebit)) ,0))
      FROM (${tmp2}) tmp2`;
    qry = `
    SELECT  
      H1,
      HT1,
      H2,
      HT2,
      H3,
      HT3,
      format(PrevBalance,0) as PrevBalance,
      format(CurrDebit,0) as CurrDebit,
      format(CurrCredit,0) as CurrCredit,
      format(CurrBalance,0) as CurrBalance,
      format(TotalBalance,0) as TotalBalance,
      CASE WHEN CAST(H1 AS UNSIGNED) < 4 THEN 'ASSETS' ELSE 'LIABILITIES' END AS H 
    FROM (${Finals}) Final`;
  }
  console.log(qry);
  const data: any = await prisma.$queryRawUnsafe(qry);
  const assetArray = data.filter((itm: any) => itm.H === "ASSETS");
  assetArray.unshift({
    H1: "",
    HT1: "TOTAL ASSET",
    H2: "",
    HT2: "",
    H3: "",
    HT3: "",
    PrevBalance: "",
    CurrDebit: "",
    CurrCredit: "",
    CurrBalance: "",
    TotalBalance: "",
    H: "",
  });
  assetArray.push({
    H1: "",
    HT1: "ASSET",
    H2: "",
    HT2: "",
    H3: "",
    HT3: "",
    PrevBalance: formatNumber(getTotal(assetArray, "PrevBalance")),
    CurrDebit: formatNumber(getTotal(assetArray, "CurrDebit")),
    CurrCredit: formatNumber(getTotal(assetArray, "CurrCredit")),
    CurrBalance: formatNumber(getTotal(assetArray, "CurrBalance")),
    TotalBalance: formatNumber(getTotal(assetArray, "TotalBalance")),
    H: "",
  });
  // const liabilitiesArray = data.filter((itm: any) => itm.H === "LIABILITIES");
  // const assetArrayBody = arrangeArray(assetArray, "HT2");
  // const liabilitiesArrayBody = arrangeArray(liabilitiesArray, "HT2");

  try {
    res.send({
      message: "Successfully ger report",
      success: true,
      assetArray,
    });
  } catch (err: any) {
    console.log(err.message);
    res.send({
      message: err.message,
      success: false,
      report: [],
    });
  }
});

function formatNumber(number:number){
 return number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
function getTotal(array: Array<any>, datakey: string) {
  return array.reduce((d: any, itms: any) => {
    return (
      d +
      Math.abs(
        parseFloat(Math.abs(itms[datakey]).toString()?.replace(/,/g, ""))
      )
    );
  }, 0);
}

// function arrangeArray(dataArray: Array<any>, datakey: string) {
//   const groupedDataIncome = dataArray.reduce((acc: any, obj: any) => {
//     const key = obj[datakey];
//     if (!acc[key]) {
//       acc[key] = [];
//     }
//     acc[key].push(obj);
//     return acc;
//   }, {});

//   for (const group in groupedDataIncome) {
//     const groupTotal = groupedDataIncome[group].reduce(
//       (acc: any, obj: any) => {
//         acc.PrevBalance += Math.abs(
//           parseFloat(obj.PrevBalance?.toString().replace(/,/g, "") || 0)
//         );
//         acc.CurrDebit += Math.abs(
//           parseFloat(obj.CurrDebit?.toString().replace(/,/g, "") || 0)
//         );
//         acc.CurrCredit += Math.abs(
//           parseFloat(obj.CurrCredit?.toString().replace(/,/g, "") || 0)
//         );
//         acc.CurrBalance += Math.abs(
//           parseFloat(obj.CurrBalance?.toString().replace(/,/g, "") || 0)
//         );
//         acc.TotalBalance += Math.abs(
//           parseFloat(obj.TotalBalance?.toString().replace(/,/g, "") || 0)
//         );
//         return acc;
//       },
//       {
//         PrevBalance: 0,
//         CurrDebit: 0,
//         CurrCredit: 0,
//         CurrBalance: 0,
//         TotalBalance: 0,
//       }
//     );
//     const summaryObjectFirst: any = {
//       H1: "",
//       HT1: groupedDataIncome[group][0].HT1,
//       H2: "",
//       HT2: groupedDataIncome[group][0].HT2,
//       H3: "",
//       HT3: "",
//       PrevBalance: "",
//       CurrDebit: "",
//       CurrCredit: "",
//       CurrBalance: "",
//       TotalBalance: "",
//       H: "",
//     };
//     summaryObjectFirst[datakey] = group;
//     groupedDataIncome[group].unshift(summaryObjectFirst);
//     const summaryObjectLast: any = {
//       H1: "",
//       HT1: groupedDataIncome[group][0].HT1,
//       H2: "",
//       HT2: groupedDataIncome[group][0].HT2,
//       H3: "",
//       HT3: "",
//       PrevBalance: groupTotal.PrevBalance.toString(),
//       CurrDebit: groupTotal.CurrDebit.toString(),
//       CurrCredit: groupTotal.CurrCredit.toString(),
//       CurrBalance: groupTotal.CurrBalance.toString(),
//       TotalBalance: groupTotal.TotalBalance.toString(),
//       H: "",
//     };
//     summaryObjectLast[datakey] = group;
//     groupedDataIncome[group].push(summaryObjectLast);
//   }

//   const r = Object.values(groupedDataIncome);
//   r.forEach((d: any) => {
//     let PrevBalance = 0;
//     let CurrDebit = 0;
//     let CurrCredit = 0;
//     let CurrBalance = 0;
//     let TotalBalance = 0;

//     d.forEach((data: any, idx: number) => {
//       if (idx === d.length - 1) {
//         PrevBalance += Math.abs(
//           parseFloat(data.PrevBalance.toString().replace(/,/g, "") || 0)
//         );
//         CurrDebit += Math.abs(
//           parseFloat(data.CurrDebit.toString().replace(/,/g, "") || 0)
//         );
//         CurrCredit += Math.abs(
//           parseFloat(data.CurrCredit.toString().replace(/,/g, "") || 0)
//         );
//         CurrBalance += Math.abs(
//           parseFloat(data.CurrBalance.toString().replace(/,/g, "") || 0)
//         );
//         TotalBalance += Math.abs(
//           parseFloat(data.TotalBalance.toString().replace(/,/g, "") || 0)
//         );
//       }
//     });
//     d.push({
//       H1: "",
//       HT1: d[0].HT1,
//       H2: "",
//       HT2: d[0].HT2,
//       H3: "",
//       HT3: "",
//       PrevBalance,
//       CurrDebit,
//       CurrCredit,
//       CurrBalance,
//       TotalBalance,
//       H: "",
//     });
//     d.unshift({
//       H1: "",
//       HT1: d[0].HT1,
//       H2: "",
//       HT2: d[0].HT2,
//       H3: "",
//       HT3: "",
//       PrevBalance: "",
//       CurrDebit: "",
//       CurrCredit: "",
//       CurrBalance: "",
//       TotalBalance: "",
//       H: "",
//     });
//   });
//   return Object.values(groupedDataIncome);
// }

export default BalanceSheetLong;
