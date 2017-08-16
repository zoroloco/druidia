//Component to display 404 error.

import { Component }        from '@angular/core';
import { Logger,LogLevels } from '../loggers/logger.service';

@Component({
    selector: 'PageNotFound',
    template: `<b>You cannot request something that does not exist...</b>`
  })
  export class PageNotFoundComponent{

    constructor(private log: Logger){
        log.log("Instantiating page not found component.");
    }
  }
