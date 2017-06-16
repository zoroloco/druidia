//This logger will log to the console and to the server.
import { Injectable } from '@angular/core';
import { Response }   from '@angular/http';
import { AuthHttp }   from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class Logger {

  constructor(public authHttp: AuthHttp){}

  

}
