Promise.myTry = function (fn) {
  return new Promise((resolve, reject) => {
    try {
      // Call the function and check if it returns a promise
      const result = fn();
      if (result && typeof result.then === "function") {
        // If the result is a promise, wait for it to resolve or reject
        result.then(resolve, reject);
      } else {
        // If the result is not a promise, resolve it immediately
        resolve(result);
      }
    } catch (error) {
      // If the function throws an error, reject the promise
      reject(error);
    }
  });
};

// Synchronous function
Promise.try(() => {
  return "Hello, World!";
}).then((value) => {
  console.log(value); // Output: Hello, World!
});

// Function that throws an error
Promise.try(() => {
  throw new Error("Something went wrong!");
}).catch((error) => {
  console.error(error.message); // Output: Something went wrong!
});

// Function that returns a promise
Promise.try(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Async result"), 1000);
  });
}).then((value) => {
  console.log(value); // Output (after 1 second): Async result
});
