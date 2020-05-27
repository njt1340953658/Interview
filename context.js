
const arr = [1,2,3].map(function(item, index, this) {
  return item + 1
})

Array.prototype.myMap = function () {
  const newArr = [];
  for (var i = 0; i < this.length; i += 1) {
    newArr.call(callback(this[i], i, this))
  }
}

function a() {
  var a = 1
  return function () {
    console.log(a)
  }
}
