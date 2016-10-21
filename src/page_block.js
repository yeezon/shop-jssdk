var base = require('./base.js');
var expo = require('./expo.js');
var util = require('./util.js');

var aConfig = {
  view: {}
};

var module = base('page_block', function(factory){
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
 * `` config
 * &` 类型：Object
 * &&` ^^^ids^^^ 类型：String 选填<br/>指定多个id，以“,”分隔
 * &&` ^^^handles^^^ 类型：String 选填<br/>指定多个handle，以“,”分隔
 * &&` ^^^version^^^ 类型：Number 选填<br/>指定页面块的version，<br/>1 - 旧版自定义页面<br/>2 - 新版页面块
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * ```
 *
 * ```view
 * `` handle
 * &` 类型：String<br/>指定页面块`handle`<br/>
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * ```
 *
 * @param {get} `[config,]callback` 获取页面块列表
 * @param {get} `handle, callback` 获取页面块详细信息
 *
 */
