var base = require('./base.js');
var expo = require('./expo.js');
var util = require('./util.js');

var aConfig = {
  get: {
    url: '../site_form/:handle',
    method: 'GET',
    config: {
      RESTful: true
    }
  },
  submit: {
    url: '../site_form/create_collection/:handle',
    method: 'POST',
    config: {
      RESTful: true
    }
  }
};

var module = base('form', function (factory) {
  //
  factory.createByConfig(aConfig);
  //
});

util.forEach(aConfig, function(value, key){
  exports[key] = expo(module, key);
});
