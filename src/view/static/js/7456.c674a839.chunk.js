"use strict";(self.webpackChunkupward=self.webpackChunkupward||[]).push([[7456],{13784:function(t,e,n){n.d(e,{Z:function(){return c}});var i=n(1413),o=n(45987),r=n(71652),a=n(93862),l=n(93777),d=n(80184),s=["label","name","onChange","value","onKeyDown","inputRef","datePickerRef","fullWidth","textField","minWidth"];function c(t){var e=t.label,n=t.name,c=t.onChange,h=t.value,x=t.onKeyDown,u=t.inputRef,p=t.datePickerRef,g=t.fullWidth,f=t.textField,y=t.minWidth,m=void 0===y?"200px":y,b=(0,o.Z)(t,s);return(0,d.jsx)(r._,{dateAdapter:a.H,children:(0,d.jsx)(l.M,(0,i.Z)({floatingLabelStyle:{color:"black"},value:h,onChange:c,ref:p,slotProps:{textField:(0,i.Z)({size:"small",label:e,name:n,onKeyDown:x,inputRef:u,fullWidth:g},f)},InputLabelProps:{sx:{color:"black"}},sx:{minWidth:m,fieldset:{borderColor:"black"},".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}},b))})}},23508:function(t,e,n){n.d(e,{bq:function(){return l}});var i,o=n(74165),r=n(15861);function a(t){var e=t.data,n=t.column,i=t.beforeArrangeData,o=t.adjustMaxHeight,r=t.fontSize,a=void 0===r?"11px":r,l=t.summaryHeight,d=void 0===l?0:l,s=[],c=0,h=[],x=document.querySelector(".content").getBoundingClientRect().height-o;return e.forEach((function(t,o){t=i(t);var r=document.querySelector(".content"),l=document.createElement("table"),u=l.insertRow();t.summaryReport&&x-c<=d+20&&(c+=x-c),n.forEach((function(e){var n=u.insertCell();l.style.visibility="hidden",l.style.width="100%",l.style.fontSize=a,function(t,e,n,i,o){t.style.width=n,t.textContent=e,i.appendChild(o)}(n,t[e.datakey],e.width,r,l)})),c+=u.getBoundingClientRect().height,r.removeChild(l),h.push(t),(c>=x||o===e.length-1&&c<x)&&(s.push(h),c=0,h=[])})),s}var l=function(t){return(i=i||(0,r.Z)((0,o.Z)().mark((function t(e){var n,i,r,l,d,s,c,h;return(0,o.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.data,i=e.column,r=e.beforeArrangeData,l=e.adjustMaxHeight,d=e.cb,s=e.fontSize,c=void 0===s?"11px":s,h=e.summaryHeight,void 0!==n){t.next=3;break}return t.abrupt("return",[]);case 3:if(!d){t.next=5;break}return t.abrupt("return",d({data:n,column:i,beforeArrangeData:r,adjustMaxHeight:l}));case 5:return t.abrupt("return",a({data:n,column:i,beforeArrangeData:r,adjustMaxHeight:l,fontSize:c,summaryHeight:h}));case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}},63101:function(t,e,n){n.r(e),n.d(e,{default:function(){return w},reducer:function(){return C}});var i=n(74165),o=n(15861),r=n(4942),a=n(1413),l=n(72791),d=n(48550),s=n(64554),c=n(68096),h=n(94925),x=n(58406),u=n(23786),p=n(91933),g=n(3380),f=n(13784),y=n(39709),m=n(93862),b=n(71652),j=n(93777),S=n(71012),_=n(23508),v=n(58340),A=n(16386),I=n(80184),z={dateFormat:"Monthly",date:new Date,sub_acct:"All",title:""},C=function(t,e){return"UPDATE_FIELD"===e.type?(0,a.Z)((0,a.Z)({},t),{},(0,r.Z)({},e.field,e.value)):t},Z=[{groupId:"",datakey:"Acct_Code",header:"ACCT.",width:"100px"},{groupId:"",datakey:"Short",header:"ACCOUNT NAME",width:"180px"},{groupId:"",datakey:"SubAcct",header:"SUB-ACCOUNT",width:"150px"},{groupId:"",datakey:"Shortname",header:"ID NAME",width:"180px"},{groupId:"",datakey:"Debit",header:"DEBIT",type:"number",width:"100px"},{groupId:"",datakey:"Credit",header:"CREDIT",type:"number",width:"100px"},{groupId:"",datakey:"TC",header:"",width:"70px"}];function k(t,e){return"".concat("UMIS"===e?"UPWARD MANAGEMENT INSURANCE SERVICES":"UPWARD CONSULTANCY SERVICES AND MANAGEMENT INC.","\n").concat(t.dateFormat," Production Book - PB\n").concat(function(t){var e="";"Daily"===t.dateFormat?e=t.date.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}):"Monthly"===t.dateFormat&&(e=t.date.toLocaleDateString("en-US",{year:"numeric",month:"long"}));return e.toString()}(t))}function D(t){var e,n=t.state,a=t.dispatch,S=(0,l.useRef)(null),_=(0,l.useContext)(g.V),v=_.myAxios,A=_.user,z=(0,p.useQuery)({queryKey:"sub-accounts",queryFn:function(){return(e=e||(0,o.Z)((0,i.Z)().mark((function t(){return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v.get("/reports/accounting/get-sub-account-acronym",{headers:{Authorization:"Bearer ".concat(null===A||void 0===A?void 0:A.accessToken)}});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}}),C=z.data,Z=z.isLoading,D=function(t){var e=t.target,n=e.name,i=e.value;a({type:"UPDATE_FIELD",field:n,value:i})};return(0,I.jsxs)("div",{style:{padding:"10px"},children:[(0,I.jsx)(d.Z,{label:"Title",fullWidth:!0,name:"title",value:n.title,onChange:D,rows:6,multiline:!0,InputProps:{style:{height:"140px",fontSize:"12px"}},sx:{flex:1,".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,I.jsxs)(s.Z,{sx:function(t){return(0,r.Z)({height:"100%",display:"grid",gridTemplateColumns:"repeat(1,1fr)",gap:"10px",margin:"10px 0"},t.breakpoints.down("sm"),{gridTemplateColumns:"repeat(1,1fr)"})},children:[(0,I.jsxs)(c.Z,{fullWidth:!0,variant:"outlined",size:"small",sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,I.jsx)(h.Z,{id:"date_format",children:"Report"}),(0,I.jsxs)(x.Z,{labelId:"date_format",value:n.dateFormat,label:"Report",name:"dateFormat",onChange:function(t){D(t),n.dateFormat=t.target.value,a({type:"UPDATE_FIELD",field:"title",value:k(n,null===A||void 0===A?void 0:A.department)})},sx:{height:"27px",fontSize:"14px"},children:[(0,I.jsx)(u.Z,{value:"Daily",children:"Daily"}),(0,I.jsx)(u.Z,{value:"Monthly",children:"Monthly"})]})]}),Z?(0,I.jsx)(y.Z,{loading:Z}):(0,I.jsxs)(c.Z,{fullWidth:!0,variant:"outlined",size:"small",sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,I.jsx)(h.Z,{id:"sub_account_id",children:"Sub Account"}),(0,I.jsxs)(x.Z,{labelId:"sub_account_id",value:n.sub_acct,label:"Sub Account",name:"sub_acct",onChange:D,sx:{height:"27px",fontSize:"14px"},children:[(0,I.jsx)(u.Z,{value:"All",children:"All"}),null===C||void 0===C?void 0:C.data.sub_account.map((function(t,e){return(0,I.jsx)(u.Z,{value:t.Acronym,children:t.Acronym},e)}))]})]}),"Monthly"===n.dateFormat&&(0,I.jsx)(b._,{dateAdapter:m.H,children:(0,I.jsx)(j.M,{sx:{width:"100%",".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},slotProps:{textField:{size:"small",name:"",InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}},label:"Date",views:["month","year"],value:n.date,onChange:function(t){a({type:"UPDATE_FIELD",field:"date",value:t}),n.date=t,a({type:"UPDATE_FIELD",field:"title",value:k(n,null===A||void 0===A?void 0:A.department)})}})}),"Daily"===n.dateFormat&&(0,I.jsx)(f.Z,{fullWidth:!0,label:"Date From",onChange:function(t){a({type:"UPDATE_FIELD",field:"date",value:t}),n.date=t,a({type:"UPDATE_FIELD",field:"title",value:k(n,null===A||void 0===A?void 0:A.department)})},value:new Date(n.date),onKeyDown:function(t){if("Enter"===t.code||"NumpadEnter"===t.code)var e=setTimeout((function(){var t,n;null===(t=S.current)||void 0===t||null===(n=t.querySelector("button"))||void 0===n||n.click(),clearTimeout(e)}),150)},datePickerRef:S,textField:{InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}})]})]})}function w(){var t,e=(0,l.useContext)(g.V),n=e.user,r=e.myAxios;return z.title=k(z,null===n||void 0===n?void 0:n.department),(0,I.jsx)(S.ZP,{column:Z,initialState:z,Setting:function(t,e){return(0,I.jsx)(D,{state:t,dispatch:e})},onReportSubmit:function(e,a,d){return(t=t||(0,o.Z)((0,i.Z)().mark((function t(e,o,a){var d,s,c,h,x,u;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.post("/reports/accounting/production-book-pb",a,{headers:{Authorization:"Bearer ".concat(null===n||void 0===n?void 0:n.accessToken)}});case 2:return d=t.sent,t.next=5,d.data;case 5:s=t.sent,c=function(){return(0,I.jsx)("table",{children:(0,I.jsx)("tbody",{children:s.summary.map((function(t,e){return t.summary?(0,I.jsxs)(l.Fragment,{children:[(0,I.jsx)("tr",{style:{height:"20px"}}),(0,I.jsx)("tr",{children:(0,I.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"bold",textAlign:"center"},children:t.SubAcct})})]},e):t.summaryHeader?(0,I.jsxs)(l.Fragment,{children:[(0,I.jsx)("tr",{style:{height:"50px"}}),(0,I.jsxs)("tr",{children:[(0,I.jsx)("td",{colSpan:1}),(0,I.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"bold",textAlign:"center"},children:"ACCOUNT TITLE"}),(0,I.jsx)("td",{style:{fontSize:"11px",fontWeight:"bold"},children:"DEBIT"}),(0,I.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"bold"},children:"CREDIT"})]}),(0,I.jsx)("tr",{style:{height:"10px"}})]},e):t.summaryData?(0,I.jsx)(l.Fragment,{children:(0,I.jsxs)("tr",{children:[(0,I.jsx)("td",{}),(0,I.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"bold",textAlign:"left"},children:t.Acct_Code}),(0,I.jsx)("td",{style:{fontSize:"11px",fontWeight:"bold",textAlign:"right",paddingRight:"100px"},children:t.Debit}),(0,I.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"bold",textAlign:"right",paddingRight:"120px"},children:t.Credit})]})},e):t.summaryFooter?(0,I.jsxs)(l.Fragment,{children:[(0,I.jsx)("tr",{style:{height:"10px"}}),(0,I.jsxs)("tr",{style:{height:"5px"},children:[(0,I.jsx)("td",{colSpan:1}),(0,I.jsx)("td",{colSpan:2}),(0,I.jsx)("td",{style:{borderTop:"1px solid black"}}),(0,I.jsx)("td",{style:{borderTop:"1px solid black"}})]}),(0,I.jsxs)("tr",{children:[(0,I.jsx)("td",{}),(0,I.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"bold",textAlign:"right",paddingRight:"20px"},children:t.Acct_Code}),(0,I.jsx)("td",{style:{fontSize:"11px",fontWeight:"bold",textAlign:"right",paddingRight:"100px"},children:t.Debit}),(0,I.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"bold",textAlign:"right",paddingRight:"120px"},children:t.Credit})]}),(0,I.jsxs)("tr",{style:{height:"5px"},children:[(0,I.jsx)("td",{colSpan:1}),(0,I.jsx)("td",{colSpan:2}),(0,I.jsx)("td",{style:{borderBottom:"2px solid black"}}),(0,I.jsx)("td",{style:{borderBottom:"2px solid black"}})]})]},e):t.summaryFooterSignature?(0,I.jsxs)(l.Fragment,{children:[(0,I.jsx)("tr",{style:{height:"50px"}}),(0,I.jsx)("tr",{children:(0,I.jsx)("td",{colSpan:Z.length,style:{fontSize:"11px",fontWeight:"bold",textAlign:"center"},children:"Prepared: _______________ \xa0\xa0\xa0\xa0\xa0 Checked: _______________ \xa0\xa0\xa0\xa0\xa0 Approved: _______________"})})]},e):(0,I.jsx)(I.Fragment,{})}))})})},h=v.renderToString((0,I.jsx)(c,{})),(x=document.createElement("div")).innerHTML=h,document.body.appendChild(x),u=x.getBoundingClientRect().height,document.body.removeChild(x),(0,_.bq)({data:s.report,column:Z,beforeArrangeData:function(t){return t},adjustMaxHeight:580,summaryHeight:u}).then((function(t){e(t),o(!1)}));case 14:case"end":return t.stop()}}),t)})))).apply(this,arguments)},scaleDefaultValue:100,drawTable:function(t,e){return t.map((function(n,i){return(0,I.jsxs)("div",{className:"page out-page",children:[(0,I.jsx)("div",{className:"header",style:{height:"50px"}}),(0,I.jsx)("div",{className:"content",children:(0,I.jsxs)("table",{children:[(0,I.jsxs)("thead",{children:[e.title.split("\n").map((function(t,e){return(0,I.jsx)("tr",{children:(0,I.jsx)("th",{style:{fontSize:"14px",fontWeight:"bold",textAlign:"left"},colSpan:Z.length,children:t})},e)})),(0,I.jsx)("tr",{style:{height:"40px"}}),(0,I.jsxs)("tr",{children:[(0,I.jsx)("th",{style:{fontSize:"12px",fontWeight:"bold",textAlign:"left"},children:"DATE"}),(0,I.jsx)("th",{style:{fontSize:"12px",fontWeight:"bold",textAlign:"left"},children:"POLICY #"}),(0,I.jsx)("th",{style:{fontSize:"12px",fontWeight:"bold",textAlign:"left"},colSpan:6,children:"EXPLANATION"})]}),(0,I.jsx)("tr",{children:Z.map((function(e,n){return(0,I.jsx)("th",{onDoubleClick:function(n){return(0,S.PE)(n,e.datakey,t)},style:{width:e.width,fontSize:"12px",fontWeight:"bold",textAlign:"left"},children:e.header},n)}))}),(0,I.jsx)("tr",{style:{height:"10px"}})]}),(0,I.jsx)("tbody",{children:n.map((function(t,e){return"1"===t.nHeader?(0,I.jsxs)(l.Fragment,{children:[(0,I.jsx)("tr",{style:{height:"5px"}}),(0,I.jsxs)("tr",{children:[(0,I.jsx)("td",{style:{fontSize:"10.5px",fontWeight:"bold"},children:t.nDate_Entry}),(0,I.jsx)("td",{style:{fontSize:"11px",fontWeight:"bold"},children:t.nSource_No}),(0,I.jsx)("td",{style:{fontSize:"11px",fontWeight:"bold"},colSpan:6,children:t.Explanation})]}),(0,I.jsx)("tr",{children:Z.map((function(n,o){return(0,I.jsx)("td",{onClick:S.mp,className:"editable not-looking page-".concat(i,"  row-").concat(e,"_col-").concat(o),style:{fontSize:"11px",fontWeight:"500",width:"".concat(n.width," !important"),textAlign:"number"===n.type?"right":"left"},children:t[n.datakey]},o)}))},e)]},e):t.mainTotal?(0,I.jsxs)(l.Fragment,{children:[(0,I.jsx)("tr",{style:{height:"10px"}}),(0,I.jsxs)("tr",{children:[(0,I.jsx)("td",{style:{fontSize:"11px",fontWeight:"bold",textAlign:"right"},colSpan:4,children:t.Shortname}),(0,I.jsx)("td",{style:{fontSize:"11px",fontWeight:"bold",textAlign:"right"},children:t.Debit}),(0,I.jsx)("td",{style:{fontSize:"11px",fontWeight:"bold",textAlign:"right"},children:t.Credit})]}),(0,I.jsxs)("tr",{style:{height:"5px"},children:[(0,I.jsx)("td",{colSpan:4}),(0,I.jsx)("td",{style:{borderBottom:"2px solid black"}}),(0,I.jsx)("td",{style:{borderBottom:"2px solid black"}})]})]},e):t.summary?(0,I.jsxs)(l.Fragment,{children:[(0,I.jsx)("tr",{style:{height:"20px"}}),(0,I.jsx)("tr",{children:(0,I.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"bold",textAlign:"center"},children:t.SubAcct})})]},e):t.summaryHeader?(0,I.jsxs)(l.Fragment,{children:[(0,I.jsx)("tr",{style:{height:"50px"}}),(0,I.jsxs)("tr",{children:[(0,I.jsx)("td",{colSpan:1}),(0,I.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"bold",textAlign:"center"},children:"ACCOUNT TITLE"}),(0,I.jsx)("td",{style:{fontSize:"11px",fontWeight:"bold"},children:"DEBIT"}),(0,I.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"bold"},children:"CREDIT"})]}),(0,I.jsx)("tr",{style:{height:"10px"}})]},e):t.summaryData?(0,I.jsx)(l.Fragment,{children:(0,I.jsxs)("tr",{children:[(0,I.jsx)("td",{}),(0,I.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"bold",textAlign:"left"},children:t.Acct_Code}),(0,I.jsx)("td",{style:{fontSize:"11px",fontWeight:"bold",textAlign:"right",paddingRight:"100px"},children:t.Debit}),(0,I.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"bold",textAlign:"right",paddingRight:"120px"},children:t.Credit})]})},e):t.summaryFooter?(0,I.jsxs)(l.Fragment,{children:[(0,I.jsx)("tr",{style:{height:"10px"}}),(0,I.jsxs)("tr",{style:{height:"5px"},children:[(0,I.jsx)("td",{colSpan:1}),(0,I.jsx)("td",{colSpan:2}),(0,I.jsx)("td",{style:{borderTop:"1px solid black"}}),(0,I.jsx)("td",{style:{borderTop:"1px solid black"}})]}),(0,I.jsxs)("tr",{children:[(0,I.jsx)("td",{}),(0,I.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"bold",textAlign:"right",paddingRight:"20px"},children:t.Acct_Code}),(0,I.jsx)("td",{style:{fontSize:"11px",fontWeight:"bold",textAlign:"right",paddingRight:"100px"},children:t.Debit}),(0,I.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"bold",textAlign:"right",paddingRight:"120px"},children:t.Credit})]}),(0,I.jsxs)("tr",{style:{height:"5px"},children:[(0,I.jsx)("td",{colSpan:1}),(0,I.jsx)("td",{colSpan:2}),(0,I.jsx)("td",{style:{borderBottom:"2px solid black"}}),(0,I.jsx)("td",{style:{borderBottom:"2px solid black"}})]})]},e):t.summaryFooterSignature?(0,I.jsxs)(l.Fragment,{children:[(0,I.jsx)("tr",{style:{height:"50px"}}),(0,I.jsx)("tr",{children:(0,I.jsx)("td",{colSpan:Z.length,style:{fontSize:"11px",fontWeight:"bold",textAlign:"center"},children:"Prepared: _______________ \xa0\xa0\xa0\xa0\xa0 Checked: _______________ \xa0\xa0\xa0\xa0\xa0 Approved: _______________"})})]},e):(0,I.jsx)("tr",{children:Z.map((function(n,o){return(0,I.jsx)("td",{onClick:S.mp,className:"editable not-looking page-".concat(i,"  row-").concat(e,"_col-").concat(o),style:{fontSize:"11px",fontWeight:"500",width:"".concat(n.width," !important"),textAlign:"number"===n.type?"right":"left"},children:t[n.datakey]},o)}))},e)}))})]})}),(0,I.jsxs)("div",{className:"footer",style:{height:"50px",display:"flex",justifyContent:"space-between"},children:[(0,I.jsx)("p",{style:{fontSize:"10px",fontWeight:"bold"},children:(0,A.Z)(new Date,"dd/MM/yyyy")}),(0,I.jsxs)("p",{style:{fontSize:"10px",fontWeight:"bold"},children:["Page ",i+1," of ",t.length]})]})]},i)}))},pageHeight:"13in",pageWidth:"8.5in"})}},39709:function(t,e,n){n.d(e,{Z:function(){return S}});var i=n(4942),o=n(63366),r=n(87462),a=n(72791),l=n(14036),d=n(67384),s=n(94419),c=n(66934),h=n(31402),x=n(36151),u=n(13239),p=n(21217);function g(t){return(0,p.Z)("MuiLoadingButton",t)}var f=(0,n(75878).Z)("MuiLoadingButton",["root","loading","loadingIndicator","loadingIndicatorCenter","loadingIndicatorStart","loadingIndicatorEnd","endIconLoadingEnd","startIconLoadingStart"]),y=n(80184),m=["children","disabled","id","loading","loadingIndicator","loadingPosition","variant"],b=(0,c.ZP)(x.Z,{shouldForwardProp:function(t){return function(t){return"ownerState"!==t&&"theme"!==t&&"sx"!==t&&"as"!==t&&"classes"!==t}(t)||"classes"===t},name:"MuiLoadingButton",slot:"Root",overridesResolver:function(t,e){return[e.root,e.startIconLoadingStart&&(0,i.Z)({},"& .".concat(f.startIconLoadingStart),e.startIconLoadingStart),e.endIconLoadingEnd&&(0,i.Z)({},"& .".concat(f.endIconLoadingEnd),e.endIconLoadingEnd)]}})((function(t){var e=t.ownerState,n=t.theme;return(0,r.Z)((0,i.Z)({},"& .".concat(f.startIconLoadingStart,", & .").concat(f.endIconLoadingEnd),{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0}),"center"===e.loadingPosition&&(0,i.Z)({transition:n.transitions.create(["background-color","box-shadow","border-color"],{duration:n.transitions.duration.short})},"&.".concat(f.loading),{color:"transparent"}),"start"===e.loadingPosition&&e.fullWidth&&(0,i.Z)({},"& .".concat(f.startIconLoadingStart,", & .").concat(f.endIconLoadingEnd),{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0,marginRight:-8}),"end"===e.loadingPosition&&e.fullWidth&&(0,i.Z)({},"& .".concat(f.startIconLoadingStart,", & .").concat(f.endIconLoadingEnd),{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0,marginLeft:-8}))})),j=(0,c.ZP)("span",{name:"MuiLoadingButton",slot:"LoadingIndicator",overridesResolver:function(t,e){var n=t.ownerState;return[e.loadingIndicator,e["loadingIndicator".concat((0,l.Z)(n.loadingPosition))]]}})((function(t){var e=t.theme,n=t.ownerState;return(0,r.Z)({position:"absolute",visibility:"visible",display:"flex"},"start"===n.loadingPosition&&("outlined"===n.variant||"contained"===n.variant)&&{left:"small"===n.size?10:14},"start"===n.loadingPosition&&"text"===n.variant&&{left:6},"center"===n.loadingPosition&&{left:"50%",transform:"translate(-50%)",color:(e.vars||e).palette.action.disabled},"end"===n.loadingPosition&&("outlined"===n.variant||"contained"===n.variant)&&{right:"small"===n.size?10:14},"end"===n.loadingPosition&&"text"===n.variant&&{right:6},"start"===n.loadingPosition&&n.fullWidth&&{position:"relative",left:-10},"end"===n.loadingPosition&&n.fullWidth&&{position:"relative",right:-10})})),S=a.forwardRef((function(t,e){var n=(0,h.Z)({props:t,name:"MuiLoadingButton"}),i=n.children,a=n.disabled,c=void 0!==a&&a,x=n.id,p=n.loading,f=void 0!==p&&p,S=n.loadingIndicator,_=n.loadingPosition,v=void 0===_?"center":_,A=n.variant,I=void 0===A?"text":A,z=(0,o.Z)(n,m),C=(0,d.Z)(x),Z=null!=S?S:(0,y.jsx)(u.Z,{"aria-labelledby":C,color:"inherit",size:16}),k=(0,r.Z)({},n,{disabled:c,loading:f,loadingIndicator:Z,loadingPosition:v,variant:I}),D=function(t){var e=t.loading,n=t.loadingPosition,i=t.classes,o={root:["root",e&&"loading"],startIcon:[e&&"startIconLoading".concat((0,l.Z)(n))],endIcon:[e&&"endIconLoading".concat((0,l.Z)(n))],loadingIndicator:["loadingIndicator",e&&"loadingIndicator".concat((0,l.Z)(n))]},a=(0,s.Z)(o,g,i);return(0,r.Z)({},i,a)}(k),w=f?(0,y.jsx)(j,{className:D.loadingIndicator,ownerState:k,children:Z}):null;return(0,y.jsxs)(b,(0,r.Z)({disabled:c||f,id:C,ref:e},z,{variant:I,classes:D,ownerState:k,children:["end"===k.loadingPosition?i:w,"end"===k.loadingPosition?w:i]}))}))},45987:function(t,e,n){n.d(e,{Z:function(){return o}});var i=n(63366);function o(t,e){if(null==t)return{};var n,o,r=(0,i.Z)(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(o=0;o<a.length;o++)n=a[o],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}}}]);
//# sourceMappingURL=7456.c674a839.chunk.js.map