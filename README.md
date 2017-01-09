# EBus-JS
 <br>
> simplifies communication between pages for WeChatApp in JS <br>基于微信小程序使用纯js编写的事件通知机制工具<br>https://github.com/tanweijiu/EBus-JS

 <br>

## EBus-JS Installation

### 在需要接受事件的page页引入js文件

```js 
let EBUS = require('ebus.js');
```

 
### 在需要接受事件的page页的onLoad或者其他非销毁结束生命周期调用中注册事件

```js  
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



### 在注册过的page页的onUnLoad或者其他销毁结束生命周期调用中取消注册事件

```js  
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
}
```


### 在想发送事件数据的地方，比如其他page页面，当然，你也可以在当前页面（应该没有人这么无聊的在当前页面使用这种方法吧）

```js 
/**
  * 发送一个事件
  * 
  * @param {String} eventName
  * @param {any} data
*/
EBUS.post("自定义事件名字", {/*数据，按需构造数据，不限制*/});
```

```js 
/**
  * 发送一个sticky事件,会被先消费一次,然后保存下来，之后能通过getSticky获取
  * 
  * @param {String} eventName
  * @param {any} data
 */
EBUS.postSticky("自定义事件名字", {/*数据，按需构造数据，不限制*/});
```

### 获取sticky事件数据（同一事件名的数据仅保存最新的一份）

```js
EBUS.getSticky('自定义事件名字');
```

### 删除sticky事件数据（置为null）

```js
EBUS.removeSticky('自定义事件名字');
```


 


### **demo效果**<br>
 ![](https://github.com/tanweijiu/EBus-JS/blob/master/art/ebus.gif)
***



## **Todo List:**
 + [x] 发送延迟事件数据（postSticky）
 + [x] 删除延迟事件数据（removeSticky）
 + [x] 获取延迟事件数据（getSticky）
 + [ ] ...
 

*喜欢的给个star呗*  




