(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
var base = require('./base.js');
var util = require('./util.js');
var expo = require('./expo.js');

var aConfig = {
  current: {},
  login: {method: 'POST'},
  logout: {method: 'POST'},
  changePassword: {method: 'POST', url: 'change_password'},
  save: {method: 'POST'},
  registerWithEmail: {method: 'POST', url: 'register_with_email'},
  registerWithUsername: {method: 'POST', url: 'register_with_user_name'},
  registerWithMobile: {method: 'POST', url: 'register_with_mobile'},
  sendRegistValidateSms: {method: 'POST', url: 'send_regist_validate_sms'},
  sendResetValidateSms: {method: 'POST', url: 'send_reset_validate_sms'},
  resetPasswordWithMobile: {method: 'POST', url: 'reset_password_with_mobile'},
  resetPasswordWithEmail: {method: 'POST', url: 'reset_password_with_email'},
  checkRegistMobile: {method: 'POST', url: 'check_regist_mobile'},
  checkResetMobile: {method: 'POST', url: 'check_reset_mobile'},
  rewardPointDetails: {method: 'GET', url: 'reward_point_details'}
};

var module = base('account', function(factory){
  factory.createByConfig(aConfig);
});

util.forEach(aConfig, function(value, key){
  exports[key] = expo(module, key);
});

exports.register = function(param, callback){
  //
  switch(param.type){
    case 'email':
      module.registerWithEmail(param, callback);
      break;
    case 'mobile':
      module.registerWithMobile(param, callback);
      break;
    case 'uname':
      module.registerWithUsername(param, callback);
      break;
  }
  //
};


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
 * &&` ^^^real_name^^^ 类型：String<br/>真实姓名
 * &&` ^^^sex^^^ 类型：String<br/>性别，可选的值包括：
 * &&&&` nale: 男
 * &&&&` female: 女
 * &&&&` undefined: 保密
 * &&` ^^^birthday^^^ 类型：String<br/>生日，如"1926-08-17"
 * &&` ^^^indentity_card^^^ 类型：String<br/>身份证号码
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>更新后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：更新信息成功<br/>201：更新信息失败
 * &&` ^^^message^^^ 类型：String<br/>更新信息失败原因（当 code 为 201 时）
 * &&` ^^^customer^^^ 类型：Object<br/>更新后的用户信息 [查看详情](/development/s/5432566de2931e235b000003)
 * ```
 *
 * ```register
 * `` param
 * &` 类型：Object
 * &&` ^^^type^^^ 类型：String<br/>注册的账号类型，可选 type 包括：
 * &&&&` uname: 用户名
 * &&&&` email: 邮箱
 * &&&&` mobile: 手机号码
 * &&` ^^^account^^^ 类型：String<br/>用户名/邮箱/手机号码
 * &&` ^^^password^^^ 类型：String<br/>密码
 * &&` ^^^password_again^^^ 类型：String<br/>重复密码
 * &&` ^^^verify_code^^^ 类型：String 选填<br/>手机验证码，当 type 为^^^mobile^^^必须提供，使用 [sendRegistValidateSms](#-sendregistvalidatesms-param-callback-) 获取
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：注册成功<br/>201：注册失败
 * &&` ^^^message^^^ 类型：String<br/>注册失败原因（当 code 为 201 时）
 * &&` ^^^customer^^^ 类型：Object<br/>注册成功的用户信息 [查看详情](/development/s/5432566de2931e235b000003)
 * ```
 *
 * ```sendRegistValidateSms
 * `` param
 * &` 类型：Object
 * &&` ^^^mobile^^^ 类型：String<br/>中国大陆手机号码
 * &&` ^^^captcha_id^^^ 类型：String 选填<br/>验证码图片 id [获取验证码](/development/s/55b66f1d0abc3e746a000002)
 * &&` ^^^captcha_value^^^ 类型：String 选填<br/>验证码图片中显示的值 [获取验证码](/development/s/55b66f1d0abc3e746a000002)
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>更新后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：发送成功<br/>214：该操作需要验证码<br/>201：发送失败
 * &&` ^^^message^^^ 类型：String<br/>发送信息失败原因（当 code 为 201 时）
 * ```
 *
 * ```sendResetValidateSms
 * `` param
 * &` 类型：Object
 * &&` ^^^mobile^^^ 类型：String<br/>中国大陆手机号码
 * &&` ^^^captcha_id^^^ 类型：String 选填<br/>验证码图片 id [获取验证码](/development/s/55b66f1d0abc3e746a000002)
 * &&` ^^^captcha_value^^^ 类型：String 选填<br/>验证码图片中显示的值 [获取验证码](/development/s/55b66f1d0abc3e746a000002)
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>更新后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：发送成功<br/>214：该操作需要验证码<br/>201：发送失败
 * &&` ^^^message^^^ 类型：String<br/>发送信息失败原因（当 code 为 201 时）
 * ```
 *
 * ```resetPasswordWithMobile
 * `` param
 * &` 类型：Object
 * &&` ^^^account^^^ 类型：String<br/>需要重设密码的顾客手机号码账号
 * &&` ^^^password^^^ 类型：String<br/>密码
 * &&` ^^^password_again^^^ 类型：String<br/>重复密码
 * &&` ^^^verify_code^^^ 类型：String<br/>手机验证码，使用 [sendResetValidateSms](#-sendresetvalidatesms-param-callback-) 获取
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>更新后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：发送成功<br/>214：该操作需要验证码<br/>201：发送失败
 * &&` ^^^message^^^ 类型：String<br/>发送信息失败原因（当 code 为 201 时）
 * ```
 *
 * ```resetPasswordWithEmail
 * `` param
 * &` 类型：Object
 * &&` ^^^email^^^ 类型：String<br/>需要重置密码的邮箱地址
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>发送重置邮件后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：发送成功<br/>214：该操作需要验证码<br/>201：发送失败
 * &&` ^^^message^^^ 类型：String<br/>发送信息失败原因（当 code 为 201 时）
 * ```
 *
 * ```checkRegistMobile
 * `` param
 * &` 类型：Object
 * &&` ^^^mobile^^^ 类型：String<br/>中国大陆手机号码
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>请求后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：手机号码未注册，可以使用<br/>201：已注册或其他失败信息
 * &&` ^^^message^^^ 类型：String<br/>已注册或其他失败信息（当 code 为 201 时）
 * ```
 *
 * ```checkResetMobile
 * `` param
 * &` 类型：Object
 * &&` ^^^mobile^^^ 类型：String<br/>中国大陆手机号码
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>请求后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：手机号码已注册，可以重置密码<br/>201：手机号码尚未注册或其他失败信息
 * &&` ^^^message^^^ 类型：String<br/>201：手机号码尚未注册或其他失败信息（当 code 为 201 时）
 * ```
 *
 * ```rewardPointDetails
 * `` param
 * &` 类型：Object
 * &&` ^^^three_month_ago^^^ 类型：Boolean 选填<br/>三个月前的积分
 * &&` ^^^last_three_month^^^ 类型：Boolean 选填<br/>三个月内的积分
 * &&` ^^^size^^^ 类型：Number 选填<br/>指定返回每页的数目
 * &&` ^^^page^^^ 类型：Number 选填<br/>指定返回分页页码
 * &&` ^^^nopage^^^ 类型：String 选填<br/>指定是否分页
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>请求后的回调函数
 * &&` ^^^reward_point_total^^^ 类型：Number<br/>账户积分总数
 * &&` ^^^last_year_point^^^ 类型：Number<br/>账户上一年积分总数
 * &&` ^^^reward_point_details^^^ 类型：Array<br/>账户积分详细信息
 * &&` ^^^is_empty^^^ 类型：Boolean<br/>是否为空
 * &&` 返回对象中包含分页对象 paging [查看详情](/development/s/5587c0b00abc3e41b300002d#-paging-)
 * ```
 *
 * @param {current} `callback` 获取当前顾客信息
 * @param {login} `user,callback` 顾客登录
 * @param {logout} `callback` 顾客登出 （必须登录）
 * @param {changePassword} `password,callback` 顾客修改密码 （必须登录）
 * @param {save} `notify,callback` 更新顾客信息 （必须登录）
 * @param {register} `param,callback` 注册顾客账号
 * @param {sendRegistValidateSms} `param,callback` 顾客注册手机号码账号时，获取手机验证码
 * @param {sendResetValidateSms} `param,callback` 顾客找回手机号码账号密码时，获取手机验证码
 * @param {resetPasswordWithMobile} `param,callback` 重设手机号码账号密码
 * @param {resetPasswordWithEmail} `param,callback` 发送邮箱账号重置密码邮件
 * @param {checkRegistMobile} `param,callback` 检测手机是否未注册（多用于顾客注册手机号码账号时检测用）
 * @param {checkResetMobile} `param,callback` 检测手机是否已注册（用于顾客重设手机号码账号密码时检测用）
 * @param {rewardPointDetails} `param,callback` 获取当前账户积分详细信息
 *
 */
},{"./base.js":5,"./expo.js":14,"./util.js":32}],2:[function(require,module,exports){
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
 * &&` ^^^meta_fields^^^（选填） 类型：String<br/>序列化的地址拓展字段（JSON字符串），包含下列属性<br/><ul><li>`name`：String 类型，Metafield 的唯一字符串标识。仅支持小写字母、数字、中横和下划线，最多 200 个字符。</li><li>`description`：String 类型，Metafield 的说明，最多 2000 个字符。</li><li>`fields`：Object 类型，Metafield 的字段，Key-Value 结构对象。</li></ul>
 * &&& ^^^
 * &&& meta_fields = JSON.stringify({
 * &&&    name: 'information',
 * &&&    description: '清关信息',
 * &&&    fields: {
 * &&&        id_card: 123456
 * &&&    }
 * &&&})
 * &&& ^^^
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
 * &&` ^^^meta_fields^^^（选填） 类型：String<br/>序列化的地址拓展字段（JSON字符串），包含下列属性<br/><ul><li>`name`：String 类型，Metafield 的唯一字符串标识。仅支持小写字母、数字、中横和下划线，最多 200 个字符。</li><li>`description`：String 类型，Metafield 的说明，最多 2000 个字符。</li><li>`fields`：Object 类型，Metafield 的字段，Key-Value 结构对象。</li></ul>
 * &&& ^^^
 * &&& meta_fields = JSON.stringify({
 * &&&    name: 'information',
 * &&&    description: '清关信息',
 * &&&    fields: {
 * &&&        id_card: 123456
 * &&&    }
 * &&&})
 * &&& ^^^
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
},{"./base.js":5,"./expo.js":14,"./util.js":32}],3:[function(require,module,exports){
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

  var callbackName = 'jsonp' + (++jsonpID);
  if(options.jsonp){
    callbackName = options.jsonp;
  }
  //
  var script = document.createElement('script'),
    abort = function(){
      //todo: remove script
      //$(script).remove()
      if (callbackName in window) window[callbackName] = empty
      ajaxComplete('abort', xhr, options)
    },
    xhr = { abort: abort }, abortTimeout,
    head = document.getElementsByTagName("head")[0]
      || document.documentElement;

  if (options.error) script.onerror = function() {
    xhr.abort()
    options.error()
  }
  window[callbackName] = function(data){
    clearTimeout(abortTimeout)
      //todo: remove script
      //$(script).remove()
    // delete window[callbackName]
    if (callbackName in window) window[callbackName] = empty
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
},{"./type-of.js":29,"./util.js":32}],4:[function(require,module,exports){
var req = require('./request.js');
var type_of = require('./type-of.js');
var util = require('./util.js');

var sAreaDataVersion = '160315';
var sAreaDataHost = window.assetHost || '//asset.ibanquan.com/';  // 格式 //asset.ibanquan.com/
var sAreaDataUrl = sAreaDataHost + 'common/js/areadata-' + sAreaDataVersion + '.js';

var oAreaData = {};
var oLocalAreaData = null;

var localStorage =  window.localStorage;
var localStorageItemName = 'yhsd_areadata';


var getAreaData = function(callback){
	req.jsonp(sAreaDataUrl, {
		success: function(data){
			callback(data);
		},
		jsonp: 'yhsd_areadata_callback'
	});
};

var initAreaData = function(callback){
	oAreaData = getLocalAreaData();
	if(oAreaData){
		if(type_of(callback) === 'function'){
			callback();
		}
	}else{
		getAreaData(function(data){
			var oTmpData = JSON.parse(data);
			setLocalAreaData(oTmpData);
			oAreaData = oTmpData;
			if(type_of(callback) === 'function'){
				callback();
			}
		});
	}
};

var setLocalAreaData = function(data){
	try{
		if(localStorage){
			localStorage.setItem(localStorageItemName, JSON.stringify(data));
		}
	}catch(e){}
	oLocalAreaData = data; // safari 隐私模式不允许存localstorage，直接存内存里
};

var getLocalAreaData = function(){
	//
	if(!oLocalAreaData) {
		if(localStorage){
			var localItem = localStorage.getItem(localStorageItemName);
			//
			try{
				if(localItem){
					var areaJson = JSON.parse(localItem);
					if(areaJson.version === sAreaDataVersion){
						oLocalAreaData = areaJson;
					}
				}
			}catch(e){}
		}
	}
	//
	return oLocalAreaData;
};

var filterAreaData = function(data, whiteList){
	if(whiteList && type_of(whiteList) === 'array') {
		var _whiteList = whiteList.concat(),
			filteredData = [],
			i, j;
		for(i = 0; i < data.length; i++) {
			if(_whiteList.length === 0) {
				break;
			}
			for(j = 0; j < _whiteList.length; j++) {
				if(data[i][0] === _whiteList[j]) {
					filteredData.push(data[i]);
					_whiteList.splice(j, 1);
					break;
				}
			}
		}
		if(filteredData.length === 0) {
			return data;
		} else {
			return filteredData;
		}
	} else {
		return data;
	}
};

var areaFindNext = function(code, callback){
    var aFind = [];
    util.forEach(oAreaData.sub, function(oSub, idx){
      if(oSub[2] == code){
        aFind.push(oSub);
      }
    });
	//
	if(type_of(callback) === 'function'){
		callback(aFind);
	}
};

var areaFindPrev = function(code, callback){
	var oFind = {};
	util.forEach(oAreaData.sub, function(oSub, idx){
		if(oSub[0] == code){
			oFind.district = oSub;
			return false;
		}
	});
	//
	if(oFind.district){
		util.forEach(oAreaData.sub, function(oSub, idx){
			if(oSub[0] == oFind.district[2]){
				oFind.city = oSub;
				return false;
			}
		});
	}else{
		// 一个上级都查不到，是省份
		util.forEach(oAreaData.main, function(oSub, idx){
			if(oSub[0] == code){
				oFind.province = oSub;
				return false;
			}
		});
		//
		if(type_of(callback) === 'function'){
			callback(oFind);
			return;
		}
	}
	//
	if(!oFind.city){
		oFind.city = oFind.district;
		delete oFind.district;
	}
	//
	util.forEach(oAreaData.main, function(oSub, idx){
		if(oSub[0] == oFind.city[2]){
			oFind.province = oSub;
			return false;
		}
	});
	//
	if(type_of(callback) === 'function'){
		callback(oFind);
	}
};

exports.findNext = function(code, callback, whiteList){
	var args = arguments;
	initAreaData(function(){
		if(args.length > 1){
			areaFindNext(code, function(o){
				callback(filterAreaData(o, whiteList));
			});
		}
	});
};

exports.findPrev = function(code, callback){
	var args = arguments;
	initAreaData(function(){
		if(args.length == 2){
			areaFindPrev(code, function(o){
				callback(o);
			});
		}
	});
};

exports.getData = function(type, callback, whiteList){
	initAreaData(function(){
		if(type_of(callback) === 'function'){
			callback(filterAreaData(oAreaData[type], whiteList));
		}
	});
};

exports._setData = function(data) {
	setLocalAreaData(data);
};

exports.config = function (options) {
	if (options.areaDataUrl) {
		if (!options.areaDataVersion) {
			throw new Error('必须提供资源版本');
		}
		//
		sAreaDataUrl = options.areaDataUrl;
		sAreaDataVersion = options.areaDataVersion;
		oAreaData = {};
		oLocalAreaData = null;
	}
};

/**
 * 多级地区信息编码。<br/><br/>*主要使用在收货人地址地区选择，大部分web端实现形式为省、市、地区三级联动的下拉选择。*<br/>*SDK 中需要提交区域编码的接口（如：order.create 免登录下单中的 district_code），需使用本接口获取对应参数。*<br/>*部分地区(如：新疆石河子)可能存在没有二级（市）或者三级（地区）的选项，故最终选出的结果不一定拥有完整的三级结构。提交时，请使用最后一级的编码。*<br/><br/>接口中返回数据的层级关系：省（province） > 市（city） > 地区（district）
 *
 * ```findNext
 * `` code
 * &` 类型：String<br/>六位的地区编码。
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数。如果返回空数组，则当前传入地区编码已是最后一级。<br/>*传入无对应地区的六位编码，也会返回空数组。请保证传入编码的正确性。*
 * `` whiteList
 * &` 类型：Array<String><br/>地址白名单。<br/>*只需关注被允许区域的code，比如广东只允许深圳，只要填入深圳的code:440300。*<br/>*如果省份也只允许广东则要填入广东的code:440000，与填入code同级的区域会被自动过滤，要展示其他同级区域需手动填入。*<br/>*如果某一级没有填入code则会展示所有。*
 * ```
 *
 * ```findPrev
 * `` code
 * &` 类型：String<br/>六位的地区编码。
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数。如果返回空对象，则当前传入地区编码无对应地区。
 * &&& ^^^
 * &&& {
 * &&&     province : ["440000","广东",null],
 * &&&     city : ["440300","深圳","440000"],
 * &&&     district : ["440305","南山","440300"]
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```getData
 * `` type
 * &` 类型：String<br/>需要获取的地区信息类型。<br/>^^^main^^^ - 省级单位，包括直辖市等。对应地区信息中的省（province）<br/>^^^sub^^^ - 城市、地区等。对应地区信息中的市（city）、地区（district）
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>返回对应的地区信息列表
 * `` whiteList
 * &` 类型：Array<String><br/>地址白名单。<br/>*只需关注被允许区域的code，比如广东只允许深圳，只要填入深圳的code:440300。*<br/>*如果省份也只允许广东则要填入广东的code:440000，与填入code同级的区域会被自动过滤，要展示其他同级区域需手动填入。*<br/>*如果某一级没有填入code则会展示所有。*
 * ```
 *
 * ```config
 * `` options
 * &` 类型：Object<br/>配置选项（`0.0.21`版本添加，<b>默认无需配置</b>）：<br/>^^^areaDataUrl^^^ - 地址数据。文件格式为 `.js`，`jsonp` 方式加载，内容格式参照 //asset.ibanquan.com/common/js/areadata-160315.js<br/>^^^areaDataVersion^^^ - 地址版本号。如果指定了 areaDataUrl 则此项必填，用于缓存数据。
 * &&& ^^^
 * &&& // 示例：配置繁体地址库
 * &&& yhsd.ready(jssdk => {
 * &&&     jssdk.area.config({
 * &&&         areaDataUrl: '//asset.localtestasset.com/common/js/areadata-170807tc.js',
 * &&&         areaDataVersion: '170807tc'
 * &&&     })
 * &&& })
 * &&& ^^^
 * ```
 *
 * @param {findNext} `code,callback,whiteList` 获取当前 code 对应的下级地区信息
 * @param {findPrev} `code,callback` 获取当前 code 对应的地区信息与所有上级地区信息
 * @param {getData} `type,callback,whiteList` 获取完整地区数据
 * @param {config} `options` 配置地址数据
 *
 */
},{"./request.js":26,"./type-of.js":29,"./util.js":32}],5:[function(require,module,exports){
var core = require('./core.js');
var events = require('./events.js');
var util = require('./util.js');
var type_of = require('./type-of.js');
//
var _guid = (function() {
  function s4() {return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);}
  return function() { return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();};
})();
//
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

  factory.create = function(sKey, url, method, config){
    //
    var sGetTopic = sName + '.' + sKey;
    //
    url = ((url === false || url === undefined) ? sKey : url);
    if(sName !== 'shop'){
      url = sName + '/' + url;
    }
    //
    core.apiEvents(sGetTopic, url, method);
    //
    base.prototype[sKey] = function(){  // 方法调用时可以再次覆盖data,url,handle // requestConf, func, dataConf, urlFix, handleFix
      var self = this;
      // api接口封装，订阅时加入uuid，有uuid的事件，执行匹配对应guid和guid(pid为0)的订阅。保证api封装回调的唯一性，手动订阅能完整收到通知 15-11-06
      var guid = _guid();
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
        if (config && config.RESTful) {
          if (oPushlish.request && oPushlish.request.id) {
            oPushlish.urlModify = url.replace(/:[a-zA-Z_]+/, oPushlish.request.id);
            oPushlish.request = false;
          }
        }
        //
        // 免登录查询单个订单 兼容语法糖 get
        if(sName == 'order' && url == 'order/view'){
          var sOrderNo = oPushlish.request.handle;
          oPushlish.request = {
            'order_no': sOrderNo
          };
        }
        //
        if(sName == 'page_block' && url == 'page_block/view') {
          if(oPushlish.request && oPushlish.request.id) {
             oPushlish.urlModify = 'page_block/view/' + oPushlish.request.id;
             oPushlish.request = false;
          }
        }
      }
      oPushlish._scope = self;
      //
      oPushlish._unsubscribe = events.subscribe(sGetTopic + '.done', oCallback, 10, guid);
      oPushlish._pid = guid;
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

  factory.get = function(bCreateId){
    // 语法糖 给有 / 和 /view 两个路径 并且查询 handle的接口使用
    // bCreateId 创建 /view/:id 通过id查询的接口
    var self = this;
    self.create('one', 'view');
    self.create('list', '');
    //
    if(bCreateId) {
      self.create('id', 'view');
    }
    //
    base.prototype.get = function(requestConf, func, dataConf){

      var selfbase = this;
      //
      if(requestConf && requestConf.handle){
        selfbase.one.apply(selfbase, arguments);
      }else if(requestConf && requestConf.id) {
        selfbase.id.apply(selfbase, arguments);
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
},{"./core.js":10,"./events.js":13,"./type-of.js":29,"./util.js":32}],6:[function(require,module,exports){
var base = require('./base.js');
var expo = require('./expo.js');
var util = require('./util.js');

var aConfig = {
  tags : {url: 'tags'}
};

var module = base('blog', function(factory){
  factory.get();
  factory.createByConfig(aConfig);
});

exports.get = expo(module, 'get');

util.forEach(aConfig, function(value, key){
  exports[key] = expo(module, key);
});

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
 * &&` ^^^handles^^^ 类型：String 选填<br/>指定多个handle，以“,”分隔
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
 * ```tags
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "tags" : [{id: 3, name: "test"}]
 * &&& }
 * &&& ^^^
 * ```
 *
 * @param {get} `[handle,]callback` 获取单个轻博客
 * @param {getPoly1} `config,callback` 获取轻博客列表
 * @param {tags} `callback` 获取轻博客标签列表
 *
 */
},{"./base.js":5,"./expo.js":14,"./util.js":32}],7:[function(require,module,exports){
var Calculator = function() {
    var OrderCalculator = {
        item_amount: 0,
        shipment_amount: 0,
        discount_amount: 0,
        coupon_discount_amount: 0,
        level_discount_amount: 0,
        point_disocunt_amount: 0,
        final_amount: 0,
        //
        level_discount: 100,
        reward_point_exchange_ratio: 0,
        reward_point_limit: 0,
        reward_point_total: 0,
        reward_point_max: 0,
        reward_point_use: 0
    };
    var cache = null;
    //
    OrderCalculator.update = function(data) {
        var self = this;
        cache = null;
        $.each(data, function(key, value) {
            if(typeof value === 'number' && isFinite(value)) {
                self[key] = value;
            } else {
                console.log('Key: "' + key + '" Not Finite');
            }
        });
    };
    //
    OrderCalculator.calculate = function() {
        var final_amount = this.item_amount;
        // 优惠活动（不包括免邮） + 优惠券
        final_amount -= this.discount_amount;
        final_amount -= this.coupon_discount_amount;
        final_amount < 0 && (final_amount = 0); // jshint ignore:line
        // 会员等级优惠
        if(final_amount > 0 && this.level_discount < 100 && this.level_discount > 0) {
            this.level_discount_amount = Math.floor(final_amount * (100 - this.level_discount) / 100);
            final_amount -= this.level_discount_amount;
        } else {
            this.level_discount_amount = 0;
        }
        // 运费
        final_amount += this.shipment_amount;
        // 积分
        if(final_amount > 0 && this.reward_point_exchange_ratio > 0) {
            var point_disocunt_amount_limit = final_amount * this.reward_point_limit / 100;
            this.reward_point_max = Math.ceil(point_disocunt_amount_limit / this.reward_point_exchange_ratio);
            this.reward_point_max = Math.min(this.reward_point_max, this.reward_point_total);
            this.reward_point_use = Math.min(this.reward_point_max, Math.max(this.reward_point_use, 0));
            this.point_disocunt_amount = Math.min(this.reward_point_use * this.reward_point_exchange_ratio , point_disocunt_amount_limit);
            final_amount -= this.point_disocunt_amount;
        } else {
            this.reward_point_max = 0;
            this.reward_point_use = 0;
        }
        this.final_amount = final_amount;
    };
    //
    OrderCalculator.get = function(callback) {
        if(!cache) {
            this.calculate();
            cache = {
                item_amount:                 this.item_amount,
                shipment_amount:             this.shipment_amount,
                discount_amount:             this.discount_amount,
                coupon_discount_amount:      this.coupon_discount_amount,
                level_discount_amount:       this.level_discount_amount,
                point_disocunt_amount:       this.point_disocunt_amount,
                final_amount:                this.final_amount,
                //
                level_discount:              this.level_discount,
                reward_point_exchange_ratio: this.reward_point_exchange_ratio,
                reward_point_limit:          this.reward_point_limit,
                reward_point_total:          this.reward_point_total,
                reward_point_max:            this.reward_point_max,
                reward_point_use:            this.reward_point_use
            };
        }
        if(callback) {
            callback(cache);
        } else {
            return cache;
        }
    };
    //
    OrderCalculator.help = function() {
        console.log('item_amount: 商品总金额');
        console.log('shipment_amount: 运费总金额');
        console.log('discount_amount: 不含免邮的优惠活动折扣金额');
        console.log('coupon_discount_amount: 优惠券折扣金额');
        console.log('level_discount_amount: 会员等级折扣金额');
        console.log('point_disocunt_amount: 积分抵现金额');
        console.log('final_amount: 实付金额');
        console.log('level_discount: 会员等级折扣比例');
        console.log('reward_point_exchange_ratio: 1积分兑换的金额');
        console.log('reward_point_limit: 积分兑换上限');
        console.log('reward_point_total: 顾客积分总额');
        console.log('reward_point_max: 顾客可使用积分上限');
        console.log('reward_point_use: 顾客使用的积分');
    };
    return {
        update: function(data) {
            OrderCalculator.update(data);
        },
        get: function(callback) {
            return OrderCalculator.get(callback);
        },
        help: function() {
            OrderCalculator.help();
        }
    };
};

exports = module.exports = Calculator;
},{}],8:[function(require,module,exports){
var req = require('./request.js');
var events = require('./events.js');
var type_of = require('./type-of.js');

var sModuleName = 'captcha';

var fetchFunc = exports.fetch = function(callback){
  //
  var sFetchUrl = window.captchaPath || '//captcha.ibanquan.com';
  //
  var sTopic = sModuleName + '.fetch';
  var sTopicDone = sTopic + '.done';
  //
  var s_done;
  var s_done_pid = new Date().getTime();
  var bHasCallback = type_of(callback) === 'function';
  // 当有回调函数时，才自行监听后回调然后销毁
  if(bHasCallback){
    s_done = events.subscribe(sTopicDone, function(o){
      callback(o);
    }, 10, s_done_pid);
  }
  //
  var s = events.subscribe(sTopic, function(o){
    var oPublish = {
      id: o.id,
      src: sFetchUrl + o.path
    };
    if(bHasCallback){
      events.publish(sTopicDone, oPublish, function(){
        s_done.unsubscribe();
      }, s_done_pid);
    }
    events.publish(sTopicDone, oPublish);
  });
  //
  req.jsonp(sFetchUrl, {
    success: function(o){
      events.publish(sTopic, o);
      s.unsubscribe();
    },
    error: function(){
      events.publish('request.error', {
        topic: sTopic
      });
      s.unsubscribe();
    }
  });
};

var s_auto;

var autoFetch = exports.autoFetch = function(isAuto){
  var bAuto = (isAuto !== false) ? true : false;
  if(bAuto){
    if(!s_auto){
      s_auto = events.subscribe('api.needCaptcha', fetchFunc);
    }
  }else{
    s_auto.unsubscribe();
  }
};

autoFetch();

/**
 * 图片验证码
 *
 * ```fetch
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取新图片验证码的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：获取成功
 * &&` ^^^message^^^ 类型：String<br/>获取信息失败原因
 * &&` ^^^id^^^ 类型：String<br/>验证码 id
 * &&` ^^^src^^^ 类型：String<br/>验证码图片路径
 * ```
 *
 * ```autoFetch
 * `` isAuto
 * &` 类型：Boolean<br/>当有需要时，自动获取图片验证码信息，需自行订阅 "captcha.fetch.done" 事件处理
 * &&` ^^^true^^^ 启用自动获取，默认值
 * &&` ^^^false^^^ 停用自动获取
 * &&& ^^^javascript
 * &&& yhsd.ready(function(jssdk){
 * &&&     // 订阅 "captcha.fetch.done" 事件
 * &&&     jssdk.events.subscribe('captcha.fetch.done', function(o){
 * &&&         // 获取到了图片验证码内容 {id: "xxxx", src: "//xxx.com/image/xxx.png"}
 * &&&         console.log(o);
 * &&&     });
 * &&& }
 * &&& ^^^
 * ```
 *
 * @param {fetch} `callback` 获取图片验证码
 * @param {autoFetch} `isAuto` 启用/停用自动获取图片验证码
 *
 */
},{"./events.js":13,"./request.js":26,"./type-of.js":29}],9:[function(require,module,exports){
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
  multiRemove: {method: 'POST', url: 'multi_remove'},
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
  multiRemove: 'multiRemove',
  removeOne: 'removeOne',
  removeAll: 'removeAll'
};

util.forEach(oLocalCartMap, function(value, key){
    //
  exports[key] = function(oParam, oCall){
    //
    var oLocalCartParam, oCallback;
    // 兼容不需要传入 oParam 的方法
    switch(key){
      case 'checkAll':
      case 'unCheckAll':
      case 'removeAll':
        oLocalCartParam = {};
        oCallback = oParam;
        break;
      default:
        oLocalCartParam = oParam;
        oCallback = oCall;
    }
    //
    module[key](oLocalCartParam, function(o){
      var res = o.res;
      var args = [];
      switch(res.code){
        case 200:
          break;
        case 212:
          switch(key){
            case 'add':
              args.push({
                item: oLocalCartParam
              });
              break;
            case 'quantity':
              delete oLocalCartParam.is_check;
              args.push({
                item: oLocalCartParam,
                is_set: true
              });
              break;
            case 'checkOne':
              oLocalCartParam.is_check = true;
              args.push({
                item: oLocalCartParam
              });
              break;
            case 'unCheckOne':
              oLocalCartParam.is_check = false;
              args.push({
                item: oLocalCartParam
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
                item: oLocalCartParam
              });
              break;
            case 'removeAll':
              // 不需参数
              break;
            case 'multiRemove':
              args.push({
                items: oLocalCartParam
              });
              break;
            default:
              args.push(oLocalCartParam);
          }
          localCart[value].apply(localCart, args);
          break;
        default:
          events.publish('cart.' + key + '.fail', {
            res: o,
            data: 'fail'
          });
      }
      if(oCallback){
        // o.result = 'localcart.' + key + '.success';
        oCallback(o);
      }
    }, false, false, {
      'code212': function(o){
        return o;
      }
    });
  };
  //
  exports.withinShipments = expo(module, 'withinShipments');
  exports.mustShipping = expo(module, 'mustShipping');
  //
});



/**
 * 购物车。当顾客尚未登录时，自动使用基于 cookie 的本地购物车
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
 * &&` ^^^quantity^^^ 类型：Number<br/>商品数量
 * &&` ^^^is_check^^^ 类型：Boolean<br/>选中该商品，一般都使用^^^true^^^
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
 * ```multiRemove
 * `` items
 * &` 类型：Object
 * &&` ^^^variant_ids^^^ 类型：Array[Number]<br/>商品价格的id组成的数组
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
 * @param {multiRemove} `items,callback` 删除购物车中的多个商品
 * @param {withinShipments} `param,callback` 获取带有物流信息的购物车（必须登录）
 * @param {withinShipmentsPoly1} `param,callback` 获取带有物流信息的购物车（未登录下单）
 * @param {mustShipping} `callback` 检查购物车是否需要物流
 *
 */
},{"./base.js":5,"./events.js":13,"./expo.js":14,"./localcart.js":17,"./util.js":32}],10:[function(require,module,exports){
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
      _mixin(oPostData, conf.request);  // 使用 conf.request 来覆盖原有请求参数
    }
    if(conf && conf.urlModify){
      url = conf.urlModify; // 使用 conf.urlModify 参数,在 publish的时候动态修改url
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
        var oCustomHandle;
        if(conf && conf.customHandle){
          oCustomHandle = conf.customHandle;
        }
        //
        oRes = handle(oResponse, oCustomHandle);
        if(oRes){
          events.publish(topic + '.done', oResponse, function(){
            if(conf._unsubscribe){
              conf._unsubscribe.unsubscribe();
            }
          }, conf._pid || 0);
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
},{"./events.js":13,"./handle.js":16,"./request.js":26,"./util.js":32}],11:[function(require,module,exports){
var base = require('./base.js');
var expo = require('./expo.js');
var util = require('./util.js');

var aConfig = {
    get: {url: ''},
    verify: {url: 'verify'},
    shopCoupon: {url: 'draw/:export_uuid', config: {RESTful: true}},
    getShopCoupon: {url: 'draw/:export_uuid/get', config: {RESTful: true}},
    count: {}
};

var module = base('coupon', function(factory){
  //
  factory.createByConfig(aConfig);
  //
});

util.forEach(aConfig, function(value, key){
  exports[key] = expo(module, key);
});

/**
 * 优惠券
 *
 * ```get
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数。
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "coupons" : [
 * &&&         {
 * &&&             "id": 15,
 * &&&             "code": "6PMAB5", // 优惠券代码
 * &&&             "coupon_group_name": "新春大促！100元减20元优惠券", // 优惠券名称
 * &&&             "active_amount": 10000, // 满足使用该优惠券的金额，满100元
 * &&&             "discount_amount": 2000, // 使用该优惠券之后减免的金额，减免20元
 * &&&             "cart_match": false, // 当前购物车内的商品是否能使用该优惠券
 * &&&             "status": "expired" // 优惠券状态：expired(过期)，used(已使用)，pending(可使用)
 * &&&         },
 * &&&         {
 * &&&             "id": 556508,
 * &&&             "code": "CDECAMD3F3",
 * &&&             "coupon_group_name": "5毛抵用券！",
 * &&&             "active_amount": 0, // 满0元
 * &&&             "discount_amount": 50, // 减免5毛
 * &&&             "cart_match": true,
 * &&&             "status": "used"
 * &&&         },
 * &&&         {
 * &&&             "id": 537725,
 * &&&             "code": "BPDJ8Q",
 * &&&             "coupon_group_name": "10元优惠券",
 * &&&             "active_amount": 10300,
 * &&&             "discount_amount": 10000,
 * &&&             "cart_match": false,
 * &&&             "status": "pending"
 * &&&         }
 * &&&     ]
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```verify
 * `` code
 * &` 类型：Object
 * &&` ^^^coupon_code^^^ 类型：String<br/>优惠券代码
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数。
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "avail": true, // 优惠券是否可用
 * &&&     "discount_amount": 50 // 优惠券面值
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```shopCoupon
 * `` code
 * &` 类型：Object
 * &&` ^^^id^^^ 类型：String<br/>优惠券领取id，优惠券领取链接的最后一节:<br /> http:&nbsp;//example.youhaovip.com/coupon/ **013aef9cd68f42038b78e5502cc75088**
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数。
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "coupon_group": {}, // 优惠券信息
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```getShopCoupon
 * `` code
 * &` 类型：Object
 * &&` ^^^id^^^ 类型：String<br/>优惠券领取id，优惠券领取链接的最后一节:<br /> http:&nbsp;//example.youhaovip.com/coupon/ **013aef9cd68f42038b78e5502cc75088**
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数。
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "领取成功",
 * &&&     "coupon": {}, // 优惠券信息
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```count
 * `` config
 * &` 类型：Object
 * &&` ^^^status^^^ 类型：Number 必填<br/>指定优惠券状态，`1`为可使用
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * @param {get} `callback` 获取当前账号绑定的优惠券
 * @param {verify} `code,callback` 验证优惠码对于当前购物车是否可用
 * @param {shopCoupon} `code,callback` 获取指定可领取优惠券的信息
 * @param {getShopCoupon} `code,callback` 领取指定优惠券
 * @param {count} `[config,]callback` 获取指定状态优惠券的数量
 *
 */
},{"./base.js":5,"./expo.js":14,"./util.js":32}],12:[function(require,module,exports){
var base = require('./base.js');
var expo = require('./expo.js');
var util = require('./util.js');

var aConfig = {
    matchCart: {url: 'match/cart'},
    matchProduct: {url: 'match/product'}
};

var module = base('discount', function(factory){
  //
  factory.createByConfig(aConfig);
  //
});

util.forEach(aConfig, function(value, key){
  exports[key] = expo(module, key);
});

/**
 * 营销活动
 *
 * ```matchCart
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "discounts": [
 * &&&         {
 * &&&             "id": "836",
 * &&&             "name": "满减：购买达到一定金额，得到减免金额",
 * &&&             "handle": "d000613",
 * &&&             "page_url": "/discounts/d000613",
 * &&&             "discount_type": "amount_off", // 营销活动类型：amount_off(满减)，percent_off(满折)，coupon(满赠券)
 * &&&             "discount_amount": 100, // 减免金额
 * &&&             "match_item_amount": 800, // 当前满足此优惠的商品总价(非购物车总价)
 * &&&             "coupon_group_id": 0,
 * &&&             "range_type": "partial", // 营销活动范围：entire(全部商品)，partial(部分商品，商品列表查询 range_products 字段)
 * &&&             "range_products": [89],
 * &&&             "active_type": "entire", // 营销活动对象：entire(全部顾客)，customer_level(指定顾客等级)，partial(部分顾客)，first_trade(首次下单顾客)
 * &&&             "details": [ // 当前 discount_type 为 amount_off (满折)时，优惠规则为：
 * &&&                {
 * &&&                    "active_amount": 1200, // 满12元
 * &&&                    "discount_amount": 300 // 减3元
 * &&&                },
 * &&&                {
 * &&&                    "active_amount": 1000, // 满10元
 * &&&                    "discount_amount": 200 // 减2元
 * &&&                },
 * &&&                {
 * &&&                    "active_amount": 800,	 // 满8元
 * &&&                    "discount_amount": 100 // 减1元
 * &&&                }
 * &&&            ]
 * &&&         },
 * &&&         {
 * &&&             "id": "835",
 * &&&             "name": "满折：购买达到一定金额，得到优惠折扣",
 * &&&             "handle": "d000614",
 * &&&             "page_url": "/discounts/d000614",
 * &&&             "discount_type": "percent_off", // 营销活动类型：amount_off(满减)，percent_off(满折)，coupon(满赠券)
 * &&&             "discount_amount": 180, // 计算优惠折扣后，减免的金额。match_item_amount * (100 - discount_percent) / 100 = 900 * (100 - 80) / 100 = 180
 * &&&             "match_item_amount": 900, // 当前满足此优惠的商品总价(非购物车总价)
 * &&&             "coupon_group_id": 0,
 * &&&             "range_type": "entire", // 营销活动范围：entire(全部商品)，partial(部分商品，商品列表查询 range_products 字段)
 * &&&             "range_products": [],
 * &&&             "active_type": "entire", // 营销活动对象：entire(全部顾客)，customer_level(指定顾客等级)，partial(部分顾客)，first_trade(首次下单顾客)
 * &&&             "details": [ // 当前 discount_type 为 percent_off (满折)时，优惠规则为：
 * &&&                {
 * &&&                    "active_amount": 1200, // 满12元
 * &&&                    "discount_percent": 60 // 打6折
 * &&&                },
 * &&&                {
 * &&&                    "active_amount": 1000, // 满10元
 * &&&                    "discount_percent": 70 // 打7折
 * &&&                },
 * &&&                {
 * &&&                    "active_amount": 800,	 // 满8元
 * &&&                    "discount_percent": 80 // 打8折
 * &&&                }
 * &&&            ]
 * &&&         },
 * &&&         {
 * &&&             "id": "839",
 * &&&             "name": "满赠券：购买达到一定金额，赠送购物优惠券",
 * &&&             "handle": "d000639",
 * &&&             "page_url": "/discounts/d000639",
 * &&&             "discount_type": "coupon", // 营销活动类型：amount_off(满减)，percent_off(满折)，coupon(满赠券)
 * &&&             "discount_amount": 0, // 无减免金额
 * &&&             "match_item_amount": 900, // 当前满足此优惠的商品总价(非购物车总价)
 * &&&             "coupon_group_id": 288,
 * &&&             "range_type": "entire", // 营销活动范围：entire(全部商品)，partial(部分商品，商品列表查询 range_products 字段)
 * &&&             "range_products": [],
 * &&&             "active_type": "entire", // 营销活动对象：entire(全部顾客)，customer_level(指定顾客等级)，partial(部分顾客)，first_trade(首次下单顾客)
 * &&&             "details": [ // 当前 discount_type 为 coupon (满折)时，优惠规则为：
 * &&&                {
 * &&&                    "active_amount": 4000, // 满足赠送优惠券的金额
 * &&&                    "coupon_group_id": 287,
 * &&&                    "coupon_group_name": "圣诞节大促！满40元送20元抵用券！",
 * &&&                    "coupon_discount_amount": 2000  // 优惠券面值
 * &&&                },
 * &&&                {
 * &&&                    "active_amount": 800, // 满足赠送优惠券的金额
 * &&&                    "coupon_group_id": 288,
 * &&&                    "coupon_group_name": "平安夜大促！满8元送3元抵用券！",
 * &&&                    "coupon_discount_amount": 300  // 优惠券面值
 * &&&                }
 * &&&            ]
 * &&&         }
 * &&&     ]
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```matchProduct
 * `` handle
 * &` 类型：String<br/>指定商品的handle。
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数。
 * ```
 *
 * @param {matchCart} `callback` 获取当前购物车满足条件的营销活动
 * @param {matchProduct} `handle,callback` 获取指定商品相关的营销活动
 *
 */
},{"./base.js":5,"./expo.js":14,"./util.js":32}],13:[function(require,module,exports){
var util = require('./util.js');
var log = require('./log.js');

var events = {
  messages : {},
  subscribe: function(topic, func, priority, pid){
    var self = this;
    var nPid = pid || 0;
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
    var oCallBackConfig = {
      execute: func,
      pid: nPid
    };
    var nFuncIndex = -1;
    if(aPriorityList){
      if(util.inArray(oCallBackConfig, aPriorityList) === - 1){ // 只允许绑定一个相同函数
        aPriorityList.push(oCallBackConfig);
        nFuncIndex = aPriorityList.length - 1;
        log({subscribe: topic, priority: nPriority, sort: nFuncIndex, pid: nPid},"background:#ccc");
      }else{
        log({subscribe: topic, priority: nPriority, sort: '重复监听，忽略', pid: nPid}, "color:red");
      }
    }
    return {
      unsubscribe : function(){
        // 如果有 pid 可能非顺序订阅执行，需要将数组对应项目置空
        if(nPid){
          log({unsubscribe: topic, priority: nPriority, sort: nFuncIndex, pid: nPid},"color:#fff;background:#333");
          if(aPriorityList[nFuncIndex]){
            aPriorityList[nFuncIndex] = null;
          }
          return;
        }
        if(nFuncIndex !== -1){
          log({unsubscribe: topic, priority: nPriority, sort: nFuncIndex, pid: nPid},"color:#fff;background:#333");
          aPriorityList.splice(nFuncIndex, 1);
          nFuncIndex = -1;
        }
      }
    };
  },
  publish : function(topic, data, done, pid){
    var self = this;
    var nPid = pid || 0;
    if(typeof topic !== 'string'){
      return;
    }
    data = data ? data : {};
    var sTopicEncode = encodeURIComponent(topic);
    var aMainList = self.messages[sTopicEncode];
    //
    log({published: topic, pid: nPid}, "color:yellow;background:#000");
    //
    if(typeof aMainList === 'undefined'){
      return;
    }
    var scope = data._scope || this;
    var bNext = true;
    util.forEach(aMainList, function(aPriorityList, nPriority){
      if(aPriorityList){
        util.forEach(aPriorityList, function(oSub, nFuncIndex){
          if(oSub && oSub.execute){// 有传pid，就执行对应pid。pid为0 就执行全部 包括有pid
            if(oSub.pid && nPid){ // 监听的事件有pid 并且有传入指定pid
              if(oSub.pid !== nPid){
                log({exec: topic, priority: nPriority, sort: nFuncIndex, 'continue': 'true', pid: oSub.pid, pass: 'true'}, "color:gray");
                return true; // 不执行
              }
            }
            try{
              bNext = oSub.execute.call(scope, data);
            }catch(e){
              log({'exec-error': topic, priority: nPriority, sort: nFuncIndex, 'continue': 'true', pid: oSub.pid, pass: 'true', error: e}, "color:red");
            }
            if(bNext !== false){
              bNext = true;
            }
            log({exec: topic, priority: nPriority, sort: nFuncIndex, 'continue': bNext, pid: nPid}, "color:blue");
            return bNext;
          }
        });
        return bNext;
      }
    });
    if(done){
      done();
    }
  }
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
 * &` 类型：Number ( 默认值：10 )<br/>回调函数执行的优先级，SDK默认的优先级为10，如果要先于默认回调执行，请使用1~9的优先级，如果要后于默认回调执行，请大于10的优先级。
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
},{"./log.js":18,"./util.js":32}],14:[function(require,module,exports){
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
  		}, true); // 第三个参数兼容ie8，arguments传入forEach参数之后type变为object，导致无法遍历。设置为true，强制声明传入 argument
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
},{"./type-of.js":29,"./util.js":32}],15:[function(require,module,exports){
var base = require('./base.js');
var expo = require('./expo.js');
var util = require('./util.js');

var aConfig = {
    get: {
      url: '../account/favorite'
    },
    create: {
      url: '../account/favorite/create',
      method: 'POST'
    },
    delete: {
      url: '../account/favorite/delete',
      method: 'POST'
    }
};

var module = base('favorite', function (factory) {
  //
  factory.createByConfig(aConfig);
  //
});

util.forEach(aConfig, function(value, key){
  exports[key] = expo(module, key);
});

/**
 * 订单
 *
 * ```get
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * ```
 *
 * ```create
 * `` favorite
 * &` 类型：Object
 * &&` ^^^favorite_id^^^（必填） 类型：Number<br/>收藏对象 id
 * &&` ^^^id_type^^^（必填） 类型：Number<br/>收藏对象类型，0 商品 1 文章 2 博客
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```delete
 * `` favorite
 * &` 类型：Object
 * &&` ^^^id^^^（必填） 类型：Number<br/>收藏对象 id
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * @param {get} `order_no,callback` 获取指定订单
 * @param {create} `order,callback` 提交订单 （必须登录）
 * @param {cancel} `order,callback` 取消指定订单
 *
 */

},{"./base.js":5,"./expo.js":14,"./util.js":32}],16:[function(require,module,exports){
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
  //
  var customRes;
  var fCustomHandle = function(){
    var bHandleByCustom = false;
    if(oHandle && oHandle['code' + nCode]){
      bHandleByCustom = true;
      customRes = oHandle['code' + nCode](oRes);
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
      //case 204:
      //  fAlertMessage('needLogin');
      //  break;
      case 205:
        fAlertMessage();
        return oRes;
      case 207:
        fAlertMessage('liquidError');
        break;
      case 212: // 未登录
        fAlertMessage('needLogin');
        break;
      case 214: // 需要验证码
        fAlertMessage('needCaptcha');
        return oRes;
      case 308:
        return oRes;
      case 500:
        fAlertMessage('serverError');
        break;
      default:
        fAlertMessage();
    }
  }else{
    return customRes;
  }
};
},{"./events.js":13}],17:[function(require,module,exports){
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
        if(typeof oItem.is_check !== 'undefined'){
          oEach.is_check = oItem.is_check;
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
  },
  multiRemove : function(oPublish){
    var self = this;
    self.get(); // 获取cartData
    var aCart = self.cart || [];
    //
    var oParam  = getParam(oPublish, 'items');
    var aRemovedCart = [];
    util.forEach(aCart, function(oEach, index){
      var is_match = false;
      util.forEach(oParam.variant_ids, function(variant_id) {
        if(oEach.variant_id === variant_id){
          is_match = true;
        }
      });
      if(!is_match){
        aRemovedCart.push(oEach);
      }
    });
    self.set({
      cart: aRemovedCart
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
exports.multiRemove = expo(module, 'multiRemove');
},{"./base.js":5,"./expo.js":14,"./util.js":32}],18:[function(require,module,exports){
var util = require('./util.js');

module.exports = function(info, option){
  if(window.yhsdDebug){
    var sLog = '';
    util.forEach(info, function(value, key){
      var sEachLog = key + ':' + value + '  ';
      sLog = sLog + sEachLog;
    });
    if(console && console.log){
    	if(option){
    		console.log('%c' + sLog, option);
    	}else{
    		console.log(sLog);
    	}
    }
  }
};
},{"./util.js":32}],19:[function(require,module,exports){
var req = require('./request.js');
var handle = require('./handle.js');
var events = require('./events.js');
var util = require('./util.js');
var type_of = require('./type-of.js');
var captcha = require('./captcha.js');
var version = require('./version.js');

var version = version.get();

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

var aInitModule = ['account', 'area', 'address', 'blog', 'cart', 'shop', 'order', 'page', 'payment_method', 'product', 'type', 'vendor', 'discount', 'coupon', 'reward_point', 'page_block', 'post', 'favorite'];

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
	if('ajaxToken' in window) {
		jssdkInit();
	} else {
		Object.defineProperty(window, 'ajaxToken', {
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
},{"./account.js":1,"./address.js":2,"./area.js":4,"./blog.js":6,"./captcha.js":8,"./cart.js":9,"./coupon.js":11,"./discount.js":12,"./events.js":13,"./favorite.js":15,"./handle.js":16,"./order.js":20,"./page.js":21,"./page_block.js":22,"./payment_method.js":23,"./post.js":24,"./product.js":25,"./request.js":26,"./reward_point.js":27,"./shop.js":28,"./type-of.js":29,"./type.js":30,"./util.js":32,"./vendor.js":33,"./version.js":34}],20:[function(require,module,exports){
var base = require('./base.js');
var expo = require('./expo.js');
var util = require('./util.js');

var aConfig = {
    receive: {},
    create: {method: 'POST'},
    cancel: {method: 'POST'},
    count: {}
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
 * &&` ^^^order_nos^^^ 类型：String 选填<br/>指定多个订单编号，以“,”分隔
 * &&` ^^^shipment_status^^^ 类型：Number 选填<br/>指定物流状态，<br/>0 - 未发货<br/>1 - 已发货<br/>2 - 已签收<br/>3 - 部分发货
 * &&` ^^^payment_status^^^ 类型：Number 选填<br/>指定物流状态，<br/>0 - 未付款<br/>1 - 货到付款（已弃用，统一为 2）<br/>2 - 付款成功<br/>3 - 付款超时
 * &&` ^^^size^^^ 类型：Number<br/>指定返回每页的数目
 * &&` ^^^page^^^ 类型：Number<br/>指定返回分页页码
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数<br/>返回对象中包含分页对象 paging [查看详情](/development/s/5587c0b00abc3e41b300002d#-paging-)
 * ```
 *
 * ```receive
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
 * &&` ^^^coupon_code^^^（选填） 类型：String<br/>优惠券编码
 * &&` ^^^reward_point^^^（选填） 类型：Number<br/>使用的积分数量
 * &&` ^^^meta_fields^^^（选填） 类型：Json<br/>拓展订单对象数据Json对象，参考 [Metafields API](/app/s/553e347e0abc3e6f3e000038)
 * &&&&` `name`（必填） 类型：String<br/>Metafield 的唯一字符串标识<br/>特殊值`order_attributes`，此时`fields`内的键值对将会展示在“管理后台-订单详情-附加信息”里
 * &&&&` `description`（必填） 类型：String<br/>Metafield 的说明，最多 2000 个字符
 * &&&&` `fields`（必填） 类型：Object<br/>Metafield 的字段，Key-Value 结构对象
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
 * &&` ^^^coupon_code^^^（选填） 类型：String<br/>优惠券编码
 * &&` ^^^reward_point^^^（选填） 类型：Number<br/>使用的积分数量
 * &&` ^^^meta_fields^^^（选填） 类型：Json<br/>拓展订单对象数据Json对象，参考 [Metafields API](/app/s/553e347e0abc3e6f3e000038)
 * &&&&` `name`（必填） 类型：String<br/>Metafield 的唯一字符串标识<br/>特殊值`order_attributes`，此时`fields`内的键值对将会展示在“管理后台-订单详情-附加信息”里
 * &&&&` `description`（必填） 类型：String<br/>Metafield 的说明，最多 2000 个字符
 * &&&&` `fields`（必填） 类型：Object<br/>Metafield 的字段，Key-Value 结构对象
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
 * ```count
 * `` config
 * &` 类型：Object
 * &&` ^^^shipment_status^^^ 类型：Number 选填<br/>指定物流状态，取值参考 [order.get([config,] callback)](#-get-config-callback-)
 * &&` ^^^payment_status^^^ 类型：Number 选填<br/>指定物流状态，取值参考 [order.get([config,] callback)](#-get-config-callback-)<br/>例如：<br/>^^^payment_status=0^^^ - 待付款 <br/>^^^payment_status=2&shipment_status=0,3^^^ - 待发货<br/>^^^shipment_status=1^^^ - 待收货
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * @param {get} `order_no,callback` 获取指定订单
 * @param {getPoly1} `[config,]callback` 获取订单列表
 * @param {receive} `order,callback` 指定订单的指定运单确认收货
 * @param {create} `order,callback` 提交订单 （必须登录）
 * @param {createPoly1} `order,callback` 匿名提交订单（免登录下单），默认使用离线购物车
 * @param {cancel} `order,callback` 取消指定订单
 * @param {count} `[config,]callback` 获取指定状态订单的数量
 *
 */

},{"./base.js":5,"./expo.js":14,"./util.js":32}],21:[function(require,module,exports){
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
 * &&` ^^^handles^^^ 类型：String 选填<br/>指定多个handle，以“,”分隔
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
},{"./base.js":5,"./expo.js":14}],22:[function(require,module,exports){
var base = require('./base.js');
var expo = require('./expo.js');

var module = base('page_block', function(factory){
  //
  factory.get(true);
  //
});

exports.get = expo(module, 'get');

/**
 * 页面块
 *
 * ```get
 * `` handle
 * &` 类型：String<br/>指定页面块hanlde。
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * ```
 *
 * ```getPoly1
 * `` config
 * &` 类型：Object
 * &&` ^^^id^^^ 类型：Number 选填<br/>指定id
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * ```
 *
 * ```getPoly2
 * `` config
 * &` 类型：Object
 * &&` ^^^ids^^^ 类型：Array 选填<br/>指定多个id
 * &&` ^^^handles^^^ 类型：Array 选填<br/>指定多个handle
 * &&` ^^^version^^^ 类型：Number 选填<br/>指定页面块的version，<br/>1 - 旧版自定义页面<br/>2 - 新版页面块
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * ```
 *
 * @param {get} `handle,callback` 获取指定 `handle` 的页面块
 * @param {getPoly1} `config,callback` 获取指定 `id` 的页面块
 * @param {getPoly2} `[config,]callback` 获取页面块列表
 *
 */

},{"./base.js":5,"./expo.js":14}],23:[function(require,module,exports){
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
},{"./base.js":5,"./expo.js":14,"./util.js":32}],24:[function(require,module,exports){
var base = require('./base.js');
var expo = require('./expo.js');
var util = require('./util.js');

var aConfig = {
  dir: {url: 'dir'},
  tags : {url: 'tags'}
};

var module = base('post', function(factory){
  factory.get();
  factory.createByConfig(aConfig);
});

exports.get = expo(module, 'get');

util.forEach(aConfig, function(value, key){
  exports[key] = expo(module, key);
});

/**
 * 文章
 *
 * ```get
 * `` handle
 * &` 类型：String<br/>指定文章的handle
 * `` callback
 * &` 类型：Function( 返回对象 [查看详情^](/development/s/582f0f6502282e5b22000039) )<br/>获取信息后的回调函数
 * ```
 *
 * ```getPoly1
 * `` config
 * &` 类型：Object
 * &&` ^^^handles^^^ 类型：String 选填<br/>指定多个handle，以“,”分隔
 * &&` ^^^size^^^ 类型：Number 选填<br/>指定返回每页的数目
 * &&` ^^^page^^^ 类型：Number 选填<br/>指定返回分页页码
 * &&` ^^^dir_id^^^ 类型：Number 选填<br/>指定目录id
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数<br/>返回对象中包含分页对象 paging [查看详情](/development/s/5587c0b00abc3e41b300002d#-paging-)
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "posts" : [ ... ],
 * &&&     "paging" : { ... }
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```dir
 * `` callback
 * &` 类型：Function( 返回对象 [查看详情^](/development/s/582f138102282e5b22000041) )<br/>获取信息后的回调函数
 * ```
 *
 * ```tags
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "tags" : [{id: 3, name: "test"}]
 * &&& }
 * &&& ^^^
 * ```
 *
 * @param {get} `handle,callback` 获取指定文章
 * @param {getPoly1} `[config,]callback` 获取文章列表
 * @param {dir} `callback` 获取文章目录列表
 * @param {tags} `callback` 获取文章标签列表
 *
 */
},{"./base.js":5,"./expo.js":14,"./util.js":32}],25:[function(require,module,exports){
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
 * &` 类型：String<br/>指定商品的 handle
 * `` callback
 * &` 类型：Function( 返回对象 [查看详情](/development/s/5432593471ea1e4f9f000013) )<br/>获取信息后的回调函数<br/>商品对象中的图片对象，使用 [util.getImageUrl](/development/s/5549f6f50abc3e22ec000011#-getimageurl-image_id-image_name-image_size-image_epoch-) 方法转换为对应 url
 * ```
 *
 * ```getPoly1
 * `` config
 * &` 类型：Object
 * &&` ^^^handles^^^ 类型：String 选填<br/>指定多个 handle，以“,”分隔
 * &&` ^^^ids^^^ 类型：String 选填<br/>指定多个 id，以“,”分隔
 * &&` ^^^search^^^ 类型：String 选填<br/>指定商品名称包含的文字
 * &&` ^^^vendor^^^ 类型：String 选填<br/>指定商品品牌包含的文字
 * &&` ^^^type^^^ 类型：String 选填<br/>指定商品分类包含的文字
 * &&` ^^^in_stock^^^ 类型：Boolean 选填<br/>指定商品库存是否足够（默认值为 false）
 * &&` ^^^so^^^ 类型：String 选填<br/>指定商品排序规则，<br/>sale_desc - 销量<br/>price_asc - 价格升序<br/>price_desc - 价格降序<br/>date_desc - 上架时间
 * &&` ^^^size^^^ 类型：Number 选填<br/>指定返回每页的数目
 * &&` ^^^page^^^ 类型：Number 选填<br/>指定返回分页页码
 * `` callback
 * &` 类型：Function( 返回对象 [查看详情](/development/s/5432593471ea1e4f9f000013) )<br/>获取信息后的回调函数<br/>返回对象中包含分页对象 paging [查看详情](/development/s/5587c0b00abc3e41b300002d#-paging-)<br/>商品对象中的图片对象，使用 [util.getImageUrl](/development/s/5549f6f50abc3e22ec000011#-getimageurl-image_id-image_name-image_size-image_epoch-) 方法转换为对应 url
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
},{"./base.js":5,"./expo.js":14}],26:[function(require,module,exports){
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
},{"./ajax.js":3,"./uri.js":31}],27:[function(require,module,exports){
var base = require('./base.js');
var expo = require('./expo.js');
var util = require('./util.js');

var aConfig = {
    get: {url: ''}
};

var module = base('reward_point', function(factory){
  //
  //
  factory.createByConfig(aConfig);
  //
});

util.forEach(aConfig, function(value, key){
  exports[key] = expo(module, key);
});

/**
 * 订单
 *
 * ```get
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * ```
 *
 * @param {get} `callback` 获取当前店铺积分信息
 *
 */
},{"./base.js":5,"./expo.js":14,"./util.js":32}],28:[function(require,module,exports){
var base = require('./base.js');
var type_of = require('./type-of.js');
var expo = require('./expo.js');

var module = base('shop', function(factory){
  factory.create('list', '');
  factory.create('all', '');
  //
  factory.create('protecting', false, 'POST');
  //
  factory.create('admin_session_status', false, 'GET');
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
exports.adminSessionStatus = expo(module, 'admin_session_status');
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
 * &&` ^^^customer_level^^^ 店铺顾客等级数据。
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
 * &&&   "current_datetime" : "2015-05-28T10:51:43.060+08:00",
 * &&&   "customer_level" : [ ... ]
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
 * ```adminSessionStatus
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * &&` ^^^admin_singed_in^^^ 类型：Boolean<br/>true: 管理员已经登录网站后台<br/>false: 管理员未登录网站后台
 * &&& &nbsp;
 * &&& ^^^
 * &&& {
 * &&&   "code" : 200,
 * &&&   "message" : "",
 * &&&   "admin_singed_in" : true
 * &&& }
 * &&& ^^^
 * ```
 *
 * @param {get} `[handles,]callback` 获取全部或指定店铺信息
 * @param {protecting} `password,callback` 提交店铺保护密码
 * @param {adminSessionStatus} `callback` 查询管理员是否在当前浏览器登录了网站后台
 *
 */
},{"./base.js":5,"./expo.js":14,"./type-of.js":29}],29:[function(require,module,exports){
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
},{}],30:[function(require,module,exports){
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
 * &&` ^^^handles^^^ 类型：String 选填<br/>指定多个handle，以“,”分隔
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
},{"./base.js":5,"./expo.js":14}],31:[function(require,module,exports){
module.exports = function(sPath){
  //
  var sBase = '/api';
  var sVersion = '/v1';

  if(/^https?:\/\//.test(sPath) || /^\/\//.test(sPath)){
  	return sPath;
  }else{
  	return sBase + sVersion + '/' + sPath;
  }

};
},{}],32:[function(require,module,exports){
// 订单金额计算器
exports.orderCalculator = require('./calculator.js');

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
    var cookie_str = document.cookie,
        cookies = {},
        reg,
        result;
    if(!/;\s*$/.test(cookie_str)){
      cookie_str += ';';
    }
    reg = /(\S+?)=([\w\W]*?);/g;
    result = reg.exec(cookie_str);
    while(result){
      cookies[result[1]] = decodeURIComponent(result[2]);
      result = reg.exec(cookie_str);
    }
    if(sName){
      return cookies[sName];
    }else{
      return cookies;
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
    return (r === null ? null : decodeURIComponent(r[2]));
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
//
exports.isEmail = function(sEmail){
  var rEmail = /([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})/i;
  return rEmail.test(sEmail);
};
//
exports.isMobile = function(sPhone){
  var rPhone = /^(13|14|15|16|17|18|19)\d{9}$/;
  return rPhone.test(sPhone);
};
//
exports.isUsername = function(sUsername){
  var rUsername = /^([A-Za-z\u4e00-\u9fa5])[A-Za-z0-9\u4e00-\u9fa5_-]{3,15}$/;
  return rUsername.test(sUsername);
};
//
exports.isRealname = function(sRealname){
  var rRealname = /^.{1,255}$/;
  return rRealname.test(sRealname);
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
exports.forEach = function (collection, callback, isNotObject, scope) {
  if (Object.prototype.toString.call(collection) === '[object Object]' && !isNotObject) {
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
 * &` 类型：String<br/>需要设置的 cookie 名称。
 * `` value
 * &` 类型：String<br/>需要设置的 cookie 值。
 * `` isForever
 * &` 类型：Boolean ( 默认值：^^^false^^^ )<br/>设置为^^^true^^^，cookie 永不过期。
 * ```
 *
 * ```getCookie
 * `` name
 * &` 类型：String<br/>需要读取的 cookie 名称。
 * ```
 *
 * ```getImageUrl
 * `` image_id
 * &` 类型：String<br/>图片对象的 image_id。
 * `` image_name
 * &` 类型：String<br/>图片对象的 image_name。
 * `` image_size
 * &` 类型：String<br/>输出图片的尺寸大小，例如^^^300x300^^^。
 * `` image_epoch
 * &` 类型：String<br/>图片对象的 image_epoch。
 * ```
 *
 * ```getQuery
 * `` key
 * &` 类型：String<br/>需要获取的 url 参数名称。
 * ```
 *
 * ```setQuery
 * `` key
 * &` 类型：String<br/>需要设置的 url 参数名称。
 * `` value
 * &` 类型：String<br/>需要设置的 url 参数的值。
 * `` url
 * &` 类型：String<br/>需要设置参数的 url。
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
 * &` 类型：Function( 单个元素 )<br/>回调函数，返回^^^false^^^可停止遍历。
 * ```
 *
 * ```isEmail
 * `` email
 * &` 类型：String<br/>需要检测是否合法的 email，合法则返回^^^true^^^，不合法则返回^^^false^^^。
 * ```
 *
 * ```isMobile
 * `` mobile
 * &` 类型：String<br/>需要检测是否合法的中国大陆手机，合法则返回^^^true^^^，不合法则返回^^^false^^^。
 * ```
 *
 * ```isUsername
 * `` username
 * &` 类型：String<br/>需要检测是否合法的用户名，合法则返回^^^true^^^，不合法则返回^^^false^^^。
 * ```
 *
 * ```isRealname
 * `` realname
 * &` 类型：String<br/>需要检测是否合法的真实姓名，合法则返回^^^true^^^，不合法则返回^^^false^^^。
 * ```
 *
 * ```orderCalculator
 * `` return
 * &` 调用此方法将返回一个计算器实例，具有以下方法：
 * &&` ^^^update(object)^^^：更新数据，参数形如^^^{item_amount: 90}^^^，可接收的^^^key^^^及其具体意义可以调用^^^help^^^方法查看
 * &&` ^^^get([callback])^^^：返回订单计算结果，可接受一个回调函数，参数为订单计算结果
 * &&` ^^^help()^^^：在控制台打印帮助信息
 * &&&
 * &&& ^^^
 * &&& var Calc = Jssdk.util.orderCalculator();
 * &&& Calc.update({
 * &&&     item_amount: 90, // 商品总金额
 * &&&     shipment_amount: 10 // 运费总金额
 * &&& });
 * &&& var final_amount;
 * &&& Calc.get(function(result) {
 * &&&     final_amount = result.final_amount; //实付金额
 * &&& });
 * &&& console.log(final_amount); // 100
 * &&& ^^^
 * ```
 *
 * @param {setCookie} `name,value[,isForever]` 设置 cookie
 * @param {getCookie} `name` 读取 cookie
 * @param {getImageUrl} `image_id,image_name,image_size,image_epoch` 将图片对象转换为 url
 * @param {getQuery} `key` 获取 url 中 search 部分的参数
 * @param {setQuery} `key,value,url` 设置 url 中 search 部分的参数
 * @param {inArray} `element,array` 检查目标对象是否在数组中
 * @param {forEach} `collection,callback` 遍历数组或对象中的所有元素
 * @param {isEmail} `email` 验证email是否合法
 * @param {isMobile} `mobile` 验证手机号码是否合法（中国大陆）
 * @param {isUsername} `username` 验证用户名是否合法
 * @param {isRealname} `realname` 验证真实姓名是否合法
 * @param {orderCalculator} 创建一个订单金额计算器
 *
 */

},{"./calculator.js":7}],33:[function(require,module,exports){
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
 * &&` ^^^handles^^^ 类型：String 选填<br/>指定多个handle，以“,”分隔
 * &&` ^^^search^^^ 类型：String 选填<br/>指定品牌包含的文字
 * &&` ^^^size^^^ 类型：Number 选填<br/>指定返回每页的数目
 * &&` ^^^page^^^ 类型：Number 选填<br/>指定返回分页页码
 * &&` ^^^available^^^ 值：`true` 选填<br/>筛选包含商品的品牌
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
},{"./base.js":5,"./expo.js":14}],34:[function(require,module,exports){
exports.get = function(){
	return '1.0.0';
};

},{}]},{},[19]);
