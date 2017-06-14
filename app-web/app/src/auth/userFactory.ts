import { User }         from './user';
import { LocalUser }    from './localUser';
import { BaseUser }     from './baseUser';
import { FacebookUser } from './facebookUser'
import { Logger }       from '../services/logger.service';

export enum UserType{
  localUser    = 0,
  facebookUser
}

export class UserFactory{
  constructor(private log:Logger){}

  public createUser(userType: UserType,resultUser:BaseUser): User{
    switch(userType){
      case UserType.localUser:
        this.log.info("Factory returning local user.");
        return new LocalUser(resultUser);
      case UserType.facebookUser:
        this.log.info("Factory returning facebook user.");
        return new FacebookUser(resultUser);
      default:
        this.log.info("Factory returning default local user.");
        return new LocalUser(resultUser);
    }
  }

}
