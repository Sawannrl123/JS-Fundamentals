Promise.myWithResolvers = function () {
  let resolve, reject;

  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
};

const { promise, resolve, reject } = Promise.myWithResolvers();

promise
  .then((value) => {
    console.log("Resolved with:", value);
  })
  .catch((error) => {
    console.log("Rejected with:", error);
  });

// To resolve:
resolve("All good!"); // Output: Resolved with: All good!

// To reject:
reject("Something went wrong!");
