/**
 * Debounce Polyfill
 */
const debounce = (func, delay) => {
  let clearTimer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(clearTimer);
    clearTimer = setTimeout(() => func.apply(context, args), delay);
  }
}

/**
 * Throtal Polyfill
 */
const throttle = (func, limit) => {
  let lastFunc
  let lastRan
  return function() {
    const context = this
    const args = arguments
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}

export {
  debounce,
  throttle
}