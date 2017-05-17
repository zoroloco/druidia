import { Component,OnInit } from '@angular/core';
import { Logger }           from './services/logger.service';
import { Auth }             from './auth/auth.service';

@Component({
    selector: 'NavBar',
    styleUrls: ['resources/global.css'],
    templateUrl: 'html/navbar.template.html'
  })
  export class NavBarComponent implements OnInit{
    private name;
    private pictureUrl;

    constructor(private auth:Auth, private log: Logger){
      this.log.info("Instantiating navbar component.");
    }

    ngOnInit(){
      this.log.info("Initializing home component.");
      /*
      this.auth.fetchUserProfile((userProfile)=>{
        this.name=userProfile.name;
        this.pictureUrl=userProfile.picture;
      });
      */
    }

    onBlog(){
      this.log.info("Blog button clicked.");
    }

    onChatter(){
      this.log.info("Chatter button clicked.");
    }

  }
