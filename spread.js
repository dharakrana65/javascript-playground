// Spread syntax (...) allows an iterable (like an array, string, set, etc.) to be expanded into its individual elements in places where zero or more elements or arguments are expected.
// It is also used with objects to copy or merge properties into a new object.

// myFunction(...iterable);


// Only iterable values, like Array and String, can be spread in array literals and argument lists. Many objects are not iterable, including all plain objects that lack a Symbol.iterator method:

// In this example, we are calling a function that expects 3 parameters (a, b, c).
// However, we are using the spread syntax to pass in an array of 10 elements.
// JavaScript functions do not support polymorphism or overloading like in Java/C++,
// so even if we pass more arguments than the function declares, it does NOT treat it as a different function.
// Instead, the extra arguments are simply ignored (unless accessed via the 'arguments' object).

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function addAll(a, b, c) {
    console.log(arguments); // Output: [Arguments] { '0': 1, '1': 2, '2': 3, ... up to 10 }
    console.log(a, b, c);    // Output: 1 2 3 — only the first 3 arguments are assigned to named parameters
    return a + b + c;
}

let result = addAll(...array); // Only the first three values are used: 1 + 2 + 3
console.log(result);           // Output: 6

addAll() // No arguments passed, so a, b, c will be undefined

/**
 * This will set first parameter to 1, second to first element of array (1), and third to second element of array (2), 
 * and the rest will be ignored , result : // 1 + 1 + 2 = 4
 */
addAll(1 , ...array, 50)  
/**
 * Only iterable values, like Array and String, can be spread in array literals and argument lists.
 *  Many objects are not iterable, including all plain objects that lack a Symbol.iterator method:
 */

let obj = { a: 1, b: 2, c: 3 };
// let arr = [...obj]; // TypeError: obj is not iterable

/**
 * This is using object spread, which is different from array/function spread.
 * It copies properties from obj into a new object.
 * Then it overrides c with a new value (c: 3) — though in this case the value is the same.
 */
const obj2 = { ...obj, c: 3 }; // This works because the spread operator is used to copy properties from obj to obj2
console.log(obj2); // Output: { a: 1, b: 2, c: 3 }

/**
 * Here spread operator is same as apply() method.
 * It spreads the elements of the array args as individual arguments to the function myFunction.
 */
function myFunction(x, y, z) {
    console.log(x, y, z);
}
const args = [0, 1, 2];
myFunction.apply(null, args);
myFunction(...args);