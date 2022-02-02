import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-of-attestation',
  templateUrl: './list-of-attestation.component.html'
})
export class ListOfAttestationComponent implements OnInit {

  public tab: any;
  public navLinks: any[];
  private _activeLinkIndex  = -1;

  public get activeLinkIndex() {
    return this._activeLinkIndex;
  }

  public set activeLinkIndex(value) {
    this._activeLinkIndex = value;
  }

  constructor() {
  }

  ngOnInit() {
  }

  tabChanged(event: any) {
    console.log(event);
  }


}
