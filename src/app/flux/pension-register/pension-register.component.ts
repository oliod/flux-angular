import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { NavService } from 'src/app/shared/services/nav.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { IForm, ISelect } from 'src/app/shared/iform';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/format-datepicker';
import * as moment from 'moment';
import { ICON_EDIT } from 'src/app/shared/app-settings';

@Component({
  selector: 'app-pension-register',
  templateUrl: './pension-register.component.html',
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ]
})
export class PensionRegisterComponent implements OnInit {

  RequestedDataPillar: ISelect[] = [
    {value: 'FirstOnly', viewValue: '1er pilier seulement'},
    {value: 'FirstSecond',  viewValue: '1er et 2nd piliers'}
  ];

  RequestedDataRequestedInformation: ISelect[] = [
    {value: 'RightsOnly', viewValue: 'Droits seulement'},
    {value: 'RightsMinimumPayments',  viewValue: 'Droits et paiements (minimum)'},
    {value: 'RightsMaximumPayments',  viewValue: 'Droits et paiements (maximum)'}
  ];

  RequestedDataFocus: ISelect[] = [
    {value: 'ReferencePeriod', viewValue: 'Période de référence'},
    {value: 'MonthOfPayment',  viewValue: 'Mois de paiement'}
  ];

  private address = '/pension_register/consulter/';
  @Input() public hint: boolean;
  public form: FormGroup;
  @Input() public showMessageRN;
  public dateFormat = 'YYYY-MM-DD';
  public iconEdit = ICON_EDIT;

  constructor(public navService: NavService, public dialog: MatDialog, public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group(
      {
        rn: ['', Validators.required],
        PeriodStartDate: [''],
        PeriodEndDate: [''],
        RequestedDataPillar: ['', Validators.required],
        RequestedDataRequestedInformation: ['', Validators.required],
        RequestedDataFocus: ['', Validators.required],
      }
    );
  }

  onNotifyRN(message: string) {
    this.showMessageRN = message;
  }

  public getDateError(pickerInput: string): string {
    const toDateFormat = moment(new Date(pickerInput)).format(this.dateFormat);
    if (!moment(toDateFormat, this.dateFormat, true).isValid()) {
      return 'Entrée non valide: veuillez saisir une chaîne sous la forme de ' + this.dateFormat;
    }
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

    const dateBegin = moment(this.form.get('PeriodStartDate').value).format(this.dateFormat);
    const dateEnd = moment(this.form.get('PeriodEndDate').value).format(this.dateFormat);

    return this.address + '?env=' + this.navService.getNav().env +
      '&TargetSSIN=' + this.form.get('rn').value +
      '&PeriodStartDate=' + (dateBegin !== 'Invalid date' ? dateBegin : '') +
      '&PeriodEndDate=' + (dateEnd !== 'Invalid date' ? dateEnd : '') +
      '&RequestedDataPillar=' + this.form.get('RequestedDataPillar').value +
      '&RequestedDataRequestedInformation=' + this.form.get('RequestedDataRequestedInformation').value +
      '&RequestedDataFocus=' + this.form.get('RequestedDataFocus').value;
  }

}

