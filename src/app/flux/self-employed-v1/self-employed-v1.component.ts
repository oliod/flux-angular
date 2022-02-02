import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavService } from 'src/app/shared/services/nav.service';

@Component({
  selector: 'app-self-employed-v1',
  templateUrl: './self-employed-v1.component.html'
})
export class SelfEmployedV1Component implements OnInit {

  public nameLink: string;

  constructor(public navService: NavService, public activatedRoute: ActivatedRoute ) {
    this.nameLink = this.navService.titleCase(activatedRoute.snapshot.url[0].path);
  }

  ngOnInit() {
  }

}
