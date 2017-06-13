import { User } from './user';
import { BaseUser } from './baseUser'

export class LocalUser extends BaseUser implements User{
  //stuff specific to only local user.
  firstName:  string;
  lastName:   string;
}
