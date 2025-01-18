/**
 * Map Polyfill
 */
const arr2 = [1, 2, 3, 4, 5];

// eslint-disable-next-line no-extend-native
Array.prototype.myMap = function (cb) {
  if (!Array.isArray(this)) {
    throw new Error(this, "is not array. Reduce can be run on array only");
  }

  if (!cb) {
    throw new Error("Callback not provided");
  }

  if (typeof cb !== "function") {
    throw new Error("Callback should be function");
  }

  let result = [];

  for (let i = 0; i < this.length; i++) {
    const elem = this[i];

    result.push(cb(elem, i, this));
  }

  return result;
};

/**
 * Example
 */
const result2 = arr2.myMap((elem) => {
  return elem > 1;
});

console.log(result2);
