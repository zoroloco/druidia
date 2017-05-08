//Component for home.

import { Component } from '@angular/core';
import { Logger }    from './services/logger.service';

@Component({
    selector: 'Home',
    template: `<b>THIS IS HOME</b>`
  })
  export class HomeComponent{

    constructor(private log: Logger){
        log.info("In home component constructor.");
    }
    
  }