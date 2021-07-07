console.log(...log("发布订阅者模式:"));
// 借鉴https://github.com/mroderick/PubSubJS/blob/master/src/pubsub.js#L18

(function (root, factory) {
  "use strict";

  var PubSub = {};
  root.PubSub = PubSub;

  factory(PubSub);
  if (typeof exports === "object") {
    if (module !== undefined && module.exports) {
      exports = module.exports = PubSub;
    }
    exports.PubSub = PubSub;
    module.exports = exports = PubSub;
  } else if (typeof define === "function" && define.amd) {
    define(function () {
      return PubSub;
    });
  }
})((typeof window === "object" && window) || this, function (PubSub) {
  var topicStack = Object.create(null); // topic调用栈

  var isFn = function (fn) {
    return Object.prototype.toString.call(fn) == "[object Function]";
  };

  var isString = function (fn) {
    return Object.prototype.toString.call(fn) == "[object String]";
  };

  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  var guid = function () {
    return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
  };

  var hasKeys = function (obj) {
    var key;

    for (key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return true;
      }
    }
    return false;
  };

  var hasKey = function (obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  };

  /**
   * topicName 订阅话题名
   * message 发送的消息
   */
  PubSub.publish = function (topicName, message) {
    var topicName = String(topicName);
    if (!hasKey(topicStack, topicName)) return true;
    message = typeof message === "symbol" ? message.toString() : message;
    if (topicStack[topicName] && topicStack[topicName].length) {
      var cbs = topicStack[topicName],
        i = 0;
      for (; i < cbs.length; i++) {
        cbs[i]["callback"].call(this, message, topicName);
      }
    }
  };

  /**
   * 异步发布消息
   * topicName 订阅话题名
   * message 发送的消息
   * delay 延时时间
   */
  PubSub.publishSync = function (topicName, message, delay) {
    setTimeout(function (params) {
      PubSub.publish(topicName, message);
    }, delay);
  };

  /**
   * topicName 订阅话题名
   * callback 订阅的回调函数
   * 返回订阅话题的订阅器的id
   */
  PubSub.subscribe = function (topicName, callback) {
    if (!isFn(callback)) throw new Error(`callback is not a Funciton`);
    var topicName = String(topicName),
      id = `${topicName}_${guid()}`;
    if (!hasKey(topicStack, topicName)) topicStack[topicName] = [];
    topicStack[topicName].push({
      id: id,
      callback: callback,
    });
    return id; // 返回订阅器名称
  };

  PubSub.unSubscribe = function (subId) {
    for (var k in topicStack) {
      var idx = topicStack[k].findIndex(function (v) {
        return v.id == subId;
      });
      idx != -1 && topicStack[k].splice(idx, 1);
      break;
    }
  };
});