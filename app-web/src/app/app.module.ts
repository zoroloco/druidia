import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//modules specific to this web application.
import { FormsModule }      from '@angular/forms';
import { RouterModule }     from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
const APP_MODULES = [BrowserModule,
                     FormsModule,
                     RouterModule,
                     AppRoutingModule];

import { AppComponent } from './app.component';
import { AppLayoutComponent} from "../containers";

const APP_COMPONENTS = [AppComponent,AppLayoutComponent];


const APP_DIRECTIVES = [];

const APP_SERVICES = [];


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
  declarations: [
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES
  ],
  imports: [
    ...APP_MODULES
  ],
  providers: [/*...APP_SERVICES*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
