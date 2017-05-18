
//Component for login.
import { Component } from '@angular/core';
import { Logger }    from '../services/logger.service';

@Component({
  selector: 'Login',
  styleUrls: ['resources/signin.css'],
  templateUrl: 'html/login.template.html',
})
export class LoginComponent{

  constructor(private log: Logger){
    this.log.info("Instantiating login component.");
  }
}
