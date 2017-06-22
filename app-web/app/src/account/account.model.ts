import { Address } from '../common/address.model';

export class Account{
  //by default, the members are all public.
  address: Address;
  gender: string;
  dob:    Date;

  constructor(){
    this.dob     = new Date();
    this.address = new Address();
  }
}
