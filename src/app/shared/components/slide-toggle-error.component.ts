import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatSlideToggleChange, MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-slide-toggle-error',
  template: `
    <mat-slide-toggle warn (change)="onChange($event)">
      <span *ngIf="hint" class="act">Cacher des erreurs</span>
      <span *ngIf="!hint" class="inact">Afficher des erreurs</span>
    </mat-slide-toggle> `
})
export class SlideToggleErrorComponent implements OnInit {

  @Input() public hint = false;
  @Output() public eventSlideToggle = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  public onChange(ob: MatSlideToggleChange): void {
    const matSlideToggle: MatSlideToggle = ob.source;
    this.hint = ob.checked;
    this.eventSlideToggle.emit(ob.checked);
  }

}
