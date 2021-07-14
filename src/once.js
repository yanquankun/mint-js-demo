// once 实现
var once = function(cb) {
    var flag = false;
    return function() {
        flag = !flag;
        if (flag) {
            cb.call(null, ...arguments);
        }
    };
};
var oc = once(function(n) {
    console.log(...log(n));
});
oc(1);
oc(2);
var oc2 = once(function(n) {
    console.log(...log(n + 2));
});
oc2(3);
oc2(4);
export default once;