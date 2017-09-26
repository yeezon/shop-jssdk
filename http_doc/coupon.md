# api/v1/coupon 接口说明

优惠券。


### **GET /**

获取当前账号绑定的优惠券

<!-- .api-param -->

* auth: `true`
* 返回数据
    ```
    {
        "code" : 200,
        "message" : "",
        "coupons" : [
            {
                "id": 15,
                "code": "6PMAB5", // 优惠券代码
                "coupon_group_name": "新春大促！100元减20元优惠券", // 优惠券名称
                "active_amount": 10000, // 满足使用该优惠券的金额，满100元
                "discount_amount": 2000, // 使用该优惠券之后减免的金额，减免20元
                "cart_match": false, // 当前购物车内的商品是否能使用该优惠券
                "status": "expired" // 优惠券状态：expired(过期)，used(已使用)，pending(可使用)
            },
            {
                "id": 556508,
                "code": "CDECAMD3F3",
                "coupon_group_name": "5毛抵用券！",
                "active_amount": 0, // 满0元
                "discount_amount": 50, // 减免5毛
                "cart_match": true,
                "status": "used"
            },
            {
                "id": 537725,
                "code": "BPDJ8Q",
                "coupon_group_name": "10元优惠券",
                "active_amount": 10300,
                "discount_amount": 10000,
                "cart_match": false,
                "status": "pending"
            }
        ]
    }
    ```

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **GET /verify**

验证优惠码对于当前购物车是否可用

<!-- .api-param -->

* 参数
    * ```coupon_code``` 类型：String<br/>优惠券代码
* 返回数据
    ```
    {
        "code" : 200,
        "message" : "",
        "avail": true, // 优惠券是否可用
        "discount_amount": 50 // 优惠券面值
    }
    ```

<!-- endapi -->