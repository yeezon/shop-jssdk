var base = require('./base.js');
var expo = require('./expo.js');

var module = base('blog', function(factory){
  factory.get();
});

exports.get = expo(module, 'get');

/**
 * 轻博客相关接口
 *
 * ```get
 * `` handle
 * &` 类型：String<br/>指定轻博客的 handle<br/>当 handle 参数为空时，返回轻博客列表
 * `` callback
 * &` 类型：Function( 返回对象 [查看详情](/development/s/5475acdf71ea1e5ceb000008) )<br/>获取轻博客的回调函数
 * ```
 *
 * ```getPoly1
 * `` config
 * &` 类型：Object
 * &&` ^^^handles^^^ 类型：String 选填<br/>指定多个handle，以“,”分隔
 * &&` ^^^author^^^ 类型：String 选填<br/>指定轻博客作者
 * &&` ^^^tag^^^ 类型：String 选填<br/>指定轻博客标签
 * &&` ^^^size^^^ 类型：Number 选填<br/>指定返回每页的数目
 * &&` ^^^page^^^ 类型：Number 选填<br/>指定返回分页页码
 * `` callback
 * &` 类型：Function( 返回对象 [查看详情](/development/s/5475acdf71ea1e5ceb000008) )<br/>获取轻博客的回调函数<br/>返回对象中包含分页对象 paging [查看详情](/development/s/5587c0b00abc3e41b300002d#-paging-)
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "blogs" : [ ... ],
 * &&&     "paging" : { ... }
 * &&& }
 * &&& ^^^
 * ```
 *
 * @param {get} `[handle,]callback` 获取单个轻博客
 * @param {getPoly1} `config,callback` 获取轻博客列表
 *
 */