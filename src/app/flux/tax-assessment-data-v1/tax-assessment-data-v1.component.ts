import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/shared/services/nav.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tax-assessment-data-v1',
  templateUrl: './tax-assessment-data-v1.component.html'
})
export class TaxAssessmentDataV1Component implements OnInit {

  public nameLink: string;

  constructor(public navService: NavService, public activatedRoute: ActivatedRoute ) {
    this.nameLink = this.navService.titleCase(activatedRoute.snapshot.url[0].path);
  }

  ngOnInit() {
  }

}
