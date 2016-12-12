//import * as dog from './dog';
import {Canine as Dog} from './canine';
import {Feline as Cat} from './feline';

let garfield = new Cat();
let phoebe   = new Dog("Phoebe");
let mango    = new Dog("Mango");

mango.eat();
phoebe.bark();

garfield.drink();
