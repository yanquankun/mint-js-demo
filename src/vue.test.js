console.log(...log("vue 源码学习:"));

var obj = {
  name: "test",
  age: "22",
  sex: "male",
};

// 1.响应式 window.target：依赖函数
const defineReactive = function (data, key, val) {
  // 如果val是一个对象，则递归处理将所有值都绑定上setter getter
  if (typeof val === "object") {
    new Observer(val);
  }

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

// 解析简单路径
const bailRE = /[^\w.$]/;
const parsePath = (path) => {
  if (bailRE.test(path)) return;
  const segments = path.split(".");
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  };
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

// 数据发生变化  通知watcher 由它去通知其他地方变更
class Wtacher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    // 执行this.getters() 可以读取data值中的内容
    this.getter = parsePath(expOrFn);
    this.cb = cb;
    this.value = this.get();
  }

  get() {
    window.target = this;
    let value = this.getter.call(this.vm, this.vm);
    window.target = undefined;
    return value;
  }

  update() {
    const oldvalue = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldvalue);
  }
}

// 将对象的所有属性都处理为setter和getter
class Observer {
  constructor(val) {
    this.val = val;
    if (!Array.isArray(val)) this.walk(val);
    return this.val; // 返回被处理后的对象
  }

  // 在val为对象的时候，绑定val为setter和getter
  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }
}

const new_obj = new Observer(obj);
console.log(new_obj);
console.log(Object.getOwnPropertyNames(new_obj))
console.log(Object.keys(new_obj))
console.log(new_obj.name);
