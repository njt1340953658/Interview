#### http协议 安全相关
1. 介绍 HTTPS 握手过程 http 网络
2. 介绍下 HTTPS 中间人攻击 http 前端安全 浏览器
3. HTTP2相对于HTTP1.x有什么优势和特点
4. 接口如何防刷

#### 前端安全 浏览器
1. 介绍下前端加密的常见场景和方法
2. 介绍下重绘和回流（Repaint & Reflow），以及如何进行优化 || 如何避免重绘或者重排
3. 跨域的方法有哪些？原理是什么
4. 浏览器事件代理机制的原理是什么
5. cookie 和 token 都存放在 header 中，为什么不会劫持 token
6. 介绍AST（Abstract Syntax Tree）抽象语法树
8. 有哪些可能引起前端安全的的问题
9. 浏览器如何解析css选择器
10. 浏览器是如何渲染UI的
11. 浏览器的主要组成部分是什么
12. 如何用 Hooks 的方法去模拟 Class Components 的功能

#### css方面
1. 分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景
2. 介绍下 BFC、IFC、GFC 和 FFC
3. 居中为什么用transform，而不是margin top/left

#### 原生js、性能等
1. 实现一个 sleep 函数
2. 如何快速从一个巨大的数组中随机获取部分元素(需考虑性能)
3. 为什么普通 for 循环的性能远远高于 forEach 的性能，请解释其中的原因
4. JS 异步解决方案的发展历程以及优缺点
5. Promise 构造函数是同步执行还是异步执行，那么 then 方法呢
6. 判断数组的方法，并对比它们的优劣
7. 介绍下观察者模式和订阅-发布模式的区别，各自适用于什么场景
8. 简述下对 webWorker 的理解
9. 什么是event loop？浏览器和node上实现有什么不同
10. 什么是原型？什么是原型链？原型链解决的是什么问题
11. 什么是函数柯里化？实现 sum(1)(2)(3) 返回结果是1,2,3之和
12. 说一下你对setTimeout(f, 0)的理解
13. setTimeout倒计时为什么会出现误差
14. 手动实现一个EventEmitter类
15. typeof 是否正确判断类型? instanceof呢？ instanceof 的实现原理是什么
16. 数组随机打乱排序
17. 多维数组转为一维数组
18. 介绍下 Set、Map、WeakSet 和 WeakMap 的区别
19. 什么是防抖和节流？有什么区别？如何实现
20. 对async、await的理解，内部原理
21. 文件上传如何做到断点续传 
22. 类型转换的原理是什么
23. 100万个成员的数组取第一个和最后一个有性能差距吗
24. 页面加载海量数据
25. 前端路由的实现
26. 请你实现一个深克隆

#### h5 性能
1. 如何在 H5 和小程序项目中计算白屏时间和首屏时间，说一下你的思路 h5 性能
2. 如何解决移动端 Retina 屏 1px 像素问题

#### vue框架
1. Vue的解析器原理？ 用template生成AST语法树分析
2. 谈一下 nextTick 的原理
3. vue 如何优化首页的加载速度？首页白屏是什么问题引起的？如何解决
4. vue 的父组件和子组件生命周期钩子执行顺序是什么
5. 你是如何理解Vue的响应式系统的
6. Vue中的key到底有什么用
7. Vue为什么没有类似于React中shouldComponentUpdate的生命周期

#### react框架
1. react-router 里的 <Link> 标签和 <a> 标签有什么区别
2. redux-saga了解吗？解决了什么问题
3. react-redux中的connect原理解析
4. redux在状态管理方面解决了react本身不能解决的哪些问题 
5. react中的key的作用 
6. 你对 Time Slice的理解
7. React组件通信如何实现
8. 你是如何理解fiber的
9. React Hooks 解决了什么问题

#### babel
1. babel 怎么把字符串解析成 AST，是怎么进行词法/语法分析的
2. ES6 代码转成 ES5 代码的实现思路是什么 babel es6及以上
3. babel-runtime和babel-polyfill的作用介绍和使用

#### webpack
1. webpack的构建流程是什么?从读取配置到输出文件这个过程尽量说全
2. webpack中，loader和plugin的区别？
3. webpack中，有哪些常见的Plugin？他们分别是解决什么问题的
4. webpack中，有哪些常见的Loader？他们是解决什么问题的
5. 与webpack类似的工具还有哪些？谈谈你为什么最终选择（或放弃）使用webpack
6. webpack与grunt、gulp的不同
7. webpack HMR 原理解析
8. webpack 模块机制

#### 工程化、发散题
1. 在你的前端项目中，你是如何找出性能瓶颈的
2. 介绍下 npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块
3. 介绍模块化发展历程 

#### 算法
1. 实现一个异步队列Queue，要求按时间依次执行callback 
2. 比较两数组差异 (Diff Two Arrays)
3. 找出数组中两数之和为指定值的所有整数对，要求时间复杂度为O(N) 