import {Injectable} from "@angular/core";
import {BaseService} from './base.service';
import {LoggerService} from './logger.service';
import { HttpClient}                from '@angular/common/http';
import { Observable }               from 'rxjs/Observable';
import * as _                       from 'underscore';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import {Movie} from "../models";

@Injectable()
export class MovieService extends BaseService {

  constructor(private log: LoggerService,private http:HttpClient) {
    super();
    this.log.info('Constructor of MovieService');
  }

  //returns all users
  public fetchMovies(): Observable<Array<Movie>>{
    return this.http.get('api/fetchMovies')
      .map((res:Response)=>{
        let resultMovies: any = res;
        this.log.info('Fetched the following movies:' + JSON.stringify(resultMovies));
        return resultMovies;
      })
  }

}
