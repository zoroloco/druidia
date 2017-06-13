import { User } from './user';
import { BaseUser } from './baseUser'

export class FacebookUser extends BaseUser implements User{
  //stuff specific to only facebook user.
  email:      string;
}
