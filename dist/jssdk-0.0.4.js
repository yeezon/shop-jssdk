(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var base = require('./base.js');
var util = require('./util.js');
var expo = require('./expo.js');

var aConfig = {
  current: {},
  login: {method: 'POST'},
  // checkRegistMobile: {method: 'POST', url: 'check_regist_mobile'},
  // checkResetMobile: {method: 'POST', url: 'check_reset_mobile'},
  // sendResetValidateSms: {method: 'POST', url: 'send_reset_validate_sms'},
  // registerWithEmail: {method: 'POST', url: 'register_with_email'},
  // registerWithUsername: {method: 'POST', url: 'register_with_user_name'},
  // registerWithMobile: {method: 'POST', url: 'register_with_mobile'},
  // resetPasswordWithMobile: {method: 'POST', url: 'reset_password_with_mobile'},
  // resetPasswordWithEmail: {method: 'POST', url: 'reset_password_with_email'},
  logout: {method: 'POST'},
  changePassword: {method: 'POST', url: 'change_password'},
  save: {method: 'POST'}
};

var module = base('account', function(factory){
  factory.createByConfig(aConfig);
});

util.forEach(aConfig, function(value, key){
  exports[key] = expo(module, key);
});


/**
 * 顾客账号
 *
 * ```current
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取后的回调函数
 * &&` ^^^customer^^^ 类型：Object<br/>null: 当前未登录<br/>用户对象：当前登录的用户 [查看详情](/development/s/5432566de2931e235b000003)
 * ```
 *
 * ```login
 * `` user
 * &` 类型：Object
 * &&` ^^^account^^^ 类型：String<br/>登录的用户名
 * &&` ^^^password^^^ 类型：String<br/>登录的密码
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>登录后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：登录成功<br/>201：登录失败
 * &&` ^^^message^^^ 类型：String<br/>登录失败原因（当 code 为 201 时）
 * &&` ^^^customer^^^ 类型：Object<br/>当前登录的用户信息 [查看详情](/development/s/5432566de2931e235b000003)
 * &&` ^^^account^^^ 类型：String<br/>当前登录的用户名
 * &&& &nbsp;
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "account" : "yhsduser",
 * &&&     "customer" : {
 * &&&         "id" : 15,
 * &&&         "social_type" : false,
 * &&&         "name" : "yhsduser",
 * &&&         "metas" : {},
 * &&&         "notify_email" : "user@youhaosuda.com",
 * &&&         "notify_phone" : "13824402932",
 * &&&         "accept_marketing" : false,
 * &&&         "regist_at" : "2014-08-27T13:52:34.964+08:00",
 * &&&         "orders_count" : 15,
 * &&&         "total_spent" : 144291,
 * &&&         "last_order_no" : "201505263782651",
 * &&&         "last_order_at" : "2015-05-26T19:25:53.667+08:00"
 * &&&     }
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```logout
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>成功登出后的回调函数
 * ```
 *
 * ```changePassword
 * `` password
 * &` 类型：Object
 * &&` ^^^password_old^^^ 类型：String<br/>旧密码
 * &&` ^^^password^^^ 类型：String<br/>新密码
 * &&` ^^^password_again^^^ 类型：String<br/>重复新密码
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数<br/>注：密码修改成功后，顾客当前登录状态将会失效
 * &&` ^^^code^^^ 类型：Number<br/>200：密码修改成功<br/>201：密码修改失败
 * &&` ^^^message^^^ 类型：String<br/>密码修改失败原因（当 code 为 201 时）
 * ```
 *
 * ```save
 * `` notify
 * &` 类型：Object
 * &&` ^^^notify_email^^^ 类型：String<br/>顾客用于接收通知的邮箱
 * &&` ^^^notify_phone^^^ 类型：String<br/>顾客用于接收通知的手机
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>更新后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：更新信息成功<br/>201：更新信息失败
 * &&` ^^^message^^^ 类型：String<br/>更新信息失败原因（当 code 为 201 时）
 * &&` ^^^customer^^^ 类型：Object<br/>更新后的用户信息 [查看详情](/development/s/5432566de2931e235b000003)
 * ```
 *
 * @param {current} `callback` 获取当前顾客信息
 * @param {login} `user,callback` 顾客登录
 * @param {logout} `callback` 顾客登出 （必须登录）
 * @param {changePassword} `password,callback` 顾客修改密码 （必须登录）
 * @param {save} `notify,callback` 更新顾客信息 （必须登录）
 *
 */
},{"./base.js":5,"./expo.js":11,"./util.js":25}],2:[function(require,module,exports){
var base = require('./base.js');
var util = require('./util.js');
var expo = require('./expo.js');

var aConfig = {
  get: {url: ''},
  create: {method: 'POST'},
  save: {method: 'POST'},
  remove: {method: 'POST'}
};

var module = base('address', function(factory){
  factory.createByConfig(aConfig);
});

util.forEach(aConfig, function(value, key){
  exports[key] = expo(module, key);
});

/**
 * 收货人地址
 *
 * ```get
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数。
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "addresses" : [{
 * &&&             "id" : 221,
 * &&&             "name" : "友好速搭",
 * &&&             "country" : "中国",
 * &&&             "country_code" : "CN",
 * &&&             "province" : "广东省",
 * &&&             "province_code" : "440000",
 * &&&             "city" : "深圳市",
 * &&&             "city_code" : "440300",
 * &&&             "district" : "南山区",
 * &&&             "district_code" : "440305",
 * &&&             "detail" : "新西路兰光科技园B801",
 * &&&             "zipcode" : "518057",
 * &&&             "mobile" : "13800138000",
 * &&&             "telephone" : "0755-83051027",
 * &&&             "email" : "support@youhaosuda.com",
 * &&&             "is_default" : false
 * &&&         }
 * &&&     ]
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```create
 * `` address
 * &` 类型：Object
 * &&` ^^^name^^^ 类型：String 长度：255<br/>收货人姓名
 * &&` ^^^district_code^^^ 类型：String 长度：255<br/>收货区域编码（最后一级）
 * &&` ^^^detail^^^ 类型：String 长度：255<br/>详细收货地址
 * &&` ^^^zipcode^^^（选填） 类型：String 长度：255<br/>邮编
 * &&` ^^^mobile^^^ 类型：String 长度：255<br/>移动电话号码
 * &&` ^^^telephone^^^（选填） 类型：String 长度：255 <br/>联系电话
 * &&` ^^^email^^^（选填） 类型：String 长度：255 <br/>邮箱
 * &&` ^^^is_default^^^（选填） 类型：Boolean<br/>是否为设置默认收货地址
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```save
 * `` address
 * &` 类型：Object
 * &&` ^^^id^^^ 类型：Number<br/>需要更新的收货人信息id
 * &&` ^^^name^^^ 类型：String 长度：255<br/>收货人姓名
 * &&` ^^^district_code^^^ 类型：String 长度：255<br/>收货区域编码（最后一级）
 * &&` ^^^detail^^^ 类型：String 长度：255<br/>详细收货地址
 * &&` ^^^zipcode^^^（选填） 类型：String 长度：255<br/>邮编
 * &&` ^^^mobile^^^ 类型：String 长度：255<br/>移动电话号码
 * &&` ^^^telephone^^^（选填） 类型：String 长度：255 <br/>联系电话
 * &&` ^^^email^^^（选填） 类型：String 长度：255 <br/>邮箱
 * &&` ^^^is_default^^^（选填） 类型：Boolean<br/>是否为设置默认收货地址
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```remove
 * `` address
 * &` 类型：Object
 * &&` ^^^id^^^ 类型：Number<br/>需要删除的收货人信息id
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * @param {get} `callback` 获取所有收货人地址 （必须登录）
 * @param {create} `address,callback` 新建收货人地址 （必须登录）
 * @param {save} `address,callback` 更新收货人地址 （必须登录）
 * @param {remove} `address,callback` 删除收货人地址 （必须登录）
 *
 */
},{"./base.js":5,"./expo.js":11,"./util.js":25}],3:[function(require,module,exports){
// https://github.com/ForbesLindesay/ajax
/* jshint ignore:start */
var util = require('./util.js');
var type
try {
  type = require('./type-of.js')
} catch (ex) {
  //hide from browserify
  var r = require
  type = r('type')
}

var jsonpID = 0,
    document = window.document,
    key,
    name,
    rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    scriptTypeRE = /^(?:text|application)\/javascript/i,
    xmlTypeRE = /^(?:text|application)\/xml/i,
    jsonType = 'application/json',
    htmlType = 'text/html',
    blankRE = /^\s*$/

var ajax = module.exports = function(options){
  var settings = extend({}, options || {})
  for (key in ajax.settings) if (settings[key] === undefined) settings[key] = ajax.settings[key]

  ajaxStart(settings)

  if (!settings.crossDomain) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
    RegExp.$2 != window.location.host

  var dataType = settings.dataType, hasPlaceholder = /=\?/.test(settings.url)
  if (dataType == 'jsonp' || hasPlaceholder) {
    if (!hasPlaceholder) settings.url = appendQuery(settings.url, 'callback=?')
    return ajax.JSONP(settings)
  }

  if (!settings.url) settings.url = window.location.toString()
  serializeData(settings)

  var mime = settings.accepts[dataType],
      baseHeaders = { },
      protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
      xhr = ajax.settings.xhr(), abortTimeout

  if (!settings.crossDomain) baseHeaders['X-Requested-With'] = 'XMLHttpRequest'
  if (mime) {
    baseHeaders['Accept'] = mime
    if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
    xhr.overrideMimeType && xhr.overrideMimeType(mime)
  }
  if (settings.contentType || (settings.data && settings.type.toUpperCase() != 'GET'))
    baseHeaders['Content-Type'] = (settings.contentType || 'application/x-www-form-urlencoded')
  settings.headers = extend(baseHeaders, settings.headers || {})

  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4) {
      clearTimeout(abortTimeout)
      var result, error = false
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
        dataType = dataType || mimeToDataType(xhr.getResponseHeader('content-type'))
        result = xhr.responseText

        try {
          if (dataType == 'script')    (1,eval)(result)
          else if (dataType == 'xml')  result = xhr.responseXML
          else if (dataType == 'json') result = blankRE.test(result) ? null : JSON.parse(result)
        } catch (e) { error = e }

        if (error) ajaxError(error, 'parsererror', xhr, settings)
        else ajaxSuccess(result, xhr, settings)
      } else {
        ajaxError(null, 'error', xhr, settings)
      }
    }
  }

  var async = 'async' in settings ? settings.async : true
  xhr.open(settings.type, settings.url, async)

  for (name in settings.headers) xhr.setRequestHeader(name, settings.headers[name])

  if (ajaxBeforeSend(xhr, settings) === false) {
    xhr.abort()
    return false
  }

  if (settings.timeout > 0) abortTimeout = setTimeout(function(){
      xhr.onreadystatechange = empty
      xhr.abort()
      ajaxError(null, 'timeout', xhr, settings)
    }, settings.timeout)

  // avoid sending empty string (#319)
  xhr.send(settings.data ? settings.data : null)
  return xhr
}


