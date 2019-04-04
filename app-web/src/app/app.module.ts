// BrowserModule is required for any angular 2 web based application.
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// module defines your components.
import { NgModule } from '@angular/core'

// components specific to this web application.
import { AppComponent } from './app.component';
import { HomeComponent} from "./home.component";
import { AuthComponent } from "./auth/auth.component";

import {AuthGuard} from "./auth/auth-guard";

import { HttpClientModule } from '@angular/common/http'

import {
  P404Component,
  P500Component
} from '../components';

// bundle all the components of this app in an array to make life easier.
const APP_COMPONENTS = [
  AppComponent,
  P404Component,
  P500Component,
  AuthComponent,
  HomeComponent
];

import { FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import { LoginModule} from "../views/login/login.module";

import { TimeStampPipe} from "../pipes";

const APP_PIPES = [TimeStampPipe];

import {AuthService} from "./auth/auth.service";
import {LoggerService} from '../services/';

const APP_SERVICES = [
  AuthService,
  LoggerService
];

const APP_DIRECTIVES = [

];

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

// tells angular how to compile and run the application.
// declarations - the view classes that belong to this module.
//               Angular has three kinds of view classes: components, directives, and pipes.
// exports      - the subset of declarations that should be visible and usable in the component
//               templates of other modules.
// imports      - other modules whose exported classes are needed by component templates declared
//               in this module.
// providers    - creators of services that this module contributes to the global collection of
//               services; they become accessible in all parts of the app.
// bootstrap    - the main application view, called the root component, that hosts all other app views.
//               Only the root module should set this bootstrap property.
@NgModule({
  declarations: [
    APP_COMPONENTS,
    APP_DIRECTIVES,
    APP_PIPES
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    LoginModule,
    AppRoutingModule,
    HttpClientModule
  ],
  //providing a service in app Module guarantees only one instance will exist in whole app. Also allows
  //you to inject other services inside these services.
  providers: [APP_SERVICES, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

}
