//This logger will log to the console and to the server.
import { Injectable } from '@angular/core';
import { Response }   from '@angular/http';
import { AuthHttp }   from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Logger }     from './logger.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {

  constructor(private log: Logger,public authHttp: AuthHttp){}

  fetchUser(): Observable<any> {
    this.log.info("Fetching user.");
    return this.authHttp.get(`api/fetchUser`)
      .map((res:Response) => res.json());
  }
}
