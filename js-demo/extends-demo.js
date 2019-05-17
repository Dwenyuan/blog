// function Super() {
//   this.name = "this is super";
// }
// Super.prototype.say = function() {
//   console.log(this.name);
// };
// function Sub() {}

// Sub.prototype = new Super();

// var ss = new Sub();

// ss.say();

// const person = {
//   name: "liu",
//   isHuman: false,
//   printIntroduction: function() {
//     console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
//   }
// };

// person.printIntroduction();

// function fn() {
//   console.log(a());
//   var a = 10;
//   function a() {
//     var a = 20;
//     console.log(a);
//   }
//   //   a();
// }
// fn();

// var source = { a: 1, b: 2 };
// function deepCopy(s) {
//   const d = {};
//   for (let k in s) {
//     if (typeof s[k] == "object") {
//       d[k] = deepCopy(s[k]);
//     } else {
//       d[k] = s[k];
//     }
//   }

//   return d;
// }
// var target = deepCopy(source);
// source.a = "a";
// console.log(source, target);

// var ss = { name: "liu" };
// function say(x, y) {
//   console.log(`hello ${this.name} ${x + y}`);
// }
// say.apply(ss, [1, 2]);
// say.call(ss, 1, 2);

// function debounce(fn, wait) {
//   wait = wait || 0;
//   var timer;
//   return function() {
//     if (timer) {
//       clearTimeout(timer);
//       timer = null;
//     }
//     timer = setTimeout(() => fn(), wait);
//   };
// }

// function throttle(fn, wait, options) {
//   wait = wait || 0;
//   var timerId,
//     lastTime = new Date().valueOf();

//   return function() {
//     var currentTime = new Date().valueOf();
//     if (currentTime > lastTime + wait) {
//       fn();
//       lastTime = currentTime;
//     } else {
//       if (timerId) {
//         clearTimeout(timerId);
//         timerId = null;
//       }
//       timerId = setTimeout(() => fn(), wait);
//     }
//   };
// }
// function delay(time) {
//   return new Promise(resolve => setTimeout(() => resolve(), time));
// }
// function test() {
//   console.log("hello");
// }
// var ff = throttle(test, 1000);
// (async () => {
//   while (true) {
//     ff();
//     await delay(300);
//     console.log("300");
//   }
// })();

// function CustomerEvent() {
//   this.events = {};
//   this.on = function(key, fn) {
//     if (this.events[key]) {
//       this.events[key].push(fn);
//     } else {
//       this.events[key] = [fn];
//     }
//   };
//   this.emit = function(key) {
//     const fns = this.events[key] || [];
//     fns.forEach(fn => fn());
//   };
// }

// const ce = new CustomerEvent();
// ce.on("add", function() {
//   console.log("add");
// });
// ce.on("add", function() {
//   console.log("add");
// });

// ce.emit("add");
// ce.emit("add");
