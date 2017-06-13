//base class for all user types. This mirrors the json from the back-end.
export class BaseUser{
  _id:        number;
  searchId:   number;
  username:   string;
  password:   string;
  role:       string;
  pictureUrl: string;
}
