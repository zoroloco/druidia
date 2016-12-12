import {Mammal} from "./mammal";

export class Elephant extends Mammal implements IWild, IPrey{

  constructor(){
    super();
    console.log("I am a an elephant.");
  }
}
