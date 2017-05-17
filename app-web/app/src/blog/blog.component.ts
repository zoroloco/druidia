//Component for a blog.
import { Component,OnInit } from '@angular/core';
import { Logger }           from '../services/logger.service';
import { Auth }             from '../auth/auth.service';

@Component({
    selector: 'Blog',
    templateUrl: 'html/blog.template.html'
  })
  export class BlogComponent implements OnInit{

    constructor(private log: Logger, private auth:Auth){
      this.log.info("Instantiating blog component.");
    }

    ngOnInit(){
      this.log.info("Initializing blog component.");

      this.auth.testData()
               .subscribe(
                 testData => {this.log.info("TEST DATA: "+JSON.stringify(testData))},
                 error  => {this.log.error("ERROR: "+error)}
               );
    }

    ngOnDestroy(){
      this.log.info("Destroying blog component.");
    }
  }
