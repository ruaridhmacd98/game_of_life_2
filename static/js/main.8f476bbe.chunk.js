(this.webpackJsonplife=this.webpackJsonplife||[]).push([[0],{25:function(t,e,s){},26:function(t,e,s){},27:function(t,e,s){},47:function(t,e,s){"use strict";s.r(e);var n=s(1),a=s(0),i=s.n(a),l=s(8),c=s.n(l),r=s(5),o=s(3),h=s(4),u=s(6),f=s(19),d=s(15),b=s(18),v=(s(25),function(){return Object(n.jsx)(b.a,{trigger:Object(n.jsx)("button",{className:"button",children:" Tutorial "}),open:"true",modal:!0,nested:!0,children:function(t){return Object(n.jsx)("div",{className:"tut",children:Object(n.jsxs)("center",{children:[Object(n.jsx)("div",{className:"header",children:Object(n.jsx)("h1",{children:"Tutorial"})}),Object(n.jsxs)("div",{className:"content",children:[" ",Object(n.jsx)("b",{children:"Click"})," and ",Object(n.jsx)("b",{children:"drag"})," to move around the grid. ",Object(n.jsx)("br",{}),Object(n.jsx)("b",{children:"Scroll"})," to zoom.",Object(n.jsx)("br",{}),Object(n.jsx)("b",{children:"Click"})," to add a pattern.",Object(n.jsx)("br",{}),"Use the dropdowns to select what pattern to add.",Object(n.jsx)("br",{}),"Press 'Start' to begin the simulation.",Object(n.jsx)("h1",{children:"Explanation"}),"At each step in time, the following transitions occur: ",Object(n.jsx)("br",{}),"Any live cell with fewer than two live neighbours dies, as if by underpopulation. ",Object(n.jsx)("br",{}),"Any live cell with two or three live neighbours lives on to the next generation. ",Object(n.jsx)("br",{}),"Any live cell with more than three live neighbours dies, as if by overpopulation. ",Object(n.jsx)("br",{}),"Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.",Object(n.jsx)("br",{}),Object(n.jsx)("br",{})]}),Object(n.jsx)("div",{className:"actions",children:Object(n.jsx)("button",{className:"button",onClick:function(){t()},children:"Got it."})})]})})}})}),j=(s(26),s(27),function(){function t(){Object(o.a)(this,t),this.state={grid:new Map}}return Object(h.a)(t,[{key:"set",value:function(t,e,s){this.state.grid.has(e)||this.state.grid.set(e,new Map),this.state.grid.get(e).set(t,s)}},{key:"has",value:function(t,e){var s=!1;return this.state.grid.has(e)&&(s=this.state.grid.get(e).has(t)),s}},{key:"get",value:function(t,e){return this.state.grid.get(e).get(t)}},{key:"listCells",value:function(){var t=[];return this.state.grid.forEach((function(e,s,n){e.forEach((function(e,n,a){t.push([n,s])}))})),t}}]),t}()),g=function(){function t(){Object(o.a)(this,t)}return Object(h.a)(t,[{key:"iterate",value:function(t){var e=this.getCounts(t);return this.generateNewGrid(e,t)}},{key:"getCounts",value:function(t){for(var e=new j,s=t.listCells(),n=0;n<s.length;n++){var a,i,l=Object(r.a)(s[n],2);a=l[0],i=l[1];for(var c=t.get(a,i),o=-1;o<2;o++)for(var h=-1;h<2;h++)if(!(0===o&0===h)){var u=a+h,f=i+o;e.has(u,f)||e.set(u,f,{}),c in e.get(u,f)||(e.get(u,f)[c]=0),e.get(u,f)[c]++}}return e}},{key:"generateNewGrid",value:function(t,e){for(var s,n=new j,a=t.listCells(),i=0;i<a.length;i++){var l,c,o=Object(r.a)(a[i],2);l=o[0],c=o[1];var h=t.get(l,c),u=(s=h,Object.values(s).reduce((function(t,e){return t+e})));e.has(l,c)?2===u|3===u&&n.set(l,c,e.get(l,c)):3===u&&n.set(l,c,parseInt(function(t){return Object.keys(t).reduce((function(e,s){return t[e]>t[s]?e:s}))}(h)))}return n}}]),t}(),O={1:"#0000FF",2:"#FF0000",3:"#00FF00"},p=[{label:"blue",value:1},{label:"red",value:2},{label:"green",value:3}],x=[{label:"cell",value:[[0,0]]},{label:"square",value:[[0,0],[1,0],[0,1],[1,1]]},{label:"glider",value:[[0,0],[0,1],[0,2],[1,0],[2,1]]}],w=function(t){Object(u.a)(s,t);var e=Object(f.a)(s);function s(){var t;return Object(o.a)(this,s),(t=e.call(this)).selectPattern=function(e){t.setState({patternToPlace:e.value})},t.selectColour=function(e){t.setState({colourToPlace:e.value})},t.updateRunning=function(){t.setState({isRunning:!t.state.isRunning})},t.state={width:null,height:null,ctx:null,isRunning:!1,isDragging:!1,mousePosition:[0,0],scale:10,centreOffset:[0,0],cells:C(),patternToPlace:[[0,0]],colourToPlace:1},t}return Object(h.a)(s,[{key:"componentDidMount",value:function(){var t=this,e=this.refs.canvas,s=e.getContext("2d");s.canvas.width=window.innerWidth,s.canvas.height=.8*window.innerHeight;var n=new g;this.setState({width:e.width}),this.setState({height:e.height}),setInterval((function(){t.draw(),t.state.isRunning&&t.setState({cells:n.iterate(t.state.cells)})}),250)}},{key:"handleClick",value:function(t){var e=this.refs.canvas.getContext("2d"),s=t.clientX-e.canvas.offsetLeft,n=t.clientY-e.canvas.offsetTop,a=this.clientToCell([s,n]),i=Object(r.a)(a,2);s=i[0],n=i[1];for(var l=this.state.patternToPlace,c=0;c<l.length;c++)this.state.cells.set(l[c][0]+s,l[c][1]+n,this.state.colourToPlace);this.draw()}},{key:"handleWheel",value:function(t){var e=t.deltaY,s=this.state.scale,n=Object(r.a)(this.state.centreOffset,2),a=n[0],i=n[1];e>0?(s/=.9,a/=.9,i/=.9):s>1&&(s*=.9,a*=.9,i*=.9),this.setState({scale:s,centreOffset:[a,i]}),this.setState({mousePosition:[t.clientX,t.clientY]}),this.draw()}},{key:"handleMouseDown",value:function(t){this.setState({isDragging:!0,mousePosition:[t.clientX,t.clientY]})}},{key:"handleMouseUp",value:function(t){this.setState({isDragging:!1})}},{key:"handleMouseMove",value:function(t){if(this.state.isDragging){var e=Object(r.a)(this.state.centreOffset,2),s=e[0],n=e[1];s+=t.clientX-this.state.mousePosition[0],n+=t.clientY-this.state.mousePosition[1],this.setState({centreOffset:[s,n]})}this.setState({mousePosition:[t.clientX,t.clientY]}),this.draw()}},{key:"clientToCell",value:function(t){var e=Object(r.a)(t,2),s=e[0],n=e[1];return[Math.floor((s-this.state.width/2-this.state.centreOffset[0])/this.state.scale),Math.floor((n-this.state.height/2-this.state.centreOffset[1])/this.state.scale)]}},{key:"cellToClient",value:function(t){var e=Object(r.a)(t,2),s=e[0],n=e[1];return[Math.floor(s*this.state.scale+this.state.centreOffset[0]+this.state.width/2),Math.floor(n*this.state.scale+this.state.centreOffset[1]+this.state.height/2)]}},{key:"draw",value:function(){var t=this.refs.canvas.getContext("2d");t.fillStyle="#E0E0E0",t.fillRect(0,0,this.state.width,this.state.height);for(var e=this.state.cells.listCells(),s=0;s<e.length;s++){var n,a,i,l,c=Object(r.a)(e[s],2);n=c[0],a=c[1];var o=this.state.cells.get(n,a),h=this.cellToClient([n,a]),u=Object(r.a)(h,2);i=u[0],l=u[1],t.fillStyle=O[o],t.fillRect(i,l,.9*this.state.scale,.9*this.state.scale)}var f,d,b,v,j,g,p=this.state.patternToPlace,x=Object(r.a)(this.state.mousePosition,2);b=x[0],v=x[1],f=b-t.canvas.offsetLeft,d=v-t.canvas.offsetTop;var w=this.clientToCell([f,d]),C=Object(r.a)(w,2);for(j=C[0],g=C[1],s=0;s<p.length;s++){f=p[s][0]+j,d=p[s][1]+g;var y=this.cellToClient([f,d]),m=Object(r.a)(y,2);b=m[0],v=m[1],t.globalAlpha=.5,t.fillStyle=O[this.state.colourToPlace],t.fillRect(b,v,.9*this.state.scale,.9*this.state.scale),t.globalAlpha=1}}},{key:"render",value:function(){var t=this;return Object(n.jsxs)("div",{className:"App",children:[Object(n.jsxs)("div",{className:"controls",children:[Object(n.jsx)(v,{}),Object(n.jsx)("button",{className:"button",onClick:this.updateRunning,children:this.state.isRunning?Object(n.jsx)("div",{children:"Stop"}):Object(n.jsx)("div",{children:"Start"})}),Object(n.jsx)(d.a,{className:"select",onChange:this.selectPattern,options:x,placeholder:"Select Pattern To Add"}),Object(n.jsx)(d.a,{className:"select",onChange:this.selectColour,options:p,placeholder:"Select Colour"})]}),Object(n.jsx)("canvas",{ref:"canvas",onClick:function(e){return t.handleClick(e)},onWheel:function(e){return t.handleWheel(e)},onMouseDown:function(e){return t.handleMouseDown(e)},onMouseUp:function(e){return t.handleMouseUp(e)},onMouseMove:function(e){return t.handleMouseMove(e)}})]})}}]),s}(i.a.Component);function C(){var t=new j;return t.set(3,0,1),t.set(3,1,1),t.set(3,2,1),t.set(4,1,1),t.set(2,2,1),t.set(18,0,2),t.set(18,1,2),t.set(18,2,2),t.set(19,1,2),t.set(17,2,2),t.set(3,20,3),t.set(3,21,3),t.set(3,22,3),t.set(4,21,3),t.set(2,22,3),t}var y=function(t){t&&t instanceof Function&&s.e(3).then(s.bind(null,48)).then((function(e){var s=e.getCLS,n=e.getFID,a=e.getFCP,i=e.getLCP,l=e.getTTFB;s(t),n(t),a(t),i(t),l(t)}))};c.a.render(Object(n.jsx)(i.a.StrictMode,{children:Object(n.jsx)(w,{})}),document.getElementById("root")),y()}},[[47,1,2]]]);
//# sourceMappingURL=main.8f476bbe.chunk.js.map