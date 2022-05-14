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
  console.log(a)
  var a = 10;
  console.log(a)
  var a = 70;
  console.log(a)
  a = 80;
  console.log(a)
  if (true) {
    console.log(a)

    let a = 20;
    console.log(a)
    let a = 30;
    console.log(a)
    a = 40
    console.log(a)

    const a = 40;
    console.log(a)
    const a = 50;
    console.log(a)
    a = 60
    console.log(a)
  }
  console.log(a)
})()
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