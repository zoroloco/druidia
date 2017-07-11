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

var JWT_TEST_TOKEN = "TEST_JSON_WEB_TOKEN_RESPONSE";

//this is the main logical testing unit to test our auth service.
/*
describe('AuthService', () =>{

  let authService: AuthService;
  let mockBackend: MockBackend;

  //configure the setup hook that gets called before each test is run.
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        AuthService,
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
    //let fixture = TestBed.createComponent(AuthService);
    //let authService = fixture.debugElement.componentInstance;

    let response = {
      "jwt": JWT_TEST_TOKEN
    };

    inject([MockBackend,AuthService], (mockBackend,authService)=>{
      let res;

      //expect(authService).toBeDefined();
      // When the request subscribes for results on a connection, return a fake response
      mockBackend.connections.subscribe(connection => {
        expect(connection.request.url)          .toBe('auth/login');

        connection.mockRespond(new Response(<ResponseOptions>{
          body: JSON.stringify(response)
        }));
      });

      // Perform a request and make sure we get the response we expect
      authService.processLogin(new LocalUser(null)).subscribe((result)=>{
        res = result;
      });

      tick();

      expect(false).toBeTruthy();
      expect(res).toEqual("k");
    })

  }));

});
*/
