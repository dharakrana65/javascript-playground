Once a Promise is settled (either fulfilled or rejected), we can handle its result using the following methods:
| Method       | Purpose                                                                      |
| ------------ | ---------------------------------------------------------------------------- |
| `.then()`    | Handle **fulfilled** (successful) result and **rejected** (error) result     |
| `.catch()`   | Handle **rejected** (error) result                                           |
| `.finally()` | Run code **regardless of outcome** (cleanup)                                 |


The .then() method is used to register callbacks for when a Promise settles:
promise.then(onFulfilled, onRejected);

If the Promise gets resolved, it calls onFulfilled(value)
If the Promise gets rejected, it calls onRejected(error) (if provided, otherwise you chain .catch())

What does .then() return?
.then() always returns a new Promise. which allows chaining



| Order                     | Valid?  | Description                                      |
| ------------------------- | ------  | ------------------------------------------------ |
| `.then().then().then()`   | ✅      | Chained success handlers                         |
| `.then().catch()`         | ✅      | Catch handles any error above                    |
| `.then().then().catch()`  | ✅      | Still catches any error from the chain above     |
| `.catch().then()`         | ✅      | `then` runs if the `catch()` handled the error   |
| `.catch().catch()`        | ✅      | Only the first `catch()` runs unless it rethrows |
| `.then().catch().then()`  | ✅      | Normal pattern: recover from error and continue  |
| `.then().catch().catch()` | ✅      | Second catch runs only if first rethrows error   |


---

## ✅ **Promise Chaining Rules**

### 🔁 **1. Any sequence is technically valid:**

You can chain in any order:

```js
promise.then().then().catch().then().finally();
```

or even:

```js
promise.catch().then().catch().finally();
```

---

### 🧨 **2. Error Propagation Behavior**

* If an **error is thrown** (either from inside a `then` or during the promise itself), it propagates **down** the chain until it is caught by the **nearest `.catch()`**.

  ```js
  Promise.resolve()
    .then(() => {
      throw new Error("Oops");
    })
    .then(() => {
      console.log("Won’t run");
    })
    .catch((err) => {
      console.log("Caught:", err.message); // ✅ will catch
    });
  ```

---

### 🛑 **3. A `.catch()` stops the error from propagating *further*** (unless it throws again):

```js
Promise.reject("Initial Error")
  .catch((err) => {
    console.log("Caught:", err);
    // return or end here = chain continues as success
  })
  .then(() => {
    console.log("Now back to success flow ✅");
  });
```

But if you **throw again** in `.catch()`:

```js
Promise.reject("Initial Error")
  .catch((err) => {
    console.log("Caught:", err);
    throw new Error("New Error");
  })
  .then(() => {
    console.log("Will be skipped ❌");
  })
  .catch((err) => {
    console.log("Caught again:", err.message); // ✅ Catches re-thrown error
  });
```

---

### ✅ **4. You can chain `.then()` after `.catch()`**

This is useful to resume normal flow:

```js
someAsync()
  .catch(() => {
    console.log("Handled error, can continue");
  })
  .then(() => {
    console.log("Runs even if there was an error earlier");
  });
```

---

### 🧹 **5. `.finally()` doesn't stop or modify the result**

It’s used for cleanup and always runs:

```js
doSomething()
  .then(() => console.log("Done"))
  .catch(() => console.log("Error"))
  .finally(() => console.log("Always runs"));
```

---
even if we have catch Error will be catched by first callback registered for onRejection.
```javascript
const p = Promise.reject("rejected");
function onSuccess(data) {
    console.log(data);
}
function onFailur(error) {
    console.error(error);
}
function onCatched(error) {
    console.log("error catched")
}
p
.then(onSuccess,onFailur)
.catch(onCatched)
```
---
## ✅ So the takeaway is:

* **Yes**, any chain order is valid.
* **Errors propagate downward** until caught by `.catch()`.
* **A `.catch()` stops** error propagation unless it throws again.
* **`.then()` after `.catch()` resumes the success path**.
* **`.finally()` always runs**, no matter what.


Promises are always asynchronous in their behavior, even if the computation inside them is synchronous.
You cannot "turn them into" synchronous constructs.

when you use .then(), no matter what you return (even undefined, null, or nothing at all), it always wraps the result in a Promise.