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
      this.infoObserver(msg)
        .subscribe(
          result => {console.log("Successfully logged to server.")},
          error  => {console.log("Error logging to server:"+error)}
        );
    }
  }

  error(msg: string, toServer: boolean=false)  {
    console.error(msg);
    if(toServer){

    }
  }

  warn(msg: string, toServer: boolean=false)   {
    console.warn(msg);
    if(toServer){

    }
  }

  infoObserver(msg: string): Observable<Response>{
    console.log("Creating info observable.");
    let payload = {message:msg};
    return this.authHttp.post('/api/logger',JSON.stringify(payload));
  }

}
