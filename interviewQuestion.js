// https://dmitripavlutin.com/javascript-closures-interview-questions/
// https://javascript.plainenglish.io/50-javascript-output-questions-818d45c3e381

call, bind, apply

----------------------------------
sum(1)(2)(3)()
sum(1, 2, 3)
----------------------------------

----------------------------------
const mul5 = multiply(5);
mul(5) // 25
mul(6) // 30
------------------------------------

------------------------------------
Sachine = { ballFaced: 0, runs: 0 };
Dravid = { ballFaced: 0, runs: 0 };
OnStrike = Sachine;
runs = [1,1,1,2,3,4,1,0,0,5,3,1,1,1,1,1,1,1]

Output:-
Sachine={ ballFaced: 10, runs: 15 }
Dravid={ ballFaced: 8, runs: 13 }
OnStrike=dravid
------------------------------------

----------------------------------
[2,3,4,2,4,3,5,5,6,7,8,2,3,3,3] 

{
  uniqueArr: [2, 3, 4, 5, 6, 7, 8],
  occurance: {
    2: 2,
    3: 5,
    4: 2,
    5: 2,
    6: 1,
    7: 1,
    8: 1
  },
  maxOcc: 3
}
-----------------------------------

---------------------------------------------
let number = 0;
console.log(number++);
console.log(++number);
console.log(number);
-----------------------------------------------


------------------------------
function sayHi() {
  return (() => 0)();
}

console.log(typeof sayHi());
----------------------------------

---------------------------------
console.log(typeof typeof 1);
---------------------------------

[...'Ayush'];

console.log(3 + 4 + '5');

-------------------------------

function createIncrement() {
    let count = 0;
    function increment() { 
      count++;
    }
    let message = `Count is ${count}`;
    function log() {
      console.log(message);
    }
    
    return [increment, log];
  }
  const [increment, log] = createIncrement();
  increment(); 
  increment(); 
  increment(); 
  log(); // What is logged?

-----------------------------------

-----------------------------------
for (var i = 0; i < 3; i++) {
    setTimeout(function log() {
      console.log(i); // What is logged?
    }, 1000);
  }
------------------------------------

------------------------------------
Find all triplets with zero sum

Input : arr[] = {0, -1, 2, -3, 1}
Output : (0 -1 1), (2 -3 1)
Explanation : The triplets with zero sum are
0 + -1 + 1 = 0 and 2 + -3 + 1 = 0 

https://www.geeksforgeeks.org/find-triplets-array-whose-sum-equal-zero/
-----------------------------------

------------------------------------
Minimum swaps required to bring all elements
less than or equal to k together

Input:  arr[] = {2, 1, 5, 6, 3}, k = 3
Output: 1

Explanation: 
To bring elements 2, 1, 3 together, swap 
element '5' with '3' such that final array
will be-
arr[] = {2, 1, 3, 6, 5}
------------------------------------

------------------------------------
const arr = [
  { fName: 'Mathura', lName: 'Naresh', age: 20 },
  { fName: 'Radhe', lName: 'Shyam', age: 22 },
  { fName: 'Bansi', lName: 'Wala', age: 25 },
  { fName: 'Murli', lName: 'Wala', age: 28 },
  { fName: 'Krishna', lName: 'Kanhiya', age: 30 }
]

const output = ['Murli Wala', 'Krishna Kanhiya']
------------------------------------

------------------------------------
var a = 10;
var a = 20;
a = 30;
console.log(a); // ?

let a = 10;
let a = 20;
a = 30;
console.log(a); // ?

const a = 10;
const a = 20;
a = 30;
console.log(a); // ?


(function abc() {
  console.log(a) //?
  var a = 10;
  console.log(a) //?
  var a = 70;
  console.log(a) //?
  a = 80;
  console.log(a) //?
  if (true) {
    console.log(a) //?

    let a = 20;
    console.log(a) //?
    let a = 30;
    console.log(a) //?
    a = 40
    console.log(a) //?

    const a = 40;
    console.log(a) //?
    const a = 50;
    console.log(a) //?
    a = 60
    console.log(a) //?
  }
  console.log(a) //?
})()
console.log(a) //?
------------------------------------

