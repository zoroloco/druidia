import {Component, OnInit} from '@angular/core';
import {User} from '../../models';
import {AuthService} from "../../app/auth/auth.service";
import {LoggerService} from "../../services";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  user: User;
  password2: string;
  passwordMatchErrorMsg: string;
  createAccountErrorMsg: string;

  constructor(private authService: AuthService,
              private log: LoggerService,
              private router: Router) { }

  ngOnInit() {
    this.user = new User();
    this.password2 = '';
    this.passwordMatchErrorMsg = '';
    this.createAccountErrorMsg = '';
  }

  onCreateAccount() {
    this.passwordMatchErrorMsg = '';
    this.createAccountErrorMsg = '';
    this.log.info('on create account');

    if(this.user.password != this.password2){
      this.passwordMatchErrorMsg = 'Passwords must match.';
      return;
    }

    this.log.info(this.user.username+" is attempting to create an account.");

    this.authService.processCreateLocalAccount(this.user).subscribe(
      result => {
        this.log.info('Successfully created account. Redirecting to login page.');
        this.router.navigate(['/login']);
      },
      error => {
        this.log.error('Error creating account:' + error);
        this.createAccountErrorMsg = error;
      },
      () => {
        this.log.info('Done with new account creation.');
      }
    )
  }

}
