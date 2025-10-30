function executorFn(resolve, reject) {
    let success = true
    if(success == true) {
        resolve("DATA")
    }

    reject("ERROR")
}

const p = new Promise(executorFn);
console.log(p)
p.then((data) => {
    console.log(data);
})

const p1 = Promise.resolve(42);
p1.then(console.log); // 42