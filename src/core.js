var events = require('./events.js');
var req = require('./request.js');
var handle = require('./handle.js');
var util = require('./util.js');
//
function _mixin(target, mix){
  util.forEach(mix, function(value, key){
    target[key] = value;
  });
}
//
exports.apiEvents = function(topic, url, method){
  url = (typeof url === 'string') ? url : topic;
  method = method ? method : 'get';
  events.subscribe(topic, function(conf){
    var oPostData = {};
    if(conf && conf.request){
      _mixin(oPostData, conf.request);  // 使用 conf.request 来覆盖原有请求参数
    }
    if(conf && conf.urlModify){
      url = conf.urlModify; // 使用 conf.urlModify 参数,在 publish的时候动态修改url
    }
    req[method.toLowerCase()](url, {
      data: oPostData,
      success: function(o){
        var oRes = false;
        var oResponse = {
          res: o || {}
        };
        if(conf && conf.data){
          _mixin(oResponse, conf.data); // 使用 conf.data 来自定义传递事件中的数据
        }
        //
        oRes = handle(oResponse, conf.customHandle || false);
        if(oRes){
          events.publish(topic + '.done', oResponse, function(){
            if(conf._unsubscribe){
              conf._unsubscribe.unsubscribe();
            }
          });
        }
      },
      error: function(){
        events.publish('request.error', {
          topic: topic
        });
      }
    });
  });
};