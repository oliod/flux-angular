import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  template: `
    <div *ngIf="!loading else load"> </div>
      <ng-template #load>
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
      </ng-template>`
})
export class ProgressBarComponent implements OnInit {

  @Input() public loading: boolean ;

  constructor() { }

  ngOnInit() {
  }

}
