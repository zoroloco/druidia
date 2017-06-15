/*
 * This class makes use of the chain of responsibility pattern.
 * A class that injects this logger will have access to the chained
 * logger member.  The chained logger will log based off of the appropriate
 * log level.  If it is not at the appropriate log level, then responsibility
 * will be forwarded to next logger in the chain.
*/

export enum LogLevels {
  DEBUG = 0,
  INFO,
  WARN,
  ERROR,
  DEBUG2,//goes to server
  INFO2,
  WARN2,
  ERROR2
}

export abstract class Logger{
  public nextLogger: Logger;
  protected level: LogLevels;

  public setNext(nextLogger: Logger){
    this.nextLogger = nextLogger;
  }

  public log(level:LogLevels,msg:string){

  }

  protected abstract debug(msg:string);
  protected abstract info(msg:string);
  protected abstract warn(msg:string);
  protected abstract error(msg:string);
}
