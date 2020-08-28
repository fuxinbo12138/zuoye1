(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{188:function(t,e,r){"use strict";r.d(e,"d",(function(){return c})),r.d(e,"b",(function(){return o})),r.d(e,"g",(function(){return l})),r.d(e,"c",(function(){return d})),r.d(e,"h",(function(){return v})),r.d(e,"e",(function(){return f})),r.d(e,"a",(function(){return m})),r.d(e,"f",(function(){return h}));var n=r(62),c=function(t){return Object(n.b)({method:"GET",url:"/api/articles",params:t})},o=function(data){return Object(n.b)({method:"post",url:"/api/articles",data:data})},l=function(){return Object(n.b)({method:"GET",url:"/api/tags"})},d=function(t){return Object(n.b)({method:"post",url:"/api/articles/".concat(t,"/favorite")})},v=function(t){return Object(n.b)({method:"delete",url:"/api/articles/".concat(t,"/favorite")})},f=function(t){return Object(n.b)({method:"get",url:"/api/articles/".concat(t)})},m=function(t,data){return Object(n.b)({method:"post",url:"/api/articles/".concat(t,"/comments"),data:data})},h=function(t){return Object(n.b)({method:"get",url:"/api/articles/".concat(t,"/comments")})}},258:function(t,e,r){"use strict";r.r(e);r(78),r(31),r(63);var n=r(45),c=(r(30),r(13),r(44),r(42)),o=(r(183),r(184),r(29),r(4)),l=r(188),d=r(41);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m={name:"homePage",asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var r,n,o,d,v,f,m,h,_,C,O,j;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.query,n=Number.parseInt(r.page||1),o=20,d=r.tag,v=r.tab||"global_feed",e.next=7,Promise.all([Object(l.d)({limit:o,offset:(n-1)*o,tag:d}),Object(l.g)()]);case 7:return f=e.sent,m=Object(c.a)(f,2),h=m[0],_=m[1],C=h.data,O=C.articlesCount,(j=C.articles).forEach((function(t){t.disabled=!1})),_=_.data.tags.splice(0,30),e.abrupt("return",{limit:o,page:n,articlesCount:O,articles:j,tags:_,tag:d,tab:v});case 15:case"end":return e.stop()}}),e)})))()},data:function(){return{}},computed:f(f({},Object(d.b)(["user"])),{},{totalPage:function(){return Math.ceil(this.articlesCount/this.limit)}}),watchQuery:["page","tag","tab"],watch:{},created:function(){},mounted:function(){},methods:{favorited:function(article,t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function r(){var n,c,o,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(e.$store.state.user){r.next=3;break}return e.$router.push({name:"login"}),r.abrupt("return");case 3:return article.disabled=!0,n=article.favorited,c=n?l.h:l.c,r.next=8,c(article.slug);case 8:o=r.sent,data=o.data,e.articles.splice(t,1,data.article),e.$set(e.articles[t],"disabled",!1);case 12:case"end":return r.stop()}}),r)})))()}}},h=r(23),component=Object(h.a)(m,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"home-page"},[t._m(0),t._v(" "),r("div",{staticClass:"container page"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-9"},[r("div",{staticClass:"feed-toggle"},[r("ul",{staticClass:"nav nav-pills outline-active"},[t.user?r("li",{staticClass:"nav-item"},[r("nuxt-link",{staticClass:"nav-link",class:{active:"your_Feed"===t.tab},attrs:{to:{name:"home",query:{tab:"your_Feed"}},exact:""}},[t._v("Your Feed")])],1):t._e(),t._v(" "),r("li",{staticClass:"nav-item"},[r("nuxt-link",{staticClass:"nav-link",class:{active:"global_feed"===t.tab},attrs:{to:{name:"home"},exact:""}},[t._v("Global Feed")])],1),t._v(" "),t.tag?r("li",{staticClass:"nav-item"},[r("nuxt-link",{staticClass:"nav-link",class:{active:"tab"===t.tab},attrs:{to:{name:"home",query:{tab:"tag",tag:t.tag}},exact:""}},[t._v("#"+t._s(t.tag))])],1):t._e()])]),t._v(" "),t._l(t.articles,(function(article,e){return r("div",{key:article.slug,staticClass:"article-preview"},[r("div",{staticClass:"article-meta"},[r("nuxt-link",{staticClass:"author",attrs:{to:"/profile/"+article.author.username}},[r("img",{attrs:{src:article.author.image}})]),t._v(" "),r("div",{staticClass:"info"},[r("nuxt-link",{staticClass:"author",attrs:{to:"/profile/"+article.author.username}},[t._v("\n                "+t._s(article.author.username)+"\n              ")]),t._v(" "),r("span",{staticClass:"date"},[t._v(t._s(article.createdAt))])],1),t._v(" "),r("button",{staticClass:"btn btn-outline-primary btn-sm pull-xs-right",class:{active:article.favorited},attrs:{disabled:article.disabled},on:{click:function(r){return t.favorited(article,e)}}},[r("i",{staticClass:"ion-heart"}),t._v(" "+t._s(article.favoritesCount)+"\n            ")])],1),t._v(" "),r("nuxt-link",{staticClass:"preview-link",attrs:{to:{name:"article",params:{slug:article.slug}}}},[r("h1",[t._v(t._s(article.title))]),t._v(" "),r("p",[t._v(t._s(article.description))]),t._v(" "),r("span",{on:{click:function(e){return t.$router.push({name:"article",params:{slug:article.slug}})}}},[t._v("Read more...")])])],1)})),t._v(" "),r("nav",[r("ul",{staticClass:"pagination"},t._l(t.totalPage,(function(e){return r("li",{key:e,staticClass:"page-item",class:{active:e===t.page}},[r("nuxt-link",{staticClass:"page-link",attrs:{to:{name:"home",query:{page:e,tag:t.tag,tab:t.tab}}}},[t._v(t._s(e))])],1)})),0)])],2),t._v(" "),r("div",{staticClass:"col-md-3"},[r("div",{staticClass:"sidebar"},[r("p",[t._v("Popular Tags")]),t._v(" "),r("div",{staticClass:"tag-list"},t._l(t.tags,(function(e){return r("nuxt-link",{key:e,staticClass:"tag-pill tag-default",attrs:{to:{name:"home",query:{tab:"tab",tag:e}}}},[t._v(t._s(e))])})),1)])])])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"banner"},[e("div",{staticClass:"container"},[e("h1",{staticClass:"logo-font"},[this._v("conduit")]),this._v(" "),e("p",[this._v("A place to share your knowledge.")])])])}],!1,null,"d56052d8",null);e.default=component.exports}}]);