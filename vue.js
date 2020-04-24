/**
 * vue的数据劫持
*/
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get: function () {
      return val
    },
    set: function () {
      if (newVal === val) return val = newVal;
      console.log(val)
    }
  })
}

function Observe(obj, vm) {
  Object.keyS(obj).forEach(function (key) {
    defineReactive(vm, key, obj[key])
  })
}

function Vue(option) {
  this.data = option.data;
  var data = this.data;
  Observe(data, this)
  var id = option.el;
  var dom = nodeToFragment(document.getElementById(id), this);
}