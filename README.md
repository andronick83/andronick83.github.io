# andronick83.github.io

![github](https://img.shields.io/github/license/andronick83/andronick83.github.io)

Home Page, Scripts, Examples

<hr>

## Examples:

# page.js - DOMReady, Cookie, Invert, OnLoad Triggers

```JavaScript
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
```

```html
<!-- === page.onload (Page Defer OnLoad Trigger) Full Example: -->
<script src="/page.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js" defer></script>
<script src="jvc.js" defer></script>

<!-- ... -->
<script>
window.page=window.page||{onload:new Set()};
page.onload.add(page=>{
	page.wait('jQuery','JVC','document').run(($,JVC,D)=>{
		console.log($('body'),JVC,D.title);
	});
});
</script>
```

# page-logging.js - Pythonic Logging

```JavaScript
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
```

# jfl.js - JavaScript Font Loader (JFL)

```JavaScript
// Example:
var fontLoader = new JFL.Loader({timeout: 1000, debug: ()=>{}});
fontLoader.load("Source Code Pro",(name, status, check)=>{
	console.log('fontLoader', name, status, check)
});
```

<hr>

## Demo page:
- [demo.html](https://andronick83.github.io/jquery.json-viewer-callback/demo.html)

<hr>

## More examples:
- [page.js](https://github.com/andronick83/andronick83.github.io/blob/main/page.js)
- [page-logging.js](https://github.com/andronick83/andronick83.github.io/blob/main/page-logging.js)
- [jfl.js](https://github.com/andronick83/andronick83.github.io/blob/main/jfl.js)

<hr>

## Requirements:
- JS ES2015/ES6:
```
Chrome	>=51	May 2016
Firefox	>=52	Mar 2017
Edge	>=79	Jan 2020
Safari	>=10	Sep 2016
Opera	>=38	Jun 2016
```

<hr>

## About
- Author: [andronick83.mail@gmail.com](mailto:andronick.mail@gmail.com) :shipit:
- License: [MIT License](http://opensource.org/licenses/MIT) :+1:
