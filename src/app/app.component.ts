import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { VERSION } from '@angular/material/core';
import { NavigMenu } from './shared/inavigation';
import { NavService } from './shared/services/nav.service';
import { slideInAnimation } from './shared/animations';
import { ThemeService } from './shared/services/theme.service';

import {
  RouterOutlet,
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';


export function windowFactory(): any {
    return window;
}

@Component({
  selector: 'app-bcss',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    slideInAnimation // <-- animation triggers go here
  ],
  providers: [
     //{ provide: Window, useValue: window, useFactory: windowFactory }
  ]
})
export class AppComponent implements AfterViewInit {

  @ViewChild('appDrawer', {static: true}) appDrawer: ElementRef;
  public thisOverlay = true;
  isDarkThemeActive: boolean;
  public version = VERSION;
  public  navList = new NavigMenu().navigList();

  constructor(private navService: NavService, public theme: ThemeService, public router: Router) {
    this.theme.OnThemeSwitch.subscribe(value => this.isDarkThemeActive = value);

    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.thisOverlay = true;
    }
    if (event instanceof NavigationEnd) {
      this.thisOverlay = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.thisOverlay = false;
    }
    if (event instanceof NavigationError) {
      this.thisOverlay = false;
    }
  }

  public prepareRoute(outlet: RouterOutlet): RouterOutlet {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation; // ['animation'];
  }

  public ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

}
