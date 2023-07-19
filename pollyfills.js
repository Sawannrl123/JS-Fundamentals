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
      clearTimeout(lastFunc);
      const time = Date.now() - lastRan;

      lastFunc = setTimeout(function() {
        if (time >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - time)
    }
  }
}

/**
 * bind Polyfill
 */
Function.prototype.mybind = function(context, ...args1) {
  let fn = this;
  return function (...args2) {
      return fn.apply(context, [...args1, ...args2])
  }
}

Function.prototype.mybind2 = function(context, ...args1) {
  context.fn = this;
  return function (...args2) {
      return context.fn(...[...args1, ...args2])
  }
}

/**
 * Call Polyfill
 */
Function.prototype.mycall = function(context, ...args1) {
  return this.apply(context, [...args1]);
}

Function.prototype.mycall2 = function(context, ...args1) {
  context.fn = this;
  return context.fn(...args1)
}

/**
 * Call Polyfill
 */
Function.prototype.myApply = function(context, args1) {
  return this.call(context, ...args1);
}

Function.prototype.myApply2 = function(context, args1) {
  context.fn = this;
  return context.fn(...args1)
}

let basic = {
  'name': 'Sawan',
  'age': 30
};



function callMe(street, city) {
  console.log({city, street});
  console.log('Hi! my name is ' + this.name + ' and my age is ' + this.age + ' and my street is ' + street + ' and city is ' + city);
}

let mycallBinded = callMe.mybind2(basic, 'Maranpur', 'Gaya');

mycallBinded('Bihar');

callMe.mycall2(basic, 'Maranpur', 'Gaya')
callMe.myApply2(basic, ['Maranpur', 'Gaya'])


/**
 * JSON.stringify Polyfill
 */
function stringyfyFn(value) {
	
	if (value == null || typeof value === 'function' || typeof value === 'symbol') {
  	return "null";
  }
  
  if (typeof value !== 'object') {
  	if (typeof value === 'string') {
    	return '"' + value + '"';
    }
    
    return String(value);
  }
  
  var isArray = Array.isArray(value);
  
  var result = [];
  
  for(var key in value) {
  	var element = value[key];
    var valueType = typeof element;
    
    if (valueType === 'undefined' || valueType === 'function' || valueType === 'symbol') {
    	continue;
    }
    
    if(!isArray) {
    	element = '"' + key + '":' + stringyfyFn(element);
    }
    
    result.push(element);
  }
  
  var jsonString = isArray ? "[" : "{";
  jsonString += result.join(",");
  jsonString+= isArray ? "]" : "}";
  
  return jsonString;
}

const test1 = 'sawan';
const test2 = 123;
const test3 = false;
const test4 = ['sawan', 123];
const test5 = {fname: 'sawan', age: 25, lname: 'kumar', fullname: function() { return this.fname + this.lname }, test: {fn: "test1", f2: 'test2'}}
const test6=function() {
 console.log("test6");
}
const test7={
	foo: 'foo',
}

test7.bar = test7;

console.log(stringyfyFn(test5));

export {
  debounce,
  throttle,
  stringyfyFn
}
