const path = require("path");
const glob = require("glob"); // 批量导入文件
const TerserPlugin = require("terser-webpack-plugin"); // js压缩 cli v5及之后会内置
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清楚上次的dist目录

const files = glob.sync("./src/*.js");
let newEntries = {};
files.forEach(function (f) {
  var name = /.*\/src\/(.{1,999}).js/.exec(f)
    ? /.*\/src\/(.{1,999}).js/.exec(f)[1]
    : "vender" +
      new Date().getTime() +
      (Math.random() * (1000 - 1) + 1).toFixed(0); //得到src下js的文件名
  newEntries[name] = f;
});

module.exports = {
  entry: Object.assign({}, newEntries),
  mode: "none",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].min.js",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
