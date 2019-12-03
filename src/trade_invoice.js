var base = require('./base.js');
var expo = require('./expo.js');
var util = require('./util.js');

var aConfig = {
  get: {url: ''},
  update: {method: 'POST'},
  destroy: {method: 'DELETE'}
};

var module = base('trade_invoice', function(factory){
  factory.createByConfig(aConfig);
});

util.forEach(aConfig, function(value, key){
  exports[key] = expo(module, key);
});