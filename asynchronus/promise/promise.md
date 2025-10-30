# JavaScript Promises – Detailed Revision Notes

A **Promise** in JavaScript is an object that represents the eventual result of an asynchronous operation. It acts like a **placeholder** for a value that you don’t have yet but will receive in the future, either **successfully** (fulfilled) or **unsuccessfully** (rejected).

---

## 1. Conceptual Structure of a Promise

Conceptually, a promise object can be represented as:

```javascript
// Conceptual internal structure
{
  state: "pending" | "fulfilled" | "rejected",
  value: <result>,        // value or error
  handlers: [ ...callbacks ]  // registered .then() / .catch() callbacks
}
```

---

## 2. Creating a Promise

You create a promise by calling the `Promise` constructor with an **executor function**:

```javascript
const promise = new Promise((resolve, reject) => {
  let success = true;

  if (success) {
    resolve("Succeeded");
  } else {
    reject("Failed");
  }
});
```

### Step-by-step:

1. JavaScript **creates a new Promise object**.
2. It internally prepares two functions: `resolve` and `reject`.
3. It passes these functions into your executor function.
4. Your **executor runs immediately**, synchronously on the **call stack**.
5. The **Promise object is returned**.

---

## 3. Conceptual Internal Implementation

```javascript
// Conceptual internal view
class Promise {
  constructor(executor) {
    const resolve = (value) => { /* change internal state to fulfilled, store value */ }
    const reject  = (error) => { /* change internal state to rejected, store error */ }

    executor(resolve, reject); // executor runs immediately
  }
}
```

* `executor` runs **synchronously** on the call stack.
* `resolve` and `reject` are **handlers** managed internally and executed later via the **microtask queue**.

---

## 4. Executor Function

* The **executor** function is where you start your async work (API calls, timers, I/O, etc.).
* It receives **two arguments**: `resolve` and `reject`.
* You **must call** either `resolve(value)` or `reject(error)` to settle the promise.
* If the executor contains **only synchronous code** (like `console.log`) and never calls `resolve` or `reject`, the promise will **remain pending forever**.

```javascript
const p = new Promise(() => {
  console.log("Just logging…");
});
// p is pending forever
```

---

## 5. Promises Do NOT Make Code Asynchronous

* Promises themselves **do not create asynchronous behavior**.
* Async behavior comes from **JavaScript runtime / Web APIs / Node.js APIs** (like `setTimeout`, `fetch`, I/O).
* Promises only **wrap asynchronous results** and provide a **mechanism to react** when they settle.

---

## 6. `.then()` Method

* `.then()` is an instance method of the Promise object.
* It **registers a callback** to be executed when the promise is **fulfilled**.
* The callback **never runs immediately**, even if the promise is already resolved.
* Instead, the callback is **scheduled in the microtask queue** to run after the current synchronous code finishes.

```javascript
const p = Promise.resolve(42);

p.then((val) => console.log("Then:", val));
console.log("After promise");
```

**Output:**

```
After promise
Then: 42
```

* `resolve(42)` schedules the `.then()` callback in the **microtask queue**.
* The callback executes **after the current call stack is cleared**.

---

## 7. Event Loop and Microtask Queue Flow

1. **Executor runs** synchronously on the call stack.
2. `resolve()` or `reject()` is called → promise state changes.
3. `.then()` or `.catch()` callbacks are **added to the microtask queue**.
4. Current **call stack finishes**.
5. Event loop picks **microtasks** and executes them.

```
Call Stack: executor runs → resolve called
Microtask Queue: then callback added
Event Loop: call stack clears → execute microtasks
```

---

## ✅ Key Takeaways

* A **Promise is a stateful object**: `pending` → `fulfilled` or `rejected`.
* **Executor runs synchronously**, immediately when the promise is created.
* `resolve` and `reject` **schedule callbacks in the microtask queue**.
* `.then()` callbacks **always run asynchronously**, even for already resolved promises.
* **Promises do not make code asynchronous**; they organize and manage async results.
* If `res
