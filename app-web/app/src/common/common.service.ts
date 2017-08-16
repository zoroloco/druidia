
import { Injectable }       from '@angular/core';
import { Logger }           from '../loggers/logger.service';
import { Response,Http }    from '@angular/http';
import { AuthHttp }         from 'angular2-jwt';
import { Observable }       from 'rxjs/Observable';
import { State }            from '../account/state.model';

@Injectable()
export class CommonService {

  constructor(private authHttp: AuthHttp,private log: Logger) {
      this.log.log("In constructor of blog service.");
  }

  public fetchStates() : Observable<Array<State>>{
    return this.authHttp.get('/api/fetchStates')
    .map((res:Response)=>{
      return res.json();
    });
  }
}
