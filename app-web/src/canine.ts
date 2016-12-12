import {Mammal} from './mammal'

export class Canine extends Mammal implements IDomesticated, IPredator{
  name: string;

  constructor(name: string){
    super();
    console.log("I am a canine.");
    this.name = name;
  }

  bark(){
    console.log(this.name+" is barking!");
  }

  eat(){
    console.log(this.name+" is eating.");
  }
}
