(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";
var $ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);

$(function() {
  var SectionBox = require('./components/section_box');
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./components/section_box":9}],2:[function(require,module,exports){
(function (global){
; var __browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
// Backbone.Supermodel
// v1.1.15
//
// Copyright (c)2015 Tan Nguyen
// Distributed under MIT license
//
Backbone.SuperModel=function(a,b){var c=function(b){for(var c=b.length-1;c>=0;c--){var d=b.slice(0,c),e=b.slice(c);if(1!=e.length){d=d.join(".");var f=this;d.length>0&&(f=this.get(d));for(var g=a.first(e),h=a.rest(e),i=[g],j=0;j<h.length;j++)g=[g,h[j]].join("."),i.push(g);for(var k=0;k<i.length;k++){var l=i[k],m=f.trigger;m&&a.isFunction(m)&&m.call(f,"change:"+l,f,f.get(l))}}}},d=function(b){return a.isString(b)&&(b=b.split(".")),b},e=function(a,b,c){b=d(b);for(var e=b.length,f=0;e>f;f++){if(!a||"object"!=typeof a)return c;a=a[b[f]]}return void 0===a?c:a},f=function(a,b,c){b=d(b),lastKeyIndex=b.length-1;for(var e=0;lastKeyIndex>e;++e)key=b[e],key in a||(a[key]={}),a=a[key];c(a,b[lastKeyIndex])},g=function(a,b,c){f(a,b,function(a,b){a[b]=c})},h=function(a,b){f(a,b,function(a,b){delete a[b]})},i=function(b,c){var d=!1;return f(b,c,function(b,c){d=a.has(b,c)}),d},j=function(c,e,f){e=d(e);var g=a.first(e),h=c.get(g);h instanceof b.Model&&j(h,a.rest(e),f),f(c,e)},k=function(b,c,d){var e;if(c){var f=a.result(b,"relations");e=f[c]}return d&&!e&&(e=n),void 0==e&&(e=n),e},l=function(b,c){var d=a.result(b,"name");return d&&!c[d]&&(c[d]=b),c},m=function(a){return a.constructor===Object},n=b.Model.extend({relations:{},unsafeAttributes:[],name:null,_valueForCollection:function(b){return a.isArray(b)?b.length>=1?a.isObject(b[0]):!0:!1},_nestedSet:function(d,e,f){d=d.split(".");for(var g=d.length-1,h=this,i=0;g>i;++i){var j=d[i],p=h.attributes[j];if(!p){var q=k(h,j,e),r=new q;h.attributes[j]=l(h,r,f)}h=h.attributes[j]}var s=d[g];if(!a.isArray(e)&&a.isObject(e)&&m(e))if(0===a.size(e))h.attributes[s]=new n;else for(var t in e){var u=s+"."+t;h._nestedSet(u,e[t],f)}else if(this._valueForCollection(e)){var v=k(h,s,e);v.prototype instanceof b.Model&&(v=o);var w=new v(e);w=l(h,w,f),h.attributes[s]=w}else 1==d.length?h.attributes[s]=e:h.set(s,e,a.extend({skipNested:!0,forceChange:!0},f));f.silent||c.call(this,d)},_setChanging:function(){this._previousAttributes=this.toJSON(),this.changed={}},_triggerChanges:function(a,b,c){a.length&&(this._pending=!0);for(var d=0,e=a.length;e>d;d++)c||(c=this.get(a[d])),1==a[d].split(".").length&&this.trigger("change:"+a[d],this,c,b)},_setChange:function(b,c,d){var e=this.get(b);return b=b.split("."),!a.isEqual(e,c)||d.forceChange?(g(this.changed,b,c),!0):(h(this.changed,b),!1)},set:function(a,b,c){var d,e,f,g,h,i,k;if(null==a)return this;if("object"==typeof a?(e=a,c=b):(e={},e[a]=b),c=c||{},!this._validate(e,c))return!1;f=c.unset,h=c.silent,g=[],i=this._changing,k=c.skipNested,this._changing=!0,i||this._setChanging(),this.idAttribute in e&&(this.id=e[this.idAttribute]);var l=function(a,b){delete a.attributes[b]};for(d in e)b=e[d],this._setChange(d,b,c)&&g.push(d),f?j(this,d,l):k?this.attributes[d]=b:this._nestedSet(d,b,c);if(h||this._triggerChanges(g,c),i)return this;if(!h)for(;this._pending;)this._pending=!1,this.trigger("change",this,c);return this._pending=!1,this._changing=!1,this},get:function(b){var c=b?b.split("."):[];if(c.length>1){var d=this.attributes[a.first(c)];if(!d)return;var e=a.rest(c).join(".");return a.isFunction(d.get)?d.get(e):d[e]}return this.attributes[b]},toJSON:function(b){b=b||{};var c=a.result(this,"unsafeAttributes");b.except&&(c=a.union(c,b.except));var d=a.clone(this.attributes);return a.each(c,function(a){delete d[a]}),a.each(d,function(b,c){b&&a.isFunction(b.toJSON)&&(d[c]=b.toJSON())}),d},hasChanged:function(b){return null==b?!a.isEmpty(this.changed):i(this.changed,b)},previous:function(a){return null!=a&&this._previousAttributes?e(this._previousAttributes,a):null},clear:function(){this.id=void 0;for(var a in this.attributes){var c=this.attributes[a];c instanceof b.Model?c.clear():c instanceof b.Collection?c.reset():this.unset(a)}return this}}),o=b.Collection.extend({model:n});return n}(_,Backbone);
; browserify_shim__define__module__export__(typeof Backbone.SuperModel != "undefined" ? Backbone.SuperModel : window.Backbone.SuperModel);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
; var __browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
/*! Magnific Popup - v1.0.0 - 2014-12-12
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2014 Dmitry Semenov; */
(function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?e((typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null)):e(window.jQuery||window.Zepto)})(function(e){var t,n,i,o,r,a,s,l="Close",c="BeforeClose",d="AfterClose",u="BeforeAppend",p="MarkupParse",f="Open",m="Change",g="mfp",h="."+g,v="mfp-ready",C="mfp-removing",y="mfp-prevent-close",w=function(){},b=!!window.jQuery,I=e(window),x=function(e,n){t.ev.on(g+e+h,n)},k=function(t,n,i,o){var r=document.createElement("div");return r.className="mfp-"+t,i&&(r.innerHTML=i),o?n&&n.appendChild(r):(r=e(r),n&&r.appendTo(n)),r},T=function(n,i){t.ev.triggerHandler(g+n,i),t.st.callbacks&&(n=n.charAt(0).toLowerCase()+n.slice(1),t.st.callbacks[n]&&t.st.callbacks[n].apply(t,e.isArray(i)?i:[i]))},E=function(n){return n===s&&t.currTemplate.closeBtn||(t.currTemplate.closeBtn=e(t.st.closeMarkup.replace("%title%",t.st.tClose)),s=n),t.currTemplate.closeBtn},_=function(){e.magnificPopup.instance||(t=new w,t.init(),e.magnificPopup.instance=t)},S=function(){var e=document.createElement("p").style,t=["ms","O","Moz","Webkit"];if(void 0!==e.transition)return!0;for(;t.length;)if(t.pop()+"Transition"in e)return!0;return!1};w.prototype={constructor:w,init:function(){var n=navigator.appVersion;t.isIE7=-1!==n.indexOf("MSIE 7."),t.isIE8=-1!==n.indexOf("MSIE 8."),t.isLowIE=t.isIE7||t.isIE8,t.isAndroid=/android/gi.test(n),t.isIOS=/iphone|ipad|ipod/gi.test(n),t.supportsTransition=S(),t.probablyMobile=t.isAndroid||t.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),o=e(document),t.popupsCache={}},open:function(n){i||(i=e(document.body));var r;if(n.isObj===!1){t.items=n.items.toArray(),t.index=0;var s,l=n.items;for(r=0;l.length>r;r++)if(s=l[r],s.parsed&&(s=s.el[0]),s===n.el[0]){t.index=r;break}}else t.items=e.isArray(n.items)?n.items:[n.items],t.index=n.index||0;if(t.isOpen)return t.updateItemHTML(),void 0;t.types=[],a="",t.ev=n.mainEl&&n.mainEl.length?n.mainEl.eq(0):o,n.key?(t.popupsCache[n.key]||(t.popupsCache[n.key]={}),t.currTemplate=t.popupsCache[n.key]):t.currTemplate={},t.st=e.extend(!0,{},e.magnificPopup.defaults,n),t.fixedContentPos="auto"===t.st.fixedContentPos?!t.probablyMobile:t.st.fixedContentPos,t.st.modal&&(t.st.closeOnContentClick=!1,t.st.closeOnBgClick=!1,t.st.showCloseBtn=!1,t.st.enableEscapeKey=!1),t.bgOverlay||(t.bgOverlay=k("bg").on("click"+h,function(){t.close()}),t.wrap=k("wrap").attr("tabindex",-1).on("click"+h,function(e){t._checkIfClose(e.target)&&t.close()}),t.container=k("container",t.wrap)),t.contentContainer=k("content"),t.st.preloader&&(t.preloader=k("preloader",t.container,t.st.tLoading));var c=e.magnificPopup.modules;for(r=0;c.length>r;r++){var d=c[r];d=d.charAt(0).toUpperCase()+d.slice(1),t["init"+d].call(t)}T("BeforeOpen"),t.st.showCloseBtn&&(t.st.closeBtnInside?(x(p,function(e,t,n,i){n.close_replaceWith=E(i.type)}),a+=" mfp-close-btn-in"):t.wrap.append(E())),t.st.alignTop&&(a+=" mfp-align-top"),t.fixedContentPos?t.wrap.css({overflow:t.st.overflowY,overflowX:"hidden",overflowY:t.st.overflowY}):t.wrap.css({top:I.scrollTop(),position:"absolute"}),(t.st.fixedBgPos===!1||"auto"===t.st.fixedBgPos&&!t.fixedContentPos)&&t.bgOverlay.css({height:o.height(),position:"absolute"}),t.st.enableEscapeKey&&o.on("keyup"+h,function(e){27===e.keyCode&&t.close()}),I.on("resize"+h,function(){t.updateSize()}),t.st.closeOnContentClick||(a+=" mfp-auto-cursor"),a&&t.wrap.addClass(a);var u=t.wH=I.height(),m={};if(t.fixedContentPos&&t._hasScrollBar(u)){var g=t._getScrollbarSize();g&&(m.marginRight=g)}t.fixedContentPos&&(t.isIE7?e("body, html").css("overflow","hidden"):m.overflow="hidden");var C=t.st.mainClass;return t.isIE7&&(C+=" mfp-ie7"),C&&t._addClassToMFP(C),t.updateItemHTML(),T("BuildControls"),e("html").css(m),t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo||i),t._lastFocusedEl=document.activeElement,setTimeout(function(){t.content?(t._addClassToMFP(v),t._setFocus()):t.bgOverlay.addClass(v),o.on("focusin"+h,t._onFocusIn)},16),t.isOpen=!0,t.updateSize(u),T(f),n},close:function(){t.isOpen&&(T(c),t.isOpen=!1,t.st.removalDelay&&!t.isLowIE&&t.supportsTransition?(t._addClassToMFP(C),setTimeout(function(){t._close()},t.st.removalDelay)):t._close())},_close:function(){T(l);var n=C+" "+v+" ";if(t.bgOverlay.detach(),t.wrap.detach(),t.container.empty(),t.st.mainClass&&(n+=t.st.mainClass+" "),t._removeClassFromMFP(n),t.fixedContentPos){var i={marginRight:""};t.isIE7?e("body, html").css("overflow",""):i.overflow="",e("html").css(i)}o.off("keyup"+h+" focusin"+h),t.ev.off(h),t.wrap.attr("class","mfp-wrap").removeAttr("style"),t.bgOverlay.attr("class","mfp-bg"),t.container.attr("class","mfp-container"),!t.st.showCloseBtn||t.st.closeBtnInside&&t.currTemplate[t.currItem.type]!==!0||t.currTemplate.closeBtn&&t.currTemplate.closeBtn.detach(),t._lastFocusedEl&&e(t._lastFocusedEl).focus(),t.currItem=null,t.content=null,t.currTemplate=null,t.prevHeight=0,T(d)},updateSize:function(e){if(t.isIOS){var n=document.documentElement.clientWidth/window.innerWidth,i=window.innerHeight*n;t.wrap.css("height",i),t.wH=i}else t.wH=e||I.height();t.fixedContentPos||t.wrap.css("height",t.wH),T("Resize")},updateItemHTML:function(){var n=t.items[t.index];t.contentContainer.detach(),t.content&&t.content.detach(),n.parsed||(n=t.parseEl(t.index));var i=n.type;if(T("BeforeChange",[t.currItem?t.currItem.type:"",i]),t.currItem=n,!t.currTemplate[i]){var o=t.st[i]?t.st[i].markup:!1;T("FirstMarkupParse",o),t.currTemplate[i]=o?e(o):!0}r&&r!==n.type&&t.container.removeClass("mfp-"+r+"-holder");var a=t["get"+i.charAt(0).toUpperCase()+i.slice(1)](n,t.currTemplate[i]);t.appendContent(a,i),n.preloaded=!0,T(m,n),r=n.type,t.container.prepend(t.contentContainer),T("AfterChange")},appendContent:function(e,n){t.content=e,e?t.st.showCloseBtn&&t.st.closeBtnInside&&t.currTemplate[n]===!0?t.content.find(".mfp-close").length||t.content.append(E()):t.content=e:t.content="",T(u),t.container.addClass("mfp-"+n+"-holder"),t.contentContainer.append(t.content)},parseEl:function(n){var i,o=t.items[n];if(o.tagName?o={el:e(o)}:(i=o.type,o={data:o,src:o.src}),o.el){for(var r=t.types,a=0;r.length>a;a++)if(o.el.hasClass("mfp-"+r[a])){i=r[a];break}o.src=o.el.attr("data-mfp-src"),o.src||(o.src=o.el.attr("href"))}return o.type=i||t.st.type||"inline",o.index=n,o.parsed=!0,t.items[n]=o,T("ElementParse",o),t.items[n]},addGroup:function(e,n){var i=function(i){i.mfpEl=this,t._openClick(i,e,n)};n||(n={});var o="click.magnificPopup";n.mainEl=e,n.items?(n.isObj=!0,e.off(o).on(o,i)):(n.isObj=!1,n.delegate?e.off(o).on(o,n.delegate,i):(n.items=e,e.off(o).on(o,i)))},_openClick:function(n,i,o){var r=void 0!==o.midClick?o.midClick:e.magnificPopup.defaults.midClick;if(r||2!==n.which&&!n.ctrlKey&&!n.metaKey){var a=void 0!==o.disableOn?o.disableOn:e.magnificPopup.defaults.disableOn;if(a)if(e.isFunction(a)){if(!a.call(t))return!0}else if(a>I.width())return!0;n.type&&(n.preventDefault(),t.isOpen&&n.stopPropagation()),o.el=e(n.mfpEl),o.delegate&&(o.items=i.find(o.delegate)),t.open(o)}},updateStatus:function(e,i){if(t.preloader){n!==e&&t.container.removeClass("mfp-s-"+n),i||"loading"!==e||(i=t.st.tLoading);var o={status:e,text:i};T("UpdateStatus",o),e=o.status,i=o.text,t.preloader.html(i),t.preloader.find("a").on("click",function(e){e.stopImmediatePropagation()}),t.container.addClass("mfp-s-"+e),n=e}},_checkIfClose:function(n){if(!e(n).hasClass(y)){var i=t.st.closeOnContentClick,o=t.st.closeOnBgClick;if(i&&o)return!0;if(!t.content||e(n).hasClass("mfp-close")||t.preloader&&n===t.preloader[0])return!0;if(n===t.content[0]||e.contains(t.content[0],n)){if(i)return!0}else if(o&&e.contains(document,n))return!0;return!1}},_addClassToMFP:function(e){t.bgOverlay.addClass(e),t.wrap.addClass(e)},_removeClassFromMFP:function(e){this.bgOverlay.removeClass(e),t.wrap.removeClass(e)},_hasScrollBar:function(e){return(t.isIE7?o.height():document.body.scrollHeight)>(e||I.height())},_setFocus:function(){(t.st.focus?t.content.find(t.st.focus).eq(0):t.wrap).focus()},_onFocusIn:function(n){return n.target===t.wrap[0]||e.contains(t.wrap[0],n.target)?void 0:(t._setFocus(),!1)},_parseMarkup:function(t,n,i){var o;i.data&&(n=e.extend(i.data,n)),T(p,[t,n,i]),e.each(n,function(e,n){if(void 0===n||n===!1)return!0;if(o=e.split("_"),o.length>1){var i=t.find(h+"-"+o[0]);if(i.length>0){var r=o[1];"replaceWith"===r?i[0]!==n[0]&&i.replaceWith(n):"img"===r?i.is("img")?i.attr("src",n):i.replaceWith('<img src="'+n+'" class="'+i.attr("class")+'" />'):i.attr(o[1],n)}}else t.find(h+"-"+e).html(n)})},_getScrollbarSize:function(){if(void 0===t.scrollbarSize){var e=document.createElement("div");e.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(e),t.scrollbarSize=e.offsetWidth-e.clientWidth,document.body.removeChild(e)}return t.scrollbarSize}},e.magnificPopup={instance:null,proto:w.prototype,modules:[],open:function(t,n){return _(),t=t?e.extend(!0,{},t):{},t.isObj=!0,t.index=n||0,this.instance.open(t)},close:function(){return e.magnificPopup.instance&&e.magnificPopup.instance.close()},registerModule:function(t,n){n.options&&(e.magnificPopup.defaults[t]=n.options),e.extend(this.proto,n.proto),this.modules.push(t)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&times;</button>',tClose:"Close (Esc)",tLoading:"Loading..."}},e.fn.magnificPopup=function(n){_();var i=e(this);if("string"==typeof n)if("open"===n){var o,r=b?i.data("magnificPopup"):i[0].magnificPopup,a=parseInt(arguments[1],10)||0;r.items?o=r.items[a]:(o=i,r.delegate&&(o=o.find(r.delegate)),o=o.eq(a)),t._openClick({mfpEl:o},i,r)}else t.isOpen&&t[n].apply(t,Array.prototype.slice.call(arguments,1));else n=e.extend(!0,{},n),b?i.data("magnificPopup",n):i[0].magnificPopup=n,t.addGroup(i,n);return i};var P,O,z,M="inline",B=function(){z&&(O.after(z.addClass(P)).detach(),z=null)};e.magnificPopup.registerModule(M,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){t.types.push(M),x(l+"."+M,function(){B()})},getInline:function(n,i){if(B(),n.src){var o=t.st.inline,r=e(n.src);if(r.length){var a=r[0].parentNode;a&&a.tagName&&(O||(P=o.hiddenClass,O=k(P),P="mfp-"+P),z=r.after(O).detach().removeClass(P)),t.updateStatus("ready")}else t.updateStatus("error",o.tNotFound),r=e("<div>");return n.inlineElement=r,r}return t.updateStatus("ready"),t._parseMarkup(i,{},n),i}}});var F,H="ajax",L=function(){F&&i.removeClass(F)},A=function(){L(),t.req&&t.req.abort()};e.magnificPopup.registerModule(H,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){t.types.push(H),F=t.st.ajax.cursor,x(l+"."+H,A),x("BeforeChange."+H,A)},getAjax:function(n){F&&i.addClass(F),t.updateStatus("loading");var o=e.extend({url:n.src,success:function(i,o,r){var a={data:i,xhr:r};T("ParseAjax",a),t.appendContent(e(a.data),H),n.finished=!0,L(),t._setFocus(),setTimeout(function(){t.wrap.addClass(v)},16),t.updateStatus("ready"),T("AjaxContentAdded")},error:function(){L(),n.finished=n.loadError=!0,t.updateStatus("error",t.st.ajax.tError.replace("%url%",n.src))}},t.st.ajax.settings);return t.req=e.ajax(o),""}}});var j,N=function(n){if(n.data&&void 0!==n.data.title)return n.data.title;var i=t.st.image.titleSrc;if(i){if(e.isFunction(i))return i.call(t,n);if(n.el)return n.el.attr(i)||""}return""};e.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var e=t.st.image,n=".image";t.types.push("image"),x(f+n,function(){"image"===t.currItem.type&&e.cursor&&i.addClass(e.cursor)}),x(l+n,function(){e.cursor&&i.removeClass(e.cursor),I.off("resize"+h)}),x("Resize"+n,t.resizeImage),t.isLowIE&&x("AfterChange",t.resizeImage)},resizeImage:function(){var e=t.currItem;if(e&&e.img&&t.st.image.verticalFit){var n=0;t.isLowIE&&(n=parseInt(e.img.css("padding-top"),10)+parseInt(e.img.css("padding-bottom"),10)),e.img.css("max-height",t.wH-n)}},_onImageHasSize:function(e){e.img&&(e.hasSize=!0,j&&clearInterval(j),e.isCheckingImgSize=!1,T("ImageHasSize",e),e.imgHidden&&(t.content&&t.content.removeClass("mfp-loading"),e.imgHidden=!1))},findImageSize:function(e){var n=0,i=e.img[0],o=function(r){j&&clearInterval(j),j=setInterval(function(){return i.naturalWidth>0?(t._onImageHasSize(e),void 0):(n>200&&clearInterval(j),n++,3===n?o(10):40===n?o(50):100===n&&o(500),void 0)},r)};o(1)},getImage:function(n,i){var o=0,r=function(){n&&(n.img[0].complete?(n.img.off(".mfploader"),n===t.currItem&&(t._onImageHasSize(n),t.updateStatus("ready")),n.hasSize=!0,n.loaded=!0,T("ImageLoadComplete")):(o++,200>o?setTimeout(r,100):a()))},a=function(){n&&(n.img.off(".mfploader"),n===t.currItem&&(t._onImageHasSize(n),t.updateStatus("error",s.tError.replace("%url%",n.src))),n.hasSize=!0,n.loaded=!0,n.loadError=!0)},s=t.st.image,l=i.find(".mfp-img");if(l.length){var c=document.createElement("img");c.className="mfp-img",n.el&&n.el.find("img").length&&(c.alt=n.el.find("img").attr("alt")),n.img=e(c).on("load.mfploader",r).on("error.mfploader",a),c.src=n.src,l.is("img")&&(n.img=n.img.clone()),c=n.img[0],c.naturalWidth>0?n.hasSize=!0:c.width||(n.hasSize=!1)}return t._parseMarkup(i,{title:N(n),img_replaceWith:n.img},n),t.resizeImage(),n.hasSize?(j&&clearInterval(j),n.loadError?(i.addClass("mfp-loading"),t.updateStatus("error",s.tError.replace("%url%",n.src))):(i.removeClass("mfp-loading"),t.updateStatus("ready")),i):(t.updateStatus("loading"),n.loading=!0,n.hasSize||(n.imgHidden=!0,i.addClass("mfp-loading"),t.findImageSize(n)),i)}}});var W,R=function(){return void 0===W&&(W=void 0!==document.createElement("p").style.MozTransform),W};e.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(e){return e.is("img")?e:e.find("img")}},proto:{initZoom:function(){var e,n=t.st.zoom,i=".zoom";if(n.enabled&&t.supportsTransition){var o,r,a=n.duration,s=function(e){var t=e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),i="all "+n.duration/1e3+"s "+n.easing,o={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},r="transition";return o["-webkit-"+r]=o["-moz-"+r]=o["-o-"+r]=o[r]=i,t.css(o),t},d=function(){t.content.css("visibility","visible")};x("BuildControls"+i,function(){if(t._allowZoom()){if(clearTimeout(o),t.content.css("visibility","hidden"),e=t._getItemToZoom(),!e)return d(),void 0;r=s(e),r.css(t._getOffset()),t.wrap.append(r),o=setTimeout(function(){r.css(t._getOffset(!0)),o=setTimeout(function(){d(),setTimeout(function(){r.remove(),e=r=null,T("ZoomAnimationEnded")},16)},a)},16)}}),x(c+i,function(){if(t._allowZoom()){if(clearTimeout(o),t.st.removalDelay=a,!e){if(e=t._getItemToZoom(),!e)return;r=s(e)}r.css(t._getOffset(!0)),t.wrap.append(r),t.content.css("visibility","hidden"),setTimeout(function(){r.css(t._getOffset())},16)}}),x(l+i,function(){t._allowZoom()&&(d(),r&&r.remove(),e=null)})}},_allowZoom:function(){return"image"===t.currItem.type},_getItemToZoom:function(){return t.currItem.hasSize?t.currItem.img:!1},_getOffset:function(n){var i;i=n?t.currItem.img:t.st.zoom.opener(t.currItem.el||t.currItem);var o=i.offset(),r=parseInt(i.css("padding-top"),10),a=parseInt(i.css("padding-bottom"),10);o.top-=e(window).scrollTop()-r;var s={width:i.width(),height:(b?i.innerHeight():i[0].offsetHeight)-a-r};return R()?s["-moz-transform"]=s.transform="translate("+o.left+"px,"+o.top+"px)":(s.left=o.left,s.top=o.top),s}}});var Z="iframe",q="//about:blank",D=function(e){if(t.currTemplate[Z]){var n=t.currTemplate[Z].find("iframe");n.length&&(e||(n[0].src=q),t.isIE8&&n.css("display",e?"block":"none"))}};e.magnificPopup.registerModule(Z,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){t.types.push(Z),x("BeforeChange",function(e,t,n){t!==n&&(t===Z?D():n===Z&&D(!0))}),x(l+"."+Z,function(){D()})},getIframe:function(n,i){var o=n.src,r=t.st.iframe;e.each(r.patterns,function(){return o.indexOf(this.index)>-1?(this.id&&(o="string"==typeof this.id?o.substr(o.lastIndexOf(this.id)+this.id.length,o.length):this.id.call(this,o)),o=this.src.replace("%id%",o),!1):void 0});var a={};return r.srcAction&&(a[r.srcAction]=o),t._parseMarkup(i,a,n),t.updateStatus("ready"),i}}});var K=function(e){var n=t.items.length;return e>n-1?e-n:0>e?n+e:e},Y=function(e,t,n){return e.replace(/%curr%/gi,t+1).replace(/%total%/gi,n)};e.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var n=t.st.gallery,i=".mfp-gallery",r=Boolean(e.fn.mfpFastClick);return t.direction=!0,n&&n.enabled?(a+=" mfp-gallery",x(f+i,function(){n.navigateByImgClick&&t.wrap.on("click"+i,".mfp-img",function(){return t.items.length>1?(t.next(),!1):void 0}),o.on("keydown"+i,function(e){37===e.keyCode?t.prev():39===e.keyCode&&t.next()})}),x("UpdateStatus"+i,function(e,n){n.text&&(n.text=Y(n.text,t.currItem.index,t.items.length))}),x(p+i,function(e,i,o,r){var a=t.items.length;o.counter=a>1?Y(n.tCounter,r.index,a):""}),x("BuildControls"+i,function(){if(t.items.length>1&&n.arrows&&!t.arrowLeft){var i=n.arrowMarkup,o=t.arrowLeft=e(i.replace(/%title%/gi,n.tPrev).replace(/%dir%/gi,"left")).addClass(y),a=t.arrowRight=e(i.replace(/%title%/gi,n.tNext).replace(/%dir%/gi,"right")).addClass(y),s=r?"mfpFastClick":"click";o[s](function(){t.prev()}),a[s](function(){t.next()}),t.isIE7&&(k("b",o[0],!1,!0),k("a",o[0],!1,!0),k("b",a[0],!1,!0),k("a",a[0],!1,!0)),t.container.append(o.add(a))}}),x(m+i,function(){t._preloadTimeout&&clearTimeout(t._preloadTimeout),t._preloadTimeout=setTimeout(function(){t.preloadNearbyImages(),t._preloadTimeout=null},16)}),x(l+i,function(){o.off(i),t.wrap.off("click"+i),t.arrowLeft&&r&&t.arrowLeft.add(t.arrowRight).destroyMfpFastClick(),t.arrowRight=t.arrowLeft=null}),void 0):!1},next:function(){t.direction=!0,t.index=K(t.index+1),t.updateItemHTML()},prev:function(){t.direction=!1,t.index=K(t.index-1),t.updateItemHTML()},goTo:function(e){t.direction=e>=t.index,t.index=e,t.updateItemHTML()},preloadNearbyImages:function(){var e,n=t.st.gallery.preload,i=Math.min(n[0],t.items.length),o=Math.min(n[1],t.items.length);for(e=1;(t.direction?o:i)>=e;e++)t._preloadItem(t.index+e);for(e=1;(t.direction?i:o)>=e;e++)t._preloadItem(t.index-e)},_preloadItem:function(n){if(n=K(n),!t.items[n].preloaded){var i=t.items[n];i.parsed||(i=t.parseEl(n)),T("LazyLoad",i),"image"===i.type&&(i.img=e('<img class="mfp-img" />').on("load.mfploader",function(){i.hasSize=!0}).on("error.mfploader",function(){i.hasSize=!0,i.loadError=!0,T("LazyLoadError",i)}).attr("src",i.src)),i.preloaded=!0}}}});var U="retina";e.magnificPopup.registerModule(U,{options:{replaceSrc:function(e){return e.src.replace(/\.\w+$/,function(e){return"@2x"+e})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var e=t.st.retina,n=e.ratio;n=isNaN(n)?n():n,n>1&&(x("ImageHasSize."+U,function(e,t){t.img.css({"max-width":t.img[0].naturalWidth/n,width:"100%"})}),x("ElementParse."+U,function(t,i){i.src=e.replaceSrc(i,n)}))}}}}),function(){var t=1e3,n="ontouchstart"in window,i=function(){I.off("touchmove"+r+" touchend"+r)},o="mfpFastClick",r="."+o;e.fn.mfpFastClick=function(o){return e(this).each(function(){var a,s=e(this);if(n){var l,c,d,u,p,f;s.on("touchstart"+r,function(e){u=!1,f=1,p=e.originalEvent?e.originalEvent.touches[0]:e.touches[0],c=p.clientX,d=p.clientY,I.on("touchmove"+r,function(e){p=e.originalEvent?e.originalEvent.touches:e.touches,f=p.length,p=p[0],(Math.abs(p.clientX-c)>10||Math.abs(p.clientY-d)>10)&&(u=!0,i())}).on("touchend"+r,function(e){i(),u||f>1||(a=!0,e.preventDefault(),clearTimeout(l),l=setTimeout(function(){a=!1},t),o())})})}s.on("click"+r,function(){a||o()})})},e.fn.destroyMfpFastClick=function(){e(this).off("touchstart"+r+" click"+r),n&&I.off("touchmove"+r+" touchend"+r)}}(),_()});
; browserify_shim__define__module__export__(typeof jQuery.magnificPopup != "undefined" ? jQuery.magnificPopup : window.jQuery.magnificPopup);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){
; var __browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
!function(t,e){"function"==typeof define&&define.amd?define(["tether"],e):"object"==typeof exports?module.exports=e(__browserify_shim_require__("tether")):t.Drop=e(t.Tether)}(this,function(t){"use strict";function e(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t)){var n=[],o=!0,i=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(o=(s=a.next()).done)&&(n.push(s.value),!e||n.length!==e);o=!0);}catch(p){i=!0,r=p}finally{try{!o&&a["return"]&&a["return"]()}finally{if(i)throw r}}return n}throw new TypeError("Invalid attempt to destructure non-iterable instance")}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(t.__proto__=e)}function i(t){var n=t.split(" "),o=e(n,2),i=o[0],r=o[1];if(["left","right"].indexOf(i)>=0){var s=[r,i];i=s[0],r=s[1]}return[i,r].join(" ")}function r(t,e){for(var n=void 0,o=[];-1!==(n=t.indexOf(e));)o.push(t.splice(n,1));return o}function s(){var e=void 0===arguments[0]?{}:arguments[0],d=function(){for(var t=arguments.length,e=Array(t),n=0;t>n;n++)e[n]=arguments[n];return new(u.apply(b,[null].concat(e)))};l(d,{createContext:s,drops:[],defaults:{}});var m={classPrefix:"drop",defaults:{position:"bottom left",openOn:"click",constrainToScrollParent:!0,constrainToWindow:!0,classes:"",remove:!1,tetherOptions:{}}};l(d,m,e),l(d.defaults,m.defaults,e.defaults),"undefined"==typeof P[d.classPrefix]&&(P[d.classPrefix]=[]),d.updateBodyClasses=function(){for(var t=!1,e=P[d.classPrefix],n=e.length,o=0;n>o;++o)if(e[o].isOpened()){t=!0;break}t?h(document.body,""+d.classPrefix+"-open"):c(document.body,""+d.classPrefix+"-open")};var b=function(e){function s(t){if(n(this,s),p(Object.getPrototypeOf(s.prototype),"constructor",this).call(this),this.options=l({},d.defaults,t),this.target=this.options.target,"undefined"==typeof this.target)throw new Error("Drop Error: You must provide a target.");this.options.classes&&this.options.addTargetClasses!==!1&&h(this.target,this.options.classes),d.drops.push(this),P[d.classPrefix].push(this),this._boundEvents=[],this.setupElements(),this.setupEvents(),this.setupTether()}return o(s,e),a(s,[{key:"_on",value:function(t,e,n){this._boundEvents.push({element:t,event:e,handler:n}),t.addEventListener(e,n)}},{key:"setupElements",value:function(){var t=this;if(this.drop=document.createElement("div"),h(this.drop,d.classPrefix),this.options.classes&&h(this.drop,this.options.classes),this.content=document.createElement("div"),h(this.content,""+d.classPrefix+"-content"),"function"==typeof this.options.content){var e=function(){var e=t.options.content.call(t,t);if("string"==typeof e)t.content.innerHTML=e;else{if("object"!=typeof e)throw new Error("Drop Error: Content function should return a string or HTMLElement.");t.content.innerHTML="",t.content.appendChild(e)}};e(),this.on("open",e.bind(this))}else"object"==typeof this.options.content?this.content.appendChild(this.options.content):this.content.innerHTML=this.options.content;this.drop.appendChild(this.content)}},{key:"setupTether",value:function(){var e=this.options.position.split(" ");e[0]=x[e[0]],e=e.join(" ");var n=[];n.push(this.options.constrainToScrollParent?{to:"scrollParent",pin:"top, bottom",attachment:"together none"}:{to:"scrollParent"}),n.push(this.options.constrainToWindow!==!1?{to:"window",attachment:"together"}:{to:"window"});var o={element:this.drop,target:this.target,attachment:i(e),targetAttachment:i(this.options.position),classPrefix:d.classPrefix,offset:"0 0",targetOffset:"0 0",enabled:!1,constraints:n,addTargetClasses:this.options.addTargetClasses};this.options.tetherOptions!==!1&&(this.tether=new t(l({},o,this.options.tetherOptions)))}},{key:"setupEvents",value:function(){var t=this;if(this.options.openOn){if("always"===this.options.openOn)return void setTimeout(this.open.bind(this));var e=this.options.openOn.split(" ");if(e.indexOf("click")>=0)for(var n=function(e){t.toggle(),e.preventDefault()},o=function(e){t.isOpened()&&(e.target===t.drop||t.drop.contains(e.target)||e.target===t.target||t.target.contains(e.target)||t.close())},i=0;i<y.length;++i){var r=y[i];this._on(this.target,r,n),this._on(document,r,o)}e.indexOf("hover")>=0&&!function(){var e=!1,n=function(){e=!0,t.open()},o=null,i=function(){e=!1,"undefined"!=typeof o&&clearTimeout(o),o=setTimeout(function(){e||t.close(),o=null},50)};t._on(t.target,"mouseover",n),t._on(t.drop,"mouseover",n),t._on(t.target,"mouseout",i),t._on(t.drop,"mouseout",i)}()}}},{key:"isOpened",value:function(){return this.drop?f(this.drop,""+d.classPrefix+"-open"):void 0}},{key:"toggle",value:function(){this.isOpened()?this.close():this.open()}},{key:"open",value:function(){var t=this;this.isOpened()||(this.drop.parentNode||document.body.appendChild(this.drop),"undefined"!=typeof this.tether&&this.tether.enable(),h(this.drop,""+d.classPrefix+"-open"),h(this.drop,""+d.classPrefix+"-open-transitionend"),setTimeout(function(){t.drop&&h(t.drop,""+d.classPrefix+"-after-open")}),"undefined"!=typeof this.tether&&this.tether.position(),this.trigger("open"),d.updateBodyClasses())}},{key:"close",value:function(){var t=this;if(this.isOpened()){c(this.drop,""+d.classPrefix+"-open"),c(this.drop,""+d.classPrefix+"-after-open");var e=function n(){f(t.drop,""+d.classPrefix+"-open")||c(t.drop,""+d.classPrefix+"-open-transitionend"),t.drop.removeEventListener(g,n)};this.drop.addEventListener(g,e),this.trigger("close"),"undefined"!=typeof this.tether&&this.tether.disable(),d.updateBodyClasses(),this.options.remove&&this.remove()}}},{key:"remove",value:function(){this.close(),this.drop.parentNode&&this.drop.parentNode.removeChild(this.drop)}},{key:"position",value:function(){this.isOpened()&&"undefined"!=typeof this.tether&&this.tether.position()}},{key:"destroy",value:function(){this.remove(),"undefined"!=typeof this.tether&&this.tether.destroy();for(var t=0;t<this._boundEvents.length;++t){var e=this._boundEvents[t],n=e.element,o=e.event,i=e.handler;n.removeEventListener(o,i)}this._boundEvents=[],this.tether=null,this.drop=null,this.content=null,this.target=null,r(P[d.classPrefix],this),r(d.drops,this)}}]),s}(v);return d}var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),p=function(t,e,n){for(var o=!0;o;){var i=t,r=e,s=n;a=u=p=void 0,o=!1;var a=Object.getOwnPropertyDescriptor(i,r);if(void 0!==a){if("value"in a)return a.value;var p=a.get;return void 0===p?void 0:p.call(s)}var u=Object.getPrototypeOf(i);if(null===u)return void 0;t=u,e=r,n=s,o=!0}},u=Function.prototype.bind,d=t.Utils,l=d.extend,h=d.addClass,c=d.removeClass,f=d.hasClass,v=d.Evented,y=["click"];"ontouchstart"in document.documentElement&&y.push("touchstart");var m={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"},g="";for(var b in m)if({}.hasOwnProperty.call(m,b)){var O=document.createElement("p");"undefined"!==O.style[b]&&(g=m[b])}var x={left:"right",right:"left",top:"bottom",bottom:"top",middle:"middle",center:"center"},P={},E=s();return document.addEventListener("DOMContentLoaded",function(){E.updateBodyClasses()}),E});
; browserify_shim__define__module__export__(typeof Drop != "undefined" ? Drop : window.Drop);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
; var __browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
!function(t,o){"function"==typeof define&&define.amd?define(["tether-drop","tether"],o):"object"==typeof exports?module.exports=o(__browserify_shim_require__("tether-drop"),__browserify_shim_require__("tether")):t.Tooltip=o(t.Drop,t.Tether)}(this,function(t,o){"use strict";function e(t,o){if(!(t instanceof o))throw new TypeError("Cannot call a class as a function")}var n=function(){function t(t,o){for(var e=0;e<o.length;e++){var n=o[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(o,e,n){return e&&t(o.prototype,e),n&&t(o,n),o}}(),i=o.Utils.extend,r=t.createContext({classPrefix:"tooltip"}),s={position:"top center",openOn:"hover",classes:"tooltip-theme-twipsy",constrainToWindow:!0,constrainToScrollParent:!1},p=function(){function t(o){if(e(this,t),this.options=o,!this.options.target)throw new Error("Tooltip Error: You must provide a target for Tooltip to attach to");var n=this.options.target.getAttribute("data-tooltip-position");n&&"undefined"==typeof this.options.position&&(this.options.position=n);var p=this.options.target.getAttribute("data-tooltip");if(p&&"undefined"==typeof this.options.content&&(this.options.content=p),!this.options.content)throw new Error("Tooltip Error: You must provide content for Tooltip to display");this.options=i({},s,this.options),this.drop=new r(this.options)}return n(t,[{key:"close",value:function(){this.drop.close()}},{key:"open",value:function(){this.drop.open()}},{key:"toggle",value:function(){this.drop.toggle()}},{key:"remove",value:function(){this.drop.remove()}},{key:"destroy",value:function(){this.drop.destroy()}},{key:"position",value:function(){this.drop.position()}}]),t}(),a=[];return p.init=function(){for(var t=document.querySelectorAll("[data-tooltip]"),o=t.length,e=0;o>e;++e){var n=t[e];-1===a.indexOf(n)&&(new p({target:n}),a.push(n))}},document.addEventListener("DOMContentLoaded",function(){p.autoinit!==!1&&p.init()}),p});
; browserify_shim__define__module__export__(typeof Tooltip != "undefined" ? Tooltip : window.Tooltip);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
(function (global){
; var __browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
/*! tether 0.7.1 */
!function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e(require,exports,module):t.Tether=e()}(this,function(t,e,o){return function(){var t,e,o,i,n,s,l,r,h,a,f,p,u,d,g,c,m,b,v,y={}.hasOwnProperty,w=[].indexOf||function(t){for(var e=0,o=this.length;o>e;e++)if(e in this&&this[e]===t)return e;return-1},C=[].slice;null==this.Tether&&(this.Tether={modules:[]}),p=function(t){var e,o,i,n,s;if(o=getComputedStyle(t).position,"fixed"===o)return t;for(i=void 0,e=t;e=e.parentNode;){try{n=getComputedStyle(e)}catch(l){}if(null==n)return e;if(/(auto|scroll)/.test(n.overflow+n.overflowY+n.overflowX)&&("absolute"!==o||"relative"===(s=n.position)||"absolute"===s||"fixed"===s))return e}return document.body},m=function(){var t;return t=0,function(){return t++}}(),v={},a=function(t){var e,i,s,l,r;if(s=t._tetherZeroElement,null==s&&(s=t.createElement("div"),s.setAttribute("data-tether-id",m()),n(s.style,{top:0,left:0,position:"absolute"}),t.body.appendChild(s),t._tetherZeroElement=s),e=s.getAttribute("data-tether-id"),null==v[e]){v[e]={},r=s.getBoundingClientRect();for(i in r)l=r[i],v[e][i]=l;o(function(){return v[e]=void 0})}return v[e]},d=null,l=function(t){var e,o,i,n,s,l,r;t===document?(o=document,t=document.documentElement):o=t.ownerDocument,i=o.documentElement,e={},r=t.getBoundingClientRect();for(n in r)l=r[n],e[n]=l;return s=a(o),e.top-=s.top,e.left-=s.left,null==e.width&&(e.width=document.body.scrollWidth-e.left-e.right),null==e.height&&(e.height=document.body.scrollHeight-e.top-e.bottom),e.top=e.top-i.clientTop,e.left=e.left-i.clientLeft,e.right=o.body.clientWidth-e.width-e.left,e.bottom=o.body.clientHeight-e.height-e.top,e},h=function(t){return t.offsetParent||document.documentElement},f=function(){var t,e,o,i,s;return t=document.createElement("div"),t.style.width="100%",t.style.height="200px",e=document.createElement("div"),n(e.style,{position:"absolute",top:0,left:0,pointerEvents:"none",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),e.appendChild(t),document.body.appendChild(e),i=t.offsetWidth,e.style.overflow="scroll",s=t.offsetWidth,i===s&&(s=e.clientWidth),document.body.removeChild(e),o=i-s,{width:o,height:o}},n=function(t){var e,o,i,n,s,l,r;for(null==t&&(t={}),e=[],Array.prototype.push.apply(e,arguments),r=e.slice(1),s=0,l=r.length;l>s;s++)if(i=r[s])for(o in i)y.call(i,o)&&(n=i[o],t[o]=n);return t},g=function(t,e){var o,i,n,s,l,h;if(null!=t.classList){for(l=e.split(" "),h=[],n=0,s=l.length;s>n;n++)i=l[n],i.trim()&&h.push(t.classList.remove(i));return h}return o=r(t).replace(new RegExp("(^| )"+e.split(" ").join("|")+"( |$)","gi")," "),c(t,o)},e=function(t,e){var o,i,n,s,l;if(null!=t.classList){for(s=e.split(" "),l=[],i=0,n=s.length;n>i;i++)o=s[i],o.trim()&&l.push(t.classList.add(o));return l}return g(t,e),o=r(t)+(" "+e),c(t,o)},u=function(t,e){return null!=t.classList?t.classList.contains(e):new RegExp("(^| )"+e+"( |$)","gi").test(r(t))},r=function(t){return t.className instanceof SVGAnimatedString?t.className.baseVal:t.className},c=function(t,e){return t.setAttribute("class",e)},b=function(t,o,i){var n,s,l,r,h,a;for(s=0,r=i.length;r>s;s++)n=i[s],w.call(o,n)<0&&u(t,n)&&g(t,n);for(a=[],l=0,h=o.length;h>l;l++)n=o[l],a.push(u(t,n)?void 0:e(t,n));return a},i=[],o=function(t){return i.push(t)},s=function(){var t,e;for(e=[];t=i.pop();)e.push(t());return e},t=function(){function t(){}return t.prototype.on=function(t,e,o,i){var n;return null==i&&(i=!1),null==this.bindings&&(this.bindings={}),null==(n=this.bindings)[t]&&(n[t]=[]),this.bindings[t].push({handler:e,ctx:o,once:i})},t.prototype.once=function(t,e,o){return this.on(t,e,o,!0)},t.prototype.off=function(t,e){var o,i,n;if(null!=(null!=(i=this.bindings)?i[t]:void 0)){if(null==e)return delete this.bindings[t];for(o=0,n=[];o<this.bindings[t].length;)n.push(this.bindings[t][o].handler===e?this.bindings[t].splice(o,1):o++);return n}},t.prototype.trigger=function(){var t,e,o,i,n,s,l,r,h;if(o=arguments[0],t=2<=arguments.length?C.call(arguments,1):[],null!=(l=this.bindings)?l[o]:void 0){for(n=0,h=[];n<this.bindings[o].length;)r=this.bindings[o][n],i=r.handler,e=r.ctx,s=r.once,i.apply(null!=e?e:this,t),h.push(s?this.bindings[o].splice(n,1):n++);return h}},t}(),this.Tether.Utils={getScrollParent:p,getBounds:l,getOffsetParent:h,extend:n,addClass:e,removeClass:g,hasClass:u,updateClasses:b,defer:o,flush:s,uniqueId:m,Evented:t,getScrollBarSize:f}}.call(this),function(){var t,e,o,i,n,s,l,r,h,a,f,p,u,d,g,c,m,b,v,y,w,C,O,T,x,A,E,S,W,M=[].slice,P=function(t,e){return function(){return t.apply(e,arguments)}};if(null==this.Tether)throw new Error("You must include the utils.js file before tether.js");i=this.Tether,W=i.Utils,c=W.getScrollParent,m=W.getSize,d=W.getOuterSize,p=W.getBounds,u=W.getOffsetParent,a=W.extend,n=W.addClass,O=W.removeClass,A=W.updateClasses,h=W.defer,f=W.flush,g=W.getScrollBarSize,E=function(t,e,o){return null==o&&(o=1),t+o>=e&&e>=t-o},x=function(){var t,e,o,i,n;for(t=document.createElement("div"),n=["transform","webkitTransform","OTransform","MozTransform","msTransform"],o=0,i=n.length;i>o;o++)if(e=n[o],void 0!==t.style[e])return e}(),T=[],C=function(){var t,e,o;for(e=0,o=T.length;o>e;e++)t=T[e],t.position(!1);return f()},b=function(){var t;return null!=(t="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance.now():void 0)?t:+new Date},function(){var t,e,o,i,n,s,l,r,h;for(e=null,o=null,i=null,n=function(){if(null!=o&&o>16)return o=Math.min(o-16,250),void(i=setTimeout(n,250));if(!(null!=e&&b()-e<10))return null!=i&&(clearTimeout(i),i=null),e=b(),C(),o=b()-e},r=["resize","scroll","touchmove"],h=[],s=0,l=r.length;l>s;s++)t=r[s],h.push(window.addEventListener(t,n));return h}(),t={center:"center",left:"right",right:"left"},e={middle:"middle",top:"bottom",bottom:"top"},o={top:0,left:0,middle:"50%",center:"50%",bottom:"100%",right:"100%"},r=function(o,i){var n,s;return n=o.left,s=o.top,"auto"===n&&(n=t[i.left]),"auto"===s&&(s=e[i.top]),{left:n,top:s}},l=function(t){var e,i;return{left:null!=(e=o[t.left])?e:t.left,top:null!=(i=o[t.top])?i:t.top}},s=function(){var t,e,o,i,n,s,l;for(e=1<=arguments.length?M.call(arguments,0):[],o={top:0,left:0},n=0,s=e.length;s>n;n++)l=e[n],i=l.top,t=l.left,"string"==typeof i&&(i=parseFloat(i,10)),"string"==typeof t&&(t=parseFloat(t,10)),o.top+=i,o.left+=t;return o},v=function(t,e){return"string"==typeof t.left&&-1!==t.left.indexOf("%")&&(t.left=parseFloat(t.left,10)/100*e.width),"string"==typeof t.top&&-1!==t.top.indexOf("%")&&(t.top=parseFloat(t.top,10)/100*e.height),t},y=w=function(t){var e,o,i;return i=t.split(" "),o=i[0],e=i[1],{top:o,left:e}},S=function(){function t(t){this.position=P(this.position,this);var e,o,n,s,l;for(T.push(this),this.history=[],this.setOptions(t,!1),s=i.modules,o=0,n=s.length;n>o;o++)e=s[o],null!=(l=e.initialize)&&l.call(this);this.position()}return t.modules=[],t.prototype.getClass=function(t){var e,o;return(null!=(e=this.options.classes)?e[t]:void 0)?this.options.classes[t]:(null!=(o=this.options.classes)?o[t]:void 0)!==!1?this.options.classPrefix?""+this.options.classPrefix+"-"+t:t:""},t.prototype.setOptions=function(t,e){var o,i,s,l,r,h;for(this.options=t,null==e&&(e=!0),o={offset:"0 0",targetOffset:"0 0",targetAttachment:"auto auto",classPrefix:"tether"},this.options=a(o,this.options),r=this.options,this.element=r.element,this.target=r.target,this.targetModifier=r.targetModifier,"viewport"===this.target?(this.target=document.body,this.targetModifier="visible"):"scroll-handle"===this.target&&(this.target=document.body,this.targetModifier="scroll-handle"),h=["element","target"],s=0,l=h.length;l>s;s++){if(i=h[s],null==this[i])throw new Error("Tether Error: Both element and target must be defined");null!=this[i].jquery?this[i]=this[i][0]:"string"==typeof this[i]&&(this[i]=document.querySelector(this[i]))}if(n(this.element,this.getClass("element")),this.options.addTargetClasses!==!1&&n(this.target,this.getClass("target")),!this.options.attachment)throw new Error("Tether Error: You must provide an attachment");return this.targetAttachment=y(this.options.targetAttachment),this.attachment=y(this.options.attachment),this.offset=w(this.options.offset),this.targetOffset=w(this.options.targetOffset),null!=this.scrollParent&&this.disable(),"scroll-handle"===this.targetModifier?this.scrollParent=this.target:this.scrollParent=c(this.target),this.options.enabled!==!1?this.enable(e):void 0},t.prototype.getTargetBounds=function(){var t,e,o,i,n,s,l,r,h;if(null==this.targetModifier)return p(this.target);switch(this.targetModifier){case"visible":return this.target===document.body?{top:pageYOffset,left:pageXOffset,height:innerHeight,width:innerWidth}:(t=p(this.target),n={height:t.height,width:t.width,top:t.top,left:t.left},n.height=Math.min(n.height,t.height-(pageYOffset-t.top)),n.height=Math.min(n.height,t.height-(t.top+t.height-(pageYOffset+innerHeight))),n.height=Math.min(innerHeight,n.height),n.height-=2,n.width=Math.min(n.width,t.width-(pageXOffset-t.left)),n.width=Math.min(n.width,t.width-(t.left+t.width-(pageXOffset+innerWidth))),n.width=Math.min(innerWidth,n.width),n.width-=2,n.top<pageYOffset&&(n.top=pageYOffset),n.left<pageXOffset&&(n.left=pageXOffset),n);case"scroll-handle":return h=this.target,h===document.body?(h=document.documentElement,t={left:pageXOffset,top:pageYOffset,height:innerHeight,width:innerWidth}):t=p(h),r=getComputedStyle(h),o=h.scrollWidth>h.clientWidth||"scroll"===[r.overflow,r.overflowX]||this.target!==document.body,s=0,o&&(s=15),i=t.height-parseFloat(r.borderTopWidth)-parseFloat(r.borderBottomWidth)-s,n={width:15,height:.975*i*(i/h.scrollHeight),left:t.left+t.width-parseFloat(r.borderLeftWidth)-15},e=0,408>i&&this.target===document.body&&(e=-11e-5*Math.pow(i,2)-.00727*i+22.58),this.target!==document.body&&(n.height=Math.max(n.height,24)),l=this.target.scrollTop/(h.scrollHeight-i),n.top=l*(i-n.height-e)+t.top+parseFloat(r.borderTopWidth),this.target===document.body&&(n.height=Math.max(n.height,24)),n}},t.prototype.clearCache=function(){return this._cache={}},t.prototype.cache=function(t,e){return null==this._cache&&(this._cache={}),null==this._cache[t]&&(this._cache[t]=e.call(this)),this._cache[t]},t.prototype.enable=function(t){return null==t&&(t=!0),this.options.addTargetClasses!==!1&&n(this.target,this.getClass("enabled")),n(this.element,this.getClass("enabled")),this.enabled=!0,this.scrollParent!==document&&this.scrollParent.addEventListener("scroll",this.position),t?this.position():void 0},t.prototype.disable=function(){return O(this.target,this.getClass("enabled")),O(this.element,this.getClass("enabled")),this.enabled=!1,null!=this.scrollParent?this.scrollParent.removeEventListener("scroll",this.position):void 0},t.prototype.destroy=function(){var t,e,o,i,n;for(this.disable(),n=[],t=o=0,i=T.length;i>o;t=++o){if(e=T[t],e===this){T.splice(t,1);break}n.push(void 0)}return n},t.prototype.updateAttachClasses=function(t,e){var o,i,n,s,l,r,a,f,p,u=this;for(null==t&&(t=this.attachment),null==e&&(e=this.targetAttachment),s=["left","top","bottom","right","middle","center"],(null!=(p=this._addAttachClasses)?p.length:void 0)&&this._addAttachClasses.splice(0,this._addAttachClasses.length),o=null!=this._addAttachClasses?this._addAttachClasses:this._addAttachClasses=[],t.top&&o.push(""+this.getClass("element-attached")+"-"+t.top),t.left&&o.push(""+this.getClass("element-attached")+"-"+t.left),e.top&&o.push(""+this.getClass("target-attached")+"-"+e.top),e.left&&o.push(""+this.getClass("target-attached")+"-"+e.left),i=[],l=0,a=s.length;a>l;l++)n=s[l],i.push(""+this.getClass("element-attached")+"-"+n);for(r=0,f=s.length;f>r;r++)n=s[r],i.push(""+this.getClass("target-attached")+"-"+n);return h(function(){return null!=u._addAttachClasses?(A(u.element,u._addAttachClasses,i),u.options.addTargetClasses!==!1&&A(u.target,u._addAttachClasses,i),u._addAttachClasses=void 0):void 0})},t.prototype.position=function(t){var e,o,n,h,a,d,c,m,b,y,w,C,O,T,x,A,E,S,W,M,P,z,B,_,F,L,Y,H,X,N,j,R,U,q,k,D=this;if(null==t&&(t=!0),this.enabled){for(this.clearCache(),M=r(this.targetAttachment,this.attachment),this.updateAttachClasses(this.attachment,M),e=this.cache("element-bounds",function(){return p(D.element)}),F=e.width,n=e.height,0===F&&0===n&&null!=this.lastSize?(N=this.lastSize,F=N.width,n=N.height):this.lastSize={width:F,height:n},B=z=this.cache("target-bounds",function(){return D.getTargetBounds()}),b=v(l(this.attachment),{width:F,height:n}),P=v(l(M),B),a=v(this.offset,{width:F,height:n}),d=v(this.targetOffset,B),b=s(b,a),P=s(P,d),h=z.left+P.left-b.left,_=z.top+P.top-b.top,j=i.modules,L=0,H=j.length;H>L;L++){if(c=j[L],x=c.position.call(this,{left:h,top:_,targetAttachment:M,targetPos:z,attachment:this.attachment,elementPos:e,offset:b,targetOffset:P,manualOffset:a,manualTargetOffset:d,scrollbarSize:S}),x===!1)return!1;null!=x&&"object"==typeof x&&(_=x.top,h=x.left)}if(m={page:{top:_,left:h},viewport:{top:_-pageYOffset,bottom:pageYOffset-_-n+innerHeight,left:h-pageXOffset,right:pageXOffset-h-F+innerWidth}},document.body.scrollWidth>window.innerWidth&&(S=this.cache("scrollbar-size",g),m.viewport.bottom-=S.height),document.body.scrollHeight>window.innerHeight&&(S=this.cache("scrollbar-size",g),m.viewport.right-=S.width),(""!==(R=document.body.style.position)&&"static"!==R||""!==(U=document.body.parentElement.style.position)&&"static"!==U)&&(m.page.bottom=document.body.scrollHeight-_-n,m.page.right=document.body.scrollWidth-h-F),(null!=(q=this.options.optimizations)?q.moveElement:void 0)!==!1&&null==this.targetModifier){for(w=this.cache("target-offsetparent",function(){return u(D.target)}),T=this.cache("target-offsetparent-bounds",function(){return p(w)}),O=getComputedStyle(w),o=getComputedStyle(this.element),C=T,y={},k=["Top","Left","Bottom","Right"],Y=0,X=k.length;X>Y;Y++)W=k[Y],y[W.toLowerCase()]=parseFloat(O["border"+W+"Width"]);T.right=document.body.scrollWidth-T.left-C.width+y.right,T.bottom=document.body.scrollHeight-T.top-C.height+y.bottom,m.page.top>=T.top+y.top&&m.page.bottom>=T.bottom&&m.page.left>=T.left+y.left&&m.page.right>=T.right&&(E=w.scrollTop,A=w.scrollLeft,m.offset={top:m.page.top-T.top+E-y.top,left:m.page.left-T.left+A-y.left})}return this.move(m),this.history.unshift(m),this.history.length>3&&this.history.pop(),t&&f(),!0}},t.prototype.move=function(t){var e,o,i,n,s,l,r,f,p,d,g,c,m,b,v,y,w,C=this;if(null!=this.element.parentNode){f={};for(d in t){f[d]={};for(n in t[d]){for(i=!1,y=this.history,b=0,v=y.length;v>b;b++)if(r=y[b],!E(null!=(w=r[d])?w[n]:void 0,t[d][n])){i=!0;break}i||(f[d][n]=!0)}}e={top:"",left:"",right:"",bottom:""},p=function(t,o){var i,n,s;return(null!=(s=C.options.optimizations)?s.gpu:void 0)===!1?(t.top?e.top=""+o.top+"px":e.bottom=""+o.bottom+"px",t.left?e.left=""+o.left+"px":e.right=""+o.right+"px"):(t.top?(e.top=0,n=o.top):(e.bottom=0,n=-o.bottom),t.left?(e.left=0,i=o.left):(e.right=0,i=-o.right),e[x]="translateX("+Math.round(i)+"px) translateY("+Math.round(n)+"px)","msTransform"!==x?e[x]+=" translateZ(0)":void 0)},s=!1,(f.page.top||f.page.bottom)&&(f.page.left||f.page.right)?(e.position="absolute",p(f.page,t.page)):(f.viewport.top||f.viewport.bottom)&&(f.viewport.left||f.viewport.right)?(e.position="fixed",p(f.viewport,t.viewport)):null!=f.offset&&f.offset.top&&f.offset.left?(e.position="absolute",l=this.cache("target-offsetparent",function(){return u(C.target)}),u(this.element)!==l&&h(function(){return C.element.parentNode.removeChild(C.element),l.appendChild(C.element)}),p(f.offset,t.offset),s=!0):(e.position="absolute",p({top:!0,left:!0},t.page)),s||"BODY"===this.element.parentNode.tagName||(this.element.parentNode.removeChild(this.element),document.body.appendChild(this.element)),m={},c=!1;for(n in e)g=e[n],o=this.element.style[n],""===o||""===g||"top"!==n&&"left"!==n&&"bottom"!==n&&"right"!==n||(o=parseFloat(o),g=parseFloat(g)),o!==g&&(c=!0,m[n]=e[n]);return c?h(function(){return a(C.element.style,m)}):void 0}},t}(),i.position=C,this.Tether=a(S,i)}.call(this),function(){var t,e,o,i,n,s,l,r,h,a,f=[].indexOf||function(t){for(var e=0,o=this.length;o>e;e++)if(e in this&&this[e]===t)return e;return-1};a=this.Tether.Utils,l=a.getOuterSize,s=a.getBounds,r=a.getSize,i=a.extend,h=a.updateClasses,o=a.defer,e={left:"right",right:"left",top:"bottom",bottom:"top",middle:"middle"},t=["left","top","right","bottom"],n=function(e,o){var i,n,l,r,h,a,f;if("scrollParent"===o?o=e.scrollParent:"window"===o&&(o=[pageXOffset,pageYOffset,innerWidth+pageXOffset,innerHeight+pageYOffset]),o===document&&(o=o.documentElement),null!=o.nodeType)for(n=r=s(o),h=getComputedStyle(o),o=[n.left,n.top,r.width+n.left,r.height+n.top],i=a=0,f=t.length;f>a;i=++a)l=t[i],l=l[0].toUpperCase()+l.substr(1),"Top"===l||"Left"===l?o[i]+=parseFloat(h["border"+l+"Width"]):o[i]-=parseFloat(h["border"+l+"Width"]);return o},this.Tether.modules.push({position:function(e){var l,r,a,p,u,d,g,c,m,b,v,y,w,C,O,T,x,A,E,S,W,M,P,z,B,_,F,L,Y,H,X,N,j,R,U,q,k,D,Z,V,$,G,I,J,K,Q,tt,et=this;if(_=e.top,v=e.left,W=e.targetAttachment,!this.options.constraints)return!0;for(A=function(e){var o,i,n,s;for(et.removeClass(e),s=[],i=0,n=t.length;n>i;i++)o=t[i],s.push(et.removeClass(""+e+"-"+o));return s},V=this.cache("element-bounds",function(){return s(et.element)}),b=V.height,F=V.width,0===F&&0===b&&null!=this.lastSize&&($=this.lastSize,F=$.width,b=$.height),P=this.cache("target-bounds",function(){return et.getTargetBounds()}),M=P.height,z=P.width,S={},m={},r=[this.getClass("pinned"),this.getClass("out-of-bounds")],G=this.options.constraints,L=0,N=G.length;N>L;L++)c=G[L],c.outOfBoundsClass&&r.push(c.outOfBoundsClass),c.pinnedClass&&r.push(c.pinnedClass);for(Y=0,j=r.length;j>Y;Y++)for(g=r[Y],I=["left","top","right","bottom"],H=0,R=I.length;R>H;H++)E=I[H],r.push(""+g+"-"+E);for(l=[],S=i({},W),m=i({},this.attachment),J=this.options.constraints,X=0,U=J.length;U>X;X++){if(c=J[X],B=c.to,a=c.attachment,O=c.pin,null==a&&(a=""),f.call(a," ")>=0?(K=a.split(" "),d=K[0],u=K[1]):u=d=a,p=n(this,B),("target"===d||"both"===d)&&(_<p[1]&&"top"===S.top&&(_+=M,S.top="bottom"),_+b>p[3]&&"bottom"===S.top&&(_-=M,S.top="top")),"together"===d&&(_<p[1]&&"top"===S.top&&("bottom"===m.top?(_+=M,S.top="bottom",_+=b,m.top="top"):"top"===m.top&&(_+=M,S.top="bottom",_-=b,m.top="bottom")),_+b>p[3]&&"bottom"===S.top&&("top"===m.top?(_-=M,S.top="top",_-=b,m.top="bottom"):"bottom"===m.top&&(_-=M,S.top="top",_+=b,m.top="top")),"middle"===S.top&&(_+b>p[3]&&"top"===m.top?(_-=b,m.top="bottom"):_<p[1]&&"bottom"===m.top&&(_+=b,m.top="top"))),("target"===u||"both"===u)&&(v<p[0]&&"left"===S.left&&(v+=z,S.left="right"),v+F>p[2]&&"right"===S.left&&(v-=z,S.left="left")),"together"===u&&(v<p[0]&&"left"===S.left?"right"===m.left?(v+=z,S.left="right",v+=F,m.left="left"):"left"===m.left&&(v+=z,S.left="right",v-=F,m.left="right"):v+F>p[2]&&"right"===S.left?"left"===m.left?(v-=z,S.left="left",v-=F,m.left="right"):"right"===m.left&&(v-=z,S.left="left",v+=F,m.left="left"):"center"===S.left&&(v+F>p[2]&&"left"===m.left?(v-=F,m.left="right"):v<p[0]&&"right"===m.left&&(v+=F,m.left="left"))),("element"===d||"both"===d)&&(_<p[1]&&"bottom"===m.top&&(_+=b,m.top="top"),_+b>p[3]&&"top"===m.top&&(_-=b,m.top="bottom")),("element"===u||"both"===u)&&(v<p[0]&&"right"===m.left&&(v+=F,m.left="left"),v+F>p[2]&&"left"===m.left&&(v-=F,m.left="right")),"string"==typeof O?O=function(){var t,e,o,i;for(o=O.split(","),i=[],e=0,t=o.length;t>e;e++)C=o[e],i.push(C.trim());return i}():O===!0&&(O=["top","left","right","bottom"]),O||(O=[]),T=[],y=[],_<p[1]&&(f.call(O,"top")>=0?(_=p[1],T.push("top")):y.push("top")),_+b>p[3]&&(f.call(O,"bottom")>=0?(_=p[3]-b,T.push("bottom")):y.push("bottom")),v<p[0]&&(f.call(O,"left")>=0?(v=p[0],T.push("left")):y.push("left")),v+F>p[2]&&(f.call(O,"right")>=0?(v=p[2]-F,T.push("right")):y.push("right")),T.length)for(x=null!=(Q=this.options.pinnedClass)?Q:this.getClass("pinned"),l.push(x),D=0,q=T.length;q>D;D++)E=T[D],l.push(""+x+"-"+E);if(y.length)for(w=null!=(tt=this.options.outOfBoundsClass)?tt:this.getClass("out-of-bounds"),l.push(w),Z=0,k=y.length;k>Z;Z++)E=y[Z],l.push(""+w+"-"+E);(f.call(T,"left")>=0||f.call(T,"right")>=0)&&(m.left=S.left=!1),(f.call(T,"top")>=0||f.call(T,"bottom")>=0)&&(m.top=S.top=!1),(S.top!==W.top||S.left!==W.left||m.top!==this.attachment.top||m.left!==this.attachment.left)&&this.updateAttachClasses(m,S)}return o(function(){return et.options.addTargetClasses!==!1&&h(et.target,l,r),h(et.element,l,r)}),{top:_,left:v}}})}.call(this),function(){var t,e,o,i;i=this.Tether.Utils,e=i.getBounds,o=i.updateClasses,t=i.defer,this.Tether.modules.push({position:function(i){var n,s,l,r,h,a,f,p,u,d,g,c,m,b,v,y,w,C,O,T,x,A,E,S,W,M=this;if(g=i.top,a=i.left,x=this.cache("element-bounds",function(){return e(M.element)}),h=x.height,c=x.width,d=this.getTargetBounds(),r=g+h,f=a+c,n=[],g<=d.bottom&&r>=d.top)for(A=["left","right"],m=0,w=A.length;w>m;m++)p=A[m],((E=d[p])===a||E===f)&&n.push(p);if(a<=d.right&&f>=d.left)for(S=["top","bottom"],b=0,C=S.length;C>b;b++)p=S[b],((W=d[p])===g||W===r)&&n.push(p);for(l=[],s=[],u=["left","top","right","bottom"],l.push(this.getClass("abutted")),v=0,O=u.length;O>v;v++)p=u[v],l.push(""+this.getClass("abutted")+"-"+p);for(n.length&&s.push(this.getClass("abutted")),y=0,T=n.length;T>y;y++)p=n[y],s.push(""+this.getClass("abutted")+"-"+p);return t(function(){return M.options.addTargetClasses!==!1&&o(M.target,s,l),o(M.element,s,l)}),!0}})}.call(this),function(){this.Tether.modules.push({position:function(t){var e,o,i,n,s,l,r;return l=t.top,e=t.left,this.options.shift?(o=function(t){return"function"==typeof t?t.call(this,{top:l,left:e}):t},i=o(this.options.shift),"string"==typeof i?(i=i.split(" "),i[1]||(i[1]=i[0]),s=i[0],n=i[1],s=parseFloat(s,10),n=parseFloat(n,10)):(r=[i.top,i.left],s=r[0],n=r[1]),l+=s,e+=n,{top:l,left:e}):void 0}})}.call(this),this.Tether});
; browserify_shim__define__module__export__(typeof Tether != "undefined" ? Tether : window.Tether);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
(function (global){
"use strict";
 
var Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null),
           $ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);
           
Backbone.$ = $;

var Lesson = require('../models/lesson_model');

module.exports = Backbone.Collection.extend({
  model: Lesson
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../models/lesson_model":20}],8:[function(require,module,exports){
(function (global){
"use strict";

var Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null),
           $ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);

Backbone.$ = $;

var Section = require('../models/section_model');

module.exports = Backbone.Collection.extend({
  model: Section
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../models/section_model":21}],9:[function(require,module,exports){
(function (global){
"use strict";

var Backbone      = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null),
    rivets        = (typeof window !== "undefined" ? window.rivets : typeof global !== "undefined" ? global.rivets : null),
    $             = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null),
    magnificPopup = require('magnific-popup'),
    Tether        = require('tether'),
    Drop          = require('tether-drop'),
    Tooltip       = require('tether-tooltip');

require('../config/index');

$('#wp-coach-event-capture').on('bind:beginning bind:complete unbind:beginning unbind:complete routine:beginning routine:complete update:beginning update:complete', function(event) {
  Tooltip.init();

  $('.wp-coach-add-lesson').each(function(i, el){
    $(el).magnificPopup({
      type:'iframe',
      items: {
        src: $(el).data('edit-lesson-url')
      },
      midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });
  });
});

var Course = require('../models/course_model');
var course = new Course( WP_Coach.courses[0] );

var sections = course.get('sections');

rivets.bind($('#wp-coach-sections .inside'), {
  'course': course,
  'sections': sections
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../config/index":11,"../models/course_model":19,"magnific-popup":3,"tether":6,"tether-drop":4,"tether-tooltip":5}],10:[function(require,module,exports){
(function (global){
var Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null),
           $ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);

Backbone.$ = $;
Backbone.emulateJSON = true;
Backbone.emulateHTTP = true;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],11:[function(require,module,exports){
require('./backbone/index.js');
require('./jquery/index.js');
require('./rivets/index.js');
},{"./backbone/index.js":10,"./jquery/index.js":12,"./rivets/index.js":18}],12:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);

$.ajaxSetup({
  headers: { 'X-WP-Nonce' : WP_Coach.nonce }
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],13:[function(require,module,exports){
(function (global){
"use strict";

var rivets = (typeof window !== "undefined" ? window.rivets : typeof global !== "undefined" ? global.rivets : null),
         $ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);

rivets.binders['add-class'] = function(el, value) {

  if (el.addedClass) {
    var added = slugify(el.addedClass);

    $(el).removeClass(added);
    delete el.addedClass;
  }

  console.log(value);

  if (value) {
    var value = slugify(value);
    console.log('slug', value);
    console.log(el);
    
    $(el).addClass(value);
    el.addedClass = value;
  }
}

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],14:[function(require,module,exports){
(function (global){
var rivets = (typeof window !== "undefined" ? window.rivets : typeof global !== "undefined" ? global.rivets : null),
         $ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);

rivets.binders['on-enter-key-press'] = {
    bind : bindKeypress,
    unbind : unbindKeypress,
    function: true
};

function bindKeypress(el) {
    var rivetsView = this, $el = $(el);

    $el.on('keypress', function(event) {
        if(event.keyCode === 13) {
            $el.blur();
            rivetsView.observer.value()(event);
            event.preventDefault();
        }
    });
};

function unbindKeypress(el) {
    $(el).off('keypress');
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],15:[function(require,module,exports){
(function (global){
"use strict";

var rivets = (typeof window !== "undefined" ? window.rivets : typeof global !== "undefined" ? global.rivets : null),
         $ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);

rivets.binders['evented-each-*'] = {
    block : true,
    priority : 4000,
    bind : function() {
        $('#wp-coach-event-capture').trigger('bind:beginning');
        rivets.binders['each-*'].bind.apply(this, arguments);
        $('#wp-coach-event-capture').trigger('bind:complete');
    },
    unbind : function() {
        $('#wp-coach-event-capture').trigger('unbind:beginning');
        rivets.binders['each-*'].unbind.apply(this, arguments);
        $('#wp-coach-event-capture').trigger('unbind:complete');
    },
    routine : function() {
        $('#wp-coach-event-capture').trigger('routine:beginning');
        rivets.binders['each-*'].routine.apply(this, arguments);
        $('#wp-coach-event-capture').trigger('routine:complete');
    },
    update : function() {
        $('#wp-coach-event-capture').trigger('update:beginning');
        rivets.binders['each-*'].update.apply(this, arguments);
        $('#wp-coach-event-capture').trigger('update:complete');
    }
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],16:[function(require,module,exports){
(function (global){
"use strict";

var rivets = (typeof window !== "undefined" ? window.rivets : typeof global !== "undefined" ? global.rivets : null),
         $ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);

rivets.binders['focus'] = function(el, value) {
  if (value && $(el).is(":visible")) {
    $(el).focus();
  }
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],17:[function(require,module,exports){
(function (global){
var rivets = (typeof window !== "undefined" ? window.rivets : typeof global !== "undefined" ? global.rivets : null);

rivets.formatters['='] = function (value, arg) {
  return value == arg;
}

rivets.formatters['>'] = function (value, arg) {
  return value > arg;
}

rivets.formatters['>='] = function (value, arg) {
  return value >= arg;
}

rivets.formatters['<'] = function (value, arg) {
  return value < arg;
}

rivets.formatters['<='] = function (value, arg) {
  return value <= arg;
}

rivets.formatters['fa_post_status'] = function (value, arg) {
  var font_awesome = {
    "draft"    : "fa-circle-o",
    "protected": "fa-dot-circle-o",
    "published": "fa-check-circle-o"
  }
  
  return font_awesome[value];
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],18:[function(require,module,exports){
require('./binders/enter-key-press.js');
require('./binders/focus.js');
require('./binders/evented-each.js');
require('./binders/add-class.js');
require('./formatters/index.js');
},{"./binders/add-class.js":13,"./binders/enter-key-press.js":14,"./binders/evented-each.js":15,"./binders/focus.js":16,"./formatters/index.js":17}],19:[function(require,module,exports){
(function (global){
"use strict";

var Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null),
           _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
           $ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);

Backbone.$ = $;
Backbone.SuperModel = require('backbone.supermodel');

var Sections = require('../collections/section_collection');

module.exports = Backbone.SuperModel.extend({
  idAttribute: 'ID',
  name: 'course',
  relations: {
    'sections': Sections
  },
  url: WP_Coach.ajax_url,
  initialize: function () {
    _.bindAll(this, 'addSection');
  },
  addSection: function (e, model) {
    e.preventDefault();
    var sections = this.get('sections');
    var section = sections.create({
      "course_id"  : this.id,
      "post_status": "draft",
      "post_title" : "New Section Title"
    });
    section.startEditingTitle();
  }
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../collections/section_collection":8,"backbone.supermodel":2}],20:[function(require,module,exports){
(function (global){
"use strict";

var Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null),
           $ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);

Backbone.$ = $;
Backbone.SuperModel = require('backbone.supermodel');


module.exports = Backbone.SuperModel.extend({
  idAttribute: 'ID',
  url: WP_Coach.ajax_url
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"backbone.supermodel":2}],21:[function(require,module,exports){
(function (global){
"use strict";

var Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null),
           _ = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null),
           $ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);

Backbone.$ = $;
Backbone.SuperModel = require('backbone.supermodel');

var Lessons = require('../collections/lesson_collection');

module.exports = Backbone.SuperModel.extend({
  idAttribute: 'ID',
  name: 'section',
  relations: {
    "lessons": Lessons
  },
  url: WP_Coach.ajax_url,
  initialize: function() {
    _.bindAll(this, 'addLesson', 'startEditingTitle', 'stopEditingTitle', 'destroy');

    this.on('add', function(model, options) {
      this.action = 'wp_coach_api_sections_create'
    });

  },

  action: '',

  save: function () {
    var $params = {
      emulateJSON: true,
      data: {
        action  : this.action,
        payload : this.toJSON()
      },
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      wait: false
    };
    return Backbone.sync( 'create', this, $params );
  },

  addLesson: function() {
    return false;
  },

  destroy: function(e, model) {
    Backbone.SuperModel.prototype.destroy.call(this, {
      data: {
        action: 'wp_coach_api_sections_destroy',
        course_id: model.course.get('ID'),
        section_id: this.id
      }
    });
  },

  isEditingTitle: false,
  startEditingTitle: function (e, model) {
    this.isEditingTitle = true;
  },
  stopEditingTitle: function (e, model) {
    if (this.isEditingTitle == false) {
      return;
    }
    this.action = 'wp_coach_api_sections_update';
    this.save();
    this.isEditingTitle = false;
  }
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../collections/lesson_collection":7,"backbone.supermodel":2}]},{},[1]);
