(() => {
  var t = [
      function (t, e, d) {
        var o, r, s, n, l, i, m;
        (t = d.nmd(t)),
          (o = ("object" == typeof window && window) || this),
          (d = Object.create(null)),
          (o.progress = d),
          (o = d),
          (r = {
            domId: "",
            pBgc: "rgb(231, 235, 243)",
            pBorder: "0px solid #000",
            pWidth: "250px",
            pHeight: "10px",
            pRadius: "10px",
            sBgc: "rgb(25, 147, 249)",
            sWidth: 0,
            showPercent: !0,
            tsBorder: "0px solid #000",
            tsRadius: "5px",
            tsBgc: "rgb(118, 189, 251)",
            tsColor: "rgb(255,255,255)",
            showTopSlider: !0,
          }),
          (s = function () {
            return ((65536 * (1 + Math.random())) | 0)
              .toString(16)
              .substring(1);
          }),
          (n = function () {
            return s() + s() + s() + s() + s() + s() + s() + s();
          }),
          (l = function (t, e) {
            var d = document.createElement(t);
            t = n();
            return (
              "progress" == e
                ? ((domId = "progress_" + t),
                  (d.id = domId),
                  (d.domId = domId),
                  document.body.appendChild(d),
                  (m[domId] = d))
                : ((domId = e + "_" + t), (d.id = domId), (d.domId = domId)),
              { dom: d, domId }
            );
          }),
          (i = function (t, e, d) {
            var o = document.getElementById(t),
              r = ((t = null), 25);
            return (
              (o.style.transitionDuration = "500ms"),
              o && e
                ? (t = setInterval(function () {
                    (o.style.transform = `rotate(${r}deg) translateX(-50%)`),
                      (r = 25 == r ? 65 : 25);
                  }, 500))
                : (clearInterval(d),
                  (flag = null),
                  (o.style.transform = "rotate(45deg) translateX(-50%)")),
              t
            );
          }),
          (m = Object.create(null)),
          (o.init = function (t) {
            var e,
              d,
              o =
                ((a = t.domId),
                (s = document.getElementById(a))
                  ? ((a = "progress_" + n()),
                    (s.domId = a),
                    { dom: (m[a] = s), domId: a })
                  : l("div", "progress")),
              s =
                ((e = t),
                (i = Object.keys(r)),
                (d = {}),
                i.forEach((t) => {
                  d[t] = e[t] || r[t];
                }),
                d);
            (t = s),
              ((a = o.dom).style.position = "relative"),
              (a.style.height =
                3 < t.pHeight.split("")[0] ? "30px" : t.pHeight),
              (a.style.width = t.pWidth),
              (a.style.border = t.pBorder),
              (a.style.borderRadius = t.pRadius),
              (a.style.background = t.pBgc);
            var i,
              a =
                ((i = o.dom),
                (a = s),
                (t = l("div", "slider")),
                i.appendChild(t.dom),
                (t.dom.style.background = a.sBgc),
                (t.dom.style.height = "100%"),
                (t.dom.style.width = a.sWidth),
                (t.dom.style.borderRadius = a.pRadius),
                t);
            (o.dom.sliderDomId = a.domId),
              (t = o.dom),
              (a = l("span", "percent")),
              t.appendChild(a.dom),
              (a.dom.style.width = "auto"),
              (a.dom.style.position = "absolute"),
              (a.dom.style.right = "-55px"),
              (a.dom.style.fontSize = "14px"),
              (a.dom.style.top = "50%"),
              (a.dom.style.transform = "translateY(-50%)"),
              (o.dom.percentDomId = a.domId),
              (a.dom.innerHTML = s.sWidth + "%"),
              (a.dom.style.display = s.showPercent ? "inline-block" : "none");
            a = (function (t, e) {
              var d = l("span", "topslider");
              t.appendChild(d.dom),
                (d.dom.style.width = "35px"),
                (d.dom.style.height = "35px"),
                (d.dom.style.display = "flex"),
                (d.dom.style.alignItems = "center"),
                (d.dom.style.justifyContent = "center"),
                (d.dom.style.position = "absolute"),
                (d.dom.style.border = e.tsBorder),
                (d.dom.style.background = e.tsBgc),
                (d.dom.style.borderRadius = e.tsRadius),
                (d.dom.style.color = e.tsColor),
                (d.dom.style.transform = "rotate(45deg) translateX(-50%)"),
                (d.dom.style.left = e.sWidth + "%"),
                (d.dom.style.bottom = "10px");
              var o = l("span", "topsliderText");
              return (
                (o.dom.style.transform = "rotate(-45deg)"),
                (o.dom.style.display = "block"),
                (o.dom.style.fontSize = "14px"),
                (o.dom.innerHTML = e.sWidth + "%"),
                d.dom.appendChild(o.dom),
                (t.topsliderTextDomId = o.domId),
                d
              );
            })(o.dom, s);
            return (
              (o.dom.topsliderDomId = a.domId),
              (a.dom.style.display = s.showTopSlider ? "flex" : "none"),
              o.dom
            );
          }),
          (o.delPDom = function (t) {
            (t = document.getElementById(t)) && document.body.removeChild(t);
          }),
          (o.forward = function (t, e, d = 1) {
            var o,
              r,
              s,
              n,
              l,
              a,
              p,
              y = document.getElementById(m[t].sliderDomId),
              c = y.style.width
                .split("")
                .filter(function (t) {
                  return !isNaN(t);
                })
                .join("");
            e <= c ||
              ((o = document.getElementById(m[t].percentDomId)),
              parseFloat((e - c).toFixed(0) / d).toFixed(0),
              (r = document.getElementById(m[t].topsliderDomId)),
              (s = document.getElementById(m[t].topsliderTextDomId)),
              (n = i(m[t].topsliderDomId, !0)),
              (l = function (d) {
                d == e.toFixed(0)
                  ? (clearInterval(p),
                    (p = d = l = null),
                    (r.style.left = y.style.width = e + "%"),
                    (s.innerHTML = o.innerHTML = e + "%"),
                    i(m[t].topsliderDomId, !1, n))
                  : ((r.style.left = y.style.width = d + "%"),
                    (s.innerHTML = o.innerHTML = d + "%"));
              }),
              (a = c),
              (p = setInterval(() => {
                l(a++);
              }, 70)));
          }),
          ((e = void 0 !== t && t.exports ? (t.exports = d) : e).progress = d),
          (t.exports = e = d);
      },
    ],
    e = {};
  function d(o) {
    var r = e[o];
    return (
      void 0 !== r ||
        ((r = e[o] = { id: o, loaded: !1, exports: {} }),
        t[o].call(r.exports, r, r.exports, d),
        (r.loaded = !0)),
      r.exports
    );
  }
  (d.nmd = (t) => ((t.paths = []), t.children || (t.children = []), t)), d(0);
})();
