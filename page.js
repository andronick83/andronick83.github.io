var page={};
page.getCookie=(name,def=null)=>{var matches=document.cookie.match(new RegExp("(?:^|; )"+
	name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,'\\$1')+"=([^;]*)"));return matches?decodeURIComponent(matches[1]):def};
page.setCookie=(name,val=null)=>{document.cookie=name+"="+val+';SameSite=Lax'}
page.dark=()=>{if(page._dark===null)page._dark=!parseInt(page.getCookie('dark',window.matchMedia&&
	window.matchMedia('(prefers-color-scheme:dark)').matches?0:1));page._dark=!page._dark;page.setCookie('dark',+page._dark);
	var r=document.querySelector(':root');page._dark?r.classList.add('dark'):r.classList.remove('dark');return false};
page._dark=null;page.dark();

JVC_setFontFamilyLoad=(n)=>{JVC.setProperty('font-family-load',n)}
JVC_setFontn=(n,l=false)=>{
	$('head>.jvc-fonts').removeClass('jvc-fonts').addClass('jvc-fonts-old');
	var setFontFamily=(n)=>{JVC_setFontFamilyLoad(n);JVC.setFontFamily(n);$('.jvc-fonts-old').remove()}
	if(n=='monospace')return setFontFamily('monospace');
	if(n=='jvc-default')return setFontFamily(JVC.defFontFamily);
	if(!l)l='https://fonts.googleapis.com/css?family='+encodeURIComponent(n);
	$('<link rel=stylesheet class=jvc-fonts>').on('error',console.error).attr('href',l).appendTo('head');
	n='"'+n+'",monospace';JVC_setFontFamilyLoad(n);
	var setFontFamily=()=>{JVC.setFontFamily(n);$('.jvc-fonts-old').remove()};
	document.fonts.ready.then(()=>{setFontFamily(n)})};

$(function($){
	var setStyle=(n)=>{JVC.setStyle(n)};
	var setFontn=(n)=>{JVC_setFontn(n)};
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
			for(i in files){n=files[i].match(/^styles\/(.+)\.min\.css$/);if(n)opts.push($("<option/>",{text:n[1]}))}
			selStyle.append(opts).val(jvcStyle);
			selStyle.on('change',function(){var n=$(this).val();page.setCookie('jvc-style',n);setStyle(n)})})
		$.ajax('https://cdn.jsdelivr.net/gh/herrstrietzel/fonthelpers@main/json/gfontsAPI.json').done(function(d){
			var fonts=d.items,opts=[],n;
			for(i in fonts){n=fonts[i];if(n.category=='monospace')opts.push($("<option/>",{text:n.family}))}
			selFontn.append(opts).val(jvcFontn);
			selFontn.on('change',function(){var n=$(this).val();page.setCookie('jvc-fontn',n);setFontn(n)})})
	},0)
});
