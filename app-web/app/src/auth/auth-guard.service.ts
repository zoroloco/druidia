import { Injectable }  from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Logger,LogLevels } from '../loggers/logger.service';
import { Router }      from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,private router: Router,private log: Logger){
    this.log.log(LogLevels.INFO, "Instantiating AuthGuard.");
  }

  canActivate() {
    let authenticated: boolean = this.auth.isAuthenticated();
    this.log.log(LogLevels.INFO,"CanActivate triggered. Authenticated flag is: "+authenticated);

    if(authenticated){
      return true;
    }
    else{
      this.router.navigate(['/']);
      return false;
    }
  }
}
