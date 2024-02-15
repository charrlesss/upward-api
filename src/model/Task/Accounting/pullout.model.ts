import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function pulloutRequestAutoID() {
  return await prisma.$queryRawUnsafe(`
  SELECT 
    concat('HOPO',a.year, LEFT(a.last_count ,length(a.last_count) -length(a.last_count + 1)),a.last_count + 1) as pullout_request
  FROM
    upward_insurance.id_sequence a
  WHERE
    type = 'pullout';
;`);
}
export async function pulloutRequestPNoWithName(search: string) {
  return await prisma.$queryRawUnsafe(`
  SELECT 
    MAX(a.PNo) AS PNo, MAX(a.Name) AS Name, MAX(A.Ref_No) AS Ref_No, if(isnull(MAX(b.RCPNo)),'--',MAX(b.RCPNo)) as RCPNo
  FROM
    upward_insurance.pdc a
    left join upward_insurance.pullout_request b on a.PNo = b.PNNo and  b.Status <> 'CANCEL'
  WHERE
    a.PDC_Status = 'Stored'
        AND ((a.PNo) LIKE '%${search}%' OR (a.Name) LIKE '%${search}%' OR (b.RCPNo) LIKE '%${search}%')

  GROUP BY a.PNo
  ORDER BY MAX(a.PNo) DESC
  LIMIT 100
;`);
}
export async function getSelectedRequestCheck(PNNo: string) {
  const query = `
  SELECT DISTINCT
    PDC_ID,
    CAST(ROW_NUMBER() OVER () AS CHAR) AS temp_id,
    date_format(Check_Date , '%m/%d/%Y') as Check_Date,
    Bank,
    Check_No,
    Check_Amnt,
    IFNULL((SELECT 
                    (SELECT 
                                Status
                            FROM
                                PullOut_Request
                            WHERE
                                RCPNo = a.RCPNo) AS 'Status'
                FROM
                    PullOut_Request_Details a
                WHERE
                    (SELECT 
                            Status
                        FROM
                            PullOut_Request
                        WHERE
							   Status <> 'CANCEL' AND
                            RCPNo = a.RCPNo) IN ('PENDING' , 'APPROVED','CANCEL')
                        AND (SELECT 
                            PNNo
                        FROM
                            PullOut_Request
                        WHERE
                            RCPNo = a.RCPNo) = '${PNNo}'
                           
                        AND CheckNo = pd.Check_No and cancel = 0),
            '--') AS 'Status',
    IFNULL((SELECT 
                    RCPNO
                FROM
                    upward_insurance.PullOut_Request_Details a
                WHERE
                    (SELECT 
                            Status
                        FROM
                            upward_insurance.PullOut_Request
                        WHERE
                          Status <> 'CANCEL' AND
                            RCPNo = a.RCPNo) IN ('PENDING' , 'APPROVED')
                        AND (SELECT 
                            PNNo
                        FROM
                            PullOut_Request
                        WHERE
                            RCPNo = a.RCPNo) = '${PNNo}'
						
                        AND CheckNo = pd.Check_No and cancel = 0),
            '--') AS 'RCPNO'
  FROM
    upward_insurance.PDC PD
  WHERE
    PNo = '${PNNo}'
        AND PDC_Status = 'Stored'
  ORDER BY Check_No

  `;
  return await prisma.$queryRawUnsafe(query);
}
export async function checkPNNo(PNNo: string) {
  return await prisma.pullout_request.findMany({ where: { PNNo } });
}

export async function createPulloutRequest(data: any) {
  return await prisma.pullout_request.create({ data });
}
export async function updatePulloutRequest(data: any, RCPNo: string) {
  return await prisma.pullout_request.update({ data, where: { RCPNo } });
}

export async function updatePulloutRequestDetails(RCPNo: string) {
  return await prisma.$queryRawUnsafe(
    `update  upward_insurance.pullout_request_details a set a.cancel = 1 where RCPNo = '${RCPNo}';`
  );
}
export async function createPulloutRequestDetails(data: any) {
  return await prisma.pullout_request_details.create({ data });
}

export async function updateAnyId(type: string) {
  return await prisma.$queryRawUnsafe(`
    UPDATE upward_insurance.id_sequence a
      INNER JOIN
    (SELECT 
      *
    FROM
      upward_insurance.id_sequence bb
    WHERE
      bb.type = '${type}'
    LIMIT 1) AS b ON a.type = b.type 
    SET 
    a.last_count = LPAD(SUBSTRING((b.last_count), - 4) + 1,
          4,
          '0')
    WHERE
    a.type = '${type}'
  `);
}

