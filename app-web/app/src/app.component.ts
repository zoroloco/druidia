//root component of the application, which is really just a router component.

import { Component } from '@angular/core';
import { Auth }      from './services/auth.service';
import { Logger }    from './services/logger.service';

@Component({
  selector: 'App',
  styleUrls: ['resources/jumbotron-narrow.css'],
  templateUrl: 'www/templates/app.template.html',
})
export class AppComponent{
  private heroes: string[];
  private clickCount: number;

  constructor(private auth: Auth,private log: Logger){
    this.log.info("Instantiating app component.");
    this.auth.handleAuthentication();
  }
}
