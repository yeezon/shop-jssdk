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
 * 收藏功能
 *
 * ```get
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * &&& ^^^
 * &&& {
 * &&&     "code": 200,
 * &&&     "message": "",
 * &&&     "favorites": []  // 收藏内容列表
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```create
 * `` favorite
 * &` 类型：Object
 * &&` ^^^favorite_id^^^（必填） 类型：Number<br/>收藏对象 ID
 * &&` ^^^id_type^^^（必填） 类型：Number<br/>收藏对象类型，0 商品 1 文章 2 博客
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * &&& ^^^
 * &&& {
 * &&&     "code": 200,
 * &&&     "message": "",
 * &&&     "id": 101  // 收藏内容 ID
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```delete
 * `` favorite
 * &` 类型：Object
 * &&` ^^^id^^^（必填） 类型：Number<br/>收藏内容 ID
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```check
 * `` favorite
 * &` 类型：Object
 * &&` ^^^favorite_id^^^（必填） 类型：Number<br/>收藏对象 ID
 * &&` ^^^id_type^^^（必填） 类型：Number<br/>收藏对象类型，0 商品 1 文章 2 博客
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * &&& ^^^
 * &&& {
 * &&&     "code": 200,
 * &&&     "message": "",
 * &&&     "id": 101  // 收藏内容 ID
 * &&& }
 * &&& ^^^
 * ```
 *
 * @param {get} `callback` 获取所有收藏内容
 * @param {create} `favorite,callback` 创建收藏内容
 * @param {delete} `favorite,callback` 删除收藏内容
 * @param {check} `favorite,callback` 检查可收藏对象是否已收藏
 *
 */
