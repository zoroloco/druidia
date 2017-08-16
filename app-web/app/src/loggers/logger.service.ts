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

  //defaults to info if optional second param not set.
  public log(msg:string,logLevel?:LogLevels){
    if(!logLevel)
      logLevel = LogLevels.INFO;//set default on optional param.

    this.logger.log(logLevel,msg);
  }

  //logs debug message to console
  public debug(msg:string){
    this.logger.log(LogLevels.DEBUG,msg);
  }

  //logs debug message to server
  public debugToServer(msg:string){
    this.logger.log(LogLevels.DEBUG2,msg);
  }

  //logs info message to console
  public info(msg:string){
    this.logger.log(LogLevels.INFO,msg);
  }

  //logs info message to server
  public infoToServer(msg:string){
    this.logger.log(LogLevels.INFO2,msg);
  }

  //log warn message to console
  public warn(msg:string){
    this.logger.log(LogLevels.WARN,msg);
  }

  //log warn message to server
  public warnToServer(msg:string){
    this.logger.log(LogLevels.WARN2,msg);
  }

  //log error message to console
  public error(msg:string){
    this.logger.log(LogLevels.ERROR,msg);
  }

  //log error message to server
  public errorToServer(msg:string){
    this.logger.log(LogLevels.ERROR2,msg);
  }
}
