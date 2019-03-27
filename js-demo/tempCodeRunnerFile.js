function* gen() {
  let a = yield new Promise(resolve => setTimeout(() => resolve("first"), 1e3));
  console.log("a=>", a);
  let b = yield new Promise(resolve => setTimeout(() => resolve("sec"), 1e3));
  console.log("b=>", b);
  let c = yield new Promise(resolve => setTimeout(() => resolve("third"), 1e3));
  console.log("c=>", c);
}
let g = gen();
g.next().value.then(first =>
  g
    .next(first)
    .value.then(sec => g.next(sec).value.then(third => g.next(third)))
);
