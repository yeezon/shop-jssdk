var req = require('./lib/request.js');
var events = require('./events.js');
var type_of = require('./type-of.js');

// globalThis 暂时不用
var _global = {};
try {
  _global = global;
} catch (error) {
  _global = window;
}

var sModuleName = 'captcha';

var fetchFunc = exports.fetch = function(callback){
  //
  var sFetchUrl = _global.captchaPath || '//captcha.ibanquan.com';
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