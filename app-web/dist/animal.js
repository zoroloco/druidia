"use strict";
var Animal = (function () {
    function Animal() {
        console.log("I am an animal.");
    }
    Animal.prototype.eat = function () {
        console.log("Eating");
    };
    Animal.prototype.drink = function () {
        console.log("Drinking");
    };
    return Animal;
}());
exports.Animal = Animal;
