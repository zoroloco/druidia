
import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router }          from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AUTH_CONFIG }     from './auth0-variables';
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

  constructor(private router: Router, private log: Logger, private http: Http) {
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
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');

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

  public loginWithFacebook(): Observable<string> {
    this.log.info("FB observable triggered.");
    var options = new RequestOptions({
        headers: new Headers({
          'Access-Control-Allow-Origin' : true//need this to make facebook happy.
        })
    });

    return this.http.request('/auth/facebook', options)
                    .map(this.extractData)
                    .catch(this.handleError);

    //this.router.navigate(['/home']);

    /*
    this.auth0.authorize({
      connection: 'facebook',
    });
    */
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    //this.log.error(errMsg);
    return Observable.throw(errMsg);
  }

  private extractData(res: Response) {
    let body = res.json();
    this.log.info(body);
    return body.data || { };
  }

  public isAuthenticated(): boolean {
    // Check whether the id_token is expired or not
    return tokenNotExpired('id_token');
  }

  public fetchUserProfile(cb): any {
    if(this.isAuthenticated){
      this.auth0.client.userInfo(localStorage.getItem('access_token'), (err,user)=>{
        this.log.info("Logged in user: "+JSON.stringify(user));
        cb(user);
      });
    }
  }

}