// trigger a custom event and return false if it was cancelled
function triggerAndReturn(context, eventName, data) {
  //todo: Fire off some events
  //var event = $.Event(eventName)
  //$(context).trigger(event, data)
  return true;//!event.defaultPrevented
}

// trigger an Ajax "global" event
function triggerGlobal(settings, context, eventName, data) {
  if (settings.global) return triggerAndReturn(context || document, eventName, data)
}

// Number of active Ajax requests
ajax.active = 0

function ajaxStart(settings) {
  if (settings.global && ajax.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
}
function ajaxStop(settings) {
  if (settings.global && !(--ajax.active)) triggerGlobal(settings, null, 'ajaxStop')
}

// triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
function ajaxBeforeSend(xhr, settings) {
  var context = settings.context
  if (settings.beforeSend.call(context, xhr, settings) === false ||
      triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
    return false

  triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
}
function ajaxSuccess(data, xhr, settings) {
  var context = settings.context, status = 'success'
  settings.success.call(context, data, status, xhr)
  triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
  ajaxComplete(status, xhr, settings)
}
// type: "timeout", "error", "abort", "parsererror"
function ajaxError(error, type, xhr, settings) {
  var context = settings.context
  settings.error.call(context, xhr, type, error)
  triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error])
  ajaxComplete(type, xhr, settings)
}
// status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
function ajaxComplete(status, xhr, settings) {
  var context = settings.context
  settings.complete.call(context, xhr, status)
  triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
  ajaxStop(settings)
}

// Empty function, used as default callback
function empty() {}

ajax.JSONP = function(options){
  if (!('type' in options)) return ajax(options)

  var callbackName = 'jsonp' + (++jsonpID),
    script = document.createElement('script'),
    abort = function(){
      //todo: remove script
      //$(script).remove()
      if (callbackName in window) window[callbackName] = empty
      ajaxComplete('abort', xhr, options)
    },
    xhr = { abort: abort }, abortTimeout,
    head = document.getElementsByTagName("head")[0]
      || document.documentElement

  if (options.error) script.onerror = function() {
    xhr.abort()
    options.error()
  }

  window[callbackName] = function(data){
    clearTimeout(abortTimeout)
      //todo: remove script
      //$(script).remove()
    delete window[callbackName]
    ajaxSuccess(data, xhr, options)
  }

  serializeData(options)
  script.src = options.url.replace(/=\?/, '=' + callbackName)

  // Use insertBefore instead of appendChild to circumvent an IE6 bug.
  // This arises when a base node is used (see jQuery bugs #2709 and #4378).
  head.insertBefore(script, head.firstChild);

  if (options.timeout > 0) abortTimeout = setTimeout(function(){
      xhr.abort()
      ajaxComplete('timeout', xhr, options)
    }, options.timeout)

  return xhr
}

ajax.settings = {
  // Default type of request
  type: 'GET',
  // Callback that is executed before request
  beforeSend: empty,
  // Callback that is executed if the request succeeds
  success: empty,
  // Callback that is executed the the server drops error
  error: empty,
  // Callback that is executed on request complete (both: error and success)
  complete: empty,
  // The context for the callbacks
  context: null,
  // Whether to trigger "global" Ajax events
  global: true,
  // Transport
  xhr: function () {
    return new window.XMLHttpRequest()
  },
  // MIME types mapping
  accepts: {
    script: 'text/javascript, application/javascript',
    json:   jsonType,
    xml:    'application/xml, text/xml',
    html:   htmlType,
    text:   'text/plain'
  },
  // Whether the request is to another domain
  crossDomain: false,
  // Default timeout
  timeout: 0
}

function mimeToDataType(mime) {
  return mime && ( mime == htmlType ? 'html' :
    mime == jsonType ? 'json' :
    scriptTypeRE.test(mime) ? 'script' :
    xmlTypeRE.test(mime) && 'xml' ) || 'text'
}

function appendQuery(url, query) {
  return (url + '&' + query).replace(/[&?]{1,2}/, '?')
}

// serialize payload and append it to the URL for GET requests
function serializeData(options) {
  if (type(options.data) === 'object') options.data = param(options.data)
  if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
    options.url = appendQuery(options.url, options.data)
}

ajax.get = function(url, success){ return ajax({ url: url, success: success }) }

ajax.post = function(url, data, success, dataType){
  if (type(data) === 'function') dataType = dataType || success, success = data, data = null
  return ajax({ type: 'POST', url: url, data: data, success: success, dataType: dataType })
}

ajax.getJSON = function(url, success){
  return ajax({ url: url, success: success, dataType: 'json' })
}

var escape = encodeURIComponent

function serialize(params, obj, traditional, scope){
  var array = type(obj) === 'array';
  for (var key in obj) {
    var value = obj[key];

    if (scope) key = traditional ? scope : scope + '[' + (array ? '' : key) + ']'
    // handle data in serializeArray() format
    if (!scope && array) params.add(value.name, value.value)
    // recurse into nested objects
    else if (traditional ? (type(value) === 'array') : (type(value) === 'object'))
      serialize(params, value, traditional, key)
    else params.add(key, value)
  }
}

function param(obj, traditional){
  var params = []
  params.add = function(k, v){ this.push(escape(k) + '=' + escape(v)) }
  serialize(params, obj, traditional)
  return params.join('&').replace('%20', '+')
}

function extend(target) {
  var slice = Array.prototype.slice;
  util.forEach(slice.call(arguments, 1), function(source){
    for (key in source)
      if (source[key] !== undefined)
        target[key] = source[key]
    
  })
  return target
  // slice.call(arguments, 1).forEach(function(source) {
  //   for (key in source)
  //     if (source[key] !== undefined)
  //       target[key] = source[key]
  // })
  // return target
}

