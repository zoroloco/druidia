import {LogLevels} from './logger.service';
import * as _      from 'underscore';
/*
 * This class makes use of the chain of responsibility pattern.
 * A class that injects this logger will have access to the chained
 * logger member.  The chained logger will log based off of the appropriate
 * log level.  If it is not at the appropriate log level, then responsibility
 * will be forwarded to next logger in the chain.
*/

export abstract class AbstractLogger{
  public nextLogger: AbstractLogger;
  protected logLevel: LogLevels;

  constructor(level:LogLevels){
    this.logLevel = level;
  }

  public setNext(nextLogger: AbstractLogger){
    this.nextLogger = nextLogger;
  }

  public log(level:LogLevels,msg:string){
    if(level<=this.logLevel){
      this.logMessage(level,msg);
    }
    else{
      if(!_.isEmpty(this.nextLogger)){
        this.nextLogger.log(level,msg);//maybe the next logger in chain can do it.
      }
    }
  }

  private logMessage(level:LogLevels,msg:string){
    switch(level){
      case LogLevels.DEBUG:
      case LogLevels.DEBUG2:
        this.debug(msg);
        break;
      case LogLevels.INFO:
      case LogLevels.INFO2:
        this.info(msg);
        break;
      case LogLevels.WARN:
      case LogLevels.WARN2:
        this.warn(msg);
        break;
      case LogLevels.ERROR:
      case LogLevels.ERROR2:
        this.error(msg);
        break;
      default:
        this.debug(msg);
    }
  }

  //concrete loggers must implement these methods.
  protected abstract debug(msg:string);
  protected abstract info(msg:string);
  protected abstract warn(msg:string);
  protected abstract error(msg:string);
}
