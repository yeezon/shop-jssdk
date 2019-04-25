var base = require('./base.js');
var expo = require('./expo.js');
var util = require('./util.js');

var aConfig = {
  match_trade_items: {},
  per_save: {method: 'POST'},
  save: {method: 'POST'},
  upload_image: {method: 'POST'},
  cancel: {method: 'POST'},
  update: {method: 'POST'}
};

var module = base('service', function(factory){
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
