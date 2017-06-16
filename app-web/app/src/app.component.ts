//root component of the application, which is really just a router component.

import { Component }        from '@angular/core';
import { Logger,LogLevels } from './loggers/logger.service';

@Component({
  selector: 'App',
  styleUrls: ['resources/jumbotron-narrow.css'],
  templateUrl: 'html/app.template.html',
})
export class AppComponent{

  constructor(private logger: Logger){
    this.logger.log(LogLevels.INFO,"Instantiating app component.");
  }
}
