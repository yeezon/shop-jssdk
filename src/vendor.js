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
 * &` 类型：String<br/>指定品牌的handle
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "vendor" : {
 * &&&         "name" : "乡萘儿",
 * &&&         "handle" : "V000035"
 * &&&     },
 * &&&     "products" : [{ ... }, { ... }], // 含有这个品牌的商品
 * &&&     "paging" : { ... } // 分页对象
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```getPoly1
 * `` config
 * &` 类型：Object
 * &&` ^^^handles^^^ 类型：String 选填<br/>指定多个handle，以“,”分隔
 * &&` ^^^search^^^ 类型：String 选填<br/>指定品牌包含的文字
 * &&` ^^^size^^^ 类型：Number 选填<br/>指定返回每页的数目
 * &&` ^^^page^^^ 类型：Number 选填<br/>指定返回分页页码
 * `` callback
 * &` 类型：Function( 返回对象 [查看详情](/development/s/54325a1571ea1e560f00000d) )<br/>获取信息后的回调函数<br/>返回对象中包含分页对象 paging [查看详情](/development/s/5587c0b00abc3e41b300002d#-paging-)
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "vendors" : [{
 * &&&             "name" : "谷吃", // 品牌名称
 * &&&             "handle" : "V000036"  // 品牌 handle
 * &&&         }, {
 * &&&             "name" : "驴",  // 品牌名称
 * &&&             "handle" : "V000037"  // 品牌 handle
 * &&&         }
 * &&&     ],
 * &&&     "paging" : { ... }
 * &&& }
 * &&& ^^^
 * ```
 *
 * @param {get} `handle,callback` 获取指定品牌
 * @param {getPoly1} `[config,]callback` 获取品牌列表
 *
 */