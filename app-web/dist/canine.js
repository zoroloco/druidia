"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mammal_1 = require("./mammal");
var Canine = (function (_super) {
    __extends(Canine, _super);
    function Canine(name) {
        var _this = _super.call(this) || this;
        console.log("I am a canine.");
        return _this;
    }
    Canine.prototype.bark = function () {
        console.log("bark!");
    };
    Canine.prototype.eat = function () {
        console.log(name + " is eating.");
    };
    return Canine;
}(mammal_1.Mammal));
exports.Canine = Canine;
