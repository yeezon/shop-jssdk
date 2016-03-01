var express = require('express');
var logger = require('morgan');
var comments = require('parse-comments');
var fs = require('fs');
var _ = require('lodash');
var app = express();

app.use(logger('dev'));

var baseUrl = '../src/';
var docArray = [ 'util', 'shop', 'account', 'address', 'area', 'blog', 'cart', 'discount', 'coupon', 'option', 'order', 'page', 'payment_method', 'product', 'type', 'vendor', 'events', 'captcha'];
var docExt = '.js';
var sNav = '<button style="margin:8px 4px" onclick="window.location.href=\'/?q=#{q}\';">#{q}</button> ';

var postUrl = 'https://admin.youhaosuda.com/devel_doc_center/update_post/';

var tplMain = fs.readFileSync('tpl.txt', {encoding: 'utf-8'});
var tplApi = fs.readFileSync('api.txt', {encoding: 'utf-8'});

var sDocNav = '';
_.forEach(docArray, function(v){
  var sNavEach = sNav.replace(/#{q}/ig, v);
  sDocNav = sDocNav + sNavEach;
});

app.get('/', function(req, res) {
  var value = req.query.q;
  //
  if(!value){
    res.send('<a href="/?q=util">start</a>');
    return;
  }
  //
  var sPath = baseUrl + value + docExt;
  fs.readFile(sPath, {encoding: 'utf-8'},function(err, data){
    var aConfig = comments(data);
    if(aConfig[0]){
      var sData = fMakeMarkdown(aConfig[0]);
      var sContent = sData.replace(/&&&/g, '   ').replace(/&&`/g, '    *').replace(/&`/g, '  *').replace(/``/g, '* *').replace(/\^\^\^/g, '```');
      var sTextarea = '<div style="margin-top:20px;"><textarea style="height:400px;width:500px;" onclick="this.focus();this.select()">' + sContent +  '</textarea></div>';
      res.send(sDocNav + sTextarea);
    }else{
      res.send(sDocNav + '<div style="margin-top:20px;">无法生成文档</div>');
    }
  })
});

app.listen(3000);

function fMakeMarkdown(oConfig){
  var sMarkdown = '';
  //
  sMarkdown = tplMain.replace(/#{intro}/, oConfig.lead);
  //
  var sApiContent = '';
  //
  _.forEach(oConfig.params, function(value){
    var sValueName = value.name.replace(/\[,/g, '!~!').replace(/,\]/g, '~!~');
    sValueName = sValueName.replace(/,/g, ', ').replace(/!~!/g, ' [,').replace(/~!~/g, ',] ');
    var sEachParam = tplApi.replace(/#{param}/, sValueName);
    sEachParam = sEachParam.replace(/#{apiintro}/, value.description);
    var oExample = _.find(oConfig.examples, function(o){
      return (o.lang == value.type);
    });
    sEachParam = sEachParam.replace(/#{apiparam}/, oExample.code);
    var sFuncName = value.type.split('Poly')[0];
    sEachParam = sEachParam.replace(/#{funcname}/, sFuncName);
    sApiContent = sApiContent + sEachParam;
  })
  //
  sMarkdown = sMarkdown.replace(/#{api}/, sApiContent);
  //
  return sMarkdown;
}