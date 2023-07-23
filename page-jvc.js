/*!
 * Page: Menu; JVC: Fonts, Styles
 * @Link: https://github.com/andronick83/andronick83.github.io
 * @License: Released under the MIT license
 * @Author: andronick83 <andronick.mail@gmail.com>
 */

"use strict";

(W=>{	const	D=document,
		nPrepend=(e,c)=>(e.prepend?e.prepend(c):e.insertBefore(c,e.firstChild)),
		nAppend=(e,l)=>{if(!(l instanceof Array))l=[l];if(e.append)e.append.apply(e,l);
			else for(let i=0,len=l.nength;i<len;i++)e.appendChild(nText(l[i]));return e},
		nClsAdd=(e,c)=>e.classList.add.apply(e.classList,(typeof(c)=='string'?[c]:c)),
		nText=t=>(typeof(t)=='string'?D.createTextNode(t):t),nAttr=(n,a)=>{for(let k in a)n.setAttribute(k,a[k])},
		nNode=(p,c=0,a=0,i=0)=>{const n=(typeof(p)=='string'?D.createElement(p):p.cloneNode(!0));
			if(c)nClsAdd(n,c);if(a)nAttr(n,a);if(i)nAppend(n,i);return n};

	const	objStr=(t,o)=>W[t].prototype.toString.call(o),
		objType=o=>{const t=objStr('Object',o);if(t.startsWith('[object ')&&t.endsWith(']'))return t.slice(8,-1)};

	// JVC Font Setter
	const	jvcSetFont=(n,cb=!1)=>{
			const done=n=>{set.add(n);JVC.setFontFamily(n);cb&&cb(n)};
			if(!jvcSetFont.set)jvcSetFont.set=new Set(['Source Code Pro','monospace']);const set=jvcSetFont.set;
			if(n=='monospace')return done(n);if(n=='jvc-default')return done('"Source Code Pro",monospace');
			if(set.has(n))return done(n);
			WebFont.load({classes:false,timeout:5000,google:{families:[n]},fontactive:_=>done(n),
				fontinactive:(...args)=>{console.error('fontinactive:',n,[...args]);done(n)}})};

	// Page OnLoad Trigger:
	window.page=window.page||{onload:new Set()};
	page.onload.add(page=>{
		let	isGit=(document.location.host=='andronick83.github.io'),
			jvcStyle=page.cookie.get('jvc-style','jvc-default'),jvcFontn=page.cookie.get('jvc-fontn','jvc-default'),
			selStyle=nNode('select',0,{name:'style'},[nNode('option',0,0,'no-style'),nNode('option',0,0,'jvc-default')]),
			selFontn=nNode('select',0,{name:'fontn'},[nNode('option',0,0,'monospace'),nNode('option',0,0,'jvc-default')]),
			decFont=nNode('span','ico',0,'-'),incFont=nNode('span','ico',0,'+'),icoInvert=nNode('span',['ico','ico-sun']),
			menu=nNode('span','fright',0,[nNode('span',0,0,['Style:',selStyle]),nNode('span',0,0,['Font:',selFontn]),decFont,incFont,icoInvert]),
			title=nNode('a','title',{href:isGit?'https://github.com/andronick83/jquery.json-viewer-callback/':'https://'+document.location.host},D.title==isGit?D.title:'SUPERVISOR-WEB'),
			navi=nNode('div',['navi','page-no-invert'],0,[title,menu]),
			jvcDecFont=_=>JVC.setFontSize(Math.max(parseFloat(JVC.property('font-size'))-2,2)),
			jvcIncFont=_=>JVC.setFontSize(parseFloat(JVC.property('font-size'))+2);
		decFont.addEventListener('click',jvcDecFont);incFont.addEventListener('click',jvcIncFont);
		icoInvert.addEventListener('click',page.invert);

		// Wait JVC Trigger:
		page.wait('JVC').run(/**/JVC=>{
			// Replace Logger:
			(l=>{JVC.defConf.logger=l})(page.logging.getLogger('JVC'));
			// Set Style/Font:
			JVC.setStyle(jvcStyle);jvcSetFont(jvcFontn);
			// Wait jQuery/DOM Trigger:
			page.wait('jQuery','document').run(($,D)=>{nPrepend(D.body,navi);
				// JVC Styles/Fonts Selectors:
				$.ajax('https://api.cdnjs.com/libraries/highlight.js?fields=assets').done(function(d){
					const	files=d.assets[0].files,opts=[],
						ch=e=>{let n=e.currentTarget.value;page.cookie.set('jvc-style',n);JVC.setStyle(n)};
					for(var i in files){var n=files[i].match(/^styles\/(.+)\.min\.css$/);
						if(n)opts.push(nNode('option',0,0,n[1]))}
					nAppend(selStyle,opts).value=jvcStyle;selStyle.addEventListener('change',ch)});
				$.ajax('https://cdn.jsdelivr.net/gh/herrstrietzel/fonthelpers@main/json/gfontsAPI.json').done(function(d){
					const	fonts=d.items,opts=[],
						ch=e=>{let n=e.currentTarget.value;page.cookie.set('jvc-fontn',n);jvcSetFont(n)};
					for(var i in fonts){var n=fonts[i];if(n.category=='monospace')opts.push(nNode('option',0,0,n.family))}
					nAppend(selFontn,opts).value=jvcFontn;selFontn.addEventListener('change',ch)})})})});
})(typeof window=='undefined'?this:window);
