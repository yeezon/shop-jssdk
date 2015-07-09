var core = require('./core.js');
var events = require('./events.js');
var util = require('./util.js');
var type_of = require('./type-of.js');

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

  factory.create = function(sKey, url, method){
    //
    var sGetTopic = sName + '.' + sKey;
    //
    url = ((url === false || url === undefined) ? sKey : url);
    if(sName !== 'shop'){
      url = sName + '/' + url;
    }
    if(sName === 'area'){
      url = sKey;
    }
    //
    core.apiEvents(sGetTopic, url, method);
    //
    base.prototype[sKey] = function(){  // 方法调用时可以再次覆盖data,url,handle // requestConf, func, dataConf, urlFix, handleFix
      var self = this;
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
        // 免登录查询单个订单 兼容语法糖 get
        if(sName == 'order' && url == 'order/view'){
          var sOrderNo = oPushlish.request.handle;
          oPushlish.request = {
            'order_no': sOrderNo
          }
        }
      }
      oPushlish._scope = self;
      //
      oPushlish._unsubscribe = events.subscribe(sGetTopic + '.done', oCallback);
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

  factory.get = function(){ // 语法糖 给有 / 和 /view 两个路径 并且查询 handle的接口使用
    var self = this;
    self.create('one', 'view');
    self.create('list', '');
    //
    base.prototype.get = function(requestConf, func, dataConf){

      var selfbase = this;
      //
      if(requestConf && requestConf.handle){
        selfbase.one.apply(selfbase, arguments);
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