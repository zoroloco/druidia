import {Injectable} from "@angular/core";
import {BaseService} from './base.service';
import {LoggerService} from './logger.service';
import { HttpClient}                from '@angular/common/http';
import { Observable }               from 'rxjs/Observable';
import * as _                       from 'underscore';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import {User} from "../models";
import {Resolve,RouterStateSnapshot,ActivatedRouteSnapshot} from "@angular/router";

@Injectable()
export class UserService extends BaseService implements Resolve<User>{
  private user: User;

  constructor(private log: LoggerService,private http:HttpClient) {
    super();
    this.log.info('Constructor of UserService');
  }

  userContext() {
    return this.user;
  }

  //returns all users
  public fetchUsers(): Observable<Array<User>>{
    return this.http.get('api/fetchUsers')
      .map((res:Response)=>{
        let resultUsers: Array<User>;
        resultUsers = new Array<User>();
        let users = res.json();
        for(var i in users){
          let resultUser:User = JSON.parse(i);
          resultUsers.push(resultUser);
        }
        return resultUsers;
      })
  }

  //observe fetching user either from the localstorage or the back-end.
  //anyone subscribing to this observable will only fetch from back-end the first time.
  public fetchUser(): Observable<User>{

    if(!_.isEmpty(localStorage.getItem('user'))) {
      this.log.info('Returning observable for local storage user.');
      return Observable.of(localStorage.getItem('user'))
        .map((userStr:string) => {
          this.log.info('Returning local storage saved user.');
          return JSON.parse(userStr);
        });
    }
    else {//fetch from back-end api.
      this.log.info('Returning observable for api call fetch user.');
      return this.http.get(`api/fetchUser`)
        .map((res:Response) => {
            //store away for next time
            let resultUser:any = res;
            this.log.info('Returning fetched user.');
            localStorage.setItem('user', JSON.stringify(resultUser));
            return resultUser;
          }
        );
    }
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.fetchUser();
  }
}