------------------------------------
function a(){
  var b=null;
  var c = undefined;
  var d;
  console.log(typeof b); //?
  console.log(typeof c); //?
  console.log(typeof d); //?
  if(b){
    console.log(b); //?
  }
  if(c){
    console.log(c); //?
  }
  if(d){
    console.log(d); //?
  }
}
------------------------------------


const obj = {
  name: {
    fname:'Test',
    lanme: 'demo'
  },
  age: 30
}

'Test Demo is 30 years old'

const arr = [10, 20, 30, 40, 50];

-------------------------------------

// console.log(processData(sum)(4)(2,2)(2,3)()); // 13
// console.log(processData(sum)(1)(2)(2)()); // 5
// console.log(processData(mul)(1)(1)(1)(1)(1)(1)()); // 1
// console.log(processData(mul)(1)(1)(1)(1)(2, 1)()); // 2
// console.log(processData(mul)(1, 1, 10, 0)(2, 1)());//0

function sum(a, b) {
  return a + b;
};

function mul(a, b) {
  return a * b;
};

// Solution
function processData(operation) {
    const initial = operation?.name === 'sum' ? 0 : 1;
    return function test(...a) {
        const aParams = a.reduce((prev, curr) => operation(prev, curr), initial);
        return function(...b) {
            if (b.length) {
                const bParams = b.reduce((prev, curr) => operation(prev, curr), initial);

                return test(operation(aParams, bParams));
            }
            return aParams;
        }
    }
}

console.log(processData(mul)(1, 1, 10, 0)(2, 1)());

-------------------------------------

// /* upperBandFilter(inputArray, threshold)
upperBandFilter([1,2,3,55,23,4,7,2,8,9,33], [
    (item) => {
        return item >= 7 ? 7 : item
    },
    (item) => {
        return item * 2
    },
    (item) => {
        return item + 2
    }
])

// // output: a) [1,2,3,7,7,4,7,2,7,7,7]
// // output: b) [2,4,6,14,14,8,14,4,14,14,14]
// // output: c) [4,6,8,16,16,10,16,6,16,16,16]

function upperBandFilter(inputArray, threshold) {
  const output = [];
  let arrCopy = [...inputArray];
  threshold.forEach(cb => {
    arrCopy = arrCopy.map((elem) => {
      return cb(elem);
    })
    output.push(arrCopy);
  });
  return output;
}

-------------------------------------

// // Input: num1 = "11", num2 = "123"
// // Output: "134"

function makeStringOfSpecificLength(str, len) {
  const zeroLength = len - str.length;
  const zeroArray = new Array(zeroLength).fill('0');
  return [...zeroArray, ...str];
}

function sumFromEnd(num1, num2) {
  const len = num1.length > num2.length ? num1.length : num2.length;
  const output = new Array(len+1);
  const num1Arr = num1.length === len ? num1 : makeStringOfSpecificLength(num1, len);
  const num2Arr = num2.length === len ? num2 : makeStringOfSpecificLength(num2, len);
  let carry = 0;

  for(let i=len-1; i>=0; i--) {
    const sum = (+num1Arr[i]) + (+num2Arr[i]) + carry;
    output[i+1] = sum%10;
    carry = sum>9 ? 1 : 0;
  }

  if (carry !== 0) output[0] = carry;

  return output.join('');
}

sumFromEnd("999", "999999");

-------------------------------------


const arr = [1, 30, 21, 2, 11, 31, 7, 6, 5];

// Write a promise function to only resolve data when the elem of arr[index] is in bound of 0 to 10

function inBound() {
  // code here
}

inBound().then(val => console.log(val)).catch(err => console.error(err));


