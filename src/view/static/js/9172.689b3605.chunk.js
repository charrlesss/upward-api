"use strict";(self.webpackChunkupward=self.webpackChunkupward||[]).push([[9172,2074],{60451:function(e,t,n){n.r(t),n.d(t,{default:function(){return T}});var i=n(4942),r=n(1413),a=n(74165),d=n(15861),o=n(29439),s=n(72791),l=n(64554),u=n(48550),c=n(36151),h=n(77196),f=n(63466),m=n(13400),p=n(3380),x=n(91933),w=n(21830),y=n.n(w),b=n(48749),v=n(68096),N=n(94925),g=n(58406),Z=n(23786),_=n(39709),A=n(8185),S=n(79018),k=n(89767),C=n(86753),D=n(42419),j=n(27247),I=n(29823),F=n(53329),z=n(4378),L=n(64230),B=n(80184),M={description:"",remarks:"",entry_others_id:"",search:"",mode:"",sub_account:"c02534ee-6d7e-40dd-a22b-bc9024fa12ca"};function T(){var e,t,n,w,T,E,O,q=(0,s.useRef)(null),U=(0,s.useState)([]),K=(0,o.Z)(U,2),P=K[0],R=K[1],V=(0,s.useReducer)(b.I6,M),G=(0,o.Z)(V,2),Q=G[0],W=G[1],Y=(0,s.useContext)(p.V),J=Y.myAxios,X=Y.user,H=(0,x.useQueryClient)(),$=(0,s.useRef)(null),ee="entry_others_id",te=(0,x.useQuery)({queryKey:"sub-accounts",queryFn:function(){return(e=e||(0,d.Z)((0,a.Z)().mark((function e(){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J.get("/reference/sub-account",{headers:{Authorization:"Bearer ".concat(null===X||void 0===X?void 0:X.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){var t,n;W({type:"UPDATE_FIELD",field:"sub_account",value:null===(t=e.data)||void 0===t||null===(n=t.defaultValue[0])||void 0===n?void 0:n.Sub_Acct})}}),ne=te.data,ie=te.isLoading,re=te.refetch,ae=(0,x.useQuery)({queryKey:"others-generate-id",queryFn:function(){return(t=t||(0,d.Z)((0,a.Z)().mark((function e(){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J.post("/reference/id-entry-generate-id",{sign:"O",type:"entry others"},{headers:{Authorization:"Bearer ".concat(null===X||void 0===X?void 0:X.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},refetchOnWindowFocus:!1,onSuccess:function(e){ve({target:{value:e.data.generateID,name:"entry_others_id"}})}}),de=ae.isLoading,oe=ae.refetch,se=(0,x.useQuery)({queryKey:ee,queryFn:function(){return(n=n||(0,d.Z)((0,a.Z)().mark((function e(){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J.get("/reference/search-entry?entrySearch=".concat(Q.search,"&entry=Others"),{headers:{Authorization:"Bearer ".concat(null===X||void 0===X?void 0:X.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){R(null===e||void 0===e?void 0:e.data.entry)}}),le=se.isLoading,ue=se.refetch,ce=(0,x.useMutation)({mutationKey:ee,mutationFn:function(e){return(w=w||(0,d.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J.post("/reference/id-entry-others",t,{headers:{Authorization:"Bearer ".concat(null===X||void 0===X?void 0:X.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:Ne}),he=ce.mutate,fe=ce.isLoading,me=(0,x.useMutation)({mutationKey:ee,mutationFn:function(e){return(T=T||(0,d.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J.post("/reference/entry-update?entry=Others",t,{headers:{Authorization:"Bearer ".concat(null===X||void 0===X?void 0:X.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:Ne}),pe=me.mutate,xe=me.isLoading,we=(0,x.useMutation)({mutationKey:ee,mutationFn:function(e){return(E=E||(0,d.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J.post("/reference/entry-delete?entry=Others",t,{headers:{Authorization:"Bearer ".concat(null===X||void 0===X?void 0:X.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:Ne}),ye=we.mutate,be=we.isLoading,ve=function(e){var t=e.target,n=t.name,i=t.value;if(["description","remarks"].includes(n))return W({type:"UPDATE_FIELD",field:n,value:i.toUpperCase()});W({type:"UPDATE_FIELD",field:n,value:i})};function Ne(e){if(e.data.success)return H.invalidateQueries(ee),Ze(),y().fire({position:"center",icon:"success",title:e.data.message,showConfirmButton:!1,timer:1500});y().fire({position:"center",icon:"error",title:e.data.message,showConfirmButton:!1,timer:1500})}function ge(e){return""===Q.description?y().fire({position:"center",icon:"warning",title:"Description is required",showConfirmButton:!1,timer:1500}):""===Q.sub_account?y().fire({position:"center",icon:"warning",title:"Sub Account is required",showConfirmButton:!1,timer:1500}):(e.preventDefault(),void("edit"===Q.mode?(0,L.s)({isUpdate:!0,cb:function(e){pe((0,r.Z)((0,r.Z)({},Q),{},{userCodeConfirmation:e}))}}):(0,L.L)({isConfirm:function(){he(Q)}})))}function Ze(){var e;(0,A.setNewStateValue)(W,M),null===(e=$.current)||void 0===e||e.removeSelection(),(0,S.D)(250).then((function(){ue(),oe(),re()}))}return(0,B.jsxs)("div",{style:{display:"flex",flexDirection:"column",width:"100%",height:"100%",flex:1},children:[(0,B.jsxs)(l.Z,{sx:function(e){return(0,i.Z)({display:"flex",alignItems:"center",columnGap:"20px"},e.breakpoints.down("sm"),{flexDirection:"column",alignItems:"flex-start",flex:1,marginBottom:"15px"})},children:[(0,B.jsx)("div",{style:{marginTop:"10px",marginBottom:"12px",width:"100%"},children:(0,B.jsx)(u.Z,{label:"Search",fullWidth:!0,size:"small",type:"text",value:Q.search,name:"search",onChange:ve,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),ue()},InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{width:"500px",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}})}),(0,B.jsx)("div",{style:{display:"flex",alignItems:"center",columnGap:"20px"},children:(0,B.jsxs)("div",{style:{display:"flex",alignItems:"center",columnGap:"5px"},children:[""===Q.mode&&(0,B.jsx)(c.Z,{variant:"contained",startIcon:(0,B.jsx)(D.Z,{}),id:"entry-header-save-button",sx:{height:"30px",fontSize:"11px"},onClick:function(){oe(),ve({target:{value:"add",name:"mode"}})},children:"New"}),(0,B.jsx)(_.Z,{id:"save-entry-header",color:"primary",variant:"contained",type:"submit",sx:{height:"30px",fontSize:"11px"},onClick:ge,startIcon:(0,B.jsx)(F.Z,{}),disabled:""===Q.mode,loading:fe||xe,children:"Save"}),""!==Q.mode&&(0,B.jsx)(c.Z,{sx:{height:"30px",fontSize:"11px"},variant:"contained",startIcon:(0,B.jsx)(I.Z,{}),color:"error",onClick:function(){y().fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, cancel it!"}).then((function(e){e.isConfirmed&&Ze()}))},children:"Cancel"}),(0,B.jsx)(_.Z,{id:"save-entry-header",variant:"contained",sx:{height:"30px",fontSize:"11px",backgroundColor:z.Z[500],"&:hover":{backgroundColor:z.Z[600]}},loading:be,startIcon:(0,B.jsx)(j.Z,{}),disabled:"edit"!==Q.mode,onClick:function(){(0,L.s)({isUpdate:!1,cb:function(e){ye({id:Q.entry_others_id,userCodeConfirmation:e})}})},children:"Delete"})]})})]}),(0,B.jsx)("form",{onKeyDown:function(e){"Enter"!==e.code&&"NumpadEnter"!==e.code||!["description","remarks","entry_others_id"].includes(e.target.name)||(e.preventDefault(),ge(e))},onSubmit:ge,style:{width:"100%"},id:"Form-Others",children:(0,B.jsxs)(l.Z,{sx:function(e){var t;return t={display:"flex",columnGap:"15px",flexDirection:"row"},(0,i.Z)(t,e.breakpoints.down("md"),{flexDirection:"column",rowGap:"10px"}),(0,i.Z)(t,"marginBottom","10px"),t},children:[de?(0,B.jsx)(_.Z,{loading:de}):(0,B.jsxs)(v.Z,{variant:"outlined",size:"small",disabled:""===Q.mode,sx:{width:"150px",".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,B.jsx)(N.Z,{htmlFor:"others-auto-generate-id-field",children:"Others ID"}),(0,B.jsx)(h.Z,{sx:{height:"27px",fontSize:"14px"},disabled:""===Q.mode,fullWidth:!0,label:"Others ID",name:"entry_others_id",value:Q.entry_others_id,onChange:ve,readOnly:!0,id:"others-auto-generate-id-field",endAdornment:(0,B.jsx)(f.Z,{position:"end",children:(0,B.jsx)(m.Z,{disabled:""===Q.mode,"aria-label":"search-others",color:"secondary",edge:"end",onClick:function(){oe()},children:(0,B.jsx)(C.Z,{})})})})]}),ie?(0,B.jsx)(_.Z,{loading:ie}):(0,B.jsxs)(v.Z,{required:!0,size:"small",sx:{width:"200px",".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,B.jsx)(N.Z,{id:"Sub Account",children:"Sub Account"}),(0,B.jsx)(g.Z,{sx:{height:"27px",fontSize:"14px"},disabled:""===Q.mode,value:Q.sub_account,onChange:function(e){W({type:"UPDATE_FIELD",field:"sub_account",value:e.target.value})},labelId:"Sub Account",label:"Sub Account",name:"sub_account",children:null===ne||void 0===ne?void 0:ne.data.subAccount.map((function(e){return(0,B.jsx)(Z.Z,{value:e.Sub_Acct,children:e.NewShortName},e.Sub_Acct)}))})]}),(0,B.jsx)(u.Z,{label:"Description",size:"small",name:"description",value:Q.description,onChange:ve,required:!0,disabled:""===Q.mode,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{marginBottom:"10px",flex:1,height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,B.jsx)(u.Z,{label:"Remarks",size:"small",fullWidth:!0,name:"remarks",value:Q.remarks,onChange:ve,required:!0,disabled:""===Q.mode,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{marginBottom:"10px",flex:1,width:"500px",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}})]})}),(0,B.jsx)("div",{ref:q,style:{marginTop:"10px",width:"100%",position:"relative",flex:1},children:(0,B.jsx)(l.Z,{style:{height:"".concat(null===(O=q.current)||void 0===O?void 0:O.getBoundingClientRect().height,"px"),width:"100%",overflowX:"scroll",position:"absolute"},children:(0,B.jsx)(k.Z,{ref:$,isLoading:le||be||xe||fe,columns:b.m5,rows:P,table_id:"entry_others_id",isSingleSelection:!0,isRowFreeze:!1,dataSelection:function(e,t,n){var i=t.filter((function(t){return t.entry_others_id===e[0]}))[0];if(void 0===i||i.length<=0)return(0,A.setNewStateValue)(W,M),void ve({target:{value:"",name:"mode"}});ve({target:{value:"edit",name:"mode"}}),(0,A.setNewStateValue)(W,i),"Delete"!==n&&"Backspace"!==n||(0,S.D)(350).then((function(){(0,L.s)({isUpdate:!1,cb:function(e){ye({id:i.entry_others_id,userCodeConfirmation:e})}})}))}})})})]})}},48749:function(e,t,n){n.d(t,{GY:function(){return l},I6:function(){return c},fJ:function(){return s},kb:function(){return d},m5:function(){return u},oy:function(){return a},y:function(){return o}});var i=n(4942),r=n(1413),a=[{field:"entry_client_id",headerName:"ID",width:130},{field:"company",headerName:"Company",width:200},{field:"firstname",headerName:"First Name",width:200},{field:"lastname",headerName:"Last Name",width:200},{field:"middlename",headerName:"Middle Name",width:200},{field:"email",headerName:"Email",width:200},{field:"mobile",headerName:"Mobile",width:200},{field:"sale_officer",headerName:"Sale Officer",width:200},{field:"NewShortName",headerName:"Sub Account",width:130},{field:"option",headerName:"Option",width:130},{field:"createdAt",headerName:"Created At",width:130},{field:"address",headerName:"Address",width:500}],d=[{field:"entry_employee_id",headerName:"ID",width:130},{field:"firstname",headerName:"First Name",width:200},{field:"lastname",headerName:"Last Name",width:200},{field:"middlename",headerName:"Middle Name",width:200},{field:"NewShortName",headerName:"Sub Account",width:130},{field:"createdAt",headerName:"Created At",width:130},{field:"address",headerName:"Address",width:500}],o=[{field:"entry_agent_id",headerName:"ID",width:130},{field:"firstname",headerName:"First Name",width:200},{field:"lastname",headerName:"Last Name",width:200},{field:"middlename",headerName:"Middle Name",width:200},{field:"email",headerName:"Email",width:250},{field:"mobile",headerName:"Mobile",width:130},{field:"telephone",headerName:"Telephone",width:130},{field:"createdAt",headerName:"Created At",width:130},{field:"address",headerName:"Address",width:500},{field:"sub_account",headerName:"sub_account",width:500,hide:!0}],s=[{field:"entry_fixed_assets_id",headerName:"ID",width:130},{field:"fullname",headerName:"Full Name",width:250},{field:"description",headerName:"Description",flex:1},{field:"remarks",headerName:"Remarks",flex:1},{field:"createdAt",headerName:"Created At",width:200}],l=[{field:"entry_supplier_id",headerName:"ID",width:130},{field:"company",headerName:"Company",width:200},{field:"firstname",headerName:"First Name",width:200},{field:"lastname",headerName:"Last Name",width:200},{field:"middlename",headerName:"Middle Name",width:200},{field:"email",headerName:"Email",width:200},{field:"mobile",headerName:"Mobile",width:200},{field:"telephone",headerName:"Telephone",width:200},{field:"tin_no",headerName:"TIN NO.",width:200},{field:"option",headerName:"Option",width:200},{field:"VAT_Type",headerName:"Vat Type",width:200},{field:"createdAt",headerName:"Created At",width:200},{field:"address",headerName:"Address",width:500}],u=[{field:"entry_others_id",headerName:"ID",width:130},{field:"description",headerName:"Description",flex:1},{field:"remarks",headerName:"Remarks",flex:1},{field:"createdAt",headerName:"Created At",width:200}],c=function(e,t){return"UPDATE_FIELD"===t.type?(0,r.Z)((0,r.Z)({},e),{},(0,i.Z)({},t.field,t.value)):e}},4378:function(e,t){t.Z={50:"#fce4ec",100:"#f8bbd0",200:"#f48fb1",300:"#f06292",400:"#ec407a",500:"#e91e63",600:"#d81b60",700:"#c2185b",800:"#ad1457",900:"#880e4f",A100:"#ff80ab",A200:"#ff4081",A400:"#f50057",A700:"#c51162"}}}]);
//# sourceMappingURL=9172.689b3605.chunk.js.map