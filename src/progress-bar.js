// progress 初始化
/**
*  参数初始值
*  domId 当前进度条domID
*  pBgc 进度条背景色
*  pBorder 进度条边框
*  pWidth 进度条宽度
*  pHeight 进度条高度 最高30px
*  pRadius 进度条圆角
*  sBgc 滑块背景色
*  sWidth 滑块宽度 也就是进度比 数字 <=100
*  showPercent 是否展示百分比
*  tsBorder 顶部滑块边框
*  tsRadius 顶部滑块圆角
*  tsBgc 顶部滑块背景色
*  tsColor 顶部滑块文字颜色
*  showTopSlider 是否展示顶部滑块
*  eg: {
  domId: "",
  pBgc: "rgb(231, 235, 243)",
  pBorder: "0px solid #000",
  pWidth: "250px",
  pHeight: "10px",
  pRadius: "10px",
  sBgc: "rgb(25, 147, 249)",
  sWidth: 0,
  showPercent: true,
  tsBorder: "0px solid #000",
  tsRadius: "5px",
  tsBgc: "rgb(118, 189, 251)",
  tsColor: "rgb(255,255,255)",
  showTopSlider: true,
}
* */
var __initParams__ = {
  domId: "",
  pBgc: "rgb(231, 235, 243)",
  pBorder: "0px solid #000",
  pWidth: "250px",
  pHeight: "10px",
  pRadius: "10px",
  sBgc: "rgb(25, 147, 249)",
  sWidth: 0,
  showPercent: true,
  tsBorder: "0px solid #000",
  tsRadius: "5px",
  tsBgc: "rgb(118, 189, 251)",
  tsColor: "rgb(255,255,255)",
  showTopSlider: true,
};
var S4 = function () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
var guid = function () {
  return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
};
// 混淆进度条参数
var _mixins = function (params) {
  var keys = Object.keys(__initParams__),
    newParams = {};
  keys.forEach((k) => {
    newParams[k] = params[k] || __initParams__[k];
  });
  return newParams;
};
// 初始化domID无效时，自动创建一个进度条
var _createPDom = function (domType, type) {
  var __ = document.createElement(domType);
  // 进度条则加入缓存中
  var _guid = guid();
  if (type == "progress") {
    domId = "progress_" + _guid;
    __.id = domId;
    __.domId = domId;
    document.body.appendChild(__);
    progressCache[domId] = __;
  } else {
    domId = type + "_" + _guid;
    __.id = domId;
    __.domId = domId;
  }
  return {
    dom: __,
    domId,
  };
};
// 初始化进度条dom
var _setIntoDom = function (domId) {
  var dom = document.getElementById(domId);
  if (!dom) return _createPDom("div", "progress");
  else {
    domId = "progress_" + guid();
    dom.domId = domId;
    progressCache[domId] = dom;
    return {
      dom,
      domId,
    };
  }
};
// 初始化进度条样式
var _initPStyle = function (dom, pObj) {
  // 默认样式
  dom.style.position = "relative";
  // 自定义样式
  dom.style.height = pObj.pHeight.split("")[0] > 3 ? "30px" : pObj.pHeight;
  dom.style.width = pObj.pWidth;
  dom.style.border = pObj.pBorder;
  dom.style.borderRadius = pObj.pRadius;
  dom.style.background = pObj.pBgc;
};
// 初始化滑块
var _initSliderDom = function name(dom, pObj) {
  var sliderDomInfo = _createPDom("div", "slider");
  dom.appendChild(sliderDomInfo.dom);
  sliderDomInfo.dom.style.background = pObj.sBgc;
  sliderDomInfo.dom.style.height = "100%";
  sliderDomInfo.dom.style.width = pObj.sWidth;
  sliderDomInfo.dom.style.borderRadius = pObj.pRadius;
  return sliderDomInfo;
};
// 初始化右侧进度比展示
var _initPercentDom = function (dom, pObj) {
  var percentDomInfo = _createPDom("span", "percent");
  dom.appendChild(percentDomInfo.dom);
  percentDomInfo.dom.style.width = "auto";
  percentDomInfo.dom.style.position = "absolute";
  percentDomInfo.dom.style.right = "-55px";
  percentDomInfo.dom.style.fontSize = "14px";
  percentDomInfo.dom.style.top = "50%";
  percentDomInfo.dom.style.transform = "translateY(-50%)";
  return percentDomInfo;
};
// 初始化顶部滑块
var _initTopSliderDom = function (dom, pObj) {
  var topSliderDomInfo = _createPDom("span", "topslider");
  dom.appendChild(topSliderDomInfo.dom);
  topSliderDomInfo.dom.style.width = "35px";
  topSliderDomInfo.dom.style.height = "35px";
  topSliderDomInfo.dom.style.display = "flex";
  topSliderDomInfo.dom.style.alignItems = "center";
  topSliderDomInfo.dom.style.justifyContent = "center";
  topSliderDomInfo.dom.style.position = "absolute";
  topSliderDomInfo.dom.style.border = pObj.tsBorder;
  topSliderDomInfo.dom.style.background = pObj.tsBgc;
  topSliderDomInfo.dom.style.borderRadius = pObj.tsRadius;
  topSliderDomInfo.dom.style.color = pObj.tsColor;
  // 滑块倾斜
  topSliderDomInfo.dom.style.transform = "rotate(45deg) translateX(-50%)";
  topSliderDomInfo.dom.style.left = pObj.sWidth + "%";
  topSliderDomInfo.dom.style.bottom = "10px";
  // 顶部滑块内部文字
  var topSliderTextDomInfo = _createPDom("span", "topsliderText");
  topSliderTextDomInfo.dom.style.transform = "rotate(-45deg)";
  topSliderTextDomInfo.dom.style.display = "block";
  topSliderTextDomInfo.dom.style.fontSize = "14px";
  topSliderTextDomInfo.dom.innerHTML = pObj.sWidth + "%";
  topSliderDomInfo.dom.appendChild(topSliderTextDomInfo.dom);
  dom.topsliderTextDomId = topSliderTextDomInfo.domId;
  return topSliderDomInfo;
};
// 顶部滑块动效 domId:顶部滑块domID open:开启动效 deg:摆动角度
var topSliderAnimation = function (domId, open, timerId) {
  var dom = document.getElementById(domId),
    timer = null,
    deg = 25;
  dom && (dom.style.transitionDuration = "500ms");
  if (dom && open) {
    // 左右摇晃
    timer = setInterval(function () {
      dom.style.transform = `rotate(${deg}deg) translateX(-50%)`;
      deg = deg == 25 ? 65 : 25;
    }, 500);
  } else {
    clearInterval(timerId);
    flag = null;
    dom.style.transform = "rotate(45deg) translateX(-50%)";
  }
  return timer;
};
var progressCache = Object.create(null); // 进度条dom集合
var _init = function (params) {
  // 滚动条dom
  var _domInfo = _setIntoDom(params.domId);
  var _p = _mixins(params);
  _initPStyle(_domInfo.dom, _p);
  // 滑块dom
  var _sDomInfo = _initSliderDom(_domInfo.dom, _p);
  _domInfo.dom.sliderDomId = _sDomInfo.domId;
  // 右侧进度比显示dom
  var _pDomInfo = _initPercentDom(_domInfo.dom, _p);
  _domInfo.dom.percentDomId = _pDomInfo.domId;
  _pDomInfo.dom.innerHTML = _p.sWidth + "%";
  _pDomInfo.dom.style.display = _p.showPercent ? "inline-block" : "none";
  // 顶部滑块dom
  var _tsDomInfo = _initTopSliderDom(_domInfo.dom, _p);
  _domInfo.dom.topsliderDomId = _tsDomInfo.domId;
  _tsDomInfo.dom.style.display = _p.showTopSlider ? "flex" : "none";
  return _domInfo.dom;
};
// 删除进度条
var _delPDom = function (domId) {
  var dom = document.getElementById(domId);
  dom && document.body.removeChild(dom);
};
// 进度条增加进度
/**
 * domId:进度条domID progress 增加到进度比  step 速度
 */
