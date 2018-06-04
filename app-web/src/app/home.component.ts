import {Component} from '@angular/core';
import {LoggerService} from '../services';

@Component({
  selector: 'druidia-home',
  template: `<router-outlet></router-outlet>`,
})
export class HomeComponent {

  constructor(private log: LoggerService) {
    this.log.info('In home component constructor');
  }
}
