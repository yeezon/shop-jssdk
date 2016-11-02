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
