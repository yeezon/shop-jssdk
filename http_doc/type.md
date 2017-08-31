# api/v1/type 接口说明

商品分类。

### **GET /**

获取分类列表

<!-- .api-param -->

* 参数
    * ```handles``` 类型：String 选填<br/>指定多个handle，以“,”分隔
    * ```search``` 类型：String 选填<br/>指定品牌包含的文字
    * ```size``` 类型：Number 选填<br/>指定返回每页的数目
    * ```page``` 类型：Number 选填<br/>指定返回分页页码
* 返回数据
    ```
    {
        "code" : 200,
        "message" : "",
        "types" : [{
                "name" : "男装", // 分类名称
                "handle" : "T000099"  // 分类 handle
            }, {
                "name" : "女装",  // 分类名称
                "handle" : "t000126"  // 分类 handle
            }
        ],
        "paging" : { ... }
    }
    ```

<!-- endapi -->

### **GET /view**

获取指定分类

<!-- .api-param -->

* 参数
  * handle 类型：String<br/>指定分类的handle
* 返回数据
    ```
    {
        "code" : 200,
        "message" : "",
        "type" : {
            "name" : "男装",
            "handle" : "T000099"
        },
        "products" : [{ ... }, { ... }], // 含有这个分类的商品
        "paging" : { ... } // 分页对象
    }
    ```

