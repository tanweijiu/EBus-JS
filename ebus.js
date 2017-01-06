/**
 * author: WaizauTam
 * des: 事件通知机制工具
 */

//注册的监听回调
let events = [];
// 延迟接受事件存储
let stickies = {};
// todo 上线时这个最好关闭
let isDebug = false;


/**
 * register a function for (observer && eventName)
 * 增加一个事件监听
 * 
 * @param {String} eventName
 * @param {function} func
 * @param {any} observer
 */
function register(observer, eventName, func) {
    if (eventName && func) {
        if (!observer) {
            if (isDebug) console.warn(eventName, ', no observer can\'t remove event');
        }
        // 把方法指向正确的上下文调用对象。否则将指向events列表里的event对象...
        func = func.bind(observer);
        events.push({
            eventName: eventName,
            func: func,
            observer: observer
        });
        if (isDebug) console.log(events.length, " : ", eventName, ' registered\n ', func);
    } else {
        if (isDebug) console.error('event name || function can\'t not be null');
    }
}

/**
 * post a normal event
 * 发送一个事件,这个事件会被立马消费掉
 * 
 * @param {String} eventName
 * @param {any} data
 */
function post(eventName, data) {
    if (eventName) {
        if (isDebug) console.log('ebus send: ', eventName);
        for (let i = 0; i < events.length; ++i) {
            let e = events[i];
            if (e.eventName === eventName) {

                e.func(data, e.observer);

                if (isDebug) console.log('event: ', eventName, " get a event_post");
            }
        }
    } else {
        if (isDebug) console.error('event name  can\'t not be null');
    }
}

/**
 * post  a  sticky event
 * 发送一个延迟sticky事件
 * 
 * @param {String} eventName
 * @param {any} data
 */
function postSticky(eventName, data) {
    post(eventName, data);
    stickies[eventName] = data;
    if (isDebug) console.log("post a sticky: " + eventName);
}

/**
 * 获取最新的名为eventName的data(空为undefined)
 * 
 * @param {any} eventName
 */
function getSticky(eventName) {
    return stickies[eventName];
}

/**
 * 
 * remove sticky event which name are eventName
 * 删除名为eventName的事件通知
 * 
 * @param {any} eventName
 */
function removeSticky(eventName) {
    stickies[eventName] = null;
    if (isDebug) console.log("remove a sticky: " + eventName);
}

/**
 * 删掉一个事件监听
 * 两个参数其中一个不能为空，
 * @param {String} eventName 若只有事件名字为空，则删除所有observer下的事件
 * @param {any} observer 若只有observer为空，则删除所有名为eventName的事件
 * @returns
 */
function unRegister(observer, eventName) {
    if (eventName && observer) {
        // 精准的删除某个页面下的某个注册事件监听
        for (let i = 0; i < events.length; ++i) {
            let e = events[i];
            if (e.eventName === eventName && e.observer === observer) {
                events.splice(i, 1);
                if (isDebug) console.log('unRegister event:', eventName);
                return 1;
            }
        }
        if (isDebug) console.log('can\'t find event:', eventName);
        return 0;
    } else if (eventName && !observer) {
        //删除所有名为eventName的事件
        let indexes = events.map((e, i) => e.eventName === eventName ? i : -1).filter(i => i >= 0).reverse();
        if (isDebug) console.log(indexes);
        if (indexes.length > 0) {
            for (let i = 0; i < indexes.length; i++) {
                events.splice(indexes[i], 1);
                if (isDebug) console.log('unRegister event by eventName: ', eventName);
            }
            return indexes.length;
        } else {
            if (isDebug) console.log('can\'t find event: ', eventName);
        }
        return 0;
    } else if (!eventName && observer) {
        // 删除所有observer下的事件
        let indexes = events.map((e, i) => e.observer === observer ? i : -1).filter(i => i >= 0).reverse();
        if (isDebug) console.log(indexes);
        if (indexes.length > 0) {
            for (let i = 0; i < indexes.length; i++) {
                events.splice(indexes[i], 1);
                if (isDebug) console.log('unRegister event by  observer_', i);
            }
            return indexes.length;
        } else {
            if (isDebug) console.log('can\'t find event by observer');
        }
        return 0;
    } else {
        if (isDebug) console.error('event name || function can\'t not be null');
    }
    return 0;
}

/*测试*/
function test() {
    let start = new Date().getTime();
    for (var i = 0; i < 100; ++i) {
        register(this, "" + i, (data) => {
            console.log("收到事件：", data.a);
        });
        postSticky("" + i, {
            a: i
        });
        removeSticky("" + i);
        
    }
    console.log("time:", new Date().getTime() - start);
}



module.exports = {
    register: register,
    post: post,
    postSticky: postSticky,
    removeSticky: removeSticky,
    getSticky: getSticky,
    unRegister: unRegister
}