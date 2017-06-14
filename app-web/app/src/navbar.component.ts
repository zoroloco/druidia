//Component definition for the site's main navigation bar.
import { Component,
         OnInit }      from '@angular/core';
import { Logger }      from './services/logger.service';
import { AuthService } from './auth/auth.service';
import {User}          from './auth/user';
import { FacebookUser }from './auth/facebookUser';

@Component({
    selector: 'NavBar',
    styleUrls: ['resources/global.css'],
    templateUrl: 'html/navbar.template.html'
  })
  export class NavBarComponent implements OnInit{
    private name;
    private pictureURL;

    constructor(private authService:AuthService,
                private log: Logger){
      this.log.info("Instantiating navbar component.");
    }

    ngOnInit(){
      this.log.info("Initializing navbar component.");
      this.authService.fetchUser().subscribe(
          user => {
            this.log.info("Picture URL:"+JSON.stringify(user));
            if(user instanceof FacebookUser){
              this.log.info("User is of type Facebook user.");
              this.pictureURL = user.pictureUrl;
            }
            else{
              this.log.info("User is not of type Facebook user. No picture URL.");
            }
          },
          error=> this.log.error(error)
      );
    }

    onBlog(){
      this.log.info("Blog button clicked.");
    }

    onChatter(){
      this.log.info("Chatter button clicked.");
    }
  }
