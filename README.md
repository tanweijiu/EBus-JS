# EBus-JS
 <br>
## simplifies communication between pages for WeChatApp in JS <br>基于微信小程序使用纯js编写的事件通知机制工具

 <br>

## **使用方式：**



### 在需要接受事件的page页引入js文件
```javascript
let EBUS = require('ebus.js');
```

 <br>
### 在需要接受事件的page页的onLoad或者其他非销毁结束生命周期调用中注册事件
```javascript
   onLoad: function() {
        /**
            *为需要注册的事件注册  
            * @param {String} eventName
            * @param {function} func
            * @param {any} observer
        */
        EBUS.register(this, "自定义事件名字", this.onRecivedEvent/*自定义接受事件*/);
   }
```

 <br>
### 在注册过的page页的onUnLoad或者其他销毁结束生命周期调用中取消注册事件
```javascript
 onUnload: function() {
     /**
        *取消注册事件  
        * 删掉一个事件监听
        * 两个参数其中一个不能为空，
        * @param {String} eventName 若只有事件名字为空，则删除所有observer下的事件
        * @param {any} observer 若只有observer为空，则删除所有名为eventName的事件
        * @returns
    */
    EBUS.unRegister(this, null);
  },
```

 <br>
### the last one : 在想发送事件数据的地方，比如其他page页面，当然，你也可以在当前页面（应该没有人这么无聊的在当前页面使用这种方法吧）
```javascript
    /**
        * 发送一个事件
        * 
        * @param {String} eventName
        * @param {any} data
    */
   EBUS.post("自定义事件名字", {/*数据，按需构造数据，不限制*/});
```

```javascript
    /**todo 没完成 
        * 发送一个sticky事件,只会被最先消费一次就会失效
        * 
        * @param {String} eventName
        * @param {any} data
    */
   EBUS.post("自定义事件名字", {/*数据，按需构造数据，不限制*/});
```

 <br>
### **demo效果**
 ![](https://github.com/tanweijiu/EBus-JS/blob/master/art/ebus.gif)
***

 <br>
## **Todo List:**
 + [ ] 发送延迟事件（postSticky）
 + [ ] ...
 
 




