(this["webpackJsonpmarsrover-kata"]=this["webpackJsonpmarsrover-kata"]||[]).push([[0],{15:function(t,e,o){},16:function(t,e,o){},18:function(t,e,o){"use strict";o.r(e);var r,n,i=o(2),c=o.n(i),a=o(8),s=o.n(a),u=(o(15),o(16),o(9)),d=o(1),l=o(4),v=o(3),b=function(t){return function(e){return t===e||!!t&&!!e&&t.x===e.x&&t.y===e.y}},j=function(t){return function(e){var o,r;return null===(o=e.obstacles)||void 0===o||null===(r=o.some)||void 0===r?void 0:r.call(o,b(t))}},f=o(10),O=o(0),h=["type"];!function(t){t.Rover="R",t.Obstacle="X",t.Visited="V",t.NotVisited="O"}(n||(n={}));var p,g=(r={},Object(v.a)(r,n.Rover,"blue"),Object(v.a)(r,n.NotVisited,"gray"),Object(v.a)(r,n.Obstacle,"red"),Object(v.a)(r,n.Visited,"green"),r),x=function(t){var e=t.type,o=Object(f.a)(t,h);return Object(O.jsx)("div",Object(d.a)(Object(d.a)({className:"p-2 h-10 w-10 bg-".concat(g[e],"-900 rounded-full flex items-center justify-center")},o),{},{children:e}))};!function(t){t.East="E",t.West="W",t.North="N",t.South="S"}(p||(p={}));var y,w=[p.East,p.South,p.West,p.North],R=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:p.North,o=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return{position:Object(d.a)({},t),direction:e,hasObstacles:o}},m=function(t){if(!t)return[void 0,Error("Coordinates are required!")];var e=!1;t.startsWith("O:")&&(e=!0,t=t.replace("O:",""));var o=t.split(":"),r=+o[0],n=+o[1],i=o[2];return Number.isNaN(r)?[void 0,Error("Rows are required!")]:Number.isNaN(n)?[void 0,Error("Columns are required")]:i&&Object.values(p).includes(i)?[{position:{x:r,y:n},direction:i,hasObstacles:e}]:[void 0,Error("Direction is not one of the possible: ".concat(p))]},N=function(t){var e="".concat(t.position.x,":").concat(t.position.y,":").concat(t.direction);return t.hasObstacles&&(e="O:"+e),e};!function(t){t.Move="M",t.RotateLeft="L",t.RotateRight="R"}(y||(y={}));var k,E={tryMoveTowardsPoint:function(t){return function(e){return function(o){var r=Object(d.a)(Object(d.a)({},o.position),t);return j(r)(e)?Object(d.a)(Object(d.a)({},o),{},{hasObstacles:!0}):Object(d.a)(Object(d.a)({},o),{},{position:r,hasObstacles:!1})}}},getMoveFunction:function(t){return function(e){switch(e.direction){case p.East:var o=(e.position.x+1)%t.cols;return[E.tryMoveTowardsPoint({x:o})];case p.West:var r=(e.position.x?e.position.x:t.cols)-1;return[E.tryMoveTowardsPoint({x:r})];case p.North:var n=(e.position.y+1)%t.rows;return[E.tryMoveTowardsPoint({y:n})];case p.South:var i=(e.position.y?e.position.y:t.rows)-1;return[E.tryMoveTowardsPoint({y:i})];default:return[void 0,Error("Unknown direction!")]}}},moveForward:function(t){return function(e){var o=E.getMoveFunction(t)(e),r=Object(l.a)(o,2),n=r[0],i=r[1];return i||!n?[void 0,i]:[n(t)(e)]}}},M=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m("0:0:N")[0];return{coordinates:t}},C=function(t){return function(e){return function(o){if(!t)return[void 0,Error("Command/s is not valid!")];var r=("string"===typeof t?t.split(""):t).reduce((function(t,o){var r=Object(l.a)(t,2),n=r[0];r[1];switch(o){case y.Move:var i=E.moveForward(e)(n),c=Object(l.a)(i,2),a=c[0],s=c[1];return s||!a?[n,s]:[a];case y.RotateRight:return[R(n.position,w[(w.indexOf(n.direction)+1)%w.length],!1)];case y.RotateLeft:var u=w.indexOf(n.direction);return[R(n.position,w[(u||w.length)-1],!1)];default:return[n,Error("Command type not known!")]}}),[Object(d.a)({},o.coordinates)]),n=Object(l.a)(r,1)[0];return[N(n)]}}},L=function(t){var e=t.children,o=t.onClick;return Object(O.jsx)("button",{className:"bg-gray-300 text-black rounded m-2",onClick:function(t){return null===o||void 0===o?void 0:o()},children:e})},S={Move:["k","ArrowUp"],RotateLeft:["j","ArrowLeft"],RotateRight:["l","ArrowRight"]},F=(k={},Object(v.a)(k,p.East,""),Object(v.a)(k,p.North,"-rotate-90"),Object(v.a)(k,p.West,"rotate-180"),Object(v.a)(k,p.South,"rotate-90"),k),T=function(t,e){return{x:t%e.cols,y:Math.floor(t/e.cols)}},P=function(t){var e=Object(i.useState)(M()),o=Object(l.a)(e,2),r=o[0],c=o[1],a=Object(i.useState)([Object(d.a)({},r.coordinates.position)]),s=Object(l.a)(a,2),v=s[0],f=s[1],h=Object(i.useCallback)((function(e){var o=C([e])(t.grid)(r),n=Object(l.a)(o,2),i=n[0];if(!n[1]&&i){var a=m(i),s=Object(l.a)(a,2),b=s[0];!s[1]&&b&&(c(M(b)),f([].concat(Object(u.a)(v),[Object(d.a)({},b.position)])))}}),[t.grid,r,v]);Object(i.useEffect)((function(){var t=function(t){S.Move.includes(t.key)?h(y.Move):S.RotateLeft.includes(t.key)?h(y.RotateLeft):S.RotateRight.includes(t.key)&&h(y.RotateRight)};return window.addEventListener("keydown",t),function(){window.removeEventListener("keydown",t)}}),[h]);for(var p=Object(i.useCallback)((function(e){return j(e)(t.grid)?n.Obstacle:b(r.coordinates.position)(e)?n.Rover:v.some(b(e))?n.Visited:n.NotVisited}),[t.grid,r.coordinates.position,v]),g=[],w=0;w<t.grid.rows*t.grid.cols;w++){var R=T(w,t.grid),N="e_".concat(R.x,"_").concat(R.y),k=p(R);g.push(Object(O.jsx)("div",{className:"".concat(k===n.Rover?"transform ".concat(F[r.coordinates.direction]):""),style:{gridRow:t.grid.rows-R.y},children:Object(O.jsx)(x,{type:k,"data-testid":N})},N))}return Object(O.jsxs)("div",{className:"flex flex-col items-center space-x-5 space-y-5",children:[Object(O.jsx)("div",{className:"h-10",children:r.coordinates.hasObstacles&&Object(O.jsx)("span",{children:"BLOCKED BY OBSTACLE!"})}),Object(O.jsx)("div",{className:"grid grid-cols-".concat(t.grid.cols),children:g}),Object(O.jsxs)("div",{className:"flex flex-row justify-between content-center",children:[Object(O.jsx)(L,{onClick:function(){return h(y.RotateLeft)},children:"Rotate Left"}),Object(O.jsx)(L,{onClick:function(){return h(y.Move)},children:"Move Forward"}),Object(O.jsx)(L,{onClick:function(){return h(y.RotateRight)},children:"Rotate Right"})]})]})};var V=function(){return Object(O.jsx)("div",{className:"App",children:Object(O.jsx)("header",{className:"App-header",children:Object(O.jsx)(P,{grid:{rows:5,cols:7,obstacles:[{x:1,y:3}]}})})})},A=function(t){t&&t instanceof Function&&o.e(3).then(o.bind(null,19)).then((function(e){var o=e.getCLS,r=e.getFID,n=e.getFCP,i=e.getLCP,c=e.getTTFB;o(t),r(t),n(t),i(t),c(t)}))};s.a.render(Object(O.jsx)(c.a.StrictMode,{children:Object(O.jsx)(V,{})}),document.getElementById("root")),A()}},[[18,1,2]]]);
//# sourceMappingURL=main.fbc96d19.chunk.js.map