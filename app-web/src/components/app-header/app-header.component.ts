import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../app/auth/auth.service';
import {LoggerService, UserService} from '../../services';
import {User} from '../../models';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit {
  user: User;

  constructor(private authService:AuthService,
              private log: LoggerService,
              private userService: UserService) {
    this.log.info('In constructor of app header component');
  }

  ngOnInit() {
    this.log.info('In onInit() of app header component');
      this.userService.fetchUser().subscribe(user=>{
        this.log.info('Fetched user for app header.');
        this.user = user;
      }, error=>{
        this.log.error('Error fetching user for app header:' + error);
      });
    }

  onLogout() {
    this.log.warn('User is logging out.');
    this.authService.processLogout();
  }
}
