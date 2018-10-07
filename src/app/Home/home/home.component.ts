import { Component, OnInit } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showLoandingIndicator = true;
  constructor(private _router: Router) {
    this._router.events.subscribe((routerEvent: Event) => {

      if (routerEvent instanceof NavigationStart) {
        this.showLoandingIndicator = true;
      }

      if (routerEvent instanceof NavigationEnd) {
        this.showLoandingIndicator = false;
      }
    });
  }

  ngOnInit() {
  }

}
