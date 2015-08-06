var req = require('./request.js');
var handle = require('./handle.js');
var events = require('./events.js');
var util = require('./util.js');
var type_of = require('./type-of.js');
var captcha = require('./captcha.js');

var version = '0.0.6';

if(window){
	window.yhsd = {};
}else{
	console.log('not in broswer');
}

var YHSD = {};
YHSD.events = events;
YHSD.util = util;
YHSD.captcha = captcha;

window.yhsd.version = function(){
	return version;
};

var aFunctionReady = [];
var bHasInit = false;

var runWhenReady = function(fn){
	if(type_of(fn) === 'function'){
		if(bHasInit){
			fn(YHSD);
		}else{
			aFunctionReady.push(fn);
		}
	}
};

window.yhsd.ready = runWhenReady;

if(typeof window.yhsdDebug === 'undefined'){
	window.yhsdDebug = false;
}

if(type_of(window.yhsdModule) !== 'array'){
	window.yhsdModule = false;
}

var aInitModule = window.yhsdModule || ['account', 'area', 'address', 'blog', 'cart', 'shop', 'order', 'page', 'payment_method', 'product', 'type', 'vendor'];

function checkModule(moduleName){
	return (util.inArray(moduleName, aInitModule) > -1);
}

YHSD.account = checkModule('account') ? require('./account.js') : {};
YHSD.area = checkModule('area') ? require('./area.js') : {};
YHSD.address = checkModule('address') ? require('./address.js') : {};
YHSD.blog = checkModule('blog') ? require('./blog.js') : {};
YHSD.cart = checkModule('cart') ? require('./cart.js') : {};
YHSD.discount = checkModule('discount') ? require('./discount.js') : {};
YHSD.shop = checkModule('shop') ? require('./shop.js') : {};
YHSD.order = checkModule('order') ? require('./order.js') : {};
YHSD.page = checkModule('page') ? require('./page.js') : {};
YHSD.payment_method = checkModule('payment_method') ? require('./payment_method.js') : {};
YHSD.product = checkModule('product') ? require('./product.js') : {};
YHSD.type = checkModule('type') ? require('./type.js') : {};
YHSD.vendor = checkModule('vendor') ? require('./vendor.js') : {};

function checkTokenInit(){
	if(window.ajaxToken){
		jssdkInit();
	}else{
		setTimeout(function(){
			checkTokenInit();
		}, 100);
	}
}

function jssdkInit(){
	if(aFunctionReady.length === 0){
		bHasInit = true;
	}else{
		(aFunctionReady.shift())(YHSD);
		jssdkInit();
	}
}

checkTokenInit();