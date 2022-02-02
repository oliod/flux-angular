import { Component, EventEmitter, Input, Output } from '@angular/core';

import { speedDialFabAnimations } from './speed-dial-fab.animations';
import { INavigation } from '../inavigation';
import { NavService } from '../services/nav.service';
import { ICON_ENV, ICON_ADD } from '../app-settings';

export enum SpeedDialFabPosition {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right'
}

@Component({
  selector: 'app-speed-dial-fab',
  templateUrl: './speed-dial-fab.component.html',
  styleUrls: ['./speed-dial-fab.component.scss'],
  animations: speedDialFabAnimations
})
export class SpeedDialFabComponent {

  @Input('reverse-column-direction') public reverseColumnDirection: boolean = false;
  @Input('buttons') public fabButtons: INavigation[];
  @Output('fabClick') public fabClick = new EventEmitter();

  public iconENV = ICON_ENV;
  public iconADD = ICON_ADD;
  public buttons = [];
  public fabTogglerState = 'inactive';
  public env = [];

  constructor(public navService: NavService) { }

  public nameEnvironement(name): boolean {
    if (this.navService.getNav().env === name.shortName) {
      return true;
    } else {
      return false;
    }
  }

  private showItems(): void {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  private hideItems(): void {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  public onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }

  public onClickFab(btn: {icon: string}) {
    this.hideItems();
    this.fabClick.emit(btn);
  }
}
