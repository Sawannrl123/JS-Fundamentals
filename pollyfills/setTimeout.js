(function () {
  let timerId = 0;
  const timers = {};

  window.setTimeout = function (callback, delay, ...args) {
    const id = ++timerId;
    timers[id] = true; // Mark timer as active

    function runTimer() {
      if (timers[id]) {
        callback(...args); // Call the provided function with any extra arguments
        delete timers[id]; // Remove reference after execution
      }
    }

    const start = Date.now();
    function checkTime() {
      if (!timers[id]) return; // Exit if cleared
      if (Date.now() - start >= delay) {
        runTimer();
      } else {
        requestAnimationFrame(checkTime);
      }
    }

    requestAnimationFrame(checkTime);
    return id;
  };

  window.clearTimeout = function (id) {
    delete timers[id];
  };
})();

// Using setTimeout polyfill
const timeoutId = setTimeout(() => {
  console.log("Executed after 3 seconds");
}, 3000);

// Clear timeout before it executes
clearTimeout(timeoutId);
