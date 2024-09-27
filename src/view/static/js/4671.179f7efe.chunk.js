"use strict";(self.webpackChunkupward=self.webpackChunkupward||[]).push([[4671],{13784:function(t,e,n){n.d(e,{Z:function(){return c}});var o=n(1413),i=n(45987),r=n(71652),a=n(93862),l=n(93777),d=n(80184),s=["label","name","onChange","value","onKeyDown","inputRef","datePickerRef","fullWidth","textField","minWidth"];function c(t){var e=t.label,n=t.name,c=t.onChange,u=t.value,p=t.onKeyDown,h=t.inputRef,g=t.datePickerRef,x=t.fullWidth,f=t.textField,m=t.minWidth,y=void 0===m?"200px":m,b=(0,i.Z)(t,s);return(0,d.jsx)(r._,{dateAdapter:a.H,children:(0,d.jsx)(l.M,(0,o.Z)({floatingLabelStyle:{color:"black"},value:u,onChange:c,ref:g,slotProps:{textField:(0,o.Z)({size:"small",label:e,name:n,onKeyDown:p,inputRef:h,fullWidth:x},f)},InputLabelProps:{sx:{color:"black"}},sx:{minWidth:y,fieldset:{borderColor:"black"},".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}},b))})}},23508:function(t,e,n){n.d(e,{bq:function(){return l}});var o,i=n(74165),r=n(15861);function a(t){var e=t.data,n=t.column,o=t.beforeArrangeData,i=t.adjustMaxHeight,r=t.fontSize,a=void 0===r?"11px":r,l=t.summaryHeight,d=void 0===l?0:l,s=[],c=0,u=[],p=document.querySelector(".content").getBoundingClientRect().height-i;return e.forEach((function(t,i){t=o(t);var r=document.querySelector(".content"),l=document.createElement("table"),h=l.insertRow();t.summaryReport&&p-c<=d+20&&(c+=p-c),n.forEach((function(e){var n=h.insertCell();l.style.visibility="hidden",l.style.width="100%",l.style.fontSize=a,function(t,e,n,o,i){t.style.width=n,t.textContent=e,o.appendChild(i)}(n,t[e.datakey],e.width,r,l)})),c+=h.getBoundingClientRect().height,r.removeChild(l),u.push(t),(c>=p||i===e.length-1&&c<p)&&(s.push(u),c=0,u=[])})),s}var l=function(t){return(o=o||(0,r.Z)((0,i.Z)().mark((function t(e){var n,o,r,l,d,s,c,u;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.data,o=e.column,r=e.beforeArrangeData,l=e.adjustMaxHeight,d=e.cb,s=e.fontSize,c=void 0===s?"11px":s,u=e.summaryHeight,void 0!==n){t.next=3;break}return t.abrupt("return",[]);case 3:if(!d){t.next=5;break}return t.abrupt("return",d({data:n,column:o,beforeArrangeData:r,adjustMaxHeight:l}));case 5:return t.abrupt("return",a({data:n,column:o,beforeArrangeData:r,adjustMaxHeight:l,fontSize:c,summaryHeight:u}));case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}},99101:function(t,e,n){n.r(e),n.d(e,{default:function(){return F},reducer:function(){return C}});var o=n(74165),i=n(15861),r=n(4942),a=n(1413),l=n(72791),d=n(27391),s=n(64554),c=n(68096),u=n(94925),p=n(58406),h=n(23786),g=n(91933),x=n(3380),f=n(13784),m=n(39709),y=n(93862),b=n(71652),S=n(93777),_=n(71012),j=n(23508),v=n(16386),I=n(58340),A=n(80184),k={dateFormat:"Monthly",date:new Date,sub_acct:"All",title:""},C=function(t,e){return"UPDATE_FIELD"===e.type?(0,a.Z)((0,a.Z)({},t),{},(0,r.Z)({},e.field,e.value)):t},z=[{groupHeader:"",groupId:"code"},{groupHeader:"",groupId:"title"},{groupHeader:"",groupId:"client"},{groupHeader:"",groupId:"or"},{groupHeader:"",groupId:"or"},{groupHeader:"",groupId:"or"},{groupHeader:"DEBIT",groupId:"debit"},{groupHeader:"CREDIT",groupId:"credit"},{groupHeader:"",groupId:"or"},{groupHeader:"",groupId:"or"}],D=[{groupId:"",datakey:"Date",header:"DATE",width:"90px"},{groupId:"",datakey:"IDNo",header:"ID#",width:"160px"},{groupId:"",datakey:"cName",header:"CLIENT NAME",width:"300px"},{groupId:"",datakey:"ORNo",header:"OR#",width:"80px"},{groupId:"",datakey:"Bank",header:"BANK/BRANCH",width:"100px"},{groupId:"",datakey:"cCheck_No",header:"CHECK",width:"100px"},{groupId:"debit",datakey:"Debit",header:"AMOUNT",total:!0,type:"number",width:"100px"},{groupId:"debit",datakey:"DRTitle",header:"ACCOUNTS",width:"120px"},{groupId:"credit",datakey:"Credit",header:"AMOUNT",total:!0,type:"number",width:"100px"},{groupId:"credit",datakey:"CRTitle",header:"ACCOUNTS",width:"120px"},{groupId:"",datakey:"Purpose",header:"PURPOSE",width:"300px"},{groupId:"",datakey:"CRRemarks",header:"REMARKS",width:"300px"}];function Z(t,e){return"".concat("UMIS"===e?"UPWARD MANAGEMENT INSURANCE SERVICES":"UPWARD CONSULTANCY SERVICES AND MANAGEMENT INC.","\n").concat(t.dateFormat," Abstract Collections\n").concat(function(t){var e="";"Daily"===t.dateFormat?e=t.date.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}):"Monthly"===t.dateFormat&&(e=t.date.toLocaleDateString("en-US",{year:"numeric",month:"long"}));return e.toString()}(t))}function w(t){var e,n=t.state,a=t.dispatch,_=(0,l.useRef)(null),j=(0,l.useContext)(x.V),v=j.myAxios,I=j.user,k=(0,g.useQuery)({queryKey:"sub-accounts",queryFn:function(){return(e=e||(0,i.Z)((0,o.Z)().mark((function t(){return(0,o.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v.get("/reports/accounting/get-sub-account-acronym",{headers:{Authorization:"Bearer ".concat(null===I||void 0===I?void 0:I.accessToken)}});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}}),C=k.data,z=k.isLoading,D=function(t){var e=t.target,n=e.name,o=e.value;a({type:"UPDATE_FIELD",field:n,value:o})};return(0,A.jsxs)("div",{style:{padding:"10px"},children:[(0,A.jsx)(d.Z,{label:"Title",fullWidth:!0,name:"title",value:n.title,onChange:D,rows:6,multiline:!0,InputProps:{style:{height:"140px",fontSize:"12px"}},sx:{flex:1,".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,A.jsxs)(s.Z,{sx:function(t){return(0,r.Z)({height:"100%",display:"grid",gridTemplateColumns:"repeat(1,1fr)",gap:"10px",margin:"10px 0"},t.breakpoints.down("sm"),{gridTemplateColumns:"repeat(1,1fr)"})},children:[(0,A.jsxs)(c.Z,{fullWidth:!0,variant:"outlined",size:"small",sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,A.jsx)(u.Z,{id:"date_format",children:"Report"}),(0,A.jsxs)(p.Z,{labelId:"date_format",value:n.dateFormat,label:"Report",name:"dateFormat",onChange:function(t){D(t),n.dateFormat=t.target.value,a({type:"UPDATE_FIELD",field:"title",value:Z(n,null===I||void 0===I?void 0:I.department)})},sx:{height:"27px",fontSize:"14px"},children:[(0,A.jsx)(h.Z,{value:"Daily",children:"Daily"}),(0,A.jsx)(h.Z,{value:"Monthly",children:"Monthly"})]})]}),z?(0,A.jsx)(m.Z,{loading:z}):(0,A.jsxs)(c.Z,{fullWidth:!0,variant:"outlined",size:"small",sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,A.jsx)(u.Z,{id:"sub_account_id",children:"Sub Account"}),(0,A.jsxs)(p.Z,{labelId:"sub_account_id",value:n.sub_acct,label:"Sub Account",name:"sub_acct",onChange:D,sx:{height:"27px",fontSize:"14px"},children:[(0,A.jsx)(h.Z,{value:"All",children:"All"}),null===C||void 0===C?void 0:C.data.sub_account.map((function(t,e){return(0,A.jsx)(h.Z,{value:t.Acronym,children:t.Acronym},e)}))]})]}),"Monthly"===n.dateFormat&&(0,A.jsx)(b._,{dateAdapter:y.H,children:(0,A.jsx)(S.M,{sx:{width:"100%",".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},slotProps:{textField:{size:"small",name:"",InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}},label:"Date",views:["month","year"],value:n.date,onChange:function(t){a({type:"UPDATE_FIELD",field:"date",value:t}),n.date=t,a({type:"UPDATE_FIELD",field:"title",value:Z(n,null===I||void 0===I?void 0:I.department)})}})}),"Daily"===n.dateFormat&&(0,A.jsx)(f.Z,{fullWidth:!0,label:"Date From",onChange:function(t){a({type:"UPDATE_FIELD",field:"date",value:t}),n.date=t,a({type:"UPDATE_FIELD",field:"title",value:Z(n,null===I||void 0===I?void 0:I.department)})},value:new Date(n.date),onKeyDown:function(t){if("Enter"===t.code||"NumpadEnter"===t.code)var e=setTimeout((function(){var t,n;null===(t=_.current)||void 0===t||null===(n=t.querySelector("button"))||void 0===n||n.click(),clearTimeout(e)}),150)},datePickerRef:_,textField:{InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}})]})]})}function F(){var t,e=(0,l.useContext)(x.V),n=e.user,r=e.myAxios;return k.title=Z(k,null===n||void 0===n?void 0:n.department),(0,A.jsx)(_.ZP,{column:D,initialState:k,Setting:function(t,e){return(0,A.jsx)(w,{state:t,dispatch:e})},onReportSubmit:function(e,a,d){return(t=t||(0,i.Z)((0,o.Z)().mark((function t(e,i,a){var d,s,c,u,p,h;return(0,o.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.post("/reports/accounting/abstract-collection-report",a,{headers:{Authorization:"Bearer ".concat(null===n||void 0===n?void 0:n.accessToken)}});case 2:return d=t.sent,t.next=5,d.data;case 5:s=t.sent,c=function(){return(0,A.jsx)("table",{children:(0,A.jsx)("tbody",{children:s.summary.map((function(t,e){return!t.summ||t.header||t.footer||t.signature?t.summ&&t.header?(0,A.jsx)(l.Fragment,{children:(0,A.jsxs)("tr",{children:[(0,A.jsx)("td",{colSpan:3,style:{fontSize:"11.5px",fontWeight:"bolder",textAlign:"right"}}),(0,A.jsx)("td",{colSpan:3,style:{fontSize:"11.5px",fontWeight:"bolder",textAlign:"center"},children:t.ORNo}),(0,A.jsx)("td",{colSpan:2,style:{fontSize:"11.5px",fontWeight:"bolder",textAlign:"left"},children:t.Purpose}),(0,A.jsx)("td",{colSpan:2,style:{fontSize:"11.5px",fontWeight:"bolder",textAlign:"left"},children:t.CRRemarks})]})},e):t.summ&&t.footer?(0,A.jsx)(l.Fragment,{children:(0,A.jsxs)("tr",{children:[(0,A.jsx)("td",{colSpan:3,style:{fontSize:"11px",fontWeight:"bolder",textAlign:"right"}}),(0,A.jsx)("td",{colSpan:3,style:{fontSize:"11px",fontWeight:"bolder",textAlign:"right"},children:t.ORNo}),(0,A.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"bolder",textAlign:"right",borderTop:"1px solid black",borderBottom:"2px solid black"},children:t.Debit}),(0,A.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"bolder",textAlign:"right",borderTop:"1px solid black",borderBottom:"2px solid black"},children:t.Credit})]})},e):t.summ&&t.signature?(0,A.jsxs)(l.Fragment,{children:[(0,A.jsx)("tr",{style:{height:"40px"}}),(0,A.jsx)("tr",{children:(0,A.jsx)("td",{colSpan:D.length,style:{fontSize:"11px",fontWeight:"bolder",textAlign:"center"},children:"Prepared: ________________ \xa0\xa0\xa0\xa0\xa0 Checked: ________________ \xa0\xa0\xa0\xa0\xa0Approved: ________________"})})]},e):t.summary?(0,A.jsxs)(l.Fragment,{children:[(0,A.jsx)("tr",{style:{height:"15px"}}),(0,A.jsx)("tr",{children:(0,A.jsx)("td",{colSpan:3,style:{fontSize:"11px",fontWeight:"bolder",textAlign:"right"},children:t.cName})}),(0,A.jsx)("tr",{style:{height:"15px"}})]},e):(0,A.jsx)(l.Fragment,{},e):(0,A.jsx)(l.Fragment,{children:(0,A.jsxs)("tr",{children:[(0,A.jsx)("td",{colSpan:3,style:{fontSize:"11px",fontWeight:"500",textAlign:"right"}}),(0,A.jsx)("td",{colSpan:3,style:{fontSize:"11px",fontWeight:"500",textAlign:"left"},children:"".concat(t.GL_Acct,"  ").concat(t.Title)}),(0,A.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"500",textAlign:"right"},children:t.Debit}),(0,A.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"500",textAlign:"right"},children:t.Credit})]})},e)}))})})},u=I.renderToString((0,A.jsx)(c,{})),(p=document.createElement("div")).innerHTML=u,document.body.appendChild(p),h=p.getBoundingClientRect().height,document.body.removeChild(p),(0,j.bq)({data:s.report,column:D,beforeArrangeData:function(t){return isNaN(parseFloat(t.Debit.replace(/,/g,"")))||(t.Debit=parseFloat(t.Debit.replace(/,/g,"")).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})),isNaN(parseFloat(t.Credit.replace(/,/g,"")))||(t.Credit=parseFloat(t.Credit.replace(/,/g,"")).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})),t},adjustMaxHeight:150,summaryHeight:h}).then((function(t){e(t),i(!1)}));case 14:case"end":return t.stop()}}),t)})))).apply(this,arguments)},scaleDefaultValue:90,drawTable:function(t,e){return t.map((function(n,o){return(0,A.jsxs)("div",{className:"page out-page",children:[(0,A.jsx)("div",{className:"header",style:{height:"50px"}}),(0,A.jsx)("div",{className:"content",children:(0,A.jsxs)("table",{children:[(0,A.jsxs)("thead",{children:[e.title.split("\n").map((function(t,e){return(0,A.jsx)("tr",{children:(0,A.jsx)("th",{style:{fontSize:"14px",fontWeight:"bold",textAlign:"left"},colSpan:D.length,children:t})},e)})),(0,A.jsx)("tr",{style:{height:"40px"}}),(0,A.jsx)("tr",{children:z.map((function(t,e){var n=D.filter((function(e){return e.groupId===t.groupId}));return(0,A.jsx)("th",{colSpan:n.length,style:{fontSize:"10.5px",fontWeight:"bold",textAlign:"center"},children:t.groupHeader},e)}))}),(0,A.jsx)("tr",{children:D.map((function(e,n){return(0,A.jsx)("th",{onDoubleClick:function(n){return(0,_.PE)(n,e.datakey,t)},style:{width:e.width,fontSize:"10.5px",fontWeight:"bold",textAlign:"left"},children:e.header},n)}))})]}),(0,A.jsx)("tbody",{children:n.map((function(t,e){return!t.summ||t.header||t.footer||t.signature?t.summ&&t.header?(0,A.jsx)(l.Fragment,{children:(0,A.jsxs)("tr",{children:[(0,A.jsx)("td",{colSpan:3,style:{fontSize:"11.5px",fontWeight:"bolder",textAlign:"right"}}),(0,A.jsx)("td",{colSpan:3,style:{fontSize:"11.5px",fontWeight:"bolder",textAlign:"center"},children:t.ORNo}),(0,A.jsx)("td",{colSpan:2,style:{fontSize:"11.5px",fontWeight:"bolder",textAlign:"left"},children:t.Purpose}),(0,A.jsx)("td",{colSpan:2,style:{fontSize:"11.5px",fontWeight:"bolder",textAlign:"left"},children:t.CRRemarks})]})},e):t.summ&&t.footer?(0,A.jsx)(l.Fragment,{children:(0,A.jsxs)("tr",{children:[(0,A.jsx)("td",{colSpan:3,style:{fontSize:"11px",fontWeight:"bolder",textAlign:"right"}}),(0,A.jsx)("td",{colSpan:3,style:{fontSize:"11px",fontWeight:"bolder",textAlign:"right"},children:t.ORNo}),(0,A.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"bolder",textAlign:"right",borderTop:"1px solid black",borderBottom:"2px solid black"},children:t.Debit}),(0,A.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"bolder",textAlign:"right",borderTop:"1px solid black",borderBottom:"2px solid black"},children:t.Credit})]})},e):t.summ&&t.signature?(0,A.jsxs)(l.Fragment,{children:[(0,A.jsx)("tr",{style:{height:"40px"}}),(0,A.jsx)("tr",{children:(0,A.jsx)("td",{colSpan:D.length,style:{fontSize:"11px",fontWeight:"bolder",textAlign:"center"},children:"Prepared: ________________ \xa0\xa0\xa0\xa0\xa0 Checked: ________________ \xa0\xa0\xa0\xa0\xa0Approved: ________________"})})]},e):t.summary?(0,A.jsxs)(l.Fragment,{children:[(0,A.jsx)("tr",{style:{height:"15px"}}),(0,A.jsx)("tr",{children:(0,A.jsx)("td",{colSpan:3,style:{fontSize:"11px",fontWeight:"bolder",textAlign:"right"},children:t.cName})}),(0,A.jsx)("tr",{style:{height:"15px"}})]},e):t.follows?(0,A.jsxs)(l.Fragment,{children:[(0,A.jsx)("tr",{style:{height:"10px"}}),(0,A.jsx)("tr",{children:(0,A.jsx)("td",{colSpan:D.length,style:{fontSize:"11px",fontWeight:"500",textAlign:"center"},children:t.cCheck_No})})]},e):(0,A.jsx)("tr",{children:D.map((function(n,i){return(0,A.jsx)(l.Fragment,{children:t.total&&"DRTitle"===n.datakey||t.total&&"CRTitle"===n.datakey?(0,A.jsx)(A.Fragment,{}):(0,A.jsx)("td",{onClick:_.mp,className:"editable not-looking page-".concat(o,"  row-").concat(e,"_col-").concat(i),style:{fontSize:"11px",fontWeight:t.total?"bold":"500",width:"".concat(n.width," !important"),textAlign:"number"===n.type?"right":"left",borderTop:t.total&&"Debit"===n.datakey||t.total&&"Credit"===n.datakey||t.total&&"DRTitle"===n.datakey||t.total&&"CRTitle"===n.datakey?"1px solid black":""},colSpan:t.total&&"Debit"===n.datakey||t.total&&"Credit"===n.datakey?2:1,children:t[n.datakey]})},i)}))},e):(0,A.jsx)(l.Fragment,{children:(0,A.jsxs)("tr",{children:[(0,A.jsx)("td",{colSpan:3,style:{fontSize:"11px",fontWeight:"500",textAlign:"right"}}),(0,A.jsx)("td",{colSpan:3,style:{fontSize:"11px",fontWeight:"500",textAlign:"left"},children:"".concat(t.GL_Acct,"  ").concat(t.Title)}),(0,A.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"500",textAlign:"right"},children:t.Debit}),(0,A.jsx)("td",{colSpan:2,style:{fontSize:"11px",fontWeight:"500",textAlign:"right"},children:t.Credit})]})},e)}))})]})}),(0,A.jsxs)("div",{className:"footer",style:{height:"50px",display:"flex",justifyContent:"space-between"},children:[(0,A.jsx)("p",{style:{fontSize:"10px",fontWeight:"bold"},children:(0,v.Z)(new Date,"dd/MM/yyyy")}),(0,A.jsxs)("p",{style:{fontSize:"10px",fontWeight:"bold"},children:["Page ",o+1," of ",t.length]})]})]},o)}))},pageHeight:"8.5in",pageWidth:"13in",addHeaderGroup:(0,A.jsx)("tr",{children:z.map((function(t,e){var n=D.filter((function(e){return e.groupId===t.groupId}));return(0,A.jsx)("th",{colSpan:n.length,style:{fontSize:"12.5px",fontWeight:"bold",textAlign:"center"},children:t.groupHeader},e)}))})})}},39709:function(t,e,n){n.d(e,{Z:function(){return _}});var o=n(4942),i=n(63366),r=n(87462),a=n(72791),l=n(14036),d=n(67384),s=n(94419),c=n(66934),u=n(31402),p=n(36151),h=n(13239),g=n(21217);function x(t){return(0,g.Z)("MuiLoadingButton",t)}var f=(0,n(75878).Z)("MuiLoadingButton",["root","loading","loadingIndicator","loadingIndicatorCenter","loadingIndicatorStart","loadingIndicatorEnd","endIconLoadingEnd","startIconLoadingStart"]),m=n(80184),y=["children","disabled","id","loading","loadingIndicator","loadingPosition","variant"],b=(0,c.ZP)(p.Z,{shouldForwardProp:function(t){return function(t){return"ownerState"!==t&&"theme"!==t&&"sx"!==t&&"as"!==t&&"classes"!==t}(t)||"classes"===t},name:"MuiLoadingButton",slot:"Root",overridesResolver:function(t,e){return[e.root,e.startIconLoadingStart&&(0,o.Z)({},"& .".concat(f.startIconLoadingStart),e.startIconLoadingStart),e.endIconLoadingEnd&&(0,o.Z)({},"& .".concat(f.endIconLoadingEnd),e.endIconLoadingEnd)]}})((function(t){var e=t.ownerState,n=t.theme;return(0,r.Z)((0,o.Z)({},"& .".concat(f.startIconLoadingStart,", & .").concat(f.endIconLoadingEnd),{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0}),"center"===e.loadingPosition&&(0,o.Z)({transition:n.transitions.create(["background-color","box-shadow","border-color"],{duration:n.transitions.duration.short})},"&.".concat(f.loading),{color:"transparent"}),"start"===e.loadingPosition&&e.fullWidth&&(0,o.Z)({},"& .".concat(f.startIconLoadingStart,", & .").concat(f.endIconLoadingEnd),{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0,marginRight:-8}),"end"===e.loadingPosition&&e.fullWidth&&(0,o.Z)({},"& .".concat(f.startIconLoadingStart,", & .").concat(f.endIconLoadingEnd),{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0,marginLeft:-8}))})),S=(0,c.ZP)("span",{name:"MuiLoadingButton",slot:"LoadingIndicator",overridesResolver:function(t,e){var n=t.ownerState;return[e.loadingIndicator,e["loadingIndicator".concat((0,l.Z)(n.loadingPosition))]]}})((function(t){var e=t.theme,n=t.ownerState;return(0,r.Z)({position:"absolute",visibility:"visible",display:"flex"},"start"===n.loadingPosition&&("outlined"===n.variant||"contained"===n.variant)&&{left:"small"===n.size?10:14},"start"===n.loadingPosition&&"text"===n.variant&&{left:6},"center"===n.loadingPosition&&{left:"50%",transform:"translate(-50%)",color:(e.vars||e).palette.action.disabled},"end"===n.loadingPosition&&("outlined"===n.variant||"contained"===n.variant)&&{right:"small"===n.size?10:14},"end"===n.loadingPosition&&"text"===n.variant&&{right:6},"start"===n.loadingPosition&&n.fullWidth&&{position:"relative",left:-10},"end"===n.loadingPosition&&n.fullWidth&&{position:"relative",right:-10})})),_=a.forwardRef((function(t,e){var n=(0,u.Z)({props:t,name:"MuiLoadingButton"}),o=n.children,a=n.disabled,c=void 0!==a&&a,p=n.id,g=n.loading,f=void 0!==g&&g,_=n.loadingIndicator,j=n.loadingPosition,v=void 0===j?"center":j,I=n.variant,A=void 0===I?"text":I,k=(0,i.Z)(n,y),C=(0,d.Z)(p),z=null!=_?_:(0,m.jsx)(h.Z,{"aria-labelledby":C,color:"inherit",size:16}),D=(0,r.Z)({},n,{disabled:c,loading:f,loadingIndicator:z,loadingPosition:v,variant:A}),Z=function(t){var e=t.loading,n=t.loadingPosition,o=t.classes,i={root:["root",e&&"loading"],startIcon:[e&&"startIconLoading".concat((0,l.Z)(n))],endIcon:[e&&"endIconLoading".concat((0,l.Z)(n))],loadingIndicator:["loadingIndicator",e&&"loadingIndicator".concat((0,l.Z)(n))]},a=(0,s.Z)(i,x,o);return(0,r.Z)({},o,a)}(D),w=f?(0,m.jsx)(S,{className:Z.loadingIndicator,ownerState:D,children:z}):null;return(0,m.jsxs)(b,(0,r.Z)({disabled:c||f,id:C,ref:e},k,{variant:A,classes:Z,ownerState:D,children:["end"===D.loadingPosition?o:w,"end"===D.loadingPosition?w:o]}))}))},45987:function(t,e,n){n.d(e,{Z:function(){return i}});var o=n(63366);function i(t,e){if(null==t)return{};var n,i,r=(0,o.Z)(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(i=0;i<a.length;i++)n=a[i],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}}}]);
//# sourceMappingURL=4671.179f7efe.chunk.js.map