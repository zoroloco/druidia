import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoggerService {
  info(msg: string) {
    console.info(msg);
  }

  warn(msg: string) {
    console.warn(msg);
  }

  error(msg: string) {
    console.error(msg);
  }
}
