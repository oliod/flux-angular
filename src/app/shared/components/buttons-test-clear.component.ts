import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IForm } from '../iform';
import { AppSettings, ICON_BUTTON_TEST, ICON_BUTTON_CLEAR } from '../../shared/app-settings';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-buttons-test-clear',
  template: `
    <app-progress-bar [loading]="loading"></app-progress-bar>
    <button mat-raised-button color="primary"
      (click)="btnSend()"
      class="submit-button"
      #send
      [disabled]="form.invalid">
      <mat-icon matSuffix>{{iconButtonTest}}</mat-icon>
      {{(btnName ? btnName : 'Tester')}}
    </button>

    <button mat-raised-button color="ink-ripple"
      (click)="btnClear()"
      *ngIf="!btnHiteClear">
      <mat-icon matSuffix >{{iconButtonClear}}</mat-icon> Effacer
    </button>`,
})
export class ButtonsTestClearComponent implements OnInit {

  @Input() public btnHiteClear: boolean;
  @Input() public btnName: string;
  @Input() public form: FormGroup;
  @Input() public formApi: IForm;
  @ViewChild('send', {read: ElementRef, static: false}) public send: ElementRef;

  public iconButtonTest = ICON_BUTTON_TEST;
  public iconButtonClear = ICON_BUTTON_CLEAR;
  public loading = false;
  private path: string;

  constructor(public req: RequestService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  private doRequest(): void {
    this.req.handleTheRequest(AppSettings.URL + this.path).subscribe(
      (response)  => {
        this.send.nativeElement.disabled = false;
        this.form.enable();
        this.loading = false;

        const dialogRef = this.dialog.open( ConfirmDialogComponent, {
          data: { bcss: response, full: this.form.get }
        });
        dialogRef.afterClosed();
      },
      (error) => { console.log(' ERROR : ',  error); },
      () => { console.log(' COMPLECT!!! '); }
    );
  }

  public btnSend() {
    this.path = this.formApi.callValueFromInput('');
    if (this.path === 'ERROR') {
      return ;
    }
    this.send.nativeElement.disabled = true;
    this.form.disable();
    this.loading = true;
    this.doRequest();
  }

  public btnClear(): void {
    this.form.reset();
  }

}

