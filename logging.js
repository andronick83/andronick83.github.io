/*!
 * JavaScript Pythonic Logger (JPL) v1.0.0
 * @Link: https://github.com/andronick83/jquery.json-viewer-callback
 * @License: Released under the MIT license
 * @Author: andronick83 <andronick.mail@gmail.com>
 */

const logging={};
logging.console={};
logging.console.EXCEPTION=logging.console.CRITICAL=logging.console.ERROR=console.error,
logging.console.LOG=logging.console.WARNING=logging.console.INFO=console.log;
logging.console.DEBUG=logging.console.NOTSET=console.debug;
Object.assign(logging,{EXCEPTION:60,CRITICAL:50,ERROR:40,WARNING:30,INFO:20,DEBUG:10,NOTSET:0});
logging._config={level:logging.DEBUG};
logging._config.style={ALL:'font-style:italic;',NAME:'color:gray;font-style:italic;',COLON:'color:silver',
	EXCEPTION:'color:hotpink;',CRITICAL:'color:red;',ERROR:'color:coral;',
	WARNING:'color:orange;padding-left:10px;',INFO:'color:yellowgreen;padding-left:10px;',
	DEBUG:'color:limegreen;padding-left:10px;',NOTSET:'color:deepskyBlue;padding-left:10px;'};
logging.basicConfig=(config)=>{Object.assign(this._config,config)};
logging.getLogger=function(name='logger'){this.loggers={};
	if((name in this.loggers))return this.loggers[name];
	return(this.loggers[name]=new function logger(){var t=this,lg=logging;
		t.config=Object.assign({},lg._config);
		t.name=name;t.level=t.config.level;
		t.setLevel=(l)=>{t.level=l};
		t.log=(l,...msg)=>{if(l<t.level)return;var s=t.config.style;
			     if(l>=lg.EXCEPTION)l='EXCEPTION';
			else if(l>=lg.CRITICAL)l='CRITICAL';
			else if(l>=lg.ERROR)l='ERROR';
			else if(l>=lg.WARNING)l='WARNING';
			else if(l>=lg.INFO)l='INFO';
			else if(l>=lg.DEBUG)l='DEBUG';
			else l='NOTSET';
			if(l==='EXCEPTION'){msg.push("\n"+(new Error().stack.split("\n").slice(3).join("\n")))}
			lg.console[l]("%c"+l.padStart(9)+" %c"+t.name+'%c:',s.ALL+s[l],s.ALL+s.NAME,s.COLON,...msg)}
		t.debug=(...msg)=>{t.log(lg.DEBUG,...msg)};
		t.info=(...msg)=>{t.log(lg.INFO,...msg)};
		t.warning=(...msg)=>{t.log(lg.WARNING,...msg)};
		t.error=(...msg)=>{t.log(lg.ERROR,...msg)};
		t.critical=(...msg)=>{t.log(lg.CRITICAL,...msg)};
		t.exception=(...msg)=>{t.log(lg.EXCEPTION,...msg)}
	})};
logging._logger=logging.getLogger();
'log,debug,info,warning,error,critical,exception'.split(',').forEach((m)=>{logging[m]=logging._logger[m]});
logging.replaceConsole=(n='logger')=>{var l=logging.getLogger(n);console.debug=l.debug;console.log=l.info;console.error=l.error}
logging.restoreConsole=()=>{console.debug=logging.console.DEBUG;console.log=logging.console.LOG;console.error=logging.console.ERROR}

//

/** /
// Example
var logger=logging.getLogger('MyLogger.Test');
logger.setLevel(logging.NOTSET);

logger.log(logging.NOTSET,'NOTSET');

logger.debug('DEBUG');
logger.info('INFO');
logger.warning('WARNING');
logger.error('ERROR');
logger.critical('CRITICAL');
logger.exception('EXCEPTION');

(function root(){
	(function module(){
		(function method(){
			var onerror=logging.getLogger('Root.Module').exception;
			onerror('ErrorMessage',[0,1,2]);
		})();
	})();
})();

logging.replaceConsole();
console.log("Test Console");
/**/
