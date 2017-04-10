//module defines your components.
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';

//tells angular how to compile and run the application.
@NgModule({
  imports:      [ BrowserModule ],//array with all modules for this application
  declarations: [ AppComponent ],//array of components that belong to this module
  bootstrap:    [ AppComponent]//bootstrap array creates the component and inserts into the DOM
})
export class AppModule { }//export your empty class decorated as the NgModule
