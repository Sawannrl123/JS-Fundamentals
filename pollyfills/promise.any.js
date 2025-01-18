Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    if (!promises || !Array.isArray(promises)) {
      return reject(new TypeError("Promise.allSettled() expects an array"));
    }

    if (promises.length === 0) {
      resolve([]);
      return;
    }

    let errors = [];
    let resolved = false;

    promises.forEach(function (promise) {
      Promise.resolve(promise).then(
        function (value) {
          if (!resolved) {
            resolved = true;
            resolve(value);
          }
        },
        function (error) {
          errors.push(error);
          if (errors.length === promises.length) {
            reject(new AggregateError("All promises were rejected", errors));
          }
        }
      );
    });
  });
};

const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, "quick")
);
const promise3 = new Promise((resolve, reject) =>
  setTimeout(reject, 500, "slow")
);

const promises = [promise1, promise3, promise2];

Promise.myAny(promises)
  .then((value) => console.log(value))
  .catch((err) => console.error(err));
