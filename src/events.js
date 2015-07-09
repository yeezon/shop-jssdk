var util = require('./util.js');
var log = require('./log.js');

var events = {
  messages : {},
  subscribe: function(topic, func, priority){
    var self = this;
    var nPriority = parseInt(priority);
    nPriority = nPriority ? nPriority : 10; // 默认优先级为10
    var sTopicEncode = encodeURIComponent(topic);
    //
    if(typeof self.messages[sTopicEncode] === 'undefined'){
      self.messages[sTopicEncode] = [];
    }
    if(typeof self.messages[sTopicEncode][nPriority] === 'undefined'){
      self.messages[sTopicEncode][nPriority] = [];
    }
    var aPriorityList = self.messages[sTopicEncode][nPriority];
    var nFuncIndex = -1;
    if(aPriorityList){
      if(util.inArray(func, aPriorityList) === - 1){ // 只允许绑定一个相同函数
        aPriorityList.push(func);
        nFuncIndex = aPriorityList.length - 1;
      }
      log({subscribe: topic, priority: nPriority, sort: nFuncIndex});
    }
    return {
      unsubscribe : function(){
        if(nFuncIndex !== -1){
          log({unsubscribe: topic, priority: nPriority, sort: nFuncIndex});
          aPriorityList.splice(nFuncIndex, 1);
          nFuncIndex = -1;
        }
      }
    };
  },
  publish : function(topic, data, done){
    var self = this;
    if(typeof topic !== 'string'){
      return;
    }
    data = data ? data : {};
    var sTopicEncode = encodeURIComponent(topic);
    var aMainList = self.messages[sTopicEncode];
    //
    log({published: topic});
    //
    if(typeof aMainList === 'undefined'){
      return;
    }
    var scope = data._scope || this;
    var bNext = true;
    util.forEach(aMainList, function(aPriorityList, nPriority){
      if(aPriorityList){
        util.forEach(aPriorityList, function(oSub, nFuncIndex){
          if(oSub){
            bNext = oSub.call(scope, data);
            if(bNext !== false){
              bNext = true;
            }
            log({exec: topic, priority: nPriority, sort: nFuncIndex, 'continue': bNext});
            return bNext;
          }
        });
        return bNext;
      }
    });
    if(done){
      done(o);
    }
  },
};

exports.subscribe = events.subscribe;

exports.publish = events.publish;

exports.messages = events.messages;

/**
 * 发布/订阅事件
 *
 * ```subscribe
 * `` topic
 * &` 类型：String<br/>需要订阅的事件，如'cart.get.done'。
 * `` callback
 * &` 类型：Function( publish参数data )<br/>事件发布后的回调函数，回调函数如果^^^return false^^^,则不继续执行该事件的其他回调函数。
 * `` priority
 * &` 类型：Number ( 默认值：10 )<br/>回调函数执行的优先级，SDK默认的优先级为10，如果要先于默认回调执行，请使用1~9的优先级，如果要先于默认回调执行，请大于10的优先级。
 *
 * 如何取消订阅？
 * ^^^
 * <script>
 *   var s = events.subscribe('hello', function(){
 *     console.log('hello');
 *   }); // 成功订阅后会返回引用
 *   //
 *   s.unsubscribe(); //取消订阅
 * </script>
 * ^^^
 * ```
 *
 * ```publish
 * `` topic
 * &` 类型：String<br/>需要发布的事件，如'cart.get.done'。
 * `` data
 * &` 类型：Object
 * &&` res 类型：Object<br/>请不要使用此保留 key，用于 SDK 从 API 获取数据后传至回调函数。
 * &&` anything 类型：Object 选填<br/>使用除 res 之外 key 的对象，可以向订阅事件传送额外数据。
 * ```
 *
 * @param {subscribe} `topic,callback[,priority]` 订阅事件
 * @param {publish} `topic,data` 发布事件
 *
 */