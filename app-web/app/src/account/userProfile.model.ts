import { Address } from '../common/address.model';

export class UserProfile{
  address: Address;
  gender: string;
  dob:    Date;

  constructor(){
    this.dob     = new Date();
    this.address = new Address();
  }
}
