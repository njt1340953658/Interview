/**
 * 前端路由的是实现原理：
 * hash history,1. 如何改变URL却不引起页面刷新； 2. 如何检测URL变化
 * 路由描述的是 URL 与 UI 之间的映射关系，这种映射是单向的，即 URL 变化引起 UI 更新（无需刷新页面）。
*/
function Router() {
  this.curUrl = '';
  this.routes = {};
  this.refresh = function () {
    this.curUrl = location.hash.slice(1) || '/';
    this.routes[this.curUrl]();
  }
  this.init = function () {
    // hash变化触发事件
    window.addEventListener('hashchange', this.refresh.bind(this))
    // 当页面完成加载后触发事件
    window.addEventListener('load', this.refresh.bind(this));
  },
    this.route = function (path, callback) {
      // 创建url和组件的映射关系
      this.routes[path] = callback || function () { }
  }
}

/**
 * 当想要跳转到指定url的时候，
 * 将目标url通过pushState()或者replaceState()方法填入到history和地址栏中，
 * 只是url地址发生了改变。
 * 之后通过popstate事件响应，执行相应的回调函数，实现前端组件间的切换
 * */
var currentPage = 1;
function go(num) {
  currentPage = currentPage + num;
  setState(currentPage)
  history.pushState(currentPage, '', '?=' + currentPage)
}

onpopstate = function (event) {
  setState(event.state)
}
