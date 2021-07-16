author:闫全堃(Mint)  
个人QQ邮箱：229218087@qq.com  
js 练习+插件库  
========项目结构========  
|-------mint-js-demo------ 
|--plugin-amd-cmd.js-->插件模块化规范  
|--test.html-->入口页面  
|--index.js-->入口js    
|--mint-progress-bar  该文件夹为进度条源码库文件
|--src  
|----myfilter.js-->数组 filter 方法实现  
|----myInterval.js-->定时器实现  
|----once.js-->vue $once 方法实现  
|----progress-bar.js-->滚动条插件  
|----myPromise.js-->promise实现  
|----vue.test.js-->vue源码学习  
|----bigNumAdd.js-->两个大数相加  
|----simplePromise.js-->promise简单实现（非真正链式调用）  
|----chainPromise.js-->promise实现链式调用      
|----subscribe.js-->发布订阅者模式实现  
|----indexDB.js-->浏览器数据库使用    
  
========progress-bar.js========  
自动注册 progress 到 window 中   
引入方式：支持commonJS和amd的引入方式：  
<script src="progress-bar.js"></script>  
or  const progress = require("mint-progress-bar");  
or  import { progress } from "mint-progress-bar";  
progress API：  
【init({})】: 初始化方法 参数：初始化参数对象或者不传，不传时默认生成一个进度条插入到 body 中,如果传入参数则 domId 为必传  
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

【delPDom(domId)】: 删除进度条 参数：domId：进度条的id forward(domId,progressNum): 进度条前进 参数：domId：进度条的id | 【progressNum】：前进的比例，Number 如20   
Example:  
var progress_ins = progress.init({  
  domId: "progress1",  
});  
progress.forward(progress_ins.domId, 30);  
  
var progress_ins2 = progress.init({});  
progress.forward(progress_ins2.domId, 66.6);  
setInterval(() => {  
    progress.delPDom(progress_ins2.domId);  
}, 5000)  

[进度条预览页面](http://39.97.119.181/mint-js-demo/test.html)  
![进度条图片示例：](./imgs/进度条.png)