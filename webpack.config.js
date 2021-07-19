const path = require("path");
const glob = require("glob"); // 批量导入文件
const TerserPlugin = require("terser-webpack-plugin"); // js压缩 cli v5及之后会内置
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清楚上次的dist目录
var HtmlWebpackPlugin = require("html-webpack-plugin"); //打包html的插件
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // 压缩js
const fsPlugin = require("./fs-plugin"); // 自定义fs插件

// 读取静态资源映射
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

var config = {
  entry: Object.assign({}, newEntries),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].min.js",
    library: "[name]",
    libraryTarget: "umd", // 指定js模块组织是遵循的什么规范（坑爹，没这个值，打包后的js引入无法使用amd规范）
  },
  watch: true,
  devServer: {
    // /webpack-dev-server路由可查看wp打包文件
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 5000
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
      title: "mint-js-demo",
      filename: "index.html",
      template: "test.html",
      minify: {
        //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        removeScriptTypeAttributes: true,
        collapseWhitespace: true, //删除空白符与换行符
      },
      hash: true,
      cache: false, // 仅当文件被更改时才发出文件
    }),
    new UglifyJsPlugin({
      sourceMap: true, // 启动sourceMap 必须  否则devtool不生效
    }),
    new fsPlugin(
      "./dist/process.json",
      JSON.stringify(process.env, null, "\t"),
      "fsWrite"
    ),
  ],
};
module.exports = (env, argv) => {
  if (config.mode === "development") {
    config.devtool = "source-map";
  }

  if (argv.mode === "production") {
    // config.devtool = "cheap-module-source-map";
  }

  return config;
};