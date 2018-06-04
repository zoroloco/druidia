import { Component, OnInit }   from '@angular/core';
import { environment }        from '../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html'
})
export class AppFooterComponent {
    environmentName: string;

    constructor() { }

    ngOnInit() {
      this.environmentName = environment.envName;
    }
}
