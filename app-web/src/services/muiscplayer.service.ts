import {Injectable} from "@angular/core";
import {BaseService} from './base.service';
import {LoggerService} from './logger.service';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

@Injectable()
export class MusicPlayerService extends BaseService {
  url:string = 'http://192.168.1.249:7483';

  constructor(private log: LoggerService,private http:HttpClient) {
    super();
    this.log.info('Constructor of MusicPlayerService');
  }

  public play(): Observable<any>{
    return this.http.get(this.url+'/play')
      .map((res:Response)=>{
        this.log.info('Playing music player.');
      });
  }

  public stop(): Observable<any>{
    return this.http.get(this.url+'/stop')
      .map((res:Response)=>{
        this.log.info('Stopping music player.');
      });
  }

  public next(): Observable<any>{
    return this.http.get(this.url+'/next')
      .map((res:Response)=>{
        this.log.info('Next song on music player.');
      });
  }

  public prev(): Observable<any>{
    return this.http.get(this.url+'/prev')
      .map((res:Response)=>{
        this.log.info('Previous song on music player.');
      });
  }

  public shuffle(): Observable<any>{
    return this.http.get(this.url+'/shuffle')
      .map((res:Response)=>{
        this.log.info('Shuffling songs on music player.');
      });
  }
}
