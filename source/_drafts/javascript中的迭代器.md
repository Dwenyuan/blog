---
title: javascript中的迭代器
date: 2019-03-22 17:04:10
tags: javascript
category: javascript
---

- [什么是迭代器](#%E4%BB%80%E4%B9%88%E6%98%AF%E8%BF%AD%E4%BB%A3%E5%99%A8)
- [迭代器有什么作用](#%E8%BF%AD%E4%BB%A3%E5%99%A8%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)
- [什么是可遍历对象](#%E4%BB%80%E4%B9%88%E6%98%AF%E5%8F%AF%E9%81%8D%E5%8E%86%E5%AF%B9%E8%B1%A1)
- [手动实现一个迭代器](#%E6%89%8B%E5%8A%A8%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E8%BF%AD%E4%BB%A3%E5%99%A8)

# 什么是迭代器

一个迭代器对象 ，知道如何每次访问集合中的一项， 并跟踪该序列中的当前位置。在 JavaScript 中 迭代器是一个对象，它提供了一个 next() 方法，用来返回序列中的下一项。这个方法返回包含两个属性：done 和 value
[迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)

# 迭代器有什么作用

遍历可遍历对象中的每一项元素

# 什么是可遍历对象

简单来说在 JavaScript 中的可遍历对象就是可以放在 for...of 中的对象,他需要有一个 [Symbol.iterator] 属性

```javascript
let object ={}
object[Symbol.iterator]=function(){
  ...
  return {
    next:()=> ...
    done:true
  }
}
```

# 手动实现一个迭代器

1. 在 javascript 中有 for...of 来遍历每一项元素

```javascript
let arr = [1, 2, 3, 4, 5];
// 使用 for...of 遍历数组
for (i of arr) {
  console.log(i);
}
```
