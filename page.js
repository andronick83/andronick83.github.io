/*!
 * Page: DOMReady, Cookie, Invert, OnLoad Triggers
 * @Link: https://github.com/andronick83/andronick83.github.io
 * @License: Released under the MIT license
 * @Author: andronick83 <andronick.mail@gmail.com>
 */

"use strict";

(_=>{try{new Function('(a=0)=>a')}
	catch(_){console.error("This browser doesn`t support JavaScript ES6/2015\nhttps://www.w3schools.com/js/js_versions.asp")}})();

((W,n)=>{const P=W[n]||{},D=document,DH=D.head,
	N=HTMLElement,pN=N.prototype,nArr=l=>(l instanceof Array||l instanceof NodeList?l:[l]),
	nApp=(pN.append?(e,l)=>e.append(...nArr(l)):(e,l)=>aFor(nArr(l),n=>e.appendChild(nFrom(n)))),
	nNode=(p,c=0,a=0,l=0)=>{let n=(typeof(p,'string')?D.createElement(p):p.cloneNode(!0));
		if(c)n.classList.add(...(typeof(c,'string')?[c]:c));for(let k in a)n.setAttribute(k,a[k]);if(l)nApp(n,l);return n};
	//
	P.load={css:(u,c=null)=>{let n=nNode('link',0,{rel:'stylesheet',href:u});n.onload=c;nApp(DH,n)},
		js:(u,c=null)=>{let n=nNode('script',0,{src:u});n.onload=c;nApp(DH,n)}};
	//
	P.domReady=c=>D.readyState==='loading'?D.addEventListener('DOMContentLoaded',_=>c(D)):c(D);
	P.cookie={get:(name,def=null)=>{
			var m=D.cookie.match(new RegExp("(?:^|; )"+name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,'\\$1')+"=([^;]*)"));
			return m?decodeURIComponent(m[1]):def},
		set:(name,val=null)=>{D.cookie=name+"="+val+';SameSite=Lax'}};
	P.invert=(_=>{const I=function(){const c='page-invert';
		if(I.state===undefined)
			I.state=!parseInt(P.cookie.get(c,window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches?0:1));
		I.state=!I.state;P.cookie.set(c,+I.state);var r=D.documentElement;
		I.state?r.classList.add(c):r.classList.remove(c);return I.state};return I})();
	P.domReady(P.invert);
	//
	P.objLoad=(_=>{const L=function(name,cb=!1,obj=W){if(!L.map)L.map=new Map();
		if(L.map.has(name)){const l=L.map.get(name);if(cb)l.run(cb);return l}
		const l={evs:new Set(),run:e=>{l.evs.add(e);return l},obj:obj[name]};L.map.set(name,l);
		const done=v=>{l.obj=v;l.run=c=>{c(v);return l};l.evs.forEach(c=>c(v));delete l.evs};
		if(!(name in obj)){if(delete obj[name]){Object.defineProperty(obj,name,{enumerable:!0,configurable:!0,
			set:v=>{if(delete obj[name]);obj[name]=v;console.debug(`${name}:Load`,v);
			setTimeout(done,0,v)}})}}
		else if(l.evs)done(obj[name]);if(cb)l.run(cb);return l};return L})();
	P.wait=function(){const w={},l=Array.prototype.slice.call(arguments);w.run=c=>{
			let s=l.length;const r=l.slice(),d=(i,n,o)=>{r[i]=o;s--;if(!s)c.apply(P,r)};
			l.forEach((n,i)=>{const e=o=>d(i,n,o);r[n]=null;if(n=='document')P.domReady(e);else P.objLoad(n,e)});
			return w};return w};
	//
	Object.defineProperties(P,{name:{enumerable:!1,configurable:!1,value:n.slice(0,1).toUpperCase()+n.slice(1)}});
	W[n]=P;const l=P.onload;P.onload={add:c=>c(P)};if(l&&l.forEach)l.forEach(c=>c(P));
})(typeof window=='undefined'?this:window,'page');

//

/** / // EXAMPLES:

//=== page.load.[css/js]:
page.load.css('page.css');
page.load.js('page.js',_=>{console.log('js-loaded')});

//=== page.domReady (Document OnLoad Trigger):
page.domReady(D=>{
	console.log(D.title)
});

//=== page.objLoad (Object OnLoad Trigger):
// jQuery OnLoad Trigger:
page.objLoad('jQuery',$=>{
	console.log('jQuery Loaded', $('body'));
});
// More Triggers:
page.objLoad('jQuery').run($=>{
	console.log($('html'));
}).run($=>{
	console.log($('body'));
});
// TestObj OnLoad Trigger:
page.objLoad('TestObj').run(T=>{ T('TestString'); })
// Define TestObject:
setTimeout(function(){
	window.TestObj=function(str){console.log('TestObj Loaded:', str)};
},3000);

//=== page.wait (Objects OnLoad Trigger):
page.wait('jQuery','JVC','document').run(($,JVC,D)=>{
	console.log($('body'),JVC,D.title);
});

//=== page.onload (Page Defer OnLoad Trigger) Full Example:
<script src="/page.js" defer></script>
...
<script>
window.page=window.page||{onload:new Set()};
page.onload.add(page=>{
	page.wait('jQuery','JVC','document').run(($,JVC,D)=>{
		console.log($('body'),JVC,D.title);
	});
});
</script>

/**/
