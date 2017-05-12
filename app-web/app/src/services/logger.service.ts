//This logger will log to the console and to the server.
import { AuthHttp }   from 'angular2-jwt';

export class Logger {
  constructor(private authHttp: AuthHttp){}

  info(msg: any)   {
    console.log(msg);
  }

  error(msg: any)  {
    console.error(msg);
  }

  warn(msg: any)   {
    console.warn(msg);
  }

}
