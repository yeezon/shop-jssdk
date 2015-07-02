var base = require('./base.js');
var util = require('./util.js');
var expo = require('./expo.js');

var aConfig = {
  current: {},
  login: {method: 'POST'},
  // checkRegistMobile: {method: 'POST', url: 'check_regist_mobile'},
  // checkResetMobile: {method: 'POST', url: 'check_reset_mobile'},
  // sendResetValidateSms: {method: 'POST', url: 'send_reset_validate_sms'},
  // registerWithEmail: {method: 'POST', url: 'register_with_email'},
  // registerWithUsername: {method: 'POST', url: 'register_with_user_name'},
  // registerWithMobile: {method: 'POST', url: 'register_with_mobile'},
  // resetPasswordWithMobile: {method: 'POST', url: 'reset_password_with_mobile'},
  // resetPasswordWithEmail: {method: 'POST', url: 'reset_password_with_email'},
  logout: {method: 'POST'},
  changePassword: {method: 'POST', url: 'change_password'},
  save: {method: 'POST'}
};

var module = base('account', function(factory){
  factory.createByConfig(aConfig);
});

util.forEach(aConfig, function(value, key){
  exports[key] = expo(module, key);
});


/**
 * 顾客账号
 *
 * ```current
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取后的回调函数
 * &&` ^^^customer^^^ 类型：Object<br/>null: 当前未登录<br/>用户对象：当前登录的用户 [查看详情](/development/s/5432566de2931e235b000003)
 * ```
 *
 * ```login
 * `` user
 * &` 类型：Object
 * &&` ^^^account^^^ 类型：String<br/>登录的用户名
 * &&` ^^^password^^^ 类型：String<br/>登录的密码
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>登录后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：登录成功<br/>201：登录失败
 * &&` ^^^message^^^ 类型：String<br/>登录失败原因（当 code 为 201 时）
 * &&` ^^^customer^^^ 类型：Object<br/>当前登录的用户信息 [查看详情](/development/s/5432566de2931e235b000003)
 * &&` ^^^account^^^ 类型：String<br/>当前登录的用户名
 * &&& &nbsp;
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "account" : "yhsduser",
 * &&&     "customer" : {
 * &&&         "id" : 15,
 * &&&         "social_type" : false,
 * &&&         "name" : "yhsduser",
 * &&&         "metas" : {},
 * &&&         "notify_email" : "user@youhaosuda.com",
 * &&&         "notify_phone" : "13824402932",
 * &&&         "accept_marketing" : false,
 * &&&         "regist_at" : "2014-08-27T13:52:34.964+08:00",
 * &&&         "orders_count" : 15,
 * &&&         "total_spent" : 144291,
 * &&&         "last_order_no" : "201505263782651",
 * &&&         "last_order_at" : "2015-05-26T19:25:53.667+08:00"
 * &&&     }
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```logout
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>成功登出后的回调函数
 * ```
 *
 * ```changePassword
 * `` password
 * &` 类型：Object
 * &&` ^^^password_old^^^ 类型：String<br/>旧密码
 * &&` ^^^password^^^ 类型：String<br/>新密码
 * &&` ^^^password_again^^^ 类型：String<br/>重复新密码
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数<br/>注：密码修改成功后，顾客当前登录状态将会失效
 * &&` ^^^code^^^ 类型：Number<br/>200：密码修改成功<br/>201：密码修改失败
 * &&` ^^^message^^^ 类型：String<br/>密码修改失败原因（当 code 为 201 时）
 * ```
 *
 * ```save
 * `` notify
 * &` 类型：Object
 * &&` ^^^notify_email^^^ 类型：String<br/>顾客用于接收通知的邮箱
 * &&` ^^^notify_phone^^^ 类型：String<br/>顾客用于接收通知的手机
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>更新后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：更新信息成功<br/>201：更新信息失败
 * &&` ^^^message^^^ 类型：String<br/>更新信息失败原因（当 code 为 201 时）
 * &&` ^^^customer^^^ 类型：Object<br/>更新后的用户信息 [查看详情](/development/s/5432566de2931e235b000003)
 * ```
 *
 * @param {current} `callback` 获取当前顾客信息
 * @param {login} `user,callback` 顾客登录
 * @param {logout} `callback` 顾客登出 （必须登录）
 * @param {changePassword} `password,callback` 顾客修改密码 （必须登录）
 * @param {save} `notify,callback` 更新顾客信息 （必须登录）
 *
 */