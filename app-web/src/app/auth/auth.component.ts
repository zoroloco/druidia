import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService} from './auth.service';
import {LoggerService} from '../../services/logger.service';

@Component({
  template: ``
})
export class AuthComponent implements OnInit, OnDestroy{

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private log: LoggerService){
    this.log.info('Instantiating auth component.');
  }

  ngOnInit(){
    this.log.info('Initializing auth component. Extracting JWT from server response.');

    this.activatedRoute.queryParams.subscribe((params: Params)=> {
      const jwtToken = params['jwtToken'];
      // this.log.log(JSON.stringify(params));
      this.authService.processAuthenticatedLogin(jwtToken);
    });
  }

  ngOnDestroy(){
    this.log.info('Destroying auth component.');
  }
}
