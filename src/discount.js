var base = require('./base.js');
var expo = require('./expo.js');
var util = require('./util.js');

var aConfig = {
    get: {url: ''},
    matchCart: {url: 'match/cart'},
    matchProduct: {url: 'match/product'}
};

var module = base('discount', function(factory){
  //
  factory.createByConfig(aConfig);
  //
});

util.forEach(aConfig, function(value, key){
  exports[key] = expo(module, key);
});

/**
 * 营销活动
 *
 * ```matchCart
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "discounts": [
 * &&&         {
 * &&&             "id": "836",
 * &&&             "name": "满减：购买达到一定金额，得到减免金额",
 * &&&             "handle": "d000613",
 * &&&             "page_url": "/discounts/d000613",
 * &&&             "discount_type": "amount_off", // 营销活动类型：amount_off(满减)，percent_off(满折)，coupon(满赠券)
 * &&&             "discount_amount": 100, // 减免金额
 * &&&             "match_item_amount": 800, // 当前满足此优惠的商品总价(非购物车总价)
 * &&&             "coupon_group_id": 0,
 * &&&             "range_type": "partial", // 营销活动范围：entire(全部商品)，partial(部分商品，商品列表查询 range_products 字段)
 * &&&             "range_products": [89],
 * &&&             "active_type": "entire", // 营销活动对象：entire(全部顾客)，customer_level(指定顾客等级)，partial(部分顾客)，first_trade(首次下单顾客)
 * &&&             "details": [ // 当前 discount_type 为 amount_off (满折)时，优惠规则为：
 * &&&                {
 * &&&                    "active_amount": 1200, // 满12元
 * &&&                    "discount_amount": 300 // 减3元
 * &&&                },
 * &&&                {
 * &&&                    "active_amount": 1000, // 满10元
 * &&&                    "discount_amount": 200 // 减2元
 * &&&                },
 * &&&                {
 * &&&                    "active_amount": 800,	 // 满8元
 * &&&                    "discount_amount": 100 // 减1元
 * &&&                }
 * &&&            ]
 * &&&         },
 * &&&         {
 * &&&             "id": "835",
 * &&&             "name": "满折：购买达到一定金额，得到优惠折扣",
 * &&&             "handle": "d000614",
 * &&&             "page_url": "/discounts/d000614",
 * &&&             "discount_type": "percent_off", // 营销活动类型：amount_off(满减)，percent_off(满折)，coupon(满赠券)
 * &&&             "discount_amount": 180, // 计算优惠折扣后，减免的金额。match_item_amount * (100 - discount_percent) / 100 = 900 * (100 - 80) / 100 = 180
 * &&&             "match_item_amount": 900, // 当前满足此优惠的商品总价(非购物车总价)
 * &&&             "coupon_group_id": 0,
 * &&&             "range_type": "entire", // 营销活动范围：entire(全部商品)，partial(部分商品，商品列表查询 range_products 字段)
 * &&&             "range_products": [],
 * &&&             "active_type": "entire", // 营销活动对象：entire(全部顾客)，customer_level(指定顾客等级)，partial(部分顾客)，first_trade(首次下单顾客)
 * &&&             "details": [ // 当前 discount_type 为 percent_off (满折)时，优惠规则为：
 * &&&                {
 * &&&                    "active_amount": 1200, // 满12元
 * &&&                    "discount_percent": 60 // 打6折
 * &&&                },
 * &&&                {
 * &&&                    "active_amount": 1000, // 满10元
 * &&&                    "discount_percent": 70 // 打7折
 * &&&                },
 * &&&                {
 * &&&                    "active_amount": 800,	 // 满8元
 * &&&                    "discount_percent": 80 // 打8折
 * &&&                }
 * &&&            ]
 * &&&         },
 * &&&         {
 * &&&             "id": "839",
 * &&&             "name": "满赠券：购买达到一定金额，赠送购物优惠券",
 * &&&             "handle": "d000639",
 * &&&             "page_url": "/discounts/d000639",
 * &&&             "discount_type": "coupon", // 营销活动类型：amount_off(满减)，percent_off(满折)，coupon(满赠券)
 * &&&             "discount_amount": 0, // 无减免金额
 * &&&             "match_item_amount": 900, // 当前满足此优惠的商品总价(非购物车总价)
 * &&&             "coupon_group_id": 288,
 * &&&             "range_type": "entire", // 营销活动范围：entire(全部商品)，partial(部分商品，商品列表查询 range_products 字段)
 * &&&             "range_products": [],
 * &&&             "active_type": "entire", // 营销活动对象：entire(全部顾客)，customer_level(指定顾客等级)，partial(部分顾客)，first_trade(首次下单顾客)
 * &&&             "details": [ // 当前 discount_type 为 coupon (满折)时，优惠规则为：
 * &&&                {
 * &&&                    "active_amount": 4000, // 满足赠送优惠券的金额
 * &&&                    "coupon_group_id": 287,
 * &&&                    "coupon_group_name": "圣诞节大促！满40元送20元抵用券！",
 * &&&                    "coupon_discount_amount": 2000  // 优惠券面值
 * &&&                },
 * &&&                {
 * &&&                    "active_amount": 800, // 满足赠送优惠券的金额
 * &&&                    "coupon_group_id": 288,
 * &&&                    "coupon_group_name": "平安夜大促！满8元送3元抵用券！",
 * &&&                    "coupon_discount_amount": 300  // 优惠券面值
 * &&&                }
 * &&&            ]
 * &&&         }
 * &&&     ]
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```matchProduct
 * `` handle
 * &` 类型：String<br/>指定商品的handle。
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数。
 * ```
 *
 * @param {matchCart} `callback` 获取当前购物车满足条件的营销活动
 * @param {matchProduct} `handle,callback` 获取指定商品相关的营销活动
 *
 */