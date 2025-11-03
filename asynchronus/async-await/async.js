function promiseFn() {
    return new Promise((resolve, reject) => {
        console.log("point 1")
            resolve('promiseFn');
        console.log("point 2")
    });
}


// `async/await` is syntactic sugar over Promises.
// An `async` function always returns a Promise, and `await` pauses the execution of that function until the awaited Promise settles, then resumes it with the resolved value — without blocking the main thread.
// You cannot use await Outside an async function


async function asyncFn () {
    console.log("point 3")
    const result = await Promise.resolve("asyncFn");
    console.log("point 4")
    return result; //if dont write this then it log undefined not the value passed in resolve fn
}

// promiseFn().then(console.log);
asyncFn().then(console.log);