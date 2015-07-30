module.exports = function(sPath){
  //
  var sBase = '/api';
  var sVersion = '/v1';

  if(/^https?:\/\//.test(sPath) || /^\/\//.test(sPath)){
  	return sPath;
  }else{
  	return sBase + sVersion + '/' + sPath;
  }

};