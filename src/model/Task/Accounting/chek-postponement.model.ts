import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function checkPostponementRequestAutoID() {
  return await prisma.$queryRawUnsafe(`
    SELECT 
      concat('CDPR-',a.year, LEFT(a.last_count ,length(a.last_count) -length(a.last_count + 1)),a.last_count + 1) as pullout_request
    FROM
      upward_insurance.id_sequence a
    WHERE
      type = 'check-postponement';
  ;`);
}
export async function getCheckPostponementPNNo(search: string) {
  const query = `
    SELECT 
        a.PNo, MAX(a.IDNo) as IDNo, MAX(a.Name) as Name , MAX(c.ShortName) as branch
    FROM
        upward_insurance.pdc a
        left join (
        SELECT 
            "Client" as IDType,
            aa.entry_client_id AS IDNo,
            aa.sub_account,
            if(aa.company = "", CONCAT(aa.lastname, ",", aa.firstname), aa.company) as Shortname,
            aa.entry_client_id as client_id,
            aa.address
        FROM
            upward_insurance.entry_client aa
            union all
        SELECT 
            "Agent" as IDType,
            aa.entry_agent_id AS IDNo,
            aa.sub_account,
            CONCAT(aa.lastname, ",", aa.firstname) AS Shortname,
            aa.entry_agent_id as client_id,
            aa.address
        FROM
            upward_insurance.entry_agent aa
            union all
        SELECT 
            "Employee" as IDType,
            aa.entry_employee_id AS IDNo,
            aa.sub_account,
            CONCAT(aa.lastname, ",", aa.firstname) AS Shortname,
            aa.entry_employee_id as client_id,
            aa.address
        FROM
            upward_insurance.entry_employee aa
        union all
        SELECT 
            "Supplier" as IDType,
            aa.entry_supplier_id AS IDNo,
            aa.sub_account,
            if(aa.company = "", CONCAT(aa.lastname, ",", aa.firstname), aa.company) as Shortname,
            aa.entry_supplier_id as client_id,
            aa.address
        FROM
            upward_insurance.entry_supplier aa
            union all
        SELECT 
            "Fixed Assets" as IDType,
            aa.entry_fixed_assets_id AS IDNo,
            aa.sub_account,
            aa.fullname AS Shortname,
            aa.entry_fixed_assets_id as client_id,
            CONCAT(aa.description, " - ", aa.remarks) AS address
        FROM
            upward_insurance.entry_fixed_assets aa
            union all
        SELECT 
            "Others" as IDType,
            aa.entry_others_id AS IDNo,
            aa.sub_account,
            aa.description AS Shortname,
            aa.entry_others_id as client_id,
            CONCAT(aa.description, " - ", aa.remarks) AS address
        FROM
            upward_insurance.entry_others aa
        
        ) b on a.IDNo = b.IDNo
        left join upward_insurance.sub_account c on b.sub_account = c.Sub_Acct
        WHERE 
        a.PNo LIKE '%${search}%' OR
            a.IDNo LIKE '%${search}%' OR
            a.Name LIKE '%${search}%' 
    GROUP BY a.PNo
    LIMIT 100;
    `;
  return await prisma.$queryRawUnsafe(query);
}
export async function getSelectedCheckPostponementPNNo(
  PNNo: string,
  checkNo: string
) {
  const query = `
      SELECT 
          PDC_ID,
          date_format(Check_Date , '%m/%d/%Y') as Check_Date,
          Bank,
          Check_No,
          Check_Amnt,
          ifnull(Status,'--') as Status
      FROM
          upward_insurance.PDC PD
          left join (
            SELECT bb.CheckNo,aa.Status FROM upward_insurance.postponement aa
                left join upward_insurance.postponement_detail bb on aa.RPCDNo = bb.RPCD and bb.cancel = 0 and  aa.Status <> 'CANCEL'
                ) b on PD.Check_No = b.CheckNo 
      WHERE
        PNo = '${PNNo}'
        AND PDC_Status = 'Stored'
        AND Check_No like '%${checkNo}%'
        ORDER BY Check_No
    ;`;
  return await prisma.$queryRawUnsafe(query);
}
export async function searchEditPostponentRequest(search: string) {
  const query = `
  SELECT 
  RPCDNo,
  PNNo,
  Deducted_to,
  ClientBranch,
  format(HoldingFees,2) AS holdingFee,
  format(PenaltyCharge,2) AS penaltyCharge,
  format(Surplus,2) AS surplus,
  Deducted_to AS deductedTo,
  PaidVia AS paidVia,
  PaidInfo AS paidInfo,
  date_format(PaidDate,'%Y-%m-%d') AS paidDate,
  format(CAST(REPLACE(HoldingFees, ',', '') AS DECIMAL) + CAST(REPLACE(PenaltyCharge, ',', '') AS DECIMAL) + CAST(REPLACE(Surplus, ',', '') AS DECIMAL),2) AS total
FROM
  upward_insurance.postponement a
WHERE
  Status <> 'CANCEL' AND
  (
    RPCDNo LIKE '%${search}%' OR 
    PNNo LIKE '%${search}%' OR 
    Deducted_to LIKE '%${search}%'
  )
  `;
  return await prisma.$queryRawUnsafe(query);
}
export async function searchSelectedEditPostponentRequest(RPCD: string) {
  const query = `
    SELECT 
        b.Check_No,
        b.Bank,
        b.Check_Amnt,
        DATE_FORMAT(b.Check_Date, '%Y-%m-%d') AS Check_Date,
        DATE_FORMAT(a.NewCheckDate, '%Y-%m-%d') AS New_Check_Date,
        ABS(DATEDIFF(a.NewCheckDate, b.Check_Date)) AS DateDiff,
        a.Reason,
        c.Status,
        LPAD(ROW_NUMBER() OVER (), 3, '0') as temp_id
    FROM
        upward_insurance.postponement_detail a
            LEFT JOIN
        upward_insurance.pdc b ON a.CheckNo = b.Check_No
        LEFT JOIN 
        upward_insurance.postponement c on a.RPCD = c.RPCDNo
    WHERE
      RPCD = '${RPCD}' AND
      a.cancel = 0 AND
      c.Status <> 'CANCEL'
    ;`;
  return await prisma.$queryRawUnsafe(query);
}
export async function updateOnCancelPostponentRequest(RPCD: string) {
  const query = `
    update  upward_insurance.postponement a set a.Status = 'CANCEL'  where a.RPCDNo = '${RPCD}'
    ;`;
  return await prisma.$queryRawUnsafe(query);
}

export async function updateOnCancelPostponentRequestDetails(RPCD: string) {
  const query = `
    update  upward_insurance.postponement_detail a set a.cancel = 1  where a.RPCD = '${RPCD}'
    ;`;
  return await prisma.$queryRawUnsafe(query);
}
export async function createPostponement(data: any) {
  return await prisma.postponement.create({ data });
}
export async function createPostponementDetails(data: any) {
  return await prisma.postponement_detail.create({ data });
}
export async function approvalCodePostponement(data: any) {
  return await prisma.postponement_auth_codes.create({ data });
}
