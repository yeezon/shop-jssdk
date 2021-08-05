const PACKAGE = require('../package.json');

exports.get = function(){
  return PACKAGE.version || '';
};
