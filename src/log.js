var util = require('./util.js');

module.exports = function(info){
  if(window.yhsdDebug){
    var sLog = '';
    util.forEach(info, function(value, key){
      var sEachLog = key + ':' + value + '  ';
      sLog = sLog + sEachLog;
    });
    console.log(sLog);
  }
};