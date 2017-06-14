//base class for all user types. This mirrors the json from the back-end.
import { User } from './user';

export abstract class BaseUser implements User{
  _id:        number;
  searchId:   number;
  username:   string;
  password:   string;
  role:       string;
  pictureUrl: string;

  constructor(baseUser:BaseUser){
    if(null != baseUser){
      this._id        = baseUser._id;
      this.searchId   = baseUser.searchId;
      this.username   = baseUser.username;
      this.password   = baseUser.password;
      this.role       = baseUser.role;
      this.pictureUrl = baseUser.pictureUrl;
    }
  }
}
