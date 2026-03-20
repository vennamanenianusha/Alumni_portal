import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showChrome = true;

  constructor(private router: Router) {

    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects || event.url;
        this.showChrome = !url.startsWith('/signin');
      }

    });

  }

}
