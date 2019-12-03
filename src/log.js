var util = require('./util.js');

var _global = (window || global);

module.exports = function(info, option){
  if(_global.yhsdDebug){
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