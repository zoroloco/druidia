import {Injectable} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {BaseService} from './base.service';
import { Observable } from 'rxjs/Observable';
import {catchError,retry} from "rxjs/operators";
import {Command} from '../views/raspibot/command';

@Injectable()
export class RaspyService extends BaseService{
  private host = 'http://192.168.1.237:7482';
  private movePath = '/move';
  private connectPath = '/connect';
  private disconnectPath = '/disconnect';

  constructor(private http:HttpClient){
    super();
  }

  connect(): Observable<any>{
    return this.http.get(this.host+this.connectPath).pipe(catchError(this.handleError));
  };

  disconnect(): Observable<any>{
    return this.http.get(this.host+this.disconnectPath).pipe(catchError(this.handleError));
  };

  postCommand(cmd:Command): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post<Command>(this.host+this.movePath,cmd,httpOptions).pipe(catchError(this.handleError));
  }

}
