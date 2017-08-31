# api/v1/page 接口说明

页面。

### **GET /**

获取页面列表

<!-- .api-param -->

* 参数
    * ```handles``` 类型：String 选填<br/>指定多个handle，以“,”分隔
    * ```size``` 类型：Number 选填<br/>指定返回每页的数目
    * ```page``` 类型：Number 选填<br/>指定返回分页页码


### **GET /view**

获取指定 `handle` 的页面

<!-- .api-param -->

* 参数
  * handle 类型：String<br/>指定页面hanlde。

