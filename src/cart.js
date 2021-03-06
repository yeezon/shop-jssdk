var base = require('./base.js');
var util = require('./util.js');
var expo = require('./expo.js');
var localCart = require('./localcart.js');
var events = require('./events.js');

var aConfig = {
  get: {url: ''},
  add: {method: 'POST', url: 'create'},
  quantity: {method: 'POST', url: 'set'},
  checkOne: {method: 'POST', url: 'check'},
  unCheckOne: {method: 'POST', url: 'uncheck'},
  checkAll: {method: 'POST', url: 'all_check'},
  unCheckAll: {method: 'POST', url: 'all_uncheck'},
  removeOne: {method: 'POST', url: 'remove'},
  removeAll: {method: 'POST', url: 'all_remove'},
  multiRemove: {method: 'POST', url: 'multi_remove'},
  withinShipments: {url: 'within_shipments'},
  mustShipping: {url: 'must_shipping'}
};

var module = base('cart', function(factory){
  factory.createByConfig(aConfig);
});

exports.get = function(oCall){
  //
  var cart = this;
  //
  module.get(function(o){
    var self = this;
    var res = o.res;
    if(res.cart && res.cart.items){
      cart.cache = res.cart.items;
    }else{
      cart.cache = [];
    }
    //
    if(res.discount){
      events.publish('discount.get.done', {
        data : res.discount || false
      });
    }
    //
    if(oCall){
      oCall(o);
    }
  });
};

var oLocalCartMap = {
  add: 'add',
  quantity: 'add',
  checkOne: 'checkOne',
  unCheckOne: 'checkOne',
  checkAll: 'checkAll',
  unCheckAll: 'checkAll',
  multiRemove: 'multiRemove',
  removeOne: 'removeOne',
  removeAll: 'removeAll'
};

util.forEach(oLocalCartMap, function(value, key){
    //
  exports[key] = function(oParam, oCall){
    //
    var oLocalCartParam, oCallback;
    // 兼容不需要传入 oParam 的方法
    switch(key){
      case 'checkAll':
      case 'unCheckAll':
      case 'removeAll':
        oLocalCartParam = {};
        oCallback = oParam;
        break;
      default:
        oLocalCartParam = oParam;
        oCallback = oCall;
    }
    //
    module[key](oLocalCartParam, function(o){
      var res = o.res;
      var args = [];
      switch(res.code){
        case 200:
          break;
        case 212:
          switch(key){
            case 'add':
              args.push({
                item: oLocalCartParam
              });
              break;
            case 'quantity':
              delete oLocalCartParam.is_check;
              args.push({
                item: oLocalCartParam,
                is_set: true
              });
              break;
            case 'checkOne':
              oLocalCartParam.is_check = true;
              args.push({
                item: oLocalCartParam
              });
              break;
            case 'unCheckOne':
              oLocalCartParam.is_check = false;
              args.push({
                item: oLocalCartParam
              });
              break;
            case 'checkAll':
              args.push({
                is_check: true
              });
              break;
            case 'unCheckAll':
              args.push({
                is_check: false
              });
              break;
            case 'removeOne':
              args.push({
                item: oLocalCartParam
              });
              break;
            case 'removeAll':
              // 不需参数
              break;
            case 'multiRemove':
              args.push({
                items: oLocalCartParam
              });
              break;
            default:
              args.push(oLocalCartParam);
          }
          localCart[value].apply(localCart, args);
          break;
        default:
          events.publish('cart.' + key + '.fail', {
            res: o,
            data: 'fail'
          });
      }
      if(oCallback){
        // o.result = 'localcart.' + key + '.success';
        oCallback(o);
      }
    }, false, false, {
      'code212': function(o){
        return o;
      }
    });
  };
  //
  exports.withinShipments = expo(module, 'withinShipments');
  exports.mustShipping = expo(module, 'mustShipping');
  //
});



