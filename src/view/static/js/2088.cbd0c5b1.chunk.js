"use strict";(self.webpackChunkupward=self.webpackChunkupward||[]).push([[2088],{3784:function(e,n,l){l.d(n,{Z:function(){return c}});var a=l(1413),i=l(5987),t=(l(2791),l(1652)),d=l(4246),o=l(3777),s=l(184),r=["label","name","onChange","value"];function c(e){var n=e.label,l=e.name,c=e.onChange,u=e.value,h=(0,i.Z)(e,r);return(0,s.jsx)(t._,{dateAdapter:d.H,children:(0,s.jsx)(o.M,(0,a.Z)({value:u,onChange:c,slotProps:{textField:{size:"small",label:n,name:l}}},h))})}},2088:function(e,n,l){l.r(n),l.d(n,{agentColumn:function(){return v},clientColumn:function(){return p},default:function(){return C}});var a=l(3433),i=l(9439),t=l(2791),d=l(5615),o=l(8550),s=l(3400),r=l(8096),c=l(829),u=l(8406),h=l(3786),g=l(1421),f=l(3784),m=l(1582),x=l(184),p=[{field:"entry_client_id",headerName:"ID",width:130},{field:"fullname",headerName:"First Name",flex:1},{field:"entry_type",headerName:"ID Type",width:150}],v=[{field:"entry_agent_id",headerName:"ID",width:130},{field:"fullname",headerName:"First Name",flex:1},{field:"entry_type",headerName:"ID Type",width:150}],y="vehicle-policy",b="agent-policy";function C(){var e=(0,t.useContext)(d.MarineContext),n=e.state,l=e.handleInputChange,C=e.isLoading,j=e.clientRows,_=e.setClientRows,Z=e.customInputchange,A=e.myAxios,I=e.user,w=e.agentRows,D=e.setAgentRows,z=e.data,P=e.isAddOrEditMode,W=e.clientLoading,N=e.agentLoading,k=(0,t.useState)(!1),S=(0,i.Z)(k,2),M=S[0],R=S[1],O=(0,t.useState)(!1),T=(0,i.Z)(O,2),L=T[0],F=T[1];return(0,x.jsxs)("div",{children:[(0,x.jsxs)("div",{style:{display:"grid",gap:"20px",gridTemplateAreas:'"content1 content2" "content3 content4" "content5 content5"'},children:[(0,x.jsxs)("fieldset",{style:{display:"flex",flexDirection:"column",gap:"10px",gridArea:"content1",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px"},children:[(0,x.jsx)("legend",{style:{color:"#065f46"},children:"Insurer Information"}),(0,x.jsxs)("div",{style:{display:"flex",columnGap:"10px"},children:[(0,x.jsx)(o.Z,{disabled:P,fullWidth:!0,variant:"outlined",size:"small",label:"Client ID",name:"client_id",value:n.client_id,onChange:l,InputProps:{readOnly:!0}}),(0,x.jsx)(s.Z,{disabled:P||W,"aria-label":"search-client",color:"secondary",onClick:function(){return R(!0)},children:(0,x.jsx)(g.Z,{})})]}),(0,x.jsx)(o.Z,{disabled:P,fullWidth:!0,variant:"outlined",size:"small",label:"Client Name",name:"client_name",value:n.client_name,onChange:l,InputProps:{readOnly:!0}}),(0,x.jsx)(o.Z,{disabled:P,fullWidth:!0,variant:"outlined",size:"small",label:"Client Address",rows:3,multiline:!0,name:"client_address",value:n.client_address,onChange:l,InputProps:{readOnly:!0}})]}),(0,x.jsxs)("fieldset",{style:{display:"flex",flexDirection:"column",gap:"10px",gridArea:"content2",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px"},children:[(0,x.jsx)("legend",{style:{color:"#065f46"},children:"Agent Information"}),(0,x.jsxs)("div",{style:{display:"flex",columnGap:"10px"},children:[(0,x.jsx)(o.Z,{disabled:P,fullWidth:!0,variant:"outlined",size:"small",label:"Agent ID",name:"agent_id",value:n.agent_id,onChange:l,InputProps:{readOnly:!0}}),(0,x.jsx)(s.Z,{disabled:P||N,"aria-label":"search-client",color:"secondary",onClick:function(){return F(!0)},children:(0,x.jsx)(g.Z,{})})]}),(0,x.jsx)(o.Z,{disabled:P,fullWidth:!0,variant:"outlined",size:"small",label:"Agent Name",name:"agent_name",value:n.agent_name,onChange:l,InputProps:{readOnly:!0}}),(0,x.jsx)(o.Z,{disabled:P,fullWidth:!0,variant:"outlined",size:"small",label:"Commission",name:"agent_com",value:n.agent_com,onChange:l})]}),(0,x.jsxs)("fieldset",{style:{display:"flex",flexDirection:"column",gap:"10px",gridArea:"content3",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px"},children:[(0,x.jsx)("legend",{style:{color:"#065f46"},children:"Marine Policy"}),(0,x.jsxs)(r.Z,{size:"small",fullWidth:!0,disabled:P,children:[(0,x.jsx)(c.Z,{id:"PolicyAccount",children:"Account"}),(0,x.jsx)(u.Z,{labelId:"PolicyAccount",value:n.PolicyAccount,label:"Account",name:"PolicyAccount",onChange:l,children:[{Account:""}].concat((0,a.Z)(z.data.marinePolicy.policy_account)).map((function(e,n){return(0,x.jsx)(h.Z,{value:e.Account,children:e.Account},n)}))})]}),(0,x.jsx)(o.Z,{disabled:P,fullWidth:!0,variant:"outlined",size:"small",label:"Policy No",name:"PolicyNo",value:n.PolicyNo,onChange:l}),(0,x.jsx)(o.Z,{disabled:P,fullWidth:!0,variant:"outlined",size:"small",label:"Location",name:"location",value:n.location,onChange:l})]}),(0,x.jsxs)("fieldset",{style:{display:"flex",flexDirection:"column",gap:"10px",gridArea:"content4",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px"},children:[(0,x.jsx)("legend",{style:{color:"#065f46"},children:"Period of Insurance"}),(0,x.jsx)(f.Z,{disabled:P,label:"Date From",onChange:function(e){Z(e,"DateFrom")},value:new Date(n.DateFrom)}),(0,x.jsx)(f.Z,{disabled:P,label:"Date To",onChange:function(e){Z(e,"DateTo")},value:new Date(n.DateTo)}),(0,x.jsx)(f.Z,{label:"Date Issued",name:"DateIssued",onChange:function(e){Z(e,"DateIssued")},value:new Date(n.DateIssued),disabled:P})]}),(0,x.jsx)("fieldset",{style:{display:"flex",gap:"20px",gridArea:"content5",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px"},children:(0,x.jsxs)("div",{style:{flex:1,display:"grid",gap:"10px",gridTemplateColumns:"repeat(2,1fr)"},children:[(0,x.jsx)(o.Z,{disabled:P,fullWidth:!0,variant:"outlined",size:"small",label:"Consignee",name:"consignee",value:n.consignee,onChange:l}),(0,x.jsx)(o.Z,{disabled:P,fullWidth:!0,variant:"outlined",size:"small",label:"Subject Matter Insured",name:"smi",value:n.smi,onChange:l}),(0,x.jsx)(o.Z,{disabled:P,fullWidth:!0,variant:"outlined",size:"small",label:"Vessel",name:"vessel",value:n.vessel,onChange:l}),(0,x.jsx)(o.Z,{disabled:P,fullWidth:!0,variant:"outlined",size:"small",label:"Additional Information",name:"add_info",value:n.add_info,onChange:l}),(0,x.jsx)(o.Z,{disabled:P,fullWidth:!0,variant:"outlined",size:"small",label:"Point of Origin",name:"point_orig",value:n.point_orig,onChange:l}),(0,x.jsx)(o.Z,{disabled:P,fullWidth:!0,variant:"outlined",size:"small",label:"Point off Destination",name:"point_dis",value:n.point_dis,onChange:l})]})})]}),(0,x.jsx)(m.Z,{showModal:M,onCloseModal:function(){R(!1)},onClickCloseIcon:function(){R(!1)},searchOnChange:function(e){A.get("/task/production/search-client-vehicle-policy?clientSearch=".concat(e.target.value),{headers:{Authorization:"Bearer ".concat(null===I||void 0===I?void 0:I.accessToken)}}).then((function(e){var n;if(null===e||void 0===e||!e.data.success)return alert("Error : ".concat(null===e||void 0===e?void 0:e.data.message));_(null===e||void 0===e||null===(n=e.data.vehiclePolicy)||void 0===n?void 0:n.clients)}))},height:300,isLoading:C,queryKey:y,columns:p,onSelectionChange:function(e,n){if(!(e.length<=0)){var l=new Set(e),a=n.filter((function(e){return l.has(e.entry_client_id.toString())}));a.length<=0||(Z(a[0].entry_client_id,"client_id"),Z(a[0].fullname,"client_name"),Z(a[0].address,"client_address"),R(!1))}},id:"entry_client_id",rows:j,setRows:_}),(0,x.jsx)(m.Z,{showModal:L,onCloseModal:function(){F(!1)},onClickCloseIcon:function(){F(!1)},searchOnChange:function(e){A.get("/task/production/search-agent-vehicle-policy?agentSearch=".concat(e.target.value),{headers:{Authorization:"Bearer ".concat(null===I||void 0===I?void 0:I.accessToken)}}).then((function(e){var n;if(null===e||void 0===e||!e.data.success)return alert("Error : ".concat(null===e||void 0===e?void 0:e.data.message));D(null===e||void 0===e||null===(n=e.data.vehiclePolicy)||void 0===n?void 0:n.agents)}))},height:300,isLoading:C,queryKey:b,columns:v,onSelectionChange:function(e,n){if(!(e.length<=0)){var l=new Set(e),a=n.filter((function(e){return l.has(e.entry_agent_id.toString())}));a.length<=0||(Z(a[0].entry_agent_id,"agent_id"),Z(a[0].fullname,"agent_name"),F(!1))}},id:"entry_agent_id",rows:w,setRows:D})]})}},1421:function(e,n,l){var a=l(4836);n.Z=void 0;var i=a(l(5649)),t=l(184),d=(0,i.default)([(0,t.jsx)("circle",{cx:"10",cy:"8",r:"4"},"0"),(0,t.jsx)("path",{d:"M10.35 14.01C7.62 13.91 2 15.27 2 18v2h9.54c-2.47-2.76-1.23-5.89-1.19-5.99zm9.08 4.01c.36-.59.57-1.28.57-2.02 0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4c.74 0 1.43-.22 2.02-.57L20.59 22 22 20.59l-2.57-2.57zM16 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"},"1")],"PersonSearch");n.Z=d}}]);
//# sourceMappingURL=2088.cbd0c5b1.chunk.js.map