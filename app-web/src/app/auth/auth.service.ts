import { Injectable }               from '@angular/core';
import { Router }                   from '@angular/router';
import { HttpClient}                from '@angular/common/http';
import { User }                     from '../../models';
import { Observable }               from 'rxjs/Observable';
import * as _                       from 'underscore';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import {catchError} from 'rxjs/operators';
import {BaseService, LoggerService} from '../../services';

@Injectable()
export class AuthService extends BaseService{

  constructor(private router: Router,
              private http: HttpClient,
              private log: LoggerService) {

    super();
    this.log.info("In constructor of auth service.");
  }

  public processCreateLocalAccount(user: User): Observable<User>{
    return this.http.post<any>('auth/createAccount',user)
      .pipe(catchError(this.handleError));
  }

  public processLocalLogin(user: User): Observable<string>{
    return this.http.post<any>(`auth/login`,user)
      .map(AuthService.mapJwt)
      .pipe(catchError(this.handleError));
  }

  //if successful, then will return jwt in json. false otherwise.
  static mapJwt(res:Response): any {
    let body:any = res;
    return body.jwt || {};
  }

  //method called after authentication successful.
  public processAuthenticatedLogin(jwtToken){
    if(!_.isEmpty(jwtToken)){
      this.log.info('Received the following JWT token: ' + jwtToken);
      localStorage.setItem('jwt_token', jwtToken);
      this.log.info('Redirecting user to /home');
      this.router.navigate(['/home']);
    }
    else{
      this.log.warn('no jwt received!');
    }
  }

  //concept of logged in is stateless.  Remove token and you are outta here!
  public processLogout(): void {
    this.log.info('Logging out of the application.');
    // Remove token from localStorage
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    return !_.isEmpty(localStorage.getItem('jwt_token'));
  }
}