export async function searchPulloutRequestOnEdit(search: string) {
  const query = `
  SELECT 
      a.RCPNo,
      a.PNNo,
      b.Name
    FROM
        upward_insurance.pullout_request a
            LEFT JOIN
        (SELECT 
        a.IDType,
        a.IDNo,
        a.sub_account,
      a.Shortname as Name,
        a.client_id,
        LPAD(ROW_NUMBER() OVER (), 3, '0') AS ID
      FROM
        (
    SELECT 
          "Client" as IDType,
                aa.entry_client_id AS IDNo,
          aa.sub_account,
          if(aa.company = "", CONCAT(aa.lastname, ",", aa.firstname), aa.company) as Shortname,
              aa.entry_client_id as client_id  
            FROM
                upward_insurance.entry_client aa
                union all
          SELECT 
          "Agent" as IDType,
                aa.entry_agent_id AS IDNo,
          aa.sub_account,
          CONCAT(aa.lastname, ",", aa.firstname) AS Shortname,
                aa.entry_agent_id as client_id  
            FROM
                upward_insurance.entry_agent aa
                union all
          SELECT 
          "Employee" as IDType,
                aa.entry_employee_id AS IDNo,
          aa.sub_account,
          CONCAT(aa.lastname, ",", aa.firstname) AS Shortname,
                aa.entry_employee_id as client_id
            FROM
                upward_insurance.entry_employee aa
          union all
          SELECT 
          "Supplier" as IDType,
                aa.entry_supplier_id AS IDNo,
          aa.sub_account,
          if(aa.company = "", CONCAT(aa.lastname, ",", aa.firstname), aa.company) as Shortname,
                aa.entry_supplier_id as client_id
            FROM
                upward_insurance.entry_supplier aa
                union all
          SELECT 
          "Fixed Assets" as IDType,
                aa.entry_fixed_assets_id AS IDNo,
          aa.sub_account,
          aa.fullname AS Shortname,
                aa.entry_fixed_assets_id as client_id
            FROM
                upward_insurance.entry_fixed_assets aa
                union all
          SELECT 
          "Others" as IDType,
                aa.entry_others_id AS IDNo,
          aa.sub_account,
          aa.description AS Shortname,
                aa.entry_others_id as client_id
            FROM
                upward_insurance.entry_others aa
        union all
      SELECT 
        'Policy ID' AS IDType,
        aa.PolicyNo as IDNo,
        bb.sub_account,
        bb.Shortname,
            aa.IDNo as client_id
      FROM
        upward_insurance.policy aa
      LEFT JOIN
        (SELECT 
          "Client" as IDType,
                aa.entry_client_id AS IDNo,
          aa.sub_account,
          if(aa.company = "", CONCAT(aa.lastname, ",", aa.firstname), aa.company) as Shortname,
              aa.entry_client_id as client_id  
            FROM
                upward_insurance.entry_client aa
                union all
          SELECT 
          "Agent" as IDType,
                aa.entry_agent_id AS IDNo,
          aa.sub_account,
          CONCAT(aa.lastname, ",", aa.firstname) AS Shortname,
                aa.entry_agent_id as client_id  
            FROM
                upward_insurance.entry_agent aa
                union all
          SELECT 
          "Employee" as IDType,
                aa.entry_employee_id AS IDNo,
          aa.sub_account,
          CONCAT(aa.lastname, ",", aa.firstname) AS Shortname,
                aa.entry_employee_id as client_id
            FROM
                upward_insurance.entry_employee aa
          union all
          SELECT 
          "Supplier" as IDType,
                aa.entry_supplier_id AS IDNo,
          aa.sub_account,
          if(aa.company = "", CONCAT(aa.lastname, ",", aa.firstname), aa.company) as Shortname,
                aa.entry_supplier_id as client_id
            FROM
                upward_insurance.entry_supplier aa
                union all
          SELECT 
          "Fixed Assets" as IDType,
                aa.entry_fixed_assets_id AS IDNo,
          aa.sub_account,
          aa.fullname AS Shortname,
                aa.entry_fixed_assets_id as client_id
            FROM
                upward_insurance.entry_fixed_assets aa
                union all
          SELECT 
          "Others" as IDType,
                aa.entry_others_id AS IDNo,
          aa.sub_account,
          aa.description AS Shortname,
                aa.entry_others_id as client_id
            FROM
                upward_insurance.entry_others aa ) bb ON aa.IDNo = bb.IDNo
        ) a
      
        ) b on b.IDNo =  a.PNNo
        WHERE
        a.Status <> 'CANCEL' and (
          a.PNNo LIKE '%${search}%'
          OR b.Name LIKE '%${search}%'
          OR a.RCPNo LIKE '%${search}%'
        )
      `;
  return await prisma.$queryRawUnsafe(query);
}
