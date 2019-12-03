var uri = require('../uri.js');
var ajax = require('../ajax.js');

function oReq(){
	var self = this;

	self._retry = 0;
	self._maxRetry = 1;
}
oReq.prototype._setParam = function(o, sUri){
	var self = this;
	if(!o){
		o = {};
	}
	if(!o.data){
		o.data = {};
	}
	o.dataType = 'json';
	if(!o.error){
		o.error = function(){
			console.log('req error times:' + self._retry + ', ' + (o.url ? o.url : 'empty'));
			if(self._retry > self._maxRetry){
				return;
			}
			setTimeout(function(){
				self._retry = self._retry + 1;
				self._send(o);
			}, 1000);
		};
	}
	o.url = uri(sUri);
};
oReq.prototype._send = function(o){
	ajax(o);
};
oReq.prototype._get = function(sUri, oParam){
	var self = this;
	self._setParam(oParam, sUri);
	oParam.method = 'GET';
	oParam.type = 'GET';
	self._send(oParam);
};
oReq.prototype._post = function(sUri, oParam){
	var self = this;
	self._setParam(oParam, sUri);
	oParam.method = 'POST';
	oParam.type = 'POST';
	self._send(oParam);
};
oReq.prototype._jsonp = function(sUri, oParam){
	var self = this;
	self._setParam(oParam, sUri);
	oParam.method = 'GET';
	oParam.type = 'GET';
	//
	oParam.data.rnd = new Date().getTime();
	//
	oParam.dataType = 'jsonp';
	oParam.url = uri(sUri);
	self._send(oParam);
};
function _checkArg(args){
	if(!args){
		args = [];
	}
	if(!args[0]){
		args[0] = '';
	}
	if(!args[1]){
		args[1] = {};
	}
}

exports.get = function(){
	var req = new oReq();
	_checkArg(arguments);
	req._get(arguments[0], arguments[1]);
};

exports.post = function(){
	var req = new oReq();
	_checkArg(arguments);
	req._post(arguments[0], arguments[1]);
};

exports.jsonp = function(){
	var req = new oReq();
	_checkArg(arguments);
	req._jsonp(arguments[0], arguments[1]);
};