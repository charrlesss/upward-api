(self.webpackChunkupward=self.webpackChunkupward||[]).push([[9469],{89767:function(e,t,n){"use strict";var o=n(93433),i=n(1413),r=n(29439),a=n(72791),u=n(57482),c=n(64554),l=n(56214),s=n(29961),d=n(54277),f=n(70169),p=n(6484),h=n(16088),m=n(80184),x=(0,a.createContext)({rows:[],rowSelectionModel:[],footerChildren:function(){return(0,m.jsx)("div",{})},footerPaginationPosition:"right-left",showFooterSelectedCount:!0}),v=(0,a.forwardRef)((function(e,t){var n=e.isLoading,c=e.columns,s=e.rows,d=e.table_id,f=e.isSingleSelection,p=e.isRowFreeze,h=e.dataSelection,v=e.CustomFooterComponent,g=void 0===v?b:v,w=e.isRowSelectable,C=e.getCellClassName,y=e.checkboxSelection,S=void 0===y||y,Z=e.footerChildren,D=void 0===Z?function(e,t){return(0,m.jsx)("div",{})}:Z,k=e.footerPaginationPosition,j=void 0===k?"right-left":k,I=e.showFooterSelectedCount,M=void 0===I||I,L=(0,a.useState)([]),N=(0,r.Z)(L,2),z=N[0],B=N[1];function P(e,t,n){h&&h(e,t,n)}(0,a.useImperativeHandle)(t,(function(){return{removeSelection:function(){B([])},getSelectedRows:function(){return s.filter((function(e){return null===z||void 0===z?void 0:z.includes(e[d])}))},setSelectedRows:function(e){B(e)}}}));var T=[];return(0,m.jsx)(x.Provider,{value:{showFooterSelectedCount:M,footerPaginationPosition:j,rowSelectionModel:z,rows:s,footerChildren:D},children:(0,m.jsx)(l._$,{slots:{loadingOverlay:u.Z,footer:g},initialState:{pagination:{paginationModel:{pageSize:35}}},loading:n,getRowId:function(e){return e[d]},columns:c.filter((function(e){return!e.hide})),rows:s,showCellVerticalBorder:!0,showColumnVerticalBorder:!0,checkboxSelection:S,rowSelectionModel:z,rowHeight:25,columnHeaderHeight:35,pageSizeOptions:[10,20,35,50,75,100],sx:(0,i.Z)((0,i.Z)({"& .cash":{color:"#ec4899"},"& .check":{color:"#0891b2"},"& .approved":{color:"green"},"& .pending":{color:"orange"},"& .disapproved":{color:"red"},"& .normal":{color:"red"},"& .MuiDataGrid-row.Mui-selected:hover":{color:"black","& .MuiSvgIcon-root ":{fill:"#3b82f6"}},"& .hover-keyboard":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiDataGrid-row:hover":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiDataGrid-row.hover":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiTablePagination-root p ":{padding:"0 !important"}},{"& .MuiDataGrid-columnHeaders":{background:"#64748b",color:"white",fontSize:"14px"},"& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer .MuiSvgIcon-root ":{display:f||p?"none":"block",fill:"white"},"& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer input ":{display:f||p?"none":"block"}}),{fontSize:13,fontWeight:500,"& .MuiDataGrid-checkboxInput":{height:"27px",width:"27px"},"& .MuiDataGrid-checkboxInput svg":{height:"20px",width:"20px"}}),onRowSelectionModelChange:function(e){if(p){if(e.length<=0)return;if(T=e,z.includes(T[T.length-1]))return;return B(e),void P([e[e.length-1]],s,null)}if(!p&&f)if(z&&(null===z||void 0===z?void 0:z.length)>0){var t=new Set(z);B(e.filter((function(e){return!t.has(e)})))}else B(e);else B(e);P([e[e.length-1]],s,null)},onCellKeyDown:function(e,t){if(["NumpadEnter","Enter","Delete","Backspace"].includes(t.code))return t.preventDefault(),"Enter"===t.code||"NumpadEnter"===t.code?f&&!p?B((function(n){return n&&n.length>0&&n[0]===e.rowNode.id?(P([],s,t.code),[]):(P([e.rowNode.id],s,t.code),[e.rowNode.id])})):void B((function(n){return n&&!p&&n.length>0&&n.includes(e.rowNode.id)?(n=n.filter((function(t){return t!==e.rowNode.id})),P([],s,t.code),n):n&&p&&n.length>0&&n.includes(e.rowNode.id)?n:(P([e.rowNode.id],s,t.code),[].concat((0,o.Z)(n),[e.rowNode.id]))})):"Delete"===t.code||"Backspace"===t.code?(B([e.rowNode.id]),P([e.rowNode.id],s,t.code)):void 0},disableVirtualization:!0,isRowSelectable:w,getCellClassName:C})})}));function g(e){var t=e.page,n=e.onPageChange,o=e.className,i=(0,s.l)(),r=(0,d.P)(i,f.UB);return(0,m.jsx)(h.Z,{variant:"outlined",color:"primary",className:o,count:r,page:t+1,onChange:function(e,t){n(e,t-1)}})}function w(e){return(0,m.jsx)(p.x,(0,i.Z)({ActionsComponent:g},e))}function b(e){var t=(0,a.useContext)(x),n=t.rowSelectionModel,o=t.showFooterSelectedCount,r=t.footerPaginationPosition,u=t.footerChildren,l=t.rows;return(0,m.jsxs)(c.Z,{sx:{columnGap:"50px",display:"flex",width:"100%",justifyContent:"space-between",px:3,alignItems:"center",flexDirection:"right-left"===r?"row-reverse":"row"},children:[(0,m.jsx)(w,(0,i.Z)({},e)),(0,m.jsxs)(c.Z,{sx:{display:"flex",justifyContent:"right-left"===r?"flex-start":"flex-end",flex:1,alignItems:"center"},children:[o&&(0,m.jsxs)("div",{children:["Selected:",null===n||void 0===n?void 0:n.length]}),(0,m.jsx)("div",{children:u(n,l)})]})]})}t.Z=v},44215:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return N},reducer:function(){return I},setNewStateValue:function(){return z},sublineColumn:function(){return M}});var o=n(74165),i=n(15861),r=n(29439),a=n(4942),u=n(1413),c=n(72791),l=n(64554),s=n(27391),d=n(36151),f=n(73766),p=n(42419),h=n(27247),m=n(4378),x=n(3380),v=n(91933),g=n(21830),w=n.n(g),b=n(79018),C=n(29823),y=n(53329),S=n(39709),Z=n(89767),D=n(64230),k=n(80184),j={Line:"",SublineName:"",search:"",mode:"",ID:""},I=function(e,t){return"UPDATE_FIELD"===t.type?(0,u.Z)((0,u.Z)({},e),{},(0,a.Z)({},t.field,t.value)):e},M=[{field:"ID",headerName:"ID",width:100,hide:!0},{field:"Line",headerName:"Line",flex:1},{field:"SublineName",headerName:"SubLine Name",flex:1},{field:"createdAt",headerName:"Created At",flex:1}],L="subline-account";function N(){var e,t,n,g,N,B,P,T=(0,c.useRef)(null),A=(0,c.useReducer)(I,j),F=(0,r.Z)(A,2),E=F[0],R=F[1],G=(0,c.useContext)(x.V),H=G.myAxios,O=G.user,_=(0,c.useState)([]),V=(0,r.Z)(_,2),U=V[0],q=V[1],K=(0,c.useRef)(null),W=(0,v.useQueryClient)(),Y=(0,v.useQuery)({queryKey:L,queryFn:function(){return(e=e||(0,i.Z)((0,o.Z)().mark((function e(){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,H.get("/reference/get-subline?sublineSearch=".concat(E.search),{headers:{Authorization:"Bearer ".concat(null===O||void 0===O?void 0:O.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){q(null===e||void 0===e?void 0:e.data.subline.subline)}}),Q=Y.data,X=Y.isLoading,$=Y.refetch,J=(0,v.useMutation)({mutationKey:L,mutationFn:function(e){return(t=t||(0,i.Z)((0,o.Z)().mark((function e(t){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,H.post("/reference/add-subline",t,{headers:{Authorization:"Bearer ".concat(null===O||void 0===O?void 0:O.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:le}),ee=J.mutate,te=J.isLoading,ne=(0,v.useMutation)({mutationKey:L,mutationFn:function(e){return(n=n||(0,i.Z)((0,o.Z)().mark((function e(t){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,H.post("/reference/update-subline",t,{headers:{Authorization:"Bearer ".concat(null===O||void 0===O?void 0:O.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:le}),oe=ne.mutate,ie=ne.isLoading,re=(0,v.useMutation)({mutationKey:L,mutationFn:function(e){return(g=g||(0,i.Z)((0,o.Z)().mark((function e(t){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,H.post("/reference/delete-subline",t,{headers:{Authorization:"Bearer ".concat(null===O||void 0===O?void 0:O.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:le}),ae=re.mutate,ue=re.isLoading,ce=function(e){var t=e.target,n=t.name,o=t.value;R({type:"UPDATE_FIELD",field:n,value:o})};function le(e){if(e.data.success)return W.invalidateQueries(L),de(),w().fire({position:"center",icon:"success",title:e.data.message,showConfirmButton:!1,timer:1500});w().fire({position:"center",icon:"error",title:e.data.message,showConfirmButton:!1,timer:1500})}function se(e){return""===E.Line?w().fire({position:"center",icon:"warning",title:"Line is required!",showConfirmButton:!1,timer:1500}):""===E.SublineName?w().fire({position:"center",icon:"warning",title:"Subline Name is required!",showConfirmButton:!1,timer:1500}):E.SublineName.length>=250?w().fire({position:"center",icon:"warning",title:"Subline Name is too long!",showConfirmButton:!1,timer:1500}):(e.preventDefault(),void("edit"===E.mode?(0,D.s)({isUpdate:!0,cb:function(e){oe((0,u.Z)((0,u.Z)({},E),{},{userCodeConfirmation:e}))}}):(0,D.L)({isConfirm:function(){ee(E)}})))}function de(){var e;z(R,j),null===(e=K.current)||void 0===e||e.removeSelection(),(0,b.D)(500).then((function(){$()}))}return(0,k.jsxs)("div",{style:{display:"flex",flexDirection:"column",width:"100%",height:"100%",flex:1},children:[(0,k.jsxs)(l.Z,{sx:function(e){return(0,a.Z)({display:"flex",alignItems:"center",columnGap:"20px"},e.breakpoints.down("sm"),{flexDirection:"column",alignItems:"flex-start",flex:1,marginBottom:"15px"})},children:[(0,k.jsx)("div",{style:{marginTop:"10px",marginBottom:"12px",width:"100%"},children:(0,k.jsx)(s.Z,{label:"Search",fullWidth:!0,size:"small",type:"text",name:"search",value:E.search,onChange:ce,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{width:"500px",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),$()}})}),(0,k.jsx)("div",{style:{display:"flex",alignItems:"center",columnGap:"20px"},children:(0,k.jsxs)("div",{style:{display:"flex",alignItems:"center",columnGap:"5px"},children:[""===E.mode&&(0,k.jsx)(d.Z,{sx:{height:"30px",fontSize:"11px"},variant:"contained",startIcon:(0,k.jsx)(p.Z,{}),id:"entry-header-save-button",onClick:function(){ce({target:{value:"add",name:"mode"}})},children:"New"}),(0,k.jsx)(S.Z,{sx:{height:"30px",fontSize:"11px"},id:"save-entry-header",color:"primary",variant:"contained",type:"submit",onClick:se,disabled:""===E.mode,startIcon:(0,k.jsx)(y.Z,{}),children:"Save"}),""!==E.mode&&(0,k.jsx)(d.Z,{sx:{height:"30px",fontSize:"11px"},variant:"contained",startIcon:(0,k.jsx)(C.Z,{}),color:"error",onClick:function(){w().fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, cancel it!"}).then((function(e){e.isConfirmed&&de()}))},children:"Cancel"}),(0,k.jsx)(d.Z,{id:"save-entry-header",variant:"contained",sx:{height:"30px",fontSize:"11px",backgroundColor:m.Z[500],"&:hover":{backgroundColor:m.Z[600]}},disabled:"edit"!==E.mode,startIcon:(0,k.jsx)(h.Z,{}),onClick:function(){(0,D.s)({isUpdate:!1,cb:function(e){ae({ID:E.ID,userCodeConfirmation:e})}})},children:"Delete"})]})})]}),(0,k.jsx)("form",{onSubmit:se,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),void se(e)},children:(0,k.jsxs)(l.Z,{sx:function(e){return(0,a.Z)({display:"flex",columnGap:"15px",flexDirection:"row"},e.breakpoints.down("md"),{flexDirection:"column",rowGap:"10px"})},children:[X?(0,k.jsx)(S.Z,{loading:X}):(0,k.jsx)(f.Z,{disabled:""===E.mode,value:E.Line,onChange:function(e,t){ce({target:{name:"Line",value:t}})},size:"small",freeSolo:!0,disableClearable:!0,options:null===(N=Q.data)||void 0===N||null===(B=N.subline)||void 0===B?void 0:B.line.map((function(e){return e.Line})),getOptionLabel:function(e){return e},renderInput:function(e){return(0,k.jsx)(s.Z,(0,u.Z)((0,u.Z)({required:!0},e),{},{label:"Line",name:"Line",InputProps:(0,u.Z)((0,u.Z)({},e.InputProps),{},{style:{height:"27px",fontSize:"14px"}}),onChange:ce,sx:{height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}))},sx:{width:300,".MuiFormLabel-root":{fontSize:"14px"},".MuiInputBase-input":{width:"100% !important"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"},".MuiAutocomplete-input ":{position:"absolute"}}}),(0,k.jsx)(s.Z,{required:!0,type:"text",variant:"outlined",size:"small",label:"SublineName",name:"SublineName",value:E.SublineName,onChange:ce,disabled:""===E.mode,fullWidth:!0,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{width:"500px",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}})]})}),(0,k.jsx)("div",{ref:T,style:{marginTop:"10px",width:"100%",position:"relative",flex:1},children:(0,k.jsx)(l.Z,{style:{height:"".concat(null===(P=T.current)||void 0===P?void 0:P.getBoundingClientRect().height,"px"),width:"100%",overflowX:"scroll",position:"absolute"},children:(0,k.jsx)(Z.Z,{ref:K,isLoading:X||te||ie||ue,columns:M,rows:U,table_id:"ID",isSingleSelection:!0,isRowFreeze:!1,dataSelection:function(e,t,n){var o=t.filter((function(t){return t.ID===e[0]}))[0];if(void 0===o||o.length<=0)return z(R,j),void ce({target:{value:"",name:"mode"}});ce({target:{value:"edit",name:"mode"}}),"Delete"!==n&&"Backspace"!==n?z(R,o):(0,D.s)({isUpdate:!1,cb:function(e){ae({ID:o.ID,userCodeConfirmation:e})}})}})})})]})}function z(e,t){Object.entries(t).forEach((function(t){var n=(0,r.Z)(t,2),o=n[0],i=n[1];e({type:"UPDATE_FIELD",field:o,value:i})}))}},64230:function(e,t,n){"use strict";n.d(t,{L:function(){return c},s:function(){return u}});var o=n(74165),i=n(15861),r=n(21830),a=n.n(r);function u(e){var t;a().fire({title:"Are you sure!",html:null!==e&&void 0!==e&&e.text?null===e||void 0===e?void 0:e.text:e.isUpdate?"Are you sure you want to make this change?":"Are you sure you want to delete this?",icon:"warning",input:"text",inputAttributes:{autocapitalize:"off"},showCancelButton:!0,confirmButtonText:"Save",confirmButtonColor:"green",showLoaderOnConfirm:!0,preConfirm:function(n){return(t=t||(0,i.Z)((0,o.Z)().mark((function t(n){return(0,o.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:try{e.cb(n)}catch(o){a().showValidationMessage("\n            Request failed: ".concat(o,"\n          "))}case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)},allowOutsideClick:function(){return!a().isLoading()}}).then((function(t){if(t.isConfirmed&&e.isConfirm)return e.isConfirm();e.isDeclined&&e.isDeclined()}))}function c(e){a().fire({title:"Are you sure?",text:null!==e&&void 0!==e&&e.text?null===e||void 0===e?void 0:e.text:"Do you want to proceed with saving?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, save it!"}).then((function(t){if(t.isConfirmed&&e.isConfirm)return e.isConfirm();e.isDeclined&&e.isDeclined()}))}},42419:function(e,t,n){"use strict";var o=n(64836);t.Z=void 0;var i=o(n(45649)),r=n(80184),a=(0,i.default)((0,r.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");t.Z=a},27247:function(e,t,n){"use strict";var o=n(64836);t.Z=void 0;var i=o(n(45649)),r=n(80184),a=(0,i.default)((0,r.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");t.Z=a},53329:function(e,t,n){"use strict";var o=n(64836);t.Z=void 0;var i=o(n(45649)),r=n(80184),a=(0,i.default)((0,r.jsx)("path",{d:"M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"}),"Save");t.Z=a},4378:function(e,t){"use strict";t.Z={50:"#fce4ec",100:"#f8bbd0",200:"#f48fb1",300:"#f06292",400:"#ec407a",500:"#e91e63",600:"#d81b60",700:"#c2185b",800:"#ad1457",900:"#880e4f",A100:"#ff80ab",A200:"#ff4081",A400:"#f50057",A700:"#c51162"}},80888:function(e,t,n){"use strict";var o=n(79047);function i(){}function r(){}r.resetWarningCache=i,e.exports=function(){function e(e,t,n,i,r,a){if(a!==o){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:r,resetWarningCache:i};return n.PropTypes=n,n}},52007:function(e,t,n){e.exports=n(80888)()},79047:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}}]);
//# sourceMappingURL=9469.bab46f80.chunk.js.map