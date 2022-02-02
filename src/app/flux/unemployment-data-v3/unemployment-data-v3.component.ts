import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-unemployment-data-v3',
  templateUrl: './unemployment-data-v3.component.html'
})
export class UnemploymentDataV3Component implements OnInit {

  public tab: any;
  public navLinks: any[];
  public activeLinkIn  = -1;

  public get activeLinkIndex() {
    return this.activeLinkIn;
  }

  public set activeLinkIndex(value) {
    this.activeLinkIn = value;
  }

  constructor() { }

  ngOnInit() {
  }

  tabChanged(event: any) {
    console.log(event);
  }

}
