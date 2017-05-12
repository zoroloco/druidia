//module defines your components.
import { NgModule }                from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';
import { Logger }                  from './services/logger.service';

import { AppComponent }            from './app.component';;
import { NavBarComponent }         from './navbar.component';

import { Auth }                    from './services/auth.service';
import { AuthGuard }               from './services/auth-guard.service';

import { FormsModule }             from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule }            from '@angular/router';

import { ROUTES,routedComponents } from './app.routes';

//tells angular how to compile and run the application.
@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  HttpModule, JsonpModule,
                  RouterModule.forRoot(ROUTES) ],//array with all modules for this application
  declarations: [ AppComponent,
                  NavBarComponent,
                  routedComponents ],//array of components that belong to this module
  providers:    [ Auth, AuthGuard, Logger ],
  bootstrap:    [ AppComponent]//bootstrap array creates the ONE SINGLE component and inserts into the DOM
})
export class AppModule { }//export your empty class decorated as the NgModule
