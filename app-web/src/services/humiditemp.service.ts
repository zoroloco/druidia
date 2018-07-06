import {Injectable} from "@angular/core";
import {BaseService} from './base.service';
import {LoggerService} from './logger.service';
import { HttpClient,
         HttpHeaders,
         HttpParams} from '@angular/common/http';
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
  public fetchLatestHumidiTemp(sensor_name:string): Observable<Humiditemp>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let params = new HttpParams().set("sensor_name",sensor_name);

    return this.http.get('api/fetchLatestHumidiTemp',{headers: headers, params: params})
      .map((res:Response)=>{
        let result: any = res;
        return result;
      })
  }

}
