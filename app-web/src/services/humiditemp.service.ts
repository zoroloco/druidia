import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {LoggerService} from './logger.service';
import { HttpClient,
         HttpHeaders,
         HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import {Humiditemp} from '../models';

@Injectable()
export class HumidiTempService extends BaseService {

  constructor(private log: LoggerService,private http: HttpClient) {
    super();
    this.log.info('Constructor of HumidiTempService');
  }

  public fetchLatestHumidiTemp(sensorName: string): Observable<Humiditemp> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const params = new HttpParams().set('sensor_name', sensorName);

    return this.http.get('api/fetchLatestHumidiTemp', {headers, params})
      .map((res: Response) => {
        const result: any = res;
        return result;
      });
  }

}
