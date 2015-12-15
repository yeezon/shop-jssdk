var util = require('./util.js');

module.exports = function(info, option){
  if(window.yhsdDebug){
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