var type_of = require('./type-of.js');
var util = require('./util.js');

module.exports = function(moduleObj, name){
  return function(){
  	var args;
  	if(type_of(arguments[0]) === 'function'){
  		args = [];
  		args[0] = {};
  		util.forEach(arguments, function(v){
  			args.push(v);
  		}, true); // 第三个参数兼容ie8，arguments传入forEach参数之后type变为object，导致无法遍历。设置为true，强制声明传入 argument
  	}else{
  		args = arguments;
      if(type_of(arguments[0]) === 'string'){
        //
        var sHandle = arguments[0];
        //
        args[0] = {
          handle: sHandle
        };
      }
  	}
    moduleObj[name].apply(moduleObj, args);
  };
};