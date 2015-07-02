var base = require('./base.js');
var expo = require('./expo.js');

var module = base('page', function(factory){
  factory.get();
});

exports.get = expo(module, 'get');

/**
 * 自定义页面
 *
 * ```get
 * `` handle
 * &` 类型：String<br/>指定自定义页面的handle
 * `` callback
 * &` 类型：Function( 返回对象 [查看详情](/development/s/54325aace2931e1d26000004) )<br/>获取信息后的回调函数
 * ```
 *
 * ```getPoly1
 * `` config
 * &` 类型：Object
 * &&` ^^^size^^^ 类型：Number 选填<br/>指定返回每页的数目
 * &&` ^^^page^^^ 类型：Number 选填<br/>指定返回分页页码
 * `` callback
 * &` 类型：Function( 返回对象 [查看详情](/development/s/54325aace2931e1d26000004) )<br/>获取信息后的回调函数<br/>返回对象中包含分页对象 paging [查看详情](/development/s/5587c0b00abc3e41b300002d#-paging-)
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "pages" : [ ... ],
 * &&&     "paging" : { ... }
 * &&& }
 * &&& ^^^
 * ```
 *
 * @param {get} `handle,callback` 获取指定自定义页面
 * @param {getPoly1} `[config,]callback` 获取自定义页面列表
 *
 */