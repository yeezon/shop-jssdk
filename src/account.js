var base = require('./base.js');
var util = require('./util.js');
var expo = require('./expo.js');

var aConfig = {
  current: {},
  login: {method: 'POST'},
  vcodeLogin: {method: 'POST', url: 'vcode_login'},
  logout: {method: 'POST'},
  changePassword: {method: 'POST', url: 'change_password'},
  save: {method: 'POST'},
  socialBind: {method: 'POST', url: 'social/bind'},
  socialSync: {method: 'POST', url: 'social/sync'},
  socialAuth: {method: 'GET', url: 'social_auth'},
  registerWithEmail: {method: 'POST', url: 'register_with_email'},
  registerWithUsername: {method: 'POST', url: 'register_with_user_name'},
  registerWithMobile: {method: 'POST', url: 'register_with_mobile'},
  sendRegistValidateSms: {method: 'POST', url: 'send_regist_validate_sms'},
  sendResetValidateSms: {method: 'POST', url: 'send_reset_validate_sms'},
  sendMobileValidateSms: {method: 'POST', url: 'send_mobile_validate_sms'},
  resetPasswordWithMobile: {method: 'POST', url: 'reset_password_with_mobile'},
  resetPasswordWithEmail: {method: 'POST', url: 'reset_password_with_email'},
  resendRegistEmailValidate: {method: 'POST', url: 'resend_regist_email_validate'},
  checkRegistMobile: {method: 'POST', url: 'check_regist_mobile'},
  checkResetMobile: {method: 'POST', url: 'check_reset_mobile'},
  rewardPointDetails: {method: 'GET', url: 'reward_point_details'},
  remove: {method: 'POST', url: 'remove'}
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
 * &&` ^^^account^^^ 类型：String<br/>当前登录的用户名
 * &&` ^^^customer^^^ 类型：Object<br/>当前登录的用户信息 [查看详情](/development/s/5432566de2931e235b000003)
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
 * ```vcodeLogin
 * `` user
 * &` 类型：Object
 * &&` ^^^account^^^ 类型：String<br/>手机号码
 * &&` ^^^verify_code^^^ 类型：String<br/>手机短信验证码
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>登录或注册后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：登录或注册成功<br/>201：登录或注册失败
 * &&` ^^^message^^^ 类型：String<br/>登录或注册失败原因（当 code 为 201 时）
 * &&` ^^^account^^^ 类型：String<br/>当前登录或注册的用户名
 * &&` ^^^customer^^^ 类型：Object<br/>当前登录或注册的用户信息 [查看详情](/development/s/5432566de2931e235b000003)
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
 * &&` ^^^real_name^^^ 类型：String<br/>真实姓名
 * &&` ^^^sex^^^ 类型：String<br/>性别，可选的值包括：
 * &&&&` male: 男
 * &&&&` female: 女
 * &&&&` undefined: 保密
 * &&` ^^^birthday^^^ 类型：String<br/>生日，如"1926-08-17"
 * &&` ^^^indentity_card^^^ 类型：String<br/>身份证号码
 * &&` ^^^meta_fields^^^（选填） 类型：String<br/>序列化的地址拓展字段（JSON字符串），包含下列属性<br/><ul><li>`name`：String 类型，MetaField 的唯一字符串标识。仅支持小写字母、数字、中横和下划线，最多 200 个字符。</li><li>`description`：String 类型，MetaField 的说明，最多 2000 个字符。</li><li>`fields`：Object 类型，MetaField 的字段，Key-Value 结构对象。</li></ul>
 * &&& ^^^
 * &&& meta_fields = JSON.stringify({
 * &&&    name: 'info',
 * &&&    description: '信息',
 * &&&    fields: {
 * &&&        city: '深圳'
 * &&&    }
 * &&&})
 * &&& ^^^
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>更新后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：更新信息成功<br/>201：更新信息失败
 * &&` ^^^message^^^ 类型：String<br/>更新信息失败原因（当 code 为 201 时）
 * &&` ^^^customer^^^ 类型：Object<br/>更新后的用户信息 [查看详情](/development/s/5432566de2931e235b000003)
 * ```
 *
 * ```socialBind
 * `` user
 * &` 类型：Object
 * &&` ^^^account^^^ 类型：String<br/>用户账号（非必须）
 * &&` ^^^password^^^ 类型：String<br/>用户密码（非必须）
 * &&` ^^^notify_email^^^ 类型：String<br/>通知邮箱（非必须）
 * &&` ^^^notify_phone^^^ 类型：String<br/>通知手机（非必须）
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>发送后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：绑定成功<br/>非 200：绑定失败
 * &&` ^^^message^^^ 类型：String<br/>绑定失败原因（当 code 为非 200 时）
 * &&` ^^^bind_success^^^ 类型：Boolean<br/>社交账号是否绑定相关信息成功
 * &&` ^^^customer^^^ 类型：Object<br/>主账号用户信息 [查看详情](/development/s/5432566de2931e235b000003)
 * &&` ^^^current_customer^^^ 类型：Object<br/>社交账号用户信息（信息格式与 customer 类似）
 * &&& &nbsp;
 * &&& ^^^
 * &&& {
 * &&&   "code": 200,
 * &&&   "message": "",
 * &&&   "bind_success": true,
 * &&&   "current_customer": {
 * &&&     "accept_marketing": false,
 * &&&     "avatar_url": "//asset.ibanquan.com/image/5bebcd3c8c77402e52000333/avatar_url.jpg",
 * &&&     "birthday": null,
 * &&&     "customer_level": {
 * &&&       "avatar_url": "//asset.ibanquan.com/image/569547ca0abc3e71be000003/custom_level_default.png",
 * &&&       "credits": 10000,
 * &&&       "discount": 50,
 * &&&       "id": 1557,
 * &&&       "name": "lvmax"
 * &&&     },
 * &&&     "email": null,
 * &&&     "id": 888,
 * &&&     "indentity_card": null,
 * &&&     "last_order_at": "2019-02-12T10:51:12.878+08:00",
 * &&&     "last_order_no": "2019021215059454044",
 * &&&     "last_year_point": 42,
 * &&&     "metas": {},
 * &&&     "mobile": "13800138000",
 * &&&     "name": "13800138000",
 * &&&     "notify_email": "",
 * &&&     "notify_phone": "13800138000",
 * &&&     "orders_count": 33,
 * &&&     "point": 0,
 * &&&     "real_name": null,
 * &&&     "reg_type": 2,
 * &&&     "regist_at": "2018-05-13T17:25:05.757+08:00",
 * &&&     "sex": "undefined",
 * &&&     "social_accounts": [
 * &&&       {
 * &&&         "avatar_url": "",
 * &&&         "bind_url": "https://youhaosuda.com/api/auth?type=douban&direct_bind=true",
 * &&&         "binded": false,
 * &&&         "name": "",
 * &&&         "type": "douban"
 * &&&       },
 * &&&       {
 * &&&         "avatar_url": "",
 * &&&         "bind_url": "https://youhaosuda.com/api/auth?type=weibo&direct_bind=true",
 * &&&         "binded": false,
 * &&&         "name": "",
 * &&&         "type": "weibo"
 * &&&       },
 * &&&       {
 * &&&         "avatar_url": "",
 * &&&         "bind_url": "https://youhaosuda.com/api/auth?type=qq&direct_bind=true",
 * &&&         "binded": false,
 * &&&         "name": "",
 * &&&         "type": "qq"
 * &&&       },
 * &&&       {
 * &&&         "avatar_url": "",
 * &&&         "bind_url": "https://youhaosuda.com/api/auth?type=renren&direct_bind=true",
 * &&&         "binded": false,
 * &&&         "name": "",
 * &&&         "type": "renren"
 * &&&       },
 * &&&       {
 * &&&         "avatar_url": "",
 * &&&         "bind_url": "https://youhaosuda.com/api/auth?type=netease&direct_bind=true",
 * &&&         "binded": false,
 * &&&         "name": "",
 * &&&         "type": "netease"
 * &&&       },
 * &&&       {
 * &&&         "avatar_url": "",
 * &&&         "bind_url": "https://youhaosuda.com/api/auth?type=weixin&direct_bind=true",
 * &&&         "binded": false,
 * &&&         "name": "",
 * &&&         "type": "weixin"
 * &&&       },
 * &&&       {
 * &&&         "avatar_url": "",
 * &&&         "bind_url": "https://youhaosuda.com/api/auth?type=facebook&direct_bind=true",
 * &&&         "binded": false,
 * &&&         "name": "",
 * &&&         "type": "facebook"
 * &&&       }
 * &&&     ],
 * &&&     "social_id": null,
 * &&&     "social_type": false,
 * &&&     "total_credit": 101114,
 * &&&     "total_spent": 21078,
 * &&&     "uname": null
 * &&&   },
 * &&&   "customer": null
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```socialSync
 * `` user
 * &` 类型：Object
 * &&` ^^^account^^^ 类型：String<br/>用户账号
 * &&` ^^^password^^^ 类型：String<br/>用户密码
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>发送后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：绑定成功<br/>非 200：绑定失败
 * &&` ^^^message^^^ 类型：String<br/>绑定失败原因（当 code 为非 200 时）
 * &&` ^^^bind_success^^^ 类型：Boolean<br/>社交账号是否绑定相关信息成功
 * &&` ^^^customer^^^ 类型：Object<br/>主账号用户信息 [查看详情](/development/s/5432566de2931e235b000003)
 * &&` ^^^current_customer^^^ 类型：Object<br/>社交账号用户信息（信息格式与 customer 类似）
 * &&& &nbsp;
 * &&& ^^^
 * &&& {
 * &&&   "code": 200,
 * &&&   "message": "",
 * &&&   "bind_success": true,
 * &&&   "current_customer": {
 * &&&     "accept_marketing": false,
 * &&&     "avatar_url": "//asset.ibanquan.com/image/5bebcd3c8c77402e52000333/avatar_url.jpg",
 * &&&     "birthday": null,
 * &&&     "customer_level": {
 * &&&       "avatar_url": "//asset.ibanquan.com/image/569547ca0abc3e71be000003/custom_level_default.png",
 * &&&       "credits": 10000,
 * &&&       "discount": 50,
 * &&&       "id": 1557,
 * &&&       "name": "lvmax"
 * &&&     },
 * &&&     "email": null,
 * &&&     "id": 888,
 * &&&     "indentity_card": null,
 * &&&     "last_order_at": "2019-02-12T10:51:12.878+08:00",
 * &&&     "last_order_no": "2019021215059454044",
 * &&&     "last_year_point": 42,
 * &&&     "metas": {},
 * &&&     "mobile": "13800138000",
 * &&&     "name": "13800138000",
 * &&&     "notify_email": "",
 * &&&     "notify_phone": "13800138000",
 * &&&     "orders_count": 33,
 * &&&     "point": 0,
 * &&&     "real_name": null,
 * &&&     "reg_type": 2,
 * &&&     "regist_at": "2018-05-13T17:25:05.757+08:00",
 * &&&     "sex": "undefined",
 * &&&     "social_accounts": [
 * &&&       {
 * &&&         "avatar_url": "",
 * &&&         "bind_url": "https://youhaosuda.com/api/auth?type=douban&direct_bind=true",
 * &&&         "binded": false,
 * &&&         "name": "",
 * &&&         "type": "douban"
 * &&&       },
 * &&&       {
 * &&&         "avatar_url": "",
 * &&&         "bind_url": "https://youhaosuda.com/api/auth?type=weibo&direct_bind=true",
 * &&&         "binded": false,
 * &&&         "name": "",
 * &&&         "type": "weibo"
 * &&&       },
 * &&&       {
 * &&&         "avatar_url": "",
 * &&&         "bind_url": "https://youhaosuda.com/api/auth?type=qq&direct_bind=true",
 * &&&         "binded": false,
 * &&&         "name": "",
 * &&&         "type": "qq"
 * &&&       },
 * &&&       {
 * &&&         "avatar_url": "",
 * &&&         "bind_url": "https://youhaosuda.com/api/auth?type=renren&direct_bind=true",
 * &&&         "binded": false,
 * &&&         "name": "",
 * &&&         "type": "renren"
 * &&&       },
 * &&&       {
 * &&&         "avatar_url": "",
 * &&&         "bind_url": "https://youhaosuda.com/api/auth?type=netease&direct_bind=true",
 * &&&         "binded": false,
 * &&&         "name": "",
 * &&&         "type": "netease"
 * &&&       },
 * &&&       {
 * &&&         "avatar_url": "",
 * &&&         "bind_url": "https://youhaosuda.com/api/auth?type=weixin&direct_bind=true",
 * &&&         "binded": false,
 * &&&         "name": "",
 * &&&         "type": "weixin"
 * &&&       },
 * &&&       {
 * &&&         "avatar_url": "",
 * &&&         "bind_url": "https://youhaosuda.com/api/auth?type=facebook&direct_bind=true",
 * &&&         "binded": false,
 * &&&         "name": "",
 * &&&         "type": "facebook"
 * &&&       }
 * &&&     ],
 * &&&     "social_id": null,
 * &&&     "social_type": false,
 * &&&     "total_credit": 101114,
 * &&&     "total_spent": 21078,
 * &&&     "uname": null
 * &&&   },
 * &&&   "customer": null
 * &&& }
 * &&& ^^^
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
 * &&` ^^^meta_fields^^^（选填） 类型：String<br/>序列化的地址拓展字段（JSON字符串），包含下列属性<br/><ul><li>`name`：String 类型，MetaField 的唯一字符串标识。仅支持小写字母、数字、中横和下划线，最多 200 个字符。</li><li>`description`：String 类型，MetaField 的说明，最多 2000 个字符。</li><li>`fields`：Object 类型，MetaField 的字段，Key-Value 结构对象。</li></ul>
 * &&& ^^^
 * &&& meta_fields = JSON.stringify({
 * &&&    name: 'info',
 * &&&    description: '信息',
 * &&&    fields: {
 * &&&        city: '深圳'
 * &&&    }
 * &&&})
 * &&& ^^^
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
 * &` 类型：Function( 返回对象 )<br/>发送后的回调函数
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
 * &` 类型：Function( 返回对象 )<br/>发送后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：发送成功<br/>214：该操作需要验证码<br/>201：发送失败
 * &&` ^^^message^^^ 类型：String<br/>发送信息失败原因（当 code 为 201 时）
 * ```
 *
 * ```sendMobileValidateSms
 * `` param
 * &` 类型：Object
 * &&` ^^^mobile^^^ 类型：String<br/>中国大陆手机号码
 * &&` ^^^captcha_id^^^ 类型：String 选填<br/>验证码图片 id [获取验证码](/development/s/55b66f1d0abc3e746a000002)
 * &&` ^^^captcha_value^^^ 类型：String 选填<br/>验证码图片中显示的值 [获取验证码](/development/s/55b66f1d0abc3e746a000002)
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>发送后的回调函数
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
 * &` 类型：Function( 返回对象 )<br/>发送后的回调函数
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
 * ```resendRegistEmailValidate
 * `` param
 * &` 类型：Object
 * &&` ^^^email^^^ 类型：String<br/>需要重发激活邮件的邮箱地址
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>重发激活邮件后的回调函数
 * &&` ^^^code^^^ 类型：Number<br/>200：发送成功
 * &&` ^^^message^^^ 类型：String<br/>发送信息失败原因（当 code 不为 200 时）
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
 * ```rewardPointDetails
 * `` param
 * &` 类型：Object
 * &&` ^^^three_month_ago^^^ 类型：Boolean 选填<br/>三个月前的积分
 * &&` ^^^last_three_month^^^ 类型：Boolean 选填<br/>三个月内的积分
 * &&` ^^^size^^^ 类型：Number 选填<br/>指定返回每页的数目
 * &&` ^^^page^^^ 类型：Number 选填<br/>指定返回分页页码
 * &&` ^^^nopage^^^ 类型：String 选填<br/>指定是否分页
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>请求后的回调函数
 * &&` ^^^reward_point_total^^^ 类型：Number<br/>账号积分总数
 * &&` ^^^last_year_point^^^ 类型：Number<br/>账号上一年积分总数
 * &&` ^^^reward_point_details^^^ 类型：Array<br/>账号积分详细信息
 * &&` ^^^is_empty^^^ 类型：Boolean<br/>是否为空
 * &&` 返回对象中包含分页对象 paging [查看详情](/development/s/5587c0b00abc3e41b300002d#-paging-)
 * ```
 *
 * ```remove
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>删除账号后的回调函数
 * &&& ^^^
 * &&& {
 * &&&     "code": 200,
 * &&&     "message": ""
 * &&& }
 * &&& ^^^
 * ```
 *
 * @param {current} `callback` 获取当前顾客信息
 * @param {login} `user,callback` 顾客登录
 * @param {vcodeLogin} `user,callback` 顾客手机账号短信验证码登录或注册
 * @param {logout} `callback` 顾客登出 （必须登录）
 * @param {changePassword} `password,callback` 顾客修改密码 （必须登录）
 * @param {save} `notify,callback` 更新顾客信息 （必须登录）
 * @param {socialBind} `user,callback` 社交账号绑定普通账号（系统强制绑定）
 * @param {socialSync} `user,callback` 社交账号绑定普通账号（用户主动绑定）
 * @param {register} `param,callback` 注册顾客账号
 * @param {sendRegistValidateSms} `param,callback` 顾客注册手机号码账号时，获取短信验证码
 * @param {sendResetValidateSms} `param,callback` 顾客找回手机号码账号密码时，获取短信验证码
 * @param {sendMobileValidateSms} `param,callback` 顾客用手机号码登录或注册时，获取短信验证码
 * @param {resetPasswordWithMobile} `param,callback` 重设手机号码账号密码
 * @param {resetPasswordWithEmail} `param,callback` 发送邮箱账号重置密码邮件
 * @param {resendRegistEmailValidate} `param,callback` 重发邮箱注册激活邮件
 * @param {checkRegistMobile} `param,callback` 检测手机是否未注册（多用于顾客注册手机号码账号时检测用）
 * @param {checkResetMobile} `param,callback` 检测手机是否已注册（用于顾客重设手机号码账号密码时检测用）
 * @param {rewardPointDetails} `param,callback` 获取当前账号积分详细信息
 * @param {remove} `callback` 注销账号
 *
 */
