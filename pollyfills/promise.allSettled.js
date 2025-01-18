Promise.myAllSettled = function (promises) {
  return new Promise((resolve, reject) => {
    if (!promises || !Array.isArray(promises)) {
      return reject(new TypeError("Promise.allSettled() expects an array"));
    }

    if (promises.length === 0) {
      resolve([]);
      return;
    }

    let allSetteled = 0;
    const result = new Array(promises.length);

    function settle(index, data) {
      result[index] = data;
      allSetteled++;

      if (allSetteled === promises.length) {
        resolve(result);
      }
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(
          (data) => {
            settle(index, { status: "fulfilled", value: data });
          },
          (error) => {
            settle(index, { status: "rejected", reason: error });
          }
        )
        .catch((error) => {
          settle(index, { status: "rejected", reason: error });
        });
    });
  });
};

const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, "foo")
);
const promises = [promise1, promise2];

Promise.myAllSettled(promises).then((results) =>
  results.forEach((result) => console.log(result.status))
);
