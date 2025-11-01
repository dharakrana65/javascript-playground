// const p1 = Promise.all([Promise.reject(1), Promise.resolve(2), Promise.reject(undefined)]);
// p1.then(console.log,console.error);

// const p2 = Promise.all([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3).then((val)=>console.log(val))]);
// p2.then(console.log,console.error);

//###Promise.all() starts executing all promises immediately, in parallel.###
// const pro1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject("pro1")
//     }, 3000)
// })

const pro2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("pro2")
    }, 1000)
})

const pro3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("pro3")
    }, 2000)
})

// const p3 = Promise.all([pro1, pro2])
// p3.then(console.log, console.error) //pro2


console.log("===================================",pro2.catch((error)=>console.log())) // this will show pending because we are not running it immediatly , just logging fn registration 
// const p4 = Promise.all([pro1, pro2.catch((error)=>console.log)])
// p4.then(console.log, console.error) //pro1 , Because pro2 handled by catch and then it will return new pending promise

const p5 = Promise.all([pro3, pro2.catch((error)=>console.log)]); // here pro2.catch((error)=>console.log return fullfilled promise with undefined value 
p5.then(console.log, console.error);