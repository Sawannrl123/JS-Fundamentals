/**
 * Throtal Polyfill
 */
const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      const time = Date.now() - lastRan;

      lastFunc = setTimeout(function () {
        if (time >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - time);
    }
  };
};
