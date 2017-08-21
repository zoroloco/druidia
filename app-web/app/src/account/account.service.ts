import { Injectable }    from '@angular/core';
import { Logger }        from '../loggers/logger.service';
import { Account }       from './account.model';
import { Response,Http } from '@angular/http';
import { AuthHttp }      from 'angular2-jwt';
import { Observable }    from 'rxjs/Observable';

@Injectable()
export class AccountService{
  constructor(private log: Logger,private authHttp:AuthHttp){}

  public saveAccount(account:Account) : Observable<boolean>{
    return this.authHttp.post('/api/postAccount',account)
      .map((res:Response)=>{
        return(res.status == 200 ? true : false);
      });
  }

  public fetchAccount() : Observable<Account>{
    return this.authHttp.get('/api/fetchAccount')
      .map((res:Response)=>res.json());
  }
}
