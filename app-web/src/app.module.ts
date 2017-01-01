//module defines your components.

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { KenTimerComponent } from './kentimer';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ KenTimerComponent ],
  bootstrap:    [ KenTimerComponent]
})
export class AppModule { }
