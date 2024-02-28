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
export async function getSelectedCheckPostponementPNNo(PNNo: String,checkNo:String) {
  const query = `
      SELECT 
          PDC_ID,
          date_format(Check_Date , '%m/%d/%Y') as Check_Date,
          Bank,
          Check_No,
          Check_Amnt
      FROM
          upward_insurance.PDC PD
      WHERE
        PNo = '${PNNo}'
        AND PDC_Status = 'Stored'
        AND Check_No like '%${checkNo}%'
      ORDER BY Check_No
    ;`;
  return await prisma.$queryRawUnsafe(query);
}
