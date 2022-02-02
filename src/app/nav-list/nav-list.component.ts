import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { INavigation, NavigMenu } from '../shared/inavigation';
import { Router } from '@angular/router';
import { NavService } from '../shared/services/nav.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
    ])
  ]
})
export class NavListComponent implements OnInit {

  private _expanded: boolean;
  public get expanded(): boolean {
    return this._expanded;
  }
  public set expanded(value: boolean) {
    this._expanded = value;
  }
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() navig: INavigation;
  @Input() depth: number;
  public navigationList = new NavigMenu().navigList() ;

  constructor(public navService: NavService, public router: Router ) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.navig.route && url) {
        this.expanded = url.indexOf(`/${this.navig.route}`) === 0;
        this.ariaExpanded = this.expanded;
      }
    });
  }

  public onNavigSelected(navig: INavigation): INavigation  {
    if (!navig.children || !navig.children.length) {

      this.navService.updateNav(this.navig);
      if (navig.route === ' ') {
        this.navService.setNav(navig);
        this.navService.closeNav();
        return this.navig;
      }

      this.router.navigate([navig.route]);
      this.navService.closeNav();
    }
    if (navig.children && navig.children.length) {
      this.expanded = !this.expanded;
    }
    return this.navig;
  }

}
