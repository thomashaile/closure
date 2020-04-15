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