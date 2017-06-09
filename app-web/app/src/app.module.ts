//module defines your components.
import { NgModule }                from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';

import { Logger }                  from './services/logger.service';
import { ApiService }              from './services/api.service';

import { AppComponent }            from './app.component';;
import { NavBarComponent }         from './navbar.component';

import { AuthService }             from './auth/auth.service';
import { BlogService }             from './blog/blog.service';
import { AuthGuard }               from './auth/auth-guard.service';

import { Http, RequestOptions }    from '@angular/http';
import { AuthHttp, AuthConfig }    from 'angular2-jwt';
import { FormsModule }             from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule }            from '@angular/router';

import { ROUTES,routedComponents } from './app.routes';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {

	//This is auth0's helper http wrapper that just inserts always the jwt-token to all requests.
	return new AuthHttp(new AuthConfig({
		tokenName: 'jwt_token',
		tokenGetter: (() => localStorage.getItem('jwt_token')),
		globalHeaders: [{'Content-Type':'application/json'}],
	}), http, options);
}

//tells angular how to compile and run the application.
@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  HttpModule,
									JsonpModule,
                  RouterModule.forRoot(ROUTES) ],//array with all modules for this application
  declarations: [ AppComponent,
                  NavBarComponent,
                  routedComponents ],//array of components that belong to this module
  providers:    [ AuthService, AuthGuard, Logger, ApiService, BlogService,
                  {
                    provide: AuthHttp,
                    useFactory: authHttpServiceFactory,
                    deps: [Http, RequestOptions]
                  }
                ],
  bootstrap:    [AppComponent]//bootstrap array creates the ONE SINGLE component and inserts into the DOM
})
export class AppModule { }//export your empty class decorated as the NgModule