
import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router }          from '@angular/router';
import { Logger }          from '../services/logger.service';

@Injectable()
export class AuthService {

  constructor(private router: Router,
              private log: Logger) {

      this.log.info("In constructor of auth service.");
  }

  public logout(): void {
    this.log.info("Logging out of the application.");
    // Remove token from localStorage
    //localStorage.removeItem('access_token');
    //localStorage.removeItem('id_token');
    localStorage.removeItem('jwt_token');

    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    //logged on or off is stateless. You either have the token or not.
    return tokenNotExpired('jwt_token');
  }

}
