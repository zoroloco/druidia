"use strict";
function sayHello(name) {
    console.log("Name=" + name);
    return "Hello dude from " + name;
}
exports.sayHello = sayHello;
function addNums(num0, num1) {
    console.log("Adding: " + num0 + " + " + num1);
    return num0 + num1;
}
exports.addNums = addNums;
