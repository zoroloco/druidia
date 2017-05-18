//Component definition for the site's main navigation bar.
import { Component,
         OnInit }      from '@angular/core';
import { Logger }      from './services/logger.service';
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'NavBar',
    styleUrls: ['resources/global.css'],
    templateUrl: 'html/navbar.template.html'
  })
  export class NavBarComponent implements OnInit{
    private name;
    private pictureUrl;

    constructor(private auth:AuthService, private log: Logger){
      this.log.info("Instantiating navbar component.");
    }

    ngOnInit(){
      this.log.info("Initializing home component.");
      //TODO: fetch user profile with image url.
    }

    onBlog(){
      this.log.info("Blog button clicked.");
    }

    onChatter(){
      this.log.info("Chatter button clicked.");
    }

  }
