import { PrismaClient } from "@prisma/client";
import { __DB_URL } from "../../../controller";

export async function pulloutRequestAutoID() {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.$queryRawUnsafe(`
  SELECT 
    concat('HOPO',a.year, LEFT(a.last_count ,length(a.last_count) -length(a.last_count + 1)),a.last_count + 1) as pullout_request
  FROM
      id_sequence a
  WHERE
    type = 'pullout';
;`);
}
export async function pulloutRequestPNoWithName(search: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.$queryRawUnsafe(`
  SELECT 
      a.PNo, MAX(a.IDNo) as IDNo, MAX(a.Name) as Name
  FROM
        pdc a
      WHERE 
        a.PDC_Status = 'Stored' and
          (
            a.PNo LIKE '%${search}%' OR
            a.IDNo LIKE '%${search}%' OR
            a.Name LIKE '%${search}%' 
          )
  GROUP BY a.PNo
  LIMIT 100;
;`);
}
export async function getSelectedRequestCheck(PNNo: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

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
                            RCPNo = a.RCPNo) IN ('PENDING' , 'APPROVED','DISAPPROVED')
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
                      PullOut_Request_Details a
                WHERE
                    (SELECT 
                            Status
                        FROM
                              PullOut_Request
                        WHERE
                          Status <> 'CANCEL' AND
                            RCPNo = a.RCPNo) IN ('PENDING' , 'APPROVED','DISAPPROVED')
                        AND (SELECT 
                            PNNo
                        FROM
                            PullOut_Request
                        WHERE
                            RCPNo = a.RCPNo) = '${PNNo}'
						
                        AND CheckNo = pd.Check_No and cancel = 0),
            '--') AS 'RCPNO'
  FROM
      PDC PD
  WHERE
    PNo = '${PNNo}'
        AND PDC_Status = 'Stored'
  ORDER BY Check_No

  `;
  return await prisma.$queryRawUnsafe(query);
}
export async function getSelectedEditRequestCheck(RCPNo: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
    SELECT 
    c.PDC_ID,
    CAST(ROW_NUMBER() OVER () AS CHAR) AS temp_id,
    date_format(Check_Date , '%m/%d/%Y') as Check_Date,
    Bank,
    Check_No,
    Check_Amnt,
    b.Status,
    a.RCPNo as RCPNO
  FROM
      pullout_request_details a
        LEFT JOIN
      pullout_request b ON a.RCPNo = b.RCPNo
    LEFT JOIN
    pdc  c ON a.CheckNo = c.Check_No AND b.PNNo = c.PNo
    where a.RCPNo = '${RCPNo}'
    ORDER BY Check_No
  `;
  return await prisma.$queryRawUnsafe(query);
}
export async function checkPNNo(PNNo: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.pullout_request.findMany({ where: { PNNo } });
}
export async function createPulloutRequest(data: any) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.pullout_request.create({ data });
}
export async function updatePulloutRequest(data: any, RCPNo: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.pullout_request.update({ data, where: { RCPNo } });
}
export async function updatePulloutRequestDetails(RCPNo: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.$queryRawUnsafe(
    `update   pullout_request_details a set a.cancel = 1 where RCPNo = '${RCPNo}';`
  );
}
export async function createPulloutRequestDetails(data: any) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.pullout_request_details.create({ data });
}
export async function updateAnyId(type: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.$queryRawUnsafe(`
    UPDATE  id_sequence a
      INNER JOIN
    (SELECT 
      *
    FROM
        id_sequence bb
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
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
  SELECT 
      a.RCPNo,
      a.PNNo,
      b.Name,
      a.reason
    FROM
          pullout_request a
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
        union all
      SELECT 
        'Policy ID' AS IDType,
        aa.PolicyNo as IDNo,
        bb.sub_account,
        bb.Shortname,
            aa.IDNo as client_id
      FROM
          policy aa
      LEFT JOIN
        (SELECT 
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
                  entry_others aa ) bb ON aa.IDNo = bb.IDNo
        ) a
      
        ) b on b.IDNo =  a.PNNo
        WHERE
        a.Status = 'PENDING' and (
          a.PNNo LIKE '%${search}%'
          OR b.Name LIKE '%${search}%'
          OR a.RCPNo LIKE '%${search}%'
        )
      `;
  return await prisma.$queryRawUnsafe(query);
}
export async function approvedPullout(
  RCPNo: string,
  username: string,
  isApproved: boolean
) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  const query = `
  update  pullout_request a
      set 
        a.Status = '${isApproved ? "APPROVED" : "DISAPPROVED"}',
        a.Approved_By = '${username}',
        a.Approved_Date= now()
    WHERE
    a.RCPNo ='${RCPNo}'      
  `;
  return prisma.$queryRawUnsafe(query);
}
export async function insertApprovalCode(data: any) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.pullout_auth_codes.create({ data });
}

export async function existApprovalCode(RCPN: string, Approved_Code: string) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.$queryRawUnsafe(`
  SELECT 
    *
  FROM
      pullout_auth_codes a
  WHERE
    a.RCPN = '${RCPN}'
        AND a.Approved_Code = '${Approved_Code}' and used_by is null`);
}

export async function updateApprovalCode(
  RCPN: string,
  Approved_Code: string,
  used_by: string
) {
  const prisma = new PrismaClient({ datasources: { db: { url: __DB_URL } } });

  return await prisma.$queryRawUnsafe(`
  update 
      pullout_auth_codes a set a.used_by='${used_by}', a.used_datetime=NOW()
  WHERE
    a.RCPN = '${RCPN}'
        AND a.Approved_Code = '${Approved_Code}'`);
}
