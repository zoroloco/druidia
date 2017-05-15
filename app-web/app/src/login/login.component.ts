
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
}
