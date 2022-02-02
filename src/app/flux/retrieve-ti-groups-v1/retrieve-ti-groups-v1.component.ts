import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/shared/services/nav.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-retrieve-ti-groups-v1',
  templateUrl: './retrieve-ti-groups-v1.component.html'
})
export class RetrieveTiGroupsV1Component implements OnInit {

  public nameLink: string;

  constructor(public navService: NavService, public activatedRoute: ActivatedRoute ) {
    this.nameLink = this.navService.titleCase(activatedRoute.snapshot.url[0].path);
  }

  ngOnInit() {
  }

}
