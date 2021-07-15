!(function (_, factory) {
    "use static";
   
    var Plugin = {};
    _.Plugin = Plugin; // 挂载到实例上
    factory(Plugin); // 初始化插件
  
    // CommonJS and Node.js module support
    if (typeof exports === "object") {
      if (module !== undefined && module.exports) {
        exports = module.exports = Plugin; // Node.js specific `module.exports`
      }
      exports.Plugin = Plugin; // CommonJS module 1.1.1 spec
      module.exports = exports = Plugin; // CommonJS
    }
    // AMD support
    /* eslint-disable no-undef */
    else if (typeof define === "function" && define.amd) {
      define(function () {
        return Plugin;
      });
      /* eslint-enable no-undef */
    }
  })((typeof window === "object" && window) || this, function (Plugin) {
    // Plugin 初始化
  });
  