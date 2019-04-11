var base = require('./base.js');
var expo = require('./expo.js');
var util = require('./util.js');

var aConfig = {
  dir: {url: 'dir'},
  tags : {url: 'tags'},
  search : {url: 'search'}
};

var module = base('post', function(factory){
  factory.get();
  factory.createByConfig(aConfig);
});

exports.get = expo(module, 'get');

util.forEach(aConfig, function(value, key){
  exports[key] = expo(module, key);
});

/**
 * 文章
 *
 * ```get
 * `` handle
 * &` 类型：String<br/>指定文章的handle
 * `` callback
 * &` 类型：Function( 返回对象 [查看详情^](/development/s/582f0f6502282e5b22000039) )<br/>获取信息后的回调函数
 * ```
 *
 * ```getPoly1
 * `` config
 * &` 类型：Object
 * &&` ^^^handles^^^ 类型：String 选填<br/>指定多个handle，以“,”分隔
 * &&` ^^^size^^^ 类型：Number 选填<br/>指定返回每页的数目
 * &&` ^^^page^^^ 类型：Number 选填<br/>指定返回分页页码
 * &&` ^^^dir_id^^^ 类型：Number 选填<br/>指定目录id
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数<br/>返回对象中包含分页对象 paging [查看详情](/development/s/5587c0b00abc3e41b300002d#-paging-)
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "posts" : [ ... ],
 * &&&     "paging" : { ... }
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```dir
 * `` callback
 * &` 类型：Function( 返回对象 [查看详情^](/development/s/582f138102282e5b22000041) )<br/>获取信息后的回调函数
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
 * &&&     "posts" : [
 * &&&          {
 * &&&              "highlight": {
 * &&&                  "content.pinyin": [
 * &&&                      "<mark>测试</mark>文章"
 * &&&                  ],
 * &&&                  "title": [
 * &&&                      "<mark>测试</mark>文章"
 * &&&                  ],
 * &&&                  "content": [
 * &&&                      "<mark>测试</mark>文章"
 * &&&                  ],
 * &&&                  "title.pinyin": [
 * &&&                      "<mark>测试</mark>文章"
 * &&&                  ]
 * &&&              },
 * &&&              "data": {
 * &&&                  "summary": "",
 * &&&                  "page_url": "/posts/x000010",
 * &&&                  "page_desc": "",
 * &&&                  "dirs": [
 * &&&                      "未分类目录"
 * &&&                  ],
 * &&&                  "title": "测试文章",
 * &&&                  "show_at": "2016/11/23 14:43:47",
 * &&&                  "content": "测试文章",
 * &&&                  "tags": []
 * &&&              }
 * &&&          }
 * &&&     ],
 * &&&     "total": 1
 * &&& }
 * &&& ^^^
 * ```
 *
 * @param {get} `handle,callback` 获取指定文章
 * @param {getPoly1} `[config,]callback` 获取文章列表
 * @param {dir} `callback` 获取文章目录列表
 * @param {tags} `callback` 获取文章标签列表
 * @param {search} `callback` 文章全文检索
 *
 */