// 极简的实现
// 非真正链式调用，promise解决回调地狱问题，PromiseSimple无法传递then内获取的值

class PromiseSimple {
  callbacks = []; // 回调栈
  state = "pending"; // 状态
  value = null; // 缓存结果

  constructor(fn) {
    fn(this._resolve.bind(this));
  }

  then(onFulfilled) {
    if (this.state == "pending") {
      this.callbacks.push(onFulfilled); // 注册回调
    } else if (this.state) {
      // fulfilled rejected 执行 finaly时停止当前promise
      onFulfilled(this.value);
    }
    return this; // 链式调用
  }

  _resolve(value) {
    // setTimeout(() => { // 引入状态机制后，可不用异步调用，因为状态改变后，then直接调用
    // 加入异步 防止回调注册没有全部注册完成就执行resolve
    this.value = value; // 缓存结果，防止resolve执行后，无法执行后续注册的回调
    this.state = "fulfilled";
    this.callbacks.forEach((fn) => fn(value)); // 执行回调
    // });
  }

  finaly(finaly_fn) {
    finaly_fn(this.value);
    this.state = null; // GC
    this.value = null; // GC
    return this;
  }
}

//Promise应用
let sp = new PromiseSimple((resolve) => {
  // setTimeout(() => {
  //   console.log("sp done");
  //   resolve("sp 1秒");
  // }, 1000);
  console.log("sp同步执行");
  resolve("sp同步执行");
})
  .then((tip) => {
    console.log("sp-1", tip);
    return 123;
  })
  .then((tip) => {
    console.log("sp-2", tip);
  })
  .finaly((res) => {
    console.log("final", res);
  });
setTimeout(() => {
  sp.then((tip) => {
    console.log("sp-3", tip);
  });
});

let sp2 = new PromiseSimple((resolve) => {
  setTimeout(() => {
    console.log("异步执行sp2");
    resolve("异步执行sp2");
  }, 1000);
}).then((tip) => {
  console.log("sp2-1", tip);
});
