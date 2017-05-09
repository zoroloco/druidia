//Component for home.

import { Component } from '@angular/core';
import { Logger }    from './services/logger.service';
import { Auth }      from './services/auth.service';

@Component({
    selector: 'Home',
    templateUrl: 'www/templates/home.template.html'
  })
  export class HomeComponent{

    constructor(private auth: Auth,private log: Logger){
        this.log.info("Instantiating home component.");
    }

  }
