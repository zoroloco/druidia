//Component for home.

import { Component,OnInit,OnDestroy }   from '@angular/core';
import { Logger }                       from '../services/logger.service';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { AuthService}                   from './auth.service';

@Component({
  template: ``
})
  export class AuthComponent implements OnInit{

    constructor(private router:Router,
                private activatedRoute:ActivatedRoute,
                private authService:AuthService,
                private log: Logger){
      this.log.info("Instantiating auth component.");
    }

    ngOnInit(){
      this.log.info("Initializing auth component.");

      this.activatedRoute.queryParams.subscribe((params: Params)=> {
        let jwtToken = params['jwtToken'];
        this.authService.processAuthenticatedLogin(jwtToken);
      });
    }

    ngOnDestroy(){
      this.log.info("Destroying auth component.");
    }
  }
