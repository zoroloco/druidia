"use strict";
var canine_1 = require("./canine");
var feline_1 = require("./feline");
var garfield = new feline_1.Feline();
var phoebe = new canine_1.Canine("Phoebe");
phoebe.eat();
garfield.drink();
