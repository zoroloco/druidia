//Component for home.

import { Component,OnInit,OnDestroy }   from '@angular/core';
import { Logger,LogLevels }             from '../loggers/logger.service';
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
      this.log.log("Instantiating auth component.");
    }

    ngOnInit(){
      this.log.log("Initializing auth component.");

      this.activatedRoute.queryParams.subscribe((params: Params)=> {
        let jwtToken = params['jwtToken'];
        //this.log.log(JSON.stringify(params));
        this.authService.processAuthenticatedLogin(jwtToken);
      });
    }

    ngOnDestroy(){
      this.log.log("Destroying auth component.");
    }
  }
