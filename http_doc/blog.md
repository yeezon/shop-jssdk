# api/v1/blog 接口说明

轻博客相关接口。

### **GET /**

获取轻博客列表

<!-- .api-param -->

* 返回数据
    ```
    {
        "code" : 200,
        "message" : "",
        "blogs" : [ ... ],
        "paging" : { ... }
    }
    ```


### **GET /view**

获取指定轻博客

<!-- .api-param -->

* 参数
  * handle 类型：String<br/>指定轻博客的 handle
* 返回数据
    ```
    {
        "code" : 200,
        "message" : "",
        "blog" : { ... },
        "handle": "b000001"
    }
    ```

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **GET /search**

获取轻博客列表

<!-- .api-param -->

* 参数
    * ```handles``` 类型：String 选填<br/>指定多个handle，以“,”分隔
    * ```author``` 类型：String 选填<br/>指定轻博客作者
    * ```tag``` 类型：String 选填<br/>指定轻博客标签
    * ```size``` 类型：Number 选填<br/>指定返回每页的数目
    * ```page``` 类型：Number 选填<br/>指定返回分页页码
* 返回数据
    ```
    {
        "code" : 200,
        "message" : "",
        "blogs" : [ ... ],
        "paging" : { ... }
    }
    ```

<!-- endapi -->



### **GET /tags**

获取轻博客标签列表

* 返回数据
    ```
    {
        "code": 200,
        "message": "",
        "tags": {
            "3233": {
                "id": 3233,
                "name": "tagname"
            }
        }
    }
    ```