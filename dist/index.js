(()=>{"use strict";var e={922:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,o,a){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(r)for(var c=0;c<this.length;c++){var u=this[c][0];null!=u&&(i[u]=!0)}for(var s=0;s<e.length;s++){var l=[].concat(e[s]);r&&i[l[0]]||(void 0!==a&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=a),n&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=n):l[2]=n),o&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=o):l[4]="".concat(o)),t.push(l))}},t}},251:e=>{e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var r=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),o="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),a="/*# ".concat(o," */"),i=n.sources.map((function(e){return"/*# sourceURL=".concat(n.sourceRoot||"").concat(e," */")}));return[t].concat(i).concat([a]).join("\n")}return[t].join("\n")}},424:(e,t,n)=>{n.d(t,{Z:()=>c});var r=n(251),o=n.n(r),a=n(922),i=n.n(a)()(o());i.push([e.id,".box {\r\n  width: 100%;\r\n  height: 100%;\r\n  position: relative;\r\n  background-size: contain;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n  background-color: rgba(24,144,255,0.5);\r\n}\r\n","",{version:3,sources:["webpack://./src/index.css"],names:[],mappings:"AAAA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,wBAAwB;EACxB,2BAA2B;EAC3B,4BAA4B;EAC5B,sCAAsC;AACxC",sourcesContent:[".box {\r\n  width: 100%;\r\n  height: 100%;\r\n  position: relative;\r\n  background-size: contain;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n  background-color: rgba(24,144,255,0.5);\r\n}\r\n"],sourceRoot:""}]);const c=i},379:e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var a={},i=[],c=0;c<e.length;c++){var u=e[c],s=r.base?u[0]+r.base:u[0],l=a[s]||0,f="".concat(s," ").concat(l);a[s]=l+1;var d=n(f),v={css:u[1],media:u[2],sourceMap:u[3],supports:u[4],layer:u[5]};if(-1!==d)t[d].references++,t[d].updater(v);else{var h=o(v,r);r.byIndex=c,t.splice(c,0,{identifier:f,updater:h,references:1})}i.push(f)}return i}function o(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,o){var a=r(e=e||[],o=o||{});return function(e){e=e||[];for(var i=0;i<a.length;i++){var c=n(a[i]);t[c].references--}for(var u=r(e,o),s=0;s<a.length;s++){var l=n(a[s]);0===t[l].references&&(t[l].updater(),t.splice(l,1))}a=u}}},569:e=>{var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,o&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={id:r,exports:{}};return e[r](a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{n.r(r),n.d(r,{default:()=>_});var e=function(){return e=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},e.apply(this,arguments)};Object.create,Object.create;const t=require("react");var o,a=n.n(t);!function(e){e[e.out=0]="out",e[e.in=1]="in",e[e.top_left=2]="top_left",e[e.top_right=3]="top_right",e[e.bottom_right=4]="bottom_right",e[e.bottom_left=5]="bottom_left",e[e.top=6]="top",e[e.right=7]="right",e[e.bottom=8]="bottom",e[e.left=9]="left"}(o||(o={}));var i,c=["default","move","se-resize","sw-resize","se-resize","ne-resize","n-resize","e-resize","n-resize","e-resize"],u=["default","move","default","default","se-resize","default","default","default","default","default"],s=10;function l(e,t,n){return n>e&&n<t}function f(e,t){var n=e.x,r=e.y,a=e.width,i=e.height,c=t.offsetX,u=t.offsetY;return l(n+5,n+a-5,c)&&l(r+5,r+i-5,u)?o.in:l(n-5,n+5,c)&&l(r-5,r+5,u)?o.top_left:l(n+a-5,n+a+5,c)&&l(r-5,r+5,u)?o.top_right:l(n+a-5,n+a+5,c)&&l(r+i-5,r+i+5,u)?o.bottom_right:l(n-5,n+5,c)&&l(r+i-5,r+i+5,u)?o.bottom_left:l(n+5,n+a-5,c)&&l(r-5,r+5,u)?o.top:l(n+a-5,n+a+5,c)&&l(r+5,r+i-5,u)?o.right:l(n+5,n+a-5,c)&&l(r+i-5,r+i+5,u)?o.bottom:l(n-5,n+5,c)&&l(r+5,r+i-5,u)?o.left:o.out}function d(e,t,n,r,o,a,i,c){var u;return e/t>n/r?[(o-(e-n/(u=r/t))/2)*u,a*u,i*u,c*u]:[o*(u=n/e),(a-(t-r/u)/2)*u,i*u,c*u]}!function(e){e[e.out=0]="out",e[e.in=1]="in",e[e.dot=2]="dot"}(i||(i={}));var v=["default","move","e-resize"];const h=function(e){var n,r,o=(0,t.useRef)(null),c=e.src,u=e.canvasWidth,s=e.canvasHeight,l={x:(n=u)/2,y:(r=s)/2,radius:Math.min(.4*n,.4*r,200)/2},f=l.x,h=l.y,p=l.radius,g=(0,t.useState)({x:f,y:h,radius:p}),m=g[0],y=g[1],b=(0,t.useRef)(0),x=(0,t.useState)({x:0,y:0}),w=x[0],E=x[1],M=(0,t.useRef)(!1),R=function(e){o.current&&(o.current.style.cursor=v[e])};function T(){if(o.current){var t=o.current.getContext("2d");if(t){var n=m.x,r=m.y,a=m.radius;t.clearRect(0,0,u,s),t.beginPath(),t.lineTo(0,0),t.arc(n,r,a,0,2*Math.PI),t.lineTo(0,0),t.lineTo(0,s),t.lineTo(u,s),t.lineTo(u,0),t.fillStyle="rgba(0,0,0,0.5)",t.fill(),t.beginPath(),t.arc(n,r,a,0,2*Math.PI),t.stroke(),t.closePath(),t.fillStyle="#F40",t.fillRect(n+a-5,r-5,10,10);var i=document.createElement("canvas");i.width=2*a,i.height=2*a;var l=i.getContext("2d"),f=new Image;f.setAttribute("crossOrigin","anonymous"),f.src=c||"",f.onload=function(){null==l||l.beginPath(),null==l||l.arc(a,a,a,0,2*Math.PI),null==l||l.clip();var t=d(u,s,f.width,f.height,n-a,r-a,2*a,2*a);null==l||l.drawImage(f,t[0],t[1],t[2],t[3],0,0,2*a,2*a),e.onResult(null==i?void 0:i.toDataURL("image/png",1))}}}}(0,t.useEffect)((function(){T()}),[]);var k=function(e,t){var n=m.x,r=m.y,o=m.radius,a=t.nativeEvent,c=a.offsetX,u=a.offsetY;return Math.pow(c-n,2)+Math.pow(u-r,2)<Math.pow(o-5,2)?i.in:c>n+o-5&&c<n+o+5&&u>r-5&&u<r+5?i.dot:i.out};return a().createElement("canvas",{ref:o,width:u,height:s,onMouseDown:function(e){M.current=!0;var t=e.nativeEvent,n=t.offsetX,r=t.offsetY;b.current=k(0,e),R(b.current),E({x:n,y:r})},onMouseEnter:function(e){var t=e.nativeEvent;t.offsetX,t.offsetY},onMouseMove:function(e){if(!M.current){var t=k(0,e);R(t)}if(o.current&&o.current.getContext("2d")){var n=e.nativeEvent,r=n.offsetX,a=n.offsetY;if(b.current>0){var i=m.x,c=m.y,l=m.radius,f=r-w.x,d=a-w.y;1===b.current?(i+=f,c+=d):Math.abs(f)<Math.abs(d)?l+=d:l+=f,l<10&&(l=10),l>Math.min(u,s)/2&&(l=Math.min(u,s)/2),i<l&&(i=l),c<l&&(c=l),i+l>u&&(i=u-l),c+l>s&&(c=s-l),y({x:i,y:c,radius:l}),T(),E({x:r,y:a})}}},onMouseUp:function(e){M.current=!1,b.current=0}})},p=function(e){var n=(0,t.useRef)(null),r=e.src,i=e.canvasWidth,l=e.canvasHeight,v=e.square,h=void 0!==v&&v,p=(0,t.useState)(function(e,t,n){var r=Math.min(200,.4*e),o=Math.min(200,.4*t);return n&&(o=r=Math.min(r,o)),{x:(e-r)/2,y:(t-o)/2,width:r,height:o}}(i,l,h)),g=p[0],m=p[1],y=(0,t.useState)({x:0,y:0}),b=y[0],x=y[1],w=(0,t.useRef)(0),E=(0,t.useRef)(!1);function M(){if(n.current){var t=n.current.getContext("2d");if(t){var o=g.x,a=g.y,c=g.width,u=g.height;t.clearRect(0,0,i,l),t.fillStyle="rgba(0,0,0,0.5)",t.fillRect(0,0,i,l),t.clearRect(o,a,c,u),t.beginPath(),t.setLineDash([0]),t.strokeStyle="#0F0",t.rect(o,a,c,u),t.stroke(),t.beginPath(),t.setLineDash([5]),t.moveTo(o+c/3,a),t.lineTo(o+c/3,a+u),t.moveTo(o+c/3,a),t.lineTo(o+c/3,a+u),t.moveTo(o+2*c/3,a),t.lineTo(o+2*c/3,a+u),t.moveTo(o,a+u/3),t.lineTo(o+c,a+u/3),t.moveTo(o,a+2*u/3),t.lineTo(o+c,a+2*u/3),t.stroke(),t.fillStyle="#F40",h||(t.fillRect(o-5,a-5,s,s),t.fillRect(o+c-5,a-5,s,s),t.fillRect(o-5,a+u-5,s,s),t.fillRect(o+c/2-5,a-5,s,s),t.fillRect(o-5,a+u/2-5,s,s),t.fillRect(o+c/2-5,a+u-5,s,s),t.fillRect(o+c-5,a+u/2-5,s,s)),t.fillRect(o+c-5,a+u-5,s,s),t.closePath();var f=document.createElement("canvas");f.width=c,f.height=u;var v=f.getContext("2d"),p=new Image;p.setAttribute("crossOrigin","anonymous"),p.src=r||"",p.onload=function(){var t=d(i,l,p.width,p.height,o,a,c,u);null==v||v.drawImage(p,t[0],t[1],t[2],t[3],0,0,c,u),e.onResult(null==f?void 0:f.toDataURL("image/png",1))}}}}var R=function(e){n.current&&(n.current.style.cursor=h?u[e]:c[e])},T=(0,t.useCallback)((function(e){if(n.current){var t=n.current.getClientRects(),r=e.clientX-t[0].x,a=e.clientY-t[0].y;if(!E.current){var c=f(g,{offsetX:r,offsetY:a});R(c)}if(w.current!==o.out){var u=function(e,t,n,r,a,i,c){var u=t.offsetX,s=t.offsetY,l=e.x,f=e.y,d=e.width,v=e.height,h=u-n.x,p=s-n.y,g=l+d,m=f+v;switch(r){case o.in:l+=h,f+=p;break;case o.top_left:if(c)break;(d=g-(l=u<0?0:u))<30&&(l=g-(d=30)),(v=m-(f=s<0?0:s))<30&&(f=m-(v=30));break;case o.top_right:if(c)break;(v-=p)<30&&(f=m-(v=30)),(f=m-v)<0&&(v=m-(f=0)),l+(d+=h)>a&&(d=a-l);break;case o.bottom_right:c&&(Math.abs(h)<Math.abs(p)?p=h:h=p),(d+=h)<30&&(d=30),(v+=p)<30&&(v=30),l+d>a&&(d=a-l),f+v>i&&(v=i-f);break;case o.bottom_left:if(c)break;(d=g-(l=u<0?0:u))<30&&(l=g-(d=30)),(v+=p)<30&&(f=m-(v=30)),f+v>i&&(v=i-f);break;case o.top:if(c)break;(v=m-(f=s<0?0:s))<30&&(f=m-(v=30));break;case o.bottom:if(c)break;(v+=p)<30&&(v=30),f+v>i&&(v=i-f);break;case o.right:if(c)break;(d+=h)<30&&(d=30),l+d>a&&(d=a-l);break;case o.left:if(c)break;(d=g-(l=u<0?0:u))<30&&(l=g-(d=30))}return l<0&&(l=0),f<0&&(f=0),l+d>a&&(l=a-d),f+v>i&&(f=i-v),{x:l,y:f,width:d,height:v}}(g,{offsetX:r,offsetY:a},b,w.current,i,l,h),s=u.x,d=u.y,v=u.width,p=u.height;x({x:r,y:a}),m({x:s,y:d,width:v,height:p}),M()}}}),[b,g]),k=(0,t.useCallback)((function(e){E.current=!1,w.current=0}),[]);return(0,t.useEffect)((function(){M()}),[]),(0,t.useEffect)((function(){return window.addEventListener("mousemove",T),window.addEventListener("mouseup",k),function(){window.removeEventListener("mousemove",T),window.removeEventListener("mouseup",k)}}),[T,k]),a().createElement("canvas",{ref:n,width:i,height:l,onMouseDown:function(e){E.current=!0;var t=e.nativeEvent,n=t.offsetX,r=t.offsetY;w.current=f(g,e.nativeEvent),R(w.current),x({x:n,y:r})},onMouseEnter:function(e){var t=e.nativeEvent;t.offsetX,t.offsetY}})},g=function(e){var n=(0,t.useRef)(null),r=e.src,o=e.canvasWidth,i=e.canvasHeight,c=e.dots,u=(0,t.useState)(function(e,t,n){for(var r=Math.min(.5*e,.5*t,200)/2,o=e/2,a=t/2,i=[],c=0;c<n;c++){var u;u=n%2==1?c/n*2*Math.PI-Math.PI/2:(c+.5)/n*2*Math.PI;var s=Math.cos(u).toFixed(3),l=Math.sin(u).toFixed(3);i.push({x:o+r*parseFloat(s),y:a+r*parseFloat(l)})}return i}(o,i,c)),l=u[0],f=u[1],v=(0,t.useRef)(e.dots),h=(0,t.useRef)(!1);function p(){if(n.current){var t=n.current.getContext("2d");if(t){t.clearRect(0,0,o,i),t.fillStyle="rgba(0,0,0,0.5)",t.beginPath(),t.lineTo(0,0);for(var a=0;a<e.dots;a++)t.lineTo(l[a].x,l[a].y);for(t.lineTo(l[0].x,l[0].y),t.lineTo(0,0),t.lineTo(0,i),t.lineTo(o,i),t.lineTo(o,0),t.fill(),t.strokeStyle="#0F0",t.fillStyle="#F40",t.beginPath(),a=0;a<e.dots;a++)t.setLineDash([5]),t.lineTo(l[a].x,l[a].y),t.fillRect(l[a].x-5,l[a].y-5,s,s);t.lineTo(l[0].x,l[0].y),t.stroke(),t.closePath();var c=document.createElement("canvas"),u=0,f=o,v=0,h=i;l.forEach((function(e){u=Math.max(u,e.x),f=Math.min(f,e.x),v=Math.max(v,e.y),h=Math.min(h,e.y)})),c.width=u-f,c.height=v-h;var p=c.getContext("2d"),g=new Image;g.setAttribute("crossOrigin","anonymous"),g.src=r||"",g.onload=function(){null==p||p.beginPath(),l.forEach((function(e){null==p||p.lineTo(e.x-f,e.y-h)})),null==p||p.lineTo(l[0].x-f,l[0].y-h),null==p||p.clip();var t=d(o,i,g.width,g.height,f,h,c.width,c.height);null==p||p.drawImage(g,t[0],t[1],t[2],t[3],0,0,c.width,c.height),e.onResult(null==c?void 0:c.toDataURL("image/png",1))}}}}(0,t.useEffect)((function(){p()}),[]),(0,t.useEffect)((function(){return window.addEventListener("mousemove",b),window.addEventListener("mouseup",x),function(){window.removeEventListener("mouseup",b),window.removeEventListener("mouseup",x)}}),[]);var g=function(t){if(n.current){var r=n.current;t===e.dots?r.style.cursor="default":r.style.cursor="move"}};function m(e,t,n){return n>e&&n<t}function y(t,n){for(var r=0;r<e.dots;r++)if(m(t[r].x-5,t[r].x+5,n.x)&&m(t[r].y-5,t[r].y+5,n.y))return r;return e.dots}var b=function(t){if(console.log(t.clientX,t.clientY),n.current){var r=n.current.getClientRects(),a=t.clientX-r[0].x,c=t.clientY-r[0].y;if(!h.current){var u=y(l,{x:a,y:c});g(u)}v.current!==e.dots&&(a<0&&(a=0),c<0&&(c=0),a>o&&(a=o),c>i&&(c=i),l[v.current]={x:a,y:c},f(l),p())}},x=function(t){h.current=!1,v.current=e.dots};return console.log(o),a().createElement("canvas",{ref:n,width:o,height:i,onMouseDown:function(e){h.current=!0;var t=e.nativeEvent,n=t.offsetX,r=t.offsetY;v.current=y(l,{x:n,y:r}),g(v.current)},onMouseEnter:function(e){var t=e.nativeEvent;t.offsetX,t.offsetY}})};var m=n(379),y=n.n(m),b=n(795),x=n.n(b),w=n(569),E=n.n(w),M=n(565),R=n.n(M),T=n(216),k=n.n(T),A=n(589),C=n.n(A),S=n(424),P={};P.styleTagTransform=C(),P.setAttributes=R(),P.insert=E().bind(null,"head"),P.domAPI=x(),P.insertStyleElement=k(),y()(S.Z,P),S.Z&&S.Z.locals&&S.Z.locals;const _=function(n){var r=n.type,o=void 0===r?"rectangle":r,i=n.image,c=void 0===i?"":i,u=(0,t.useRef)(null),s=(0,t.useMemo)((function(){if(!u.current)return null;var t=u.current,r={canvasWidth:t.clientWidth,canvasHeight:t.clientHeight,src:c};switch(o){case"rectangle":return a().createElement(p,e({onResult:n.onResult},r));case"square":return a().createElement(p,e({onResult:n.onResult},r,{square:!0}));case"circle":return a().createElement(h,e({onResult:n.onResult},r));case"polygon":return a().createElement(g,e({onResult:n.onResult,dots:n.nodesNum||4},r));default:throw new Error("wrong type,the type could only be circle,square,rectangle or polygon")}}),[o,c]);return a().createElement("div",{ref:u,className:"box",style:e(e({},n.style),{backgroundImage:"url(".concat(c,")")})},s)}})();var o=exports;for(var a in r)o[a]=r[a];r.__esModule&&Object.defineProperty(o,"__esModule",{value:!0})})();
//# sourceMappingURL=index.js.map