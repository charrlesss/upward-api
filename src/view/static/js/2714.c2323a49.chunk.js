(self.webpackChunkupward=self.webpackChunkupward||[]).push([[2714],{81582:function(e,n,t){"use strict";t.d(n,{XT:function(){return m},ZP:function(){return p},rO:function(){return v}});t(72791);var o=t(88447),i=t(64554),r=t(20890),a=t(27391),c=t(63466),l=t(13400),u=t(29823),s=t(89767),d=t(5403),f=t(80184),h={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"70%",bgcolor:"background.paper",boxShadow:24,p:4,heigth:"auto"};function p(e){var n=e.height,t=e.isLoading,p=(e.queryKey,e.columns),x=e.onSelectionChange,g=(e.setRows,e.rows),w=e.id,y=e.onCloseModal,b=e.showModal,C=e.onClickCloseIcon,k=e.searchOnChange,Z=e.title,D=void 0===Z?"":Z,N=e.searchRef,S=(e.onCellKeyDown,e.onSearchKeyEnter),A=void 0===S?function(){}:S,I=e.isRowSelectable,j=e.getCellClassName,M=m();return(0,f.jsx)(o.Z,{open:b,onClose:y,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:(0,f.jsxs)(i.Z,{sx:h,children:[(0,f.jsx)(r.Z,{id:"modal-modal-title",variant:"h6",component:"h2",mb:2,children:D}),(0,f.jsx)(a.Z,{size:"small",label:"Search",fullWidth:!0,onChange:k,InputProps:{inputRef:N,style:{height:"27px",fontSize:"14px"},endAdornment:(0,f.jsx)(c.Z,{position:"end",children:(0,f.jsx)(l.Z,{onClick:function(){var e;A(null===N||void 0===N||null===(e=N.current)||void 0===e?void 0:e.value)},edge:"end",children:(0,f.jsx)(d.Z,{})})})},type:"search",onKeyDown:function(e){var n;"Enter"!==e.code&&"NumpadEnter"!==e.code||(e.preventDefault(),A(null===N||void 0===N||null===(n=N.current)||void 0===n?void 0:n.value));v(e,M,null===N||void 0===N?void 0:N.current)},sx:{marginBottom:"10px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,f.jsx)("div",{className:"".concat(M," main-table-selection-container"),style:{position:"relative",height:"".concat(n+20,"px")},children:(0,f.jsx)(s.Z,{isSingleSelection:!0,isRowFreeze:!1,columns:p,isLoading:t,dataSelection:function(e,n,t){x(e,n)},table_id:w,rows:g,isRowSelectable:I,getCellClassName:j})}),(0,f.jsx)("div",{style:{position:"absolute",top:"10px",right:"10px"},children:(0,f.jsx)(l.Z,{"aria-label":"search-client",color:"secondary",onClick:C,children:(0,f.jsx)(u.Z,{})})})]})})}function m(){return"main-"+Math.floor(1e4*Math.random())}function v(e,n,t){var o=n;if("ArrowDown"===e.code){var i,r=document.querySelectorAll(".".concat(o," .MuiDataGrid-row"));e.preventDefault(),null===(i=r[0])||void 0===i||i.classList.add("hover-keyboard"),function(e,n){var t=document.querySelector(".".concat(e," .MuiDataGrid-row")),o=null===t||void 0===t?void 0:t.querySelector("input");null===o||void 0===o||o.focus();var i=new MouseEvent("mouseenter",{bubbles:!0,cancelable:!0,view:window});null===t||void 0===t||t.dispatchEvent(i),null===o||void 0===o||o.addEventListener("keydown",(function(e){"ArrowUp"===e.key&&(e.preventDefault(),n.focus()),"ArrowUp"===e.key&&(null===t||void 0===t||t.classList.remove("hover-keyboard"))}))}(n,t),r.forEach((function(e,n){e.addEventListener("keydown",(function(e){if("ArrowUp"===e.key){var t,o;if(n<=0)return;return e.preventDefault(),null===(t=r[n])||void 0===t||t.classList.remove("hover-keyboard"),void(null===(o=r[n-1])||void 0===o||o.classList.add("hover-keyboard"))}if("ArrowDown"===e.key){var i,a;if(e.preventDefault(),n>=r.length-1)return;null===(i=r[n])||void 0===i||i.classList.remove("hover-keyboard"),null===(a=r[n+1])||void 0===a||a.classList.add("hover-keyboard")}}))}))}}},89767:function(e,n,t){"use strict";var o=t(93433),i=t(1413),r=t(29439),a=t(72791),c=t(57482),l=t(64554),u=t(56214),s=t(29961),d=t(54277),f=t(70169),h=t(6484),p=t(16088),m=t(80184),v=(0,a.createContext)({rows:[],rowSelectionModel:[],footerChildren:function(){return(0,m.jsx)("div",{})},footerPaginationPosition:"right-left",showFooterSelectedCount:!0}),x=(0,a.forwardRef)((function(e,n){var t=e.isLoading,l=e.columns,s=e.rows,d=e.table_id,f=e.isSingleSelection,h=e.isRowFreeze,p=e.dataSelection,x=e.CustomFooterComponent,g=void 0===x?y:x,w=e.isRowSelectable,b=e.getCellClassName,C=e.checkboxSelection,k=void 0===C||C,Z=e.footerChildren,D=void 0===Z?function(e,n){return(0,m.jsx)("div",{})}:Z,N=e.footerPaginationPosition,S=void 0===N?"right-left":N,A=e.showFooterSelectedCount,I=void 0===A||A,j=(0,a.useState)([]),M=(0,r.Z)(j,2),_=M[0],z=M[1];function B(e,n,t){p&&p(e,n,t)}(0,a.useImperativeHandle)(n,(function(){return{removeSelection:function(){z([])},getSelectedRows:function(){return s.filter((function(e){return null===_||void 0===_?void 0:_.includes(e[d])}))},setSelectedRows:function(e){z(e)}}}));var L=[];return(0,m.jsx)(v.Provider,{value:{showFooterSelectedCount:I,footerPaginationPosition:S,rowSelectionModel:_,rows:s,footerChildren:D},children:(0,m.jsx)(u._$,{slots:{loadingOverlay:c.Z,footer:g},initialState:{pagination:{paginationModel:{pageSize:35}}},loading:t,getRowId:function(e){return e[d]},columns:l.filter((function(e){return!e.hide})),rows:s,showCellVerticalBorder:!0,showColumnVerticalBorder:!0,checkboxSelection:k,rowSelectionModel:_,rowHeight:25,columnHeaderHeight:35,pageSizeOptions:[10,20,35,50,75,100],sx:(0,i.Z)((0,i.Z)({"& .cash":{color:"#ec4899"},"& .check":{color:"#0891b2"},"& .approved":{color:"green"},"& .pending":{color:"orange"},"& .disapproved":{color:"red"},"& .normal":{color:"red"},"& .MuiDataGrid-row.Mui-selected:hover":{color:"black","& .MuiSvgIcon-root ":{fill:"#3b82f6"}},"& .hover-keyboard":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiDataGrid-row:hover":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiDataGrid-row.hover":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiTablePagination-root p ":{padding:"0 !important"}},{"& .MuiDataGrid-columnHeaders":{background:"#64748b",color:"white",fontSize:"14px"},"& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer .MuiSvgIcon-root ":{display:f||h?"none":"block",fill:"white"},"& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer input ":{display:f||h?"none":"block"}}),{fontSize:13,fontWeight:500,"& .MuiDataGrid-checkboxInput":{height:"27px",width:"27px"},"& .MuiDataGrid-checkboxInput svg":{height:"20px",width:"20px"}}),onRowSelectionModelChange:function(e){if(h){if(e.length<=0)return;if(L=e,_.includes(L[L.length-1]))return;return z(e),void B([e[e.length-1]],s,null)}if(!h&&f)if(_&&(null===_||void 0===_?void 0:_.length)>0){var n=new Set(_);z(e.filter((function(e){return!n.has(e)})))}else z(e);else z(e);B([e[e.length-1]],s,null)},onCellKeyDown:function(e,n){if(["NumpadEnter","Enter","Delete","Backspace"].includes(n.code))return n.preventDefault(),"Enter"===n.code||"NumpadEnter"===n.code?f&&!h?z((function(t){return t&&t.length>0&&t[0]===e.rowNode.id?(B([],s,n.code),[]):(B([e.rowNode.id],s,n.code),[e.rowNode.id])})):void z((function(t){return t&&!h&&t.length>0&&t.includes(e.rowNode.id)?(t=t.filter((function(n){return n!==e.rowNode.id})),B([],s,n.code),t):t&&h&&t.length>0&&t.includes(e.rowNode.id)?t:(B([e.rowNode.id],s,n.code),[].concat((0,o.Z)(t),[e.rowNode.id]))})):"Delete"===n.code||"Backspace"===n.code?(z([e.rowNode.id]),B([e.rowNode.id],s,n.code)):void 0},disableVirtualization:!0,isRowSelectable:w,getCellClassName:b})})}));function g(e){var n=e.page,t=e.onPageChange,o=e.className,i=(0,s.l)(),r=(0,d.P)(i,f.UB);return(0,m.jsx)(p.Z,{variant:"outlined",color:"primary",className:o,count:r,page:n+1,onChange:function(e,n){t(e,n-1)}})}function w(e){return(0,m.jsx)(h.x,(0,i.Z)({ActionsComponent:g},e))}function y(e){var n=(0,a.useContext)(v),t=n.rowSelectionModel,o=n.showFooterSelectedCount,r=n.footerPaginationPosition,c=n.footerChildren,u=n.rows;return(0,m.jsxs)(l.Z,{sx:{columnGap:"50px",display:"flex",width:"100%",justifyContent:"space-between",px:3,alignItems:"center",flexDirection:"right-left"===r?"row-reverse":"row"},children:[(0,m.jsx)(w,(0,i.Z)({},e)),(0,m.jsxs)(l.Z,{sx:{display:"flex",justifyContent:"right-left"===r?"flex-start":"flex-end",flex:1,alignItems:"center"},children:[o&&(0,m.jsxs)("div",{children:["Selected:",null===t||void 0===t?void 0:t.length]}),(0,m.jsx)("div",{children:c(t,u)})]})]})}n.Z=x},69372:function(e,n,t){"use strict";t.r(n),t.d(n,{bankAccountColumn:function(){return R},bannkColumn:function(){return q},chartColumn:function(){return P},clientColumn:function(){return K},default:function(){return U},reducer:function(){return T},setNewStateValue:function(){return O}});var o=t(74165),i=t(15861),r=t(29439),a=t(4942),c=t(1413),l=t(72791),u=t(64554),s=t(27391),d=t(36151),f=t(85523),h=t(94454),p=t(68096),m=t(94925),v=t(77196),x=t(63466),g=t(13400),w=t(78946),y=t(42419),b=t(27247),C=t(93421),k=t(4378),Z=t(3380),D=t(91933),N=t(21830),S=t.n(N),A=t(79018),I=t(29823),j=t(53329),M=t(91421),_=t(39709),z=t(93263),B=t(89767),L=t(64230),F=t(80184),E={Account_No:"",Account_Name:"",Account_Type:"",Desc:"",Option:0,Account_ID:"",Inactive:!1,IDNo:"",Account_ID_Name:"",Identity:"",BankName:"",Auto:"",mode:"",search:""},T=function(e,n){return"UPDATE_FIELD"===n.type?(0,c.Z)((0,c.Z)({},e),{},(0,a.Z)({},n.field,n.value)):e},R=[{field:"Auto",headerName:"Auto",hide:!0},{field:"Account_No",headerName:"Account No#",width:300},{field:"Account_Name",headerName:"Account Name",flex:1},{field:"Account_Type",headerName:"Account Type",flex:1},{field:"Desc",headerName:"Bank Name",flex:1},{field:"Account_ID",headerName:"Account ID",flex:1},{field:"Inactive",headerName:"Inactive",flex:1},{field:"IDNo",headerName:"ID No",flex:1},{field:"Identity",headerName:"Identity",flex:1}],P=[{field:"Acct_Code",headerName:"Code",flex:1},{field:"Acct_Title",headerName:"Title",flex:1},{field:"Short",headerName:"Short Name",flex:1}],q=[{field:"Bank_Code",headerName:"Code",flex:1},{field:"Bank",headerName:"Bank Name",flex:1}],K=[{field:"entry_client_id",headerName:"ID",width:130},{field:"fullname",headerName:"First Name",flex:1},{field:"entry_type",headerName:"ID Type",width:150}];function U(){var e,n,t,N,K,U=(0,l.useRef)(null),G=(0,l.useReducer)(T,E),H=(0,r.Z)(G,2),V=H[0],W=H[1],Q=(0,l.useContext)(Z.V),Y=Q.myAxios,X=Q.user,$=(0,l.useState)([]),J=(0,r.Z)($,2),ee=J[0],ne=J[1],te=(0,l.useRef)(null),oe=(0,D.useQueryClient)(),ie=(0,l.useRef)(null),re=(0,D.useQuery)({queryKey:"bank-account-trans",queryFn:function(){return(e=e||(0,i.Z)((0,o.Z)().mark((function e(){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Y.get("/reference/get-bank-account?bankAccountSearch=".concat(V.search),{headers:{Authorization:"Bearer ".concat(null===X||void 0===X?void 0:X.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){ne(null===e||void 0===e?void 0:e.data.bankAccount)}}),ae=re.isLoading,ce=re.refetch,le=(0,D.useMutation)({mutationKey:"bank-account-actions",mutationFn:function(e){return(n=n||(0,i.Z)((0,o.Z)().mark((function e(n){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Y.post("/reference/add-bank-account",n,{headers:{Authorization:"Bearer ".concat(null===X||void 0===X?void 0:X.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:Le}),ue=le.mutate,se=le.isLoading,de=(0,D.useMutation)({mutationKey:"bank-account-actions",mutationFn:function(e){return(t=t||(0,i.Z)((0,o.Z)().mark((function e(n){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Y.post("/reference/update-bank-account",n,{headers:{Authorization:"Bearer ".concat(null===X||void 0===X?void 0:X.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:Le}),fe=de.mutate,he=de.isLoading,pe=(0,D.useMutation)({mutationKey:"bank-account-actions",mutationFn:function(e){return(N=N||(0,i.Z)((0,o.Z)().mark((function e(n){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Y.post("/reference/delete-bank-account",n,{headers:{Authorization:"Bearer ".concat(null===X||void 0===X?void 0:X.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:Le}),me=pe.mutate,ve=pe.isLoading,xe=(0,z.Z)({link:{url:"/reference/get-banks",queryUrlName:"bankSearch"},columns:q,queryKey:"get-banks",uniqueId:"Bank_Code",responseDataKey:"bank",onSelected:function(e){W({type:"UPDATE_FIELD",field:"BankName",value:e[0].Bank}),W({type:"UPDATE_FIELD",field:"Desc",value:e[0].Bank_Code}),be()},searchRef:te}),ge=xe.ModalComponent,we=xe.openModal,ye=xe.isLoading,be=xe.closeModal,Ce=(0,z.Z)({link:{url:"/reference/get-chart-accounts",queryUrlName:"chartAccountSearch"},columns:P,queryKey:"get-chart-accounts",uniqueId:"Acct_Code",responseDataKey:"chartAccount",onSelected:function(e,n){W({type:"UPDATE_FIELD",field:"Account_ID_Name",value:e[0].Acct_Title}),W({type:"UPDATE_FIELD",field:"Account_ID",value:e[0].Acct_Code}),Ne()},searchRef:te}),ke=Ce.ModalComponent,Ze=Ce.openModal,De=Ce.isLoading,Ne=Ce.closeModal,Se=(0,z.Z)({link:{url:"/reference/search-client",queryUrlName:"searchClientInput"},columns:[{field:"IDNo",headerName:"ID No.",width:150},{field:"Name",headerName:"Name",flex:1},{field:"ID",headerName:"ID",hide:!0}],queryKey:"search-client",uniqueId:"ID",responseDataKey:"client",onSelected:function(e,n){W({type:"UPDATE_FIELD",field:"IDNo",value:e[0].IDNo}),W({type:"UPDATE_FIELD",field:"Identity",value:e[0].Name}),Me()},searchRef:te}),Ae=Se.ModalComponent,Ie=Se.openModal,je=Se.isLoading,Me=Se.closeModal,_e=function(e){var n=e.target,t=n.name,o=n.value;W({type:"UPDATE_FIELD",field:t,value:o})};function ze(e){return e.preventDefault(),""===V.Account_No?S().fire({position:"center",icon:"warning",title:"Account No is Required Field",showConfirmButton:!1,timer:1500}):""===V.Account_Name?S().fire({position:"center",icon:"warning",title:"Account Name is Required Field",showConfirmButton:!1,timer:1500}):""===V.Account_Type?S().fire({position:"center",icon:"warning",title:"Account Type is Required Field",showConfirmButton:!1,timer:1500}):""===V.Account_ID?S().fire({position:"center",icon:"warning",title:"Account ID is Required Field",showConfirmButton:!1,timer:1500}):""===V.BankName?S().fire({position:"center",icon:"warning",title:"Bank is Required Field",showConfirmButton:!1,timer:1500}):""===V.Identity?S().fire({position:"center",icon:"warning",title:"Identity is Required Field",showConfirmButton:!1,timer:1500}):V.Account_No.length>=200?S().fire({position:"center",icon:"warning",title:"Account No is too long",showConfirmButton:!1,timer:1500}):V.Account_Name>=200?S().fire({position:"center",icon:"warning",title:"Account Name is too long",showConfirmButton:!1,timer:1500}):V.Account_Type>=200?S().fire({position:"center",icon:"warning",title:"Account Type is too long",showConfirmButton:!1,timer:1500}):V.Account_ID>=200?S().fire({position:"center",icon:"warning",title:"Account ID is too long",showConfirmButton:!1,timer:1500}):V.BankName>=200?S().fire({position:"center",icon:"warning",title:"invalid Bank is too long",showConfirmButton:!1,timer:1500}):V.Identity>=200?S().fire({position:"center",icon:"warning",title:"invalid identity is too long",showConfirmButton:!1,timer:1500}):void("edit"===V.mode?(0,L.s)({isUpdate:!0,cb:function(e){fe((0,c.Z)((0,c.Z)({},V),{},{userCodeConfirmation:e}))}}):(0,L.L)({isConfirm:function(){ue(V)}}))}function Be(){var e;O(W,E),null===(e=ie.current)||void 0===e||e.removeSelection(),(0,A.D)(500).then((function(){ce()}))}function Le(e){if(e.data.success)return oe.invalidateQueries("bank-account-trans"),Be(),S().fire({position:"center",icon:"success",title:e.data.message,showConfirmButton:!1,timer:1500});S().fire({position:"center",icon:"error",title:e.data.message,showConfirmButton:!1,timer:1500})}return(0,F.jsxs)("div",{style:{display:"flex",flexDirection:"column",width:"100%",height:"100%",flex:1},children:[(0,F.jsxs)(u.Z,{sx:function(e){return(0,a.Z)({display:"flex",alignItems:"center",columnGap:"20px"},e.breakpoints.down("sm"),{flexDirection:"column",alignItems:"flex-start",marginBottom:"15px"})},children:[(0,F.jsx)("div",{style:{marginTop:"10px",marginBottom:"12px",width:"100%"},children:(0,F.jsx)(s.Z,{label:"Search",fullWidth:!0,size:"small",type:"text",name:"search",value:V.search,onChange:_e,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),ce()}})}),(0,F.jsx)("div",{style:{display:"flex",alignItems:"center",columnGap:"20px"},children:(0,F.jsxs)("div",{style:{display:"flex",alignItems:"center",columnGap:"5px"},children:[""===V.mode&&(0,F.jsx)(d.Z,{sx:{height:"30px",fontSize:"11px"},variant:"contained",startIcon:(0,F.jsx)(y.Z,{}),id:"entry-header-save-button",onClick:function(){_e({target:{value:"add",name:"mode"}})},children:"New"}),(0,F.jsx)(_.Z,{sx:{height:"30px",fontSize:"11px"},id:"save-entry-header",color:"primary",variant:"contained",type:"submit",onClick:ze,startIcon:(0,F.jsx)(j.Z,{}),loading:se||he,disabled:""===V.mode,children:"Save"}),""!==V.mode&&(0,F.jsx)(d.Z,{sx:{height:"30px",fontSize:"11px"},variant:"contained",startIcon:(0,F.jsx)(I.Z,{}),color:"error",onClick:function(){S().fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, cancel it!"}).then((function(e){e.isConfirmed&&Be()}))},children:"Cancel"}),(0,F.jsx)(_.Z,{id:"save-entry-header",variant:"contained",loading:ve,sx:{height:"30px",fontSize:"11px",backgroundColor:k.Z[500],"&:hover":{backgroundColor:k.Z[600]}},startIcon:(0,F.jsx)(b.Z,{}),disabled:"edit"!==V.mode,onClick:function(){(0,L.s)({isUpdate:!1,cb:function(e){me({Auto:V.Auto,userCodeConfirmation:e})}})},children:"Delete"})]})})]}),(0,F.jsxs)("form",{onKeyDown:function(e){if(!["Account_ID_Name","BankName","IDNo"].includes(e.target.name))return"Enter"===e.code||"NumpadEnter"===e.code?(e.preventDefault(),void ze(e)):void 0;"Enter"!==e.code&&"NumpadEnter"!==e.code||e.preventDefault()},children:[(0,F.jsx)(u.Z,{sx:function(e){return(0,a.Z)({width:"100%",display:"flex",columnGap:"15px"},e.breakpoints.down("sm"),{flexDirection:"column",rowGap:"10px"})},children:!ae&&(0,F.jsxs)(l.Fragment,{children:[(0,F.jsx)(s.Z,{required:!0,variant:"outlined",size:"small",label:"Account No",name:"Account_No",value:V.Account_No,onChange:_e,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{flex:1,height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},disabled:""===V.mode||"edit"===V.mode}),(0,F.jsx)(s.Z,{required:!0,variant:"outlined",size:"small",label:"Account Name",name:"Account_Name",value:V.Account_Name,onChange:_e,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{flex:1,height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},disabled:""===V.mode}),(0,F.jsx)(s.Z,{required:!0,variant:"outlined",size:"small",label:"Account Type",name:"Account_Type",value:V.Account_Type,onChange:_e,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{flex:1,height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},disabled:""===V.mode}),(0,F.jsx)(f.Z,{sx:{".MuiTypography-root":{fontSize:"14px"},minWidth:"200px"},disabled:""===V.mode,control:(0,F.jsx)(h.Z,{size:"small",name:"Inactive",checked:V.Inactive,onChange:function(e){W({type:"UPDATE_FIELD",field:"Inactive",value:e.target.checked})}}),label:"Mark as Inactive"})]})}),(0,F.jsx)("br",{}),(0,F.jsxs)(u.Z,{sx:function(e){return(0,a.Z)({width:"100%",display:"flex",columnGap:"15px",gap:"20px",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px",position:"relative"},e.breakpoints.down("sm"),{flexDirection:"column",rowGap:"10px"})},children:[(0,F.jsx)("span",{style:{position:"absolute",top:"-12px",left:"20px",background:"white",padding:"0 5px"},children:"Deposit Slip"}),ye?(0,F.jsx)(_.Z,{loading:ye}):(0,F.jsxs)(p.Z,{disabled:""===V.mode,variant:"outlined",size:"small",sx:{flex:1,".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,F.jsx)(m.Z,{htmlFor:"Bank",children:"Bank"}),(0,F.jsx)(v.Z,{disabled:""===V.mode,sx:{height:"27px",fontSize:"14px"},fullWidth:!0,label:"Bank",name:"BankName",value:V.BankName,onChange:_e,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),we(V.BankName)},id:"Bank",endAdornment:(0,F.jsx)(x.Z,{position:"end",children:(0,F.jsx)(g.Z,{disabled:""===V.mode,color:"secondary",edge:"end",onClick:function(){we(V.BankName)},children:(0,F.jsx)(w.Z,{})})})})]}),De?(0,F.jsx)(_.Z,{loading:De}):(0,F.jsxs)(p.Z,{disabled:""===V.mode,variant:"outlined",size:"small",sx:{flex:1,".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,F.jsx)(m.Z,{htmlFor:"account",children:"Account"}),(0,F.jsx)(v.Z,{disabled:""===V.mode,sx:{height:"27px",fontSize:"14px"},fullWidth:!0,label:"Account",name:"Account_ID_Name",value:V.Account_ID_Name,onChange:_e,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),Ze(V.Account_ID_Name)},id:"account",endAdornment:(0,F.jsx)(x.Z,{position:"end",children:(0,F.jsx)(g.Z,{disabled:""===V.mode,color:"secondary",edge:"end",onClick:function(){Ze(V.Account_ID_Name)},children:(0,F.jsx)(C.Z,{})})})})]}),je?(0,F.jsx)(_.Z,{loading:je}):(0,F.jsxs)(p.Z,{disabled:""===V.mode,variant:"outlined",size:"small",sx:{flex:1,".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,F.jsx)(m.Z,{htmlFor:"ID-No",children:"ID No"}),(0,F.jsx)(v.Z,{disabled:""===V.mode,sx:{height:"27px",fontSize:"14px"},fullWidth:!0,label:"ID No",name:"IDNo",value:V.IDNo,onChange:_e,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),Ie(V.IDNo)},id:"ID-No",endAdornment:(0,F.jsx)(x.Z,{position:"end",children:(0,F.jsx)(g.Z,{disabled:""===V.mode,"aria-label":"search-client",color:"secondary",edge:"end",onClick:function(){Ie(V.IDNo)},children:(0,F.jsx)(M.Z,{})})})})]}),(0,F.jsx)(s.Z,{disabled:""===V.mode,required:!0,variant:"outlined",size:"small",label:"Identity",name:"Identity",value:V.Identity,onChange:_e,InputProps:{readOnly:!0,style:{height:"27px",fontSize:"14px"}},sx:{flex:1,height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}})]})]}),(0,F.jsx)("div",{ref:U,style:{marginTop:"10px",width:"100%",position:"relative",flex:1},children:(0,F.jsx)(u.Z,{style:{height:"".concat(null===(K=U.current)||void 0===K?void 0:K.getBoundingClientRect().height,"px"),width:"100%",overflowX:"scroll",position:"absolute"},children:(0,F.jsx)(B.Z,{ref:ie,isLoading:ae||se||he||ve,columns:R,rows:ee,table_id:"Auto",isSingleSelection:!0,isRowFreeze:!1,dataSelection:function(e,n,t){var o=n.filter((function(n){return n.Auto===e[0]}))[0];if(void 0===o||o.length<=0)return O(W,E),void _e({target:{value:"",name:"mode"}});if(_e({target:{value:"edit",name:"mode"}}),"Delete"!==t&&"Backspace"!==t){var i=(0,c.Z)((0,c.Z)({},o),{},{Inactive:"NO"!==o.Inactive});console.log(i),O(W,i)}else(0,L.s)({isUpdate:!1,cb:function(e){me({Auto:o.Auto,userCodeConfirmation:e})}})}})})}),Ae,ke,ge]})}function O(e,n){Object.entries(n).forEach((function(n){var t=(0,r.Z)(n,2),o=t[0],i=t[1];e({type:"UPDATE_FIELD",field:o,value:i})}))}},93263:function(e,n,t){"use strict";var o,i=t(29439),r=t(74165),a=t(15861),c=t(72791),l=t(91933),u=t(3380),s=t(81582),d=t(54164),f=t(80184);function h(e,n,t){return(o=o||(0,a.Z)((0,r.Z)().mark((function e(n,t,o){var i,a=arguments;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=a.length>3&&void 0!==a[3]?a[3]:"",e.abrupt("return",n.get("".concat(null===o||void 0===o?void 0:o.url,"?").concat(null===o||void 0===o?void 0:o.queryUrlName,"=").concat(i),{headers:{Authorization:"Bearer ".concat(null===t||void 0===t?void 0:t.accessToken)}}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}n.Z=function(e){var n,t,o=e.link,p=e.uniqueId,m=e.queryKey,v=e.responseDataKey,x=e.columns,g=e.onSelected,w=void 0===g?function(){}:g,y=e.onRemoveSelected,b=void 0===y?function(){}:y,C=e.onSuccess,k=void 0===C?function(){}:C,Z=e.searchRef,D=e.onCellKeyDown,N=e.onCloseFunction,S=void 0===N?function(){}:N,A=e.CustomizeAxios,I=void 0===A?h:A,j=e.isRowSelectable,M=e.getCellClassName,_=(0,c.useContext)(u.V),z=_.myAxios,B=_.user,L=(0,c.useState)(!1),F=(0,i.Z)(L,2),E=F[0],T=F[1],R=(0,c.useState)([]),P=(0,i.Z)(R,2),q=P[0],K=P[1];function U(){return(n=n||(0,a.Z)((0,r.Z)().mark((function e(){var n,t=arguments;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.length>0&&void 0!==t[0]?t[0]:"",e.next=3,I(z,B,o,n);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var O=(0,l.useQuery)({queryKey:m,queryFn:function(){return(t=t||(0,a.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,U();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){var n=e;K(n.data[v]),k(n)},refetchOnWindowFocus:!1}),G=O.isLoading,H=O.refetch;return{show:E,rows:q,isLoading:G,openModal:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";(0,d.flushSync)((function(){T(!0)})),null!==Z&&void 0!==Z&&Z.current&&(Z.current.value=e,U(e).then((function(e){if(null===e||void 0===e||!e.data.success)return alert("Error : ".concat(null===e||void 0===e?void 0:e.data.message));K(e.data[v]),null!==Z&&void 0!==Z&&Z.current&&Z.current.focus()})))},closeModal:function(){var e;(T(!1),S)&&S(null===Z||void 0===Z||null===(e=Z.current)||void 0===e?void 0:e.value)},ModalComponent:(0,f.jsx)(s.ZP,{getCellClassName:M,searchRef:Z,showModal:E,onCloseModal:function(){var e;(T(!1),S)&&S(null===Z||void 0===Z||null===(e=Z.current)||void 0===e?void 0:e.value)},onClickCloseIcon:function(){var e;(T(!1),S)&&S(null===Z||void 0===Z||null===(e=Z.current)||void 0===e?void 0:e.value)},searchOnChange:function(e){},onSearchKeyEnter:function(e){U(e).then((function(e){if(null===e||void 0===e||!e.data.success)return alert("Error : ".concat(null===e||void 0===e?void 0:e.data.message));K(e.data[v])}))},onCellKeyDown:D,height:300,isLoading:G,queryKey:m,columns:x,onSelectionChange:function(e,n){if(e.length<=0)return b(n);var t=new Set(e),o=n.filter((function(e){return t.has(e[p].toString())}));o.length<=0||w(o,n)},id:p,rows:q,setRows:K,isRowSelectable:j}),refetch:H}}},64230:function(e,n,t){"use strict";t.d(n,{L:function(){return l},s:function(){return c}});var o=t(74165),i=t(15861),r=t(21830),a=t.n(r);function c(e){var n;a().fire({title:"Are you sure!",html:null!==e&&void 0!==e&&e.text?null===e||void 0===e?void 0:e.text:e.isUpdate?"Are you sure you want to make this change?":"Are you sure you want to delete this?",icon:"warning",input:"text",inputAttributes:{autocapitalize:"off"},showCancelButton:!0,confirmButtonText:"Save",confirmButtonColor:"green",showLoaderOnConfirm:!0,preConfirm:function(t){return(n=n||(0,i.Z)((0,o.Z)().mark((function n(t){return(0,o.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:try{e.cb(t)}catch(o){a().showValidationMessage("\n            Request failed: ".concat(o,"\n          "))}case 1:case"end":return n.stop()}}),n)})))).apply(this,arguments)},allowOutsideClick:function(){return!a().isLoading()}}).then((function(n){if(n.isConfirmed&&e.isConfirm)return e.isConfirm();e.isDeclined&&e.isDeclined()}))}function l(e){a().fire({title:"Are you sure?",text:null!==e&&void 0!==e&&e.text?null===e||void 0===e?void 0:e.text:"Do you want to proceed with saving?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, save it!"}).then((function(n){if(n.isConfirmed&&e.isConfirm)return e.isConfirm();e.isDeclined&&e.isDeclined()}))}},42419:function(e,n,t){"use strict";var o=t(64836);n.Z=void 0;var i=o(t(45649)),r=t(80184),a=(0,i.default)((0,r.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");n.Z=a},27247:function(e,n,t){"use strict";var o=t(64836);n.Z=void 0;var i=o(t(45649)),r=t(80184),a=(0,i.default)((0,r.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");n.Z=a},91421:function(e,n,t){"use strict";var o=t(64836);n.Z=void 0;var i=o(t(45649)),r=t(80184),a=(0,i.default)([(0,r.jsx)("circle",{cx:"10",cy:"8",r:"4"},"0"),(0,r.jsx)("path",{d:"M10.35 14.01C7.62 13.91 2 15.27 2 18v2h9.54c-2.47-2.76-1.23-5.89-1.19-5.99zm9.08 4.01c.36-.59.57-1.28.57-2.02 0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4c.74 0 1.43-.22 2.02-.57L20.59 22 22 20.59l-2.57-2.57zM16 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"},"1")],"PersonSearch");n.Z=a},53329:function(e,n,t){"use strict";var o=t(64836);n.Z=void 0;var i=o(t(45649)),r=t(80184),a=(0,i.default)((0,r.jsx)("path",{d:"M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"}),"Save");n.Z=a},5403:function(e,n,t){"use strict";var o=t(64836);n.Z=void 0;var i=o(t(45649)),r=t(80184),a=(0,i.default)((0,r.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}),"Search");n.Z=a},93421:function(e,n,t){"use strict";var o=t(64836);n.Z=void 0;var i=o(t(45649)),r=t(80184),a=(0,i.default)((0,r.jsx)("path",{d:"M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H8v-1.5c0-1.99 4-3 6-3s6 1.01 6 3V16z"}),"SwitchAccount");n.Z=a},4378:function(e,n){"use strict";n.Z={50:"#fce4ec",100:"#f8bbd0",200:"#f48fb1",300:"#f06292",400:"#ec407a",500:"#e91e63",600:"#d81b60",700:"#c2185b",800:"#ad1457",900:"#880e4f",A100:"#ff80ab",A200:"#ff4081",A400:"#f50057",A700:"#c51162"}},80888:function(e,n,t){"use strict";var o=t(79047);function i(){}function r(){}r.resetWarningCache=i,e.exports=function(){function e(e,n,t,i,r,a){if(a!==o){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function n(){return e}e.isRequired=e;var t={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:n,element:e,elementType:e,instanceOf:n,node:e,objectOf:n,oneOf:n,oneOfType:n,shape:n,exact:n,checkPropTypes:r,resetWarningCache:i};return t.PropTypes=t,t}},52007:function(e,n,t){e.exports=t(80888)()},79047:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}}]);
//# sourceMappingURL=2714.c2323a49.chunk.js.map