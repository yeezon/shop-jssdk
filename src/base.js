var core = require('./core.js');
var events = require('./events.js');
var util = require('./util.js');
var type_of = require('./type-of.js');
//
var _guid = (function() {
  function s4() {return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);}
  return function() { return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();};
})();
//

var _global = (window || global);

module.exports = function(sName, func){

  function base(){}

  var factory = {};

  factory.internalByConfig = function(conf){
    var self = this;
    util.forEach(conf, function(value, key){
      var args = [];
      args[0] = key;
      args[1] = type_of(value) === 'function' ?  value : (value.callBack ? value.callBack : function(){});
      args[2] = value.data ? value.data : {};
      factory.internal.apply(self, args);
    });
  };

  factory.internal = function(sKey, callBack){
    //
    var sGetTopic = sName + '.' + sKey;
    //
    events.subscribe(sGetTopic, callBack);
    //
    base.prototype[sKey] = function(data){
      var self = this;
      //
      events.publish(sGetTopic, {
        data: data,
        _scope: self
      });
    };
  };

  factory.create = function(sKey, url, method, config){
    //
    var sGetTopic = sName + '.' + sKey;
    //
    url = ((url === false || url === undefined) ? sKey : url);
    if(sName !== 'shop'){
      url = sName + '/' + url;
    }
    //
    core.apiEvents(sGetTopic, url, method);
    //
    base.prototype[sKey] = function(){  // 方法调用时可以再次覆盖data,url,handle // requestConf, func, dataConf, urlFix, handleFix
      var self = this;
      // api接口封装，订阅时加入uuid，有uuid的事件，执行匹配对应guid和guid(pid为0)的订阅。保证api封装回调的唯一性，手动订阅能完整收到通知 15-11-06
      var guid = _guid();
      //
      var oPushlish = {};
      var oCallback;
      //
      if(type_of(arguments[0]) === 'function'){
        oCallback = arguments[0];
        oPushlish.request = {};
        oPushlish.data = arguments[1] || false;
        oPushlish.urlModify = arguments[2] || false;
        oPushlish.customHandle = arguments[3] || false;
      }else{
        //
        oCallback = arguments[1];
        oPushlish.request = arguments[0] || false;
        oPushlish.data = arguments[2] || false;
        oPushlish.urlModify = arguments[3] || false;
        oPushlish.customHandle = arguments[4] || false;
        //
        if (config && config.RESTful) {
          if (oPushlish.request && oPushlish.request.id) {
            oPushlish.urlModify = url.replace(/:[a-zA-Z_]+/, oPushlish.request.id);
            oPushlish.request = false;
          }
        }
        //
        // 免登录查询单个订单 兼容语法糖 get
        if(sName == 'order' && url == 'order/view'){
          var sOrderNo = oPushlish.request.handle;
          oPushlish.request = {
            'order_no': sOrderNo
          };
        }
        //
        if(sName == 'page_block' && url == 'page_block/view') {
          if(oPushlish.request && oPushlish.request.id) {
             oPushlish.urlModify = 'page_block/view/' + oPushlish.request.id;
             oPushlish.request = false;
          }
        }
        // 服务管理 兼容
        if(sName === 'service' && url === 'service/view'){
          oPushlish.urlModify = 'service/single';
          oPushlish.request = {
            'id': oPushlish.request.handle
          };
        }
        // 小程序 兼容
        if(sName === 'weapp') {
          var _appId = (((wx && wx.getAccountInfoSync && wx.getAccountInfoSync()) || {}).miniProgram || {}).appId || '';

          switch (url) {
            case 'weapp/applet/authorize':
              oPushlish.urlModify = _global.yhsd.YOU_API_URL + '/applet/authorize';
              break;
            case 'weapp/payment/applet_go_pay':
              oPushlish.urlModify = _global.yhsd.API_URL + '/payment/applet_go_pay';
              break;
            case 'weapp/applet/decrypt':
              oPushlish.urlModify = _global.yhsd.YOU_API_URL + '/applet/decrypt';
              break;
            default:
              break;
          }

          oPushlish.request.appid = _appId;
          oPushlish.request.siteid = _global.yhsd.SITE_ID;
        }
      }
      oPushlish._scope = self;
      //
      oPushlish._unsubscribe = events.subscribe(sGetTopic + '.done', oCallback, 10, guid);
      oPushlish._pid = guid;
      //
      events.publish(sGetTopic, oPushlish);
    };
  };

  factory.createByConfig = function(conf){ // 给很长很长的接口做配置进行create
    var self = this;
    util.forEach(conf, function(value, key){
      var args = [];
      args[0] = key;
      if(typeof value.url === 'undefined'){
        args[1] = false;
      }else{
        args[1] = value.url;
      }
      if(typeof value.method !== 'undefined'){
        args[2] = value.method;
      }
      if(typeof value.config !== 'undefined'){
        args[3] = value.config;
      }
      if(typeof value.customHandle !== 'undefined'){
        args[4] = value.customHandle;
      }
      factory.create.apply(self, args);
    });
  };

  factory.get = function(bCreateId){
    // 语法糖 给有 / 和 /view 两个路径 并且查询 handle的接口使用
    // bCreateId 创建 /view/:id 通过id查询的接口
    var self = this;
    self.create('one', 'view');
    self.create('list', '');
    //
    if(bCreateId) {
      self.create('id', 'view');
    }
    //
    base.prototype.get = function(requestConf, func, dataConf){

      var selfbase = this;
      //
      if(requestConf && requestConf.handle){
        selfbase.one.apply(selfbase, arguments);
      }else if(requestConf && requestConf.id) {
        selfbase.id.apply(selfbase, arguments);
      }else{
        selfbase.list.apply(selfbase, arguments);
      }
    };
    //
  };

  if(func){
    func(factory, base);
  }
  return new base();

};