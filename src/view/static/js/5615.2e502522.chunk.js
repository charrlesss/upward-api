/*! For license information please see 5615.2e502522.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkupward=self.webpackChunkupward||[]).push([[5615],{5615:function(e,r,o){o.r(r),o.d(r,{default:function(){return s}});o(2791);var t=o(4412),a=o(7689),n=o(184),l=[{link:"/dashboard/task/production/policy/marine",text:"Policy Information"},{link:"/dashboard/task/production/policy/marine/policy-premium",text:"Policy Premium"}];function s(){return(0,n.jsxs)("div",{children:[(0,n.jsx)(t.Z,{list:l}),(0,n.jsx)(a.j3,{})]})}},4412:function(e,r,o){o.d(r,{Z:function(){return i}});var t=o(3517),a=o(7689),n=o(1087),l=o(8333),s=o(1128),c=o(184);function i(e){var r=e.list,o=(0,a.TH)(),i=(0,s.Z)().searchParams;return(0,c.jsx)("div",{role:"presentation",onClick:function(e){e.preventDefault()},children:(0,c.jsx)(t.Z,{separator:(0,c.jsx)(l.Z,{fontSize:"small"}),"aria-label":"breadcrumb",children:r.map((function(e,r){return(0,c.jsx)(n.rU,{to:e.link+"?drawer=".concat(i.get("drawer"),"&pageSize=").concat(i.get("pageSize")),style:{textDecoration:"none",color:e.link===o.pathname?"#f97316":"black"},children:e.text},r)}))})})}},8333:function(e,r,o){var t=o(4836);r.Z=void 0;var a=t(o(5649)),n=o(184),l=(0,a.default)((0,n.jsx)("path",{d:"M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),"NavigateNext");r.Z=l},3517:function(e,r,o){o.d(r,{Z:function(){return N}});var t=o(3433),a=o(9439),n=o(4942),l=o(7462),s=o(3366),c=o(2791),i=(o(8457),o(3733)),u=o(4419),d=o(1107),p=o(6934),f=o(1402),m=o(890),h=o(2065),y=o(9201),v=o(184),x=(0,y.Z)((0,v.jsx)("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHoriz"),b=o(7479),g=["slots","slotProps"],Z=(0,p.ZP)(b.Z)((function(e){var r=e.theme;return(0,l.Z)({display:"flex",marginLeft:"calc(".concat(r.spacing(1)," * 0.5)"),marginRight:"calc(".concat(r.spacing(1)," * 0.5)")},"light"===r.palette.mode?{backgroundColor:r.palette.grey[100],color:r.palette.grey[700]}:{backgroundColor:r.palette.grey[700],color:r.palette.grey[100]},{borderRadius:2,"&:hover, &:focus":(0,l.Z)({},"light"===r.palette.mode?{backgroundColor:r.palette.grey[200]}:{backgroundColor:r.palette.grey[600]}),"&:active":(0,l.Z)({boxShadow:r.shadows[0]},"light"===r.palette.mode?{backgroundColor:(0,h._4)(r.palette.grey[200],.12)}:{backgroundColor:(0,h._4)(r.palette.grey[600],.12)})})})),S=(0,p.ZP)(x)({width:24,height:16});var w=function(e){var r=e.slots,o=void 0===r?{}:r,t=e.slotProps,a=void 0===t?{}:t,n=(0,s.Z)(e,g),c=e;return(0,v.jsx)("li",{children:(0,v.jsx)(Z,(0,l.Z)({focusRipple:!0},n,{ownerState:c,children:(0,v.jsx)(S,(0,l.Z)({as:o.CollapsedIcon,ownerState:c},a.collapsedIcon))}))})},C=o(5878),j=o(1217);function k(e){return(0,j.Z)("MuiBreadcrumbs",e)}var P=(0,C.Z)("MuiBreadcrumbs",["root","ol","li","separator"]),I=["children","className","component","slots","slotProps","expandText","itemsAfterCollapse","itemsBeforeCollapse","maxItems","separator"],R=(0,p.ZP)(m.Z,{name:"MuiBreadcrumbs",slot:"Root",overridesResolver:function(e,r){return[(0,n.Z)({},"& .".concat(P.li),r.li),r.root]}})({}),z=(0,p.ZP)("ol",{name:"MuiBreadcrumbs",slot:"Ol",overridesResolver:function(e,r){return r.ol}})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"}),B=(0,p.ZP)("li",{name:"MuiBreadcrumbs",slot:"Separator",overridesResolver:function(e,r){return r.separator}})({display:"flex",userSelect:"none",marginLeft:8,marginRight:8});function M(e,r,o,t){return e.reduce((function(a,n,l){return l<e.length-1?a=a.concat(n,(0,v.jsx)(B,{"aria-hidden":!0,className:r,ownerState:t,children:o},"separator-".concat(l))):a.push(n),a}),[])}var N=c.forwardRef((function(e,r){var o=(0,f.Z)({props:e,name:"MuiBreadcrumbs"}),n=o.children,p=o.className,m=o.component,h=void 0===m?"nav":m,y=o.slots,x=void 0===y?{}:y,b=o.slotProps,g=void 0===b?{}:b,Z=o.expandText,S=void 0===Z?"Show path":Z,C=o.itemsAfterCollapse,j=void 0===C?1:C,P=o.itemsBeforeCollapse,B=void 0===P?1:P,N=o.maxItems,_=void 0===N?8:N,T=o.separator,A=void 0===T?"/":T,$=(0,s.Z)(o,I),L=c.useState(!1),D=(0,a.Z)(L,2),H=D[0],q=D[1],E=(0,l.Z)({},o,{component:h,expanded:H,expandText:S,itemsAfterCollapse:j,itemsBeforeCollapse:B,maxItems:_,separator:A}),O=function(e){var r=e.classes;return(0,u.Z)({root:["root"],li:["li"],ol:["ol"],separator:["separator"]},k,r)}(E),U=(0,d.y)({elementType:x.CollapsedIcon,externalSlotProps:g.collapsedIcon,ownerState:E}),V=c.useRef(null),W=c.Children.toArray(n).filter((function(e){return c.isValidElement(e)})).map((function(e,r){return(0,v.jsx)("li",{className:O.li,children:e},"child-".concat(r))}));return(0,v.jsx)(R,(0,l.Z)({ref:r,component:h,color:"text.secondary",className:(0,i.Z)(O.root,p),ownerState:E},$,{children:(0,v.jsx)(z,{className:O.ol,ref:V,ownerState:E,children:M(H||_&&W.length<=_?W:function(e){return B+j>=e.length?e:[].concat((0,t.Z)(e.slice(0,B)),[(0,v.jsx)(w,{"aria-label":S,slots:{CollapsedIcon:x.CollapsedIcon},slotProps:{collapsedIcon:U},onClick:function(){q(!0);var e=V.current.querySelector("a[href],button,[tabindex]");e&&e.focus()}},"ellipsis")],(0,t.Z)(e.slice(e.length-j,e.length)))}(W),O.separator,A,E)})}))}))},6532:function(e,r){var o,t=Symbol.for("react.element"),a=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),l=Symbol.for("react.strict_mode"),s=Symbol.for("react.profiler"),c=Symbol.for("react.provider"),i=Symbol.for("react.context"),u=Symbol.for("react.server_context"),d=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),f=Symbol.for("react.suspense_list"),m=Symbol.for("react.memo"),h=Symbol.for("react.lazy"),y=Symbol.for("react.offscreen");function v(e){if("object"===typeof e&&null!==e){var r=e.$$typeof;switch(r){case t:switch(e=e.type){case n:case s:case l:case p:case f:return e;default:switch(e=e&&e.$$typeof){case u:case i:case d:case h:case m:case c:return e;default:return r}}case a:return r}}}o=Symbol.for("react.module.reference")},8457:function(e,r,o){o(6532)}}]);
//# sourceMappingURL=5615.2e502522.chunk.js.map