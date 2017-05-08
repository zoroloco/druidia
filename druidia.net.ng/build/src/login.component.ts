
//Component for login.
import { Component } from '@angular/core';
import { Auth } from './services/auth.service';

@Component({
  selector: 'Login',
  styleUrls: ['resources/jumbotron-narrow.css','resources/signin.css'],
  templateUrl: 'www/templates/login.template.html',
})
export class LoginComponent{

  constructor(private auth: Auth){

  }
}
