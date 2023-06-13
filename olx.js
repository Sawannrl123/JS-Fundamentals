var a = 1;
var b = a;
a = 2;
console.log(b); //?

var x = [1, 2, 3];
var y = x;
x[0] = 2;
console.log(y[0]); //?

x = [10, 20, 30];
console.log(y[0]); //?

function main() {
  console.log(this); // ?
  this.name = "Ironman";
  var sayHiObj = {
    name: "Batman",
    sayHi: () => {
      var self = this;
      console.log(this.name); // ?,
      (function () {
        console.log(this.name); // ?,
        console.log(self.name); // ?,
      })();
    },
    sayHello: function () {
      var self = this;
      console.log(this.name); // ?,
      (function () {
        console.log(this.name); // ?,
        console.log(self.name); // ?,
      })();
    },
  };

  sayHiObj.sayHi();
  sayHiObj.sayHello();
}

main();

function asyncFunction(a, b, callback) {
  const isError = Math.random() > 0.7;
  setTimeout(() => {
    if (isError) {
      callback(null, new Error("Something went wrong"));
      return;
    }

    callback(a + b, null);
  }, 3000);
}

function asyncFunction2(a, b, callback) {
  const isError = Math.random() > 0.7;
  setTimeout(() => {
    if (isError) {
      callback(null, new Error("Something went wrong"));
      return;
    }

    callback(a * b, null);
  }, 3000);
}

function promisify(fn) {
  return function (a, b) {
    return new Promise((resolve, reject) => {
      fn(a, b, function (result, error) {
        if (error) reject(err);
        resolve(result);
      });
    });
  };
}

asyncFunction(1, 2, function (result, err) {
  console.log(result, err);
});

const promisifiedFn = promisify(asyncFunction);
const promisifiedFn2 = promisify(asyncFunction2);

promisifiedFn(1, 2)
  .then((res) => {
    console.log("result", res);
  })
  .catch(console.log);

function memoized(fn) {
  let cache = {};

  return (a, b) => {
    const key = `${a}_${b}`;
    if (key in cache) {
      return cache[key];
    } else {
      let result = fn(a, b);
      cache[key] = result;
      return result;
    }
  };
}

function fun(a, b) {
  for (let i = 0; i < 10000; i++) {}
  return a + b;
}

function fun2(a, b) {
  for (let i = 0; i < 10000; i++) {}
  return a * b;
}

let memoFun = memoized(fun);

// memoFun(1, 2);
// memoFun(1, 2);
// memoFun(1, 3);

console.log("1st Call", logExecutionTime(memoFun, [1, 2]));
console.log("2nd call", logExecutionTime(memoFun, [2, 1]));
console.log("3rd call", logExecutionTime(memoFun, [1, 3]));

function logExecutionTime(fn, args) {
  const start = console.time("fn");
  const result = fn(...args);
  console.timeEnd("fn");
  return result;
}

function compose(...funcs) {
  return function (str) {
    funcs.reverse().map((fn) => (str = fn(str)));
    return str;
  };
}

const loud = (str) => str.toUpperCase();
const bold = (str) => str.bold();
const repeat = (str) => str.repeat(3);

// console.log(bold(loud(repeat("hello"))));
// console.log(bold(loud(repeat("hehekllo"))));

const boldloudandrepeat = compose(bold, loud, repeat);

console.log(boldloudandrepeat("hello"));

/**
 * 2nd Round
 */

var name = "olx";
var myObject = {
  name: "myObject",
  property: this.name,
  regularFunction: function () {
    return this.name;
  },
  arrowFunction: () => {
    return this.name;
  },
  iife: (function () {
    return this.name;
  })(),
};
// this.name - olx
// myObject.name - myObject
// myObject.property - myObject
// myObject.iife - olx
// const regFn = myObject.regularFunction;
// regFn.call(myObject) - myObject
// regFn() - olx
//  regFn.call(window) - olx
// myObject.arrowFunction.call(myObject) - olx
// myObject.arrowFunction() - olx
//  myObject.arrowFunction.call(window) - olx

//const _ = require('lodash');
const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  let firstRan;
  return function () {
    const args = arguments;
    const context = this;
    if (!firstRan) {
      func.apply(context, args);
      firstRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        func.apply(context, args);
        lastRan = Date.now();
      }, limit);
    }
  };
};

function handler(args) {
  console.log(args);
}

const xy = throttle(handler, 5000);
xy("a");
xy("b");
xy("c");
xy("d");

const mountTimeStamp = Date.now();

const comp = (props) => {
  const mountTimeStamp = useRef(Date.now());
  useEffect(() => {
    console.log(mountTimeStamp.current);
  }, [...props]);
  return null;
};

/**
 * 3rd round
 */

const str = "aabbbbbbbccaa";

const list = {};
str.split("").map((char) => {
  if (char in list) {
    list[char] += 1;
  } else {
    list[char] = 1;
  }
});

let max = 0;
let maxKey;

Object.entries(list).map(([key, value]) => {
  if (max < value) {
    max = value;
    maxKey = key;
  }
});
console.log(maxKey);

function deepClone(obj) {
  if (typeof obj !== "object") return obj;
  if (!obj) return obj;
  let dup = obj instanceof Array ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      dup[i] = deepClone(obj[i]);
    }
  }
  return dup;
}

console.log(deepClone({a: 1, b: "sawan"}));

//----------------------------------------------

function makeKey(arr) {
  const sortedParameter = arr.map(a => {
      if (Array.isArray(a)) {
          return a.sort();
      } else if (typeof a === 'object') {
          return Object.keys(a).sort().reduce((obj, val) => {
              obj[val] = a[val];
              return obj;
          }, {})
      }
      return a;
  });

  return JSON.stringify(sortedParameter);
}

function memoize(fn) {
  const hashMap = new Map();

  return function(...args) {
      const rest = args.slice(0, -1);
      const key = makeKey(rest);
      const callback = args[args.length - 1];

      if (hashMap.has(key)) {
          console.log('From Cache');
          const { error, data } = hashMap.get(key);

          callback(error, data);
          return { error, data };
      }

      console.log('From Execution');
      fn(...rest, function(error, data) {
          hashMap.set(key, { error, data });
          callback(error, data);
      });
  }
}

function slowFunction(arg1, arg2, callback) {
  setTimeout(() => {
      callback(null, {
          response1: arg1,
          response2: arg2
      });
  }, 1000);
}

slowFunction('test', 'function', function(error, data) {
  // response after 1 sec 
  console.log({error, data})

  slowFunction('test', 'function', function(error, data) {
      // response after 1 sec 
      console.log({error, data})
  }) 
});

const fastFunction = memoize(slowFunction);

fastFunction('test', 'function', function(error, data) {
  // response after 1 sec 
  console.log({error, data})

  fastFunction('test', 'function', function(error, data) {
      // immediate response
      console.log({error, data})
  }) 
});
// -----------------------------------------------------------------------------

// Read site-cacher

//https://www.cognitoforms.com/SunriseMentorsPvtLtd/InterviewExperience#lewDqLsbn2rkysoWjiLEIlzatU3kCbh1JVuHb4a1RNA$*