/*
Your basic logger that just goes to the browser console.
*/

import { AbstractLogger } from './abstractLogger';
import { LogLevels }      from './logger.service';

export class ConsoleLogger extends AbstractLogger{

  debug(msg:string){
    console.debug("ConsoleLogger:"+msg);
  }

  info(msg:string){
    console.info("ConsoleLogger:"+msg);
  }

  warn(msg:string){
    console.warn("ConsoleLogger:"+msg);
  }

  error(msg:string){
    console.error("ConsoleLogger:"+msg);
  }
}
