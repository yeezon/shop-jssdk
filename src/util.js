// 订单金额计算器
exports.orderCalculator = require('./calculator.js');

// 设置cookie
exports.setCookie = function(name, value, isForever, domain){
  var sDomain;
  if(domain){
    sDomain = ";domain=" + domain;
  }else{
    sDomain = "";
  }
  document.cookie = name + "=" + escape(value) + sDomain + (isForever?";expires="+  (new Date(2099,12,31)).toGMTString():"") + ";path=/";
};
// 获取cookie
exports.getCookie = function(sName){
    var cookie_str = document.cookie,
        cookies = {},
        reg,
        result;
    if(!/;\s*$/.test(cookie_str)){
      cookie_str += ';';
    }
    reg = /(\S+?)=([\w\W]*?);/g;
    result = reg.exec(cookie_str);
    while(result){
      cookies[result[1]] = decodeURIComponent(result[2]);
      result = reg.exec(cookie_str);
    }
    if(sName){
      return cookies[sName];
    }else{
      return cookies;
    }
};
// 获取图片url
exports.getImageUrl = function(image_id, image_name, image_size, image_epoch){
  if(!image_id || !image_name){
    var aDef = window.productImage.split('.');
    aDef[0] = aDef[0] + '_' + image_size;
    var sDef = aDef.join('.');
    var sPath = window.assetPath;
    if(!sPath){
      sPath = window.assetHost;
    }
    sDef = sPath + sDef;
    return sDef;
  }
  var sHost = window.assetHost;
  if(!sHost){
    sHost = window.assetPath;
  }
  sHost = sHost + image_id + '/';
  var sFileName = image_name;
  if(image_size){
    var aSplit = image_name.split('.');
    var nLen = aSplit.length;
    if(nLen > 1){
    // var sImageSize = '_' + image_size;
    // var sFileNotExt = aSplit[nLen - 2];
    // aSplit[nLen - 2] = sFileNotExt + sImageSize;
    // sFileName = aSplit.join('.');
    var sImageSize = 's_' + image_size;
    var sFileExtName = aSplit.pop();
    sFileName = sImageSize + '.' + sFileExtName;
    }else{
    //alert('文件没有后缀名？');
    }
  }
  sHost = sHost + sFileName;
  if(image_epoch){
    sHost = sHost + '?epoch=' + image_epoch;
  }
  return sHost;
};
//
exports.getProductUrl = function(sUrl, nWidth, nHeight){
  var sResUrl = sUrl;
  var aImgUrl = sUrl.split('.');
  var aExtName = ['jpg', 'jpeg', 'gif', 'png'];
  var nImgUrlLen = aImgUrl.length;
  var sExtName = aImgUrl[nImgUrlLen - 1];
  if(sExtName.indexOf('?') > -1){
    sExtName = sExtName.split('?')[0];
  }
  sExtName = sExtName.toLowerCase();
  $.each(aExtName, function(index, name){
    if(name == sExtName){
      aImgUrl[nImgUrlLen - 2] = aImgUrl[nImgUrlLen - 2] + '_' + nWidth + 'x' + nHeight;
      sResUrl = aImgUrl.join('.');
      return false;
    }
  });
  return sResUrl;
};
//
exports.getQuery = function(name, bNotEscape){
  var sUrl = window.location.search.substr(1);
  var r = sUrl.match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"));
  if(bNotEscape){
    return (r === null ? null : r[2]);
  }else{
    return (r === null ? null : unescape(r[2]));
  }
};
//
exports.setQuery = function( key , value , url ){
  var aHash = url.match(/#.*(\?|$)/ig);
  var sHash = '';
  if(aHash && aHash[0]){
    sHash = aHash[0];
    url = url.replace(sHash, '');
  }
  url = url || window.location.href;
  url = url.replace( new RegExp( '(^|\\?)' + key + '=[^&]*(&|$|#)' , 'g' ) , '?' );
  url = url.replace( new RegExp( '(^|&)' + key + '=[^&]*(?=&|$|#)' , 'g' ) , '' );
  var p = key + '=' + encodeURIComponent(value);
  var sUrl = url;
  if(!(/\?$/.test( url ))){
    sUrl = url + ( /\?/.test( url ) ? '&' : '?' );
  }
  return sUrl + p + sHash;
};
//
exports.isEmail = function(sEmail){
  var rEmail = /([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})/i;
  return rEmail.test(sEmail);
};
//
exports.isMobile = function(sPhone){
  var rPhone = /^(13|14|15|16|17|18|19)\d{9}$/;
  return rPhone.test(sPhone);
};
//
exports.isUsername = function(sUsername){
  var rUsername = /^([A-Za-z\u4e00-\u9fa5])[A-Za-z0-9\u4e00-\u9fa5_-]{3,15}$/;
  return rUsername.test(sUsername);
};
//
exports.isRealname = function(sRealname){
  var rRealname = /^.{1,255}$/;
  return rRealname.test(sRealname);
};
//
exports.yuan = function(nFen){
  var nYuan = nFen / 100;
  return nYuan;
};
//
exports.inArray = function(){
  if(!Array.prototype.indexOf){
    Array.prototype.indexOf = function(elt, from){
      var len = this.length >>> 0;
      from = Number(arguments[1]) || 0;
      from = (from < 0) ? Math.ceil(from) : Math.floor(from);
      if (from < 0)
        from += len;

      for (; from < len; from++)
      {
        if (from in this &&
          this[from] === elt)
          return from;
      }
      return -1;
    };
  }
  return arguments[1].indexOf(arguments[0]);
};
//
exports.forEach = function (collection, callback, isNotObject, scope) {
  if (Object.prototype.toString.call(collection) === '[object Object]' && !isNotObject) {
    for (var prop in collection) {
      if (Object.prototype.hasOwnProperty.call(collection, prop)) {
        if(callback.call(scope, collection[prop], prop, collection) === false){
          break;
        }
      }
    }
  } else {
    for (var i = 0, len = collection.length; i < len; i++) {
      if(callback.call(scope, collection[i], i, collection) === false){
        break;
      }
    }
  }
};

/**
 * 实用工具集合
 *
 * ```setCookie
 * `` name
 * &` 类型：String<br/>需要设置的 cookie 名称。
 * `` value
 * &` 类型：String<br/>需要设置的 cookie 值。
 * `` isForever
 * &` 类型：Boolean ( 默认值：^^^false^^^ )<br/>设置为^^^true^^^，cookie 永不过期。
 * ```
 *
 * ```getCookie
 * `` name
 * &` 类型：String<br/>需要读取的 cookie 名称。
 * ```
 *
 * ```getImageUrl
 * `` image_id
 * &` 类型：String<br/>图片对象的 image_id。
 * `` image_name
 * &` 类型：String<br/>图片对象的 image_name。
 * `` image_size
 * &` 类型：String<br/>输出图片的尺寸大小，例如^^^300x300^^^。
 * `` image_epoch
 * &` 类型：String<br/>图片对象的 image_epoch。
 * ```
 *
 * ```getQuery
 * `` key
 * &` 类型：String<br/>需要获取的 url 参数名称。
 * ```
 *
 * ```setQuery
 * `` key
 * &` 类型：String<br/>需要设置的 url 参数名称。
 * `` value
 * &` 类型：String<br/>需要设置的 url 参数的值。
 * `` url
 * &` 类型：String<br/>需要设置参数的 url。
 * ```
 *
 * ```inArray
 * `` element
 * &` 类型：String|Object<br/>需要检查的元素。
 * `` array
 * &` 类型：Array<br/>需要检查的数组。
 * ```
 *
 * ```forEach
 * `` collection
 * &` 类型：Array|Object<br/>需要遍历的数组或对象。
 * `` callback
 * &` 类型：Function( 单个元素 )<br/>回调函数，返回^^^false^^^可停止遍历。
 * ```
 *
 * ```isEmail
 * `` email
 * &` 类型：String<br/>需要检测是否合法的 email，合法则返回^^^true^^^，不合法则返回^^^false^^^。
 * ```
 *
 * ```isMobile
 * `` mobile
 * &` 类型：String<br/>需要检测是否合法的中国大陆手机，合法则返回^^^true^^^，不合法则返回^^^false^^^。
 * ```
 *
 * ```isUsername
 * `` username
 * &` 类型：String<br/>需要检测是否合法的用户名，合法则返回^^^true^^^，不合法则返回^^^false^^^。
 * ```
 *
 * ```isRealname
 * `` realname
 * &` 类型：String<br/>需要检测是否合法的真实姓名，合法则返回^^^true^^^，不合法则返回^^^false^^^。
 * ```
 *
 * ```orderCalculator
 * `` return
 * &` 调用此方法将返回一个计算器实例，具有以下方法：
 * &&` ^^^update(object)^^^：更新数据，参数形如^^^{item_amount: 90}^^^，可接收的^^^key^^^及其具体意义可以调用^^^help^^^方法查看
 * &&` ^^^get([callback])^^^：返回订单计算结果，可接受一个回调函数，参数为订单计算结果
 * &&` ^^^help()^^^：在控制台打印帮助信息
 * &&&
 * &&& ^^^
 * &&& var Calc = Jssdk.util.orderCalculator();
 * &&& Calc.update({
 * &&&     item_amount: 90, // 商品总金额
 * &&&     shipment_amount: 10 // 运费总金额
 * &&& });
 * &&& var final_amount;
 * &&& Calc.get(function(result) {
 * &&&     final_amount = result.final_amount; //实付金额
 * &&& });
 * &&& console.log(final_amount); // 100
 * &&& ^^^
 * ```
 *
 * @param {setCookie} `name,value[,isForever]` 设置 cookie
 * @param {getCookie} `name` 读取 cookie
 * @param {getImageUrl} `image_id,image_name,image_size,image_epoch` 将图片对象转换为 url
 * @param {getQuery} `key` 获取 url 中 search 部分的参数
 * @param {setQuery} `key,value,url` 设置 url 中 search 部分的参数
 * @param {inArray} `element,array` 检查目标对象是否在数组中
 * @param {forEach} `collection,callback` 遍历数组或对象中的所有元素
 * @param {isEmail} `email` 验证email是否合法
 * @param {isMobile} `mobile` 验证手机号码是否合法（中国大陆）
 * @param {isUsername} `username` 验证用户名是否合法
 * @param {isRealname} `realname` 验证真实姓名是否合法
 * @param {orderCalculator} 创建一个订单金额计算器
 *
 */
