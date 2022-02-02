import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICON_DIALOG, ICON_BUTTON_CLOSE } from '../../shared/app-settings';
/**
 * @title Drag&Drop position locking
 */
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  public iconDialog = ICON_DIALOG;
  public iconButtonClose = ICON_BUTTON_CLOSE;

  constructor(
      public dialogRef: MatDialogRef<ConfirmDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public message: string
  ) { }

  ngOnInit() {
  }

  btnClose(): void {
    this.dialogRef.close();
  }

}
