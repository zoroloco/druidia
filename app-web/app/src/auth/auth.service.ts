
import { Injectable }               from '@angular/core';
import { Router }                   from '@angular/router';
import { Logger }                   from '../loggers/logger.service';
import { User }                     from './user';
import { BaseUser }                 from './baseUser';
import { tokenNotExpired }          from 'angular2-jwt';
import { Response,Http }            from '@angular/http';
import { AuthHttp }                 from 'angular2-jwt';
import { Observable }               from 'rxjs/Observable';
import * as _                       from 'underscore';
import { UserFactory }              from './userFactory'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {
  private userFactory: UserFactory;

  constructor(private router: Router,
              private log: Logger,
              private http: Http,
              private authHttp: AuthHttp) {

      this.log.log("In constructor of auth service.");
      this.userFactory = new UserFactory(log);
  }

  public processCreateAccount(user: User): Observable<any>{
    return this.http.post('auth/createAccount',user)
      .map(this.processLocalAuthenticationResponse)
      .catch(error=> Observable.throw(error));
  }

  public processLogin(user: User): Observable<any>{
    return this.http.post(`auth/login`,user)
      .map(this.processLocalAuthenticationResponse)
      .catch(error=> Observable.throw(error));
  }

  //if successfull, then will return jwt in json. false otherwise.
  private processLocalAuthenticationResponse(res:Response): any{
    if(res.status == 200){
      let body = res.json();
      return body.jwt || {};
    }
    return false;
  }

  //method called after authentication successful.
  public processAuthenticatedLogin(jwtToken){
    if(jwtToken){
      //this.log.log("Received the following JWT token: "+jwtToken);
      localStorage.setItem('jwt_token', jwtToken);
      this.router.navigate(['/home']);
    }
  }

  //returns all users
  public fetchUsers(): Observable<Array<User>>{
    return this.authHttp.get('api/fetchUsers')
      .map((res:Response)=>{
        let resultUsers: Array<User>;
        resultUsers = new Array<User>();
        let users = res.json();
        for(var i in users){
          let resultUser:BaseUser = JSON.parse(i);
          let user:User = this.userFactory.createUser(resultUser);
          resultUsers.push(user);
        }
        return resultUsers;
      })
  }

  //observe fetching user either from the localstorage or the back-end.
  //anyone subscribing to this observable will only fetch from back-end the first time.
  public fetchUser(): Observable<User>{
    if(!_.isEmpty(localStorage.getItem('user'))){
      this.log.log("Returning observable for local storage user.");
      return Observable.of(localStorage.getItem('user'))
        .map((userStr:string) => {
          this.log.log("Returning local storage saved user.");
          let resultUser:BaseUser = JSON.parse(userStr);
          return this.userFactory.createUser(resultUser);
        });
    }
    else{//fetch from back-end api.
      this.log.log("Returning observable for api call fetch user.");
      return this.authHttp.get(`api/fetchUser`)
        .map((res:Response) => {
          //store away for next time
          let resultUser:BaseUser = res.json();
          let user:User = this.userFactory.createUser(resultUser);
          this.log.log("Returning api fetched user.");
          localStorage.setItem('user',JSON.stringify(user));
          return user;
        }
      );
    }
  }

  //concept of logged in is stateless.  Remove token and you are outta here!
  public processLogout(): void {
    this.log.log("Logging out of the application.");
    // Remove token from localStorage
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    //logged on or off is stateless. You either have the token or not.
    return tokenNotExpired('jwt_token');
  }

}
