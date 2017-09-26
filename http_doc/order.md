# api/v1/order 接口说明

订单

### **GET /**

获取订单列表

<!-- .api-param -->

* auth: `true`
* 参数
    * ```order_no``` 类型：String 选填<br/>指定订单编号<br/>未登录时调用此接口，将返回指定订单的简单详情<br>如果传了这个参数，不要传其他参数
    * ```order_nos``` 类型：String 选填<br/>指定多个订单编号，以“,”分隔
    * ```status``` 类型：Number 选填<br/>指定订单状态，<br/>0 - 订单进行中<br/>1 - 订单取消<br/>2 - 订单退单申请处理中<br/>3 - 订单退单完成<br/>4 - 订单完成<br/>5 - 支付过期
    * ```shipment_status``` 类型：Number 选填<br/>指定物流状态，<br/>0 - 未发货<br/>1 - 已发货<br/>2 - 已签收<br/>3 - 部分发货
    * ```payment_status``` 类型：Number 选填<br/>指定物流状态，<br/>0 - 未付款<br/>1 - 货到付款（已弃用，统一为 2）<br/>2 - 付款成功<br/>3 - 付款超时
    * ```size``` 类型：Number<br/>指定返回每页的数目
    * ```page``` 类型：Number<br/>指定返回分页页码

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **GET /receive**

指定订单的指定运单确认收货

<!-- .api-param -->

* auth: `true`
* 参数
    * ```order_no``` 类型：String<br/>指定订单编号
    * ```shipment_id``` 类型：String<br/>指定运单编号

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **POST /create**

提交订单 （必须登录）

<!-- .api-param -->

* auth: `true`
* 参数
    * ```address_id``` 类型：Number<br/>收货人信息id
    * ```payment_method_id``` 类型：Number<br/>支付方式id
    * ```bank_code_id```（选填） 类型：Number<br/>支付银行id，当 payment_method_id 为银行卡支付方式时必填
    * ```remark```（选填） 类型：String<br/>订单备注
    * ```shipments``` 类型：Json<br/>配送方式Json对象。例如：<br/>```[{"id":59,"shipment_method_id":90},{"id":61,"shipment_method_id":81}]```
    * ```coupon_code```（选填） 类型：String<br/>优惠券编码
    * ```reward_point```（选填） 类型：Number<br/>使用的积分数量
    * ```meta_fields```（选填） 类型：Json<br/>拓展订单对象数据Json对象，参考 [Metafields API](/app/s/553e347e0abc3e6f3e000038)
     * `name`（必填） 类型：String<br/>Metafield 的唯一字符串标识<br/>特殊值`order_attributes`，此时`fields`内的键值对将会展示在“管理后台-订单详情-附加信息”里
     * `description`（必填） 类型：String<br/>Metafield 的说明，最多 2000 个字符
     * `fields`（必填） 类型：Object<br/>Metafield 的字段，Key-Value 结构对象
* * callback
  * 类型：Function( 返回对象 )<br/>提交后的回调函数

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **POST /create**

匿名提交订单（免登录下单），默认使用离线购物车

<!-- .api-param -->

* 参数
    * ```items```（选填） 类型：Json<br/>该订单包含的商品。如果使用此参数，则不使用离线购物车的数据。例如：<br/>```[{"variant_id":17,"quantity":1},{"variant_id":992,"quantity":2}]```
    * ```name``` 类型：String 长度：255<br/>收货人姓名
    * ```district_code``` 类型：String 长度：255<br/>收货区域编码（最后一级）
    * ```detail``` 类型：String 长度：255<br/>详细收货地址
    * ```zipcode```（选填） 类型：String 长度：255<br/>邮编
    * ```mobile``` 类型：String 长度：255<br/>移动电话号码
    * ```telephone```（选填） 类型：String 长度：255<br/>联系电话
    * ```email```（选填） 类型：String 长度：255<br/>邮箱
    * ```payment_method_id``` 类型：Number<br/>支付方式id
    * ```bank_code_id```（选填） 类型：Number<br/>支付银行id，当 payment_method_id 为银行卡支付方式时必填
    * ```remark```（选填） 类型：String<br/>订单备注。
    * ```shipments``` 类型：Json<br/>配送方式Json对象。例如：<br/>```[{"id":59,"shipment_method_id":90},{"id":61,"shipment_method_id":81}]```
    * ```coupon_code```（选填） 类型：String<br/>优惠券编码
    * ```reward_point```（选填） 类型：Number<br/>使用的积分数量
    * ```meta_fields```（选填） 类型：Json<br/>拓展订单对象数据Json对象，参考 [Metafields API](/app/s/553e347e0abc3e6f3e000038)
     * `name`（必填） 类型：String<br/>Metafield 的唯一字符串标识<br/>特殊值`order_attributes`，此时`fields`内的键值对将会展示在“管理后台-订单详情-附加信息”里
     * `description`（必填） 类型：String<br/>Metafield 的说明，最多 2000 个字符
     * `fields`（必填） 类型：Object<br/>Metafield 的字段，Key-Value 结构对象

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **POST /cancel**

取消指定订单

<!-- .api-param -->

* auth: `true`
* 参数
    * ```order_no``` 类型：String<br/>指定订单编号
    * ```reason``` 类型：String<br/>退单理由

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **GET /count**

获取指定状态订单的数量

<!-- .api-param -->

* auth: `true`
* 参数
    * ```status``` 类型：Number 选填<br/>指定订单状态，取值参考 [order.get([config,] callback)](#-get-config-callback-)
    * ```shipment_status``` 类型：Number 选填<br/>指定物流状态，取值参考 [order.get([config,] callback)](#-get-config-callback-)
    * ```payment_status``` 类型：Number 选填<br/>指定物流状态，取值参考 [order.get([config,] callback)](#-get-config-callback-)<br/>例如：<br/>```payment_status=0&status=0``` - 待付款 <br/>```payment_status=2&shipment_status=0,3``` - 待发货<br/>```shipment_status=1``` - 待收货
