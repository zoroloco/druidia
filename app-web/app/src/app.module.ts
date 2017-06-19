//module defines your components.
import { NgModule }                from '@angular/core';

//BrowserModule is required for any angular 2 web based application!!!
import { BrowserModule }           from '@angular/platform-browser';

//Services
import { BlogService }             from './blog/blog.service';
import { Logger }                  from './loggers/logger.service';
import { AuthService }             from './auth/auth.service';

import { AppComponent }            from './app.component';;
import { NavBarComponent }         from './navbar.component';

//pipes
import { TimeStampPipe }           from './pipes/timestamp.pipe';

import { AuthGuard }               from './auth/auth-guard.service';
import { Http, RequestOptions }    from '@angular/http';
import { AuthHttp, AuthConfig }    from 'angular2-jwt';
import { FormsModule }             from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule }            from '@angular/router';

import { MaterialModule }          from './material.module';

//UI
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';

//all the other components that go through a router will be imported as
//one huge array in routedComponents.
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
//declarations - the view classes that belong to this module.
//               Angular has three kinds of view classes: components, directives, and pipes.
//exports      - the subset of declarations that should be visible and usable in the component
//               templates of other modules.
//imports      - other modules whose exported classes are needed by component templates declared
//               in this module.
//providers    - creators of services that this module contributes to the global collection of
//               services; they become accessible in all parts of the app.
//bootstrap    - the main application view, called the root component, that hosts all other app views.
//               Only the root module should set this bootstrap property.
@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  HttpModule,
									JsonpModule,
									MaterialModule,//MY OWN CUSTOM MODULE 
									//BrowserAnimationsModule,
									FroalaEditorModule.forRoot(),
									FroalaViewModule.forRoot(),
                  RouterModule.forRoot(ROUTES) ],//array with all modules for this application
  declarations: [ AppComponent,
                  NavBarComponent,
                  routedComponents,
								  TimeStampPipe ],//array of components and pipes that belong to this module
  providers:    [ AuthService, AuthGuard, Logger, BlogService,
                  {
                    provide: AuthHttp,
                    useFactory: authHttpServiceFactory,
                    deps: [Http, RequestOptions]
                  }
                ],
  bootstrap:    [AppComponent]//bootstrap array creates the ONE SINGLE component and inserts into the DOM
})
export class AppModule { }//export your empty class decorated as the NgModule