var _forward = function (domId, progress, step = 1) {
  var sDom = document.getElementById(progressCache[domId].sliderDomId);
  var prePercent = sDom.style.width
    .split("")
    .filter(function (v) {
      return !isNaN(v);
    })
    .join("");
  if (prePercent >= progress) return;
  var pDom = document.getElementById(progressCache[domId].percentDomId);
  // 计算间隔  控制速度
  var interval = parseFloat(
    (progress - prePercent).toFixed(0) / step
  ).toFixed(0);
  var tsDom = document.getElementById(progressCache[domId].topsliderDomId);
  var tstDom = document.getElementById(
    progressCache[domId].topsliderTextDomId
  );
  var timerId = topSliderAnimation(progressCache[domId].topsliderDomId, true);
  var fn = function (i) {
    // 向左比较大小
    if (i == progress.toFixed(0)) {
      clearInterval(timer);
      fn = null;
      i = null;
      timer = null;
      tsDom.style.left = sDom.style.width = progress + "%";
      tstDom.innerHTML = pDom.innerHTML = progress + "%";
      topSliderAnimation(progressCache[domId].topsliderDomId, false, timerId);
    } else {
      tsDom.style.left = sDom.style.width = i + "%";
      tstDom.innerHTML = pDom.innerHTML = i + "%";
    }
  };
  var i = prePercent;
  var timer = setInterval(() => {
    fn(i++);
  }, 70);
};

var output = {
  init: _init,
  delPDom: _delPDom,
  forward: _forward
}

// webpack打包为amd模式  所以判断如果环境是浏览器，挂载方法到window上
return typeof window === undefined ? output : window.progress = output;
