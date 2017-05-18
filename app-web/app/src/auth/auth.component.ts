//Component for home.

import { Component,OnInit,OnDestroy }   from '@angular/core';
import { Logger }                       from '../services/logger.service';
import { ActivatedRoute,Params,Router } from '@angular/router';

@Component({
  template: ``
})
  export class AuthComponent implements OnInit{
    private sub: any;

    constructor(private router:Router,
                private activatedRoute:ActivatedRoute,
                private log: Logger){
      this.log.info("Instantiating auth component.");
    }

    ngOnInit(){
      this.log.info("Initializing auth component.");

      this.activatedRoute.queryParams.subscribe((params: Params)=> {
        let jwtToken = params['jwtToken'];
        if(jwtToken){
          this.log.info("Received the following JWT token: "+jwtToken);
          localStorage.setItem('jwt_token', jwtToken);
          this.router.navigate(['/home']);
        }
      });
    }

    ngOnDestroy(){
      this.log.info("Destroying auth component.");
    }
  }
