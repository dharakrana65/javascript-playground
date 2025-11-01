// In JavaScript, the rest operator (...) is a syntax used to collect multiple elements into a single array. It allows functions to accept an indefinite number of arguments as an array, or to collect the remaining elements of an object or array during destructuring.

// There are some additional syntax restrictions:

// A function definition can only have one rest parameter. The rest parameter must be the last parameter in the function definition. Trailing commas are not allowed after the rest parameter. The rest parameter cannot have a default value.

const sum = (...args) => {
    console.log(args);
    let total = 0;
    for (let arg of args) {
        total += arg;
    }
    return total;
}

console.log(sum())