//root component of the application, which is really just a router component.

import { Component } from '@angular/core';
import { Logger }    from './services/logger.service';

@Component({
  selector: 'App',
  styleUrls: ['resources/jumbotron-narrow.css'],
  templateUrl: 'html/app.template.html',
})
export class AppComponent{

  constructor(private log: Logger){
    this.log.info("Instantiating app component.");
  }
}
