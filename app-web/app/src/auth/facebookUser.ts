import { BaseUser } from './baseUser'

export class FacebookUser extends BaseUser {
  //stuff specific to only facebook user.
  email:      string;
  pictureUrl: string;

  constructor(baseUser:BaseUser){
    super(baseUser);
  }
}
