"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mammal_1 = require("./mammal");
var Feline = (function (_super) {
    __extends(Feline, _super);
    function Feline() {
        var _this = _super.call(this) || this;
        console.log("I am a feline.");
        return _this;
    }
    Feline.prototype.meow = function () {
        console.log("meow!");
    };
    return Feline;
}(mammal_1.Mammal));
exports.Feline = Feline;
