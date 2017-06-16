/*
This class will be used throughout the application by use of dependency injection.
Constructor will create a logger object that is chained with responsibility.
*/

import { Injectable }       from '@angular/core';
import { ConsoleLogger }    from './console.logger';
import { AbstractLogger }   from './abstractLogger';
import { ServerLogger }     from './server.logger';
import { AuthHttp }         from 'angular2-jwt';

export enum LogLevels {
  DEBUG = 0,//CONSOLE LOGGER
  INFO,//CONSOLE LOGGER
  WARN,//CONSOLE LOGGER
  ERROR,//CONSOLE LOGGER
  DEBUG2,//SERVER LOGGER
  INFO2,//SERVER LOGGER
  WARN2,//SERVER LOGGER
  ERROR2//SERVER LOGGER
}

@Injectable()
export class Logger {
  //return chained logger
  private logger: AbstractLogger;

  constructor(private authHttp:AuthHttp){
    //build the chained logger you want to provide.
    this.logger = new ConsoleLogger(LogLevels.ERROR);//if I can't log, then maybe next guy in chain can.
    this.logger.setNext(new ServerLogger(authHttp,LogLevels.ERROR2));
  }

  //api
  public log(logLevel:LogLevels,msg:string){
    this.logger.log(logLevel,msg);
  }
}
