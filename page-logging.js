/*!
 * Page: Pythonic Logging
 * @Link: https://github.com/andronick83/andronick83.github.io
 * @License: Released under the MIT license
 * @Author: andronick83 <andronick.mail@gmail.com>
 */

"use strict";

((W,n)=>{const P=W[n]||{};
	P.logging=P.logging||(_=>{const L={EXCEPTION:6,CRITICAL:5,ERROR:4,WARNING:3,INFO:2,DEBUG:1,NOTSET:0,_config:{level:1},console:{},map:new Map()},
			methods='log,debug,info,warning,error,critical,exception'.split(','),conMethods='debug,log,error'.split(',');
		L.console.EXCEPTION=L.console.CRITICAL=L.console.ERROR=console.error;
		L.console.LOG=L.console.WARNING=L.console.INFO=console.log;L.console.DEBUG=L.console.NOTSET=console.debug;
		L._config.style={ALL:'font-style:italic;',NAME:'color:gray;font-style:italic;',COLON:'color:silver',
			EXCEPTION:'color:hotpink;',CRITICAL:'color:red;',ERROR:'color:coral;',
			WARNING:'color:orange;padding-left:10px;',INFO:'color:yellowgreen;padding-left:10px;',
			DEBUG:'color:limegreen;padding-left:10px;',NOTSET:'color:deepskyBlue;padding-left:10px;'};
		L.getLogger=(N=n)=>{if(L.map.has(N))return L.map.get(N);
			const l=(new function Logger(){const t=this;t.config=Object.assign({},L._config);t.name=N;
				t.isEnabledFor=l=>(l>=t.config.level);t.getEffectiveLevel=_=>t.config.level;
				t.log=(l,...msg)=>{if(typeof l!=='number'||l<0||l>6){msg.unshift(l);l=L.INFO}
					if(!t.isEnabledFor(l))return !1;const s=t.config.style;
					     if(l>=L.EXCEPTION)l='EXCEPTION';else if(l>=L.CRITICAL)l='CRITICAL';else if(l>=L.ERROR)l='ERROR';
					else if(l>=L.WARNING)l='WARNING';else if(l>=L.INFO)l='INFO';else if(l>=L.DEBUG)l='DEBUG';else l='NOTSET';
					if(l==='EXCEPTION')msg.push("\n"+(new Error().stack.split("\n").slice(3).join("\n")));
					L.console[l]("%c"+l.padStart(9)+" %c"+t.name+'%c:',s.ALL+s[l],s.ALL+s.NAME,s.COLON,...msg)}
				methods.slice(1).forEach(m=>t[m]=(...msg)=>t.log(L[m.toUpperCase()],...msg));
				t.setLevel=l=>t.config.level=l;t.getChild=N=>L.getLogger(t.name+'.'+N)});L.map.set(N,l);return l};
		L.basicConfig=c=>Object.assign(this._config,c);L.logger=L.getLogger();methods.forEach(m=>{L[m]=L.logger[m]});
		L.replaceConsole=(N=n)=>{const l=L.getLogger(N);methods.slice(1).forEach(m=>{console[m]=l[m]});console.log=l.info};
		L.restoreConsole=_=>{L.methods.forEach(m=>delete console[m]);conMethods.forEach(m=>console[m]=L.console[m.toUpperCase()])};
		L.replaceConsole('page');return L})();
	//
	Object.defineProperties(P,{name:{enumerable:!1,configurable:!1,value:n.slice(0,1).toUpperCase()+n.slice(1)}});W[n]=P
})(typeof window=='undefined'?this:window,'page');

//

/** / // EXAMPLES:

//=== page.logging (Pythonic Logging):

const logging=page.logging;
const logger=logging.getLogger('MyLogger.Test');
logger.setLevel(logging.WARNING);

logger.log(logging.WARNING,'Warning Message');

logger.debug('DEBUG'); // no print
logger.info('INFO'); // no print
logger.warning('WARNING');
logger.error('ERROR');
logger.critical('CRITICAL');
logger.exception('EXCEPTION');

// Stack trace:
(function root(){
	(function module(){
		(function method(){
			logging.getLogger('Root.Module').exception('ErrorMessage',[0,1,2]);
		})();
	})();
})();

// Replace console methods:
logging.replaceConsole('name');
console.log("Test Console");

// Restore console methods:
logging.restoreConsole();
console.log("Test Console");

/**/