
import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router }          from '@angular/router';
import { Logger }          from '../services/logger.service';
import { User }            from './user';
import { AuthHttp }        from 'angular2-jwt';
import { Response }   from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {

  constructor(private router: Router,
              private log: Logger,
              private authHttp: AuthHttp) {

      this.log.info("In constructor of auth service.");
  }

  public login(user: User): Observable<any>{
    return this.authHttp.post(`login`,user)
      .map((res:Response) => res.status)
      .map((status:number)=> {
        if(status!=200){
          this.log.error("unauthorized login");
          return false;
        }
        else
          this.log.info("authorized login");
          return true;
      })
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
