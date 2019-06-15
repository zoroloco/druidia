import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AuthGuard} from './auth/auth-guard';

import { AppRoutingModule } from './app-routing.module';
import { LoginModule} from '../views/login/login.module';

// components
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home.component';

import {
  P404Component,
  P500Component
} from '../components';

// services
import {AuthService} from './auth/auth.service';
import {LoggerService} from '../services/';
import { HttpClientModule } from '@angular/common/http';

const APP_COMPONENTS = [
  AppComponent,
  AuthComponent,
  HomeComponent,
  P404Component,
  P500Component
];

const APP_SERVICES = [
  AuthService,
  LoggerService
];

const APP_DIRECTIVES = [];

const APP_PIPES = [];

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
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    LoginModule,
    HttpClientModule
  ],
  providers: [APP_SERVICES, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
