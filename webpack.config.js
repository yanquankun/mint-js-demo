const path = require("path");
const glob = require("glob"); // 批量导入文件
const TerserPlugin = require("terser-webpack-plugin"); // js压缩 cli v5及之后会内置
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清楚上次的dist目录
var HtmlWebpackPlugin = require("html-webpack-plugin"); //打包html的插件
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // 压缩js

const files = glob.sync("./src/*.js");
let newEntries = {};
files.forEach(function (f) {
  var name = /.*\/(src|mint-progress-bar)\/(.{1,999}).js/.exec(f)[2]; //得到js的文件名
  var file = /.*\/(src|mint-progress-bar)\/(.{1,999}).js/.exec(f)[1]; // 得到路径名称
  newEntries[file + "/" + name] = f;
});
newEntries = Object.assign(
  {
    "mint-progress-bar/progress-bar": "./src/progress-bar.js",
  },
  newEntries
);

module.exports = {
  entry: Object.assign({}, newEntries),
  mode: "none",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].min.js",
    library:"[name]",
    libraryTarget: "umd" // 指定js模块组织是遵循的什么规范（坑爹，没这个值，打包后的js引入无法使用amd规范）
  },
  watch: true,
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 5000,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: "json-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.(txt|md)$/,
        use: {
          loader: "raw-loader",
          options: {
            outputPath: "./dist/mint-progress-bar/",
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: ["mint-progress-bar/progress-bar"],
      title: "Mint插件",
      filename: "index.html",
      template: "test.html",
      minify: {
        //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        removeScriptTypeAttributes: true,
        collapseWhitespace: true, //删除空白符与换行符
      },
      // hash: true,
    }),
    new UglifyJsPlugin(),
  ],
};
