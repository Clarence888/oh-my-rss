var NET_ERROR_MSG="\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01",LOGIN_ERROR_MSG="\u767b\u5f55\u6388\u6743\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01",LOGIN_SUCC_MSG="\u767b\u5f55\u6210\u529f^o^";function getTextReadTime(a){console.log((new Date).valueOf());for(var b=0,e=0;e<a.length;e++)b=4<escape(a.charAt(e)).length?b+2:b+1;console.log((new Date).valueOf());return parseInt(b/900)}
function genUidV0(){var a=uuid.v4(),b=md5(a+atob("bDNsU3BxNXM2b1NyRFJ0dFQwa1o=")).substring(0,10);return a+atob("MDA=")+b}function toast(a,b){M.toast({html:a,displayLength:void 0===b?1E3:b})}function warnToast(a){M.toast({html:'<span style="color: #eeff41;">'+a+"</span>",displayLength:3E3})}
function showServerMsg(){if(void 0===Cookies.get("toast"))return!1;msg=Cookies.get("toast").split(":")[0];"LOGIN_SUCC_MSG"==msg?toast(LOGIN_SUCC_MSG):"LOGIN_ERROR_MSG"==msg?warnToast(LOGIN_ERROR_MSG):console.warn("\u672a\u77e5\u7684\u6d88\u606f\uff1a"+msg);Cookies.remove("toast")}function getOrSetUid(){var a=localStorage.getItem("UID");if(a)return a;localStorage.setItem("UID",genUidV0());return localStorage.getItem("UID")}function hasReadArticle(a){return localStorage.getItem("READ/"+a)}
function setReadArticle(a){localStorage.setItem("READ/"+a,"1")}function hasLikeArticle(a){return localStorage.getItem("LIKE/"+a)}function setLeaveMsgToday(){localStorage.setItem("LMSG/"+(new Date).toDateString(),"1")}function hasLeaveMsgToday(){return localStorage.getItem("LMSG/"+(new Date).toDateString())}function setLikeArticle(a){localStorage.setItem("LIKE/"+a,"1")}function hasOpenSrc(a){return localStorage.getItem("OPEN/"+a)}function setOpenSrc(a){localStorage.setItem("OPEN/"+a,"1")}
function getSubFeeds(){var a=localStorage.getItem("SUBS");return a?JSON.parse(a):{}}function getUnsubFeeds(){var a=localStorage.getItem("UNSUBS");return a?JSON.parse(a):{}}function subFeed(a){var b=getSubFeeds(),e=getUnsubFeeds();delete e[a];b[a]=1;localStorage.setItem("SUBS",JSON.stringify(b));localStorage.setItem("UNSUBS",JSON.stringify(e))}
function unsubFeed(a){var b=getSubFeeds(),e=getUnsubFeeds();delete b[a];e[a]=1;localStorage.setItem("SUBS",JSON.stringify(b));localStorage.setItem("UNSUBS",JSON.stringify(e))}function enterFullscreen(){var a=document.documentElement;(a.requestFullscreen||a.webkitRequestFullScreen||a.mozRequestFullScreen||a.msRequestFullscreen).call(a)}
function isInFullscreen(){return document.fullscreenElement&&null!==document.fullscreenElement||document.webkitFullscreenElement&&null!==document.webkitFullscreenElement||document.mozFullScreenElement&&null!==document.mozFullScreenElement||document.msFullscreenElement&&null!==document.msFullscreenElement}
function exitFullscreen(){try{document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen()}catch(a){console.warn("\u9000\u51fa\u5168\u5c4f\u65f6\u9047\u5230\u5f02\u5e38",a.msg)}return!0}function getCurPage(){var a=localStorage.getItem("CURPG");return a?a:"1"}
function updateReadStats(){var a=$("#omrss-third"),b=a.text().trim().length,e=a.find("img").length,g=a.find("a").length;a="\u9884\u8ba1\u9605\u8bfb\u65f6\u95f4<b> "+(getTextReadTime(a.text().trim())+parseInt(e/20)+parseInt(g/20))+" </b>\u5206\u949f\uff08\u5171 "+b+" \u4e2a\u5b57\uff0c "+e+" \u5f20\u56fe\u7247\uff0c "+g+" \u4e2a\u94fe\u63a5\uff09";$("#omrss-read-stats").html(a)}
function updateUnreadCount(){var a=JSON.parse(localStorage.getItem("TOREADS")),b=0;if(a){for(var e=0;e<a.length;e++)hasReadArticle(a[e])||(b+=1);0<b?($("#omrss-unread").html('<a href="#!"><span class="new badge">'+b+"</span></a>"),localStorage.setItem("NEW",b.toString())):$("#omrss-unread").html("")}return b}function markReadAll(){var a=JSON.parse(localStorage.getItem("TOREADS"));if(a)for(var b=0;b<a.length;b++)setReadArticle(a[b])}
function setToreadList(a){a=void 0===a?!1:a;$.post("/api/lastweek/articles",{uid:getOrSetUid(),sub_feeds:Object.keys(getSubFeeds()).join(","),unsub_feeds:Object.keys(getUnsubFeeds()).join(","),ext:window.screen.width+"x"+window.screen.height},function(b){localStorage.setItem("TOREADS",JSON.stringify(b.result));b=updateUnreadCount();!0===a&&0<b&&window.Notification&&"granted"===Notification.permission&&new Notification("\u60a8\u6709"+b+"\u6761\u672a\u8bfb\u8ba2\u9605",{tag:"OMRSS",icon:"https://ohmyrss.com/assets/img/logo.png",
body:"\u8bf7\u5237\u65b0\u9875\u9762\u540e\u67e5\u770b"})})}var lruCache=new Cache(50,!1,new Cache.LocalStorageCacheStorage("OMRSS")),cacheVer="23";function setLruCache(a,b){return 102400>b.length&&512<b.length?(lruCache.setItem(cacheVer+a,b),!0):!1}function getLruCache(a){return lruCache.getItem(cacheVer+a)}var isBgWin=!1;
function isQQApp(){var a=/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)&&/\sQQ/i.test(navigator.userAgent),b=/(Android)/i.test(navigator.userAgent)&&/MQQBrowser/i.test(navigator.userAgent)&&/\sQQ/i.test(navigator.userAgent);return a||b}function isInWebview(){var a=navigator.userAgent.toLowerCase();return/micromessenger/i.test(a)||isQQApp()||/WeiBo/i.test(a)}
function fixThirdStyleTag(){$("#omrss-third p, #omrss-third span, #omrss-third section, #omrss-third div").each(function(){void 0!==$(this).attr("style")&&$(this).removeAttr("style")});$("#omrss-third img, #omrss-third video").each(function(){$(this).removeAttr("width");$(this).removeAttr("height")})}function getLoginName(){loginEl=$("#omrss-my");return 0==loginEl.length?"":loginEl.attr("data-oauth-name")}
function getLoginId(){loginEl=$("#omrss-my");return 0==loginEl.length?"":loginEl.attr("data-oauth-id")};function initLayout(){$(".tooltipped").tooltip();$(".modal").modal();$(".sidenav").sidenav({edge:"right"});resetRightFlow();$("#omrss-main").click()}function getPageSize(){var a=$("#omrss-cnt-list ul li:first").outerHeight(!0),b=$(window).height()-$("#omrss-header").height()-$("#omrss-pager").height()-20,e=1;0<a&&(e=Math.floor(b/a));return e}
function getBriefHeight(){var a=$(window).outerHeight(!0)-$("#omrss-header").outerHeight(!0)-$("#omrss-article-title").outerHeight(!0)-$("#omrss-article-stats").outerHeight(!0)-$("#omrss-article-bottom").outerHeight(!0);return parseInt(a)}
function resetRightFlow(){$(".cnt-right").css({"overflow-y":"auto",height:$(window).height()-64+"px"});1600<=$(window).width()?$("#omrss-cnt-list").css({"max-height":$(window).height()-64-60+"px"}):$("#omrss-cnt-list").css({"max-height":$(window).height()-64-50+"px"})}
function loadPage(a){$("#omrss-loader").removeClass("hide");var b="",e="";getLoginId()&&(b=Object.keys(getSubFeeds()).join(","),e=Object.keys(getUnsubFeeds()).join(","));$.post("/api/html/articles/list",{uid:getOrSetUid(),page_size:getPageSize(),page:a,sub_feeds:b,unsub_feeds:e},function(a){a=$(a);a.find(".collection li[id]").each(function(a){hasReadArticle(this.id)&&(a=$(this).find("i.unread"),a.removeClass("unread").addClass("read"),a.text("check"),$(this).find(".omrss-title").removeClass("omrss-title-unread"));
hasLikeArticle(this.id)&&$(this).find("i.thumb-icon").addClass("omrss-color");hasOpenSrc(this.id)&&$(this).find("i.open-icon").addClass("omrss-color")});a.find(".prettydate").prettydate();$("#omrss-left").html(a);initLayout()}).fail(function(a){warnToast(a.responseText)}).always(function(){$("#omrss-loader").addClass("hide");localStorage.setItem("CURPG",a)})}
$(document).ready(function(){initLayout();getOrSetUid();showServerMsg();loadPage(1);updateReadStats();setToreadList(notify=!1);setInterval(function(){!0===isBgWin&&setToreadList(notify=!0)},72E5);$(document).on("click",".ev-cnt-list",function(){$(".ev-cnt-list.active").removeClass("active");$(this).addClass("active");var a=this.id,b=$(this),e=getLruCache(a);if(e){var g=$("#omrss-main");g.html(e);fixThirdStyleTag();0<$('#omrss-third pre[class*="language-"]').length||0<$('#omrss-third code[class*="language-"]').length?
(Prism.highlightAll(),console.log("Prism init")):($("pre > code").each(function(){hljs.highlightBlock(this)}),console.log("Hljs init"));updateReadStats();g.scrollTop(0)}else $("#omrss-loader").removeClass("hide"),$.post("/api/html/article/detail",{uid:getOrSetUid(),id:a},function(e){setLruCache(a,e);var g=$("#omrss-main");g.html(e);fixThirdStyleTag();0<$('#omrss-third pre[class*="language-"]').length||0<$('#omrss-third code[class*="language-"]').length?(Prism.highlightAll(),console.log("Prism init")):
($("pre > code").each(function(){hljs.highlightBlock(this)}),console.log("Hljs init"));g.scrollTop(0);updateReadStats();hasReadArticle(a)||(setReadArticle(a),e=b.find("i.unread"),e.removeClass("unread").addClass("read"),e.text("check"),b.find(".omrss-title").removeClass("omrss-title-unread"),updateUnreadCount(),setTimeout(function(){$.post("/api/actionlog/add",{uid:getOrSetUid(),id:a,action:"VIEW"},function(){})},1E3))}).fail(function(){warnToast(NET_ERROR_MSG)}).always(function(){$("#omrss-loader").addClass("hide")});
$("#omrss-third").linkify({target:"_blank"});setTimeout(function(){"default"===Notification.permission&&Notification.requestPermission()},6E5)});$(document).on("click",".ev-my-feed",function(){$("#omrss-loader").removeClass("hide");user=getLoginId();$.post("/api/html/feeds/all",{uid:getOrSetUid()},function(a){if(user)$("#omrss-main").html(a).scrollTop(0);else{a=$(a);var b=getSubFeeds(),e=getUnsubFeeds();a.find(".omrss-item").each(function(a){a=$(this).attr("data-name");var g=parseInt($(this).attr("data-star"));
a in b?($(this).find("a.ev-toggle-feed").text("\u53d6\u6d88\u8ba2\u9605"),$(this).find("a.ev-toggle-feed").addClass("omrss-bgcolor")):a in e?($(this).find("a.ev-toggle-feed").text("\u8ba2\u9605"),$(this).find("a.ev-toggle-feed").removeClass("omrss-bgcolor")):20<=g?($(this).find("a.ev-toggle-feed").text("\u53d6\u6d88\u8ba2\u9605"),$(this).find("a.ev-toggle-feed").addClass("omrss-bgcolor")):($(this).find("a.ev-toggle-feed").text("\u8ba2\u9605"),$(this).find("a.ev-toggle-feed").removeClass("omrss-bgcolor"))});
$("#omrss-main").html(a).scrollTop(0)}resetRightFlow()}).fail(function(){warnToast(NET_ERROR_MSG)}).always(function(){$("#omrss-loader").addClass("hide")})});$(document).on("click","#omrss-unlike",function(){var a=$(this).attr("data-site");getLoginId()?$.post("/api/feed/unsubscribe",{uid:getOrSetUid(),feed:a},function(a){toast("\u53d6\u6d88\u8ba2\u9605\u6210\u529f^o^")}).fail(function(){warnToast(NET_ERROR_MSG)}):(unsubFeed(a),toast("\u53d6\u6d88\u8ba2\u9605\u6210\u529f^o^"))});$(document).on("click",
".ev-submit-feed",function(){var a=$("#omrss-feed-input").val().trim();a?($("#omrss-loader").removeClass("hide"),$.post("/api/feed/add",{uid:getOrSetUid(),url:a},function(a){subFeed(a.name);toast("\u6dfb\u52a0\u6210\u529f\uff0c\u9884\u8ba1\u4e00\u5c0f\u65f6\u5185\u6536\u5230\u66f4\u65b0^o^",3E3)}).fail(function(){warnToast("RSS\u5730\u5740\u89e3\u6790\u5931\u8d25\uff0c\u7ba1\u7406\u5458\u7a0d\u540e\u4f1a\u8ddf\u8fdb\u5904\u7406\uff01")}).always(function(){$("#omrss-loader").addClass("hide")})):warnToast("\u6ca1\u6709\u8f93\u5165\u5185\u5bb9\uff01")});
$(document).on("click",".ev-toggle-feed",function(){var a=$(this).text(),b=$(this).attr("data-name"),e=getLoginId(),g=$(this);"\u8ba2\u9605"===a?e?($("#omrss-loader").removeClass("hide"),$.post("/api/feed/subscribe",{uid:getOrSetUid(),feed:b},function(a){toast("\u8ba2\u9605\u6210\u529f^o^");g.text("\u53d6\u6d88\u8ba2\u9605");g.addClass("omrss-bgcolor")}).fail(function(){warnToast(NET_ERROR_MSG)}).always(function(){$("#omrss-loader").addClass("hide")})):(subFeed(b),toast("\u8ba2\u9605\u6210\u529f^o^"),
$(this).text("\u53d6\u6d88\u8ba2\u9605"),$(this).addClass("omrss-bgcolor")):"\u53d6\u6d88\u8ba2\u9605"===a&&(e?($("#omrss-loader").removeClass("hide"),$.post("/api/feed/unsubscribe",{uid:getOrSetUid(),feed:b},function(a){toast("\u53d6\u6d88\u8ba2\u9605\u6210\u529f^o^");g.text("\u8ba2\u9605");g.removeClass("omrss-bgcolor")}).fail(function(){warnToast(NET_ERROR_MSG)}).always(function(){$("#omrss-loader").addClass("hide")})):(unsubFeed(b),toast("\u53d6\u6d88\u8ba2\u9605\u6210\u529f^o^"),$(this).removeClass("omrss-bgcolor"),
$(this).text("\u8ba2\u9605")))});$(document).on("click",".ev-page",function(){var a=$(this).attr("data-page");loadPage(a)});$(document).on("click","#omrss-like",function(){var a=$(this).attr("data-id");hasLikeArticle(a)?warnToast("\u5df2\u7ecf\u70b9\u8fc7\u8d5e\u4e86\uff01"):$.post("/api/actionlog/add",{uid:getOrSetUid(),id:a,action:"THUMB"},function(b){setLikeArticle(a);toast("\u70b9\u8d5e\u6210\u529f^o^")}).fail(function(){warnToast(NET_ERROR_MSG)})});$(document).on("click",".ev-open-src",function(){var a=
$(this).attr("data-id");hasOpenSrc(a)||$.post("/api/actionlog/add",{uid:getOrSetUid(),id:a,action:"OPEN"},function(b){setOpenSrc(a)})});$(document).on("click",".ev-mark-readall",function(){markReadAll();updateUnreadCount();toast("\u5df2\u5c06\u5168\u90e8\u8bbe\u4e3a\u5df2\u8bfb^o^")});$(document).on("click",".ev-intro",function(){$("#omrss-loader").removeClass("hide");$.post("/api/html/homepage/intro",{uid:getOrSetUid()},function(a){target=$("#omrss-main");target.html(a);target.scrollTop(0);resetRightFlow();
updateReadStats()}).fail(function(){warnToast(NET_ERROR_MSG)}).always(function(){$("#omrss-loader").addClass("hide")})});$(document).on("click",".ev-faq",function(){$("#omrss-loader").removeClass("hide");$.post("/api/html/faq",{uid:getOrSetUid()},function(a){target=$("#omrss-main");target.html(a);target.scrollTop(0);resetRightFlow();updateReadStats()}).fail(function(){warnToast(NET_ERROR_MSG)}).always(function(){$("#omrss-loader").addClass("hide")})});$(".ev-settings").click(function(){$("#omrss-loader").removeClass("hide");
$.post("/api/html/settings",{uid:getOrSetUid()},function(a){$("#omrss-main").html(a);$("#omrss-main").scrollTop(0)}).always(function(){$("#omrss-loader").addClass("hide")})});$("#omrss-logo-font").click(function(){$("#omrss-loader").removeClass("hide");$.post("/api/html/homepage/intro",{uid:getOrSetUid()},function(a){$("#omrss-main").html(a);$("#omrss-main").scrollTop(0);resetRightFlow();updateReadStats()}).fail(function(){warnToast(NET_ERROR_MSG)}).always(function(){$("#omrss-loader").addClass("hide")})});
$(".ev-tips").click(function(){$("#omrss-loader").removeClass("hide");$.post("/api/html/homepage/tips",{uid:getOrSetUid()},function(a){$("#omrss-main").html(a);$("#omrss-main").scrollTop(0);resetRightFlow()}).fail(function(){warnToast(NET_ERROR_MSG)}).always(function(){$("#omrss-loader").addClass("hide")})});$(document).on("click",".ev-display-btn",function(){$(this).addClass("hide");$("#omrss-rss-hide").removeClass("hide")});$(document).on("click",".ev-leave-msg",function(){$("#omrss-loader").removeClass("hide");
$.post("/api/html/issues/all",{uid:getOrSetUid()},function(a){$("#omrss-main").html(a);$("#omrss-main").scrollTop(0);resetRightFlow()}).fail(function(){warnToast(NET_ERROR_MSG)}).always(function(){$("#omrss-loader").addClass("hide")})});$(document).on("click",".ev-submit-msg",function(){if(hasLeaveMsgToday())warnToast("\u60a8\u4eca\u5929\u5df2\u7ecf\u7559\u8fc7\u8a00\u4e86\uff0c\u660e\u5929\u518d\u6765\u5427\uff01");else{$("#omrss-loader").removeClass("hide");var a=$("#issue-input-detail").val(),
b=$("#issue-input-name").val(),e=$("#issue-input-contact").val();$.post("/api/message/add",{uid:getOrSetUid(),content:a,nickname:b,contact:e},function(a){$("#omrss-main").html(a);$("#omrss-main").scrollTop(0);setLeaveMsgToday();toast("\u7559\u8a00\u6210\u529f^o^")}).fail(function(){warnToast(NET_ERROR_MSG)}).always(function(){$("#omrss-loader").addClass("hide")})}});$(".ev-toggle-fullscreen").click(function(){isInFullscreen()?(exitFullscreen(),$(this).find("i").text("fullscreen")):(enterFullscreen(),
$(this).find("i").text("fullscreen_exit"));setTimeout(function(){loadPage(getCurPage())},200)});$(window).bind("focus",function(){isBgWin=!1});$(window).bind("blur",function(){isBgWin=!0})});(function(){function a(){if("debug"===a.LOG_LEVEL){var d=Array.prototype.slice.call(arguments),c=window.console,n=c&&c.log;n&&(n.apply?n.apply(c,d):c.log(d))}}function b(a,c){if("function"!==typeof a)throw new TypeError('Argument "__constructor" of "Proto" need to be an instance of a "Function"!');if(!(c&&c instanceof Object))return a.prototype;this.constructor=a;for(var d in c)c.hasOwnProperty(d)&&(this[d]=c[d])}function e(a){this.event=a}function g(){this.actions={keydown:[],keypress:[],keyup:[]}}
function l(a){this.actionContainer=a;this.keyStrokes="";this.prevKeypressActions=null}function m(a){this.router=a;this.bindedEvents={};this.handlers={};this.setHandlers()}function p(d,c){function n(a){return h.in_array(a,["keydown","keypress","keyup"])?!0:!1}window.shortcuts={bindEvents:function(a){function c(c){if(n(c))d.bindEvent(c);else throw new TypeError("[shortcuts::bindEvents], invalid types: "+a);}if(a instanceof Array)for(var b=0,k=a.length;b<k;++b)c(a[b]);else c(a)},unBindEvents:function(a){for(var c=
0,n=a.length;c<n;++c)d.unbindEvent(a[c])},addActions:function(a){function d(a){var d=h.trim(a.type||"");if(n(d))c.addAction(a);else throw new TypeError("[shortcuts::addActions], invalid type: "+a.type);}if(a instanceof Array)for(var b=0,k=a.length;b<k;++b)d(a[b]);else d(a)},getActions:function(a){return n(a)?c.getActions(a):c.getAllActions()},logger:{on:function(){a.LOG_LEVEL="debug"},off:function(){a.LOG_LEVEL="Hello World!~"},log:function(){a.apply(null,arguments)}}}}a.LOG_LEVEL="@debug@";var h=
{in_array:function(a,c){if(!(c instanceof Array))return!1;var d=Array.prototype.indexOf;if(d&&c.indexOf===d)return-1!==c.indexOf(a);d=0;for(var b=c.length;d<b;++d)if(a===c[d])return!0;return!1},trim:function(a){var d=/^\s+|\s+$/g,b=String.prototype.trim;a=String(a);return b&&b===a.trim?a.trim(a):a.replace(d,"")}},r={addListener:function(){return document.addEventListener?function(a,c,b){a.addEventListener(c,b,!1)}:document.attachEvent?function(a,c,b){a.attachEvent("on"+c,b)}:function(a,c,b){throw'cannot bind event"'+
c+'"';}}(),removeListener:function(){return document.removeEventListener?function(a,c,b){a.removeEventListener(c,b,!1)}:document.detachEvent?function(a,c,b){a.detachEvent("on"+c,b)}:function(a,c){throw'cannot remove event"'+c+'"';}}(),EventObject:function(a){a=a||window.event;var c={};c.originalEvent=a;for(var d="type altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
b=d.length,h;b;)h=d[--b],c[h]=a[h];c.target||(c.target=a.srcElement||document);void 0===c.which&&(c.which=void 0!==a.charCode?a.charCode:a.keyCode);c.stopPropagation||(c.stopPropagation=function(){a.cancelBubble=!0});c.preventDefault||(c.preventDefault=function(){a.returnValue=!1});return c}};e.prototype=new b(e,{isEscape:function(){return 27==this.getKeyCode()},isValidKeyStroke:function(){var a=this.event.target,c=a.tagName.toLowerCase();return h.in_array(c,["input","textarea"])?!1:(a=a.getAttribute("contenteditable"))&&
"inherit"!==a?!1:!0},isKeydown:function(){return"keydown"===this.getEventType()},isKeypress:function(){return"keypress"===this.getEventType()},isKeyup:function(){return"keyup"===this.getEventType()},getKeyCode:function(){return this.event.which},getKeyStroke:function(){return String.fromCharCode(this.getKeyCode())},getEventType:function(){return this.event.type},getEvent:function(){return this.event}});g.prototype=new b(g,{addAction:function(a){var c=h.trim(a.type||"").toLowerCase();if(!this.actions[c])throw new TypeError('Invalid "type" of "action" in [ActionContainer::addAction]');
this.actions[c].push(a)},getActions:function(a){return this.actions[a]||[]},getAllActions:function(){return this.actions}});l.prototype=new b(l,{handle:function(a){a.isKeypress()?(this.keyStrokes+=a.getKeyStroke(),this.handleKeypress(a)):this.handleKeyHit(a)},handleKeypress:function(a){var c=this.getPrevKeypressActions();c=this.filterKeypresActions(c,a);this.setPrevKeypressActions(c);this.execute(c,a)},handleKeyHit:function(a){var c=this.actionContainer.getActions(a.getEventType());c=this.filterKeyHitActions(c,
a);this.execute(c,a)},filterKeypresActions:function(a,c){function d(a){var d=a.pattern;if(d){var f=d.value;d.isRegExp?(f=new RegExp(f),f=f.test(k)):f=0===f.indexOf(k);f&&b(a)?h.push(a):(a=a.fns&&a.fns.clear,"function"===typeof a&&a(e,k,c))}else b(a)}function b(a){a=a.fns&&a.fns.filter;return"function"===typeof a?a(e,k,c)?!0:!1:!0}for(var h=[],e=c.getKeyStroke(),k=this.keyStrokes,f=0,t=a.length;f<t;++f)d(a[f]);return h},filterKeyHitActions:function(a,c){for(var d=0,b=a.length,h,e,k=[],f=c.getKeyStroke(),
t=this.keyStrokes;d<b;++d)h=a[d],e=h.fns&&h.fns.filter,"function"===typeof e&&e(f,t,c)&&k.push(h);return k},execute:function(d,c){var b=c.getKeyStroke(),h=this.keyStrokes,e=d.length;if(0<e){for(var g=0,k,f=!0;g<e;++g)(k=d[g].pattern)&&!k.isRegExp&&h!==k.value?k=!1:(k=d[g].fns,k=k.execute,a("[Router::execute], ",this,b,h,c),k=k(b,h,c)),f=k&&f;f&&(this.clearKeyStrokes(),this.clearPrevKeypressActions())}else c.isKeypress()&&(this.clearKeyStrokes(),this.clearPrevKeypressActions())},getPrevKeypressActions:function(){return null==
this.prevKeypressActions?this.actionContainer.getActions("keypress"):this.prevKeypressActions},setPrevKeypressActions:function(a){0<a.length?this.prevKeypressActions=a:this.clearPrevKeypressActions()},clearPrevKeypressActions:function(){this.prevKeypressActions=null},clearKeyStrokes:function(){this.keyStrokes=""}});m.prototype=new b(m,{setHandlers:function(){var a=this,c=function(c){c=new e(r.EventObject(c));a.router.handle(c)};this.handlers.keydown=c;this.handlers.keypress=c;this.handlers.keyup=
c},bindEvent:function(d){this.bindedEvents[d]||(this.bindedEvents[d]=!0,r.addListener(document,d,this.handlers[d]),a('[Controller::bindEvent], bind Event: "'+d+'"'))},unbindEvent:function(d){this.bindedEvents[d]&&(this.bindedEvents[d]=!1,r.removeListener(document,d,this.handlers[d]),a('[Controller::unbindEvent], unbind Event: "'+d+'"'))}});(function(){var a=new g,c=new l(a);c=new m(c);p(c,a)})()})();
(function(a){var b=a.logger,e=function(){var a=document,b="CSS1Compat"===a.compatMode;return{isVisible:function(a){var c=a.getBoundingClientRect();return!g.every(["top","right","bottom","left"],function(a,b){if(0===c[a])return!0})},isInView:function(a){if(e.isVisible(a)){var c=a.getBoundingClientRect();a=["top"];var b;if(b=g.every(a,function(a,b){if(0>c[a])return!0}))return!1;var d=e.getViewHeight();return(b=g.every(a,function(a,b){if(0>=d-c[a])return!0}))?!1:!0}return!1},getElementsInView:function(b){b=
"string"==typeof b?a.getElementsByTagName(b):b;var c=[];try{c=Array.prorotype.slice.call(b)}catch(v){for(var d=b.length;d--;)c.push(b[d]);c.reverse()}return b=g.filter(c,function(a,c){if(e.isInView(a))return!0})},getElementPosition:function(a){a=a.getBoundingClientRect(a);return{top:e.getDocScrollTop()+a.top,left:e.getDocScrollLeft()+a.left}},getDocScrollTop:function(){return a.documentElement.scrollTop||a.body.scrollTop},getDocScrollLeft:function(){return a.documentElement.scrollLeft||a.body.scrollLeft},
getViewHeight:function(){var d=window.innerHeight;"undefined"==typeof d&&(d=b?a.documentElement.clientHeight:a.body.clientHeight);return d},getViewWidth:function(){return b?a.documentElement.clientWidth:a.body.clientWidth},getDocHeight:function(){return Math.max(a.documentElement.scrollHeight,a.body.scrollHeight)},addStyleSheet:function(b,c){var d=a.createElement("style");d.type="text/css";if(d.styleSheet)d.styleSheet.cssText=b;else{var h=a.createTextNode(b);d.appendChild(h)}for(var e in c)c.hasOwnProperty(e)&&
d.setAttribute(e,c[e]);a.body.appendChild(d)}}}(),g=function(){var a=Array.prototype,b=a.indexOf,d=a.forEach,c=a.map,e=a.filter,l=a.every,m=String.prototype.trim,q={indexOf:function(a,c){if(null==a)return-1;if(b&&b===a.indexOf)return a.indexOf(c);for(var d=0,f=a.length;d<f;++d)if(c===a[d])return d;return-1},in_array:function(a,c){return-1===q.indexOf(c,a)?!1:!0},forEach:function(a,c,b){if(null!=a)if(d&&d===a.forEach)a.forEach(c,b);else if(a instanceof Array)for(var f=0,e=a.length;f<e&&!1!==c.call(b,
a[f],f,a);++f);else for(f in a)if(a.hasOwnProperty(f)&&!1===c.call(b,a[f],f,a))break},map:function(a,b,d){if(null!=a){if(c&&c===a.map)return a.map(b,d);var f=a instanceof Array?[]:{};q.forEach(a,function(a,c,e){f instanceof Array?f.push(b.call(d,a,c,e)):f[c]=b.call(d,a,c,e)});return f}},filter:function(a,c,b){if(null!=a){if(e&&e===a.filter)return a.filter(c,b);var d=a instanceof Array?[]:{};g.forEach(a,function(a,f,e){c.call(b,a,f,e)&&(d instanceof Array?d.push(a):d[f]=a)});return d}},every:function(a,
c,b){if(null==a)return!0;if(l&&l==a.every)return a.every(c,b);var d=!0;g.forEach(a,function(a,f,e){if(!(d=d&&c.call(b,a,f,e)))return!1});return d},isEmptyObject:function(a){var c=!0,b;for(b in a)if(a.hasOwnProperty(b)){c=!1;break}return c},trim:function(a){var c=/^\s+|\s+$/g;a=String(a);return m&&m===a.trim?a.trim(a):a.replace(c,"")},upperFirst:function(a){a=String(a);return a.charAt(0).toUpperCase()+a.substr(1)}};return q}(),l=function(){var e=[],l=[],d=function(a,b,d){b="function"===typeof b?b():
b;b.type=a;e.push(d);l.push(b)};return{addKeydown:function(a,b){d("keydown",b,a)},addKeypress:function(a,b){d("keypress",b,a)},addKeyup:function(a,b){d("keyup",b,a)},init:function(c){c=c||[];for(var d=0,h=e.length;d<h;++d)if(!g.in_array(e[d]),c)a.addActions(l[d]),b.log('[V::init], add action: "'+e[d]+'"')}}}(),m=function(a,b,d){return d.isValidKeyStroke()};l.addKeypress("srcollDown",{pattern:{value:"j"},fns:{filter:m,execute:function(){var a=$("#omrss-main").scrollTop();$("#omrss-main").scrollTop(a+
200);return!0}}});l.addKeypress("srcollDown",{pattern:{value:" "},fns:{filter:m,execute:function(){var a=$("#omrss-main").scrollTop();$("#omrss-main").scrollTop(a+600);return!0}}});l.addKeypress("scrollUp",{pattern:{value:"k"},fns:{filter:m,execute:function(){var a=$("#omrss-main").scrollTop();$("#omrss-main").scrollTop(a-200);return!0}}});l.addKeypress("goTop",{pattern:{value:"gg"},fns:{filter:m,execute:function(a,e){b.log("gotop");$("#omrss-main").scrollTop(0);toast("\u56de\u5230\u9876\u90e8");
return!0}}});l.addKeypress("hackCopyLeft",{pattern:{value:"zz"},fns:{filter:m,execute:function(a,b){$("#omrss-third").removeAttr("style");$(".cnt-right").css("overflow-y","scroll");return!0}}});l.addKeypress("goBottom",{pattern:{value:"G"},fns:{filter:m,execute:function(){var a=$("#omrss-main")[0].scrollHeight;$("#omrss-main").scrollTop(a);toast("\u5230\u8fbe\u5e95\u90e8");return!0}}});l.addKeypress("nextArticle",{pattern:{value:"n"},fns:{filter:m,execute:function(){if(0===$(".ev-cnt-list.active").length)$(".ev-cnt-list")[0].click(),
toast("\u4e0b\u4e00\u7bc7");else{var a=$(".ev-cnt-list.active").next();1===a.length?(a.click(),toast("\u4e0b\u4e00\u7bc7")):toast("\u672c\u9875\u5df2\u7ecf\u6d4f\u89c8\u5b8c\u4e86")}return!0}}});l.addKeypress("prevArticle",{pattern:{value:"N"},fns:{filter:m,execute:function(){var a=$(".ev-cnt-list.active").prev();1===a.length?(a.click(),toast("\u4e0a\u4e00\u7bc7")):toast("\u5df2\u7ecf\u662f\u7b2c\u4e00\u7bc7\u4e86");return!0}}});l.addKeypress("toggleFullscreen",{pattern:{value:"F"},fns:{filter:m,
execute:function(){$(".ev-toggle-fullscreen").click();toast("\u5207\u6362\u5168\u5c4f");return!0}}});l.addKeypress("refreshSite",{pattern:{value:"r"},fns:{filter:m,execute:function(){$("#omrss-loader").removeClass("hide");location.reload();$("#omrss-loader").addClass("hide");toast("\u5237\u65b0");return!0}}});l.addKeypress("nextPage",{pattern:{value:"p"},fns:{filter:m,execute:function(){var a=$(".ev-page-next");1===a.length?(a.click(),toast("\u4e0b\u4e00\u9875")):warnToast("\u5df2\u7ecf\u662f\u6700\u540e\u4e00\u9875\u4e86");
return!0}}});l.addKeypress("markAndNextPage",{pattern:{value:"D"},fns:{filter:m,execute:function(){$(".collection li[id]").each(function(a){setReadArticle(this.id);a=$(this).find("i.unread");a.removeClass("unread").addClass("read");a.text("check");$(this).find(".omrss-title").removeClass("omrss-title-unread")});updateUnreadCount();loadPage(parseInt(getCurPage())+1);toast("\u6807\u8bb0\u672c\u9875\u5df2\u8bfb");return!0}}});l.addKeypress("previousPage",{pattern:{value:"P"},fns:{filter:m,execute:function(){var a=
$(".ev-page-previous");1===a.length?(a.click(),toast("\u4e0a\u4e00\u9875")):warnToast("\u5df2\u7ecf\u662f\u7b2c\u4e00\u9875\u4e86");return!0}}});(function(){function a(a){for(var b="abcdefghijklmnopqrstuvwxyz".split(""),c="0123456789abcdefghijklmnop".split(""),d=b.length,e=Number(a-1).toString(d).length,f=[],h=0,l,k,m,n;h<a;++h){l=0;n="";for(m=h.toString(d);k=m.charAt(l++);)k=g.indexOf(c,k),n+=b[k];n.length<e&&(n=Array(e-n.length+1).join(b[0])+n);f.push(n)}return f}function r(a,b,c){var d=b.substr(1);
return g.filter(a,function(a,b){if(0===a[0].indexOf(d))return!0;c.removeChild(a[2]);a[0]=a[1]=a[2]=null})}function d(b,c){var d=[],f=a(b.length);g.forEach(b,function(a,b){var h=document.createElement("ins");h.className="vimlike-shortcuts-found-tag";var g=e.getElementPosition(a);h.style.cssText="left:"+g.left+"px;top:"+g.top+"px;";g=f[b];h.innerHTML=g;c.appendChild(h);d.push([g,a,h])});document.getElementById("vimlike:findStyleId")||e.addStyleSheet('.vimlike-shortcuts-found-tag{position:absolute;z-index:99999;background-color:yellow;color:black;padding:0 1px;border:solid 1px #E3BE23;text-decoration:none;font:bold 12px "Helvetica Neue", "Helvetica", "Arial", "Sans";}',
{id:"vimlike:findStyleId"});document.body.appendChild(c);return d}function c(a,b){var c=a.getAttribute("target");b&&a.setAttribute("target","_blank");n(a);b&&setTimeout(function(){a.setAttribute("target",c);a=null},10)}function n(a){if(/Firefox/.test(navigator.userAgent)){b.log("[fireClick], firefox, special click");var c=a.getAttribute("target"),d=!0;if(c)"_self"==c&&(d=!0);else{c=document.getElementsByTagName("head")[0].getElementsByTagName("base");for(var e=0,f=c.length;e<f;)d="_self"==c[e].getAttribute("target")?
!0:!1,++e}d?window.location.href=a.href:window.open(a.href)}else document.createEvent?(d=document.createEvent("MouseEvents"),d.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),a.dispatchEvent(d)?b.log("[fireClick], not canceled"):b.log("[fireClick], canceled")):a.click()}function p(){try{document.body.removeChild(q)}catch(f){}k=q=null}function u(a,b,h){if("f"==b.toLowerCase()){a=document.links;a=e.getElementsInView(a);q=document.createElement("div");k=a=d(a,q);if(0==a.length)return!0;
toast("\u94fe\u63a5\u5168\u89c8")}else if(a=k=r(k,b,q),b=a.length,!(1<b))return 1===b&&(c(a[0][1],!0),p()),!0}var q,k;l.addKeypress("findf",function(a){return{type:a,pattern:{isRegExp:!0,value:a},fns:{filter:m,execute:u}}}("^f.*"));l.addKeyup("clearFind",{fns:{filter:function(a,b,c){return c.isEscape()},execute:function(){p();window.focus();return!0}}})})();(function(){function a(a){for(var b=0,c=a.length;b<c;++b)try{a[b].blur()}catch(n){}}l.addKeyup("blur",{fns:{filter:function(a,b,c){return c.isEscape()},
execute:function(b,d,c){if(document.activeElement)try{document.activeElement.blur()}catch(n){}a(document.getElementsByTagName("input"));a(document.getElementsByTagName("textarea"));window.focus();return!0}}})})();var p=function(){var b=!1;return{isOn:function(){return b},setOn:function(){b=!0;a.bindEvents(["keypress","keyup"])},setOff:function(){b=!1;a.unBindEvents(["keypress","keyup"])},toggle:function(){b?p.setOff():p.setOn()}}}();l.init();p.setOn();a.toggleVimlike=p.toggle;a.isVimlikeOn=p.isOn})(this.shortcuts);