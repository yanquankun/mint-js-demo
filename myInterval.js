// 自定义定时器
let callStack = Object.create(null);
const myInterval = (fn, delay) => {
    if (Object.prototype.toString.call(fn) !== "[object Function]") {
        error.throw(`${fn} is not a Function`);
    }
    if (Object.prototype.toString.call(delay) !== "[object Number]") {
        error.throw(`${delay} is not a Number`);
    }
    const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    const guid = () => {
        return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
    };
    const __ = guid();
    !(__ in callStack) &&
    (callStack[__] = {
        fn: fn,
        delay: delay,
        timestamp: null, // 上次计算时间
    });
    const recursive = () => {
        for (const key in callStack) {
            const [cb, now] = [callStack[key], new Date().getTime()];
            if (!cb["timestamp"]) {
                cb["timestamp"] = now;
                cb["fn"](); // 先立即执行一次
            } else if (now - cb["timestamp"] >= cb["delay"]) {
                cb["timestamp"] = now;
                cb["fn"].call(this, null);
            }
            if (typeof window == undefined) {
                // node
                setImmediate(recursive);
            } else {
                window.requestAnimationFrame(recursive);
            }
        }
    };
    recursive();
    return __;
};

// 清楚定时器
const clearMyInterval = (guid) => {
    delete callStack[guid];
};

// 测试定时器
var test = function() {
    console.log(...log("tFlag", tFlag, new Date().getTime()));
    tFlag++;
    if (tFlag >= 5) clearMyInterval(timer);
};
var tFlag = 0;
var timer = myInterval(test, 1000);

var test2 = function() {
    console.log(...log("tFlag2", tFlag2, new Date().getTime()));
    tFlag2++;
    if (tFlag2 >= 5) clearMyInterval(timer2);
};
var tFlag2 = 0;
var timer2 = myInterval(test2, 2000);