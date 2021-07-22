/**
 * author:闫全堃
 * desc:读取/写入文件插件 防止clean插件执行后，webpack输出文件夹里写入的内容被删掉
 * params:{
 *  path:路径 string
 *  content:内容  如果为读取模式则传空即可 string
 *  cb:"fsRead"读取  "fsWrite"写入 string
 * }
 */
const fs = require("fs");
class fsPlugin {
  constructor(path, content, cb) {
    this.path = path;
    this.content = content;
    this.cb = cb;
    if (
      Object.prototype.toString.call(cb) !== "[object String]" &&
      (cb == "fsWrite" || cb == "fsRead")
    ) {
      throw Error("fsPlugin插件的callback名称必须为fsWrite或者fsRead");
    }
  }

  apply(compiler) {
    // 调用clean插件后导致dist文件里的fs输出的文件会被删掉，原因是插件执行时机
    // clean-webpack-plugin执行时机和fsPlugin无法预估，所以在fsPlugin插件里箭筒clean的done事件后再进行fs操作
    compiler.hooks.done.tap("clean-webpack-plugin", (stats) => {
      if (this.cb == "fsWrite")
        this.fsWrite.call(this, this.path, this.content);
      else this.fsRead.call(this, this.path);
    });
  }

  fsWrite(path, content) {
    const _this = this;
    return new Promise(function (resolve, reject) {
      fs.writeFile(
        path,
        content,
        {
          encoding: "utf-8",
        },
        function (err) {
          if (err) {
            console.log(this);
            console.log(`写入${_this.path}内容出错`);
            reject(err);
          } else {
            console.log(`写入${_this.path}内容成功`);
            resolve(err);
          }
        }
      );
    });
  }

  fsRead(path, type) {
    const _this = this;
    return new Promise(function (resolve, reject) {
      fs.readFile(path, type ? type : "utf-8", (err, data) => {
        if (err) {
          console.log(`读取${_this.path}内容出错`);
          reject(err);
        } else {
          console.log(`读取${_this.path}内容成功`);
          resolve(data);
        }
      });
    });
  }
}

module.exports = exports = fsPlugin;
exports = {
  fsPlugin,
};
