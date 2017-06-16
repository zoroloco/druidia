/*
  A logger that will also post the message to the server.
*/

import { AbstractLogger } from './abstractLogger';
import { LogLevels }      from './logger.service';
import { Response }       from '@angular/http';
import { AuthHttp }       from 'angular2-jwt';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

export class ServerLogger extends AbstractLogger{

  constructor(private authHttp: AuthHttp,level:LogLevels){
    super(level);
  }

  debug(msg: string){
    console.debug(msg);
    this.subscribeToServerLog(msg,LogLevels.DEBUG);
  }

  info(msg: string) {
    console.log(msg);
    this.subscribeToServerLog(msg,LogLevels.INFO);
  }

  warn(msg: string)   {
    console.warn(msg);
    this.subscribeToServerLog(msg,LogLevels.WARN);
  }

  error(msg: string)  {
    console.error(msg);
    this.subscribeToServerLog(msg,LogLevels.ERROR);
  }

  private subscribeToServerLog(msg:string,level:LogLevels){
    this.loggingObserver(msg,level)
      .subscribe(
        result => {},
        error  => console.error("Error logging to server:"+error),
        ()     => console.log("Successfully logged a message to the server.")
      );
  }

  private loggingObserver(msg: string,level: LogLevels): Observable<Response>{
    console.log("Creating info observable.");
    let payload = {message:msg,level:level};
    return this.authHttp.post('/api/logger',JSON.stringify(payload));
  }
}
