console.log(...log("发布订阅者模式:"));
// 借鉴https://github.com/mroderick/PubSubJS/blob/master/src/pubsub.js#L18

(function (root, factory) {
  "use strict";

  var PubSub = {};
  root.PubSub = PubSub;
  factory(PubSub);
  // CommonJS and Node.js module support
  if (typeof exports === "object") {
    if (module !== undefined && module.exports) {
      exports = module.exports = PubSub; // Node.js specific `module.exports`
    }
    exports.PubSub = PubSub; // CommonJS module 1.1.1 spec
    module.exports = exports = PubSub; // CommonJS
  }
  // AMD support
  /* eslint-disable no-undef */
  else if (typeof define === "function" && define.amd) {
    define(function () {
      return PubSub;
    });
    /* eslint-enable no-undef */
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

  var getTopicId = function (topicName) {
    return St;
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

  /**
   * topicName 订阅话题名
   * message 发送的消息
   */
  PubSub.publish = function (topicName, message) {
    message = typeof message === "symbol" ? message.toString() : message;
    var topicName = String(topicName);
    if (topicStack[String(topicName)] && topicStack[String(topicName)].length) {
      var cbs = topicStack[String(topicName)],
        i = 0;
      for (; i < cbs.length; i++) {
        cbs[i].call(this, message);
      }
    }
  };

  /**
   * topicName 订阅话题名
   * callback 订阅的回调函数
   */
  PubSub.subscribe = function (topicName, callback) {
    if (!isFn(callback)) throw new Error(`callback is not a Funciton`);
    var topicName = String(topicName);
    if (!(topicName in topicStack)) topicStack[topicName] = [];
    topicStack[topicName].push(callback);
    return topicName; // 返回订阅器名称
  };

  PubSub.unSubscribe = function (topicName) {
    topicStack[String(topicName)] && delete topicStack[String(topicName)];
  };
});
