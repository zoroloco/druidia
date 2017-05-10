
import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router }          from '@angular/router';
import { Logger }          from './logger.service';

declare var auth0: any;

@Injectable()
export class Auth {

  auth0 = new auth0.WebAuth({
      domain:       'druidia.auth0.com',
      clientID:     'a4CRvjDPEbYnz0xKy-8IIO-ecdw_eGUF',
      redirectUri:  'https://localhost/home',
      responseType: 'token id_token'
  });

  constructor(private router: Router, private log: Logger) {
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
          localStorage.setItem('id_token', authResult.idToken);

          this.log.info("Authentication successful. Re-routing to /home.");
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

  public loginWithFacebook(): void {
    this.auth0.authorize({
      connection: 'facebook',
    });
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
