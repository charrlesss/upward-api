export function clients_view() {
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
    upward_insurance.entry_client aa 
UNION ALL SELECT 
    CONCAT(aa.firstname, ', ', aa.lastname) AS ShortName,
    aa.entry_agent_id AS IDNo,
    aa.firstname,
    aa.middlename,
    NULL AS company,
    aa.address,
    NULL AS options,
    NULL AS sub_account,
    aa.createdAt,
    aa.update AS updatedAt,
    aa.agent_contact_details_id AS contact_details_id,
    NULL AS description,
    NULL AS remarks,
	NULL AS VAT_Type,
    NULL AS tin_no
FROM
    upward_insurance.entry_agent aa 
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
    upward_insurance.entry_employee aa 
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
    upward_insurance.entry_fixed_assets aa 
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
    upward_insurance.entry_others aa
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
    upward_insurance.entry_supplier aa) id_entry`;
}

export function qryJournal() {
  const selectClient = clients_view();
  return `
    SELECT
        a.Branch_Code,
        CASE 
            WHEN a.Source_Type IN ('BFD', 'AB', 'BF', 'BFS') THEN DATE_ADD(a.Date_Entry, INTERVAL 1 DAY) 
            ELSE a.Date_Entry 
        END AS Date_Query,
        a.Date_Entry,
        a.Source_Type,
        a.Source_No,
        a.Explanation,
        a.Payto,
        a.GL_Acct,
        e.Acct_Title AS mShort,
        e.Short,
        a.ID_No,
        a.Check_Collect,
        a.Check_Date,
        a.Check_No AS Checked,
        a.Check_Bank AS Bank,
        a.Check_Return,
        a.Check_Deposit,
        a.Check_Reason,
        a.Debit AS mDebit,
        a.Credit AS mCredit,
        a.TC,
        a.Remarks,
        f.Books_Desc,
        f.Hide_Code,
        f.Number,
        f.Book_Code,
        a.Sub_Acct,
        COALESCE(c.ShortName, '') AS mSub_Acct,
        COALESCE(d.ShortName, '') AS mID,
        a.AutoNo AS Auto,
        a.Check_No
    FROM
    upward_insurance.journal a
    LEFT OUTER JOIN upward_insurance.policy b ON a.ID_No = b.PolicyNo
    LEFT OUTER JOIN upward_insurance.sub_account c ON a.Sub_Acct = c.Acronym
    LEFT OUTER JOIN (${selectClient}) d ON a.ID_No = d.IDNo
    LEFT OUTER JOIN upward_insurance.chart_account e ON a.GL_Acct = e.Acct_Code
    LEFT OUTER JOIN upward_insurance.books f ON a.Source_Type = f.Code
`;
}
