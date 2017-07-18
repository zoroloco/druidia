import { Address } from './address.model';

export class Account{
  //by default, the members are all public.
  address: Address;
  email:  string;
  gender: string;
  dob:    Date;

  constructor(){
    this.dob     = new Date();
    this.address = new Address();
  }
}
