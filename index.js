/**
 * 创建一个对象
 * 在该对象上创建一个缓存列表（调度中心）
 * on 方法用来把函数 fn 都加到缓存列表中（订阅者注册事件到调度中心）
 * emit 方法取到 arguments 里第一个当做 event，根据 event 值去执行对应缓存列表中的函数（发布者发布事件到调度中心，调度中心处理代码）
 * off 方法可以根据 event 值取消订阅（取消订阅）
 * once 方法只监听一次，调用完毕后删除缓存函数（订阅一次）
 *
 * */

/**
 * 模块化：更好的管理模块之间的依赖，抽离公共化代码，形成内部的作用域供外部函数引用。
 * AMD,CDM,CommonJs,UMD,Module
 * CommonJs一般用于服务端或者Node用来同步加载模块，它对于模块的依赖发生在代码的运行阶段；不适合浏览器的异步加载
 * Module 在编译时就需引入模块代码，而并非在代码运行时加载，因为也不适合异步加载；
 *
 * 差异：CommonJs模块引用后是一个值的拷贝，而Module引用后是一个值的动态映射，并且这个映射只是只读的。
 */

/**
 * 浏览器缓存机制
 * 缓存位置：
 * Service Worker 的缓存与浏览器其他内建的缓存机制不同，它可以让我们自由控制缓存哪些文件、如何匹配缓存、如何读取缓存，并且缓存是持续性的。
 * Memory Cache 也就是内存中的缓存，主要包含的是当前中页面中已经抓取到的资源,例如页面上已经下载的样式、脚本、图片等。
 * Disk Cache 也就是存储在硬盘中的缓存，读取速度慢点，但是什么都能存储到磁盘中，比之 Memory Cache 胜在容量和存储时效性上。
 * Push Cache（推送缓存）是 HTTP/2 中的内容，当以上三种缓存都没有命中时，它才会被使用。它只在会话（Session）中存在，一旦会话结束就被释放，并且缓存时间也很短暂
 * 浏览器缓存：强缓存和协商缓存
 * 
 */

// 描述一个对象的创建过程
function created() {
  var obj = new Object();
  var con = [].shift.call(arguments);
  con.__proto__ = obj.prototype;
  var result = con.apply(obj, arguments);
  return typeof result === "object" ? result : obj;
}

// bind的实现方式
Function.prototype.bind = function () {
  var self = this,
    context = [].shift.call(arguments),
    args = [].slice.call(arguments);
  return function () {
    self.apply(context, [].concat(args, [].slice.call(arguments)));
  };
};

// promise的实现过程
class Promise {
  constructor(process) {
    this.msg = "";
    this.status = "pending";
    process(this.resolve.bind(this), this.reject.bind(this));
    return this;
  }
  resolve(val) {
    this.status = "fulfilled";
    this.msg = val;
  }
  reject(val) {
    this.status = "rejected";
    this.msg = val;
  }
  then(fulfilled, rejected) {
    if (this.status === "fulfilled") {
      fulfilled(this.msg);
    }
    if (this.status === "reject") {
      rejected(this.msg);
    }
  }
}

// promise all的原理实现
function promiseAll(promises) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("argument must be anarray"))
    }
    var countNum = 0;
    var promiseNum = promises.length;
    var resolvedvalue = new Array(promiseNum);
    for (var i = 0; i < promiseNum; i++) {
      (function (i) {
        Promise.resolve(promises[i]).then(function (value) {
          countNum++;
          resolvedvalue[i] = value;
          if (countNum === promiseNum) {
            return resolve(resolvedvalue)
          }
        }, function (reason) {
          return reject(reason)
        })
      })(i)
    }
  })
}

// 防抖
/**
 * 动作绑定事件，
 * 动作发生后在一定时间内触发事件，
 * 在这段时间内，如果动作发生了，则重新等待一定时间在触发事件
 *
 * 原理：在每次函数执行前先清空上一次设置的定时器
 * */

function debounce(fn, wait) {
  var timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, wait);
  };
}

// 节流
/**
 * 动作绑定事件，动作发生后一段时间后触发事件，
 * 在这段时间内，如果动作有发生了，则无视该动作，直到时间执行完后，才能重新触发
 * 原理：在每次函数执行前先判断是否存在定时器，存在则跳过本次执行，否则设置定时器
 */
function throttle(fn, wait) {
  var pre = Date().now();
  return function () {
    var now = Date.now();
    if (now - prev >= wait) {
      fun.apply(this, arguments);
      pre = Date.now();
    }
  };
}

// 实现一个map方法
Array.prototype.map = function () {
  var arr = this, result = [];
  var [fn, thisValue] = Array.prototype.slice.call(arguments);
  for (var i = 0; i < arr.length; i++) {
    result.push(fn.call(thisValue, arr[i], i, arr))
  }
  return result;
}

/**
 * 考察js基础知识，比如变量的提升，原型继承，优先级等
*/
function Foo() {
  getName = function () { console.log(1, '-'); };
  return this;
}
Foo.getName = function () { console.log(2, '--'); };
Foo.prototype.getName = function () { console.log(3, '---'); };
var getName = function () { console.log(4, '----'); };
function getName() { console.log(5, '------'); }

//请写出以下输出结果：
Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); // 3
new new Foo().getName(); // 3

/**
 * 考察对象赋值，优先级
*/
var a = { n: 1 }
var b = a;
a.x = a = { n: 2 }

console.log(a, b, a.x, b.x)


// 工厂模式
class Person {
    constructor(name) {
        this.name = name
    }
    getName() {
        console.log(this.name)
    }
}
class Factory {
    static create(name) {
        return new Person(name)
    }
}
Factory.create('alanwu').getName()  //alanwu
