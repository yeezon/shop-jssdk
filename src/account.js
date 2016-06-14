var base = require('./base.js');
var util = require('./util.js');
var expo = require('./expo.js');

var aConfig = {
  current: {},
  login: {method: 'POST'},
  logout: {method: 'POST'},
  changePassword: {method: 'POST', url: 'change_password'},
  save: {method: 'POST'},
  registerWithEmail: {method: 'POST', url: 'register_with_email'},
  registerWithUsername: {method: 'POST', url: 'register_with_user_name'},
  registerWithMobile: {method: 'POST', url: 'register_with_mobile'},
  sendRegistValidateSms: {method: 'POST', url: 'send_regist_validate_sms'},
  sendResetValidateSms: {method: 'POST', url: 'send_reset_validate_sms'},
  resetPasswordWithMobile: {method: 'POST', url: 'reset_password_with_mobile'},
  resetPasswordWithEmail: {method: 'POST', url: 'reset_password_with_email'},
  checkRegistMobile: {method: 'POST', url: 'check_regist_mobile'},
  checkResetMobile: {method: 'POST', url: 'check_reset_mobile'}
};

var module = base('account', function(factory){
  factory.createByConfig(aConfig);
});

util.forEach(aConfig, function(value, key){
  exports[key] = expo(module, key);
});

exports.register = function(param, callback){
  //
  switch(param.type){
    case 'email':
      module.registerWithEmail(param, callback);
      break;
    case 'mobile':
      module.registerWithMobile(param, callback);
      break;
    case 'uname':
      module.registerWithUsername(param, callback);
      break;
  }
  //
};


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
 * ```register
 * `` param
 * &` 类型：Object
 * &&` ^^^type^^^ 类型：String<br/>注册的账号类型，可选 type 包括：
 * &&&&` uname: 用户名
 * &&&&` email: 邮箱
 * &&&&` mobile: 手机号码
 * &&` ^^^account^^^ 类型：String<br/>用户名/邮箱/手机号码
 * &&` ^^^password^^^ 类型：String<br/>密码
 * &&` ^^^password_again^^^ 类型：String<br/>重复密码
 * &&` ^^^verify_code^^^ 类型：String 选填<br/>手机验证码，当 type 为^^^mobile^^^必须提供，使用 [sendRegistValidateSms](#-sendregistvalidatesms-param-callback-) 获取
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：注册成功<br/>201：注册失败
 * &&` ^^^message^^^ 类型：String<br/>注册失败原因（当 code 为 201 时）
 * &&` ^^^customer^^^ 类型：Object<br/>注册成功的用户信息 [查看详情](/development/s/5432566de2931e235b000003)
 * ```
 *
 * ```sendRegistValidateSms
 * `` param
 * &` 类型：Object
 * &&` ^^^mobile^^^ 类型：String<br/>中国大陆手机号码
 * &&` ^^^captcha_id^^^ 类型：String 选填<br/>验证码图片 id [获取验证码](/development/s/55b66f1d0abc3e746a000002)
 * &&` ^^^captcha_value^^^ 类型：String 选填<br/>验证码图片中显示的值 [获取验证码](/development/s/55b66f1d0abc3e746a000002)
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>更新后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：发送成功<br/>214：该操作需要验证码<br/>201：发送失败
 * &&` ^^^message^^^ 类型：String<br/>发送信息失败原因（当 code 为 201 时）
 * ```
 *
 * ```sendResetValidateSms
 * `` param
 * &` 类型：Object
 * &&` ^^^mobile^^^ 类型：String<br/>中国大陆手机号码
 * &&` ^^^captcha_id^^^ 类型：String 选填<br/>验证码图片 id [获取验证码](/development/s/55b66f1d0abc3e746a000002)
 * &&` ^^^captcha_value^^^ 类型：String 选填<br/>验证码图片中显示的值 [获取验证码](/development/s/55b66f1d0abc3e746a000002)
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>更新后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：发送成功<br/>214：该操作需要验证码<br/>201：发送失败
 * &&` ^^^message^^^ 类型：String<br/>发送信息失败原因（当 code 为 201 时）
 * ```
 *
 * ```resetPasswordWithMobile
 * `` param
 * &` 类型：Object
 * &&` ^^^account^^^ 类型：String<br/>需要重设密码的顾客手机号码账号
 * &&` ^^^password^^^ 类型：String<br/>密码
 * &&` ^^^password_again^^^ 类型：String<br/>重复密码
 * &&` ^^^verify_code^^^ 类型：String<br/>手机验证码，使用 [sendResetValidateSms](#-sendresetvalidatesms-param-callback-) 获取
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>更新后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：发送成功<br/>214：该操作需要验证码<br/>201：发送失败
 * &&` ^^^message^^^ 类型：String<br/>发送信息失败原因（当 code 为 201 时）
 * ```
 *
 * ```resetPasswordWithEmail
 * `` param
 * &` 类型：Object
 * &&` ^^^email^^^ 类型：String<br/>需要重置密码的邮箱地址
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>发送重置邮件后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：发送成功<br/>214：该操作需要验证码<br/>201：发送失败
 * &&` ^^^message^^^ 类型：String<br/>发送信息失败原因（当 code 为 201 时）
 * ```
 *
 * ```checkRegistMobile
 * `` param
 * &` 类型：Object
 * &&` ^^^mobile^^^ 类型：String<br/>中国大陆手机号码
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>请求后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：手机号码未注册，可以使用<br/>201：已注册或其他失败信息
 * &&` ^^^message^^^ 类型：String<br/>已注册或其他失败信息（当 code 为 201 时）
 * ```
 *
 * ```checkResetMobile
 * `` param
 * &` 类型：Object
 * &&` ^^^mobile^^^ 类型：String<br/>中国大陆手机号码
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>请求后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：手机号码已注册，可以重置密码<br/>201：手机号码尚未注册或其他失败信息
 * &&` ^^^message^^^ 类型：String<br/>201：手机号码尚未注册或其他失败信息（当 code 为 201 时）
 * ```
 *
 * @param {current} `callback` 获取当前顾客信息
 * @param {login} `user,callback` 顾客登录
 * @param {logout} `callback` 顾客登出 （必须登录）
 * @param {changePassword} `password,callback` 顾客修改密码 （必须登录）
 * @param {save} `notify,callback` 更新顾客信息 （必须登录）
 * @param {register} `param,callback` 注册顾客账号
 * @param {sendRegistValidateSms} `param,callback` 顾客注册手机号码账号时，获取手机验证码
 * @param {sendResetValidateSms} `param,callback` 顾客找回手机号码账号密码时，获取手机验证码
 * @param {resetPasswordWithMobile} `param,callback` 重设手机号码账号密码
 * @param {resetPasswordWithEmail} `param,callback` 发送邮箱账号重置密码邮件
 * @param {checkRegistMobile} `param,callback` 检测手机是否未注册（多用于顾客注册手机号码账号时检测用）
 * @param {checkResetMobile} `param,callback` 检测手机是否已注册（用于顾客重设手机号码账号密码时检测用）
 *
 */