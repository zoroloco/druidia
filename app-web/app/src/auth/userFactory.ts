import { User }         from './user';
import { LocalUser }    from './localUser';
import { BaseUser }     from './baseUser';
import { FacebookUser } from './facebookUser'
import { Logger }       from '../loggers/logger.service';
import * as _           from 'underscore';

export class UserFactory{
  constructor(private log:Logger){}

  public createUser(resultUser:BaseUser): User{
    if(_.isEqual(resultUser.role,"facebook_user")){
      this.log.log("Factory returning facebook user.");
      return new FacebookUser(resultUser);//shallow copy
    }
    else{
      this.log.log("Factory returning local user.");
      return new LocalUser(resultUser);
    }

  }

}
