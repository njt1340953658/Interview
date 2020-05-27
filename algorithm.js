/**
 * 相关算法题分析：
*/
// 一.实现一个带并发限制的异步调度器，保证同时最多运行两个任务
class Scheduler {
  constructor() {
    this.stack = [];
    this.excutingNum = 0;
  }
  add(promiseCreator) {
    return new Promise(resolve => {
      // 异步任务超过两个
      const fn = () => {
        this.excutingNum++;
        return promiseCreator().then(() => {
          resolve();
          this.excutingNum--;
          this.ask();
        });
      };
      this.stack.push(fn);
      this.ask();
    });
  }
  ask() {
    if (this.stack.length && this.excutingNum < 2) {
      const fn = this.stack.shift();
      fn();
    }
  }
}

// 实现一个带并发数限制的fetch请求函数
function handleFetchQueue(urls, max, callback) {
  const urlCount = urls.length;
  const requestsQueue = [];
  const results = [];
  let i = 0;
  const handleRequest = (url) => {
    const req = fetch(url).then(res => {
      const len = results.push(res);
      if (len < urlCount && i + 1 < urlCount) {
        requestsQueue.shift();
        handleRequest(urls[++i])
      } else if (len === urlCount) {
        'function' === typeof callback && callback(results)
      }
    }).catch(e => {
      results.push(e)
    });
    if (requestsQueue.push(req) < max) {
      handleRequest(urls[++i])
    }
  };
  handleRequest(urls[i])
}

/**
 * 二. 寻找数组中n个数和为m
 * 假如n是3和是13
*/
function foo(arr, m, n) {
  // 个数n为0，和为0， 返回空数组
  if (m === 0 && n === 0) return [];
  // 数组为0，且n个数为0，返回null
  if (arr.length <= 0 || n <= 0) return null;

  var first = arr[0];
  var rest = arr.slice(1, arr.length);

  // 使用第一个元素
  var result1 = foo(rest, m - first, n - 1);

  if (result1) {
    return [first].concat(result1);
  }

  // 不使用第一个元素
  var result2 = foo(rest, m, n);
  if (result2) {
    return result2;
  }
  return null;
}

var arr = [1, 3, 5, 7, 9]
console.log(foo(arr, 13, 3));

/**
 * 三、给定一个数组计算他们的交集
*/
function intersection(num1, num2) {
  var result = num1.filter(item => {
    var idx = num2.indexOf(item)
    if (idx !== -1) {
      num2.splice(idx, 1)
      return item
    }
  })
  return result;
}

/**
 * 四、找字符串中出现最多的字符
*/
function codeStr(str) {
  var obj = {};
  for (var i = 0; i < str.length; i++) {
    var char = str.charAt(i);
    if (obj[char]) {
      obj[char]++;  //次数加1
    } else {
      obj[char] = 1;    //若第一次出现，次数记为1
    }
  }
  //遍历对象，找到出现次数最多的字符的次数
  var max = 0;
  for (var key in obj) {
    if (max < obj[key]) {
      max = obj[key];   //max始终储存次数最大的那个
    }
  }
  for (var key in obj) {
    if (obj[key] == max) {
      console.log("最多的字符是" + key);
      console.log("出现的次数是" + max);
    }
  }
}

/**
 * 五、实现合并乱序区间
 * */
function merge(intervals) {
  if (!intervals || !intervals.length) return [];
  intervals.sort((a, b) => a[0] - b[0]); // 按照区间第一位进行排序
  let result = [intervals[0]] // 排序之后第一个是最小的
  // [[1,3]]
  for (let i = 1; i < intervals.length; i++) { // 从第二个开始比较
    let resultLast = result.length - 1
    if (result[resultLast][1] > intervals[i][0]) { // 判断结尾是不是大于开始
      result[resultLast][1] = Math.max(result[resultLast][1], intervals[i][1]) // 区间重复就进行合并了
    } else {
      result.push(intervals[i]) // 区间没有重复
    }
  }
  return result
}

console.log(merge(arr))

/**
 * 六、js实现链表的翻转
*/

