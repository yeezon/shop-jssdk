# api/v1/page_block 接口说明

页面块。

### **GET /**

获取页面块列表

<!-- .api-param -->

* 参数
    * ```ids``` 类型：Array 选填<br/>指定多个id
    * ```handles``` 类型：Array 选填<br/>指定多个handle
    * ```version``` 类型：Number 选填<br/>指定页面块的version，<br/>1 - 旧版自定义页面<br/>2 - 新版页面块


### **GET /view**

获取指定 `handle` 的页面块

<!-- .api-param -->

* 参数
  * handle 类型：String<br/>指定页面块hanlde。

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **GET /view/:id**

获取指定 `id` 的页面块
