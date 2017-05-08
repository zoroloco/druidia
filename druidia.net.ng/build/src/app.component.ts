
//root component of the application
import { Component }      from '@angular/core';
import { LoginComponent } from './login.component';
import { Auth }           from './services/auth.service';

@Component({
  selector: 'App',
  templateUrl: 'www/templates/app.template.html',
})
export class AppComponent{
  private heroes: string[];
  private clickCount: number;

  constructor(private auth: Auth){
    this.auth.handleAuthentication();
    //this.heroes     = ['hi'];
    //this.clickCount = 0;
  }

  onAction(){
    //this.heroes[this.heroes.length]='Ken';
    //this.clickCount++;
  }
}
