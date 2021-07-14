console.log(...log("indexDB Example:"));

// 1.indexDB 浏览器支持兼容
// In the following line, you should include the prefixes of implementations you want to test.
// 数据库的链接
window.indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
// transaction 事务
window.IDBTransaction = window.IDBTransaction ||
  window.webkitIDBTransaction ||
  window.msIDBTransaction || { READ_WRITE: "readwrite" }; // This line should only be needed if it is needed to support the object's constants for older browsers
// 从数据库的某个特定key range中取出数据
window.IDBKeyRange =
  window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

//2.通常来说带前缀的实现一般都是不稳定的，所以我们通常不建议在正式环境中使用，所以如果不支持标准表达式的话，需要直接报错：
if (!window.indexedDB) {
  console.log(
    "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
  );
}

// 3.创建indexDB
// open(数据库名称,数据库版本号) 返回IDBOpenDBRequest对象 open是异步操作
// var request = window.indexedDB.open("MyTestDatabase", 3);
var db;
var request = indexedDB.open("MyTestDatabase");
request.onerror = function (event) {
  // 错误处理
  console.log(" 打开数据库报错");
};
request.onsuccess = function (event) {
  // 成功处理
  db = event.target.result;
  console.log("打开数据库成功");
  // 在此做数据的CRUD
  add();
  read();
  readAll();
  update();
  remove();
  add();
  findIndex();
};

// 4.数据库升级
// 新建数据库与打开数据库是同一个操作。如果指定的数据库不存在，就会新建。不同之处在于，后续的操作主要在upgradeneeded事件的监听函数里面完成，因为这时版本从无到有，所以会触发这个事件
request.onupgradeneeded = function (event) {
  // Save the IDBDatabase interface
  var db = event.target.result;

  // Create an objectStore for this database
  // indexDB中table叫object store
  // object store每个对象都和一个key关联，key格式：{keyPath:key generator}
  // 如果储存的是js对象，则可指定对象中某个key作为keyPath
  // 如果没有指定key path，那么储存的对象可以为任何对象
  // eg:var objectStore = db.createObjectStore("name", { keyPath: "myKey" });

  var objectStore = null;

  // 创建一张imgLists的表格，主键是id。
  if (!db.objectStoreNames.contains("imgLists")) {
    objectStore = db.createObjectStore("imgLists", { keyPath: "id" });
    // unique name可能会重复  创建主键：
    objectStore.createIndex("name", "name", { unique: false });
    console.log(objectStore);
  }
};

// 5. CRUD 需要通过事务完成
// new 一个blob对象
var obj1 = { hello: "world" };
var blob = new Blob([JSON.stringify(obj1, null, 2)], {
  type: "application/json",
});

function add() {
  var transaction = db
    .transaction(["imgLists"], "readwrite")
    .objectStore("imgLists")
    .add({ id: 1, name: "图片1", path: "/static/image", blob: blob });

  transaction.onsuccess = function (event) {
    console.log("数据写入成功");
  };

  transaction.onerror = function (event) {
    console.log("数据写入失败");
  };
}

function read() {
  var transaction = db.transaction(["imgLists"]);
  var objectStore = transaction.objectStore("imgLists");
  // 用户读取数据，参数是主键
  var request = objectStore.get(1);

  request.onerror = function (event) {
    console.log("事务失败");
  };

  request.onsuccess = function (event) {
    if (request.result) {
      console.log("读取数据成功:", request.result);
    } else {
      console.log("未获得数据记录");
    }
  };
}

// 遍历数据表格的所有记录，要使用指针对象 IDBCursor
function readAll() {
  var objectStore = db.transaction("imgLists").objectStore("imgLists");

  objectStore.openCursor().onsuccess = function (event) {
    var cursor = event.target.result;

    if (cursor) {
      console.log("cursor:", cursor, cursor.value);
      cursor.continue(); // 加入continue会进入下一次遍历
    } else {
      console.log("没有更多数据了！");
    }
  };
}

function update() {
  var request = db
    .transaction(["imgLists"], "readwrite")
    .objectStore("imgLists")
    // 主动更新主键为1
    .put({ id: 1, name: "图片2", path: "/static/image2" });

  request.onsuccess = function (event) {
    console.log("数据更新成功");
  };

  request.onerror = function (event) {
    console.log("数据更新失败");
  };
}

function remove() {
  var request = db
    .transaction(["imgLists"], "readwrite")
    .objectStore("imgLists")
    .delete(1);

  request.onsuccess = function (event) {
    console.log("数据删除成功");
  };
}

// 6. 创建/使用索引
// 索引的意义在于，可以让你搜索任意字段，也就是说从任意字段拿到数据记录。如果不建立索引，默认只能搜索主键（即从主键取值）
function findIndex() {
  var transaction = db.transaction(["imgLists"], "readonly");
  var store = transaction.objectStore("imgLists");
  var index = store.index("name");
  var request = index.get("图片1");

  request.onsuccess = function (e) {
    var result = e.target.result;
    if (result) {
      console.log(result);
    } else {
      console.log("未获得数据记录");
    }
  };
}

// 使用场景：
// 1.桌面应用、Progressive Web App（PWA）、chrome扩展组件的开发等
// 2.用户同时会获取/操作更多的信息，怎么留存这些大量的数据，那么我们的indexDB就上线了
// Eg:DevDocs，electron开发的桌面应用（图片传输）
