//Component for a blog.
import { Component,
         OnInit,
         OnDestroy } from '@angular/core';
import { Logger }    from '../services/logger.service';

@Component({
    selector: 'Blog',
    styleUrls: ['resources/global.css'],
    templateUrl: 'html/blog.template.html'
  })
  export class BlogComponent implements OnInit{

    constructor(private log: Logger){
      this.log.info("Instantiating blog component.");
    }

    ngOnInit(){
      this.log.info("Initializing blog component.");
    }

    ngOnDestroy(){
      this.log.info("Destroying blog component.");
    }
  }
