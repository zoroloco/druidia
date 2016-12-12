import {Mammal} from './mammal'

export class Feline extends Mammal implements IDomesticated,IPredator{
  name: string;

  constructor(){
    super();
    console.log("I am a feline.");
  }

  meow(){
    console.log("meow!");
  }
}
