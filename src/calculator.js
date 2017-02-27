var Calculator = function() {
    var OrderCalculator = {
        item_amount: 0,
        shipment_amount: 0,
        discount_amount: 0,
        coupon_discount_amount: 0,
        level_discount_amount: 0,
        point_disocunt_amount: 0,
        final_amount: 0,
        //
        level_discount: 100,
        reward_point_exchange_ratio: 0,
        reward_point_limit: 0,
        reward_point_total: 0,
        reward_point_max: 0,
        reward_point_use: 0
    };
    var cache = null;
    //
    OrderCalculator.update = function(data) {
        var self = this;
        cache = null;
        $.each(data, function(key, value) {
            if(typeof value === 'number' && isFinite(value)) {
                self[key] = value;
            } else {
                console.log('Key: "' + key + '" Not Finite');
            }
        });
    };
    //
    OrderCalculator.calculate = function() {
        var final_amount = this.item_amount;
        // 优惠活动（不包括免邮） + 优惠券
        final_amount -= this.discount_amount;
        final_amount -= this.coupon_discount_amount;
        final_amount < 0 && (final_amount = 0); // jshint ignore:line
        // 会员等级优惠
        if(final_amount > 0 && this.level_discount < 100 && this.level_discount > 0) {
            this.level_discount_amount = Math.floor(final_amount * (100 - this.level_discount) / 100);
            final_amount -= this.level_discount_amount;
        } else {
            this.level_discount_amount = 0;
        }
        // 运费
        final_amount += this.shipment_amount;
        // 积分
        if(final_amount > 0 && this.reward_point_exchange_ratio > 0) {
            var point_disocunt_amount_limit = final_amount * this.reward_point_limit / 100;
            this.reward_point_max = Math.ceil(point_disocunt_amount_limit / this.reward_point_exchange_ratio);
            this.reward_point_max = Math.min(this.reward_point_max, this.reward_point_total);
            this.reward_point_use = Math.min(this.reward_point_max, Math.max(this.reward_point_use, 0));
            this.point_disocunt_amount = Math.min(this.reward_point_use * this.reward_point_exchange_ratio , point_disocunt_amount_limit);
            final_amount -= this.point_disocunt_amount;
        } else {
            this.reward_point_max = 0;
            this.reward_point_use = 0;
        }
        this.final_amount = final_amount;
    };
    //
    OrderCalculator.get = function(callback) {
        if(!cache) {
            this.calculate();
            cache = {
                item_amount:                 this.item_amount,
                shipment_amount:             this.shipment_amount,
                discount_amount:             this.discount_amount,
                coupon_discount_amount:      this.coupon_discount_amount,
                level_discount_amount:       this.level_discount_amount,
                point_disocunt_amount:       this.point_disocunt_amount,
                final_amount:                this.final_amount,
                //
                level_discount:              this.level_discount,
                reward_point_exchange_ratio: this.reward_point_exchange_ratio,
                reward_point_limit:          this.reward_point_limit,
                reward_point_total:          this.reward_point_total,
                reward_point_max:            this.reward_point_max,
                reward_point_use:            this.reward_point_use
            };
        }
        if(callback) {
            callback(cache);
        } else {
            return cache;
        }
    };
    //
    OrderCalculator.help = function() {
        console.log('item_amount: 商品总金额');
        console.log('shipment_amount: 运费总金额');
        console.log('discount_amount: 不含免邮的优惠活动折扣金额');
        console.log('coupon_discount_amount: 优惠券折扣金额');
        console.log('level_discount_amount: 会员等级折扣金额');
        console.log('point_disocunt_amount: 积分抵现金额');
        console.log('final_amount: 实付金额');
        console.log('level_discount: 会员等级折扣比例');
        console.log('reward_point_exchange_ratio: 1积分兑换的金额');
        console.log('reward_point_limit: 积分兑换上限');
        console.log('reward_point_total: 顾客积分总额');
        console.log('reward_point_max: 顾客可使用积分上限');
        console.log('reward_point_use: 顾客使用的积分');
    };
    return {
        update: function(data) {
            OrderCalculator.update(data);
        },
        get: function(callback) {
            return OrderCalculator.get(callback);
        },
        help: function() {
            OrderCalculator.help();
        }
    };
};

exports = module.exports = Calculator;