function reverseList(head) {
  if (!head) {
    return head
  }
  if (!head.next) {
    return head
  }
  var p1 = null, p2 = null, p3 = head;
  while(p3) {
    p1 = p2;
    p2 = p3;
    p3 = p3.next;
    p2.next = p1;
  }
  return p2;
}

/**
 * 七、两个有序链表和并成一个有序链表
 * 
*/
var mergeTwoLists = function (l1, l2) {
  var l3 = new ListNode(-1);
  var c3 = l3;
  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      c3.next = l1;
      l1 = l1.next;
    } else {
      c3.next = l2;
      l2 = l2.next;
    }
    c3 = c3.next;
  }
  //循环完某一链表后，将另一链表剩下的部分直接加入到l3
  c3.next = (l1 === null) ? l2 : l1;
  return l3.next;

};

/**
 * 八、树的遍历有几种方式，实现下层次遍历
*/

/**
 * 九、判断对称二叉树
*/
function Tree(pTree) {
  if (!pTree) {
    return true;
  }
  return TreeJug(pTree.left, pTree.right);
}

function TreeJug(left, right) {
  if (!left && left === right) {
    return true;
  }
  if (!left || !right) {
    return false;
  }
  if (left.val !== right.val) {
    return false;
  }
  return TreeJug(left.left, right.right) && TreeJug(left.right, right.left);
}
let tree = {
  val: 1,
  left: null,
  right: null
};
console.log(Tree(tree));

/**
 * 十、两个链表在某一点相交，求这个交叉点
 * 1：判断这两个链表是否有环，2：这两个链表上没有环，3：这个两个链表都有环
 */

// 判断是否有环,判断一个链表是否有环，如果有，则返回第一个进入环的子节点，没有返回null
function getLoopNode(head) {
  if (head == null || head.next == null || head.next.next == null) return null;
  let n1 = head.next;
  let n2 = head.next.next;
  while (n1 != n2) {
    if (n2.next == null || n2.next.next == null) return null;
    n1 = n1.next;
    n1 = n2.next.next;
  }
  n2 = head;
  while (n1 != n2) {
    n1 = n1.next;
    n2 = n2.next;
  }
  return n1;
}

// 两个无环链表,判断两个无环链表是否相交，相交则返回第一个相交的节点，不相交则返回null
function noLoop(pHead1, pHead2) {
  if (pHead1 == null || pHead2 == null) {
    return null;
  }
  var cur1 = pHead1;
  var cur2 = pHead2;
  var n = 0;
  while (cur1 != null) {
    n++;
    cur1 = cur1.next;
  }
  while (cur2 != null) {
    n--;
    cur2 = cur2.next;
  }
  if (cur1 != cur2) {
    return null;
  }
  cur1 = n > 0 ? pHead1 : pHead2;
  cur2 = cur1 === pHead1 ? pHead2 : pHead1;
  n = Math.abs(n);
  while (n != 0) {
    n--;
    cur1 = cur1.next;
  }
  while (cur1 != cur2) {
    cur1 = cur1.next;
    cur2 = cur2.next;
  }
  return cur1;
}

// 两个都有环，判断两个有环链表是否相交，相交则返回第一个相交的节点，不相交则返回null
function bothLoop(pHead1, loop1, pHead2, loop2) {
  var cur1 = null;
  var cur2 = null;
  if (loop1 == loop2) {
    noLoop(pHead1, pHead2);
  } else {
    cur1 = loop1.next;
    while (cur1 !== loop1) {
      if (cur1 == cur2) {
        return loop1;
      }
      cur1 = cur1.next;
    }
    return null;
  }
}

// 总函数
function getIntersectNode(pHead1, pHead2) {
  if (pHead1 == null || pHead2 == null) return null;
  var loop1 = getLoopNode(pHead1); // 判断是否有环
  var loop2 = getLoopNode(pHead2); // 判断是否有环
  if (loop1 == null && loop2 === null) return noLoop(pHead1, pHead2); // 无环
  if (loop1 !== null && loop2 !== null)
    return bothLoop(pHead1, loop1, pHead2, loop2); // 有环
  return null;
}
