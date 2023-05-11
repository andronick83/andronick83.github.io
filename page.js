var page=function(){};
page.getCookie=(name,def=undefined)=>{var matches=document.cookie.match(new RegExp("(?:^|; )"+name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,'\\$1')+"=([^;]*)"));return matches?decodeURIComponent(matches[1]):def};
page.invert=()=>{page.dark=!page.dark;document.cookie="dark="+(+page.dark)+';SameSite=Lax';page.dark?$('html').addClass('dark'):$('html').removeClass('dark')};
page.dark=!parseInt(page.getCookie('dark'/*,window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches?1:0*/));
page.invert();
$(function($){
	//$('html').addClass('ease');
	var navi=$('<div class=navi>').append($('<a class=hljs-string>').attr('href','https://github.com/andronick83/jquery.json-viewer-callback/#jqueryjson-viewer-callback').append('<b>JVC JSON-Viewer</b>'));
	var menu=$('<span>');
	menu.append('<span class="ico ico-sun" onclick=page.invert(true)></span>');
	navi.append(menu).prependTo('body');
	setTimeout(()=>{
		$.ajax('https://api.cdnjs.com/libraries/highlight.js?fields=assets').done(function(d){
			var files=d.assets[0].files;
			var styles=[$("<option/>",{text:'jvc-default',selected:'selected'})],s;
			for(i in files){s=files[i].match(/^styles\/(.+)\.min\.css$/);if(s)styles.push($("<option/>",{text:s[1]}))}
			var select=$('<select>').append(styles);
			$('<span>').addClass('hljs-attr').append('Style:',select)
				.prependTo(menu).on('change',function(a,b,c){var s=select.val();JVC.setStyle(select.val())})
		});
		$.ajax('https://cdn.jsdelivr.net/gh/herrstrietzel/fonthelpers@main/json/gfontsAPI.json').done(function(d){
			var fonts=d.items;
			var opts=[$("<option/>",{text:'jvc-default',selected:'selected'})],s;
			for(i in fonts){f=fonts[i];if(f.category=='monospace')opts.push($("<option/>",{text:f.family}))}
			var select=$('<select>').append(opts);
			$('<span>').addClass('hljs-attr').append('Font:',select).prependTo(menu).on('change',function(){
				var f=select.val();WebFont.load({google:{families:[f]},active:function(){$('head>.jvc-font').remove();
					$('<style class=jvc-font>')
					.append('.jvc,.jvc-font{font-family:"'+f+'",monospace!important}').appendTo('head');
				}});
			})
		})
	},0);
});
