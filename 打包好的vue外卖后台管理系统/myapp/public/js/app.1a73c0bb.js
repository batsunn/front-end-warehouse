(function(e){function n(n){for(var r,a,c=n[0],i=n[1],u=n[2],l=0,d=[];l<c.length;l++)a=c[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);f&&f(n);while(d.length)d.shift()();return s.push.apply(s,u||[]),t()}function t(){for(var e,n=0;n<s.length;n++){for(var t=s[n],r=!0,a=1;a<t.length;a++){var c=t[a];0!==o[c]&&(r=!1)}r&&(s.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},a={app:0},o={app:0},s=[];function c(e){return i.p+"js/"+({error:"error",login:"login"}[e]||e)+"."+{error:"1d59c27e",login:"1bf14f17"}[e]+".js"}function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={error:1,login:1};a[e]?n.push(a[e]):0!==a[e]&&t[e]&&n.push(a[e]=new Promise((function(n,t){for(var r="css/"+({error:"error",login:"login"}[e]||e)+"."+{error:"d15ea35e",login:"184050df"}[e]+".css",o=i.p+r,s=document.getElementsByTagName("link"),c=0;c<s.length;c++){var u=s[c],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===r||l===o))return n()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){u=d[c],l=u.getAttribute("data-href");if(l===r||l===o)return n()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=n,f.onerror=function(n){var r=n&&n.target&&n.target.src||o,s=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=r,delete a[e],f.parentNode.removeChild(f),t(s)},f.href=o;var m=document.getElementsByTagName("head")[0];m.appendChild(f)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)n.push(r[2]);else{var s=new Promise((function(n,t){r=o[e]=[n,t]}));n.push(r[2]=s);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=c(e);var d=new Error;u=function(n){l.onerror=l.onload=null,clearTimeout(f);var t=o[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",d.name="ChunkLoadError",d.type=r,d.request=a,t[1](d)}o[e]=void 0}};var f=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(n)},i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/",i.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=n,u=u.slice();for(var d=0;d<u.length;d++)n(u[d]);var f=l;s.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"09b8":function(e,n,t){},2612:function(e,n,t){"use strict";t.d(n,"j",(function(){return a})),t.d(n,"a",(function(){return o})),t.d(n,"i",(function(){return s})),t.d(n,"c",(function(){return c})),t.d(n,"d",(function(){return i})),t.d(n,"g",(function(){return u})),t.d(n,"b",(function(){return l})),t.d(n,"f",(function(){return d})),t.d(n,"h",(function(){return f})),t.d(n,"e",(function(){return m}));var r=t("b775");function a(e){return r["a"].post("/users/checkLogin",e)}function o(e){return r["a"].post("/users/add",e)}function s(e){return r["a"].get("/users/list",e)}function c(e){return r["a"].get("/users/del",e)}function i(e){return r["a"].get("/users/batchdel",e)}function u(e){return r["a"].post("/users/edit",e)}function l(e){return r["a"].get("/users/checkoldpwd",e)}function d(e){return r["a"].post("/users/editpwd",e)}function f(e){return r["a"].get("/users/info",e)}function m(e){return r["a"].get("/users/avataredit",e)}},"2b4b":function(e,n,t){},"38b9":function(e,n,t){"use strict";t("db4e")},4678:function(e,n,t){var r={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function a(e){var n=o(e);return t(n)}function o(e){if(!t.o(r,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return r[e]}a.keys=function(){return Object.keys(r)},a.resolve=o,e.exports=a,a.id="4678"},"4ee2":function(e,n,t){},"522b":function(e,n,t){},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var r=t("2b0e"),a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},o=[],s=t("c57c"),c={data:function(){return{gapTime:0,beforeUnloadTime:0}},mounted:function(){var e=this;window.addEventListener("beforeunload",(function(n){return e.beforeunloadFn()})),window.addEventListener("unload",(function(n){return e.unloadFn()}))},methods:{unloadFn:function(){this.gapTime=(new Date).getTime()-this.beforeUnloadTime,this.gapTime<=5&&s["a"].clear()},beforeunloadFn:function(){this.beforeUnloadTime=(new Date).getTime()}},destroyed:function(){var e=this;window.removeEventListener("beforeunload",(function(n){return e.beforeunloadFn()})),window.removeEventListener("unload",(function(n){return e.unloadFn()}))}},i=c,u=(t("93ee"),t("2877")),l=Object(u["a"])(i,a,o,!1,null,"127664c9",null),d=l.exports,f=t("a18c"),m=(t("4ee2"),t("5c96")),b=t.n(m),p=(t("0fae"),t("82da"),t("522b"),function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("el-card",{staticClass:"box-card"},[t("div",{staticClass:"title"},[e._t("title")],2),t("div",{staticClass:"content"},[e._t("content")],2)])}),h=[],j={},g=j,v=(t("38b9"),Object(u["a"])(g,p,h,!1,null,"fc303c36",null)),w=v.exports;r["default"].component("Panel",w);t("4de4");var y=t("c1df"),k=t.n(y);r["default"].filter("formatDate",(function(e){return k()(e).format("YYYY-MM-DD HH:mm:ss")}));var _=t("25ae"),C=t.n(_);r["default"].use(b.a),r["default"].config.productionTip=!1,r["default"].use(C.a),new r["default"]({router:f["b"],render:function(e){return e(d)}}).$mount("#app")},"6fbe":function(e,n,t){},"75e9":function(e,n,t){"use strict";t("b2c3")},"782a":function(e,n,t){"use strict";t("09b8")},"7d49":function(e,n,t){"use strict";t("6fbe")},"82da":function(e,n,t){},"93ee":function(e,n,t){"use strict";t("2b4b")},a18c:function(e,n,t){"use strict";t.d(n,"a",(function(){return N}));t("4de4"),t("caad"),t("d3b7"),t("2532");var r=t("2b0e"),a=t("8c4f"),o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("el-container",[t("el-aside",{attrs:{width:e.isCollapse?"64px":"200px"}},[t("div",{staticClass:"head-title",on:{click:function(n){e.isCollapse=!e.isCollapse}}},[t("div",{staticClass:"logo"},[t("i",{staticClass:"iconfont icon-ziyuan"})]),t("p",{directives:[{name:"show",rawName:"v-show",value:!e.isCollapse,expression:"!isCollapse"}]},[e._v("外卖商家中心")])]),t("Nav",{attrs:{isCollapse:e.isCollapse}})],1),t("el-container",[t("el-header",[t("Header")],1),t("el-main",[t("router-view")],1)],1)],1)},s=[],c=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":e.caclactive,"background-color":"#304156","text-color":"#fff","active-text-color":"#0ff",collapse:e.isCollapse,"collapse-transition":!1,router:!0}},[e._l(e.menu,(function(n){return[n.children&&"/order"!==n.path?t("el-submenu",{key:n.path,attrs:{index:n.path}},[t("template",{slot:"title"},[t("i",{staticClass:"iconfont",class:n.meta.icon}),t("span",[e._v(e._s(n.meta.name))])]),t("el-menu-item-group",e._l(n.children,(function(n){return t("el-menu-item",{key:n.path,attrs:{index:n.path}},[e._v(e._s(n.meta.name))])})),1)],2):t("el-menu-item",{key:n.path,attrs:{index:"/order"===n.path?"/order/list":n.path}},[t("i",{staticClass:"iconfont",class:n.meta.icon}),t("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(n.meta.name))])])]}))],2)},i=[],u=t("c57c"),l={props:{isCollapse:{type:Boolean,default:!1}},data:function(){return{active:this.$route.path,menu:[]}},created:function(){this.menu=JSON.parse(u["a"].get("menu"))},computed:{caclactive:function(){switch(this.$route.path){case"/order/edit":return"/order/list";case"/product/edit":return"/product/list";default:return this.$route.path}}}},d=l,f=(t("7d49"),t("2877")),m=Object(f["a"])(d,c,i,!1,null,"1f7a6e6a",null),b=m.exports,p=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"header"},[t("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},e._l(e.arrbread,(function(n){return t("el-breadcrumb-item",{key:n.path,attrs:{to:{path:n.path}}},[e._v(e._s(n.name))])})),1),t("div",{staticClass:"personal"},[t("el-dropdown",{attrs:{trigger:"click"},on:{command:e.handleCommand}},[t("span",{staticClass:"el-dropdown-link"},[e._v(" 欢迎你，"+e._s(e.userInfo.account)+" ")]),t("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[t("el-dropdown-item",{attrs:{command:"/account/personal"}},[e._v("个人中心")]),t("el-dropdown-item",{attrs:{command:"/logout"}},[e._v("注销")])],1)],1),t("el-avatar",{attrs:{src:e.userInfo.imgUrl}})],1)],1)},h=[],j=(t("4160"),t("b0c0"),t("159b"),t("96cf"),t("1da1")),g=t("2612"),v={data:function(){return{arrbread:[],userInfo:{}}},created:function(){this.getUsers(),this.calcbread()},methods:{handleCommand:function(e){switch(e){case"/logout":u["a"].clear(),location.reload();break;case"/account/personal":this.$router.push("/account/personal");break}},calcbread:function(){var e=[{path:"/",name:"首页"}];this.$route.matched.forEach((function(n){n.meta&&n.meta.name&&e.push({path:n.path,name:n.meta.name})})),this.arrbread=e},getUsers:function(){var e=this;return Object(j["a"])(regeneratorRuntime.mark((function n(){var t,r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(g["h"])();case 2:t=n.sent,r=t.accountInfo,e.userInfo=r,u["a"].set("user",JSON.stringify(r));case 6:case"end":return n.stop()}}),n)})))()}},watch:{"$route.path":function(){this.calcbread()}}},w=v,y=(t("782a"),Object(f["a"])(w,p,h,!1,null,"49611a16",null)),k=y.exports,_={components:{Nav:b,Header:k},data:function(){return{isCollapse:!1}}},C=_,O=(t("75e9"),Object(f["a"])(C,o,s,!1,null,"164f5f78",null)),x=O.exports,z=t("2ef0"),E=t.n(z);r["default"].use(a["a"]);var P=a["a"].prototype.push;a["a"].prototype.push=function(e){return P.call(this,e).catch((function(e){return e}))};var S=[{path:"/",redirect:"/home"},{path:"/home",name:"Home",component:x,redirect:"/dashboard",children:[{path:"/dashboard",name:"Dashboard",meta:{path:"/dashboard",text:""},component:function(){return t.e("login").then(t.bind(null,"eb22"))}}]},{path:"/login",name:"Login",component:function(){return t.e("login").then(t.bind(null,"a55b"))}},{path:"*",redirect:"/404"},{path:"/404",name:404,component:function(){return t.e("error").then(t.bind(null,"dda8"))}}],T=new a["a"]({routes:S}),L={path:"/home",name:"Home",component:x,redirect:"/dashboard",children:[{path:"/dashboard",name:"Dashboard",visible:!0,meta:{path:"/dashboard",name:"首页",icon:"icon-shouye"},component:function(){return t.e("login").then(t.bind(null,"eb22"))}},{path:"/order",name:"Order",visible:!0,meta:{name:"订单管理",role:["super","normal"],icon:"icon-dingdanguanli"},redirect:"/order/list",component:function(){return t.e("login").then(t.bind(null,"02fe"))},children:[{path:"/order/list",name:"Orderlist",visible:!0,meta:{name:"订单列表"},component:function(){return t.e("login").then(t.bind(null,"552c"))}},{path:"/order/edit",name:"Orderedit",meta:{name:"订单编辑",role:["super"]},component:function(){return t.e("login").then(t.bind(null,"d810"))}}]},{path:"/product",name:"Product",meta:{name:"商品管理",icon:"icon-shangpinguanli"},visible:!0,redirect:"/product/list",component:function(){return t.e("login").then(t.bind(null,"3b75"))},children:[{path:"/product/add",name:"Productadd",meta:{name:"商品添加"},visible:!0,component:function(){return t.e("login").then(t.bind(null,"e299"))}},{path:"/product/list",name:"Productlist",meta:{name:"商品列表"},visible:!0,component:function(){return t.e("login").then(t.bind(null,"233b"))}},{path:"/product/cate",name:"Productcate",meta:{name:"商品分类"},visible:!0,component:function(){return t.e("login").then(t.bind(null,"4723"))}},{path:"/product/edit",name:"Productedit",meta:{name:"商品编辑"},visible:!1,component:function(){return t.e("login").then(t.bind(null,"e7da"))}}]},{path:"/shop",name:"Shop",meta:{name:"店铺管理",role:["super"],icon:"icon-dianpuguanli"},visible:!0,component:function(){return t.e("login").then(t.bind(null,"bcf8"))}},{path:"/account",name:"Account",visible:!0,redirect:"/account/resetpwd",meta:{name:"账号管理",role:["super","normal"],icon:"icon-zhanghaoguanli"},component:function(){return t.e("login").then(t.bind(null,"7bdd"))},children:[{path:"/account/add",name:"Accountadd",visible:!0,meta:{name:"添加账号",role:["super"]},component:function(){return t.e("login").then(t.bind(null,"efa0"))}},{path:"/account/list",name:"Accountlist",visible:!0,meta:{name:"账号列表",role:["super"]},component:function(){return t.e("login").then(t.bind(null,"e81c"))}},{path:"/account/resetpwd",name:"Resetpwd",visible:!0,meta:{name:"修改密码"},component:function(){return t.e("login").then(t.bind(null,"4465"))}},{path:"/account/personal",name:"personal",visible:!1,meta:{name:"个人中心"},component:function(){return t.e("login").then(t.bind(null,"e864"))}}]},{path:"/sell",name:"Sell",visible:!0,meta:{name:"销售统计",role:["super"],icon:"icon-tongji"},redirect:"/sell/goods",component:function(){return t.e("login").then(t.bind(null,"113a"))},children:[{path:"/sell/goods",name:"Goodscount",visible:!0,meta:{name:"商品统计"},component:function(){return t.e("login").then(t.bind(null,"2097"))}},{path:"/sell/order",name:"Ordercount",visible:!0,meta:{name:"订单统计"},component:function(){return t.e("login").then(t.bind(null,"82dd"))}}]}]};function N(){var e=u["a"].get("role");if(!e)return!1;var n=$(L.children,e);L.children=E.a.cloneDeep(n);var t=D(n);u["a"].set("menu",JSON.stringify(t)),T.addRoutes([L])}function D(e){return e.filter((function(e){return!!e.visible&&(e.children&&e.children.length>0&&(e.children=D(e.children)),!0)}))}function $(e,n){return e.filter((function(e){return!!A(e,n)&&(e.children&&e.children.length>0&&(e.children=$(e.children,n)),!0)}))}function A(e,n){return!e.meta||!e.meta.role||e.meta.role.includes(n)}T.beforeEach((function(e,n,t){var r=u["a"].get("token");r||"/login"===e.path?t():t("/login")})),N();n["b"]=T},b2c3:function(e,n,t){},b775:function(e,n,t){"use strict";t("d3b7");var r=t("bc3a"),a=t.n(r),o=t("4328"),s=t.n(o),c=t("c57c"),i=t("5c96"),u=t("323e"),l=t.n(u);t("a5d8");a.a.defaults.baseURL="http://127.0.0.1:5000",a.a.defaults.timeout=6e3,a.a.interceptors.request.use((function(e){l.a.start();var n=c["a"].get("token");return n&&(e.headers.Authorization=n),e})),a.a.interceptors.response.use((function(e){var n=e.data,t=n.msg,r=n.code;return void 0!=r&&void 0!=t&&(0===r||"00"===r?Object(i["Message"])({type:"success",message:t}):Object(i["Message"])({type:"error",message:t})),l.a.done(),e})),n["a"]={get:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(t,r){a.a.get(e,{params:n}).then((function(e){t(e.data)})).catch((function(e){r(e.data)}))}))},post:function(e,n){return new Promise((function(t,r){a.a.post(e,s.a.stringify(n)).then((function(e){t(e.data)})).catch((function(e){r(e.data)}))}))}}},c57c:function(e,n,t){"use strict";n["a"]={set:function(e,n){window.localStorage.setItem(e,n)},get:function(e){return window.localStorage.getItem(e)},remove:function(e){window.localStorage.removeItem(e)},clear:function(){window.localStorage.clear()}}},db4e:function(e,n,t){}});
//# sourceMappingURL=app.1a73c0bb.js.map