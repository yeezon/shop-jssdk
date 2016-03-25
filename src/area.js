var req = require('./request.js');
var type_of = require('./type-of.js');
var util = require('./util.js');

var sAreaDataVersion = '160315';
var sAreaDataHost = window.assetHost || '//asset.ibanquan.com/';  // 格式 //asset.ibanquan.com/
var sAreaDataUrl = sAreaDataHost + 'common/js/areadata-' + sAreaDataVersion + '.js';

var oAreaData = {};

var localStorage =  window.localStorage;
var localStorageItemName = 'yhsd_areadata';


var getAreaData = function(callback){
	req.jsonp(sAreaDataUrl, {
		success: function(data){
			callback(data);
		},
		jsonp: 'yhsd_areadata_callback'
	});
};

var initAreaData = function(callback){
	oAreaData = getLocalAreaData();
	if(oAreaData){
		if(type_of(callback) === 'function'){
			callback();
		}
	}else{
		getAreaData(function(data){
			var oTmpData = JSON.parse(data);
			setLocalAreaData(oTmpData);
			oAreaData = oTmpData;
			if(type_of(callback) === 'function'){
				callback();
			}
		});
	}
};

var setLocalAreaData = function(data){
	try{
		if(localStorage){
			localStorage.setItem(localStorageItemName, JSON.stringify(data));
		}
	}catch(e){}
};

var getLocalAreaData = function(){
	//
	var result;
	//
	if(localStorage){
		var localItem = localStorage.getItem(localStorageItemName);
		//
		try{
			if(localItem){
				var areaJson = JSON.parse(localItem);
				if(areaJson.version === sAreaDataVersion){
					result = areaJson;
				}
			}
		}catch(e){}
	}

	return result;
};

var areaFindNext = function(code, callback){
    var aFind = [];
    util.forEach(oAreaData.sub, function(oSub, idx){
      if(oSub[2] == code){
        aFind.push(oSub);
      }
    });
	//
	if(type_of(callback) === 'function'){
		callback(aFind);
	}
};

var areaFindPrev = function(code, callback){
	var oFind = {};
	util.forEach(oAreaData.sub, function(oSub, idx){
		if(oSub[0] == code){
			oFind.district = oSub;
			return false;
		}
	});
	//
	if(oFind.district){
		util.forEach(oAreaData.sub, function(oSub, idx){
			if(oSub[0] == oFind.district[2]){
				oFind.city = oSub;
				return false;
			}
		});
	}else{
		// 一个上级都查不到，是省份
		util.forEach(oAreaData.main, function(oSub, idx){
			if(oSub[0] == code){
				oFind.province = oSub;
				return false;
			}
		});
		//
		if(type_of(callback) === 'function'){
			callback(oFind);
			return;
		}
	}
	//
	if(!oFind.city){
		oFind.city = oFind.district;
		delete oFind.district;
	}
	//
	util.forEach(oAreaData.main, function(oSub, idx){
		if(oSub[0] == oFind.city[2]){
			oFind.province = oSub;
			return false;
		}
	});
	//
	if(type_of(callback) === 'function'){
		callback(oFind);
	}
};

exports.findNext = function(code, callback){
	var args = arguments;
	initAreaData(function(){
		if(args.length == 2){
			areaFindNext(code, function(o){
				callback(o);
			});
		}
	});
};

exports.findPrev = function(code, callback){
	var args = arguments;
	initAreaData(function(){
		if(args.length == 2){
			areaFindPrev(code, function(o){
				callback(o);
			});
		}
	});
};

exports.getData = function(type, callback){
	initAreaData(function(){
		if(type_of(callback) === 'function'){
			callback(oAreaData[type]);
		}
	});
};


/**
 * 多级地区信息编码。<br/><br/>*主要使用在收货人地址地区选择，大部分web端实现形式为省、市、地区三级联动的下拉选择。*<br/>*SDK 中需要提交区域编码的接口（如：order.create 免登录下单中的 district_code），需使用本接口获取对应参数。*<br/>*部分地区(如：新疆石河子)可能存在没有二级（市）或者三级（地区）的选项，故最终选出的结果不一定拥有完整的三级结构。提交时，请使用最后一级的编码。*<br/><br/>接口中返回数据的层级关系：省（province） > 市（city） > 地区（district）
 *
 * ```findNext
 * `` code
 * &` 类型：String<br/>六位的地区编码。
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数。如果返回空数组，则当前传入地区编码已是最后一级。<br/>*传入无对应地区的六位编码，也会返回空数组。请保证传入编码的正确性。*
 * ```
 *
 * ```findPrev
 * `` code
 * &` 类型：String<br/>六位的地区编码。
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数。如果返回空对象，则当前传入地区编码无对应地区。
 * &&& ^^^
 * &&& {
 * &&&     province : ["440000","广东",null],
 * &&&     city : ["440300","深圳","440000"],
 * &&&     district : ["440305","南山","440300"]
 * &&& }
 * &&& ^^^
 * ```
 *
 * ```getData
 * `` type
 * &` 类型：String<br/>需要获取的地区信息类型。<br/>^^^main^^^ - 省级单位，包括直辖市等。对应地区信息中的省（province）<br/>^^^sub^^^ - 城市、地区等。对应地区信息中的市（city）、地区（district）
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>返回对应的地区信息列表
 * ```
 *
 * @param {findNext} `code,callback` 获取当前 code 对应的下级地区信息
 * @param {findPrev} `code,callback` 获取当前 code 对应的地区信息与所有上级地区信息
 * @param {getData} `type,callback` 获取完整地区数据
 *
 */