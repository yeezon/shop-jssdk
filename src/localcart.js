var base = require('./base.js');
var util = require('./util.js');
var expo = require('./expo.js');

var getParam = function(o, key){
  if(o && o.data){
    return o.data[key] || false;
  }
};

var aConfig = {
  get : function(){
    var self = this;
    var sCart = util.getCookie(self.cookieName);
    if(sCart){
      try{
        self.cart = JSON.parse(sCart);
      }catch(e){
        util.setCookie(self.cookieName, '', true);
        window.location.reload();
      }
    }else{
        self.cart = [];
    }
  },
  set : function(oPublish){
    var self = this;
    var aCart = getParam(oPublish, 'cart');
    var bClear = getParam(oPublish, 'is_clear');
    var sCartJson = JSON.stringify(aCart);
    if(bClear){
      util.setCookie(self.cookieName, '', true);
    }else{
      util.setCookie(self.cookieName, sCartJson, true);
    }
  },
  add : function(oPublish){
    var self = this;
    self.get(); // 获取cartData
    var aCart = self.cart || [];
    var oItem = getParam(oPublish, 'item');
    if(!oItem){
      return;
    }
    var bIsSet = getParam(oPublish, 'is_set');
    var bItemInCart = false;
    util.forEach(aCart, function(oEach, index){
      if(oEach.variant_id == oItem.variant_id){
        bItemInCart = true;
        if(bIsSet){
          oEach.quantity = oItem.quantity;
        }else{
          oEach.quantity = oEach.quantity + oItem.quantity;
        }
        if(typeof oItem.is_check !== 'undefined'){
          oEach.is_check = oItem.is_check;
        }
        return false;
      }
    });
    if(!bItemInCart){
      aCart.push(oItem);
    }
    self.set({
      cart: aCart
    });
  },
  checkOne : function(oPublish){
    var self = this;
    self.get(); // 获取cartData
    var aCart = self.cart || [];
    var oParam = getParam(oPublish, 'item');
    util.forEach(aCart, function(oEach, index){
      if(oEach.variant_id == oParam.variant_id){
        oEach.is_check = oParam.is_check;
        return false;
      }
    });
    self.set({
      cart: aCart
    });
  },
  checkAll : function(oPublish){
    var self = this;
    self.get(); // 获取cartData
    var aCart = self.cart || [];
    //
    var bCheck = getParam(oPublish, 'is_check');
    //
    util.forEach(aCart, function(oEach, index){
      oEach.is_check = bCheck;
    });
    self.set({
      cart: aCart
    });
  },
  removeOne : function(oPublish){
    var self = this;
    self.get(); // 获取cartData
    var aCart = self.cart || [];
    //
    var oParam  = getParam(oPublish, 'item');
    var aRemovedCart = [];
    util.forEach(aCart, function(oEach, index){
      if(oEach.variant_id != oParam.variant_id){
        aRemovedCart.push(oEach);
      }
    });
    self.set({
      cart: aRemovedCart
    });
  },
  removeAll : function(){
    var self = this;
    self.set({
      cart: false,
      is_clear: true
    });
  },
  multiRemove : function(oPublish){
    var self = this;
    self.get(); // 获取cartData
    var aCart = self.cart || [];
    //
    var oParam  = getParam(oPublish, 'items');
    var aRemovedCart = [];
    util.forEach(aCart, function(oEach, index){
      var is_match = false;
      util.forEach(oParam.variant_ids, function(variant_id) {
        if(oEach.variant_id === variant_id){
          is_match = true;
        }
      });
      if(!is_match){
        aRemovedCart.push(oEach);
      }
    });
    self.set({
      cart: aRemovedCart
    });
  }
};

var module = base('localcart', function(factory, base){
  base.prototype.cookieName = 'local_cart';
  factory.internalByConfig(aConfig);
});

exports.get = expo(module, 'get');
exports.set = expo(module, 'set');
exports.add = expo(module, 'add');
exports.checkOne = expo(module, 'checkOne');
exports.checkAll = expo(module, 'checkAll');
exports.removeOne = expo(module, 'removeOne');
exports.removeAll = expo(module, 'removeAll');
exports.multiRemove = expo(module, 'multiRemove');