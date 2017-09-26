# api/v1/payment_method 接口说明

支付方式。

### **GET /**（必须登录）

获取支付方式 （必须登录）

<!-- .api-param -->

* auth: `true`
* 参数
    * ```address_id```（选填） 类型：Number<br/>收货人地址 id，不传入则不做配送区域判断

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **GET /** （免登录下单）

获取支付方式（免登录下单），默认使用离线购物车

<!-- .api-param -->

* 参数
    * ```items```（选填） 类型：Json<br/>该订单包含的商品。如果使用此参数，则不使用离线购物车的数据。例如：<br/>```[{"variant_id":17,"quantity":1},{"variant_id":992,"quantity":2}]```
    * ```district_code```（选填） 类型：Number<br/>收货区域编码（最后一级），不传入则不做配送区域判断

<!-- endapi -->