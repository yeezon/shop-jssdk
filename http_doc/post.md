# api/v1/post 接口说明

文章。


### **GET /**

获取文章列表

<!-- .api-param -->

* 参数
    * ```handles``` 类型：String 选填<br/>指定多个handle，以“,”分隔
    * ```size``` 类型：Number 选填<br/>指定返回每页的数目
    * ```page``` 类型：Number 选填<br/>指定返回分页页码
    * ```dir_id``` 类型：Number 选填<br/>指定目录id
* 返回数据
    ```
    {
        "code" : 200,
        "message" : "",
        "posts" : [ ... ],
        "paging" : { ... }
    }
    ```

### **GET /view**

获取指定文章

<!-- .api-param -->

* 参数
  * handle 类型：String<br/>指定文章的handle

<!-- endapi -->

### **get /dir**

获取文章目录列表

* 返回数据
    ```
    {
        "code" : 200,
        "message" : "",
        "dir" : [ ... ]
    }
    ```

### **get /tags**

获取文章标签列表

* 返回数据
    ```
    {
        "code" : 200,
        "message" : "",
        "tags" : [ ... ]
    }
    ```