---
title: javascript中的迭代器
tags: javascript
category: javascript
date: 2019-03-22 17:04:10
---


- [什么是迭代器](#%E4%BB%80%E4%B9%88%E6%98%AF%E8%BF%AD%E4%BB%A3%E5%99%A8)
- [什么是可遍历对象](#%E4%BB%80%E4%B9%88%E6%98%AF%E5%8F%AF%E9%81%8D%E5%8E%86%E5%AF%B9%E8%B1%A1)
- [手动实现一个迭代器](#%E6%89%8B%E5%8A%A8%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E8%BF%AD%E4%BB%A3%E5%99%A8)
- [JavaScript 中的生成器函数`function*` 和 生成器对象 `Generators`](#javascript-%E4%B8%AD%E7%9A%84%E7%94%9F%E6%88%90%E5%99%A8%E5%87%BD%E6%95%B0function-%E5%92%8C-%E7%94%9F%E6%88%90%E5%99%A8%E5%AF%B9%E8%B1%A1-generators)
- [生成器的高级用法](#%E7%94%9F%E6%88%90%E5%99%A8%E7%9A%84%E9%AB%98%E7%BA%A7%E7%94%A8%E6%B3%95)
  - [`yield*` 的用法。](#yield-%E7%9A%84%E7%94%A8%E6%B3%95)
  - [`next()` 的参数](#next-%E7%9A%84%E5%8F%82%E6%95%B0)
- [同步写法异步执行](#%E5%90%8C%E6%AD%A5%E5%86%99%E6%B3%95%E5%BC%82%E6%AD%A5%E6%89%A7%E8%A1%8C)

# 什么是迭代器

一个迭代器对象 ，知道如何每次访问集合中的一项， 并跟踪该序列中的当前位置。在 JavaScript 中 迭代器是一个对象，它提供了一个 next() 方法，用来返回序列中的下一项。这个方法返回包含两个属性：done 和 value
[迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)

# 什么是可遍历对象

简单来说在 JavaScript 中的可遍历对象就是可以放在 for...of 中遍历的对象,他需要有一个 **[Symbol.iterator]** 属性,该属性是一个可以返回一个 next()方法的方法,next 方法会返回一个 value 和 done 标志位的方法 ,形如下方

```javascript
let object ={};
object[Symbol.iterator]=function(){
  ...
  return {
    next:()=>{
      return {
        value: ...,
        done: true
      }
    }
  }
}
```

# 手动实现一个迭代器

```javascript
// 在 javascript 中有 for...of 来遍历每一项元素
let arr = [1, 2, 3, 4, 5];
// 使用 for...of 遍历数组
for (i of arr) {
  console.log(i);
}

let object = {};
object[Symbol.iterator] = function() {
  let index = 1;
  return {
    next: () => ({
      value: index++,
      done: index > 100
    })
  };
};
for (const item of object) {
  console.log(item);
}
```

# JavaScript 中的生成器函数`function*` 和 生成器对象 `Generators`

在 es6 中为了方便生成迭代器引用了 生成器函数`function*` 和 生成器对象 `Generators`。 使用 `function*` 可以很方便的生成一个返回 next() 方法的方法

```javascript
function* gen() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}
const iterator = gen();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: 4, done: false }
console.log(iterator.next()); // { value: 5, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

我们将方法赋值赋值给 **[Symbol.iterator]** 就可以得到一个可遍历对象

```javascript
let object = {};
// 将object变成一个可遍历对象
object[Symbol.iterator] = iter;
for (const i of object) {
  console.log(i);
}
// 输出
// 1
// 2
// 3
// 4
// 5
```

# 生成器的高级用法

## `yield*` 的用法。

`yield*` 委托给另一个 generator 或可迭代对象

委托给另外一个生成器

```javascript
function* gen1() {
  yield "gen1_1";
  yield "gen1_2";
}
function* gen2() {
  yield "gen2_1";
  yield* gen1();
  yield "gen2_2";
}
let gen = gen2();
console.log(gen.next()); // { value: 'gen2_1', done: false }
console.log(gen.next()); // { value: 'gen1_1', done: false }
console.log(gen.next()); // { value: 'gen1_2', done: false }
console.log(gen.next()); // { value: 'gen2_2', done: false }
```

委托给一个可迭代对象

```javascript
function* gen() {
  yield* [1, 2, 3];
  yield* "45";
  yield* new Set([6, 7]);
}
let g = gen();
console.log(g.next()); // { value: 1, done: false }
console.log(g.next()); // { value: 2, done: false }
console.log(g.next()); // { value: 3, done: false }
console.log(g.next()); // { value: '4', done: false }
console.log(g.next()); // { value: '5', done: false }
console.log(g.next()); // { value: 6, done: false }
console.log(g.next()); // { value: 7, done: false }
```

## `next()` 的参数

传递给 next()的参数值将被视为暂停生成器的最后一个 yield 表达式的结果。如下

```javascript
function* gen() {
  let a = yield 1;
  let b = yield a + 1;
}
let g = gen();
console.log(g.next()); // { value: 1, done: false }
console.log(g.next(2)); // { value: 3, done: false }
```

上面代码中 `g.next(2)` 中的参数 2 就作为了变量 `a` 的值

# 同步写法异步执行

有了上面生成器的几个特征，我们来想一下如果 `yield` 后面返回的是一个 `Promise` 对象会怎么样。很容易想到如果返回 `Promise` 对象的话我们可以在其回调函数中调用生成器的`next()` 方法来获取下一个`yield` 的执行结果

```JavaScript
function* gen() {
  let a = yield new Promise(resolve => setTimeout(() => resolve("first"), 1000));
  console.log("a=>", a);

  let b = yield new Promise(resolve => setTimeout(() => resolve("sec"), 1000));
  console.log("b=>", b);

  let c = yield new Promise(resolve => setTimeout(() => resolve("third"), 1000));
  console.log("c=>", c);
}
let g = gen();
g.next().value.then(first =>
  g.next(first).value.then(sec =>
    g.next(sec).value.then(third => g.next(third)))
);
// a=> first
// b=> second
// c=> third
```

下面调用`g.next().value`执行的代码基本是不变的，所以我们可以抽象一个简单的执行器出来。执行器的参数是一个生成器函数

```javascript
function runner(gen) {
  let g = gen();
  function invoke(arg) {
    let { value, done } = g.next(arg);
    // 如果遍历结束了,就不再执行
    if (done) {
      return value;
    }
    value.then(res => invoke(res));
  }
  invoke();
}
```

有了这个执行器我们就可以写一些异步操作了。尽管看起来像同步代码，但它的确是异步执行的

```javascript
runner(function*() {
  {
    let a = yield new Promise(resolve =>
      setTimeout(() => resolve("first"), 1000)
    );
    console.log("a=>", a);

    let b = yield new Promise(resolve =>
      setTimeout(() => resolve("sec"), 1000)
    );
    console.log("b=>", b);

    let c = yield new Promise(resolve =>
      setTimeout(() => resolve("third"), 1000)
    );
    console.log("c=>", c);
  }
});
// a=> first
// b=> second
// c=> third
```

上面也就是 [co 库](https://github.com/tj/co) 的基本原理, es7 之后出现了 `async` 和 `await` 的语法糖，基本原理也是如此。

关于 es7 的异步方法定义和使用如下，它会在 `res` 得到赋值后才会执行下一步代码

```javascript
async fn(){
  let res = await new Promise((resolve)=>...)
  ...
}
```
