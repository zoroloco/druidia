//Component to display 404 error.

import { Component } from '@angular/core';
import { Logger }    from '../services/logger.service';

@Component({
    selector: 'Home',
    template: `<b>You cannot request something that does not exist...</b>`
  })
  export class PageNotFoundComponent{

    constructor(private log: Logger){
        log.info("In page not found component constructor.");
    }
    
  }