/* jshint ignore:end */
},{"./type-of.js":22,"./util.js":25}],4:[function(require,module,exports){
var base = require('./base.js');
var util = require('./util.js');
var expo = require('./expo.js');
var events = require('./events.js');

var aConfig = {
  country: {url: 'country'},
  province: {url: 'province'},
  city: {url: 'city'},
  district: {url: 'district'}
};

var aInternal = {
	provinceCn : function(){
		var self = this;
		//
		self.province({
			country_code: 'CN'
		}, function(data){
			events.publish('area.provinceCn.done', data);
		});
	}
};

var module = base('area', function(factory, base){
  factory.createByConfig(aConfig);
  factory.internalByConfig(aInternal);
});

util.forEach(aConfig, function(value, key){
  exports[key] = expo(module, key);
});

util.forEach(aInternal, function(value, key){
  exports[key] = expo(module, key);
});


/**
 * 地区信息，用于获取收货人信息地址编码
 *
 * ```country
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * ^^^
 * &&& {
 * &&& 	"code" : 200,
 * &&& 	"message" : "",
 * &&& 	"countries" : [{
 * &&& 			"code" : "CN",
 * &&& 			"name" : "中国"
 * &&& 		}
 * &&& 	]
 * &&& }
 * ^^^
 * ```
 *
 * ```province
 * `` param
 * &` 类型：Object
 * &&` ^^^country_code^^^ 类型：String<br/>从 country 接口获取的国家编码，例如：'CN'
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * ^^^
 * &&& {
 * &&& 	"code" : 200,
 * &&& 	"message" : "",
 * &&& 	"provinces" : [{
 * &&& 			"code" : "110000",
 * &&& 			"name" : "北京市"
 * &&& 		}, {
 * &&& 			"code" : "310000",
 * &&& 			"name" : "上海市"
 * &&& 		}, {
 * &&& 			"code" : "120000",
 * &&& 			"name" : "天津市"
 * &&& 		}, {
 * &&& 			"code" : "500000",
 * &&& 			"name" : "重庆市"
 * &&& 		}, {
 * &&& 			"code" : "130000",
 * &&& 			"name" : "河北省"
 * &&& 		}
 * &&& 		...
 * &&& 	]
 * &&& }
 * ^^^
 * ```
 *
 * ```provinceCn
 * `` 无
 * &` 需自行订阅 "area.provinceCn.done" 事件并处理 [如何订阅？](/development/s/554a25d40abc3e2f22000019#-subscribe-topic-callback-priority-)
 * ```
 *
 * ```city
 * `` param
 * &` 类型：Object
 * &&` ^^^province_code^^^ 类型：String<br/>接口获取的省份编码，例如：'440000'
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * ^^^
 * &&& {
 * &&& 	"code" : 200,
 * &&& 	"message" : "",
 * &&& 	"cities" : [{
 * &&& 			"code" : "440100",
 * &&& 			"name" : "广州市"
 * &&& 		}, {
 * &&& 			"code" : "440300",
 * &&& 			"name" : "深圳市"
 * &&& 		},
 * &&&         ...
 * &&& 	]
 * &&& }
 * ^^^
 * ```
 *
 * ```district
 * `` param
 * &` 类型：Object
 * &&` ^^^city_code^^^ 类型：String<br/>从 city 接口获取的城市编码，例如：'440300'
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * ^^^
 * &&& {
 * &&& 	"code" : 200,
 * &&& 	"message" : "",
 * &&& 	"districts" : [{
 * &&& 			"code" : "440304",
 * &&& 			"name" : "福田区"
 * &&& 		}, {
 * &&& 			"code" : "440305",
 * &&& 			"name" : "南山区"
 * &&& 		},
 * &&& 		...
 * &&& 	]
 * &&& }
 * ^^^
 * ```
 *
 * @param {country} `callback` 获取国家编码，目前只包含中国
 * @param {province} `param,callback` 传入国家代码，获取省份、直辖市编码
 * @param {provinceCn} `&nbsp;` 获取中国省份编码，简化 province 接口调用
 * @param {city} `param,callback` 传入省份代码，获取城市、直辖市编码
 * @param {district} `param,callback` 传入城市代码，获取行政区域编码
 *
 */
},{"./base.js":5,"./events.js":10,"./expo.js":11,"./util.js":25}],5:[function(require,module,exports){
var core = require('./core.js');
var events = require('./events.js');
var util = require('./util.js');
var type_of = require('./type-of.js');

module.exports = function(sName, func){

  function base(){}

  var factory = {};

  factory.internalByConfig = function(conf){
    var self = this;
    util.forEach(conf, function(value, key){
      var args = [];
      args[0] = key;
      args[1] = type_of(value) === 'function' ?  value : (value.callBack ? value.callBack : function(){});
      args[2] = value.data ? value.data : {};
      factory.internal.apply(self, args);
    });
  };

  factory.internal = function(sKey, callBack){
    //
    var sGetTopic = sName + '.' + sKey;
    //
    events.subscribe(sGetTopic, callBack);
    //
    base.prototype[sKey] = function(data){
      var self = this;
      //
      events.publish(sGetTopic, {
        data: data,
        _scope: self
      });
    };
  };

  factory.create = function(sKey, url, method){
    //
    var sGetTopic = sName + '.' + sKey;
    //
    url = ((url === false || url === undefined) ? sKey : url);
    if(sName !== 'shop'){
      url = sName + '/' + url;
    }
    if(sName === 'area'){
      url = sKey;
    }
    //
    core.apiEvents(sGetTopic, url, method);
    //
    base.prototype[sKey] = function(){  // 方法调用时可以再次覆盖data,url,handle // requestConf, func, dataConf, urlFix, handleFix
      var self = this;
      //
      var oPushlish = {};
      var oCallback;
      //
      if(type_of(arguments[0]) === 'function'){
        oCallback = arguments[0];
        oPushlish.request = {};
        oPushlish.data = arguments[1] || false;
        oPushlish.urlModify = arguments[2] || false;
        oPushlish.customHandle = arguments[3] || false;
      }else{
        //
        oCallback = arguments[1];
        oPushlish.request = arguments[0] || false;
        oPushlish.data = arguments[2] || false;
        oPushlish.urlModify = arguments[3] || false;
        oPushlish.customHandle = arguments[4] || false;
        //
        // 免登录查询单个订单 兼容语法糖 get
        if(sName == 'order' && url == 'order/view'){
          var sOrderNo = oPushlish.request.handle;
          oPushlish.request = {
            'order_no': sOrderNo
          };
        }
      }
      oPushlish._scope = self;
      //
      oPushlish._unsubscribe = events.subscribe(sGetTopic + '.done', oCallback);
      //
      events.publish(sGetTopic, oPushlish);
    };
  };

  factory.createByConfig = function(conf){ // 给很长很长的接口做配置进行create
    var self = this;
    util.forEach(conf, function(value, key){
      var args = [];
      args[0] = key;
      if(typeof value.url === 'undefined'){
        args[1] = false;
      }else{
        args[1] = value.url;
      }
      if(typeof value.method !== 'undefined'){
        args[2] = value.method;
      }
      if(typeof value.config !== 'undefined'){
        args[3] = value.config;
      }
      if(typeof value.customHandle !== 'undefined'){
        args[4] = value.customHandle;
      }
      factory.create.apply(self, args);
    });
  };

  factory.get = function(){ // 语法糖 给有 / 和 /view 两个路径 并且查询 handle的接口使用
    var self = this;
    self.create('one', 'view');
    self.create('list', '');
    //
    base.prototype.get = function(requestConf, func, dataConf){

      var selfbase = this;
      //
      if(requestConf && requestConf.handle){
        selfbase.one.apply(selfbase, arguments);
      }else{
        selfbase.list.apply(selfbase, arguments);
      }
    };
    //
  };

  if(func){
    func(factory, base);
  }
  return new base();

};
},{"./core.js":8,"./events.js":10,"./type-of.js":22,"./util.js":25}],6:[function(require,module,exports){
var base = require('./base.js');
var expo = require('./expo.js');

var module = base('blog', function(factory){
  factory.get();
});

exports.get = expo(module, 'get');

/**
 * 轻博客相关接口
 *
 * ```get
 * `` handle
 * &` 类型：String<br/>指定轻博客的 handle<br/>当 handle 参数为空时，返回轻博客列表
 * `` callback
 * &` 类型：Function( 返回对象 [查看详情](/development/s/5475acdf71ea1e5ceb000008) )<br/>获取轻博客的回调函数
 * ```
 *
 * ```getPoly1
 * `` config
 * &` 类型：Object
 * &&` ^^^author^^^ 类型：String 选填<br/>指定轻博客作者
 * &&` ^^^tag^^^ 类型：String 选填<br/>指定轻博客标签
 * &&` ^^^size^^^ 类型：Number 选填<br/>指定返回每页的数目
 * &&` ^^^page^^^ 类型：Number 选填<br/>指定返回分页页码
 * `` callback
 * &` 类型：Function( 返回对象 [查看详情](/development/s/5475acdf71ea1e5ceb000008) )<br/>获取轻博客的回调函数<br/>返回对象中包含分页对象 paging [查看详情](/development/s/5587c0b00abc3e41b300002d#-paging-)
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "blogs" : [ ... ],
 * &&&     "paging" : { ... }
 * &&& }
 * &&& ^^^
 * ```
 *
 * @param {get} `[handle,]callback` 获取单个轻博客
 * @param {getPoly1} `config,callback` 获取轻博客列表
 *
 */
},{"./base.js":5,"./expo.js":11}],7:[function(require,module,exports){
var base = require('./base.js');
var util = require('./util.js');
var expo = require('./expo.js');
var localCart = require('./localcart.js');
var events = require('./events.js');

var aConfig = {
  get: {url: ''},
  add: {method: 'POST', url: 'create'},
  quantity: {method: 'POST', url: 'set'},
  checkOne: {method: 'POST', url: 'check'},
  unCheckOne: {method: 'POST', url: 'uncheck'},
  checkAll: {method: 'POST', url: 'all_check'},
  unCheckAll: {method: 'POST', url: 'all_uncheck'},
  removeOne: {method: 'POST', url: 'remove'},
  removeAll: {method: 'POST', url: 'all_remove'},
  withinShipments: {url: 'within_shipments'},
  mustShipping: {url: 'must_shipping'}
};

var module = base('cart', function(factory){
  factory.createByConfig(aConfig);
});

exports.get = function(oCall){
  //
  var cart = this;
  //
  module.get(function(o){
    var self = this;
    var res = o.res;
    if(res.cart && res.cart.items){
      cart.cache = res.cart.items;
    }else{
      cart.cache = [];
    }
    //
    if(res.discount){
      events.publish('discount.get.done', {
        data : res.discount || false
      });
    }
    //
    if(oCall){
      oCall(o);
    }
  });
};

var oLocalCartMap = {
  add: 'add',
  quantity: 'add',
  checkOne: 'checkOne',
  unCheckOne: 'checkOne',
  checkAll: 'checkAll',
  unCheckAll: 'checkAll',
  removeOne: 'removeOne',
  removeAll: 'removeAll'
};

util.forEach(oLocalCartMap, function(value, key){
    //
  exports[key] = function(oParam, oCall){
    //
    module[key](oParam, function(o){
      var res = o.res;
      var args = [];
      switch(res.code){
        case 212:
          switch(key){
            case 'add':
              oParam.is_check = true;
              args.push({
                item: oParam
              });
              break;
            case 'quantity':
              delete oParam.is_check;
              args.push({
                item: oParam,
                is_set: true
              });
              break;
            case 'checkOne':
              oParam.is_check = true;
              args.push({
                item: oParam
              });
              break;
            case 'unCheckOne':
              oParam.is_check = false;
              args.push({
                item: oParam
              });
              break;
            case 'checkAll':
              args.push({
                is_check: true
              });
              break;
            case 'unCheckAll':
              args.push({
                is_check: false
              });
              break;
            case 'removeOne':
              args.push({
                item: oParam
              });
              break;
            case 'removeAll':
              // 不需参数
              break;
            default:
              args.push(oParam);
          }
          localCart[value].apply(localCart, args);
          break;
        default:
          events.publish('cart.' + key + '.fail', {
            res: o,
            data: 'fail'
          });
      }
      if(oCall){
        oCall(o);
      }
    });
  };
});



/**
 * 购物车。当顾客尚未登录时，自动使用基于cookie的本地购物车
 *
 * ```get
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "cart" : {
 * &&&         "items" : [{ // 购物车商品列表
 * &&&                 "variant_id" : 995, // 商品价格id
 * &&&                 "quantity" : 3, // 商品件数
 * &&&                 "price" : 100, // 商品单价
 * &&&                 "weight" : 0, // 商品重量
 * &&&                 "volume" : 0, // 商品体积
 * &&&                 "options_desc" : "颜色:", // 商品价格选项组合描述
 * &&&                 "is_check" : true, // 在当前购物车中是否选中（未选中的商品将不会被提交到订单）
 * &&&                 "available" : true, // 商品是否有效
 * &&&                 "reason" : "", // 商品无效原因
 * &&&                 "name" : "口香糖组合", // 商品名称
 * &&&                 "page_url" : "/products/0556b7d52eed4189ab", // 商品页面地址
 * &&&                 "image_id" : "53faef8063", // 商品图片id
 * &&&                 "image_name" : "1.jpg", // 商品图片名称
 * &&&                 "image_epoch" : "1408803551", // 商品图片版本号
 * &&&                 "image_src" : "http://asset.localtestasset.com/image/53faef8063.jpg1408803551", // 原图地址
 * &&&                 "line_price" : 300 // 商品总价
 * &&&             }],
 * &&&         "item_count" : 1 // 商品种类
 * &&&     },
 * &&&     "discount" : { // 满足的优惠活动
 * &&&         "discount_name" : "满3元减1元", // 优惠活动名称
 * &&&         "discount_page_url" : "/discounts/D000002", // 优惠活动页面地址
 * &&&         "active_amount" : 300, // 满减条件
 * &&&         "discount_amount" : 100 // 满减金额
 * &&&     }
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```add
 * `` item
 * &` 类型：Object
 * &&` ^^^variant_id^^^ 类型：Number<br/>商品价格的id
 * &&` ^^^quantity^^^ 类型：Number<br/>商品数量。
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```quantity
 * `` item
 * &` 类型：Object
 * &&` ^^^variant_id^^^ 类型：Number<br/>商品价格的id
 * &&` ^^^quantity^^^ 类型：Number<br/>商品数量
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```checkOne
 * `` item
 * &` 类型：Object
 * &&` ^^^variant_id^^^ 类型：Number<br/>商品价格的id
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```unCheckOne
 * `` item
 * &` 类型：Object
 * &&` ^^^variant_id^^^ 类型：Number<br/>商品价格的id
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```checkAll
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```unCheckAll
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```removeOne
 * `` item
 * &` 类型：Object
 * &&` ^^^variant_id^^^ 类型：Number<br/>商品价格的id
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```removeAll
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```withinShipments
 * `` param
 * &` 类型：Object
 * &&` ^^^address_id^^^ 类型：Number<br/>收货人地址 id
 * &&` ^^^payment_method_type^^^ 类型：String<br/>支付类型
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```withinShipmentsPoly1
 * `` param
 * &` 类型：Object
 * &&` ^^^district_code^^^ 类型：String<br/>收货地区 post
 * &&` ^^^payment_method_type^^^ 类型：String<br/>支付类型
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```mustShipping
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * @param {get} `callback` 获取购物车
 * @param {add} `item,callback` 将商品加入购物车
 * @param {quantity} `item,callback` 修改商品数量
 * @param {checkOne} `item,callback` 选中单个商品
 * @param {unCheckOne} `item,callback` 取消选中单个商品
 * @param {checkAll} `callback` 选中所有商品
 * @param {unCheckAll} `callback` 取消选中所有商品
 * @param {removeOne} `item,callback` 删除购物车中的单个商品
 * @param {removeAll} `callback` 删除购物车中的所有商品
 * @param {withinShipments} `param,callback` 获取带有物流信息的购物车（必须登录）
 * @param {withinShipmentsPoly1} `param,callback` 获取带有物流信息的购物车
 * @param {mustShipping} `callback` 检查购物车是否需要物流
 *
 */
},{"./base.js":5,"./events.js":10,"./expo.js":11,"./localcart.js":13,"./util.js":25}],8:[function(require,module,exports){
var events = require('./events.js');
var req = require('./request.js');
var handle = require('./handle.js');
var util = require('./util.js');
//
function _mixin(target, mix){
  util.forEach(mix, function(value, key){
    target[key] = value;
  });
}
//
exports.apiEvents = function(topic, url, method){
  url = (typeof url === 'string') ? url : topic;
  method = method ? method : 'get';
  events.subscribe(topic, function(conf){
    var oPostData = {};
    if(conf && conf.request){
      _mixin(oPostData, conf.request);  // 使用 conf.request 来配置请求 用户参数权限 > 系统设定权限
    }
    if(conf && conf.urlModify){
      url = conf.urlModify; // 使用 conf.urlModify 函数,在 publish的时候动态修改url
    }
    req[method.toLowerCase()](url, {
      data: oPostData,
      success: function(o){
        var oRes = false;
        var oResponse = {
          res: o || {}
        };
        if(conf && conf.data){
          _mixin(oResponse, conf.data); // 使用 conf.data 来自定义传递事件中的数据
        }
        //
        oRes = handle(oResponse, conf.customHandle || false);
        if(oRes){
          events.publish(topic + '.done', oResponse, function(){
            if(conf._unsubscribe){
              conf._unsubscribe.unsubscribe();
            }
          });
        }
      },
      error: function(){
        events.publish('request.error', {
          topic: topic
        });
      }
    });
  });
};
},{"./events.js":10,"./handle.js":12,"./request.js":20,"./util.js":25}],9:[function(require,module,exports){
var base = require('./base.js');
var expo = require('./expo.js');
var util = require('./util.js');

var aConfig = {
    getFromProduct: {url: 'from_product'},
    getFromCart: {url: 'from_cart'}
};

var module = base('discount', function(factory){
  //
  factory.get();
  //
  factory.createByConfig(aConfig);
  //
});

exports.get = expo(module, 'get');

util.forEach(aConfig, function(value, key){
  exports[key] = expo(module, key);
});

/**
 * 优惠规则
 *
 * ```get
 * `` handle
 * &` 类型：String<br/>指定优惠规则的handle。
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数。
 * ```
 *
 * ```getPoly1
 * `` config
 * &` 类型：Object
 * &&` size 类型：Number<br/>指定返回每页的数目。
 * &&` page 类型：Number<br/>指定返回分页页码。
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数。
 * ```
 *
 * ```getFromProduct
 * `` handle
 * &` 类型：String<br/>指定商品的handle。
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数。
 * ```
 *
 * ```getFromCart
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数。
 * ```
 *
 * @param {get} `handle,callback` 获取指定优惠规则
 * @param {getPoly1} `[config,]callback` 获取优惠规则列表
 * @param {getFromProduct} `handle,callback` 获取指定商品优惠规则
 * @param {getFromCart} `callback` 获取当前购物车满足优惠规则
 *
 */
},{"./base.js":5,"./expo.js":11,"./util.js":25}],10:[function(require,module,exports){
var util = require('./util.js');
var log = require('./log.js');

var events = {
  messages : {},
  subscribe: function(topic, func, priority){
    var self = this;
    var nPriority = parseInt(priority);
    nPriority = nPriority ? nPriority : 10; // 默认优先级为10
    var sTopicEncode = encodeURIComponent(topic);
    //
    if(typeof self.messages[sTopicEncode] === 'undefined'){
      self.messages[sTopicEncode] = [];
    }
    if(typeof self.messages[sTopicEncode][nPriority] === 'undefined'){
      self.messages[sTopicEncode][nPriority] = [];
    }
    var aPriorityList = self.messages[sTopicEncode][nPriority];
    var nFuncIndex = -1;
    if(aPriorityList){
      if(util.inArray(func, aPriorityList) === - 1){ // 只允许绑定一个相同函数
        aPriorityList.push(func);
        nFuncIndex = aPriorityList.length - 1;
      }
      log({subscribe: topic, priority: nPriority, sort: nFuncIndex});
    }
    return {
      unsubscribe : function(){
        if(nFuncIndex !== -1){
          log({unsubscribe: topic, priority: nPriority, sort: nFuncIndex});
          aPriorityList.splice(nFuncIndex, 1);
          nFuncIndex = -1;
        }
      }
    };
  },
  publish : function(topic, data, done){
    var self = this;
    if(typeof topic !== 'string'){
      return;
    }
    data = data ? data : {};
    var sTopicEncode = encodeURIComponent(topic);
    var aMainList = self.messages[sTopicEncode];
    //
    log({published: topic});
    //
    if(typeof aMainList === 'undefined'){
      return;
    }
    var scope = data._scope || this;
    var bNext = true;
    util.forEach(aMainList, function(aPriorityList, nPriority){
      if(aPriorityList){
        util.forEach(aPriorityList, function(oSub, nFuncIndex){
          if(oSub){
            bNext = oSub.call(scope, data);
            if(bNext !== false){
              bNext = true;
            }
            log({exec: topic, priority: nPriority, sort: nFuncIndex, 'continue': bNext});
            return bNext;
          }
        });
        return bNext;
      }
    });
    if(done){
      done();
    }
  },
};

exports.subscribe = events.subscribe;

exports.publish = events.publish;

exports.messages = events.messages;

/**
 * 发布/订阅事件
 *
 * ```subscribe
 * `` topic
 * &` 类型：String<br/>需要订阅的事件，如'cart.get.done'。
 * `` callback
 * &` 类型：Function( publish参数data )<br/>事件发布后的回调函数，回调函数如果^^^return false^^^,则不继续执行该事件的其他回调函数。
 * `` priority
 * &` 类型：Number ( 默认值：10 )<br/>回调函数执行的优先级，SDK默认的优先级为10，如果要先于默认回调执行，请使用1~9的优先级，如果要先于默认回调执行，请大于10的优先级。
 *
 * 如何取消订阅？
 * ^^^
 * <script>
 *   var s = events.subscribe('hello', function(){
 *     console.log('hello');
 *   }); // 成功订阅后会返回引用
 *   //
 *   s.unsubscribe(); //取消订阅
 * </script>
 * ^^^
 * ```
 *
 * ```publish
 * `` topic
 * &` 类型：String<br/>需要发布的事件，如'cart.get.done'。
 * `` data
 * &` 类型：Object
 * &&` res 类型：Object<br/>请不要使用此保留 key，用于 SDK 从 API 获取数据后传至回调函数。
 * &&` anything 类型：Object 选填<br/>使用除 res 之外 key 的对象，可以向订阅事件传送额外数据。
 * ```
 *
 * @param {subscribe} `topic,callback[,priority]` 订阅事件
 * @param {publish} `topic,data` 发布事件
 *
 */
},{"./log.js":14,"./util.js":25}],11:[function(require,module,exports){
var type_of = require('./type-of.js');
var util = require('./util.js');

module.exports = function(moduleObj, name){
  return function(){
  	var args;
  	if(type_of(arguments[0]) === 'function'){
  		args = [];
  		args[0] = {};
  		util.forEach(arguments, function(v){
  			args.push(v);
  		});
  	}else{
  		args = arguments;
      if(type_of(arguments[0]) === 'string'){
        //
        var sHandle = arguments[0];
        //
        args[0] = {
          handle: sHandle
        };
      }
  	}
    moduleObj[name].apply(moduleObj, args);
  };
};
},{"./type-of.js":22,"./util.js":25}],12:[function(require,module,exports){
var events = require('./events.js');

module.exports = function(oResponse, oHandle){
  if(!oResponse){
    throw 'code: no Param';
  }
  var nCode = 0;
  var oRes = oResponse.res;
  if(typeof oRes.code === 'number'){
    nCode = oRes.code;
  }
  var fCustomHandle = function(){
    var bHandleByCustom = false;
    if(oHandle && oHandle['code' + nCode]){
      bHandleByCustom = true;
      oHandle['code' + nCode](oRes);
    }
    return bHandleByCustom;
  };
  var fAlertMessage = function(event){
    var sEvent = event ? event : 'unknow';
    events.publish('api.' + sEvent, oRes);
  };
  if(!fCustomHandle()){
    switch(nCode){
      case 200:
        return oRes;
      case 201:
        return oRes;
      case 202:
        fAlertMessage('needParam');
        break;
      case 203:
        fAlertMessage();
        break;
      case 204:
        fAlertMessage('needLogin');
        break;
      case 205:
        fAlertMessage();
        break;
      case 207:
        fAlertMessage('liquidError');
        break;
      case 212: // 未登录
        return oRes;
      case 308:
        return oRes;
      case 500:
        fAlertMessage('serverError');
        break;
      default:
        fAlertMessage();
    }
  }
};
},{"./events.js":10}],13:[function(require,module,exports){
var base = require('./base.js');
var util = require('./util.js');
var expo = require('./expo.js');

var getParam = function(o, key){
  if(o && o.data){
    return o.data[key] || false;
  }
};

var aConfig = {
  get : function(){
    var self = this;
    var sCart = util.getCookie(self.cookieName);
    if(sCart){
      try{
        self.cart = JSON.parse(sCart);
      }catch(e){
        util.setCookie(self.cookieName, '', true);
        window.location.reload();
      }
    }else{
        self.cart = [];
    }
  },
  set : function(oPublish){
    var self = this;
    var aCart = getParam(oPublish, 'cart');
    var bClear = getParam(oPublish, 'is_clear');
    var sCartJson = JSON.stringify(aCart);
    if(bClear){
      util.setCookie(self.cookieName, '', true);
    }else{
      util.setCookie(self.cookieName, sCartJson, true);
    }
  },
  add : function(oPublish){
    var self = this;
    self.get(); // 获取cartData
    var aCart = self.cart || [];
    var oItem = getParam(oPublish, 'item');
    if(!oItem){
      return;
    }
    var bIsSet = getParam(oPublish, 'is_set');
    var bItemInCart = false;
    util.forEach(aCart, function(oEach, index){
      if(oEach.variant_id == oItem.variant_id){
        bItemInCart = true;
        if(bIsSet){
          oEach.quantity = oItem.quantity;
        }else{
          oEach.quantity = oEach.quantity + oItem.quantity;
        }
        return false;
      }
    });
    if(!bItemInCart){
      aCart.push(oItem);
    }
    self.set({
      cart: aCart
    });
  },
  checkOne : function(oPublish){
    var self = this;
    self.get(); // 获取cartData
    var aCart = self.cart || [];
    var oParam = getParam(oPublish, 'item');
    util.forEach(aCart, function(oEach, index){
      if(oEach.variant_id == oParam.variant_id){
        oEach.is_check = oParam.is_check;
        return false;
      }
    });
    self.set({
      cart: aCart
    });
  },
  checkAll : function(oPublish){
    var self = this;
    self.get(); // 获取cartData
    var aCart = self.cart || [];
    //
    var bCheck = getParam(oPublish, 'is_check');
    //
    util.forEach(aCart, function(oEach, index){
      oEach.is_check = bCheck;
    });
    self.set({
      cart: aCart
    });
  },
  removeOne : function(oPublish){
    var self = this;
    self.get(); // 获取cartData
    var aCart = self.cart || [];
    //
    var oParam  = getParam(oPublish, 'item');
    var aRemovedCart = [];
    util.forEach(aCart, function(oEach, index){
      if(oEach.variant_id != oParam.variant_id){
        aRemovedCart.push(oEach);
      }
    });
    self.set({
      cart: aRemovedCart
    });
  },
  removeAll : function(){
    var self = this;
    self.set({
      cart: false,
      is_clear: true
    });
  }
};

var module = base('localcart', function(factory, base){
  base.prototype.cookieName = 'local_cart';
  factory.internalByConfig(aConfig);
});

exports.get = expo(module, 'get');
exports.set = expo(module, 'set');
exports.add = expo(module, 'add');
exports.checkOne = expo(module, 'checkOne');
exports.checkAll = expo(module, 'checkAll');
exports.removeOne = expo(module, 'removeOne');
exports.removeAll = expo(module, 'removeAll');
},{"./base.js":5,"./expo.js":11,"./util.js":25}],14:[function(require,module,exports){
var util = require('./util.js');

module.exports = function(info){
  if(window.yhsdDebug){
    var sLog = '';
    util.forEach(info, function(value, key){
      var sEachLog = key + ':' + value + '  ';
      sLog = sLog + sEachLog;
    });
    console.log(sLog);
  }
};
},{"./util.js":25}],15:[function(require,module,exports){
var req = require('./request.js');
var handle = require('./handle.js');
var events = require('./events.js');
var util = require('./util.js');
var type_of = require('./type-of.js');

var version = '0.0.4';

if(window){
	window.yhsd = {};
}else{
	console.log('not in broswer');
}

var YHSD = {};
YHSD.events = events;
YHSD.util = util;

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
},{"./account.js":1,"./address.js":2,"./area.js":4,"./blog.js":6,"./cart.js":7,"./discount.js":9,"./events.js":10,"./handle.js":12,"./order.js":16,"./page.js":17,"./payment_method.js":18,"./product.js":19,"./request.js":20,"./shop.js":21,"./type-of.js":22,"./type.js":23,"./util.js":25,"./vendor.js":26}],16:[function(require,module,exports){
var base = require('./base.js');
var expo = require('./expo.js');
var util = require('./util.js');

var aConfig = {
    recieve: {},
    create: {method: 'POST'},
    cancel: {method: 'POST'}
};

var module = base('order', function(factory){
  //
  factory.get();
  //
  factory.createByConfig(aConfig);
  //
});

exports.get = expo(module, 'get');

util.forEach(aConfig, function(value, key){
  exports[key] = expo(module, key);
});

/**
 * 订单
 *
 * ```get
 * `` order_no
 * &` 类型：String<br/>指定订单编号<br/>未登录时调用此接口，将返回指定订单的简单详情。
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * ```
 *
 * ```getPoly1
 * `` config
 * &` 类型：Object
 * &&` ^^^size^^^ 类型：Number<br/>指定返回每页的数目
 * &&` ^^^page^^^ 类型：Number<br/>指定返回分页页码
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数<br/>返回对象中包含分页对象 paging [查看详情](/development/s/5587c0b00abc3e41b300002d#-paging-)
 * ```
 *
 * ```recieve
 * `` order
 * &` 类型：Object
 * &&` ^^^order_no^^^ 类型：String<br/>指定订单编号
 * &&` ^^^shipment_id^^^ 类型：String<br/>指定运单编号
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```create
 * `` order
 * &` 类型：Object
 * &&` ^^^address_id^^^ 类型：Number<br/>收货人信息id
 * &&` ^^^payment_method_id^^^ 类型：Number<br/>支付方式id
 * &&` ^^^bank_code_id^^^（选填） 类型：Number<br/>支付银行id，当 payment_method_id 为银行卡支付方式时必填
 * &&` ^^^remark^^^（选填） 类型：String<br/>订单备注
 * &&` ^^^shipments^^^ 类型：Json<br/>配送方式Json对象。例如：<br/>^^^[{"id":59,"shipment_method_id":90},{"id":61,"shipment_method_id":81}]^^^
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```createPoly1
 * `` order
 * &` 类型：Object
 * &&` ^^^items^^^（选填） 类型：Json<br/>该订单包含的商品。如果使用此参数，则不使用离线购物车的数据。例如：<br/>^^^[{"variant_id":17,"quantity":1},{"variant_id":992,"quantity":2}]^^^ 
 * &&` ^^^name^^^ 类型：String 长度：255<br/>收货人姓名
 * &&` ^^^district_code^^^ 类型：String 长度：255<br/>收货区域编码（最后一级）
 * &&` ^^^detail^^^ 类型：String 长度：255<br/>详细收货地址
 * &&` ^^^zipcode^^^（选填） 类型：String 长度：255<br/>邮编
 * &&` ^^^mobile^^^ 类型：String 长度：255<br/>移动电话号码
 * &&` ^^^telephone^^^（选填） 类型：String 长度：255<br/>联系电话
 * &&` ^^^email^^^（选填） 类型：String 长度：255<br/>邮箱
 * &&` ^^^payment_method_id^^^ 类型：Number<br/>支付方式id
 * &&` ^^^bank_code_id^^^（选填） 类型：Number<br/>支付银行id，当 payment_method_id 为银行卡支付方式时必填
 * &&` ^^^remark^^^（选填） 类型：String<br/>订单备注。
 * &&` ^^^shipments^^^ 类型：Json<br/>配送方式Json对象。例如：<br/>^^^[{"id":59,"shipment_method_id":90},{"id":61,"shipment_method_id":81}]^^^
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```cancel
 * `` order
 * &` 类型：Object
 * &&` ^^^order_no^^^ 类型：String<br/>指定订单编号
 * &&` ^^^reason^^^ 类型：String<br/>退单理由
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * @param {get} `order_no,callback` 获取指定订单
 * @param {getPoly1} `[config,]callback` 获取订单列表
 * @param {recieve} `order,callback` 指定订单的指定运单确认收货
 * @param {create} `order,callback` 提交订单 （必须登录）
 * @param {createPoly1} `order,callback` 匿名提交订单（免登录下单），默认使用离线购物车
 * @param {cancel} `order,callback` 取消指定订单
 *
 */
},{"./base.js":5,"./expo.js":11,"./util.js":25}],17:[function(require,module,exports){
var base = require('./base.js');
var expo = require('./expo.js');

var module = base('page', function(factory){
  factory.get();
});

exports.get = expo(module, 'get');

/**
 * 自定义页面
 *
 * ```get
 * `` handle
 * &` 类型：String<br/>指定自定义页面的handle
 * `` callback
 * &` 类型：Function( 返回对象 [查看详情](/development/s/54325aace2931e1d26000004) )<br/>获取信息后的回调函数
 * ```
 *
 * ```getPoly1
 * `` config
 * &` 类型：Object
 * &&` ^^^size^^^ 类型：Number 选填<br/>指定返回每页的数目
 * &&` ^^^page^^^ 类型：Number 选填<br/>指定返回分页页码
 * `` callback
 * &` 类型：Function( 返回对象 [查看详情](/development/s/54325aace2931e1d26000004) )<br/>获取信息后的回调函数<br/>返回对象中包含分页对象 paging [查看详情](/development/s/5587c0b00abc3e41b300002d#-paging-)
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "pages" : [ ... ],
 * &&&     "paging" : { ... }
 * &&& }
 * &&& ^^^
 * ```
 *
 * @param {get} `handle,callback` 获取指定自定义页面
 * @param {getPoly1} `[config,]callback` 获取自定义页面列表
 *
 */
},{"./base.js":5,"./expo.js":11}],18:[function(require,module,exports){
var base = require('./base.js');
var util = require('./util.js');
var expo = require('./expo.js');

var aConfig = {
  get: {url: ''}
};

var module = base('payment_method', function(factory){
  factory.createByConfig(aConfig);
});

util.forEach(aConfig, function(value, key){
  exports[key] = expo(module, key);
});


/**
 * 支付方式
 *
 * ```get
 * `` param
 * &` 类型：Object
 * &&` ^^^address_id^^^（选填） 类型：Number<br/>收货人地址 id，不传入则不做配送区域判断
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * ```
 *
 * ```getPoly1
 * `` param
 * &` 类型：Object
 * &&` ^^^items^^^（选填） 类型：Json<br/>该订单包含的商品。如果使用此参数，则不使用离线购物车的数据。例如：<br/>^^^[{"variant_id":17,"quantity":1},{"variant_id":992,"quantity":2}]^^^ 
 * &&` ^^^district_code^^^（选填） 类型：Number<br/>收货区域编码（最后一级），不传入则不做配送区域判断
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * ```
 *
 * @param {get} `param,callback` 获取支付方式 （必须登录）
 * @param {getPoly1} `param,callback` 获取支付方式（免登录下单），默认使用离线购物车
 *
 */
},{"./base.js":5,"./expo.js":11,"./util.js":25}],19:[function(require,module,exports){
var base = require('./base.js');
var expo = require('./expo.js');

var module = base('product', function(factory){
  factory.get();
});

exports.get = expo(module, 'get');

/**
 * 商品
 *
 * ```get
 * `` handle
 * &` 类型：String<br/>指定商品的handle
 * `` callback
 * &` 类型：Function( 返回对象 [查看详情](/development/s/5432593471ea1e4f9f000013) )<br/>获取信息后的回调函数
 * ```
 *
 * ```getPoly1
 * `` config
 * &` 类型：Object
 * &&` ^^^search^^^ 类型：String 选填<br/>指定商品名称包含的文字
 * &&` ^^^vendor^^^ 类型：String 选填<br/>指定商品品牌包含的文字
 * &&` ^^^type^^^ 类型：String 选填<br/>指定商品分类包含的文字
 * &&` ^^^in_stock^^^ 类型：Boolean 选填<br/>指定商品库存是否足够（默认值为 false）
 * &&` ^^^size^^^ 类型：Number 选填<br/>指定返回每页的数目
 * &&` ^^^page^^^ 类型：Number 选填<br/>指定返回分页页码
 * `` callback
 * &` 类型：Function( 返回对象 [查看详情](/development/s/5432593471ea1e4f9f000013) )<br/>获取信息后的回调函数<br/>返回对象中包含分页对象 paging [查看详情](/development/s/5587c0b00abc3e41b300002d#-paging-)
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "products" : [ ... ],
 * &&&     "paging" : { ... }
 * &&& }
 * &&& ^^^
 * ```
 *
 * @param {get} `handle,callback` 获取指定商品
 * @param {getPoly1} `[config,]callback` 获取商品列表
 *
 */
},{"./base.js":5,"./expo.js":11}],20:[function(require,module,exports){
var uri = require('./uri.js');
var ajax = require('./ajax.js');

function oReq(){
	var self = this;

	self._retry = 0;
	self._maxRetry = 1;
}
oReq.prototype._setParam = function(o, sUri){
	var self = this;
	if(!o){
		o = {};
	}
	if(!o.data){
		o.data = {};
	}
	o.data.token = window.ajaxToken;
	o.dataType = 'json';
	if(!o.error){
		o.error = function(){
			console.log('req error times:' + self._retry + ', ' + (o.url ? o.url : 'empty'));
			if(self._retry > self._maxRetry){
				return;
			}
			setTimeout(function(){
				self._retry = self._retry + 1;
				self._send(o);
			}, 1000);
		};
	}
	o.url = uri(sUri);
};
oReq.prototype._send = function(o){
	ajax(o);
};
oReq.prototype._get = function(sUri, oParam){
	var self = this;
	self._setParam(oParam, sUri);
	oParam.method = 'GET';
	oParam.type = 'GET';
	//
	oParam.data.rnd = new Date().getTime();
	//
	self._send(oParam);
};
oReq.prototype._post = function(sUri, oParam){
	var self = this;
	self._setParam(oParam, sUri);
	oParam.method = 'POST';
	oParam.type = 'POST';
	self._send(oParam);
};
oReq.prototype._jsonp = function(sUri, oParam){
	var self = this;
	self._setParam(oParam, sUri);
	oParam.method = 'GET';
	oParam.type = 'GET';
	//
	oParam.data.rnd = new Date().getTime();
	//
	oParam.dataType = 'jsonp';
	if(!oParam.jsonp){
		oParam.jsonp = 'callback';
	}
	oParam.url = uri(sUri);
	self._send(oParam);
};
function _checkArg(args){
	if(!args){
		args = [];
	}
	if(!args[0]){
		args[0] = '';
	}
	if(!args[1]){
		args[1] = {};
	}
}

exports.get = function(){
	var req = new oReq();
	_checkArg(arguments);
	req._get(arguments[0], arguments[1]);
};

exports.post = function(){
	var req = new oReq();
	_checkArg(arguments);
	req._post(arguments[0], arguments[1]);
};

exports.jsonp = function(){
	var req = new oReq();
	_checkArg(arguments);
	req._jsonp(arguments[0], arguments[1]);
};
},{"./ajax.js":3,"./uri.js":24}],21:[function(require,module,exports){
var base = require('./base.js');
var type_of = require('./type-of.js');
var expo = require('./expo.js');

var module = base('shop', function(factory){
  factory.create('list', '');
  factory.create('all', '');
  //
  factory.create('protecting', false, 'POST');
});

exports.get = function(){
  var args = [];
  if(type_of(arguments[0]) === 'function'){
    args = [{}, arguments[0]];
    module.all.apply(module, args);
  }else{
    var sFields = arguments[0];
    args = arguments;
    args[0] = {
      fields: sFields
    };
    module.list.apply(module, args);
  }
};

exports.protecting = expo(module, 'protecting');

/**
 * 店铺信息
 *
 * ```get
 * `` handles
 * &` 类型：String<br/>指定需要返回的内容，用','隔开。<br/>当handles参数为空时，返回所有内容。<br/>可选handles包括：
 * &&` ^^^shop^^^ 店铺基础信息。 [查看详情](/development/s/542508ff71ea1e78fe000008)
 * &&` ^^^linklists^^^ 店铺导航数据。 [查看详情](/development/s/5432558971ea1e4f9f000005)
 * &&` ^^^page_title^^^ 当前页面title
 * &&` ^^^page_desc^^^ 当前页面description
 * &&` ^^^is_mobile_agent^^^ 是否移动设备（根据当前User-Agent判断）
 * &&` ^^^current_datetime^^^ 当前时间
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * &&& ^^^
 * &&& {
 * &&&   "code" : 200,
 * &&&   "message" : "",
 * &&&   "shop" : { ... },
 * &&&   "linklists" : { ... },
 * &&&   "page_title" : "买买买 - 不用选，直接买",
 * &&&   "page_desc" : "我们致力于解决选择困难症用户选购商品时的烦恼。我们帮你挑好了，你只需要买买买。",
 * &&&   "is_mobile_agent" : "",
 * &&&   "current_datetime" : "2015-05-28T10:51:43.060+08:00"
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```protecting
 * `` password
 * &` 类型：String<br/>店铺保护密码
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交店铺保护密码后的回调函数
 * &&` ^^^correct^^^ 类型：Boolean<br/>true: 密码正确，将设置名为 protection_password 的Cookie。此时刷新页面即可访问<br/>false: 密码错误
 * &&& &nbsp;
 * &&& ^^^
 * &&& {
 * &&&   "code" : 200,
 * &&&   "message" : "",
 * &&&   "correct" : true
 * &&& }
 * &&& ^^^
 * ```
 *
 * @param {get} `[handles,]callback` 获取全部或指定店铺信息
 * @param {protecting} `password,callback` 提交店铺保护密码
 *
 */
},{"./base.js":5,"./expo.js":11,"./type-of.js":22}],22:[function(require,module,exports){
/* jshint ignore:start */

var toString = Object.prototype.toString

module.exports = function(val){
  switch (toString.call(val)) {
    case '[object Function]': return 'function'
    case '[object Date]': return 'date'
    case '[object RegExp]': return 'regexp'
    case '[object Arguments]': return 'arguments'
    case '[object Array]': return 'array'
    case '[object String]': return 'string'
  }

  if (typeof val == 'object' && val && typeof val.length == 'number') {
    try {
      if (typeof val.callee == 'function') return 'arguments';
    } catch (ex) {
      if (ex instanceof TypeError) {
        return 'arguments';
      }
    }
  }

  if (val === null) return 'null'
  if (val === undefined) return 'undefined'
  if (val && val.nodeType === 1) return 'element'
  if (val === Object(val)) return 'object'

  return typeof val
}

/* jshint ignore:end */
},{}],23:[function(require,module,exports){
var base = require('./base.js');
var expo = require('./expo.js');

var module = base('type', function(factory){
  factory.get();
});

exports.get = expo(module, 'get');

/**
 * 商品分类
 *
 * ```get
 * `` handle
 * &` 类型：String<br/>指定分类的handle
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "type" : {
 * &&&         "name" : "男装",
 * &&&         "handle" : "T000099"
 * &&&     },
 * &&&     "products" : [{ ... }, { ... }], // 含有这个分类的商品
 * &&&     "paging" : { ... } // 分页对象
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```getPoly1
 * `` config
 * &` 类型：Object
 * &&` ^^^search^^^ 类型：String 选填<br/>指定品牌包含的文字
 * &&` ^^^size^^^ 类型：Number 选填<br/>指定返回每页的数目
 * &&` ^^^page^^^ 类型：Number 选填<br/>指定返回分页页码
 * `` callback
 * &` 类型：Function( 返回对象 [查看详情](/development/s/543259c0e2931e235b00000b) )<br/>获取信息后的回调函数<br/>返回对象中包含分页对象 paging [查看详情](/development/s/5587c0b00abc3e41b300002d#-paging-)
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "types" : [{
 * &&&             "name" : "男装", // 分类名称
 * &&&             "handle" : "T000099"  // 分类 handle
 * &&&         }, {
 * &&&             "name" : "女装",  // 分类名称
 * &&&             "handle" : "t000126"  // 分类 handle
 * &&&         }
 * &&&     ],
 * &&&     "paging" : { ... }
 * &&& }
 * &&& ^^^
 * ```
 *
 * @param {get} `handle,callback` 获取指定分类
 * @param {getPoly1} `[config,]callback` 获取分类列表
 *
 */
},{"./base.js":5,"./expo.js":11}],24:[function(require,module,exports){
module.exports = function(sPath){
  //
  var sBase = '/api';
  var sVersion = '/v1';

  if(/^https?:\/\//.test(sPath)){
  	return sPath;
  }else{
  	return sBase + sVersion + '/' + sPath;
  }

};
},{}],25:[function(require,module,exports){
// 设置cookie
exports.setCookie = function(name, value, isForever, domain){
  var sDomain;
  if(domain){
    sDomain = ";domain=" + domain;
  }else{
    sDomain = "";
  }
  document.cookie = name + "=" + escape(value) + sDomain + (isForever?";expires="+  (new Date(2099,12,31)).toGMTString():"") + ";path=/";
};
// 获取cookie
exports.getCookie = function(sName){
  var sSearch = sName + "=";
  if(document.cookie.length > 0){
    offset = document.cookie.indexOf(sSearch);
    if(offset != -1){
      offset += sSearch.length;
      end = document.cookie.indexOf(";", offset);
      if(end == -1) end = document.cookie.length;
      return unescape(document.cookie.substring(offset, end));
    }
    else return "";
  }
};
// 获取图片url
exports.getImageUrl = function(image_id, image_name, image_size, image_epoch){
  if(!image_id || !image_name){
    var aDef = window.productImage.split('.');
    aDef[0] = aDef[0] + '_' + image_size;
    var sDef = aDef.join('.');
    var sPath = window.assetPath;
    if(!sPath){
      sPath = window.assetHost;
    }
    sDef = sPath + sDef;
    return sDef;
  }
  var sHost = window.assetHost;
  if(!sHost){
    sHost = window.assetPath;
  }
  sHost = sHost + image_id + '/';
  var sFileName = image_name;
  if(image_size){
    var aSplit = image_name.split('.');
    var nLen = aSplit.length;
    if(nLen > 1){
    // var sImageSize = '_' + image_size;
    // var sFileNotExt = aSplit[nLen - 2];
    // aSplit[nLen - 2] = sFileNotExt + sImageSize;
    // sFileName = aSplit.join('.');
    var sImageSize = 's_' + image_size;
    var sFileExtName = aSplit.pop();
    sFileName = sImageSize + '.' + sFileExtName;
    }else{
    //alert('文件没有后缀名？');
    }
  }
  sHost = sHost + sFileName;
  if(image_epoch){
    sHost = sHost + '?epoch=' + image_epoch;
  }
  return sHost;
};
//
exports.getProductUrl = function(sUrl, nWidth, nHeight){
  var sResUrl = sUrl;
  var aImgUrl = sUrl.split('.');
  var aExtName = ['jpg', 'jpeg', 'gif', 'png'];
  var nImgUrlLen = aImgUrl.length;
  var sExtName = aImgUrl[nImgUrlLen - 1];
  if(sExtName.indexOf('?') > -1){
    sExtName = sExtName.split('?')[0];
  }
  sExtName = sExtName.toLowerCase();
  $.each(aExtName, function(index, name){
    if(name == sExtName){
      aImgUrl[nImgUrlLen - 2] = aImgUrl[nImgUrlLen - 2] + '_' + nWidth + 'x' + nHeight;
      sResUrl = aImgUrl.join('.');
      return false;
    }
  });
  return sResUrl;
};
//
exports.getQuery = function(name, bNotEscape){
  var sUrl = window.location.search.substr(1);
  var r = sUrl.match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"));
  if(bNotEscape){
    return (r === null ? null : r[2]);
  }else{
    return (r === null ? null : unescape(r[2]));
  }
};
//
exports.setQuery = function( key , value , url ){
  var aHash = url.match(/#.*(\?|$)/ig);
  var sHash = '';
  if(aHash && aHash[0]){
    sHash = aHash[0];
    url = url.replace(sHash, '');
  }
  url = url || window.location.href;
  url = url.replace( new RegExp( '(^|\\?)' + key + '=[^&]*(&|$|#)' , 'g' ) , '?' );
  url = url.replace( new RegExp( '(^|&)' + key + '=[^&]*(?=&|$|#)' , 'g' ) , '' );
  var p = key + '=' + encodeURIComponent(value);
  var sUrl = url;
  if(!(/\?$/.test( url ))){
    sUrl = url + ( /\?/.test( url ) ? '&' : '?' );
  }
  return sUrl + p + sHash;
};
// //
// exports.JSONstringify = function(oJson){
//   if(typeof window.JSON != 'undefined'){
//     return JSON.stringify(oJson)
//   }else{
//     window.JSON = {};
//     JSON.stringify =function(obj){
//       var t = typeof (obj);
//       if (t != "object" || obj === null) {
//         if (t == "string") obj = '"'+obj+'"';
//         return String(obj);
//       }
//       else {
//         var n, v, json = [], arr = (obj && obj.constructor == Array);
//         for (n in obj) {
//           v = obj[n]; t = typeof(v);
//           if (t == "string") v = '"'+v+'"';
//           else if (t == "object" && v !== null) v = JSON.stringify(v);
//           json.push((arr ? "" : '"' + n + '":') + String(v));
//         }
//         return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
//       }
//     };
//     return JSON.stringify(oJson)
//   }
// };
//
exports.isEmail = function(sEmail){
  var rEmail = /([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})/i;
  return rEmail.test(sEmail);
};
//
exports.isMobile = function(sPhone){
  var rPhone = /^(13|14|15|17|18)\d{9}$/;
  return rPhone.test(sPhone);
};
//
exports.isUsername = function(sUsername){
  var rUsername = /^([a-z\u4e00-\u9fa5])[a-z0-9\u4e00-\u9fa5_-]{3,16}$/;
  return rUsername.test(sUsername);
};
//
exports.yuan = function(nFen){
  var nYuan = nFen / 100;
  return nYuan;
};
//
exports.inArray = function(){
  if(!Array.prototype.indexOf){
    Array.prototype.indexOf = function(elt, from){
      var len = this.length >>> 0;
      from = Number(arguments[1]) || 0;
      from = (from < 0) ? Math.ceil(from) : Math.floor(from);
      if (from < 0)
        from += len;

      for (; from < len; from++)
      {
        if (from in this &&
          this[from] === elt)
          return from;
      }
      return -1;
    };
  }
  return arguments[1].indexOf(arguments[0]);
};
//
exports.forEach = function (collection, callback, scope) {
  if (Object.prototype.toString.call(collection) === '[object Object]') {
    for (var prop in collection) {
      if (Object.prototype.hasOwnProperty.call(collection, prop)) {
        if(callback.call(scope, collection[prop], prop, collection) === false){
          break;
        }
      }
    }
  } else {
    for (var i = 0, len = collection.length; i < len; i++) {
      if(callback.call(scope, collection[i], i, collection) === false){
        break;
      }
    }
  }
};

/**
 * 实用工具集合
 *
 * ```setCookie
 * `` name
 * &` 类型：String<br/>需要设置的cookie名称。
 * `` value
 * &` 类型：String<br/>需要设置的cookie值。
 * `` isForever
 * &` 类型：Boolean ( 默认值：false )<br/>设置为true，cookie永不过期。
 * ```
 *
 * ```getCookie
 * `` name
 * &` 类型：String<br/>需要读取的cookie名称。
 * ```
 *
 * ```getImageUrl
 * `` image_id
 * &` 类型：String<br/>liquid图片对象的image_id。
 * `` image_name
 * &` 类型：String<br/>liquid图片对象的image_name。
 * `` image_size
 * &` 类型：String<br/>输出图片的尺寸大小，例如'300x300'。
 * `` image_epoch
 * &` 类型：String<br/>liquid图片对象的image_epoch。
 * ```
 *
 * ```getQuery
 * `` key
 * &` 类型：String<br/>需要获取的url参数名称。
 * ```
 *
 * ```setQuery
 * `` key
 * &` 类型：String<br/>需要设置的url参数名称。
 * `` value
 * &` 类型：String<br/>需要设置的url参数的值。
 * `` url
 * &` 类型：String<br/>需要设置参数的url。
 * ```
 *
 * ```inArray
 * `` element
 * &` 类型：String|Object<br/>需要检查的元素。
 * `` array
 * &` 类型：Array<br/>需要检查的数组。
 * ```
 *
 * ```forEach
 * `` collection
 * &` 类型：Array|Object<br/>需要遍历的数组或对象。
 * `` callback
 * &` 类型：Function( 单个元素 )<br/>回调函数，返回false可停止遍历。
 * `` scope
 * &` 类型：Object<br/>作用域。
 * ```
 *
 * @param {setCookie} `name,value[,isForever]` 设置cookie
 * @param {getCookie} `name` 读取cookie
 * @param {getImageUrl} `image_id,image_name,image_size,image_epoch` 将liquid输出的图片对象转换，返回图片url
 * @param {getQuery} `key` 获取url中search部分的参数
 * @param {setQuery} `key,value,url` 设置url中search部分的参数
 * @param {inArray} `element,array` 检查目标对象是否在数组中
 * @param {forEach} `collection,callback,scope` 遍历数组或对象中的所有元素
 *
 */
},{}],26:[function(require,module,exports){
var base = require('./base.js');
var expo = require('./expo.js');

var module = base('vendor', function(factory){
  factory.get();
});

exports.get = expo(module, 'get');

/**
 * 商品品牌
 *
 * ```get
 * `` handle
 * &` 类型：String<br/>指定品牌的handle
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "vendor" : {
 * &&&         "name" : "乡萘儿",
 * &&&         "handle" : "V000035"
 * &&&     },
 * &&&     "products" : [{ ... }, { ... }], // 含有这个品牌的商品
 * &&&     "paging" : { ... } // 分页对象
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```getPoly1
 * `` config
 * &` 类型：Object
 * &&` ^^^search^^^ 类型：String 选填<br/>指定品牌包含的文字
 * &&` ^^^size^^^ 类型：Number 选填<br/>指定返回每页的数目
 * &&` ^^^page^^^ 类型：Number 选填<br/>指定返回分页页码
 * `` callback
 * &` 类型：Function( 返回对象 [查看详情](/development/s/54325a1571ea1e560f00000d) )<br/>获取信息后的回调函数<br/>返回对象中包含分页对象 paging [查看详情](/development/s/5587c0b00abc3e41b300002d#-paging-)
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "vendors" : [{
 * &&&             "name" : "谷吃", // 品牌名称
 * &&&             "handle" : "V000036"  // 品牌 handle
 * &&&         }, {
 * &&&             "name" : "驴",  // 品牌名称
 * &&&             "handle" : "V000037"  // 品牌 handle
 * &&&         }
 * &&&     ],
 * &&&     "paging" : { ... }
 * &&& }
 * &&& ^^^
 * ```
 *
 * @param {get} `handle,callback` 获取指定品牌
 * @param {getPoly1} `[config,]callback` 获取品牌列表
 *
 */
},{"./base.js":5,"./expo.js":11}]},{},[15]);
