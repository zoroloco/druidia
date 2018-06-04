import {Injectable} from "@angular/core";

//The providedIn:root is optional. It is same as adding it in ngModule.
//It is just used to increase performance.
@Injectable({providedIn: 'root'})
export class LoggerService {
  info(msg:string) {
    console.info(msg);
  }

  warn(msg:string) {
    console.warn(msg);
  }

  error(msg:string) {
    console.error(msg);
  }
}
