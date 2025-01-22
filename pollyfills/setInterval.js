(function () {
  let intervalId = 0;
  const intervals = {};

  window.setInterval = function (callback, delay, ...args) {
    const id = ++intervalId;
    intervals[id] = true; // Mark interval as active

    function runInterval() {
      if (!intervals[id]) return; // Exit if cleared
      callback(...args); // Execute the function
      start = Date.now(); // Reset the start time
      checkTime();
    }

    let start = Date.now();
    function checkTime() {
      if (!intervals[id]) return; // Exit if cleared
      if (Date.now() - start >= delay) {
        runInterval();
      } else {
        requestAnimationFrame(checkTime);
      }
    }

    requestAnimationFrame(checkTime);
    return id;
  };

  window.clearInterval = function (id) {
    delete intervals[id];
  };
})();

// Using setInterval polyfill
const intervalId = setInterval(() => {
  console.log("Running every 2 seconds");
}, 2000);

// Clear interval after 5 seconds
setTimeout(() => {
  clearInterval(intervalId);
  console.log("Interval cleared");
}, 5000);
