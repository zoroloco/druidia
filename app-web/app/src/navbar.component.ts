//Component definition for the site's main navigation bar.
import { Component,
         OnInit }      from '@angular/core';
import { Logger }      from './services/logger.service';
import { AuthService } from './auth/auth.service';
import { ApiService }  from './services/api.service'

@Component({
    selector: 'NavBar',
    styleUrls: ['resources/global.css'],
    templateUrl: 'html/navbar.template.html'
  })
  export class NavBarComponent implements OnInit{
    private name;
    private pictureUrl;

    constructor(private authService:AuthService,
                private apiService: ApiService,
                private log: Logger){
      this.log.info("Instantiating navbar component.");
    }

    ngOnInit(){
      this.log.info("Initializing home component.");

      this.apiService.fetchUser().subscribe(
        user  => {
                    this.log.info("FETCHED MYSELF "+JSON.stringify(user));
                    this.pictureUrl = user.pictureUrl;
                  },
        error => console.log('onError: %s', error));
    }

    onBlog(){
      this.log.info("Blog button clicked.");
    }

    onChatter(){
      this.log.info("Chatter button clicked.");
    }

  }
