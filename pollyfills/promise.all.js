Promise.myAll = function (promises) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Promise.all() expects an array"));
    }

    if (!promises || promises.length === 0) {
      resolve([]);
      return;
    }

    var resolved = 0;
    var results = [];
    promises.forEach(function (promise, i) {
      promise.then(function (result) {
        resolved++;
        results[i] = result;
        if (resolved === promises.length) {
          resolve(results);
        }
      }, reject);
    });
  });
};

/**
 *
 * Example
 */
const promise1 = Promise.resolve(3);
const promise4 = Promise.reject("Rejected");
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

Promise.myAll([promise1, promise4, promise2, promise3])
  .then((values) => {
    console.log(values);
  })
  .catch((err) => {
    console.error(err);
  });
