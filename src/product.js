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
 * &` 类型：String<br/>指定商品的handle
 * `` callback
 * &` 类型：Function( 返回对象 [查看详情](/development/s/5432593471ea1e4f9f000013) )<br/>获取信息后的回调函数
 * ```
 *
 * ```getPoly1
 * `` config
 * &` 类型：Object
 * &&` ^^^search^^^ 类型：String 选填<br/>指定商品名称包含的文字
 * &&` ^^^vendor^^^ 类型：String 选填<br/>指定商品品牌包含的文字
 * &&` ^^^type^^^ 类型：String 选填<br/>指定商品分类包含的文字
 * &&` ^^^in_stock^^^ 类型：Boolean 选填<br/>指定商品库存是否足够（默认值为 false）
 * &&` ^^^size^^^ 类型：Number 选填<br/>指定返回每页的数目
 * &&` ^^^page^^^ 类型：Number 选填<br/>指定返回分页页码
 * `` callback
 * &` 类型：Function( 返回对象 [查看详情](/development/s/5432593471ea1e4f9f000013) )<br/>获取信息后的回调函数<br/>返回对象中包含分页对象 paging [查看详情](/development/s/5587c0b00abc3e41b300002d#-paging-)
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