var base = require('./base.js');
var util = require('./util.js');
var expo = require('./expo.js');

var aConfig = {
  get: {url: ''},
  create: {method: 'POST'},
  save: {method: 'POST'},
  remove: {method: 'POST'}
};

var module = base('address', function(factory){
  factory.createByConfig(aConfig);
});

util.forEach(aConfig, function(value, key){
  exports[key] = expo(module, key);
});

/**
 * 收货人地址
 *
 * ```get
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数。
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "addresses" : [{
 * &&&             "id" : 221,
 * &&&             "name" : "友好速搭",
 * &&&             "country" : "中国",
 * &&&             "country_code" : "CN",
 * &&&             "province" : "广东省",
 * &&&             "province_code" : "440000",
 * &&&             "city" : "深圳市",
 * &&&             "city_code" : "440300",
 * &&&             "district" : "南山区",
 * &&&             "district_code" : "440305",
 * &&&             "detail" : "新西路兰光科技园B801",
 * &&&             "zipcode" : "518057",
 * &&&             "mobile" : "13800138000",
 * &&&             "telephone" : "0755-83051027",
 * &&&             "email" : "support@youhaosuda.com",
 * &&&             "is_default" : false
 * &&&         }
 * &&&     ]
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```create
 * `` address
 * &` 类型：Object
 * &&` ^^^name^^^ 类型：String 长度：255<br/>收货人姓名
 * &&` ^^^district_code^^^ 类型：String 长度：255<br/>收货区域编码（最后一级）
 * &&` ^^^detail^^^ 类型：String 长度：255<br/>详细收货地址
 * &&` ^^^zipcode^^^（选填） 类型：String 长度：255<br/>邮编
 * &&` ^^^mobile^^^ 类型：String 长度：255<br/>移动电话号码
 * &&` ^^^telephone^^^（选填） 类型：String 长度：255 <br/>联系电话
 * &&` ^^^email^^^（选填） 类型：String 长度：255 <br/>邮箱
 * &&` ^^^is_default^^^（选填） 类型：Boolean<br/>是否为设置默认收货地址
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```save
 * `` address
 * &` 类型：Object
 * &&` ^^^id^^^ 类型：Number<br/>需要更新的收货人信息id
 * &&` ^^^name^^^ 类型：String 长度：255<br/>收货人姓名
 * &&` ^^^district_code^^^ 类型：String 长度：255<br/>收货区域编码（最后一级）
 * &&` ^^^detail^^^ 类型：String 长度：255<br/>详细收货地址
 * &&` ^^^zipcode^^^（选填） 类型：String 长度：255<br/>邮编
 * &&` ^^^mobile^^^ 类型：String 长度：255<br/>移动电话号码
 * &&` ^^^telephone^^^（选填） 类型：String 长度：255 <br/>联系电话
 * &&` ^^^email^^^（选填） 类型：String 长度：255 <br/>邮箱
 * &&` ^^^is_default^^^（选填） 类型：Boolean<br/>是否为设置默认收货地址
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```remove
 * `` address
 * &` 类型：Object
 * &&` ^^^id^^^ 类型：Number<br/>需要删除的收货人信息id
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * @param {get} `callback` 获取所有收货人地址 （必须登录）
 * @param {create} `address,callback` 新建收货人地址 （必须登录）
 * @param {save} `address,callback` 更新收货人地址 （必须登录）
 * @param {remove} `address,callback` 删除收货人地址 （必须登录）
 *
 */