// bind 的实现方式
Function.prototype.bind = function() {
  var self = this;
  var context = [].prototype.shift.call(arguments);
  var arg = [].prototype.slice.call(arguments)
  return function() {
    self.apply(context, [].concat.call(arg, [].prototype.slice.call(arguments)))
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
  window[callback] = function(data) {
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
