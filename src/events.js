var util = require('./util.js');
var log = require('./log.js');

var events = {
  messages : {},
  subscribe: function(topic, func, priority, pid){
    var self = this;
    var nPid = pid || 0;
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
    var oCallBackConfig = {
      execute: func,
      pid: nPid
    };
    var nFuncIndex = -1;
    if(aPriorityList){
      if(util.inArray(oCallBackConfig, aPriorityList) === - 1){ // 只允许绑定一个相同函数
        aPriorityList.push(oCallBackConfig);
        nFuncIndex = aPriorityList.length - 1;
        log({subscribe: topic, priority: nPriority, sort: nFuncIndex, pid: nPid},"background:#ccc");
      }else{
        log({subscribe: topic, priority: nPriority, sort: '重复监听，忽略', pid: nPid}, "color:red");
      }
    }
    return {
      unsubscribe : function(){
        // 如果有 pid 可能非顺序订阅执行，需要将数组对应项目致空
        if(nPid){
          log({unsubscribe: topic, priority: nPriority, sort: nFuncIndex, pid: nPid},"color:#fff;background:#333");
          if(aPriorityList[nFuncIndex]){
            aPriorityList[nFuncIndex] = null;
          }
          return;
        }
        if(nFuncIndex !== -1){
          log({unsubscribe: topic, priority: nPriority, sort: nFuncIndex, pid: nPid},"color:#fff;background:#333");
          aPriorityList.splice(nFuncIndex, 1);
          nFuncIndex = -1;
        }
      }
    };
  },
  publish : function(topic, data, done, pid){
    var self = this;
    var nPid = pid || 0;
    if(typeof topic !== 'string'){
      return;
    }
    data = data ? data : {};
    var sTopicEncode = encodeURIComponent(topic);
    var aMainList = self.messages[sTopicEncode];
    //
    log({published: topic, pid: nPid}, "color:yellow;background:#000");
    //
    if(typeof aMainList === 'undefined'){
      return;
    }
    var scope = data._scope || this;
    var bNext = true;
    util.forEach(aMainList, function(aPriorityList, nPriority){
      if(aPriorityList){
        util.forEach(aPriorityList, function(oSub, nFuncIndex){
          if(oSub && oSub.execute){
            if(oSub.pid && nPid){ // 监听的事件有pid 并且有传入指定pid
              if(oSub.pid !== nPid){
                log({exec: topic, priority: nPriority, sort: nFuncIndex, 'continue': 'true', pid: oSub.pid, pass: 'true'}, "color:gray");
                return true; // 不执行 
              }
            }
            try{
              bNext = oSub.execute.call(scope, data);
            }catch(e){
              log({'exec-error': topic, priority: nPriority, sort: nFuncIndex, 'continue': 'true', pid: oSub.pid, pass: 'true', error: e}, "color:red");
            }
            if(bNext !== false){
              bNext = true;
            }
            log({exec: topic, priority: nPriority, sort: nFuncIndex, 'continue': bNext, pid: nPid}, "color:blue");
            return bNext;
          }
        });
        return bNext;
      }
    });
    if(done){
      done();
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
 * &` 类型：Number ( 默认值：10 )<br/>回调函数执行的优先级，SDK默认的优先级为10，如果要先于默认回调执行，请使用1~9的优先级，如果要后于默认回调执行，请大于10的优先级。
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