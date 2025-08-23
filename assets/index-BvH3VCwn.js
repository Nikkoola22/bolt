(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();var Jo={exports:{}},ri={},Ko={exports:{}},I={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Jn=Symbol.for("react.element"),ud=Symbol.for("react.portal"),dd=Symbol.for("react.fragment"),cd=Symbol.for("react.strict_mode"),pd=Symbol.for("react.profiler"),md=Symbol.for("react.provider"),fd=Symbol.for("react.context"),vd=Symbol.for("react.forward_ref"),gd=Symbol.for("react.suspense"),hd=Symbol.for("react.memo"),yd=Symbol.for("react.lazy"),Ma=Symbol.iterator;function xd(e){return e===null||typeof e!="object"?null:(e=Ma&&e[Ma]||e["@@iterator"],typeof e=="function"?e:null)}var Xo={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Yo=Object.assign,Zo={};function an(e,t,n){this.props=e,this.context=t,this.refs=Zo,this.updater=n||Xo}an.prototype.isReactComponent={};an.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};an.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function el(){}el.prototype=an.prototype;function Hs(e,t,n){this.props=e,this.context=t,this.refs=Zo,this.updater=n||Xo}var Bs=Hs.prototype=new el;Bs.constructor=Hs;Yo(Bs,an.prototype);Bs.isPureReactComponent=!0;var Fa=Array.isArray,tl=Object.prototype.hasOwnProperty,$s={current:null},nl={key:!0,ref:!0,__self:!0,__source:!0};function rl(e,t,n){var r,i={},s=null,a=null;if(t!=null)for(r in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(s=""+t.key),t)tl.call(t,r)&&!nl.hasOwnProperty(r)&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var l=Array(o),c=0;c<o;c++)l[c]=arguments[c+2];i.children=l}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return{$$typeof:Jn,type:e,key:s,ref:a,props:i,_owner:$s.current}}function Ed(e,t){return{$$typeof:Jn,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Gs(e){return typeof e=="object"&&e!==null&&e.$$typeof===Jn}function Ld(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var za=/\/+/g;function ji(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Ld(""+e.key):t.toString(36)}function Er(e,t,n,r,i){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case Jn:case ud:a=!0}}if(a)return a=e,i=i(a),e=r===""?"."+ji(a,0):r,Fa(i)?(n="",e!=null&&(n=e.replace(za,"$&/")+"/"),Er(i,t,n,"",function(c){return c})):i!=null&&(Gs(i)&&(i=Ed(i,n+(!i.key||a&&a.key===i.key?"":(""+i.key).replace(za,"$&/")+"/")+e)),t.push(i)),1;if(a=0,r=r===""?".":r+":",Fa(e))for(var o=0;o<e.length;o++){s=e[o];var l=r+ji(s,o);a+=Er(s,t,n,l,i)}else if(l=xd(e),typeof l=="function")for(e=l.call(e),o=0;!(s=e.next()).done;)s=s.value,l=r+ji(s,o++),a+=Er(s,t,n,l,i);else if(s==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function nr(e,t,n){if(e==null)return e;var r=[],i=0;return Er(e,r,"","",function(s){return t.call(n,s,i++)}),r}function jd(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var le={current:null},Lr={transition:null},Sd={ReactCurrentDispatcher:le,ReactCurrentBatchConfig:Lr,ReactCurrentOwner:$s};function il(){throw Error("act(...) is not supported in production builds of React.")}I.Children={map:nr,forEach:function(e,t,n){nr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return nr(e,function(){t++}),t},toArray:function(e){return nr(e,function(t){return t})||[]},only:function(e){if(!Gs(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};I.Component=an;I.Fragment=dd;I.Profiler=pd;I.PureComponent=Hs;I.StrictMode=cd;I.Suspense=gd;I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Sd;I.act=il;I.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Yo({},e.props),i=e.key,s=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(s=t.ref,a=$s.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var o=e.type.defaultProps;for(l in t)tl.call(t,l)&&!nl.hasOwnProperty(l)&&(r[l]=t[l]===void 0&&o!==void 0?o[l]:t[l])}var l=arguments.length-2;if(l===1)r.children=n;else if(1<l){o=Array(l);for(var c=0;c<l;c++)o[c]=arguments[c+2];r.children=o}return{$$typeof:Jn,type:e.type,key:i,ref:s,props:r,_owner:a}};I.createContext=function(e){return e={$$typeof:fd,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:md,_context:e},e.Consumer=e};I.createElement=rl;I.createFactory=function(e){var t=rl.bind(null,e);return t.type=e,t};I.createRef=function(){return{current:null}};I.forwardRef=function(e){return{$$typeof:vd,render:e}};I.isValidElement=Gs;I.lazy=function(e){return{$$typeof:yd,_payload:{_status:-1,_result:e},_init:jd}};I.memo=function(e,t){return{$$typeof:hd,type:e,compare:t===void 0?null:t}};I.startTransition=function(e){var t=Lr.transition;Lr.transition={};try{e()}finally{Lr.transition=t}};I.unstable_act=il;I.useCallback=function(e,t){return le.current.useCallback(e,t)};I.useContext=function(e){return le.current.useContext(e)};I.useDebugValue=function(){};I.useDeferredValue=function(e){return le.current.useDeferredValue(e)};I.useEffect=function(e,t){return le.current.useEffect(e,t)};I.useId=function(){return le.current.useId()};I.useImperativeHandle=function(e,t,n){return le.current.useImperativeHandle(e,t,n)};I.useInsertionEffect=function(e,t){return le.current.useInsertionEffect(e,t)};I.useLayoutEffect=function(e,t){return le.current.useLayoutEffect(e,t)};I.useMemo=function(e,t){return le.current.useMemo(e,t)};I.useReducer=function(e,t,n){return le.current.useReducer(e,t,n)};I.useRef=function(e){return le.current.useRef(e)};I.useState=function(e){return le.current.useState(e)};I.useSyncExternalStore=function(e,t,n){return le.current.useSyncExternalStore(e,t,n)};I.useTransition=function(){return le.current.useTransition()};I.version="18.3.1";Ko.exports=I;var M=Ko.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Cd=M,Td=Symbol.for("react.element"),wd=Symbol.for("react.fragment"),Nd=Object.prototype.hasOwnProperty,Ad=Cd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Pd={key:!0,ref:!0,__self:!0,__source:!0};function sl(e,t,n){var r,i={},s=null,a=null;n!==void 0&&(s=""+n),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(a=t.ref);for(r in t)Nd.call(t,r)&&!Pd.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:Td,type:e,key:s,ref:a,props:i,_owner:Ad.current}}ri.Fragment=wd;ri.jsx=sl;ri.jsxs=sl;Jo.exports=ri;var p=Jo.exports,al={exports:{}},Ee={},ol={exports:{}},ll={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(C,P){var R=C.length;C.push(P);e:for(;0<R;){var $=R-1>>>1,K=C[$];if(0<i(K,P))C[$]=P,C[R]=K,R=$;else break e}}function n(C){return C.length===0?null:C[0]}function r(C){if(C.length===0)return null;var P=C[0],R=C.pop();if(R!==P){C[0]=R;e:for(var $=0,K=C.length,er=K>>>1;$<er;){var ht=2*($+1)-1,Li=C[ht],yt=ht+1,tr=C[yt];if(0>i(Li,R))yt<K&&0>i(tr,Li)?(C[$]=tr,C[yt]=R,$=yt):(C[$]=Li,C[ht]=R,$=ht);else if(yt<K&&0>i(tr,R))C[$]=tr,C[yt]=R,$=yt;else break e}}return P}function i(C,P){var R=C.sortIndex-P.sortIndex;return R!==0?R:C.id-P.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;e.unstable_now=function(){return s.now()}}else{var a=Date,o=a.now();e.unstable_now=function(){return a.now()-o}}var l=[],c=[],g=1,h=null,v=3,x=!1,E=!1,L=!1,A=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,u=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m(C){for(var P=n(c);P!==null;){if(P.callback===null)r(c);else if(P.startTime<=C)r(c),P.sortIndex=P.expirationTime,t(l,P);else break;P=n(c)}}function f(C){if(L=!1,m(C),!E)if(n(l)!==null)E=!0,xi(j);else{var P=n(c);P!==null&&Ei(f,P.startTime-C)}}function j(C,P){E=!1,L&&(L=!1,d(w),w=-1),x=!0;var R=v;try{for(m(P),h=n(l);h!==null&&(!(h.expirationTime>P)||C&&!Ae());){var $=h.callback;if(typeof $=="function"){h.callback=null,v=h.priorityLevel;var K=$(h.expirationTime<=P);P=e.unstable_now(),typeof K=="function"?h.callback=K:h===n(l)&&r(l),m(P)}else r(l);h=n(l)}if(h!==null)var er=!0;else{var ht=n(c);ht!==null&&Ei(f,ht.startTime-P),er=!1}return er}finally{h=null,v=R,x=!1}}var N=!1,T=null,w=-1,D=5,k=-1;function Ae(){return!(e.unstable_now()-k<D)}function un(){if(T!==null){var C=e.unstable_now();k=C;var P=!0;try{P=T(!0,C)}finally{P?dn():(N=!1,T=null)}}else N=!1}var dn;if(typeof u=="function")dn=function(){u(un)};else if(typeof MessageChannel<"u"){var _a=new MessageChannel,ld=_a.port2;_a.port1.onmessage=un,dn=function(){ld.postMessage(null)}}else dn=function(){A(un,0)};function xi(C){T=C,N||(N=!0,dn())}function Ei(C,P){w=A(function(){C(e.unstable_now())},P)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(C){C.callback=null},e.unstable_continueExecution=function(){E||x||(E=!0,xi(j))},e.unstable_forceFrameRate=function(C){0>C||125<C?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):D=0<C?Math.floor(1e3/C):5},e.unstable_getCurrentPriorityLevel=function(){return v},e.unstable_getFirstCallbackNode=function(){return n(l)},e.unstable_next=function(C){switch(v){case 1:case 2:case 3:var P=3;break;default:P=v}var R=v;v=P;try{return C()}finally{v=R}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(C,P){switch(C){case 1:case 2:case 3:case 4:case 5:break;default:C=3}var R=v;v=C;try{return P()}finally{v=R}},e.unstable_scheduleCallback=function(C,P,R){var $=e.unstable_now();switch(typeof R=="object"&&R!==null?(R=R.delay,R=typeof R=="number"&&0<R?$+R:$):R=$,C){case 1:var K=-1;break;case 2:K=250;break;case 5:K=1073741823;break;case 4:K=1e4;break;default:K=5e3}return K=R+K,C={id:g++,callback:P,priorityLevel:C,startTime:R,expirationTime:K,sortIndex:-1},R>$?(C.sortIndex=R,t(c,C),n(l)===null&&C===n(c)&&(L?(d(w),w=-1):L=!0,Ei(f,R-$))):(C.sortIndex=K,t(l,C),E||x||(E=!0,xi(j))),C},e.unstable_shouldYield=Ae,e.unstable_wrapCallback=function(C){var P=v;return function(){var R=v;v=P;try{return C.apply(this,arguments)}finally{v=R}}}})(ll);ol.exports=ll;var Rd=ol.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var kd=M,xe=Rd;function y(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var ul=new Set,In={};function kt(e,t){Yt(e,t),Yt(e+"Capture",t)}function Yt(e,t){for(In[e]=t,e=0;e<t.length;e++)ul.add(t[e])}var Ge=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Xi=Object.prototype.hasOwnProperty,Id=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Ua={},Va={};function qd(e){return Xi.call(Va,e)?!0:Xi.call(Ua,e)?!1:Id.test(e)?Va[e]=!0:(Ua[e]=!0,!1)}function Dd(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function bd(e,t,n,r){if(t===null||typeof t>"u"||Dd(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ue(e,t,n,r,i,s,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=s,this.removeEmptyString=a}var te={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){te[e]=new ue(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];te[t]=new ue(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){te[e]=new ue(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){te[e]=new ue(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){te[e]=new ue(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){te[e]=new ue(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){te[e]=new ue(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){te[e]=new ue(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){te[e]=new ue(e,5,!1,e.toLowerCase(),null,!1,!1)});var Qs=/[\-:]([a-z])/g;function Ws(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Qs,Ws);te[t]=new ue(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Qs,Ws);te[t]=new ue(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Qs,Ws);te[t]=new ue(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){te[e]=new ue(e,1,!1,e.toLowerCase(),null,!1,!1)});te.xlinkHref=new ue("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){te[e]=new ue(e,1,!1,e.toLowerCase(),null,!0,!0)});function Js(e,t,n,r){var i=te.hasOwnProperty(t)?te[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(bd(t,n,i,r)&&(n=null),r||i===null?qd(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Ke=kd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,rr=Symbol.for("react.element"),Dt=Symbol.for("react.portal"),bt=Symbol.for("react.fragment"),Ks=Symbol.for("react.strict_mode"),Yi=Symbol.for("react.profiler"),dl=Symbol.for("react.provider"),cl=Symbol.for("react.context"),Xs=Symbol.for("react.forward_ref"),Zi=Symbol.for("react.suspense"),es=Symbol.for("react.suspense_list"),Ys=Symbol.for("react.memo"),Ye=Symbol.for("react.lazy"),pl=Symbol.for("react.offscreen"),Ha=Symbol.iterator;function cn(e){return e===null||typeof e!="object"?null:(e=Ha&&e[Ha]||e["@@iterator"],typeof e=="function"?e:null)}var H=Object.assign,Si;function xn(e){if(Si===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Si=t&&t[1]||""}return`
`+Si+e}var Ci=!1;function Ti(e,t){if(!e||Ci)return"";Ci=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var i=c.stack.split(`
`),s=r.stack.split(`
`),a=i.length-1,o=s.length-1;1<=a&&0<=o&&i[a]!==s[o];)o--;for(;1<=a&&0<=o;a--,o--)if(i[a]!==s[o]){if(a!==1||o!==1)do if(a--,o--,0>o||i[a]!==s[o]){var l=`
`+i[a].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=a&&0<=o);break}}}finally{Ci=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?xn(e):""}function Od(e){switch(e.tag){case 5:return xn(e.type);case 16:return xn("Lazy");case 13:return xn("Suspense");case 19:return xn("SuspenseList");case 0:case 2:case 15:return e=Ti(e.type,!1),e;case 11:return e=Ti(e.type.render,!1),e;case 1:return e=Ti(e.type,!0),e;default:return""}}function ts(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case bt:return"Fragment";case Dt:return"Portal";case Yi:return"Profiler";case Ks:return"StrictMode";case Zi:return"Suspense";case es:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case cl:return(e.displayName||"Context")+".Consumer";case dl:return(e._context.displayName||"Context")+".Provider";case Xs:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ys:return t=e.displayName||null,t!==null?t:ts(e.type)||"Memo";case Ye:t=e._payload,e=e._init;try{return ts(e(t))}catch{}}return null}function _d(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ts(t);case 8:return t===Ks?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function pt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ml(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Md(e){var t=ml(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(a){r=""+a,s.call(this,a)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ir(e){e._valueTracker||(e._valueTracker=Md(e))}function fl(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=ml(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function qr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ns(e,t){var n=t.checked;return H({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Ba(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=pt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function vl(e,t){t=t.checked,t!=null&&Js(e,"checked",t,!1)}function rs(e,t){vl(e,t);var n=pt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?is(e,t.type,n):t.hasOwnProperty("defaultValue")&&is(e,t.type,pt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function $a(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function is(e,t,n){(t!=="number"||qr(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var En=Array.isArray;function Gt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+pt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function ss(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(y(91));return H({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Ga(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(y(92));if(En(n)){if(1<n.length)throw Error(y(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:pt(n)}}function gl(e,t){var n=pt(t.value),r=pt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Qa(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function hl(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function as(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?hl(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var sr,yl=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(sr=sr||document.createElement("div"),sr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=sr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function qn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Sn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Fd=["Webkit","ms","Moz","O"];Object.keys(Sn).forEach(function(e){Fd.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Sn[t]=Sn[e]})});function xl(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Sn.hasOwnProperty(e)&&Sn[e]?(""+t).trim():t+"px"}function El(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=xl(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var zd=H({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function os(e,t){if(t){if(zd[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(y(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(y(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(y(61))}if(t.style!=null&&typeof t.style!="object")throw Error(y(62))}}function ls(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var us=null;function Zs(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ds=null,Qt=null,Wt=null;function Wa(e){if(e=Yn(e)){if(typeof ds!="function")throw Error(y(280));var t=e.stateNode;t&&(t=li(t),ds(e.stateNode,e.type,t))}}function Ll(e){Qt?Wt?Wt.push(e):Wt=[e]:Qt=e}function jl(){if(Qt){var e=Qt,t=Wt;if(Wt=Qt=null,Wa(e),t)for(e=0;e<t.length;e++)Wa(t[e])}}function Sl(e,t){return e(t)}function Cl(){}var wi=!1;function Tl(e,t,n){if(wi)return e(t,n);wi=!0;try{return Sl(e,t,n)}finally{wi=!1,(Qt!==null||Wt!==null)&&(Cl(),jl())}}function Dn(e,t){var n=e.stateNode;if(n===null)return null;var r=li(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(y(231,t,typeof n));return n}var cs=!1;if(Ge)try{var pn={};Object.defineProperty(pn,"passive",{get:function(){cs=!0}}),window.addEventListener("test",pn,pn),window.removeEventListener("test",pn,pn)}catch{cs=!1}function Ud(e,t,n,r,i,s,a,o,l){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(g){this.onError(g)}}var Cn=!1,Dr=null,br=!1,ps=null,Vd={onError:function(e){Cn=!0,Dr=e}};function Hd(e,t,n,r,i,s,a,o,l){Cn=!1,Dr=null,Ud.apply(Vd,arguments)}function Bd(e,t,n,r,i,s,a,o,l){if(Hd.apply(this,arguments),Cn){if(Cn){var c=Dr;Cn=!1,Dr=null}else throw Error(y(198));br||(br=!0,ps=c)}}function It(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function wl(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Ja(e){if(It(e)!==e)throw Error(y(188))}function $d(e){var t=e.alternate;if(!t){if(t=It(e),t===null)throw Error(y(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return Ja(i),e;if(s===r)return Ja(i),t;s=s.sibling}throw Error(y(188))}if(n.return!==r.return)n=i,r=s;else{for(var a=!1,o=i.child;o;){if(o===n){a=!0,n=i,r=s;break}if(o===r){a=!0,r=i,n=s;break}o=o.sibling}if(!a){for(o=s.child;o;){if(o===n){a=!0,n=s,r=i;break}if(o===r){a=!0,r=s,n=i;break}o=o.sibling}if(!a)throw Error(y(189))}}if(n.alternate!==r)throw Error(y(190))}if(n.tag!==3)throw Error(y(188));return n.stateNode.current===n?e:t}function Nl(e){return e=$d(e),e!==null?Al(e):null}function Al(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Al(e);if(t!==null)return t;e=e.sibling}return null}var Pl=xe.unstable_scheduleCallback,Ka=xe.unstable_cancelCallback,Gd=xe.unstable_shouldYield,Qd=xe.unstable_requestPaint,G=xe.unstable_now,Wd=xe.unstable_getCurrentPriorityLevel,ea=xe.unstable_ImmediatePriority,Rl=xe.unstable_UserBlockingPriority,Or=xe.unstable_NormalPriority,Jd=xe.unstable_LowPriority,kl=xe.unstable_IdlePriority,ii=null,Fe=null;function Kd(e){if(Fe&&typeof Fe.onCommitFiberRoot=="function")try{Fe.onCommitFiberRoot(ii,e,void 0,(e.current.flags&128)===128)}catch{}}var qe=Math.clz32?Math.clz32:Zd,Xd=Math.log,Yd=Math.LN2;function Zd(e){return e>>>=0,e===0?32:31-(Xd(e)/Yd|0)|0}var ar=64,or=4194304;function Ln(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function _r(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,s=e.pingedLanes,a=n&268435455;if(a!==0){var o=a&~i;o!==0?r=Ln(o):(s&=a,s!==0&&(r=Ln(s)))}else a=n&~i,a!==0?r=Ln(a):s!==0&&(r=Ln(s));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,s=t&-t,i>=s||i===16&&(s&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-qe(t),i=1<<n,r|=e[n],t&=~i;return r}function ec(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function tc(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,s=e.pendingLanes;0<s;){var a=31-qe(s),o=1<<a,l=i[a];l===-1?(!(o&n)||o&r)&&(i[a]=ec(o,t)):l<=t&&(e.expiredLanes|=o),s&=~o}}function ms(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Il(){var e=ar;return ar<<=1,!(ar&4194240)&&(ar=64),e}function Ni(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Kn(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-qe(t),e[t]=n}function nc(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-qe(n),s=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~s}}function ta(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-qe(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var b=0;function ql(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Dl,na,bl,Ol,_l,fs=!1,lr=[],it=null,st=null,at=null,bn=new Map,On=new Map,et=[],rc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Xa(e,t){switch(e){case"focusin":case"focusout":it=null;break;case"dragenter":case"dragleave":st=null;break;case"mouseover":case"mouseout":at=null;break;case"pointerover":case"pointerout":bn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":On.delete(t.pointerId)}}function mn(e,t,n,r,i,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},t!==null&&(t=Yn(t),t!==null&&na(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function ic(e,t,n,r,i){switch(t){case"focusin":return it=mn(it,e,t,n,r,i),!0;case"dragenter":return st=mn(st,e,t,n,r,i),!0;case"mouseover":return at=mn(at,e,t,n,r,i),!0;case"pointerover":var s=i.pointerId;return bn.set(s,mn(bn.get(s)||null,e,t,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,On.set(s,mn(On.get(s)||null,e,t,n,r,i)),!0}return!1}function Ml(e){var t=Lt(e.target);if(t!==null){var n=It(t);if(n!==null){if(t=n.tag,t===13){if(t=wl(n),t!==null){e.blockedOn=t,_l(e.priority,function(){bl(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function jr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=vs(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);us=r,n.target.dispatchEvent(r),us=null}else return t=Yn(n),t!==null&&na(t),e.blockedOn=n,!1;t.shift()}return!0}function Ya(e,t,n){jr(e)&&n.delete(t)}function sc(){fs=!1,it!==null&&jr(it)&&(it=null),st!==null&&jr(st)&&(st=null),at!==null&&jr(at)&&(at=null),bn.forEach(Ya),On.forEach(Ya)}function fn(e,t){e.blockedOn===t&&(e.blockedOn=null,fs||(fs=!0,xe.unstable_scheduleCallback(xe.unstable_NormalPriority,sc)))}function _n(e){function t(i){return fn(i,e)}if(0<lr.length){fn(lr[0],e);for(var n=1;n<lr.length;n++){var r=lr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(it!==null&&fn(it,e),st!==null&&fn(st,e),at!==null&&fn(at,e),bn.forEach(t),On.forEach(t),n=0;n<et.length;n++)r=et[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<et.length&&(n=et[0],n.blockedOn===null);)Ml(n),n.blockedOn===null&&et.shift()}var Jt=Ke.ReactCurrentBatchConfig,Mr=!0;function ac(e,t,n,r){var i=b,s=Jt.transition;Jt.transition=null;try{b=1,ra(e,t,n,r)}finally{b=i,Jt.transition=s}}function oc(e,t,n,r){var i=b,s=Jt.transition;Jt.transition=null;try{b=4,ra(e,t,n,r)}finally{b=i,Jt.transition=s}}function ra(e,t,n,r){if(Mr){var i=vs(e,t,n,r);if(i===null)_i(e,t,r,Fr,n),Xa(e,r);else if(ic(i,e,t,n,r))r.stopPropagation();else if(Xa(e,r),t&4&&-1<rc.indexOf(e)){for(;i!==null;){var s=Yn(i);if(s!==null&&Dl(s),s=vs(e,t,n,r),s===null&&_i(e,t,r,Fr,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else _i(e,t,r,null,n)}}var Fr=null;function vs(e,t,n,r){if(Fr=null,e=Zs(r),e=Lt(e),e!==null)if(t=It(e),t===null)e=null;else if(n=t.tag,n===13){if(e=wl(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Fr=e,null}function Fl(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Wd()){case ea:return 1;case Rl:return 4;case Or:case Jd:return 16;case kl:return 536870912;default:return 16}default:return 16}}var nt=null,ia=null,Sr=null;function zl(){if(Sr)return Sr;var e,t=ia,n=t.length,r,i="value"in nt?nt.value:nt.textContent,s=i.length;for(e=0;e<n&&t[e]===i[e];e++);var a=n-e;for(r=1;r<=a&&t[n-r]===i[s-r];r++);return Sr=i.slice(e,1<r?1-r:void 0)}function Cr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ur(){return!0}function Za(){return!1}function Le(e){function t(n,r,i,s,a){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?ur:Za,this.isPropagationStopped=Za,this}return H(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ur)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ur)},persist:function(){},isPersistent:ur}),t}var on={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},sa=Le(on),Xn=H({},on,{view:0,detail:0}),lc=Le(Xn),Ai,Pi,vn,si=H({},Xn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:aa,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==vn&&(vn&&e.type==="mousemove"?(Ai=e.screenX-vn.screenX,Pi=e.screenY-vn.screenY):Pi=Ai=0,vn=e),Ai)},movementY:function(e){return"movementY"in e?e.movementY:Pi}}),eo=Le(si),uc=H({},si,{dataTransfer:0}),dc=Le(uc),cc=H({},Xn,{relatedTarget:0}),Ri=Le(cc),pc=H({},on,{animationName:0,elapsedTime:0,pseudoElement:0}),mc=Le(pc),fc=H({},on,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),vc=Le(fc),gc=H({},on,{data:0}),to=Le(gc),hc={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},yc={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},xc={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ec(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=xc[e])?!!t[e]:!1}function aa(){return Ec}var Lc=H({},Xn,{key:function(e){if(e.key){var t=hc[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Cr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?yc[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:aa,charCode:function(e){return e.type==="keypress"?Cr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Cr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),jc=Le(Lc),Sc=H({},si,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),no=Le(Sc),Cc=H({},Xn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:aa}),Tc=Le(Cc),wc=H({},on,{propertyName:0,elapsedTime:0,pseudoElement:0}),Nc=Le(wc),Ac=H({},si,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Pc=Le(Ac),Rc=[9,13,27,32],oa=Ge&&"CompositionEvent"in window,Tn=null;Ge&&"documentMode"in document&&(Tn=document.documentMode);var kc=Ge&&"TextEvent"in window&&!Tn,Ul=Ge&&(!oa||Tn&&8<Tn&&11>=Tn),ro=" ",io=!1;function Vl(e,t){switch(e){case"keyup":return Rc.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Hl(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ot=!1;function Ic(e,t){switch(e){case"compositionend":return Hl(t);case"keypress":return t.which!==32?null:(io=!0,ro);case"textInput":return e=t.data,e===ro&&io?null:e;default:return null}}function qc(e,t){if(Ot)return e==="compositionend"||!oa&&Vl(e,t)?(e=zl(),Sr=ia=nt=null,Ot=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Ul&&t.locale!=="ko"?null:t.data;default:return null}}var Dc={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function so(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Dc[e.type]:t==="textarea"}function Bl(e,t,n,r){Ll(r),t=zr(t,"onChange"),0<t.length&&(n=new sa("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var wn=null,Mn=null;function bc(e){tu(e,0)}function ai(e){var t=Ft(e);if(fl(t))return e}function Oc(e,t){if(e==="change")return t}var $l=!1;if(Ge){var ki;if(Ge){var Ii="oninput"in document;if(!Ii){var ao=document.createElement("div");ao.setAttribute("oninput","return;"),Ii=typeof ao.oninput=="function"}ki=Ii}else ki=!1;$l=ki&&(!document.documentMode||9<document.documentMode)}function oo(){wn&&(wn.detachEvent("onpropertychange",Gl),Mn=wn=null)}function Gl(e){if(e.propertyName==="value"&&ai(Mn)){var t=[];Bl(t,Mn,e,Zs(e)),Tl(bc,t)}}function _c(e,t,n){e==="focusin"?(oo(),wn=t,Mn=n,wn.attachEvent("onpropertychange",Gl)):e==="focusout"&&oo()}function Mc(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ai(Mn)}function Fc(e,t){if(e==="click")return ai(t)}function zc(e,t){if(e==="input"||e==="change")return ai(t)}function Uc(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var be=typeof Object.is=="function"?Object.is:Uc;function Fn(e,t){if(be(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Xi.call(t,i)||!be(e[i],t[i]))return!1}return!0}function lo(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function uo(e,t){var n=lo(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=lo(n)}}function Ql(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ql(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Wl(){for(var e=window,t=qr();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=qr(e.document)}return t}function la(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Vc(e){var t=Wl(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Ql(n.ownerDocument.documentElement,n)){if(r!==null&&la(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!e.extend&&s>r&&(i=r,r=s,s=i),i=uo(n,s);var a=uo(n,r);i&&a&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),s>r?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Hc=Ge&&"documentMode"in document&&11>=document.documentMode,_t=null,gs=null,Nn=null,hs=!1;function co(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;hs||_t==null||_t!==qr(r)||(r=_t,"selectionStart"in r&&la(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Nn&&Fn(Nn,r)||(Nn=r,r=zr(gs,"onSelect"),0<r.length&&(t=new sa("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=_t)))}function dr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Mt={animationend:dr("Animation","AnimationEnd"),animationiteration:dr("Animation","AnimationIteration"),animationstart:dr("Animation","AnimationStart"),transitionend:dr("Transition","TransitionEnd")},qi={},Jl={};Ge&&(Jl=document.createElement("div").style,"AnimationEvent"in window||(delete Mt.animationend.animation,delete Mt.animationiteration.animation,delete Mt.animationstart.animation),"TransitionEvent"in window||delete Mt.transitionend.transition);function oi(e){if(qi[e])return qi[e];if(!Mt[e])return e;var t=Mt[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Jl)return qi[e]=t[n];return e}var Kl=oi("animationend"),Xl=oi("animationiteration"),Yl=oi("animationstart"),Zl=oi("transitionend"),eu=new Map,po="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ft(e,t){eu.set(e,t),kt(t,[e])}for(var Di=0;Di<po.length;Di++){var bi=po[Di],Bc=bi.toLowerCase(),$c=bi[0].toUpperCase()+bi.slice(1);ft(Bc,"on"+$c)}ft(Kl,"onAnimationEnd");ft(Xl,"onAnimationIteration");ft(Yl,"onAnimationStart");ft("dblclick","onDoubleClick");ft("focusin","onFocus");ft("focusout","onBlur");ft(Zl,"onTransitionEnd");Yt("onMouseEnter",["mouseout","mouseover"]);Yt("onMouseLeave",["mouseout","mouseover"]);Yt("onPointerEnter",["pointerout","pointerover"]);Yt("onPointerLeave",["pointerout","pointerover"]);kt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));kt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));kt("onBeforeInput",["compositionend","keypress","textInput","paste"]);kt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));kt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));kt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var jn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Gc=new Set("cancel close invalid load scroll toggle".split(" ").concat(jn));function mo(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Bd(r,t,void 0,e),e.currentTarget=null}function tu(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var s=void 0;if(t)for(var a=r.length-1;0<=a;a--){var o=r[a],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&i.isPropagationStopped())break e;mo(i,o,c),s=l}else for(a=0;a<r.length;a++){if(o=r[a],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&i.isPropagationStopped())break e;mo(i,o,c),s=l}}}if(br)throw e=ps,br=!1,ps=null,e}function _(e,t){var n=t[js];n===void 0&&(n=t[js]=new Set);var r=e+"__bubble";n.has(r)||(nu(t,e,2,!1),n.add(r))}function Oi(e,t,n){var r=0;t&&(r|=4),nu(n,e,r,t)}var cr="_reactListening"+Math.random().toString(36).slice(2);function zn(e){if(!e[cr]){e[cr]=!0,ul.forEach(function(n){n!=="selectionchange"&&(Gc.has(n)||Oi(n,!1,e),Oi(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[cr]||(t[cr]=!0,Oi("selectionchange",!1,t))}}function nu(e,t,n,r){switch(Fl(t)){case 1:var i=ac;break;case 4:i=oc;break;default:i=ra}n=i.bind(null,t,n,e),i=void 0,!cs||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function _i(e,t,n,r,i){var s=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var o=r.stateNode.containerInfo;if(o===i||o.nodeType===8&&o.parentNode===i)break;if(a===4)for(a=r.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===i||l.nodeType===8&&l.parentNode===i))return;a=a.return}for(;o!==null;){if(a=Lt(o),a===null)return;if(l=a.tag,l===5||l===6){r=s=a;continue e}o=o.parentNode}}r=r.return}Tl(function(){var c=s,g=Zs(n),h=[];e:{var v=eu.get(e);if(v!==void 0){var x=sa,E=e;switch(e){case"keypress":if(Cr(n)===0)break e;case"keydown":case"keyup":x=jc;break;case"focusin":E="focus",x=Ri;break;case"focusout":E="blur",x=Ri;break;case"beforeblur":case"afterblur":x=Ri;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=eo;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=dc;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=Tc;break;case Kl:case Xl:case Yl:x=mc;break;case Zl:x=Nc;break;case"scroll":x=lc;break;case"wheel":x=Pc;break;case"copy":case"cut":case"paste":x=vc;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=no}var L=(t&4)!==0,A=!L&&e==="scroll",d=L?v!==null?v+"Capture":null:v;L=[];for(var u=c,m;u!==null;){m=u;var f=m.stateNode;if(m.tag===5&&f!==null&&(m=f,d!==null&&(f=Dn(u,d),f!=null&&L.push(Un(u,f,m)))),A)break;u=u.return}0<L.length&&(v=new x(v,E,null,n,g),h.push({event:v,listeners:L}))}}if(!(t&7)){e:{if(v=e==="mouseover"||e==="pointerover",x=e==="mouseout"||e==="pointerout",v&&n!==us&&(E=n.relatedTarget||n.fromElement)&&(Lt(E)||E[Qe]))break e;if((x||v)&&(v=g.window===g?g:(v=g.ownerDocument)?v.defaultView||v.parentWindow:window,x?(E=n.relatedTarget||n.toElement,x=c,E=E?Lt(E):null,E!==null&&(A=It(E),E!==A||E.tag!==5&&E.tag!==6)&&(E=null)):(x=null,E=c),x!==E)){if(L=eo,f="onMouseLeave",d="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(L=no,f="onPointerLeave",d="onPointerEnter",u="pointer"),A=x==null?v:Ft(x),m=E==null?v:Ft(E),v=new L(f,u+"leave",x,n,g),v.target=A,v.relatedTarget=m,f=null,Lt(g)===c&&(L=new L(d,u+"enter",E,n,g),L.target=m,L.relatedTarget=A,f=L),A=f,x&&E)t:{for(L=x,d=E,u=0,m=L;m;m=qt(m))u++;for(m=0,f=d;f;f=qt(f))m++;for(;0<u-m;)L=qt(L),u--;for(;0<m-u;)d=qt(d),m--;for(;u--;){if(L===d||d!==null&&L===d.alternate)break t;L=qt(L),d=qt(d)}L=null}else L=null;x!==null&&fo(h,v,x,L,!1),E!==null&&A!==null&&fo(h,A,E,L,!0)}}e:{if(v=c?Ft(c):window,x=v.nodeName&&v.nodeName.toLowerCase(),x==="select"||x==="input"&&v.type==="file")var j=Oc;else if(so(v))if($l)j=zc;else{j=Mc;var N=_c}else(x=v.nodeName)&&x.toLowerCase()==="input"&&(v.type==="checkbox"||v.type==="radio")&&(j=Fc);if(j&&(j=j(e,c))){Bl(h,j,n,g);break e}N&&N(e,v,c),e==="focusout"&&(N=v._wrapperState)&&N.controlled&&v.type==="number"&&is(v,"number",v.value)}switch(N=c?Ft(c):window,e){case"focusin":(so(N)||N.contentEditable==="true")&&(_t=N,gs=c,Nn=null);break;case"focusout":Nn=gs=_t=null;break;case"mousedown":hs=!0;break;case"contextmenu":case"mouseup":case"dragend":hs=!1,co(h,n,g);break;case"selectionchange":if(Hc)break;case"keydown":case"keyup":co(h,n,g)}var T;if(oa)e:{switch(e){case"compositionstart":var w="onCompositionStart";break e;case"compositionend":w="onCompositionEnd";break e;case"compositionupdate":w="onCompositionUpdate";break e}w=void 0}else Ot?Vl(e,n)&&(w="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(w="onCompositionStart");w&&(Ul&&n.locale!=="ko"&&(Ot||w!=="onCompositionStart"?w==="onCompositionEnd"&&Ot&&(T=zl()):(nt=g,ia="value"in nt?nt.value:nt.textContent,Ot=!0)),N=zr(c,w),0<N.length&&(w=new to(w,e,null,n,g),h.push({event:w,listeners:N}),T?w.data=T:(T=Hl(n),T!==null&&(w.data=T)))),(T=kc?Ic(e,n):qc(e,n))&&(c=zr(c,"onBeforeInput"),0<c.length&&(g=new to("onBeforeInput","beforeinput",null,n,g),h.push({event:g,listeners:c}),g.data=T))}tu(h,t)})}function Un(e,t,n){return{instance:e,listener:t,currentTarget:n}}function zr(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=Dn(e,n),s!=null&&r.unshift(Un(e,s,i)),s=Dn(e,t),s!=null&&r.push(Un(e,s,i))),e=e.return}return r}function qt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function fo(e,t,n,r,i){for(var s=t._reactName,a=[];n!==null&&n!==r;){var o=n,l=o.alternate,c=o.stateNode;if(l!==null&&l===r)break;o.tag===5&&c!==null&&(o=c,i?(l=Dn(n,s),l!=null&&a.unshift(Un(n,l,o))):i||(l=Dn(n,s),l!=null&&a.push(Un(n,l,o)))),n=n.return}a.length!==0&&e.push({event:t,listeners:a})}var Qc=/\r\n?/g,Wc=/\u0000|\uFFFD/g;function vo(e){return(typeof e=="string"?e:""+e).replace(Qc,`
`).replace(Wc,"")}function pr(e,t,n){if(t=vo(t),vo(e)!==t&&n)throw Error(y(425))}function Ur(){}var ys=null,xs=null;function Es(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ls=typeof setTimeout=="function"?setTimeout:void 0,Jc=typeof clearTimeout=="function"?clearTimeout:void 0,go=typeof Promise=="function"?Promise:void 0,Kc=typeof queueMicrotask=="function"?queueMicrotask:typeof go<"u"?function(e){return go.resolve(null).then(e).catch(Xc)}:Ls;function Xc(e){setTimeout(function(){throw e})}function Mi(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),_n(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);_n(t)}function ot(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function ho(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var ln=Math.random().toString(36).slice(2),Me="__reactFiber$"+ln,Vn="__reactProps$"+ln,Qe="__reactContainer$"+ln,js="__reactEvents$"+ln,Yc="__reactListeners$"+ln,Zc="__reactHandles$"+ln;function Lt(e){var t=e[Me];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Qe]||n[Me]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=ho(e);e!==null;){if(n=e[Me])return n;e=ho(e)}return t}e=n,n=e.parentNode}return null}function Yn(e){return e=e[Me]||e[Qe],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Ft(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(y(33))}function li(e){return e[Vn]||null}var Ss=[],zt=-1;function vt(e){return{current:e}}function F(e){0>zt||(e.current=Ss[zt],Ss[zt]=null,zt--)}function O(e,t){zt++,Ss[zt]=e.current,e.current=t}var mt={},se=vt(mt),pe=vt(!1),wt=mt;function Zt(e,t){var n=e.type.contextTypes;if(!n)return mt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=t[s];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function me(e){return e=e.childContextTypes,e!=null}function Vr(){F(pe),F(se)}function yo(e,t,n){if(se.current!==mt)throw Error(y(168));O(se,t),O(pe,n)}function ru(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(y(108,_d(e)||"Unknown",i));return H({},n,r)}function Hr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||mt,wt=se.current,O(se,e),O(pe,pe.current),!0}function xo(e,t,n){var r=e.stateNode;if(!r)throw Error(y(169));n?(e=ru(e,t,wt),r.__reactInternalMemoizedMergedChildContext=e,F(pe),F(se),O(se,e)):F(pe),O(pe,n)}var Ve=null,ui=!1,Fi=!1;function iu(e){Ve===null?Ve=[e]:Ve.push(e)}function ep(e){ui=!0,iu(e)}function gt(){if(!Fi&&Ve!==null){Fi=!0;var e=0,t=b;try{var n=Ve;for(b=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Ve=null,ui=!1}catch(i){throw Ve!==null&&(Ve=Ve.slice(e+1)),Pl(ea,gt),i}finally{b=t,Fi=!1}}return null}var Ut=[],Vt=0,Br=null,$r=0,je=[],Se=0,Nt=null,He=1,Be="";function xt(e,t){Ut[Vt++]=$r,Ut[Vt++]=Br,Br=e,$r=t}function su(e,t,n){je[Se++]=He,je[Se++]=Be,je[Se++]=Nt,Nt=e;var r=He;e=Be;var i=32-qe(r)-1;r&=~(1<<i),n+=1;var s=32-qe(t)+i;if(30<s){var a=i-i%5;s=(r&(1<<a)-1).toString(32),r>>=a,i-=a,He=1<<32-qe(t)+i|n<<i|r,Be=s+e}else He=1<<s|n<<i|r,Be=e}function ua(e){e.return!==null&&(xt(e,1),su(e,1,0))}function da(e){for(;e===Br;)Br=Ut[--Vt],Ut[Vt]=null,$r=Ut[--Vt],Ut[Vt]=null;for(;e===Nt;)Nt=je[--Se],je[Se]=null,Be=je[--Se],je[Se]=null,He=je[--Se],je[Se]=null}var ye=null,he=null,z=!1,Ie=null;function au(e,t){var n=Ce(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Eo(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,ye=e,he=ot(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,ye=e,he=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Nt!==null?{id:He,overflow:Be}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ce(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,ye=e,he=null,!0):!1;default:return!1}}function Cs(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ts(e){if(z){var t=he;if(t){var n=t;if(!Eo(e,t)){if(Cs(e))throw Error(y(418));t=ot(n.nextSibling);var r=ye;t&&Eo(e,t)?au(r,n):(e.flags=e.flags&-4097|2,z=!1,ye=e)}}else{if(Cs(e))throw Error(y(418));e.flags=e.flags&-4097|2,z=!1,ye=e}}}function Lo(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ye=e}function mr(e){if(e!==ye)return!1;if(!z)return Lo(e),z=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Es(e.type,e.memoizedProps)),t&&(t=he)){if(Cs(e))throw ou(),Error(y(418));for(;t;)au(e,t),t=ot(t.nextSibling)}if(Lo(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(y(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){he=ot(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}he=null}}else he=ye?ot(e.stateNode.nextSibling):null;return!0}function ou(){for(var e=he;e;)e=ot(e.nextSibling)}function en(){he=ye=null,z=!1}function ca(e){Ie===null?Ie=[e]:Ie.push(e)}var tp=Ke.ReactCurrentBatchConfig;function gn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(y(309));var r=n.stateNode}if(!r)throw Error(y(147,e));var i=r,s=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===s?t.ref:(t=function(a){var o=i.refs;a===null?delete o[s]:o[s]=a},t._stringRef=s,t)}if(typeof e!="string")throw Error(y(284));if(!n._owner)throw Error(y(290,e))}return e}function fr(e,t){throw e=Object.prototype.toString.call(t),Error(y(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function jo(e){var t=e._init;return t(e._payload)}function lu(e){function t(d,u){if(e){var m=d.deletions;m===null?(d.deletions=[u],d.flags|=16):m.push(u)}}function n(d,u){if(!e)return null;for(;u!==null;)t(d,u),u=u.sibling;return null}function r(d,u){for(d=new Map;u!==null;)u.key!==null?d.set(u.key,u):d.set(u.index,u),u=u.sibling;return d}function i(d,u){return d=ct(d,u),d.index=0,d.sibling=null,d}function s(d,u,m){return d.index=m,e?(m=d.alternate,m!==null?(m=m.index,m<u?(d.flags|=2,u):m):(d.flags|=2,u)):(d.flags|=1048576,u)}function a(d){return e&&d.alternate===null&&(d.flags|=2),d}function o(d,u,m,f){return u===null||u.tag!==6?(u=Gi(m,d.mode,f),u.return=d,u):(u=i(u,m),u.return=d,u)}function l(d,u,m,f){var j=m.type;return j===bt?g(d,u,m.props.children,f,m.key):u!==null&&(u.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===Ye&&jo(j)===u.type)?(f=i(u,m.props),f.ref=gn(d,u,m),f.return=d,f):(f=kr(m.type,m.key,m.props,null,d.mode,f),f.ref=gn(d,u,m),f.return=d,f)}function c(d,u,m,f){return u===null||u.tag!==4||u.stateNode.containerInfo!==m.containerInfo||u.stateNode.implementation!==m.implementation?(u=Qi(m,d.mode,f),u.return=d,u):(u=i(u,m.children||[]),u.return=d,u)}function g(d,u,m,f,j){return u===null||u.tag!==7?(u=Tt(m,d.mode,f,j),u.return=d,u):(u=i(u,m),u.return=d,u)}function h(d,u,m){if(typeof u=="string"&&u!==""||typeof u=="number")return u=Gi(""+u,d.mode,m),u.return=d,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case rr:return m=kr(u.type,u.key,u.props,null,d.mode,m),m.ref=gn(d,null,u),m.return=d,m;case Dt:return u=Qi(u,d.mode,m),u.return=d,u;case Ye:var f=u._init;return h(d,f(u._payload),m)}if(En(u)||cn(u))return u=Tt(u,d.mode,m,null),u.return=d,u;fr(d,u)}return null}function v(d,u,m,f){var j=u!==null?u.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return j!==null?null:o(d,u,""+m,f);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case rr:return m.key===j?l(d,u,m,f):null;case Dt:return m.key===j?c(d,u,m,f):null;case Ye:return j=m._init,v(d,u,j(m._payload),f)}if(En(m)||cn(m))return j!==null?null:g(d,u,m,f,null);fr(d,m)}return null}function x(d,u,m,f,j){if(typeof f=="string"&&f!==""||typeof f=="number")return d=d.get(m)||null,o(u,d,""+f,j);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case rr:return d=d.get(f.key===null?m:f.key)||null,l(u,d,f,j);case Dt:return d=d.get(f.key===null?m:f.key)||null,c(u,d,f,j);case Ye:var N=f._init;return x(d,u,m,N(f._payload),j)}if(En(f)||cn(f))return d=d.get(m)||null,g(u,d,f,j,null);fr(u,f)}return null}function E(d,u,m,f){for(var j=null,N=null,T=u,w=u=0,D=null;T!==null&&w<m.length;w++){T.index>w?(D=T,T=null):D=T.sibling;var k=v(d,T,m[w],f);if(k===null){T===null&&(T=D);break}e&&T&&k.alternate===null&&t(d,T),u=s(k,u,w),N===null?j=k:N.sibling=k,N=k,T=D}if(w===m.length)return n(d,T),z&&xt(d,w),j;if(T===null){for(;w<m.length;w++)T=h(d,m[w],f),T!==null&&(u=s(T,u,w),N===null?j=T:N.sibling=T,N=T);return z&&xt(d,w),j}for(T=r(d,T);w<m.length;w++)D=x(T,d,w,m[w],f),D!==null&&(e&&D.alternate!==null&&T.delete(D.key===null?w:D.key),u=s(D,u,w),N===null?j=D:N.sibling=D,N=D);return e&&T.forEach(function(Ae){return t(d,Ae)}),z&&xt(d,w),j}function L(d,u,m,f){var j=cn(m);if(typeof j!="function")throw Error(y(150));if(m=j.call(m),m==null)throw Error(y(151));for(var N=j=null,T=u,w=u=0,D=null,k=m.next();T!==null&&!k.done;w++,k=m.next()){T.index>w?(D=T,T=null):D=T.sibling;var Ae=v(d,T,k.value,f);if(Ae===null){T===null&&(T=D);break}e&&T&&Ae.alternate===null&&t(d,T),u=s(Ae,u,w),N===null?j=Ae:N.sibling=Ae,N=Ae,T=D}if(k.done)return n(d,T),z&&xt(d,w),j;if(T===null){for(;!k.done;w++,k=m.next())k=h(d,k.value,f),k!==null&&(u=s(k,u,w),N===null?j=k:N.sibling=k,N=k);return z&&xt(d,w),j}for(T=r(d,T);!k.done;w++,k=m.next())k=x(T,d,w,k.value,f),k!==null&&(e&&k.alternate!==null&&T.delete(k.key===null?w:k.key),u=s(k,u,w),N===null?j=k:N.sibling=k,N=k);return e&&T.forEach(function(un){return t(d,un)}),z&&xt(d,w),j}function A(d,u,m,f){if(typeof m=="object"&&m!==null&&m.type===bt&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case rr:e:{for(var j=m.key,N=u;N!==null;){if(N.key===j){if(j=m.type,j===bt){if(N.tag===7){n(d,N.sibling),u=i(N,m.props.children),u.return=d,d=u;break e}}else if(N.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===Ye&&jo(j)===N.type){n(d,N.sibling),u=i(N,m.props),u.ref=gn(d,N,m),u.return=d,d=u;break e}n(d,N);break}else t(d,N);N=N.sibling}m.type===bt?(u=Tt(m.props.children,d.mode,f,m.key),u.return=d,d=u):(f=kr(m.type,m.key,m.props,null,d.mode,f),f.ref=gn(d,u,m),f.return=d,d=f)}return a(d);case Dt:e:{for(N=m.key;u!==null;){if(u.key===N)if(u.tag===4&&u.stateNode.containerInfo===m.containerInfo&&u.stateNode.implementation===m.implementation){n(d,u.sibling),u=i(u,m.children||[]),u.return=d,d=u;break e}else{n(d,u);break}else t(d,u);u=u.sibling}u=Qi(m,d.mode,f),u.return=d,d=u}return a(d);case Ye:return N=m._init,A(d,u,N(m._payload),f)}if(En(m))return E(d,u,m,f);if(cn(m))return L(d,u,m,f);fr(d,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,u!==null&&u.tag===6?(n(d,u.sibling),u=i(u,m),u.return=d,d=u):(n(d,u),u=Gi(m,d.mode,f),u.return=d,d=u),a(d)):n(d,u)}return A}var tn=lu(!0),uu=lu(!1),Gr=vt(null),Qr=null,Ht=null,pa=null;function ma(){pa=Ht=Qr=null}function fa(e){var t=Gr.current;F(Gr),e._currentValue=t}function ws(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Kt(e,t){Qr=e,pa=Ht=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(ce=!0),e.firstContext=null)}function we(e){var t=e._currentValue;if(pa!==e)if(e={context:e,memoizedValue:t,next:null},Ht===null){if(Qr===null)throw Error(y(308));Ht=e,Qr.dependencies={lanes:0,firstContext:e}}else Ht=Ht.next=e;return t}var jt=null;function va(e){jt===null?jt=[e]:jt.push(e)}function du(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,va(t)):(n.next=i.next,i.next=n),t.interleaved=n,We(e,r)}function We(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Ze=!1;function ga(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function cu(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function $e(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function lt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,q&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,We(e,n)}return i=r.interleaved,i===null?(t.next=t,va(r)):(t.next=i.next,i.next=t),r.interleaved=t,We(e,n)}function Tr(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ta(e,n)}}function So(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?i=s=t:s=s.next=t}else i=s=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Wr(e,t,n,r){var i=e.updateQueue;Ze=!1;var s=i.firstBaseUpdate,a=i.lastBaseUpdate,o=i.shared.pending;if(o!==null){i.shared.pending=null;var l=o,c=l.next;l.next=null,a===null?s=c:a.next=c,a=l;var g=e.alternate;g!==null&&(g=g.updateQueue,o=g.lastBaseUpdate,o!==a&&(o===null?g.firstBaseUpdate=c:o.next=c,g.lastBaseUpdate=l))}if(s!==null){var h=i.baseState;a=0,g=c=l=null,o=s;do{var v=o.lane,x=o.eventTime;if((r&v)===v){g!==null&&(g=g.next={eventTime:x,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var E=e,L=o;switch(v=t,x=n,L.tag){case 1:if(E=L.payload,typeof E=="function"){h=E.call(x,h,v);break e}h=E;break e;case 3:E.flags=E.flags&-65537|128;case 0:if(E=L.payload,v=typeof E=="function"?E.call(x,h,v):E,v==null)break e;h=H({},h,v);break e;case 2:Ze=!0}}o.callback!==null&&o.lane!==0&&(e.flags|=64,v=i.effects,v===null?i.effects=[o]:v.push(o))}else x={eventTime:x,lane:v,tag:o.tag,payload:o.payload,callback:o.callback,next:null},g===null?(c=g=x,l=h):g=g.next=x,a|=v;if(o=o.next,o===null){if(o=i.shared.pending,o===null)break;v=o,o=v.next,v.next=null,i.lastBaseUpdate=v,i.shared.pending=null}}while(!0);if(g===null&&(l=h),i.baseState=l,i.firstBaseUpdate=c,i.lastBaseUpdate=g,t=i.shared.interleaved,t!==null){i=t;do a|=i.lane,i=i.next;while(i!==t)}else s===null&&(i.shared.lanes=0);Pt|=a,e.lanes=a,e.memoizedState=h}}function Co(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(y(191,i));i.call(r)}}}var Zn={},ze=vt(Zn),Hn=vt(Zn),Bn=vt(Zn);function St(e){if(e===Zn)throw Error(y(174));return e}function ha(e,t){switch(O(Bn,t),O(Hn,e),O(ze,Zn),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:as(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=as(t,e)}F(ze),O(ze,t)}function nn(){F(ze),F(Hn),F(Bn)}function pu(e){St(Bn.current);var t=St(ze.current),n=as(t,e.type);t!==n&&(O(Hn,e),O(ze,n))}function ya(e){Hn.current===e&&(F(ze),F(Hn))}var U=vt(0);function Jr(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var zi=[];function xa(){for(var e=0;e<zi.length;e++)zi[e]._workInProgressVersionPrimary=null;zi.length=0}var wr=Ke.ReactCurrentDispatcher,Ui=Ke.ReactCurrentBatchConfig,At=0,V=null,W=null,X=null,Kr=!1,An=!1,$n=0,np=0;function ne(){throw Error(y(321))}function Ea(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!be(e[n],t[n]))return!1;return!0}function La(e,t,n,r,i,s){if(At=s,V=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,wr.current=e===null||e.memoizedState===null?ap:op,e=n(r,i),An){s=0;do{if(An=!1,$n=0,25<=s)throw Error(y(301));s+=1,X=W=null,t.updateQueue=null,wr.current=lp,e=n(r,i)}while(An)}if(wr.current=Xr,t=W!==null&&W.next!==null,At=0,X=W=V=null,Kr=!1,t)throw Error(y(300));return e}function ja(){var e=$n!==0;return $n=0,e}function _e(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return X===null?V.memoizedState=X=e:X=X.next=e,X}function Ne(){if(W===null){var e=V.alternate;e=e!==null?e.memoizedState:null}else e=W.next;var t=X===null?V.memoizedState:X.next;if(t!==null)X=t,W=e;else{if(e===null)throw Error(y(310));W=e,e={memoizedState:W.memoizedState,baseState:W.baseState,baseQueue:W.baseQueue,queue:W.queue,next:null},X===null?V.memoizedState=X=e:X=X.next=e}return X}function Gn(e,t){return typeof t=="function"?t(e):t}function Vi(e){var t=Ne(),n=t.queue;if(n===null)throw Error(y(311));n.lastRenderedReducer=e;var r=W,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var a=i.next;i.next=s.next,s.next=a}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var o=a=null,l=null,c=s;do{var g=c.lane;if((At&g)===g)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var h={lane:g,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(o=l=h,a=r):l=l.next=h,V.lanes|=g,Pt|=g}c=c.next}while(c!==null&&c!==s);l===null?a=r:l.next=o,be(r,t.memoizedState)||(ce=!0),t.memoizedState=r,t.baseState=a,t.baseQueue=l,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do s=i.lane,V.lanes|=s,Pt|=s,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Hi(e){var t=Ne(),n=t.queue;if(n===null)throw Error(y(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,s=t.memoizedState;if(i!==null){n.pending=null;var a=i=i.next;do s=e(s,a.action),a=a.next;while(a!==i);be(s,t.memoizedState)||(ce=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),n.lastRenderedState=s}return[s,r]}function mu(){}function fu(e,t){var n=V,r=Ne(),i=t(),s=!be(r.memoizedState,i);if(s&&(r.memoizedState=i,ce=!0),r=r.queue,Sa(hu.bind(null,n,r,e),[e]),r.getSnapshot!==t||s||X!==null&&X.memoizedState.tag&1){if(n.flags|=2048,Qn(9,gu.bind(null,n,r,i,t),void 0,null),Y===null)throw Error(y(349));At&30||vu(n,t,i)}return i}function vu(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=V.updateQueue,t===null?(t={lastEffect:null,stores:null},V.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function gu(e,t,n,r){t.value=n,t.getSnapshot=r,yu(t)&&xu(e)}function hu(e,t,n){return n(function(){yu(t)&&xu(e)})}function yu(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!be(e,n)}catch{return!0}}function xu(e){var t=We(e,1);t!==null&&De(t,e,1,-1)}function To(e){var t=_e();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Gn,lastRenderedState:e},t.queue=e,e=e.dispatch=sp.bind(null,V,e),[t.memoizedState,e]}function Qn(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=V.updateQueue,t===null?(t={lastEffect:null,stores:null},V.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Eu(){return Ne().memoizedState}function Nr(e,t,n,r){var i=_e();V.flags|=e,i.memoizedState=Qn(1|t,n,void 0,r===void 0?null:r)}function di(e,t,n,r){var i=Ne();r=r===void 0?null:r;var s=void 0;if(W!==null){var a=W.memoizedState;if(s=a.destroy,r!==null&&Ea(r,a.deps)){i.memoizedState=Qn(t,n,s,r);return}}V.flags|=e,i.memoizedState=Qn(1|t,n,s,r)}function wo(e,t){return Nr(8390656,8,e,t)}function Sa(e,t){return di(2048,8,e,t)}function Lu(e,t){return di(4,2,e,t)}function ju(e,t){return di(4,4,e,t)}function Su(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Cu(e,t,n){return n=n!=null?n.concat([e]):null,di(4,4,Su.bind(null,t,e),n)}function Ca(){}function Tu(e,t){var n=Ne();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ea(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function wu(e,t){var n=Ne();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ea(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Nu(e,t,n){return At&21?(be(n,t)||(n=Il(),V.lanes|=n,Pt|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,ce=!0),e.memoizedState=n)}function rp(e,t){var n=b;b=n!==0&&4>n?n:4,e(!0);var r=Ui.transition;Ui.transition={};try{e(!1),t()}finally{b=n,Ui.transition=r}}function Au(){return Ne().memoizedState}function ip(e,t,n){var r=dt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Pu(e))Ru(t,n);else if(n=du(e,t,n,r),n!==null){var i=oe();De(n,e,r,i),ku(n,t,r)}}function sp(e,t,n){var r=dt(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Pu(e))Ru(t,i);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var a=t.lastRenderedState,o=s(a,n);if(i.hasEagerState=!0,i.eagerState=o,be(o,a)){var l=t.interleaved;l===null?(i.next=i,va(t)):(i.next=l.next,l.next=i),t.interleaved=i;return}}catch{}finally{}n=du(e,t,i,r),n!==null&&(i=oe(),De(n,e,r,i),ku(n,t,r))}}function Pu(e){var t=e.alternate;return e===V||t!==null&&t===V}function Ru(e,t){An=Kr=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function ku(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ta(e,n)}}var Xr={readContext:we,useCallback:ne,useContext:ne,useEffect:ne,useImperativeHandle:ne,useInsertionEffect:ne,useLayoutEffect:ne,useMemo:ne,useReducer:ne,useRef:ne,useState:ne,useDebugValue:ne,useDeferredValue:ne,useTransition:ne,useMutableSource:ne,useSyncExternalStore:ne,useId:ne,unstable_isNewReconciler:!1},ap={readContext:we,useCallback:function(e,t){return _e().memoizedState=[e,t===void 0?null:t],e},useContext:we,useEffect:wo,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Nr(4194308,4,Su.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Nr(4194308,4,e,t)},useInsertionEffect:function(e,t){return Nr(4,2,e,t)},useMemo:function(e,t){var n=_e();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=_e();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=ip.bind(null,V,e),[r.memoizedState,e]},useRef:function(e){var t=_e();return e={current:e},t.memoizedState=e},useState:To,useDebugValue:Ca,useDeferredValue:function(e){return _e().memoizedState=e},useTransition:function(){var e=To(!1),t=e[0];return e=rp.bind(null,e[1]),_e().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=V,i=_e();if(z){if(n===void 0)throw Error(y(407));n=n()}else{if(n=t(),Y===null)throw Error(y(349));At&30||vu(r,t,n)}i.memoizedState=n;var s={value:n,getSnapshot:t};return i.queue=s,wo(hu.bind(null,r,s,e),[e]),r.flags|=2048,Qn(9,gu.bind(null,r,s,n,t),void 0,null),n},useId:function(){var e=_e(),t=Y.identifierPrefix;if(z){var n=Be,r=He;n=(r&~(1<<32-qe(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=$n++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=np++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},op={readContext:we,useCallback:Tu,useContext:we,useEffect:Sa,useImperativeHandle:Cu,useInsertionEffect:Lu,useLayoutEffect:ju,useMemo:wu,useReducer:Vi,useRef:Eu,useState:function(){return Vi(Gn)},useDebugValue:Ca,useDeferredValue:function(e){var t=Ne();return Nu(t,W.memoizedState,e)},useTransition:function(){var e=Vi(Gn)[0],t=Ne().memoizedState;return[e,t]},useMutableSource:mu,useSyncExternalStore:fu,useId:Au,unstable_isNewReconciler:!1},lp={readContext:we,useCallback:Tu,useContext:we,useEffect:Sa,useImperativeHandle:Cu,useInsertionEffect:Lu,useLayoutEffect:ju,useMemo:wu,useReducer:Hi,useRef:Eu,useState:function(){return Hi(Gn)},useDebugValue:Ca,useDeferredValue:function(e){var t=Ne();return W===null?t.memoizedState=e:Nu(t,W.memoizedState,e)},useTransition:function(){var e=Hi(Gn)[0],t=Ne().memoizedState;return[e,t]},useMutableSource:mu,useSyncExternalStore:fu,useId:Au,unstable_isNewReconciler:!1};function Re(e,t){if(e&&e.defaultProps){t=H({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Ns(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:H({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ci={isMounted:function(e){return(e=e._reactInternals)?It(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=oe(),i=dt(e),s=$e(r,i);s.payload=t,n!=null&&(s.callback=n),t=lt(e,s,i),t!==null&&(De(t,e,i,r),Tr(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=oe(),i=dt(e),s=$e(r,i);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=lt(e,s,i),t!==null&&(De(t,e,i,r),Tr(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=oe(),r=dt(e),i=$e(n,r);i.tag=2,t!=null&&(i.callback=t),t=lt(e,i,r),t!==null&&(De(t,e,r,n),Tr(t,e,r))}};function No(e,t,n,r,i,s,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,s,a):t.prototype&&t.prototype.isPureReactComponent?!Fn(n,r)||!Fn(i,s):!0}function Iu(e,t,n){var r=!1,i=mt,s=t.contextType;return typeof s=="object"&&s!==null?s=we(s):(i=me(t)?wt:se.current,r=t.contextTypes,s=(r=r!=null)?Zt(e,i):mt),t=new t(n,s),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ci,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=s),t}function Ao(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ci.enqueueReplaceState(t,t.state,null)}function As(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},ga(e);var s=t.contextType;typeof s=="object"&&s!==null?i.context=we(s):(s=me(t)?wt:se.current,i.context=Zt(e,s)),i.state=e.memoizedState,s=t.getDerivedStateFromProps,typeof s=="function"&&(Ns(e,t,s,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&ci.enqueueReplaceState(i,i.state,null),Wr(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function rn(e,t){try{var n="",r=t;do n+=Od(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:e,source:t,stack:i,digest:null}}function Bi(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Ps(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var up=typeof WeakMap=="function"?WeakMap:Map;function qu(e,t,n){n=$e(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Zr||(Zr=!0,Fs=r),Ps(e,t)},n}function Du(e,t,n){n=$e(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){Ps(e,t)}}var s=e.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Ps(e,t),typeof r!="function"&&(ut===null?ut=new Set([this]):ut.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),n}function Po(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new up;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=Sp.bind(null,e,t,n),t.then(e,e))}function Ro(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function ko(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=$e(-1,1),t.tag=2,lt(n,t,1))),n.lanes|=1),e)}var dp=Ke.ReactCurrentOwner,ce=!1;function ae(e,t,n,r){t.child=e===null?uu(t,null,n,r):tn(t,e.child,n,r)}function Io(e,t,n,r,i){n=n.render;var s=t.ref;return Kt(t,i),r=La(e,t,n,r,s,i),n=ja(),e!==null&&!ce?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Je(e,t,i)):(z&&n&&ua(t),t.flags|=1,ae(e,t,r,i),t.child)}function qo(e,t,n,r,i){if(e===null){var s=n.type;return typeof s=="function"&&!Ia(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=s,bu(e,t,s,r,i)):(e=kr(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!(e.lanes&i)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:Fn,n(a,r)&&e.ref===t.ref)return Je(e,t,i)}return t.flags|=1,e=ct(s,r),e.ref=t.ref,e.return=t,t.child=e}function bu(e,t,n,r,i){if(e!==null){var s=e.memoizedProps;if(Fn(s,r)&&e.ref===t.ref)if(ce=!1,t.pendingProps=r=s,(e.lanes&i)!==0)e.flags&131072&&(ce=!0);else return t.lanes=e.lanes,Je(e,t,i)}return Rs(e,t,n,r,i)}function Ou(e,t,n){var r=t.pendingProps,i=r.children,s=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},O($t,ge),ge|=n;else{if(!(n&1073741824))return e=s!==null?s.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,O($t,ge),ge|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,O($t,ge),ge|=r}else s!==null?(r=s.baseLanes|n,t.memoizedState=null):r=n,O($t,ge),ge|=r;return ae(e,t,i,n),t.child}function _u(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Rs(e,t,n,r,i){var s=me(n)?wt:se.current;return s=Zt(t,s),Kt(t,i),n=La(e,t,n,r,s,i),r=ja(),e!==null&&!ce?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Je(e,t,i)):(z&&r&&ua(t),t.flags|=1,ae(e,t,n,i),t.child)}function Do(e,t,n,r,i){if(me(n)){var s=!0;Hr(t)}else s=!1;if(Kt(t,i),t.stateNode===null)Ar(e,t),Iu(t,n,r),As(t,n,r,i),r=!0;else if(e===null){var a=t.stateNode,o=t.memoizedProps;a.props=o;var l=a.context,c=n.contextType;typeof c=="object"&&c!==null?c=we(c):(c=me(n)?wt:se.current,c=Zt(t,c));var g=n.getDerivedStateFromProps,h=typeof g=="function"||typeof a.getSnapshotBeforeUpdate=="function";h||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==r||l!==c)&&Ao(t,a,r,c),Ze=!1;var v=t.memoizedState;a.state=v,Wr(t,r,a,i),l=t.memoizedState,o!==r||v!==l||pe.current||Ze?(typeof g=="function"&&(Ns(t,n,g,r),l=t.memoizedState),(o=Ze||No(t,n,o,r,v,l,c))?(h||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=c,r=o):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,cu(e,t),o=t.memoizedProps,c=t.type===t.elementType?o:Re(t.type,o),a.props=c,h=t.pendingProps,v=a.context,l=n.contextType,typeof l=="object"&&l!==null?l=we(l):(l=me(n)?wt:se.current,l=Zt(t,l));var x=n.getDerivedStateFromProps;(g=typeof x=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==h||v!==l)&&Ao(t,a,r,l),Ze=!1,v=t.memoizedState,a.state=v,Wr(t,r,a,i);var E=t.memoizedState;o!==h||v!==E||pe.current||Ze?(typeof x=="function"&&(Ns(t,n,x,r),E=t.memoizedState),(c=Ze||No(t,n,c,r,v,E,l)||!1)?(g||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,E,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,E,l)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=E),a.props=r,a.state=E,a.context=l,r=c):(typeof a.componentDidUpdate!="function"||o===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),r=!1)}return ks(e,t,n,r,s,i)}function ks(e,t,n,r,i,s){_u(e,t);var a=(t.flags&128)!==0;if(!r&&!a)return i&&xo(t,n,!1),Je(e,t,s);r=t.stateNode,dp.current=t;var o=a&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&a?(t.child=tn(t,e.child,null,s),t.child=tn(t,null,o,s)):ae(e,t,o,s),t.memoizedState=r.state,i&&xo(t,n,!0),t.child}function Mu(e){var t=e.stateNode;t.pendingContext?yo(e,t.pendingContext,t.pendingContext!==t.context):t.context&&yo(e,t.context,!1),ha(e,t.containerInfo)}function bo(e,t,n,r,i){return en(),ca(i),t.flags|=256,ae(e,t,n,r),t.child}var Is={dehydrated:null,treeContext:null,retryLane:0};function qs(e){return{baseLanes:e,cachePool:null,transitions:null}}function Fu(e,t,n){var r=t.pendingProps,i=U.current,s=!1,a=(t.flags&128)!==0,o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:(i&2)!==0),o?(s=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),O(U,i&1),e===null)return Ts(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(a=r.children,e=r.fallback,s?(r=t.mode,s=t.child,a={mode:"hidden",children:a},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=fi(a,r,0,null),e=Tt(e,r,n,null),s.return=t,e.return=t,s.sibling=e,t.child=s,t.child.memoizedState=qs(n),t.memoizedState=Is,e):Ta(t,a));if(i=e.memoizedState,i!==null&&(o=i.dehydrated,o!==null))return cp(e,t,a,r,o,i,n);if(s){s=r.fallback,a=t.mode,i=e.child,o=i.sibling;var l={mode:"hidden",children:r.children};return!(a&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=l,t.deletions=null):(r=ct(i,l),r.subtreeFlags=i.subtreeFlags&14680064),o!==null?s=ct(o,s):(s=Tt(s,a,n,null),s.flags|=2),s.return=t,r.return=t,r.sibling=s,t.child=r,r=s,s=t.child,a=e.child.memoizedState,a=a===null?qs(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=e.childLanes&~n,t.memoizedState=Is,r}return s=e.child,e=s.sibling,r=ct(s,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Ta(e,t){return t=fi({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function vr(e,t,n,r){return r!==null&&ca(r),tn(t,e.child,null,n),e=Ta(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function cp(e,t,n,r,i,s,a){if(n)return t.flags&256?(t.flags&=-257,r=Bi(Error(y(422))),vr(e,t,a,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(s=r.fallback,i=t.mode,r=fi({mode:"visible",children:r.children},i,0,null),s=Tt(s,i,a,null),s.flags|=2,r.return=t,s.return=t,r.sibling=s,t.child=r,t.mode&1&&tn(t,e.child,null,a),t.child.memoizedState=qs(a),t.memoizedState=Is,s);if(!(t.mode&1))return vr(e,t,a,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var o=r.dgst;return r=o,s=Error(y(419)),r=Bi(s,r,void 0),vr(e,t,a,r)}if(o=(a&e.childLanes)!==0,ce||o){if(r=Y,r!==null){switch(a&-a){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|a)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,We(e,i),De(r,e,i,-1))}return ka(),r=Bi(Error(y(421))),vr(e,t,a,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=Cp.bind(null,e),i._reactRetry=t,null):(e=s.treeContext,he=ot(i.nextSibling),ye=t,z=!0,Ie=null,e!==null&&(je[Se++]=He,je[Se++]=Be,je[Se++]=Nt,He=e.id,Be=e.overflow,Nt=t),t=Ta(t,r.children),t.flags|=4096,t)}function Oo(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ws(e.return,t,n)}function $i(e,t,n,r,i){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function zu(e,t,n){var r=t.pendingProps,i=r.revealOrder,s=r.tail;if(ae(e,t,r.children,n),r=U.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Oo(e,n,t);else if(e.tag===19)Oo(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(O(U,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&Jr(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),$i(t,!1,i,n,s);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Jr(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}$i(t,!0,n,null,s);break;case"together":$i(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ar(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Je(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Pt|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(y(153));if(t.child!==null){for(e=t.child,n=ct(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=ct(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function pp(e,t,n){switch(t.tag){case 3:Mu(t),en();break;case 5:pu(t);break;case 1:me(t.type)&&Hr(t);break;case 4:ha(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;O(Gr,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(O(U,U.current&1),t.flags|=128,null):n&t.child.childLanes?Fu(e,t,n):(O(U,U.current&1),e=Je(e,t,n),e!==null?e.sibling:null);O(U,U.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return zu(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),O(U,U.current),r)break;return null;case 22:case 23:return t.lanes=0,Ou(e,t,n)}return Je(e,t,n)}var Uu,Ds,Vu,Hu;Uu=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Ds=function(){};Vu=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,St(ze.current);var s=null;switch(n){case"input":i=ns(e,i),r=ns(e,r),s=[];break;case"select":i=H({},i,{value:void 0}),r=H({},r,{value:void 0}),s=[];break;case"textarea":i=ss(e,i),r=ss(e,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Ur)}os(n,r);var a;n=null;for(c in i)if(!r.hasOwnProperty(c)&&i.hasOwnProperty(c)&&i[c]!=null)if(c==="style"){var o=i[c];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(In.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in r){var l=r[c];if(o=i!=null?i[c]:void 0,r.hasOwnProperty(c)&&l!==o&&(l!=null||o!=null))if(c==="style")if(o){for(a in o)!o.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in l)l.hasOwnProperty(a)&&o[a]!==l[a]&&(n||(n={}),n[a]=l[a])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,o=o?o.__html:void 0,l!=null&&o!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(In.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&_("scroll",e),s||o===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(t.updateQueue=c)&&(t.flags|=4)}};Hu=function(e,t,n,r){n!==r&&(t.flags|=4)};function hn(e,t){if(!z)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function re(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function mp(e,t,n){var r=t.pendingProps;switch(da(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return re(t),null;case 1:return me(t.type)&&Vr(),re(t),null;case 3:return r=t.stateNode,nn(),F(pe),F(se),xa(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(mr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ie!==null&&(Vs(Ie),Ie=null))),Ds(e,t),re(t),null;case 5:ya(t);var i=St(Bn.current);if(n=t.type,e!==null&&t.stateNode!=null)Vu(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(y(166));return re(t),null}if(e=St(ze.current),mr(t)){r=t.stateNode,n=t.type;var s=t.memoizedProps;switch(r[Me]=t,r[Vn]=s,e=(t.mode&1)!==0,n){case"dialog":_("cancel",r),_("close",r);break;case"iframe":case"object":case"embed":_("load",r);break;case"video":case"audio":for(i=0;i<jn.length;i++)_(jn[i],r);break;case"source":_("error",r);break;case"img":case"image":case"link":_("error",r),_("load",r);break;case"details":_("toggle",r);break;case"input":Ba(r,s),_("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},_("invalid",r);break;case"textarea":Ga(r,s),_("invalid",r)}os(n,s),i=null;for(var a in s)if(s.hasOwnProperty(a)){var o=s[a];a==="children"?typeof o=="string"?r.textContent!==o&&(s.suppressHydrationWarning!==!0&&pr(r.textContent,o,e),i=["children",o]):typeof o=="number"&&r.textContent!==""+o&&(s.suppressHydrationWarning!==!0&&pr(r.textContent,o,e),i=["children",""+o]):In.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&_("scroll",r)}switch(n){case"input":ir(r),$a(r,s,!0);break;case"textarea":ir(r),Qa(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=Ur)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{a=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=hl(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=a.createElement(n,{is:r.is}):(e=a.createElement(n),n==="select"&&(a=e,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):e=a.createElementNS(e,n),e[Me]=t,e[Vn]=r,Uu(e,t,!1,!1),t.stateNode=e;e:{switch(a=ls(n,r),n){case"dialog":_("cancel",e),_("close",e),i=r;break;case"iframe":case"object":case"embed":_("load",e),i=r;break;case"video":case"audio":for(i=0;i<jn.length;i++)_(jn[i],e);i=r;break;case"source":_("error",e),i=r;break;case"img":case"image":case"link":_("error",e),_("load",e),i=r;break;case"details":_("toggle",e),i=r;break;case"input":Ba(e,r),i=ns(e,r),_("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=H({},r,{value:void 0}),_("invalid",e);break;case"textarea":Ga(e,r),i=ss(e,r),_("invalid",e);break;default:i=r}os(n,i),o=i;for(s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="style"?El(e,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&yl(e,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&qn(e,l):typeof l=="number"&&qn(e,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(In.hasOwnProperty(s)?l!=null&&s==="onScroll"&&_("scroll",e):l!=null&&Js(e,s,l,a))}switch(n){case"input":ir(e),$a(e,r,!1);break;case"textarea":ir(e),Qa(e);break;case"option":r.value!=null&&e.setAttribute("value",""+pt(r.value));break;case"select":e.multiple=!!r.multiple,s=r.value,s!=null?Gt(e,!!r.multiple,s,!1):r.defaultValue!=null&&Gt(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Ur)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return re(t),null;case 6:if(e&&t.stateNode!=null)Hu(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(y(166));if(n=St(Bn.current),St(ze.current),mr(t)){if(r=t.stateNode,n=t.memoizedProps,r[Me]=t,(s=r.nodeValue!==n)&&(e=ye,e!==null))switch(e.tag){case 3:pr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&pr(r.nodeValue,n,(e.mode&1)!==0)}s&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Me]=t,t.stateNode=r}return re(t),null;case 13:if(F(U),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(z&&he!==null&&t.mode&1&&!(t.flags&128))ou(),en(),t.flags|=98560,s=!1;else if(s=mr(t),r!==null&&r.dehydrated!==null){if(e===null){if(!s)throw Error(y(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(y(317));s[Me]=t}else en(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;re(t),s=!1}else Ie!==null&&(Vs(Ie),Ie=null),s=!0;if(!s)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||U.current&1?J===0&&(J=3):ka())),t.updateQueue!==null&&(t.flags|=4),re(t),null);case 4:return nn(),Ds(e,t),e===null&&zn(t.stateNode.containerInfo),re(t),null;case 10:return fa(t.type._context),re(t),null;case 17:return me(t.type)&&Vr(),re(t),null;case 19:if(F(U),s=t.memoizedState,s===null)return re(t),null;if(r=(t.flags&128)!==0,a=s.rendering,a===null)if(r)hn(s,!1);else{if(J!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=Jr(e),a!==null){for(t.flags|=128,hn(s,!1),r=a.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)s=n,e=r,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=e,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,e=a.dependencies,s.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return O(U,U.current&1|2),t.child}e=e.sibling}s.tail!==null&&G()>sn&&(t.flags|=128,r=!0,hn(s,!1),t.lanes=4194304)}else{if(!r)if(e=Jr(a),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),hn(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!z)return re(t),null}else 2*G()-s.renderingStartTime>sn&&n!==1073741824&&(t.flags|=128,r=!0,hn(s,!1),t.lanes=4194304);s.isBackwards?(a.sibling=t.child,t.child=a):(n=s.last,n!==null?n.sibling=a:t.child=a,s.last=a)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=G(),t.sibling=null,n=U.current,O(U,r?n&1|2:n&1),t):(re(t),null);case 22:case 23:return Ra(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?ge&1073741824&&(re(t),t.subtreeFlags&6&&(t.flags|=8192)):re(t),null;case 24:return null;case 25:return null}throw Error(y(156,t.tag))}function fp(e,t){switch(da(t),t.tag){case 1:return me(t.type)&&Vr(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return nn(),F(pe),F(se),xa(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return ya(t),null;case 13:if(F(U),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(y(340));en()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return F(U),null;case 4:return nn(),null;case 10:return fa(t.type._context),null;case 22:case 23:return Ra(),null;case 24:return null;default:return null}}var gr=!1,ie=!1,vp=typeof WeakSet=="function"?WeakSet:Set,S=null;function Bt(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){B(e,t,r)}else n.current=null}function bs(e,t,n){try{n()}catch(r){B(e,t,r)}}var _o=!1;function gp(e,t){if(ys=Mr,e=Wl(),la(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,o=-1,l=-1,c=0,g=0,h=e,v=null;t:for(;;){for(var x;h!==n||i!==0&&h.nodeType!==3||(o=a+i),h!==s||r!==0&&h.nodeType!==3||(l=a+r),h.nodeType===3&&(a+=h.nodeValue.length),(x=h.firstChild)!==null;)v=h,h=x;for(;;){if(h===e)break t;if(v===n&&++c===i&&(o=a),v===s&&++g===r&&(l=a),(x=h.nextSibling)!==null)break;h=v,v=h.parentNode}h=x}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(xs={focusedElem:e,selectionRange:n},Mr=!1,S=t;S!==null;)if(t=S,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,S=e;else for(;S!==null;){t=S;try{var E=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(E!==null){var L=E.memoizedProps,A=E.memoizedState,d=t.stateNode,u=d.getSnapshotBeforeUpdate(t.elementType===t.type?L:Re(t.type,L),A);d.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var m=t.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(y(163))}}catch(f){B(t,t.return,f)}if(e=t.sibling,e!==null){e.return=t.return,S=e;break}S=t.return}return E=_o,_o=!1,E}function Pn(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var s=i.destroy;i.destroy=void 0,s!==void 0&&bs(t,n,s)}i=i.next}while(i!==r)}}function pi(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Os(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Bu(e){var t=e.alternate;t!==null&&(e.alternate=null,Bu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Me],delete t[Vn],delete t[js],delete t[Yc],delete t[Zc])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function $u(e){return e.tag===5||e.tag===3||e.tag===4}function Mo(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||$u(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function _s(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Ur));else if(r!==4&&(e=e.child,e!==null))for(_s(e,t,n),e=e.sibling;e!==null;)_s(e,t,n),e=e.sibling}function Ms(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Ms(e,t,n),e=e.sibling;e!==null;)Ms(e,t,n),e=e.sibling}var Z=null,ke=!1;function Xe(e,t,n){for(n=n.child;n!==null;)Gu(e,t,n),n=n.sibling}function Gu(e,t,n){if(Fe&&typeof Fe.onCommitFiberUnmount=="function")try{Fe.onCommitFiberUnmount(ii,n)}catch{}switch(n.tag){case 5:ie||Bt(n,t);case 6:var r=Z,i=ke;Z=null,Xe(e,t,n),Z=r,ke=i,Z!==null&&(ke?(e=Z,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Z.removeChild(n.stateNode));break;case 18:Z!==null&&(ke?(e=Z,n=n.stateNode,e.nodeType===8?Mi(e.parentNode,n):e.nodeType===1&&Mi(e,n),_n(e)):Mi(Z,n.stateNode));break;case 4:r=Z,i=ke,Z=n.stateNode.containerInfo,ke=!0,Xe(e,t,n),Z=r,ke=i;break;case 0:case 11:case 14:case 15:if(!ie&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&bs(n,t,a),i=i.next}while(i!==r)}Xe(e,t,n);break;case 1:if(!ie&&(Bt(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(o){B(n,t,o)}Xe(e,t,n);break;case 21:Xe(e,t,n);break;case 22:n.mode&1?(ie=(r=ie)||n.memoizedState!==null,Xe(e,t,n),ie=r):Xe(e,t,n);break;default:Xe(e,t,n)}}function Fo(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new vp),t.forEach(function(r){var i=Tp.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Pe(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=e,a=t,o=a;e:for(;o!==null;){switch(o.tag){case 5:Z=o.stateNode,ke=!1;break e;case 3:Z=o.stateNode.containerInfo,ke=!0;break e;case 4:Z=o.stateNode.containerInfo,ke=!0;break e}o=o.return}if(Z===null)throw Error(y(160));Gu(s,a,i),Z=null,ke=!1;var l=i.alternate;l!==null&&(l.return=null),i.return=null}catch(c){B(i,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Qu(t,e),t=t.sibling}function Qu(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Pe(t,e),Oe(e),r&4){try{Pn(3,e,e.return),pi(3,e)}catch(L){B(e,e.return,L)}try{Pn(5,e,e.return)}catch(L){B(e,e.return,L)}}break;case 1:Pe(t,e),Oe(e),r&512&&n!==null&&Bt(n,n.return);break;case 5:if(Pe(t,e),Oe(e),r&512&&n!==null&&Bt(n,n.return),e.flags&32){var i=e.stateNode;try{qn(i,"")}catch(L){B(e,e.return,L)}}if(r&4&&(i=e.stateNode,i!=null)){var s=e.memoizedProps,a=n!==null?n.memoizedProps:s,o=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{o==="input"&&s.type==="radio"&&s.name!=null&&vl(i,s),ls(o,a);var c=ls(o,s);for(a=0;a<l.length;a+=2){var g=l[a],h=l[a+1];g==="style"?El(i,h):g==="dangerouslySetInnerHTML"?yl(i,h):g==="children"?qn(i,h):Js(i,g,h,c)}switch(o){case"input":rs(i,s);break;case"textarea":gl(i,s);break;case"select":var v=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var x=s.value;x!=null?Gt(i,!!s.multiple,x,!1):v!==!!s.multiple&&(s.defaultValue!=null?Gt(i,!!s.multiple,s.defaultValue,!0):Gt(i,!!s.multiple,s.multiple?[]:"",!1))}i[Vn]=s}catch(L){B(e,e.return,L)}}break;case 6:if(Pe(t,e),Oe(e),r&4){if(e.stateNode===null)throw Error(y(162));i=e.stateNode,s=e.memoizedProps;try{i.nodeValue=s}catch(L){B(e,e.return,L)}}break;case 3:if(Pe(t,e),Oe(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{_n(t.containerInfo)}catch(L){B(e,e.return,L)}break;case 4:Pe(t,e),Oe(e);break;case 13:Pe(t,e),Oe(e),i=e.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(Aa=G())),r&4&&Fo(e);break;case 22:if(g=n!==null&&n.memoizedState!==null,e.mode&1?(ie=(c=ie)||g,Pe(t,e),ie=c):Pe(t,e),Oe(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!g&&e.mode&1)for(S=e,g=e.child;g!==null;){for(h=S=g;S!==null;){switch(v=S,x=v.child,v.tag){case 0:case 11:case 14:case 15:Pn(4,v,v.return);break;case 1:Bt(v,v.return);var E=v.stateNode;if(typeof E.componentWillUnmount=="function"){r=v,n=v.return;try{t=r,E.props=t.memoizedProps,E.state=t.memoizedState,E.componentWillUnmount()}catch(L){B(r,n,L)}}break;case 5:Bt(v,v.return);break;case 22:if(v.memoizedState!==null){Uo(h);continue}}x!==null?(x.return=v,S=x):Uo(h)}g=g.sibling}e:for(g=null,h=e;;){if(h.tag===5){if(g===null){g=h;try{i=h.stateNode,c?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(o=h.stateNode,l=h.memoizedProps.style,a=l!=null&&l.hasOwnProperty("display")?l.display:null,o.style.display=xl("display",a))}catch(L){B(e,e.return,L)}}}else if(h.tag===6){if(g===null)try{h.stateNode.nodeValue=c?"":h.memoizedProps}catch(L){B(e,e.return,L)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;g===h&&(g=null),h=h.return}g===h&&(g=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Pe(t,e),Oe(e),r&4&&Fo(e);break;case 21:break;default:Pe(t,e),Oe(e)}}function Oe(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if($u(n)){var r=n;break e}n=n.return}throw Error(y(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(qn(i,""),r.flags&=-33);var s=Mo(e);Ms(e,s,i);break;case 3:case 4:var a=r.stateNode.containerInfo,o=Mo(e);_s(e,o,a);break;default:throw Error(y(161))}}catch(l){B(e,e.return,l)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function hp(e,t,n){S=e,Wu(e)}function Wu(e,t,n){for(var r=(e.mode&1)!==0;S!==null;){var i=S,s=i.child;if(i.tag===22&&r){var a=i.memoizedState!==null||gr;if(!a){var o=i.alternate,l=o!==null&&o.memoizedState!==null||ie;o=gr;var c=ie;if(gr=a,(ie=l)&&!c)for(S=i;S!==null;)a=S,l=a.child,a.tag===22&&a.memoizedState!==null?Vo(i):l!==null?(l.return=a,S=l):Vo(i);for(;s!==null;)S=s,Wu(s),s=s.sibling;S=i,gr=o,ie=c}zo(e)}else i.subtreeFlags&8772&&s!==null?(s.return=i,S=s):zo(e)}}function zo(e){for(;S!==null;){var t=S;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:ie||pi(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!ie)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:Re(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=t.updateQueue;s!==null&&Co(t,s,r);break;case 3:var a=t.updateQueue;if(a!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Co(t,a,n)}break;case 5:var o=t.stateNode;if(n===null&&t.flags&4){n=o;var l=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var g=c.memoizedState;if(g!==null){var h=g.dehydrated;h!==null&&_n(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(y(163))}ie||t.flags&512&&Os(t)}catch(v){B(t,t.return,v)}}if(t===e){S=null;break}if(n=t.sibling,n!==null){n.return=t.return,S=n;break}S=t.return}}function Uo(e){for(;S!==null;){var t=S;if(t===e){S=null;break}var n=t.sibling;if(n!==null){n.return=t.return,S=n;break}S=t.return}}function Vo(e){for(;S!==null;){var t=S;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{pi(4,t)}catch(l){B(t,n,l)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(l){B(t,i,l)}}var s=t.return;try{Os(t)}catch(l){B(t,s,l)}break;case 5:var a=t.return;try{Os(t)}catch(l){B(t,a,l)}}}catch(l){B(t,t.return,l)}if(t===e){S=null;break}var o=t.sibling;if(o!==null){o.return=t.return,S=o;break}S=t.return}}var yp=Math.ceil,Yr=Ke.ReactCurrentDispatcher,wa=Ke.ReactCurrentOwner,Te=Ke.ReactCurrentBatchConfig,q=0,Y=null,Q=null,ee=0,ge=0,$t=vt(0),J=0,Wn=null,Pt=0,mi=0,Na=0,Rn=null,de=null,Aa=0,sn=1/0,Ue=null,Zr=!1,Fs=null,ut=null,hr=!1,rt=null,ei=0,kn=0,zs=null,Pr=-1,Rr=0;function oe(){return q&6?G():Pr!==-1?Pr:Pr=G()}function dt(e){return e.mode&1?q&2&&ee!==0?ee&-ee:tp.transition!==null?(Rr===0&&(Rr=Il()),Rr):(e=b,e!==0||(e=window.event,e=e===void 0?16:Fl(e.type)),e):1}function De(e,t,n,r){if(50<kn)throw kn=0,zs=null,Error(y(185));Kn(e,n,r),(!(q&2)||e!==Y)&&(e===Y&&(!(q&2)&&(mi|=n),J===4&&tt(e,ee)),fe(e,r),n===1&&q===0&&!(t.mode&1)&&(sn=G()+500,ui&&gt()))}function fe(e,t){var n=e.callbackNode;tc(e,t);var r=_r(e,e===Y?ee:0);if(r===0)n!==null&&Ka(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Ka(n),t===1)e.tag===0?ep(Ho.bind(null,e)):iu(Ho.bind(null,e)),Kc(function(){!(q&6)&&gt()}),n=null;else{switch(ql(r)){case 1:n=ea;break;case 4:n=Rl;break;case 16:n=Or;break;case 536870912:n=kl;break;default:n=Or}n=nd(n,Ju.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Ju(e,t){if(Pr=-1,Rr=0,q&6)throw Error(y(327));var n=e.callbackNode;if(Xt()&&e.callbackNode!==n)return null;var r=_r(e,e===Y?ee:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=ti(e,r);else{t=r;var i=q;q|=2;var s=Xu();(Y!==e||ee!==t)&&(Ue=null,sn=G()+500,Ct(e,t));do try{Lp();break}catch(o){Ku(e,o)}while(!0);ma(),Yr.current=s,q=i,Q!==null?t=0:(Y=null,ee=0,t=J)}if(t!==0){if(t===2&&(i=ms(e),i!==0&&(r=i,t=Us(e,i))),t===1)throw n=Wn,Ct(e,0),tt(e,r),fe(e,G()),n;if(t===6)tt(e,r);else{if(i=e.current.alternate,!(r&30)&&!xp(i)&&(t=ti(e,r),t===2&&(s=ms(e),s!==0&&(r=s,t=Us(e,s))),t===1))throw n=Wn,Ct(e,0),tt(e,r),fe(e,G()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(y(345));case 2:Et(e,de,Ue);break;case 3:if(tt(e,r),(r&130023424)===r&&(t=Aa+500-G(),10<t)){if(_r(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){oe(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=Ls(Et.bind(null,e,de,Ue),t);break}Et(e,de,Ue);break;case 4:if(tt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var a=31-qe(r);s=1<<a,a=t[a],a>i&&(i=a),r&=~s}if(r=i,r=G()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*yp(r/1960))-r,10<r){e.timeoutHandle=Ls(Et.bind(null,e,de,Ue),r);break}Et(e,de,Ue);break;case 5:Et(e,de,Ue);break;default:throw Error(y(329))}}}return fe(e,G()),e.callbackNode===n?Ju.bind(null,e):null}function Us(e,t){var n=Rn;return e.current.memoizedState.isDehydrated&&(Ct(e,t).flags|=256),e=ti(e,t),e!==2&&(t=de,de=n,t!==null&&Vs(t)),e}function Vs(e){de===null?de=e:de.push.apply(de,e)}function xp(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!be(s(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function tt(e,t){for(t&=~Na,t&=~mi,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-qe(t),r=1<<n;e[n]=-1,t&=~r}}function Ho(e){if(q&6)throw Error(y(327));Xt();var t=_r(e,0);if(!(t&1))return fe(e,G()),null;var n=ti(e,t);if(e.tag!==0&&n===2){var r=ms(e);r!==0&&(t=r,n=Us(e,r))}if(n===1)throw n=Wn,Ct(e,0),tt(e,t),fe(e,G()),n;if(n===6)throw Error(y(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Et(e,de,Ue),fe(e,G()),null}function Pa(e,t){var n=q;q|=1;try{return e(t)}finally{q=n,q===0&&(sn=G()+500,ui&&gt())}}function Rt(e){rt!==null&&rt.tag===0&&!(q&6)&&Xt();var t=q;q|=1;var n=Te.transition,r=b;try{if(Te.transition=null,b=1,e)return e()}finally{b=r,Te.transition=n,q=t,!(q&6)&&gt()}}function Ra(){ge=$t.current,F($t)}function Ct(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Jc(n)),Q!==null)for(n=Q.return;n!==null;){var r=n;switch(da(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Vr();break;case 3:nn(),F(pe),F(se),xa();break;case 5:ya(r);break;case 4:nn();break;case 13:F(U);break;case 19:F(U);break;case 10:fa(r.type._context);break;case 22:case 23:Ra()}n=n.return}if(Y=e,Q=e=ct(e.current,null),ee=ge=t,J=0,Wn=null,Na=mi=Pt=0,de=Rn=null,jt!==null){for(t=0;t<jt.length;t++)if(n=jt[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var a=s.next;s.next=i,r.next=a}n.pending=r}jt=null}return e}function Ku(e,t){do{var n=Q;try{if(ma(),wr.current=Xr,Kr){for(var r=V.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}Kr=!1}if(At=0,X=W=V=null,An=!1,$n=0,wa.current=null,n===null||n.return===null){J=1,Wn=t,Q=null;break}e:{var s=e,a=n.return,o=n,l=t;if(t=ee,o.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,g=o,h=g.tag;if(!(g.mode&1)&&(h===0||h===11||h===15)){var v=g.alternate;v?(g.updateQueue=v.updateQueue,g.memoizedState=v.memoizedState,g.lanes=v.lanes):(g.updateQueue=null,g.memoizedState=null)}var x=Ro(a);if(x!==null){x.flags&=-257,ko(x,a,o,s,t),x.mode&1&&Po(s,c,t),t=x,l=c;var E=t.updateQueue;if(E===null){var L=new Set;L.add(l),t.updateQueue=L}else E.add(l);break e}else{if(!(t&1)){Po(s,c,t),ka();break e}l=Error(y(426))}}else if(z&&o.mode&1){var A=Ro(a);if(A!==null){!(A.flags&65536)&&(A.flags|=256),ko(A,a,o,s,t),ca(rn(l,o));break e}}s=l=rn(l,o),J!==4&&(J=2),Rn===null?Rn=[s]:Rn.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,t&=-t,s.lanes|=t;var d=qu(s,l,t);So(s,d);break e;case 1:o=l;var u=s.type,m=s.stateNode;if(!(s.flags&128)&&(typeof u.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(ut===null||!ut.has(m)))){s.flags|=65536,t&=-t,s.lanes|=t;var f=Du(s,o,t);So(s,f);break e}}s=s.return}while(s!==null)}Zu(n)}catch(j){t=j,Q===n&&n!==null&&(Q=n=n.return);continue}break}while(!0)}function Xu(){var e=Yr.current;return Yr.current=Xr,e===null?Xr:e}function ka(){(J===0||J===3||J===2)&&(J=4),Y===null||!(Pt&268435455)&&!(mi&268435455)||tt(Y,ee)}function ti(e,t){var n=q;q|=2;var r=Xu();(Y!==e||ee!==t)&&(Ue=null,Ct(e,t));do try{Ep();break}catch(i){Ku(e,i)}while(!0);if(ma(),q=n,Yr.current=r,Q!==null)throw Error(y(261));return Y=null,ee=0,J}function Ep(){for(;Q!==null;)Yu(Q)}function Lp(){for(;Q!==null&&!Gd();)Yu(Q)}function Yu(e){var t=td(e.alternate,e,ge);e.memoizedProps=e.pendingProps,t===null?Zu(e):Q=t,wa.current=null}function Zu(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=fp(n,t),n!==null){n.flags&=32767,Q=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{J=6,Q=null;return}}else if(n=mp(n,t,ge),n!==null){Q=n;return}if(t=t.sibling,t!==null){Q=t;return}Q=t=e}while(t!==null);J===0&&(J=5)}function Et(e,t,n){var r=b,i=Te.transition;try{Te.transition=null,b=1,jp(e,t,n,r)}finally{Te.transition=i,b=r}return null}function jp(e,t,n,r){do Xt();while(rt!==null);if(q&6)throw Error(y(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(y(177));e.callbackNode=null,e.callbackPriority=0;var s=n.lanes|n.childLanes;if(nc(e,s),e===Y&&(Q=Y=null,ee=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||hr||(hr=!0,nd(Or,function(){return Xt(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Te.transition,Te.transition=null;var a=b;b=1;var o=q;q|=4,wa.current=null,gp(e,n),Qu(n,e),Vc(xs),Mr=!!ys,xs=ys=null,e.current=n,hp(n),Qd(),q=o,b=a,Te.transition=s}else e.current=n;if(hr&&(hr=!1,rt=e,ei=i),s=e.pendingLanes,s===0&&(ut=null),Kd(n.stateNode),fe(e,G()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(Zr)throw Zr=!1,e=Fs,Fs=null,e;return ei&1&&e.tag!==0&&Xt(),s=e.pendingLanes,s&1?e===zs?kn++:(kn=0,zs=e):kn=0,gt(),null}function Xt(){if(rt!==null){var e=ql(ei),t=Te.transition,n=b;try{if(Te.transition=null,b=16>e?16:e,rt===null)var r=!1;else{if(e=rt,rt=null,ei=0,q&6)throw Error(y(331));var i=q;for(q|=4,S=e.current;S!==null;){var s=S,a=s.child;if(S.flags&16){var o=s.deletions;if(o!==null){for(var l=0;l<o.length;l++){var c=o[l];for(S=c;S!==null;){var g=S;switch(g.tag){case 0:case 11:case 15:Pn(8,g,s)}var h=g.child;if(h!==null)h.return=g,S=h;else for(;S!==null;){g=S;var v=g.sibling,x=g.return;if(Bu(g),g===c){S=null;break}if(v!==null){v.return=x,S=v;break}S=x}}}var E=s.alternate;if(E!==null){var L=E.child;if(L!==null){E.child=null;do{var A=L.sibling;L.sibling=null,L=A}while(L!==null)}}S=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,S=a;else e:for(;S!==null;){if(s=S,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Pn(9,s,s.return)}var d=s.sibling;if(d!==null){d.return=s.return,S=d;break e}S=s.return}}var u=e.current;for(S=u;S!==null;){a=S;var m=a.child;if(a.subtreeFlags&2064&&m!==null)m.return=a,S=m;else e:for(a=u;S!==null;){if(o=S,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:pi(9,o)}}catch(j){B(o,o.return,j)}if(o===a){S=null;break e}var f=o.sibling;if(f!==null){f.return=o.return,S=f;break e}S=o.return}}if(q=i,gt(),Fe&&typeof Fe.onPostCommitFiberRoot=="function")try{Fe.onPostCommitFiberRoot(ii,e)}catch{}r=!0}return r}finally{b=n,Te.transition=t}}return!1}function Bo(e,t,n){t=rn(n,t),t=qu(e,t,1),e=lt(e,t,1),t=oe(),e!==null&&(Kn(e,1,t),fe(e,t))}function B(e,t,n){if(e.tag===3)Bo(e,e,n);else for(;t!==null;){if(t.tag===3){Bo(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(ut===null||!ut.has(r))){e=rn(n,e),e=Du(t,e,1),t=lt(t,e,1),e=oe(),t!==null&&(Kn(t,1,e),fe(t,e));break}}t=t.return}}function Sp(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=oe(),e.pingedLanes|=e.suspendedLanes&n,Y===e&&(ee&n)===n&&(J===4||J===3&&(ee&130023424)===ee&&500>G()-Aa?Ct(e,0):Na|=n),fe(e,t)}function ed(e,t){t===0&&(e.mode&1?(t=or,or<<=1,!(or&130023424)&&(or=4194304)):t=1);var n=oe();e=We(e,t),e!==null&&(Kn(e,t,n),fe(e,n))}function Cp(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),ed(e,n)}function Tp(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(y(314))}r!==null&&r.delete(t),ed(e,n)}var td;td=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||pe.current)ce=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return ce=!1,pp(e,t,n);ce=!!(e.flags&131072)}else ce=!1,z&&t.flags&1048576&&su(t,$r,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Ar(e,t),e=t.pendingProps;var i=Zt(t,se.current);Kt(t,n),i=La(null,t,r,e,i,n);var s=ja();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,me(r)?(s=!0,Hr(t)):s=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,ga(t),i.updater=ci,t.stateNode=i,i._reactInternals=t,As(t,r,e,n),t=ks(null,t,r,!0,s,n)):(t.tag=0,z&&s&&ua(t),ae(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Ar(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=Np(r),e=Re(r,e),i){case 0:t=Rs(null,t,r,e,n);break e;case 1:t=Do(null,t,r,e,n);break e;case 11:t=Io(null,t,r,e,n);break e;case 14:t=qo(null,t,r,Re(r.type,e),n);break e}throw Error(y(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Re(r,i),Rs(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Re(r,i),Do(e,t,r,i,n);case 3:e:{if(Mu(t),e===null)throw Error(y(387));r=t.pendingProps,s=t.memoizedState,i=s.element,cu(e,t),Wr(t,r,null,n);var a=t.memoizedState;if(r=a.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){i=rn(Error(y(423)),t),t=bo(e,t,r,n,i);break e}else if(r!==i){i=rn(Error(y(424)),t),t=bo(e,t,r,n,i);break e}else for(he=ot(t.stateNode.containerInfo.firstChild),ye=t,z=!0,Ie=null,n=uu(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(en(),r===i){t=Je(e,t,n);break e}ae(e,t,r,n)}t=t.child}return t;case 5:return pu(t),e===null&&Ts(t),r=t.type,i=t.pendingProps,s=e!==null?e.memoizedProps:null,a=i.children,Es(r,i)?a=null:s!==null&&Es(r,s)&&(t.flags|=32),_u(e,t),ae(e,t,a,n),t.child;case 6:return e===null&&Ts(t),null;case 13:return Fu(e,t,n);case 4:return ha(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=tn(t,null,r,n):ae(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Re(r,i),Io(e,t,r,i,n);case 7:return ae(e,t,t.pendingProps,n),t.child;case 8:return ae(e,t,t.pendingProps.children,n),t.child;case 12:return ae(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,s=t.memoizedProps,a=i.value,O(Gr,r._currentValue),r._currentValue=a,s!==null)if(be(s.value,a)){if(s.children===i.children&&!pe.current){t=Je(e,t,n);break e}}else for(s=t.child,s!==null&&(s.return=t);s!==null;){var o=s.dependencies;if(o!==null){a=s.child;for(var l=o.firstContext;l!==null;){if(l.context===r){if(s.tag===1){l=$e(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var g=c.pending;g===null?l.next=l:(l.next=g.next,g.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),ws(s.return,n,t),o.lanes|=n;break}l=l.next}}else if(s.tag===10)a=s.type===t.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(y(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),ws(a,n,t),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===t){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}ae(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,Kt(t,n),i=we(i),r=r(i),t.flags|=1,ae(e,t,r,n),t.child;case 14:return r=t.type,i=Re(r,t.pendingProps),i=Re(r.type,i),qo(e,t,r,i,n);case 15:return bu(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Re(r,i),Ar(e,t),t.tag=1,me(r)?(e=!0,Hr(t)):e=!1,Kt(t,n),Iu(t,r,i),As(t,r,i,n),ks(null,t,r,!0,e,n);case 19:return zu(e,t,n);case 22:return Ou(e,t,n)}throw Error(y(156,t.tag))};function nd(e,t){return Pl(e,t)}function wp(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ce(e,t,n,r){return new wp(e,t,n,r)}function Ia(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Np(e){if(typeof e=="function")return Ia(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Xs)return 11;if(e===Ys)return 14}return 2}function ct(e,t){var n=e.alternate;return n===null?(n=Ce(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function kr(e,t,n,r,i,s){var a=2;if(r=e,typeof e=="function")Ia(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case bt:return Tt(n.children,i,s,t);case Ks:a=8,i|=8;break;case Yi:return e=Ce(12,n,t,i|2),e.elementType=Yi,e.lanes=s,e;case Zi:return e=Ce(13,n,t,i),e.elementType=Zi,e.lanes=s,e;case es:return e=Ce(19,n,t,i),e.elementType=es,e.lanes=s,e;case pl:return fi(n,i,s,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case dl:a=10;break e;case cl:a=9;break e;case Xs:a=11;break e;case Ys:a=14;break e;case Ye:a=16,r=null;break e}throw Error(y(130,e==null?e:typeof e,""))}return t=Ce(a,n,t,i),t.elementType=e,t.type=r,t.lanes=s,t}function Tt(e,t,n,r){return e=Ce(7,e,r,t),e.lanes=n,e}function fi(e,t,n,r){return e=Ce(22,e,r,t),e.elementType=pl,e.lanes=n,e.stateNode={isHidden:!1},e}function Gi(e,t,n){return e=Ce(6,e,null,t),e.lanes=n,e}function Qi(e,t,n){return t=Ce(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Ap(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ni(0),this.expirationTimes=Ni(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ni(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function qa(e,t,n,r,i,s,a,o,l){return e=new Ap(e,t,n,o,l),t===1?(t=1,s===!0&&(t|=8)):t=0,s=Ce(3,null,null,t),e.current=s,s.stateNode=e,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},ga(s),e}function Pp(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Dt,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function rd(e){if(!e)return mt;e=e._reactInternals;e:{if(It(e)!==e||e.tag!==1)throw Error(y(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(me(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(y(171))}if(e.tag===1){var n=e.type;if(me(n))return ru(e,n,t)}return t}function id(e,t,n,r,i,s,a,o,l){return e=qa(n,r,!0,e,i,s,a,o,l),e.context=rd(null),n=e.current,r=oe(),i=dt(n),s=$e(r,i),s.callback=t??null,lt(n,s,i),e.current.lanes=i,Kn(e,i,r),fe(e,r),e}function vi(e,t,n,r){var i=t.current,s=oe(),a=dt(i);return n=rd(n),t.context===null?t.context=n:t.pendingContext=n,t=$e(s,a),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=lt(i,t,a),e!==null&&(De(e,i,a,s),Tr(e,i,a)),a}function ni(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function $o(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Da(e,t){$o(e,t),(e=e.alternate)&&$o(e,t)}function Rp(){return null}var sd=typeof reportError=="function"?reportError:function(e){console.error(e)};function ba(e){this._internalRoot=e}gi.prototype.render=ba.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(y(409));vi(e,t,null,null)};gi.prototype.unmount=ba.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Rt(function(){vi(null,e,null,null)}),t[Qe]=null}};function gi(e){this._internalRoot=e}gi.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ol();e={blockedOn:null,target:e,priority:t};for(var n=0;n<et.length&&t!==0&&t<et[n].priority;n++);et.splice(n,0,e),n===0&&Ml(e)}};function Oa(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function hi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Go(){}function kp(e,t,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var c=ni(a);s.call(c)}}var a=id(t,r,e,0,null,!1,!1,"",Go);return e._reactRootContainer=a,e[Qe]=a.current,zn(e.nodeType===8?e.parentNode:e),Rt(),a}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var o=r;r=function(){var c=ni(l);o.call(c)}}var l=qa(e,0,!1,null,null,!1,!1,"",Go);return e._reactRootContainer=l,e[Qe]=l.current,zn(e.nodeType===8?e.parentNode:e),Rt(function(){vi(t,l,n,r)}),l}function yi(e,t,n,r,i){var s=n._reactRootContainer;if(s){var a=s;if(typeof i=="function"){var o=i;i=function(){var l=ni(a);o.call(l)}}vi(t,a,e,i)}else a=kp(n,t,e,i,r);return ni(a)}Dl=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Ln(t.pendingLanes);n!==0&&(ta(t,n|1),fe(t,G()),!(q&6)&&(sn=G()+500,gt()))}break;case 13:Rt(function(){var r=We(e,1);if(r!==null){var i=oe();De(r,e,1,i)}}),Da(e,1)}};na=function(e){if(e.tag===13){var t=We(e,134217728);if(t!==null){var n=oe();De(t,e,134217728,n)}Da(e,134217728)}};bl=function(e){if(e.tag===13){var t=dt(e),n=We(e,t);if(n!==null){var r=oe();De(n,e,t,r)}Da(e,t)}};Ol=function(){return b};_l=function(e,t){var n=b;try{return b=e,t()}finally{b=n}};ds=function(e,t,n){switch(t){case"input":if(rs(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=li(r);if(!i)throw Error(y(90));fl(r),rs(r,i)}}}break;case"textarea":gl(e,n);break;case"select":t=n.value,t!=null&&Gt(e,!!n.multiple,t,!1)}};Sl=Pa;Cl=Rt;var Ip={usingClientEntryPoint:!1,Events:[Yn,Ft,li,Ll,jl,Pa]},yn={findFiberByHostInstance:Lt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},qp={bundleType:yn.bundleType,version:yn.version,rendererPackageName:yn.rendererPackageName,rendererConfig:yn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ke.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Nl(e),e===null?null:e.stateNode},findFiberByHostInstance:yn.findFiberByHostInstance||Rp,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var yr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!yr.isDisabled&&yr.supportsFiber)try{ii=yr.inject(qp),Fe=yr}catch{}}Ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ip;Ee.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Oa(t))throw Error(y(200));return Pp(e,t,null,n)};Ee.createRoot=function(e,t){if(!Oa(e))throw Error(y(299));var n=!1,r="",i=sd;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=qa(e,1,!1,null,null,n,!1,r,i),e[Qe]=t.current,zn(e.nodeType===8?e.parentNode:e),new ba(t)};Ee.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(y(188)):(e=Object.keys(e).join(","),Error(y(268,e)));return e=Nl(t),e=e===null?null:e.stateNode,e};Ee.flushSync=function(e){return Rt(e)};Ee.hydrate=function(e,t,n){if(!hi(t))throw Error(y(200));return yi(null,e,t,!0,n)};Ee.hydrateRoot=function(e,t,n){if(!Oa(e))throw Error(y(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",a=sd;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),t=id(t,null,e,1,n??null,i,!1,s,a),e[Qe]=t.current,zn(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new gi(t)};Ee.render=function(e,t,n){if(!hi(t))throw Error(y(200));return yi(null,e,t,!1,n)};Ee.unmountComponentAtNode=function(e){if(!hi(e))throw Error(y(40));return e._reactRootContainer?(Rt(function(){yi(null,null,e,!1,function(){e._reactRootContainer=null,e[Qe]=null})}),!0):!1};Ee.unstable_batchedUpdates=Pa;Ee.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!hi(n))throw Error(y(200));if(e==null||e._reactInternals===void 0)throw Error(y(38));return yi(e,t,n,!1,r)};Ee.version="18.3.1-next-f1338f8080-20240426";function ad(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ad)}catch(e){console.error(e)}}ad(),al.exports=Ee;var Dp=al.exports,od,Qo=Dp;od=Qo.createRoot,Qo.hydrateRoot;/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var bp={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Op=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),ve=(e,t)=>{const n=M.forwardRef(({color:r="currentColor",size:i=24,strokeWidth:s=2,absoluteStrokeWidth:a,className:o="",children:l,...c},g)=>M.createElement("svg",{ref:g,...bp,width:i,height:i,stroke:r,strokeWidth:a?Number(s)*24/Number(i):s,className:["lucide",`lucide-${Op(e)}`,o].join(" "),...c},[...t.map(([h,v])=>M.createElement(h,v)),...Array.isArray(l)?l:[l]]));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _p=ve("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wi=ve("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mp=ve("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fp=ve("GraduationCap",[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zp=ve("Home",[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"y5dka4"}],["polyline",{points:"9 22 9 12 15 12 15 22",key:"e2us08"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Up=ve("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vp=ve("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hp=ve("Pause",[["rect",{width:"4",height:"16",x:"6",y:"4",key:"iffhe4"}],["rect",{width:"4",height:"16",x:"14",y:"4",key:"sjin7j"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bp=ve("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $p=ve("Play",[["polygon",{points:"5 3 19 12 5 21 5 3",key:"191637"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gp=ve("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qp=ve("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ji=ve("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wp=ve("Volume2",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["path",{d:"M15.54 8.46a5 5 0 0 1 0 7.07",key:"ltjumu"}],["path",{d:"M19.07 4.93a10 10 0 0 1 0 14.14",key:"1kegas"}]]),Jp=`
{
    "chapitres": [
        {
            "titre": "Chapitre 1 : Le temps de travail",
            "page": 7,
            "mots_cles": [
                "durée légale",
                "temps de travail",
                "plages fixes",
                "plages souplesse",
                "heures supplémentaires",
                "astreintes",
                "travail de nuit",
                "temps partiel",
                "journée solidarité",
                "sujétions"
            ],
            "articles": [
                {
                    "titre": "Article 1 : Définition",
                    "page": 7,
                    "mots_cles": [
                        "travail effectif",
                        "arrêt maladie",
                        "position d'activité",
                        "1607h",
                        "jours travaillés",
                        "jours fériés",
                        "repos hebdo",
                        "solidarité"
                    ]
                },
                {
                    "titre": "Article 2 : Les durées du temps de travail",
                    "page": 7,
                    "mots_cles": [
                        "cycles hebdomadaires",
                        "annualisation",
                        "jours non travaillés",
                        "JNT",
                        "temps de travail",
                        "crèches",
                        "37h",
                        "38h"
                    ]
                },
                {
                    "titre": "Article 3 : Les plages fixes et plages de souplesse",
                    "page": 8,
                    "mots_cles": [
                        "plages fixes",
                        "plages souplesse",
                        "horaires variables",
                        "présence obligatoire",
                        "planning",
                        "flexibilité",
                        "pause méridienne",
                        "présentiel"
                    ]
                },
                {
                    "titre": "Article 4 : Les garanties minimales",
                    "page": 9,
                    "mots_cles": [
                        "repos quotidien",
                        "repos hebdomadaire",
                        "pause",
                        "amplitude",
                        "travail de nuit",
                        "décret 2000-815",
                        "dérogations",
                        "service public"
                    ]
                },
                {
                    "titre": "Article 5 : Heures supplémentaires et complémentaires",
                    "page": 9,
                    "mots_cles": [
                        "heures supplémentaires",
                        "majoration",
                        "récupération",
                        "dimanche",
                        "nuit",
                        "formulaire",
                        "agents B et C",
                        "25 heures"
                    ]
                },
                {
                    "titre": "Article 6 : Le temps partiel",
                    "page": 10,
                    "mots_cles": [
                        "temps partiel",
                        "quotité",
                        "temps partiel de droit",
                        "temps partiel sur autorisation",
                        "rémunération",
                        "congés",
                        "retraite",
                        "surcotisation"
                    ]
                },
                {
                    "titre": "Article 7 : La journée de solidarité",
                    "page": 14,
                    "mots_cles": [
                        "solidarité",
                        "7h",
                        "fractionnement",
                        "RTT",
                        "jour férié",
                        "congés",
                        "modalités",
                        "temps partiel"
                    ]
                },
                {
                    "titre": "Article 8 : Les astreintes et permanences",
                    "page": 15,
                    "mots_cles": [
                        "astreinte",
                        "permanence",
                        "intervention",
                        "rémunération",
                        "repos compensateur",
                        "logement",
                        "sécurité",
                        "filière technique"
                    ]
                },
                {
                    "titre": "Article 9 : Les sujétions particulières",
                    "page": 17,
                    "mots_cles": [
                        "sujétions",
                        "travail de nuit",
                        "dimanche",
                        "jours fériés",
                        "compensation",
                        "cycles",
                        "barème",
                        "impact santé"
                    ]
                }
            ]
        },
        {
            "titre": "Chapitre 2 : Les congés",
            "page": 19,
            "mots_cles": [
                "congés annuels",
                "congé bonifié",
                "ARTT",
                "don de jours",
                "CET",
                "congés naissance",
                "fractionnement",
                "jours fériés",
                "temps partiel",
                "report"
            ],
            "articles": [
                {
                    "titre": "Article 1 : Les congés annuels",
                    "page": 19,
                    "mots_cles": [
                        "jours ouvrés",
                        "planning",
                        "fractionnement",
                        "report",
                        "priorité",
                        "vacances scolaires",
                        "temps partiel",
                        "31 décembre"
                    ]
                },
                {
                    "titre": "Article 2 : Le congé bonifié",
                    "page": 23,
                    "mots_cles": [
                        "outre-mer",
                        "fonctionnaires",
                        "Guadeloupe",
                        "Réunion",
                        "conditions",
                        "décret 2020-851",
                        "durée",
                        "transport"
                    ]
                },
                {
                    "titre": "Article 3 : Les jours d'A.R.T.T",
                    "page": 24,
                    "mots_cles": [
                        "RTT",
                        "compensation",
                        "quotité",
                        "cycle",
                        "absence",
                        "réduction",
                        "prise",
                        "déduction"
                    ]
                },
                {
                    "titre": "Article 4 : Les dons de jours de repos",
                    "page": 27,
                    "mots_cles": [
                        "don jours",
                        "RTT",
                        "congé annuel",
                        "enfant malade",
                        "aide familiale",
                        "justificatif",
                        "congé solidaire",
                        "31 jours"
                    ]
                },
                {
                    "titre": "Article 5 : Le Compte Épargne Temps",
                    "page": 27,
                    "mots_cles": [
                        "CET",
                        "alimentation",
                        "jours non pris",
                        "formulaire",
                        "ouverture",
                        "indemnisation",
                        "retraite",
                        "report"
                    ]
                },
                {
                    "titre": "Article 6 : Les congés liés aux naissances",
                    "page": 29,
                    "mots_cles": [
                        "congé maternité",
                        "congé paternité",
                        "durée",
                        "hospitalisation",
                        "naissance",
                        "temps partiel",
                        "indemnisation",
                        "certificat"
                    ]
                }
            ]
        },
        {
            "titre": "Chapitre 3 : Autorisations spéciales d'absence",
            "page": 31,
            "mots_cles": [
                "autorisations absence",
                "fêtes religieuses",
                "garde enfant",
		            "nourrice",
                "maladie",
                "proche aidant",
                "décès",
                "maternité",
                "rentrée scolaire",
                "consultation médicale",
                "mariage"
            ],
            "articles": [
                {
                    "titre": "Article 1 : Fêtes religieuses",
                    "page": 31,
                    "mots_cles": [
                        "religion",
                        "calendrier",
                        "musulmane",
                        "juive",
                        "chrétienne",
                        "orthodoxe",
                        "préfecture",
                        "jours fériés"
                    ]
                },
                {
                    "titre": "Article 2 : Pour garde d'enfant malade",
                    "page": 31,
                    "mots_cles": [
                        "garde enfant",
			                  "nourrice",
                        "maladie",
                        "école fermée",
                        "RTT",
                        "conjoint",
                        "quotité",
                        "âge",
                        "plafond"
                    ]
                },
                {
                    "titre": "Article 3 : Pour prodiguer des soins ou assister un malade",
                    "page": 33,
                    "mots_cles": [
                        "soins",
                        "maladie",
                        "ascendants",
                        "enfant",
                        "jours ouvrés",
                        "certificat médical",
                        "temps partiel",
                        "justificatif"
                    ]
                },
                {
                    "titre": "Article 4 : Pour accompagner une personne en fin de vie",
                    "page": 33,
                    "mots_cles": [
                        "proche aidant",
                        "AJPA",
                        "pathologie",
                        "temps partiel",
                        "certificat",
                        "ascendants",
                        "absence non rémunérée",
                        "congé spécifique"
                    ]
                },
                {
                    "titre": "Article 5 : En cas de décès d'un membre de la famille",
                    "page": 34,
                    "mots_cles": [
                        "décès",
                        "famille",
                        "jours",
                        "frère",
                        "sœur",
                        "oncle",
                        "conjoint",
                        "enfant"
                    ]
                },
                {
                    "titre": "Article 6 : À l'occasion d'un mariage ou pacs",
                    "page": 35,
                    "mots_cles": [
                        "mariage",
                        "pacs",
                        "congé exceptionnel",
                        "durée",
                        "partenaire",
                        "cérémonie",
                        "justificatif",
                        "conjoint"
                    ]
                },
                {
                    "titre": "Article 7 : Absence liée à la maternité",
                    "page": 35,
                    "mots_cles": [
                        "absence maternité",
                        "mère",
                        "bébé",
                        "accouchement",
                        "congé spécifique",
                        "temps plein",
                        "certificat médical",
                        "suspension"
                    ]
                },
                {
                    "titre": "Article 8 : Pour une consultation médicale",
                    "page": 35,
                    "mots_cles": [
                        "consultation",
                        "médical",
                        "autorisée",
                        "temps partiel",
                        "justificatif",
                        "maternité",
                        "rendez-vous",
                        "absence"
                    ]
                },
                {
                    "titre": "Article 9 : Rentrée Scolaire",
                    "page": 36,
                    "mots_cles": [
                        "rentrée scolaire",
                        "enfants",
                        "parents",
                        "congés",
                        "autorisation",
                        "école",
                        "présence",
                        "temps partiel"
                    ]
                },
                {
                    "titre": "Article 10 : Déménagement",
                    "page": 36,
                    "mots_cles": [
                        "déménagement",
			                  "demenagement",
                        "changement domicile",
                        "autorisation",
                        "jour",
                        "préavis",
                        "mutation",
                        "justificatif",
                        "personnel"
                    ]
                },
                {
                    "titre": "Article 11 : Formation",
                    "page": 36,
                    "mots_cles": [
                        "formation",
                        "stage",
                        "autorisation absence",
                        "présence obligatoire",
                        "plan de formation",
                        "inscription",
                        "temps de travail",
                        "congé"
                    ]
                }
            ]
        },
        {
            "titre": "Chapitre 4 : Les absences pour maladies et accidents",
            "page": 38,
            "mots_cles": [
                "maladie",
                "accident travail",
                "accident trajet",
                "rémunération",
                "arrêt",
                "CLM",
                "CLD",
                "prise en charge",
                "pénibilité",
                "accident service"
            ],
            "articles": [
                {
                    "titre": "Article 1 : La maladie",
                    "page": 38,
                    "mots_cles": [
                        "arrêt maladie",
                        "congé maladie",
                        "rémunération",
                        "justificatif",
                        "traitement",
                        "absences",
                        "soins",
                        "certificat"
                    ]
                },
                {
                    "titre": "Article 2 : Les accidents de service et de trajet",
                    "page": 41,
                    "mots_cles": [
                        "accident service",
                        "accident trajet",
                        "responsabilité",
                        "prise en charge",
                        "déclaration",
                        "arrêt",
                        "indemnisation",
                        "soins"
                    ]
                },
                {
                    "titre": "Article 3 : La prise en charge de la rémunération",
                    "page": 41,
                    "mots_cles": [
                        "rémunération",
                        "maladie",
                        "accident",
                        "traitement indiciaire",
                        "temps partiel",
                        "invalidité",
                        "CLM",
                        "CLD"
                    ]
                }
            ]
        },
        {
            "titre": "Annexes",
            "page": 43,
            "mots_cles": [
                "cycles hebdomadaires",
                "annualisation",
                "directions",
                "travail de nuit",
                "dimanches",
                "jours fériés",
                "métiers",
                "DESS",
                "DCJ",
                "DME"
            ]
        }
    ]
}
`.trim(),Kp={1:`
CHAPITRE 1 : LE TEMPS DE TRAVAIL
ARTICLE 1 : DEFINITION
La durée du travail effectif s'entend comme « le temps pendant lequel les agents sont à la disposition de leur employeur et doivent se conformer à ses directives sans pouvoir vaquer librement à des occupations personnelles ».
Lorsqu'un agent est en arrêt maladie, il est en position d'activité, mais il n'est pas en situation de travail effectif, ni de service.
Nombre total de Jours sur l'année: 365
Repos hebdomadaire (2 jours x 52 semaines): -104
Congés annuels (5 fois les obligations hebdomadaires de travail): -25
Jours fériés: -8
Nombre de jours travaillés: =228
Nombre de jours travaillés = Nb de Jours x 7 heures: 1596h, arrondi à 1600h
+ Journée de solidarité:  +7h
TOTAL en heures: 1607 heures
ARTICLE 2 : LES DUREES DU TEMPS DE TRAVAIL
LA FIXATION DE LA DUREE DE TRAVAIL HEBDOMADAIRE
Au sein de la collectivité de Gennevilliers, les cycles de travail sont définis comme suite :
    37 heures par semaine
    37.5 heures par semaine
    38 heures par semaine
    39 heures par semaine pour les agents travaillant dans les crèches
LE CYCLE ANNUALISE
L'annualisation du temps de travail permet de :
     Condenser le temps de travail de l'agent sur les périodes où le besoin est le plus intense et libérer du temps de travail sur les périodes creuses
     Lisser la rémunération, quel que soit le temps de travail effectué chaque mois.
Dans le cadre de l'annualisation du temps de travail, le nombre de jour fériés n'est pas forfaitaire mais décompté au réel.
Journée non travaillée définition (JNT) :
Les périodes non travaillées correspondent pour partie à sa quote-part de congés annuels et pour le reste à la récupération des heures effectuées en sus. A la différence d'une A.R.T.T que l'agent peut prendre selon son souhait en accord avec sa hiérarchie,
les JNT sont planifiés d'office dans un agenda et ne sont pas mutables / échangeables ou au choix.
C'est le service qui les positionne, en fonction du flux d'activités et des nécessités de services.
ARTICLE 3 : LES PLAGES FIXES ET PLAGES DE SOUPLESSE
DEFINITION DES PLAGES FIXES :
Il s'agit des horaires de travail de présence obligatoire, tels que la collectivité les propose.
DEFINITION DES PLAGES DE SOUPLESSE DE TRAVAIL :
Il s'agit d'organiser dans chacun des services, et dans la limite des nécessités de service, des horaires de travail permettant aux agents de choisir plus librement, en accord avec leur hiérarchie et dans une limite définie, les horaires de début, de pause méridienne et de fin de leur journée de travail.
La durée de travail hebdomadaire ne change pas et s'inscrit toujours dans le respect des dispositions légales et réglementaires.
Cette possibilité est ouverte à toutes les catégories d'agents. Elle est accordée dès lors que la nature du travail et les nécessités de service le permettent, notamment avec les effectifs d'agents suffisants.
               DU LUNDI AU JEUDI                           Plage fixe                 Plage de souplesse
               Matin                                     De 9h30 à 12h                  De 7h30 à 9h30
               Pause déjeuner (45 min)                        45 min                       12h à 14h
               Après-midi                                 14h à 16h30                     16h30 à 19h
               VENDREDI                                    Plage fixe                 Plage de souplesse
               Matin                                     De 9h30 à 12h                  De 7h30 à 9h30
               Pause déjeuner (45 min)                        45 min                       12h à 14h
               Après-midi                                 14h à 16h00                     16h00 à 19h
Un planning hebdomadaire sera mis en place avec chaque direction ou chef de service il sera décidé pour l'année et sera revu à chaque rentrée scolaire (en septembre).
ARTICLE 4 - LES GARANTIES MINIMALES
L'organisation du temps de travail doit respecter les garanties minimales suivantes fixées par l'article 3 du décret n°2000-815 du 25 août 2000 :
       Durée hebdomadaire de travail effectif                    48 heures maximum ou 44 heures en moyenne sur 12 semaines
       Durée quotidienne du travail                              10 heures maximum
       Travail de nuit                                           La période comprise entre 22 heures et 5 heures ou une autre période de 7 heures consécutives comprise entre 22 heures et 7 heures
       Amplitude d'une journée de travail                        12 heures maximum
       Repos hebdomadaire (heures consécutives)                  35 heures minimum
       Repos quotidien (heures consécutives)                     11 heures minimum
       Après une période continue de travail de 6 h              20 minutes de pause minimum
Il ne peut être dérogé aux garanties minimales que dans deux situations précises :
Lorsque l'objet même du service public en cause l'exige en permanence, notamment pour la protection des personnes et des biens (par décret en Conseil d'Etat qui détermine les contreparties accordées aux catégories d'agents concernés)
Lorsque des circonstances exceptionnelles le justifient et pour une période limitée, par décision de l'autorité territoriale : en ce cas, les membres du comité technique doivent être immédiatement informés.
 ARTICLE 5 - LES HEURES SUPPLEMENTAIRES, LES HEURES COMPLEMENTAIRES
Les heures supplémentaires :
Les heures supplémentaires ne se déclencheront qu'au-delà du temps de travail normal de l'agent.
Les heures supplémentaires sont obligatoirement réalisées à la demande des supérieurs hiérarchiques et ne concernent que les agents titulaires et non titulaires de catégorie B et C*.
Ne peuvent être réaliser que 25 heures supplémentaires par mois au maximum.
Elles sont formalisées et font l'objet d'un état récapitulatif signé par le chef de service.
Elles correspondent à une charge de travail exceptionnelle et ne sauraient être accordées pour effectuer des missions normales de service.
Les heures supplémentaires effectuées feront prioritairement l'objet de récupération, dans un délai maximum de deux mois et seront majorées sur un taux identique à celui appliqué à la rémunération :
Les heures supplémentaires sont majorées de 25% pour les 14 premières heures et de 27% pour les heures suivantes (de la 15ème à la 25ème).
Les heures supplémentaires de nuit (de 22h00 à 7h00) sont majorées à 100% (multipliées par 2). Les heures supplémentaires de dimanche et jours fériés sont majorées à 66%.
Ces majorations peuvent se cumuler entres elles : 
                                         De la 1ère à la 14ème heure        De 22h à 7h00 (nuit)           Le dimanche                                                                                                                            1h00                             1h00                             1h00
Heures supplémentaires effectuées
Heures majoréesà récupérer de la              1h15                            2h30                            2h05
         1° à la 14°Heure
 De la 15ème à la 25ème heure.                1h17                            2h34                             2h07        
Elles peuvent être indemnisées à titre exceptionnel, à la demande spécifique du chef de service et quand les nécessités de service n'ont pas permis la récupération.
*Pour la liste des métiers concernés se référer à la délibération correspondante
Les heures complémentaires :
Les agents titulaires et non titulaires à temps non complet ou temps partiel de catégorie A, B et C de toutes filières, peuvent être amenés exceptionnellement à effectuer des heures complémentaires jusqu'à concurrence de 35h00 / semaine.
ARTICLE 6 - LE TEMPS PARTIEL
La Ville de Gennevilliers a fixé la durée du temps partiel à hauteur de 50%, 60%, 70%, 80% ou 90% du temps complet.
LE TEMPS PARTIEL DE DROIT
Conformément au décret n°2004-777 du 29 juillet 2004 et au décret n°2024-1263 du 30 décembre 2024, l'autorisation d'accomplir un travail à temps partiel selon les quotités de 50%, 60%, 70% ou 80%, 90% est accordée de plein droit aux fonctionnaires et agents contractuels dans les conditions suivantes :
     A l'occasion de chaque naissance jusqu'au 3ème anniversaire de l'enfant
     A l'occasion de chaque adoption jusqu'à l'expiration d'un délai de trois ans à compter de l'arrivée au foyer de l'enfant adopté.
     Pour donner des soins à son conjoint, à un enfant à charge ou à un ascendant atteint d'un handicap nécessitant la présence d'une tierce personne, ou victime d'un accident ou maladie grave ;
     Aux agents reconnus travailleurs handicapés.
Les agents à temps non complet peuvent bénéficier d'un temps partiel de droit, contrairement au temps partiel sur autorisation.
Dans les cas de temps partiel de droit, les modalités restent conjointement définies entre l'agent et la collectivité.
Les agents à temps partiel n'ont pas le droit de modifier librement la répartition de leur temps de travail dans une semaine en fonction des jours fériés qui pourraient y avoir.
Les jours fériés ne sont pas récupérables lorsqu'ils tombent un jour où l'agent ne travaille pas en raison de son temps partiel.
Le temps consacré à la formation, étant du temps de travail effectif, pourra être récupéré s'il tombe un jour où l'agent ne travaille pas en raison de son temps partiel.
Quelles sont les incidences sur la rémunération ?
Le traitement indiciaire, l'indemnité de résidence, les primes et indemnités liées au grade, à l'échelon ou à l'emploi sont versés au prorata du temps travaillé pour les agents exerçant à 50 %, 60 % ou 70 % d'un temps plein.
La rémunération est légèrement supérieure pour les agents travaillant à 80 % (payée 85,72 %) ou 90 % (payée à 91,42 %).
Le supplément familial de traitement est calculé en fonction de la quotité de traitement perçu, à l'exception du supplément familial de traitement pour un enfant, qui n'est pas proratisé. En cas de retenue pour grève et pour absence de service fait, la retenue est effectuée sur la rémunération réellement perçue, et non sur celle correspondant à un temps plein.
Quelles incidences sur les congés ?
Les agents autorisés à effectuer leurs fonctions à temps partiel, de droit ou sur autorisation, ont droit aux congés annuels au prorata de leur temps de travail.
Les agents à temps partiel n'ont pas le droit de modifier librement la répartition de leur temps de travail dans la semaine en fonction des jours fériés.
Quelles sont les incidences sur la carrière et la retraite ?
Sur la carrière :
Les périodes de travail à temps partiel sont assimilées à des périodes à temps complet pour la détermination des droits à l'avancement, promotion et à formation.
Sur la retraite :
Les périodes de service à temps partiel de droit pour élever un enfant, dans la limite de 3 ans par enfant né ou adopté à partir du 1er janvier 2004, sont prises en compte pour la totalité de leur durée pour la constitution des droits à pension. Concernant la liquidation de la pension, les périodes de travail à temps partiel de droit pour élever un enfant sont assimilées à des périodes à temps plein.
Surcotisassions :
Par dérogation au principe général, les services à temps partiel accomplis à compter du 1er janvier 2004 peuvent, dans une certaine limite, être assimilés pour le décompte à des périodes de travail à temps plein, en contrepartie du versement d'une retenue pour pension.
Cette assimilation ne peut pas augmenter la durée de service retenue pour la liquidation de la pension de plus de 4 trimestres.
Le fonctionnaire souhaitant bénéficier de l'assimilation, doit présenter une demande écrite en ce sens lors de sa demande initiale de travail à temps partiel [case « surcotisassions » à cocher sur le formulaire] ou lors de son renouvellement.
Pour les fonctionnaires handicapés dont l'incapacité permanente est au moins égale à 80 %, la prise en compte de la durée non travaillée et surcotisée peut concerner 8 trimestres et la cotisation retraite est calculée sur la base du traitement effectivement versé en fonction de la quotité de travail de l'agent.
Peut-on mettre fin à l'autorisation d'exercer ses fonctions à temps partiel à n'importe quel moment ?
Suspension :
Le fonctionnaire ou l'agent contractuel placé en congé de maternité, paternité ou d'adoption, voit l'autorisation d'effectuer un temps partiel suspendue pendant la durée du congé. L'agent est donc
rétabli dans le droit des agents à temps plein.
Réintégration à temps plein avant terme :
Réintégration à temps plein ou la modification des conditions d'exercice du temps partiel peut intervenir au cours de la période, sur demande écrite de l'agent, présentée au moins deux mois avant la date souhaitée.
La réintégration à temps plein peut intervenir sans délai en cas de motif grave, tel qu'une diminution des revenus du ménage ou un changement de situation familiale.
Réintégration à temps plein à terme :
A l'issue de la période de service à temps partiel, le fonctionnaire ou l'agent contractuel est admis à réintégrer son emploi d'origine à temps plein sur demande écrite de l'agent.
LE TEMPS PARTIEL SUR AUTORISATION
Conformément au décret n°2004-777 du 29 juillet 2004, les agents peuvent être autorisés, sur leurs demandes et sous réserve de la continuité et du fonctionnement du service et des possibilités
d'aménagement de l'organisation du travail, à bénéficier d'un service à temps partiel qui ne peut être inférieur à 50%.
Les bénéficiaires de ce temps partiel sont :
    Les agents titulaires occupant un emploi à temps complet en position d'activité ou de détachement ;
    Les agents contractuels employés en continu depuis plus d'un an à temps complet ;
    Les agents stagiaires dont la durée de stage est allongée pour correspondre à la durée effectuée par les agents à temps plein, sauf ceux dont le statut prévoit l'accomplissement d'une période de stage dans un établissement de formation ou dont le stage comporte un enseignement professionnel
    Les agents ayant pour projet de créer ou de reprendre une entreprise.
Le temps partiel ne peut être imposé, il résulte d'une demande écrite de l'agent. Il n'est pas un droit, mais est accordé selon les nécessités de service.
Ainsi, un agent pourra se voir refuser le jour ou la quotité demandée et le temps partiel pourra être accordé pour un autre jour ou une autre quotité.
Quelles sont les incidences sur la rémunération ?
Le traitement indiciaire, l'indemnité de résidence, les primes et indemnités liées au grade ou à l'emploi sont versés au prorata du temps travaillé pour les agents exerçant à 50 %, 60 % ou 70 % d'un temps plein. La rémunération est légèrement supérieure pour les agents travaillant à 80 % (payée 85,72 %) et ceux travaillant à 90 % (91,42 %).
Le supplément familial de traitement est calculé en fonction de la quotité de traitement perçu, à l'exception du supplément familial de traitement perçu pour un enfant, qui n'est pas proratisé.
En cas de retenue pour grève et pour absence de service fait, la retenue est effectuée sur la rémunération réellement perçue, et non sur celle correspondant à un temps plein.
Quelles incidences sur les congés ?
Les agents autorisés à assurer leurs fonctions à temps partiel sur autorisation, ont droit aux congés annuels au prorata de leur temps de travail.
Les agents à temps partiel n'ont pas le droit de modifier librement la répartition de leur temps de travail dans la semaine en fonction des jours fériés.
Quelles sont les incidences sur la carrière et la retraite ?
Sur la carrière :
Les périodes de travail à temps partiel sont assimilées à des périodes à temps complet pour la détermination des droits à avancement, promotion et formation.
Sur la retraite :
Les périodes de service à temps partiel sur autorisation sont prises en compte pour la totalité de leur durée pour la constitution des droits à pension. En revanche, concernant la liquidation des droits, les
périodes de service à temps partiel sur autorisation sont retenues au prorata de la quotité de travail.
Surcotisassions :
Par dérogation au principe général, les services à temps partiel accomplis à compter du 1er janvier 2004 peuvent, dans une certaine limite, être assimilés pour le décompte à des périodes de travail à temps plein, en contrepartie du versement d'une retenue pour pension. Cette assimilation ne peut pas augmenter la durée de service retenue pour la liquidation de la pension de plus de 4 trimestres.
Le fonctionnaire souhaitant bénéficier de l'assimilation, doit présenter une demande écrite en ce sens lors de sa demande initiale de travail à temps partiel [case « surcotisassions » à cocher sur le formulaire] ou lors de son renouvellement.
Peut-on mettre fin à l'autorisation d'exercer ses fonctions à temps partiel à n'importe quel moment ?
Suspension :
Le fonctionnaire ou l'agent non titulaire placé en congé de maternité, paternité ou d'adoption, voit l'autorisation d'effectuer un temps partiel suspendue pendant la durée du congé. L'agent est donc rétabli dans le droit des agents à temps plein.
Réintégration à temps plein avant terme :
La réintégration à temps plein ou la modification des conditions d'exercice du temps partiel peut intervenir au cours de la période, sur demande écrite de l'agent, présentée au moins deux mois avant la date souhaitée. La réintégration à temps plein peut intervenir sans délai en cas de motif grave, tel qu'une diminution des revenus du ménage ou un changement de situation familiale.
Réintégration à temps plein à terme :
A l'issue de la période de service à temps partiel, le fonctionnaire ou l'agent non titulaire est admis à réintégrer son emploi d'origine à temps plein sur demande écrite présentée par l'agent.
LE TEMPS PARTIEL THERAPEUTIQUE
Le mi-temps thérapeutique, accordé par le médecin traitant est fixé à 50 %, 60 %, 70 %, 80 % ou 90 % correspond à un pourcentage de la quotité de travail hebdomadaire de l'agent à temps plein sur son poste (37h, 37h30, 38h ou 39h) (Décret n° 2021-1462 du 08/11/2021 article 1 ; décret n° 87-602 du 30/07/1987 article 13-1).
L'agent a droit proportionnellement aux RTT* et aux CA (5X le nombre de jours travaillés par semaine). (Décret n° 2021-1462 du 08/11/2021 article 1er ; décret n° 87-602 du 30/07/1987 article 13-11).
L'autorisation est accordée sur la base d'un certificat médical (par le médecin traitant ou la médecine professionnelle) par période de 1 à 3 mois maximum et dans la limite d'une durée totale d'un an. Au-delà de 3 mois, une visite auprès d'un médecin agréé est obligatoire pour le renouvellement et définir la quotité de travail.
ARTICLE 7 - LA JOURNEE DE SOLIDARITE
LA JOURNEE DE SOLIDARITE PEUT ETRE ACCOMPLIE SELON 3 MODALITES
       Travail un jour férié précédemment chômé (autre que le 1er mai)
       Travail d'un jour d'A.R.T.T
       Autre modalité permettant le travail de 7h précédemment non travaillé (à l'exclusion des jours de congé annuel).
Modalités d'exercice choisi :
       7 heures supplémentaires travaillées sur l'année civile, fractionnées à raison de deux minutes par jour
       Pour tous les agents de la collectivité
       Cette journée sera proratisée en fonction du temps partiel de l'agent
*Jours d'A.R.T.T. : Se référer page 25 article 3 - Les jours d'A.R.T.T
ARTICLE 8 - LES ASTREINTES ET PERMANENCES
Pour la liste des métiers ainsi que les différentes indemnités se référer à la délibération correspondante.
L'ASTREINTE - DEFINITION
La période d'astreinte s'entend comme une période pendant laquelle l'agent, sans être à la disposition permanente et immédiate de son employeur, a l'obligation de demeurer à son domicile ou à proximité afin d'être en mesure d'intervenir pour effectuer un travail au service de l'administration.
Ce temps n'est en aucun cas assimilé à du travail effectif.
C'est pourquoi, l'article 5 du décret N°2001-623 du 12 juillet 2001 prévoit que le temps passé en astreinte soit obligatoirement rémunéré ou compensé.
En revanche, le travail effectué pendant cette astreinte, à savoir « l'intervention » ainsi que le « temps de trajet » sont comptabilisés comme du temps de travail effectif.
Ces dispositions sont applicables aux agents titulaires, stagiaires et contractuels de droit public quel que soit leur cadre d'emplois, selon des modalités différentes selon que les agents relèvent de la filière technique ou des autres filières.
Sont exclus de ce dispositif les agents qui bénéficient d'une concession de logement par nécessité absolue de service ou d'une NBI au titre de l'exercice de fonctions de responsabilité supérieure (emplois fonctionnels).
Bien que la règlementation ne prévoie pas de limite au nombre maximal d'astreinte à effectuer par agent dans l'année, l'attention des services est appelée sur la fréquence du recours aux astreintes et les abus éventuels constatés, consistant à placer de façon trop importante un salarié en position d'astreinte.
Aussi, en vertu du principe de parité il est recommandé qu'un agent n'assure pas plus de 14 semaines d'astreintes par année civile.
Il convient de distinguer les astreintes pour la filière technique (régime spécifique) et les astreintes pour les agents relevant des autres filières (régime de droit commun).
Les astreintes dans la filière technique:
Il existe trois sortes d'astreintes pour la filière technique. A chacune correspond un barème d'indemnités.
Le temps d'intervention (intervention et temps de trajet) peut être indemnisé ou donner lieu à un repos compensateur.
     L'astreinte d'exploitation : elle concerne la situation des agents tenus, pour des raisons de nécessité de service, de demeurer à leur domicile ou à proximité, afin d'être en mesure d'intervenir dans le cadre d'activités particulières (déneigement, intervention sur dysfonctionnement technique …)
     L'astreinte de décision : elle concerne la situation du personnel d'encadrement pouvant être joint directement par l'autorité territoriale, en dehors des heures d'activité normales du service, afin de prendre les mesures et les dispositions nécessaires.
     L'astreinte de sécurité : elle concerne des agents appelés à participer à un plan d'intervention dans le cas d'un besoin en renforcement en moyens humains faisant suite à un évènement soudain ou imprévu (situation de crise, inondations, fortes tempêtes …)
Les astreintes ne sont pas cumulables entre elles pour la même période
Les astreintes dans les autres filières
    Il n'existe qu'une sorte d'astreinte pour les agents des filières autres que techniques : dite de sécurité.
    Les périodes d'astreinte doivent être indemnisées.
    Le temps d'intervention (intervention et temps de trajet) peut être indemnisé ou donné lieu à un repos compensateur.
LA PERMANENCE:
La permanence correspond à l'obligation faite à un agent de se trouver sur son lieu de travail habituel, ou un lieu désigné par son chef de service, pour nécessité de service, un samedi, un dimanche ou lors d'un jour férié.
Ces dispositions sont applicables aux agents titulaires, stagiaires et contractuels de droit public quel que soit leur cadre d'emploi, selon des modalités différentes pour les agents relevant de la filière technique et des autres filières.
Une période de permanence peut être indemnisée ou compensée pour les agents des filières autres que techniques. Elle ne peut qu'être indemnisée pour les agents de la filière technique.
Sont exclus de ce dispositif les agents logés et les agents qui bénéficient d'une NBI pour l'exercice de fonctions responsabilité supérieure.
ARTICLE 9 - LES SUJETIONS PARTICULIERES
DEFINITION:
Dans le cadre de cette nouvelle réforme du temps de travail, la collectivité de Gennevilliers est amenée à tenir compte de certaines sujétions particulières.
En effet, le temps de travail des agents concernés nécessite de déroger à la durée légale annuelle de 1607 heures du fait qu'ils peuvent etre amenés à travailler, de manière régulière et planifiée, les dimanches ou les jours fériés ou sur des horaires de nuit, soit en début de nuit, soit en début de  matinée et que cela pourrait un impact sur leur santé ou vie personnelle.
Il est donc décidé de prendre en compte uniquement deux sujétions particulières liées aux cyles de travail à compter du 1er janvier 2022 :
      Travail de nuit
      Travail des dimanches et jours fériés
LE TRAVAIL DE NUIT:
Il est décidé de prendre en compte le temps de travail de nuit annuel réalisé de manière régulière et planifiée, en raison de son caractère atypique et pénible et d'accorder des jours de compensation selon le bareme ci-dessous :
      Entre 21 heures annuelles de nuit et 55 heures annuelles de nuit = 1 jour de compensation
      Entre 56 heures annuelles de nuit et 100 heures annuelles de nuit = 2 jours de compensation
      Entre 101 heures annuelles de nuit et 150 heures annuelles de nuit = 2.5 jours de compensation
      Entre 151 heures annuelle de nuit et 225 heures annuelles de nuit = 3 jours de compensation
      Entre 226 heures annuelles de nuit et 286 heures annuelles de nuit = 3.5 jours de compensation
      Au-delà de 287 heures annuelles de nuit = 4 jours de compensation
LE TRAVAIL DU DIMANCHE ET JOURS FERIES:
Il est décidé de prendre en compte le nombre de dimanches et jours fériés travaillés annuellement de manière régulière et planifiée, en raison de son impact sur la vie personnelle et d'accorder des jours de compensation selon le bareme ci-dessous :
      Toute heure travaillée un dimanche ou un jour férié = vaut pour 1 journée entière travaillée
      Les modalités de compensation s'appliquent à partir d'un minimum de 10 dimanches travaillés ou jours fériés travaillés
      Entre 10 dimanches / jours fériés et 19 dimanches / jours fériés travaillés = 1 jour de compensation soit 7h
      Entre 20 dimanches / jours fériés et 29 dimanches / jours fériés travaillés = 2 jours de compensation soit 14h
      Entre 30 dimanches / jours fériés et 39 dimanches / jours fériés travaillés = 3 jours de compensation soit 21h
      40 dimanches / jours fériés travaillés et plus = 4 jours de compensation soit 28h
Les jours de compensation seront décomptés si l'agent ne réalise pas les jours pour lesquels il bénéficie de ces compensations.
Le calcul est basé sur le même principe que le décompte des jours de A.R.T.T en cas d'absence.
                `.trim(),2:`
CHAPITRE 2 - LES CONGES
ARTICLE 1 : LES CONGES ANNUELS
Les congés annuels à Gennevilliers sont de 25 jours ouvrés sur une base de 5 jours de travail hebdomadaire.
Les congés annuels sont calculés en fonction des obligations hebdomadaires et multipliés par 5.
5 jours travaillés/semaine: 25 C.A
4.5 jours travaillés/semaine: 22.5 C.A
4 jours travaillés/semaine: 20 C.A
3.5 jours travaillés/semaine: 17.5 C.A
3 jours travaillés/semaine: 15 C.A 
2.5 jours travaillés/semaine: 12.5 C.A
Les agents contractuels non permanents travaillant dans le cadre d'un contrat à durée déterminée doivent prendre leurs congés pendant la durée de leur contrat et non sur l'année civile avec les mêmes délais de prévenance que les autres agents permanents. Dans le cas d'une démission ou d'un licenciement en cours de contrat, les congés feront l'objet d'une proratisation et devront être pris avant la date effective de départ.
Il est rappelé que les droits à congé sont calculés au prorata du temps de présence.
Les agents arrivés ou partant en cours d'année exercent leur droit au prorata de leur temps de présence au travail.
LES MODALITES GENERALES
Modalités de prise des jours de CA
De manière générale, les congés annuels doivent être pris avant le 31 décembre de l'année en cours.
Ils peuvent être posé en ½ journée ou journée complète.
La demande de congés
La demande de congés est formulée par l'agent sur la fiche commune à l'ensemble des services (à télécharger sur Intranet). Les Directeurs sont responsables des modalités de gestion et de planification des congés des agents de leur direction.
Les délais minimums de demande de congé
Pour les congés dits estivaux
(mi-juin/mi-septembre) ils doivent être planifiés pour le 1er mars au plus tard, au sein de chaque service (ou direction) ; lorsque des agents n'ont pas posé leurs congés estivaux dans les délais impartis, l'octroi de leur congé s'effectuera en fonction des possibilités restantes répondant aux besoins du service.
1er mars - date limite de dépôt des congé s dits estivaux
Juin - Septembre: Période des congés dits estivaux
Pour les congés hors période dite estivale
Entre 5 et 10 jours ouvrés, ils sont posés au moins un mois avant le début du congé.
Pour les congés inférieurs à 5 jours ouvrés
Ils sont posés au minimum 15 jours avant la prise de congés.
Pour 1 journée de congé
Le délai est fixé à 5 jours ouvrés avant la prise.
Pour une situation exceptionnelle la hiérarchie pourra considérer les demandes ne respectantpas ces délais.
Les délais maximums de réponse de la hiérarchie :
Courent à compter de la date de dépôt du formulaire de demande :
Pour les congés dits estivaux
La réponse devra être donnée au plus tard le 15 mars (ou jour ouvré le plus proche).
Pour les congés hors période dite estivale
La réponse devra être donnée dans les 15 jours ouvrables suivant la demande.
Pour les congés inférieurs à 5 jours ouvrés
La réponse devra être donnée dans les 3 jours ouvrables suivant la demande.
Pour 1 journée
La réponse devra être donnée au plus tard sous 48 heures ouvrées.
Tout refus ou report de congé doit être motivé et argumenté par écrit puis notifié à l'agent par la hiérarchie dans les délais fixés ci-dessus.
L'agent qui s'absente sans attendre l'autorisation formelle ou malgré un refus se place en absence injustifiée. Une retenue sur salaire sera appliquée.
Aucun agent ne peut être placé d'office en congé annuel sans en avoir fait la demande.
L'original de la fiche de congé reste, pendant la période annuelle de travail concernée, au sein du service pour la gestion du suivi, un double étant établi et remis à l'agent s'il le souhaite à chaque demande de congés.
En cas de préavis de grève, les demandes d'autorisation d'absence sont accordées sous réserve des nécessités de service et en conformité avec les délais posés par le présent règlement. Compte tenu du risque de sous-effectif le jour de ces mobilisations, ces demandes seront examinées avec une vigilance particulière.
REGLES D'ATTRIBUTION DES CONGES ANNUELS
Le droit à congé annuel s'exerce sous réserve des nécessités du service public. Ce sont les responsables de service qui en assurent la gestion sous la responsabilité des Directeurs auxquels ils sont rattachés.
En cas de désaccord avec le responsable de service, l'agent peut saisir le directeur et si le désaccord persiste, la Direction des Ressources Humaines pour avis et vérification de l'application des règles et droits des congés.
Lorsque plusieurs agents demandent la même période et que les nécessités du service ne permettent pas de leur attribuer en même temps, une priorité est donnée aux agents :
       Ayant des charges de famille, uniquement en période de vacances scolaires ;
       Dont l'entreprise des conjoints (es) ferme un mois déterminé et place obligatoirement en congé ses salariés ce mois-là ;
       En situation de garde d'enfants partagée ou alternée ;
       Les parents d'enfants gravement handicapés - titulaires d'une carte d'invalidité quel que soit l'âge des enfants, à condition que l'établissement spécialisé auquel l'enfant a été confié, impose aux parents de le reprendre pendant ces vacances.
Ces critères de priorité doivent être justifiés.
Dans le cas où des agents d'une même unité de travail seraient confrontés aux mêmes contraintes, chacun d'entre eux bénéficiera par roulement de cette priorité.
La durée maximum autorisée d'absence lors des congés est de 31 jours consécutifs ; le décompte s'effectue à partir du 1er jour de cessation d'activité. Cette règle s'applique quelle que soit la situation des agents à temps complet, temps non complet, temps partiel...
N.B : le terme de conjoint est utilisé génériquement pour les mariages civils, les PACS et l'union libre (justificatifs nécessaires).
DEROGATION DE LA REGLE DES 31 JOURS
Les agents sont autorisés pour se rendre dans leur pays d'origine (hors U.E) ou pour accompagner leur conjoint se rendant dans leur pays d'origine, à cumuler des congés sur 2 années.
La demande de report de congé pour ce motif, accompagnée des justificatifs1, devra être faite par écrit au cours de l'année où les congés ne seront pas pris (soit en partie ou en totalité) et adressée à
la Direction des Ressources Humaines. En aucun cas, l'agent travaillant à temps complet ne pourra dépasser l'autorisation du double de CA auquel il a le droit au regard de ses obligation hebdomadaire
(ex : semaine de 4 jours de travail = 20*2 soit 40 CA).
Dans ce cas, l'agent qui réserve le maximum de congés annuels doit prendre les A.R.T.T dans les mêmes conditions que les autres agents.
S'agissant des jours de CET, ils peuvent être pris en étant accolés à des jours de congés annuels et dépasser 31 jours consécutifs.
Compte tenu de la mise en place du CET, les congés annuels doivent désormais être impérativement pris au plus tard le dernier jour des congés scolaires de Noël, sauf cas de report indiqué ci-dessous.
LES REPORTS
En principe, les congés non pris au 31 décembre sont perdus et ne peuvent pas être reportés sur l'année suivante. Néanmoins, si l'agent n'a pas pu prendre tout ou partie de ses congés annuels en raison d'une absence prolongée pour raison de santé (MO, AT, CLM, CLD, CGM) les congés annuels non pris sont automatiquement reportés dans la limite de 4 semaines de congés sur une période de 15 mois maximum après l'année de référence (arrêt du Conseil d'Etat CE26.04.2017 conformément aux dispositions de l'article 7 de la directive européenne 2003/88/CE).
A titre exceptionnel et uniquement pour les congés annuels, une dérogation peut être accordée par le chef de service s/c du directeur, aux agents qui sont en congé de maternité, afin de reporter le reliquat de congés de l'année N à l'année N+1, à l'issue d'un congé maternité ou de couches pathologiques. Les congés annuels qui seront reportés ne donnent lieu à aucune bonification pour fractionnement.
A titre exceptionnel et uniquement pour les congés annuels un report au 31 Janvier n+1 peut être accordé sous réserve de nécessité ou contrainte de service.
CONGES NON PRIS DU FAIT DE CONGES POUR INDISPONIBILITE PHYSIQUE
En cas d'arrêt de travail pour maladie survenu pendant un congé annuel, l'agent a le droit de récupérer ultérieurement la période de congé non-utilisée d'une durée équivalente à celle de sa maladie.
Aucune disposition législative ou réglementaire n'oblige l'agent à reprendre ses fonctions après un congé de maladie pour pouvoir bénéficier du reliquat de congé annuel.
Elle pourra être prise soit immédiatement à la suite du congé maladie soit à une période ultérieure sous réserve de l'accord préalable du responsable hiérarchique.
Un fonctionnaire et un agent contractuel en CDI, ayant acquis des congés annuels durant une année mais qui n'aurait pas pu en bénéficier du fait d'un congé maladie peut en retrouver l'usage à l'issue
de ce congé y compris si ce dernier se termine une autre année que l'année d'acquisition de ses congés annuels. Justificatifs : acte de naissance de l'agent, conjoint et parents ou double nationalité de l'agent ou conjoint.
CONGES ANNUELS, TEMPS PARTIEL ET TEMPS PARTIEL THERAPEUTIQUE
L'agent autorisé à effectuer son travail à temps partiel ou encore à temps partiel thérapeutique bénéficie à ce titre de congés annuels.
Ces congés annuels seront calculés sur ces obligations de travail hebdomadaire [voir Article 1 : Les congés annuels]
LES JOURS DE FRACTIONNEMENT
Seuls, les congés annuels effectivement pris entre le 1er janvier et le 30 avril et le 1er novembre et le 31 décembre de chaque année ouvrent droit à une bonification :
    1 jour de congé supplémentaire pour 5 à 7 jours de congés annuels (consécutifs ou non) pris pendant ces périodes
Ou
    2 jours supplémentaires pour 8 jours et plus de congés annuels (consécutifs ou non) pris pendant ces périodes.
En résumé, le cumul des congés pris durant ces périodes donne droit à la bonification.
Cette bonification est fixée à 2 jours de congé maximum par année civile à prendre avant le 31 décembre. Elle est accordée à partir du moment où les conditions sont remplies pour l'obtenir.
EXERCICE D'UNE ACTIVITE PENDANT LES CONGES
La règlementation relative au cumul d'activités des agents publics s'applique en période de congés annuels, du fait du maintien en position d'activité pendant cette période.
L'exercice d'une activité accessoire pendant les vacances suppose une demande et un accord préalable (exemple : animation d'une colonie de vacances, vendanges, etc.)
ARTICLE 2 - LE CONGE BONIFIE
Les fonctionnaires municipaux titulaires dont le centre des intérêts moraux et matériels se trouve dans un département ou une collectivité unique d'outre-mer ont droit aux congés bonifiés.
Il s'agit d'un congé annuel pour les fonctionnaires originaires de Guadeloupe, Martinique, Guyane,Réunion, Saint Pierre et Miquelon, Mayotte, Saint Barthélémy, Saint Martin et qui exercent en métropole.
Le congé bonifié est octroyé tous les 2 ans sous réserve d'en remplir les conditions. Le congé bonifié ne peut pas dépasser 31 jours calendaire consécutifs maximum à compter du 1er jour d'absence.
La demande de congé bonifié est à adresser au Maire, au plus tard le 28 février de l'année ouvrant droit à ces congés pour permettre l'étude des droits par la Direction des Ressources Humaines. Si les conditions légales sont remplies, le congé est accordé en fonction des nécessités du service. La Ville et ses établissements publics se réservent le droit de négocier les dates de départ et de retour en fonction des tarifs et des disponibilités des compagnies aériennes.
Les conditions d'ouverture des droits sont définies par le décret n°2020-851 du 2 juillet 2020.
Depuis le 5 juillet 2020, il n'y a plus de bonification mais des dispositions transitoires ont été prévues.
En effet, les fonctionnaires qui remplissent les conditions depuis le 5 juillet 2020 peuvent opter :
      Soit pour le bénéfice d'un dernier congé bonifié dans les conditions fixées par l'ancien dispositif dans un délai de 12 mois à compter de l'ouverture du droit (option 1)
      Soit pour l'application immédiate du nouveau dispositif (option 2)
ARTICLE 3 - LES JOURS D'A.R.T.T
Les jours de réduction du temps de travail, dits jours de A.R.T.T, constituent une compensation, sous la forme de jours de repos, à un mode d'organisation du temps de travail fixant une durée hebdomadaire de travail supérieure à 35 heures hebdomadaires toute l'année.
Ils sont générés par le travail accompli au-delà de la durée légale de travail dans la limite des plafonds fixés pour chaque cycle de travail.
Les A.R.T.T peuvent bénéficier à l'ensemble des agents répondant aux conditions d'octroi, à l'exception des agents nommés sur des postes à temps non complets qui ne génèrent quant à eux pas de jours de A.R.T.T.
Pour les agents exerçant leurs fonctions à temps partiel, le nombre de jours de A.R.T.T est proratisé à hauteur de leur quotité de travail, sur la base des droits ouverts pour un agent à temps complet soumis au même régime de temps de travail.
Pour faciliter la gestion des jours d'absence, le nombre est arrondi à la demi-journée supérieure. Le tableau ci-après précise les types d'absences qui génèrent ou non pendant cette période des droits au titre de la A.R.T.T.
LA GESTION DES A.R.T.T
Néanmoins les demandes d'absences A.R.T.T et leur planification sont soumises aux mêmes conditions que les jours de congés annuels, par journée ou demi- journée, sur les journées normalement travaillées par l'agent et avant ou après des jours de congés annuels ainsi qu'entre deux périodes de congés annuels.
Les jours A.R.T.T sont à prendre au cours de l'année civile et jusqu'au 31 Décembre. (les A.R.T.T du mois de décembre seront anticipés).
Les jours de A.R.T.T non pris sur l'année peuvent être versés sur le compte épargne temps selon les règles définies, sinon ils seront considérés comme perdus.
Les agents contractuels sur emplois saisonniers bénéficiant de A.R.T.T doivent impérativement les poser avant l'issue de leur contrat. A défaut, ils seront perdus.
Les jours de A.R.T.T ne peuvent pas faire l'objet d'une indemnisation financière au terme d'un contrat
d'engagement.
Les jours A.R.T.T attribués en compensation du dépassement de la durée annuelle de travail de 1607 heures le sont au regard de la durée hebdomadaire de travail pour les cycles hebdomadaires et en fonction du temps de travail de l'agent (temps plein ou partiel), comme suit, soit avec arrondi à la demi-journée supérieure :
Durée hebdomadaire de travail                      37 h               37,5 h                  38 h                   39 h
NB de Jours A.R.T.T pour un agent à temps complet  12 jours           15 jours                18 jours               23 jours
Temps partiel 90 % (Temps annuel)                  11 jours           13,5 jours              16 jours               21 jours
Temps partiel 80 %                                 10 jours           12 jours                14,5 jours             18,5 jours
Temps partiel 70 %                                 8,5 jours          10,5 jours              13 jours               16 jours
Temps partiel 60 %                                 7,5 jours          9 jours                 11 jours               14 jours
Temps partiel 50 %                                 6 jours            7,5 jours               9 jours                11,5 jours
LES DISPOSITIONS SPECIFIQUES LIEES AU MODE DE DECOMPTE DES A.R.T.T
Les jours non travaillés n'ont pas vocation à être considérés comme du temps de travail effectif et par voie de conséquence, n'ouvrent pas droit à des jours de réduction du temps de travail.
Les absences au titre des congés pour raison de santé réduisent proportionnellement le nombre de jours de A.R.T.T que l'agent peut acquérir, conformément aux préconisations de la circulaire du 18 janvier 2012 relative aux modalités de mise en œuvre de l'article 115 de la loi n°2010-1657 du 29 décembre 2010 de finances pour 2011.
Cette règle s'applique également aux agents exerçant leurs fonctions à temps partiel au prorata de leur quotité de travail.
Ces motifs d'absence réduisent à due proportion le nombre de jours de A.R.T.T acquis annuellement pour les agents qui se sont absentés.
Un quotient de réduction du nombre de jours de A.R.T.T est calculé de la manière suivante, arrondi à la journée supérieure :
Q = Nombre de jours travaillés par an / Nombre de jours de A.R.T.T attribués annuellement
Dès lors, pour un agent qui, en cours d'année, atteint en une seule fois ou cumulativement, un nombre
de jours d'absence pour raisons de santé égal à Q, il convient d'amputer son crédit annuel de jours
A.R.T.T d'une journée » où Q est le « quotient de réduction » déterminé de la manière suivante : Q = N1 (nombre de jours ouvrables en régime hebdomadaire soit 228 jours (365 – 104 jours de week-end – 25 jours de congés payés – 8 jours fériés) / N2 (nombre de jours maximum de RTT générés en régime hebdomadaire).
Exemple : un agent soumis à un régime hebdomadaire à 38h sur 5 jours, bénéficie de 18 A.R.T.T.
       Cycles de                         Calcul effectué                                   Quotient a appliqué
        travail
       37 heures                         228/12 A.R.T.T= 19                      1 jour déduit pour 19 jours d'absences
       37,5 heures                      228/15 A.R.T.T= 15.2                            1 jour déduit pour 15,5 jours d'absences
       38 heures                       228/18 A.R.T.T= 12 ,66                    1 jour déduit pour 13 jours d'absences
       39 heures                        228/23 A.R.T.T= 9.91                     1 jour déduit pour 10 jours d'absences
Pour les agents à temps partiel, le calcul de N1 et N2 est proratisé en fonction de leur quotité de travail.
Le décompte des jours de A.R.T.T à retrancher du crédit de A.R.T.T annuels de l'agent est réalisé au fur et à mesure, dès que l'agent est placé en congés de maladie et que le nombre de jours de congés
atteint « Q ». Aucune disposition législative ou réglementaire ne permet le report du nombre de jours A.R.T.T non pris sur l'année N+1 suite à un congé pour raisons de santé.
Lorsque l'agent atteint, au cours de l'année, cumulativement, un nombre de jours d'absence égal au quotient de réduction, une journée de A.R.T.T est déduite de son crédit annuel de jours de A.R.T.T.
La déduction de A.R.T.T sera calculée à la journée.
Les jours de A.R.T.T ainsi déduits du capital annuel à la suite d'un congé pour raisons de santé sont défalqués au fur et à mesure sur la période de référence. Dans le cas où le nombre de jours de A.R.T.T à déduire est supérieur au droit de l'agent, la déduction peut s'effectuer sur les droits de la période suivante.
MODALITES DE PRISE DES JOURS DE A.R.T.T
50% des Jours de A.R.T.T devront être pris au 15/09/N de chaque année :
       Cycle de 37h00 : 6 Jours de A.R.T.T (sur 12)
       Cycle de 37h30 : 7,5 Jours de A.R.T.T (sur 15)
       Cycle de 38h00 : 9 Jours de A.R.T.T (sur 18)
       Cycle de 39h00 : 11,5 Jours de A.R.T.T (sur 23)
ARTICLE 4 - LES DONS DE JOURS DE REPOS
À UN AGENT D'UN ENFANT GRAVEMENT MALADE OU AIDANT FAMILIAL
Un agent peut sur sa demande renoncer anonymement et sans contrepartie, à tout ou partie de ses jours de RTT non pris et de jours de congés annuels dans la limite de 5 jours par an, au bénéfice d'un autre agent public relevant du même employeur, qui :
      Assume la charge d'un enfant âgé de moins de vingt ans atteint d'une maladie, d'un handicap ou victime d'un accident d'une particulière gravité rendant indispensables une présence soutenue et des soins contraignants ;
      Vient en aide à une personne atteinte d'une perte d'autonomie d'une particulière gravité ou présentant un handicap, lorsque cette personne est, pour le bénéficiaire du don, l'une de celles mentionnées aux 1° à 9° de l'article L. 3142-16 du codedu travail.
Le don de jours non épargnés sur un compte épargne-temps peut être fait jusqu'au 31 décembre de l'année au titre de laquelle les jours de repos sont acquis.
L'agent qui souhaite bénéficier d'un don de jours de repos formule sa demande par écrit auprès de l'autorité territoriale. Cette demande est accompagnée d'un certificat médical détaillé remis sous pli confidentiel établi par le médecin qui suit l'enfant ou l'adulte et attestant la particulière gravité de la maladie, du handicap ou de l'accident rendant indispensable une présence soutenue et des soins contraignants auprès de l'enfant ou de l'adulte.
L'agent qui donne un ou plusieurs jours de repos signifie par écrit à son responsable, le don et le nombre de jours afférents. Le don est définitif après accord du chef de service.
L'autorité territoriale dispose de 15 jours ouvrables pour informer l'agent bénéficiaire du don de jours de repos.
L'absence du service des agents publics bénéficiaires d'un don de jours de repos ne peut excéder 31jours consécutifs.
ARTICLE 5 - LE COMPTE EPARGNE TEMPS
DEFINITION
Le compte épargne-temps (C.E.T) permet de conserver des jours de congés annuels ou d' A.R.T.T non pris sur plusieurs années. Il est ouvert à la demande de l'agent qui est informé annuellement des droits épargnés et consommés.
Les jours épargnés peuvent être, en tout ou partie, utilisés sous forme de congés ou, si une délibération le prévoit, indemnisés ou pris en compte pour la retraite complémentaire.
Agent Bénéficiaires
Fonctionnaire titulaire ou contractuel
Vous pouvez demander l'ouverture d'un compte épargne temps (CET), que vous occupiez un emploi à temps complet ou non complet, si vous remplissez toutes les conditions suivantes :
      Être employé de manière continue
       Avoir accompli au moins 1 an de service
       Ne pas être soumis à des obligations de service fixées par le statut particulier
Agents Exclus
Les Fonctionnaires Stagiaires
Si avant d'être nommé stagiaire, un agent avait un CET, en tant que fonctionnaire titulaire ou contractuel, il ne peut pas utiliser les jours épargnés, ni en accumuler de nouveaux, pendant son stage.
À la titularisation, il pourra de nouveau utiliser les jours épargnés sur son CET et en épargner de nouveaux.
OUVERTURE ET ALIMENTATION
Demande d'ouverture ou d'alimentation du CET doit être faite par le biais des formulaires prévus à cet effet (à télécharger sur l'intranet).
Alimentation (Nombre de jours maxi) :
       Jours de congés annuels* :5 J
       Jours de fractionnement : 2 J
       Jour de A.R.T.T
*L'agent doit obligatoirement avoir pris au minimum 20 jours de congés annuels dans l'année en cours
ARTICLE 6 - LES CONGES LIES AUX NAISSANCES
CONGE MATERNITE
La constatation médicale de grossesse doit être effectuée par un médecin ou par une sage-femme.
Une déclaration de grossesse doit être adressée avant le 4e mois :
  Au service GCR pour les fonctionnaires et les stagiaires ;
  à la caisse de sécurité sociale pour les agents relevant du régime général ainsi qu'au service GCR.
La constatation de grossesse doit être effectuée avant la fin du troisième mois et déclarée à l'autorité territoriale avant la fin du 4ème mois.
DUREE
     NB de naissance         Rang de l'enfant                                  Durée en semaines
                                                           Prénatal               Postnatal                      Total                              
                                 1 ou 2ème                     6                       10                          16
              1
                                3ème ou plus                8 ou 10*                18 ou 16*                      26
         Jumeaux                                           12 ou 16**               22 ou 18**                     34
      Triplés ou plus                                          24                      22                          36
*La période prénatale du congé peut être portée à 10 semaines ; dans ce cas la période postnatale est de 16 semaines.
** La période prénatale du congé peut être augmentée de 4 semaines au maximum ; la période postnatale est alors réduite d'autant.
CONGES SUPPLEMENTAIRES LIES A LA SANTE DE LA MERE
Sur prescription médicale, le congé de maternité peut être augmenté :
  De 2 semaines, avant la date présumée de l'accouchement, pour grossesse pathologique ;
  De 4 semaines, après l'accouchement, en cas d'arrêt de travail nécessité par les suites de couches (couches pathologiques)
LA REMUNERATION
La rémunération de l'agent est versée à plein traitement.
En cas de travail à temps partiel, l'agent est rétabli à temps plein pour les droits à rémunération et à congés annuels.
CONGE PATERNITE
Après la naissance d'un enfant, le père ou la personne vivant en couple avec la mère : mariage, pacs ou concubinage (union libre) peut bénéficier d'un congé de paternité et d'accueil de l'enfant. Le bénéficiaire du congé peut être fonctionnaire (stagiaire ou titulaire) ou contractuel. La durée du congé varie selon qu'il s'agit d'une naissance unique ou multiple.
Durée du congé :
     Naissance d'un enfant : 25 jours calendaires
     Naissances multiples : 32 jours calendaires
Sur ces 25 ou 32 jours calendaires, 4 doivent obligatoirement être pris consécutivement et immédiatement après le congé de naissance de 3 jours.
Les agents peuvent choisir de prendre la période restante de 21 ou 28 jours calendaires de manière continue ou fractionnée en 2 périodes maximum d'au moins 5 jours chacune.
Ces 21 ou 28 jours doivent être pris dans les 6 mois suivant la naissance.
HOSPITALISATION DE L'ENFANT APRES LA NAISSANCE
Quand l'état de santé de l'enfant nécessite son hospitalisation immédiate après la naissance, une période supplémentaire de congé est accordée durant l'hospitalisation.
La période de congé de 4 jours consécutifs peut être prolongée, pendant la durée de l'hospitalisation, dans la limite de 30 jours consécutifs.
La période de 21 jours calendaires doit alors être prise dans les 6 mois suivant la fin de l'hospitalisation.
L'agent doit en faire la demande. L'administration ne peut pas refuser cette prolongation.
Demande de congé de paternité ou d'accueil de l'enfant (formulaire accessible sur Intranet).`.trim(),3:`
CHAPITRE 3 - AUTORISATIONS SPECIALE D'ABSENCES
Le congé annuel ne peut pas être interrompu par une autorisation d'absence, dans la mesure où celle- ci n'est accordée que pour permettre à un agent, qui aurait dû être présent pour assurer ses fonctions de s'absenter exceptionnellement de son service. Ces autorisations ne sont pas récupérables.
ARTICLE 1 - FETES RELIGIEUSES
Conformément aux dispositions réglementaires, les agents membre de la communauté arménienne, ou de confession religieuse bouddhiste, juive, musulmane, orthodoxe sont autorisés de manière prioritaire et sous réserve des nécessités de service, à poser une journée de congés. Les calendriers religieux sont rappelés annuellement par circulaire préfectorale.
FETES JUIVES
  Roch Hacha na (Jour de l'an)
  Yom Kippour (Grand pardon)
FETES MUSULMANES
  Al Mawlid Annabi
  Aïd El Fitr
  Aïd El Adha
Les dates pour certaines de ces fêtes étant fixées à un jour près, les autorisations d'absences pourront être accordées sur demande de l'agent avec un décalage d'un jour en plus ou en moins.
ARTICLE 2 - POUR GARDE D'ENFANT MALADE
Ces autorisations d'absence sont accordées pour soigner un enfant malade ou pour en assurer momentanément la garde sous réserve de nécessité de service et sur présentation d'un justificatif uniquement lorsque la situation résulte d'une cause imprévue.
Exemple : enfant malade ou nourrice malade, crèche ou école de l'enfant fermée.
Néanmoins, lorsqu'un mouvement de grève engendre un problème de garde, la ville accepte la pose d'une journée de garde d'enfant.
Ex : Ecole fermée pour grève.
L'agent qui accompagne son enfant à une consultation médicale prévue ne peut bénéficier d'autorisation de garde d'enfant (sauf pour les maladies graves ou handicaps).
Ces autorisations d'absence sont accordées à la famille jusqu'aux 16 ans de l'enfant (sans limite d'âge pour les enfants handicapés), quel que soit le nombre d'enfants.
DUREE DE DROIT COMMUN
Pour les agents travaillant à temps complet :
1 fois les obligations hebdomadaires de services + 1 jour soit 6 jours
Pour les agents travaillant à temps partiel :
1 fois les obligations hebdomadaires de services + 1 jour /quotité de travail de l'intéressé.
Exemple : Agent travaillant à 60% : (5+1) /100*60= 3.6 soit 4 jours
Ces jours peuvent être pris de manières fractionnées ou en continue en fonction de la situation et du besoin de l'agent.
Cas particuliers :
Doublement de la durée de droit commun pour (sur justificatif) :
  L'agent assumant seul la charge d'un enfant
  Le conjoint est à la recherche d'un emploi
  Le conjoint ne bénéficie d'aucune autorisation d'absence rémunérée.
L'agent, dont le conjoint bénéficie d'un nombre d'autorisations rémunérées inférieur au sien, peut obtenir la différence en supplément.
Exemple : Agent à temps complet dont le conjoint ne peut bénéficier que de 3 jours dans son emploi aura droit à 6+3=9 jours.
Le fait que le conjoint soit au foyer ne réduit pas le nombre de jours minimum d'autorisation d'absence.
L'agent peut bénéficier de 6 jours.
La demande peut être formulée a posteriori par écrit et sur présentation des justificatifs, l'agent doit cependant impérativement prévenir son responsable hiérarchique pour demander l'autorisation de s'absenter.
Dans le cas où ces autorisations ne seraient pas attribuées de manière fractionnée, leur durée totale peut être portée à 8 jours consécutifs (samedi et dimanche inclus) dans le 1er cas et 15 jours consécutifs dans le second.
Le décompte des jours octroyés se fait sur l'année civile sans report.
La première demande d'autorisation d'absence pour garde d'enfant doit faire l'objet de la présentation d'une attestation de l'employeur du conjoint précisant si celui-ci bénéficie de ces autorisations et leur durée. Dans l'hypothèse où les deux conjoints sont employés municipaux, ils doivent respectivement informer leurs responsables de service de la solution choisie : 6 jours chacun ou 12 jours à un seul des parents, ou toute autre formule souhaitée dans le cadre des 12 jours.
La Direction des Ressources Humaines (Service GCR) centralise les autorisations d'absence pour garde d'enfants qui doivent être demandées par l'agent à son Responsable de service, qui la transmet ensuite à la GCR (Cf. courrier du 13 janvier 2003). L'agent fait sa demande par le biais du formulaire disponible sur l'intranet.
Lorsqu'un agent arrive dans la collectivité en cours d'année, il bénéficie de la totalité des autorisations d'absence « garde d'enfant ». Il n'est pas possible de les proratiser en fonction de la date d'arrivée de l'agent dans la collectivité.
Pour des raisons de sécurité et de responsabilité de la collectivité, le personnel n'est pas autorisé à venir avec ses enfants sur le lieu de travail en cas de difficulté de garde.
ARTICLE 3 - POUR PRODIGUER DES SOINS OU ASSISTER UN MALADE
Au 1 janvier 2022, les agents municipaux sont autorisés, sur présentation d'un certificat médical précisant la nécessité absolue de leur présence auprès du malade, à s'absenter pendant :
Conjoint : 5 jours ouvrés
Père, mère : 5 jours ouvrés
Enfant à charge de + 16 ans : 5 jours ouvrés
Ascendants (Agent ou conjoint), frère, sœur, oncle, tante, neveu, nièce, beau-frère, belle-sœur : 3
jours ouvrés
Ces jours ne sont pas nécessairement consécutifs mais doivent faire l'objet d'une programmation.
Pour les autres membres de la famille, l'agent peut déposer une demande de congés annuels ou A.R.T.T.
ARTICLE 4 - POUR ACCOMPAGNER UNE PERSONNE EN FIN DE VIE : CONGE PROCHE AIDANT
Dans certaines situations de dépendance d'un proche, les agents peuvent être amenés à solliciter un congé proche aidant. Il s'agit d'un congé non rémunéré permettant à l'agent bénéficiaire de cesser totalement son activité lorsqu'un ascendant, un descendant, un frère, une sœur, une personne partageant le même domicile (liste des personnes à l'article L. 3142-16 du code du travail) ou l'ayant désigné comme sa personne de confiance au sens de l'article L. 1111-6 (*) du code de la santé publique, souffre d'une pathologie mettant en jeu le pronostic vital ou est en phase avancée ou terminale d'une affection grave et incurable, quelle qu'en soit la cause.
Le congé proche aidant est accordé, sur demande écrite de l'agent (congé non rémunéré) :
Pour une période continue d'une durée maximale de trois mois, renouvelable dans la limite d'un an sur l'ensemble de la carrière.
Par périodes fractionnées d'au moins sept jours consécutifs, dont la durée cumulée ne peut être supérieure à six mois ;
Sous forme d'un service à temps partiel dont la durée est de 50 %, 60 %, 70 % ou 80 % du temps de service que les fonctionnaires à temps plein exerçant les mêmes fonctions doivent effectuer. Le service à temps partiel est accordé pour une durée maximale de trois mois, renouvelable une fois.
Pendant la période de congé de proche aidant, l'agent n'est pas rémunéré par la collectivité mais il peut demander à bénéficier d'une allocation journalière du proche aidant (AJPA) de la part de la CAF.
Lors de la demande de congés proche aidant, l'agent doit fournir à l'appui de sa demande
les pièces justificatives suivantes :
    Déclaration sur l'honneur de votre lien familial avec la personne aidée ou de l'aide apportée à une personne âgée ou handicapée avec laquelle vous résidez ou entretenez des liens étroits et stables
    Déclaration sur l'honneur précisant que vous n'avez pas déjà bénéficié, au cours de votre carrière, d'un congé de proche aidant ou bien la durée pendant laquelle vous avez bénéficié de ce congé.
    La demande doit être accompagnée de la copie d'un certificat médical attestant l'état de santé de la personne accompagnée : la décision justifiant d'un taux d'incapacité permanente au moins égal à 80 % si la personne aidée est un enfant ou un adulte handicapé ou la décision d'attribution de l'allocation personnalisée d'autonomie (APA) si la personne aidée souffre d'une perte d'autonomie
Le congé de proche aidant prend fin :
   Soit à l'expiration de l'une des périodes de trois mois ;
   Soit dans les trois jours qui suivent le décès de la personne accompagnée ;
   Soit à la demande de l'agent, à une date antérieure.
ARTICLE 5 – EN CAS DE DECES D'UN MEMBRE DE LA FAMILLE
Les agents municipaux sont autorisés, sur présentation d'un certificat de décès, au plus tard à leurretour, à s'absenter à l'occasion des obsèques.
     Conjoint : 5 jours ouvrés
     Parents : 5 jours ouvrés
     Beaux-parents : 3 jours ouvrés
     Ascendants de l'agent ou de son conjoint : 3 jours ouvrés
     Petits-Enfants : 3 jours ouvrés
     Frères et sœurs de l'agent ou de son conjoint : 3 jours ouvrés
     Oncle, tante, neveu, nièce de l'agent ou du conjoint : 1 jour ouvré
     Enfant et/ou enfant du conjoint :
 Conditions                                                     Nombre de Jours d'autorisation
 Enfant de moins de 25 ans
 Enfant de moins de 25 ans à la charge effective et             14 jours ouvrables + 8 jours dans un délai d'un an à
 permanente de l'agent                                          compter du décès
 Enfant de plus de 25 ans ayant au moins un enfant
 Enfant de plus de 25 ans sans enfant                           12 jours ouvrables
ARTICLE 6 - A L'OCCASION D'UN MARIAGE OU PACS
Le mariage ou Pacs d'un membre de la famille de l'agent ouvre droit à autorisation d'absence surprésentation d'un acte de mariage.
     Agent : 7 jours ouvrés
     Enfant des agents : 3 jours ouvrés
     Ascendant, descendant, frère, sœur, beau-frère, belle-sœur, oncle, tante, neveu, nièce : 1 jour ouvré
Les jours accordés au titre d'un PACS ne pourront être de nouveau attribués en cas de mariage pour la même personne.
Ces jours ouvrés sont consécutifs et non fractionnables et doivent être pris impérativement au moment de la célébration ou à des dates entourant obligatoirement cette célébration.
ARTICLE 7 - ABSENCE LIEE A LA MATERNITE
Une circulaire ministérielle du 21 mars 1996 prévoit que, sur présentation d'un certificat médical ou avis de la médecine professionnelle, l'agent, dans la période antérieure au congé prénatal, peut bénéficier d'autorisations spéciales d'absence pour :
     Les séances préparatoires à l'accouchement psychoprophylactique (sans douleur) lorsque ces séances ne peuvent avoir lieu en dehors des heures de service.
     Les examens prénataux obligatoires si ceux-ci ne peuvent se dérouler en dehors des heures de service. L'autorisation ne peut excéder une demi-journée.
     Une heure par jour d'aménagement des horaires de travail à partir du premier jour du troisième mois de grossesse jusqu'au congé de maternité, sans récupération. Cette heure n'est pas due en cas de congés divers ou d'arrêt pour maladie ou accident du travail.
ARTICLE 8 - POUR UNE CONSULTATION MEDICALE
Les agents exerçant leur activité à temps plein sont autorisés, exceptionnellement, à s'absenter, sous réserve des nécessités de service, pour se rendre en consultation. Ces absences doivent faire l'objet de la présentation de la convocation au rendez-vous et devront faire l'objet d'une récupération ultérieure.
Par exception, les temps de consultation à la demande de la GCR chez les médecins experts ne sont pas récupérés.
Pour un traitement hospitalier de longue durée, un aménagement d'horaire est envisageable avec le responsable de service.
Exceptionnellement, pour les agents en situation de handicap (reconnaissance RQTH) ou de maladies graves, 4 jours par an (fractionnables en 8 demi-journées) peuvent leur être octroyer afin d'assurer leur suivi médical et soins.
La médecine de prévention atteste les agents répondant aux conditions requises (Formation spécialisée du 08/12/2023).
DON DU SANG OU DE PLAQUETTE
Les agents sont autorisés à s'absenter pour le don du sang et de plaquettes. Ils doivent préalablement en faire la demande auprès de leur responsable hiérarchique et produire un justificatif à leur retour.
ARTICLE 9 - RENTREE SCOLAIRE
Le jour de la rentrée scolaire et sous réserve des nécessités de service, les agents peuvent bénéficier de facilités horaires dans la limite d'une heure (dans la journée) pour accompagner ou aller chercher leur enfant à l'école (concerne les enfants scolarisés en maternelle, primaire et l'entrée en 6ème).
ARTICLE 10 – DEMENAGEMENT
A l'occasion d'un déménagement, les agents bénéficient, la semaine précédant ou la semaine suivant le déménagement, d'une journée d'autorisation d'absence (justifié par le changement d'adresse).
ARTICLE 11 – FORMATION
La journée de formation est considérée comme une journée de travail.
Si la journée de formation tombe sur une journée non travaillée (exemple : un samedi ou un dimanche), celle-ci sera récupérée.
Si la journée de formation tombe sur une demi-journée de travail (exemple : un agent qui travaille sur 4,5 Jours ou sur 4 Jours), l'agent récupère cette demi-journée.
Si la journée de formation a une durée supérieure au temps de travail habituel, il n'y a pas de récupération, et inversement si la durée est inférieure au temps de travail habituel, l'agent ne doit pas rendre d'heure à la collectivité.
CONGE DE PARTICIPATION OU EPREUVES D'UN CONCOURS OU EXAMEN PROFESSIONNEL
Concours ou examens professionnels de la fonction publique territoriale de catégories A, B ou C : 1 jour avant la 1ère épreuve d'admissibilité et 2 jours avant la 1ère épreuve d'admission sur présentation des convocations et justificatif de présence aux épreuves.
Ces jours sont accordés pour une seule participation à un concours et un examen par année civile.
PARTICIPATION A DES JURYS DE CONCOURS ET EXAMENS OU COMME FORMATEUR
Une autorisation d'absence, sous réserve des nécessités de service, de 10 jours fractionnables (en demi-journée) est accordée pour participer en tant que jury de concours et examens ou comme formateur dans les conditions suivantes.
Il sera accordé par année civile, pour les agents à temps complet (proratisé pour les agents à temps non-complet et à temps partiel) et dans la mesure où ces prestations ouvrent droit à rémunération :
     5 jours par an pour la participation à des jurys de concours. Au-delà les absences devront être prises sur des jours de congés.
     5 jours par an pour assurer des formations ou intervenir à des colloques. Au-delà, les absences devront être prises sur des jours de congés.
Les formations assurées, à Gennevilliers, pour des agents de la Ville seront de 5 jours maximum par an.
Les agents concernés doivent, dans tous les cas, avoir obtenu préalablement une autorisation de cumuls d'emplois (à déposer à la GCR avec l'avis du responsable hiérarchique). La demande devra être déposée au minimum 15 jours avant l'absence. L'agent doit accompagner sa demande de la copie de sa lettre de mission ou d'intervention.
Aucun report ou prise par anticipation de ces autorisations d'absence ne peut être effectué.
CONGE DE REPRESENTATION
Les agents qui ont reçu mandat d'une association ou d'une mutuelle pour la représenter à l'occasion d'une réunion organisée par une des instances de l'Etat ou d'une Collectivité Territoriale peuvent bénéficier d'un congé dans la limite de 9 jours ouvrables par an avec possibilité d'un cumul maximum pouvant être porté à 12 jours ouvrables annuels dans la limite des délais légaux.
Les agents qui ont un mandat politique bénéficieront sur leur demande, des autorisations d'absence en fonction de la réglementation en vigueur.
Les agents doivent en faire la demande par écrit auprès de l'autorité territoriale au moins 15 jours avant en précisant la date et la durée de l'absence accompagnée de tous les éléments et documents justifiant qu'ils ont reçu mandat d'une association ou mutuelle pour la représenter à cette occasion. A son retour de congé, l'agent remet à l'autorité territoriale une attestation de présence effective à la réunion de cette instance.`.trim(),4:`
CHAPITRE 4 - LES ABSENCES POUR MALADIES ET ACCIDENTS
ARTICLE 1 - LA MALADIE
Il apparaît nécessaire de rappeler les règles de gestion des absences pour maladie ordinaire car leur non-respect peut notamment mettre les services en difficulté et avoir des conséquences sur la prise en charge des arrêts par la Sécurité Sociale et le versement des indemnités journalières.
Pour obtenir un congé de maladie ou son renouvellement, fonctionnaires et agents contractuels n'ont pas la même démarche à suivre. Néanmoins la première étape citée ci-après leur est commune.
Congés de maladie d'un agent annualisé :
     Si le congé de maladie est sur une journée normalement travaillée : les heures initialement prévues sont considérées comme faites.
     Si le congé de maladie est sur une journée non travaillée : aucune incidence.
     Si le congé de maladie est sur un jour de congé annuel posé et validé : l'agent a droit au report de son congé.
1ERE ETAPE - AVERTIR LE SERVICE                                                                                             38
Il est recommandé de prévenir ou de faire prévenir le service le plus rapidement possible de son absence au travail. Il en va de la bonne marche du service. Toutes les absences n'ont pas les mêmes conséquences mais toutes ont un effet sur l'organisation et plus vite le service est prévenu, plus vite il peut réagir.
L'information comprend éventuellement deux phases :
     "je ne peux pas venir travailler aujourd'hui".
     "je suis arrêté(e) jusqu'à telle date".
De même, en cas de prolongation, il est recommandé d'avertir le service, la veille de la reprise initialement prévue afin d'informer des nouvelles dates d'arrêt.
2EME ETAPE : TRANSMETTRE L'ARRÊT MALADIE
Cette seconde étape est différente selon que l'on est :
Fonctionnaire (stagiaire ou titulaire affilié à la CNRACL)
     L'agent doit adresser à la GCR les volets n°2 et n°3 de l'avis d'arrêt de travail dans les 48 heures suivant son établissement par voie postale à la Direction des Ressources Humaines - Service Gestion des Carrières et des Rémunérations (adresse postale 177, avenue Gabriel-Péri - 92237 GENNEVILLIERS cedex). Toutefois, ce délai d'envoi peut être dépassé si l'agent justifie d'une hospitalisation.
     Le volet n°1 dans lequel figurent les données médicales confidentielles doit être conservé par l'agent. En cas de contrôle médical, le médecin contrôleur peut l'exiger.
A l'exception du 1er volet, gardé par l'agent, l'arrêt de travail doit être impérativement transmis, sous 48 heures, par voie postale à la Direction des Ressources Humaines - Service Gestion des Carrières et des Rémunérations (adresse postale 177, avenue Gabriel-Péri – 92237 GENNEVILLIERS cedex).
Agent contractuel :
L'agent doit adresser dans les 48 heures suivant la date d'interruption de travail :
   Les volets n°1 et n°2 de son avis d'arrêt de travail à sa CPAM afin de bénéficier des indemnités journalières.
   Le volet n°3 à la Direction des Ressources Humaines - Service Gestion des Carrières et des Rémunérations (adresse postale 177, avenue Gabriel-Péri – 92237 GENNEVILLIERS cedex).
Les arrêts maladie sont transmis par l'agent au centre de Sécurité Sociale dont il relève, sous 48 heures. Ce délai est impératif sous peine d'un refus de prise en charge par celui-ci.
En aucun cas, l'arrêt de travail ne doit être transmis au service de l'agent.
JOURNEE DE CARENCE
Une journée de carence sera établie pour les agents titulaires et stagiaires, à temps complet, non complet et à temps partiel mais également pour les contractuels de droit public détenant une ancienneté supérieure à 4 mois.
Pour les agents de droit privé et les agents ayant moins de 4 mois d'ancienneté dans la collectivité, la carence de 3 jours sera appliquée.
Cette carence ne peut en aucun cas être compensée par des jours de congé ou de RTT. La carence ne s'applique pas dans le cadre : d'une prolongation d'arrêt, d'un deuxième arrêt initial quand la reprise entre les deux arrêts initiaux n'excède pas 48h00, d'un arrêt pour accident de service, d'une maladie professionnelle, d'un congé longue maladie, d'un congé de longue durée, d'un congé de grave maladie, d'une affection de longue durée, d'un arrêt maladie en lien avec un état de grossesse
si déclaration de grossesse transmise à l'employeur.
La retenue de la carence est effectuée sur le traitement de base, le régime indemnitaire, la NBI etl'indemnité de résidence à hauteur de 1/30ième ou 3/30ième (pour les agents de droit privé et ceux ayant moins de 4 mois d'ancienneté).
LA CONTRE VISITE
Le contrôle médical concerne tous les agents fonctionnaires, stagiaires et contractuels.                                    40
L'autorité territoriale peut procéder à tout moment à une contre visite par un médecin agréé afin de vérifier le bien-fondé du congé de maladie.
L'agent a l'obligation de s'y soumettre. Cette contre visite doit être obligatoirement organisée pendant
le congé maladie.
Le contrôle médical s'effectue, soit sur convocation au cabinet du médecin, soit au domicile de l'intéressé. Tout changement de résidence doit être signalé par l'agent à la DRH.
Lorsque le contrôle n'a pu être exercé du fait de la négligence de l'agent à communiquer l'adresse où il peut être visité, son traitement pourra être suspendu.
Le service GCR de la DRH informe l'agent du jour et du créneau horaire de la contre visite afin que celui-ci soit présent à son domicile.
L'autorité territoriale pourra suspendre le versement des rémunérations et engager une procédure disciplinaire à l'encontre de l'agent qui refuse de se soumettre au contrôle.
L'EXPERTISE MEDICALE
Concernant les accidents de service et les maladies professionnelles, une expertise peut être engagée pour vérifier la validité de l'arrêt de travail.
LES ABSENCES INJUSTIFIEES
En cas d'absence injustifiée d'un agent, le service en informe la DRH dès qu'il en a connaissance, et dans un délai maximal de deux mois. Un courrier est adressé par la DRH à l'agent afin qu'il produise un justificatif.
A défaut de justificatif, une retenue sur rémunération sera opérée.
Il est rappelé que toute absence injustifiée constitue un manquement à l'obligation de servir à laquelle est soumise tous les agents publics.
ARTICLE 2 - LES ACCIDENTS DE SERVICE (OU DE TRAVAIL) ET DE TRAJET
LES ACCIDENTS DE SERVICE ET DE TRAJET
Définitions
        L'accident de service s'applique à tout accident survenu dans le temps et sur le lieu du service, dans
        l'exercice ou à l'occasion de l'exercice des fonctions ou d'une activité qui en constitue le prolongement
        normal.
        L'accident de trajet lui concerne l'accident dont est victime l'agent qui se produit sur le parcours
        habituel entre le lieu où s'accomplit son service et son lieu de résidence ou de restauration.
Déclaration
En cas d'accident de service ou de trajet, l'agent doit transmettre à la DRH (service GCR) une
déclaration d'accident (formulaire disponible sur Intranet) et la transmettre :                                                41
   Sous 48 heures pour l'agent contractuel ou fonctionnaire rattaché au régime général
   Sous 15 jours pour le fonctionnaire affilié au Régime Spéciale
L'agent doit également faire constater son état par un médecin qui établit un certificat médical
décrivant les lésions et leur localisation ou la nature de la maladie et transmettre ce certificat médical à la DRH (service GCR) sous 48h.
ARTICLE 3 – LA PRISE EN CHARGE DE LA REMUNERATION
POUR LES AGENTS TITULAIRES AFFILIES A LA CNRACL

Nature de l'arrêt                            Durée              Plein traitement (salaire             Demi-traitement (demi-
                                            maximum                     complet)                             salaire)
Maladie ordinaire                               1 an                        3 mois                               9 mois
Longue maladie                                 3 ans                          1 an                               2 ans
Longue durée                                   5 ans                         3 ans                               2 ans
Accident de service et de trajet                       Plein traitement jusqu'à la reprise de son activité
POUR LES AGENTS TITULAIRES AFFILIES A L'IRCANTEC

Nature de l'arrêt                            Durée              Plein traitement (salaire             Demi-traitement (demi-
                                            maximum                     complet)                             salaire)
Maladie ordinaire                               1 an                        3 mois                               9 mois
Grave maladie                                  3 ans                          1 an                               2 ans
Accident de service et de trajet             Tant que                        3 ans                   Pas de demi-traitement,
                                           l'agent est                                                  la CPAM versera
                                          inapte à ses                                              directement à l'agent ses
                                            fonctions                                                indemnités journalières
POUR LES AGENTS CONTRACTUELS AFFILIES AU REGIME GENERAL DE LA SECURITE SOCIALE
Nature de l'arrêt
                                           Ancienneté de l'agent                    Plein             Demi-traitement (demi-
                                                                                 traitement                  salaire)           42
                                                                                   (salaire
                                                                                  complet)
Maladie ordinaire                                   < 4 mois
                                              > 4 mois < 2 ans                     1 mois                        1 mois
                                                 2 ans < 3 ans                     2 mois                        2 mois
                                                    > 3 ans                          3 mois                      3 mois
Grave maladie                                        > 3 ans
                                                 3 ans et plus                       1 ans                       2 ans
Accident de service et de trajet                       > 1 an                      1 mois
                                                  1= > 3 ans                       2 mois                          (**)
                                                    > 3 ans                        3 mois
`.trim()},Xp=`
            RÈGLEMENT INTÉRIEUR FORMATION
Préambule
La formation joue un rôle clef dans la politique mise en œuvre par la collectivité. Elle doit permettre aussi d'adapter et de perfectionner les services aux nouvelles technologies, à la gestion et au développement de projets complexes. Il s'agit de maintenir une adéquation entre les compétences des agents et l'évolution de leurs emplois, pour leur permettre d'exercer plus efficacement leurs fonctions en vue de satisfaire au mieux les
besoins des usagers.
La formation doit favoriser la promotion professionnelle et le développement des qualifications et compétences des agents. C'est un outil de gestion du parcours individuel des agents.
La formation peut permettre des évolutions de carrière par l'intermédiaire des concours et examens professionnels ou faciliter l'obtention de diplômes grâce à la validation des acquis de l'expérience (VAE).
Elle concourt à l'égalité d'accès aux différents grades et emplois, en particulier entre femmes et hommes, et à la progression des personnes les moins qualifiées
Enfin la formation tient une place primordiale aussi bien dans la gestion prévisionnelle
des emplois, des effectifs et des compétences (GPEEC), que dans le cadre d'une démarche de professionnalisation des agents.
L'objectif du règlement de formation est de permettre à chaque agent de la Ville, du CCAS, de la Caisse des Ecoles, de connaître ses droits et ses obligations en matière de formation, les conditions d'accès aux formations et les modalités d'exercice.
Le droit à la formation
Les agents stagiaires, titulaires, contractuels de droit public qui occupent un emploi permanent sont concernés par la formation dans les conditions prévues par les textes de référence (loi n°2019-828 du 6 août 2019)
Sont également concernés les agents en congé parental.
L'ensemble des agents de la collectivité bénéficie d'un accès à la formation conformément à la réglementation en vigueur, et dans la mesure de la continuité du service. A cet effet, un plan de formation est réalisé annuellement grâce au recueil des
besoins de l'ensemble des agents (Art. L423-3 du Code Général de la Fonction Publique).
Toute période de formation professionnelle est considérée comme du temps de travail,
sauf dans les cas particuliers de la disponibilité pour études ou recherches.
L'autorisation de participer à une formation est toujours soumise aux nécessités de service.
Les agents en congé de maladie, d'accident de service ou en congé de maternité ne peuvent pas participer aux actions de formation.
Toutefois, par exception, un fonctionnaire peut bénéficier d'une formation ou d'un bilan de compétences, à sa demande et sous réserve d'un avis médical favorable et de l'avis du service développement des compétences RH, pendant un congé pour indisponibilité physique (congé de maladie ordinaire, congé de longue maladie, congé de longue durée, congé d'invalidité temporaire imputable au service), mais uniquement en vue de sa réadaptation ou de sa reconversion professionnelle (article L.822-30 du code général de la fonction publique). Pour les agents IRCANTEC soumis au régime général de la sécurité sociale, l'accord de la CPAM doit être également sollicité (article L.323-3-1 du code de la sécurité sociale).
Un accès à la formation est également privilégié pour les agents concernés par une
procédure de reclassement pour inaptitude physique.
Les agents en position de disponibilité sont exclus des formations prises en charge par l'employeur.
Acteurs de la formation
INTERNES A LA COLLECTIVITE :
       - Les élus : l'organe délibérant approuve, sur proposition de l'autorité territoriale, par ses délibérations, les dispositions relatives à la formation qui lui sont soumises (il vote par exemple les crédits alloués à la formation). Le plan de formation lui est présenté.
       - L'autorité territoriale autorise les départs en formation, soumis aux nécessités de service.
        - La direction des ressources humaines, par le biais du service DCRH, recueille et traite les demandes des agents et organise les formations obligatoires prévues par le statut pour certains grades. Le référent formation assure le conseil, la mise en œuvre et le suivi administratif et financier du plan de formation.
       - Le responsable hiérarchique évalue et participe à la définition des besoins individuels et collectifs des agents de son service. Il évalue également les bénéfices des actions de formation. Il a, auprès des agents, un rôle d'explication du règlement, outil sur lequel il pourra s'appuyer lors des entretiens annuels d'évaluation pour aborder les questions de formation.
       - Les agents expriment leurs besoins de formation. Ils peuvent bénéficier, à leur demande, d'un accompagnement personnalisé destiné à les aider à élaborer et à mettre en œuvre leur projet professionnel. Par leur implication, Ils sont les principaux acteurs de leur parcours de formation et à ce titre, ils font valoir leurs droits et remplissent leurs obligations règlementaires à cet égard.
LES INSTANCES CONSULTATIVES :
Le Comité Social Territorial :
Le CST de la collectivité territoriale doit être consulté pour avis sur toutes les dispositions générales relatives à la formation. Le plan de formation lui est présenté ainsi que le bilan des actions de formation, notamment dans le cadre du rapport social unique (RSU).
Les Commissions Administratives Paritaires et les Commissions
Consultatives Paritaires :
Les CAP et les CCP sont consultées sur certaines questions d'ordre individuel relatives à la formation.
EXTERNES A LA COLLECTIVITE
Le Centre National de la Fonction Publique Territoriale, le CNFPT est l'établissement public chargé de dispenser les formations, auquel la collectivité territoriale ou l'établissement public verse une cotisation correspondant à 0,9 % de la masse salariale.
La collectivité de Gennevilliers verse sa cotisation au CNFPT – délégation Ile de France.
Les agents doivent donc prioritairement s'inscrire sur les formations délivrées par celle-ci. Une copie du plan de formation est transmise à la délégation régionale du CNFPT.
LES AUTRES ORGANISMES DE FORMATION :
Lorsqu'un agent souhaite bénéficier d'une formation non dispensée par le CNFPT, il doit en faire la demande par le biais du formulaire dédié disponible sur l'Intranet de la Ville. Ce formulaire dûment complété et comportant l'avis hiérarchique doit être accompagné d'un devis avant transmission au service DCRH. La demande fait l'objet d'un arbitrage en fonction de sa pertinence, de son recensement préalable, de son coût.
Le service DCRH informe l'agent et sa direction de l'accord ou du refus de formation.
Type de formation
Formations obligatoires :
Formation d'intégration :
  •   Objectif : doter le fonctionnaire nouvellement nommé dans un cadre d'emplois
      ainsi que les agents recrutés sur un emploi permanent pour une durée d'au moins
      un an, des connaissances relatives à l'environnement territorial. La formation
      porte notamment sur l'organisation et le fonctionnement des collectivités
      territoriales et sur le statut de la fonction publique. Le suivi de cette formation en
      intégralité dans les délais impartis conditionne la titularisation.
         o   Bénéficiaires : Tous les fonctionnaires des catégories A, B, et C, ainsi que
             les agents contractuels recrutés pour une durée d'au moins un an sur poste
             permanent.
         o   Durée : 10 jours pour les catégories A et B, 5 jours pour la catégorie C.
         o   Délai : Doit être réalisée dans l'année suivant la nomination.
         o   Dispenses : Dispenses possibles pour certains agents ou sur demande
             avec justification.
         o   Démarches : Inscription dès la nomination via la plateforme du CNFPT.
         o   Prise en charge : En région Ile de France, prise en charge des frais de
             transport à 100% (transport en commun).
                 ▪   En dehors d'Ile de France, frais de transport et d'hébergement
                     indemnisés selon le barème du CNFPT.
Formation de professionnalisation :
         o   Objectif : permettre aux fonctionnaires de s'adapter à leur emploi et de maintenir leurs compétences à niveau tout au long de leur carrière. La durée des formations est au minimum celle prévue par le statut particulier de chacune d'entre elles et son contenu est choisi par l'agent en lien avec la collectivité et avec le concours du CNFPT. Elle se décline en plusieurs types, chacun répondant à des besoins spécifiques en fonction de l'évolution professionnelle de l'agent.
Formation de Professionnalisation au Premier Emploi
o Objectif : Permettre aux nouveaux agents de s'adapter rapidement à leur premier emploi, en fonction des missions définies par leurs statuts particuliers.
o Bénéficiaires : Tous les fonctionnaires nouvellement nommés stagiaires, y compris ceux en détachement et ceux nommés par promotion interne.
o Durée : 5 à 10 jours pour les agents de catégorie A et B, 3 à 10 jours pour les agents de catégorie C.
o Délai : Doit être réalisée dans les 2 ans suivant la nomination dans le cadre d'emploi.
Formation de Professionnalisation Tout au Long de la Carrière
o Objectif : Maintenir et développer les compétences des agents tout au long de leur carrière, pour répondre aux évolutions des métiers.
o Bénéficiaires : Tous les fonctionnaires.
o Durée : 2 à 10 jours pour tous les agents, indépendamment de leur catégorie.
o Périodicité : Tous les 5 ans suivant la formation de professionnalisation au premier emploi.
Formation de Professionnalisation à la suite de l'affectation sur un poste à responsabilité
o Objectif : Préparer les agents à assumer des responsabilités accrues lorsqu'ils sont affectés à un poste à responsabilité.
o Bénéficiaires : Tous les fonctionnaires.
o Durée : 3 à 10 jours pour tous les agents.
o Délai : Doit être réalisée dans les 6 mois suivant l'affectation sur un poste à responsabilité.
Dispenses
• Dispense Totale ou Partielle : Possible en concertation avec l'agent, compte tenu des formations professionnelles.
• Demande de Dispense : L'autorité territoriale présente un dossier de demande de dispense au CNFPT, qui décide de l'accorder ou non.
  o Prise en charge :
    ▪ En région Ile de France, prise en charge des frais de transport à 100% (transport en commun).
    ▪ En dehors d'Ile de France, frais de transport et d'hébergement indemnisés selon le barème du CNFPT.
    • La promotion interne est subordonnée, entre autres critères, à l'accomplissement des formations de professionnalisation prévues par le statut particulier du cadre d'emplois d'origine du fonctionnaire.
Les formations en hygiène et sécurité
        o   Objectif : permettre de développer les compétences et les connaissances des agents en vue d'assurer leur sécurité et protéger leur santé au travail. Ces obligations de formations englobent la formation générale à la sécurité (la formation aux premiers secours, gestes et postures…), ainsi que des formations techniques spécifiques liées aux postes de travail ou aux matériels utilisés (habilitation électrique, conduite d'engins ou de véhicules, HACCP…)
        o   Bénéficiaires : Fonctionnaires titulaires ou stagiaires, agents contractuels.
        o   Durée : Variable selon la formation
        o   Démarches : Demande à l'employeur, 6 semaines avant
        o   Prise en charge : Frais pédagogiques et frais annexes pris en charge par l'employeur ou le CNFPT.
Formations non obligatoires :
Préparation aux concours et examens professionnels :
        o   Objectif : Préparer les agents aux avancements de grade ou changements de cadre d'emplois.
        o   Bénéficiaires : Fonctionnaires titulaires ou stagiaires, agents contractuels.
        o   Durée : Variable selon le concours ou examen préparé.
        o   Délais : 12 mois entre deux formations similaires, sauf si la durée effective est inférieure à 8 jours.
        o   Démarches : Inscription sur la plateforme du CNFPT, demande d'autorisation à l'autorité territoriale.
        o   Prise en charge :
               ▪   Frais pédagogiques couverts par la cotisation au CNFPT
               ▪   Frais de déplacement 75 % (transport en commun) et de restauration (14 €) prise en charge par la collectivité en Ile de France
               ▪   Si préparation en dehors d'Ile de France, exceptionnellement pour des préparations non organisées en Ile de France, pris en charge de la DAF, si pas de prise en charge par le CNFPT.
Participation à des Concours ou Examens Professionnels
        o   Les jours des épreuves sont sur du temps de travail, seulement pour les concours et les examens de la fonction publique territoriale.
        o   Congés pour préparation : 1 jour avant les épreuves d'admissibilité et 2 jours avant l'épreuve d'admission, sur présentation des convocations et justificatifs de présence. Accordé une seule fois par an pour un concours ou examen.
        o   Démarches : Demande à l'employeur dès réception de la convocation à l'épreuve.
        o   Prise en charge : 75 % du titre de transport en commun si pas de passe Navigo.
Reconnaissance de l'Expérience Professionnelle (REP)
        o   Objectif : La REP permet aux agents de la fonction publique territoriale de faire reconnaître leur expérience professionnelle comme équivalente à un diplôme, facilitant ainsi l'accès à certains concours sans posséder les diplômes requis.
        o   Bénéficiaires : Tous les agents territoriaux peuvent bénéficier de la REP.
        o   Conditions d'Éligibilité : Les agents doivent justifier d'une expérience professionnelle significative et pertinente par rapport au concours visé.
        o   Démarches : L'agent doit soumettre une demande de REP à l'organisateur du concours, en fournissant les preuves de son expérience professionnelle.
        o   Examen de la Demande : L'organisateur du concours examine l'expérience professionnelle du candidat en comparaison avec les connaissances, compétences et aptitudes requises pour l'obtention du diplôme et décide si l'expérience professionnelle du candidat est suffisante pour accéder au concours sans diplôme.
Lutte contre l'illettrisme et apprentissage du français :
        o   Objectif : Réacquérir les savoirs de base en lecture, écriture, calcul.
        o   Bénéficiaires : Agents ne maîtrisant pas les savoirs de base.
        o   Durée : sans durée prescrite, selon niveaux définis par le CNFPT
        o   Démarches : Demande à l'employeur 6 semaine avant le début de la formation, autorisation sous réserve des nécessités de service.
        o   Prise en charge : Cotisation du CNFPT.
        o   Refus : L'autorité territoriale ne peut opposer deux refus successifs à un agent demandant à bénéficier d'une même action de formation qu'après avis de la commission administrative paritaire.
               ▪   S'il l'agent n'a pas l'accord de son employeur 2 années de suite, il peut s'adresser au CNFPT auprès duquel il bénéficie d'une priorité d'accès aux actions de formations équivalentes.
Formation diplômante ou qualifiante :
        o   Objectif : Obtenir un diplôme ou une qualification reconnue.
        o   Bénéficiaires : Fonctionnaires et agents contractuels.
        o   Durée : Variable selon le diplôme ou la qualification visée.
        o   Démarches : Demande à l'employeur 6 semaines avant le début de la formation.
        o   Prise en charge : sous réserve des priorités de la collectivité, du budget alloué et de l'inscription dans le plan de formation.
               ▪   si formation est à la demande de l'agent uniquement, la participation de la collectivité est à hauteur de 70 % des frais pédagogique.
               ▪   Pas de prise en charge de frais annexes.
Formation de perfectionnement :
        o   Objectif : Développer ou acquérir de nouvelles compétences liées au poste et au métier.
        o   Bénéficiaires : Fonctionnaires et agents contractuels.
        o   Durée : Sans durée prescrite.
        o   Délais : 12 mois entre deux formations similaires, sauf si la durée effective est inférieure à 8 jours.
        o   Démarches : Demande à l'employeur 6 semaines avant
        o   Prise en charge : sous réserve des priorités de la collectivité, du budget alloué et de l'inscription dans le plan de formation.
               ▪   si formation est à la demande de l'agent uniquement, la participation de la collectivité est à hauteur de 70 % des frais pédagogique.
               ▪   Pas de prise en charge de frais annexes.
        o   Refus : L'autorité territoriale ne peut opposer deux refus successifs à un agent demandant à bénéficier d'une même action de formation qu'après avis de la commission administrative paritaire.
               ▪   S'il l'agent n'a pas l'accord de son employeur 2 années de suite, il peut s'adresser au CNFPT auprès duquel il bénéficie d'une priorité d'accès aux actions de formations équivalentes.
Formation syndicale :
        o   Objectif : Acquérir des connaissances en matière syndicale.
        o   Bénéficiaires : Tous les agents, fonctionnaires ou contractuels. Dans les collectivités de plus de 100 agents, le pourcentage des agents partant en congé pour formation syndicale ne peut représenter que 5% de l'effectif réel.
        o   Durée : 12 jours ouvrables par an.
        o   Démarches : Demande écrite à l'autorité territoriale au moins un mois avant le début du stage.
        o   Prise en charge : Frais à la charge de l'organisation syndicale organisatrice.
        o   Refus : L'employeur peut refuser un tel congé pour des raisons de nécessité de service. En cas de refus , celui-ci doit être motivé est communiqué à la CAP/ CCP.
La formation des membres du CST :
        o   Objectif : La formation des membres du CST est essentielle pour leur permettre d'exercer efficacement leurs missions en matière de santé, de sécurité et de conditions de travail. Elle vise à leur fournir les connaissances nécessaires pour identifier les risques professionnels, proposer des actions de prévention et contribuer à l'amélioration des conditions de travail.
        o   Bénéficiaires : Tous les membres, qu'ils soient titulaires ou suppléants, doivent bénéficier de la formation nécessaire à l'exercice de leurs missions.
        o   Durée : La durée de la formation est généralement de 3 à 5 jours, selon les besoins et les thématiques abordées.
        o   Contenu : La formation couvre divers aspects, notamment :
               ▪   Les missions et le fonctionnement du CST.
               ▪   Les principes généraux de prévention des risques professionnels.
               ▪   Les méthodes d'analyse des risques et des conditions de travail.
       ▪   Les obligations de l'employeur en matière de santé et sécurité au travail.
       ▪   Les droits et devoirs des membres du CST.
o   Organisme de Formation : La formation est assurée par des organismes agréés par le ministère du Travail ou des organismes spécialisés dans la formation en santé et sécurité au travail.
o   Prise en Charge : Les frais pédagogique et les frais annexes sont pris en charge par l'employeur.
Périodes Spécifiques au Service de la Formation
Congés :
Congé de formation professionnelle :
        o   Objectif : Suivre une formation longue pour un projet professionnel ou personnel.
        o   Bénéficiaires : Fonctionnaires et agents contractuels avec au moins 3 ans de service, dont les 12 derniers mois dans la collectivité.
        o   Durée : Maximum 3 ans sur la carrière, utilisable en une ou plusieurs fois. Cette durée peut être de 5 ans pour les agents de catégorie C ne disposant pas du baccalauréat ou bénéficiaire de l'obligation d'emploi ou confrontés à un risque d'usure professionnelle attesté par le médecin du travail.
        o   Démarches : Demande écrite 90 jours avant le début de la formation, réponse de l'employeur dans les 30 jours.
        o   Prise en charge : Frais de formation à la charge de l'agent sauf accord de la collectivité ;
        o    Rémunération : L'agent en formation perçoit pendant la première année de congé une indemnité mensuelle égale à 85 % de son traitement indiciaire brut et de l'indemnité de résidence perçus au moment de sa mise en congé. Toutefois, cette indemnité mensuelle ne peut pas être supérieure à 2 778,62 € brut par mois. Les années de congé suivantes ne sont pas rémunérées, sauf pour les agents de catégorie C ne disposant pas du baccalauréat ou bénéficiaire de l'obligation d'emploi ou confrontés à un risque d'usure professionnelle attesté par le médecin du travail, pour qui la seconde année est rémunérée.
        o   Refus : L'autorité territoriale ne peut opposer deux refus successifs à un agent demandant à bénéficier d'une même action de formation qu'après avis de la commission administrative paritaire.
Congé pour bilan de compétences :
        o   Objectif : Analyser les compétences, aptitudes et motivations professionnelles.
        o   Bénéficiaires : Fonctionnaires, agents contractuels, assistants maternels et familiaux.
        o   Durée : 24 heures de temps de service, fractionnables en plusieurs
            séances. Pour les agents territoriaux appartenant à certaines catégories,
            cette durée est portée à 72 heures de temps de service. Ces catégories incluent :
               ▪   Les agents de catégorie C n'ayant pas atteint un niveau de formation sanctionné par un diplôme ou un titre professionnel correspondant au niveau 4.
               ▪   Les agents en situation de handicap.
               ▪   Les agents particulièrement exposés à un risque d'usure professionnelle.
        o   Fréquence : Un agent ne peut prétendre à un autre bilan de compétences qu'à l'expiration d'un délai de cinq ans après l'achèvement du précédent, sauf pour certains agents où ce délai est réduit à trois ans (liste ci-dessus).
        o   Démarches : Demande 60 jours avant le début du bilan, réponse de l'employeur dans les 30 jours.
        o   Prise en charge : sous réserve des priorités de la collectivité, du budget alloué et de l'inscription dans le plan de formation.
Congé pour validation des acquis de l'expérience (VAE) :
        o   Objectif : Obtenir un diplôme ou une qualification grâce à l'expérience professionnelle.
        o   Bénéficiaires : Fonctionnaires, agents contractuels, assistants maternels et familiaux.
        o   Durée : 24 heures, 72 heures pour les agents de catégorie C ne disposant pas du baccalauréat ou bénéficiaire de l'obligation d'emploi ou confrontés à un risque d'usure professionnelle attesté par le médecin du travail.
        o   Démarches : Demande 60 jours avant le début des actions de VAE, réponse de l'employeur dans les 30 jours.
        o   Prise en charge : sous réserve des priorités de la collectivité, du budget alloué et de l'inscription dans le plan de formation.
Congé de transition professionnelle :
        o   Objectif : permettre à certains agents, en cas de nécessité d'exercer un nouveau métier constaté d'un commun accord entre l'agent et la collectivité qui l'emploie, de suivre une action ou un parcours de formation longs, en vue d'exercer le nouveau métier.
        o   Sont éligibles les actions ou parcours de formation :
               ▪   D'une durée égale ou supérieure à 120 heures et sanctionnées par une certification professionnelle enregistrée au répertoire national prévu à l'article L. 6113-1 du code du travail, par une attestation de validation de blocs de compétences ou par une certification ou habilitation enregistrée dans le répertoire spécifique mentionné à l'article L. 6113-6 du même code.
               ▪   D'une durée égale ou supérieure à 70 heures et permettant d'accompagner et de conseiller les créateurs ou repreneurs d'entreprises.
        o   Bénéficiaires : agents de catégorie C ne disposant pas du baccalauréat ou bénéficiaire de l'obligation d'emploi ou confrontés à un risque d'usure professionnelle attesté par le médecin du travail.
        o   Durée : Maximum 1 an, prolongeable par un congé de formation professionnelle.
        o   Démarches : Demande 3 mois avant le début de la formation, réponse de l'employeur dans les 2 mois.
        o   Prise en charge : Frais de formation et annexes à la charge de la collectivité, dans la limite d'un plafond de 6000 €. Réf. délibération du 25 juin 2025.
        o   Rémunération : L'agent en congé de transition professionnelle conserve son traitement brut et, le cas échéant, l'indemnité de résidence et le SFT. Les primes et indemnités sont maintenues pour les situations d'agent en suppression d'emploi et en situation d'inaptitude au poste. Réf. délibération du 25 juin 2025.
Autres Dispositifs :
  •   Période d'immersion professionnelle :
         o   Objectif : permet aux agents d'appréhender la réalité d'un métier, d'observer sa pratique et l'environnement professionnel dans lequel elle se déroule. Cela vise à confirmer leur projet d'évolution professionnelle et à faire un choix éclairé de mobilité.
         o   Bénéficiaires : Tous les agents publics.
         o   Employeur d'Accueil : La période d'immersion professionnelle peut être
             effectuée auprès de divers organismes :
                ▪   Établissement public de l'État
                ▪   Collectivité territoriale ou établissement public territorial
                ▪   Établissement public hospitalier
                ▪   Tout autre organisme public.
         o   Durée : 2 à 10 jours, maximum 20 jours sur 3 ans.
         o   Démarches : Demande 3 mois avant le début de l'immersion, réponse de l'employeur dans le mois suivant.
         o   Convention Tripartite : En cas d'acceptation, la mise en œuvre d'une période d'immersion donne lieu à une convention tripartite entre l'agent, l'administration d'emploi et la structure d'accueil. La convention définit les fonctions observées par l'agent, le lieu, la durée, la ou les date, ainsi que les conditions nécessaires au bon déroulement de cette période.
         o   Prise en charge : Pas de frais spécifiques.
•   Disponibilité pour études ou recherches :
       o   Objectif : Effectuer des études ou recherches présentant un intérêt général.
       o   Bénéficiaires : Fonctionnaires.
       o   Durée : Maximum 3 ans, renouvelable une fois.
       o   Démarches : Demande écrite 3 mois avant la date souhaitée, réponse de l'employeur dans les 2 mois.
       o   Prise en charge : Pas de rémunération ni de droits à l'avancement et à la retraite pendant la disponibilité.
       o   Refus : L'autorité territoriale ne peut opposer deux refus successifs à un agent demandant à bénéficier d'une même action de formation qu'après avis de la commission administrative paritaire.
Compte Personnel d'Activité
Compte Personnel de Formation (CPF) :
•   Objectif
•   Le Compte Personnel de Formation (CPF) permet aux agents de la fonction publique territoriale d'accéder à des formations pour obtenir une qualification ou développer des compétences nécessaires à leur évolution professionnelle. Il est alimenté en heures, permettant une plus grande flexibilité dans le choix des formations.
•   Bénéficiaires : Fonctionnaires titulaires ou stagiaires, Agents contractuels
•   Alimentation du Compte : 25 heures par an, avec un plafond de 150 heures. Pour un agent à temps non complet, un calcul au prorata du temps travaillé.
•   Crédit d'heures supplémentaire :
        o   Pour les agents de catégorie C n'ayant pas atteint un niveau de formation sanctionné par un diplôme ou un titre professionnel correspondant au niveau 3, un crédit de 50 heures par an est accordé, avec un plafond de 400 heures.
        o   Pour les agents souhaitant prévenir une situation d'inaptitude physique, un crédit d'heures supplémentaires est accordé, dans la limite de 150 heures, complété par 300 heures pour un agent à temps complet ou 550 heures pour un agent de catégorie C ayant un niveau inférieur au niveau V du répertoire national des certifications professionnelles.
•   Formations éligibles : Le CPF peut être utilisé pour des formations diplômantes, certifiantes, ou pour préparer des concours et examens professionnels.
•   Démarches : L'agent doit soumettre une demande écrite à l'employeur, précisant le projet d'évolution professionnelle.
•   Accord de l'employeur : Un accord écrit est nécessaire sur la nature, le calendrier et le financement de la formation.
•   Prise en charge : Frais pédagogiques des formations via le CPF plafonnés à 5% du budget annuel dédié à la formation, Réf. délibération du 25 juin 2025. Les demandes de formation dans le cadre du CPF sont instruites selon des critères de priorité :
       o   Reconversion Professionnelle pour Motif Médical : Actions de formation, accompagnement, ou bilan de compétences permettant d'accompagner une reconversion professionnelle pour motif médical (inaptitude, préconisation ou restriction médicale).
       o   Validation des Acquis de l'Expérience (VAE) : Actions de VAE, en tenant compte des évolutions sur des métiers en tension et des besoins de la collectivité.
       o   Actions de Formation Personnelle : Actions de formation correspondant aux besoins de la collectivité identifiés dans le plan de formation.
•   Pour les dossiers prioritaires, les frais pédagogiques de formation via le CPF sont pris en charge à 100% par la collectivité. Les frais occasionnés par le déplacement des agents lors de ces formations sont pris en charge conformément à la réglementation en vigueur.
•   Les demandes de CPF non priorisées par la collectivité sont traitées par arbitrages individuels pour définir la décision (accord ou refus) du départ en formation (accord des heures CPF).
•   Portabilité des Droits : Les droits acquis dans le secteur privé peuvent être convertis en heures pour être utilisés dans la fonction publique.
•   Refus : le 3ème rejet d'une formation de même nature ne pourra être prononcé qu'après avis de l'instance paritaire compétente. L'employeur ne peut refuser les formations relevant du socle de connaissances et de compétences fondamentales. Seul un report d'une année sur l'autre en raison des nécessités de service est possible. Elles concernent notamment la communication en Français et les règles de calculs et de raisonnement mathématiques.
Compte d'Engagement Citoyen (CEC) :
 •   Objectif : Valoriser les activités bénévoles ou de volontariat par des droits à formation.
        o   Bénéficiaires : Tous les agents de la fonction publique.
        o   Alimentation : 240 euros (20 heures) par activité éligible, plafond de 720 euros (60 heures).
        o   Activités éligibles : Service civique, réserve militaire, bénévolat associatif, etc.
        o   Démarches : Déclaration des activités éligibles via le service dématérialisé.
        o   Prise en charge : Financement par l'État ou l'organisme compétent selon l'activité.
Dispositif des formateurs et des jurys de concours
Formateurs internes occasionnels :
 •   Conditions préalables pour devenir formateur interne :
        o   Les agents ayants une expertise métier ou technique
        o   Selon les besoins identifiés par la collectivité et sous réserve de l'accord de la DCRH et du responsable hiérarchique de l'agent.
        o   Suivi une formation de formateur (avec attestation)
        o   La formation ne soit pas inscrite dans le profil de l'agent ( ne fait pas partie des missions).
 •   Conditions préalables pour réaliser une formation :
        o   Chaque formateur doit proposer un déroulé pédagogique à la DCRH qui doit être validé avant toute formation. Il engage le formateur sur le contenu de la formation qu'il dispensera.
        o   En fonction des formations, un livrable pourra être conçu par le formateur et distribué aux agents ayant participé à la formation
        o   Le nombre de sessions de formation réalisé par an sera convenu entre le formateur et la DCRH, en accord avec la hiérarchie de l'agent au regard des nécessités de service.
        o   Le matériel nécessaire au formateur pour le bon déroulé de sa formation sera fourni par le service DCRH
        o   Le service DCRH se charge de l'ingénierie de la formation, dont la constitution des groupes, la réservation de la salle , la convocation des participants, les feuilles d'émargements et les attestations de formation.
 •   Droits du formateur :
        o   La préparation des formations se fera sur le temps de travail et sera rémunérée à hauteur d'une journée, lors de la première formation dispensée.
     o   Le support de formation réalisé par le formateur est sa propriété et non celle de la ville. Il ne sera pas diffusé en dehors des agents ayant suivi la formation.
     o   La formation dispensée par le formateur est rémunérée conformément aux dispositions du RIFSEEP.
     o   Les formations se déroulent en mairie et sur le temps de travail.
Participation à des Jurys ou comme Formateur
externes
     o   Sous réserve d'une autorisation de cumul d'emploi et des nécessités de service, Une autorisation d'absence de 10 jours fractionnables (en demi-journée) est accordée pour participer en tant que jury de concours et
         examens ou comme formateur en externe dans les conditions suivantes :
         Il sera accordé par année civile, pour les agents à temps complet (proratise pour les agents à temps non-complet et à temps partiel) et dans la mesure où ces prestations ouvrent droit à rémunération :
            ▪    5 jours par an pour la participation à des jurys de concours. Au-delà les absences devront être prises sur des jours de congés.
            ▪   5 jours par an pour assurer des formations ou intervenir à des colloques. Au-delà, les absences devront être prises sur des jours de congés.
L'organisation de la formation
Les modes d'organisation de la formation
       Les formations peuvent être dispensées de différentes manières :
   •   Les formations dites « INTRA » : à la suite du recueil des besoins en formation, la collectivité organise des formations dans ses locaux. Cette organisation permet de regrouper des agents de différents services autour d'une thématique commune. Les dates ainsi que le contenu du programme de formation sont personnalisables et s'adaptent en fonction des besoins des services.
   •   Les formations dites « INTER » : ces formations réunissent les agents de plusieurs collectivités autour d'une formation commune organisée par le prestataire, le CNFPT ou d'autres organismes de formation.
   •   Les formations dites « INTRA-UNION » : ce sont des formations qui sont proposées principalement par le CNFPT. Elles sont organisées par une des collectivités de l'EPT 5 sur un thème défini répondant aux demandes des collectivités.
   •   Les formations en distanciel : ce sont des formations organisées à distance, généralement via des plateformes en ligne. Cela permet une plus grande flexibilité en termes d'horaires et de lieu de formation et facilite l'accès à la formation pour les agents éloignés géographiquement ou ayant des contraintes de temps. Pour les agents qui ne disposent pas d'ordinateur ou de bureau pour suivre une formation à distance, le service DCRH mettra à leur disposition des ordinateurs portables et la salle de formation équipée en ordinateur.
   •   Les formation Mixte : ce sont des formations qui combinent des sessions en présentiel et des modules en distanciel.
       Inscription à une formation CNFPT ?
   o   L'inscription se fait uniquement en ligne (pas de format papier).
   o   Aller sur son compte IEL (inscription en ligne du CNFPT - www.cnfpt.fr), sélectionner la formation désirée puis dans le menu déroulant, choisir le type de formation (1er emploi, tout au long de la carrière…etc) puis valider.
   o   La demande arrive dans la boite mail du responsable hiérarchique pour validation ou non de la formation.
   o   Enfin, le service DCRH valide la demande.
   o   La procédure d'inscription pas à pas figure également sur l'Intranet de la ville – rubrique formation – 2 – choisir sa formation et en annexe du présent document ;
   o   Les agents du service DCRH peuvent également vous aider à créer votre compte IEL.
Inscription à une formation avec un autre organisme 
Préparation de la demande par l'agent :
   o   L'agent remplit le formulaire de demande d'inscription.
   o   Il fournit les renseignements indispensables et joint le bulletin d'inscription de l'organisme.
Soumission de la demande :
   o   L'agent soumet le formulaire complété à sa hiérarchie
   o   La demande doit être soumise 8 semaines avant le début de la formation.
Soumission de la demande au service DCRH
   o   La demande doit être soumise 6 semaines avant le début de la formation
   o   Le service DCRH vérifie que la demande est totalement et correctement remplie.
   o   Il examine la motivation de l'agent et l'utilité de la formation et sa pertinence, en fonction du plan de formation, des priorités de la collectivité et du budget alloué.
Validation de la demande :
   o   Si la demande est approuvée, elle est validée par le service DCRH.
   o   Si la demande n'est pas approuvée, le service DCRH informe la direction et l'agent.
Inscription à la formation :
   o   Le service DCRH finalise son inscription auprès de l'organisme de formation.
   o   L'agent suit la formation selon les dates et la durée spécifiées.
Attestation de formation : à l'issue de chaque formation réalisée, une attestation de formation est transmise à l'agent par l'organisme de formation. Le service DCRH reçoit automatiquement toutes les attestations du CNFPT. Pour les autres organismes la transmission n'est systématique. Les agents sont invités à les transmettre au service DCRH qui les verse dans leur dossier administratif.
Les droits et devoirs des agents
Journée de Formation est une journée d'activité :
         o   Si la formation tombe sur un jour non travaillé (ex. : week-end), l'agent récupère cette journée.
         o   Si la journée de formation tombe sur une demi-journée hors cycle de travail (exemple : un agent qui travaille sur 4,5 Jours ou sur 4 Jours), l'agent récupère cette demi-journée.
         o   Si la durée de la formation est supérieure au temps de travail habituel, il n'y a pas de récupération. Inversement, si la durée est inférieure, l'agent ne doit pas rendre d'heures.
         o   Pour une formation d'une demi-journée, l'agent doit être présent l'autre demi-journée, sauf si le trajet excède deux heures.
   •   Temps de déplacement : Lors des formations et stages les temps de déplacement ne sont pas récupérés.
Formation en dehors du temps de travail :
         o   Possible dans le cadre du Compte Personnel de Formation (CPF) à la demande de l'agent et avec accord de la hiérarchie.
Tenue et Comportement
         o   Tenue : la présentation en tenue respectant les principes du service public et des principes de laïcité et la neutralité, la journée de formation étant une journée de travail.
         o   Comportement : Téléphone portable éteint ou en mode silencieux pendant la formation, sauf utilisation demandée par le formateur.
Horaires de Stage
         o   Respect des horaires : Les horaires sont communiqués par convocation ou programme de formation.
         o   Modification : Le service DCRH peut modifier les horaires en fonction des nécessités de service.
         o   Retard et absence : Doivent être signalés immédiatement au service DCRH.
Usage du Matériel
         o   Conservation : Le matériel doit être conservé en bon état et utilisé conformément à son objet.
         o   Restitution : Tout matériel et document doivent être restitués à la fin du stage, sauf documents pédagogiques distribués.
Accès aux Formations pour les Agents en Situation de Handicap
Les agents en situation de handicap bénéficient d'un accès prioritaire à plusieurs types de formations. Les formations peuvent être adaptées pour répondre aux besoins spécifiques des agents en situation de handicap, en termes de contenu, de durée et de modalités de formation. Ils peuvent bénéficier d'un accompagnement personnalisé pour les aider à préparer les concours et examens, incluant des aménagements spécifiques pour les épreuves. Pour les dispositifs ci-dessous, les agents en situation de handicap bénéficient de conditions spécifiques et avantageuses pour accéder y accéder :
Congé de Formation Professionnelle
   •   Durée : La durée maximale du congé de formation professionnelle est portée à 5 ans sur l'ensemble de la carrière pour les agents en situation de handicap.
   •   Indemnité : Le montant de l'indemnité est porté à 100% du traitement brut et de l'indemnité de résidence pendant une durée limitée aux douze premiers mois, puis à 85% pendant une durée limitée aux douze mois suivants.
Congé pour Bilan de Compétences
   •   Durée : La durée du congé pour bilan de compétences est portée à 72 heures de temps de service pour les agents en situation de handicap.
   •   Fréquence : Le délai pour prétendre à un autre bilan de compétences est réduit à trois ans pour les agents en situation de handicap.
Congé pour Validation des Acquis de l'Expérience (VAE)
   •   Durée : La durée du congé pour VAE est portée à 72 heures de temps de service pour les agents en situation de handicap.
Congé de Transition Professionnelle
   •   Durée : La durée du congé de transition professionnelle est portée à 5 ans sur l'ensemble de la carrière pour les agents en situation de handicap.
Période d'Immersion Professionnelle
    •  Aides Spécifiques : Lorsque le bénéficiaire de la période d'immersion professionnelle est un agent en situation de handicap, son employeur s'assure qu'il bénéficie des aides nécessaires au bon déroulement de cette période. Ces aides sont définies dans la convention tripartite.
Compte Personnel de Formation (CPF)
    •  Crédit d'Heures Supplémentaire : Les agents en situation de handicap bénéficient d'un crédit d'heures supplémentaire pour prévenir une situation d'inaptitude physique, dans la limite de 150 heures, complété par 300 heures au total.
Compte d'Engagement Citoyen (CEC)
    •  Activités Éligibles : Les agents en situation de handicap peuvent bénéficier de droits supplémentaires au titre du CEC pour les activités bénévoles ou de volontariat de la vie ;
Glossaire
     •   CACES : certificat d'aptitude à la conduite d'engins en sécurité
     •   CAP : commission administrative paritaire
     •   FIMO : formation initiale minimale obligatoire
     •   HACCP : hazard analysis critical control point : analyse des dangers et
         maîtrise des points critiques
     •   VAE : validation des acquis de l'expérience`.trim(),Yp=`
PROTOCOLE TÉLÉTRAVAIL
Mairie de Gennevilliers

PREAMBULE :
Le télétravail désigne « toute forme d'organisation du travail dans laquelle les fonctions qui auraient pu
être exercées par un agent dans les locaux de son employeur sont réalisées hors de ces locaux de
façon régulière et volontaire en utilisant les technologies de l'information et de la communication.
Télétravail est organisé au domicile de l'agent ou, éventuellement, dans les locaux professionnels
distincts de ceux de son employeur public ou de son lieu d'affectation ».
La ville de Gennevilliers souhaite assurer au maximum le bien être des agents communaux au travail
et adopter des mesures permettant une meilleure conciliation entre vie personnelle et vie
professionnelle.
La réflexion ne s'inscrit pas, contrairement à de nombreuses autres structures privées ou publiques,
dans un objectif de réduction des postes de travail (nombre de bureaux, d'ordinateurs…) au sein de la
collectivité.
Le télétravail est aujourd'hui un des moyens privilégiés pour améliorer les conditions de travail des
agents.
La question du temps de trajet domicile-travail est également pleinement prise en compte par les
candidats lorsqu'ils postulent et constitue un levier d'attractivité de l'employeur.
Le télétravail prévu à l'article L1222-9 du code du travail est encadré au sein de la fonction publique
par la loi n°2012-347 du 12 mars 2012 relative à l'accès à l'emploi titulaire et à l'amélioration des
conditions d'emploi des agents contractuels dans la fonction publique, à la lutte contre les discrimination
et portant diverses dispositions relatives à la fonction publique ; et le décret n°2016151 du 11 février
2016 qui précise les conditions et modalités de mise en œuvre du télétravail dans la fonction publique
et la magistrature. Plus récemment, l'accord cadre de la mise en place du télétravail dans les trois
volets de la fonction publique pousse la collectivité à délibérer.
Pour rappel, le télétravail est un mode de travail qui ne déroge en aucune façon aux règles de droits et
obligations du travail.

POURQUOI METTRE EN PLACE LE TELETRAVAIL ?
CONCILIER VIE PRIVEE ET PROFESSIONNELLE :
Le temps de déplacement entre le domicile et le lieu de travail s'ajoute au temps de travail. Il n'est pas
considéré comme un temps de travail effectif.
Agir sur le temps consacré au trajet domicile-travail est un moyen d'agir sur la fatigue et le stress
engendré par les transports. C'est un levier de bien-être au travail.

CONTINUER A PROMOUVOIR LE MANAGEMENT PAR LA CONFIANCE :
Le télétravail implique un management plus participatif, centré sur l'autonomie, la responsabilisation et
l'atteinte d'objectifs définis en même temps que les moyens pour les mettre en œuvre. Ce mode de
management est encouragé. La mise en place du télétravail constitue un outil managérial
supplémentaire. Le contrôle du travail effectué par l'agent en télétravail s'inscrira en cohérence avec le
contrôle exercé sur site.
REDUIRE L'EMPREINTE ECOLOGIQUE.
En réduisant les trajets domiciles-travail, le télétravail permet de réduire les émissions de gaz à effet
de serre et ainsi participe à l'amélioration du bilan carbone de la collectivité.

L'AMELIORATION DES CONDITIONS DE TRAVAIL
Moins sollicité en direct, dans un espace familier et au calme, le télétravailleur peut plus facilement
réaliser certaines tâches, notamment celles qui exigent de la concentration. Le télétravailleur a une
plus grande latitude pour gérer son temps et organiser ses tâches tout en restant dans son cadre
horaire habituel.

LE TELETRAVAIL A LA VILLE DE GENNEVILLIERS
REPOSE SUR LES PRINCIPES SUIVANTS :

Le strict volontariat de l'agent et soumis à l'accord de son responsable hiérarchique. Toutefois le
télétravail doit aussi, de façon exceptionnelle, pouvoir être mis en œuvre à la demande de la collectivité,
en cas de circonstances exceptionnelles et afin d'assurer tant la continuité du service public que la
protection des agents, et le cas échéant dans le cadre des plans de continuité de l'activité.

La réversibilité : le télétravail est une co-responsabilité entre l'agent qui sollicite le télétravail et le
responsable hiérarchique qui évalue le degré d'autonomie de l'agent. Il peut à tout moment être
interrompu si, par exemple, le télétravailleur est sujet au stress de devoir organiser seul sa journée de
travail. Le décret du 11 février 2016 prévoit que lorsque l'administration ou un agent décide de mettre
fin à une autorisation de télétravail, un délai de prévenance doit être respecté. Ce délai est d'un mois
pendant la période d'adaptation prévue par l'autorisation de télétravail et de deux mois au-delà de cette
période. Lorsque l'interruption du télétravail est à l'initiative de l'administration, ce délai peut être réduit
en cas de nécessité du service dûment motivée, avec un entretien préalable.

La nécessité de préserver le lien social au sein des services : le télétravail doit être limité dans le temps
pour ne pas altérer le lien social inhérent à la vie professionnelle. Le télétravail sera limité à 1 jour fixe
par semaine accompagné d'un forfait annuel de 15 jours dans la limite de 3 jours maximum par mois.
De plus chaque service devra déterminer une journée par semaine non télétravaillable pour permettre
la mise en place de réunion de service et garantir le lien social, et la présence de l'agent sur site est
obligatoire 3 jours par semaine.

Le droit à la déconnexion : le respect de la séparation entre la vie privée et la vie professionnelle est
une priorité et ne saurait en aucun cas être remis en question par la mise en place du télétravail. Comme
pour le travail sur site, le fait d'être joignable n'implique pas pour autant l'obligation d'apporter une
réponse immédiate à toute sollicitation. En dehors des plages horaires de travail habituelles, le
télétravailleur n'est pas censé être connecté, aussi aucune réponse immédiate ne peut être attendue.

En faisant acte de candidature, l'agent déclare disposer des conditions suffisantes pour travailler dans
un cadre adéquat tant sur le plan du respect des normes de sécurité qu'en matière d'ergonomie et
d'aménagement de l'espace de travail. Le médecin de prévention et le responsable du service DSCT
sont des interlocuteurs de premier plan, avec lesquels l'agent ou la hiérarchie peuvent échanger. Ils
peuvent par exemple organiser une visite sur le lieu d'exercice des fonctions en télétravail. Dans le cas
où l'agent exerce ses fonctions en télétravail à son domicile, l'accès au domicile du télétravailleur est
évidemment subordonné à l'accord de l'intéressé, dûment recueilli par écrit.

L'absence de différence de traitement entre les collaborateurs travaillant sur site et les télétravailleurs
notamment en matière de répartition des tâches, des missions et d'évaluation professionnelle.

Le télétravail à la ville de Gennevilliers n'a pas vocation à générer d'économies. Il ne saurait aboutir à
la réduction des postes de travail sur site ni à la réduction des effectifs. La collectivité s'engage à mettre
à disposition les moyens informatiques nécessaires à la mise en œuvre du télétravail.

L'égalité de traitement entre les catégories : Le télétravail est ouvert à tout agent dont les fonctions sont
compatibles avec le télétravail, peu importe son appartenance à la catégorie A, B ou C et peu importe
son statut de cadre. Il est possible que certaines activités exercées par un agent soient incompatibles
avec le télétravail. Lorsque certaines activités exercées par un agent qui souhaite télétravailler sont
incompatibles avec le travail à distance, le responsable hiérarchique étudiera comment organiser les
activités et tâches de l'agent afin de permettre le télétravail.
Le télétravail ne peut être déployé auprès de tous les métiers. En sont exclus :
o Les métiers en contact présentiel quotidien et quasi-exclusif avec les usagers, par exemple les
animateurs, le personnel des crèches, agents travaillants dans les écoles, etc…
o Les métiers exercés sur la voie publique.
o Les métiers supportant des contraintes organisationnelles, techniques ou de sécurité
particulière.
o Les activités portant sur des documents papiers confidentiels qui ne peuvent être ni numérisés
ni chiffrés ou qui ne peuvent être transportés sans risque de compromettre leur confidentialité.
Le télétravail est ouvert aux agents quel que soit leur statut (titulaires et contractuels).

1 – PROCEDURE DE DEMANDE DE TELETRAVAIL
L'exercice des fonctions en télétravail est accordé sur demande écrite de l'agent (Annexe n°1). Celleci précise les modalités d'organisation souhaitées, notamment le jour de la semaine travaillé sous cette
forme ainsi que le ou les lieux d'exercice. Si l'agent ne souhaite pas réaliser son télétravail dans son
lieu habituel de télétravail (adresse déclarée), il devra en informer la collectivité.
La demande doit être transmise pour échange et validation au responsable hiérarchique.
Le télétravail pourra se mettre en place, après validation et une fois les dispositions matérielles
opérationnelles.
Le responsable hiérarchique apprécie la compatibilité de la demande avec la nature des activités
exercées, les nécessités de service et les capacités de travail en autonomie de l'agent à l'origine de la
demande.
Toute autorisation ou refus doit faire l'objet d'un entretien préalable entre l'agent et le responsable
hiérarchique.
En cas d'autorisation, l'entretien préalable devra permettre d'échanger autour des grilles d'autoévaluation remplies préalablement par chacune des parties, sur les conditions matérielles d'exercice
du télétravail et sur les horaires de télétravail. (L'autorisation se matérialise par le formulaire en pièce
jointe complété et co-signé).
En cas de refus, le responsable hiérarchique devra, au cours de cet entretien, exposer les motifs de
son refus et les matérialiser par écrit. Avant d'émettre un avis négatif, le N+1 devra avoir échangé
obligatoirement en amont avec son N+1, c'est à dire le N+2 de l'agent. Les avis négatifs devront être
motivés par les critères suivants : l'aptitude de l'agent (autonomie, initiative, rigueur, organisation,
capacité à travailler seul et à gérer son temps), l'adéquation de la fonction et des activités avec le
télétravail tel que décrite dans le protocole, impossibilité de dégager des activités susceptibles d'être
exercées en télétravail.
En cas de refus motivé par le supérieur hiérarchique, l'agent pourra saisir la CAP ou la CCP pour
réexaminer sa demande. Suite à l'avis de la CAP ou de la CCP, la collectivité reste libre de sa décision.
Pour les agents qui ont une autorisation de télétravail, l'articulation des jours forfait se fait sur validation
hiérarchique 5 jours à l'avance, dans la limite de 3 jours par mois.

2 – DUREE DU TELETRAVAIL
L'exercice des fonctions en télétravail peut être autorisé de manière régulière à raison de 4 jours fixes
par mois dans la limite de 1 jour par semaine, et d'un forfait annuel de 15 jours soit 3 jours maximum
par mois.
Dans tous les cas, la durée de l'autorisation ne saurait excéder un an. Les agents qui souhaitent
continuer à télétravailler doivent renouveler leur demande pour validation auprès de leur responsable
hiérarchique (Annexe 1).
En cas de changement de fonctions, l'agent intéressé doit présenter une nouvelle demande.
Il peut être mis fin à cette forme d'organisation du travail par écrit, à tout moment, à l'initiative de
l'administration ou de l'agent, moyennant un délai de prévenance de quinze jours.
Le non-renouvellement ou l'interruption du télétravail pourra notamment se justifier par l'irrespect des
règles de fonctionnement définies avec le N+1, la mauvaise maîtrise des activités réalisées en
télétravail ou encore par le fait que les modalités de travail se sont avérées inadaptées au télétravail.
Par ailleurs, une demande de télétravail exceptionnelle peut être demandée dans un délai de 24h dans
les cas de difficultés à se rendre sur le lieu de travail (difficulté de transport, intempéries) sous réserve
d'un accord hiérarchique et d'un effectif suffisant sur site.
En cas d'absence quel qu'en soit le motif ou de jour férié ou de fermeture de service coïncidant avec
une journée habituellement télétravaillée, l'agent ne pourra exiger le report du jour de télétravail.

3 – SUSPENSION DU TELETRAVAIL
L'agent peut être confronté à des obligations qui sont de nature à empêcher de manière temporaire la
réalisation de ses missions depuis son domicile.
De même, des circonstances tenant à des impératifs opérationnels de service peuvent conduire à
requérir la présence de l'agent sur son lieu de travail habituel.
Dans ce cas, l'agent en télétravail ou l'administration informe de la suspension temporaire de la
situation de télétravail au moins 24h avant la date de mise en œuvre de la suspension.
L'agent ne pourra exiger le report du jour fixe de télétravail.
En cas de non-utilisation du forfait jours, le report n'est pas possible.

4 –QUOTITE DE TELETRAVAIL
A Gennevilliers, le télétravail ne peut excéder 2 jours par semaine en tenant compte d'1 jour fixe par
semaine et de l'utilisation du forfait annuel de 15 jours dans la limite de 3 jours maximum par mois. Le
temps de présence sur le lieu d'affectation ne peut être inférieur à 3 jours par semaine, sauf, à leur
demande, pour les agents dont l'état de santé le justifie, après avis du médecin de travail.
En effet, conformément à l'article 4 du Décret n° 2016-151 du 11 février 2016, à la demande des agents
dont l'état de santé le justifie et après avis du médecin du travail, il peut être dérogé pour six mois
maximum aux conditions fixées ci-dessus. Cette dérogation est renouvelable une fois après avis du
médecin du travail.
Pour les agents soumis à un planning de travail hebdomadaire, le jour de télétravail devra être fixe et
planifié dans celui-ci. Pour les agents non soumis à un planning strict, le jour télétravaillé pourra être
mouvant dans la semaine de travail.
L'agent qui pose un congé de 1 jour ou qui a une formation de 1 jour pourra télétravailler 2 jours par
semaine sous réserve des effectifs suffisants sur site.
Le télétravail n'est pas autorisé pour une demie journée.
Le télétravail ne peut être appliqué pour garder ses enfants ou pour couvrir une maladie ordinaire.
Pour les agents à temps partiel 80% ou 90%, les modalités sont les mêmes.

En revanche, pour les agents à temps partiel en dessous de 80%, le forfait de jours sera proratisé en
fonction de son temps de travail.
Au bout d'un an de mise en place du télétravail, une évaluation a permis de faire évoluer la quotité de
télétravail, et le présent protocole.

5 – OUTIL DU TELETRAVAIL
L'ouverture au télétravail devra se faire dans des conditions techniques, organisationnelles et de
sécurité qui garantissent la qualité du travail.
L'agent en télétravail doit disposer d'une ligne internet haut débit sur son lieu d'exercice du télétravail,
condition indispensable à la réalisation du télétravail.
Aussi, l'autorisation de télétravailler est conditionnée par la disponibilité des technologies de
l'information et de communication mises à disposition par la collectivité. L'utilisation de ce matériel est
strictement limitée à l'exercice de la seule activité professionnelle.
L'agent qui se verra confier du matériel informatique s'engage à en faire un usage conforme à sa
destination dans les conditions d'emploi normales, à en prendre soin et à en avoir l'usage exclusif.
L'agent qui manifesterait de sa propre initiative, le souhait de télétravailler en utilisant son propre
matériel informatique, verra sa demande étudiée au regard de la compatibilité technique du matériel et
des applications.
En cas de dysfonctionnement des équipements, les agents doivent informer sans délai leur hiérarchie
et le service informatique afin de déterminer les procédures à suivre. Si les perturbations constatées
ne permettent plus l'exercice du télétravail, le responsable hiérarchique peut exiger que le travail
attendu soit effectué en présentiel. La durée du déplacement est alors décomptée comme du temps de
travail. Le télétravailleur ne peut pas se voir imposer des congés durant une période d'indisponibilité
pour cause de problèmes techniques imputables à la collectivité.
Outre le matériel technologique, chaque agent se verra doté à sa première demande d'un Kit
ergonomique. Celui sera composé d'un support dorsal adaptable, d'un tapis de souris et d'un support
pour PC portable. Ce kit devra également être restitué à la fin de l'exercice du télétravail.

6 – LIEU DU TELETRAVAIL
Le télétravail peut s'exercer au domicile et/ou autre domicile (sous réserve d'un accord hiérarchique, à
l'exception des agents tenus par une astreinte), ou dans un autre espace de travail.
Le domicile s'entend comme le lieu de résidence principale de l'agent tel que déclaré à la DRH. Ce lieu
sera précisé dans le formulaire d'autorisation du télétravail.
L'agent s'engage à informer son responsable hiérarchique de tout changement d'adresse d'exercice
de télétravail.
Le télétravailleur a également la liberté de proposer comme adresse de télétravail un espace de travail
public gratuit dès lors que cet espace garantit une certaine confidentialité (bibliothèque, espace public
numérique, etc.)

7– RYTHME DE TELETRAVAIL
Le responsable hiérarchique veille au respect de la réglementation du temps de travail telle que définie
par les textes en vigueur : durée maximale de travail quotidien et hebdomadaire, durée minimale de
repos quotidien et hebdomadaire. La durée de travail est la même que celle des agents travaillant sur
site dans le service concerné et en application des horaires habituelles de l'agent (mêmes plages fixes
de disponibilité).
Le télétravail n'a pas vocation à générer des heures supplémentaires.

Le télétravail ne doit pas s'accompagner d'une flexibilité accrue et d'une dégradation des conditions de
travail : le principe d'égalité de traitement entre les agents doit s'appliquer s'agissant de la charge de
travail et des délais d'exécution. La charge de travail des agents exerçant leurs fonctions en télétravail
doit ainsi être équivalente à celle des agents en situation comparable travaillant sur site.
Comme pour le travail sur site, le fait d'être joignable n'implique pas pour autant l'obligation d'apporter
une réponse immédiate à toute sollicitation. Par ailleurs, l'agent en télétravail ne saurait exiger une
réponse immédiate à ses sollicitations. En dehors des plages horaires définies, le télétravailleur n'est
pas censé être connecté, aussi aucune réponse immédiate ne peut être attendue, par exemple, à un
courriel durant la pause méridienne, ou le soir en dehors des plages horaires définies, le week-end ou
pendant les congés.

8 – PRISE EN CHARGE DES COUTS DU TELETRAVAIL.
Par principe le télétravail ne saurait être un argumentaire de négociation salariale.
Les agents qui exercent leurs fonctions en télétravail ne bénéficient d'aucune prise en charge ou
indemnisation liée à des éventuels coûts ou frais engagés.
La collectivité ne saurait supporter les frais inhérents à d'éventuelles mises en conformité des
installations électriques, abonnements internet ou tout autre frais en lien avec le télétravail.
Par ailleurs, les frais de transports pris en charges par la ville dans le cadre du télétravail correspondent
à 50% du prix de leurs titres d'abonnement correspondant aux déplacements effectués entre leur
domicile et leur lieu de travail habituel au moyen de transports publics de voyageurs. Le remboursement
des frais de transport ne sera pas diminué en fonction du nombre de jour en télétravail et la collectivité
ne prendra pas en charge des frais de transport pour un lieu de travail différent du domicile.
9- LA PRISE EN COMPTE DES AGENTS EN SITUATIONS PARTICULIERES .
Le télétravail était déjà identifié avant la crise comme un levier possible du maintien en emploi de
certaines catégories d'agents (voir en ce sens la modification apportée au décret télétravail en 2019
pour les agents en situation de handicap). De manière plus générale, le télétravail est un outil
supplémentaire pour intégrer et maintenir au travail les agents qui en sont le plus éloignés, quelle qu'en
soit la raison.
S'agissant des femmes enceintes, l'article 4 du décret de 2016 prévoit déjà qu'il peut être dérogé à la
règle des trois jours de télétravail maximum, à la demande des agentes. Les signataires de l'accord
conviennent que l'autorisation pourra être donnée sans avis préalable du médecin du travail.
S'agissant des proches aidants au sens de l'article L. 3142-16 du code du travail, les signataires
reconnaissent que le télétravail peut constituer une mesure de prévention primaire, qu'il est de nature
à favoriser le maintien en emploi et qu'il permet également à l'employeur de garantir plus facilement la
continuité du service public dont il a la charge.
C'est pourquoi, à la demande de l'agent concerné, et sous réserve que ses activités soient
télétravaillables, l'employeur peut autoriser un proche aidant à bénéficier du télétravail au-delà des trois
jours hebdomadaires fixés par le décret du 11 février 2016. Cette autorisation a une durée de trois
mois, renouvelable.

10. LE TELETRAVAIL EN CAS DE CIRCONSTANCES EXCEPTIONNELLES.
Le cadre réglementaire fonde le recours au télétravail sur une demande volontaire de l'agent et l'accord
de sa hiérarchie.
Toutefois, il est nécessaire de sécuriser et mieux encadrer le recours au télétravail contraint en cas de
circonstances exceptionnelles. Il s'agit d'une organisation différente du travail rendue nécessaire en
cas de circonstances exceptionnelles durables, notamment en cas de pandémie ou de catastrophe

naturelle, qui peuvent conduire la collectivité à imposer le télétravail pour permettre de concilier la
protection des agents et la continuité du service public.
Ces modalités exceptionnelles doivent également être intégrées aux plans de continuité d'activité.

Le conseil municipal du 31 mai 2023 a délibéré l'évolution des modalités d'application du télétravail.
A compter du 01 juin 2023, le télétravail évolue à raison d'un jour fixe par semaine accompagné d'un forfait annuel de 15 jours dans la limite de 3 jours maximum par mois. La présence de l'agent sur site est obligatoire 3 jours par semaine.
L'articulation des jours forfait se fait sur validation hiérarchique 5 jours à l'avance. Pour les agents à temps partiel, le forfait annuel de 15 jours sera proratisé en fonction du temps de travail des agents en dessous de 80%.
En cas de non utilisation du forfait, le report de ces jours n'est pas possible.
Il est important de rappeler que le temps de travail est le même que sur site, avec les mêmes plages fixes de présence obligatoire.
En cas d'absence quel qu'en soit le motif ou de jour férié ou de fermeture de service coïncidant avec une journée habituellement télétravaillée, le report du jour de télétravail n'est pas autorisé.
Pour cette année 2023, l'utilisation du forfait annuel ne pourra dépasser 09 jours étant donné que cette évolution démarre au 01 juin 2023.
Le protocole Télétravail sera disponible sur intranet dans la rubrique "la vie de l'agent/ télétravail" dès le 01 juin 2023.
`,Ir=[{id:1,title:"Accident de trajet : où commence le trajet domicile-travail lorsqu'un agent réside dans un immeuble collectif ?",content:"Le trajet domicile-travail commence dès la sortie de l'immeuble collectif où réside l'agent. Cela inclut les parties communes de l'immeuble (hall, escaliers, ascenseur) jusqu'à la voie publique. En cas d'accident dans ces espaces communs, celui-ci peut être reconnu comme accident de trajet si l'agent se rendait effectivement au travail ou en revenait."},{id:2,title:"Un fonctionnaire territorial peut-il demander une mutation tout en étant en disponibilité  ?",content:"Dans la fonction publique territoriale, un fonctionnaire placé en disponibilité ne peut pas être muté directement puisqu’il n’est pas en position d’activité. Toutefois, il lui reste possible de préparer sa mobilité et de poser sa candidature à une mutation, à condition de respecter la procédure adaptée. Ce cadre juridique doit être bien compris par les services RH afin d’accompagner correctement les agents."},{id:3,title:"Repenser le recrutement pour une fonction publique plus inclusive.",content:"La fonction publique territoriale s'engage vers plus d'inclusivité en diversifiant ses méthodes de recrutement. Cela passe par l'adaptation des épreuves pour les personnes en situation de handicap, la valorisation de l'expérience professionnelle via la reconnaissance des acquis, et le développement de parcours d'insertion pour favoriser l'égalité des chances dans l'accès aux emplois publics."},{id:4,title:"Sanction: Utilisation WhatApp.",content:"La circonstance qu’un agent ait envoyé depuis son téléphone personnel et sa messagerie WhatsApp, à l'attention de plusieurs personnes, dont des élus, des photos montages assortis de sous-titre déshonorants à l'encontre de la maire de la ville et de son troisième adjoint, présente un caractère fautif et non humoristique, compte-tenu de la nature des photographies diffusées et des personnes visées par ces montages. Par suite, le comportement de l’intéressé constitue un manquement à son obligation de dignité, de réserve de probité, d'intégrité et de loyauté, justifiant son exclusion de fonctions durant deux ans. La circonstance que les messages incriminés soient provenus de la messagerie privée de l'intéressé et en dehors du service est sans incidence dès lors que le comportement d'un agent public peut avoir pour effet de perturber le service ou de jeter le discrédit sur l'administration, comme en l'espèce.TA Cergy-Pontoise 2201748 du 09.07.2025."}];Ir.map(e=>e.title).join(" • ");const xr=[{id:1,title:"Les informés de franceinfo - 20/08/2025",url:"https://media.radiofrance-podcast.net/podcast09/14088-20.08.2025-ITEMA_24220608-2025I23024S0232-NET_MFO_F973B7FE-2CFA-4684-B4EF-5C811DBE1EF8-21.mp3?podcast=podcast09/14088-20.08.2025-ITEMA_24220608-2025I23024S0232-NET_MFO_F973B7FE-2CFA-4684-B4EF-5C811DBE1EF8-21.mp3&geoipcountry=FR&geoipzip=75018&provider=public&cu=14088&itemMasterMid=2025I23024S0232&pubDate=1755716260&br=23024&title=Les+informés+de+franceinfo&stationname=France+Info",duration:"50:25",description:"L'actualité politique et sociale du jour",date:"20/08/2025"},{id:2,title:"Podcast Naudrh - Arret maladie Baisse a 90%",url:"https://audio.ausha.co/yk4aasqX1w8m.mp3",duration:"6:45",description:"Baisse de rémunération en cas de congés pour maladie ordinaire (CMO) !",date:"19/08/2025"},{id:3,title:"Podcast Radio france  - Depense publique stop ou encore ?",url:"https://media.radiofrance-podcast.net/podcast09/24408-05.05.2025-ITEMA_24123940-2025F51881S0125-NET_MFI_2B52238C-DD76-4DED-A1BD-C848BABD1642-27.m4a",duration:"18:20",description:"Tout savoir sur la depense ",date:"18/08/2025"},{id:4,title:"Podcast Radio France - Perte d'Attractivite ",url:"https://media.radiofrance-podcast.net/2025/6/3/NET_MFO_f2992cf3-ede2-46ba-a173-110376f3b3f3.mp3",duration:"25:10",description:"Les opportunités de formation",date:"17/08/2025"},{id:5,title:"Podcast Citoyen - Les types de prisons",url:"https://open.acast.com/public/streams/63f887026c3fc00011d022e2/episodes/6621010d4df82b0013c839a0.mp3",duration:"20:15",description:"Les types de prisons",date:"16/08/2025"}],Zp="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",em="https://api.perplexity.ai/chat/completions",tm="https://www.franceinfo.fr/politique.rss",nm="https://corsproxy.io/?",rm=nm+encodeURIComponent(tm),im=[{title:"Réforme des retraites : nouvelles négociations prévues",link:"#",pubDate:new Date().toISOString(),guid:"1"},{title:"Budget 2024 : les principales mesures votées",link:"#",pubDate:new Date().toISOString(),guid:"2"},{title:"Fonction publique : accord sur les salaires",link:"#",pubDate:new Date().toISOString(),guid:"3"},{title:"Télétravail : nouvelles directives gouvernementales",link:"#",pubDate:new Date().toISOString(),guid:"4"},{title:"Dialogue social : rencontre avec les syndicats",link:"#",pubDate:new Date().toISOString(),guid:"5"}],Ki=JSON.parse(Jp),Wo=e=>typeof e!="string"?"":e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\w\s]/gi,"").trim(),sm=()=>{const[e,t]=M.useState(im),[n,r]=M.useState(!0);return M.useEffect(()=>{(async()=>{try{const s=await fetch(rm);if(!s.ok)throw new Error;const a=await s.text(),o=new DOMParser().parseFromString(a,"text/xml"),l=Array.from(o.querySelectorAll("item")).slice(0,10).map((c,g)=>{var h,v,x,E;return{title:((h=c.querySelector("title"))==null?void 0:h.textContent)||`Actualité ${g+1}`,link:((v=c.querySelector("link"))==null?void 0:v.textContent)||"#",pubDate:((x=c.querySelector("pubDate"))==null?void 0:x.textContent)||new Date().toISOString(),guid:((E=c.querySelector("guid"))==null?void 0:E.textContent)||`${g}`}});l.length&&t(l)}catch{console.log("Utilisation des données de secours pour les actualités")}finally{r(!1)}})()},[]),n?p.jsxs("div",{className:"flex items-center justify-center p-4 bg-blue-900/80 rounded-lg",children:[p.jsx("div",{className:"animate-spin rounded-full h-5 w-5 border-b-2 border-white"}),p.jsx("span",{className:"ml-2 text-white text-sm",children:"Chargement des actualités..."})]}):p.jsxs("div",{className:"w-full bg-blue-900/80 rounded-lg overflow-hidden border border-blue-500/30 shadow-inner",children:[p.jsx("div",{className:"flex items-center whitespace-nowrap py-3 ticker-container",children:p.jsx("div",{className:"flex animate-ticker hover:[animation-play-state:paused]",children:[...e,...e].map((i,s)=>p.jsxs("a",{href:i.link,target:"_blank",rel:"noreferrer",className:"flex items-center mx-6 text-white hover:text-blue-200 transition-colors no-underline",children:[p.jsx("span",{className:"mr-2 text-yellow-300",children:"📰"}),p.jsx("span",{className:"font-medium text-lg sm:text-xl",children:i.title}),p.jsx("span",{className:"mx-4 text-blue-300",children:"•"})]},`${i.guid}-${s}`))})}),p.jsx("style",{jsx:!0,children:`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-container { overflow: hidden; white-space: nowrap; }
        .animate-ticker { display: inline-flex; animation: ticker 40s linear infinite; }
      `})]})},am=e=>{const t=Wo(e),n=t.split(/\s+/).filter(Boolean),r=new Map;return Ki.chapitres.forEach((s,a)=>{var c;let o=0;[...s.mots_cles||[],...((c=s.articles)==null?void 0:c.flatMap(g=>g.mots_cles))||[]].forEach(g=>{const h=Wo(g);n.includes(h)?o+=10:t.includes(h)&&(o+=5)}),o&&r.set(a+1,(r.get(a+1)||0)+o)}),r.size?Array.from(r.entries()).sort(([,s],[,a])=>a-s).slice(0,3).map(([s])=>{const a=Ki.chapitres[s-1].titre,o=Kp[s]||"";return`Source: ${a}
Contenu: ${o}`}).join(`

---

`):"Aucun chapitre spécifique trouvé. Thèmes : "+Ki.chapitres.map(s=>s.titre).join(", ")},om=()=>{const[e,t]=M.useState(null),[n,r]=M.useState(!1),[i,s]=M.useState(0),[a,o]=M.useState(0),[l,c]=M.useState(1),[g,h]=M.useState(!0),[v,x]=M.useState(!1),[E,L]=M.useState(null),A=M.useRef(null);M.useEffect(()=>{const f=A.current;if(!f)return;r(!1),s(0),o(0),L(null),x(!1);const T={timeupdate:()=>s(f.currentTime||0),loadedmetadata:()=>{f.duration&&isFinite(f.duration)&&o(f.duration)},canplay:()=>x(!1),ended:()=>{r(!1);const w=xr.findIndex(D=>D.id===(e==null?void 0:e.id));w<xr.length-1&&t(xr[w+1])},error:()=>{x(!1),r(!1),L("Impossible de charger ce podcast. Vérifiez votre connexion.")},loadstart:()=>x(!0),waiting:()=>x(!0),playing:()=>{x(!1),r(!0)},pause:()=>r(!1)};return Object.entries(T).forEach(([w,D])=>f.addEventListener(w,D)),f.volume=l,e&&f.load(),()=>{Object.entries(T).forEach(([w,D])=>f.removeEventListener(w,D))}},[e,l]);const d=async()=>{const f=A.current;if(!(!f||!e))try{if(n)f.pause(),r(!1);else{x(!0),L(null),f.readyState<HTMLMediaElement.HAVE_ENOUGH_DATA&&(f.load(),await new Promise((N,T)=>{const w=setTimeout(()=>T(new Error("Timeout")),1e4),D=()=>{clearTimeout(w),N()},k=()=>{clearTimeout(w),T()};f.addEventListener("canplay",D),f.addEventListener("error",k)}));const j=f.play();j!==void 0&&await j,r(!0)}}catch{L("Impossible de lire ce podcast."),x(!1),r(!1)}},u=f=>{t(f),r(!1),s(0),o(0),L(null),x(!1)},m=f=>{if(!f||isNaN(f))return"0:00";const j=Math.floor(f/60),N=Math.floor(f%60).toString().padStart(2,"0");return`${j}:${N}`};return p.jsx("div",{className:`fixed right-4 bottom-4 z-50 transition-all duration-300 ${g?"w-48 h-12":"w-80 h-auto"}`,children:p.jsxs("div",{className:"flex flex-col bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-xl shadow-lg border border-purple-500/30 overflow-hidden px-2 py-2",children:[p.jsxs("div",{className:"flex items-center justify-between",children:[p.jsx("button",{onClick:()=>h(!g),className:"text-white p-1.5",children:g?"⬜":"➖"}),e&&p.jsx("button",{onClick:d,className:"bg-purple-600 hover:bg-purple-700 text-white rounded-full p-1.5",children:n?p.jsx(Hp,{className:"w-4 h-4"}):p.jsx($p,{className:"w-4 h-4"})}),p.jsx(Wp,{className:"w-4 h-4 text-gray-300"}),p.jsx("input",{type:"range",min:"0",max:"100",value:l*100,onChange:f=>c(parseFloat(f.target.value)/100),className:"w-24 h-1 bg-purple-300 rounded slider"})]}),p.jsx("audio",{ref:A,src:e==null?void 0:e.url,preload:"metadata",style:{display:"none"},crossOrigin:"anonymous"}),!g&&p.jsxs("div",{className:"mt-4",children:[p.jsx("h4",{className:"text-white font-bold text-center mb-2",children:"Épisodes disponibles"}),p.jsx("ul",{children:xr.map(f=>p.jsx("li",{children:p.jsx("button",{onClick:()=>u(f),className:`block w-full text-left px-4 py-2 rounded hover:bg-purple-700 text-white mb-1 ${(e==null?void 0:e.id)===f.id?"bg-purple-700 font-semibold":"bg-purple-600"}`,children:f.title})},f.id))}),e&&p.jsxs("div",{className:"mt-2 px-4 text-sm text-purple-200",children:[p.jsxs("span",{children:["Lecture : ",e.title]}),p.jsxs("div",{children:[m(i)," / ",m(a)]}),E&&p.jsx("div",{className:"text-red-300",children:E})]})]})]})})};function lm(){const[e,t]=M.useState({currentView:"menu",selectedDomain:null,messages:[],isProcessing:!1}),[n,r]=M.useState(""),[i,s]=M.useState(null),a=M.useRef(null),o=M.useRef(null),l=M.useRef(null),c=()=>{setTimeout(()=>{if(l.current){const A=l.current.getBoundingClientRect(),d=window.pageYOffset||document.documentElement.scrollTop,u=A.top+d-window.innerHeight/2+A.height/2;window.scrollTo({top:u,behavior:"smooth"})}},100)},g=A=>{t({currentView:"chat",selectedDomain:A,messages:[{type:"assistant",content:{0:"Bonjour ! Je peux vous aider avec vos questions sur les horaires, congés, ARTT, temps partiel, heures supplémentaires, absences, etc.",1:"Bonjour ! Je peux vous renseigner sur le CPF, les congés de formation, la VAE, les concours, les bilans de compétences, etc. Quelle est votre question ?",2:"Bonjour ! Je suis l'assistant spécialiste du télétravail. Posez-moi vos questions sur la charte, les jours autorisés, les indemnités, etc."}[A],timestamp:new Date}],isProcessing:!1}),c(),setTimeout(()=>{var u;return(u=o.current)==null?void 0:u.focus()},150)},h=()=>{t({currentView:"menu",selectedDomain:null,messages:[],isProcessing:!1}),r(""),s(null)},v=async A=>{const d=await fetch(em,{method:"POST",headers:{Authorization:`Bearer ${Zp}`,"Content-Type":"application/json"},body:JSON.stringify({model:"sonar-pro",messages:A})});if(!d.ok){const m=await d.text();throw console.error("Détail de l'erreur API:",m),new Error(`Erreur API (${d.status})`)}return(await d.json()).choices[0].message.content},x=async A=>{let d="";e.selectedDomain===0?d=am(A):e.selectedDomain===1?d=JSON.stringify(Xp,null,2):e.selectedDomain===2&&(d=Yp);const u=`
Tu es un collègue syndical spécialiste pour la mairie de Gennevilliers.
Ta mission est de répondre aux questions des agents en te basant EXCLUSIVEMENT sur la documentation fournie ci-dessous.
NE JAMAIS utiliser tes connaissances générales.
Si la réponse ne se trouve pas dans la documentation, réponds : "Je ne trouve pas l'information dans les documents à ma disposition. Veuillez contacter le 64 64 pour plus de détails."
Sois précis, utilise un ton AMICAL et cite le titre du chapitre si possible.
--- DEBUT DE LA DOCUMENTATION PERTINENTE ---
${d}
--- FIN DE LA DOCUMENTATION PERTINENTE ---
    `,m=e.messages.slice(1).map(j=>({role:j.type==="user"?"user":"assistant",content:j.content})),f=[{role:"system",content:u},...m,{role:"user",content:A}];return await v(f)},E=async()=>{const A=n.trim();if(!A||e.isProcessing)return;const d={type:"user",content:A,timestamp:new Date};t(u=>({...u,messages:[...u.messages,d],isProcessing:!0})),r(""),c();try{const m={type:"assistant",content:await x(A),timestamp:new Date};t(f=>({...f,messages:[...f.messages,m]}))}catch(u){console.error(u);const m={type:"assistant",content:"Désolé, une erreur est survenue. Veuillez réessayer ou contacter un représentant si le problème persiste.",timestamp:new Date};t(f=>({...f,messages:[...f.messages,m]}))}finally{t(u=>({...u,isProcessing:!1})),c(),setTimeout(()=>{var u;return(u=o.current)==null?void 0:u.focus()},100)}},L=A=>{A.key==="Enter"&&!A.shiftKey&&(A.preventDefault(),E())};return p.jsxs("div",{className:"min-h-screen relative",children:[p.jsx("div",{className:"fixed inset-0 bg-cover bg-center bg-no-repeat z-0",style:{backgroundImage:"url('/unnamed.png')"}}),p.jsx("div",{className:"fixed inset-0 bg-black/10 z-0"}),p.jsx(om,{}),p.jsx("header",{className:"relative bg-gradient-to-r from-white/95 via-orange-50/95 to-white/95 shadow-2xl border-b-4 border-orange-500 z-10",children:p.jsxs("div",{className:"max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-6",children:[p.jsxs("div",{className:"flex flex-col sm:flex-row items-center gap-6 flex-grow",children:[p.jsxs("div",{className:"relative",children:[p.jsx("div",{className:"absolute -inset-4 bg-gradient-to-r from-orange-400 via-red-400 to-orange-500 rounded-full blur-lg opacity-70 animate-pulse"}),p.jsx("div",{className:"relative p-6 bg-gradient-to-br from-white to-orange-50 rounded-full shadow-2xl",children:p.jsx(Ji,{className:"w-20 h-20 text-orange-500"})})]}),p.jsxs("div",{children:[p.jsx("h1",{className:"text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent drop-shadow-sm",children:"Atlas: Chatbot CFDT"}),p.jsx("h2",{className:"text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent",children:"Mairie de GENNEVILLIERS"}),p.jsxs("p",{className:"mt-4 flex justify-center sm:justify-start items-center gap-2 text-lg text-gray-700",children:[p.jsx(Ji,{className:"text-orange-500 w-5 h-5 animate-pulse"}),"Assistant syndical CFDT pour les agents municipaux"]})]})]}),p.jsxs("div",{className:"relative",children:[p.jsx("div",{className:"absolute -inset-8 bg-gradient-to-r from-orange-400 via-orange-500 to-red-400 rounded-full blur-2xl opacity-90 animate-pulse"}),p.jsx("div",{className:"absolute -inset-6 bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 rounded-full blur-xl opacity-70"}),p.jsx("div",{className:"absolute -inset-4 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400 rounded-full blur-lg opacity-50"}),p.jsx("div",{className:"relative bg-white rounded-full w-48 h-48 shadow-lg flex items-center justify-center p-0",children:p.jsx("img",{src:"/logo-cfdt.png",alt:"Logo CFDT",className:"w-full h-full object-contain",style:{maxWidth:"100%",maxHeight:"100%"}})})]})]})}),p.jsx("main",{className:"relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10",children:e.currentView==="menu"?p.jsxs(p.Fragment,{children:[p.jsxs("section",{className:"relative bg-orange-300 text-black overflow-hidden mx-4 rounded-2xl shadow-lg z-10",children:[p.jsxs("div",{className:"relative h-20 flex items-center overflow-hidden",children:[p.jsx("div",{className:"absolute left-0 top-0 h-full w-40 flex items-center justify-center bg-orange-400 z-20 shadow-md",children:p.jsx("span",{className:"text-2xl font-bold",children:"NEWS FTP:"})}),p.jsx("div",{className:"animate-marquee whitespace-nowrap flex items-center pl-44",style:{animation:"marquee 30s linear infinite"},children:[...Ir,...Ir,...Ir].map((A,d)=>p.jsxs("button",{onClick:()=>s(A),className:"text-2xl font-medium mx-8 hover:text-blue-200 transition-colors underline decoration-dotted cursor-pointer",children:["#",A.id,": ",A.title]},`${A.id}-${d}`))})]}),p.jsx("style",{jsx:!0,children:`
                @keyframes marquee {
                  0% { transform: translateX(0%); }
                  100% { transform: translateX(-33.33%); }
                }
              `})]}),i&&p.jsxs("section",{className:"info-detail bg-white p-6 rounded-lg shadow-md mt-8 max-w-4xl mx-auto",children:[p.jsx("h3",{className:"text-xl font-bold mb-4",children:i.title}),p.jsx("p",{children:i.content}),p.jsx("button",{onClick:()=>s(null),className:"mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600",children:"Fermer"})]}),p.jsxs("section",{className:"text-center my-8",children:[p.jsx("h3",{className:"text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-purple-700 bg-clip-text text-transparent mb-4",children:"Choisissez votre domaine d’assistance"}),p.jsx("p",{className:"text-xl text-gray-700 max-w-3xl mx-auto",children:"Sélectionnez le service qui correspond à vos besoins. Nos assistants IA spécialisés vous aideront."})]}),p.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12",children:[p.jsxs("button",{onClick:()=>g(0),className:"group relative overflow-hidden bg-white/95 border-2 border-orange-200 rounded-3xl p-10 transition-all duration-500 hover:border-orange-400 hover:shadow-2xl hover:-translate-y-2",children:[p.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 opacity-0 group-hover:opacity-100 transition-opacity"}),p.jsxs("div",{className:"relative z-10 flex flex-col items-center gap-6",children:[p.jsxs("div",{className:"relative",children:[p.jsx("span",{className:"absolute -inset-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl opacity-20 blur-lg group-hover:scale-110 transition"}),p.jsx("div",{className:"relative p-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl shadow-2xl group-hover:rotate-3 group-hover:scale-110 transition-all",children:p.jsx(Mp,{className:"w-12 h-12 text-white"})})]}),p.jsx("h4",{className:"text-2xl font-bold text-gray-800 group-hover:text-orange-700",children:"Règlement du Temps de Travail"}),p.jsx("p",{className:"text-center text-gray-600",children:"Horaires, congés, ARTT, temps partiel, heures sup, absences…"}),p.jsxs("div",{className:"flex items-center gap-2 text-orange-500 opacity-0 group-hover:opacity-100 transition",children:[p.jsx("span",{className:"font-semibold",children:"Accéder à l’assistant"}),p.jsx(Wi,{className:"w-4 h-4 animate-pulse"})]})]})]}),p.jsxs("button",{onClick:()=>g(1),className:"group relative overflow-hidden bg-white/95 border-2 border-purple-200 rounded-3xl p-10 transition-all duration-500 hover:border-purple-400 hover:shadow-2xl hover:-translate-y-2",children:[p.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity"}),p.jsxs("div",{className:"relative z-10 flex flex-col items-center gap-6",children:[p.jsxs("div",{className:"relative",children:[p.jsx("span",{className:"absolute -inset-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl opacity-20 blur-lg group-hover:scale-110 transition"}),p.jsx("div",{className:"relative p-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl shadow-2xl group-hover:rotate-3 group-hover:scale-110 transition-all",children:p.jsx(Fp,{className:"w-12 h-12 text-white"})})]}),p.jsx("h4",{className:"text-2xl font-bold text-gray-800 group-hover:text-purple-700",children:"Formation Professionnelle"}),p.jsx("p",{className:"text-center text-gray-600",children:"CPF, congés formation, VAE, concours, bilans de compétences…"}),p.jsxs("div",{className:"flex items-center gap-2 text-purple-500 opacity-0 group-hover:opacity-100 transition",children:[p.jsx("span",{className:"font-semibold",children:"Accéder à l’assistant"}),p.jsx(Wi,{className:"w-4 h-4 animate-pulse"})]})]})]})]}),p.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12",children:[p.jsxs("button",{onClick:()=>g(2),className:"group relative overflow-hidden bg-white/95 border-2 border-green-200 rounded-3xl p-10 transition-all duration-500 hover:border-green-400 hover:shadow-2xl hover:-translate-y-2",children:[p.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-green-50 via-teal-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity"}),p.jsxs("div",{className:"relative z-10 flex flex-col items-center gap-6",children:[p.jsxs("div",{className:"relative",children:[p.jsx("span",{className:"absolute -inset-3 bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl opacity-20 blur-lg group-hover:scale-110 transition"}),p.jsx("div",{className:"relative p-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl shadow-2xl group-hover:rotate-3 group-hover:scale-110 transition-all",children:p.jsx(zp,{className:"w-12 h-12 text-white"})})]}),p.jsx("h4",{className:"text-2xl font-bold text-gray-800 group-hover:text-green-700",children:"Télétravail"}),p.jsx("p",{className:"text-center text-gray-600",children:"Charte, jours autorisés, indemnités, modalités…"}),p.jsxs("div",{className:"flex items-center gap-2 text-green-500 opacity-0 group-hover:opacity-100 transition",children:[p.jsx("span",{className:"font-semibold",children:"Accéder à l’assistant"}),p.jsx(Wi,{className:"w-4 h-4 animate-pulse"})]})]})]}),p.jsxs("div",{className:"group relative overflow-hidden bg-white/95 border-2 border-blue-200 rounded-3xl p-10 transition-all duration-500 hover:border-blue-400 hover:shadow-2xl hover:-translate-y-2",children:[p.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity"}),p.jsxs("div",{className:"relative z-10 flex flex-col items-center gap-6",children:[p.jsxs("div",{className:"relative",children:[p.jsx("span",{className:"absolute -inset-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl opacity-20 blur-lg group-hover:scale-110 transition"}),p.jsx("div",{className:"relative p-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-2xl group-hover:rotate-3 group-hover:scale-110 transition-all",children:p.jsx(Qp,{className:"w-12 h-12 text-white"})})]}),p.jsx("h4",{className:"text-2xl font-bold text-gray-800 group-hover:text-blue-700",children:"Actualités Politiques"}),p.jsx("div",{className:"w-full",children:p.jsx(sm,{})})]})]})]})]}):p.jsxs("div",{ref:l,className:"bg-white/95 rounded-3xl shadow-2xl border border-gray-200 overflow-hidden",children:[p.jsxs("div",{className:"bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 p-6 flex items-center justify-between",children:[p.jsxs("div",{className:"flex items-center gap-4",children:[p.jsx("button",{onClick:h,className:"text-white hover:text-orange-200",children:p.jsx(_p,{className:"w-6 h-6"})}),p.jsxs("div",{children:[p.jsxs("h3",{className:"text-xl font-bold text-white",children:[e.selectedDomain===0&&"Assistant Temps de Travail",e.selectedDomain===1&&"Assistant Formation",e.selectedDomain===2&&"Assistant Télétravail"]}),p.jsx("p",{className:"text-orange-100 text-sm",children:"Posez vos questions, je suis là pour vous aider"})]})]}),p.jsx(Ji,{className:"w-8 h-8 text-white"})]}),p.jsxs("div",{className:"h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white",children:[e.messages.map((A,d)=>p.jsx("div",{className:`flex ${A.type==="user"?"justify-end":"justify-start"}`,children:p.jsxs("div",{className:`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg ${A.type==="user"?"bg-gradient-to-r from-orange-500 to-red-500 text-white":"bg-white border border-gray-200 text-gray-800"}`,children:[p.jsx("p",{className:"text-sm leading-relaxed whitespace-pre-wrap",children:A.content}),p.jsx("p",{className:"text-xs mt-2 opacity-70",children:A.timestamp.toLocaleTimeString()})]})},d)),e.isProcessing&&p.jsx("div",{className:"flex justify-start",children:p.jsx("div",{className:"bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-lg",children:p.jsxs("div",{className:"flex items-center space-x-2",children:[p.jsx("div",{className:"animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"}),p.jsx("span",{className:"text-sm text-gray-600",children:"L’assistant réfléchit..."})]})})}),p.jsx("div",{ref:a})]}),p.jsx("div",{className:"p-6 bg-gray-50 border-t border-gray-200",children:p.jsxs("div",{className:"flex items-center space-x-4",children:[p.jsx("input",{ref:o,type:"text",value:n,onChange:A=>r(A.target.value),onKeyPress:L,placeholder:"Tapez votre question ici...",className:"flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent",disabled:e.isProcessing}),p.jsxs("button",{onClick:E,disabled:!n.trim()||e.isProcessing,className:"bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg",children:[p.jsx(Gp,{className:"w-4 h-4"}),p.jsx("span",{className:"hidden sm:inline",children:"Envoyer"})]})]})})]})}),p.jsx("footer",{className:"relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 z-10",children:p.jsxs("div",{className:"max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",children:[p.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-12",children:[p.jsxs("div",{className:"text-center md:text-left",children:[p.jsx("h4",{className:"text-2xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent",children:"Contact CFDT"}),p.jsxs("div",{className:"space-y-4",children:[p.jsxs("div",{className:"flex items-center justify-center md:justify-start gap-3",children:[p.jsx(Bp,{className:"w-5 h-5 text-orange-400"}),p.jsx("span",{children:"01 40 85 64 64"})]}),p.jsxs("div",{className:"flex items-center justify-center md:justify-start gap-3",children:[p.jsx(Up,{className:"w-5 h-5 text-orange-400"}),p.jsx("span",{children:"cfdt-interco@ville-gennevilliers.fr"})]}),p.jsxs("div",{className:"flex items-center justify-center md:justify-start gap-3",children:[p.jsx(Vp,{className:"w-5 h-5 text-orange-400"}),p.jsx("span",{children:"Mairie de Gennevilliers"})]})]})]}),p.jsxs("div",{className:"text-center",children:[p.jsx("h4",{className:"text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent",children:"Services"}),p.jsxs("ul",{className:"space-y-3 text-gray-300",children:[p.jsx("li",{children:"Sante"}),p.jsx("li",{children:"Retraite"}),p.jsx("li",{children:"Juridique"}),p.jsx("li",{children:"Accompagnement syndical"})]})]}),p.jsxs("div",{className:"text-center md:text-right",children:[p.jsx("h4",{className:"text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent",children:"Horaires"}),p.jsxs("div",{className:"space-y-3 text-gray-300",children:[p.jsx("div",{children:"Lundi - Vendredi"}),p.jsx("div",{className:"font-semibold text-white",children:"9h00 - 17h00"}),p.jsx("div",{className:"text-sm",children:"Permanences sur RDV"})]})]})]}),p.jsx("div",{className:"border-t border-gray-700 mt-12 pt-8 text-center",children:p.jsx("p",{className:"text-gray-400",children:"© 2025 CFDT Gennevilliers - Assistant IA pour les agents municipaux"})})]})})]})}od(document.getElementById("root")).render(p.jsx(M.StrictMode,{children:p.jsx(lm,{})}));
