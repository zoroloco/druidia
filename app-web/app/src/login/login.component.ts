
//Component for login.
import { Component } from '@angular/core';
import { Auth }      from '../auth/auth.service';
import { Logger }    from '../services/logger.service';

@Component({
  selector: 'Login',
  styleUrls: ['resources/signin.css'],
  templateUrl: 'html/login.template.html',
})
export class LoginComponent{

  constructor(private auth: Auth,private log: Logger){
    this.log.info("Instantiating login component.");
  }

  loginWithFacebook(){
    this.log.info("User is attempting to login with facebook credentials.");
    let s = '';
    this.auth.loginWithFacebook()
             .subscribe(
               secret => {s = secret; this.log.info("secret from server = "+s)},
               error  => {this.log.error("ERROR:"+error)}
             );
  }
}
