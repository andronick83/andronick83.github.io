var page={};
page.getCookie=(name,def=null)=>{var matches=document.cookie.match(new RegExp("(?:^|; )"+
	name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,'\\$1')+"=([^;]*)"));return matches?decodeURIComponent(matches[1]):def};
page.setCookie=(name,val=null)=>{document.cookie=name+"="+val+';SameSite=Lax'}
page.dark=()=>{if(page._dark===null)page._dark=!parseInt(page.getCookie('dark',window.matchMedia&&
	window.matchMedia('(prefers-color-scheme:dark)').matches?0:1));page._dark=!page._dark;page.setCookie('dark',+page._dark);
	var r=document.querySelector(':root');page._dark?r.classList.add('dark'):r.classList.remove('dark');return false};
page._dark=null;page.dark();

function findUnique(str){let u="";for(let i=0;i<str.length;i++){if(u.includes(str[i])===false){u+=str[i]}}return u}


fontLoaderNode=()=>{var n=document.querySelector('.font-loader');if(n)return;
	n=document.createElement('span');n.classList.add('jvc','font-loader');document.querySelector('body').append(n)};
fontLoaderSetFont=(n)=>{document.querySelector(":root").style.setProperty('--font-loader','"'+n+'"')};
fontLoaderSetText=()=>{var n=document.querySelector('.font-loader'),b=document.querySelector('body'),t=findUnique(b.innerText);n.innerText=t};
fontLoaderWait=(n)=>{var find=0,wait=0;var fontWait=(n)=>{
		document.fonts.forEach((a,b,c)=>{
			if(a.family!=n&&a.family!='"'+n+'"')return;
			console.log('fontWait',n,[a.family,b.family],c.status);
			find=1;fontLoad(a,b,n)});
		console.log('fontWait',find?'find':'not-find');
		if(find)return;
		wait+=1;if(wait>200)return console.log('fontWait','timeout');setTimeout(fontWait,20,n)};
	setTimeout(fontWait,20,n)};
async function fontLoad(a,b,n){await a.load();await b.load();
	console.log('fontLoad',n,document.fonts.check("14px "+n),[a.status,b.status]);
	setTimeout(JVC.setFontFamily,100,'"'+n+'"')}
JVC_setFontn=(n)=>{
	if(n=='monospace'){fontLoaderSet(n);JVC.setFontFamily(n);return}
	if(n=='jvc-default'){n=JVC.defFontFamily;fontLoaderSet(n);JVC.setFontFamily(n);return};
	fontLoaderSetText();
	var l='https://fonts.googleapis.com/css?family='+encodeURIComponent(n);
	var d=$('<link rel=stylesheet class=font-loader-css>').on('load',()=>{fontLoaderWait(n)}).on('error',console.error);
	d.attr('href',l).appendTo('head');fontLoaderSetFont(n);};

$(function($){
	fontLoaderNode();
	var setStyle=(n)=>{JVC.setStyle(n)};
	var setFontn=(n)=>{try{JVC_setFontn(n)}catch(e){setTimeout(JVC.setFontFamily,100,'"'+n+'"');console.error('setFontn',e)}};
	var jvcStyle=page.getCookie('jvc-style','jvc-default');setStyle(jvcStyle);
	var jvcFontn=page.getCookie('jvc-fontn','jvc-default');setFontn(jvcFontn);
	var icoDark=$('<span class="ico ico-sun">').on('click',page.dark);
	var selStyle=$('<select>').append($("<option/>",{text:'no-style'}),$("<option/>",{text:'jvc-default',selected:true}));
	var selFontn=$('<select>').append($("<option/>",{text:'monospace'}),$("<option/>",{text:'jvc-default',selected:true}));
	var menu=$('<span class=fright>').append($('<span>').append('Style:',selStyle),$('<span>').append('Font:',selFontn),icoDark);
	var title=$('<a class=title>').attr('href','https://github.com/andronick83/jquery.json-viewer-callback/').append($('title').text());
	var navi=$('<div class="navi no-dark">');
	navi.append(title,menu).prependTo('body');
	//
	setTimeout(()=>{
		$.ajax('https://api.cdnjs.com/libraries/highlight.js?fields=assets').done(function(d){
			var files=d.assets[0].files,opts=[],n;
			for(i in files){n=files[i].match(/^styles\/(.+)\.min\.css$/);if(n)opts.push($("<option>",{text:n[1]}))}
			selStyle.append(opts).val(jvcStyle);
			selStyle.on('change',function(){var n=$(this).val();page.setCookie('jvc-style',n);setStyle(n)})})
		$.ajax('https://cdn.jsdelivr.net/gh/herrstrietzel/fonthelpers@main/json/gfontsAPI.json').done(function(d){
			var fonts=d.items,opts=[],n;
			for(i in fonts){n=fonts[i];if(n.category=='monospace')opts.push($("<option>",{text:n.family}))}
			selFontn.append(opts).val(jvcFontn);
			selFontn.on('change',function(){var n=$(this).val();page.setCookie('jvc-fontn',n);setFontn(n)})})
	},10)
});
