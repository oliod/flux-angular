import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NavService } from 'src/app/shared/services/nav.service';
import { IForm, ISelect } from 'src/app/shared/iform';
import { APP_MODE_FORMATS_YEAR, AppDateAdapterYear } from 'src/app/shared/format-datepicker';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-tax-assessment-data-v2',
  templateUrl: './tax-assessment-data-v2.component.html',
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapterYear },
    { provide: MAT_DATE_FORMATS, useValue: APP_MODE_FORMATS_YEAR }
  ]
})
export class TaxAssessmentDataV2Component implements OnInit {

  derivedYear: ISelect[] = [
    {value: '', viewValue: ''},
    {value: 'MOST_RECENT', viewValue: 'MOST_RECENT'},
    {value: 'MOST_RECENT_UNLIMITED', viewValue: 'MOST_RECENT_UNLIMITED'}
  ];

  elements: ISelect[] = [
    {value: '', viewValue: ''},
    {value: 'GLOBAL_TAXABLE_INCOME', viewValue: 'GLOBAL_TAXABLE_INCOME'},
    {value: 'CHILDREN_DEPENDENT_HANDICAP', viewValue: 'CHILDREN_DEPENDENT_HANDICAP'}
  ];

  groups: ISelect[] = [
    {value: '', viewValue: ''},
    {value: 'MOST_RECENT', viewValue: 'MOST_RECENT'},
    {value: 'TAXABLE_INCOME', viewValue: 'TAXABLE_INCOME'},
    {value: 'CHILDREN_DEPENDENT', viewValue: 'CHILDREN_DEPENDENT'},
    {value: 'SOME_OTHER_GROUP', viewValue: 'SOME_OTHER_GROUP'},
    {value: 'DISTINCTLY_TAXABLE_INCOME', viewValue: 'DISTINCTLY_TAXABLE_INCOME'},
    {value: 'GLOBAL_TAXABLE_INCOME_FISCAL_FAMILY', viewValue: 'GLOBAL_TAXABLE_INCOME_FISCAL_FAMILY'}
  ];

  private address = 'taxi_as/v2/consulter/';
  public hint: boolean;
  public form: FormGroup;
  public dateFormat = 'YYYY';
  @Input() public showMessageRN;

  constructor(public navService: NavService, public dialog: MatDialog, public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      rn: ['', Validators.required],
      date: ['', Validators.required],
      derivedYear: [''],
      elements: [''],
      groups: [''],
    });
    this.form.valueChanges.subscribe(n => console.log(n));
  }

  chosenYearHandler(year: Moment,  picker: MatDatepicker<Moment>, name: string): void {
    this.form.get(name).setValue(year);
    picker.close();
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

  public getDateError(pickerInput: string): string {
    const toDateFormat = moment(new Date(pickerInput)).format(this.dateFormat);
    if (!moment(toDateFormat, this.dateFormat, true).isValid()) {
      return 'Entrée non valide: veuillez saisir une chaîne sous la forme de ' + this.dateFormat;
    }
  }

  public getValueFromInput(name: string): string {
    if (this.navService.getNav().env === undefined) {
      const dialogRef = this.dialog.open( ConfirmDialogComponent, {
        data: { Erreur: 'Une erreur d\'application s\'est produite' }
      });
      dialogRef.afterClosed();
      return 'ERROR';
    }

    const date = moment(this.form.get('date').value).format(this.dateFormat);

    return this.address + '?env=' + this.navService.getNav().env +
      '&registre_national=' + this.form.get('rn').value +
      '&date=' + (date !== 'Invalid date' ? date : '') +
      '&derivedYear=' + this.form.get('derivedYear').value +
      '&elements=' + this.form.get('elements').value +
      '&groups=' + this.form.get('groups').value;
  }

}
