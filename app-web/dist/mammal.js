"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var animal_1 = require("./animal");
var Mammal = (function (_super) {
    __extends(Mammal, _super);
    function Mammal() {
        var _this = _super.call(this) || this;
        console.log("I am a mammal.");
        return _this;
    }
    return Mammal;
}(animal_1.Animal));
exports.Mammal = Mammal;
