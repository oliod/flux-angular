import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavService } from 'src/app/shared/services/nav.service';

@Component({
  selector: 'app-family-allowances-service',
  templateUrl: './family-allowances-service.component.html'
})
export class FamilyAllowancesServiceComponent implements OnInit {

  public nameLink: string;

  constructor(public navService: NavService, public activatedRoute: ActivatedRoute ) {
    this.nameLink = this.navService.titleCase(activatedRoute.snapshot.url[0].path);
  }

  ngOnInit() {
  }

}














