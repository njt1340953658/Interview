// bind 的实现方式
Function.prototype.bind = function() {
  var self = this;
  var context = [].shift.call(arguments);
  var arg = [].slice.call(arguments)
  return function() {
    self.apply(context, [].concat.call(arg, [].slice.call(arguments)))
  }
}

function Jsonp(url, param, callback) {
  var script = document.createElement('script')
  param = {...param, callback}
  var arr = [];
  for(var key in param) {
    arr.push(`${key}=${param[key]}`)
  }
  script.src=`${url}?${arr.join('&')}`
  document.body.appendChild(script)
  callback = function(data) {
    console.log(data)
    document.removeChild(script)
  }
}

Array.prototype.map = function(fn) {
  var newArr = []
  for(var i = 0; i < this.length; i += 1) {
    newArr.push(fn(this[i], i, this))
  }
  return newArr;
}

class Promise {
  constructor() {
    this.status = "pending";
    this.msg = '';
    process(this.resolve.bind(this), this.reject.bind(this))
  }
  resolve(val) {
    this.status = 'fulfilled';
    this.msg = val
  }
  reject(err) {
    this.status = 'rejected';
    this.msg = err
  }
  then(fulfilled, rejected) {
    if (this.status === 'fulfilled') {
      fulfilled(this.msg)
    }
    if (this.status === 'rejected') {
      rejected(this.msg)
    }
  }
}

var publish = function() {
  this.arr = []
}

publish.prototype =  {
  subscribe: function (fn) {
    this.arr.push(fn)
  },
  unSubscribe: function(fn) {
    this.arr = fn.forEach(el => {
      if (el !== fn) return el;
    })
  },

  update: function(o, thisObj) {
    var scoped = thisObj || window;
    this.fns.forEach(el => {
      el.call(scoped, o)
    })
  }
}


function bubbleSort(arr) {
  for (var i = 0; i < arr.length; i += 1) {
    for (var j = 0; j < arr.length - 1; j += 1) {
      if (arr[j] > arr[j + 1])
      [arr[j], arr[j + 1]] = [ arr[j + 1], arr[j] ]
    }
  }
  return arr;
}

function backtext (str) {
  const index = Math.floor(str.length / 2);
  for (var i = 0; i < index.length; i += 1) {
    if (str[i] !== str[str.length - i - 1]) return false
  }
  return true
}

class Person  {
  constructor(name) {
    this.name = name
  }
  getName() {
    return this.name
  }
}

class Factory {
  static create(name) {
    new Person(name)
  }
}

// 深度优先遍历类似树的先序遍历，从图的某个顶点开始先访问，然后依次从未被访问的它的邻接点触发度优先搜索遍历图，直至图中所有和v有路径相通的顶点都被访问到
var deepTraversal = function (node, nodeList = []) {
  if (node !== null) {
    nodeList.push(node)
    let children = node.children;
    for (var i = 0; i < children.length; i += 1 ) {
      deepTraversal(children[i], nodeList)
    }
    return nodeList;
  }
}

// 广度优先遍历
var withTraversal = function (node) {
  var stack = [], nodes = [];
  if (node !== null) {
    stack.push(node) // 进队列
    while(stack.length) {
      var item = stack.shift();
      var children = item.children;
      nodes.push(children)
      for (let i = 0; i < children.length; i++) {
        stack.push(children[i])
      }
    }
    return nodes;
  }
}

// 快速排序
function quickSort(arr) {
  if (arr.length === 0) return []
  var provie = Math.floor(arr.length / 2)
  var mid = arr.splice(provie, 1)[0];
  var left = [], right = []
  for (var i = 0; i < arr.length; i += 1) {
    if (arr[i] > mid) {
      right.push(mid)
    } else {
      left.push(mid)
    }
  }
  return quickSort(left).concat(mid, quickSort(right))
}

// 实现一个带并发限制的fetch请求
function handleRequest(urls, max, callback) {
  const urlCount = urls.length, requestsQueue = [], result = [], i = 0;
  const handleFetchQueue = (urls) => {
    const req = fetch(urls).then(res => {
      const len = result.push(res);
      if (len < urlCount && i + 1 < urlCount) {
        requestsQueue.shift();
        handleFetchQueue(urls[i++])
      }
      if (len === urlCount) {
        callback(result)
      }
    })
    if (requestsQueue.push(req) < max) {
      handleFetchQueue(urls[++i])
    }
  }
  handleFetchQueue(urls[i])
}

// 实现一个简单性的symbol
const symbol = (() => {
  const cache = new Map();
  function fn(key) {
    if (this instanceof key) {
      throw TypeError ('symbol is not constructor')
    }
    return {}
  }
  fn.for = function (key) {
    if (!cache.has(key)) {
      cache.set(key, {})
    }
    return cache.get(key)
  }
  fn.keyFor = function(value) {
    for (let [ k, v ] of value) {
      if (v === value) return k;
    }
  }
  return fn;
})()

// call实现
Function.prototype.myCall = function(context) {
  context.fn = this;
  const args = [...arguments].slice(1);
  const result = context.fn(args);
  delete context.fn;
  return result
}


// BFC块级格式化上下文
/**
 * 1. 垂直盒子margin不会发生重叠
 * 2. 内部的盒子会在垂直方向一个一个放置
 * 3. BFC的区域不会与float盒子重叠
 * 4. 计算BFC的高度时，浮动元素也参与计算
 * 5. 每个元素的margin都在盒子的左边， 与包含块border盒子的左边相接触
 * */ 

//  http和tcp的区别
/**
 * http是应用层，处理数据包的问题，tcp是传输层，处理数据传输的过程；
 * http是建立在tcp的基础上的；
 * tcp三次握手
 * http文本传输协议
*/

// 304是怎么产生的
/**
 * 协商缓存，客户端与服务器之间建立通信，首先客户端会携带if-modified-since字段，服务器会返会一个带，last-modified字端，
 * 同时还提供一个if-none-match字段，并返回一个etag标识。这两个请求都是监测浏览器是否有缓存存在，若存在则，
 * 返回一个304转态的请求，直接使用缓存；反之则返回一个200的状态，并覆盖旧的缓存
*/

// nginx的策略规则 => 内存占用率低、负载均衡、并发请求、动静分离
/**
 * 1. 轮询
 * 2. 权重
 * 3. hash ip
 * 4. 插件
*/

/**
 * node机制 => 事件驱动、异步IO、跨终端
 * 1. timer
 * 2. callback
 * 3. poll
 * 4. check
 * */ 