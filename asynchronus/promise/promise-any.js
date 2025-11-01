// The Promise.any() static method takes an iterable of promises as input and returns a single Promise. 

// This returned promise fulfills when any of the input's promises fulfills, with this first fulfillment value. 

// It rejects when all of the input's promises reject (including when an empty iterable is passed)

// The rejection reason is an AggregateError containing an array of rejection reasons in its errors property

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("p1")
    }, 300)
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("p2")
    }, 200)
});

const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("p3")
    }, 100)
});

const p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("p4")
    }, 400)
});


// [AggregateError: All promises were rejected] {
//   [errors]: [ 'p1', 'p2', 'p3' ]
// }
// const res = Promise.any([p1, p2, p3]);
// res.then(console.log, console.error);

// const res = Promise.any([p1, p2, p3, p4]);
// res.then(console.log, console.error); //p4


const res = Promise.any([p1, p2, p3.catch((error)=>console.log(error))]);
res.then(console.log, console.error); //p3 from console and => undefined from res then