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