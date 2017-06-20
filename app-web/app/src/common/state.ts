//class to hold a US. state.

export class State{
  private code: string;
  private name: string;

  constructor(cd:string,nm:string){
    this.code = cd;
    this.name = nm;
  }
}
