"use strict";(self.webpackChunkupward=self.webpackChunkupward||[]).push([[9187],{29187:function(e,t,n){n.r(t),n.d(t,{BondContext:function(){return Y},default:function(){return oe}});var o=n(74165),i=n(15861),a=n(29439),l=n(4942),r=n(1413),s=n(72791),d=n(36151),u=n(64554),c=n(48550),p=n(4378),x=n(42419),f=n(3380),m=n(91933),h=n(29823),y=n(53329),g=n(21830),b=n.n(g),v=n(27247),w=n(68096),F=n(94925),D=n(58406),I=n(23786),C=n(93263),P=n(39709),j=n(98333),z=n(51760),Z=n(25756),S=n(93433),k=n(77196),L=n(63466),_=n(13400),M=n(91421),T=n(13784),A=n(45987),N=n(71652),E=n(93862),G=n(98034),K=n(80184),B=["label","name","onChange","value","onKeyDown","inputRef","datePickerRef","fullWidth","textField"];function R(e){var t=e.label,n=e.name,o=e.onChange,i=e.value,a=e.onKeyDown,l=e.inputRef,s=(e.datePickerRef,e.fullWidth),d=e.textField,u=(0,A.Z)(e,B);return(0,K.jsx)(N._,{dateAdapter:E.H,children:(0,K.jsx)(G.j,(0,r.Z)({value:i,onChange:o,slotProps:{textField:(0,r.Z)({size:"small",label:t,name:n,onKeyDown:a,inputRef:l,fullWidth:s},d)}},u))})}function q(){var e,t,n,l=(0,s.useContext)(Y),r=l.state,d=l.handleInputChange,u=l.customInputchange,p=l.myAxios,x=l.user,f=l.isAddOrEditMode,h=l.keySave,y=(0,s.useState)([]),g=(0,a.Z)(y,2),b=g[0],v=g[1],j=(0,s.useRef)(null),z=(0,s.useRef)(null),Z=(0,s.useRef)(null),A=(0,s.useRef)(null),N=(0,s.useRef)(null),E=(0,C.Z)({link:{url:"/task/production/get-clients",queryUrlName:"clientSearch"},columns:[{field:"entry_client_id",headerName:"ID",width:130},{field:"fullname",headerName:"First Name",flex:1},{field:"entry_type",headerName:"ID Type",width:150}],queryKey:"get-clients",uniqueId:"entry_client_id",responseDataKey:"clients",onSelected:function(e){u(e[0].entry_client_id,"client_id"),u(e[0].fullname,"client_name"),u(e[0].address,"client_address"),u(e[0].sale_officer,"sale_officer"),U()},onCellKeyDown:function(e,t){"Enter"!==t.code&&"NumpadEnter"!==t.code||(u(e.row.entry_client_id,"client_id"),u(e.row.fullname,"client_name"),u(e.row.address,"client_address"),u(e.row.sale_officer,"sale_officer"),U())},searchRef:A}),G=E.ModalComponent,B=E.openModal,q=E.isLoading,U=E.closeModal,O=(0,C.Z)({link:{url:"/task/production/get-agents",queryUrlName:"agentSearch"},columns:[{field:"entry_agent_id",headerName:"ID",width:130},{field:"fullname",headerName:"First Name",flex:1},{field:"entry_type",headerName:"ID Type",width:150}],queryKey:"get-agents",uniqueId:"entry_agent_id",responseDataKey:"agents",onSelected:function(e){u(e[0].entry_agent_id,"agent_id"),u(e[0].fullname,"agent_name"),H()},onCellKeyDown:function(e,t){"Enter"!==t.code&&"NumpadEnter"!==t.code||(u(e.row.entry_agent_id,"agent_id"),u(e.row.fullname,"agent_name"),H())},searchRef:N}),V=O.ModalComponent,W=O.openModal,Q=O.isLoading,H=O.closeModal,J=(0,m.useQuery)({queryKey:"get-bond-acc-type",queryFn:function(){return(e=e||(0,i.Z)((0,o.Z)().mark((function e(){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.get("/task/production/get-policy-account-types",{headers:{Authorization:"Bearer ".concat(null===x||void 0===x?void 0:x.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},refetchOnWindowFocus:!1}),X=J.data,$=J.isLoading,ee=(0,m.useQuery)({queryKey:"get-bond-acc",queryFn:function(){return(t=t||(0,i.Z)((0,o.Z)().mark((function e(){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.get("/task/production/get-policy-account-bonds",{headers:{Authorization:"Bearer ".concat(null===x||void 0===x?void 0:x.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){var t;v(null===(t=e.data)||void 0===t?void 0:t.getPolicyAccountByBonds)},refetchOnWindowFocus:!1}),te=ee.isLoading;return(0,K.jsxs)("div",{children:[(0,K.jsxs)("div",{style:{display:"flex",gap:"10px"},children:[(0,K.jsx)("div",{style:{display:"flex",columnGap:"10px",flex:1,boxSizing:"border-box"},children:(0,K.jsxs)("fieldset",{style:{flex:1,display:"flex",flexDirection:"column",gap:"10px",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px"},children:[(0,K.jsx)("legend",{style:{color:"#065f46"},children:"Insurer Information"}),(0,K.jsxs)("div",{style:{display:"flex",gap:"10px",flexDirection:"column"},children:[q?(0,K.jsx)(P.Z,{loading:q}):(0,K.jsxs)(w.Z,{variant:"outlined",size:"small",disabled:f,sx:{width:"170px",".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,K.jsx)(F.Z,{htmlFor:"client-id-field",children:"Client ID"}),(0,K.jsx)(k.Z,{sx:{height:"27px",fontSize:"14px"},disabled:f,fullWidth:!0,label:"Client ID",name:"client_id",value:r.client_id,onChange:d,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),B(r.client_id)},id:"client-id-field",endAdornment:(0,K.jsx)(L.Z,{position:"end",children:(0,K.jsx)(_.Z,{disabled:f,"aria-label":"search-client",color:"secondary",edge:"end",onClick:function(){B(r.client_id)},children:(0,K.jsx)(M.Z,{})})})})]}),(0,K.jsx)(c.Z,{disabled:f,fullWidth:!0,variant:"outlined",size:"small",label:"Client Name",name:"client_name",value:r.client_name,onChange:d,onKeyDown:h,InputProps:{style:{height:"27px",fontSize:"14px"},readOnly:!0},sx:{flex:1,height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}})]}),(0,K.jsx)(c.Z,{rows:5,disabled:f,fullWidth:!0,variant:"outlined",size:"small",label:"Client Address",multiline:!0,name:"client_address",value:r.client_address,onChange:d,onKeyDown:h,InputProps:{style:{height:"100px",fontSize:"14px"},readOnly:!0},sx:{flex:1,height:"100px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}})]})}),(0,K.jsx)("div",{style:{display:"flex",columnGap:"10px",flex:1,boxSizing:"border-box"},children:(0,K.jsxs)("fieldset",{style:{flexDirection:"row",gap:"10px",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px",flex:1,flexWrap:"wrap"},children:[(0,K.jsx)("legend",{style:{color:"#065f46"},children:"Agent Information"}),Q?(0,K.jsx)(P.Z,{loading:Q}):(0,K.jsxs)(w.Z,{variant:"outlined",size:"small",disabled:f,sx:{width:"170px",".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,K.jsx)(F.Z,{htmlFor:"AGENT-id-field",children:"Agent ID"}),(0,K.jsx)(k.Z,{sx:{height:"27px",fontSize:"14px"},disabled:f,label:"Agent ID",name:"agent_id",value:r.agent_id,onChange:d,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),W(r.agent_id)},id:"AGENT-id-field",endAdornment:(0,K.jsx)(L.Z,{position:"end",children:(0,K.jsx)(_.Z,{disabled:f,"aria-label":"search-client",color:"secondary",edge:"end",onClick:function(){W(r.agent_id)},children:(0,K.jsx)(M.Z,{})})})})]}),(0,K.jsx)(c.Z,{fullWidth:!0,disabled:f,variant:"outlined",size:"small",label:"Agent Name",name:"agent_name",value:r.agent_name,onChange:d,onKeyDown:h,InputProps:{style:{height:"27px",fontSize:"14px"},readOnly:!0},sx:{marginTop:"10px",flex:1,height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,K.jsx)(c.Z,{onKeyDown:h,disabled:f,fullWidth:!0,variant:"outlined",size:"small",label:"Sale Officer",multiline:!0,name:"sale_officer",value:r.sale_officer,onChange:d,InputProps:{style:{height:"27px",fontSize:"14px"},readOnly:!0},sx:{marginTop:"10px",width:"100%",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}})]})})]}),(0,K.jsxs)("div",{style:{display:"flex",gap:"10px"},children:[(0,K.jsxs)("div",{style:{display:"flex",columnGap:"10px",flex:1,boxSizing:"border-box"},children:[(0,K.jsxs)("fieldset",{style:{display:"flex",flexDirection:"column",gap:"10px",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px",marginBottom:"10px",height:"100%",width:"100%"},children:[(0,K.jsx)("legend",{style:{color:"#065f46"},children:"Bonds Policy"}),(0,K.jsxs)("div",{children:[te?(0,K.jsx)(P.Z,{loading:te}):(0,K.jsxs)(w.Z,{size:"small",fullWidth:!0,disabled:f,sx:{flex:1,".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,K.jsx)(F.Z,{id:"PolicyAccount",children:"Account"}),(0,K.jsx)(D.Z,{labelId:"PolicyAccount",value:r.PolicyAccount,label:"Account",name:"PolicyAccount",onChange:function(e){d(e)},sx:{height:"27px",fontSize:"14px"},children:b.map((function(e,t){return(0,K.jsx)(I.Z,{value:e.Account,children:e.Account},t)}))})]}),(0,K.jsxs)("div",{style:{display:"flex",columnGap:"10px",height:"40px",marginTop:"10px"},children:[(0,K.jsx)(c.Z,{disabled:f||"delete"===r.bondActioMode,fullWidth:!0,variant:"outlined",size:"small",label:"Policy No",name:"PolicyNo",value:r.PolicyNo,onChange:d,onKeyDown:h,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{width:"100%",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),$?(0,K.jsx)(P.Z,{loading:$}):(0,K.jsxs)(w.Z,{size:"small",fullWidth:!0,disabled:f,sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,K.jsx)(F.Z,{id:"policyType",children:"Policy Type"}),(0,K.jsx)(D.Z,{labelId:"policyType",value:r.policyType,label:"policyType",name:"policyType",onChange:function(e){v((function(t){return"G02"===e.target.value||"G13"===e.target.value||"G16"===e.target.value?t=t.filter((function(e){return 1===e.G02})):t})),d(e)},sx:{height:"27px",fontSize:"14px"},children:X&&[{SubLineName:""}].concat((0,S.Z)(null===(n=X.data)||void 0===n?void 0:n.getPolicyAccountType)).map((function(e,t){return(0,K.jsx)(I.Z,{value:e.SubLineName,children:e.SubLineName},t)}))})]})]})]})]}),(0,K.jsxs)("fieldset",{style:{flexGrow:1,display:"flex",flexDirection:"column",gap:"10px",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px",width:"100%"},children:[(0,K.jsx)("legend",{style:{height:"22px"}}),(0,K.jsx)(c.Z,{disabled:f,variant:"outlined",size:"small",label:"Officer",name:"officer",value:r.officer,onChange:d,onKeyDown:h,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{width:"100%",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,K.jsx)(c.Z,{disabled:f,variant:"outlined",size:"small",label:"Position",name:"position",value:r.position,onChange:d,onKeyDown:h,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{width:"100%",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}})]})]}),(0,K.jsx)("div",{style:{display:"flex",columnGap:"10px",flex:1,boxSizing:"border-box"},children:(0,K.jsxs)("fieldset",{style:{display:"flex",flexDirection:"column",gap:"10px",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px",flexGrow:1},children:[(0,K.jsx)("legend",{style:{color:"#065f46"},children:"Period of Insurance"}),(0,K.jsxs)("div",{style:{display:"flex",columnGap:"10px"},children:[(0,K.jsx)(T.Z,{disabled:f,label:"Bidding Date",onChange:function(e){u(e,"biddingDate")},value:new Date(r.biddingDate),textField:{InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}},onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)var t=setTimeout((function(){var e,n;null===(e=j.current)||void 0===e||null===(n=e.querySelector("button"))||void 0===n||n.click(),clearTimeout(t)}),150)},datePickerRef:j}),(0,K.jsx)(R,{disabled:f,label:"Time",onChange:function(e){u(e,"time")},value:new Date(r.time),textField:{InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}},onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)var t=setTimeout((function(){var e,n;null===(e=z.current)||void 0===e||null===(n=e.querySelector("button"))||void 0===n||n.click(),clearTimeout(t)}),150)},datePickerRef:z}),(0,K.jsx)(T.Z,{label:"Date Issued",name:"DateIssued",onChange:function(e){u(e,"DateIssued")},value:new Date(r.DateIssued),disabled:f,textField:{InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}},onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)var t=setTimeout((function(){var e,n;null===(e=Z.current)||void 0===e||null===(n=e.querySelector("button"))||void 0===n||n.click(),clearTimeout(t)}),150)},datePickerRef:Z})]}),(0,K.jsx)(c.Z,{disabled:f,fullWidth:!0,variant:"outlined",size:"small",label:"Validity",name:"validity",value:r.validity,onChange:d,rows:2,multiline:!0})]})})]}),(0,K.jsxs)("fieldset",{style:{display:"flex",gap:"15px",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px",flexDirection:"row",flexGrow:1},children:[(0,K.jsx)("legend",{style:{height:"20px"}}),(0,K.jsx)(c.Z,{disabled:f,fullWidth:!0,variant:"outlined",size:"small",label:"Unit",name:"unit",value:r.unit,onChange:d,multiline:!0,rows:3,onKeyDown:h}),(0,K.jsx)(c.Z,{disabled:f,fullWidth:!0,variant:"outlined",size:"small",label:"Obligee",name:"obligee",value:r.obligee,onChange:d,multiline:!0,rows:3,onKeyDown:h})]}),G,V]})}var U=n(94721),O=n(56580);function V(){var e=(0,s.useContext)(Y),t=e.state,n=e.handleInputChange,o=e.customInputchange,i=e.computation,a=e.isAddOrEditMode,l=e.dispatch,r=e.keySave,u=(0,s.useRef)(null),p=(0,s.useRef)(null);function x(e){"NumpadEnter"!==e.code&&"Enter"!==e.code||i()}return(0,K.jsxs)("div",{style:{display:"flex",gap:"10px"},children:[(0,K.jsxs)("div",{style:{display:"flex",gap:"10px",flexDirection:"column",flexGrow:1},children:[(0,K.jsxs)("fieldset",{style:{display:"flex",flexDirection:"column",rowGap:"10px",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px"},children:[(0,K.jsx)("legend",{children:"Information for notary (Officer)"}),(0,K.jsx)(c.Z,{onKeyDown:r,disabled:a,required:!0,variant:"outlined",size:"small",label:"Name",name:"officerName",value:t.officerName,onChange:n,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{width:"auto",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,K.jsx)(c.Z,{onKeyDown:r,disabled:a,required:!0,variant:"outlined",size:"small",label:"Tax Certificate No.",name:"officerTaxCertNo",value:t.officerTaxCertNo,onChange:n,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{width:"auto",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,K.jsx)(c.Z,{disabled:a,required:!0,variant:"outlined",size:"small",label:"Issued Location",name:"officerIssuedLoc",value:t.officerIssuedLoc,onChange:n,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{width:"auto",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,K.jsx)(T.Z,{disabled:a,label:"Date Issued",onChange:function(e){o(e,"officerDateIssued")},value:new Date(t.officerDateIssued),onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)var t=setTimeout((function(){var e,n;null===(e=u.current)||void 0===e||null===(n=e.querySelector("button"))||void 0===n||n.click(),clearTimeout(t)}),150)},datePickerRef:u,textField:{InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}})]}),(0,K.jsxs)("fieldset",{style:{display:"flex",flexDirection:"column",rowGap:"10px",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px"},children:[(0,K.jsx)("legend",{children:"Information for notary (Insurance Corp)"}),(0,K.jsx)(c.Z,{disabled:a,required:!0,variant:"outlined",size:"small",label:"Capacity as",name:"insuranceCapacity",value:t.insuranceCapacity,onChange:n,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{width:"auto",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,K.jsx)(c.Z,{disabled:a,required:!0,variant:"outlined",size:"small",label:"Tax Certificate No",name:"insuranceOfficerTaxCert",value:t.insuranceOfficerTaxCert,onChange:n,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{width:"auto",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,K.jsx)(c.Z,{disabled:a,required:!0,variant:"outlined",size:"small",label:"Issued Location",name:"insuranceIssuedLoc",value:t.insuranceIssuedLoc,onChange:n,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{width:"auto",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,K.jsx)(T.Z,{disabled:a,label:"Date Issued",onChange:function(e){o(e,"insuranceDateIssued")},value:new Date(t.insuranceDateIssued),onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)var t=setTimeout((function(){var e,n;null===(e=p.current)||void 0===e||null===(n=e.querySelector("button"))||void 0===n||n.click(),clearTimeout(t)}),150)},datePickerRef:p,textField:{InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}})]})]}),(0,K.jsxs)("fieldset",{style:{flexGrow:1,display:"flex",flexDirection:"column",rowGap:"10px",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px"},children:[(0,K.jsx)("legend",{children:"Premiums"}),(0,K.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",padding:"5px"},children:(0,K.jsx)(d.Z,{disabled:a,size:"small",variant:"contained",color:"primary",onClick:function(){i()},children:"Compute"})}),(0,K.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"10px"},children:[(0,K.jsx)(c.Z,{disabled:a,required:!0,variant:"outlined",size:"small",label:"Insured Value",name:"insuredValue",value:t.insuredValue,onChange:n,onKeyDown:x,placeholder:"0.00",InputProps:{inputComponent:O.a,style:{height:"27px",fontSize:"14px"}},sx:{width:"auto",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onBlur:function(){l({type:"UPDATE_FIELD",field:"insuredValue",value:parseFloat(t.insuredValue).toFixed(2)})}}),(0,K.jsx)(c.Z,{disabled:a,required:!0,variant:"outlined",size:"small",label:"Percentage",name:"percentagePremium",value:t.percentagePremium,onChange:n,onKeyDown:x,placeholder:"0.00",InputProps:{inputComponent:O.a,style:{height:"27px",fontSize:"14px"}},sx:{width:"auto",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onBlur:function(){l({type:"UPDATE_FIELD",field:"percentagePremium",value:parseFloat(t.percentagePremium).toFixed(2)})}}),(0,K.jsx)(c.Z,{disabled:a,required:!0,variant:"outlined",size:"small",label:"Total Premium",name:"totalPremium",value:t.totalPremium,onChange:n,onKeyDown:x,placeholder:"0.00",InputProps:{inputComponent:O.a,style:{height:"27px",fontSize:"14px"}},sx:{width:"auto",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onBlur:function(){l({type:"UPDATE_FIELD",field:"totalPremium",value:parseFloat(t.totalPremium).toFixed(2)})}}),(0,K.jsx)(c.Z,{disabled:a,required:!0,variant:"outlined",size:"small",label:"Vat",name:"vat",value:t.vat,onChange:n,onKeyDown:x,placeholder:"0.00",InputProps:{inputComponent:O.a,style:{height:"27px",fontSize:"14px"}},sx:{width:"auto",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onBlur:function(){l({type:"UPDATE_FIELD",field:"vat",value:parseFloat(t.vat).toFixed(2)})}}),(0,K.jsx)(c.Z,{disabled:a,required:!0,variant:"outlined",size:"small",label:"Doc Stamp",name:"docStamp",value:t.docStamp,onChange:n,onKeyDown:x,placeholder:"0.00",InputProps:{inputComponent:O.a,style:{height:"27px",fontSize:"14px"}},sx:{width:"auto",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onBlur:function(){l({type:"UPDATE_FIELD",field:"docStamp",value:parseFloat(t.docStamp).toFixed(2)})}}),(0,K.jsxs)("div",{style:{display:"flex",gap:"5px",position:"relative"},children:[(0,K.jsx)(c.Z,{disabled:a,required:!0,variant:"outlined",size:"small",name:"localGovTaxPercent",value:t.localGovTaxPercent,onChange:n,onKeyDown:x,placeholder:"0.00",InputProps:{inputComponent:O.a,style:{height:"27px",fontSize:"14px"}},sx:{width:"80px",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onBlur:function(){l({type:"UPDATE_FIELD",field:"localGovTaxPercent",value:parseFloat(t.localGovTaxPercent).toFixed(2)})}}),(0,K.jsx)(c.Z,{disabled:a,required:!0,variant:"outlined",size:"small",label:"Local Gov Tax",name:"localGovTax",value:t.localGovTax,onChange:n,onKeyDown:x,placeholder:"0.00",InputProps:{inputComponent:O.a,style:{height:"27px",fontSize:"14px"}},sx:{width:"80px",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onBlur:function(){l({type:"UPDATE_FIELD",field:"localGovTax",value:parseFloat(t.localGovTax).toFixed(2)})}})]}),(0,K.jsx)(c.Z,{disabled:a,required:!0,variant:"outlined",size:"small",label:"Notary/Misc(umis)",name:"umis",value:t.umis,onChange:n,onKeyDown:x,placeholder:"0.00",InputProps:{inputComponent:O.a,style:{height:"27px",fontSize:"14px"}},sx:{width:"auto",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onBlur:function(){l({type:"UPDATE_FIELD",field:"umis",value:parseFloat(t.umis).toFixed(2)})}}),(0,K.jsx)(c.Z,{disabled:a,required:!0,variant:"outlined",size:"small",label:"Notary Misc(Principal)",name:"principal",value:t.principal,onChange:n,onKeyDown:x,placeholder:"0.00",InputProps:{inputComponent:O.a,style:{height:"27px",fontSize:"14px"}},sx:{width:"auto",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onBlur:function(){l({type:"UPDATE_FIELD",field:"principal",value:parseFloat(t.principal).toFixed(2)})}})]}),(0,K.jsx)(U.Z,{sx:{background:"black"}}),(0,K.jsx)(c.Z,{disabled:a,required:!0,variant:"outlined",size:"small",label:"Total Due",name:"totalDue",value:t.totalDue,onChange:n,placeholder:"0.00",InputProps:{inputComponent:O.a,style:{height:"27px",fontSize:"14px"}},sx:{width:"auto",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onBlur:function(){l({type:"UPDATE_FIELD",field:"totalDue",value:parseFloat(t.totalDue).toFixed(2)})}})]})]})}var W=n(64230),Q={form_action:"REG",form_type:"COM",sub_account:"HO",client_id:"",client_name:"",client_address:"",agent_id:"",agent_name:"",agent_com:"0.00",sale_officer:"",PolicyAccount:"",PolicyNo:"",policyType:"",biddingDate:new Date,time:new Date,DateIssued:new Date,validity:"",officer:"",position:"",unit:"",obligee:"",printType:"Front Page",officerName:"",officerTaxCertNo:"",officerIssuedLoc:"",officerDateIssued:new Date,insuranceCapacity:"",insuranceOfficerTaxCert:"",insuranceIssuedLoc:"",insuranceDateIssued:new Date,insuredValue:"",percentagePremium:"",totalPremium:"",vat:"",docStamp:"",localGovTaxPercent:"0.75",localGovTax:"",umis:"",principal:"",totalDue:"",bondActioMode:""},H=function(e,t){return"UPDATE_FIELD"===t.type?(0,r.Z)((0,r.Z)({},e),{},(0,l.Z)({},t.field,t.value)):e},Y=(0,s.createContext)({}),J="bond-search",X="clients",$="agents",ee="bond-policy",te="bond-policy",ne="bond-policy";function oe(){var e,t,n,g,S,k,L=(0,Z.Z)([(0,K.jsx)(q,{}),(0,K.jsx)(V,{})]),_=L.step,M=L.goTo,T=L.currentStepIndex,A=(0,s.useReducer)(H,Q),N=(0,a.Z)(A,2),E=N[0],G=N[1],B=(0,s.useContext)(f.V),R=B.myAxios,U=B.user,O=(0,s.useState)([]),oe=(0,a.Z)(O,2),ie=oe[0],ae=oe[1],le=(0,s.useState)([]),re=(0,a.Z)(le,2),se=re[0],de=re[1],ue=(0,s.useState)(""),ce=(0,a.Z)(ue,2),pe=ce[0],xe=ce[1],fe=(0,s.useState)(!1),me=(0,a.Z)(fe,2),he=me[0],ye=me[1],ge=(0,s.useState)({thirdparty:"tpl"===E.form_type.toLowerCase(),compre:"com"===E.form_type.toLowerCase()}),be=(0,a.Z)(ge,2),ve=be[0],we=be[1],Fe=(0,s.useRef)(null),De=(0,s.useRef)(null),Ie=(0,s.useRef)(null),Ce=(0,m.useQueryClient)(),Pe=""===E.bondActioMode,je=(0,s.useRef)(null),ze=(0,m.useQuery)({queryKey:"get-sub_account",queryFn:function(){return(e=e||(0,i.Z)((0,o.Z)().mark((function e(){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.get("/task/production/get-sub_account",{headers:{Authorization:"Bearer ".concat(null===U||void 0===U?void 0:U.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}),Ze=ze.data,Se=ze.isLoading,ke=(0,C.Z)({link:{url:"/task/production/search-bonds-policy",queryUrlName:"searchBondsPolicy"},columns:[{field:"DateIssued",headerName:"Date",width:200},{field:"PolicyNo",headerName:"Policy No",width:250},{field:"Account",headerName:"Account",width:170},{field:"client_fullname",headerName:"Full Name",flex:1}],queryKey:"search-bonds-policy",uniqueId:"PolicyNo",responseDataKey:"bondsPolicy",onSelected:function(e){He(e),Te()},onCellKeyDown:function(e,t){"Enter"!==t.code&&"NumpadEnter"!==t.code||(He([e.row]),Te())},onSuccess:function(e){console.log(e)},searchRef:je}),Le=ke.ModalComponent,_e=ke.openModal,Me=ke.isLoading,Te=ke.closeModal,Ae=(0,m.useMutation)({mutationKey:te,mutationFn:function(e){return(t=t||(0,i.Z)((0,o.Z)().mark((function e(t){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("delete"!==E.bondActioMode){e.next=4;break}return e.next=3,R.post("/task/production/update-bonds-policy",t,{headers:{Authorization:"Bearer ".concat(null===U||void 0===U?void 0:U.accessToken)}});case 3:case 6:return e.abrupt("return",e.sent);case 4:return e.next=6,R.post("/task/production/add-bonds-policy",t,{headers:{Authorization:"Bearer ".concat(null===U||void 0===U?void 0:U.accessToken)}});case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){return(n=n||(0,i.Z)((0,o.Z)().mark((function e(t){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.data.success){e.next=5;break}return e.next=3,Qe();case 3:return We(Q,!0),e.abrupt("return",b().fire({position:"center",icon:"success",title:t.data.message,showConfirmButton:!1,timer:1500}));case 5:b().fire({position:"center",icon:"error",title:t.data.message,showConfirmButton:!1,timer:1500});case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}),Ne=Ae.mutate,Ee=Ae.isLoading,Ge=(0,m.useMutation)({mutationKey:ne,mutationFn:function(e){return(g=g||(0,i.Z)((0,o.Z)().mark((function e(t){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.post("/task/production/delete-bonds-policy",t,{headers:{Authorization:"Bearer ".concat(null===U||void 0===U?void 0:U.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){return(S=S||(0,i.Z)((0,o.Z)().mark((function e(t){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.data.success){e.next=5;break}return e.next=3,Qe();case 3:return We(Q,!0),e.abrupt("return",b().fire({position:"center",icon:"success",title:t.data.message,showConfirmButton:!1,timer:1500}));case 5:b().fire({position:"center",icon:"error",title:t.data.message,showConfirmButton:!1,timer:1500});case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}),Ke=Ge.mutate,Be=Ge.isLoading,Re=(0,s.useCallback)((function(){E.insuredValue=""===E.insuredValue?"0":E.insuredValue,E.percentagePremium=""===E.percentagePremium?"0":E.percentagePremium,E.totalPremium=""===E.totalPremium?"0":E.totalPremium,E.vat=""===E.vat?"0":E.vat,E.docStamp=""===E.docStamp?"0":E.docStamp,E.localGovTaxPercent=""===E.localGovTaxPercent?"0":E.localGovTaxPercent,E.localGovTax=""===E.localGovTax?"0":E.localGovTax,E.umis=""===E.umis?"0":E.umis,E.principal=""===E.principal?"0":E.principal,E.totalDue=""===E.totalDue?"0":E.totalDue}),[E]),qe=(0,s.useCallback)((function(){return""===E.client_name||null===E.client_name||void 0===E.client_name?b().fire("Unable to save! Invalid Client ID","you missed the Client Id Field?","error"):""===E.client_id||null===E.client_id?b().fire("Unable to save! Invalid IDNo.","you missed the Client Id Field?","error"):""===E.PolicyAccount||null===E.PolicyAccount?b().fire("Unable to save! Please select Account.","you missed the Account Field?","error"):""===E.PolicyNo||null===E.PolicyNo?b().fire("Unable to save! Invalid Policy No.","you missed the Policy No Field?","error"):void("delete"===E.bondActioMode?(0,W.s)({isUpdate:!0,cb:function(e){Re(),Ne((0,r.Z)((0,r.Z)({},E),{},{userCodeConfirmation:e}))}}):(0,W.L)({isConfirm:function(){Re(),Ne(E)}}))}),[E,Re,Ne]);(0,s.useEffect)((function(){var e=function(e){var t,n,o;("AudioVolumeMute"!==e.code&&"F1"!==e.code&&173!==e.keyCode||(e.preventDefault(),M(0)),"AudioVolumeDown"!==e.code&&"F2"!==e.code&&174!==e.keyCode||(e.preventDefault(),M(1)),""!==E.bondActioMode||"KeyN"!==e.code&&"Enter"!==e.code&&"NumpadEnter"!==e.code)||(e.preventDefault(),null===(t=Fe.current)||void 0===t||t.click());""!==E.bondActioMode&&"Escape"===e.code&&(e.preventDefault(),null===(n=De.current)||void 0===n||n.click());"delete"===E.bondActioMode&&"Delete"===e.code&&(e.preventDefault(),null===(o=Ie.current)||void 0===o||o.click())};return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}),[M,E.bondActioMode]);var Ue=function(e){var t=e.target,n=t.name,o=t.value;G({type:"UPDATE_FIELD",field:n,value:o})},Oe=function(e,t){G({type:"UPDATE_FIELD",field:t,value:e})};function Ve(){Re();var e=parseFloat(E.insuredValue),t=parseFloat(E.percentagePremium),n=parseFloat(E.localGovTaxPercent),o=parseFloat(E.umis),i=parseFloat(E.principal),a=n/100,l=e*(t/100);Oe(e.toFixed(2),"insuredValue"),Oe(t.toFixed(2),"percentagePremium"),Oe(l.toFixed(2),"totalPremium"),Oe((.12*l).toFixed(2),"vat"),Oe((.125*l).toFixed(2),"docStamp"),Oe((a*l).toFixed(2),"localGovTax"),Oe(o.toFixed(2),"umis"),Oe(i.toFixed(2),"principal"),Oe((parseFloat(l.toFixed(2))+parseFloat((.12*l).toFixed(2))+parseFloat((.125*l).toFixed(2))+parseFloat((a*l).toFixed(2))+parseFloat(o.toFixed(2))+parseFloat(i.toFixed(2))).toFixed(2),"totalDue")}function We(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.form_type=E.form_type,e.form_action=E.form_action,e.prem_text_one=E.prem_text_one,e.prem_text_two=E.prem_text_two,t||(e.bondActioMode=E.bondActioMode),Object.entries(e).forEach((function(e){var t=(0,a.Z)(e,2),n=t[0],o=t[1];Oe(o,n)}))}function Qe(){return(k=k||(0,i.Z)((0,o.Z)().mark((function e(){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Promise.all([Ce.invalidateQueries(J),Ce.invalidateQueries(X),Ce.invalidateQueries($),Ce.invalidateQueries(ee),Ce.invalidateQueries(te),Ce.invalidateQueries(ne)]));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function He(e){var t=e[0],n=t.PolicyNo,o=t.Account,i=t.PolicyType,a=t.Percentage,l=t.BidDate,r=t.BidTime,s=t.Obligee,d=t.UnitDetail,u=t.BondValue,c=t.NotaryName,p=t.TaxCerNo,x=t.IssuedLocation,f=t.NIssued,m=t.CapacityAs,h=t.TaxCerNoCorp,y=t.IssuedLoctCorp,g=t.CIssued,b=t.Officer,v=t.OPosition,w=t.Validity,F=t.IDNo,D=t.SubAcct,I=t.DateIssued,C=t.Notarial,P=t.Misc,j=t.AgentID,z=t.AgentCom,Z=t.client_fullname,S=t.agent_fullname,k=t.address,L=t.sale_officer;Oe(D,"sub_account"),Oe(F,"client_id"),Oe(Z,"client_name"),Oe(k,"client_address"),Oe(j,"agent_id"),Oe(S,"agent_name"),Oe(z,"agent_com"),Oe(L,"sale_officer"),Oe(o,"PolicyAccount"),Oe(n,"PolicyNo"),Oe(i,"policyType"),Oe(l,"biddingDate"),Oe(r,"time"),Oe(I,"DateIssued"),Oe(w,"validity"),Oe(b,"officer"),Oe(v,"position"),Oe(d,"unit"),Oe(s,"obligee"),Oe(c,"officerName"),Oe(p,"officerTaxCertNo"),Oe(x,"officerIssuedLoc"),Oe(f,"officerDateIssued"),Oe(m,"insuranceCapacity"),Oe(h,"insuranceOfficerTaxCert"),Oe(y,"insuranceIssuedLoc"),Oe(g,"insuranceDateIssued"),E.insuredValue=u,E.percentagePremium=a,E.umis=C,E.principal=P,Ve(),Oe("delete","bondActioMode")}return(0,K.jsxs)(Y.Provider,{value:{state:E,handleInputChange:Ue,customInputchange:Oe,Mortgagee:he,setMortgagee:ye,showField:ve,setShowField:we,clientRows:ie,setClientRows:ae,myAxios:R,user:U,agentRows:se,setAgentRows:de,computation:Ve,isAddOrEditMode:Pe,dispatch:G,keySave:function(e){""===E.mode||"Enter"!==e.code&&"NumpadEnter"!==e.code||(e.preventDefault(),qe())}},children:[(0,K.jsxs)("div",{style:{display:"flex",columnGap:"5px"},children:[(0,K.jsxs)("div",{style:{display:"flex",columnGap:"8px",alignItems:"center"},children:[(0,K.jsx)(z.CustomButton,{onClick:function(){M(0)},currentStepIndex:T,index:0,children:"Policy Information"}),(0,K.jsx)(j.Z,{fontSize:"small"})]}),(0,K.jsx)("div",{style:{display:"flex",columnGap:"8px",alignItems:"center"},children:(0,K.jsx)(z.CustomButton,{onClick:function(){M(1)},currentStepIndex:T,index:1,children:"Policy Premium"})}),(0,K.jsx)("div",{style:{display:"flex",alignItems:"center",columnGap:"20px",marginLeft:"30px"},children:(0,K.jsxs)("div",{style:{display:"flex",alignItems:"center",columnGap:"5px"},children:[""===E.bondActioMode&&(0,K.jsx)(d.Z,{sx:{height:"30px",fontSize:"11px"},ref:Fe,variant:"contained",startIcon:(0,K.jsx)(x.Z,{}),onClick:function(){Oe("add","bondActioMode")},children:"New"}),(0,K.jsx)(P.Z,{sx:{height:"30px",fontSize:"11px"},loading:Ee,color:"primary",variant:"contained",type:"submit",onClick:qe,disabled:""===E.bondActioMode,startIcon:(0,K.jsx)(y.Z,{}),children:"Save"}),""!==E.bondActioMode&&(0,K.jsx)(d.Z,{sx:{height:"30px",fontSize:"11px"},ref:De,variant:"contained",startIcon:(0,K.jsx)(h.Z,{}),color:"error",onClick:function(){b().fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, cancel it!"}).then((function(e){e.isConfirmed&&(Oe("","bondActioMode"),We(Q,!0))}))},children:"Cancel"}),(0,K.jsx)(P.Z,{loading:Be,ref:Ie,id:"save-entry-header",variant:"contained",sx:{height:"30px",fontSize:"11px",backgroundColor:p.Z[500],"&:hover":{backgroundColor:p.Z[600]}},disabled:"delete"!==E.bondActioMode,startIcon:(0,K.jsx)(v.Z,{}),onClick:function(){(0,W.s)({isUpdate:!1,cb:function(e){Ke({PolicyAccount:E.PolicyAccount,PolicyNo:E.PolicyNo,policyType:E.policyType,userCodeConfirmation:e})}})},children:"Delete"})]})})]}),(0,K.jsx)(u.Z,{sx:function(e){return(0,l.Z)({display:"flex",alignItems:"center",columnGap:"20px",marginBottom:"10px"},e.breakpoints.down("sm"),{flexDirection:"column",alignItems:"flex-start",flex:1})},children:(0,K.jsx)("div",{style:{marginTop:"10px",marginBottom:"12px",width:"100%"}})}),(0,K.jsxs)("div",{style:{marginBottom:"5px",display:"flex",gap:"10px"},children:[Me?(0,K.jsx)(P.Z,{loading:Me}):(0,K.jsx)(c.Z,{label:"Search",size:"small",name:"search",value:pe,onChange:function(e){xe(e.target.value)},onKeyDown:function(e){"Enter"!==e.code&&"NumpadEnter"!==e.code||(e.preventDefault(),_e(pe))},InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{width:"300px",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),Se?(0,K.jsx)(P.Z,{loading:Se}):(0,K.jsxs)(w.Z,{size:"small",sx:function(e){return{width:"150px",".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}},children:[(0,K.jsx)(F.Z,{id:"subAccount",children:"Sub Account"}),(0,K.jsx)(D.Z,{sx:{height:"27px",fontSize:"14px"},size:"small",labelId:"subAccount",label:"subAccount",name:"sub_account",value:E.sub_account,onChange:function(e){Ue(e)},children:(null===Ze||void 0===Ze?void 0:Ze.data.sub_account).map((function(e,t){return(0,K.jsx)(I.Z,{value:e.Acronym.trim(),children:e.Acronym},t)}))})]}),(0,K.jsxs)(w.Z,{size:"small",sx:function(e){return{width:"150px",".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}},children:[(0,K.jsx)(F.Z,{id:"print-type",children:"Print Type"}),(0,K.jsx)(D.Z,{sx:{height:"27px",fontSize:"14px"},size:"small",labelId:"print-type",label:"Print Type",name:"printType",value:E.printType,onChange:Ue,children:[{title:"Front Page"},{title:"Back Page"}].map((function(e,t){return(0,K.jsx)(I.Z,{value:e.title,children:e.title},t)}))})]})]}),_,Le]})}}}]);
//# sourceMappingURL=9187.fb406c56.chunk.js.map