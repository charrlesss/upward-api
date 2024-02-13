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
      MAX(PNo) AS PNo, MAX(Name) AS Name, Ref_No
  FROM
      upward_insurance.pdc
  WHERE
      PDC_Status = 'Stored'
          AND ((PNo) LIKE '%${search}%' OR (Name) LIKE '%${search}%')
  GROUP BY Ref_No
  ORDER BY MAX(PNo) DESC
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
                            RCPNo = a.RCPNo) IN ('PENDING' , 'APPROVED')
                        AND (SELECT 
                            PNNo
                        FROM
                            PullOut_Request
                        WHERE
                            RCPNo = a.RCPNo) = '${PNNo}'
                        AND CheckNo = pd.PDC_ID),
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
                            RCPNo = a.RCPNo) IN ('PENDING' , 'APPROVED')
                        AND (SELECT 
                            PNNo
                        FROM
                            PullOut_Request
                        WHERE
                            RCPNo = a.RCPNo) = '${PNNo}'
                        AND CheckNo = pd.PDC_ID),
            '--') AS 'RCPNO'
  FROM
    upward_insurance.PDC PD
  WHERE
    PNo = '${PNNo}'
        AND PDC_Status = 'Stored'
  ORDER BY Check_No`;
  return await prisma.$queryRawUnsafe(query);
}

export async function createPulloutRequest(data: any) {
  return await prisma.pullout_request.create({ data });
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
