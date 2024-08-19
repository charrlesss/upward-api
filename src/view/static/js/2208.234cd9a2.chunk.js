"use strict";(self.webpackChunkupward=self.webpackChunkupward||[]).push([[2208],{13784:function(e,t,n){n.d(t,{Z:function(){return c}});var o=n(1413),i=n(45987),r=n(71652),a=n(93862),l=n(93777),d=n(80184),u=["label","name","onChange","value","onKeyDown","inputRef","datePickerRef","fullWidth","textField"];function c(e){var t=e.label,n=e.name,c=e.onChange,s=e.value,h=e.onKeyDown,p=e.inputRef,f=e.datePickerRef,x=e.fullWidth,m=e.textField,v=(0,i.Z)(e,u);return(0,d.jsx)(r._,{dateAdapter:a.H,children:(0,d.jsx)(l.M,(0,o.Z)({value:s,onChange:c,ref:f,slotProps:{textField:(0,o.Z)({size:"small",label:t,name:n,onKeyDown:h,inputRef:p,fullWidth:x},m)},sx:{minWidth:"200px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}},v))})}},81582:function(e,t,n){n.d(t,{XT:function(){return p},ZP:function(){return h},rO:function(){return f}});n(72791);var o=n(88447),i=n(64554),r=n(20890),a=n(48550),l=n(13400),d=n(29823),u=n(89767),c=n(80184),s={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"70%",bgcolor:"background.paper",boxShadow:24,p:4,heigth:"auto"};function h(e){var t=e.height,n=e.isLoading,h=(e.queryKey,e.columns),x=e.onSelectionChange,m=(e.setRows,e.rows),v=e.id,g=e.onCloseModal,y=e.showModal,b=e.onClickCloseIcon,w=e.searchOnChange,S=e.title,C=void 0===S?"":S,D=e.searchRef,j=(e.onCellKeyDown,e.onSearchKeyEnter),k=void 0===j?function(){}:j,F=e.isRowSelectable,Z=e.getCellClassName,E=p();return(0,c.jsx)(o.Z,{open:y,onClose:g,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:(0,c.jsxs)(i.Z,{sx:s,children:[(0,c.jsx)(r.Z,{id:"modal-modal-title",variant:"h6",component:"h2",mb:2,children:C}),(0,c.jsx)(a.Z,{size:"small",label:"Search",sx:{marginBottom:"10px"},fullWidth:!0,onChange:w,InputProps:{inputRef:D},onKeyDown:function(e){var t;"Enter"!==e.code&&"NumpadEnter"!==e.code||(e.preventDefault(),k(null===D||void 0===D||null===(t=D.current)||void 0===t?void 0:t.value));f(e,E,null===D||void 0===D?void 0:D.current)}}),(0,c.jsx)("div",{className:"".concat(E," main-table-selection-container"),style:{position:"relative",height:"".concat(t+20,"px")},children:(0,c.jsx)(u.Z,{isSingleSelection:!0,isRowFreeze:!1,columns:h,isLoading:n,dataSelection:function(e,t,n){x(e,t)},table_id:v,rows:m,isRowSelectable:F,getCellClassName:Z})}),(0,c.jsx)("div",{style:{position:"absolute",top:"10px",right:"10px"},children:(0,c.jsx)(l.Z,{"aria-label":"search-client",color:"secondary",onClick:b,children:(0,c.jsx)(d.Z,{})})})]})})}function p(){return"main-"+Math.floor(1e4*Math.random())}function f(e,t,n){var o=t;if("ArrowDown"===e.code){var i,r=document.querySelectorAll(".".concat(o," .MuiDataGrid-row"));e.preventDefault(),null===(i=r[0])||void 0===i||i.classList.add("hover-keyboard"),function(e,t){var n=document.querySelector(".".concat(e," .MuiDataGrid-row")),o=null===n||void 0===n?void 0:n.querySelector("input");null===o||void 0===o||o.focus();var i=new MouseEvent("mouseenter",{bubbles:!0,cancelable:!0,view:window});null===n||void 0===n||n.dispatchEvent(i),null===o||void 0===o||o.addEventListener("keydown",(function(e){"ArrowUp"===e.key&&(e.preventDefault(),t.focus()),"ArrowUp"===e.key&&(null===n||void 0===n||n.classList.remove("hover-keyboard"))}))}(t,n),r.forEach((function(e,t){e.addEventListener("keydown",(function(e){if("ArrowUp"===e.key){var n,o;if(t<=0)return;return e.preventDefault(),null===(n=r[t])||void 0===n||n.classList.remove("hover-keyboard"),void(null===(o=r[t-1])||void 0===o||o.classList.add("hover-keyboard"))}if("ArrowDown"===e.key){var i,a;if(e.preventDefault(),t>=r.length-1)return;null===(i=r[t])||void 0===i||i.classList.remove("hover-keyboard"),null===(a=r[t+1])||void 0===a||a.classList.add("hover-keyboard")}}))}))}}},23508:function(e,t,n){n.d(t,{bq:function(){return l}});var o,i=n(74165),r=n(15861);function a(e){var t=e.data,n=e.column,o=e.beforeArrangeData,i=e.adjustMaxHeight,r=e.fontSize,a=void 0===r?"11px":r,l=e.summaryHeight,d=void 0===l?0:l,u=[],c=0,s=[],h=document.querySelector(".content").getBoundingClientRect().height-i;return t.forEach((function(e,i){e=o(e);var r=document.querySelector(".content"),l=document.createElement("table"),p=l.insertRow();e.summaryReport&&h-c<=d+20&&(c+=h-c),n.forEach((function(t){var n=p.insertCell();l.style.visibility="hidden",l.style.width="100%",l.style.fontSize=a,function(e,t,n,o,i){e.style.width=n,e.textContent=t,o.appendChild(i)}(n,e[t.datakey],t.width,r,l)})),c+=p.getBoundingClientRect().height,r.removeChild(l),s.push(e),(c>=h||i===t.length-1&&c<h)&&(u.push(s),c=0,s=[])})),u}var l=function(e){return(o=o||(0,r.Z)((0,i.Z)().mark((function e(t){var n,o,r,l,d,u,c,s;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.data,o=t.column,r=t.beforeArrangeData,l=t.adjustMaxHeight,d=t.cb,u=t.fontSize,c=void 0===u?"11px":u,s=t.summaryHeight,void 0!==n){e.next=3;break}return e.abrupt("return",[]);case 3:if(!d){e.next=5;break}return e.abrupt("return",d({data:n,column:o,beforeArrangeData:r,adjustMaxHeight:l}));case 5:return e.abrupt("return",a({data:n,column:o,beforeArrangeData:r,adjustMaxHeight:l,fontSize:c,summaryHeight:s}));case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}},89767:function(e,t,n){var o=n(93433),i=n(1413),r=n(29439),a=n(72791),l=n(57482),d=n(64554),u=n(56214),c=n(29961),s=n(54277),h=n(70169),p=n(6484),f=n(16088),x=n(80184),m=(0,a.createContext)({rows:[],rowSelectionModel:[],footerChildren:function(){return(0,x.jsx)("div",{})},footerPaginationPosition:"right-left",showFooterSelectedCount:!0}),v=(0,a.forwardRef)((function(e,t){var n=e.isLoading,d=e.columns,c=e.rows,s=e.table_id,h=e.isSingleSelection,p=e.isRowFreeze,f=e.dataSelection,v=e.CustomFooterComponent,g=void 0===v?b:v,y=e.isRowSelectable,w=e.getCellClassName,S=e.checkboxSelection,C=void 0===S||S,D=e.footerChildren,j=void 0===D?function(e,t){return(0,x.jsx)("div",{})}:D,k=e.footerPaginationPosition,F=void 0===k?"right-left":k,Z=e.showFooterSelectedCount,E=void 0===Z||Z,I=(0,a.useState)([]),A=(0,r.Z)(I,2),M=A[0],N=A[1];function L(e,t,n){f&&f(e,t,n)}(0,a.useImperativeHandle)(t,(function(){return{removeSelection:function(){N([])},getSelectedRows:function(){return c.filter((function(e){return null===M||void 0===M?void 0:M.includes(e[s])}))},setSelectedRows:function(e){N(e)}}}));var _=[];return(0,x.jsx)(m.Provider,{value:{showFooterSelectedCount:E,footerPaginationPosition:F,rowSelectionModel:M,rows:c,footerChildren:j},children:(0,x.jsx)(u._$,{slots:{loadingOverlay:l.Z,footer:g},initialState:{pagination:{paginationModel:{pageSize:35}}},loading:n,getRowId:function(e){return e[s]},columns:d.filter((function(e){return!e.hide})),rows:c,showCellVerticalBorder:!0,showColumnVerticalBorder:!0,checkboxSelection:C,rowSelectionModel:M,rowHeight:25,columnHeaderHeight:35,pageSizeOptions:[10,20,35,50,75,100],sx:(0,i.Z)((0,i.Z)({"& .cash":{color:"#ec4899"},"& .check":{color:"#0891b2"},"& .approved":{color:"green"},"& .pending":{color:"orange"},"& .disapproved":{color:"red"},"& .normal":{color:"red"},"& .MuiDataGrid-row.Mui-selected:hover":{color:"black","& .MuiSvgIcon-root ":{fill:"#3b82f6"}},"& .hover-keyboard":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiDataGrid-row:hover":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiDataGrid-row.hover":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiTablePagination-root p ":{padding:"0 !important"}},{"& .MuiDataGrid-columnHeaders":{background:"#64748b",color:"white",fontSize:"14px"},"& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer .MuiSvgIcon-root ":{display:h||p?"none":"block",fill:"white"},"& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer input ":{display:h||p?"none":"block"}}),{fontSize:13,fontWeight:500,"& .MuiDataGrid-checkboxInput":{height:"27px",width:"27px"},"& .MuiDataGrid-checkboxInput svg":{height:"20px",width:"20px"}}),onRowSelectionModelChange:function(e){if(p){if(e.length<=0)return;if(_=e,M.includes(_[_.length-1]))return;return N(e),void L([e[e.length-1]],c,null)}if(!p&&h)if(M&&(null===M||void 0===M?void 0:M.length)>0){var t=new Set(M);N(e.filter((function(e){return!t.has(e)})))}else N(e);else N(e);L([e[e.length-1]],c,null)},onCellKeyDown:function(e,t){if(["NumpadEnter","Enter","Delete","Backspace"].includes(t.code))return t.preventDefault(),"Enter"===t.code||"NumpadEnter"===t.code?h&&!p?N((function(n){return n&&n.length>0&&n[0]===e.rowNode.id?(L([],c,t.code),[]):(L([e.rowNode.id],c,t.code),[e.rowNode.id])})):void N((function(n){return n&&!p&&n.length>0&&n.includes(e.rowNode.id)?(n=n.filter((function(t){return t!==e.rowNode.id})),L([],c,t.code),n):n&&p&&n.length>0&&n.includes(e.rowNode.id)?n:(L([e.rowNode.id],c,t.code),[].concat((0,o.Z)(n),[e.rowNode.id]))})):"Delete"===t.code||"Backspace"===t.code?(N([e.rowNode.id]),L([e.rowNode.id],c,t.code)):void 0},disableVirtualization:!0,isRowSelectable:y,getCellClassName:w})})}));function g(e){var t=e.page,n=e.onPageChange,o=e.className,i=(0,c.l)(),r=(0,s.P)(i,h.UB);return(0,x.jsx)(f.Z,{variant:"outlined",color:"primary",className:o,count:r,page:t+1,onChange:function(e,t){n(e,t-1)}})}function y(e){return(0,x.jsx)(p.x,(0,i.Z)({ActionsComponent:g},e))}function b(e){var t=(0,a.useContext)(m),n=t.rowSelectionModel,o=t.showFooterSelectedCount,r=t.footerPaginationPosition,l=t.footerChildren,u=t.rows;return(0,x.jsxs)(d.Z,{sx:{columnGap:"50px",display:"flex",width:"100%",justifyContent:"space-between",px:3,alignItems:"center",flexDirection:"right-left"===r?"row-reverse":"row"},children:[(0,x.jsx)(y,(0,i.Z)({},e)),(0,x.jsxs)(d.Z,{sx:{display:"flex",justifyContent:"right-left"===r?"flex-start":"flex-end",flex:1,alignItems:"center"},children:[o&&(0,x.jsxs)("div",{children:["Selected:",null===n||void 0===n?void 0:n.length]}),(0,x.jsx)("div",{children:l(n,u)})]})]})}t.Z=v},46077:function(e,t,n){n.r(t),n.d(t,{default:function(){return W},reducer:function(){return _}});var o=n(29439),i=n(74165),r=n(15861),a=n(4942),l=n(1413),d=n(72791),u=n(48550),c=n(64554),s=n(68096),h=n(94925),p=n(77196),f=n(63466),x=n(13400),m=n(58406),v=n(23786),g=n(91933),y=n(93862),b=n(3380),w=n(71652),S=n(93777),C=n(13784),D=n(39709),j=n(93263),k=n(91421),F=n(71012),Z=n(54164),E=n(23508),I=n(16386),A=n(80184),M={account:"",account_title:"",dateFormat:"Custom",dateFrom:new Date,dateTo:new Date,yearCount:(new Date).getFullYear().toString().slice(-2),subsi:0,subsi_options:"",format:0,field:0,title:"",report:"Custom"},N=[{datakey:"Date_Entry",header:"DATE",width:"170px",excelColumnWidth:20},{datakey:"Source_No",header:"REF NO.",width:"300px",excelColumnWidth:20},{datakey:"Sub_Acct",header:"SUB ACCT.",width:"100px",excelColumnWidth:20},{datakey:"ID_No",header:"ID NO",width:"300px",excelColumnWidth:20},{datakey:"Debit",header:"DEBIT",type:"number",total:!0,width:"100px",excelColumnWidth:20},{datakey:"Credit",header:"CREDIT",type:"number",total:!0,width:"100px",excelColumnWidth:20},{datakey:"Bal",header:"BALANCE",total:!0,type:"number",width:"100px",excelColumnWidth:20},{datakey:"Explanation",header:"EXPLANATION",width:"300px",excelColumnWidth:20}],L=[{datakey:"Date_Entry",header:"DATE",width:"170px",excelColumnWidth:20},{datakey:"Source_No",header:"REF NO.",width:"250px",excelColumnWidth:20},{datakey:"Sub_Acct",header:"SUB ACCT.",width:"100px",excelColumnWidth:20},{datakey:"ID_No",header:"ID NO",width:"300px",excelColumnWidth:20},{datakey:"Check_No",header:"CHECK NO",width:"120px",excelColumnWidth:20},{datakey:"Debit",header:"DEBIT",total:!0,type:"number",width:"120px",excelColumnWidth:20},{datakey:"Credit",header:"CREDIT",total:!0,type:"number",width:"120px",excelColumnWidth:20},{datakey:"Explanation",header:"EXPLANATION",width:"200px",excelColumnWidth:20}],_=function(e,t){return"UPDATE_FIELD"===t.type?(0,l.Z)((0,l.Z)({},e),{},(0,a.Z)({},t.field,t.value)):e};function P(e){var t=e.state,n=e.dispatch,o=e.handleInputChange,i=e.user,r=(0,d.useRef)(null),a=(0,d.useRef)(null);return(0,A.jsxs)(d.Fragment,{children:["Custom"===t.report&&(0,A.jsxs)(d.Fragment,{children:[(0,A.jsx)(C.Z,{fullWidth:!0,label:"Date From",onChange:function(e){n({type:"UPDATE_FIELD",field:"dateFrom",value:e}),t.dateFrom=e,n({type:"UPDATE_FIELD",field:"title",value:z(t,null===i||void 0===i?void 0:i.department)})},value:new Date(t.dateFrom),onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)var t=setTimeout((function(){var e,n;null===(e=r.current)||void 0===e||null===(n=e.querySelector("button"))||void 0===n||n.click(),clearTimeout(t)}),150)},datePickerRef:r,textField:{InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}}),(0,A.jsx)(C.Z,{fullWidth:!0,label:"Date To",onChange:function(e){n({type:"UPDATE_FIELD",field:"dateTo",value:e}),t.dateTo=e,n({type:"UPDATE_FIELD",field:"title",value:z(t,null===i||void 0===i?void 0:i.department)})},value:new Date(t.dateTo),onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)var t=setTimeout((function(){var e,n;null===(e=a.current)||void 0===e||null===(n=e.querySelector("button"))||void 0===n||n.click(),clearTimeout(t)}),150)},datePickerRef:a,textField:{InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}})]}),"Daily"===t.report&&(0,A.jsx)(C.Z,{fullWidth:!0,label:"Date",onChange:function(e){n({type:"UPDATE_FIELD",field:"dateFrom",value:e}),t.dateFrom=e,n({type:"UPDATE_FIELD",field:"title",value:z(t,null===i||void 0===i?void 0:i.department)})},value:new Date(t.dateFrom),onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)var t=setTimeout((function(){var e,n;null===(e=r.current)||void 0===e||null===(n=e.querySelector("button"))||void 0===n||n.click(),clearTimeout(t)}),150)},datePickerRef:r,textField:{InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}}),(0,A.jsxs)(w._,{dateAdapter:y.H,children:["Monthly"===t.report&&(0,A.jsx)(S.M,{sx:{width:"100%",".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},slotProps:{textField:{size:"small",name:"",InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}},label:"Date",views:["month","year"],value:t.dateFrom,onChange:function(e){n({type:"UPDATE_FIELD",field:"dateFrom",value:e}),t.dateFrom=e,n({type:"UPDATE_FIELD",field:"title",value:z(t,null===i||void 0===i?void 0:i.department)})}}),"Yearly"===t.report&&(0,A.jsxs)(d.Fragment,{children:[(0,A.jsx)(S.M,{sx:{width:"100%",".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},slotProps:{textField:{size:"small",name:"",inputRef:r,InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}},label:"Date",views:["year"],value:t.dateFrom,onChange:function(e){n({type:"UPDATE_FIELD",field:"dateFrom",value:e}),t.dateFrom=e,n({type:"UPDATE_FIELD",field:"title",value:z(t,null===i||void 0===i?void 0:i.department)})}}),(0,A.jsx)(u.Z,{type:"number",label:"Year Count",name:"yearCount",value:t.yearCount,onChange:o,InputProps:{style:{height:"27px",fontSize:"12px"}},sx:{flex:1,".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}})]})]})]})}function z(e,t){return"".concat("UMIS"===t?"UPWARD MANAGEMENT INSURANCE SERVICES":"UPWARD CONSULTANCY SERVICES AND MANAGEMENT INC.","\nSubsidiary Ledger\n\n\nAccount:").concat(""===e.account?"":"".concat(e.account_title," "),"(").concat(""===e.account?"ALL":e.account,")\n").concat(0===e.subsi?"For the Period: ".concat(function(e){var t="";if("Daily"===e.dateFormat)t=e.dateFrom.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});else if("Monthly"===e.dateFormat)t=e.dateFrom.toLocaleDateString("en-US",{year:"numeric",month:"long"});else if("Yearly"===e.dateFormat){var n=function(e,t){var n=new Date(e,0,1),o=new Date(e+t,11,31),i=n.getFullYear(),r=o.getFullYear();return r<i?{startYearFormatted:r,endYearFormatted:i}:{startYearFormatted:i,endYearFormatted:r}}(new Date(e.dateFrom).getFullYear(),parseInt(e.yearCount)),o=n.startYearFormatted,i=n.endYearFormatted;t="".concat(o,"-").concat(i)}else{var r=e.dateFrom.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),a=e.dateTo.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});t="".concat(r," to ").concat(a)}return t}(e)):1===e.subsi?"ID No.:  (".concat(e.subsi_options,")"):"Sub Account: (".concat(e.subsi_options,")"),"\n")}function T(e){var t,n=e.state,o=e.dispatch,y=(0,d.useRef)(null),w=(0,d.useRef)(null),S=(0,d.useContext)(b.V),C=S.myAxios,F=S.user,Z=(0,g.useQuery)({queryKey:"sub-accounts",queryFn:function(){return(t=t||(0,r.Z)((0,i.Z)().mark((function e(){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C.get("/reports/accounting/get-sub-account-acronym",{headers:{Authorization:"Bearer ".concat(null===F||void 0===F?void 0:F.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}),E=Z.data,I=Z.isLoading,M=(0,j.Z)({link:{url:"/task/accounting/search-pdc-policy-id",queryUrlName:"searchPdcPolicyIds"},columns:[{field:"Type",headerName:"Type",width:130},{field:"IDNo",headerName:"ID No.",width:200},{field:"Name",headerName:"Name",flex:1},{field:"ID",headerName:"ID",flex:1,hide:!0}],queryKey:"client-ids",uniqueId:"IDNo",responseDataKey:"clientsId",onSelected:function(e,t){o({type:"UPDATE_FIELD",field:"subsi_options",value:e[0].IDNo}),n.subsi_options=e[0].IDNo,o({type:"UPDATE_FIELD",field:"title",value:z(n,null===F||void 0===F?void 0:F.department)}),T()},searchRef:w}),N=M.ModalComponent,L=M.openModal,_=M.isLoading,T=M.closeModal,R=(0,j.Z)({link:{url:"/reports/accounting/chart-schedule-account",queryUrlName:"account_search"},columns:[{field:"Acct_Code",headerName:"Code",width:130},{field:"Acct_Title",headerName:"Tittle",flex:1},{field:"Short",headerName:"Short Name",flex:1}],queryKey:"chart-account-ids",uniqueId:"Acct_Code",responseDataKey:"chartAccount",onSelected:function(e,t){o({type:"UPDATE_FIELD",field:"account",value:e[0].Acct_Code}),o({type:"UPDATE_FIELD",field:"account_title",value:e[0].Acct_Title}),n.account=e[0].Acct_Code,o({type:"UPDATE_FIELD",field:"title",value:z(n,null===F||void 0===F?void 0:F.department)}),n.account_title=e[0].Acct_Title,o({type:"UPDATE_FIELD",field:"title",value:z(n,null===F||void 0===F?void 0:F.department)}),q()},searchRef:y}),W=R.ModalComponent,U=R.openModal,K=R.isLoading,q=R.closeModal,O=function(e){var t=e.target,i=t.name,r=t.value;"account"===i&&""===r&&o({type:"UPDATE_FIELD",field:"account_title",value:""}),o({type:"UPDATE_FIELD",field:"title",value:z((0,l.Z)((0,l.Z)({},n),{},(0,a.Z)({},i,r)),null===F||void 0===F?void 0:F.department)}),o({type:"UPDATE_FIELD",field:i,value:r})};return(0,A.jsxs)("div",{style:{padding:"50px 20px"},children:[(0,A.jsx)(u.Z,{label:"Title",fullWidth:!0,name:"title",value:n.title,onChange:O,rows:6,multiline:!0,InputProps:{style:{height:"140px",fontSize:"12px"}},sx:{flex:1,".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,A.jsxs)(c.Z,{sx:function(e){return(0,a.Z)({height:"100%",display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"10px",margin:"10px 0"},e.breakpoints.down("sm"),{gridTemplateColumns:"repeat(1,1fr)"})},children:[K?(0,A.jsx)(D.Z,{loading:K}):(0,A.jsxs)(s.Z,{sx:{gridColumn:"1 / span 2",width:"100%",".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},variant:"outlined",size:"small",children:[(0,A.jsx)(h.Z,{htmlFor:"account_id",children:"Account"}),(0,A.jsx)(p.Z,{sx:{height:"27px",fontSize:"14px"},name:"account",value:n.account,onChange:O,id:"account_id",onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return U(n.account)},endAdornment:(0,A.jsx)(f.Z,{position:"end",children:(0,A.jsx)(x.Z,{onClick:function(){U(n.account)},edge:"end",color:"secondary",children:(0,A.jsx)(k.Z,{})})}),label:"Account"})]}),(0,A.jsx)(u.Z,{fullWidth:!0,name:"account_title",value:n.account_title,onChange:O,InputProps:{readOnly:!0,style:{height:"27px"}},sx:{gridColumn:"1 / span 2",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,A.jsxs)(s.Z,{fullWidth:!0,variant:"outlined",size:"small",sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,A.jsx)(h.Z,{id:"subsi_id",children:"Subsidiary"}),(0,A.jsxs)(m.Z,{labelId:"subsi_id",value:n.subsi,label:"Subsidiary",name:"subsi",onChange:function(e){O(e),O({target:{value:"",name:"subsi_options"}})},sx:{height:"27px",fontSize:"14px"},children:[(0,A.jsx)(v.Z,{value:0,children:"All"}),(0,A.jsx)(v.Z,{value:1,children:"I.D No."}),(0,A.jsx)(v.Z,{value:2,children:"Sub Acct"})]})]}),0===n.subsi&&(0,A.jsx)(u.Z,{InputProps:{readOnly:!0,style:{height:"27px"}},sx:{".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),1===n.subsi&&(0,A.jsx)(d.Fragment,{children:_?(0,A.jsx)(D.Z,{loading:_}):(0,A.jsxs)(s.Z,{sx:{width:"100%",".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},variant:"outlined",size:"small",children:[(0,A.jsx)(h.Z,{htmlFor:"clients_id",children:"Clients"}),(0,A.jsx)(p.Z,{sx:{height:"27px",fontSize:"14px"},label:"Clients",name:"subsi_options",value:n.subsi_options,onChange:O,id:"clients_id",onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return L(n.subsi_options)},endAdornment:(0,A.jsx)(f.Z,{position:"end",children:(0,A.jsx)(x.Z,{onClick:function(){L(n.subsi_options)},edge:"end",color:"secondary",children:(0,A.jsx)(k.Z,{})})})})]})}),2===n.subsi&&(0,A.jsx)(d.Fragment,{children:I?(0,A.jsx)(D.Z,{loading:I}):(0,A.jsxs)(s.Z,{fullWidth:!0,variant:"outlined",size:"small",sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,A.jsx)(h.Z,{id:"sub_account_id",children:"Sub Account"}),(0,A.jsxs)(m.Z,{labelId:"sub_account_id",value:n.subsi_options,label:"Sub Account",name:"subsi_options",onChange:O,sx:{height:"27px",fontSize:"14px"},children:[(0,A.jsx)(v.Z,{value:"All",children:"All"}),null===E||void 0===E?void 0:E.data.sub_account.map((function(e,t){return(0,A.jsx)(v.Z,{value:e.Acronym,children:e.Acronym},t)}))]})]})}),(0,A.jsx)(P,{dispatch:o,state:n,handleInputChange:O,user:F})]}),(0,A.jsxs)("fieldset",{style:{gridArea:"content4",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px",position:"relative",flex:1},children:[(0,A.jsx)("legend",{style:{color:"black",fontFamily:"serif"},children:"Report"}),(0,A.jsxs)(c.Z,{sx:function(e){return{width:"100%",display:"flex",flexDirection:"column",rowGap:"10px",alignItems:"center"}},children:[(0,A.jsxs)(s.Z,{fullWidth:!0,variant:"outlined",size:"small",sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,A.jsx)(h.Z,{id:"format",children:"Format"}),(0,A.jsxs)(m.Z,{labelId:"format",value:n.format,label:"Format",name:"format",onChange:O,sx:{height:"27px",fontSize:"14px"},children:[(0,A.jsx)(v.Z,{value:0,children:"With Running Balance"}),(0,A.jsx)(v.Z,{value:1,children:"No Running Balance"})]})]}),(0,A.jsxs)(s.Z,{fullWidth:!0,variant:"outlined",size:"small",sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,A.jsx)(h.Z,{id:"field",children:"Field"}),(0,A.jsxs)(m.Z,{labelId:"field",value:n.field,label:"Sort",name:"field",onChange:O,sx:{height:"27px",fontSize:"14px"},children:[(0,A.jsx)(v.Z,{value:0,children:"Explanations"}),(0,A.jsx)(v.Z,{value:1,children:"Payee"}),(0,A.jsx)(v.Z,{value:2,children:"Remarks"})]})]})]})]}),W,N]})}function R(e){return[N,L][e]}function W(){var e,t=(0,d.useContext)(b.V),n=t.myAxios,a=t.user,l=(0,d.useState)(R(M.subsi)),u=(0,o.Z)(l,2),c=u[0],s=u[1];return M.title=z(M,null===a||void 0===a?void 0:a.department),(0,A.jsx)(F.ZP,{column:c,initialState:M,Setting:function(e,t){return(0,A.jsx)(T,{state:e,dispatch:t})},onReportSubmit:function(t,o,l){return(e=e||(0,r.Z)((0,i.Z)().mark((function e(t,o,r){var l,d,u;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l=R(r.subsi),(0,Z.flushSync)((function(){s(l)})),e.next=4,n.post("/reports/accounting/subsidiary-ledger-report",r,{headers:{Authorization:"Bearer ".concat(null===a||void 0===a?void 0:a.accessToken)}});case 4:return d=e.sent,e.next=7,d.data;case 7:u=e.sent,(0,E.bq)({data:JSON.parse(u.report),column:l,beforeArrangeData:function(e){var t=l.filter((function(e){return"number"===e.type})).map((function(e){return e.datakey}));return t.forEach((function(t){e.hasOwnProperty(t)&&(e[t]=U(parseFloat(e[t].toString().replace(/,/g,""))))})),e},adjustMaxHeight:250}).then((function(e){t(e),o(!1)}));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)},scaleDefaultValue:100,drawTable:function(e,t){return e.map((function(n,o){return(0,A.jsxs)("div",{className:"page out-page",children:[(0,A.jsx)("div",{className:"header",style:{height:"50px"}}),(0,A.jsx)("div",{className:"content",children:(0,A.jsxs)("table",{children:[(0,A.jsxs)("thead",{children:[t.title.split("\n").map((function(e,t){return(0,A.jsx)("tr",{children:(0,A.jsx)("th",{style:{fontSize:"14px",fontWeight:"bold",textAlign:"left"},colSpan:c.length,children:e})},t)})),(0,A.jsx)("tr",{style:{height:"40px"}}),(0,A.jsx)("tr",{children:c.map((function(t,n){return(0,A.jsx)("th",{onDoubleClick:function(n){return(0,F.PE)(n,t.datakey,e)},style:{width:t.width,fontSize:"12px",fontWeight:"bold",borderBottom:"1px solid black"},children:t.header},n)}))})]}),(0,A.jsx)("tbody",{children:n.map((function(e,t){return(0,A.jsx)("tr",{children:c.map((function(n,i){return(0,A.jsx)("td",{onClick:F.mp,className:"editable not-looking page-".concat(o,"  row-").concat(t,"_col-").concat(i),style:{fontSize:"11px",fontWeight:"500",width:"".concat(n.width," !important"),textAlign:"AssuredName"===n.datakey||"Mortgagee"===n.datakey?"center":n.total||"InsuredValue"===n.datakey?"right":"left"},children:e[n.datakey]},i)}))},t)}))}),(0,A.jsx)("tfoot",{children:o===e.length-1&&(0,A.jsxs)("tr",{children:[(0,A.jsxs)("td",{style:{fontWeight:"bold",borderTop:"1px solid black",fontSize:"11px"},colSpan:3,children:["No. of Records: ",e.flat().length-1]}),c.map((function(t,n){if(!t.total)return n<3?(0,A.jsx)(d.Fragment,{},n):(0,A.jsx)("td",{style:{borderTop:"1px solid black"}},n);var o=e.flat().reduce((function(e,n){var o;return e+parseFloat(null===(o=n[t.datakey])||void 0===o?void 0:o.replace(/,/g,""))}),0);return(0,A.jsx)("td",{style:{borderTop:"1px solid black",fontWeight:"bold",textAlign:"right",fontSize:"11px"},children:isNaN(o)?"0":U(o)},n)}))]})})]})}),(0,A.jsxs)("div",{className:"footer",style:{height:"50px",display:"flex",justifyContent:"space-between"},children:[(0,A.jsx)("p",{style:{fontSize:"10px",fontWeight:"bold"},children:(0,I.Z)(new Date,"dd/MM/yyyy")}),(0,A.jsxs)("p",{style:{fontSize:"10px",fontWeight:"bold"},children:["Page ",o+1," of ",e.length]})]})]},o)}))},pageHeight:"14in",pageWidth:"10.5in"})}function U(e){return e.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}},93263:function(e,t,n){var o,i=n(29439),r=n(74165),a=n(15861),l=n(72791),d=n(91933),u=n(3380),c=n(81582),s=n(54164),h=n(80184);function p(e,t,n){return(o=o||(0,a.Z)((0,r.Z)().mark((function e(t,n,o){var i,a=arguments;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=a.length>3&&void 0!==a[3]?a[3]:"",e.abrupt("return",t.get("".concat(null===o||void 0===o?void 0:o.url,"?").concat(null===o||void 0===o?void 0:o.queryUrlName,"=").concat(i),{headers:{Authorization:"Bearer ".concat(null===n||void 0===n?void 0:n.accessToken)}}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}t.Z=function(e){var t,n,o=e.link,f=e.uniqueId,x=e.queryKey,m=e.responseDataKey,v=e.columns,g=e.onSelected,y=void 0===g?function(){}:g,b=e.onRemoveSelected,w=void 0===b?function(){}:b,S=e.onSuccess,C=void 0===S?function(){}:S,D=e.searchRef,j=e.onCellKeyDown,k=e.onCloseFunction,F=void 0===k?function(){}:k,Z=e.CustomizeAxios,E=void 0===Z?p:Z,I=e.isRowSelectable,A=e.getCellClassName,M=(0,l.useContext)(u.V),N=M.myAxios,L=M.user,_=(0,l.useState)(!1),P=(0,i.Z)(_,2),z=P[0],T=P[1],R=(0,l.useState)([]),W=(0,i.Z)(R,2),U=W[0],K=W[1];function q(){return(t=t||(0,a.Z)((0,r.Z)().mark((function e(){var t,n=arguments;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:"",e.next=3,E(N,L,o,t);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var O=(0,d.useQuery)({queryKey:x,queryFn:function(){return(n=n||(0,a.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,q();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){var t=e;K(t.data[m]),C(t)},refetchOnWindowFocus:!1}),H=O.isLoading,B=O.refetch;return{show:z,rows:U,isLoading:H,openModal:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";(0,s.flushSync)((function(){T(!0)})),null!==D&&void 0!==D&&D.current&&(D.current.value=e,q(e).then((function(e){if(null===e||void 0===e||!e.data.success)return alert("Error : ".concat(null===e||void 0===e?void 0:e.data.message));K(e.data[m]),null!==D&&void 0!==D&&D.current&&D.current.focus()})))},closeModal:function(){var e;(T(!1),F)&&F(null===D||void 0===D||null===(e=D.current)||void 0===e?void 0:e.value)},ModalComponent:(0,h.jsx)(c.ZP,{getCellClassName:A,searchRef:D,showModal:z,onCloseModal:function(){var e;(T(!1),F)&&F(null===D||void 0===D||null===(e=D.current)||void 0===e?void 0:e.value)},onClickCloseIcon:function(){var e;(T(!1),F)&&F(null===D||void 0===D||null===(e=D.current)||void 0===e?void 0:e.value)},searchOnChange:function(e){},onSearchKeyEnter:function(e){q(e).then((function(e){if(null===e||void 0===e||!e.data.success)return alert("Error : ".concat(null===e||void 0===e?void 0:e.data.message));K(e.data[m])}))},onCellKeyDown:j,height:300,isLoading:H,queryKey:x,columns:v,onSelectionChange:function(e,t){if(e.length<=0)return w(t);var n=new Set(e),o=t.filter((function(e){return n.has(e[f].toString())}));o.length<=0||y(o,t)},id:f,rows:U,setRows:K,isRowSelectable:I}),refetch:B}}},91421:function(e,t,n){var o=n(64836);t.Z=void 0;var i=o(n(45649)),r=n(80184),a=(0,i.default)([(0,r.jsx)("circle",{cx:"10",cy:"8",r:"4"},"0"),(0,r.jsx)("path",{d:"M10.35 14.01C7.62 13.91 2 15.27 2 18v2h9.54c-2.47-2.76-1.23-5.89-1.19-5.99zm9.08 4.01c.36-.59.57-1.28.57-2.02 0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4c.74 0 1.43-.22 2.02-.57L20.59 22 22 20.59l-2.57-2.57zM16 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"},"1")],"PersonSearch");t.Z=a},45987:function(e,t,n){n.d(t,{Z:function(){return i}});var o=n(63366);function i(e,t){if(null==e)return{};var n,i,r=(0,o.Z)(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}}}]);
//# sourceMappingURL=2208.234cd9a2.chunk.js.map