/**
 * Implement a retry mechanism in JavaScript that attempts to execute a function multiple times with a delay between each attempt if it fails. This mechanism should be flexible, reusable, and handle both synchronous and asynchronous functions.
 */

function retryWithDelay(fn, maxRetries, delay) {
  if (typeof fn !== "function") {
    reject(new Error("fn must be a function or a promise"));
  }
  if (typeof maxRetries !== "number") {
    reject(new Error("maxRetries must be a number"));
  }

  if (typeof delay !== "number") {
    reject(new Error("delay must be a number"));
  }

  return new Promise((resolve, reject) => {
    function attempt() {
      try {
        const val = fn();

        if (val instanceof Promise) {
          Promise.resolve(val).then(resolve, retry).catch(retry);
        } else {
          resolve(val);
        }
      } catch (error) {
        retry(error);
      }
    }

    const retry = (error) => {
      if (maxRetries === 0) {
        reject(error);
      } else {
        console.log(
          `Encountered an error:- ${error.message}. Retrying... in ${delay}ms`
        );
        maxRetries--;
        setTimeout(attempt, delay);
      }
    };

    attempt();
  });
}

let attempts = 0;
const faultyFunction = async () => {
  attempts++;
  if (attempts < 8) {
    throw new Error(`Failed attempt ${attempts}`);
  }
  return "Success!";
};

retryWithDelay(faultyFunction, 5, 1000)
  .then((result) => console.log(result))
  .catch((err) => console.error(err));
