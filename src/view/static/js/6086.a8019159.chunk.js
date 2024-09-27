"use strict";(self.webpackChunkupward=self.webpackChunkupward||[]).push([[6086],{13784:function(e,o,n){n.d(o,{Z:function(){return d}});var t=n(1413),i=n(45987),r=n(71652),l=n(93862),a=n(93777),u=n(80184),c=["label","name","onChange","value","onKeyDown","inputRef","datePickerRef","fullWidth","textField","minWidth"];function d(e){var o=e.label,n=e.name,d=e.onChange,s=e.value,f=e.onKeyDown,v=e.inputRef,h=e.datePickerRef,p=e.fullWidth,w=e.textField,g=e.minWidth,m=void 0===g?"200px":g,x=(0,i.Z)(e,c);return(0,u.jsx)(r._,{dateAdapter:l.H,children:(0,u.jsx)(a.M,(0,t.Z)({floatingLabelStyle:{color:"black"},value:s,onChange:d,ref:h,slotProps:{textField:(0,t.Z)({size:"small",label:o,name:n,onKeyDown:f,inputRef:v,fullWidth:p},w)},InputLabelProps:{sx:{color:"black"}},sx:{minWidth:m,fieldset:{borderColor:"black"},".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}},x))})}},81582:function(e,o,n){n.d(o,{XT:function(){return p},ZP:function(){return h},rO:function(){return w}});n(72791);var t=n(88447),i=n(64554),r=n(20890),l=n(27391),a=n(63466),u=n(13400),c=n(29823),d=n(89767),s=n(5403),f=n(80184),v={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"70%",bgcolor:"background.paper",boxShadow:24,p:4,heigth:"auto"};function h(e){var o=e.height,n=e.isLoading,h=(e.queryKey,e.columns),g=e.onSelectionChange,m=(e.setRows,e.rows),x=e.id,C=e.onCloseModal,b=e.showModal,y=e.onClickCloseIcon,S=e.searchOnChange,k=e.title,Z=void 0===k?"":k,M=e.searchRef,D=(e.onCellKeyDown,e.onSearchKeyEnter),j=void 0===D?function(){}:D,R=e.isRowSelectable,N=e.getCellClassName,L=p();return(0,f.jsx)(t.Z,{open:b,onClose:C,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:(0,f.jsxs)(i.Z,{sx:v,children:[(0,f.jsx)(r.Z,{id:"modal-modal-title",variant:"h6",component:"h2",mb:2,children:Z}),(0,f.jsx)(l.Z,{size:"small",label:"Search",fullWidth:!0,onChange:S,InputProps:{inputRef:M,style:{height:"27px",fontSize:"14px"},endAdornment:(0,f.jsx)(a.Z,{position:"end",children:(0,f.jsx)(u.Z,{onClick:function(){var e;j(null===M||void 0===M||null===(e=M.current)||void 0===e?void 0:e.value)},edge:"end",children:(0,f.jsx)(s.Z,{})})})},type:"search",onKeyDown:function(e){var o;"Enter"!==e.code&&"NumpadEnter"!==e.code||(e.preventDefault(),j(null===M||void 0===M||null===(o=M.current)||void 0===o?void 0:o.value));w(e,L,null===M||void 0===M?void 0:M.current)},sx:{marginBottom:"10px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,f.jsx)("div",{className:"".concat(L," main-table-selection-container"),style:{position:"relative",height:"".concat(o+20,"px")},children:(0,f.jsx)(d.Z,{isSingleSelection:!0,isRowFreeze:!1,columns:h,isLoading:n,dataSelection:function(e,o,n){g(e,o)},table_id:x,rows:m,isRowSelectable:R,getCellClassName:N})}),(0,f.jsx)("div",{style:{position:"absolute",top:"10px",right:"10px"},children:(0,f.jsx)(u.Z,{"aria-label":"search-client",color:"secondary",onClick:y,children:(0,f.jsx)(c.Z,{})})})]})})}function p(){return"main-"+Math.floor(1e4*Math.random())}function w(e,o,n){var t=o;if("ArrowDown"===e.code){var i,r=document.querySelectorAll(".".concat(t," .MuiDataGrid-row"));e.preventDefault(),null===(i=r[0])||void 0===i||i.classList.add("hover-keyboard"),function(e,o){var n=document.querySelector(".".concat(e," .MuiDataGrid-row")),t=null===n||void 0===n?void 0:n.querySelector("input");null===t||void 0===t||t.focus();var i=new MouseEvent("mouseenter",{bubbles:!0,cancelable:!0,view:window});null===n||void 0===n||n.dispatchEvent(i),null===t||void 0===t||t.addEventListener("keydown",(function(e){"ArrowUp"===e.key&&(e.preventDefault(),o.focus()),"ArrowUp"===e.key&&(null===n||void 0===n||n.classList.remove("hover-keyboard"))}))}(o,n),r.forEach((function(e,o){e.addEventListener("keydown",(function(e){if("ArrowUp"===e.key){var n,t;if(o<=0)return;return e.preventDefault(),null===(n=r[o])||void 0===n||n.classList.remove("hover-keyboard"),void(null===(t=r[o-1])||void 0===t||t.classList.add("hover-keyboard"))}if("ArrowDown"===e.key){var i,l;if(e.preventDefault(),o>=r.length-1)return;null===(i=r[o])||void 0===i||i.classList.remove("hover-keyboard"),null===(l=r[o+1])||void 0===l||l.classList.add("hover-keyboard")}}))}))}}},56580:function(e,o,n){n.d(o,{a:function(){return c}});var t=n(1413),i=n(45987),r=n(72791),l=n(30948),a=n(80184),u=["onChange"],c=r.forwardRef((function(e,o){var n=e.onChange,r=(0,i.Z)(e,u);return(0,a.jsx)(l.h3,(0,t.Z)((0,t.Z)({},r),{},{getInputRef:o,onValueChange:function(o){n({target:{name:e.name,value:o.value}})},allowNegative:!1,thousandSeparator:!0,valueIsNumericString:!0}))}))},89767:function(e,o,n){var t=n(93433),i=n(1413),r=n(29439),l=n(72791),a=n(57482),u=n(64554),c=n(56214),d=n(29961),s=n(54277),f=n(70169),v=n(6484),h=n(16088),p=n(80184),w=(0,l.createContext)({rows:[],rowSelectionModel:[],footerChildren:function(){return(0,p.jsx)("div",{})},footerPaginationPosition:"right-left",showFooterSelectedCount:!0}),g=(0,l.forwardRef)((function(e,o){var n=e.isLoading,u=e.columns,d=e.rows,s=e.table_id,f=e.isSingleSelection,v=e.isRowFreeze,h=e.dataSelection,g=e.CustomFooterComponent,m=void 0===g?C:g,x=e.isRowSelectable,b=e.getCellClassName,y=e.checkboxSelection,S=void 0===y||y,k=e.footerChildren,Z=void 0===k?function(e,o){return(0,p.jsx)("div",{})}:k,M=e.footerPaginationPosition,D=void 0===M?"right-left":M,j=e.showFooterSelectedCount,R=void 0===j||j,N=(0,l.useState)([]),L=(0,r.Z)(N,2),P=L[0],I=L[1];function A(e,o,n){h&&h(e,o,n)}(0,l.useImperativeHandle)(o,(function(){return{removeSelection:function(){I([])},getSelectedRows:function(){return d.filter((function(e){return null===P||void 0===P?void 0:P.includes(e[s])}))},setSelectedRows:function(e){I(e)}}}));var F=[];return(0,p.jsx)(w.Provider,{value:{showFooterSelectedCount:R,footerPaginationPosition:D,rowSelectionModel:P,rows:d,footerChildren:Z},children:(0,p.jsx)(c._$,{slots:{loadingOverlay:a.Z,footer:m},initialState:{pagination:{paginationModel:{pageSize:35}}},loading:n,getRowId:function(e){return e[s]},columns:u.filter((function(e){return!e.hide})),rows:d,showCellVerticalBorder:!0,showColumnVerticalBorder:!0,checkboxSelection:S,rowSelectionModel:P,rowHeight:25,columnHeaderHeight:35,pageSizeOptions:[10,20,35,50,75,100],sx:(0,i.Z)((0,i.Z)({"& .cash":{color:"#ec4899"},"& .check":{color:"#0891b2"},"& .approved":{color:"green"},"& .pending":{color:"orange"},"& .disapproved":{color:"red"},"& .normal":{color:"red"},"& .MuiDataGrid-row.Mui-selected:hover":{color:"black","& .MuiSvgIcon-root ":{fill:"#3b82f6"}},"& .hover-keyboard":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiDataGrid-row:hover":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiDataGrid-row.hover":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiTablePagination-root p ":{padding:"0 !important"}},{"& .MuiDataGrid-columnHeaders":{background:"#64748b",color:"white",fontSize:"14px"},"& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer .MuiSvgIcon-root ":{display:f||v?"none":"block",fill:"white"},"& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer input ":{display:f||v?"none":"block"}}),{fontSize:13,fontWeight:500,"& .MuiDataGrid-checkboxInput":{height:"27px",width:"27px"},"& .MuiDataGrid-checkboxInput svg":{height:"20px",width:"20px"}}),onRowSelectionModelChange:function(e){if(v){if(e.length<=0)return;if(F=e,P.includes(F[F.length-1]))return;return I(e),void A([e[e.length-1]],d,null)}if(!v&&f)if(P&&(null===P||void 0===P?void 0:P.length)>0){var o=new Set(P);I(e.filter((function(e){return!o.has(e)})))}else I(e);else I(e);A([e[e.length-1]],d,null)},onCellKeyDown:function(e,o){if(["NumpadEnter","Enter","Delete","Backspace"].includes(o.code))return o.preventDefault(),"Enter"===o.code||"NumpadEnter"===o.code?f&&!v?I((function(n){return n&&n.length>0&&n[0]===e.rowNode.id?(A([],d,o.code),[]):(A([e.rowNode.id],d,o.code),[e.rowNode.id])})):void I((function(n){return n&&!v&&n.length>0&&n.includes(e.rowNode.id)?(n=n.filter((function(o){return o!==e.rowNode.id})),A([],d,o.code),n):n&&v&&n.length>0&&n.includes(e.rowNode.id)?n:(A([e.rowNode.id],d,o.code),[].concat((0,t.Z)(n),[e.rowNode.id]))})):"Delete"===o.code||"Backspace"===o.code?(I([e.rowNode.id]),A([e.rowNode.id],d,o.code)):void 0},disableVirtualization:!0,isRowSelectable:x,getCellClassName:b})})}));function m(e){var o=e.page,n=e.onPageChange,t=e.className,i=(0,d.l)(),r=(0,s.P)(i,f.UB);return(0,p.jsx)(h.Z,{variant:"outlined",color:"primary",className:t,count:r,page:o+1,onChange:function(e,o){n(e,o-1)}})}function x(e){return(0,p.jsx)(v.x,(0,i.Z)({ActionsComponent:m},e))}function C(e){var o=(0,l.useContext)(w),n=o.rowSelectionModel,t=o.showFooterSelectedCount,r=o.footerPaginationPosition,a=o.footerChildren,c=o.rows;return(0,p.jsxs)(u.Z,{sx:{columnGap:"50px",display:"flex",width:"100%",justifyContent:"space-between",px:3,alignItems:"center",flexDirection:"right-left"===r?"row-reverse":"row"},children:[(0,p.jsx)(x,(0,i.Z)({},e)),(0,p.jsxs)(u.Z,{sx:{display:"flex",justifyContent:"right-left"===r?"flex-start":"flex-end",flex:1,alignItems:"center"},children:[t&&(0,p.jsxs)("div",{children:["Selected:",null===n||void 0===n?void 0:n.length]}),(0,p.jsx)("div",{children:a(n,c)})]})]})}o.Z=g},93263:function(e,o,n){var t,i=n(29439),r=n(74165),l=n(15861),a=n(72791),u=n(91933),c=n(3380),d=n(81582),s=n(54164),f=n(80184);function v(e,o,n){return(t=t||(0,l.Z)((0,r.Z)().mark((function e(o,n,t){var i,l=arguments;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=l.length>3&&void 0!==l[3]?l[3]:"",e.abrupt("return",o.get("".concat(null===t||void 0===t?void 0:t.url,"?").concat(null===t||void 0===t?void 0:t.queryUrlName,"=").concat(i),{headers:{Authorization:"Bearer ".concat(null===n||void 0===n?void 0:n.accessToken)}}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}o.Z=function(e){var o,n,t=e.link,h=e.uniqueId,p=e.queryKey,w=e.responseDataKey,g=e.columns,m=e.onSelected,x=void 0===m?function(){}:m,C=e.onRemoveSelected,b=void 0===C?function(){}:C,y=e.onSuccess,S=void 0===y?function(){}:y,k=e.searchRef,Z=e.onCellKeyDown,M=e.onCloseFunction,D=void 0===M?function(){}:M,j=e.CustomizeAxios,R=void 0===j?v:j,N=e.isRowSelectable,L=e.getCellClassName,P=(0,a.useContext)(c.V),I=P.myAxios,A=P.user,F=(0,a.useState)(!1),z=(0,i.Z)(F,2),E=z[0],K=z[1],B=(0,a.useState)([]),G=(0,i.Z)(B,2),q=G[0],H=G[1];function W(){return(o=o||(0,l.Z)((0,r.Z)().mark((function e(){var o,n=arguments;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=n.length>0&&void 0!==n[0]?n[0]:"",e.next=3,R(I,A,t,o);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var O=(0,u.useQuery)({queryKey:p,queryFn:function(){return(n=n||(0,l.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,W();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){var o=e;H(o.data[w]),S(o)},refetchOnWindowFocus:!1}),T=O.isLoading,U=O.refetch;return{show:E,rows:q,isLoading:T,openModal:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";(0,s.flushSync)((function(){K(!0)})),null!==k&&void 0!==k&&k.current&&(k.current.value=e,W(e).then((function(e){if(null===e||void 0===e||!e.data.success)return alert("Error : ".concat(null===e||void 0===e?void 0:e.data.message));H(e.data[w]),null!==k&&void 0!==k&&k.current&&k.current.focus()})))},closeModal:function(){var e;(K(!1),D)&&D(null===k||void 0===k||null===(e=k.current)||void 0===e?void 0:e.value)},ModalComponent:(0,f.jsx)(d.ZP,{getCellClassName:L,searchRef:k,showModal:E,onCloseModal:function(){var e;(K(!1),D)&&D(null===k||void 0===k||null===(e=k.current)||void 0===e?void 0:e.value)},onClickCloseIcon:function(){var e;(K(!1),D)&&D(null===k||void 0===k||null===(e=k.current)||void 0===e?void 0:e.value)},searchOnChange:function(e){},onSearchKeyEnter:function(e){W(e).then((function(e){if(null===e||void 0===e||!e.data.success)return alert("Error : ".concat(null===e||void 0===e?void 0:e.data.message));H(e.data[w])}))},onCellKeyDown:Z,height:300,isLoading:T,queryKey:p,columns:g,onSelectionChange:function(e,o){if(e.length<=0)return b(o);var n=new Set(e),t=o.filter((function(e){return n.has(e[h].toString())}));t.length<=0||x(t,o)},id:h,rows:q,setRows:H,isRowSelectable:N}),refetch:U}}},64230:function(e,o,n){n.d(o,{L:function(){return u},s:function(){return a}});var t=n(74165),i=n(15861),r=n(21830),l=n.n(r);function a(e){var o;l().fire({title:"Are you sure!",html:null!==e&&void 0!==e&&e.text?null===e||void 0===e?void 0:e.text:e.isUpdate?"Are you sure you want to make this change?":"Are you sure you want to delete this?",icon:"warning",input:"text",inputAttributes:{autocapitalize:"off"},showCancelButton:!0,confirmButtonText:"Save",confirmButtonColor:"green",showLoaderOnConfirm:!0,preConfirm:function(n){return(o=o||(0,i.Z)((0,t.Z)().mark((function o(n){return(0,t.Z)().wrap((function(o){for(;;)switch(o.prev=o.next){case 0:try{e.cb(n)}catch(t){l().showValidationMessage("\n            Request failed: ".concat(t,"\n          "))}case 1:case"end":return o.stop()}}),o)})))).apply(this,arguments)},allowOutsideClick:function(){return!l().isLoading()}}).then((function(o){if(o.isConfirmed&&e.isConfirm)return e.isConfirm();e.isDeclined&&e.isDeclined()}))}function u(e){l().fire({title:"Are you sure?",text:null!==e&&void 0!==e&&e.text?null===e||void 0===e?void 0:e.text:"Do you want to proceed with saving?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, save it!"}).then((function(o){if(o.isConfirmed&&e.isConfirm)return e.isConfirm();e.isDeclined&&e.isDeclined()}))}}}]);
//# sourceMappingURL=6086.a8019159.chunk.js.map