// Component for login.
import { Component,ViewChild, AfterViewChecked } from '@angular/core';
import { AuthService } from '../../app/auth/auth.service';
import { User } from '../../models';
import {NgForm} from '@angular/forms';
import {LoggerService} from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements AfterViewChecked{
  user:User;
  loginForm: NgForm;
  @ViewChild('loginForm') currentForm: NgForm;
  failedLogin: boolean = false;

  formErrors = {
    'username': '',
    'password': '',
    'failedLogin': ''
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

  constructor(public authService: AuthService,private log: LoggerService) {
    this.user = new User();
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  onLocalLogin() {
    this.authService.processLocalLogin(this.user).subscribe(
      jwtToken=> {
        this.processSuccessfulLogin(jwtToken);
      },
      error=> {
        this.processFailedLogin(error);
      },
      ()=> {
        this.log.info('Login process completed.');
      }
    )
  }

  private processSuccessfulLogin(jwtToken: string) {
    this.log.info('Login successful!');
    this.failedLogin = false;
    this.formErrors['failedLogin'] = '';//clear
    this.authService.processAuthenticatedLogin(jwtToken);
  }

  private processFailedLogin(msg: string) {
    this.log.error('Login failed! ' + msg);
    this.failedLogin = true;
    this.formErrors['failedLogin'] = 'Login Failed. Invalid username and/or password';
  }

  //initialize the subscriber for the first time.
  formChanged() {
    if (this.currentForm === this.loginForm) { return; }
    this.loginForm = this.currentForm;
    if (this.loginForm) {
      this.loginForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    //this.log.info(data);
    this.failedLogin = false;

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
}
