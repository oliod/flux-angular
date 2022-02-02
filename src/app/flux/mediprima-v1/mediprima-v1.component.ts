import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/shared/services/nav.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mediprima-v1',
  templateUrl: './mediprima-v1.component.html'
})
export class MediprimaV1Component implements OnInit {

  public nameLink: string;

  constructor(public navService: NavService, public activatedRoute: ActivatedRoute ) {
    this.nameLink = this.navService.titleCase(activatedRoute.snapshot.url[0].path);
  }

  ngOnInit() {
  }

}
