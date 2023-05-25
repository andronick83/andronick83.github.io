/*!
 * JavaScript Font Loader (JFL) v1.0.0
 * @Link: https://github.com/andronick83/andronick83.github.io
 * @License: Released under the MIT license
 * @Author: andronick83 <andronick.mail@gmail.com>
 */

"use strict";

var JFL=JFL||{};
JFL.Loader=function(conf={}){
	this.name=null;
	this.node=null;
	this.conf=Object.assign({},JFL.defConf,conf);
	this.debug=this.conf.debug;
	this.error=this.conf.error;
	//
	this.load=(n,u,callBack=()=>{})=>{
		this.debug('JFL','load',[n,u]);
		this.set('"'+n+'"');
		var c=this.check(n,this.__size());
		if(c)return callBack(n,'exist',c);
		//
		var link=false;
		document.querySelectorAll('head>link.font-loader-css').forEach((l,i)=>{if(link)return;
			if(l.getAttribute('href')!==u)return;
			this.debug('JFL','link-exist',[n,u,l]);
			link=l;return callBack(n,'link-exist',c)});
		if(link)return this.__wait(n,callBack);
		var l=document.createElement('link');l.setAttribute('rel','stylesheet');l.className='font-loader-css';
		l.onload=()=>{
			this.debug('JFL','link-load-done',[n,u]);
			this.__wait(n,callBack)};
		l.onerror=(err)=>{
			this.error('JFL','link-load-error',[n,u,err]);
			callBack(n,'error',this.check(n,this.__size()))};
		l.setAttribute('href',u);document.querySelector('head').append(l)};
	this.check=(name=null,size=null,text=null)=>{
		if(name===null)name=this.name;
		if(size===null)size=this.__size();
		if(text===null)text=this.node.innerText;
		this.debug('JFL','font-check',[name,size,text]);
		return document.fonts.check(size+'px '+name)};/*DEV*/
	this.set=(n)=>{this.node.style.setProperty('--font-loader',n);this.name=n};
	this.setText=(t)=>{this.node.innerText=this.__uString(t)};
	//
	this.__wait=(n,callBack)=>{
		var l=[],a=document.fonts,now=Date.now();
		var wait=(n)=>{
			a.forEach((f)=>{if(f.family===n||f.family==='"'+n+'"')l.push(f)});
			if(l.length){
				return this.__done(l,n,callBack)}
			var elapse=Date.now()-now;
			if(elapse>this.conf.timeout){
				this.error('JFL','css-load-timeout',[n,elapse]);
				return this.__done(l,n,callBack)}
			this.error('JFL','css-load-fail',[n,elapse]);
			setTimeout(wait,20,n)};
		wait(n)};
	this.__size=()=>{return parseFloat(window.getComputedStyle(this.node,null).getPropertyValue('font-size'))};
	this.__done=(l,n,callBack)=>{var tot=0,_done=false;
		this.debug('JFL','font-list',[n,l]);
		var done=(i,f)=>{if(_done)return;tot++;
			var c=this.check(n,this.__size());
			if(c){	this.debug('JFL','font-check-done',[n,c]);
				_done=true;return callBack(n,f.status,c)}
			if(tot===l.length){
				this.error('JFL','font-check-fail',[n,c]);
				_done=true;return setTimeout(()=>{callBack(n,f.status,c)},10)}};
		for(var i=0;i<l.length;i++){var f=l[i];
			if(f.status==='loaded'){
				this.debug('JFL','font-loaded',[n]);
				done(i,f)}
			f.load().then(
				()=>{	if(_done)return;
					this.debug('JFL','font-load-done',[n]);done(i,f)},
				(err)=>{if(_done)return;
					this.error('JFL','font-load-fail',[n,err]);done(i,f)})}};
	this.__uString=(s)=>{let u='';for(let i=0;i<s.length;i++){if(u.includes(s[i])===false){u+=s[i]}}return u};
	var body=document.querySelector('body');
	this.node=document.createElement('span');this.node.classList.add('font-loader');
	this.node.style.cssText=this.conf.style;this.setText(body.innerText||'AZaz');body.append(this.node);
};

JFL.defConf={
	timeout:3000,
	debug=console.debug,
	error=console.error,
	style='position:fixed;z-index:-1;user-select:none;font-family:var(--font-loader);',
};

/*
// Example:
var fontLoader = new JFL.Loader({timeout: 1000, debug: ()=>{}});
fontLoader.load("Source Code Pro",(name, status, check)=>{
	console.log('fontLoader', name, status, check)
});
*/
