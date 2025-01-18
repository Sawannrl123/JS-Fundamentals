/**
 * Apply Polyfill
 */
Function.prototype.myApply = function (context, args1) {
  return this.call(context, ...args1);
};

Function.prototype.myApply2 = function (context, args1) {
  context.fn = this;
  return context.fn(...args1);
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

callMe.myApply2(basic, ["Maranpur", "Gaya"]);
