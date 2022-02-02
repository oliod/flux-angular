import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NavigMenu, INavigationParams, INavigation } from '../inavigation';

@Injectable()
export class NavService {

  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>(undefined);
  public nameFlux: string;
  public iNavigParams: INavigationParams = {};
  public navigationList = new NavigMenu().navigList();

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const page = event.urlAfterRedirects.substring(1, event.urlAfterRedirects.length);
        this.paramNavigation(this);

        if (this.iNavigParams.route !== page) {
          this.router.navigate([this.iNavigParams.route]);
        }
        this.setNameFlux(this.iNavigParams.route);
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  private paramNavigation(that): void {
    this.navigationList.map((o: object, key: number) => {
      this.navigationList[key].children.forEach(
        function params(obj) {
          if (obj.position === 1 && obj.selected) {
            that.iNavigParams.context = obj.displayName;
          }
          if (obj.position === 2 && obj.selected) {
            that.iNavigParams.env = obj.shortName;
          }
          if (obj.position >= 3 && obj.selected) {
            that.iNavigParams.description = obj.description !== undefined ? obj.description : '';
            that.iNavigParams.route = obj.route;
          }
          return Array.isArray(obj.children) && obj.children.forEach(params);
        }
      );

    });
  }

  public closeNav(): void {
    this.appDrawer.close();
  }

  public openNav(): void {
    this.appDrawer.open();
  }

  public updateNav(navig: INavigation): INavigation {
    const url = this.router.url.substring(1, this.router.url.length);
    if (navig.route === url) {
        return navig;
    }

    this.navigationList.map(
      (o: object, key: number) => {
        return this.navigationList[key].children.forEach(
          function update(obj) {
            if (
                (navig.route === ' ' && obj.displayName === navig.displayName) ||
                (navig.route !== ' ' && obj.route === navig.route)
                ) {

              obj.selected = true;
            } else {
              if (!Array.isArray(obj.children)) {
                obj.selected = false;
                
              }
            }
            return Array.isArray(obj.children) && obj.children.forEach(update);
          }
        );
      }
    );
     
  }

  public getNav(): INavigationParams {
    return this.iNavigParams;
  }

  public setNav(navig: INavigation): void {
    if (navig.position === 1) {
      this.iNavigParams.context = navig.displayName;
    }
    if (navig.position === 2) {
      this.iNavigParams.env = navig.shortName;
    }
  }

  public setNameFlux(displayName: string): void {
    this.nameFlux = this.titleCase(displayName);
  }

  public getNameFlux(): string {
     return this.nameFlux;
  }

  public titleCase(displayName: string): string {
    if (displayName === undefined) {
      return '';
    }
    const toTitleCase = (name) => {
      return name
        .toLowerCase()
        .split('-')
        .map(flux => flux.charAt(0).toUpperCase() + flux.slice(1))
        .join('');
    };
    return toTitleCase(displayName);
  }

}
