/**
 * Reduce Polyfill
 */
const arr = [1, 2, 3, 4, 5];

Array.prototype.myReduce = function (cb, acc) {
  if (!Array.isArray(this)) {
    throw new Error(this, "is not array. Reduce can be run on array only");
  }

  if (!cb) {
    throw new Error("Callback not provided");
  }

  if (typeof cb !== "function") {
    throw new Error("Callback should be function");
  }

  let result = acc ?? this[0];

  for (let i = 0; i < this.length; i++) {
    const elem = this[i];
    result = cb(result, elem, i, this);
  }

  return result;
};

/**
 * Example
 */
const result = arr.myReduce((acc, curr) => {
  return acc + curr;
}, 0);

console.log(result);
