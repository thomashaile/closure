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