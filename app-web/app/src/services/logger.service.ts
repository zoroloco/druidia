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

  info(msg: string, toServer: boolean=false) {
    console.log(msg);
    if(toServer){
      this.loggingObserver(msg,'info')
        .subscribe(
          result => {},
          error  => console.log("Error logging to server:"+error),
          ()     => console.log("Successfully logged a message to the server.")
        );
    }
  }

  error(msg: string, toServer: boolean=false)  {
    console.error(msg);
    if(toServer){
      this.loggingObserver(msg,'error')
        .subscribe(
          result => {},
          error  => console.log("Error logging to server:"+error),
          ()     => console.log("Successfully logged a message to the server.")
        );
    }
  }

  warn(msg: string, toServer: boolean=false)   {
    console.warn(msg);
    if(toServer){
      this.loggingObserver(msg,'warn')
        .subscribe(
          result => {},
          error  => console.log("Error logging to server:"+error),
          ()     => console.log("Successfully logged a message to the server.")
        );
    }
  }

  loggingObserver(msg: string,level: string): Observable<Response>{
    console.log("Creating info observable.");
    let payload = {message:msg,level:level};
    return this.authHttp.post('/api/logger',JSON.stringify(payload));
  }

}
