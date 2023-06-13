const STATE = {
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED",
};

function isThenable(val) {
  return val instanceof MyPromise;
}
class MyPromise {
  constructor(callback) {
    this.state = STATE.PENDING;
    this.value = undefined;
    this.handlers = [];
    try {
      callback(this._resolve, this._reject);
    } catch (err) {
      this._reject(err);
    }
  }

  _resolve = (value) => {
    this.updateResult(value, STATE.FULFILLED);
  };

  _reject = (error) => {
    this.updateResult(error, STATE.REJECTED);
  };

  updateResult(value, state) {
    // This is to make the processing async
    setTimeout(() => {
      // process the promise if it is still in pending state
      if (this.state !== STATE.PENDING) {
        return;
      }

      // check is value is also a promise
      if (isThenable(value)) {
        return value.then(this._resolve, this._reject);
      }

      this.value = value;
      this.state = state;

      // execute handlers if already attached
      this.executeHandlers();
    }, 0);
  }

  addHandlers(handlers) {
    this.handlers.push(handlers);
    this.executeHandlers();
  }

  executeHandlers() {
    // Don't execute handlers if promise is not yet fulfilled or rejected
    if (this.state === STATE.PENDING) {
      return null;
    }

    // We have multiple handlers because add them for .finally block too
    this.handlers.forEach((handler) => {
      if (this.state === STATE.FULFILLED) {
        return handler.onSuccess(this.value);
      }
      return handler.onFail(this.value);
    });
    // After processing all handlers, we reset it to empty.
    this.handlers = [];
  }

  then(onSuccess, onFail) {
    return new MyPromise((res, rej) => {
      this.addHandlers({
        onSuccess: function (value) {
          // if no onSuccess provided, resolve the value for the next promise chain
          if (!onSuccess) {
            return res(value);
          }
          try {
            return res(onSuccess(value));
          } catch (err) {
            return rej(err);
          }
        },
        onFail: function (value) {
          // if no onFail provided, reject the value for the next promise chain
          if (!onFail) {
            return rej(value);
          }
          try {
            return res(onFail(value));
          } catch (err) {
            return rej(err);
          }
        },
      });
    });
  }

  // Since then method take the second function as onFail, we can leverage it while implementing catch
  catch(onFail) {
    return this.then(null, onFail);
  }

  // Finally block returns a promise which fails or succeedes with the previous promise resove value
  finally(callback) {
    return new MyPromise((res, rej) => {
      let val;
      let wasRejected;
      this.then(
        (value) => {
          wasRejected = false;
          val = value;
          return callback();
        },
        (err) => {
          wasRejected = true;
          val = err;
          return callback();
        }
      ).then(() => {
        // If the callback didn't have any error we resolve/reject the promise based on promise state
        if (!wasRejected) {
          return res(val);
        }
        return rej(val);
      });
    });
  }
}

const testPromiseWithLateResolve = new MyPromise((res, rej) => {
  setTimeout(() => {
    res("Promise 1 is resolved");
  }, 1000);
});

testPromiseWithLateResolve.then((val) => {
  console.log(val);
});

const testPromiseWithLateReject = new MyPromise((res, rej) => {
  setTimeout(() => {
    rej("Promise 2 is rejected");
  }, 1000);
});

testPromiseWithLateReject
  .then((val) => {
    console.log(val);
  })
  .catch((err) => {
    console.log(err);
  });

const testPromiseWithRejectFinally = new MyPromise((res, rej) => {
  setTimeout(() => {
    rej("Promise 2 is rejected");
  }, 1000);
});

testPromiseWithRejectFinally
  .finally(() => {
    console.log("finally called");
  })
  .catch((err) => {
    console.log("value rejected after finally", err);
  });

const testPromiseWithEarlyResolve = new MyPromise((res, rej) => {
  res("Promise 3 is resolved early");
});

setTimeout(() => {
  testPromiseWithEarlyResolve.then((val) => {
    console.log(val);
  });
}, 3000);
