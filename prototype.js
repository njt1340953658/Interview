// 一、 原型链继承
// 定义父类
function Parent(name) {
  this.name = name
}
Parent.prototype.getName = function () {
  return this.name;
}

// 定义子类
function Children() {
  this.age = 24
}

Children.prototype = new Parent('nan sir');

var test = new Children();

console.log(test.getName(), test.age)

// 二、 构造继承
// 定义父类
function ParentFn(val) {
  this.language = ['javascript', 'react'];
  this.value = val
}

// 定义子类
function ChildrenFn() {
  Parent.apply(this, arguments)
}

var info = new ChildrenFn('999999')

console.log(info)

// 寄生组合
function Parent() {
  this.name = '小白'
}

Parent.prototype.getName = function(name) {
  return name
}

function Student(name) {
  Parent.call(this, name)
}

Student.prototype = Object.create(Parent.prototype)

Student.prototype.constructor = Student;

/**
 * 三、
 * es5和es6的继承之间的区别：
 * es6内部定义的所有方法不可枚举，es5默认是可以的
 * 类不存在变量提升，这个跟继承有关；必须保证子类在父类之后定义
 * es5的实例属性只能写在构造函数里面，es6直接写在类里面
 * */

function give() {
  return 'here is'
}

const giveCho = () => 'is here are'

console.log(give.prototype, '++++++')
console.log(giveCho.prototype, '========')


/**
 * 五、
 * 观察者模式，
 * 它定义了一种一对多的关系，
 * 让多个观察者对象同事监听某个主体对象，
 * 这个主题对象的状态发生变化是就会通知所有的观察者对象，
 * 是的他们能够自动更新自己
 * */

// 我们定义一个函数，用来承载
function publisher() {
  // 定义一个空数组来接收传递过来的数据
  this.arr = []
}

publisher.prototype = {
  // 订阅
  subscribe: function (fn) {
    // 订阅者将订阅者 push到arr数组中
    this.arr.push(fn)
  },

  // 接触订阅
  unSubscribe: function (fn) {
    // 过滤订阅者，如果订阅者 el存在arr数组中，就解绑订阅
    this.arr = this.arr.forEach(el => {
      if (el !== fn) {
        return el;
      }
    })
  },

  // 更新订阅者
  upDate: function (o, thisObj) {
    // o => 剩余订阅者
    var scoped = thisObj || window;
    this.fns.forEach(function (el) {
      el.call(scoped, o)
    })
  }
}

// 创建一个实例
var newSubscried = new publisher();

// 创建第一个订阅者
var user = function (data) {
  console.log(`第一个订阅者${data}订阅了`)
}

newSubscried.subscribe(user);


/**
 * 发布者订阅模式
*/
// 公众号对象
let eventEmitter = {};

// 缓存列表，存放 event 及 fn
eventEmitter.list = {};

// 订阅
eventEmitter.on = function (event, fn) {
    let _this = this;
    // 如果对象中没有对应的 event 值，也就是说明没有订阅过，就给 event 创建个缓存列表
    // 如有对象中有相应的 event 值，把 fn 添加到对应 event 的缓存列表里
    (_this.list[event] || (_this.list[event] = [])).push(fn);
    return _this;
};

// 发布
eventEmitter.emit = function () {
    let _this = this;
    let event = [].shift.call(arguments), // 第一个参数是对应的 event 值，直接用数组的 shift 方法取出
        fns = [..._this.list[event]];
    if (!fns || fns.length === 0) { // 如果缓存列表里没有 fn 就返回 false
        return false;
    }
    fns.forEach(fn => {  // 遍历 event 值对应的缓存列表，依次执行 fn
        fn.apply(_this, arguments);
    });
    return _this;
};

function user1 (content) {
    console.log('用户1订阅了:', content);
};

function user2 (content) {
    console.log('用户2订阅了:', content);
};

// 订阅
eventEmitter.on('article', user1);
eventEmitter.on('article', user2);

// 发布
eventEmitter.emit('article', 'Javascript 发布-订阅模式');
