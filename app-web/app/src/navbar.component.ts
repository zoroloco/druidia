import { Component,OnInit } from '@angular/core';
import { Logger }           from './services/logger.service';
import { Auth }             from './services/auth.service';

@Component({
    selector: 'NavBar',
    styleUrls: ['resources/global.css'],
    templateUrl: 'www/templates/navbar.template.html'
  })
  export class NavBarComponent implements OnInit{
    private name;
    private pictureUrl;
    
    constructor(private auth:Auth, private log: Logger){
      this.log.info("Instantiating navbar component.");
    }

    ngOnInit(){
      this.log.info("Initializing home component.");
      this.auth.fetchUserProfile((userProfile)=>{
        this.name=userProfile.name;
        this.pictureUrl=userProfile.picture;
      });
    }

    onChatter(){
      this.log.info("Chatter button clicked.");
    }

  }
