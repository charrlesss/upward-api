import { addMonths, format } from "date-fns";
import { clients_view } from "./views";

export function FinancialStatement(
  date: any,
  sub_acct: string,
  dateFormat: string
) {
  const dateFrom = new Date(date);

  let currText = "";
  let prevText = "";
  let DateFrom = "";
  let DateTo = "";

  const SubAcctParam = sub_acct.toUpperCase();
  if (dateFormat === "Daily") {
    DateFrom = format(dateFrom, "yyyy-MM-dd");
    DateTo = format(dateFrom, "yyyy-MM-dd");
  } else {
    DateFrom = format(dateFrom, "yyyy-MM-dd");
    DateTo = format(addMonths(dateFrom, 1), "yyyy-MM-dd");
  }

  if (SubAcctParam === "ALL") {
    prevText = `
        SELECT
          GL_Acct as GL_Acct,
          SUM(IFNULL(Debit, 0)) as Debit,
          SUM(IFNULL(Credit, 0)) as Credit,
          SUM(IFNULL(Debit, 0)) - SUM(IFNULL(Credit, 0)) as Balance
        FROM Journal
        WHERE Source_Type NOT IN ('AB', 'BF', 'BFS', 'BFD')
        AND Date_Entry <= '${DateFrom}'
        GROUP BY GL_Acct`;
  } else {
    prevText = `
        SELECT
          GL_Acct as GL_Acct,
          SUM(IFNULL(Debit, 0)) as Debit,
          SUM(IFNULL(Credit, 0)) as Credit,
          SUM(IFNULL(Debit, 0)) - SUM(IFNULL(Credit, 0)) as Balance
        FROM Journal
        WHERE Source_Type NOT IN ('AB', 'BF', 'BFS', 'BFD')
        AND Sub_Acct = SubAcctParam
        AND Date_Entry <= '${DateFrom}'
        GROUP BY GL_Acct`;
  }
  if (SubAcctParam === "ALL") {
    currText = `
          SELECT
            GL_Acct as GL_Acct,
            SUM(IFNULL(Debit, 0)) as Debit,
            SUM(IFNULL(Credit, 0)) as Credit,
            SUM(IFNULL(Debit, 0)) - SUM(IFNULL(Credit, 0)) as Balance
          FROM Journal
          WHERE Source_Type NOT IN ('AB', 'BF', 'BFS', 'BFD')
          AND Date_Entry >= '${DateFrom}' AND Date_Entry <= '${DateTo}'
          GROUP BY GL_Acct`;
  } else {
    currText = `
            SELECT
          GL_Acct,
          SUM(IFNULL(Debit, 0)) as Debit,
          SUM(IFNULL(Credit, 0)) as Credit,
          SUM(IFNULL(Debit, 0)) - SUM(IFNULL(Credit, 0)) as Balance
            FROM Journal
            WHERE Source_Type NOT IN ('AB', 'BF', 'BFS', 'BFD')
            AND Sub_Acct = SubAcctParam
            AND Date_Entry >= '${DateFrom}' AND Date_Entry <= '${DateTo}'
            GROUP BY GL_Acct`;
  }
  return `
       SELECT
          Acct_Code AS Code,
          Acct_Title AS Title,
          IFNULL(Prev.Debit, 0) AS PrevDebit,
          IFNULL(Prev.Credit, 0)  AS PrevCredit,
          IFNULL(Prev.Balance, 0)  AS PrevBalance,
          IFNULL(Curr.Debit, 0)    AS CurrDebit,
          IFNULL(Curr.Credit, 0)  AS CurrCredit,
          IFNULL(Curr.Balance, 0)  AS CurrBalance,
          IFNULL(Prev.Debit, 0) + IFNULL(Curr.Debit, 0)  AS BalDebit,
          IFNULL(Prev.Credit, 0) + IFNULL(Curr.Credit, 0)  AS BalCredit,
          IFNULL(Prev.Balance, 0) + IFNULL(Curr.Balance, 0)  AS TotalBalance
      FROM
          chart_account
          LEFT JOIN (${currText}) Curr ON chart_account.Acct_Code = Curr.GL_Acct
          LEFT JOIN (${prevText}) Prev ON chart_account.Acct_Code = Prev.GL_Acct
      WHERE IFNULL(Prev.Balance, 0) <>  0 OR IFNULL(Curr.Balance, 0) <>  0
      ORDER BY chart_account.Acct_Code
    `;
}
export function FinancialStatementSumm(date: any, dateFormat: string) {
  const dateFrom = new Date(date);
  let DateFrom = "";
  let DateTo = "";

  if (dateFormat === "Daily") {
    DateFrom = format(dateFrom, "yyyy-MM-dd");
    DateTo = format(dateFrom, "yyyy-MM-dd");
  } else {
    DateFrom = format(dateFrom, "yyyy-MM-dd");
    DateTo = format(addMonths(dateFrom, 1), "yyyy-MM-dd");
  }

  const prev = `
    SELECT  
        MAX(Sub_Acct) as Sub_Acct,  
        GL_Acct, 
        SUM(IFNULL(Debit, 0)) as Debit, 
        SUM(IFNULL(Credit, 0)) as Credit, 
        SUM(IFNULL(Debit, 0)) - SUM(IFNULL(Credit, 0)) as Balance
        FROM Journal
        AND str_to_date(Date_Entry,'%Y-%m-%d') < '${DateFrom}'
        GROUP BY GL_Acct
        `;
  const curr = `
        SELECT 
        MAX(Sub_Acct) as Sub_Acct,  
        GL_Acct, 
        SUM(IFNULL(Debit, 0)) as Debit, 
        SUM(IFNULL(Credit, 0)) as Credit, 
        SUM(IFNULL(Debit, 0)) - SUM(IFNULL(Credit, 0)) as Balance
        FROM Journal
        WHERE Source_Type NOT IN ('AB', 'BF', 'BFS', 'BFD')
        AND str_to_date(Date_Entry,'%Y-%m-%d') >= '${DateFrom}' AND str_to_date(Date_Entry,'%Y-%m-%d') <= '${DateTo}'
        GROUP BY GL_Acct
        `;
  const union_temp = `
        SELECT * FROM (${prev}) Prev
        UNION ALL
        SELECT * FROM (${curr}) Curr
        `;
  const total = `
        SELECT GL_Acct, SUM(Debit) - SUM(Credit) AS Balance
        FROM (${union_temp}) union_temp
        GROUP BY GL_Acct
        `;
  return `
        SELECT SubAccount.Acronym AS SACode,
        SubAccount.ShortName AS SubAccount,
        Chart_Account.Acct_Code AS Code,
        CONCAT(Chart_Account.Acct_Code, ' ', Acct_Title) AS Title,
        SUM(Debit) - SUM(Credit) AS Balance,
        total.Balance AS TotalBalance
        FROM Chart_Account
        LEFT JOIN (${union_temp}) union_temp ON Chart_Account.Acct_Code = union_temp.GL_Acct
        LEFT JOIN Sub_Account SubAccount ON union_temp.Sub_Acct = SubAccount.Acronym
        LEFT JOIN (${total}) total ON union_temp.GL_Acct = total.GL_Acct
        GROUP BY union_temp.GL_Acct, SubAccount.Sub_Acct, SubAccount.ShortName, Chart_Account.Acct_Code, Acct_Title, total.Balance
        HAVING SUM(Debit) - SUM(Credit) IS NOT NULL
        ORDER BY Chart_Account.Acct_Code`;
}
export function client_ids(search: string) {
  const selectClient = `
        SELECT 
        "Client" as IDType,
        aa.entry_client_id AS IDNo,
        aa.sub_account,
        if(aa.company = "", CONCAT(aa.lastname, ",", aa.firstname), aa.company) as Shortname,
        aa.entry_client_id as client_id  
        FROM
          entry_client aa
        union all
        SELECT 
        "Agent" as IDType,
        aa.entry_agent_id AS IDNo,
        aa.sub_account,
        CONCAT(aa.lastname, ",", aa.firstname) AS Shortname,
        aa.entry_agent_id as client_id  
        FROM
          entry_agent aa
        union all
        SELECT 
        "Employee" as IDType,
        aa.entry_employee_id AS IDNo,
        aa.sub_account,
        CONCAT(aa.lastname, ",", aa.firstname) AS Shortname,
        aa.entry_employee_id as client_id
        FROM
          entry_employee aa
        union all
        SELECT 
        "Supplier" as IDType,
        aa.entry_supplier_id AS IDNo,
        aa.sub_account,
        if(aa.company = "", CONCAT(aa.lastname, ",", aa.firstname), aa.company) as Shortname,
        aa.entry_supplier_id as client_id
        FROM
          entry_supplier aa
        union all
        SELECT 
        "Fixed Assets" as IDType,
        aa.entry_fixed_assets_id AS IDNo,
        aa.sub_account,
        aa.fullname AS Shortname,
        aa.entry_fixed_assets_id as client_id
        FROM
          entry_fixed_assets aa
        union all
        SELECT 
        "Others" as IDType,
        aa.entry_others_id AS IDNo,
        aa.sub_account,
        aa.description AS Shortname,
        aa.entry_others_id as client_id
        FROM
          entry_others aa
        `;
  return `
  SELECT 
    *
FROM
    (
      SELECT 
      *
  FROM
      (${selectClient}) a
  WHERE
      a.IDNo NOT IN 
      (SELECT IDNo FROM   policy GROUP BY IDNo) 
  UNION ALL SELECT 
          'Policy' AS IDType,
          a.PolicyNo AS IDNo,
          b.sub_account,
          b.Shortname,
          a.IDNo AS client_id
  FROM
        policy a
  LEFT JOIN (${selectClient}) b ON a.IDNo = b.IDNo
  WHERE
      a.PolicyNo NOT IN 
      (SELECT a.IDNo FROM (${selectClient}) a)
  ) a
WHERE
  a.IDNo LIKE '%${search}%'
	OR a.Shortname LIKE '%${search}%'
ORDER BY a.Shortname
LIMIT 50
        `;
}
export function createTPLID() {
  return `
        select
        concat(
          'TP-',
          right('000000',6 - LENGTH(CAST(CAST(substring(IF(
            a.PolicyNo = '' OR a.PolicyNo IS NULL,'1',a.PolicyNo), 4) as SIGNED) + 1 As SIGNED))),
            IF(
              a.PolicyNo = '' OR a.PolicyNo IS NULL,
              '1',
              CAST(substring(a.PolicyNo,4) as SIGNED) +1
            )
          ) AS tempPolicy_No
          from (
            SELECT  MAX(PolicyNo) as PolicyNo FROM  vpolicy a where left(a.PolicyNo ,2) = 'TP' and a.PolicyType = 'COM' ORDER BY a.PolicyNo ASC
          ) a
          `;
}
export function id_entry(WhereIDEntry: string) {
  return `
          select * from (SELECT 
            CONCAT(aa.firstname, ', ', aa.lastname) AS ShortName,
            aa.entry_client_id AS IDNo,
            aa.firstname,
            aa.middlename,
            aa.company,
            aa.address,
            aa.option AS options,
            aa.sub_account,
            aa.createdAt,
            aa.update AS updatedAt,
            aa.client_contact_details_id AS contact_details_id,
            NULL AS description,
            NULL AS remarks,
            NULL AS VAT_Type,
            NULL AS tin_no
            FROM
              entry_client aa 
            UNION ALL SELECT 
            CONCAT(aa.firstname, ', ', aa.lastname) AS ShortName,
            aa.entry_agent_id AS IDNo,
            aa.firstname,
            aa.middlename,
            NULL AS company,
            aa.address,0
            NULL AS options,
            NULL AS sub_account,
            aa.createdAt,
            aa.update AS updatedAt,
            aa.agent_contact_details_id AS contact_details_id,
            WHERE Source_Type NOT IN ('AB', 'BF', 'BFS', 'BFD')
            NULL AS description,
            NULL AS remarks,
            NULL AS VAT_Type,
            NULL AS tin_no
            FROM
          entry_agent aa 
    UNION ALL SELECT 
        CONCAT(aa.firstname, ', ', aa.lastname) AS ShortName,
        aa.entry_employee_id AS IDNo,
        aa.firstname,
        aa.middlename,
        NULL AS company,
        aa.address,
        NULL AS options,
        aa.sub_account,
        aa.createdAt,
        aa.update AS updatedAt,
        NULL AS contact_details_id,
        NULL AS description,
        NULL AS remarks,
        NULL AS VAT_Type,
        NULL AS tin_no
    FROM
          entry_employee aa 
    UNION ALL SELECT 
        aa.fullname AS ShortName,
        aa.entry_fixed_assets_id AS IDNo,
        NULL AS firstname,
        NULL AS middlename,
        NULL AS company,
        NULL AS address,
        NULL AS options,
        NULL AS sub_account,
        aa.createdAt,
        aa.update AS updatedAt,
        NULL AS contact_details_id,
        aa.description,
        aa.remarks,
        NULL AS VAT_Type,
        NULL AS tin_no
    FROM
          entry_fixed_assets aa 
    UNION ALL SELECT 
        aa.description AS ShortName,
        aa.entry_others_id AS IDNo,
        NULL AS firstname,
        NULL AS middlename,
        NULL AS company,
        NULL AS address,
        NULL AS options,
        NULL AS sub_account,
        aa.createdAt,
        aa.update AS updatedAt,
        NULL AS contact_details_id,
        NULL AS description,
        NULL AS remarks,
        NULL AS VAT_Type,
        NULL AS tin_no
    FROM
          entry_others aa
     UNION ALL SELECT 
         CONCAT(aa.firstname, ', ', aa.lastname) AS ShortName,
        aa.entry_supplier_id AS IDNo,
        aa.firstname,
        aa.middlename,
        aa.company,
        aa.address,
        aa.option as options,
        NULL AS sub_account,
        aa.createdAt,
        aa.update AS updatedAt,
        aa.supplier_contact_details_id as  contact_details_id,
        NULL AS description,
        NULL AS remarks,
        aa.VAT_Type,
        aa.tin_no
    FROM
          entry_supplier aa) id_entry
        ${
          WhereIDEntry === null || WhereIDEntry === ""
            ? " LIMIT 100 "
            : ` ${WhereIDEntry} `
        }
    `;
}
export function production_renewal_notice() {
  const selectClient = clients_view();
  return `
    SELECT 
        Policy.PolicyNo,
        client.Shortname AS AssuredName,
        Policy.PolicyType
	FROM Policy LEFT JOIN BPolicy ON Policy.PolicyNo = BPolicy.PolicyNo 
	LEFT JOIN VPolicy ON Policy.PolicyNo = VPolicy.PolicyNo 
	LEFT JOIN MPolicy ON Policy.PolicyNo = MPolicy.PolicyNo 
	LEFT JOIN PAPolicy ON Policy.PolicyNo = PAPolicy.PolicyNo 
	LEFT JOIN CGLPolicy ON Policy.PolicyNo = CGLPolicy.PolicyNo 
	LEFT JOIN MSPRPolicy ON Policy.PolicyNo = MSPRPolicy.PolicyNo 
	LEFT JOIN FPolicy ON Policy.PolicyNo = FPolicy.PolicyNo 
	LEFT JOIN (
	   ${selectClient}
	) client ON Policy.IDNo = client.IDNo
    `;
}
export function ProductionReport(
  DateFrom: string,
  DateTo: string,
  Account_: string,
  PolicyType: string,
  IsFinanced: number,
  Mortgagee: string,
  Policy_Type: string,
  SortBy: string
) {
  const selectClient = clients_view();
  let whr_query = "";
  let sql_query = `
    SELECT 
        VPolicy.Mortgagee AS Mortgagee,
        Policy.IDNo AS IDNo,
        client.Shortname AS AssuredName,
        Policy.Account AS Account,
        Policy.PolicyType,
        Policy.PolicyNo,
        DATE_FORMAT(Policy.DateIssued, "%m-%d-%Y") AS DateIssued,
        Policy.TotalPremium,
        Policy.Vat,
        Policy.DocStamp,
        Policy.FireTax, 
        Policy.LGovTax,
        Policy.Notarial,
        Policy.Misc,
        Policy.TotalDue,
        Policy.TotalPaid,
        Policy.Discount,
        VPolicy.Sec4A,
        VPolicy.Sec4B,
        VPolicy.Sec4C,
        DATE_FORMAT(IFNULL(BPolicy.BidDate, IFNULL(VPolicy.DateFrom, IFNULL(MPolicy.DateFrom, IFNULL(PAPolicy.PeriodFrom, IFNULL(CGLPolicy.PeriodFrom, IFNULL(MSPRPolicy.PeriodFrom, FPolicy.DateFrom)))))), "%m-%d-%Y") AS EffictiveDate,
        IF( ${IsFinanced} = 0, IFNULL(CGLPolicy.LimitB, 0) + IFNULL(CGLPolicy.LimitA, 0) + IFNULL(VPolicy.ODamage, 0) + IFNULL(VPolicy.TPLLimit, 0),IFNULL(ODamage, 0) + IFNULL(TPLLimit, 0)) AS PLimit,
        IF(${IsFinanced}= 0, IFNULL(EstimatedValue, 0) + IFNULL(TPLLimit, 0) + IFNULL(FPolicy.InsuredValue, 0) + IFNULL(BPolicy.BondValue, 0) + IFNULL(MPolicy.InsuredValue, 0) + IFNULL(MSPRPolicy.SecI, 0) + IFNULL(MSPRPolicy.SecIB, 0) + IFNULL(MSPRPolicy.SecII, 0),IFNULL(EstimatedValue, 0) + IFNULL(TPLLimit, 0))  AS InsuredValue,
        CoverNo,
        Policy.Remarks as Remarks,
        EstimatedValue,
        Make,
        BodyType,
        PlateNo,
        ChassisNo,
        MotorNo,
        Mortgagee,
        VPolicy.Remarks as VRemarks
    FROM Policy 
    LEFT JOIN BPolicy ON Policy.PolicyNo = BPolicy.PolicyNo 
    LEFT JOIN VPolicy ON Policy.PolicyNo = VPolicy.PolicyNo 
    LEFT JOIN MPolicy ON Policy.PolicyNo = MPolicy.PolicyNo 
    LEFT JOIN PAPolicy ON Policy.PolicyNo = PAPolicy.PolicyNo 
    LEFT JOIN CGLPolicy ON Policy.PolicyNo = CGLPolicy.PolicyNo 
    LEFT JOIN MSPRPolicy ON Policy.PolicyNo = MSPRPolicy.PolicyNo 
    LEFT JOIN FPolicy ON Policy.PolicyNo = FPolicy.PolicyNo 
    LEFT JOIN (
    ${selectClient}
    ) client ON Policy.IDNo = client.IDNo
    `;

  if (Mortgagee === "") {
    if (PolicyType === "Bonds") {
      if (Account_ === "ALL") {
        if (SortBy !== "Date From") {
          whr_query = ` WHERE CAST(Policy.DateIssued AS DATE) <= CAST(${DateTo} AS DATE) AND CAST(Policy.DateIssued AS DATE) >= CAST(${DateFrom} AS DATE)  AND Policy.PolicyType in (select SublineName from subline where line = 'Bonds')`;
        }
        if ((SortBy = "Date From")) {
          whr_query = ` WHERE date(IFNULL(BPolicy.BidDate, IFNULL(VPolicy.DateFrom, IFNULL(MPolicy.DateFrom, IFNULL(PAPolicy.PeriodFrom, IFNULL(CGLPolicy.PeriodFrom, IFNULL(MSPRPolicy.PeriodFrom, FPolicy.DateFrom))))))) <= STR_TO_DATE('${DateTo}','%Y-%m-%d') AND date(IFNULL(BPolicy.BidDate, IFNULL(VPolicy.DateFrom, IFNULL(MPolicy.DateFrom, IFNULL(PAPolicy.PeriodFrom, IFNULL(CGLPolicy.PeriodFrom, IFNULL(MSPRPolicy.PeriodFrom, FPolicy.DateFrom))))))) >= STR_TO_DATE('${DateFrom}','%Y-%m-%d')   AND Policy.PolicyType in (select SublineName from subline where line = 'Bonds')`;
        }
      }

      if (Account_ !== "ALL") {
        if (SortBy !== "Date From") {
          whr_query = ` WHERE DATE(Policy.DateIssued) <= STR_TO_DATE('${DateTo}', '%Y-%m-%d')
        								AND DATE(Policy.DateIssued) >= STR_TO_DATE('${DateFrom}', '%Y-%m-%d')
        								AND Policy.Account = '${Account_}'
        								AND Policy.PolicyType IN (SELECT
        									SublineName
        								FROM
        									  subline
        								WHERE
        									line = 'Bonds')`;
        }
        if (SortBy === "Date From") {
          whr_query = ` WHERE DATE(IFNULL(BPolicy.BidDate,
    										IFNULL(VPolicy.DateFrom,
    												IFNULL(MPolicy.DateFrom,
    														IFNULL(PAPolicy.PeriodFrom,
    																IFNULL(CGLPolicy.PeriodFrom,
    																		IFNULL(MSPRPolicy.PeriodFrom, FPolicy.DateFrom))))))) <= STR_TO_DATE('${DateTo}', '%Y-%m-%d')
    								AND DATE(IFNULL(BPolicy.BidDate,
    										IFNULL(VPolicy.DateFrom,
    												IFNULL(MPolicy.DateFrom,
    														IFNULL(PAPolicy.PeriodFrom,
    																IFNULL(CGLPolicy.PeriodFrom,
    																		IFNULL(MSPRPolicy.PeriodFrom, FPolicy.DateFrom))))))) >= STR_TO_DATE('${DateFrom}', '%Y-%m-%d')
    								AND Policy.Account = '${Account_}'
    								AND Policy.PolicyType IN (SELECT
    									SublineName
    								FROM
    									subline
    								WHERE
    									line = 'Bonds')`;
        }
      }
      whr_query = `${whr_query} ${
        IsFinanced === 0
          ? ""
          : ` AND ((VPolicy.Mortgagee LIKE '%CASH MANAGEMENT%') OR (VPolicy.Mortgagee LIKE '%CREDIT MASTER%') OR (VPolicy.Mortgagee LIKE '%CAMFIN%'))`
      }`;
    }

    if (PolicyType !== "Bonds") {
      if (Account_ === "ALL") {
        if (SortBy !== "Date From") {
          whr_query = ` where date(Policy.DateIssued) <= date('${DateTo}') and  date(Policy.DateIssued) >= date('${DateFrom}') AND Policy.PolicyType = '${PolicyType}'`;
        }
        if (SortBy === "Date From") {
          whr_query = ` WHERE date(
						IFNULL(BPolicy.BidDate, 
						IFNULL(VPolicy.DateFrom, 
						IFNULL(MPolicy.DateFrom, 
						IFNULL(PAPolicy.PeriodFrom, 
						IFNULL(CGLPolicy.PeriodFrom, 
						IFNULL(MSPRPolicy.PeriodFrom, FPolicy.DateFrom))))))) <= date('${DateTo}')
                        AND date(
						IFNULL(BPolicy.BidDate, 
						IFNULL(VPolicy.DateFrom, 
						IFNULL(MPolicy.DateFrom, 
						IFNULL(PAPolicy.PeriodFrom, 
						IFNULL(CGLPolicy.PeriodFrom, 
						IFNULL(MSPRPolicy.PeriodFrom, FPolicy.DateFrom))))))) >= date('${DateFrom}') AND Policy.PolicyType = '${PolicyType}'`;
        }
      }
      if (Account_ !== "ALL") {
        if (SortBy !== "Date From") {
          whr_query = `  where date(Policy.DateIssued) <= date('${DateTo}') and  date(Policy.DateIssued) >= date('${DateFrom}')  AND Policy.Account = '${Account_}' AND Policy.PolicyType = '${PolicyType}'`;
        }
        if (SortBy === "Date From") {
          whr_query = ` WHERE date(IFNULL(BPolicy.BidDate, IFNULL(VPolicy.DateFrom, IFNULL(MPolicy.DateFrom, IFNULL(PAPolicy.PeriodFrom, IFNULL(CGLPolicy.PeriodFrom, IFNULL(MSPRPolicy.PeriodFrom, FPolicy.DateFrom))))))) <= date('${DateTo}') AND date(IFNULL(BPolicy.BidDate, IFNULL(VPolicy.DateFrom, IFNULL(MPolicy.DateFrom, IFNULL(PAPolicy.PeriodFrom, IFNULL(CGLPolicy.PeriodFrom, IFNULL(MSPRPolicy.PeriodFrom, FPolicy.DateFrom))))))) >= date('${DateFrom}') AND Policy.Account = '${Account_}' AND Policy.PolicyType = '${PolicyType}'`;
        }
      }
      whr_query = `${whr_query} ${
        IsFinanced === 0
          ? ""
          : ` AND ((VPolicy.Mortgagee LIKE '%CASH MANAGEMENT%') OR (VPolicy.Mortgagee LIKE '%CREDIT MASTER%') OR (VPolicy.Mortgagee LIKE '%CAMFIN%')`
      }`;
    }
  }

  if (Mortgagee !== "") {
    if (SortBy === "Date From") {
      whr_query = ` WHERE IFNULL(BPolicy.BidDate, IFNULL(VPolicy.DateFrom, IFNULL(MPolicy.DateFrom, IFNULL(PAPolicy.PeriodFrom, IFNULL(CGLPolicy.PeriodFrom, IFNULL(MSPRPolicy.PeriodFrom, FPolicy.DateFrom)))))) <= date('${DateTo}') AND IFNULL(BPolicy.BidDate, IFNULL(VPolicy.DateFrom, IFNULL(MPolicy.DateFrom, IFNULL(PAPolicy.PeriodFrom, IFNULL(CGLPolicy.PeriodFrom, IFNULL(MSPRPolicy.PeriodFrom, FPolicy.DateFrom)))))) >= date('${DateFrom}') AND Policy.Account = '${Account_}' AND VPolicy.Mortgagee = '${Mortgagee}'`;
    }

    if (SortBy !== "Date From") {
      whr_query = `  where date(Policy.DateIssued) <= date('${DateTo}') and  date(Policy.DateIssued) >= date('${DateFrom}')  AND Policy.Account = '${Account_}' AND VPolicy.Mortgagee = '${Mortgagee}'`;
    }
  }

  if (Policy_Type === "Temporary") {
    whr_query = whr_query + " and Policy.policyno like '%TP-%' ";
  }
  if (Policy_Type === "Regular") {
    whr_query = whr_query + " and Policy.policyno not like '%TP-%'";
  }
  if (SortBy === "Date Issued") {
    whr_query = whr_query + " ORDER BY date( Policy.DateIssued) asc";
  }
  if (SortBy === "Policy No#") {
    whr_query = whr_query + " ORDER BY Policy.policyno asc";
  }
  if (SortBy === "Date From") {
    whr_query =
      whr_query +
      " order by  IFNULL(IFNULL(IFNULL(IFNULL(IFNULL(VPolicy.DateFrom,FPolicy.DateFrom),CGLPolicy.PeriodFrom),MPolicy.DateFrom),BPolicy.BidDate),PAPolicy.PeriodFrom) asc";
  }
  return `${sql_query} ${whr_query}`;
}
export function RenewalNoticeReport(
  DateFrom: string,
  PolicyType: string,
  Regular: string,
  PAccount: string
) {
  const selectClient = clients_view();
  let select_query = "";

  if (PolicyType === "COM" && Regular === "Regular") {
    select_query = `
    SELECT 
        a.Shortname as AssuredName,
        Policy.PolicyNo,
        DATE_FORMAT(VPolicy.DateTo, '%m-%d-%Y')as Expiration,
        VPolicy.EstimatedValue as InsuredValue,
        VPolicy.Make,
        VPolicy.BodyType,
        VPolicy.PlateNo,
        VPolicy.ChassisNo,
        VPolicy.MotorNo,
        Policy.TotalPremium,
        VPolicy.Mortgagee
        Mortgagee,
        VPolicy.Account
    FROM Policy 
    LEFT JOIN VPolicy ON Policy.PolicyNo = VPolicy.PolicyNo 
    LEFT JOIN  (${selectClient}) a ON Policy.IDNo = a.IDNo
    where 
    Policy.PolicyType = '${PolicyType}' AND
    SUBSTRING(Policy.PolicyNo, 1, 3)  <> 'TP-' AND
    month(VPolicy.DateTo) = month('${DateFrom}') AND
    year(VPolicy.DateTo) = year('${DateFrom}') 
    ${PAccount === "All" ? "" : ` AND VPolicy.Account =${PAccount} `}
    ORDER BY date(VPolicy.DateTo) asc`;
  }

  if (PolicyType === "COM" && Regular !== "Regular") {
    select_query = `
    SELECT
      a.Shortname as AssuredName,
      Policy.PolicyNo,
      DATE_FORMAT(VPolicy.DateTo, '%m-%d-%Y')as Expiration,
      VPolicy.EstimatedValue as InsuredValue,
      VPolicy.Make,
      VPolicy.BodyType,
      VPolicy.PlateNo,
      VPolicy.ChassisNo,
      VPolicy.MotorNo,
      Policy.TotalPremium,
      VPolicy.Mortgagee
      Mortgagee,
      VPolicy.Account
    FROM Policy
    LEFT JOIN VPolicy ON Policy.PolicyNo = VPolicy.PolicyNo
    LEFT JOIN  (${selectClient}) a ON Policy.IDNo = a.IDNo 
    where
    Policy.PolicyType = '${PolicyType}' AND
    SUBSTRING(Policy.PolicyNo, 1, 3)  = 'TP-' AND
    month(VPolicy.DateTo) = month('${DateFrom}') AND
    year(VPolicy.DateTo) = year('${DateFrom}')
    ${PAccount === "All" ? "" : ` AND VPolicy.Account =${PAccount} `}
    ORDER BY date(VPolicy.DateTo) asc
  `;
  }

  if (PolicyType === "FIRE") {
    select_query = `
    SELECT
      a.Shortname as AssuredName,
      Policy.PolicyNo,
      DATE_FORMAT(FPolicy.DateTo, '%m-%d-%Y')as Expiration,
      FPolicy.InsuredValue as InsuredValue,
      Policy.TotalPremium,
      FPolicy.Mortgage,
      FPolicy.Account
    FROM Policy
    LEFT JOIN FPolicy ON Policy.PolicyNo = FPolicy.PolicyNo
    LEFT JOIN  (${selectClient}) a ON Policy.IDNo = a.IDNo
    where
    Policy.PolicyType = '${PolicyType}' AND
    month(FPolicy.DateTo) = month('${DateFrom}') AND
    year(FPolicy.DateTo) = year('${DateFrom}') 
    ${PAccount === "All" ? "" : ` AND FPolicy.Account = '${PAccount}' `}
    ORDER BY date(FPolicy.DateTo) asc
   `;
  }

  if (PolicyType === "MAR") {
    select_query = `
      SELECT
          a.Shortname as AssuredName,
          Policy.PolicyNo,
          DATE_FORMAT(MPolicy.DateTo, '%m-%d-%Y')as Expiration,
          MPolicy.InsuredValue,
          Policy.TotalPremium,
          MPolicy.Account
      FROM Policy
      LEFT JOIN MPolicy ON Policy.PolicyNo = MPolicy.PolicyNo
      LEFT JOIN  (${selectClient}) a ON Policy.IDNo = a.IDNo
      where
      Policy.PolicyType = '${PolicyType}' AND
      month(MPolicy.DateTo) = month('${DateFrom}') AND
      year(MPolicy.DateTo) = year('${DateFrom}') 
      ${PAccount === "All" ? "" : ` AND MPolicy.Account = '${PAccount}' `}
      "ORDER BY date(MPolicy.DateTo) asc
  `;
  }

  if (PolicyType === "PA") {
    select_query = `
      SELECT
          a.Shortname as AssuredName,
          Policy.PolicyNo,
          DATE_FORMAT(PAPolicy.PeriodTo, '%m-%d-%Y')as Expiration,
          Policy.TotalPremium,
          PAPolicy.Account
      FROM Policy
      LEFT JOIN PAPolicy ON Policy.PolicyNo = PAPolicy.PolicyNo
      LEFT JOIN  (${selectClient}) a ON Policy.IDNo = a.IDNo
      where
      Policy.PolicyType = '${PolicyType}' AND
      month(PAPolicy.PeriodTo) = month('${DateFrom}') AND
      year(PAPolicy.PeriodTo) = year('${DateFrom}') 
      ${PAccount === "All" ? "" : ` AND PAPolicy.Account = '${PAccount}' `}
      ORDER BY date(PAPolicy.PeriodTo) asc
  `;
  }
  return select_query;
}
export function TemplateRenewalNotice(PolicyType: string, PolicyNo: string) {
  const selectClient = clients_view();
  let select_query = "";
  if (PolicyType === "COM") {
    select_query = `
    SELECT 
		    client.Shortname,
        client.address,
		    Policy.PolicyNo,
        VPolicy.PlateNo,
        VPolicy.ChassisNo,
        VPolicy.MotorNo,
        VPolicy.DateTo,
        concat(VPolicy.Model,' ',VPolicy.Make,' ',VPolicy.BodyType) as unitInsuredu,
        VPolicy.Mortgagee,
        FORMAT(VPolicy.EstimatedValue, 4) as tl_prev_insured,
        FORMAT(VPolicy.EstimatedValue, 4) as acn_prev_insured,
        FORMAT(VPolicy.BodilyInjury,4) as injury_prev_insured,
        FORMAT(VPolicy.PropertyDamage,4) as damage_prev_insured,
        FORMAT(VPolicy.PersonalAccident,4) as accident_prev_insured,
        FORMAT(VPolicy.ODamage,4) as tl_prev_premium,
        FORMAT(VPolicy.AOG,4) as acn_prev_premium,
        VPolicy.Sec4A as injury_prev_premium,
        VPolicy.Sec4B as damage_prev_premium,
        VPolicy.Sec4C	as accident_prev_premium,
        FORMAT(Policy.TotalPremium,4)  as prev_sub_total,
        FORMAT(Policy.DocStamp,4)	as prev_doc_stamp,
        FORMAT(Policy.Vat,4) as prev_evat,
        FORMAT(Policy.LGovTax,4) as prev_lgt,
        FORMAT(Policy.TotalDue,4) as prev_gross,
        SecIIPercent,
        VPolicy.Remarks
    FROM
	(SELECT * FROM Policy WHERE Policy.PolicyType = 'COM') AS Policy
		LEFT JOIN 
	(SELECT * FROM VPolicy WHERE VPolicy.PolicyType <> 'TPL') AS VPolicy ON Policy.PolicyNo = VPolicy.PolicyNo
        LEFT JOIN 
	(${selectClient}) as  client on Policy.IDNo = client.IDNo
    `;
  }
  select_query = `${select_query} WHERE Policy.PolicyNo ='${PolicyNo}'`;
  return select_query;
}
