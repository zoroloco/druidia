//module defines your components.
import { NgModule }                from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';
import { Logger }                  from './services/logger.service';

import { AppComponent }            from './app.component';;
import { NavBarComponent }         from './navbar.component';

import { Auth }                    from './auth/auth.service';
import { AuthGuard }               from './auth/auth-guard.service';

import { Http, RequestOptions }    from '@angular/http';
import { AuthHttp, AuthConfig }    from 'angular2-jwt';
import { FormsModule }             from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule }            from '@angular/router';

import { ROUTES,routedComponents } from './app.routes';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
	return new AuthHttp(new AuthConfig({
		tokenName: 'token',
		tokenGetter: (() => localStorage.getItem('id_token')),
		globalHeaders: [{'Content-Type':'application/json'}],
	}), http, options);
}

//tells angular how to compile and run the application.
@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  HttpModule, JsonpModule,
                  RouterModule.forRoot(ROUTES) ],//array with all modules for this application
  declarations: [ AppComponent,
                  NavBarComponent,
                  routedComponents ],//array of components that belong to this module
  providers:    [ Auth, AuthGuard, Logger,
                  {
                    provide: AuthHttp,
                    useFactory: authHttpServiceFactory,
                    deps: [Http, RequestOptions]
                  }
                ],
  bootstrap:    [ AppComponent]//bootstrap array creates the ONE SINGLE component and inserts into the DOM
})
export class AppModule { }//export your empty class decorated as the NgModule
