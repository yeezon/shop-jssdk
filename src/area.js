var base = require('./base.js');
var util = require('./util.js');
var expo = require('./expo.js');
var events = require('./events.js');

var aConfig = {
  country: {url: 'country'},
  province: {url: 'province'},
  city: {url: 'city'},
  district: {url: 'district'}
};

var aInternal = {
	provinceCn : function(){
		var self = this;
		//
		self.province({
			country_code: 'CN'
		}, function(data){
			events.publish('area.provinceCn.done', data);
		});
	}
};

var module = base('area', function(factory, base){
  factory.createByConfig(aConfig);
  factory.internalByConfig(aInternal);
});

util.forEach(aConfig, function(value, key){
  exports[key] = expo(module, key);
});

util.forEach(aInternal, function(value, key){
  exports[key] = expo(module, key);
});


/**
 * 地区信息，用于获取收货人信息地址编码
 *
 * ```country
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * ^^^
 * &&& {
 * &&& 	"code" : 200,
 * &&& 	"message" : "",
 * &&& 	"countries" : [{
 * &&& 			"code" : "CN",
 * &&& 			"name" : "中国"
 * &&& 		}
 * &&& 	]
 * &&& }
 * ^^^
 * ```
 *
 * ```province
 * `` param
 * &` 类型：Object
 * &&` ^^^country_code^^^ 类型：String<br/>从 country 接口获取的国家编码，例如：'CN'
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * ^^^
 * &&& {
 * &&& 	"code" : 200,
 * &&& 	"message" : "",
 * &&& 	"provinces" : [{
 * &&& 			"code" : "110000",
 * &&& 			"name" : "北京市"
 * &&& 		}, {
 * &&& 			"code" : "310000",
 * &&& 			"name" : "上海市"
 * &&& 		}, {
 * &&& 			"code" : "120000",
 * &&& 			"name" : "天津市"
 * &&& 		}, {
 * &&& 			"code" : "500000",
 * &&& 			"name" : "重庆市"
 * &&& 		}, {
 * &&& 			"code" : "130000",
 * &&& 			"name" : "河北省"
 * &&& 		}
 * &&& 		...
 * &&& 	]
 * &&& }
 * ^^^
 * ```
 *
 * ```provinceCn
 * `` 无
 * &` 需自行订阅 "area.provinceCn.done" 事件并处理 [如何订阅？](/development/s/554a25d40abc3e2f22000019#-subscribe-topic-callback-priority-)
 * ```
 *
 * ```city
 * `` param
 * &` 类型：Object
 * &&` ^^^province_code^^^ 类型：String<br/>接口获取的省份编码，例如：'440000'
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * ^^^
 * &&& {
 * &&& 	"code" : 200,
 * &&& 	"message" : "",
 * &&& 	"cities" : [{
 * &&& 			"code" : "440100",
 * &&& 			"name" : "广州市"
 * &&& 		}, {
 * &&& 			"code" : "440300",
 * &&& 			"name" : "深圳市"
 * &&& 		},
 * &&&         ...
 * &&& 	]
 * &&& }
 * ^^^
 * ```
 *
 * ```district
 * `` param
 * &` 类型：Object
 * &&` ^^^city_code^^^ 类型：String<br/>从 city 接口获取的城市编码，例如：'440300'
 * `` callback
 * &` 类型：Function( 返回对象 )<br/>获取信息后的回调函数
 * ^^^
 * &&& {
 * &&& 	"code" : 200,
 * &&& 	"message" : "",
 * &&& 	"districts" : [{
 * &&& 			"code" : "440304",
 * &&& 			"name" : "福田区"
 * &&& 		}, {
 * &&& 			"code" : "440305",
 * &&& 			"name" : "南山区"
 * &&& 		},
 * &&& 		...
 * &&& 	]
 * &&& }
 * ^^^
 * ```
 *
 * @param {country} `callback` 获取国家编码，目前只包含中国
 * @param {province} `param,callback` 传入国家代码，获取省份、直辖市编码
 * @param {provinceCn} `&nbsp;` 获取中国省份编码，简化 province 接口调用
 * @param {city} `param,callback` 传入省份代码，获取城市、直辖市编码
 * @param {district} `param,callback` 传入城市代码，获取行政区域编码
 *
 */