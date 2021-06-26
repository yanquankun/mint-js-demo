console.log(...log("vue 源码学习:"));

var obj = {
  name: "test",
  age: "22",
  sex: "male",
};

// 1.响应式 window.target：依赖函数
const defineReactive = function (data, key, val) {
  let dep = new Dep(); // 依赖储存
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      // dep.push(window.target); // 收集依赖
      dep.depend(); // 收集依赖
      return val;
    },
    set: function (newVal) {
      if (val == newVal) return;
      // for (let i = 0; i < dep.length; i++) {
      //   dep[i](newVal, val); // 触发依赖
      // }
      val = newVal;
      dep.notify(); //触发依赖
    },
  });
};
// 2. 依赖收集类
class Dep {
  constructor() {
    this.subs = [];
  }

  // 添加依赖
  addSub(sub) {
    this.subs.push(sub);
  }
  // 删除依赖
  removeSub(sub) {
    if (!this.subs.length) return;
    const index = this.subs.indexOf(sub);
    this.subs.splice(index, 1);
  }

  // 绑定依赖
  depend() {
    if (window.target) {
      this.addSub(window.target);
    }
  }

  notify() {
    const subs = this.subs.slice(); // 浅拷贝一次
    for (let i = 0; i < this.subs.length; i++) {
      this.subs[i].update();
    }
  }
}

defineReactive(obj, "name", "haha");
console.log(obj); // heihei
obj.name = "heihei";
console.log(obj); // heihei
obj.name;
