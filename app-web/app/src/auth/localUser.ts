import { BaseUser } from './baseUser'

export class LocalUser extends BaseUser{
  //stuff specific to only local user.
  firstName:  string;
  lastName:   string;

  constructor(baseUser:BaseUser){
    super(baseUser);
  }
}
