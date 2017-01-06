let EBUS = require('../../ebus');
let CONSTANTS = require('../../config/constants');

Page({
    data: {
        text: "Page index2"
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
        /**为需要注册的事件注册 */
        // EBUS.register(this, CONSTANTS.EVENT_SEND_INDEX1, this.doSomething);
        EBUS.register(this, CONSTANTS.EVENT_SEND_INDEX2, this.doSomething);
        // EBUS.register(this, CONSTANTS.EVENT_SEND_INDEX3, this.doSomething);
    },

    onUnload: function() {
        // 页面关闭
        EBUS.register(this, null);
    },


    /*处理接受数据*/
    doSomething: function(data) {
        this.setData({
            text: data.text, //text是传递过来的数据里自定义的字段
        });
    },

    /*发送数据*/
    sendDataFunc: function() {
        // EBUS.post(CONSTANTS.EVENT_SEND_INDEX1, { /*数据*/
        //     text: '这是index2',
        //     other: {
        //         phone: 110
        //     }
        // });
        // EBUS.post(CONSTANTS.EVENT_SEND_INDEX2, { /*数据*/
        //     text: '这是index2',
        //     priceId: 120,
        // });
         EBUS.postSticky(CONSTANTS.EVENT_SEND_INDEX1, { /*数据*/
            text: '这是index2_sticky',
            other: {
                phone: 110
            }
        });
    },

})