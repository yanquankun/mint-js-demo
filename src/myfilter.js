// es5 shim Array-filter实现
var toObject = function(o) {
    if (o == null) {
        // this matches both null and undefined
        throw new TypeError("can't convert " + o + " to object");
    }
    return Object(o);
};
var prototypeOfObject = Object.prototype;
var _toString = prototypeOfObject.toString;
var boxedString = Object("a");
var splitString = boxedString[0] !== "a" || !(0 in boxedString);
var isFunction = function(val) {
    return prototypeOfObject.toString.call(val) === "[object Function]";
};
Array.prototype.myfilter = function filter(fun /*, thisp */ ) {
    var object = toObject(this),
        self =
        splitString && _toString.call(this) === "[object String]" ?
        this.split("") :
        object,
        length = self.length >>> 0,
        result = [],
        value,
        thisp = arguments[1];

    // If no callback function or if callback is not a callable function
    if (!isFunction(fun)) {
        throw new TypeError(fun + " is not a function");
    }
    for (var i = 0; i < length; i++) {
        if (i in self) {
            value = self[i];
            if (fun.call(thisp, value, i, object)) {
                result.push(value);
            }
        }
    }
    return result;
};
var a = [{
        key: 1,
    },
    {
        key: 2,
    },
    {
        key: 3,
    },
];
a = a.myfilter((v, idx) => v.key >= 2, this);
console.log(...log(a));
var res = [];
var fun2 = (a, i, obj) => a.key == 1;
console.log(...log(fun2));
if (
    fun2.call(
        null, {
            key: 1,
        },
        1, {}
    )
) {
    res.push(12312);
}
console.log(...log(res));