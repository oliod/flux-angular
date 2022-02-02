import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { ICON_BUTTON_CLOSE } from '../app-settings';

@Component({
  selector: 'app-snack-bar',
  template: `
    <div>
      <div style="position:relative; float:left; padding:5px;">
        <mat-icon> {{data.icon}} </mat-icon>
        <span> {{data.message}} </span>
      </div>
      <div style="position:relative; float:right;">
        <button mat-raised-button color="primary" (click)="closeSnackbar()" style="background:#ff4081; color:white">
          <mat-icon matSuffix >{{iconClose}}</mat-icon>
        </button>
      </div>
    </div>`
})
export class SnackBarComponent  {

  public iconClose = ICON_BUTTON_CLOSE;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, public snackBar: MatSnackBar) { }

  closeSnackbar() {
    this.snackBar.dismiss();
  }

}
