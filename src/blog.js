var base = require('./base.js');
var expo = require('./expo.js');
var util = require('./util.js');

var aConfig = {
  tags : {url: 'tags'},
  search : {url: 'search'}
};

var module = base('blog', function(factory){
  factory.get();
  factory.createByConfig(aConfig);
});

exports.get = expo(module, 'get');

util.forEach(aConfig, function(value, key){
  exports[key] = expo(module, key);
});

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
 * ```tags
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "tags" : [{id: 3, name: "test"}]
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```search
 * `` config
 * &` 类型：Object
 * &&` ^^^terms^^^ 类型：String 必填<br/>指定检索内容
 * &&` ^^^page^^^ 类型：Number 选填<br/>指定返回分页页码
 * &&` ^^^size^^^ 类型：Number 选填<br/>指定返回每页的数目
 * `` callback
 * &` 类型：Function(返回对象)<br/>请求后返回的回调函数
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "blogs" : [
 * &&&         {
 * &&&             "highlight": {
 * &&&                 "content.pinyin": [
 * &&&                     "<mark>测试</mark>"
 * &&&                 ],
 * &&&                 "content": [
 * &&&                     "<mark>测试</mark>"
 * &&&                 ]
 * &&&             },
 * &&&             "data": {
 * &&&                 "page_url": "/blogs/b001169",
 * &&&                 "video_name": "",
 * &&&                 "page_desc": "",
 * &&&                 "title": "",
 * &&&                 "show_at": "2016/09/28 20:46:25",
 * &&&                 "music_album": "",
 * &&&                 "content": "测试",
 * &&&                 "blog_type": 1,
 * &&&                 "blog_tags": [],
 * &&&                 "blog_author_name": "残酷月光",
 * &&&                 "music_name": "",
 * &&&                 "content_capture": "测试",
 * &&&                 "music_artist": ""
 * &&&             }
 * &&&         }
 * &&&     ],
 * &&&     "total": 1
 * &&& }
 * &&& ^^^
 * ```
 *
 * @param {get} `[handle,]callback` 获取单个轻博客
 * @param {getPoly1} `config,callback` 获取轻博客列表
 * @param {tags} `callback` 获取轻博客标签列表
 * @param {search} `callback` 轻博客全文检索
 *
 */