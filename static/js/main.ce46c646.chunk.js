(this["webpackJsonplearning_log-web"]=this["webpackJsonplearning_log-web"]||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),o=n(6),r=n.n(o),s=(n(14),n.p+"static/media/logo.6ce24c58.svg"),i=(n(15),n(9)),l=n(5),u=n(2);function d(e,t,n,c){var a;c&&(a=JSON.stringify(c));var o=new XMLHttpRequest,r="http://localhost:8000/api".concat(t);o.responseType="json";var s=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),c=0;c<n.length;c++){var a=n[c].trim();if(a.substring(0,e.length+1)===e+"="){t=decodeURIComponent(a.substring(e.length+1));break}}return t}("csrftoken");o.open(e,r),o.setRequestHeader("Content-Type","application/json"),s&&(o.setRequestHeader("X-Requested-With","XMLHttpRequest"),o.setRequestHeader("X-CSRFToken",s)),o.onload=function(){403===o.status&&("Authentication credentials were not provided."===o.response.detail&&-1===window.location.href.indexOf("login")&&(window.location.href="/login?showLoginRequired=true"));n(o.response,o.status)},o.onerror=function(e){console.log(e),n({message:"The request was an error"},400)},o.send(a)}var j=n(8),p=n(0);function b(e){var t=e.topic,n=e.className?e.className:"col-10 mx-auto col-md-6",c=window.location.pathname.match(Object(j.a)(/([0-9]+)/,{topicid:1})),a=c?c.groups.topicid:-1,o="".concat(t.id)==="".concat(a);return Object(p.jsxs)("div",{className:n,children:[Object(p.jsx)("div",{children:Object(p.jsxs)("p",{children:[t.id," - ",t.text]})}),!0===o?null:Object(p.jsx)("button",{className:"btn btn-outline-primary",onClick:function(e){e.preventDefault(),window.location.href="/".concat(t.id)},children:"View"})]})}function f(e){var t=Object(c.useState)([]),n=Object(u.a)(t,2),a=n[0],o=n[1],r=Object(c.useState)([]),s=Object(u.a)(r,2),i=s[0],j=s[1],f=Object(c.useState)(!1),m=Object(u.a)(f,2),h=m[0],O=m[1];return Object(c.useEffect)((function(){var t=Object(l.a)(e.newTopics).concat(a);t.length!==i.length&&j(t)}),[e.newTopics,i,a]),Object(c.useEffect)((function(){if(!1===h){!function(e,t){var n="/topics";e&&(n="/topics/?username=".concat(e)),d("GET",n,t)}(e.username,(function(e,t){200===t?(o(e),O(!0)):alert("There was an eror")}))}}),[a,h,O,e.username]),i.map((function(e,t){return Object(p.jsx)(b,{topic:e,className:"my-5 py-5 border bg-white text-dark"},"".concat(t,"-{item.id}"))}))}function m(e){var t=a.a.createRef(),n=e.didTopic,c=function(e,t){201===t?n(e):(console.log(e),alert("An error occurred please try again."))};return Object(p.jsx)("div",{className:e.className,children:Object(p.jsxs)("form",{onSubmit:function(e){e.preventDefault();var n=t.current.value;d("POST","/topics/new_topic/",c,{text:n}),t.current.value=""},children:[Object(p.jsx)("textarea",{ref:t,required:!0,className:"form-control"}),Object(p.jsx)("button",{type:"submit",className:"btn btn-primary my-3",children:"Topic"})]})})}function h(e){var t=Object(c.useState)([]),n=Object(u.a)(t,2),a=n[0],o=n[1],r="false"!==e.canCreate;return Object(p.jsxs)("div",{className:e.className,children:[!0===r&&Object(p.jsx)(m,{didTopic:function(e){var t=Object(l.a)(a);t.unshift(e),o(t)},className:"col-12 mb-3"}),Object(p.jsx)(f,Object(i.a)({newTopics:a},e))]})}function O(e){var t=e.topicId,n=Object(c.useState)(!1),a=Object(u.a)(n,2),o=a[0],r=a[1],s=Object(c.useState)(null),i=Object(u.a)(s,2),l=i[0],j=i[1],f=function(e,t){200===t?j(e):alert("There was an error finding your tweet.")};return Object(c.useEffect)((function(){!1===o&&(!function(e,t){d("GET","/topics/".concat(e),t)}(t,f),r(!0))}),[t,o,r]),null===l?null:Object(p.jsx)(b,{topic:l,className:e.className})}var g=function(){return Object(p.jsx)("div",{className:"App",children:Object(p.jsxs)("header",{className:"App-header",children:[Object(p.jsx)("img",{src:s,className:"App-logo",alt:"logo"}),Object(p.jsxs)("p",{children:["Edit ",Object(p.jsx)("code",{children:"src/App.js"})," and save to reload."]}),Object(p.jsx)("div",{children:Object(p.jsx)(h,{})}),Object(p.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]})})},v=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,o=t.getLCP,r=t.getTTFB;n(e),c(e),a(e),o(e),r(e)}))},x=document.getElementById("root");x&&r.a.render(Object(p.jsx)(g,{}),x);var w=a.a.createElement,N=document.getElementById("Learning-Log");N&&r.a.render(w(h,N.dataset),N),document.querySelectorAll(".learning_posts-detail").forEach((function(e){r.a.render(w(O,e.dataset),e)})),v()}},[[17,1,2]]]);
//# sourceMappingURL=main.ce46c646.chunk.js.map