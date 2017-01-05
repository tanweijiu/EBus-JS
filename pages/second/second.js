let EBUS = require('../../ebus');
let CONSTANTS = require('../../config/constants');

Page({
    data: {
        priceId: ""
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
        /**为需要注册的事件注册 */
        // EBUS.register(this, CONSTANTS.EVENT_SEND_INDEX1, this.doWhat);
        // EBUS.register(this, CONSTANTS.EVENT_SEND_INDEX2, this.doWhat);
        EBUS.register(this, CONSTANTS.EVENT_SEND_INDEX3, this.doWhat);
    },

    onUnload: function() {
        // 页面关闭
        EBUS.register(this, null);
    },


    /*处理接受数据*/
    doWhat: function(data) {
        this.setData({
            priceId: '收到一个价格：' + data.price.priceId, //text是传递过来的数据里自定义的字段
        });
    },

    /*发送数据*/
    sendDataFunc: function() {

        EBUS.post(CONSTANTS.EVENT_SEND_INDEX1, { /*数据*/
            text: "这是second",
        });
        EBUS.post(CONSTANTS.EVENT_SEND_INDEX2, { /*数据*/
            text: "这是second",
            price: {
                priceId: 999,
            }
        });
        EBUS.post(CONSTANTS.EVENT_SEND_INDEX3, { /*数据*/
            text: "这是second",
            price: {
                priceId: 999,
            }
        });
    },
})