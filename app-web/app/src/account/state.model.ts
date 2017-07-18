//class to hold a US. state.

export class State{
  code: string;
  name: string;

  constructor(cd:string,nm:string){
    this.code = cd;
    this.name = nm;
  }
}
