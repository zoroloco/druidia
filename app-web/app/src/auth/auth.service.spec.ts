//spec file used to test auth.service.ts
import {}                         from 'jasmine';
import {
  inject,
  async,
  fakeAsync,
  tick,
  TestBed,
}                                 from '@angular/core/testing';

import { MockBackend,
         MockConnection,
       } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions,
  RequestOptions,
  HttpModule
} from '@angular/http';
import { AuthHttp }               from 'angular2-jwt';
//now import the class we are testing, which is our auth.service
import { AuthService }            from './auth.service';
import { authHttpServiceFactory } from '../app.module';
import { LocalUser }              from './localUser';
import { Router }                 from '@angular/router';
import { Logger,LogLevels }       from '../loggers/logger.service';

var JWT_TEST_TOKEN = "TEST_JSON_WEB_TOKEN_RESPONSE";

//this is the main logical testing unit to test our auth service.

describe('AuthService', () =>{

  let authService: AuthService;
  let mockBackend: MockBackend;

  //configure the setup hook that gets called before each test is run.
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        AuthService,
        Logger,
        Router,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockBackend,options) => new Http(mockBackend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });

  });//before each

  it('login success', fakeAsync(() => {

    let response = {
      "jwt": JWT_TEST_TOKEN
    };

    inject([AuthService,MockBackend], (authService,mockBackend)=>{
      expect(authService).toBeDefined();
      // When the request subscribes for results on a connection, return a fake response
      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(<ResponseOptions>{
          body: JSON.stringify(response)
        }));
      });

      // Perform a request and make sure we get the response we expect
      authService.processLogin(new LocalUser(null)).subscribe((result)=>{
        expect(false).toBeTruthy();
        expect(result).toEqual("fsdjkl");
      });

      tick();
    })

  }));

});
