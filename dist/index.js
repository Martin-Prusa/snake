(()=>{"use strict";class e{x;y;constructor(e,o){this.x=e,this.y=o}}class o{coords;color;onAction;constructor(e,o,t){this.coords=e,this.color=o,this.onAction=t}}const t=25,c=600,n=document.querySelector("#startBtn"),r=document.querySelector("#stopBtn"),s=document.querySelector("#canvas"),a=document.querySelector("#score"),i=s.getContext("2d");let d,l,y=new e(300,300),u=new e(0,1),w=1,x=[],f=[];function h(){i.fillStyle="white",i.clearRect(0,0,c,c),y.x+=t*u.x,y.y+=t*u.y,function(){const e=f.find((e=>e.coords.x===y.x&&e.coords.y===y.y));return void 0!==e&&(f=f.filter((o=>o!==e)),e.onAction(),w++,a.innerHTML=w+"",!0)}()||x.splice(0,1),(y.x<0||y.x>=c||y.y<0||y.y>=c||k(y))&&(v(),alert("Game over.")),x.push(new e(y.x,y.y)),x.forEach((e=>A(e,"green"))),f.forEach((e=>A(e.coords,e.color)))}function v(){n.disabled=!1,clearInterval(l)}function k(e){return x.some((o=>o.x===e.x&&o.y===e.y))}function m(){const c=new e(Math.floor(24*Math.random())*t,Math.floor(24*Math.random())*t);k(c)?m():f.push(new o(c,"red",(()=>{m(),d/=d<100?1.08:1.25,clearInterval(l),l=setInterval(h,d)})))}function A(e,o,c="white"){i.fillStyle=o,i.strokeStyle=c,i.fillRect(e.x,e.y,t,t),i.strokeRect(e.x,e.y,t,t)}n.addEventListener("click",(function(){n.disabled=!0,d=300,l=setInterval(h,d),y=new e(300,300),x=[],f=[],m(),w=1,a.innerHTML=w+""})),r.addEventListener("click",v),window.addEventListener("keydown",(o=>{switch(!0){case"w"===o.code&&0===u.y:case"ArrowUp"===o.code&&0===u.y:u=new e(0,-1);break;case"s"===o.code&&0===u.y:case"ArrowDown"===o.code&&0===u.y:u=new e(0,1);break;case"a"===o.code&&0===u.x:case"ArrowLeft"===o.code&&0===u.x:u=new e(-1,0);break;case"d"===o.code&&0===u.x:case"ArrowRight"===o.code&&0===u.x:u=new e(1,0)}}))})();