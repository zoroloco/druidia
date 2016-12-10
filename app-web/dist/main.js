"use strict";
var exportme_1 = require("./exportme");
var exportme_2 = require("./exportme");
//import { * } from "./student" as Student;
var underscore_1 = require("underscore");
function greeter(person) {
    console.log("Hello, " + person.firstName + " " + person.lastName);
}
//var user = new Student("Jane", "M.", "Jones");
//greeter(user);
function showHello(divName, name) {
    var elt = document.getElementById(divName);
    document.write(__filename);
    elt.innerText = underscore_1.isEmpty(name) + " ---- " + exportme_1.sayHello(name);
}
console.log(exportme_2.addNums(1, 2));
showHello("greeting", "f");
