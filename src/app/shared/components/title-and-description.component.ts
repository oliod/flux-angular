import { Component, OnInit } from '@angular/core';
import { ICON_FLUX } from '../../shared/app-settings';
import { NavService } from '../services/nav.service';
import { INavigationParams, NavigMenu} from '../inavigation';
 

@Component({
  selector: 'app-title-and-description',
  template: `
    <mat-accordion>
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title matTooltip="Afficher ou réduire des détails">
            <div class="fluxTitle ng-binding" style="margin-left: 20px;">
              <mat-icon matSuffix> {{iconFlux}} </mat-icon>
              <span style="font-size: 18px;"> {{dispalyTitle}}</span>
            </div>
          </mat-panel-title>
        </mat-expansion-panel-header>
        <app-slide-toggle-error (eventSlideToggle)="hint=!hint"> </app-slide-toggle-error>
        <!-- BEGINNING TEMPLATE -->
        <div *ngIf="(iNavigParams | json) !== '[]'; else navigFullEmpty">
            <pre style="margin-top:-20px;" [innerHtml]= "iNavigParams | prettyjson:3"> </pre>
        </div>
        <ng-template #navigFullEmpty>
          <p class="hint-error">Context legal ou Environement est vide! </p>
        </ng-template>
        <!-- END TEMPLATE -->
      </mat-expansion-panel>
    </mat-accordion>`
})
export class TitleAndDescriptionComponent implements OnInit {

  public dispalyTitle;
  public iconFlux = ICON_FLUX;
  public hint = false;

  public iNavigParams: INavigationParams = {};

  constructor(public navService: NavService) { }

  ngOnInit() {
    this.dispalyTitle = this.navService.getNameFlux();
    setInterval(() => {
      this.iNavigParams = this.navService.getNav();
    }, 1000);
  }

}
