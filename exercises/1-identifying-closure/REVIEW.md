# event-loop 

## /1-identifying-closure

> pass: 4/16/2020, 01:30:16 

[../REVIEW.md](../REVIEW.md)

* [/example-1-returning-functions.js](#example-1-returning-functionsjs) - example - pass
* [/example-2-never-creates-closure.js](#example-2-never-creates-closurejs) - example - pass
* [/example-3-always-creates-closure.js](#example-3-always-creates-closurejs) - example - pass
* [/example-4-sometimes-creates-closure-a.js](#example-4-sometimes-creates-closure-ajs) - example - pass
* [/example-5-sometimes-creates-closure-b.js](#example-5-sometimes-creates-closure-bjs) - example - pass

---

## /example-1-returning-functions.js

* example - pass
* [review source](./example-1-returning-functions.js)

```txt
+ PASS : no closure created, the returned function was declared outside of "returnsOldfunction"
+ PASS : a closure is created! the returned function was declared inside of "returnsNewFunction"
```

```js
// functions can return functions that were passed as arguments

const argFunc = () => { };

const returnsOldFunction = (x) => { return x }; // does not create a closure

const sameFunctionAsArgument = returnsOldFunction(argFunc);
console.assert(sameFunctionAsArgument === argFunc,
  'no closure created, the returned function was declared outside of "returnsOldfunction"');;


const returnsNewFunction = (x) => {
  return function () { console.log(x) };
}
const newFunction = returnsNewFunction("hi!");
console.assert(newFunction !== argFunc,
  'a closure is created! the returned function was declared inside of "returnsNewFunction"');

// study this function call in JS Tutor to see closure in action:
newFunction();

```

[TOP](#event-loop)

---

## /example-2-never-creates-closure.js

* example - pass
* [review source](./example-2-never-creates-closure.js)

```txt
+ PASS : ... when passed 4
+ PASS : ... when passed a function
+ PASS : ... when passed an array
+ PASS : ... when passed itself
```

```js
// any function that returns a new function creates a closure
// returning a function that was passed as an argument does not create a closure
// the returned function must be declared inside the function call ("frame" on js tutor)

const doesItClose = (func, arg) => {
    const returnVal = func(arg);
    const returnedAFunction = typeof returnVal === 'function';
    const returnedArgument = arg === returnVal;

    const createsAClosure = returnedAFunction && !returnedArgument;
    return createsAClosure;
}

const never = (x) => {
    return x;
}

const whenPassed4 = doesItClose(never, 4);
console.assert(whenPassed4 === false, "... when passed 4"); //returns false

const whenPassedAFunction = doesItClose(never, function() {});
console.assert(whenPassedAFunction === false, "... when passed a function"); //returns false

const whenPassedAnArray = doesItClose(never, []);
console.assert(whenPassedAnArray === false, "... when passed an array"); //returns false

const whenPassedItself = doesItClose(never, never);
console.assert(whenPassedItself === false, "... when passed itself"); //returns false
```

[TOP](#event-loop)

---

## /example-3-always-creates-closure.js

* example - pass
* [review source](./example-3-always-creates-closure.js)

```txt
+ PASS : ... when passed 4
+ PASS : ... when passed a function
+ PASS : ... when passed an array
+ PASS : ... when passed itself
```

```js
// any function that returns a new function creates a closure
// returning a function that was passed as an argument does not create a closure
// the returned function must be declared inside the function call ("frame" on js tutor)

const doesItClose = (func, arg) => {
    const returnVal = func(arg);
    const returnedAFunction = typeof returnVal === 'function';
    const returnedArgument = arg === returnVal;

    const createsAClosure = returnedAFunction && !returnedArgument;
    return createsAClosure;
}

const always = (x) => {
    return function() {
        console.log(x)
    };
}

const whenPassed4 = doesItClose(always, 4);
const alwaysLogs4 = always(4);
console.assert(whenPassed4 === true, "... when passed 4"); //added this test assertion and returns true

const whenPassedAFunction = doesItClose(always, function bye() {});
const alwaysLogsHi = always(function hi() {});
console.assert(whenPassedAFunction === true, "... when passed a function"); //added this test assertion and returns true

const whenPassedAnArray = doesItClose(always, []);
const alwaysLogsArray = always([]);
console.assert(whenPassedAnArray === true, "... when passed an array"); //added this test assertion and returns true

const whenPassedItself = doesItClose(always, always);
const alwaysLogsAlways = always(always);
console.assert(whenPassedItself === true, "... when passed itself"); //added this test assertion and returns true

alwaysLogs4(), alwaysLogsHi(), alwaysLogsArray(), alwaysLogsAlways();
alwaysLogs4(), alwaysLogsHi(), alwaysLogsArray(), alwaysLogsAlways();
```

[TOP](#event-loop)

---

## /example-4-sometimes-creates-closure-a.js

* example - pass
* [review source](./example-4-sometimes-creates-closure-a.js)

```txt
+ PASS : ... when passed 4
+ PASS : ... when passed itself
+ PASS : ... when passed a function
```

```js
const doesItClose = (func, arg) => {
    const returnVal = func(arg);
    const returnedAFunction = typeof returnVal === 'function';
    const returnedArgument = arg === returnVal;

    const createsAClosure = returnedAFunction && !returnedArgument;
    return createsAClosure;
}

const sometimes1 = (x) => {
    if (typeof x === "function") {
        return x;
    } else {
        return function() {
            console.log(x)
        };
    }
}

const whenPassed4 = doesItClose(sometimes1, 4);
const resultFrom4 = sometimes1(4);
resultFrom4();
console.assert(whenPassed4 === true, "... when passed 4"); //added this test assertion and returns true

const whenPassedItself = doesItClose(sometimes1, sometimes1);
const resultFromItself = sometimes1(sometimes1);
resultFromItself();
console.assert(whenPassedItself === false, "... when passed itself"); //added this test assertion and returns false

const bye = () => console.log(x);
const whenPassedAFunction = doesItClose(sometimes1, bye);
//const hi = () => console.log(x);//x is not defined
//const resultFromFunction = sometimes1(hi);
//resultFromFunction();
console.assert(whenPassedAFunction === false, "... when passed a function"); //added this test assertion and returns false
```

[TOP](#event-loop)

---

## /example-5-sometimes-creates-closure-b.js

* example - pass
* [review source](./example-5-sometimes-creates-closure-b.js)

```txt
+ PASS : ... when passed a function
+ PASS : ... when passed itself
+ PASS : ... when passed 4
```

```js
const doesItClose = (func, arg) => {
    const returnVal = func(arg);
    const returnedAFunction = typeof returnVal === 'function';
    const returnedArgument = arg === returnVal;

    const createsAClosure = returnedAFunction && !returnedArgument;
    return createsAClosure;
}

const sometimes2 = (x) => {
    if (typeof x === "function") {
        return function() {
            console.log(x)
        };
    } else {
        return x;
    };
}

const bye = () => console.log(x);
const whenPassedAFunction = doesItClose(sometimes2, bye);
const hi = () => console.log(x);
const resultFromFunction = sometimes2(hi);
resultFromFunction();
console.assert(whenPassedAFunction === true, "... when passed a function"); //added this test assertion and returns true

const whenPassedItself = doesItClose(sometimes2, sometimes2);
const resultFromItself = sometimes2(sometimes2);
resultFromItself();
console.assert(whenPassedItself === true, "... when passed itself"); //added this test assertion and returns true

const whenPassed4 = doesItClose(sometimes2, 4);
const resultFrom4 = sometimes2(4);
//resultFrom4(); //not closure function
console.assert(whenPassed4 === false, "... when passed 4"); //added this test assertion and returns false
```

[TOP](#event-loop)

