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

// globalThis 暂时不用
var _global = {};
try {
  _global = global;
} catch (error) {
  _global = window;
}

var isWeApp = false
var isWeAppDev = false
try {
  isWeApp = !!wx.getSystemInfoSync
  isWeAppDev = !!(wx.getSystemInfoSync().platform === 'devtools')
} catch (error) {}

// UA 二次验证，兼容 LowCode 编辑器环境（因其有注入小程序的一些方法）
if (isWeApp) {
  try {
    isWeApp = !_global.navigator.userAgent
    isWeAppDev = !_global.navigator.userAgent
  } catch (error) {}
}

var jsonpID = 0,
    document = _global.document,
    key,
    name,
    // rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    scriptTypeRE = /^(?:text|application)\/javascript/i,
    xmlTypeRE = /^(?:text|application)\/xml/i,
    jsonType = 'application/json',
    htmlType = 'text/html',
    blankRE = /^\s*$/

var ajax = module.exports = function(options) {
  var oWeApp = isWeApp ? getApp() : {}
  var oLowCodeApp = oWeApp.app || _global.app || {}

  var SITE_API_URL = 'https://' + _global.yhsd.SITE_DOMAIN

  if (_global.yhsd.SITE_ALIAS && _global.yhsd.SAAS_DOMAIN_FOR_SITE) {
    SITE_API_URL = 'https://' + _global.yhsd.SAAS_DOMAIN_FOR_SITE;
  }

  var isLowCode = !!_global.yhsd.LOWCODE_DATA_SOURCE_HANDLE

  if (isLowCode && !isWeAppDev) { // 腾讯云底码应用支持
    var data = extend({}, (options || {}).data || {})
    // 序列化数据
    data = param(data)

    var url = options.url || ''

    // 支持其他域名
    if (/https:\/\//.test(url)) {
      url = url.replace(/^\/api\/v1\/[^\/]+\//, '')
    } else {
      url = SITE_API_URL + url
    }

    var _cookie = '_homeland_shop_customer_session=' + _global.yhsd.SESSION_TOKEN + ';';

    // 小程序无 Cookie 功能，也不需要本地购物车业务
    if (!isWeApp) {
      var localCartCookieKey = 'local_cart'
      var localCartCookieVal = window.encodeURIComponent(util.getCookie(localCartCookieKey) || '')

      _cookie += ' ' + localCartCookieKey + '=' + localCartCookieVal
    }

    var oConfig = {
      method: (options.type || 'GET').toUpperCase(),
      url: appendQuery(url, data),
      // data: data,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': _cookie,
        'alias': _global.yhsd.SITE_ALIAS
      },
      dataType: 'json',
      responseType: 'text'
    }

    // console.log('Request Config', oConfig)

    _global.yhsd._$interceptors.request.run(oConfig, function (oConfig) {
      var dataSourceHandle = _global.yhsd.LOWCODE_DATA_SOURCE_HANDLE || ''
      var oDataSource = {}

      if (dataSourceHandle) {
        oDataSource = (oLowCodeApp.dataSources || {})[dataSourceHandle] || {}
      }

      if (oDataSource.request) {
        oDataSource.request({
          config: oConfig
        }).then(function (oTXRes) {
          // console.log('Success - oDataSource =>', oTXRes)

          if (oTXRes.code === 0) {
            var _res = (oTXRes.data || {}).res

            if ((typeof _res) === 'object') {
              _global.yhsd._$interceptors.response.run(_res, function (__res) {
                options.success.call(null, __res, 'success', null)
              })
            } else {
              throw new Error('请求异常，请稍后再试（SAAS_ERROR）')
            }
          } else {
            throw new Error('请求异常，请稍后再试（LC_ERROR）')
          }
        }).catch(function (error) {
          // console.log('Error - oDataSource =>', error)

          _global.yhsd._$interceptors.response.run(error, function (error) {
            // options.error.call(null, null, 'error', error)
            options.success.call(null, {
              code: 40000,
              message: (error || {}).message || '请求异常，请稍后再试（SDK_ERROR）'
            }, 'success', null)
          })
        })
      } else {
        // console.log('Error - oDataSource.request =>', undefined)
      }
    })
  } else if (isWeApp) { // 小程序支持
    var data = extend({}, (options || {}).data || {})
    // 序列化数据
    data = param(data)

    var url = options.url || ''

    // 支持其他域名
    if (/https:\/\//.test(url)) {
      url = url.replace(/^\/api\/v1\/[^\/]+\//, '')
    } else {
      url = SITE_API_URL + url
    }

    var oConfig = {
      method: (options.type || 'GET').toUpperCase(),
      url: appendQuery(url, data),
      // data: data,
      header: { // 小程序不是用 headers
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': '_homeland_shop_customer_session=' + _global.yhsd.SESSION_TOKEN,
        'alias': _global.yhsd.SITE_ALIAS
      },
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        // console.log('Success', res)

        _global.yhsd._$interceptors.response.run(res, function (res) {
          options.success.call(null, ((res || {}).data || {}), 'success', null)
        })
      },
      fail: function (error) {
        // console.log('Error', error)

        _global.yhsd._$interceptors.response.run(error, function (error) {
          options.error.call(null, null, 'error', error)
        })
      },
      complete: function () {}
    }

    // console.log('Request Config', oConfig)

    _global.yhsd._$interceptors.request.run(oConfig, function (oConfig) {
      wx.request(oConfig)
    })
  } else {
    var settings = extend({}, options || {})
    for (key in ajax.settings) if (settings[key] === undefined) settings[key] = ajax.settings[key]

    ajaxStart(settings)

    if (!settings.crossDomain) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
      RegExp.$2 != _global.location.host

    var dataType = settings.dataType, hasPlaceholder = /=\?/.test(settings.url)
    if (dataType == 'jsonp' || hasPlaceholder) {
      if (!hasPlaceholder) settings.url = appendQuery(settings.url, 'callback=?')
      return ajax.JSONP(settings)
    }

    if (!settings.url) settings.url = _global.location.toString()
    serializeData(settings)

    var mime = settings.accepts[dataType],
        baseHeaders = { },
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : _global.location.protocol,
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

        _global.yhsd._$interceptors.response.run(xhr, function (xhr) {
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
        })
      }
    }

    // overrideMimeType 暂时不处理
    _global.yhsd._$interceptors.request.run(settings, function (settings) {
      var async = 'async' in settings ? settings.async : true

      // 腾讯云 LowCode 支持
      if (isLowCode && /^\/[^\/]/.test(settings.url)) {
        settings.url = SITE_API_URL + settings.url
      }

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
    });

    // return xhr
  }
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
      if (callbackName in _global) _global[callbackName] = empty
      ajaxComplete('abort', xhr, options)
    },
    xhr = { abort: abort }, abortTimeout,
    head = document.getElementsByTagName("head")[0]
      || document.documentElement;

  if (options.error) script.onerror = function() {
    xhr.abort()
    options.error()
  }
  _global[callbackName] = function(data){
    clearTimeout(abortTimeout)
      //todo: remove script
      //$(script).remove()
    // delete _global[callbackName]
    if (callbackName in _global) _global[callbackName] = empty
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
    return new _global.XMLHttpRequest()
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
  params.add = function(k, v){ this.push(encodeURIComponent(k) + '=' + encodeURIComponent(v)) }
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