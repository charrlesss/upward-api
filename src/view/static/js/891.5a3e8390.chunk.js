"use strict";(self.webpackChunkupward=self.webpackChunkupward||[]).push([[891],{1957:function(e,t,o){o.d(t,{Z:function(){return d}});var n=o(1413),a=o(9439),i=o(2791),r=o(4554),c=o(7482),l=o(6212),s=o(1128),u=o(184);function d(e){var t=e.onSelectionChange,o=e.initialPage,d=void 0===o?10:o,p=e.columns,m=e.rowHeight,h=void 0===m?35:m,f=e.getRowId,g=e.rows,v=e.isLoading,y=e.mutipleSelect,x=e.height,P=void 0===x?"500px":x,S=(0,s.Z)(),C=S.searchParams,w=S.setSearchParams,I=(0,i.useState)([]),Z=(0,a.Z)(I,2),T=Z[0],A=Z[1],F=(0,i.useState)(!1),N=(0,a.Z)(F,2),b=N[0],_=N[1],D=i.useState({pageSize:parseInt(C.get("pageSize"))||100,page:parseInt(C.get("page"))||1}),k=(0,a.Z)(D,2),j=k[0],B=k[1];if((0,i.useEffect)((function(){A(""===C.get("selected")?[]:[C.get("selected")])}),[C]),(0,i.useEffect)((function(){t(T,g)}),[b]),v){var O=p.map((function(e){return"id"===e.field&&(e=(0,n.Z)((0,n.Z)({},e),{},{colSpan:4,align:"center"})),e}));return(0,u.jsx)(r.Z,{sx:{height:500,width:"100%",overflowX:"scroll",position:"absolute"},children:(0,u.jsx)(l._$,{slots:{loadingOverlay:c.Z},loading:v,rows:[{id:"Loading..."}],columns:O})})}return(0,u.jsxs)(r.Z,{sx:{height:P,width:"100%",overflowX:"scroll",position:"absolute"},children:[(0,u.jsx)("button",{id:"reset-data-grid-selection",style:{display:"none"},onClick:function(){A([])},children:"reset"}),y?(0,u.jsx)(l._$,{checkboxSelection:!0,disableRowSelectionOnClick:!0,slots:{loadingOverlay:c.Z},loading:v,rowHeight:h,rows:g,columns:p,initialState:{pagination:{paginationModel:{page:0,pageSize:d}}},pageSizeOptions:[d,25,50,100],getRowId:f}):(0,u.jsx)(l._$,{slots:{loadingOverlay:c.Z},loading:v,rowHeight:h,rows:g,columns:p,initialState:{pagination:{paginationModel:{page:0,pageSize:d}}},checkboxSelection:!0,pageSizeOptions:[d,25,50,100],onRowDoubleClick:function(e){_((function(e){return!e})),A((function(t){return t.length>0&&t[0]===e.id?[]:[e.id]}))},onRowSelectionModelChange:function(e){if(e.length>1){var o=new Set(T),n=e.filter((function(e){return!o.has(e)}));t(n,g),A(n)}else t(e,g),A(e)},disableRowSelectionOnClick:!0,rowSelectionModel:T,sx:{"& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":{display:"none"},"& .MuiDataGrid-row":{cursor:"pointer"}},getRowId:f,paginationModel:j,onPaginationModelChange:function(e){B(e),w((function(t){return t.set("page",e.page.toString()),t.set("pageSize",e.pageSize.toString()),t}))}})]})}},1582:function(e,t,o){o.d(t,{Z:function(){return p}});o(2791);var n=o(1957),a=o(8447),i=o(4554),r=o(3400),c=o(890),l=o(8550),s=o(9823),u=o(184),d={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"70%",bgcolor:"background.paper",boxShadow:24,p:4,heigth:"auto"};function p(e){var t=e.height,o=e.isLoading,p=e.queryKey,m=e.columns,h=e.onSelectionChange,f=e.setRows,g=e.rows,v=e.id,y=e.onCloseModal,x=e.showModal,P=e.onClickCloseIcon,S=e.searchOnChange;return(0,u.jsx)(a.Z,{open:x,onClose:y,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:(0,u.jsxs)(i.Z,{sx:d,children:[(0,u.jsx)("div",{style:{position:"absolute",top:"10px",right:"10px"},children:(0,u.jsx)(r.Z,{"aria-label":"search-client",color:"secondary",onClick:P,children:(0,u.jsx)(s.Z,{})})}),(0,u.jsx)(c.Z,{id:"modal-modal-title",variant:"h6",component:"h2",mb:2,children:"Search Clients"}),(0,u.jsx)(l.Z,{size:"small",label:"Search",sx:{marginBottom:"10px"},fullWidth:!0,onChange:S}),(0,u.jsx)("div",{style:{position:"relative",height:"".concat(t+20,"px")},children:(0,u.jsx)(n.Z,{height:"".concat(t,"px"),mutipleSelect:!1,isLoading:o,queryKey:[p],columns:m,onSelectionChange:h,getRowId:function(e){return e["".concat(v)].toString()},rows:g,setRows:f})})]})})}},891:function(e,t,o){o.r(t),o.d(t,{VehicleContext:function(){return B},default:function(){return q},vpolicyColumn:function(){return Q}});var n=o(4165),a=o(5861),i=o(9439),r=o(4942),c=o(1413),l=o(2791),s=o(4412),u=o(7689),d=o(4554),p=o(6151),m=o(3239),h=o(7),f=o(4378),g=o(2419),v=o(3380),y=o(1128),x=o(1933),P=o(9823),S=o(3329),C=o(1830),w=o.n(C),I=o(7247),Z=o(8096),T=o(829),A=o(8406),F=o(3786),N=o(2326),b=o(1582),_=o(184),D=[{link:"/dashboard/task/production/policy/",text:"Policy Information"},{link:"/dashboard/task/production/policy/vehicle/policy-type-details",text:"Policy Type and Details"},{link:"/dashboard/task/production/policy/vehicle/policy-premium",text:"Policy Premium"}],k={form_action:"REG",form_type:"COM",sub_account:"HO",client_id:"",client_name:"",client_address:"",agent_id:"",agent_name:"",agent_com:"0.00",PolicyAccount:"",PolicyNo:"",CCN:"",ORN:"",rateCost:"",DateFrom:new Date,DateTo:new Date,DateIssued:new Date,Model:"charles1",Make:"",TB:"",Color:"",BLTFileNo:"",PlateNo:"",ChassisNo:"",MotorNo:"",AuthorizedCapacity:"",UnladenWeigth:"",TplType:JSON.stringify({Account:"",PremuimPaid:"0.00"}),PremiumPaid:"0.00",EVSV:"0.00",Aircon:"0.00",Stereo:"0.00",Magwheels:"0.00",OthersRate:"0.00",OthersDesc:"",CompreType:"",Deductible:"0.00",Towing:"0.00",ARL:"0.00",BodyInjury:"0.00",PropertyDamage:"0.00",PersinalAccident:"0.00",Denomination:"",Mortgagee:"",MortgageeForm:"false",SectionI_II:"0.00",SectionIII:"0.00",OwnDamage:"0.00",Theft:"0.00",SectionIVA:"0.00",SectionIVB:"0.00",PremiumOther:"0.00",AOG:"0.00",AOGPercent:"0.00",TotalPremium:"0.00",Vat:"0.00",DocStamp:"0.00",LocalGovTaxPercent:"0.75",LocalGovTax:"0.00",StradCom:"0.00",TotalDue:"0.00",Type:"charles1",Source_No_Ref_ID:"",mode:""},j=function(e,t){if("UPDATE_FIELD"===t.type){var o=(0,c.Z)((0,c.Z)({},e),{},(0,r.Z)({},t.field,t.value));return localStorage.setItem("VPolicyInitialState",JSON.stringify(o)),o}return e},B=(0,l.createContext)({}),O=JSON.stringify(k),M=localStorage.getItem("VPolicyInitialState"),L=M||O;localStorage.setItem("VPolicyInitialState",L);var V=localStorage.getItem("VPolicyInitialState")?JSON.parse(localStorage.getItem("VPolicyInitialState")):k,G="vehicle-policy-search",z="vehicle-policy-search",R="vehicle-policy-get",E="vehicle-policy-search-ppolicy-id",Q=[{field:"DateIssued",headerName:"Date",width:200},{field:"PolicyNo",headerName:"Policy No",width:170},{field:"Account",headerName:"Account",width:170},{field:"fullname",headerName:"Full Name",flex:1}],U="vehicle-policy";function q(){var e,t,o,c,C,O=(0,l.useReducer)(j,V),M=(0,i.Z)(O,2),L=M[0],q=M[1],Y=(0,l.useContext)(v.V),K=Y.myAxios,H=Y.user,J=(0,y.Z)().searchParams,W=(0,l.useState)([]),$=(0,i.Z)(W,2),X=$[0],ee=$[1],te=(0,l.useState)([]),oe=(0,i.Z)(te,2),ne=oe[0],ae=oe[1],ie=(0,l.useState)([]),re=(0,i.Z)(ie,2),ce=re[0],le=re[1],se=(0,l.useState)([]),ue=(0,i.Z)(se,2),de=ue[0],pe=ue[1],me=(0,l.useState)(!1),he=(0,i.Z)(me,2),fe=he[0],ge=he[1],ve=(0,l.useState)(!1),ye=(0,i.Z)(ve,2),xe=ye[0],Pe=ye[1],Se=(0,l.useState)(!1),Ce=(0,i.Z)(Se,2),we=Ce[0],Ie=Ce[1],Ze=(0,l.useState)({thirdparty:"tpl"===L.form_type.toLowerCase(),compre:"com"===L.form_type.toLowerCase()}),Te=(0,i.Z)(Ze,2),Ae=Te[0],Fe=Te[1],Ne=(0,x.useQueryClient)(),be=""===L.mode,_e=(0,x.useQuery)({queryKey:E,queryFn:function(){return(e=e||(0,a.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K.get("/task/production/tpl-ids-vehicle-policy?tplIDSearch=",{headers:{Authorization:"Bearer ".concat(null===H||void 0===H?void 0:H.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){le(e.data)}}),De=_e.data,ke=_e.isLoading,je=(0,x.useQuery)({queryKey:G,queryFn:function(){return(t=t||(0,a.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K.get("/task/production/tpl-search-vehicle-policy?form_type=".concat(L.form_type,"&form_action=").concat(L.form_action,"&search="),{headers:{Authorization:"Bearer ".concat(null===H||void 0===H?void 0:H.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){var t,o=null===(t=e.data)||void 0===t?void 0:t.searchVPolicy;pe(o)}}),Be=je.isLoading,Oe=(0,x.useQuery)({queryKey:R,queryFn:function(){return(o=o||(0,a.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K.get("/task/production/get-vehicle-policy?vpolicySearch=".concat(J.get("vpolicySearch")),{headers:{Authorization:"Bearer ".concat(null===H||void 0===H?void 0:H.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){var t,o,n=e;ee(null===n||void 0===n||null===(t=n.data.vehiclePolicy)||void 0===t?void 0:t.clients),ae(null===n||void 0===n||null===(o=n.data.vehiclePolicy)||void 0===o?void 0:o.agents),"TEMP"===L.form_action&&Ye(n.data.vehiclePolicy.tempPolicyId[0].tempPolicy_No,"PolicyNo")}}),Me=Oe.data,Le=Oe.isLoading,Ve=(0,x.useMutation)({mutationKey:z,mutationFn:function(e){return(c=c||(0,a.Z)((0,n.Z)().mark((function e(t){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("delete"!==L.mode){e.next=4;break}return e.next=3,K.post("/task/production/tpl-update-vehicle-policy",t,{headers:{Authorization:"Bearer ".concat(null===H||void 0===H?void 0:H.accessToken)}});case 3:case 6:return e.abrupt("return",e.sent);case 4:return e.next=6,K.post("/task/production/tpl-add-vehicle-policy",t,{headers:{Authorization:"Bearer ".concat(null===H||void 0===H?void 0:H.accessToken)}});case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){if(e.data.success)return Promise.all([Ne.invalidateQueries(G),Ne.invalidateQueries(z),Ne.invalidateQueries(R),Ne.invalidateQueries(E)]),w().fire({position:"center",icon:"success",title:e.data.message,showConfirmButton:!1,timer:1500}).then((function(){if("TEMP"===L.form_action){var e=L.PolicyNo.split("TP-")[1],t=parseInt(e)+1,o=e.slice(0,e.length-1);k.PolicyNo="TP-".concat(o).concat(t),k.form_action="TEMP"}k.form_type=L.form_type,Ke(k)}));w().fire({position:"center",icon:"error",title:e.data.message,showConfirmButton:!1,timer:1500})}}),Ge=Ve.mutate,ze=Ve.isLoading,Re=Ve.variables,Ee=(0,x.useMutation)({mutationKey:z,mutationFn:function(e){return(C=C||(0,a.Z)((0,n.Z)().mark((function e(t){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K.post("/task/production/tpl-delete-vehicle-policy",t,{headers:{Authorization:"Bearer ".concat(null===H||void 0===H?void 0:H.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){if(e.data.success)return Promise.all([Ne.invalidateQueries(G),Ne.invalidateQueries(z),Ne.invalidateQueries(R),Ne.invalidateQueries(E)]),w().fire({position:"center",icon:"success",title:e.data.message,showConfirmButton:!1,timer:1500}).then((function(){Ke(k,!0)}));w().fire({position:"center",icon:"error",title:e.data.message,showConfirmButton:!1,timer:1500})}}),Qe=Ee.mutate,Ue=Ee.isLoading,qe=function(e){var t=e.target,o=t.name,n=t.value;q({type:"UPDATE_FIELD",field:o,value:n})},Ye=function(e,t){q({type:"UPDATE_FIELD",field:t,value:e})};function Ke(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.form_type=L.form_type,e.form_action=L.form_action,t||(e.mode=L.mode),Object.entries(e).forEach((function(e){var t=(0,i.Z)(e,2),o=t[0],n=t[1];Ye(n,o)}))}return Le?(0,_.jsx)("h1",{children:"Loading...."}):(0,_.jsxs)(B.Provider,{value:{state:L,handleInputChange:qe,handleDateChange:Ye,Mortgagee:we,setMortgagee:Ie,showField:Ae,setShowField:Fe,isLoading:Le,clientRows:X,setClientRows:ee,myAxios:K,user:H,agentRows:ne,setAgentRows:ae,data:Me,tplCompuation:function(){if(isNaN(parseFloat(L.PremiumPaid)))return w().fire({position:"center",icon:"error",title:"Premiumn Paid is Required",showConfirmButton:!1,timer:1500});var e=.12*parseFloat(L.PremiumPaid),t=.125*parseFloat(L.PremiumPaid),o=.0075*parseFloat(L.PremiumPaid);isNaN(parseFloat(L.StradCom))&&(L.StradCom="0.00");var n=e+t+o+parseFloat(L.StradCom)+parseFloat(L.PremiumPaid);Ye("".concat(parseFloat(L.PremiumPaid).toFixed(2)),"SectionI_II"),Ye("".concat(parseFloat(L.PremiumPaid).toFixed(2)),"TotalPremium"),Ye("".concat(e.toFixed(2)),"Vat"),Ye("".concat(t.toFixed(2)),"DocStamp"),Ye("".concat(o.toFixed(2)),"LocalGovTax"),Ye("".concat(n.toFixed(2)),"TotalDue")},comComputation:function(){isNaN(parseFloat(L.SectionIII))&&(L.SectionIII="0.00"),isNaN(parseFloat(L.AOGPercent))&&(L.AOGPercent="0.00"),isNaN(parseFloat(L.Theft))&&(L.Theft="0.00"),isNaN(parseFloat(L.SectionIVA))&&(L.SectionIVA="0.00"),isNaN(parseFloat(L.SectionIVB))&&(L.SectionIVB="0.00"),isNaN(parseFloat(L.PremiumOther))&&(L.PremiumOther="0.00"),isNaN(parseFloat(L.AOG))&&(L.AOG="0.00"),isNaN(parseFloat(L.LocalGovTaxPercent))&&(L.LocalGovTaxPercent="0.00"),isNaN(parseFloat(L.Vat))&&(L.Vat="0.00"),isNaN(parseFloat(L.DocStamp))&&(L.DocStamp="0.00"),isNaN(parseFloat(L.LocalGovTax))&&(L.LocalGovTax="0.00"),isNaN(parseFloat(L.StradCom))&&(L.StradCom="0.00");var e=parseFloat(L.LocalGovTaxPercent)/100,t=parseFloat(L.SectionIII)/100,o=parseFloat(L.AOGPercent)/100,n=parseFloat(L.EVSV)*t,a=parseFloat(L.EVSV)*o;Ye("".concat(n.toFixed(2)),"OwnDamage"),Ye("".concat(a.toFixed(2)),"AOG");var i=parseFloat(n.toFixed(2))+parseFloat(a.toFixed(2))+parseFloat(L.SectionIVB)+parseFloat(L.PremiumOther)+parseFloat(L.SectionIVA);Ye("".concat((.12*i).toFixed(2)),"Vat"),Ye("".concat((.125*i).toFixed(2)),"DocStamp"),Ye("".concat((e*i).toFixed(2)),"LocalGovTax"),Ye("0.00","TotalPremium"),Ye("0.00","TotalDue");var r=i+parseFloat((.12*i).toFixed(2))+parseFloat((.125*i).toFixed(2))+parseFloat((e*i).toFixed(2))+parseFloat(parseFloat(L.StradCom).toFixed(2));Ye("".concat(i.toFixed(2)),"TotalPremium"),Ye("".concat(r.toFixed(2)),"TotalDue")},tplLoading:ke,tplData:De,tplId:ce,setTplId:le,isAddOrEditMode:be},children:[(0,_.jsx)(s.Z,{list:D}),(0,_.jsxs)(d.Z,{sx:function(e){return(0,r.Z)({display:"flex",alignItems:"center",columnGap:"20px",marginBottom:"10px"},e.breakpoints.down("sm"),{flexDirection:"column",alignItems:"flex-start",flex:1})},children:[(0,_.jsx)("div",{style:{marginTop:"10px",marginBottom:"12px",flex:1,width:"100%"}}),(0,_.jsx)("div",{style:{display:"flex",alignItems:"center",columnGap:"20px"},children:(0,_.jsxs)("div",{style:{display:"flex",alignItems:"center",columnGap:"5px"},children:[""===L.mode&&(0,_.jsx)(p.Z,{variant:"contained",startIcon:(0,_.jsx)(g.Z,{}),onClick:function(){Ye("add","mode")},children:"New"}),(0,_.jsxs)(d.Z,{sx:{position:"relative"},children:[(0,_.jsx)(p.Z,{color:"primary",variant:"contained",type:"submit",onClick:function(){return""===L.client_id||null===L.client_id?w().fire("Unable to save! Invalid IDNo.","you missed the Client Id Field?","error"):""===L.PolicyAccount||null===L.PolicyAccount?w().fire("Unable to save! Please select Account.","you missed the Account Field?","error"):""===L.PolicyNo||null===L.PolicyNo?w().fire("Unable to save! Invalid Policy No.","you missed the Policy No Field?","error"):void w().fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, Save it!"}).then((function(e){e.isConfirmed&&(L.isUpdate=!1,Ge(L))}))},disabled:ze||""===L.mode,startIcon:(0,_.jsx)(S.Z,{}),children:"Save"}),ze&&void 0===Re.mode&&(0,_.jsx)(m.Z,{size:24,sx:{color:h.Z[500],position:"absolute",top:"50%",left:"50%",marginTop:"-12px",marginLeft:"-12px"}})]}),""!==L.mode&&(0,_.jsx)(p.Z,{variant:"contained",startIcon:(0,_.jsx)(P.Z,{}),color:"error",onClick:function(){w().fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, cancel it!"}).then((function(e){e.isConfirmed&&(Ye("","mode"),k.form_action=L.form_action,Ke(k,!0))}))},children:"Cancel"}),(0,_.jsxs)(d.Z,{sx:{position:"relative"},children:[(0,_.jsx)(p.Z,{id:"save-entry-header",variant:"contained",sx:{backgroundColor:f.Z[500],"&:hover":{backgroundColor:f.Z[600]}},disabled:"delete"!==L.mode,startIcon:(0,_.jsx)(I.Z,{}),onClick:function(){w().fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then((function(e){e.isConfirmed&&Qe({PolicyAccount:L.PolicyAccount,form_type:L.form_type,PolicyNo:L.PolicyNo})}))},children:"Delete"}),Ue&&(0,_.jsx)(m.Z,{size:24,sx:{color:h.Z[500],position:"absolute",top:"50%",left:"50%",marginTop:"-12px",marginLeft:"-12px"}})]})]})})]}),(0,_.jsxs)("div",{style:{marginBottom:"5px",display:"flex",gap:"10px"},children:[(0,_.jsx)(p.Z,{size:"small",variant:"outlined",startIcon:(0,_.jsx)(N.Z,{}),onClick:function(){ge(!0)},disabled:Be||xe,children:"Search Policy"}),(0,_.jsxs)(Z.Z,{size:"small",sx:function(e){return{width:"150px"}},children:[(0,_.jsx)(T.Z,{id:"subAccount",children:"Sub Account"}),(0,_.jsx)(A.Z,{size:"small",labelId:"subAccount",label:"subAccount",name:"sub_account",value:L.sub_account,onChange:function(e){Ye("","Denomination"),Ye("","PolicyAccount"),Ye("","Mortgagee"),qe(e)},children:(null===Me||void 0===Me?void 0:Me.data.vehiclePolicy.sub_account).map((function(e,t){return(0,_.jsx)(F.Z,{value:e.Acronym.trim(),children:e.Acronym},t)}))})]}),(0,_.jsx)(Z.Z,{size:"small",sx:function(e){return{width:"100px"}},children:(0,_.jsx)(A.Z,{labelId:"formType",name:"form_type",value:L.form_type,onChange:function(e){w().fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, change it!"}).then((function(t){t.isConfirmed&&(Pe(!0),k.form_action=L.form_action,Ke(k),Fe({thirdparty:"tpl"===e.target.value.toLowerCase(),compre:"com"===e.target.value.toLowerCase()}),K.get("/task/production/tpl-search-vehicle-policy?form_type=".concat(e.target.value,"&form_action=").concat(e.target.value,"&search="),{headers:{Authorization:"Bearer ".concat(null===H||void 0===H?void 0:H.accessToken)}}).then((function(e){var t,o=null===(t=e.data)||void 0===t?void 0:t.searchVPolicy;pe(o),Pe(!1)})),qe(e))}))},children:[{Account:"TPL",show:"REG"===L.form_action},{Account:"COM",show:!0}].map((function(e,t){return e.show?(0,_.jsx)(F.Z,{value:e.Account,children:e.Account},t):null}))})}),(0,_.jsx)(Z.Z,{size:"small",sx:function(e){return{width:"100px"}},children:(0,_.jsx)(A.Z,{name:"form_action",value:L.form_action,onChange:function(e){w().fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, change it!"}).then((function(t){t.isConfirmed&&(Pe(!0),k.form_type="COM",Ke(k),"TEMP"===e.target.value&&Ye(null===Me||void 0===Me?void 0:Me.data.vehiclePolicy.tempPolicyId[0].tempPolicy_No,"PolicyNo"),K.get("/task/production/tpl-search-vehicle-policy?form_type=".concat(L.form_type,"&form_action=").concat(e.target.value,"&search="),{headers:{Authorization:"Bearer ".concat(null===H||void 0===H?void 0:H.accessToken)}}).then((function(e){var t;Pe(!1);var o=null===(t=e.data)||void 0===t?void 0:t.searchVPolicy;pe(o)})),qe(e))}))},children:[{Account:"REG"},{Account:"TEMP"}].map((function(e,t){return(0,_.jsx)(F.Z,{value:e.Account,children:e.Account},t)}))})})]}),(0,_.jsx)(u.j3,{}),(0,_.jsx)(b.Z,{showModal:fe,onCloseModal:function(){ge(!1)},onClickCloseIcon:function(){ge(!1)},searchOnChange:function(e){K.get("/task/production/tpl-search-vehicle-policy?form_type=".concat(L.form_type,"&form_action=").concat(L.form_action,"&search=").concat(e.target.value),{headers:{Authorization:"Bearer ".concat(null===H||void 0===H?void 0:H.accessToken)}}).then((function(e){if(null===e||void 0===e||!e.data.success)return alert("Error : ".concat(null===e||void 0===e?void 0:e.data.message));pe(null===e||void 0===e?void 0:e.data.searchVPolicy)}))},height:300,isLoading:Be||xe,queryKey:U,columns:Q,onSelectionChange:function(e,t){if(!(e.length<=0)){var o=new Set(e),n=t.filter((function(e){return o.has(e.PolicyNo.toString())}));if(!(n.length<=0)){var a=n[0],i=a.address,r=a.IDNo,c=a.Account,l=a.SubAcct,s=a.PolicyNo,u=a.DateIssued,d=a.TotalPremium,p=a.Vat,m=a.DocStamp,h=a.LGovTax,f=a.Misc,g=a.TotalDue,v=a.AgentID,y=a.AgentCom,x=a.CoverNo,P=a.ORNo,S=a.DateFrom,C=a.DateTo,w=a.Model,I=a.Make,Z=a.BodyType,T=a.Color,A=a.BLTFileNo,F=a.PlateNo,N=a.ChassisNo,b=a.MotorNo,_=a.AuthorizedCap,D=a.UnladenWeight,k=a.PremiumPaid,j=a.EstimatedValue,B=a.Aircon,O=a.Stereo,M=a.Magwheels,L=a.Others,V=a.OthersAmount,G=a.Deductible,z=a.Towing,R=a.RepairLimit,E=a.BodilyInjury,Q=a.PropertyDamage,U=a.PersonalAccident,q=a.SecI,Y=a.SecIIPercent,K=a.ODamage,H=a.Theft,J=a.Sec4A,W=a.Sec4B,$=a.Sec4C,X=a.AOG,ee=a.MortgageeForm,te=a.Mortgagee,oe=a.Denomination,ne=a.client_fullname,ae=a.agent_fullname,ie=a.TPLTypeSection_I_II,re=a.AOGPercent,ce=a.LocalGovTaxPercent;Ye(l,"sub_account"),Ye(r,"client_id"),Ye(ne,"client_name"),Ye(i,"client_address"),Ye(v,"agent_id"),Ye(ae,"agent_name"),Ye(y,"agent_com"),Ye(c,"PolicyAccount"),Ye(s,"PolicyNo"),Ye(x,"CCN"),Ye(P,"ORN"),Ye(S,"DateFrom"),Ye(C,"DateTo"),Ye(u,"DateIssued"),Ye(w,"Model"),Ye(I,"Make"),Ye(Z,"TB"),Ye(T,"Color"),Ye(A,"BLTFileNo"),Ye(F,"PlateNo"),Ye(N,"ChassisNo"),Ye(b,"MotorNo"),Ye(_,"AuthorizedCapacity"),Ye(D,"UnladenWeigth"),Ye(se(k),"PremiumPaid"),Ye(se(j),"EVSV"),Ye(se(B),"Aircon"),Ye(se(O),"Stereo"),Ye(se(M),"Magwheels"),Ye(se(B),"Aircon"),Ye(se(V),"OthersRate"),Ye(L,"OthersDesc"),Ye(se(G),"Deductible"),Ye(se(z),"Towing"),Ye(se(R),"ARL"),Ye(le(E),"BodyInjury"),Ye(le(Q),"PropertyDamage"),Ye(le(U),"PersinalAccident"),Ye(se(q),"SectionI_II"),Ye(se(Y),"SectionIII"),Ye(se(K),"OwnDamage"),Ye(se(H),"Theft"),Ye(se(J),"SectionIVA"),Ye(se(W),"SectionIVB"),Ye(se($),"PremiumOther"),Ye(se(X),"AOG"),Ye(te,"Mortgagee"),Ye(!!parseInt(ee),"MortgageeForm"),Ye(oe,"Denomination"),Ye(se(g),"TotalDue"),Ye(se(p),"Vat"),Ye(se(m),"DocStamp"),Ye(se(d),"TotalPremium"),Ye(se(h),"LocalGovTax"),Ye(se(f),"StradCom"),Ye(se(ce),"LocalGovTaxPercent"),Ye(se(re),"LocaAOGPercent"),Ye(ie,"TplType"),Ye("delete","mode"),ge(!1)}}function le(e){return parseFloat(e)>0?"".concat(e,",000.00"):"0.00"}function se(e){return parseFloat(e).toFixed(2)}},id:"PolicyNo",rows:de,setRows:pe})]})}},4412:function(e,t,o){o.d(t,{Z:function(){return s}});var n=o(3517),a=o(7689),i=o(1087),r=o(8333),c=o(1128),l=o(184);function s(e){var t=e.list,o=(0,a.TH)(),s=(0,c.Z)().searchParams;return(0,l.jsx)("div",{role:"presentation",onClick:function(e){e.preventDefault()},children:(0,l.jsx)(n.Z,{separator:(0,l.jsx)(r.Z,{fontSize:"small"}),"aria-label":"breadcrumb",children:t.map((function(e,t){return(0,l.jsx)(i.rU,{to:e.link+"?drawer=".concat(s.get("drawer"),"&pageSize=").concat(s.get("pageSize")),style:{textDecoration:"none",color:e.link===o.pathname?"#f97316":"black"},children:e.text},t)}))})})}}}]);
//# sourceMappingURL=891.5a3e8390.chunk.js.map