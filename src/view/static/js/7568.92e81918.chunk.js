(self.webpackChunkupward=self.webpackChunkupward||[]).push([[7568,2074],{58610:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return T}});var i=n(4942),a=n(1413),r=n(74165),d=n(15861),o=n(29439),s=n(72791),l=n(64554),u=n(27391),c=n(36151),f=n(77196),h=n(63466),m=n(13400),p=n(3380),x=n(91933),w=n(21830),y=n.n(w),b=n(48749),N=n(68096),g=n(94925),v=n(58406),Z=n(23786),_=n(39709),A=n(8185),k=n(16395),S=n(86753),C=n(42419),F=n(27247),D=n(29823),j=n(53329),I=n(4378),z=n(64230),L=n(93346),B=n(80184),M={description:"",remarks:"",fullname:"",search:"",mode:"",entry_fixed_assets_id:"",sub_account:"c02534ee-6d7e-40dd-a22b-bc9024fa12ca"};function T(){var e,t,n,w,T,E,q=(0,s.useState)([]),K=(0,o.Z)(q,2),P=K[0],R=K[1],U=(0,s.useReducer)(b.I6,M),W=(0,o.Z)(U,2),O=W[0],V=W[1],G=(0,s.useContext)(p.V),Q=G.myAxios,Y=G.user,J=(0,x.useQueryClient)(),H=(0,s.useRef)(null),X="entry_fixed_assets_id",$=(0,x.useQuery)({queryKey:"sub-accounts",queryFn:function(){return(e=e||(0,d.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Q.get("/reference/sub-account",{headers:{Authorization:"Bearer ".concat(null===Y||void 0===Y?void 0:Y.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){var t,n;V({type:"UPDATE_FIELD",field:"sub_account",value:null===(t=e.data)||void 0===t||null===(n=t.defaultValue[0])||void 0===n?void 0:n.Sub_Acct})}}),ee=$.data,te=$.isLoading,ne=$.refetch,ie=(0,x.useQuery)({queryKey:"fixed-generate-id",queryFn:function(){return(t=t||(0,d.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Q.post("/reference/id-entry-generate-id",{sign:"FA",type:"entry fixed assets"},{headers:{Authorization:"Bearer ".concat(null===Y||void 0===Y?void 0:Y.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},refetchOnWindowFocus:!1,onSuccess:function(e){ye({target:{value:e.data.generateID,name:"entry_fixed_assets_id"}})}}),ae=ie.isLoading,re=ie.refetch,de=(0,x.useQuery)({queryKey:X,queryFn:function(){return(n=n||(0,d.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Q.get("/reference/search-entry?entrySearch=".concat(O.search,"&entry=Fixed Assets"),{headers:{Authorization:"Bearer ".concat(null===Y||void 0===Y?void 0:Y.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){R(null===e||void 0===e?void 0:e.data.entry)}}),oe=de.isLoading,se=de.refetch,le=(0,x.useMutation)({mutationKey:X,mutationFn:function(e){return(w=w||(0,d.Z)((0,r.Z)().mark((function e(t){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Q.post("/reference/id-entry-fixed-assets",t,{headers:{Authorization:"Bearer ".concat(null===Y||void 0===Y?void 0:Y.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:be}),ue=le.mutate,ce=le.isLoading,fe=(0,x.useMutation)({mutationKey:X,mutationFn:function(e){return(T=T||(0,d.Z)((0,r.Z)().mark((function e(t){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Q.post("/reference/entry-update?entry=Fixed Assets",t,{headers:{Authorization:"Bearer ".concat(null===Y||void 0===Y?void 0:Y.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:be}),he=fe.mutate,me=fe.isLoading,pe=(0,x.useMutation)({mutationKey:X,mutationFn:function(e){return(E=E||(0,d.Z)((0,r.Z)().mark((function e(t){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Q.post("/reference/entry-delete?entry=Fixed Assets",t,{headers:{Authorization:"Bearer ".concat(null===Y||void 0===Y?void 0:Y.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:be}),xe=pe.mutate,we=pe.isLoading,ye=function(e){var t=e.target,n=t.name,i=t.value;if(["fullname","description","remarks"].includes(n))return V({type:"UPDATE_FIELD",field:n,value:i.toUpperCase()});V({type:"UPDATE_FIELD",field:n,value:i})};function be(e){if(e.data.success)return J.invalidateQueries(X),ge(),y().fire({position:"center",icon:"success",title:e.data.message,showConfirmButton:!1,timer:1500});y().fire({position:"center",icon:"error",title:e.data.message,showConfirmButton:!1,timer:1500})}function Ne(e){return""===O.fullname?y().fire({position:"center",icon:"error",title:"Fullname is required!",showConfirmButton:!1,timer:1500}):""===O.description?y().fire({position:"center",icon:"error",title:"Description is required!",showConfirmButton:!1,timer:1500}):O.fullname.length>=200?y().fire({position:"center",icon:"error",title:"Fullname is too Long!",showConfirmButton:!1,timer:1500}):(e.preventDefault(),void("edit"===O.mode?(0,z.s)({isUpdate:!0,cb:function(e){he((0,a.Z)((0,a.Z)({},O),{},{userCodeConfirmation:e}))}}):(0,z.L)({isConfirm:function(){ue(O)}})))}function ge(){var e;(0,A.setNewStateValue)(V,M),null===(e=H.current)||void 0===e||e.resetTableSelected(),(0,k.wait)(250).then((function(){se(),re(),ne()}))}var ve=window.innerWidth-20,Ze=window.innerHeight-100;return(0,B.jsxs)("div",{style:{display:"flex",flexDirection:"column",width:"100%",height:"100%",flex:1},children:[(0,B.jsxs)(l.Z,{sx:function(e){return(0,i.Z)({display:"flex",alignItems:"center",columnGap:"20px"},e.breakpoints.down("sm"),{flexDirection:"column",alignItems:"flex-start",flex:1,marginBottom:"15px"})},children:[(0,B.jsx)("div",{style:{marginTop:"10px",marginBottom:"12px",width:"100%"},children:(0,B.jsx)(u.Z,{label:"Search",fullWidth:!0,size:"small",type:"text",value:O.search,name:"search",onChange:ye,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),se();"ArrowDown"===e.code&&(e.preventDefault(),document.querySelector(".grid-container").focus())},InputProps:{style:{height:"27px",fontSize:"14px"},className:"manok"},sx:{width:"500px",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}})}),(0,B.jsx)("div",{style:{display:"flex",alignItems:"center",columnGap:"20px"},children:(0,B.jsxs)("div",{style:{display:"flex",alignItems:"center",columnGap:"5px"},children:[""===O.mode&&(0,B.jsx)(c.Z,{variant:"contained",startIcon:(0,B.jsx)(C.Z,{}),id:"entry-header-save-button",sx:{height:"30px",fontSize:"11px"},onClick:function(){re(),ye({target:{value:"add",name:"mode"}})},children:"New"}),(0,B.jsx)(_.Z,{id:"save-entry-header",color:"primary",variant:"contained",type:"submit",sx:{height:"30px",fontSize:"11px"},onClick:Ne,startIcon:(0,B.jsx)(j.Z,{}),disabled:""===O.mode,loading:ce||me,children:"Save"}),""!==O.mode&&(0,B.jsx)(c.Z,{sx:{height:"30px",fontSize:"11px"},variant:"contained",startIcon:(0,B.jsx)(D.Z,{}),color:"error",onClick:function(){y().fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, cancel it!"}).then((function(e){e.isConfirmed&&ge()}))},children:"Cancel"}),(0,B.jsx)(_.Z,{id:"save-entry-header",variant:"contained",sx:{height:"30px",fontSize:"11px",backgroundColor:I.Z[500],"&:hover":{backgroundColor:I.Z[600]}},loading:we,startIcon:(0,B.jsx)(F.Z,{}),disabled:"edit"!==O.mode,onClick:function(){(0,z.s)({isUpdate:!1,cb:function(e){xe({id:O.entry_fixed_assets_id,userCodeConfirmation:e})}})},children:"Delete"})]})})]}),(0,B.jsx)("form",{onKeyDown:function(e){"Enter"!==e.code&&"NumpadEnter"!==e.code||!["description","remarks","fullname","entry_fixed_assets_id"].includes(e.target.name)||(e.preventDefault(),Ne(e))},onSubmit:Ne,id:"Form-Fixed Assets",children:(0,B.jsxs)(l.Z,{sx:function(e){var t;return t={display:"flex",columnGap:"15px",flexDirection:"row"},(0,i.Z)(t,e.breakpoints.down("md"),{flexDirection:"column",rowGap:"10px"}),(0,i.Z)(t,"marginBottom","10px"),t},children:[ae?(0,B.jsx)(_.Z,{loading:ae}):(0,B.jsxs)(N.Z,{variant:"outlined",size:"small",disabled:""===O.mode,sx:{width:"150px",".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,B.jsx)(g.Z,{htmlFor:"fixed_assets-auto-generate-id-field",children:"Fixed Assets ID"}),(0,B.jsx)(f.Z,{sx:{height:"27px",fontSize:"14px"},disabled:""===O.mode,fullWidth:!0,label:"Fixed Assets ID",name:"entry_fixed_assets_id",value:O.entry_fixed_assets_id,onChange:ye,readOnly:!0,id:"fixed_assets-auto-generate-id-field",endAdornment:(0,B.jsx)(h.Z,{position:"end",children:(0,B.jsx)(m.Z,{disabled:""===O.mode,"aria-label":"search-client",color:"secondary",edge:"end",onClick:function(){re()},children:(0,B.jsx)(S.Z,{})})})})]}),(0,B.jsx)(u.Z,{label:"Full Name",name:"fullname",minRows:10,fullWidth:!0,style:{marginBottom:"10px"},size:"small",required:!0,value:O.fullname,onChange:ye,disabled:""===O.mode,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{flex:1,height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,B.jsx)(u.Z,{label:"Description",name:"description",minRows:10,fullWidth:!0,style:{marginBottom:"10px"},size:"small",required:!0,value:O.description,onChange:ye,disabled:""===O.mode,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{flex:1,height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,B.jsx)(u.Z,{label:"Remarks",name:"remarks",minRows:10,fullWidth:!0,style:{marginBottom:"10px"},size:"small",value:O.remarks,onChange:ye,disabled:""===O.mode,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{flex:1,height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),te?(0,B.jsx)(_.Z,{loading:te}):(0,B.jsxs)(N.Z,{fullWidth:!0,required:!0,size:"small",sx:{flex:1,".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,B.jsx)(g.Z,{id:"Sub Account",children:"Sub Account"}),(0,B.jsx)(v.Z,{sx:{height:"27px",fontSize:"14px"},disabled:""===O.mode,value:O.sub_account,onChange:function(e){V({type:"UPDATE_FIELD",field:"sub_account",value:e.target.value})},labelId:"Sub Account",label:"Sub Account",name:"sub_account",children:null===ee||void 0===ee?void 0:ee.data.subAccount.map((function(e){return(0,B.jsx)(Z.Z,{value:e.Sub_Acct,children:e.NewShortName},e.Sub_Acct)}))})]})]})}),(0,B.jsx)(L.Z,{ref:H,rows:P,column:b.fJ,width:ve,height:Ze,dataReadOnly:!0,onSelectionChange:function(e){if(e.length>0){var t=e[0];ye({target:{value:"edit",name:"mode"}}),(0,A.setNewStateValue)(V,t)}else(0,A.setNewStateValue)(V,M),ye({target:{value:"",name:"mode"}})},onKeyDown:function(e,t){if("Delete"!==t&&"Backspace"!==t);else{var n=e[0];(0,z.s)({isUpdate:!1,cb:function(e){xe({id:n.entry_fixed_assets_id,userCodeConfirmation:e})}})}},inputsearchselector:".manok",isLoading:oe||we||me||ce})]})}},48749:function(e,t,n){"use strict";n.d(t,{GY:function(){return l},I6:function(){return c},fJ:function(){return s},kb:function(){return d},m5:function(){return u},oy:function(){return r},y:function(){return o}});var i=n(4942),a=n(1413),r=[{field:"entry_client_id",headerName:"ID",width:130},{field:"company",headerName:"Company",width:300},{field:"firstname",headerName:"First Name",width:300},{field:"lastname",headerName:"Last Name",width:300},{field:"middlename",headerName:"Middle Name",width:300},{field:"email",headerName:"Email",width:200},{field:"mobile",headerName:"Mobile",width:200},{field:"sale_officer",headerName:"Sale Officer",width:200},{field:"NewShortName",headerName:"Sub Account",width:130},{field:"option",headerName:"Option",width:130},{field:"createdAt",headerName:"Created At",width:130},{field:"address",headerName:"Address",width:500}],d=[{field:"entry_employee_id",headerName:"ID",width:130},{field:"firstname",headerName:"First Name",width:300},{field:"lastname",headerName:"Last Name",width:300},{field:"middlename",headerName:"Middle Name",width:300},{field:"NewShortName",headerName:"Sub Account",width:130},{field:"createdAt",headerName:"Created At",width:130},{field:"address",headerName:"Address",width:500}],o=[{field:"entry_agent_id",headerName:"ID",width:130},{field:"firstname",headerName:"First Name",width:300},{field:"lastname",headerName:"Last Name",width:300},{field:"middlename",headerName:"Middle Name",width:300},{field:"email",headerName:"Email",width:250},{field:"mobile",headerName:"Mobile",width:130},{field:"telephone",headerName:"Telephone",width:130},{field:"createdAt",headerName:"Created At",width:130},{field:"address",headerName:"Address",width:500},{field:"sub_account",headerName:"sub_account",width:500,hide:!0}],s=[{field:"entry_fixed_assets_id",headerName:"ID",width:130},{field:"fullname",headerName:"Full Name",width:300},{field:"description",headerName:"Description",width:300},{field:"remarks",headerName:"Remarks",width:400},{field:"createdAt",headerName:"Created At",width:200}],l=[{field:"entry_supplier_id",headerName:"ID",width:130},{field:"company",headerName:"Company",width:300},{field:"firstname",headerName:"First Name",width:300},{field:"lastname",headerName:"Last Name",width:300},{field:"middlename",headerName:"Middle Name",width:300},{field:"email",headerName:"Email",width:200},{field:"mobile",headerName:"Mobile",width:200},{field:"telephone",headerName:"Telephone",width:200},{field:"tin_no",headerName:"TIN NO.",width:200},{field:"option",headerName:"Option",width:200},{field:"VAT_Type",headerName:"Vat Type",width:200},{field:"createdAt",headerName:"Created At",width:200},{field:"address",headerName:"Address",width:500}],u=[{field:"entry_others_id",headerName:"ID",width:130},{field:"description",headerName:"Description",width:490},{field:"remarks",headerName:"Remarks",width:490},{field:"createdAt",headerName:"Created At",width:200}],c=function(e,t){return"UPDATE_FIELD"===t.type?(0,a.Z)((0,a.Z)({},e),{},(0,i.Z)({},t.field,t.value)):e}},4378:function(e,t){"use strict";t.Z={50:"#fce4ec",100:"#f8bbd0",200:"#f48fb1",300:"#f06292",400:"#ec407a",500:"#e91e63",600:"#d81b60",700:"#c2185b",800:"#ad1457",900:"#880e4f",A100:"#ff80ab",A200:"#ff4081",A400:"#f50057",A700:"#c51162"}},24654:function(){}}]);
//# sourceMappingURL=7568.92e81918.chunk.js.map