// Promise对象初始状态为 Pending，在被 resolve 或 reject 时，状态变为 Fulfilled 或 Rejected
// resolve接收成功的数据，reject接收失败或错误的数据
// Promise对象必须有一个 then 方法，且只接受两个可函数参数 onFulfilled、onRejected

// ---------test-------
// const p = new Promise((reslove, reject) => {
//     reslove(0);
// });
// p.then((res) => {
//         console.log(res);
//         return ++res;
//     })
//     .then((res) => {
//         return ++res;
//     })
//     .finally((res) => {
//         console.log('finally');
//     });
const p1 = new Promise((reslove, reject) => {
  setTimeout(() => {
    reslove("first");
  }, 1000);
});
const p2 = new Promise((reslove, reject) => {
  setTimeout(() => {
    reslove("second");
  }, 500);
});
// Promise.race([p1, p2]).then((res) => {
//     console.log(res);
// });
// Promise.all([p1, p2]).then((res) => {
//     console.log(res);
// });
// console.log('start');
// ---------test-------

class MyP extends Promise {
  constructor(fn) {
    super(fn);
  }

  isArray(p_arr) {
    if (!Array.isArray(p_arr)) {
      throw new TypeError("argument is not Array");
    }
  }

  // 自定义all
  myAll(p_arr) {
    this.isArray(p_arr);
    const len = p_arr.length,
      result = [];
    return new Promise((resolve, reject) => {
      for (let i = 0; i < p_arr.length; i++) {
        p_arr[i].then(
          (res) => {
            if (res) {
              result[i] = res; // 按顺序返回响应值
              if (
                result.length == len &&
                result.filter((v) => v !== undefined).length == len // 判断数组每一项都部位empty
              ) {
                resolve(result);
              }
            }
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }

  // 自定义race
  myRace(p_arr) {
    this.isArray(p_arr);
    return new Promise((reslove, reject) => {
      for (let i = 0; p_arr[i]; ) {
        p_arr[i].then(
          (res) => {
            reslove(res);
          },
          (err) => {
            reject(err);
          }
        );
        i++;
      }
    });
  }

  finally(onDone) {
    if (typeof onDone !== 'function') return this.then();

    let Promise = this.constructor;
    return this.then(
      value => Promise.resolve(onDone()).then(() => value),
      reason => Promise.resolve(onDone()).then(() => { throw reason })
    );
  }
}
const myp = new MyP(((r) => {}, (j) => {}));
console.log(myp);
myp.myAll([p1, p2]).then((res) => {
  console.log(res);
});
myp.myRace([p1, p2]).then((res) => {
  console.log(res);
});

// Promise.prototype.myAll = function (p_arr) {
//   if (!Array.isArray(p_arr)) {
//     throw new TypeError("myAll argument is not Array");
//   }
//   const len = p_arr.length,
//     result = [];
//   return new Promise((resolve, reject) => {
//     for (let i = 0; i < p_arr.length; i++) {
//       p_arr[i].then(
//         (res) => {
//           if (res) {
//             // result[i] = res;
//             result.push(res);
//             if (result.length == len) {
//               resolve(result);
//             }
//           }
//         },
//         (err) => {
//           reject(err);
//         }
//       );
//     }
//   });
// };
// var p = new Promise((r, j) => {});
// p.myAll([p1, p2]).then((res) => {
//   console.log(res);
// });

// const noop = function () {};
// const isFn = (fn) => typeof fn == "function";

// const myPromise = (fn) => {
//   // 判断 this一定得是object不然就会报错，这个方法一定得要new出来
//   if (typeof this !== "object") {
//     throw new TypeError("Promises must be constructed via new");
//   }

//   if (!isFn(fn))
//     throw new TypeError("Promise constructor's argument is not a function");

//   this._deferredState = 0;

//   this._state = 0;

//   this._value = null;

//   this._deferreds = null;

//   // 关键：doResolve
//   _doResolver(fn, this);
// };

// // fn:promise初始化时的匿名函数 （resolve,reject）=>{}
// // a:resolve()  b:reject()
// const _tryCallTwo = (fn, a, b) => {
//   try {
//     fn(a, b);
//   } catch (ex) {
//     LAST_ERROR = ex;
//     return IS_ERROR;
//   }
// };

// // 确保`onFulfilled`和`onRejected`方法只调用一次
// // 不保证异步
// const _doResolver = (fn, promise) => {
//   let done = false;

//   // 关键：
//   let res = _tryCallTwo(
//     fn,
//     function (value) {
//       // 如果done 为true 则return
//       if (done) return;
//       done = true;
//       // 回调执行 resolve()
//       _resolve(promise, value);
//     },
//     function (reason) {
//       // 如果done 为true 则return
//       if (done) return;
//       done = true;
//       _reject(promise, reason);
//     }
//   );
//   // res为truCallTwo()的返回值
//   // 如果done没有完成 并且 res 是 `IS_ERROR`的情况下
//   // 也会执行reject()，同时让done完成
//   if (!done && res === IS_ERROR) {
//     done = true;
//     _reject(promise, LAST_ERROR);
//   }
// };

// // 在没有链式调用then的情况下（也就是只要一个then）的情况下，会将内部状态_state设置成3
// // 将传入值赋给内部变量_value最后会执行final()方法，不然则会使用doResolve来调用then
// const _resolve = (self, newValue) => {
//   // 不能传递自己
//   if (newValue === self) {
//     // 报错
//     return _reject(
//       self,
//       new TypeError("A promise cannot be resolved with itself.")
//     );
//   }
//   // promise作为参数
//   if (
//     newValue &&
//     (typeof newValue === "object" || typeof newValue === "function")
//   ) {
//     // 获取它的promise方法 读取newValue.then
//     var then = _getThen(newValue);
//     if (then === IS_ERROR) {
//       // 如果then IS_ERROR
//       return _reject(self, LAST_ERROR);
//     }
//     if (
//       // 如果then是self的then
//       // 并且Promise
//       then === self.then &&
//       // newValue 属于Promise
//       newValue instanceof Promise
//     ) {
//       // _state为3
//       // 一般then之后走这里
//       // 执行then(newValue)返回了promise
//       self._state = 3;
//       // selft.value为newValue
//       self._value = newValue;
//       // 当state为3时执行 finale
//       _finale(self);
//       return;
//     } else if (typeof then === "function") {
//       _doResolve(then.bind(newValue), self);
//       return;
//     }
//
//   self._state = 1;
//   self._value = newValue;
//   _finale(self);
// };

// const _reject = (self, newValue) => {
//   // _state = 2为reject
//   self._state = 2;
//   self._value = newValue;
//   if (Promise._onReject) {
//     Promise._onReject(self, newValue);
//   }
//   _finale(self);
// };

// // 执行自己的deferreds
// const finale = (self) => {
//   if (self._deferredState === 1) {
//     handle(self, self._deferreds);
//     self._deferreds = null;
//   }
//   if (self._deferredState === 2) {
//     for (var i = 0; i < self._deferreds.length; i++) {
//       // 遍历handle
//       handle(self, self._deferreds[i]);
//     }
//     // 将deferred 置空
//     self._deferreds = null;
//   }
// };