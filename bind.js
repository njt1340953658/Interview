// bind 方法的实现原理
Function.prototype.bind = function(thisArg) {
  if(typeof this !== 'function') {
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable')
  }
  var args = [].slice.call(arguments,1)
  var self = this
  var Empty = function () {}
  var fBound = function() {
    return self.apply(
      this instanceof Empty ? this : thisArg,
      args.concat([].slice.call(arguments))
    )
  }
  // 维护原型关系
  if(this.prototype) { //如果this是箭头函数 ，是没有原型的
    Empty.prototype = self.prototype
  }
  fBound.prototype = new Empty()
  return fBound
}