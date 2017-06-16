//Component for home.

import { Component,
         OnInit,
         OnDestroy }        from '@angular/core';
import { Logger,LogLevels } from './loggers/logger.service';
import { NavBarComponent }  from './navbar.component';

@Component({
    selector: 'Home',
    styleUrls: ['resources/global.css'],
    templateUrl: 'html/home.template.html'
  })
  export class HomeComponent implements OnInit{

    constructor(private log: Logger){
      this.log.log(LogLevels.INFO,"Instantiating home component.");
    }

    ngOnInit(){
      this.log.log(LogLevels.INFO,"Initializing home component.");
    }

    ngOnDestroy(){
      this.log.log(LogLevels.INFO,"Destroying home component.");
    }
  }
