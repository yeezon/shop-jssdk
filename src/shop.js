var base = require('./base.js');
var type_of = require('./type-of.js');
var expo = require('./expo.js');

var module = base('shop', function(factory){
  factory.create('list', '');
  factory.create('all', '');
  //
  factory.create('protecting', false, 'POST');
  //
  factory.create('admin_session_status', false, 'GET');
  factory.create('trade_invoice', './trade_invoice/setting', 'GET');
});

exports.get = function(){
  var args = [];
  if(type_of(arguments[0]) === 'function'){
    args = [{}, arguments[0]];
    module.all.apply(module, args);
  }else{
    var sFields = arguments[0];
    args = arguments;
    args[0] = {
      fields: sFields
    };
    module.list.apply(module, args);
  }
};

exports.protecting = function(){
  var args = [];
  var sPassword = arguments[0];
  args = arguments;
  args[0] = {
    password: sPassword
  };
  module.protecting.apply(module, args);
};

exports.adminSessionStatus = expo(module, 'admin_session_status');
exports.tradeInvoice = expo(module, 'trade_invoice');
/**
 * 网站信息
 *
 * ```get
 * `` handles
 * &` 类型：String<br/>指定需要返回的内容，用','隔开。<br/>当handles参数为空时，返回所有内容。<br/>可选handles包括：
 * &&` ^^^shop^^^ 网站基础信息。 [查看详情](/development/s/542508ff71ea1e78fe000008)
 * &&` ^^^linklists^^^ 网站导航数据。 [查看详情](/development/s/5432558971ea1e4f9f000005)
 * &&` ^^^page_title^^^ 当前页面title
 * &&` ^^^page_desc^^^ 当前页面description
 * &&` ^^^is_mobile_agent^^^ 是否移动设备（根据当前User-Agent判断）
 * &&` ^^^current_datetime^^^ 当前时间
 * &&` ^^^customer_level^^^ 网站顾客等级数据。
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * &&& ^^^
 * &&& {
 * &&&   "code" : 200,
 * &&&   "message" : "",
 * &&&   "shop" : { ... },
 * &&&   "linklists" : { ... },
 * &&&   "page_title" : "买买买 - 不用选，直接买",
 * &&&   "page_desc" : "我们致力于解决选择困难症用户选购商品时的烦恼。我们帮你挑好了，你只需要买买买。",
 * &&&   "is_mobile_agent" : "",
 * &&&   "current_datetime" : "2015-05-28T10:51:43.060+08:00",
 * &&&   "customer_level" : [ ... ]
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```protecting
 * `` password
 * &` 类型：String<br/>网站保护密码
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交网站保护密码后的回调函数
 * &&` ^^^correct^^^ 类型：Boolean<br/>true: 密码正确，将设置名为 protection_password 的Cookie。此时刷新页面即可访问<br/>false: 密码错误
 * &&& &nbsp;
 * &&& ^^^
 * &&& {
 * &&&   "code" : 200,
 * &&&   "message" : "",
 * &&&   "correct" : true
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```adminSessionStatus
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * &&` ^^^admin_singed_in^^^ 类型：Boolean<br/>true: 管理员已经登录网站后台<br/>false: 管理员未登录网站后台
 * &&& &nbsp;
 * &&& ^^^
 * &&& {
 * &&&   "code" : 200,
 * &&&   "message" : "",
 * &&&   "admin_singed_in" : true
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```tradeInvoice
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * &&` ^^^allow_invoice_for_order^^^ 类型：Boolean<br/>true: 允许订单开发票<br/>false: 不允许订单开发票
 * &&& &nbsp;
 * &&& ^^^
 * &&& {
 * &&&   "code" : 200,
 * &&&   "message" : "",
 * &&&   "allow_invoice_for_order" : true
 * &&& }
 * &&& ^^^
 * ```
 *
 * @param {get} `[handles,]callback` 获取全部或指定网站信息
 * @param {protecting} `password,callback` 提交网站保护密码
 * @param {adminSessionStatus} `callback` 查询管理员是否在当前浏览器登录了网站后台
 * @param {tradeInvoice} `callback` 查询网站是否允许订单开发票
 *
 */