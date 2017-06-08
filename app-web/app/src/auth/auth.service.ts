
import { Injectable }               from '@angular/core';
import { Router }                   from '@angular/router';
import { Logger }                   from '../services/logger.service';
import { User }                     from './user';
import { tokenNotExpired }          from 'angular2-jwt';
import { Response,Http }            from '@angular/http';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {

  constructor(private router: Router,
              private log: Logger,
              private http: Http) {

      this.log.info("In constructor of auth service.");
  }

  public processLoginOrCreateAccount(user: User): Observable<any>{

    return this.http.post(`loginOrCreateAccount`,user)
      .map(this.processLoginOrCreateAccountResponse)
      .catch(error=> Observable.throw(error));
  }

  //if successfull, then will return jwt in json. false otherwise.
  public processLoginOrCreateAccountResponse(res:Response): any{
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

  //concept of logged in is stateless.  Remove token and you are outta here!
  public processLogout(): void {
    this.log.info("Logging out of the application.");
    // Remove token from localStorage
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    //logged on or off is stateless. You either have the token or not.
    return tokenNotExpired('jwt_token');
  }

}
