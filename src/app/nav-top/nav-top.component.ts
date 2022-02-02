import { Component, OnInit } from '@angular/core';
import { NavService } from '../shared/services/nav.service';
import { ThemeService } from '../shared/services/theme.service';
import { ICON_FLUX, ICON_MENU, ICON_ENV } from '../shared/app-settings';
import { INavigationParams, NavigMenu, INavigation } from '../shared/inavigation';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SpeedDialFabPosition } from '../shared/speed-dial-fab/speed-dial-fab.component';
import { SnackBarService } from '../shared/services/snack-bar.service';

@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
    ])
  ]
})
export class NavTopComponent implements OnInit {
  public speedDialFabButtonsEnv = [];

  SpeedDialFabPosition = SpeedDialFabPosition;
  speedDialFabColumnDirection = 'column';
  speedDialFabPosition = SpeedDialFabPosition.Top;
  speedDialFabPositionClassName = 'speed-dial-container-top';

  public dispalyTitle;
  public iconFlux = ICON_FLUX;
  public iconMenu = ICON_MENU;
  public iconEnv = ICON_ENV;
  public hint = false;
  public env = [];

  public iNavigParams: INavigationParams = {};
  public navigationList = new NavigMenu().navigList();
  public title: string;

  constructor(
    public navService: NavService,
    public theme: ThemeService,
    public snackBarService: SnackBarService) { }

  ngOnInit() {
    this.getEnv();
    this.speedDialFabButtonsEnv = this.env;
    this.dispalyTitle = this.navService.getNameFlux();

    setInterval(() => {
      this.iNavigParams = this.navService.getNav();
      this.title = this.iNavigParams.env;
    }, 100);
  }

  onPositionChange(position: SpeedDialFabPosition): void {
    switch (position) {
      case SpeedDialFabPosition.Bottom:
        this.speedDialFabPositionClassName = 'speed-dial-container-bottom';
        this.speedDialFabColumnDirection = 'column-reverse';
        break;
      default:
        this.speedDialFabPositionClassName = 'speed-dial-container-top';
        this.speedDialFabColumnDirection = 'column';
    }
  }

  onSpeedDialFabClicked(btn): void {
    this.onNavigSelected(btn);
    this.snackBarService.openSnackBar(btn.displayName, this.iconEnv);
  }

  onThemeChange(event): void  {
    this.theme.OnThemeSwitch.next(event.checked);
  }

  getEnv(): object {
    return this.navigationList.map((x) => {
       x.children.filter((y) => {
        if (y.position === 2) {
          this.env.push(y);
        }
      });
    });
  }

  public nameEnvironement(name): boolean {
    if (this.navService.getNav().env === name.shortName) {
      return true;
    } else {
      return false;
    }
  }

  public onNavigSelected(navig: INavigation): INavigation {
    this.navService.updateNav(navig);
    this.navService.setNav(navig);
    return navig;
  }

}
