# api/v1 接口说明

店铺信息。

### **GET /**

获取全部或指定店铺信息

<!-- .api-param -->

* 参数
  * fields 类型：String 选填<br/>指定需要返回的内容，用','隔开。<br/>当fields参数为空时，返回所有内容。<br/>可选fields包括：
    * ```shop``` 店铺基础信息。 [查看详情](/development/s/542508ff71ea1e78fe000008)
    * ```linklists``` 店铺导航数据。 [查看详情](/development/s/5432558971ea1e4f9f000005)
    * ```page_title``` 当前页面title
    * ```page_desc``` 当前页面description
    * ```is_mobile_agent``` 是否移动设备（根据当前User-Agent判断）
    * ```current_datetime``` 当前时间
    * ```customer_level``` 店铺顾客等级数据。
* 返回数据
    ```
    {
      "code" : 200,
      "message" : "",
      "shop" : { ... },
      "linklists" : { ... },
      "page_title" : "买买买 - 不用选，直接买",
      "page_desc" : "我们致力于解决选择困难症用户选购商品时的烦恼。我们帮你挑好了，你只需要买买买。",
      "is_mobile_agent" : "",
      "current_datetime" : "2015-05-28T10:51:43.060+08:00",
      "customer_level" : [ ... ]
    }
    ```

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **POST /protecting**

提交店铺保护密码

<!-- .api-param -->

* 参数
  * password 类型：String<br/>店铺保护密码
* 返回数据

    ```
    {
      "code" : 200,
      "message" : "",
      "correct" : true
    }
    ```
    * ```correct``` 类型：Boolean<br/>true: 密码正确，将设置名为 protection_password 的Cookie。此时刷新页面即可访问<br/>false: 密码错误

<!-- endapi -->