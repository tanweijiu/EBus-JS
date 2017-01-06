//index.js
let EBUS = require('../../ebus');
let CONSTANTS = require('../../config/constants');

//获取应用实例
var app = getApp()
Page({
    data: {
        motto: '欢迎使用ebus',
        userInfo: {},
    },

    onLoad: function() {

        /**为需要注册的事件注册 */
        EBUS.register(this, CONSTANTS.EVENT_SEND_INDEX1, this.onRecivedEvent);
        // EBUS.register(this, CONSTANTS.EVENT_SEND_INDEX2, this.onRecivedEvent);
        // EBUS.register(this, CONSTANTS.EVENT_SEND_INDEX3, this.onRecivedEvent);

        //调用应用实例的方法获取全局数据
        let that = this;
        app.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo,
                motto: "欢迎" + userInfo.nickName + "使用ebus"
            });
            that.update();
        });
    },

    onUnload: function() {
        /**取消注册事件 */
        EBUS.unRegister(this, null);
    },

    /*处理接受数据*/
    onRecivedEvent: function(data) {
        this.setData({
            motto: data.text, //text是传递过来的数据里自定义的字段
        });
    },

    /*发送数据*/
    sendDataFunc: function() {
        EBUS.post(CONSTANTS.EVENT_SEND_INDEX1, { /*数据*/
            text: '这是index1',
            other: {
                phone: 110
            }
        });
        EBUS.post(CONSTANTS.EVENT_SEND_INDEX2, { /*数据*/
            text: '这是index1',
            priceId: 120,
        });

    },

    /*事件处理函数*/
    bindViewTap: function() {
        wx.navigateTo({
            url: '../second/second?index=1'
        });
        console.log(EBUS.getSticky(CONSTANTS.EVENT_SEND_INDEX1));
        EBUS.removeSticky(CONSTANTS.EVENT_SEND_INDEX1);
        console.log(EBUS.getSticky(CONSTANTS.EVENT_SEND_INDEX1));

    },
})