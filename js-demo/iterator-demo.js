// let object = {};
// object[Symbol.iterator] = function() {
//   let index = 1;
//   return {
//     next: () => ({
//       value: index++,
//       done: index > 100
//     })
//   };
// };
// for (const item of object) {
//   console.log(item);
// }

// function* iter() {
//   yield 1;
//   yield 2;
//   yield 3;
//   yield 4;
//   yield 5;
// }
// const iterator = iter();
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());

// let object = {};
// object[Symbol.iterator] = iter;
// for (const i of object) {
//   console.log(i);
// }

// function* gen1() {
//   yield "gen1_1";
//   yield "gen1_2";
// }
// function* gen2() {
//   yield "gen2_1";
//   yield* gen1();
//   yield "gen2_2";
// }
// let gen = gen2();
// console.log(gen.next()); // { value: 'gen2_1', done: false }
// console.log(gen.next()); // { value: 'gen1_1', done: false }
// console.log(gen.next()); // { value: 'gen1_2', done: false }
// console.log(gen.next()); // { value: 'gen2_2', done: false }

// function* gen() {
//   yield* [1, 2, 3];
//   yield* "45";
//   yield* new Set([6, 7]);
// }
// let g = gen();
// console.log(g.next()); // { value: 1, done: false }
// console.log(g.next()); // { value: 2, done: false }
// console.log(g.next()); // { value: 3, done: false }
// console.log(g.next()); // { value: '4', done: false }
// console.log(g.next()); // { value: '5', done: false }
// console.log(g.next()); // { value: 6, done: false }
// console.log(g.next()); // { value: 7, done: false }

// function* gen() {
//   let a = yield 1;
//   let b = yield a + 1;
// }
// let g = gen();
// console.log(g.next()); // { value: 1, done: false }
// console.log(g.next(2)); // { value: 3, done: false }

// function* gen() {
//   let a = yield new Promise(resolve =>
//     setTimeout(() => resolve("hello"), 1000)
//   );
//   console.log(a);
// }
// let g = gen();
// let promise = g.next().value;
// promise.then(res => g.next(res));

// function* gen() {
//   let a = yield new Promise(resolve => setTimeout(() => resolve("first"), 1e3));
//   console.log("a=>", a);
//   let b = yield new Promise(resolve =>
//     setTimeout(() => resolve("second"), 1e3)
//   );
//   console.log("b=>", b);
//   let c = yield new Promise(resolve => setTimeout(() => resolve("third"), 1e3));
//   console.log("c=>", c);
// }
// let g = gen();
// g.next().value.then(first =>
//   g
//     .next(first)
//     .value.then(sec => g.next(sec).value.then(third => g.next(third)))
// );

function runner(gen) {
  let g = gen();
  function invoke(arg) {
    let { value, done } = g.next(arg);
    // 如果遍历结束了,就不再执行
    if (!done) {
      value.then(res => invoke(res));
    }
  }
  invoke();
}

runner(function*() {
  let a = yield new Promise(resolve => setTimeout(() => resolve("first"), 1e3));
  console.log("a=>", a);
  let b = yield new Promise(resolve =>
    setTimeout(() => resolve("second"), 1e3)
  );
  console.log("b=>", b);
  let c = yield new Promise(resolve => setTimeout(() => resolve("third"), 1e3));
  console.log("c=>", c);
});
