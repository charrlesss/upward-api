"use strict";(self.webpackChunkupward=self.webpackChunkupward||[]).push([[9425],{56580:function(e,t,n){n.d(t,{a:function(){return c}});var i=n(1413),a=n(45987),o=n(72791),r=n(30948),l=n(80184),d=["onChange"],c=o.forwardRef((function(e,t){var n=e.onChange,o=(0,a.Z)(e,d);return(0,l.jsx)(r.h3,(0,i.Z)((0,i.Z)({},o),{},{getInputRef:t,onValueChange:function(t){n({target:{name:e.name,value:t.value}})},allowNegative:!1,thousandSeparator:!0,valueIsNumericString:!0}))}))},89425:function(e,t,n){n.r(t),n.d(t,{default:function(){return X},reducer:function(){return H}});var i=n(93433),a=n(74165),o=n(15861),r=n(29439),l=n(4942),d=n(1413),c=n(72791),s=n(48550),u=n(36151),p=n(68096),f=n(94925),h=n(77196),x=n(63466),m=n(13400),g=n(58406),b=n(23786),v=n(64554),y=n(88447),C=n(20890),D=n(85523),N=n(94454),j=n(67442),Z=n(13784),I=n(39709),T=n(42419),S=n(29823),w=n(21830),E=n.n(w),A=n(3380),F=n(86753),k=n(91933),L=n(56580),z=n(93263),_=n(79018),M=n(84669),P=n(71652),R=n(93862),U=n(93777),B=n(95643),O=n(16656),K=n(5519),W=n(89767),V=n(64230),q=n(81582),J=n(54164),G=n(80184),Y={sub_refNo:"",refNo:"",dateEntry:new Date,explanation:"",code:"",acctName:"",subAcct:"",subAcctName:"",IDNo:"",ClientName:"",credit:"",debit:"",TC_Code:"",TC_Desc:"",remarks:"",vatType:"NON-VAT",invoice:"",BranchCode:"HO",totalDebit:"",totalCredit:"",totalBalance:"",jobAutoExp:!1,jobTransactionDate:new Date,jobType:"",search:""},H=function(e,t){return"UPDATE_FIELD"===t.type?(0,d.Z)((0,d.Z)({},e),{},(0,l.Z)({},t.field,t.value)):e},Q=[{field:"code",headerName:"Code",minWidth:150},{field:"acctName",headerName:"Account Name",minWidth:300},{field:"subAcctName",headerName:"Sub Account",flex:1,minWidth:170},{field:"ClientName",headerName:"Name",flex:1,minWidth:300},{field:"debit",headerName:"Debit",minWidth:80},{field:"credit",headerName:"Credit",minWidth:100},{field:"TC_Code",headerName:"TC",minWidth:100},{field:"remarks",headerName:"Remarks",flex:1,minWidth:300},{field:"vatType",headerName:"Vat Type",minWidth:100},{field:"invoice",headerName:"Invoice",flex:1,minWidth:200},{field:"TempID",headerName:"TempId",hide:!0},{field:"IDNo",headerName:"I.D.",flex:1,minWidth:300,hide:!0},{field:"BranchCode",headerName:"BranchCode",flex:1,minWidth:300,hide:!0}];function X(){var e,t,n,l,w,X,ee=(0,q.XT)(),te=(0,c.useContext)(A.V),ne=te.myAxios,ie=te.user,ae=(0,c.useReducer)(H,Y),oe=(0,r.Z)(ae,2),re=oe[0],le=oe[1],de=(0,c.useState)(!1),ce=(0,r.Z)(de,2),se=ce[0],ue=ce[1],pe=(0,c.useState)(!1),fe=(0,r.Z)(pe,2),he=fe[0],xe=fe[1],me=(0,c.useState)(!1),ge=(0,r.Z)(me,2),be=ge[0],ve=ge[1],ye=(0,c.useState)(!1),Ce=(0,r.Z)(ye,2),De=Ce[0],Ne=Ce[1],je=(0,c.useState)({edit:!1,updateId:""}),Ze=(0,r.Z)(je,2),Ie=Ze[0],Te=Ze[1],Se=(0,c.useState)([]),we=(0,r.Z)(Se,2),Ee=we[0],Ae=we[1],Fe=(0,k.useQueryClient)(),ke=(0,c.useRef)(null),Le=(0,c.useRef)(null),ze=(0,c.useRef)(null),_e=(0,c.useRef)(null),Me=(0,c.useRef)(null),Pe=(0,c.useRef)(null),Re=(0,c.useRef)(null),Ue=(0,c.useRef)(null),Be=(0,c.useRef)(null),Oe=(0,c.useRef)(null),Ke=(0,c.useRef)(null),We=(0,c.useRef)(null),Ve=(0,k.useQuery)({queryKey:"general-journal-id-generator",queryFn:function(){return(e=e||(0,o.Z)((0,a.Z)().mark((function e(){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ne.get("/task/accounting/general-journal/get-general-journal-id",{headers:{Authorization:"Bearer ".concat(null===ie||void 0===ie?void 0:ie.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},refetchOnWindowFocus:!1,onSuccess:function(e){var t,n,i,a=e;be?le({type:"UPDATE_FIELD",field:"refNo",value:null!==(i=re.sub_refNo)&&void 0!==i?i:""}):(le({type:"UPDATE_FIELD",field:"refNo",value:null!==(t=a.data.generateGeneralJournalID[0].general_journal_id)&&void 0!==t?t:""}),le({type:"UPDATE_FIELD",field:"sub_refNo",value:null!==(n=a.data.generateGeneralJournalID[0].general_journal_id)&&void 0!==n?n:""}))}}),qe=Ve.isLoading,Je=Ve.refetch,Ge=(0,k.useMutation)({mutationKey:"add-journal-voucher",mutationFn:function(e){return(t=t||(0,o.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ne.post("/task/accounting/general-journal/add-general-journal",t,{headers:{Authorization:"Bearer ".concat(null===ie||void 0===ie?void 0:ie.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){var t=e;return t.data.success?(Fe.invalidateQueries("search-general-journal"),ue(!1),ve(!1),$(le,Y),Je(),Ae([]),Te({edit:!1,updateId:""}),E().fire({position:"center",icon:"success",title:t.data.message,timer:1500})):E().fire({position:"center",icon:"warning",title:t.data.message,timer:1500})}}),Ye=Ge.mutate,He=Ge.isLoading,Qe=(0,k.useMutation)({mutationKey:"jobs",mutationFn:function(e){return(n=n||(0,o.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ne.post("/task/accounting/general-journal/jobs",t,{headers:{Authorization:"Bearer ".concat(null===ie||void 0===ie?void 0:ie.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){var t=e;Ae([]),Ae(t.data.jobs),ue(!0),xe(!1)}}),Xe=Qe.mutate,$e=Qe.isLoading,et=(0,k.useMutation)({mutationKey:"void-journal-voucher",mutationFn:function(e){return(l=l||(0,o.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ne.post("/task/accounting/general-journal/void-general-journal",t,{headers:{Authorization:"Bearer ".concat(null===ie||void 0===ie?void 0:ie.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){var t=e;return t.data.success?(Fe.invalidateQueries("search-general-journal"),ue(!1),ve(!1),$(le,Y),Je(),Ae([]),Te({edit:!1,updateId:""}),E().fire({position:"center",icon:"success",title:t.data.message,timer:1500})):E().fire({position:"center",icon:"warning",title:t.data.message,timer:1500})}}),tt=et.mutate,nt=et.isLoading,it=(0,k.useMutation)({mutationKey:"get-selected-search-general-journal",mutationFn:function(e){return(w=w||(0,o.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ne.post("/task/accounting/general-journal/get-selected-search-general-journal",t,{headers:{Authorization:"Bearer ".concat(null===ie||void 0===ie?void 0:ie.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){var t=e.data.getSelectedSearchGeneralJournal,n=t[0],i=n.explanation,a=n.dateEntry,o=n.refNo;le({type:"UPDATE_FIELD",field:"sub_refNo",value:o}),le({type:"UPDATE_FIELD",field:"refNo",value:o}),le({type:"UPDATE_FIELD",field:"dateEntry",value:a}),le({type:"UPDATE_FIELD",field:"explanation",value:i}),Ae(t)}}),at=it.mutate,ot=it.isLoading,rt=(0,z.Z)({link:{url:"/task/accounting/general-journal/search-general-journal",queryUrlName:"searchGeneralJournal"},columns:[{field:"Date_Entry",headerName:"Date",width:130},{field:"Source_No",headerName:"Ref No.",width:250},{field:"Explanation",headerName:"Explanation",flex:1}],queryKey:"search-general-journal",uniqueId:"Source_No",responseDataKey:"searchGeneralJournal",onSelected:function(e,t){at({Source_No:e[0].Source_No}),Ne(!0),ue(!0),ve(!0),Ae([]),Te({edit:!1,updateId:""}),st()},onCloseFunction:function(e){le({type:"UPDATE_FIELD",field:"search",value:e})},searchRef:Re}),lt=rt.ModalComponent,dt=rt.openModal,ct=rt.isLoading,st=rt.closeModal,ut=(0,z.Z)({link:{url:"/task/accounting/general-journal/get-chart-account",queryUrlName:"chartAccountSearch"},columns:[{field:"Acct_Code",headerName:"Account Code",width:130},{field:"Acct_Title",headerName:"Account Title.",width:250},{field:"Short",headerName:"Short",flex:1}],queryKey:"get-chart-account",uniqueId:"Acct_Code",responseDataKey:"getChartOfAccount",onSelected:function(e,t){le({type:"UPDATE_FIELD",field:"code",value:e[0].Acct_Code}),le({type:"UPDATE_FIELD",field:"acctName",value:e[0].Acct_Title}),xt(),setTimeout((function(){var e;null===(e=_e.current)||void 0===e||e.focus()}),250)},searchRef:Re}),pt=ut.ModalComponent,ft=ut.openModal,ht=ut.isLoading,xt=ut.closeModal,mt=(0,z.Z)({link:{url:"/task/accounting/search-pdc-policy-id",queryUrlName:"searchPdcPolicyIds"},columns:[{field:"Type",headerName:"Type",width:130},{field:"IDNo",headerName:"ID No.",width:200},{field:"Name",headerName:"Name",flex:1},{field:"ID",headerName:"ID",hide:!0}],queryKey:"get-policyId-ClientId-RefId",uniqueId:"IDNo",responseDataKey:"clientsId",onSelected:function(e){var t,n,i;console.log(e),le({type:"UPDATE_FIELD",field:"ClientName",value:null!==(t=e[0].Name)&&void 0!==t?t:""}),le({type:"UPDATE_FIELD",field:"IDNo",value:null!==(n=e[0].IDNo)&&void 0!==n?n:""}),le({type:"UPDATE_FIELD",field:"subAcct",value:e[0].sub_account}),le({type:"UPDATE_FIELD",field:"subAcctName",value:null!==(i=e[0].ShortName)&&void 0!==i?i:""}),yt(),setTimeout((function(){var e;null===(e=Me.current)||void 0===e||e.focus()}),200)},searchRef:Ue}),gt=mt.ModalComponent,bt=mt.openModal,vt=mt.isLoading,yt=mt.closeModal,Ct=(0,z.Z)({link:{url:"/task/accounting/general-journal/get-transaction-account",queryUrlName:"transactionCodeSearch"},columns:[{field:"Code",headerName:"Code",width:130},{field:"Description",headerName:"Description",flex:1}],queryKey:"get-transaction-account",uniqueId:"Code",responseDataKey:"getTransactionAccount",onSelected:function(e){le({type:"UPDATE_FIELD",field:"TC_Code",value:e[0].Code}),le({type:"UPDATE_FIELD",field:"TC_Desc",value:e[0].Description}),Zt(),setTimeout((function(){var e;null===(e=Pe.current)||void 0===e||e.focus()}),200)},searchRef:Ue}),Dt=Ct.ModalComponent,Nt=Ct.openModal,jt=Ct.isLoading,Zt=Ct.closeModal;(0,c.useEffect)((function(){var e=Ee.reduce((function(e,t){return e+parseFloat(t.debit.replace(/,/g,""))}),0),t=Ee.reduce((function(e,t){return e+parseFloat(t.credit.replace(/,/g,""))}),0);le({type:"UPDATE_FIELD",field:"totalDebit",value:e.toFixed(2)}),le({type:"UPDATE_FIELD",field:"totalCredit",value:t.toFixed(2)}),le({type:"UPDATE_FIELD",field:"totalBalance",value:(e-t).toFixed(2)})}),[Ee]);var It=function(e){var t=e.target,n=t.name,i=t.value;le({type:"UPDATE_FIELD",field:n,value:i})};function Tt(){return""===re.refNo?E().fire({position:"center",icon:"warning",title:"Please provide reference number!",timer:1500}):""===re.explanation?E().fire({position:"center",icon:"warning",title:"Please provide explanation!",timer:1500}).then((function(){(0,_.D)(300).then((function(){var e;null===(e=ze.current)||void 0===e||e.focus()}))})):""===re.totalDebit&&""===re.totalCredit||"0.00"===re.totalDebit&&"0.00"===re.totalCredit?E().fire({position:"center",icon:"warning",title:"Total Debit and Credit amount must not be zero(0), please double check the entries",timer:1500}).then((function(){(0,_.D)(300).then((function(){}))})):re.totalDebit!==re.totalCredit?E().fire({position:"center",icon:"warning",title:"Total Debit and Credit amount must be balance, please double check the entries",timer:1500}).then((function(){(0,_.D)(300).then((function(){}))})):void(be?(0,V.s)({isUpdate:!0,cb:function(e){Ye({hasSelected:be,refNo:re.refNo,dateEntry:re.dateEntry,explanation:re.explanation,generalJournal:Ee,userCodeConfirmation:e})}}):(0,V.L)({isConfirm:function(){Ye({hasSelected:be,refNo:re.refNo,dateEntry:re.dateEntry,explanation:re.explanation,generalJournal:Ee})}}))}function St(){if(""===re.code)return E().fire({position:"center",icon:"warning",title:"Code is required!",timer:1500}).then((function(){return ft(re.code)}));if(""===re.ClientName)return E().fire({position:"center",icon:"warning",title:"ID is required!",timer:1500}).then((function(){return bt(re.ClientName)}));if(isNaN(parseFloat(re.debit.replace(/,/g,""))))return E().fire({position:"center",icon:"warning",title:"Debit is required!",timer:1500});if(isNaN(parseFloat(re.credit.replace(/,/g,""))))return E().fire({position:"center",icon:"warning",title:"Credit is required!",timer:1500});if(0===parseFloat(re.credit.replace(/,/g,""))&&0===parseFloat(re.debit.replace(/,/g,"")))return E().fire({position:"center",icon:"warning",title:"Credit and Debit must be different!",timer:1500});if(""===re.TC_Code)return E().fire({position:"center",icon:"warning",title:"TC is required!",timer:1500}).then((function(){return Nt(re.TC_Code)}));if(re.code.length>=200)return E().fire({position:"center",icon:"warning",title:"Code is too long!",timer:1500});if(re.ClientName.length>=200)return E().fire({position:"center",icon:"warning",title:"Client name is too long!",timer:1500});if(re.TC_Code.length>=200)return E().fire({position:"center",icon:"warning",title:"TC is too long!",timer:1500});if(re.invoice.length>=200)return E().fire({position:"center",icon:"warning",title:"Invoice is too long!",timer:1500});if(re.TC_Code.length>=200)return E().fire({position:"center",icon:"warning",title:"TC is too long!",timer:1500});function e(e){var t=e.length?e[e.length-1].TempID:"000";return(parseInt(t.toString().match(/\d+/)[0])+1).toString().padStart(3,"0")}E().fire({title:Ie.edit?"Are you sure you want to update row?":"Are you sure you want to add new row?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:Ie.edit?"Yes, update it!":"Yes Add it"}).then((function(t){if(t.isConfirmed){Ae((function(t){if(""===re.debit&&(re.debit="0.00"),""===re.credit&&(re.credit="0.00"),"VAT"===re.vatType&&"1.06.02"!==re.code){var n;0!==parseFloat(re.debit.replace(/,/g,""))?(n=parseFloat(re.debit.replace(/,/g,""))/1.12,re.debit=n.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})):(n=parseFloat(re.credit.replace(/,/g,""))/1.12,re.credit=n.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}));var a=parseFloat(re.credit.toString().replace(/,/g,"")).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),o=parseFloat(re.debit.toString().replace(/,/g,"")).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});re.credit=a,re.debit=o,t=Ie.edit?t.map((function(e){return Ie.updateId===e.TempID&&(e=(0,d.Z)((0,d.Z)({},e),re)),e})):[].concat((0,i.Z)(t),[(0,d.Z)((0,d.Z)({},re),{},{TempID:e(t)})]);var r=.12*n;0!==parseFloat(re.debit.toString().replace(/,/g,""))?re.debit=r.toFixed(2):re.credit=r.toFixed(2),t=[].concat((0,i.Z)(t),[(0,d.Z)((0,d.Z)({},re),{},{code:"1.06.02",acctName:"Input Tax",TempID:e(t)})])}else{var l=parseFloat(re.credit.toString().replace(/,/g,"")).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),c=parseFloat(re.debit.toString().replace(/,/g,"")).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});if(re.credit=l,re.debit=c,Ie.edit)return t.map((function(e){return Ie.updateId===e.TempID&&(e=(0,d.Z)((0,d.Z)({},e),re)),e}));t=[].concat((0,i.Z)(t),[(0,d.Z)((0,d.Z)({},re),{},{TempID:e(t)})])}return t}));$(le,(0,d.Z)((0,d.Z)({},re),{code:"",acctName:"",subAcct:"",subAcctName:"",IDNo:"",ClientName:"",credit:"",debit:"",TC_Code:"",TC_Desc:"",remarks:"",vatType:"NON-VAT",invoice:""})),Te({edit:!1,updateId:""}),(0,_.D)(300).then((function(){var e;null===(e=Be.current)||void 0===e||e.focus()}))}}))}return(0,G.jsxs)("div",{style:{display:"flex",flexDirection:"column",width:"100%",height:"100%",flex:1},children:[(0,G.jsxs)("div",{style:{display:"flex",alignItems:"center",columnGap:"5px"},children:[(0,G.jsxs)("div",{style:{display:"flex",alignItems:"center",columnGap:"5px"},children:[ct?(0,G.jsx)(I.Z,{loading:ct}):(0,G.jsx)(s.Z,{label:"Search",size:"small",name:"search",value:re.search,onChange:It,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),dt(e.target.value)},InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{width:"300px",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),!se&&(0,G.jsx)(u.Z,{sx:{height:"30px",fontSize:"11px"},variant:"contained",startIcon:(0,G.jsx)(T.Z,{sx:{width:15,height:15}}),id:"entry-header-save-button",onClick:function(){ue(!0)},color:"primary",children:"New"}),(0,G.jsx)(I.Z,{sx:{height:"30px",fontSize:"11px"},loading:He,disabled:!se,onClick:Tt,color:"success",variant:"contained",children:"Save"}),se&&(0,G.jsx)(I.Z,{sx:{height:"30px",fontSize:"11px"},variant:"contained",startIcon:(0,G.jsx)(S.Z,{sx:{width:15,height:15}}),color:"error",onClick:function(){E().fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, cancel it!"}).then((function(e){e.isConfirmed&&(ue(!1),ve(!1),$(le,Y),Je(),Ae([]),Ne(!1),Te({edit:!1,updateId:""}))}))},disabled:!se||He,children:"Cancel"}),(0,G.jsx)(I.Z,{sx:{height:"30px",fontSize:"11px",background:B.Z[500],":hover":{background:B.Z[600]}},onClick:function(){(0,V.s)({isUpdate:!1,text:"Are you sure you want to void ".concat(re.refNo),cb:function(e){tt({refNo:re.refNo,dateEntry:re.dateEntry,userCodeConfirmation:e})}})},loading:nt,disabled:!De,variant:"contained",startIcon:(0,G.jsx)(M.Z,{sx:{width:20,height:20}}),children:"Void"}),(0,G.jsx)(I.Z,{sx:{height:"30px",fontSize:"11px",background:O.Z[500],":hover":{background:O.Z[600]}},onClick:function(){xe((function(e){return!e}))},loading:$e,variant:"contained",startIcon:(0,G.jsx)(j.Z,{sx:{width:20,height:20}}),children:"Jobs"}),(0,G.jsx)(u.Z,{disabled:!De,id:"basic-button","aria-haspopup":"true",onClick:function(){(0,J.flushSync)((function(){localStorage.removeItem("printString"),localStorage.setItem("dataString",JSON.stringify(Ee)),localStorage.setItem("paper-width","8.5in"),localStorage.setItem("paper-height","11in"),localStorage.setItem("module","general-journal"),localStorage.setItem("state",JSON.stringify(re)),localStorage.setItem("column",JSON.stringify([{datakey:"code",header:"ACCT #",width:"100px"},{datakey:"acctName",header:"ACCOUNT TITLE",width:"200px"},{datakey:"subAcctName",header:"SUB ACCOUNT",width:"120px"},{datakey:"IDNo",header:"ID NO.",width:"150px"},{datakey:"ClientName",header:"IDENTITY",width:"200px"},{datakey:"debit",header:"DEBIT",width:"100px"},{datakey:"credit",header:"CREDIT",width:"100px"}])),localStorage.setItem("title","UMIS"===(null===ie||void 0===ie?void 0:ie.department)?"UPWARD MANAGEMENT INSURANCE SERVICES\n":"UPWARD CONSULTANCY SERVICES AND MANAGEMENT INC.\n")})),window.open("/dashboard/print","_blank")},sx:{height:"30px",fontSize:"11px",color:"white",backgroundColor:K.Z[600],"&:hover":{backgroundColor:K.Z[700]}},children:"Print"})]}),(0,G.jsxs)("div",{style:{fontSize:"13px",border:"1px solid #d4d4d8",width:"100%",display:"flex",columnGap:"50px",height:"30px",alignItems:"center",justifyContent:"center"},children:[(0,G.jsxs)("p",{children:[(0,G.jsx)("span",{children:"Total Rows:"})," ",(0,G.jsx)("strong",{children:Ee.length})]}),(0,G.jsxs)("p",{children:[(0,G.jsx)("span",{children:"Total Debit:"})," ",(0,G.jsx)("strong",{children:re.totalDebit})]}),(0,G.jsxs)("p",{children:[(0,G.jsx)("span",{children:"Total Credit:"})," ",(0,G.jsx)("strong",{children:re.totalCredit})]}),(0,G.jsxs)("p",{children:[(0,G.jsx)("span",{children:"Balance:"})," ",(0,G.jsx)("strong",{style:{color:parseFloat(re.totalBalance.replace(/,/g,""))>0?"red":"black"},children:re.totalBalance})]})]})]}),(0,G.jsxs)("fieldset",{style:{border:"1px solid #cbd5e1",borderRadius:"5px",position:"relative",width:"100%",height:"auto",display:"flex",marginTop:"10px",gap:"10px",padding:"15px"},children:[qe?(0,G.jsx)(I.Z,{loading:qe}):(0,G.jsxs)(p.Z,{variant:"outlined",size:"small",disabled:!se||be,sx:{width:"170px",".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,G.jsx)(f.Z,{htmlFor:"return-check-id-field",children:"Ref. No."}),(0,G.jsx)(h.Z,{sx:{height:"27px",fontSize:"14px"},disabled:!se||be,fullWidth:!0,label:"Ref. No.",name:"refNo",value:re.refNo,onChange:It,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),Tt()},readOnly:"UCSMI"!==(null===ie||void 0===ie?void 0:ie.department),id:"return-check-id-field",endAdornment:(0,G.jsx)(x.Z,{position:"end",children:(0,G.jsx)(m.Z,{ref:Le,disabled:!se||be,"aria-label":"search-client",color:"secondary",edge:"end",onClick:function(){Je()},children:(0,G.jsx)(F.Z,{})})})})]}),(0,G.jsx)(Z.Z,{fullWidth:!1,disabled:!se,label:"Date",onChange:function(e){le({type:"UPDATE_FIELD",field:"dateEntry",value:e})},value:new Date(re.dateEntry),onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)var t=setTimeout((function(){var e,n;null===(e=ke.current)||void 0===e||null===(n=e.querySelector("button"))||void 0===n||n.click(),clearTimeout(t)}),150)},datePickerRef:ke,textField:{InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}}),(0,G.jsx)(s.Z,{disabled:!se,label:"Explanation",size:"small",name:"explanation",value:re.explanation,onChange:It,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),Tt()},inputRef:ze,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{flex:1,height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}})]}),(0,G.jsxs)("fieldset",{style:{border:"1px solid #cbd5e1",borderRadius:"5px",position:"relative",width:"100%",height:"auto",marginTop:"10px",padding:"15px"},children:[(0,G.jsxs)("div",{style:{display:"flex",gap:"10px"},children:[ht?(0,G.jsx)(I.Z,{loading:ht}):(0,G.jsxs)(p.Z,{variant:"outlined",size:"small",disabled:!se,sx:{width:"150px",".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,G.jsx)(f.Z,{htmlFor:"chart-account-id",children:"Code"}),(0,G.jsx)(h.Z,{sx:{height:"27px",fontSize:"14px"},readOnly:!0,inputRef:Be,disabled:!se,fullWidth:!0,label:"Code",name:"code",value:re.code,onChange:It,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),ft(re.code);(0,q.rO)(e,ee,e.target)},id:"chart-account-id",endAdornment:(0,G.jsx)(x.Z,{position:"end",children:(0,G.jsx)(m.Z,{ref:Le,disabled:!se,"aria-label":"search-client",color:"secondary",edge:"end",onClick:function(){ft(re.code)},children:(0,G.jsx)(F.Z,{})})})})]}),(0,G.jsx)(s.Z,{disabled:!se,label:"Account Name",size:"small",name:"acctName",value:re.acctName,onChange:It,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),St();(0,q.rO)(e,ee,e.target)},InputProps:{readOnly:!0,style:{height:"27px",fontSize:"14px"}},sx:{flex:1,".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,G.jsx)(s.Z,{disabled:!se,label:"Sub Account",size:"small",name:"subAcctName",value:re.subAcctName,onChange:It,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),St();(0,q.rO)(e,ee,e.target)},InputProps:{readOnly:!0,style:{height:"27px",fontSize:"14px"}},sx:{flex:1,".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),vt?(0,G.jsx)(I.Z,{loading:vt}):(0,G.jsxs)(p.Z,{variant:"outlined",size:"small",disabled:!se,sx:{flex:1,".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,G.jsx)(f.Z,{htmlFor:"policy-client-ref-id",children:"I.D"}),(0,G.jsx)(h.Z,{sx:{height:"27px",fontSize:"14px"},readOnly:!0,inputRef:_e,disabled:!se,fullWidth:!0,label:"I.D",name:"ClientName",value:re.ClientName,onChange:It,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),bt(re.ClientName);(0,q.rO)(e,ee,e.target)},id:"policy-client-ref-id",endAdornment:(0,G.jsx)(x.Z,{position:"end",children:(0,G.jsx)(m.Z,{ref:Le,disabled:!se,"aria-label":"search-client",color:"secondary",edge:"end",onClick:function(){bt(re.ClientName)},children:(0,G.jsx)(F.Z,{})})})})]})]}),(0,G.jsxs)("div",{style:{display:"flex",gap:"10px",marginTop:"10px"},children:[(0,G.jsx)(s.Z,{disabled:!se,label:"Debit",size:"small",name:"debit",value:re.debit,onChange:It,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),It({target:{name:"credit",value:"0.00"}}),St();(0,q.rO)(e,ee,e.target)},onBlur:function(){le({type:"UPDATE_FIELD",field:"debit",value:parseFloat((""===re.debit?"0":re.debit).replace(/,/g,"")).toFixed(2)})},InputProps:{inputComponent:L.a,inputRef:Me,style:{height:"27px",fontSize:"14px"}},sx:{width:"160px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,G.jsx)(s.Z,{disabled:!se,label:"Credit",size:"small",name:"credit",value:re.credit,onChange:It,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),St();(0,q.rO)(e,ee,e.target)},InputProps:{inputComponent:L.a,style:{height:"27px",fontSize:"14px"}},sx:{width:"160px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onBlur:function(e){e.preventDefault(),le({type:"UPDATE_FIELD",field:"credit",value:parseFloat((""===re.credit?"0":re.credit).replace(/,/g,"")).toFixed(2)})}}),jt?(0,G.jsx)(I.Z,{loading:jt}):(0,G.jsxs)(p.Z,{variant:"outlined",size:"small",disabled:!se,sx:{width:"130px",".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,G.jsx)(f.Z,{htmlFor:"tc",children:"TC"}),(0,G.jsx)(h.Z,{sx:{height:"27px",fontSize:"14px"},readOnly:!0,fullWidth:!0,label:"TC",name:"TC_Code",value:re.TC_Code,onChange:It,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),Nt(re.TC_Code);(0,q.rO)(e,ee,e.target)},id:"tc",endAdornment:(0,G.jsx)(x.Z,{position:"end",children:(0,G.jsx)(m.Z,{ref:Le,disabled:!se,"aria-label":"search-client",color:"secondary",edge:"end",onClick:function(){Nt(re.TC_Code)},children:(0,G.jsx)(F.Z,{})})})})]}),(0,G.jsx)(s.Z,{disabled:!se,label:"Remarks",size:"small",name:"remarks",value:re.remarks,onChange:It,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),St();(0,q.rO)(e,ee,e.target)},InputProps:{style:{height:"27px",fontSize:"14px"},inputRef:Pe},sx:{flex:1,".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,G.jsxs)(p.Z,{size:"small",variant:"outlined",sx:{width:"120px",".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,G.jsx)(f.Z,{id:"label-selection-reason",children:"Vat Type"}),(0,G.jsxs)(g.Z,{labelId:"label-selection-reason",value:re.vatType,name:"vatType",onChange:It,autoWidth:!0,sx:{height:"27px",fontSize:"14px"},disabled:!se,children:[(0,G.jsx)(b.Z,{value:""}),(0,G.jsx)(b.Z,{value:"VAT",children:"VAT"}),(0,G.jsx)(b.Z,{value:"NON-VAT",children:"NON-VAT"})]})]}),(0,G.jsx)(s.Z,{disabled:!se,label:"OR/Invoice No.",size:"small",name:"invoice",value:re.invoice,onChange:It,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),St();(0,q.rO)(e,ee,e.target)},InputProps:{style:{height:"27px",fontSize:"14px"},inputRef:Ke},sx:{width:"200px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}})]})]}),(0,G.jsx)("div",{ref:We,className:ee,style:{marginTop:"10px",width:"100%",position:"relative",flex:1},children:(0,G.jsx)(v.Z,{style:{height:"".concat(null===(X=We.current)||void 0===X?void 0:X.getBoundingClientRect().height,"px"),width:"100%",overflowX:"scroll",position:"absolute"},children:(0,G.jsx)(W.Z,{ref:Oe,isLoading:He||ot||$e,columns:Q,rows:Ee,table_id:"TempID",isSingleSelection:!0,isRowFreeze:!1,dataSelection:function(e,t,n){var i=t.filter((function(t){return t.TempID===e[0]}))[0];if(void 0===i||i.length<=0){return $(le,(0,d.Z)((0,d.Z)({},re),{code:"",acctName:"",subAcct:"",subAcctName:"",IDNo:"",ClientName:"",credit:"",debit:"",TC_Code:"",TC_Desc:"",remarks:"",vatType:"NON-VAT",invoice:""})),void Te({edit:!1,updateId:""})}"Delete"!==n&&"Backspace"!==n?($(le,(0,d.Z)((0,d.Z)({},i),{},{sub_refNo:re.sub_refNo,refNo:re.refNo,dateEntry:re.dateEntry,explanation:re.explanation,totalDebit:re.totalDebit,totalCredit:re.totalCredit,totalBalance:re.totalBalance})),Te({edit:!0,updateId:i.TempID})):E().fire({title:"Are you sure you want to delete?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then((function(t){if(t.isConfirmed)return Ae((function(t){return t.filter((function(t){return t.TempID!==e[0]}))}))}))}})})}),(0,G.jsx)(y.Z,{open:he,onClose:function(){return xe(!1)},children:(0,G.jsxs)(v.Z,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:470,bgcolor:"background.paper",p:4},children:[(0,G.jsx)(m.Z,{style:{position:"absolute",top:"10px",right:"10px"},"aria-label":"search-client",onClick:function(){return xe(!1)},children:(0,G.jsx)(S.Z,{})}),(0,G.jsx)(C.Z,{id:"modal-modal-title",variant:"h6",component:"h2",sx:{marginBottom:"20px"},children:"Jobs"}),(0,G.jsxs)("div",{style:{width:"400px"},children:[(0,G.jsxs)("div",{style:{width:"100%",display:"flex",marginBottom:"10px",justifyContent:"space-between",alignItems:"center"},children:[(0,G.jsx)(P._,{dateAdapter:R.H,children:(0,G.jsx)(U.M,{sx:{width:"200px",".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},slotProps:{textField:{size:"small",name:"",InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}},label:"Transaction Date: ",views:["month","year"],value:re.jobTransactionDate,onChange:function(e){le({type:"UPDATE_FIELD",field:"jobTransactionDate",value:e})}})}),(0,G.jsx)(D.Z,{sx:{height:"30px","& .MuiTypography-root":{fontSize:"14px"}},control:(0,G.jsx)(N.Z,{size:"small",checked:re.jobAutoExp,onChange:function(e){le({type:"UPDATE_FIELD",field:"jobAutoExp",value:!re.jobAutoExp})}}),label:"Auto Explanation"})]}),(0,G.jsxs)(p.Z,{fullWidth:!0,size:"small",variant:"outlined",sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,G.jsx)(f.Z,{id:"label-selection-job-type",children:"Type of Job"}),(0,G.jsxs)(g.Z,{labelId:"label-selection-job-type",value:re.jobType,name:"jobType",onChange:It,autoWidth:!0,sx:{height:"27px",fontSize:"14px"},children:[(0,G.jsx)(b.Z,{value:"",children:" "}),(0,G.jsx)(b.Z,{value:"0",children:"Reversal of Accrued Interest "}),(0,G.jsxs)(b.Z,{value:"1",children:[" ","Income Recognition & Accrual of Interest"]}),(0,G.jsx)(b.Z,{value:"2",children:"Penalty Charges"}),(0,G.jsx)(b.Z,{value:"3",children:"Penalty Income"}),(0,G.jsx)(b.Z,{value:"4",children:"RPT Transaction (NIL-HN)"}),(0,G.jsx)(b.Z,{value:"5",children:"RPT Transaction (AMIFIN)"}),(0,G.jsx)(b.Z,{value:"6",children:"RPT Income"}),(0,G.jsx)(b.Z,{value:"7",children:"Monthly Accrual Expenses"}),(0,G.jsx)(b.Z,{value:"8",children:"Monthly Accrual Income"}),(0,G.jsx)(b.Z,{value:"9",children:"Production (Milestone Guarantee)"}),(0,G.jsx)(b.Z,{value:"10",children:"Production (Liberty Insurance Co.)"}),(0,G.jsx)(b.Z,{value:"11",children:"Production (Federal Phoenix)"})]})]})]}),(0,G.jsxs)("div",{style:{display:"flex",columnGap:"30px",alignItems:"flex-end",marginTop:"20px"},children:[(0,G.jsx)(I.Z,{loading:$e,color:"success",variant:"contained",onClick:function(){return Xe(re)},children:"Create Job"}),(0,G.jsx)(u.Z,{color:"error",variant:"contained",onClick:function(){return xe(!1)},children:"Cancel"})]})]})}),pt,gt,Dt,lt]})}function $(e,t){Object.entries(t).forEach((function(t){var n=(0,r.Z)(t,2),i=n[0],a=n[1];e({type:"UPDATE_FIELD",field:i,value:a})}))}},67442:function(e,t,n){var i=n(64836);t.Z=void 0;var a=i(n(45649)),o=n(80184),r=(0,a.default)((0,o.jsx)("path",{d:"M20 6h-3V4c0-1.11-.89-2-2-2H9c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM9 4h6v2H9V4zm11 15H4v-2h16v2zm0-5H4V8h3v2h2V8h6v2h2V8h3v6z"}),"CardTravel");t.Z=r},16656:function(e,t){t.Z={50:"#efebe9",100:"#d7ccc8",200:"#bcaaa4",300:"#a1887f",400:"#8d6e63",500:"#795548",600:"#6d4c41",700:"#5d4037",800:"#4e342e",900:"#3e2723",A100:"#d7ccc8",A200:"#bcaaa4",A400:"#8d6e63",A700:"#5d4037"}},95643:function(e,t){t.Z={50:"#fbe9e7",100:"#ffccbc",200:"#ffab91",300:"#ff8a65",400:"#ff7043",500:"#ff5722",600:"#f4511e",700:"#e64a19",800:"#d84315",900:"#bf360c",A100:"#ff9e80",A200:"#ff6e40",A400:"#ff3d00",A700:"#dd2c00"}}}]);
//# sourceMappingURL=9425.e8862679.chunk.js.map