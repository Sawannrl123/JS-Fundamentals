/**
 * Implement a function in JavaScript that demonstrates infinite currying, allowing a function to accept an indefinite number of arguments over multiple calls. The function should calculate and return the cumulative result only when explicitly invoked (e.g., using a method like .value() or .toString()). The function should also support a limit parameter that restricts the number of chained calls.
 */

function curryWithLimit(operation = (a, b) => a + b, initial = 0, limit = 10) {
  let accumulator = initial;
  let count = 0;

  function curriedFunction(...args) {
    if (count >= limit) throw new Error("Chain limit exceeded!");
    count++;

    if (args.length > 0) {
      accumulator = args.reduce(operation, accumulator);
      return curriedFunction;
    } else {
      return accumulator;
    }
  }

  curriedFunction.value = () => accumulator;
  curriedFunction.toString = () => String(accumulator);

  return curriedFunction;
}

const addLimited = curryWithLimit();
console.log(addLimited(1)(2)(3).value()); // 6
// console.log(addLimited(4)(5)(6)(7)(8)(9)(10)(11)); // Throws an error
