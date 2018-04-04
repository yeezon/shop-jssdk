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
    },
    check: {
      url: '../account/favorite/check'
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
