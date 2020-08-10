/**
 * 1.求两数之和
 * 给定 nums = [2, 7, 11, 15], target = 9
 * 因为 nums[0] + nums[1] = 2 + 7 = 9
 * 所以返回 [0, 1]
 * 注解：利用两数之差判断值是否存在，indexOf返回数组索引值
*/
var twoSum = function(nums, target) {
  let i = nums.length;
  while(i > 1) {
    let last = nums.pop()
    let dif = target - last;
    if (nums.indexOf(dif) > -1) {
      return [nums.indexOf(dif), nums,length]
    }
    i--;
  }
};

var twoSum = function(nums, target) {
  let left = 0, right = nums.length -1; // 初始化左、右两个指针
  while(left < right) {
    let sum = nums[left] + nums[right];
    if (sum < target) {
      left++; // 左指针向前移动
    }else if (sum > target) {
      right-- // 右指针向后移动
    } else {
      return [left, right] // 左右指针对应元素和相等return
    }
  }
  return []
}

/**
 * 2.求两数相加
 * 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4) [2,4,3] [5,6,4]
 * 输出：7 -> 0 -> 8
 * 原因：342 + 465 = 807
*/
var addTwoNumbers = function(l1, l2) {
  if (l1 === null && l2 == null) return null;
  let dummy = new ListNode(0); // 设置指针存储链表头部
  let head = dummy; // 设置指针指向dummynode
  let addOne = 0; // 设置进位数
  let sum = 0; // 设置对位相加和
  while(l1 !== null || l2 !== null || addOne !== 0) {
    sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + addOne; // 求出链表个位相加和
    head.next = new ListNode(sum % 10); // 求出下个链表的值并重新指向head
    head = head.next;
    addOne = sum > 10 ? 1 : 0; // 求出我们的进制数
    if (l1 !== null) l1 = l1.next
    if (l2 !== null) l2 = l2.next
  }
  return dummy.next // 任何面试题型优先考虑输出无的情况
}