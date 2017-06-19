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

describe('AuthService', () =>{

  //configure the setup hook that gets called before each test is run.
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService,
        {
          provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        }, deps: [MockBackend, BaseRequestOptions]
        },
        {provide: MockBackend, useClass: MockBackend},
        {provide: BaseRequestOptions, useClass: BaseRequestOptions}
      ]
    });
  });//before each

  it('tests a valid login', () =>{
    inject([AuthService, MockBackend], fakeAsync((authService: AuthService, mockBackend: MockBackend) => {
       let res: Response;
       mockBackend.connections.subscribe(c => {
         expect(c.request.url).toBe('assets/data/people.json');
         const response = new ResponseOptions({body: '[{"name": "John Elway"}, {"name": "Gary Kubiak"}]'});
         c.mockRespond(new Response(response));
       });
       authService.processLogin(new LocalUser(null)).subscribe((response) => {
         res = response;
       });
       tick();
       expect(res[0].name).toBe('John es gay');
     }))
  });//it

});



/*
//this is how we can congigure alternative class implementations.
function configure(){//setup callback called before each test is run.
  TestBed.configureTestingModule({
    providers: [
      BaseRequestOptions,
      MockBackend,
      AuthService,
      {
        provide: Http,
        useFactory: (backend: ConnectionBackend,
                     defaultOptions: BaseRequestOptions)=> {
                       return new Http(backend, defaultOptions);
                     },
        deps: [MockBackend, BaseRequestOptions]
      }
    ]
  });
}
*/

/*
//this is where we put the logic for our fake server.
//given an input url, we return some expected response based off of that.
function expectLocalLoginSuccessURL(backEnd: MockBackend, url: string){
  backEnd.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify(mockResponse)
      });
      connection.mockRespond(new Response(options));
  });
}
*/
