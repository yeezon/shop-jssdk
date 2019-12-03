var req = require('./lib/request.js');
var handle = require('./handle.js');
var events = require('./events.js');
var util = require('./util.js');
var type_of = require('./type-of.js');
var captcha = require('./captcha.js');
var version = require('./version.js');
var request = require('./request.js');

var _global = (window || global);

if(!_global){
	console.log('Not in support');	
}

var YHSD = {};
YHSD.events = events;
YHSD.util = util;
YHSD.request = request;
YHSD.captcha = captcha;

_global.yhsd = {
	_$interceptors: {
		request: {
			_$callback: function (oRequest, fnNext) {
				fnNext(oRequest);
			},
			use: function (_fn) {
				this._$callback = _fn;
			},
			run: function (oRequest, fnNext) {
				this._$callback(oRequest, fnNext);
			}
		},
		response: {
			_$callback: function (oResponse, fnNext) {
				fnNext(oResponse);
			},
			use: function (_fn) {
				this._$callback = _fn;
			},
			run: function (oResponse, fnNext) {
				this._$callback(oResponse, fnNext);
			}
		}
   }
};

_global.yhsd.version = function(){
	return version.get();
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

_global.yhsd.ready = runWhenReady;
_global.yhsd.sdk = YHSD;

if(typeof _global.yhsdDebug === 'undefined'){
	_global.yhsdDebug = false;
}

var aInitModule = ['account', 'area', 'address', 'blog', 'cart', 'shop', 'order', 'page', 'payment_method', 'product', 'type', 'vendor', 'discount', 'coupon', 'reward_point', 'page_block', 'post', 'favorite', 'service', 'trade_invoice'];

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
YHSD.coupon = checkModule('coupon') ? require('./coupon.js') : {};
YHSD.reward_point = checkModule('reward_point') ? require('./reward_point.js') : {};
YHSD.page_block = checkModule('page_block') ? require('./page_block.js') : {};
YHSD.post = checkModule('post') ? require('./post.js') : {};
YHSD.favorite = checkModule('favorite') ? require('./favorite.js') : {};
YHSD.service = checkModule('service') ? require('./service.js') : {};
YHSD.trade_invoice = checkModule('trade_invoice') ? require('./trade_invoice.js') : {};

function jssdkInit(){
	if(aFunctionReady.length === 0){
		bHasInit = true;
	}else{
		(aFunctionReady.shift())(YHSD);
		jssdkInit();
	}
}

(function(){
	var ajaxToken = null;
	if('ajaxToken' in _global) {
		jssdkInit();
	} else {
		Object.defineProperty(_global, 'ajaxToken', {
			set: function(token){
				if(!ajaxToken) {
					ajaxToken = token;
					jssdkInit();
				} else {
					ajaxToken = token;
				}
			},
			get: function(){
				return ajaxToken;
			}
		});
	}
})();