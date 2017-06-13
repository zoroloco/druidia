import { User }         from './user';
import { LocalUser }    from './localUser';
import { BaseUser }     from './baseUser';
import { FacebookUser } from './facebookUser'

export enum UserType{
  localUser    = 0,
  facebookUser
}

export class UserFactory{

  public static createUser(userType: UserType,baseUser:BaseUser): User{
    switch(userType){
      case UserType.localUser:
        return new LocalUser();
      case UserType.facebookUser:
        return new FacebookUser();
      default:
        return new LocalUser();
    }
  }

}
