Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    if (!promises || !Array.isArray(promises)) {
      return reject(new TypeError("Promise.allSettled() expects an array"));
    }

    if (promises.length === 0) {
      resolve([]);
      return;
    }

    let settled = false;

    promises.forEach(function (promise) {
      Promise.resolve(promise).then(
        function (value) {
          if (!settled) {
            settled = true;
            resolve(value);
          }
        },
        function (error) {
          if (!settled) {
            settled = true;
            reject(error);
          }
        }
      );
    });
  });
};

function sleep(time, value, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfill") {
        return resolve(value);
      } else {
        return reject(new Error(value));
      }
    }, time);
  });
}

const p1 = sleep(500, "one", "fulfill");
const p2 = sleep(100, "two", "fulfill");

Promise.myRace([p1, p2]).then((value) => {
  console.log(value); // "two"
  // Both fulfill, but p2 is faster
});

const p3 = sleep(100, "three", "fulfill");
const p4 = sleep(500, "four", "reject");

Promise.myRace([p3, p4]).then(
  (value) => {
    console.log(value); // "three"
    // p3 is faster, so it fulfills
  },
  (error) => {
    // Not called
  }
);

const p5 = sleep(500, "five", "fulfill");
const p6 = sleep(100, "six", "reject");

Promise.myRace([p5, p6]).then(
  (value) => {
    // Not called
  },
  (error) => {
    console.error(error.message); // "six"
    // p6 is faster, so it rejects
  }
);
