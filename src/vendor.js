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
 * &` 类型：String<br/>指定品牌的handle。
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
 * @param {get} `handle,callback` 获取指定品牌
 * @param {getPoly1} `[config,]callback` 获取品牌列表
 *
 */