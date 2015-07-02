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