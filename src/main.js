var events = require('./events.js');
var util = require('./util.js');
var type_of = require('./type-of.js');
var captcha = require('./captcha.js');
var version = require('./version.js');
var request = require('./request.js');

// globalThis 暂时不用
var _global = {};
try {
	_global = global;
} catch (error) {
	_global = window;
}

var YHSD = {};
var SDK = {};

SDK.events = events;
SDK.util = util;
SDK.request = request;
SDK.captcha = captcha;

var aInitModule = ['account', 'area', 'address', 'blog', 'cart', 'shop', 'order', 'page', 'payment_method', 'product', 'type', 'vendor', 'discount', 'coupon', 'reward_point', 'page_block', 'post', 'favorite', 'service', 'trade_invoice', 'weapp', 'form'];

function checkModule(moduleName) {
	return (util.inArray(moduleName, aInitModule) > -1);
}

SDK.account = checkModule('account') ? require('./account.js') : {};
SDK.area = checkModule('area') ? require('./area.js') : {};
SDK.address = checkModule('address') ? require('./address.js') : {};
SDK.blog = checkModule('blog') ? require('./blog.js') : {};
SDK.cart = checkModule('cart') ? require('./cart.js') : {};
SDK.discount = checkModule('discount') ? require('./discount.js') : {};
SDK.shop = checkModule('shop') ? require('./shop.js') : {};
SDK.order = checkModule('order') ? require('./order.js') : {};
SDK.page = checkModule('page') ? require('./page.js') : {};
SDK.payment_method = checkModule('payment_method') ? require('./payment_method.js') : {};
SDK.product = checkModule('product') ? require('./product.js') : {};
SDK.type = checkModule('type') ? require('./type.js') : {};
SDK.vendor = checkModule('vendor') ? require('./vendor.js') : {};
SDK.coupon = checkModule('coupon') ? require('./coupon.js') : {};
SDK.reward_point = checkModule('reward_point') ? require('./reward_point.js') : {};
SDK.page_block = checkModule('page_block') ? require('./page_block.js') : {};
SDK.post = checkModule('post') ? require('./post.js') : {};
SDK.favorite = checkModule('favorite') ? require('./favorite.js') : {};
SDK.service = checkModule('service') ? require('./service.js') : {};
SDK.trade_invoice = checkModule('trade_invoice') ? require('./trade_invoice.js') : {};
SDK.weapp = checkModule('weapp') ? require('./weapp.js') : {};
SDK.form = checkModule('form') ? require('./form.js') : {};

YHSD._$interceptors = {
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
};

YHSD.version = function () {
	return version.get();
};

var runWhenReady = function (fn) {
	if (type_of(fn) === 'function') {
		fn(SDK);
	}
};

YHSD.ready = runWhenReady;
YHSD.sdk = SDK;
YHSD.yhsdDebug = !!_global.yhsdDebug;

module.exports = {
	...YHSD
}

// 注入全局

// 浅拷贝到原来的对象（指针不变），另建新对象可能导致初始化的引用指向旧版本
_global.yhsd = Object.assign((_global.yhsd || {}), YHSD);

// End 注入全局
