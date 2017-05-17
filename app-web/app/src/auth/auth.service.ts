
import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router }          from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AUTH_CONFIG }     from './auth0-variables';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Logger }          from '../services/logger.service';
import { Http, Response,RequestOptions,Headers }  from '@angular/http';
import { Observable }      from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

declare var auth0: any;

@Injectable()
export class Auth {

  auth0 = new auth0.WebAuth({
      domain:       AUTH_CONFIG.CLIENT_DOMAIN,
      clientID:     AUTH_CONFIG.CLIENT_ID,
      redirectUri:  AUTH_CONFIG.REDIRECT,//needed for social media redirects.
      responseType: 'token id_token'
  });

  constructor(private router: Router,
              private log: Logger,
              private http: Http,
              private authHttp: AuthHttp) {

      this.log.info("In constructor of auth service.");
  }

  public handleAuthentication(): void {

      this.auth0.parseHash({ _idTokenVerification: false }, (err, authResult) => {
        if (err) {
          alert(`Error: ${err.errorDescription}`)
        }
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          localStorage.setItem('access_token', authResult.accessToken);
          //HERE WE SAVE OFF OUR JWT!!!
          localStorage.setItem('id_token', authResult.idToken);

          this.log.info("Authentication successful. Saved JWT. Re-routing to /home.");
          this.router.navigate(['/home']);
        }
      });
  }

  public login(username: string, password: string): void {
      this.auth0.redirect.loginWithCredentials({
        connection: 'Username-Password-Authentication',
        username,
        password
      }, err => {
        if (err) return alert(err.description);
      });
  }

  public logout(): void {
    this.log.info("Logging out of the application.");
    // Remove token from localStorage
    //localStorage.removeItem('access_token');
    //localStorage.removeItem('id_token');
    localStorage.removeItem('jwt_token');

    this.router.navigate(['/']);
  }

  public signup(email, password): void {
      this.auth0.redirect.signupAndLogin({
        connection: 'Username-Password-Authentication',
        email,
        password,
      }, err => {
        if (err) return alert(err.description);
      });
  }

  public testData(): Observable<string>{
    this.log.info("Test data observable triggered.");
    /*
    var options = new RequestOptions({
        headers: new Headers({
          'Access-Control-Allow-Origin' : true//need this to make facebook happy.
        })
    });
    */

    return this.authHttp.get('/api/test')
           .map(this.extractData);

  }

  public isAuthenticated(): boolean {
    //logged on or off is stateless. You either have the token or not.
    let hasToken:boolean = tokenNotExpired('jwt_token');
    this.log.info("Checking if token valid: "+hasToken);
    return hasToken;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  /*
  public fetchUserProfile(cb): any {
    if(this.isAuthenticated){
      this.auth0.client.userInfo(localStorage.getItem('access_token'), (err,user)=>{
        this.log.info("Logged in user: "+JSON.stringify(user));
        cb(user);
      });
    }
  }
  */

}
