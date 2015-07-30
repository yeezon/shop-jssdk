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
  var s_done = events.subscribe(sTopicDone, function(o){
    if(type_of(callback) === 'function'){
      callback(o);
    }
  });
  //
  var s = events.subscribe(sTopic, function(o){
    var oPublish = {
      id: o.id,
      src: sFetchUrl + o.path
    };
    events.publish(sTopicDone, oPublish);
    s_done.unsubscribe();
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
 * &` 类型：Boolean<br/>当有需要时，自动获取图片验证码
 * &&` ^^^true^^^ 启用自动获取，默认值
 * &&` ^^^false^^^ 停用自动获取
 * ```
 *
 * @param {fetch} `callback` 获取图片验证码
 * @param {autoFetch} `isAuto` 启用/停用自动获取图片验证码
 *
 */