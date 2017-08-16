//Component definition for the site's main navigation bar.
import { Component,
         OnInit }           from '@angular/core';
import { Logger,LogLevels } from './loggers/logger.service';
import { AuthService }      from './auth/auth.service';
import { User }             from './auth/user';
import { FacebookUser }     from './auth/facebookUser';

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
    }

    ngOnInit(){
      this.authService.fetchUser().subscribe(
          user => {
            this.log.log("Picture URL:"+JSON.stringify(user));
            if(user instanceof FacebookUser){
              this.log.log("User is of type Facebook user.");
              this.pictureURL = user.pictureUrl;
            }
            else{
              this.log.log("User is not of type Facebook user. No picture URL.");
            }
          },
          error=> this.log.log(error,LogLevels.ERROR)
      );
    }

    onBlog(){
      this.log.log("Blog button clicked.");
    }

    onChatter(){
      this.log.log("Chatter button clicked.");
    }

    onAccount(){
      this.log.log("Account button clicked.");
    }
  }
