//Component for home.
/*
  Home is the entry point of the secure section of our site.
  The server will secure all content
*/

import { Component,
         OnInit,
         OnDestroy }       from '@angular/core';
import { Logger }          from '../loggers/logger.service';
import { NavBarComponent } from '../navbar.component';

@Component({
    selector: 'Home',
    styleUrls: ['resources/global.css'],
    templateUrl: 'html/home.template.html'
  })
  export class HomeComponent implements OnInit{

    constructor(private log: Logger){
      this.log.log("Instantiating home component.");
    }

    ngOnInit(){
      this.log.log("Initializing home component.");
    }

    ngOnDestroy(){
      this.log.log("Destroying home component.");
    }
  }
