//Component for home.

import { Component,OnInit } from '@angular/core';
import { Logger }           from './services/logger.service';

import { NavBarComponent }  from './navbar.component';

@Component({
    selector: 'Home',
    styleUrls: ['resources/global.css'],
    templateUrl: 'html/home.template.html'
  })
  export class HomeComponent implements OnInit{

    constructor(private log: Logger){
      this.log.info("Instantiating home component.");
    }

    ngOnInit(){
      this.log.info("Initializing home component.");
    }

    ngOnDestroy(){
      this.log.info("Destroying home component.");
    }
  }
