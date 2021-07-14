// 实现真正链式调用，promise解决回调地狱问题，then中返回新的异步结果
// 将上一次then的值传递给下一次then的关键是更新缓存结果value，resolve调用时正好更新this.value

// Promise 采用观察者模式
// 1.通过 Promise.prototype.then 和 Promise.prototype.catch 方法将观察者方法注册到被观察者 Promise 对象中，同时返回一个新的 Promise 对象，以便可以链式调用。
// 2.被观察者管理内部 pending、fulfilled 和 rejected 的状态转变，同时通过构造函数中传递的 resolve 和 reject 方法以主动触发状态转变和通知观察者。
// 参考链接：https://zhuanlan.zhihu.com/p/58428287

class PromiseChain {
  callbacks = []; // 回调栈
  state = "pending"; // 状态
  value = null; // 缓存结果

  constructor(fn) {
    fn(this._resolve.bind(this), this._reject.bind(this));
  }

  then(onFulfilled, onRejected) {
    // 返回新的promise  实现链式调用，并且更新value的值
    const _ = this.constructor; // 获取构造函数
    return new _((resolve, reject) => {
      this._handle({
        onFulfilled: onFulfilled || null,
        onRejected: onRejected || null,
        resolve: resolve,
        reject: reject,
      });
    });
  }

  _handle(callback) {
    if (this.state == "pending") {
      // 只要不是fulfilled或rejected，就一直往调用栈中推函数，不执行
      this.callbacks.push(callback);
      return;
    }

    let cb =
      this.state === "fulfilled" ? callback.onFulfilled : callback.onRejected;

    //如果then中没有传递任何东西 则输出上一次的this.value值即可
    if (!cb) {
      cb = this.state === "fulfilled" ? callback.resolve : callback.reject;
      cb(this.value);
      return;
    }

    // resolve或reject函数已执行，则将回调函数中的所有then方法执行，并将结果传入resovle中，更新this.value值
    const ret = cb(this.value); // 获取then return的返回值，作为新的value传递到下一次的then中
    cb = this.state === "fulfilled" ? callback.resolve : callback.reject;
    cb(ret); // 调用resolve等于调用 _resolve，这样可以将这一次的异步结果传递给下一次then
  }

  _resolve(value) {
    // 兼容value是一个promise
    if (value && (typeof value === "object" || typeof value === "function")) {
      var then = value.then;
      if (typeof then === "function") {
        // 如果then return的是新的promise，则立即执行then，进行函数注册 开启新一轮的value值更新
        then.call(value, this._resolve.bind(this), this._reject.bind(this));
        return;
      }
    }

    this.value = value; // 缓存结果，防止resolve执行后，无法执行后续注册的回调
    this.state = "fulfilled";
    this.callbacks.forEach((cb) => this._handle(cb)); // 执行回调
  }

  _reject(error) {
    this.state = "rejected";
    this.value = error;
    this.callbacks.forEach((callback) => this._handle(callback));
  }

}

//Promise应用
let sp = new PromiseChain((resolve) => {
  // setTimeout(() => {
  //   console.log("sp done");
  //   resolve("sp 1秒");
  // }, 1000);
  console.log("sp同步执行");
  resolve("sp同步执行");
})
  .then((tip) => {
    console.log("sp-1", tip);
    return tip + "-1"; // 必须return 传递新的this.value值
  })
  .then((tip) => {
    console.log("sp-2", tip);
    return tip + "-2";
  });

setTimeout(() => {
  sp.then((tip) => {
    console.log("sp-3", tip);
  });
});

let sp2 = new PromiseChain((resolve) => {
  setTimeout(() => {
    console.log("异步执行sp2");
    resolve("异步执行sp2");
  }, 1000);
}).then((tip) => {
  console.log("sp2-1", tip);
});
