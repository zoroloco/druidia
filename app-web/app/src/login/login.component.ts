
//Component for login.
import { Component,ViewChild } from '@angular/core';
import { Logger }    from '../services/logger.service';
import {NgForm}      from '@angular/forms';

@Component({
  selector: 'Login',
  styleUrls: ['resources/signin.css'],
  templateUrl: 'html/login.template.html',
})
export class LoginComponent{
  //loginForm: NgForm;
  //@ViewChild('loginForm') currentForm: NgForm;

  constructor(private log: Logger){
    this.log.info("Instantiating login component.");
  }

  onLogin(username:string,password:string){
    this.log.info(username+" is attempting to login.");
  }

  onSignUp(username:string,password:string){
    this.log.info(username+" is attempting to sign up.");
  }

  formErrors = {
    'name': ''
  };
}
