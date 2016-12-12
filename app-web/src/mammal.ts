import {Animal} from "./animal";

//base class
export class Mammal extends Animal{
  constructor() {
    super();
    console.log("I am a mammal.");
  }
}
