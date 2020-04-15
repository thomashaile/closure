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