var util = require('./util.js');

// globalThis 暂时不用
var _global = {};
try {
  _global = global;
} catch (error) {
  _global = window;
}

module.exports = function(info, option){
  if((_global.yhsd || {}).yhsdDebug){
    var sLog = '';
    util.forEach(info, function(value, key){
      var sEachLog = key + ':' + value + '  ';
      sLog = sLog + sEachLog;
    });
    if(console && console.log){
    	if(option){
    		console.log('%c' + sLog, option);
    	}else{
    		console.log(sLog);
    	}
    }
  }
};