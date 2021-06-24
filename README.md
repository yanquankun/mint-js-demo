js 练习+插件库  
========项目结构========  
|-------mint-js-demo------  
|---test.html-->测试页面  
|---myfilter.js-->数组 filter 方法实现  
|---myInterval.js-->定时器实现  
|---once.js-->vue $once 方法实现  
|---progress-bar.js-->滚动条插件  
  
========progress-bar.js========  
自动注册 progress 到 window 中  
progress API：  
【init({})】: 初始化方法 参数：初始化参数对象或者不传，不传时默认生成一个进度条插入到 body 中,如果传入参数则 domId 为必传  
`  
init 方法参数：  
- domId 当前进度条 domID  
- pBgc 进度条背景色  
- pBorder 进度条边框  
- pWidth 进度条宽度  
- pHeight 进度条高度 最高 30px  
- pRadius 进度条圆角  
- sBgc 滑块背景色  
- sWidth 滑块宽度 也就是进度比 数字 <=100  
- showPercent 是否展示百分比  
- tsBorder 顶部滑块边框  
- tsRadius 顶部滑块圆角  
- tsBgc 顶部滑块背景色  
- tsColor 顶部滑块文字颜色  
- showTopSlider 是否展示顶部滑块  
- eg: {  
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
`  
【delPDom(domId)】: 删除进度条 参数：domId：进度条的id forward(domId,progressNum): 进度条前进 参数：domId：进度条的id | 【progressNum】：前进的比例，Number 如20   
Example:  
`  
var progress_ins = progress.init({  
  domId: "progress1",  
});  
progress.forward(progress_ins.domId, 30);  
  
var progress_ins2 = progress.init({});  
progress.forward(progress_ins2.domId, 66.6);  
setInterval(() => {  
    progress.delPDom(progress_ins2.domId);  
}, 5000)  
`  


