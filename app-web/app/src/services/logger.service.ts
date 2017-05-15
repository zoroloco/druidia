//This logger will log to the console and to the server.

export class Logger {
  //constructor(public authHttp: AuthHttp){}

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
