/**
 * Site Referance https://www.debuggr.io/js-this-in-depth/
 */
/**
 * Example 1
 */
function logThis(){
  console.log("Example 1 ", this);
}

const myObj = {
  logThis
}

myObj.logThis();

// Ans:- myObj

/**
 * Example 2
 */
 function logThis1(){
  console.log("Example 2 ", this);
}

const myObj1 = {
  foo: function(){
    logThis1();
  }
}

myObj1.foo()

// Ans:- window

/**
 * Example 3
 */

const logThis2 = () => {
  console.log("Example 3 ", this);
}

const myObj2 = {
  foo: logThis2
}

myObj2.foo()

// Ans:- window

/**
 * Example 4
 */
function logThis3() {
  console.log("Example 4 ", this);
}

const myObj3 = { name: "sag1v" }

logThis3.apply(myObj3)

// Ans:- myObj3

/**
 * Example 5
 */
const logThis4 = () => {
  console.log("Example 5 ", this);
}

const myObj4 = { name: "sag1v" }

logThis4.apply(myObj4)

// Ans:- window

/**
 * Example 6
 */
function logThis5(){
  console.log("Example 6 ", this);
}

const someObj = new logThis5()

// Ans:- The object created by logThis5

/**
 * Example 7
 */

function logThis6(){
  'use strict'
  console.log("Example 7 ", this);
}

function myFunc(){
  logThis6();
}

const someObj1 = new myFunc()

// Ans:- undefined

/**
 * Example 8
 */
function logThis7(){
  console.log("Example 8 ", this);
}

class myClass {
  logThat(){
    logThis7()
  }
}

const myClassInstance = new myClass()
myClassInstance.logThat()

// Ans:- window

/**
 * Example 9
 */
function logThis8(){
  console.log("Example 9 ", this);
}

class myClass1 {
  logThat(){
    logThis8.call(this)
  }
}

const myClassInstance1 = new myClass1()
myClassInstance1.logThat()

// Ans:- The object created by myClass1

/**
 * Example 10
 */
class myClass2 {
  logThis = () => {
    console.log("Example 10 ", this);
  }
}

const myObj5 = { name: 'sagiv' };

const myClassInstance2 = new myClass2()
myClassInstance2.logThis.call(myObj5)

// Ans:- The object created by myClass2

/**
 * Example 11
 */
function logThis9() {
  console.log("Example 11 ", this);
}

const btn = document.getElementById('btn');
btn.addEventListener('click', logThis9);

// Ans:- element(Button)

/**
 * Example 12
 */
const logThis10 = () => {
  console.log("Example 12 ", this);
}

const btn1 = document.getElementById('btn');
btn1.addEventListener('click', logThis10);

// Ans:- window

/**
 * Example 13
 */
class myClass3 {
  logThat() {
    function logThis() {
      console.log("Example 13 ", this);
    }
    logThis()
  }
}

const myClassInstance3 = new myClass3()
myClassInstance3.logThat()

// Ans:- undefined