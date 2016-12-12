"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mammal_1 = require("./mammal");
var Elephant = (function (_super) {
    __extends(Elephant, _super);
    function Elephant() {
        var _this = _super.call(this) || this;
        console.log("I am a an elephant.");
        return _this;
    }
    return Elephant;
}(mammal_1.Mammal));
exports.Elephant = Elephant;
