import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { KenTimerComponent } from './kentimer';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent,KenTimerComponent ],
  bootstrap:    [ AppComponent,KenTimerComponent]
})
export class AppModule { }
