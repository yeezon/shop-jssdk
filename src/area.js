var req = require('./lib/request.js');
var type_of = require('./type-of.js');
var util = require('./util.js');

var sAreaDataVersion = '220923';
var sAreaDataHost = window.assetHost || '//asset.ibanquan.com/';  // 格式 //asset.ibanquan.com/
var sAreaDataUrl = sAreaDataHost + 'common/js/areadata-' + sAreaDataVersion + '.js';

var oAreaData = {};
var oLocalAreaData = null;

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
	oLocalAreaData = data; // safari 隐私模式不允许存localstorage，直接存内存里
};

var getLocalAreaData = function(){
	//
	if(!oLocalAreaData) {
		if(localStorage){
			var localItem = localStorage.getItem(localStorageItemName);
			//
			try{
				if(localItem){
					var areaJson = JSON.parse(localItem);
					if(areaJson.version === sAreaDataVersion){
						oLocalAreaData = areaJson;
					}
				}
			}catch(e){}
		}
	}
	//
	return oLocalAreaData;
};

var filterAreaData = function(data, whiteList){
	if(whiteList && type_of(whiteList) === 'array') {
		var _whiteList = whiteList.concat(),
			filteredData = [],
			i, j;
		for(i = 0; i < data.length; i++) {
			if(_whiteList.length === 0) {
				break;
			}
			for(j = 0; j < _whiteList.length; j++) {
				if(data[i][0] === _whiteList[j]) {
					filteredData.push(data[i]);
					_whiteList.splice(j, 1);
					break;
				}
			}
		}
		if(filteredData.length === 0) {
			return data;
		} else {
			return filteredData;
		}
	} else {
		return data;
	}
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

exports.findNext = function(code, callback, whiteList){
	var args = arguments;
	initAreaData(function(){
		if(args.length > 1){
			areaFindNext(code, function(o){
				callback(filterAreaData(o, whiteList));
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

exports.getData = function(type, callback, whiteList){
	initAreaData(function(){
		if(type_of(callback) === 'function'){
			callback(filterAreaData(oAreaData[type], whiteList));
		}
	});
};

exports._setData = function(data) {
	setLocalAreaData(data);
};

exports.config = function (options) {
	if (options.areaDataUrl) {
		if (!options.areaDataVersion) {
			throw new Error('必须提供资源版本');
		}
		//
		sAreaDataUrl = options.areaDataUrl;
		sAreaDataVersion = options.areaDataVersion;
		oAreaData = {};
		oLocalAreaData = null;
	}
};

/**
 * 多级地区信息编码。<br/><br/>*主要使用在收货人地址地区选择，大部分web端实现形式为省、市、地区三级联动的下拉选择。*<br/>*SDK 中需要提交区域编码的接口（如：order.create 免登录下单中的 district_code），需使用本接口获取对应参数。*<br/>*部分地区(如：新疆石河子)可能存在没有二级（市）或者三级（地区）的选项，故最终选出的结果不一定拥有完整的三级结构。提交时，请使用最后一级的编码。*<br/><br/>接口中返回数据的层级关系：省（province） > 市（city） > 地区（district）
 *
 * ```findNext
 * `` code
 * &` 类型：String<br/>六位的地区编码。
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数。如果返回空数组，则当前传入地区编码已是最后一级。<br/>*传入无对应地区的六位编码，也会返回空数组。请保证传入编码的正确性。*
 * `` whiteList
 * &` 类型：Array<String><br/>地址白名单。<br/>*只需关注被允许区域的code，比如广东只允许深圳，只要填入深圳的code:440300。*<br/>*如果省份也只允许广东则要填入广东的code:440000，与填入code同级的区域会被自动过滤，要展示其他同级区域需手动填入。*<br/>*如果某一级没有填入code则会展示所有。*
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
 * `` whiteList
 * &` 类型：Array<String><br/>地址白名单。<br/>*只需关注被允许区域的code，比如广东只允许深圳，只要填入深圳的code:440300。*<br/>*如果省份也只允许广东则要填入广东的code:440000，与填入code同级的区域会被自动过滤，要展示其他同级区域需手动填入。*<br/>*如果某一级没有填入code则会展示所有。*
 * ```
 *
 * ```config
 * `` options
 * &` 类型：Object<br/>配置选项（`0.0.21`版本添加，<b>默认无需配置</b>）：<br/>^^^areaDataUrl^^^ - 地址数据。文件格式为 `.js`，`jsonp` 方式加载，内容格式参照 //asset.ibanquan.com/common/js/areadata-190929.js<br/>^^^areaDataVersion^^^ - 地址版本号。如果指定了 areaDataUrl 则此项必填，用于缓存数据。
 * &&& ^^^
 * &&& // 示例：配置繁体地址库
 * &&& yhsd.ready(jssdk => {
 * &&&     jssdk.area.config({
 * &&&         areaDataUrl: '//asset.localtestasset.com/common/js/areadata-170807tc.js',
 * &&&         areaDataVersion: '170807tc'
 * &&&     })
 * &&& })
 * &&& ^^^
 * ```
 *
 * @param {findNext} `code,callback,whiteList` 获取当前 code 对应的下级地区信息
 * @param {findPrev} `code,callback` 获取当前 code 对应的地区信息与所有上级地区信息
 * @param {getData} `type,callback,whiteList` 获取完整地区数据
 * @param {config} `options` 配置地址数据
 *
 */