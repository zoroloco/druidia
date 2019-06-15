import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../app/auth/auth.service';
import {LoggerService} from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit {

  constructor(private authService: AuthService,
              private log: LoggerService) {
    this.log.info('In constructor of app header component');
  }

  ngOnInit() {

    }

  onLogout() {
    this.log.warn('User is logging out.');
    this.authService.processLogout();
  }
}
