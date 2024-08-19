"use strict";(self.webpackChunkupward=self.webpackChunkupward||[]).push([[193],{13784:function(t,e,n){n.d(e,{Z:function(){return c}});var i=n(1413),o=n(45987),a=n(71652),r=n(93862),l=n(93777),d=n(80184),s=["label","name","onChange","value","onKeyDown","inputRef","datePickerRef","fullWidth","textField"];function c(t){var e=t.label,n=t.name,c=t.onChange,u=t.value,h=t.onKeyDown,p=t.inputRef,x=t.datePickerRef,g=t.fullWidth,f=t.textField,m=(0,o.Z)(t,s);return(0,d.jsx)(a._,{dateAdapter:r.H,children:(0,d.jsx)(l.M,(0,i.Z)({value:u,onChange:c,ref:x,slotProps:{textField:(0,i.Z)({size:"small",label:e,name:n,onKeyDown:h,inputRef:p,fullWidth:g},f)},sx:{minWidth:"200px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}},m))})}},23508:function(t,e,n){n.d(e,{bq:function(){return l}});var i,o=n(74165),a=n(15861);function r(t){var e=t.data,n=t.column,i=t.beforeArrangeData,o=t.adjustMaxHeight,a=t.fontSize,r=void 0===a?"11px":a,l=t.summaryHeight,d=void 0===l?0:l,s=[],c=0,u=[],h=document.querySelector(".content").getBoundingClientRect().height-o;return e.forEach((function(t,o){t=i(t);var a=document.querySelector(".content"),l=document.createElement("table"),p=l.insertRow();t.summaryReport&&h-c<=d+20&&(c+=h-c),n.forEach((function(e){var n=p.insertCell();l.style.visibility="hidden",l.style.width="100%",l.style.fontSize=r,function(t,e,n,i,o){t.style.width=n,t.textContent=e,i.appendChild(o)}(n,t[e.datakey],e.width,a,l)})),c+=p.getBoundingClientRect().height,a.removeChild(l),u.push(t),(c>=h||o===e.length-1&&c<h)&&(s.push(u),c=0,u=[])})),s}var l=function(t){return(i=i||(0,a.Z)((0,o.Z)().mark((function t(e){var n,i,a,l,d,s,c,u;return(0,o.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.data,i=e.column,a=e.beforeArrangeData,l=e.adjustMaxHeight,d=e.cb,s=e.fontSize,c=void 0===s?"11px":s,u=e.summaryHeight,void 0!==n){t.next=3;break}return t.abrupt("return",[]);case 3:if(!d){t.next=5;break}return t.abrupt("return",d({data:n,column:i,beforeArrangeData:a,adjustMaxHeight:l}));case 5:return t.abrupt("return",r({data:n,column:i,beforeArrangeData:a,adjustMaxHeight:l,fontSize:c,summaryHeight:u}));case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}},98847:function(t,e,n){n.r(e),n.d(e,{default:function(){return w},reducer:function(){return Z}});var i=n(74165),o=n(15861),a=n(4942),r=n(1413),l=n(72791),d=n(48550),s=n(64554),c=n(68096),u=n(94925),h=n(58406),p=n(23786),x=n(91933),g=n(3380),f=n(13784),m=n(39709),y=n(93862),b=n(71652),_=n(93777),S=n(71012),j=n(23508),v=n(16386),A=n(58340),D=n(80184),I={dateFormat:"Monthly",date:new Date,sub_acct:"All",title:""},Z=function(t,e){return"UPDATE_FIELD"===e.type?(0,r.Z)((0,r.Z)({},t),{},(0,a.Z)({},e.field,e.value)):t},z=[{datakey:"Temp_SlipDate",header:"DATE",width:"80px"},{datakey:"Slip_Code",header:"SLIP CODE",width:"90px"},{datakey:"acct_name",header:"ACCOUNT NAME",width:"130px"},{datakey:"IDNo",header:"IDENTITY",width:"300px"},{datakey:"Bank",header:"BANK/BRANCH",width:"130px"},{datakey:"cCheck_No",header:"CHECK #",width:"100px"},{datakey:"Debit",header:"DEBIT",width:"100px",type:"number"},{datakey:"Credit",header:"CREDIT",width:"100px",type:"number"},{datakey:"Ref_No",header:"REF #",width:"100px"}];function k(t,e){return"".concat("UMIS"===e?"UPWARD MANAGEMENT INSURANCE SERVICES":"UPWARD CONSULTANCY SERVICES AND MANAGEMENT INC.","\n").concat(t.dateFormat," Deposited Collections\n").concat(function(t){var e="";"Daily"===t.dateFormat?e=t.date.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}):"Monthly"===t.dateFormat&&(e=t.date.toLocaleDateString("en-US",{year:"numeric",month:"long"}));return e.toString()}(t))}function C(t){var e,n=t.state,r=t.dispatch,S=(0,l.useRef)(null),j=(0,l.useContext)(g.V),v=j.myAxios,A=j.user,I=(0,x.useQuery)({queryKey:"sub-accounts",queryFn:function(){return(e=e||(0,o.Z)((0,i.Z)().mark((function t(){return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v.get("/reports/accounting/get-sub-account-acronym",{headers:{Authorization:"Bearer ".concat(null===A||void 0===A?void 0:A.accessToken)}});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}}),Z=I.data,z=I.isLoading,C=function(t){var e=t.target,n=e.name,i=e.value;r({type:"UPDATE_FIELD",field:n,value:i})};return(0,D.jsxs)("div",{style:{padding:"50px 20px"},children:[(0,D.jsx)(d.Z,{label:"Title",fullWidth:!0,name:"title",value:n.title,onChange:C,rows:6,multiline:!0,InputProps:{style:{height:"140px",fontSize:"12px"}},sx:{flex:1,".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,D.jsxs)(s.Z,{sx:function(t){return(0,a.Z)({height:"100%",display:"grid",gridTemplateColumns:"repeat(1,1fr)",gap:"10px",margin:"10px 0"},t.breakpoints.down("sm"),{gridTemplateColumns:"repeat(1,1fr)"})},children:[(0,D.jsxs)(c.Z,{fullWidth:!0,variant:"outlined",size:"small",sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,D.jsx)(u.Z,{id:"date_format",children:"Report"}),(0,D.jsxs)(h.Z,{labelId:"date_format",value:n.dateFormat,label:"Report",name:"dateFormat",onChange:function(t){C(t),n.dateFormat=t.target.value,r({type:"UPDATE_FIELD",field:"title",value:k(n,null===A||void 0===A?void 0:A.department)})},sx:{height:"27px",fontSize:"14px"},children:[(0,D.jsx)(p.Z,{value:"Daily",children:"Daily"}),(0,D.jsx)(p.Z,{value:"Monthly",children:"Monthly"})]})]}),z?(0,D.jsx)(m.Z,{loading:z}):(0,D.jsxs)(c.Z,{fullWidth:!0,variant:"outlined",size:"small",sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,D.jsx)(u.Z,{id:"sub_account_id",children:"Sub Account"}),(0,D.jsxs)(h.Z,{labelId:"sub_account_id",value:n.sub_acct,label:"Sub Account",name:"sub_acct",onChange:C,sx:{height:"27px",fontSize:"14px"},children:[(0,D.jsx)(p.Z,{value:"All",children:"All"}),null===Z||void 0===Z?void 0:Z.data.sub_account.map((function(t,e){return(0,D.jsx)(p.Z,{value:t.Acronym,children:t.Acronym},e)}))]})]}),"Monthly"===n.dateFormat&&(0,D.jsx)(b._,{dateAdapter:y.H,children:(0,D.jsx)(_.M,{sx:{width:"100%",".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},slotProps:{textField:{size:"small",name:"",InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}},label:"Date",views:["month","year"],value:n.date,onChange:function(t){r({type:"UPDATE_FIELD",field:"date",value:t}),n.date=t,r({type:"UPDATE_FIELD",field:"title",value:k(n,null===A||void 0===A?void 0:A.department)})}})}),"Daily"===n.dateFormat&&(0,D.jsx)(f.Z,{fullWidth:!0,label:"Date From",onChange:function(t){r({type:"UPDATE_FIELD",field:"date",value:t}),n.date=t,r({type:"UPDATE_FIELD",field:"title",value:k(n,null===A||void 0===A?void 0:A.department)})},value:new Date(n.date),onKeyDown:function(t){if("Enter"===t.code||"NumpadEnter"===t.code)var e=setTimeout((function(){var t,n;null===(t=S.current)||void 0===t||null===(n=t.querySelector("button"))||void 0===n||n.click(),clearTimeout(e)}),150)},datePickerRef:S,textField:{InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}})]})]})}function w(){var t,e=(0,l.useContext)(g.V),n=e.user,a=e.myAxios;return I.title=k(I,null===n||void 0===n?void 0:n.department),(0,D.jsx)(S.ZP,{column:z,initialState:I,Setting:function(t,e){return(0,D.jsx)(C,{state:t,dispatch:e})},onReportSubmit:function(e,r,d){return(t=t||(0,o.Z)((0,i.Z)().mark((function t(e,o,r){var d,s,c,u,h,p;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.post("/reports/accounting/deposited-collection-report",r,{headers:{Authorization:"Bearer ".concat(null===n||void 0===n?void 0:n.accessToken)}});case 2:return d=t.sent,t.next=5,d.data;case 5:s=t.sent,c=function(){return(0,D.jsx)("table",{children:(0,D.jsx)("tbody",{children:s.summary.map((function(t,e){return!t.summ||t.header||t.footer||t.signature?t.summ&&t.header?(0,D.jsx)(l.Fragment,{children:(0,D.jsxs)("tr",{children:[(0,D.jsx)("td",{colSpan:3,style:{fontSize:"11.5px",fontWeight:"bolder",textAlign:"right"}}),(0,D.jsx)("td",{colSpan:2,style:{fontSize:"11.5px",fontWeight:"bolder",textAlign:"center"},children:t.IDNo}),(0,D.jsx)("td",{colSpan:1,style:{fontSize:"11.5px",fontWeight:"bolder",textAlign:"left"},children:t.Debit}),(0,D.jsx)("td",{colSpan:1,style:{fontSize:"11.5px",fontWeight:"bolder",textAlign:"left"},children:t.Credit})]})},e):t.summ&&t.footer?(0,D.jsx)(l.Fragment,{children:(0,D.jsxs)("tr",{children:[(0,D.jsx)("td",{colSpan:3,style:{fontSize:"11px",fontWeight:"bolder",textAlign:"right"}}),(0,D.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"bolder",textAlign:"right"},children:t.ORNo}),(0,D.jsx)("td",{colSpan:1,style:{fontSize:"11px",fontWeight:"bolder",textAlign:"right",borderTop:"1px solid black",borderBottom:"2px solid black"},children:t.Debit}),(0,D.jsx)("td",{colSpan:1,style:{fontSize:"11px",fontWeight:"bolder",textAlign:"right",borderTop:"1px solid black",borderBottom:"2px solid black"},children:t.Credit})]})},e):t.summ&&t.signature?(0,D.jsxs)(l.Fragment,{children:[(0,D.jsx)("tr",{style:{height:"40px"}}),(0,D.jsx)("tr",{children:(0,D.jsx)("td",{colSpan:z.length,style:{fontSize:"11px",fontWeight:"bolder",textAlign:"center"},children:"Prepared: ________________ \xa0\xa0\xa0\xa0\xa0 Checked: ________________ \xa0\xa0\xa0\xa0\xa0Approved: ________________"})})]},e):t.summary?(0,D.jsxs)(l.Fragment,{children:[(0,D.jsx)("tr",{style:{height:"15px"}}),(0,D.jsx)("tr",{children:(0,D.jsx)("td",{colSpan:3,style:{fontSize:"11px",fontWeight:"bolder",textAlign:"right"},children:t.acct_name})}),(0,D.jsx)("tr",{style:{height:"15px"}})]},e):(0,D.jsx)(l.Fragment,{},e):(0,D.jsx)(l.Fragment,{children:(0,D.jsxs)("tr",{children:[(0,D.jsx)("td",{colSpan:3,style:{fontSize:"11px",fontWeight:"500",textAlign:"right"}}),(0,D.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"500",textAlign:"left"},children:t.acct_name}),(0,D.jsx)("td",{colSpan:1,style:{fontSize:"11px",fontWeight:"500",textAlign:"right"},children:t.Debit}),(0,D.jsx)("td",{colSpan:1,style:{fontSize:"11px",fontWeight:"500",textAlign:"right"},children:t.Credit})]})},e)}))})})},u=A.renderToString((0,D.jsx)(c,{})),(h=document.createElement("div")).innerHTML=u,document.body.appendChild(h),p=h.getBoundingClientRect().height,document.body.removeChild(h),(0,j.bq)({data:s.report,column:z,beforeArrangeData:function(t){var e,n,i=parseFloat((null!==(e=t.Debit)&&void 0!==e?e:"0.00").toString().replace(/,/,"")),o=parseFloat((null!==(n=t.Credit)&&void 0!==n?n:"0.00").toString().replace(/,/,""));return isNaN(i)||(t.Debit=i.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})),isNaN(o)||(t.Credit=o.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})),t},adjustMaxHeight:150,summaryHeight:p}).then((function(t){e(t),o(!1)}));case 14:case"end":return t.stop()}}),t)})))).apply(this,arguments)},scaleDefaultValue:90,drawTable:function(t,e){return t.map((function(n,i){return(0,D.jsxs)("div",{className:"page out-page",children:[(0,D.jsx)("div",{className:"header",style:{height:"50px"}}),(0,D.jsx)("div",{className:"content",children:(0,D.jsxs)("table",{children:[(0,D.jsxs)("thead",{children:[e.title.split("\n").map((function(t,e){return(0,D.jsx)("tr",{children:(0,D.jsx)("th",{style:{fontSize:"14px",fontWeight:"bold",textAlign:"left"},colSpan:z.length,children:t})},e)})),(0,D.jsx)("tr",{style:{height:"40px"}}),(0,D.jsx)("tr",{children:z.map((function(e,n){return(0,D.jsx)("th",{onDoubleClick:function(n){return(0,S.PE)(n,e.datakey,t)},style:{width:e.width,fontSize:"10.5px",fontWeight:"bold",textAlign:"left"},children:e.header},n)}))})]}),(0,D.jsx)("tbody",{children:n.map((function(t,e){return!t.summ||t.header||t.footer||t.signature?t.summ&&t.header?(0,D.jsx)(l.Fragment,{children:(0,D.jsxs)("tr",{children:[(0,D.jsx)("td",{colSpan:3,style:{fontSize:"11.5px",fontWeight:"bolder",textAlign:"right"}}),(0,D.jsx)("td",{colSpan:2,style:{fontSize:"11.5px",fontWeight:"bolder",textAlign:"center"},children:t.IDNo}),(0,D.jsx)("td",{colSpan:1,style:{fontSize:"11.5px",fontWeight:"bolder",textAlign:"left"},children:t.Debit}),(0,D.jsx)("td",{colSpan:1,style:{fontSize:"11.5px",fontWeight:"bolder",textAlign:"left"},children:t.Credit})]})},e):t.summ&&t.footer?(0,D.jsx)(l.Fragment,{children:(0,D.jsxs)("tr",{children:[(0,D.jsx)("td",{colSpan:3,style:{fontSize:"11px",fontWeight:"bolder",textAlign:"right"}}),(0,D.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"bolder",textAlign:"right"},children:t.ORNo}),(0,D.jsx)("td",{colSpan:1,style:{fontSize:"11px",fontWeight:"bolder",textAlign:"right",borderTop:"1px solid black",borderBottom:"2px solid black"},children:t.Debit}),(0,D.jsx)("td",{colSpan:1,style:{fontSize:"11px",fontWeight:"bolder",textAlign:"right",borderTop:"1px solid black",borderBottom:"2px solid black"},children:t.Credit})]})},e):t.summ&&t.signature?(0,D.jsxs)(l.Fragment,{children:[(0,D.jsx)("tr",{style:{height:"40px"}}),(0,D.jsx)("tr",{children:(0,D.jsx)("td",{colSpan:z.length,style:{fontSize:"11px",fontWeight:"bolder",textAlign:"center"},children:"Prepared: ________________ \xa0\xa0\xa0\xa0\xa0 Checked: ________________ \xa0\xa0\xa0\xa0\xa0Approved: ________________"})})]},e):t.summary?(0,D.jsxs)(l.Fragment,{children:[(0,D.jsx)("tr",{style:{height:"15px"}}),(0,D.jsx)("tr",{children:(0,D.jsx)("td",{colSpan:3,style:{fontSize:"11px",fontWeight:"bolder",textAlign:"right"},children:t.acct_name})}),(0,D.jsx)("tr",{style:{height:"15px"}})]},e):t.follows?(0,D.jsxs)(l.Fragment,{children:[(0,D.jsx)("tr",{style:{height:"10px"}}),(0,D.jsx)("tr",{children:(0,D.jsx)("td",{colSpan:z.length,style:{fontSize:"11px",fontWeight:"500",textAlign:"center"},children:t.cCheck_No})})]},e):(0,D.jsx)("tr",{children:z.map((function(n,o){return(0,D.jsx)(l.Fragment,{children:t.total&&"DRTitle"===n.datakey||t.total&&"CRTitle"===n.datakey?(0,D.jsx)(D.Fragment,{}):(0,D.jsx)("td",{onClick:S.mp,className:"editable not-looking page-".concat(i,"  row-").concat(e,"_col-").concat(o),style:{fontSize:"11px",fontWeight:t.total?"bold":"500",width:"".concat(n.width," !important"),textAlign:"number"===n.type?"right":"left",borderTop:t.total&&"Debit"===n.datakey||t.total&&"Credit"===n.datakey?"1px solid black":"",padding:"0 5px"},children:t[n.datakey]})},o)}))},e):(0,D.jsx)(l.Fragment,{children:(0,D.jsxs)("tr",{children:[(0,D.jsx)("td",{colSpan:3,style:{fontSize:"11px",fontWeight:"500",textAlign:"right"}}),(0,D.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"500",textAlign:"left"},children:t.acct_name}),(0,D.jsx)("td",{colSpan:1,style:{fontSize:"11px",fontWeight:"500",textAlign:"right"},children:t.Debit}),(0,D.jsx)("td",{colSpan:1,style:{fontSize:"11px",fontWeight:"500",textAlign:"right"},children:t.Credit})]})},e)}))})]})}),(0,D.jsxs)("div",{className:"footer",style:{height:"50px",display:"flex",justifyContent:"space-between"},children:[(0,D.jsx)("p",{style:{fontSize:"10px",fontWeight:"bold"},children:(0,v.Z)(new Date,"dd/MM/yyyy")}),(0,D.jsxs)("p",{style:{fontSize:"10px",fontWeight:"bold"},children:["Page ",i+1," of ",t.length]})]})]},i)}))},pageHeight:"8.5in",pageWidth:"13in"})}},39709:function(t,e,n){n.d(e,{Z:function(){return S}});var i=n(4942),o=n(63366),a=n(87462),r=n(72791),l=n(14036),d=n(67384),s=n(94419),c=n(66934),u=n(31402),h=n(36151),p=n(13239),x=n(21217);function g(t){return(0,x.Z)("MuiLoadingButton",t)}var f=(0,n(75878).Z)("MuiLoadingButton",["root","loading","loadingIndicator","loadingIndicatorCenter","loadingIndicatorStart","loadingIndicatorEnd","endIconLoadingEnd","startIconLoadingStart"]),m=n(80184),y=["children","disabled","id","loading","loadingIndicator","loadingPosition","variant"],b=(0,c.ZP)(h.Z,{shouldForwardProp:function(t){return function(t){return"ownerState"!==t&&"theme"!==t&&"sx"!==t&&"as"!==t&&"classes"!==t}(t)||"classes"===t},name:"MuiLoadingButton",slot:"Root",overridesResolver:function(t,e){return[e.root,e.startIconLoadingStart&&(0,i.Z)({},"& .".concat(f.startIconLoadingStart),e.startIconLoadingStart),e.endIconLoadingEnd&&(0,i.Z)({},"& .".concat(f.endIconLoadingEnd),e.endIconLoadingEnd)]}})((function(t){var e=t.ownerState,n=t.theme;return(0,a.Z)((0,i.Z)({},"& .".concat(f.startIconLoadingStart,", & .").concat(f.endIconLoadingEnd),{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0}),"center"===e.loadingPosition&&(0,i.Z)({transition:n.transitions.create(["background-color","box-shadow","border-color"],{duration:n.transitions.duration.short})},"&.".concat(f.loading),{color:"transparent"}),"start"===e.loadingPosition&&e.fullWidth&&(0,i.Z)({},"& .".concat(f.startIconLoadingStart,", & .").concat(f.endIconLoadingEnd),{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0,marginRight:-8}),"end"===e.loadingPosition&&e.fullWidth&&(0,i.Z)({},"& .".concat(f.startIconLoadingStart,", & .").concat(f.endIconLoadingEnd),{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0,marginLeft:-8}))})),_=(0,c.ZP)("span",{name:"MuiLoadingButton",slot:"LoadingIndicator",overridesResolver:function(t,e){var n=t.ownerState;return[e.loadingIndicator,e["loadingIndicator".concat((0,l.Z)(n.loadingPosition))]]}})((function(t){var e=t.theme,n=t.ownerState;return(0,a.Z)({position:"absolute",visibility:"visible",display:"flex"},"start"===n.loadingPosition&&("outlined"===n.variant||"contained"===n.variant)&&{left:"small"===n.size?10:14},"start"===n.loadingPosition&&"text"===n.variant&&{left:6},"center"===n.loadingPosition&&{left:"50%",transform:"translate(-50%)",color:(e.vars||e).palette.action.disabled},"end"===n.loadingPosition&&("outlined"===n.variant||"contained"===n.variant)&&{right:"small"===n.size?10:14},"end"===n.loadingPosition&&"text"===n.variant&&{right:6},"start"===n.loadingPosition&&n.fullWidth&&{position:"relative",left:-10},"end"===n.loadingPosition&&n.fullWidth&&{position:"relative",right:-10})})),S=r.forwardRef((function(t,e){var n=(0,u.Z)({props:t,name:"MuiLoadingButton"}),i=n.children,r=n.disabled,c=void 0!==r&&r,h=n.id,x=n.loading,f=void 0!==x&&x,S=n.loadingIndicator,j=n.loadingPosition,v=void 0===j?"center":j,A=n.variant,D=void 0===A?"text":A,I=(0,o.Z)(n,y),Z=(0,d.Z)(h),z=null!=S?S:(0,m.jsx)(p.Z,{"aria-labelledby":Z,color:"inherit",size:16}),k=(0,a.Z)({},n,{disabled:c,loading:f,loadingIndicator:z,loadingPosition:v,variant:D}),C=function(t){var e=t.loading,n=t.loadingPosition,i=t.classes,o={root:["root",e&&"loading"],startIcon:[e&&"startIconLoading".concat((0,l.Z)(n))],endIcon:[e&&"endIconLoading".concat((0,l.Z)(n))],loadingIndicator:["loadingIndicator",e&&"loadingIndicator".concat((0,l.Z)(n))]},r=(0,s.Z)(o,g,i);return(0,a.Z)({},i,r)}(k),w=f?(0,m.jsx)(_,{className:C.loadingIndicator,ownerState:k,children:z}):null;return(0,m.jsxs)(b,(0,a.Z)({disabled:c||f,id:Z,ref:e},I,{variant:D,classes:C,ownerState:k,children:["end"===k.loadingPosition?i:w,"end"===k.loadingPosition?w:i]}))}))},45987:function(t,e,n){n.d(e,{Z:function(){return o}});var i=n(63366);function o(t,e){if(null==t)return{};var n,o,a=(0,i.Z)(t,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(o=0;o<r.length;o++)n=r[o],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}}}]);
//# sourceMappingURL=193.4105bd99.chunk.js.map