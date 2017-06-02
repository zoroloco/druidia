
//Component for login.
import { Component,ViewChild } from '@angular/core';
import { Logger }              from '../services/logger.service';
import {NgForm}                from '@angular/forms';
import {User}                  from '../auth/user';
import {AuthService}           from '../auth/auth.service';

@Component({
  selector: 'Login',
  styleUrls: ['resources/signin.css'],
  templateUrl: 'html/login.template.html',
})
export class LoginComponent{
  loginForm: NgForm;
  @ViewChild('loginForm') currentForm: NgForm;
  submitted: boolean = false;
  active: boolean    = true;
  user: User;

  constructor(private log: Logger,private authService: AuthService){
    this.log.info("Instantiating login component.");
    this.user = new User();
  }

  onLogin(){
    this.log.info(this.user.username+" is attempting to login.");
    //this.submitted = true;
    this.authService.login(this.user).subscribe(
      status => {
        if(status){
          this.log.info("successful login");
        }
        else{
          this.log.error("failed login");
        }
      },
      error => {
        this.log.error(error);
      }
    );
  }

  ngAfterViewChecked() {
   this.formChanged();
 }

 formChanged() {
   if (this.currentForm === this.loginForm) { return; }
   this.loginForm = this.currentForm;
   if (this.loginForm) {
     this.loginForm.valueChanges
       .subscribe(data => this.onValueChanged(data));
   }
 }

 onValueChanged(data?: any) {
   if (!this.loginForm) { return; }
   const form = this.loginForm.form;

   for (const field in this.formErrors) {
     // clear previous error message (if any)
     this.formErrors[field] = '';
     const control = form.get(field);

     if (control && control.dirty && !control.valid) {
       const messages = this.validationMessages[field];
       for (const key in control.errors) {
         this.formErrors[field] += messages[key] + ' ';
       }
     }
   }
 }


  formErrors = {
    'username': '',
    'password': ''
  };

  validationMessages = {
    'username' : {
      'required': 'username is required',
      'minlength': 'username must be atleast 8 characters',
      'maxlength': 'username cannot exceed 16 characters'
    },
    'password' : {
      'required': 'password is required',
      'minlength': 'password must be atleast 8 characters',
      'maxlength': 'password cannot exceed 16 characters'
    }
  };

}
