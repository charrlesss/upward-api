"use strict";(self.webpackChunkupward=self.webpackChunkupward||[]).push([[7470],{37209:function(e,t,n){n.d(t,{sT:function(){return l},lq:function(){return c},oi:function(){return u}});var i=n(1413),r=n(72791),o=n(80184);function u(e){var t=e.input,n=e.label,u=e.inputRef,c=(0,r.useId)();return(0,o.jsxs)("div",{style:{display:"flex",height:"18px",alignItems:"center"},children:[(0,o.jsx)("label",(0,i.Z)((0,i.Z)({},n),{},{htmlFor:c,children:n.title})),(0,o.jsx)("input",(0,i.Z)((0,i.Z)({ref:u,id:c},t),{},{style:(0,i.Z)({height:"18px"},t.style)}))]})}function c(e){var t=e.select,n=e.label,u=e.selectRef,c=e.datasource,l=void 0===c?[]:c,a=e.values,s=void 0===a?"":a,d=e.display,f=void 0===d?"":d,h=(0,r.useId)();return(0,o.jsxs)("div",{style:{display:"flex",height:"18px",alignItems:"center"},children:[(0,o.jsx)("label",(0,i.Z)((0,i.Z)({},n),{},{htmlFor:h,children:n.title})),(0,o.jsx)("select",(0,i.Z)((0,i.Z)({},t),{},{ref:u,className:"select",style:(0,i.Z)({height:"18px"},t.style),children:l.map((function(e,t){return(0,o.jsx)("option",{value:e[s],children:e[f]},t)}))}))]})}function l(e){var t=e.buttonRetRef,n=e.button,r=e.tooltipText,u=void 0===r?"":r,c=e.children,l=e.disabled,a=void 0!==l&&l;return(0,o.jsxs)("div",{className:"tooltip",children:[(0,o.jsx)("button",(0,i.Z)((0,i.Z)({disabled:a},n),{},{ref:t,style:(0,i.Z)((0,i.Z)({},n.style),{},{background:a?"#f1f1f1":"transparent"}),className:"tooltip-button",children:c})),!a&&(0,o.jsx)("span",{className:"tooltip-text",children:u})]})}},93346:function(e,t,n){n.d(t,{Z:function(){return c}});var i=n(93433),r=n(29439),o=n(72791),u=n(80184),c=(0,o.forwardRef)((function(e,t){var n=e.rows,c=e.column,l=e.width,a=e.height,s=e.dataReadOnly,d=e.onSelectionChange,f=void 0===d?function(){}:d,h=e.isMultipleSelect,p=void 0!==h&&h,v=e.freeze,x=void 0!==v&&v,m=e.onKeyDown,y=e.inputsearchselector,g=void 0===y?".search-input-up-on-key-down":y,w=e.isRowSelectable,b=void 0===w||w,k=e.unSelectable,C=void 0===k?function(){return!1}:k,j=e.writeFooter,S=void 0===j?function(){return null}:j,Z=e.isLoading,A=void 0!==Z&&Z,L=(0,o.useRef)(f),R=(0,o.useRef)(m),N=(0,o.useState)(c.filter((function(e){return!e.hide}))),D=(0,r.Z)(N,2),T=D[0],I=D[1],B=(0,o.useState)(null),M=(0,r.Z)(B,2),E=M[0],V=M[1],q=(0,o.useState)([0]),z=(0,r.Z)(q,2),W=z[0],F=z[1],H=(0,o.useState)(0),_=(0,r.Z)(H,2),K=_[0],O=_[1],U=(0,o.useState)([]),G=(0,r.Z)(U,2),Y=G[0],P=G[1],X=(0,o.useRef)(null),Q=function(e,t){t.preventDefault(),t.stopPropagation();var n=t.clientX,r=T[e].width,o=function(t){var o=r+(t.clientX-n),u=(0,i.Z)(T);u[e].width=o>50?o:50,I(u)};document.addEventListener("mousemove",o),document.addEventListener("mouseup",(function e(){document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",e)}))},J=function(e){V(e)},$=function(){V(null)};return(0,o.useImperativeHandle)(t,(function(){return{resetTableSelected:function(){if(F([0]),O(0),P([]),n.length>0){var e=document.querySelector(".row-".concat(0));null===e||void 0===e||e.scrollIntoView({block:"end",behavior:"smooth"})}},getSelectedRows:function(){return n.filter((function(e,t){return Y.includes(t)}))}}})),(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"center"},onKeyDown:function(e){if("Enter"===e.key||"NumpadEnter"===e.key){if(e.preventDefault(),!b)return;var t=[],r=W[W.length-1];t=p?[].concat((0,i.Z)(Y),(0,i.Z)(W)):[r];var o=n[t[t.length-1]];if(C(o))return;if(Y.includes(r)&&!x)return t=Y.filter((function(e){return e!==r})),P(t),void L.current([]);P(t),L.current([o])}else if("ArrowDown"===e.key)e.preventDefault(),F((function(e){var t;if(null===e[e.length-1])return[0];if(e[e.length-1]>=n.length-1)return[n.length-1];var i=e[e.length-1]+1,r=document.querySelector(".row-".concat(i));return null===r||void 0===r||null===(t=r.querySelector("input"))||void 0===t||t.focus(),null===r||void 0===r||r.scrollIntoView({block:"end",behavior:"smooth"}),[i]}));else if("ArrowUp"===e.key){if(e.preventDefault(),0===W[W.length-1]){var u=document.querySelector(g);if(u&&"INPUT"===u.tagName)null===u||void 0===u||u.focus();else if(u&&"DIV"===u.tagName){var c=document.querySelector("".concat(g," input"));null===c||void 0===c||c.focus()}}F((function(e){var t;if(0===e[e.length-1])return[0];var n=e[e.length-1]-1,i=document.querySelector(".row-".concat(n));return null===i||void 0===i||i.scrollIntoView({block:"end",behavior:"smooth"}),null===i||void 0===i||null===(t=i.querySelector("input"))||void 0===t||t.focus(),[n]}))}else if("Delete"===e.key||"Backspace"===e.key){if(!b)return;var l=n.filter((function(e,t){return W.includes(t)}));null!==R&&void 0!==R&&R.current&&(null===R||void 0===R||R.current(l,e.key))}},children:[(0,u.jsxs)("div",{className:"table-frame-color",children:[(0,u.jsx)("div",{style:{display:"flex",flexDirection:"column",width:"".concat(l-10,"px        "),height:"".concat(a-135,"px")},className:"table-frame",children:(0,u.jsx)("div",{className:"table-panel",children:(0,u.jsxs)("div",{ref:X,className:"grid-container ",tabIndex:-1,children:[(0,u.jsx)("div",{className:"grid-row grid-header",style:{position:"sticky",zIndex:"10",top:"-1px",background:"white"},children:T.map((function(e,t){return(0,u.jsxs)("div",{className:"grid-cell header-cell ".concat(E===t?"highlight-column":"","\n                      \n                      "),style:{width:e.width,height:"20px",textAlign:"number"===e.type?"center":"left"},children:[(0,u.jsx)("input",{style:{fontWeight:"bold"},defaultValue:e.headerName,readOnly:!0,onChange:function(e){}}),(0,u.jsx)("div",{className:"resize-handle",onMouseDown:function(e){return Q(t,e)},onMouseEnter:function(e){e.preventDefault(),J(t)},onMouseLeave:function(e){e.preventDefault(),$()}})]},t)}))}),n.map((function(e,t){return(0,u.jsx)("div",{className:"grid-row row-".concat(t),onClick:function(e){return function(e,t){if(p)if(t.shiftKey&&null!==K){for(var r=Math.min(K,e),o=Math.max(K,e),u=[],c=r;c<=o;c++)W.includes(c)||u.push(c);var l=[].concat((0,i.Z)(Y),u);F([].concat((0,i.Z)(W),u));var a=function(e){var t=e.map((function(e,t){return C(e)?null:{idx:t,data:e}})).filter((function(e){return null!==e})),n=t.map((function(e){return e.data}));return{newSelectedRowsFiltered:t.map((function(e){return e.idx})),data:n}}(n.filter((function(e,t){return l.includes(t)}))),s=a.newSelectedRowsFiltered,d=a.data;P(s),L.current(d)}else if(t.ctrlKey||t.metaKey)if(W.includes(e)&&!x){F(W.filter((function(t){return t!==e}))),P((function(t){return t=t.filter((function(t){return t!==e})),t}));var f=Y.filter((function(t){return t!==e})),h=n.filter((function(e,t){return f.includes(t)}));P(f),L.current(h)}else{F([].concat((0,i.Z)(W),[e])),P((function(t){return t.push(e),t}));var v=[].concat((0,i.Z)(Y),[e]),m=n.filter((function(e,t){return v.includes(t)}));P(v),L.current(m)}else F([e]);else F([e]);O(e)}(t,e)},onDoubleClick:function(e){return function(e,t){var r=n[e];if(!C(r)&&b){var o=[];if(!Y.includes(e)||x){o=p?[].concat((0,i.Z)(Y),[e]):[e],P(o);var u=n.filter((function(e,t){return o.includes(t)}));L.current(u)}else{o=Y.filter((function(t){return t!==e})),P(o);var c=n.filter((function(e,t){return o.includes(t)}));L.current(c)}}}(t)},children:T.map((function(n,i){return(0,u.jsxs)("div",{style:{width:n.width},className:"grid-cell ".concat(E===i?"highlight-column":""),children:[(0,u.jsx)("input",{value:e[n.field],onChange:function(e){},readOnly:s,className:"".concat(W.includes(t)?"selected-row":""," ").concat(Y.includes(t)?"selected-items":"","\n                          ").concat("number"===n.type?"number":"text","\n                          ")}),(0,u.jsx)("div",{className:"resize-handle",onMouseDown:function(e){e.preventDefault(),Q(i,e)},onMouseEnter:function(e){e.preventDefault(),J(i)},onMouseLeave:function(e){e.preventDefault(),$()}})]},i)}))},t)}))]})})}),S(n)?(0,u.jsx)(u.Fragment,{children:S(n)}):(0,u.jsxs)("div",{className:"table-panel-footer",children:["Records : ",n.length]})]}),A&&(0,u.jsx)("div",{className:"table-loading",children:(0,u.jsx)("div",{className:"loader",children:(0,u.jsx)("img",{alt:"loader-gif",src:"//image/loading.gif"})})})]})}))},37470:function(e,t,n){n.r(t),n.d(t,{chartAccountColumn:function(){return y},default:function(){return w},reducer:function(){return m}});var i=n(74165),r=n(15861),o=n(29439),u=n(4942),c=n(1413),l=n(72791),a=n(3380),s=n(91933),d=n(21830),f=n.n(d),h=n(64230),p=n(93346),v=n(37209),x=n(80184),m=function(e,t){return"UPDATE_FIELD"===t.type?(0,c.Z)((0,c.Z)({},e),{},(0,u.Z)({},t.field,t.value)):e},y=[{field:"Acct_Code",headerName:"Account Code",width:150},{field:"Acct_Title",headerName:"Account Name/Account Title",width:300},{field:"Short",headerName:"Short Name",width:300},{field:"Acct_Type",headerName:"Account Type",width:200},{field:"Account",headerName:"Account",width:100},{field:"SubAccnt",headerName:"Sub Account ?",width:100},{field:"IDNo",headerName:"I.D. ?",width:100},{field:"Inactive",headerName:"Inactive ?",width:100}],g="chart-account";function w(){var e,t,n,u,d=(0,l.useRef)(null),m=(0,l.useRef)(null),w=(0,l.useRef)(null),b=(0,l.useRef)(null),k=(0,l.useRef)(null),C=(0,l.useRef)(null),j=(0,l.useRef)(null),S=(0,l.useRef)(null),Z=(0,l.useRef)(null),A=(0,l.useRef)(null),L=(0,l.useContext)(a.V),R=L.myAxios,N=L.user,D=(0,l.useState)([]),T=(0,o.Z)(D,2),I=T[0],B=T[1],M=(0,l.useState)(""),E=(0,o.Z)(M,2),V=E[0],q=E[1],z=(0,s.useQuery)({queryKey:g,queryFn:function(){return(e=e||(0,r.Z)((0,i.Z)().mark((function e(){var t,n;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.get("/reference/get-chart-accounts?chartAccountSearch=".concat(null!==(t=null===(n=m.current)||void 0===n?void 0:n.value)&&void 0!==t?t:""),{headers:{Authorization:"Bearer ".concat(null===N||void 0===N?void 0:N.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){var t;B(null===e||void 0===e?void 0:e.data.chartAccount),$(),null===d||void 0===d||null===(t=d.current)||void 0===t||t.resetTableSelected()},refetchOnWindowFocus:!1}),W=z.isLoading,F=z.refetch,H=(0,s.useMutation)({mutationKey:g,mutationFn:function(e){return(t=t||(0,r.Z)((0,i.Z)().mark((function e(t){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.post("/reference/add-chart-account",t,{headers:{Authorization:"Bearer ".concat(null===N||void 0===N?void 0:N.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:Q}),_=H.mutate,K=H.isLoading,O=(0,s.useMutation)({mutationKey:g,mutationFn:function(e){return(n=n||(0,r.Z)((0,i.Z)().mark((function e(t){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.post("/reference/update-chart-account",t,{headers:{Authorization:"Bearer ".concat(null===N||void 0===N?void 0:N.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:Q}),U=O.mutate,G=O.isLoading,Y=(0,s.useMutation)({mutationKey:g,mutationFn:function(e){return(u=u||(0,r.Z)((0,i.Z)().mark((function e(t){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.post("/reference/delete-chart-account",t,{headers:{Authorization:"Bearer ".concat(null===N||void 0===N?void 0:N.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:Q}),P=Y.mutate,X=Y.isLoading;function Q(e){if(e.data.success)return f().fire({position:"center",icon:"success",title:e.data.message,showConfirmButton:!1,timer:1500}).then((function(){J()}));f().fire({position:"center",icon:"error",title:e.data.message,showConfirmButton:!1,timer:1500})}var J=function(){var e;q(""),$(),null===d||void 0===d||null===(e=d.current)||void 0===e||e.resetTableSelected()};function $(){w.current&&(w.current.value=""),b.current&&(b.current.selectedIndex=0),k.current&&(k.current.selectedIndex=0),C.current&&(C.current.value=""),j.current&&(j.current.value=""),S.current&&(S.current.checked=!1),Z.current&&(Z.current.checked=!1),A.current&&(A.current.checked=!1)}var ee=window.innerWidth-100,te=window.innerHeight-90,ne=""===V;return(0,x.jsx)("div",{style:{flex:1,backgroundColor:"#F8F8FF"},children:(0,x.jsxs)("div",{style:{width:"".concat(ee,"px"),height:"".concat(te,"px"),margin:"auto"},children:[(0,x.jsxs)("div",{style:{height:"120px"},children:[(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",height:"30px",columnGap:"10px"},children:[(0,x.jsx)(v.oi,{label:{title:"Search: ",style:{fontSize:"12px",fontWeight:"bold",width:"50px"}},input:{className:"search-input-up-on-key-down",type:"search",onKeyDown:function(e){("Enter"!==e.key&&"NumpadEnter"!==e.key||(e.preventDefault(),F()),"ArrowDown"===e.key)&&(e.preventDefault(),document.querySelector(".grid-container").focus())},style:{width:"500px"}},inputRef:m}),!ne&&(0,x.jsx)(v.sT,{button:{style:{margin:0,padding:"5px",borderRadius:"5px",background:"transparent"},onClick:J},tooltipText:"CANCEL",children:(0,x.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"17px",height:"17px",viewBox:"0 0 24 24",fill:"none",children:(0,x.jsx)("path",{d:"M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z",fill:"#d97706"})})}),ne&&(0,x.jsx)(v.sT,{button:{style:{margin:0,padding:"5px",borderRadius:"5px",background:"transparent"},onClick:function(){q("add"),setTimeout((function(){var e;null===(e=w.current)||void 0===e||e.focus()}),100)}},tooltipText:"ADD",children:(0,x.jsxs)("svg",{width:"20px",height:"20px",viewBox:"0 0 24 24",children:[(0,x.jsx)("title",{}),(0,x.jsx)("g",{id:"Complete",children:(0,x.jsx)("g",{"data-name":"add",id:"add-2",children:(0,x.jsxs)("g",{children:[(0,x.jsx)("line",{fill:"none",stroke:"#000000",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",x1:"12",x2:"12",y1:"19",y2:"5"}),(0,x.jsx)("line",{fill:"none",stroke:"#000000",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",x1:"5",x2:"19",y1:"12",y2:"12"})]})})})]})}),(0,x.jsx)(v.sT,{disabled:ne,button:{style:{margin:0,padding:"5px",borderRadius:"5px",background:"transparent"},onClick:function(e){var t,n,i,r,o,u,l,a,s,d,p,v,x,m;if(""===(null===(t=w.current)||void 0===t?void 0:t.value))return f().fire({position:"center",icon:"warning",title:"Acct Code is required!",showConfirmButton:!1,timer:1500});if(""===(null===(n=C.current)||void 0===n?void 0:n.value))return f().fire({position:"center",icon:"warning",title:"Acct Title is required!",showConfirmButton:!1,timer:1500});if(""===(null===(i=j.current)||void 0===i?void 0:i.value))return f().fire({position:"center",icon:"warning",title:"Short Name is required!",showConfirmButton:!1,timer:1500});if((null===(r=w.current)||void 0===r?void 0:r.value).length>=200)return f().fire({position:"center",icon:"warning",title:"Acct Code is too long!",showConfirmButton:!1,timer:1500});if((null===(o=C.current)||void 0===o?void 0:o.value).length>=200)return f().fire({position:"center",icon:"warning",title:"Acct Title is too long!",showConfirmButton:!1,timer:1500});if((null===(u=j.current)||void 0===u?void 0:u.value).length>=200)return f().fire({position:"center",icon:"warning",title:"Short Name is too long!",showConfirmButton:!1,timer:1500});e.preventDefault();var y={Acct_Code:null===(l=w.current)||void 0===l?void 0:l.value,Acct_Title:null===(a=C.current)||void 0===a?void 0:a.value,Short:null===(s=j.current)||void 0===s?void 0:s.value,Account:null===(d=b.current)||void 0===d?void 0:d.value,Acct_Type:null===(p=k.current)||void 0===p?void 0:p.value,IDNo:null===(v=Z.current)||void 0===v?void 0:v.checked,SubAccnt:null===(x=S.current)||void 0===x?void 0:x.checked,Inactive:null===(m=A.current)||void 0===m?void 0:m.checked,mode:"",search:""};"update"===V?(0,h.s)({isUpdate:!0,cb:function(e){U((0,c.Z)((0,c.Z)({},y),{},{userCodeConfirmation:e}))}}):(0,h.L)({isConfirm:function(){_(y)}})}},tooltipText:"SAVE",children:(0,x.jsx)("svg",{width:"17px",height:"17px",viewBox:"0 0 24 24",fill:"green",children:(0,x.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z",fill:"green"})})}),(0,x.jsx)(v.sT,{disabled:"update"!==V,button:{style:{margin:0,padding:"5px",borderRadius:"5px",background:"transparent"},onClick:function(){(0,h.s)({isUpdate:!1,cb:function(e){var t;P({Acct_Code:null===(t=w.current)||void 0===t?void 0:t.value,userCodeConfirmation:e})}})}},tooltipText:"DELETE",children:(0,x.jsxs)("svg",{width:"20px",height:"20px",viewBox:"0 0 24 24",fill:"none",children:[(0,x.jsx)("path",{d:"M4 7H20",stroke:"red",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,x.jsx)("path",{d:"M6 7V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V7",stroke:"red",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,x.jsx)("path",{d:"M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z",stroke:"red",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]})})]}),(0,x.jsxs)("div",{style:{marginTop:"10px",display:"flex",columnGap:"30px",rowGap:"15px",flexWrap:"wrap"},children:[(0,x.jsx)(v.oi,{label:{title:"Code: ",style:{fontSize:"12px",fontWeight:"bold",width:"40px"}},input:{disabled:ne,type:"text",style:{width:"90px"}},inputRef:w}),(0,x.jsx)(v.lq,{label:{title:"Account Classification: ",style:{fontSize:"12px",fontWeight:"bold",width:"135px"}},selectRef:b,select:{disabled:ne,style:{width:"120px"}},datasource:[{key:"Asset"},{key:"Liability"},{key:"Equity"},{key:"Revenue"},{key:"Expense"}],values:"key",display:"key"}),(0,x.jsx)(v.lq,{label:{title:"Account Type: ",style:{fontSize:"12px",fontWeight:"bold",width:"90px"}},selectRef:k,select:{disabled:ne,style:{width:"120px"}},datasource:[{key:"Group Header"},{key:"Header"},{key:"Detail"}],values:"key",display:"key"}),(0,x.jsx)(v.oi,{label:{title:"Name/Title: ",style:{fontSize:"12px",fontWeight:"bold",width:"80px"}},input:{disabled:ne,type:"text",style:{width:"350px"}},inputRef:C}),(0,x.jsx)(v.oi,{label:{title:"ShortName: ",style:{fontSize:"12px",fontWeight:"bold",width:"80px"}},input:{disabled:ne,type:"text",style:{width:"200px"}},inputRef:j}),(0,x.jsx)(v.oi,{label:{title:"Required sub-account?: ",style:{fontSize:"12px",fontWeight:"bold",width:"140px"}},input:{disabled:ne,type:"checkbox",style:{width:"12px",height:"12px"}},inputRef:S}),(0,x.jsx)(v.oi,{label:{title:"Required I.D.?: ",style:{fontSize:"12px",fontWeight:"bold",width:"85px"}},input:{disabled:ne,type:"checkbox",style:{width:"12px",height:"12px"}},inputRef:Z}),(0,x.jsx)(v.oi,{label:{title:"Mark As Inactive: ",style:{fontSize:"12px",fontWeight:"bold",width:"100px"}},input:{disabled:ne,type:"checkbox",style:{width:"12px",height:"12px"}},inputRef:A})]})]}),(0,x.jsx)(p.Z,{ref:d,rows:I,column:y,width:ee,height:te,dataReadOnly:!0,onSelectionChange:function(e){if(e.length>0){var t=e[0];w.current&&(w.current.value=t.Acct_Code),b.current&&(b.current.value=t.Account.trim()),k.current&&(k.current.value=t.Acct_Type.trim()),C.current&&(C.current.value=t.Acct_Title),j.current&&(j.current.value=t.Short),S.current&&(S.current.checked="YES"===t.SubAccnt),Z.current&&(Z.current.checked="YES"===t.IDNo),A.current&&(A.current.checked="YES"===t.Inactive),q("update")}else $()},isMultipleSelect:!1,isLoading:W||K||G||X})]})})}},64230:function(e,t,n){n.d(t,{L:function(){return l},s:function(){return c}});var i=n(74165),r=n(15861),o=n(21830),u=n.n(o);function c(e){var t;u().fire({title:"Are you sure!",html:null!==e&&void 0!==e&&e.text?null===e||void 0===e?void 0:e.text:e.isUpdate?"Are you sure you want to make this change?":"Are you sure you want to delete this?",icon:"warning",input:"text",inputAttributes:{autocapitalize:"off"},showCancelButton:!0,confirmButtonText:"Save",confirmButtonColor:"green",showLoaderOnConfirm:!0,preConfirm:function(n){return(t=t||(0,r.Z)((0,i.Z)().mark((function t(n){return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:try{e.cb(n)}catch(i){u().showValidationMessage("\n            Request failed: ".concat(i,"\n          "))}case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)},allowOutsideClick:function(){return!u().isLoading()}}).then((function(t){if(t.isConfirmed&&e.isConfirm)return e.isConfirm();e.isDeclined&&e.isDeclined()}))}function l(e){u().fire({title:"Are you sure?",text:null!==e&&void 0!==e&&e.text?null===e||void 0===e?void 0:e.text:"Do you want to proceed with saving?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, save it!"}).then((function(t){if(t.isConfirmed&&e.isConfirm)return e.isConfirm();e.isDeclined&&e.isDeclined()}))}}}]);
//# sourceMappingURL=7470.2e7e190d.chunk.js.map