//Component for home.

import { Component,OnInit } from '@angular/core';
import { Logger }           from './services/logger.service';

@Component({
    selector: 'Chatter',
    templateUrl: 'www/templates/chatter.template.html'
  })
  export class ChatterComponent implements OnInit{

    constructor(private log: Logger){
      this.log.info("Instantiating chatter component.");
    }

    ngOnInit(){
      this.log.info("Initializing chatter component.");
    }

    ngOnDestroy(){
      this.log.info("Destroying chatter component.");
    }
  }
