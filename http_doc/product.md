# api/v1/product 接口说明

商品。


### **GET /view**

获取指定商品

<!-- .api-param -->

* 参数
  * handle 类型：String<br/>指定商品的 handle

### **GET /**

获取商品列表

<!-- .api-param -->

* 参数
    * ```handles``` 类型：String 选填<br/>指定多个 handle，以“,”分隔
    * ```ids``` 类型：String 选填<br/>指定多个 id，以“,”分隔
    * ```search``` 类型：String 选填<br/>指定商品名称包含的文字
    * ```vendor``` 类型：String 选填<br/>指定商品品牌包含的文字
    * ```type``` 类型：String 选填<br/>指定商品分类包含的文字
    * ```in_stock``` 类型：Boolean 选填<br/>指定商品库存是否足够（默认值为 false）
    * ```so``` 类型：String 选填<br/>指定商品排序规则，<br/>sale_desc - 销量<br/>price_asc - 价格升序<br/>price_desc - 价格降序<br/>date_desc - 上架时间
    * ```size``` 类型：Number 选填<br/>指定返回每页的数目
    * ```page``` 类型：Number 选填<br/>指定返回分页页码
* 返回数据
    * 返回对象 [查看详情](/development/s/5432593471ea1e4f9f000013) )<br/>获取信息后的回调函数<br/>返回对象中包含分页对象 paging [查看详情](/development/s/5587c0b00abc3e41b300002d#-paging-)<br/>商品对象中的图片对象，使用 [util.getImageUrl](/development/s/5549f6f50abc3e22ec000011#-getimageurl-image_id-image_name-image_size-image_epoch-) 方法转换为对应 url
    ```
    {
        "code" : 200,
        "message" : "",
        "products" : [ ... ],
        "paging" : { ... }
    }
    ```

<!-- endapi -->