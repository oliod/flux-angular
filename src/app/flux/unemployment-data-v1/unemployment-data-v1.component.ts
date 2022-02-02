import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unemployment-data-v1',
  templateUrl: './unemployment-data-v1.component.html'
})
export class UnemploymentDataV1Component implements OnInit {

  public tab: any;
  public navLinks: any[];
  public activeLinkIn  = -1;
  public messageContent: string;

  public get activeLinkIndex() {
    return this.activeLinkIn;
  }

  public set activeLinkIndex(value) {
    this.activeLinkIn = value;
  }

  constructor() {
    this.messageContent = 'Aucun contenu. la page est en construction!';
  }

  ngOnInit() {
  }

  tabChanged(event: any) {
    console.log(event);
  }


}
