1. 请实现如下布局，要求自适应各种移动端浏览器
 
<div class="bar-context">
<div></div>
<div>评价司机</div>
<div></div>
</div>
.bar-context {
width: 100%;
height: 120px;
background: #cccc;
}
.bar-context: frist-child {
width: 20%;
height: 1px;
float: left;
background: black;
}
.bar-context: last-child {
width: 20%;
height: 1px;
float: left
background: black;
}
 
2.有如下代码：
<style type="text/css">
#a {font-size:12px}
div p{ font-size:13px }
.a .b .c{ font-size:15px }
#b{ font-size:15px }
div .c{ font-size:15px }
</style>
<div id="a" class="a">
<div id="b" class="b">
<p id="c" class="c">I’am here</p>
</div>
</div>
请问在标准模式下显示的 I’am here 字符会是多大的字体？命中的是哪一条规则？CSS的选择器的优先级规则是怎样的：
 15px; 内联样式>id>class> 后代
3.实现一个函数 find(obj, str)，满足:
如var obj = {a:{b:{c:1}}};
find(obj,'a.b.c') //返回1
find(obj,'a.d.c') //返回undefined 

Function.prototype.find = function (obj, str) {
for (let key in )
}
 
4.请写出下列代码的输出结果:
var a=0,
b=0;
function A(a){
A = function(b){
                alert(a+b++);
}
alert(a++);
}
A(1); 0
A(2); 4

5.请写出下列代码的输出结果:
function Foo() {
    getName = function () { alert (1); };
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}
 
//请写出以下输出结果：
Foo.getName(); 2
getName(); 4
Foo().getName(); 1
getName(); 1
(new (Foo.getName)()); 2
(new Foo()).getName(); 3
new (new Foo()).getName(); 3

6.简单描述下防抖与节流的差别？实现一个节流方法(throttle)？

防抖： 在执行事件时，每次清除一次定时器，然后在重新计时
节流: 在执行事件时，先判断定时器是否存在，存在停止执行，否着重新计时
function throttle(fnc, wait) {
var pre = Date().now()
return function () {
var now = Date().now()
if (now - pre > wait) {
fnc.apply(this, arguments)
pre = Date().now()
}
}
}
 
7.请写出匹配邮箱的正则表达式，如：
hello1988@gmail.com
hello1987@didichuxing.com.cn   
 /^([0-9a-zA-Z\-_.\]+([0-9a-z]+\.[a-z]{2,3})(\.[a-z]{2}))/g
8.请说出几种你知道的前端跨域的方法，这些跨域的方法分别有哪些特点，适合应用于哪些场景。
jsonp/iframe/postMessage/cors/nginx
jsonp适用于同源下面的get请求
iframe适用于同源或者跨域下的数据通信，但是需配合widown.domain, window.name || postMessage
 cors后端设置可以可跨域的地址
nginx常用方案，适合在多项目间的配置

9.对于加快网页的加载速度都有哪些优化的方法？
静态文件资源的压缩，css/js等
合理使用cdn加速
图片压缩
http请求合理使用
模块化合并
js文件放置body文档流最下面执行等等
 
10.请描述一下在浏览器输入http://www.baidu.com到页面渲染，中间都经过了哪些事情
客户端想浏览器发起请求，
通过dns解析当前域名，查找对应ip
TCP三次通信握手过程
客户端与服务端建立通信
客户端渲染工作
 
11.已知有2个栈，有pop，push，getSize接口，请用这2个栈实现1个队列，包含dequeue和enqueue接口。
var stack1 = [], stack2 = [];
function push(item) {
while(stack2.length !== 0) {
stack1.push(stack2.pop())
}
stack1.push(item)
}
function pop() {
while(stack1.length !== 0) {
stack2.push(stack1.pop())
}
return stack2.pop()
}
12.设计一个异步任务类 Task
class Task {
   constructor() {

   }
  
   add(fn, context, …args) {
     
   }
   run() {
  
   }
   stop() {
   }
}
满足：
function task1(next) {
  setTimeout(() => {
     console.log(1)
     next()
  }, 1000)
 }
 function task2(next, b) {
  setTimeout(() => {
     console.log(b)
     next()
  }, 1000)
 }
let task = new Task()
task.add(task1).add(task2, null, 3)
task.run()
备注：当任务函数执行 next 的时候，会跳转到下一个任务函数执行

13. 有一堆整数，请把它们分成三份，确保每一份的和尽量相等。