/**
 * 购物车。当顾客尚未登录时，自动使用基于 cookie 的本地购物车
 *
 * ```get
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * &&& ^^^
 * &&& {
 * &&&     "code" : 200,
 * &&&     "message" : "",
 * &&&     "cart" : {
 * &&&         "items" : [{ // 购物车商品列表
 * &&&                 "variant_id" : 995, // 商品价格id
 * &&&                 "quantity" : 3, // 商品件数
 * &&&                 "price" : 100, // 商品单价
 * &&&                 "weight" : 0, // 商品重量
 * &&&                 "volume" : 0, // 商品体积
 * &&&                 "options_desc" : "颜色:", // 商品价格选项组合描述
 * &&&                 "is_check" : true, // 在当前购物车中是否选中（未选中的商品将不会被提交到订单）
 * &&&                 "available" : true, // 商品是否有效
 * &&&                 "reason" : "", // 商品无效原因
 * &&&                 "name" : "口香糖组合", // 商品名称
 * &&&                 "page_url" : "/products/0556b7d52eed4189ab", // 商品页面地址
 * &&&                 "image_id" : "53faef8063", // 商品图片id
 * &&&                 "image_name" : "1.jpg", // 商品图片名称
 * &&&                 "image_epoch" : "1408803551", // 商品图片版本号
 * &&&                 "image_src" : "http://asset.localtestasset.com/image/53faef8063.jpg1408803551", // 原图地址
 * &&&                 "line_price" : 300 // 商品总价
 * &&&             }],
 * &&&         "item_count" : 1 // 商品种类
 * &&&     },
 * &&&     "discount" : { // 满足的优惠活动
 * &&&         "discount_name" : "满3元减1元", // 优惠活动名称
 * &&&         "discount_page_url" : "/discounts/D000002", // 优惠活动页面地址
 * &&&         "active_amount" : 300, // 满减条件
 * &&&         "discount_amount" : 100 // 满减金额
 * &&&     }
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```add
 * `` item
 * &` 类型：Object
 * &&` ^^^variant_id^^^ 类型：Number<br/>商品价格的id
 * &&` ^^^quantity^^^ 类型：Number<br/>商品数量
 * &&` ^^^is_check^^^ 类型：Boolean<br/>选中该商品，一般都使用^^^true^^^
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```quantity
 * `` item
 * &` 类型：Object
 * &&` ^^^variant_id^^^ 类型：Number<br/>商品价格的id
 * &&` ^^^quantity^^^ 类型：Number<br/>商品数量
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```checkOne
 * `` item
 * &` 类型：Object
 * &&` ^^^variant_id^^^ 类型：Number<br/>商品价格的id
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```unCheckOne
 * `` item
 * &` 类型：Object
 * &&` ^^^variant_id^^^ 类型：Number<br/>商品价格的id
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```checkAll
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```unCheckAll
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```removeOne
 * `` item
 * &` 类型：Object
 * &&` ^^^variant_id^^^ 类型：Number<br/>商品价格的id
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```removeAll
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```multiRemove
 * `` items
 * &` 类型：Object
 * &&` ^^^variant_ids^^^ 类型：Array[Number]<br/>商品价格的id组成的数组
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```withinShipments
 * `` param
 * &` 类型：Object
 * &&` ^^^address_id^^^ 类型：Number<br/>收货人地址 id
 * &&` ^^^payment_method_type^^^ 类型：String<br/>支付类型
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```withinShipmentsPoly1
 * `` param
 * &` 类型：Object
 * &&` ^^^district_code^^^ 类型：String<br/>收货地区 post
 * &&` ^^^payment_method_type^^^ 类型：String<br/>支付类型
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * ```mustShipping
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>提交后的回调函数
 * ```
 *
 * @param {get} `callback` 获取购物车
 * @param {add} `item,callback` 将商品加入购物车
 * @param {quantity} `item,callback` 修改商品数量
 * @param {checkOne} `item,callback` 选中单个商品
 * @param {unCheckOne} `item,callback` 取消选中单个商品
 * @param {checkAll} `callback` 选中所有商品
 * @param {unCheckAll} `callback` 取消选中所有商品
 * @param {removeOne} `item,callback` 删除购物车中的单个商品
 * @param {removeAll} `callback` 删除购物车中的所有商品
 * @param {multiRemove} `items,callback` 删除购物车中的多个商品
 * @param {withinShipments} `param,callback` 获取带有物流信息的购物车（必须登录）
 * @param {withinShipmentsPoly1} `param,callback` 获取带有物流信息的购物车（未登录下单）
 * @param {mustShipping} `callback` 检查购物车是否需要物流
 *
 */