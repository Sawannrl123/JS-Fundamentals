/**
 * bind Polyfill
 */
Function.prototype.mybind = function (context, ...args1) {
  let fn = this;
  return function (...args2) {
    return fn.apply(context, [...args1, ...args2]);
  };
};

Function.prototype.mybind2 = function (context, ...args1) {
  context.fn = this;
  return function (...args2) {
    return context.fn(...[...args1, ...args2]);
  };
};

/**
 * Example
 */
let basic = {
  name: "Sawan",
  age: 30,
};

function callMe(street, city) {
  console.log({ city, street });
  console.log(
    "Hi! my name is " +
      this.name +
      " and my age is " +
      this.age +
      " and my street is " +
      street +
      " and city is " +
      city
  );
}

let mycallBinded = callMe.mybind2(basic, "Maranpur", "Gaya");

mycallBinded("Bihar");
