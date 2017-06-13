
import { Injectable }               from '@angular/core';
import { Router }                   from '@angular/router';
import { Logger }                   from '../services/logger.service';
import { User }                     from './user';
import { BaseUser }                 from './baseUser';
import { tokenNotExpired }          from 'angular2-jwt';
import { Response,Http }            from '@angular/http';
import { AuthHttp }                 from 'angular2-jwt';
import { Observable }               from 'rxjs/Observable';
import * as _                       from 'underscore';
import { UserFactory,UserType }     from './userFactory'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {

  constructor(private router: Router,
              private log: Logger,
              private http: Http,
              private authHttp: AuthHttp) {

      this.log.info("In constructor of auth service.");
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
      this.log.info("Received the following JWT token: "+jwtToken);
      localStorage.setItem('jwt_token', jwtToken);
      this.router.navigate(['/home']);
    }
  }

  //observe fetching user either from the localstorage or the back-end.
  //anyone subscribing to this observable will only fetch from back-end the first time.
  public fetchUser(): Observable<User>{
    if(!_.isEmpty(localStorage.getItem('user'))){
      this.log.info("Returning observable for local storage user.");
      return Observable.of(localStorage.getItem('user'))
        .map((userStr:string) => {
          this.log.info("Returning local storage saved user.");
          return JSON.parse(userStr);
        });
    }
    else{//fetch from back-end api.
      this.log.info("Returning observable for api call fetch user.");
      return this.authHttp.get(`api/fetchUser`)
        .map((res:Response) => {
          //store away for next time
          let user:BaseUser = res.json();

          //now polymorphism
          let specificUser:User = UserFactory.createUser(UserType.facebookUser,user);

          this.log.info("Returning api fetched user.");
          localStorage.setItem('user',JSON.stringify(user));
          return user;
        }
      );
    }
  }

  //concept of logged in is stateless.  Remove token and you are outta here!
  public processLogout(): void {
    this.log.info("Logging out of the application.");
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
