var events = require('./events.js');

module.exports = function(oResponse, oHandle){
  if(!oResponse){
    throw 'code: no Param';
  }
  var nCode = 0;
  var oRes = oResponse.res;
  if(typeof oRes.code === 'number'){
    nCode = oRes.code;
  }
  //
  var customRes;
  var fCustomHandle = function(){
    var bHandleByCustom = false;
    if(oHandle && oHandle['code' + nCode]){
      bHandleByCustom = true;
      customRes = oHandle['code' + nCode](oRes);
    }
    return bHandleByCustom;
  };
  var fAlertMessage = function(event){
    var sEvent = event ? event : 'unknow';
    events.publish('api.' + sEvent, oRes);
  };
  if(!fCustomHandle()){
    switch(nCode){
      case 200:
        return oRes;
      case 201:
        return oRes;
      case 202:
        fAlertMessage('needParam');
        break;
      case 203:
        fAlertMessage();
        break;
      //case 204:
      //  fAlertMessage('needLogin');
      //  break;
      case 205:
        fAlertMessage();
        return oRes;
      case 207:
        fAlertMessage('liquidError');
        break;
      case 212: // 未登录
        fAlertMessage('needLogin');
        break;
      case 214: // 需要验证码
        fAlertMessage('needCaptcha');
        return oRes;
      case 308:
        return oRes;
      case 500:
        fAlertMessage('serverError');
        break;
      default:
        fAlertMessage();
    }
  }else{
    return customRes;
  }
};