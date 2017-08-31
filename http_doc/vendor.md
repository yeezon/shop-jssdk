# api/v1/vendor 接口说明

商品品牌。

### **GET /**

获取品牌列表

<!-- .api-param -->

* 参数
    * ```handles``` 类型：String 选填<br/>指定多个handle，以“,”分隔
    * ```search``` 类型：String 选填<br/>指定品牌包含的文字
    * ```size``` 类型：Number 选填<br/>指定返回每页的数目
    * ```page``` 类型：Number 选填<br/>指定返回分页页码
* 返回数据
    ```
    {
        "code" : 200,
        "message" : "",
        "vendors" : [{
                "name" : "谷吃", // 品牌名称
                "handle" : "V000036"  // 品牌 handle
            }, {
                "name" : "驴",  // 品牌名称
                "handle" : "V000037"  // 品牌 handle
            }
        ],
        "paging" : { ... }
    }
    ```

<!-- endapi -->

## API
<!-- api-list -->
<!-- endapi-list -->


<!-- api -->
<!-- .api-sdk -->

### **GET /view**

获取指定品牌

<!-- .api-param -->

* 参数
  * handle 类型：String<br/>指定品牌的handle
* 返回数据
    ```
    {
        "code" : 200,
        "message" : "",
        "vendor" : {
            "name" : "乡萘儿",
            "handle" : "V000035"
        },
        "products" : [{ ... }, { ... }], // 含有这个品牌的商品
        "paging" : { ... } // 分页对象
    }
    ```

<!-- endapi -->