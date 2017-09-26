# api/v1/cart 接口说明

购物车

<!-- api -->
<!-- .api-sdk -->

### **GET /**

获取购物车

<!-- .api-param -->

* auth: `true`
* 返回数据
    ```
    {
        "code" : 200,
        "message" : "",
        "cart" : {
            "items" : [{ // 购物车商品列表
                    "variant_id" : 995, // 商品价格id
                    "quantity" : 3, // 商品件数
                    "price" : 100, // 商品单价
                    "weight" : 0, // 商品重量
                    "volume" : 0, // 商品体积
                    "options_desc" : "颜色:", // 商品价格选项组合描述
                    "is_check" : true, // 在当前购物车中是否选中（未选中的商品将不会被提交到订单）
                    "available" : true, // 商品是否有效
                    "reason" : "", // 商品无效原因
                    "name" : "口香糖组合", // 商品名称
                    "page_url" : "/products/0556b7d52eed4189ab", // 商品页面地址
                    "image_id" : "53faef8063", // 商品图片id
                    "image_name" : "1.jpg", // 商品图片名称
                    "image_epoch" : "1408803551", // 商品图片版本号
                    "image_src" : "http://asset.localtestasset.com/image/53faef8063.jpg1408803551", // 原图地址
                    "line_price" : 300 // 商品总价
                }],
            "item_count" : 1 // 商品种类
        },
        "discount" : { // 满足的优惠活动
            "discount_name" : "满3元减1元", // 优惠活动名称
            "discount_page_url" : "/discounts/D000002", // 优惠活动页面地址
            "active_amount" : 300, // 满减条件
            "discount_amount" : 100 // 满减金额
        }
    }
    ```

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **POST /create**

将商品加入购物车

<!-- .api-param -->

* auth: `true`
* 参数
    * ```variant_id``` 类型：Number<br/>商品价格的id
    * ```quantity``` 类型：Number<br/>商品数量
    * ```is_check``` 类型：Boolean<br/>选中该商品，一般都使用```true```

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **POST '/set'**

修改商品数量

<!-- .api-param -->

* auth: `true`
* 参数
    * ```variant_id``` 类型：Number<br/>商品价格的id
    * ```quantity``` 类型：Number<br/>商品数量

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **POST /check**

选中单个商品

<!-- .api-param -->

* auth: `true`
* 参数
    * ```variant_id``` 类型：Number<br/>商品价格的id

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **POST /uncheck**

取消选中单个商品

<!-- .api-param -->

* auth: `true`
* 参数
    * ```variant_id``` 类型：Number<br/>商品价格的id

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **POST /all_check**

选中所有商品

* auth: `true`
<!-- .api-param -->


<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **POST /all_uncheck**

取消选中所有商品

* auth: `true`
<!-- .api-param -->


<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **POST /remove**

删除购物车中的单个商品

<!-- .api-param -->

* auth: `true`
* 参数
    * ```variant_id``` 类型：Number<br/>商品价格的id

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **POST /all_remove**

删除购物车中的所有商品

<!-- .api-param -->

* auth: `true`

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **GET /within_shipments**

获取带有物流信息的购物车（必须登录）

<!-- .api-param -->

* auth: `true`
* 参数
    * ```address_id``` 类型：Number<br/>收货人地址 id
    * ```payment_method_type``` 类型：String<br/>支付类型

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **GET /within_shipments**

获取带有物流信息的购物车（未登录下单）

<!-- .api-param -->

* auth: `true`
* 参数
    * ```district_code``` 类型：String<br/>收货地区 post
    * ```payment_method_type``` 类型：String<br/>支付类型

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **GET /must_shipping**

检查购物车是否需要物流

<!-- .api-param -->

* auth: `true`

<!-- endapi -->