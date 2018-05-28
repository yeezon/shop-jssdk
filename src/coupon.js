var base = require('./base.js');
var expo = require('./expo.js');
var util = require('./util.js');

var aConfig = {
    get: {url: ''},
    verify: {url: 'verify'},
    shopCoupon: {url: 'draw/:export_uuid', config: {RESTful: true}},
    getShopCoupon: {url: 'draw/:export_uuid/get', config: {RESTful: true}},
    count: {}
};

var module = base('coupon', function(factory){
  //
  factory.createByConfig(aConfig);
  //
});

util.forEach(aConfig, function(value, key){
  exports[key] = expo(module, key);
});

/**
 * 优惠券
 *
 * ```get
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数。
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "coupons" : [
 * &&&         {
 * &&&             "id": 15,
 * &&&             "code": "6PMAB5", // 优惠券代码
 * &&&             "coupon_group_name": "新春大促！100元减20元优惠券", // 优惠券名称
 * &&&             "active_amount": 10000, // 满足使用该优惠券的金额，满100元
 * &&&             "discount_amount": 2000, // 使用该优惠券之后减免的金额，减免20元
 * &&&             "cart_match": false, // 当前购物车内的商品是否能使用该优惠券
 * &&&             "status": "expired" // 优惠券状态：expired(过期)，used(已使用)，pending(可使用)
 * &&&         },
 * &&&         {
 * &&&             "id": 556508,
 * &&&             "code": "CDECAMD3F3",
 * &&&             "coupon_group_name": "5毛抵用券！",
 * &&&             "active_amount": 0, // 满0元
 * &&&             "discount_amount": 50, // 减免5毛
 * &&&             "cart_match": true,
 * &&&             "status": "used"
 * &&&         },
 * &&&         {
 * &&&             "id": 537725,
 * &&&             "code": "BPDJ8Q",
 * &&&             "coupon_group_name": "10元优惠券",
 * &&&             "active_amount": 10300,
 * &&&             "discount_amount": 10000,
 * &&&             "cart_match": false,
 * &&&             "status": "pending"
 * &&&         }
 * &&&     ]
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```verify
 * `` code
 * &` 类型：Object
 * &&` ^^^coupon_code^^^ 类型：String<br/>优惠券代码
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数。
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "avail": true, // 优惠券是否可用
 * &&&     "discount_amount": 50 // 优惠券面值
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```shopCoupon
 * `` code
 * &` 类型：Object
 * &&` ^^^id^^^ 类型：String<br/>优惠券领取 ID，优惠券领取链接的最后一节:<br />example.youhaovip.com/coupon/ **013aef9cd68f42038b78e5502cc75088**
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数。
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "coupon_group": {}, // 优惠券信息
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```getShopCoupon
 * `` code
 * &` 类型：Object
 * &&` ^^^id^^^ 类型：String<br/>优惠券领取 ID，优惠券领取链接的最后一节:<br />example.youhaovip.com/coupon/ **013aef9cd68f42038b78e5502cc75088**
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数。
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "领取成功",
 * &&&     "coupon": {}, // 优惠券信息
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```count
 * `` config
 * &` 类型：Object
 * &&` ^^^status^^^ 类型：Number 必填<br/>指定优惠券状态，`1`为可使用
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * &&& ^^^
 * &&& {
 * &&&     "code": 200,
 * &&&     "message": "",
 * &&&     "count": 1  // 优惠券的数量
 * &&& }
 * &&& ^^^
 * ```
 *
 * @param {get} `callback` 获取当前账号绑定的优惠券
 * @param {verify} `code,callback` 验证优惠码对于当前购物车是否可用
 * @param {shopCoupon} `code,callback` 获取指定可领取优惠券的信息
 * @param {getShopCoupon} `code,callback` 领取指定优惠券
 * @param {count} `[config,]callback` 获取指定状态优惠券的数量
 *
 */