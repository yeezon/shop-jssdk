# api/v1/address 接口说明

收货人地址。

<!-- api -->
<!-- .api-sdk -->

### **'GET /'**
获取所有收货人地址 （必须登录）

* 返回数据
```
{
    "code" : 200,
    "message" : "",
    "addresses" : [{
            "id" : 221,
            "name" : "友好速搭",
            "country" : "中国",
            "country_code" : "CN",
            "province" : "广东省",
            "province_code" : "440000",
            "city" : "深圳市",
            "city_code" : "440300",
            "district" : "南山区",
            "district_code" : "440305",
            "detail" : "新西路兰光科技园B801",
            "zipcode" : "518057",
            "mobile" : "13800138000",
            "telephone" : "0755-83051027",
            "email" : "support@youhaosuda.com",
            "is_default" : false
        }
    ]
}
```

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **'POST /create'**

新建收货人地址 （必须登录）

<!-- .api-param -->

* 参数
    * ```name``` 类型：String 长度：255<br/>收货人姓名
    * ```district_code``` 类型：String 长度：255<br/>收货区域编码（最后一级）
    * ```detail``` 类型：String 长度：255<br/>详细收货地址
    * ```zipcode```（选填） 类型：String 长度：255<br/>邮编
    * ```mobile``` 类型：String 长度：255<br/>移动电话号码
    * ```telephone```（选填） 类型：String 长度：255 <br/>联系电话
    * ```email```（选填） 类型：String 长度：255 <br/>邮箱
    * ```is_default```（选填） 类型：Boolean<br/>是否为设置默认收货地址
    * ```meta_fields```（选填） 类型：String<br/>序列化的地址拓展字段（JSON字符串），包含下列属性<br/><ul><li>`name`：String 类型，Metafield 的唯一字符串标识。仅支持小写字母、数字、中横和下划线，最多 200 个字符。</li><li>`description`：String 类型，Metafield 的说明，最多 2000 个字符。</li><li>`fields`：Object 类型，Metafield 的字段，Key-Value 结构对象。</li></ul>
    ```
    meta_fields = JSON.stringify({
        name: 'information',
        description: '清关信息',
        fields: {
            id_card: 123456
        }
    })
    ```


<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **'POST /save'**

更新收货人地址 （必须登录）

<!-- .api-param -->

* 参数
    * ```id``` 类型：Number<br/>需要更新的收货人信息id
    * ```name``` 类型：String 长度：255<br/>收货人姓名
    * ```district_code``` 类型：String 长度：255<br/>收货区域编码（最后一级）
    * ```detail``` 类型：String 长度：255<br/>详细收货地址
    * ```zipcode```（选填） 类型：String 长度：255<br/>邮编
    * ```mobile``` 类型：String 长度：255<br/>移动电话号码
    * ```telephone```（选填） 类型：String 长度：255 <br/>联系电话
    * ```email```（选填） 类型：String 长度：255 <br/>邮箱
    * ```is_default```（选填） 类型：Boolean<br/>是否为设置默认收货地址
    * ```meta_fields```（选填） 类型：String<br/>序列化的地址拓展字段（JSON字符串），包含下列属性<br/><ul><li>`name`：String 类型，Metafield 的唯一字符串标识。仅支持小写字母、数字、中横和下划线，最多 200 个字符。</li><li>`description`：String 类型，Metafield 的说明，最多 2000 个字符。</li><li>`fields`：Object 类型，Metafield 的字段，Key-Value 结构对象。</li></ul>
    ```
    meta_fields = JSON.stringify({
        name: 'information',
        description: '清关信息',
        fields: {
            id_card: 123456
        }
    })
    ```

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **'POST /remove'**(address, callback)

删除收货人地址 （必须登录）

<!-- .api-param -->

* 参数
    * ```id``` 类型：Number<br/>需要删除的收货人信息id

<!-- endapi -->