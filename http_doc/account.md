# api/v1/account 接口说明

顾客账号。

<!-- api -->
<!-- .api-sdk -->

### **GET /current**

获取当前顾客信息

<!-- .api-param -->
* auth: `true`
* 返回数据
    * ```customer``` 类型：Object<br/>null: 当前未登录<br/>用户对象：当前登录的用户 [查看详情](/development/s/5432566de2931e235b000003)

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **POST /login**

顾客登录

<!-- .api-param -->

* 参数
    * ```account``` 类型：String<br/>登录的用户名
    * ```password``` 类型：String<br/>登录的密码
* 返回数据
    * ```code``` 类型：Number<br/>200：登录成功<br/>201：登录失败
    * ```message``` 类型：String<br/>登录失败原因（当 code 为 201 时）
    * ```customer``` 类型：Object<br/>当前登录的用户信息 [查看详情](/development/s/5432566de2931e235b000003)
    * ```account``` 类型：String<br/>当前登录的用户名

    ```
    {
        "code" : 200,
        "message" : "",
        "account" : "yhsduser",
        "customer" : {
            "id" : 15,
            "social_type" : false,
            "name" : "yhsduser",
            "metas" : {},
            "notify_email" : "user@youhaosuda.com",
            "notify_phone" : "13824402932",
            "accept_marketing" : false,
            "regist_at" : "2014-08-27T13:52:34.964+08:00",
            "orders_count" : 15,
            "total_spent" : 144291,
            "last_order_no" : "201505263782651",
            "last_order_at" : "2015-05-26T19:25:53.667+08:00"
        }
    }
    ```

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **POST /logout**

顾客登出 （必须登录）

* auth: `true`

### **POST /change_password**

顾客修改密码 （必须登录）

* auth: `true`

<!-- .api-param -->

* 参数
    * ```password_old``` 类型：String<br/>旧密码
    * ```password``` 类型：String<br/>新密码
    * ```password_again``` 类型：String<br/>重复新密码
* 返回数据
    * ```code``` 类型：Number<br/>200：密码修改成功<br/>201：密码修改失败
    * ```message``` 类型：String<br/>密码修改失败原因（当 code 为 201 时）

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **POST /save**

更新顾客信息 （必须登录）

<!-- .api-param -->

* auth: `true`
* 参数
    * ```notify_email``` 类型：String<br/>顾客用于接收通知的邮箱
    * ```notify_phone``` 类型：String<br/>顾客用于接收通知的手机
    * ```real_name``` 类型：String<br/>真实姓名
    * ```sex``` 类型：String<br/>性别，可选的值包括：
        * male: 男
        * female: 女
        * undefined: 保密
    * ```birthday``` 类型：String<br/>生日，如"1926-08-17"
    * ```indentity_card``` 类型：String<br/>身份证号码
* 返回数据
    * ```code``` 类型：Number<br/>200：更新信息成功<br/>201：更新信息失败
    * ```message``` 类型：String<br/>更新信息失败原因（当 code 为 201 时）
    * ```customer``` 类型：Object<br/>更新后的用户信息 [查看详情](/development/s/5432566de2931e235b000003)

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **register**

注册顾客账号

<!-- .api-param -->

* url (根据注册类型选择)
    * **post /register_with_email**
    * **post /register_with_user_name**
    * **post /register_with_mobile**
