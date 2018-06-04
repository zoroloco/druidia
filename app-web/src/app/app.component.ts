import { Component, OnInit }      from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-component',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  title: 'app';

  constructor(private router: Router) { }

  /*
   * Since this is the root component, we listen to all
     events when a navigation is complete via the router.
   */
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
