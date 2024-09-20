"use strict";(self.webpackChunkupward=self.webpackChunkupward||[]).push([[2950],{13784:function(e,o,n){n.d(o,{Z:function(){return d}});var t=n(1413),i=n(45987),r=n(71652),l=n(93862),a=n(93777),c=n(80184),u=["label","name","onChange","value","onKeyDown","inputRef","datePickerRef","fullWidth","textField","minWidth"];function d(e){var o=e.label,n=e.name,d=e.onChange,s=e.value,f=e.onKeyDown,v=e.inputRef,h=e.datePickerRef,p=e.fullWidth,w=e.textField,g=e.minWidth,m=void 0===g?"200px":g,x=(0,i.Z)(e,u);return(0,c.jsx)(r._,{dateAdapter:l.H,children:(0,c.jsx)(a.M,(0,t.Z)({floatingLabelStyle:{color:"black"},value:s,onChange:d,ref:h,slotProps:{textField:(0,t.Z)({size:"small",label:o,name:n,onKeyDown:f,inputRef:v,fullWidth:p},w)},InputLabelProps:{sx:{color:"black"}},sx:{minWidth:m,fieldset:{borderColor:"black"},".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}},x))})}},81582:function(e,o,n){n.d(o,{XT:function(){return v},ZP:function(){return f},rO:function(){return h}});n(72791);var t=n(88447),i=n(64554),r=n(20890),l=n(48550),a=n(13400),c=n(29823),u=n(89767),d=n(80184),s={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"70%",bgcolor:"background.paper",boxShadow:24,p:4,heigth:"auto"};function f(e){var o=e.height,n=e.isLoading,f=(e.queryKey,e.columns),p=e.onSelectionChange,w=(e.setRows,e.rows),g=e.id,m=e.onCloseModal,x=e.showModal,C=e.onClickCloseIcon,b=e.searchOnChange,y=e.title,S=void 0===y?"":y,k=e.searchRef,Z=(e.onCellKeyDown,e.onSearchKeyEnter),M=void 0===Z?function(){}:Z,D=e.isRowSelectable,j=e.getCellClassName,R=v();return(0,d.jsx)(t.Z,{open:x,onClose:m,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:(0,d.jsxs)(i.Z,{sx:s,children:[(0,d.jsx)(r.Z,{id:"modal-modal-title",variant:"h6",component:"h2",mb:2,children:S}),(0,d.jsx)(l.Z,{size:"small",label:"Search",sx:{marginBottom:"10px"},fullWidth:!0,onChange:b,InputProps:{inputRef:k},onKeyDown:function(e){var o;"Enter"!==e.code&&"NumpadEnter"!==e.code||(e.preventDefault(),M(null===k||void 0===k||null===(o=k.current)||void 0===o?void 0:o.value));h(e,R,null===k||void 0===k?void 0:k.current)}}),(0,d.jsx)("div",{className:"".concat(R," main-table-selection-container"),style:{position:"relative",height:"".concat(o+20,"px")},children:(0,d.jsx)(u.Z,{isSingleSelection:!0,isRowFreeze:!1,columns:f,isLoading:n,dataSelection:function(e,o,n){p(e,o)},table_id:g,rows:w,isRowSelectable:D,getCellClassName:j})}),(0,d.jsx)("div",{style:{position:"absolute",top:"10px",right:"10px"},children:(0,d.jsx)(a.Z,{"aria-label":"search-client",color:"secondary",onClick:C,children:(0,d.jsx)(c.Z,{})})})]})})}function v(){return"main-"+Math.floor(1e4*Math.random())}function h(e,o,n){var t=o;if("ArrowDown"===e.code){var i,r=document.querySelectorAll(".".concat(t," .MuiDataGrid-row"));e.preventDefault(),null===(i=r[0])||void 0===i||i.classList.add("hover-keyboard"),function(e,o){var n=document.querySelector(".".concat(e," .MuiDataGrid-row")),t=null===n||void 0===n?void 0:n.querySelector("input");null===t||void 0===t||t.focus();var i=new MouseEvent("mouseenter",{bubbles:!0,cancelable:!0,view:window});null===n||void 0===n||n.dispatchEvent(i),null===t||void 0===t||t.addEventListener("keydown",(function(e){"ArrowUp"===e.key&&(e.preventDefault(),o.focus()),"ArrowUp"===e.key&&(null===n||void 0===n||n.classList.remove("hover-keyboard"))}))}(o,n),r.forEach((function(e,o){e.addEventListener("keydown",(function(e){if("ArrowUp"===e.key){var n,t;if(o<=0)return;return e.preventDefault(),null===(n=r[o])||void 0===n||n.classList.remove("hover-keyboard"),void(null===(t=r[o-1])||void 0===t||t.classList.add("hover-keyboard"))}if("ArrowDown"===e.key){var i,l;if(e.preventDefault(),o>=r.length-1)return;null===(i=r[o])||void 0===i||i.classList.remove("hover-keyboard"),null===(l=r[o+1])||void 0===l||l.classList.add("hover-keyboard")}}))}))}}},89767:function(e,o,n){var t=n(93433),i=n(1413),r=n(29439),l=n(72791),a=n(57482),c=n(64554),u=n(56214),d=n(29961),s=n(54277),f=n(70169),v=n(6484),h=n(16088),p=n(80184),w=(0,l.createContext)({rows:[],rowSelectionModel:[],footerChildren:function(){return(0,p.jsx)("div",{})},footerPaginationPosition:"right-left",showFooterSelectedCount:!0}),g=(0,l.forwardRef)((function(e,o){var n=e.isLoading,c=e.columns,d=e.rows,s=e.table_id,f=e.isSingleSelection,v=e.isRowFreeze,h=e.dataSelection,g=e.CustomFooterComponent,m=void 0===g?C:g,x=e.isRowSelectable,b=e.getCellClassName,y=e.checkboxSelection,S=void 0===y||y,k=e.footerChildren,Z=void 0===k?function(e,o){return(0,p.jsx)("div",{})}:k,M=e.footerPaginationPosition,D=void 0===M?"right-left":M,j=e.showFooterSelectedCount,R=void 0===j||j,L=(0,l.useState)([]),N=(0,r.Z)(L,2),z=N[0],P=N[1];function A(e,o,n){h&&h(e,o,n)}(0,l.useImperativeHandle)(o,(function(){return{removeSelection:function(){P([])},getSelectedRows:function(){return d.filter((function(e){return null===z||void 0===z?void 0:z.includes(e[s])}))},setSelectedRows:function(e){P(e)}}}));var I=[];return(0,p.jsx)(w.Provider,{value:{showFooterSelectedCount:R,footerPaginationPosition:D,rowSelectionModel:z,rows:d,footerChildren:Z},children:(0,p.jsx)(u._$,{slots:{loadingOverlay:a.Z,footer:m},initialState:{pagination:{paginationModel:{pageSize:35}}},loading:n,getRowId:function(e){return e[s]},columns:c.filter((function(e){return!e.hide})),rows:d,showCellVerticalBorder:!0,showColumnVerticalBorder:!0,checkboxSelection:S,rowSelectionModel:z,rowHeight:25,columnHeaderHeight:35,pageSizeOptions:[10,20,35,50,75,100],sx:(0,i.Z)((0,i.Z)({"& .cash":{color:"#ec4899"},"& .check":{color:"#0891b2"},"& .approved":{color:"green"},"& .pending":{color:"orange"},"& .disapproved":{color:"red"},"& .normal":{color:"red"},"& .MuiDataGrid-row.Mui-selected:hover":{color:"black","& .MuiSvgIcon-root ":{fill:"#3b82f6"}},"& .hover-keyboard":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiDataGrid-row:hover":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiDataGrid-row.hover":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiTablePagination-root p ":{padding:"0 !important"}},{"& .MuiDataGrid-columnHeaders":{background:"#64748b",color:"white",fontSize:"14px"},"& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer .MuiSvgIcon-root ":{display:f||v?"none":"block",fill:"white"},"& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer input ":{display:f||v?"none":"block"}}),{fontSize:13,fontWeight:500,"& .MuiDataGrid-checkboxInput":{height:"27px",width:"27px"},"& .MuiDataGrid-checkboxInput svg":{height:"20px",width:"20px"}}),onRowSelectionModelChange:function(e){if(v){if(e.length<=0)return;if(I=e,z.includes(I[I.length-1]))return;return P(e),void A([e[e.length-1]],d,null)}if(!v&&f)if(z&&(null===z||void 0===z?void 0:z.length)>0){var o=new Set(z);P(e.filter((function(e){return!o.has(e)})))}else P(e);else P(e);A([e[e.length-1]],d,null)},onCellKeyDown:function(e,o){if(["NumpadEnter","Enter","Delete","Backspace"].includes(o.code))return o.preventDefault(),"Enter"===o.code||"NumpadEnter"===o.code?f&&!v?P((function(n){return n&&n.length>0&&n[0]===e.rowNode.id?(A([],d,o.code),[]):(A([e.rowNode.id],d,o.code),[e.rowNode.id])})):void P((function(n){return n&&!v&&n.length>0&&n.includes(e.rowNode.id)?(n=n.filter((function(o){return o!==e.rowNode.id})),A([],d,o.code),n):n&&v&&n.length>0&&n.includes(e.rowNode.id)?n:(A([e.rowNode.id],d,o.code),[].concat((0,t.Z)(n),[e.rowNode.id]))})):"Delete"===o.code||"Backspace"===o.code?(P([e.rowNode.id]),A([e.rowNode.id],d,o.code)):void 0},disableVirtualization:!0,isRowSelectable:x,getCellClassName:b})})}));function m(e){var o=e.page,n=e.onPageChange,t=e.className,i=(0,d.l)(),r=(0,s.P)(i,f.UB);return(0,p.jsx)(h.Z,{variant:"outlined",color:"primary",className:t,count:r,page:o+1,onChange:function(e,o){n(e,o-1)}})}function x(e){return(0,p.jsx)(v.x,(0,i.Z)({ActionsComponent:m},e))}function C(e){var o=(0,l.useContext)(w),n=o.rowSelectionModel,t=o.showFooterSelectedCount,r=o.footerPaginationPosition,a=o.footerChildren,u=o.rows;return(0,p.jsxs)(c.Z,{sx:{columnGap:"50px",display:"flex",width:"100%",justifyContent:"space-between",px:3,alignItems:"center",flexDirection:"right-left"===r?"row-reverse":"row"},children:[(0,p.jsx)(x,(0,i.Z)({},e)),(0,p.jsxs)(c.Z,{sx:{display:"flex",justifyContent:"right-left"===r?"flex-start":"flex-end",flex:1,alignItems:"center"},children:[t&&(0,p.jsxs)("div",{children:["Selected:",null===n||void 0===n?void 0:n.length]}),(0,p.jsx)("div",{children:a(n,u)})]})]})}o.Z=g},93263:function(e,o,n){var t,i=n(29439),r=n(74165),l=n(15861),a=n(72791),c=n(91933),u=n(3380),d=n(81582),s=n(54164),f=n(80184);function v(e,o,n){return(t=t||(0,l.Z)((0,r.Z)().mark((function e(o,n,t){var i,l=arguments;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=l.length>3&&void 0!==l[3]?l[3]:"",e.abrupt("return",o.get("".concat(null===t||void 0===t?void 0:t.url,"?").concat(null===t||void 0===t?void 0:t.queryUrlName,"=").concat(i),{headers:{Authorization:"Bearer ".concat(null===n||void 0===n?void 0:n.accessToken)}}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}o.Z=function(e){var o,n,t=e.link,h=e.uniqueId,p=e.queryKey,w=e.responseDataKey,g=e.columns,m=e.onSelected,x=void 0===m?function(){}:m,C=e.onRemoveSelected,b=void 0===C?function(){}:C,y=e.onSuccess,S=void 0===y?function(){}:y,k=e.searchRef,Z=e.onCellKeyDown,M=e.onCloseFunction,D=void 0===M?function(){}:M,j=e.CustomizeAxios,R=void 0===j?v:j,L=e.isRowSelectable,N=e.getCellClassName,z=(0,a.useContext)(u.V),P=z.myAxios,A=z.user,I=(0,a.useState)(!1),E=(0,i.Z)(I,2),F=E[0],K=E[1],B=(0,a.useState)([]),G=(0,i.Z)(B,2),q=G[0],H=G[1];function W(){return(o=o||(0,l.Z)((0,r.Z)().mark((function e(){var o,n=arguments;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=n.length>0&&void 0!==n[0]?n[0]:"",e.next=3,R(P,A,t,o);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var O=(0,c.useQuery)({queryKey:p,queryFn:function(){return(n=n||(0,l.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,W();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){var o=e;H(o.data[w]),S(o)},refetchOnWindowFocus:!1}),V=O.isLoading,T=O.refetch;return{show:F,rows:q,isLoading:V,openModal:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";(0,s.flushSync)((function(){K(!0)})),null!==k&&void 0!==k&&k.current&&(k.current.value=e,W(e).then((function(e){if(null===e||void 0===e||!e.data.success)return alert("Error : ".concat(null===e||void 0===e?void 0:e.data.message));H(e.data[w]),null!==k&&void 0!==k&&k.current&&k.current.focus()})))},closeModal:function(){var e;(K(!1),D)&&D(null===k||void 0===k||null===(e=k.current)||void 0===e?void 0:e.value)},ModalComponent:(0,f.jsx)(d.ZP,{getCellClassName:N,searchRef:k,showModal:F,onCloseModal:function(){var e;(K(!1),D)&&D(null===k||void 0===k||null===(e=k.current)||void 0===e?void 0:e.value)},onClickCloseIcon:function(){var e;(K(!1),D)&&D(null===k||void 0===k||null===(e=k.current)||void 0===e?void 0:e.value)},searchOnChange:function(e){},onSearchKeyEnter:function(e){W(e).then((function(e){if(null===e||void 0===e||!e.data.success)return alert("Error : ".concat(null===e||void 0===e?void 0:e.data.message));H(e.data[w])}))},onCellKeyDown:Z,height:300,isLoading:V,queryKey:p,columns:g,onSelectionChange:function(e,o){if(e.length<=0)return b(o);var n=new Set(e),t=o.filter((function(e){return n.has(e[h].toString())}));t.length<=0||x(t,o)},id:h,rows:q,setRows:H,isRowSelectable:L}),refetch:T}}},64230:function(e,o,n){n.d(o,{L:function(){return c},s:function(){return a}});var t=n(74165),i=n(15861),r=n(21830),l=n.n(r);function a(e){var o;l().fire({title:"Are you sure!",html:null!==e&&void 0!==e&&e.text?null===e||void 0===e?void 0:e.text:e.isUpdate?"Are you sure you want to make this change?":"Are you sure you want to delete this?",icon:"warning",input:"text",inputAttributes:{autocapitalize:"off"},showCancelButton:!0,confirmButtonText:"Save",confirmButtonColor:"green",showLoaderOnConfirm:!0,preConfirm:function(n){return(o=o||(0,i.Z)((0,t.Z)().mark((function o(n){return(0,t.Z)().wrap((function(o){for(;;)switch(o.prev=o.next){case 0:try{e.cb(n)}catch(t){l().showValidationMessage("\n            Request failed: ".concat(t,"\n          "))}case 1:case"end":return o.stop()}}),o)})))).apply(this,arguments)},allowOutsideClick:function(){return!l().isLoading()}}).then((function(o){if(o.isConfirmed&&e.isConfirm)return e.isConfirm();e.isDeclined&&e.isDeclined()}))}function c(e){l().fire({title:"Are you sure?",text:null!==e&&void 0!==e&&e.text?null===e||void 0===e?void 0:e.text:"Do you want to proceed with saving?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, save it!"}).then((function(o){if(o.isConfirmed&&e.isConfirm)return e.isConfirm();e.isDeclined&&e.isDeclined()}))}},42419:function(e,o,n){var t=n(64836);o.Z=void 0;var i=t(n(45649)),r=n(80184),l=(0,i.default)((0,r.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");o.Z=l},84669:function(e,o,n){var t=n(64836);o.Z=void 0;var i=t(n(45649)),r=n(80184),l=(0,i.default)((0,r.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"}),"NotInterested");o.Z=l},86753:function(e,o,n){var t=n(64836);o.Z=void 0;var i=t(n(45649)),r=n(80184),l=(0,i.default)((0,r.jsx)("path",{d:"M12 5V2L8 6l4 4V7c3.31 0 6 2.69 6 6 0 2.97-2.17 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93 0-4.42-3.58-8-8-8zm-6 8c0-1.65.67-3.15 1.76-4.24L6.34 7.34C4.9 8.79 4 10.79 4 13c0 4.08 3.05 7.44 7 7.93v-2.02c-2.83-.48-5-2.94-5-5.91z"}),"RestartAlt");o.Z=l}}]);
//# sourceMappingURL=2950.6f31ac18.chunk.js.map