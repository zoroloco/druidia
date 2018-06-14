import {Injectable} from "@angular/core";
import {BaseService} from './base.service';
import {LoggerService} from './logger.service';
import { HttpClient}                from '@angular/common/http';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import {Humiditemp} from "../models";

@Injectable()
export class HumidiTempService extends BaseService {

  constructor(private log: LoggerService,private http:HttpClient) {
    super();
    this.log.info('Constructor of HumidiTempService');
  }
  //let resultUsers: Array<User>;
  //resultUsers = new Array<User>();
  //let users = res.json();
  //returns all users
  public fetchLatestHumidiTemp(): Observable<Humiditemp>{
    return this.http.get('api/fetchLatestHumidiTemp')
      .map((res:Response)=>{
        let result: any = res;
        return result;
      })
  }

}
