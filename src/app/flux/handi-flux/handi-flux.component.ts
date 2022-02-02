import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/format-datepicker';
import { NavService } from 'src/app/shared/services/nav.service';
import { IForm } from 'src/app/shared/iform';
import * as moment from 'moment';

@Component({
  selector: 'app-handi-flux',
  templateUrl: './handi-flux.component.html',
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ]
})
export class HandiFluxComponent implements OnInit {

  private address = 'handiflux/consulter/';
  public hint: boolean;
  public form: FormGroup;
  @Input() public showMessageRN;
  public dateFormat = 'YYYY-MM-DD';

  constructor(public navService: NavService, public dialog: MatDialog, public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      rn: ['', Validators.required],
      referenceDate: ['' ],
      paymentsAtPeriodStartDate: [''],
      paymentsAtPeriodEndDate: [''],
      evolutionOfRequest: [false, []],
      handicapRecognition: [false, []],
      rights: [false, []],
      socialCards: [false, []]
    });
    this.form.valueChanges.subscribe(n => console.log(n));
  }

  onNotifyRN(message: string) {
    this.showMessageRN = message;
  }

  public getValueFromInputApi(): IForm {
    return {
      callValueFromInput: (name) => {
        return this.getValueFromInput(name);
      }
    };
  }

  public getValueFromInput(name: string): string {
    if (this.navService.getNav().env === undefined) {
      const dialogRef = this.dialog.open( ConfirmDialogComponent, {
        data: { Erreur: 'Une erreur d\'application s\'est produite' }
      });
      dialogRef.afterClosed();
      return 'ERROR';
    }

    const box1 = ( (this.form.get('evolutionOfRequest').value) ? '&evolutionOfRequest=1' : '');
    const box2 = ( (this.form.get('handicapRecognition').value) ? '&handicapRecognition=1' : '');
    const box3 = ( (this.form.get('rights').value) ? '&rights=1' : '');
    const box4 = ( (this.form.get('socialCards').value)  ? '&socialCards=1' : '');

    const referenceDate = moment(this.form.get('referenceDate').value).format(this.dateFormat);
    const paymentsAtPeriodStartDate = moment(this.form.get('paymentsAtPeriodStartDate').value).format(this.dateFormat);
    const paymentsAtPeriodEndDate = moment(this.form.get('paymentsAtPeriodEndDate').value).format(this.dateFormat);

    return this.address + '?env=' + this.navService.getNav().env +
      '&registre_national=' + this.form.get('rn').value +
      '&referenceDate=' + (referenceDate !== 'Invalid date' ? referenceDate : '') +
      '&paymentsAtPeriodStartDate=' + (paymentsAtPeriodStartDate !== 'Invalid date' ? paymentsAtPeriodStartDate : '') +
      '&paymentsAtPeriodEndDate=' + (paymentsAtPeriodEndDate !== 'Invalid date' ? paymentsAtPeriodEndDate : '') +
      box1 + box2 + box3 + box4;
  }

}


