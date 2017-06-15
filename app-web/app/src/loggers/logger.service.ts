
import { Injectable }    from '@angular/core';
import { ConsoleLogger } from './console.logger';
import { Logger }        from './logger';
import { ServerLogger }  from './server.logger';

@Injectable()
export class LoggerService {
  //return chained logger
  private logger: Logger;

  constructor(){
    this.logger = new ConsoleLogger();
    this.logger.setNext(new ServerLogger());
  }
}