* 参数
    * ```account``` 类型：String<br/>用户名: 4-16位中文、英文字母、数字、_和-组成，只能用中文或英文字母开头<br/>邮箱：长度255<br/>手机号码：中国大陆手机号
    * ```password``` 类型：String 长度：6-255<br/>密码
    * ```password_again``` 类型：String<br/>重复密码
    * ```verify_code``` 类型：String 选填<br/>手机验证码，注册类型为手机时必须提供，使用 [sendRegistValidateSms](#-sendregistvalidatesms-param-callback-) 获取
* 返回数据
    * ```code``` 类型：Number<br/>200：注册成功<br/>201：注册失败
    * ```message``` 类型：String<br/>注册失败原因（当 code 为 201 时）
    * ```customer``` 类型：Object<br/>注册成功的用户信息 [查看详情](/development/s/5432566de2931e235b000003)

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **POST /send_regist_validate_sms**

顾客注册手机号码账号时，获取手机验证码

<!-- .api-param -->

* 参数
    * ```mobile``` 类型：String<br/>中国大陆手机号码
    * ```captcha_id``` 类型：String 选填<br/>验证码图片 id [获取验证码](/development/s/55b66f1d0abc3e746a000002)
    * ```captcha_value``` 类型：String 选填<br/>验证码图片中显示的值 [获取验证码](/development/s/55b66f1d0abc3e746a000002)
* 返回数据
    * ```code``` 类型：Number<br/>200：发送成功<br/>214：该操作需要验证码<br/>201：发送失败
    * ```message``` 类型：String<br/>发送信息失败原因（当 code 为 201 时）

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **POST /send_reset_validate_sms**

顾客找回手机号码账号密码时，获取手机验证码

<!-- .api-param -->

* 参数
    * ```mobile``` 类型：String<br/>中国大陆手机号码
    * ```captcha_id``` 类型：String 选填<br/>验证码图片 id [获取验证码](/development/s/55b66f1d0abc3e746a000002)
    * ```captcha_value``` 类型：String 选填<br/>验证码图片中显示的值 [获取验证码](/development/s/55b66f1d0abc3e746a000002)
* 返回数据
    * ```code``` 类型：Number<br/>200：发送成功<br/>214：该操作需要验证码<br/>201：发送失败
    * ```message``` 类型：String<br/>发送信息失败原因（当 code 为 201 时）

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **POST /reset_password_with_mobile**

重设手机号码账号密码

<!-- .api-param -->

* 参数
    * ```account``` 类型：String<br/>需要重设密码的顾客手机号码账号
    * ```password``` 类型：String<br/>密码
    * ```password_again``` 类型：String<br/>重复密码
    * ```verify_code``` 类型：String<br/>手机验证码，使用 [sendResetValidateSms](#-sendresetvalidatesms-param-callback-) 获取
* 返回数据
    * ```code``` 类型：Number<br/>200：发送成功<br/>214：该操作需要验证码<br/>201：发送失败
    * ```message``` 类型：String<br/>发送信息失败原因（当 code 为 201 时）

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **POST /reset_password_with_email**

发送邮箱账号重置密码邮件

<!-- .api-param -->

* 参数
    * ```email``` 类型：String 长度：255<br/>需要重置密码的邮箱地址
* 返回数据
    * ```code``` 类型：Number<br/>200：发送成功<br/>214：该操作需要验证码<br/>201：发送失败
    * ```message``` 类型：String<br/>发送信息失败原因（当 code 为 201 时）

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **POST /check_regist_mobile**

检测手机是否未注册（多用于顾客注册手机号码账号时检测用）

<!-- .api-param -->

* 参数
    * ```mobile``` 类型：String<br/>中国大陆手机号码
* 返回数据
    * ```code``` 类型：Number<br/>200：手机号码未注册，可以使用<br/>201：已注册或其他失败信息
    * ```message``` 类型：String<br/>已注册或其他失败信息（当 code 为 201 时）

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **POST /check_reset_mobile**

检测手机是否已注册（用于顾客重设手机号码账号密码时检测用）

<!-- .api-param -->

* 参数
    * ```mobile``` 类型：String<br/>中国大陆手机号码
* 返回数据
    * ```code``` 类型：Number<br/>200：手机号码已注册，可以重置密码<br/>201：手机号码尚未注册或其他失败信息
    * ```message``` 类型：String<br/>201：手机号码尚未注册或其他失败信息（当 code 为 201 时）

<!-- endapi -->

<!-- api -->
<!-- .api-sdk -->

### **POST /reward_point_details**

获取当前账户积分详细信息

<!-- .api-param -->

* 参数
    * ```three_month_ago``` 类型：Boolean 选填<br/>三个月前的积分
    * ```last_three_month``` 类型：Boolean 选填<br/>三个月内的积分
    * ```size``` 类型：Number 选填<br/>指定返回每页的数目
    * ```page``` 类型：Number 选填<br/>指定返回分页页码
    * ```nopage``` 类型：String 选填<br/>指定是否分页
* 返回数据
    * ```reward_point_total``` 类型：Number<br/>账户积分总数
    * ```last_year_point``` 类型：Number<br/>账户上一年积分总数
    * ```reward_point_details``` 类型：Array<br/>账户积分详细信息
    * ```is_empty``` 类型：Boolean<br/>是否为空
    * 返回对象中包含分页对象 paging [查看详情](/development/s/5587c0b00abc3e41b300002d#-paging-)

<!-- endapi -->
