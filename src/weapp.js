var base = require('./base.js');
var expo = require('./expo.js');
var util = require('./util.js');

var aConfig = {
  auth: {method: 'GET', url: 'applet/authorize'},
  payment: {method: 'GET', url: 'payment/applet_go_pay'},
  decrypt: {method: 'GET', url: '../account/decrypt'},
  phoneNumber: {method: 'GET', url: 'applet/decrypt'}
};

var module = base('weapp', function(factory){
  //
  factory.get();
  //
  factory.createByConfig(aConfig);
  //
});

exports.get = expo(module, 'get');

util.forEach(aConfig, function(value, key){
  exports[key] = expo(module, key);
});
