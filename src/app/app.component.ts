import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { environment as env } from '@env/environment';

@Component({
  selector: 'camp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'camp';
  
  isProd = env.production;

  constructor(private router: Router) {
    if (this.isProd) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          (<any>window).ga('set', 'page', event.urlAfterRedirects);
          (<any>window).ga('send', 'pageview');
        }
      });
    }    
 }
}
