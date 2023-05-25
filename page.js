/*!
 * JavaScript Example Page
 * @Link: https://github.com/andronick83/andronick83.github.io
 * @License: Released under the MIT license
 * @Author: andronick83 <andronick.mail@gmail.com>
 */

"use strict";

var page=page||{};
page.getCookie=(name,def=null)=>{var matches=document.cookie.match(new RegExp("(?:^|; )"+
	name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,'\\$1')+"=([^;]*)"));return matches?decodeURIComponent(matches[1]):def};
page.setCookie=(name,val=null)=>{document.cookie=name+"="+val+';SameSite=Lax'};
page.dark=(d=null)=>{if(!('_dark'in page))page._dark=null;if(page._dark===null)page._dark=!parseInt(page.getCookie('dark',window.matchMedia&&
	window.matchMedia('(prefers-color-scheme:dark)').matches?0:1));page._dark=!page._dark;page.setCookie('dark',+page._dark);
	var r=document.querySelector(':root');page._dark?r.classList.add('dark'):r.classList.remove('dark');return false};
page.dark();

// FontLoader
var fontsDone=['Source Code Pro','monospace'];
var JVC_setFontn=(n,cb=null)=>{//document.fonts.check('14px "Source Code Pro"');
	var logger=logging.getLogger('JVC_setFontn');
	var doneFont=function(){if(!fontsDone.includes(n))fontsDone.push(n);JVC.setFontFamily(n);cb&&cb(n)}
	if(n=='monospace'){return doneFont()}if(n=='jvc-default'){n='"Source Code Pro",monospace';return doneFont()}
	if(fontsDone.includes(n))return doneFont();
	WebFont.load({classes:false,timeout:2000,google:{families:[n]},
		fontloading:()=>{logger.debug('fontloading:',n)},
		fontactive:()=>{logger.debug('fontactive:',n);doneFont()},
		fontinactive:(...args)=>{logger.warning('fontinactive:',n,[...args]);doneFont()}})};

// MAIN
(function($){
	var jvcStyle=page.getCookie('jvc-style','jvc-default');
	var jvcFontn=page.getCookie('jvc-fontn','jvc-default');
	var icoDark=$('<span class="ico ico-sun">').on('click',page.dark);
	var selStyle=$('<select>').append($("<option/>",{text:'no-style'}),$("<option/>",{text:'jvc-default',selected:true}));
	var selFontn=$('<select>').append($("<option/>",{text:'monospace'}),$("<option/>",{text:'jvc-default',selected:true}));
	var menu=$('<span class=fright>').append($('<span>').append('Style:',selStyle),$('<span>').append('Font:',selFontn),icoDark);
	var caption=$('title').text();if(caption=='jquery.json-viewer-callback')caption='JVC';
	var title=$('<a class=title>').attr('href','https://github.com/andronick83/jquery.json-viewer-callback/').append(caption);
	var navi=$('<div class="navi no-dark">');
	//
	var JVC_callbackAjax=function(e,n,d,c){var ajax;
		if(typeof d==='string')ajax={url:d,dataType:"json"};else ajax=d;
		$.ajax(ajax).done(c).fail(function(xhr, status, err){c({"jvc-fail": status+' ('+(err? err :xhr.status)+')'})})};
	//
	document.addEventListener('DOMContentLoaded',function(){
		JVC.setStyle(jvcStyle);
		JVC_setFontn(jvcFontn,(n)=>{
			var $page=$('.page'),i;
			navi.append(title,menu).prependTo('body');
			$.ajax('https://api.cdnjs.com/libraries/highlight.js?fields=assets').done(function(d){
				var files=d.assets[0].files,opts=[],n;
				for(i in files){n=files[i].match(/^styles\/(.+)\.min\.css$/);if(n)opts.push($("<option>",{text:n[1]}))}
				selStyle.append(opts).val(jvcStyle);
				selStyle.on('change',function(){var n=$(this).val();page.setCookie('jvc-style',n);JVC.setStyle(n)})
			});
			$.ajax('https://cdn.jsdelivr.net/gh/herrstrietzel/fonthelpers@main/json/gfontsAPI.json').done(function(d){
				var fonts=d.items,opts=[],n;
				for(i in fonts){n=fonts[i];if(n.category=='monospace')opts.push($("<option>",{text:n.family}))}
				selFontn.append(opts).val(jvcFontn);
				selFontn.on('change',function(){var n=$(this).val();page.setCookie('jvc-fontn',n);JVC_setFontn(n)})
			})
		})
	})
})(jQuery);
