/**
 * A callback is a function that is passed as an argument to another function,
 * and is executed later, usually after some operation is completed.
 */

const Users = [
    { name: "John", age: 25 },
    { name: "Jane", age: 30 },
    { name: "Bob", age: 35 },
    { name: "Alice", age: 40 }
]
function fetchUser(url,cb) {
    const frames = [".", "..", "..."]
    let i = 0
    const loading = setInterval(() => {
    process.stdout.write(`\rFetching data${frames[i++ % frames.length]}`); 
    }, 100)

    const stopLoading = () => {
        clearInterval(loading)
        process.stdout.write("\rData Fetched Successfully\n");
    }

    const response = Users.slice(0,url);
    setTimeout(() => {
        stopLoading()
        cb(response)
    }, 4000)
}

function displayUsers(users) {
    users.forEach(user => {
        console.log(`=============Name: ${user.name}, Age: ${user.age}=============`)
    })
}

fetchUser(2, displayUsers);