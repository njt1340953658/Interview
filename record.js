// bind
Function.prototype.bind = function () {
  var self = this, context = [].shift.call(arguments), args = [].slice.call(arguments)
  return function () {
    self.apply(context, [].concat.call(args, [].slice.call(arguments)))
  }
}

// call
Function.prototype.myCall = function (context) {
  context.fn = this
  var args = [...arguments].slice(1)
  var result = context.fn(args)
  delete context.fn
  return result
}

// 实现一个map方法
Array.prototype.map = function (fn) {
  var result = []
  for (var i = 0; i < this.length; i += 1) {
    result.push(fn(this[i], i, this))
  }
  return result
}

// 防抖
function debounce (fn, wait) {
  var timer;
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout (() => {
      fn.apply(this, arguments)
    }, wait)
  }
}

// 节流
function throttle (fn, wait) {
  var pre = Date.now()
  return function () {
    var now = Date.now()
    if (now - pre >= wait) {
      fn.apply(this, arguments)
      pre = Date.now()
    }
  }
}


function Jsonp(url, param, callback) {
  var script = document.createElement('script')
  param = {...param, callback}
  var arr = []
  for (var key in param) {
    arr.push(`${key}=${param[key]}`)
  }
  script.src = `${url}?${arr.join('&')}`
  document.body.appendChild(script)
  callback = function(data) {
    console.log(data)
    document.removeChild(script)
  }
}

function quickSort(arr) {
  if (arr.length === 0) return []
  var provie = Math.floor(arr.length / 2)
  var mid = arr.splice(provie, 1)[0]
  var left = [], rigth = []
  for (var i = 0; i < arr.length; i += 1) {
    if (arr[i] > mid) {
      rigth.push(arr[i])
    }else {
      left.push(arr[i])
    }
  }
  return quickSort(left).concat(mid, quickSort(rigth))
}

function deepClone(obj) {
  if (typeof obj !== 'object') return obj;
  if (obj instanceof RegExp) {
      return new RegExp(obj);
  }
  if (obj instanceof Date) {
      return new Date(obj);
  }
  const result = Array.isArray(obj) ? [] : {};
  for(let key in obj) {
      if (obj.hasOwnProperty(key)) {
          result[key] = typeof obj[key] !== 'object' ? deepClone(obj[key]) :  obj[key]
      }
  }
  return result
}

class Promise {
  constructor() {
    this.msg = ''
    this.status = 'pending'
    process(this.resolve.bind(this), this.reject.bind(this))
  }
  resolve(val) {
    this.msg = val
    this.status = 'fullfilled'
  }

  reject(err) {
    this.msg = err
    this.status = 'rejected'
  }

  then(fullfilled, rejected) {
    if (this.status === 'fullfilled') {
      fullfilled(this.msg)
    }
    if (this.status === 'rejected') {
      rejected(this.msg)
    }
  }
}

function Jsonp (url, param, callback) {
  var script = document.createElement('script')
  param = { ...param, callback }
  var arr = []
  for (let key in param) {
    arr.push(`${key}=${param[key]}`)
  }
  script.src = `${url}?${arr.join('&')}`
  document.body.appendChild(script)
  callback = function (data) {
    console.log(data)
    document.removeChild(script)
  }
}