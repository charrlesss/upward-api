"use strict";(self.webpackChunkupward=self.webpackChunkupward||[]).push([[8019],{88019:function(e,n,t){t.r(n),t.d(n,{default:function(){return $},incrementCheckNo:function(){return ne},pdcBanksColumn:function(){return Q},pdcColumn:function(){return V},pdcSearchColumn:function(){return J},reducer:function(){return Y},setNewStateValue:function(){return ee}});var o=t(93433),i=t(74165),a=t(15861),r=t(29439),l=t(4942),c=t(1413),d=t(72791),u=t(64554),s=t(48550),h=t(36151),p=t(65117),f=t(23786),x=t(68096),m=t(94925),k=t(77196),v=t(63466),C=t(13400),g=t(88447),D=t(20890),y=t(42419),N=t(91933),_=t(21830),w=t.n(_),b=t(53329),S=t(3380),E=t(13784),I=t(91421),Z=t(29823),A=t(99422),P=t(56580),R=t(54164),j=t(93263),B=t(39709),F=t(86753),L=t(89767),M=t(73518),T=t(64230),U=t(71640),z=t(92562),K=t(58340),O=t(5519),q=t(80184),W={Sub_Ref_No:"",Ref_No:"",PNo:"",IDNo:"",Date:new Date,Name:"",Remarks:"",PDC_Status:"",Deposit_Slip:"",DateDeposit:"",OR_No:"",search:"",pdcMode:"",checkMode:"",sub_account:"",Acronym:""},G={CheckIdx:"0",BankName:"",BankCode:"",Branch:"",Check_Date:new Date,Check_No:"",Check_Amnt:"",Check_Remarks:"",Check_Count:""},Y=function(e,n){return"UPDATE_FIELD"===n.type?(0,c.Z)((0,c.Z)({},e),{},(0,l.Z)({},n.field,n.value)):e},V=[{field:"Check_No",headerName:"Check No.",width:150},{field:"Check_Date",headerName:"Check Date",width:150},{field:"Check_Amnt",headerName:"Amount",width:150,type:"number"},{field:"BankName",headerName:"Bank",width:150},{field:"Branch",headerName:"Branch",width:150},{field:"Check_Remarks",headerName:"Checked Remarks",flex:1,minWidth:350},{field:"Deposit_Slip",headerName:"Deposit Slip",width:150},{field:"DateDeposit",headerName:"Date Deposit",width:150},{field:"OR_No",headerName:"OR Num",width:150},{field:"BankCode",headerName:"Bank Code",width:150,hide:!0}],J=[{field:"Date",headerName:"Date Received",width:160},{field:"Ref_No",headerName:"Ref No.",width:160},{field:"Name",headerName:"Name",flex:1}],Q=[{field:"Bank_Code",headerName:"Code",width:130},{field:"Bank",headerName:"Bank Name",flex:1}],H="pdc",X="pdc-search";function $(){var e,n,t,_,J,Q,$=(0,d.useRef)(null),te=d.useState(null),oe=(0,r.Z)(te,2),ie=oe[0],ae=oe[1],re=Boolean(ie),le=(0,d.useState)(!1),ce=(0,r.Z)(le,2),de=ce[0],ue=ce[1],se=(0,d.useState)([]),he=(0,r.Z)(se,2),pe=he[0],fe=he[1],xe=(0,d.useState)([]),me=(0,r.Z)(xe,2),ke=me[0],ve=me[1],Ce=(0,d.useState)(!1),ge=(0,r.Z)(Ce,2),De=ge[0],ye=ge[1],Ne=(0,d.useState)(!1),_e=(0,r.Z)(Ne,2),we=_e[0],be=_e[1],Se=(0,d.useReducer)(Y,W),Ee=(0,r.Z)(Se,2),Ie=Ee[0],Ze=Ee[1],Ae=(0,d.useReducer)(Y,G),Pe=(0,r.Z)(Ae,2),Re=Pe[0],je=Pe[1],Be=(0,d.useContext)(S.V),Fe=Be.myAxios,Le=Be.user,Me=(0,d.useRef)(null),Te=(0,d.useRef)(null),Ue=(0,d.useRef)(null),ze=(0,d.useRef)(null),Ke=(0,d.useRef)(null),Oe=(0,d.useRef)(null),qe=(0,d.useRef)(null),We=(0,d.useRef)(null),Ge=(0,d.useRef)(null),Ye=(0,d.useRef)(null),Ve=(0,d.useRef)(null),Je=(0,d.useRef)(null),Qe=(0,d.useRef)(null),He=(0,N.useQueryClient)(),Xe=(0,d.useRef)(null),$e=(0,N.useQuery)({queryKey:"new-ref-number",queryFn:function(){return(e=e||(0,a.Z)((0,i.Z)().mark((function e(){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Fe.get("/task/accounting/pdc-new-ref-number",{headers:{Authorization:"Bearer ".concat(null===Le||void 0===Le?void 0:Le.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},refetchOnWindowFocus:!1,onSuccess:function(e){var n=e;console.log(n),Ze({type:"UPDATE_FIELD",field:"Ref_No",value:n.data.RefNo[0].pdcID}),Ze({type:"UPDATE_FIELD",field:"Sub_Ref_No",value:n.data.RefNo[0].pdcID})}}),en=$e.isLoading,nn=$e.refetch,tn=(0,N.useMutation)({mutationKey:H,mutationFn:function(e){return(n=n||(0,a.Z)((0,i.Z)().mark((function e(n){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("update"!==Ie.pdcMode){e.next=5;break}return delete n.mode,e.next=4,Fe.post("/task/accounting/update-pdc",n,{headers:{Authorization:"Bearer ".concat(null===Le||void 0===Le?void 0:Le.accessToken)}});case 4:case 8:return e.abrupt("return",e.sent);case 5:return delete n.mode,e.next=8,Fe.post("/task/accounting/add-pdc",n,{headers:{Authorization:"Bearer ".concat(null===Le||void 0===Le?void 0:Le.accessToken)}});case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){if(e.data.success)return nn(),He.invalidateQueries(X),ee(Ze,W),ve([]),Ze({type:"UPDATE_FIELD",field:"pdcMode",value:""}),w().fire({position:"center",icon:"success",title:e.data.message,showConfirmButton:!1,timer:1500});w().fire({position:"center",icon:"error",title:e.data.message,showConfirmButton:!1,timer:1500})}}),on=tn.mutate,an=tn.isLoading,rn=(0,N.useMutation)({mutationKey:H,mutationFn:function(e){return(t=t||(0,a.Z)((0,i.Z)().mark((function e(n){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Fe.post("/task/accounting/get-search-pdc-check",n,{headers:{Authorization:"Bearer ".concat(null===Le||void 0===Le?void 0:Le.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){return(_=_||(0,a.Z)((0,i.Z)().mark((function e(n){var t,o,r,l,d,u,s,h;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(h=function(e,n){return(t=t||(0,a.Z)((0,i.Z)().mark((function e(n,t){var o,a,r;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o=[],a=(0,i.Z)().mark((function e(){var a,l,c,d,u,s;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n[r],l="".concat(t,"/").concat(a.uniqueFilename),e.next=4,fetch(l);case 4:return c=e.sent,e.next=7,c.blob();case 7:d=e.sent,u=new File([d],a.fileName,{type:a.fileType}),s=new FileReader,o.push(new Promise((function(e,n){s.onload=function(n){e(u)},s.onerror=function(e){n(new Error("Error reading file: "+u.name))},s.readAsDataURL(u)})));case 11:case"end":return e.stop()}}),e)})),r=0;case 3:if(!(r<n.length)){e.next=8;break}return e.delegateYield(a(),"t0",5);case 5:r++,e.next=3;break;case 8:return e.abrupt("return",o);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)},null!==n&&void 0!==n&&n.data.success){e.next=3;break}return e.abrupt("return",alert("Error : ".concat(null===n||void 0===n?void 0:n.data.message)));case 3:if(r=(o=n).data.getSearchPDCCheck[0].Ref_No,!o.data.upload[0]){e.next=14;break}return d=JSON.parse(null===(l=o.data.upload[0])||void 0===l?void 0:l.upload),e.next=9,h(d,"".concat("http://localhost:4400/","pdc/").concat(r));case 9:return u=e.sent,e.next=12,Promise.all(u);case 12:s=e.sent,fe(s);case 14:ve(o.data.getSearchPDCCheck.map((function(e,n){return(0,c.Z)((0,c.Z)({},e),{},{CheckIdx:"".concat(n)})}))),Ze({type:"UPDATE_FIELD",field:"Ref_No",value:o.data.getSearchPDCCheck[0].Ref_No}),Ze({type:"UPDATE_FIELD",field:"Name",value:o.data.getSearchPDCCheck[0].Name}),Ze({type:"UPDATE_FIELD",field:"Date",value:o.data.getSearchPDCCheck[0].Date}),Ze({type:"UPDATE_FIELD",field:"PNo",value:o.data.getSearchPDCCheck[0].PNo}),Ze({type:"UPDATE_FIELD",field:"IDNo",value:o.data.getSearchPDCCheck[0].IDNo}),Ze({type:"UPDATE_FIELD",field:"Acronym",value:o.data.getSearchPDCCheck[0].Acronym}),Ze({type:"UPDATE_FIELD",field:"sub_account",value:o.data.getSearchPDCCheck[0].sub_account}),Ze({type:"UPDATE_FIELD",field:"Remarks",value:o.data.getSearchPDCCheck[0].Remarks}),Ze({type:"UPDATE_FIELD",field:"pdcMode",value:"update"}),yn();case 25:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}),ln=rn.mutate,cn=rn.isLoading,dn=(0,j.Z)({link:{url:"/task/accounting/search-pdc-policy-id",queryUrlName:"searchPdcPolicyIds"},columns:[{field:"Type",headerName:"Type",width:130},{field:"IDNo",headerName:"ID No.",width:200},{field:"chassis",headerName:"Chassis No.",width:200},{field:"Name",headerName:"Name",flex:1},{field:"ID",headerName:"ID",width:300,hide:!0},{field:"client_id",headerName:"client_id",width:200,hide:!0}],queryKey:"pdc-polidy-ids",uniqueId:"IDNo",responseDataKey:"clientsId",onSelected:function(e){var n,t;console.log(e),Ze({type:"UPDATE_FIELD",field:"PNo",value:e[0].IDNo}),Ze({type:"UPDATE_FIELD",field:"IDNo",value:e[0].client_id}),Ze({type:"UPDATE_FIELD",field:"Name",value:null!==(n=e[0].Name)&&void 0!==n?n:""}),Ze({type:"UPDATE_FIELD",field:"Remarks",value:null!==(t=e[0].remarks)&&void 0!==t?t:""}),Ze({type:"UPDATE_FIELD",field:"sub_account",value:e[0].sub_account}),Ze({type:"UPDATE_FIELD",field:"Acronym",value:e[0].Acronym}),hn()},searchRef:Je}),un=dn.ModalComponent,sn=dn.openModal,hn=dn.closeModal,pn=dn.isLoading,fn=(0,j.Z)({link:{url:"/task/accounting/search-pdc-banks",queryUrlName:"searchPdcBanks"},columns:[{field:"Bank_Code",headerName:"Code",width:130},{field:"Bank",headerName:"Bank Name",flex:1}],queryKey:"pdc-banks-codes",uniqueId:"Bank_Code",responseDataKey:"pdcBanks",onSelected:function(e){je({type:"UPDATE_FIELD",field:"BankName",value:e[0].Bank}),je({type:"UPDATE_FIELD",field:"BankCode",value:e[0].Bank_Code}),kn()},searchRef:Qe}),xn=fn.ModalComponent,mn=fn.openModal,kn=fn.closeModal,vn=fn.isLoading,Cn=(0,j.Z)({link:{url:"/task/accounting/search-pdc",queryUrlName:"searchPDCInput"},columns:[{field:"Date",headerName:"Date Received",width:160},{field:"Ref_No",headerName:"Ref No.",width:160},{field:"Name",headerName:"Name",flex:1}],queryKey:"pdc-search",uniqueId:"Ref_No",responseDataKey:"searchPDC",onSelected:function(e){ln({ref_no:e[0].Ref_No})},onCloseFunction:function(e){Ze({type:"UPDATE_FIELD",field:"search",value:e})},searchRef:Qe}),gn=Cn.ModalComponent,Dn=Cn.openModal,yn=Cn.closeModal,Nn=Cn.isLoading,_n=function(e){var n=e.target,t=n.name,o=n.value;Ze({type:"UPDATE_FIELD",field:t,value:o})},wn=function(e){var n=e.target,t=n.name,o=n.value;je({type:"UPDATE_FIELD",field:t,value:o})};var bn=function(e){e.preventDefault(),ue(!1)},Sn=function(e){e.preventDefault(),ue(!0)},En=function(e){e.preventDefault();var n,t=e.dataTransfer.files,i=Array.from(t),a=[].concat((0,o.Z)(pe),i);if(ue(!1),(0,z.checkFile)(a))return null===(n=Te.current)||void 0===n||n.click(),alert("file is not valid Extention!");fe(a)},In=""===Ie.pdcMode;return(0,q.jsxs)("div",{style:{display:"flex",flexDirection:"column",width:"100%",height:"100%",flex:1},children:[(0,q.jsx)(u.Z,{sx:function(e){return(0,l.Z)({display:"flex",alignItems:"center",columnGap:"20px"},e.breakpoints.down("sm"),{flexDirection:"column",alignItems:"flex-start",flex:1,marginBottom:"15px"})},children:(0,q.jsxs)("div",{style:{display:"flex",alignItems:"center",columnGap:"5px",marginBottom:"15px"},children:[Nn?(0,q.jsx)(B.Z,{loading:Nn}):(0,q.jsx)(s.Z,{label:"Search",size:"small",name:"search",value:Ie.search,onChange:_n,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),Dn(e.target.value)},InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{width:"300px",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),""===Ie.pdcMode&&(0,q.jsx)(h.Z,{sx:{height:"30px",fontSize:"11px"},variant:"contained",startIcon:(0,q.jsx)(y.Z,{sx:{width:15,height:15}}),id:"entry-header-save-button",color:"primary",onClick:function(){Ze({type:"UPDATE_FIELD",field:"pdcMode",value:"add"})},children:"New"}),(0,q.jsx)(B.Z,{sx:{height:"30px",fontSize:"11px"},ref:Ue,id:"save-entry-header",color:"success",variant:"contained",type:"submit",onClick:function(e){return(J=J||(0,a.Z)((0,i.Z)().mark((function e(n){var t,o,a,r;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=function(e){var n=pe;if(n.length>0)for(var t=function(){var t=n[o],i=new FileReader;e.push(new Promise((function(e,n){i.onload=function(n){var o;e({datakey:"pdc_file",fileName:t.name,fileContent:null===(o=n.target)||void 0===o?void 0:o.result,fileType:t.type,file:t})},i.onerror=function(e){n(new Error("Error reading file: "+t.name))},i.readAsDataURL(t)})))},o=0;o<n.length;o++)t()},""!==Ie.PNo){e.next=3;break}return e.abrupt("return",w().fire({position:"center",icon:"warning",title:"Please provide loan information!",timer:1500}).then((function(){setTimeout((function(){var e;null===(e=ze.current)||void 0===e||e.click()}),350)})));case 3:if(!(ke.length<=0)){e.next=5;break}return e.abrupt("return",w().fire({position:"center",icon:"warning",title:"Please provide entry!",timer:1500}).then((function(){ye(!0)})));case 5:if(!(Ie.PNo.length>=45)){e.next=7;break}return e.abrupt("return",w().fire({position:"center",icon:"warning",title:"Pno is too long!",timer:1500}));case 7:if(!(Ie.Remarks.length>=220)){e.next=9;break}return e.abrupt("return",w().fire({position:"center",icon:"warning",title:"Remarks is too long!",timer:1500}));case 9:return o(t=[]),e.next=13,Promise.all(t);case 13:a=e.sent,r={Ref_No:Ie.Ref_No,PNo:Ie.PNo,IDNo:Ie.IDNo,Date:Ie.Date,Name:Ie.Name,Remarks:Ie.Remarks,BankCode:Ie.BankCode,checks:JSON.stringify(ke)},"update"===Ie.pdcMode?(0,T.s)({isUpdate:!0,cb:function(e){on((0,c.Z)((0,c.Z)({},r),{},{userCodeConfirmation:e,fileToSave:a}))}}):(0,T.L)({isConfirm:function(){on((0,c.Z)((0,c.Z)({},r),{},{fileToSave:a}))}});case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)},disabled:""===Ie.pdcMode,loading:an,startIcon:(0,q.jsx)(b.Z,{sx:{width:15,height:15}}),children:"Save"}),("add"===Ie.pdcMode||"update"===Ie.pdcMode)&&(0,q.jsx)(h.Z,{sx:{height:"30px",fontSize:"11px"},variant:"contained",startIcon:(0,q.jsx)(Z.Z,{sx:{width:15,height:15}}),onClick:function(){w().fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, cancel it!"}).then((function(e){e.isConfirmed&&(W.Sub_Ref_No=Ie.Sub_Ref_No,W.Ref_No=Ie.Sub_Ref_No,ee(Ze,W),ve([]),Ze({type:"UPDATE_FIELD",field:"pdcMode",value:""}))}))},color:"error",children:"Cancel"}),(0,q.jsx)(h.Z,{sx:{height:"30px",fontSize:"11px"},disabled:""===Ie.pdcMode,variant:"contained",startIcon:(0,q.jsx)(y.Z,{sx:{width:15,height:15}}),onClick:function(){var e,n=ke[ke.length-1];(G.Check_No=ne(null===n||void 0===n?void 0:n.Check_No),ee(je,G),Ze({type:"UPDATE_FIELD",field:"checkMode",value:""}),(0,R.flushSync)((function(){ye(!0)})),"update"!==Ie.checkMode)&&(null===(e=Ke.current)||void 0===e||e.focus())},children:"Add Check"}),(0,q.jsxs)("div",{children:[(0,q.jsx)(h.Z,{disabled:"update"!==Ie.pdcMode,id:"basic-button","aria-controls":re?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":re?"true":void 0,onClick:function(e){ae(e.currentTarget)},sx:{height:"30px",fontSize:"11px",color:"white",backgroundColor:O.Z[600],"&:hover":{backgroundColor:O.Z[700]}},children:"Print"}),(0,q.jsxs)(p.Z,{id:"basic-menu",anchorEl:ie,open:re,onClose:function(){ae(null)},MenuListProps:{"aria-labelledby":"basic-button"},children:[(0,q.jsx)(f.Z,{onClick:function(){(0,R.flushSync)((function(){localStorage.removeItem("printString"),localStorage.setItem("dataString",JSON.stringify(ke)),localStorage.setItem("paper-width","8.5in"),localStorage.setItem("paper-height","11in"),localStorage.setItem("module","pdc"),localStorage.setItem("state",JSON.stringify(Ie)),localStorage.setItem("column",JSON.stringify([{datakey:"Check_No",header:"CHECK NO",width:"80px"},{datakey:"Check_Date",header:"DATE",width:"130px"},{datakey:"BankName",header:"BANK",width:"240px"},{datakey:"Check_Amnt",header:"AMOUNT",width:"70px"},{datakey:"SEQ",header:"SEQ",width:"30px"}])),localStorage.setItem("title","UMIS"===(null===Le||void 0===Le?void 0:Le.department)?"UPWARD MANAGEMENT INSURANCE SERVICES\n Post Date Checks Receipt":"UPWARD CONSULTANCY SERVICES AND MANAGEMENT INC.\n Post Date Checks Receipt")})),window.open("/dashboard/print","_blank")},children:"PDC Receipt"}),(0,q.jsx)(f.Z,{onClick:function(){(0,R.flushSync)((function(){var e=K.renderToString((0,q.jsxs)("div",{children:[(0,q.jsx)("p",{style:{color:"#d1d5db",fontSize:"11px",textAlign:"center",padding:0,marginTop:"8px",marginBottom:0},children:"UCSMI"}),(0,q.jsx)("p",{style:{color:"#d1d5db",fontSize:"11px",textAlign:"center",padding:0,margin:0},children:Ie.Name}),(0,q.jsx)("p",{style:{color:"#d1d5db",fontSize:"11px",textAlign:"center",padding:0,margin:0},children:Ie.IDNo}),(0,q.jsx)("p",{style:{color:"#d1d5db",fontSize:"11px",textAlign:"center",padding:0,margin:"20px"},children:Ie.Ref_No})]}));localStorage.setItem("printString",e),localStorage.removeItem("dataString"),localStorage.setItem("paper-width","8.5in"),localStorage.setItem("paper-height","11in")})),window.open("/dashboard/print","_blank")},children:"PDC Labeling"})]})]})]})}),(0,q.jsx)("form",{onKeyDown:function(e){"Enter"!==e.code&&"NumpadEnter"!==e.code||e.preventDefault()},children:(0,q.jsx)(u.Z,{sx:function(e){return(0,l.Z)({display:"flex",columnGap:"15px",flexDirection:"row"},e.breakpoints.down("md"),{flexDirection:"column",rowGap:"10px"})},children:(0,q.jsxs)(u.Z,{sx:{display:"flex",gap:"10px",width:"100%"},children:[(0,q.jsxs)("fieldset",{style:{flex:1,display:"flex",flexDirection:"column",gap:"10px",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px"},children:[(0,q.jsxs)("div",{style:{display:"flex",gap:"10px"},children:[en?(0,q.jsx)(B.Z,{loading:en}):(0,q.jsxs)(x.Z,{fullWidth:!0,variant:"outlined",size:"small",disabled:In,sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,q.jsx)(m.Z,{htmlFor:"pdc-id-field",children:"Reference No."}),(0,q.jsx)(k.Z,{readOnly:"UCSMI"!==(null===Le||void 0===Le?void 0:Le.department),sx:{height:"27px",fontSize:"14px"},disabled:In,label:"Reference No.",name:"Ref_No",value:Ie.Ref_No,onChange:_n,onKeyDown:function(e){var n;if("Enter"===e.code||"NumpadEnter"===e.code)return null===(n=Ue.current)||void 0===n?void 0:n.click()},id:"pdc-id-field",endAdornment:(0,q.jsx)(v.Z,{position:"end",children:(0,q.jsx)(C.Z,{disabled:In,"aria-label":"search-client",color:"secondary",edge:"end",children:(0,q.jsx)(F.Z,{})})})})]}),(0,q.jsx)(E.Z,{fullWidth:!0,disabled:In,label:"Date Received",onChange:function(e){Ze({type:"UPDATE_FIELD",field:"Date",value:e})},value:new Date(Ie.Date),onKeyDown:function(e){var n;"Enter"!==e.code&&"NumpadEnter"!==e.code||(null===(n=Ue.current)||void 0===n||n.click())},textField:{InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}})]}),(0,q.jsx)(s.Z,{variant:"outlined",size:"small",label:"Remarks",name:"Remarks",value:Ie.Remarks,onChange:_n,disabled:In,onKeyDown:function(e){var n;"Enter"!==e.code&&"NumpadEnter"!==e.code||(null===(n=Ue.current)||void 0===n||n.click())},InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}})]}),(0,q.jsxs)("fieldset",{style:{flex:1,display:"flex",gap:"10px",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px",flexDirection:"column"},children:[(0,q.jsxs)("div",{style:{width:"100%",flex:1,display:"flex",gap:"10px"},children:[pn?(0,q.jsx)(B.Z,{loading:pn}):(0,q.jsxs)(x.Z,{fullWidth:!0,variant:"outlined",size:"small",disabled:In,sx:{flex:1,".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,q.jsx)(m.Z,{htmlFor:"label-input-id",children:"PN/Client ID"}),(0,q.jsx)(k.Z,{sx:{height:"27px",fontSize:"14px"},onKeyDown:function(e){var n;"Enter"!==e.code&&"NumpadEnter"!==e.code||(null===(n=ze.current)||void 0===n||n.click())},name:"PNo",value:Ie.PNo,onChange:_n,id:"label-input-id",endAdornment:(0,q.jsx)(v.Z,{position:"end",children:(0,q.jsx)(C.Z,{ref:ze,disabled:In,"aria-label":"search-client",color:"secondary",edge:"end",onClick:function(){return sn(Ie.PNo)},children:(0,q.jsx)(I.Z,{})})}),label:"PN/Client ID"})]}),(0,q.jsx)(s.Z,{variant:"outlined",size:"small",label:"Branch",name:"Acronym",value:Ie.Acronym,onChange:_n,disabled:In,onKeyDown:function(e){var n;"Enter"!==e.code&&"NumpadEnter"!==e.code||(null===(n=Ue.current)||void 0===n||n.click())},InputProps:{style:{height:"27px",fontSize:"14px"},readOnly:!0},sx:{flex:1,height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}})]}),(0,q.jsxs)("div",{style:{width:"100%",display:"flex",columnGap:"10px"},children:[(0,q.jsx)(s.Z,{variant:"outlined",size:"small",label:"Clients Name",name:"Name",value:Ie.Name,onChange:_n,disabled:In,onKeyDown:function(e){var n;"Enter"!==e.code&&"NumpadEnter"!==e.code||(null===(n=Ue.current)||void 0===n||n.click())},InputProps:{style:{height:"27px",fontSize:"14px"},readOnly:!0},sx:{flex:1,height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,q.jsx)(h.Z,{sx:{height:"27px",fontSize:"11px"},disabled:""===Ie.pdcMode,variant:"contained",startIcon:(0,q.jsx)(M.Z,{sx:{width:15,height:15}}),onClick:function(){be(!0)},children:"Upload Check"})]})]})]})})}),(0,q.jsx)("div",{ref:$,style:{marginTop:"10px",width:"100%",position:"relative",flex:1},children:(0,q.jsx)(u.Z,{style:{height:"".concat(null===(Q=$.current)||void 0===Q?void 0:Q.getBoundingClientRect().height,"px"),width:"100%",overflowX:"scroll",position:"absolute"},children:(0,q.jsx)(L.Z,{ref:Xe,isLoading:an||cn,columns:V,rows:ke,table_id:"CheckIdx",isSingleSelection:!0,isRowFreeze:!1,dataSelection:function(e,n,t){var o,i=n.filter((function(n){return n.CheckIdx===e[0]}))[0];if(void 0===i||i.length<=0)Ze({type:"UPDATE_FIELD",field:"checkMode",value:""});else if(Ze({type:"UPDATE_FIELD",field:"checkMode",value:"update"}),"Delete"!==t&&"Backspace"!==t)ee(je,i),(0,R.flushSync)((function(){ye(!0)})),null===(o=Ve.current)||void 0===o||o.focusVisible();else{if(i.Deposit_Slip&&""!==i.Deposit_Slip||i.DateDeposit&&""!==i.DateDeposit||i.OR_No&&""!==i.OR_No)return w().fire({position:"center",icon:"warning",title:"Unable to delete. Check No ".concat(i.Check_No," is already ").concat(i.OR_No," issued of OR!"),showConfirmButton:!1,timer:1500});var a=setTimeout((function(){w().fire({title:"Are you sure?",text:"You won't to delete this Check No. ".concat(i.Check_No),icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then((function(e){var n;if(e.isConfirmed)return ve((function(e){return e.filter((function(e){return e.CheckIdx!==i.CheckIdx}))}));null===(n=Xe.current)||void 0===n||n.removeSelection()})),clearTimeout(a)}),250)}}})})}),un,xn,gn,(0,q.jsx)(g.Z,{open:De,onClose:function(){var e;null===(e=Xe.current)||void 0===e||e.removeSelection(),ye(!1)},"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:(0,q.jsxs)(u.Z,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"auto",bgcolor:"background.paper",p:4},children:[(0,q.jsx)(D.Z,{id:"modal-modal-title",variant:"h6",component:"h2",children:"Check Detail"}),(0,q.jsx)("br",{}),(0,q.jsxs)("div",{style:{display:"flex",columnGap:"10px"},children:[(0,q.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:[(0,q.jsx)(s.Z,{variant:"outlined",size:"small",label:"Check No.",name:"Check_No",value:Re.Check_No,onChange:wn,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)var n=setTimeout((function(){var e;null===(e=Ye.current)||void 0===e||e.click(),clearTimeout(n)}),100)},InputProps:{style:{height:"27px",fontSize:"14px"},inputRef:Ke},sx:{flex:1,height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),vn?(0,q.jsx)(B.Z,{loading:vn}):(0,q.jsxs)(x.Z,{sx:{width:"100%",".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},fullWidth:!0,variant:"outlined",size:"small",children:[(0,q.jsx)(m.Z,{htmlFor:"label-input-id",children:"Bank"}),(0,q.jsx)(k.Z,{sx:{height:"27px",fontSize:"14px"},inputRef:Oe,fullWidth:!0,label:"Bank",name:"BankName",value:Re.BankName,onChange:wn,id:"label-input-id",onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return mn(Ie.BankName)},endAdornment:(0,q.jsx)(v.Z,{position:"end",children:(0,q.jsx)(C.Z,{"aria-label":"search-client",color:"secondary",edge:"end",onClick:function(){return mn(Ie.BankName)},children:(0,q.jsx)(A.Z,{})})})})]}),(0,q.jsx)(s.Z,{variant:"outlined",size:"small",label:"Branch",name:"Branch",value:Re.Branch,onChange:wn,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)var n=setTimeout((function(){var e;null===(e=Ye.current)||void 0===e||e.click(),clearTimeout(n)}),100)},InputProps:{style:{height:"27px",fontSize:"14px"},inputRef:qe},sx:{flex:1,height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,q.jsx)(s.Z,{variant:"outlined",size:"small",label:"Remarks",name:"Check_Remarks",value:Re.Check_Remarks,onChange:wn,rows:4,multiline:!0,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)var n=setTimeout((function(){var e;null===(e=Ye.current)||void 0===e||e.click(),clearTimeout(n)}),100)},InputProps:{style:{height:"auto",fontSize:"14px"}},sx:{flex:1,height:"auto",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}})]}),(0,q.jsxs)("div",{style:{display:"flex",gap:"10px",flexDirection:"column"},children:[(0,q.jsx)(E.Z,{label:"Check Dated",onChange:function(e){console.log(e),je({type:"UPDATE_FIELD",field:"Check_Date",value:e})},value:new Date(Re.Check_Date),inputRef:Ge,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)var n=setTimeout((function(){var e;null===(e=Ye.current)||void 0===e||e.click(),clearTimeout(n)}),100)},textField:{InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}}),(0,q.jsx)(s.Z,{variant:"outlined",size:"small",label:"Amount",name:"Check_Amnt",value:Re.Check_Amnt,onChange:wn,placeholder:"0.00",onBlur:function(){je({type:"UPDATE_FIELD",field:"Check_Amnt",value:parseFloat(Re.Check_Amnt.replace(/,/g,"")).toFixed(2)})},onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)var n=setTimeout((function(){var e;null===(e=Ye.current)||void 0===e||e.click(),clearTimeout(n)}),100)},InputProps:{style:{height:"27px",fontSize:"14px"},inputComponent:P.a,inputRef:We},sx:{height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),"update"!==Ie.checkMode&&(0,q.jsx)(s.Z,{type:"number",variant:"outlined",size:"small",label:"Check Count",name:"Check_Count",value:Re.Check_Count,onChange:wn,placeholder:"0",onKeyDown:function(e){if(["Enter","NumpadEnter"].includes(e.code))var n=setTimeout((function(){var e;null===(e=Ye.current)||void 0===e||e.click(),clearTimeout(n)}),100)},InputProps:{style:{height:"27px",fontSize:"14px"},inputProps:{min:1,type:"text",pattern:"[0-9]*"}},sx:{flex:1,height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}})]})]}),(0,q.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",width:"100%",marginTop:"10px"},children:(0,q.jsxs)("div",{style:{display:"flex",gap:"10px"},children:[(0,q.jsx)(h.Z,{ref:Ye,action:Ve,color:"primary",variant:"contained",autoFocus:""!==Ie.checkMode,onClick:function(){if("update"===Ie.checkMode)return(0,R.flushSync)((function(){ye(!1)})),w().fire({title:"Are you sure?",text:"Update Check ".concat(Re.Check_No),icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, update it!"}).then((function(n){var t;if(!n.isConfirmed)return null===(t=Xe.current)||void 0===t||t.removeSelection(),ye(!1),void Ze({type:"UPDATE_FIELD",field:"checkMode",value:""});e()}));function e(){if("update"!==Ie.checkMode&&ke.map((function(e){return e.Check_No})).includes(Re.Check_No))return ye(!1),w().fire({text:"Check is already exist!",icon:"warning",showCancelButton:!1,timer:1500}).then((function(){var e;(0,R.flushSync)((function(){ye(!0)})),null===(e=Ke.current)||void 0===e||e.focus()}));if(""===Re.Check_No)return ye(!1),w().fire({text:"Please provide check!",icon:"warning",showCancelButton:!1,timer:1500}).then((function(){var e;(0,R.flushSync)((function(){ye(!0)})),null===(e=Ke.current)||void 0===e||e.focus()}));if(parseInt(Re.Check_Amnt)<=0||isNaN(parseInt(Re.Check_Amnt)))return ye(!1),w().fire({text:"Please provide check amount!",icon:"warning",showCancelButton:!1,timer:1500}).then((function(){var e;(0,R.flushSync)((function(){ye(!0)})),null===(e=We.current)||void 0===e||e.focus()}));if(""===Re.BankName)return ye(!1),w().fire({text:"Please provide bank!",icon:"warning",showCancelButton:!1,timer:1500}).then((function(){var e;(0,R.flushSync)((function(){ye(!0)})),null===(e=Oe.current)||void 0===e||e.focus()}));if(""===Re.Branch)return ye(!1),w().fire({text:"Please provide branch!",icon:"warning",showCancelButton:!1,timer:1500}).then((function(){var e;(0,R.flushSync)((function(){ye(!0)})),null===(e=qe.current)||void 0===e||e.focus()}));if(Re.Check_No.length>=40)return w().fire({text:"Check No is too long!",icon:"warning",showCancelButton:!1,timer:1500}).then((function(){(0,R.flushSync)((function(){ye(!0)}))}));if(Re.Check_Amnt.length>=200)return w().fire({text:"Check Amount is too long!",icon:"warning",showCancelButton:!1,timer:1500}).then((function(){(0,R.flushSync)((function(){ye(!0)}))}));if(Re.Branch.length>=45)return w().fire({text:"Branch is too long!",icon:"warning",showCancelButton:!1,timer:1500}).then((function(){(0,R.flushSync)((function(){ye(!0)}))}));if(Re.Check_Remarks.length>=220)return w().fire({text:"Remarks is too long!",icon:"warning",showCancelButton:!1,timer:1500}).then((function(){(0,R.flushSync)((function(){ye(!0)}))}));Re.Check_Amnt=parseFloat(Re.Check_Amnt.toString().replace(/,/g,"")).toLocaleString("en-US",{style:"decimal",minimumFractionDigits:2,maximumFractionDigits:2}),Re.Check_Date=new Date(Re.Check_Date).toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"numeric"});var e=[];if(!isNaN(parseInt(Re.Check_Count))&&parseInt(Re.Check_Count)>0&&"update"!==Ie.checkMode){for(var n=0;n<parseInt(Re.Check_Count);n++){var t=(ke.length>0?parseInt(ke[ke.length-1].CheckIdx)+(n+1):n).toString(),i=new Date(Re.Check_Date);i.setMonth(i.getMonth()+n);var a={CheckIdx:t,Check_No:r(Re.Check_No,n),Check_Date:i.toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"numeric"}),Check_Amnt:Re.Check_Amnt,BankName:Re.BankName,BankCode:Re.BankCode,Branch:Re.Branch,Check_Remarks:Re.Check_Remarks,Deposit_Slip:Re.Deposit_Slip,DateDeposit:Re.DateDeposit,OR_No:Re.OR_No};if("update"!==Ie.checkMode&&ke.map((function(e){return e.Check_No})).includes(a.Check_No))return ye(!1),w().fire({text:"Check is already exist!",icon:"warning",showCancelButton:!1,timer:1500}).then((function(){var e;(0,R.flushSync)((function(){ye(!0)})),null===(e=Ke.current)||void 0===e||e.focus()}));e.push(a)}return ve((function(n){return n=[].concat((0,o.Z)(n),e)})),(0,R.flushSync)((function(){ye(!1)})),void w().fire({text:"Create New Check Successfully",icon:"success",showCancelButton:!1,timer:1500})}function r(e,n){var t=parseInt(e);return(t+=n).toString().padStart(e.length,"0")}ve((function(e){var n="";n=e.length<=0?"0":"update"===Ie.checkMode?Re.CheckIdx:(parseInt(e[e.length-1].CheckIdx)+1).toString(),je({type:"UPDATE_FIELD",field:"CheckIdx",value:n});var t={Check_No:Re.Check_No,Check_Date:Re.Check_Date,Check_Amnt:Re.Check_Amnt,BankName:Re.BankName,BankCode:Re.BankCode,Branch:Re.Branch,Check_Remarks:Re.Check_Remarks,Deposit_Slip:Re.Deposit_Slip,DateDeposit:Re.DateDeposit,OR_No:Re.OR_No};return e="update"===Ie.checkMode?e.map((function(e){return e.CheckIdx===n&&(e=(0,c.Z)((0,c.Z)({},e),t)),e})):[].concat((0,o.Z)(e),[(0,c.Z)({CheckIdx:n},t)])})),ye(!1),w().fire({text:"update"===Ie.checkMode?"Check Update Successfully":"Create New Check Successfully",icon:"success",showCancelButton:!1,timer:1500}).then((function(){if("update"!==Ie.checkMode){var e=new Date(Re.Check_Date);e.setMonth(e.getMonth()+1),je({type:"UPDATE_FIELD",field:"Check_Date",value:e})}je({type:"UPDATE_FIELD",field:"Check_Amnt",value:parseFloat(Re.Check_Amnt.replace(/,/g,""))}),je({type:"UPDATE_FIELD",field:"Check_No",value:"update"===Ie.checkMode?Re.Check_No:ne(Re.Check_No)}),je({type:"UPDATE_FIELD",field:"checkMode",value:""}),(0,R.flushSync)((function(){ye(!0)})),Ve.current.focusVisible()}))}e()},children:"update"===Ie.checkMode?"Update":"Save"}),"update"===Ie.checkMode&&(0,q.jsx)(h.Z,{color:"error",variant:"contained",onClick:function(){(0,R.flushSync)((function(){ye(!1)})),w().fire({title:"Are you sure?",text:"Delete Check ".concat(Re.Check_No," "),icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then((function(e){var n,t;if(!e.isConfirmed)return null===(t=Xe.current)||void 0===t||t.removeSelection(),ye(!1),void Ze({type:"UPDATE_FIELD",field:"checkMode",value:""});ve((function(e){return e=e.filter((function(e){return e.CheckIdx!==Re.CheckIdx}))})),null===(n=Me.current)||void 0===n||n.removeSelection(),Ze({type:"UPDATE_FIELD",field:"checkMode",value:""})}))},children:"Delete"}),(0,q.jsx)(h.Z,{color:"success",variant:"contained",onClick:function(){var e;null===(e=Xe.current)||void 0===e||e.removeSelection(),ye(!1),ee(je,G),Ze({type:"UPDATE_FIELD",field:"checkMode",value:""})},children:"Cancel"}),(0,q.jsx)(C.Z,{style:{position:"absolute",top:"10px",right:"10px"},"aria-label":"search-client",onClick:function(){var e;null===(e=Xe.current)||void 0===e||e.removeSelection(),ye(!1),Ze({type:"UPDATE_FIELD",field:"checkMode",value:""})},children:(0,q.jsx)(Z.Z,{})})]})})]})}),(0,q.jsx)("div",{style:{display:we?"flex":"none",position:"absolute",top:0,bottom:0,left:0,right:0,background:"rgba(158, 155, 157, 0.31)",zIndex:"999",justifyContent:"center",alignItems:"center"},children:(0,q.jsx)("div",{style:{width:"90%",height:"90%"},children:(0,q.jsx)("div",{style:{width:"90%",height:"90%",overflow:"auto",background:"white",padding:"20px",margin:"auto",zIndex:"9929",boxShadow:" -1px 1px 13px 6px rgba(0,0,0,0.54)",position:"relative"},children:(0,q.jsxs)("div",{style:{height:"100%",width:"100%",position:"relative",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},children:[(0,q.jsx)(C.Z,{sx:{position:"absolute",right:"5px",top:"5px"},onClick:function(){be(!1)},children:(0,q.jsx)(Z.Z,{})}),(0,q.jsxs)("div",{style:{width:"100%",height:"500px",border:de?"5px dashed green":"5px dashed grey",overflow:"auto",padding:"10px"},onDragEnter:Sn,onDragOver:function(e){return e.preventDefault()},onDragLeave:bn,onDrop:En,children:[(0,q.jsx)("div",{id:"upload-container",style:{width:"100%",height:"100%",display:"flex",gap:"10px",flexWrap:"wrap"},onDragEnter:Sn,onDragOver:function(e){return e.preventDefault()},onDragLeave:bn,onDrop:En,children:pe.map((function(e,n){return(0,q.jsx)(z.DisplayFile,{itm:e,selectedFiles:pe,setSelectedFiles:fe,fileInput:Te},n)}))}),pe.length<=0&&(0,q.jsx)("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center"},children:(0,q.jsx)(U.Z,{sx:{fontSize:"20em",color:"#64748b"}})}),(0,q.jsx)("input",{ref:Te,type:"file",multiple:!0,style:{display:"none",background:"white"},id:"input-file",onChange:function(e){var n=e.target.files,t=Array.from(n),i=[].concat((0,o.Z)(pe),t);if((0,z.checkFile)(i))return alert("file is not valid Extention!");fe(i)}})]}),(0,q.jsx)("div",{style:{width:"100%"},children:(0,q.jsx)(h.Z,{fullWidth:!0,onClick:function(){var e=document.getElementById("input-file");null===e||void 0===e||e.click()},children:"CLick it to upload"})})]})})})})]})}function ee(e,n){Object.entries(n).forEach((function(n){var t=(0,r.Z)(n,2),o=t[0],i=t[1];e({type:"UPDATE_FIELD",field:o,value:i})}))}function ne(e){if(void 0===e||null===e||""===e)return"001";for(var n=(parseInt(e)+1).toString();n.length<e.length;)n="0"+n;return n}}}]);
//# sourceMappingURL=8019.da041728.chunk.js.map