//Component for home.

import { Component,
         OnInit,
         OnDestroy } from '@angular/core';
import { Logger,LogLevels } from '../loggers/logger.service';

@Component({
    selector: 'Chatter',
    templateUrl: 'html/chatter.template.html'
  })
  export class ChatterComponent implements OnInit{

    constructor(private log: Logger){
      this.log.log(LogLevels.INFO,"Instantiating chatter component.");
    }

    ngOnInit(){
      this.log.log(LogLevels.INFO,"Initializing chatter component.");
    }

    ngOnDestroy(){
      this.log.log(LogLevels.INFO,"Destroying chatter component.");
    }
  }
