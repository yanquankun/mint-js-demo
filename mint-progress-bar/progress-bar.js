!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["mint-progress-bar/progress-bar"]=t():e["mint-progress-bar/progress-bar"]=t()}(self,(function(){return e={973:e=>{function t(){return(65536*(1+Math.random())|0).toString(16).substring(1)}function o(){return t()+t()+t()+t()+t()+t()+t()+t()}function d(e,t){var d=document.createElement(e);e=o();return"progress"==t?(domId="progress_"+e,d.id=domId,d.domId=domId,document.body.appendChild(d),n[domId]=d):(domId=t+"_"+e,d.id=domId,d.domId=domId),{dom:d,domId}}function r(e,t,o){var d=document.getElementById(e),r=(e=null,25);return d&&(d.style.transitionDuration="500ms"),d&&t?e=setInterval((function(){d.style.transform=`rotate(${r}deg) translateX(-50%)`,r=25==r?65:25}),500):(clearInterval(o),flag=null,d&&(d.style.transform="rotate(45deg) translateX(-50%)")),e}var s={domId:"",pBgc:"rgb(231, 235, 243)",pBorder:"0px solid #000",pWidth:"250px",pHeight:"10px",pRadius:"10px",sBgc:"rgb(25, 147, 249)",sWidth:0,showPercent:!0,tsBorder:"0px solid #000",tsRadius:"5px",tsBgc:"rgb(118, 189, 251)",tsColor:"rgb(255,255,255)",showTopSlider:!0},n=Object.create(null);window.progress=e.exports={init:function(e){var t,r,l=(p=e.domId,(i=document.getElementById(p))?(p="progress_"+o(),i.domId=p,{dom:n[p]=i,domId:p}):d("div","progress")),i=(t=e,m=Object.keys(s),r={},m.forEach((e=>{r[e]=t[e]||s[e]})),r);e=i,(p=l.dom).style.position="relative",p.style.height=3<e.pHeight.split("")[0]?"30px":e.pHeight,p.style.width=e.pWidth,p.style.border=e.pBorder,p.style.borderRadius=e.pRadius,p.style.background=e.pBgc;var m,p=(m=l.dom,p=i,e=d("div","slider"),m.appendChild(e.dom),e.dom.style.background=p.sBgc,e.dom.style.height="100%",e.dom.style.width=p.sWidth,e.dom.style.borderRadius=p.pRadius,e);return l.dom.sliderDomId=p.domId,e=l.dom,p=d("span","percent"),e.appendChild(p.dom),p.dom.style.width="auto",p.dom.style.position="absolute",p.dom.style.right="-55px",p.dom.style.fontSize="14px",p.dom.style.top="50%",p.dom.style.transform="translateY(-50%)",l.dom.percentDomId=p.domId,p.dom.innerHTML=i.sWidth+"%",p.dom.style.display=i.showPercent?"inline-block":"none",p=function(e,t){var o=d("span","topslider");e.appendChild(o.dom),o.dom.style.width="35px",o.dom.style.height="35px",o.dom.style.display="flex",o.dom.style.alignItems="center",o.dom.style.justifyContent="center",o.dom.style.position="absolute",o.dom.style.border=t.tsBorder,o.dom.style.background=t.tsBgc,o.dom.style.borderRadius=t.tsRadius,o.dom.style.color=t.tsColor,o.dom.style.transform="rotate(45deg) translateX(-50%)",o.dom.style.left=t.sWidth+"%",o.dom.style.bottom="10px";var r=d("span","topsliderText");return r.dom.style.transform="rotate(-45deg)",r.dom.style.display="block",r.dom.style.fontSize="14px",r.dom.innerHTML=t.sWidth+"%",o.dom.appendChild(r.dom),e.topsliderTextDomId=r.domId,o}(l.dom,i),l.dom.topsliderDomId=p.domId,p.dom.style.display=i.showTopSlider?"flex":"none",l.dom},delPDom:function(e){(e=document.getElementById(e))&&document.body.removeChild(e)},forward:function(e,t,o=1){var d,s,l,i,m,p,a,y=document.getElementById(n[e].sliderDomId),u=y.style.width.split("").filter((function(e){return!isNaN(e)})).join("");t<=u||(d=document.getElementById(n[e].percentDomId),parseFloat((t-u).toFixed(0)/o).toFixed(0),s=document.getElementById(n[e].topsliderDomId),l=document.getElementById(n[e].topsliderTextDomId),i=r(n[e].topsliderDomId,!0),m=function(o){o==t.toFixed(0)?(clearInterval(a),a=o=m=null,s.style.left=y.style.width=t+"%",l.innerHTML=d.innerHTML=t+"%",r(n[e].topsliderDomId,!1,i)):(s.style.left=y.style.width=o+"%",l.innerHTML=d.innerHTML=o+"%")},p=u,a=setInterval((()=>{m(p++)}),70))}}}},t={},function o(d){var r=t[d];return void 0!==r||(r=t[d]={exports:{}},e[d](r,r.exports,o)),r.exports}(973);var e,t}));