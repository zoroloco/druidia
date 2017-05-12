import { Injectable }  from '@angular/core';
import { CanActivate } from '@angular/router';
import { Auth }        from './auth.service';
import { Logger }      from './logger.service';
import { Router }      from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth,private router: Router,private log: Logger){
    this.log.info("Instantiating AuthGuard.");
  }

  canActivate() {
    let authenticated: boolean = this.auth.isAuthenticated();
    this.log.info("CanActivate triggered. Authenticated flag is: "+authenticated);

    if(authenticated){
      return true;
    }
    else{
      this.router.navigate(['/']);
      return false;
    }
  }
}
