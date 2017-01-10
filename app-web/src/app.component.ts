
//root component of the application
import { Component } from '@angular/core';

@Component({
  selector: 'App',
  templateUrl: 'www/templates/app.component.html',
})
export class AppComponent{
  private heroes: string[];
  private clickCount: number;

  constructor(){
    this.heroes     = ['hi'];
    this.clickCount = 0;
  }

  onAction(){
    this.heroes[this.heroes.length]='Ken';
    this.clickCount++;
  }
}
