var base = require('./base.js');
var util = require('./util.js');
var expo = require('./expo.js');

var module = base('option', function(factory){
  factory.create('get', ' ');
});

exports.get = expo(module, 'get');